'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { LogOut, Users, Settings, BarChart3, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { NavHeader } from '@/components/NavHeader'
import { Profile } from '@/lib/supabase/types'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/contexts/AuthContext'

export function AdminDashboard() {
  const [pendingUsers, setPendingUsers] = useState<Profile[]>([])
  const [allUsers, setAllUsers] = useState<Profile[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const { signOut, supabase, user, profile, isLoading: authLoading } = useAuth()

  // Middleware protects this route, but keep a safe UI state while auth/profile loads.
  if (authLoading || !user) {
    return (
      <>
        <NavHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-600">Loading...</p>
        </div>
      </>
    )
  }

  const fetchUsers = useCallback(async () => {
    try {
      // Fetch pending users (public role = pending approval)
      const { data: pending } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'public')
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
  }, [supabase])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
    router.refresh()
  }

  const approveUser = async (userId: string, newRole: 'member' | 'admin' = 'member') => {
    setActionLoading(userId)
    try {
      const response = await fetch('/api/admin/update-user-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          newRole
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update user role')
      }

      toast({
        title: "User approved",
        description: `User has been approved as ${newRole}.`,
      })

      // Refresh user lists
      await fetchUsers()
    } catch (error) {
      console.error('Error approving user:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to approve user. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
    }
  }

  const updateUserRole = async (userId: string, newRole: 'public' | 'member' | 'admin') => {
    setActionLoading(userId)
    try {
      const response = await fetch('/api/admin/update-user-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          newRole
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update user role')
      }

      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}.`,
      })

      // Refresh user lists
      await fetchUsers()
    } catch (error) {
      console.error('Error updating user role:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update user role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setActionLoading(null)
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
        <div className="max-w-7xl mx-auto pt-32 pb-6 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="mt-1 text-sm text-gray-600">
                  Welcome back, {profile?.name || user.email}
                </p>
              </div>
              <Button onClick={handleSignOut} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
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
                  {allUsers.filter(u => u.role === 'member' || u.role === 'admin').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Approved team members
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content Management</CardTitle>
                <FileText className="h-4 w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">CMS</div>
                <p className="text-xs opacity-90 mb-3">
                  Manage website content
                </p>
                <Button 
                  size="sm"
                  className="w-full bg-white/20 hover:bg-white/30 border-white/30"
                  onClick={() => window.open('/admin/cms', '_blank')}
                >
                  Open CMS Manager
                </Button>
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
                              disabled={actionLoading === pendingUser.id}
                            >
                              {actionLoading === pendingUser.id ? 'Approving...' : 'Approve as Member'}
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => approveUser(pendingUser.id, 'admin')}
                              className="bg-blue-600 hover:bg-blue-700"
                              disabled={actionLoading === pendingUser.id}
                            >
                              {actionLoading === pendingUser.id ? 'Approving...' : 'Approve as Admin'}
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
                              {userProfile.role === 'public' && (
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
                          {userProfile.role !== 'public' && (
                            <div className="flex space-x-2">
                              <select
                                value={userProfile.role}
                                onChange={(e) => updateUserRole(userProfile.id, e.target.value as 'public' | 'member' | 'admin')}
                                className="text-sm border rounded px-2 py-1"
                                disabled={actionLoading === userProfile.id}
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
