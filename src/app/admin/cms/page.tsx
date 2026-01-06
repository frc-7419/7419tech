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

  // Admin authz is enforced by middleware; avoid redundant per-request DB reads here.
  return <CMSAccessClient />
}
