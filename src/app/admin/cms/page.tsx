import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Profile } from '@/lib/supabase/types'
import { CMSAccessClient } from './CMSAccessClient'

export default async function CMSRedirectPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirectTo=/admin/cms')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()
    
  const typedProfile = profile as Profile | null

  if (typedProfile?.role !== 'admin') {
    redirect('/auth/unauthorized')
  }

  return (
    <CMSAccessClient 
      user={{
        email: user.email!,
        name: typedProfile.name || 'Admin User'
      }}
    />
  )
}
