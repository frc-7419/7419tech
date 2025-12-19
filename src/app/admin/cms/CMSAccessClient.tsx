'use client'

import { useState, useEffect } from 'react'

interface CMSAccessClientProps {
  user: {
    email: string
    name: string
  }
}

export function CMSAccessClient({ user }: CMSAccessClientProps) {
  const [hasSetupAccount, setHasSetupAccount] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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
  }, [user.email])

  const handleCMSAccess = () => {
    // Mark that user has accessed CMS (they'll set up account)
    const setupKey = `strapi-setup-${user.email}`
    localStorage.setItem(setupKey, 'true')
    setHasSetupAccount(true)
    
    // Open Strapi CMS
    window.open('https://innovative-luck-8fe8e1c24e.strapiapp.com/admin', '_blank')
  }


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">
            {hasSetupAccount ? 'Redirecting to CMS...' : 'Loading...'}
          </p>
        </div>
      </div>
    )
  }

  // First time user - show setup instructions
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access CMS Manager
          </h1>
              <p className="text-gray-600 mb-6">
                Welcome, {user.name}! You&apos;re verified as an admin.
              </p>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="font-medium text-blue-900 mb-2">First Time Setup:</h3>
            <ol className="text-sm text-blue-800 text-left space-y-1">
              <li>1. Use your <strong>7419tech email</strong>: {user.email}</li>
              <li>2. Create a password for the CMS</li>
              <li>3. You&apos;ll have full admin access</li>
            </ol>
          </div>

          <button
            onClick={handleCMSAccess}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Open Strapi CMS →
          </button>
          
          <p className="text-xs text-gray-500 mt-4">
            This will open in a new tab
          </p>
        </div>
      </div>
    </div>
  )
}
