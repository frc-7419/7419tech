'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'

export function CMSAccessClient() {
  const [hasSetupAccount, setHasSetupAccount] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user, profile, isLoading: authLoading } = useAuth()

  useEffect(() => {
    if (authLoading || !user?.email) return

    // Check localStorage to see if user has previously set up Strapi
    const setupKey = `strapi-setup-${user.email}`
    const hasSetup = localStorage.getItem(setupKey) === 'true'
    
    if (hasSetup) {
      // Returning user - redirect directly to Strapi
      window.location.href = 'https://innovative-luck-8fe8e1c24e.strapiapp.com/admin'
      return
    }
    
    setHasSetupAccount(false)
    setIsLoading(false)
  }, [authLoading, user?.email])

  const handleCMSAccess = () => {
    // Mark that user has accessed CMS (they'll set up account)
    const email = user?.email
    if (email) {
      const setupKey = `strapi-setup-${email}`
      localStorage.setItem(setupKey, 'true')
      setHasSetupAccount(true)
      // Open Strapi CMS
      window.open('https://innovative-luck-8fe8e1c24e.strapiapp.com/admin', '_blank')
      return
    }

    // Fallback: if no user email available, just open the CMS without setting localStorage
    window.open('https://innovative-luck-8fe8e1c24e.strapiapp.com/admin', '_blank')
  }


  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#122350]/5 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#122350] mx-auto"></div>
          <p className="mt-2 text-[#122350]/70">
            {hasSetupAccount ? 'Redirecting to CMS...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  // First time user - show setup instructions
  return (
    <div className="min-h-screen bg-[#122350]/5 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#122350] mb-4">
            Access CMS Manager
          </h1>
              <p className="text-[#122350]/70 mb-6">
                Welcome, {profile?.name || user?.email || 'Admin'}! You&apos;re verified as an admin.
              </p>
          
          <div className="bg-[#122350]/5 border border-[#122350]/20 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-[#122350] mb-2">First Time Setup:</h3>
            <ol className="text-sm text-[#122350] text-left space-y-1">
              <li>1. Use your <strong>7419tech email</strong>: {user?.email}</li>
              <li>2. Create a password for the CMS</li>
              <li>3. You&apos;ll have full admin access</li>
            </ol>
          </div>

          <button
            onClick={handleCMSAccess}
            className="inline-flex items-center px-4 py-2 bg-[#122350] text-white rounded-lg hover:bg-[#122350]/90 transition-colors"
          >
            Open Strapi CMS →
          </button>
          
          <p className="text-xs text-[#122350]/70 mt-4">
            This will open in a new tab
          </p>
        </div>
      </div>
    </div>
  )
}
