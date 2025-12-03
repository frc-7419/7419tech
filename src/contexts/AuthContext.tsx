'use client'

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { getSupabaseClient } from '@/lib/supabase/client'
import { Profile } from '@/lib/supabase/types'

interface AuthState {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  isMember: boolean
}

interface AuthContextType extends AuthState {
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

// Cache for profile data to avoid refetching
const profileCache = new Map<string, { profile: Profile; timestamp: number }>()
const CACHE_TTL = 60000 // 1 minute cache

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    profile: null,
    session: null,
    isLoading: true,
    isAuthenticated: false,
    isAdmin: false,
    isMember: false,
  })

  // Use ref to get the supabase client - stable reference
  const supabaseRef = useRef(getSupabaseClient())
  const supabase = supabaseRef.current

  // Fetch profile with timeout
  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    // Check cache first
    const cached = profileCache.get(userId)
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.profile
    }

    try {
      // Add 5 second timeout
      const timeoutPromise = new Promise<never>((_, reject) => 
        setTimeout(() => reject(new Error('Profile fetch timeout')), 5000)
      )

      const fetchPromise = supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      const { data, error } = await Promise.race([fetchPromise, timeoutPromise])

      if (error) {
        console.error('Profile fetch error:', error)
        return null
      }

      const profile = data as Profile
      profileCache.set(userId, { profile, timestamp: Date.now() })
      return profile
    } catch (error) {
      console.error('Unexpected profile fetch error:', error)
      return null
    }
  }

  // Initialize auth on mount - runs ONCE
  useEffect(() => {
    let mounted = true

    const initAuth = async () => {
      try {
        // Add timeout for session fetch too
        const timeoutPromise = new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error('Session fetch timeout')), 5000)
        )

        const sessionPromise = supabase.auth.getSession()
        
        const { data: { session }, error } = await Promise.race([sessionPromise, timeoutPromise])
        
        if (error) {
          console.error('Session error:', error)
          if (mounted) {
            setState(prev => ({ ...prev, isLoading: false }))
          }
          return
        }

        if (!session?.user) {
          if (mounted) {
            setState({
              user: null,
              profile: null,
              session: null,
              isLoading: false,
              isAuthenticated: false,
              isAdmin: false,
              isMember: false,
            })
          }
          return
        }

        // Fetch profile for authenticated user
        const profile = await fetchProfile(session.user.id)
        
        if (mounted) {
          setState({
            user: session.user,
            profile,
            session,
            isLoading: false,
            isAuthenticated: true,
            isAdmin: profile?.role === 'admin',
            isMember: profile?.role === 'member' || profile?.role === 'admin',
          })
        }
      } catch (error) {
        console.error('Auth init error:', error)
        if (mounted) {
          // Set loading to false even on error - show the page
          setState(prev => ({ ...prev, isLoading: false }))
        }
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return
        
        // Handle sign out
        if (event === 'SIGNED_OUT' || !session?.user) {
          setState({
            user: null,
            profile: null,
            session: null,
            isLoading: false,
            isAuthenticated: false,
            isAdmin: false,
            isMember: false,
          })
          return
        }

        // Handle sign in or user update
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          const profile = await fetchProfile(session.user.id)
          
          if (mounted) {
            setState({
              user: session.user,
              profile,
              session,
              isLoading: false,
              isAuthenticated: true,
              isAdmin: profile?.role === 'admin',
              isMember: profile?.role === 'member' || profile?.role === 'admin',
            })
          }
        }
      }
    )

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty deps - run once on mount

  const refreshProfile = useCallback(async () => {
    if (!state.user) return
    
    // Clear cache
    profileCache.delete(state.user.id)
    
    const profile = await fetchProfile(state.user.id)
    setState(prev => ({
      ...prev,
      profile,
      isAdmin: profile?.role === 'admin',
      isMember: profile?.role === 'member' || profile?.role === 'admin',
    }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user?.id])

  const signOut = useCallback(async () => {
    if (state.user) {
      profileCache.delete(state.user.id)
    }
    await supabase.auth.signOut()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user?.id])

  return (
    <AuthContext.Provider value={{
      ...state,
      signOut,
      refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Convenience hook for components that need to wait for auth to load
export function useRequireAuth() {
  const auth = useAuth()
  return {
    ...auth,
    isReady: !auth.isLoading,
  }
}
