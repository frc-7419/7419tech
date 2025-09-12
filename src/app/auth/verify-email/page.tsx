'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Mail, CheckCircle, Clock, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { NavHeader } from '@/components/NavHeader'
import { createClient } from '@/lib/supabase/client'

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false)
  const [resendMessage, setResendMessage] = useState('')
  const supabase = createClient()

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
    <>
      <NavHeader />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <Mail className="mx-auto h-16 w-16 text-[#ffc14a] mb-4" />
              <CardTitle className="text-2xl text-[#11224e]">Check Your Email</CardTitle>
              <CardDescription>
                We've sent you a verification link
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Step 1: Email Verification */}
              <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <CheckCircle className="h-6 w-6 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-blue-900">Step 1: Verify Your Email</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Click the verification link in your email to activate your account.
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    Check your spam folder if you don't see the email within a few minutes.
                  </p>
                </div>
              </div>

              {/* Step 2: Admin Approval */}
              <div className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <Clock className="h-6 w-6 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-900">Step 2: Wait for Approval</h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    After email verification, a team administrator will review and approve your account.
                  </p>
                  <p className="text-xs text-yellow-600 mt-2">
                    You'll receive another email once your account is approved.
                  </p>
                </div>
              </div>

              {/* Important Notes */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Verify your email address by clicking the link we sent</li>
                  <li>• Wait for a team admin to approve your account</li>
                  <li>• Once approved, you'll get access based on your assigned role</li>
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
                  className="text-[#11224e] hover:bg-[#11224e]/10"
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
                <Button asChild className="w-full bg-[#ffc14a] hover:bg-[#ffcd6b] text-white">
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
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
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
    </>
  )
}
