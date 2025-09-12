import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { NavHeader } from '@/components/NavHeader'

export default function UnauthorizedPage() {
  return (
    <>
      <NavHeader />
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <Card>
            <CardHeader className="text-center">
              <AlertTriangle className="mx-auto h-12 w-12 text-yellow-500 mb-4" />
              <CardTitle className="text-red-600">Access Denied</CardTitle>
              <CardDescription>
                You don't have permission to access this area
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm text-gray-600">
                This area is restricted to approved team members and administrators only.
              </p>
              <p className="text-sm text-gray-600">
                If you believe you should have access, please contact a team administrator.
              </p>
              <div className="space-y-2">
                <Button asChild className="w-full">
                  <Link href="/">Return Home</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/auth/login">Try Different Account</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
