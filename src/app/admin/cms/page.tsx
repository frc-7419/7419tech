import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { CMSAccessClient } from './CMSAccessClient'

export default async function CMSRedirectPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirectTo=/admin/cms')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || profile?.role !== 'admin') {
    redirect('/auth/unauthorized')
  }

  return <CMSAccessClient />
}
