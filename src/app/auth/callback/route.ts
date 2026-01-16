import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const tokenHash = requestUrl.searchParams.get('token_hash')
  const type = requestUrl.searchParams.get('type')
  const next = requestUrl.searchParams.get('next') || '/dashboard'
  const safeNext = next.startsWith('/') ? next : '/dashboard'

  const supabase = await createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      const errorUrl = new URL('/auth/login', requestUrl.origin)
      errorUrl.searchParams.set('error', 'verification_failed')
      return NextResponse.redirect(errorUrl)
    }
  } else if (tokenHash && type) {
    const emailOtpTypes = ['signup', 'invite', 'magiclink', 'recovery', 'email_change'] as const
    if (!emailOtpTypes.includes(type as (typeof emailOtpTypes)[number])) {
      const errorUrl = new URL('/auth/login', requestUrl.origin)
      errorUrl.searchParams.set('error', 'invalid_otp_type')
      return NextResponse.redirect(errorUrl)
    }

    const { error } = await supabase.auth.verifyOtp({
      type: type as (typeof emailOtpTypes)[number],
      token_hash: tokenHash,
    })

    if (error) {
      const errorUrl = new URL('/auth/login', requestUrl.origin)
      errorUrl.searchParams.set('error', 'verification_failed')
      return NextResponse.redirect(errorUrl)
    }
  } else {
    const errorUrl = new URL('/auth/login', requestUrl.origin)
    errorUrl.searchParams.set('error', 'missing_code')
    return NextResponse.redirect(errorUrl)
  }

  return NextResponse.redirect(new URL(safeNext, requestUrl.origin))
}
