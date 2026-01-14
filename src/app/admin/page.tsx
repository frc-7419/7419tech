import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminDashboard } from '@/components/admin/AdminDashboard'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login?redirectTo=/admin')
  }

  // Admin authz is enforced by middleware; avoid redundant per-request DB reads here.
  return <AdminDashboard />
}
