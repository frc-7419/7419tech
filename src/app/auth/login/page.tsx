'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import Link from 'next/link'
import { PageShell } from '@/components/PageShell'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const searchParams = useSearchParams()
  const router = useRouter()
  const redirectTo = searchParams.get('redirectTo') || '/dashboard'
  
  const { isAuthenticated, isLoading: authLoading, supabase } = useAuth()

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push(redirectTo)
    }
  }, [authLoading, isAuthenticated, router, redirectTo])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Use the supabase client from AuthContext (shared instance)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        setError(error.message)
        setLoading(false)
        return
      }

      // Success - AuthContext will detect the sign in and update state
      // Then the useEffect above will redirect
      // Keep loading state until redirect happens
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  // Show loading while checking auth
  if (authLoading) {
    return (
      <PageShell>
        <div className="min-h-screen flex items-center justify-center bg-[#122350]/5 pt-20">
          <Loader2 className="h-8 w-8 animate-spin text-[#122350]/50" />
        </div>
      </PageShell>
    )
  }

  // If already authenticated, show loading while redirecting
  if (isAuthenticated) {
    return (
      <PageShell>
        <div className="min-h-screen flex items-center justify-center bg-[#122350]/5 pt-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#122350]/50 mx-auto mb-4" />
            <p className="text-[#122350]/70">Redirecting...</p>
          </div>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="min-h-screen flex items-center justify-center bg-[#122350]/5 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h1 className="mt-6 font-display text-3xl font-bold text-[#122350]">
              Sign in to your account
            </h1>
            <p className="mt-2 text-sm text-[#122350]/70">
              Team members and admins only
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#122350]">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="your.email@example.com"
                    disabled={loading}
                  />
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-[#122350]">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-[hsl(var(--brand-gold))] hover:bg-[hsl(var(--brand-gold))]/90 text-[#122350] font-display font-semibold uppercase tracking-wide"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-[#122350]/70">
                  Don&apos;t have an account?{' '}
                  <Link href="/auth/signup" className="text-[#122350] font-semibold hover:underline">
                    Sign up here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageShell>
  )
}
