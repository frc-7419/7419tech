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
  const protectedRoutes = ['/admin', '/dashboard']
  const authRoutes = ['/auth/login', '/auth/signup']
  
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  const isAuthRoute = authRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  let supabaseResponse = NextResponse.next({
    request,
  })

  const redirectWithCookies = (url: URL) => {
    const response = NextResponse.redirect(url)
    // Preserve any updated auth cookies (e.g. refresh-token rotation) on redirects.
    supabaseResponse.cookies.getAll().forEach(({ name, value, ...options }) => {
      response.cookies.set(name, value, options)
    })
    return response
  }

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
            // IMPORTANT: do NOT override Supabase cookie options.
            // The browser client (createBrowserClient) reads these cookies via document.cookie.
            // Forcing httpOnly breaks refresh-token rotation and causes 400 refresh_token_not_found.
            supabaseResponse.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // Always refresh the session cookie on navigation so auth doesn't silently
  // expire when users browse public pages (e.g. /blog).
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // For non-auth/non-protected routes, we only needed the refresh above.
  if (!isProtectedRoute && !isAuthRoute) {
    return supabaseResponse
  }

  // Redirect logged-in users away from auth pages
  if (request.nextUrl.pathname.startsWith('/auth/login') || request.nextUrl.pathname.startsWith('/auth/signup')) {
    if (user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/dashboard'
      redirectUrl.search = '' // Clear query params
      return redirectWithCookies(redirectUrl)
    }
  }

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      // Redirect to login if not authenticated
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return redirectWithCookies(redirectUrl)
    }

    // Session is only needed for role-checks (JWT claim lives on access_token).
    const {
      data: { session },
    } = await supabase.auth.getSession()

    const userRole = getUserRoleFromAccessToken(session?.access_token)

    if (userRole !== 'admin') {
      // Redirect to unauthorized page if not admin
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/unauthorized'
      return redirectWithCookies(redirectUrl)
    }
  }

  // Protect dashboard routes (same pattern as admin above)
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
      return redirectWithCookies(redirectUrl)
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Run on all pages (not static assets or API routes) so the Supabase session
    // cookie can refresh during normal browsing.
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
}
