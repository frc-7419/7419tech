'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, CheckCircle, Clock, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { PageShell } from '@/components/PageShell'
import { useAuth } from '@/contexts/AuthContext'

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const { supabase } = useAuth()

  const handleResendVerification = async () => {
    setResending(true)
    setResendMessage('')

    // Get email from URL params or localStorage if available
    const urlParams = new URLSearchParams(window.location.search)
    const email = urlParams.get('email') || localStorage.getItem('signup_email')

    if (!email) {
      setResendMessage('Please sign up again to receive a new verification email.')
      setResending(false)
      return
    }

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
      })

      if (error) {
        setResendMessage('Failed to resend verification email. Please try again.')
      } else {
        setResendMessage('Verification email sent! Check your inbox.')
      }
    } catch (err) {
      setResendMessage('An error occurred. Please try again.')
    } finally {
      setResending(false)
    }
  }
  return (
    <PageShell>
      <div className="min-h-screen flex items-center justify-center bg-[#122350]/5 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <Mail className="mx-auto h-16 w-16 text-[hsl(var(--brand-gold))] mb-4" />
              <CardTitle className="font-display text-2xl text-[#122350]">Check Your Email</CardTitle>
              <CardDescription>
                We&apos;ve sent you a verification link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Email Verification */}
              <div className="flex items-start space-x-3 p-4 bg-[#122350]/5 rounded-lg border border-[#122350]/20">
                <CheckCircle className="h-6 w-6 text-[#122350] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#122350]">Step 1: Verify Your Email</h3>
                  <p className="text-sm text-[#122350] mt-1">
                    Click the verification link in your email to activate your account.
                  </p>
                  <p className="text-xs text-[#122350] mt-2">
                    Check your spam folder if you don&apos;t see the email within a few minutes.
                  </p>
                </div>
              </div>

              {/* Step 2: Admin Approval */}
              <div className="flex items-start space-x-3 p-4 bg-[#FFB419]/10 rounded-lg border border-[#FFB419]/50">
                <Clock className="h-6 w-6 text-[#FFB419] mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-[#122350]">Step 2: Wait for Approval</h3>
                  <p className="text-sm text-[#122350] mt-1">
                    After email verification, a team administrator will review and approve your account.
                  </p>
                  <p className="text-xs text-[#FFB419] mt-2">
                    You&apos;ll receive another email once your account is approved.
                  </p>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-[#122350]/5 rounded-lg p-4 border border-[#122350]/15">
                <h4 className="font-medium text-[#122350] mb-2">What happens next?</h4>
                <ul className="text-sm text-[#122350]/70 space-y-1">
                  <li>• Verify your email address by clicking the link we sent</li>
                  <li>• Wait for a team admin to approve your account</li>
                  <li>• Once approved, you&apos;ll get access based on your assigned role</li>
                  <li>• You can then sign in and access team resources</li>
                </ul>
              </div>

              {/* Resend Verification */}
              {resendMessage && (
                <Alert className={resendMessage.includes('sent') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}>
                  <AlertDescription className={resendMessage.includes('sent') ? 'text-green-700' : 'text-red-700'}>
                    {resendMessage}
                  </AlertDescription>
                </Alert>
              )}

              <div className="text-center">
                <Button
                  onClick={handleResendVerification}
                  disabled={resending}
                  variant="ghost"
                  size="sm"
                  className="text-[#122350] hover:bg-[#122350]/10"
                >
                  {resending ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Resend Verification Email
                    </>
                  )}
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button asChild className="w-full bg-[hsl(var(--brand-gold))] hover:bg-[hsl(var(--brand-gold))]/90 text-[#122350] font-display font-semibold uppercase tracking-wide">
                  <Link href="/auth/login">
                    Already verified? Sign In
                  </Link>
                </Button>
                
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">
                    Return to Home
                  </Link>
                </Button>
              </div>

              {/* Contact Info */}
              <div className="text-center pt-4 border-t border-[#122350]/15">
                <p className="text-sm text-[#122350]/70">
                  Questions about your account?
                </p>
                <Button variant="link" asChild className="p-0 h-auto text-[#11224e]">
                  <Link href="/contact">
                    Contact a team administrator
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
