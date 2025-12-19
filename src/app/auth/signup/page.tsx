'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { NavHeader } from '@/components/NavHeader'

const departments = [
  'Mechanical',
  'Programming',
  'Business',
  'Mentor',
]

const graduationYears = [
  '2026',
  '2027', 
  '2028',
  '2029'
]

function PasswordRequirement({ met, text }: { met: boolean; text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
        met ? 'bg-green-100' : 'bg-gray-200'
      }`}>
        {met ? (
          <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        ) : (
          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
        )}
      </div>
      <span className={`text-xs ${met ? 'text-green-600' : 'text-gray-600'}`}>
        {text}
      </span>
    </div>
  )
}

export default function SignupPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    graduationYear: '',
    department: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false)
  
  const router = useRouter()
  const supabase = getSupabaseClient()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Real-time password validation
    if (field === 'password') {
      const errors = validatePassword(value)
      setPasswordErrors(errors)
    }
  }

  const validatePassword = (password: string) => {
    const errors = []
    
    if (password.length < 8) {
      errors.push('at least 8 characters')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('one uppercase letter')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('one lowercase letter')
    }
    if (!/\d/.test(password)) {
      errors.push('one number')
    }
    
    return errors
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Password validation
    const passwordErrors = validatePassword(formData.password)
    if (passwordErrors.length > 0) {
      setError(`Password must contain ${passwordErrors.join(', ')}`)
      setLoading(false)
      return
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    const graduationYear = parseInt(formData.graduationYear)
    if (!formData.graduationYear || isNaN(graduationYear)) {
      setError('Please select a graduation year')
      setLoading(false)
      return
    }

    try {
      // Sign up user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (authError) {
        setError(authError.message)
        return
      }

      if (authData.user) {
        // Create profile directly - simple and straightforward
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: formData.email,
            name: formData.name,
            graduation_year: graduationYear,
            department: formData.department,
            role: 'public' as const,
          })

        if (profileError) {
          setError('Database error saving new user: ' + profileError.message)
          return
        }

        // Store email for resend functionality and redirect
        localStorage.setItem('signup_email', formData.email)
        router.push(`/auth/verify-email?email=${encodeURIComponent(formData.email)}`)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <NavHeader />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Join Team 7419 - Registration requires approval
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Fill out the form below to request access to the team dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignup} className="space-y-4">
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    className="mt-1"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Personal Email *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="mt-1"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700">
                    Graduation Year *
                  </label>
                  <Select onValueChange={(value) => handleInputChange('graduationYear', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your graduation year" />
                    </SelectTrigger>
                    <SelectContent>
                      {graduationYears.map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                    Department *
                  </label>
                  <Select onValueChange={(value) => handleInputChange('department', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password *
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    onFocus={() => setShowPasswordRequirements(true)}
                    onBlur={() => setShowPasswordRequirements(false)}
                    required
                    className="mt-1"
                    placeholder="Enter your password"
                    minLength={8}
                  />
                  
                  {/* Password Requirements */}
                  {(showPasswordRequirements || formData.password) && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-md border">
                      <p className="text-xs font-medium text-gray-700 mb-2">Password must contain:</p>
                      <div className="space-y-1">
                        <PasswordRequirement 
                          met={formData.password.length >= 8} 
                          text="At least 8 characters" 
                        />
                        <PasswordRequirement 
                          met={/[A-Z]/.test(formData.password)} 
                          text="One uppercase letter (A-Z)" 
                        />
                        <PasswordRequirement 
                          met={/[a-z]/.test(formData.password)} 
                          text="One lowercase letter (a-z)" 
                        />
                        <PasswordRequirement 
                          met={/\d/.test(formData.password)} 
                          text="One number (0-9)" 
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password *
                  </label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    required
                    className="mt-1"
                    placeholder="Confirm your password"
                  />
                  
                  {/* Password Match Indicator */}
                  {formData.confirmPassword && (
                    <div className="mt-2 flex items-center space-x-2">
                      {formData.password === formData.confirmPassword ? (
                        <>
                          <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-xs text-green-600">Passwords match</span>
                        </>
                      ) : (
                        <>
                          <div className="w-4 h-4 rounded-full bg-red-100 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-xs text-red-600">Passwords do not match</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#ffc14a] hover:bg-[#ffcd6b] text-white"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-[#11224e] hover:underline">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
