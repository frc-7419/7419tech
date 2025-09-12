'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { LogOut, Users, Settings, BarChart3 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NavHeader } from '@/components/NavHeader'
import { Profile } from '@/lib/supabase/types'
import { User } from '@supabase/supabase-js'

interface AdminDashboardProps {
  user: User
  profile: Profile
}

export function AdminDashboard({ user, profile }: AdminDashboardProps) {
  const [pendingUsers, setPendingUsers] = useState<Profile[]>([])
  const [allUsers, setAllUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      // Fetch pending users
      const { data: pending } = await supabase
        .from('profiles')
        .select('*')
        .eq('approved', false)
        .order('created_at', { ascending: false })

      // Fetch all users
      const { data: all } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      setPendingUsers(pending || [])
      setAllUsers(all || [])
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const approveUser = async (userId: string, newRole: 'member' | 'admin' = 'member') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          approved: true,
          role: newRole
        })
        .eq('id', userId)

      if (error) throw error

      // Refresh user lists
      await fetchUsers()
    } catch (error) {
      console.error('Error approving user:', error)
    }
  }

  const updateUserRole = async (userId: string, newRole: 'public' | 'member' | 'admin') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)

      if (error) throw error

      // Refresh user lists
      await fetchUsers()
    } catch (error) {
      console.error('Error updating user role:', error)
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'member':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <>
      <NavHeader />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Welcome back, {profile.name || user.email}
                </p>
              </div>
              <Button onClick={handleSignOut} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingUsers.length}</div>
                <p className="text-xs text-muted-foreground">
                  Users waiting for approval
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allUsers.length}</div>
                <p className="text-xs text-muted-foreground">
                  All registered users
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {allUsers.filter(u => u.approved && (u.role === 'member' || u.role === 'admin')).length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Approved team members
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="pending" className="space-y-4">
            <TabsList>
              <TabsTrigger value="pending">
                Pending Approvals ({pendingUsers.length})
              </TabsTrigger>
              <TabsTrigger value="users">All Users ({allUsers.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending User Approvals</CardTitle>
                  <CardDescription>
                    Review and approve new user registrations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p>Loading...</p>
                  ) : pendingUsers.length === 0 ? (
                    <p className="text-gray-500">No pending approvals</p>
                  ) : (
                    <div className="space-y-4">
                      {pendingUsers.map((pendingUser) => (
                        <div
                          key={pendingUser.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{pendingUser.name}</h3>
                              <Badge className={getRoleBadgeColor(pendingUser.role)}>
                                {pendingUser.role}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{pendingUser.email}</p>
                            <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                              <span>Grad: {pendingUser.graduation_year}</span>
                              <span>Dept: {pendingUser.department}</span>
                              <span>Registered: {new Date(pendingUser.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => approveUser(pendingUser.id, 'member')}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Approve as Member
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => approveUser(pendingUser.id, 'admin')}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Approve as Admin
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>
                    Manage all registered users and their roles
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="space-y-4">
                      {allUsers.map((userProfile) => (
                        <div
                          key={userProfile.id}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium">{userProfile.name}</h3>
                              <Badge className={getRoleBadgeColor(userProfile.role)}>
                                {userProfile.role}
                              </Badge>
                              {!userProfile.approved && (
                                <Badge variant="outline" className="text-yellow-600">
                                  Pending
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">{userProfile.email}</p>
                            <div className="flex space-x-4 text-xs text-gray-500 mt-1">
                              <span>Grad: {userProfile.graduation_year}</span>
                              <span>Dept: {userProfile.department}</span>
                              <span>Registered: {new Date(userProfile.created_at).toLocaleDateString()}</span>
                            </div>
                          </div>
                          {userProfile.approved && (
                            <div className="flex space-x-2">
                              <select
                                value={userProfile.role}
                                onChange={(e) => updateUserRole(userProfile.id, e.target.value as any)}
                                className="text-sm border rounded px-2 py-1"
                              >
                                <option value="public">Public</option>
                                <option value="member">Member</option>
                                <option value="admin">Admin</option>
                              </select>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
