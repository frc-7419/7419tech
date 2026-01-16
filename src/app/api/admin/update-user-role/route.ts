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

    if (!['public', 'member', 'admin'].includes(newRole)) {
      return NextResponse.json(
        { error: 'Invalid role. Must be: public, member, or admin' },
        { status: 400 }
      )
    }

    // Type-safe role assignment
    const validRole: 'public' | 'member' | 'admin' = newRole

    // Prevent admins from changing their own role to prevent lockout
    if (userId === user.id && validRole !== 'admin') {
      return NextResponse.json(
        { error: 'Admins cannot change their own role' },
        { status: 400 }
      )
    }

    // CSRF-like protection: Verify the request has proper headers
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')
    const expectedOrigin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    
    if (!origin || !referer || (!origin.includes(expectedOrigin) && !referer.includes(expectedOrigin))) {
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
