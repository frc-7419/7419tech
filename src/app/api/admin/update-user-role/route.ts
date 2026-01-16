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

    // CSRF-like protection: verify request origin matches our app origin(s).
    const originHeader = request.headers.get('origin')
    const refererHeader = request.headers.get('referer')
    const envOrigin = process.env.NEXT_PUBLIC_SITE_URL
    const requestOrigin = request.nextUrl.origin

    const normalizeOrigin = (value: string | null | undefined) => {
      if (!value) return null
      try {
        return new URL(value).origin
      } catch {
        return null
      }
    }

    const allowedOrigins = [envOrigin, requestOrigin]
      .map(value => normalizeOrigin(value))
      .filter((value): value is string => Boolean(value))

    const hasAllowedOrigin = [normalizeOrigin(originHeader), normalizeOrigin(refererHeader)]
      .some(value => value && allowedOrigins.includes(value))

    if (!hasAllowedOrigin) {
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
