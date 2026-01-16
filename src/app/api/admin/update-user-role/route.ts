import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { rateLimit, adminLimiter } from '@/lib/rate-limit'
import { Database } from '@/lib/supabase/types'

export async function POST(request: NextRequest) {
  // Apply strict rate limiting for admin operations
  const rateLimitResponse = await rateLimit(request, adminLimiter)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  try {
    const supabase = await createClient()

    // Verify admin authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Verify admin role via profile (works without custom JWT claims)
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || profile?.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden: Admin access required' },
        { status: 403 }
      )
    }

    // Parse request body
    const body = await request.json()
    const { userId, newRole } = body

    // Validate input
    if (!userId || !newRole) {
      return NextResponse.json(
        { error: 'Missing required fields: userId and newRole' },
        { status: 400 }
      )
    }

    if (!['public', 'member'].includes(newRole)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be: public or member' },
        { status: 400 }
      )
    }

    // Type-safe role assignment
    const validRole: 'public' | 'member' = newRole

    // Prevent admins from changing their own role to prevent lockout
    if (userId === user.id) {
      return NextResponse.json(
        { error: 'Admins cannot change their own role' },
        { status: 400 }
      )
    }

    // CSRF-like protection: Verify the request has proper headers
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    const expectedOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const forwardedHost = request.headers.get('x-forwarded-host')
    const host = request.headers.get('host')
    const forwardedProto = request.headers.get('x-forwarded-proto') || 'https'
    const allowedOrigins = new Set<string>([
      expectedOrigin,
      request.nextUrl.origin,
    ])
    if (forwardedHost) {
      allowedOrigins.add(`https://${forwardedHost}`)
      allowedOrigins.add(`http://${forwardedHost}`)
    }
    if (host) {
      allowedOrigins.add(`${forwardedProto}://${host}`)
    }
    const addWwwVariants = (originValue: string) => {
      try {
        const url = new URL(originValue)
        if (url.hostname.startsWith('www.')) {
          const noWww = `${url.protocol}//${url.hostname.replace(/^www\./, '')}`
          allowedOrigins.add(noWww)
        } else {
          const withWww = `${url.protocol}//www.${url.hostname}`
          allowedOrigins.add(withWww)
        }
      } catch {
        // Ignore invalid origin values
      }
    }
    addWwwVariants(expectedOrigin)
    addWwwVariants(request.nextUrl.origin)

    const refererOrigin = (() => {
      if (!referer) return null
      try {
        return new URL(referer).origin
      } catch {
        return null
      }
    })()
    const originAllowed =
      (origin && allowedOrigins.has(origin)) ||
      (refererOrigin && allowedOrigins.has(refererOrigin))

    if (!originAllowed) {
      console.warn('Invalid request origin', {
        origin,
        referer,
        expectedOrigin,
        nextOrigin: request.nextUrl.origin,
        forwardedHost,
        host,
        forwardedProto,
        allowedOrigins: Array.from(allowedOrigins),
      })
      return NextResponse.json(
        { error: 'Invalid request origin' },
        { status: 403 }
      )
    }

    // Update the user role
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ role: validRole })
      .eq('id', userId)

    if (updateError) {
      console.error('Error updating user role:', updateError)
      return NextResponse.json(
        { error: 'Failed to update user role' },
        { status: 500 }
      )
    }

    // Admin action logged for audit purposes

    return NextResponse.json(
      { 
        success: true,
        message: `User role updated to ${validRole}`,
        userId,
        newRole: validRole
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error in admin role update API:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Only allow POST requests
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  )
}
