'use client'

import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/lib/supabase/types'

interface AuthContextType {
  user: User | null
  profile: Profile | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  isMember: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
  supabase: ReturnType<typeof createClient>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const router = useRouter()
  const supabase = useMemo(() => createClient(), [])

  // Avoid refetching the same profile unnecessarily (and dedupe concurrent calls).
  const lastProfileUserIdRef = useRef<string | null>(null)
  const inFlightProfileFetchRef = useRef<Promise<void> | null>(null)

  const fetchProfile = useCallback(async (userId: string, options?: { force?: boolean }) => {
    try {
      // Dedupe in-flight fetches for the same user.
      if (!options?.force && lastProfileUserIdRef.current === userId && profile) {
        return
      }
      if (inFlightProfileFetchRef.current) {
        return await inFlightProfileFetchRef.current
      }

      const task = (async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) {
        console.error('Failed to fetch user profile:', error.message)
        setProfile(null)
      } else {
        setProfile(data as Profile | null)
        lastProfileUserIdRef.current = userId
      }
      })()

      inFlightProfileFetchRef.current = task
      await task
    } catch (err) {
      console.error('Unexpected error fetching profile:', err)
      setProfile(null)
    } finally {
      inFlightProfileFetchRef.current = null
      setIsLoading(false)
    }
  }, [supabase, profile])

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user.id, { force: true })
      } else {
        setIsLoading(false)
      }
    })

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        if (session?.user) {
          // IMPORTANT: don't refetch the profile on every token refresh.
          // Fetch only when it can actually change (sign-in/user update) or if user changes.
          const userId = session.user.id
          const userChanged = lastProfileUserIdRef.current !== userId
          const shouldFetch =
            userChanged ||
            event === 'SIGNED_IN' ||
            event === 'USER_UPDATED' ||
            event === 'PASSWORD_RECOVERY'

          if (shouldFetch) {
            fetchProfile(userId)
          } else {
            // Auth state updated but profile is still valid; ensure we don't show loading spinners.
            setIsLoading(false)
          }
        } else {
          setProfile(null)
          lastProfileUserIdRef.current = null
          setIsLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase, fetchProfile])

  const refreshProfile = useCallback(async () => {
    if (user) await fetchProfile(user.id)
  }, [user, fetchProfile])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }, [supabase, router])

  const value: AuthContextType = {
    user,
    profile,
    session,
    isLoading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isMember: profile?.role === 'member' || profile?.role === 'admin',
    signOut,
    refreshProfile,
    supabase,
  }

  return (
    <AuthContext.Provider value={value}>
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

export function useRequireAuth() {
  const auth = useAuth()
  return { ...auth, isReady: !auth.isLoading }
}
