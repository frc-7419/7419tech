import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// Validate env vars at module load time for clear error messages
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env.local file.'
  )
}

// Simple in-memory cache for admin role checks (TTL: 5 minutes)
const roleCache = new Map<string, { role: string; timestamp: number }>()
const ROLE_CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCachedRole(userId: string): string | null {
  const cached = roleCache.get(userId)
  if (cached && Date.now() - cached.timestamp < ROLE_CACHE_TTL) {
    return cached.role
  }
  if (cached) {
    roleCache.delete(userId) // Clean up expired entry
  }
  return null
}

function setCachedRole(userId: string, role: string): void {
  roleCache.set(userId, { role, timestamp: Date.now() })
}

export async function middleware(request: NextRequest) {
  // Early return for non-protected routes - PREVENTS COOKIE BLOAT!
  const protectedRoutes = ['/admin', '/dashboard']
  const authRoutes = ['/auth/login', '/auth/signup']
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  // Skip middleware for non-protected routes
  if (!isProtectedRoute && !isAuthRoute) {
    return NextResponse.next()
  }

  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => {
            // Add secure cookie options
            const secureOptions = {
              ...options,
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax' as const,
              maxAge: options?.maxAge || 60 * 60 * 24 * 7, // 1 week default
            }
            supabaseResponse.cookies.set(name, value, secureOptions)
          })
        },
      },
    }
  )

  // Only get user for routes that actually need auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect logged-in users away from auth pages
  if (request.nextUrl.pathname.startsWith('/auth/login') || request.nextUrl.pathname.startsWith('/auth/signup')) {
    if (user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/dashboard'
      redirectUrl.search = '' // Clear query params
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      // Redirect to login if not authenticated
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }

    // Check cached role first to avoid DB query on every request
    let userRole = getCachedRole(user.id)
    
    if (!userRole) {
      // Cache miss - query the database
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      
      userRole = profile?.role || 'public'
      setCachedRole(user.id, userRole)
    }

    if (userRole !== 'admin') {
      // Redirect to unauthorized page if not admin
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/unauthorized'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      // Redirect to login if not authenticated
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/dashboard/:path*',
    '/auth/login',
    '/auth/signup'
  ],
}
