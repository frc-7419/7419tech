import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { getUserRoleFromAccessToken } from '@/lib/supabase/jwt'

// Validate env vars at module load time for clear error messages
if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing Supabase environment variables. Please check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in your .env.local file.'
  )
}

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

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
        setAll(cookiesToSet: { name: string; value: string; options?: Record<string, unknown> }[]) {
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
              maxAge: (options?.maxAge as number) || 60 * 60 * 24 * 7, // 1 week default
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

  // Session is only needed for role-checks (JWT claim lives on access_token).
  // Note: this avoids DB reads and works across serverless instances.
  const {
    data: { session },
  } = await supabase.auth.getSession()

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

    const userRole = getUserRoleFromAccessToken(session?.access_token)

    if (userRole !== 'admin') {
      // Redirect to unauthorized page if not admin
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/unauthorized'
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Protect dashboard routes (same pattern as admin above)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
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
    '/admin',
    '/dashboard/:path*',
    '/dashboard',
    '/auth/login',
    '/auth/signup'
  ],
}
