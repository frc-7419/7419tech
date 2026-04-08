'use client'

import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Profile } from '@/lib/supabase/types'

type SupabaseClient = NonNullable<ReturnType<typeof createClient>>

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
  /** null when Supabase env vars are missing — auth routes must guard before use */
  supabase: SupabaseClient | null
}

const AuthContext = createContext<AuthContextType | null>(null)

const DEGRADED_AUTH_VALUE: AuthContextType = {
  user: null, profile: null, session: null,
  isLoading: false, isAuthenticated: false,
  isAdmin: false, isMember: false,
  signOut: async () => {}, refreshProfile: async () => {},
  supabase: null,
}

function AuthProviderInner({ supabase, children }: { supabase: SupabaseClient, children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  // Avoid refetching the same profile unnecessarily (and dedupe concurrent calls).
  const lastProfileUserIdRef = useRef<string | null>(null)
  const inFlightProfileFetchRef = useRef<Promise<void> | null>(null)

  const buildProfileSeed = useCallback((authUser: User) => {
    const metadata = authUser.user_metadata ?? {}
    const graduationYear =
      typeof metadata.graduation_year === 'number'
        ? metadata.graduation_year
        : typeof metadata.graduation_year === 'string'
          ? parseInt(metadata.graduation_year, 10)
          : null

    return {
      id: authUser.id,
      email: authUser.email ?? '',
      name: typeof metadata.name === 'string' ? metadata.name : null,
      graduation_year: Number.isNaN(graduationYear) ? null : graduationYear,
      department: typeof metadata.department === 'string' ? metadata.department : null,
      role: 'public' as const,
    }
  }, [])

  const fetchProfile = useCallback(async (authUser: User, options?: { force?: boolean }) => {
    try {
      // Dedupe in-flight fetches for the same user.
      if (!options?.force && lastProfileUserIdRef.current === authUser.id) {
        return
      }
      if (inFlightProfileFetchRef.current) {
        return await inFlightProfileFetchRef.current
      }

      const task = (async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single()

        if (error) {
          const isMissingProfile = error.code === 'PGRST116'
          if (!isMissingProfile) {
            console.error('Failed to fetch user profile:', error.message)
            setProfile(null)
            return
          }

          const seed = buildProfileSeed(authUser)
          if (!seed.email) {
            console.error('Cannot create profile without an email address.')
            setProfile(null)
            return
          }

          const { error: insertError } = await supabase
            .from('profiles')
            .insert(seed)

          if (insertError) {
            console.error('Failed to create user profile:', insertError.message)
            setProfile(null)
            return
          }

          const { data: createdProfile, error: fetchError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', authUser.id)
            .single()

          if (fetchError) {
            console.error('Failed to fetch newly created profile:', fetchError.message)
            setProfile(null)
          } else {
            setProfile(createdProfile as Profile | null)
            lastProfileUserIdRef.current = authUser.id
          }
        } else {
          setProfile(data as Profile | null)
          lastProfileUserIdRef.current = authUser.id
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
  }, [supabase, buildProfileSeed])

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchProfile(session.user, { force: true })
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
          const authUser = session.user
          const userChanged = lastProfileUserIdRef.current !== authUser.id
          const shouldFetch =
            userChanged ||
            event === 'SIGNED_IN' ||
            event === 'USER_UPDATED' ||
            event === 'PASSWORD_RECOVERY'

          if (shouldFetch) {
            fetchProfile(authUser)
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
    if (user) await fetchProfile(user)
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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), [])

  if (!supabase) {
    return (
      <AuthContext.Provider value={DEGRADED_AUTH_VALUE}>
        {children}
      </AuthContext.Provider>
    )
  }

  return <AuthProviderInner supabase={supabase}>{children}</AuthProviderInner>
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
