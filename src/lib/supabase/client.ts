import { createBrowserClient } from '@supabase/ssr'
import type { Database } from './types'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    // Log clearly for developers, but do NOT throw — throwing here crashes the
    // entire app via AuthProvider's useMemo, taking down all public pages too.
    console.error(
      '[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Auth features will be disabled.'
    )
    return null
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}

// Alias for backwards compatibility
export const getSupabaseClient = createClient
