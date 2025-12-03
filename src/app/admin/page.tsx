import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { Profile } from '@/lib/supabase/types'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirectTo=/admin')
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

  return <AdminDashboard user={user} profile={typedProfile} />
}
