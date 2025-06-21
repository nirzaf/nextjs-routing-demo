/**
 * DASHBOARD LAYOUT WITH PARALLEL ROUTES
 * 
 * This layout demonstrates parallel routes by accepting multiple slots:
 * - children: The main page content
 * - analytics: Analytics dashboard component (@analytics slot)
 * - user: User information component (@user slot)
 * 
 * Parallel routes allow rendering multiple pages in the same layout simultaneously.
 * Each slot can have its own loading, error, and not-found states.
 */

import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface DashboardLayoutProps {
  children: React.ReactNode
  analytics: React.ReactNode
  user: React.ReactNode
}

export default function DashboardLayout({
  children,
  analytics,
  user,
}: DashboardLayoutProps) {
  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Main Content */}
      <div className="space-y-6">
        {children}
      </div>

      {/* Parallel Routes Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Analytics Slot */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Analytics Dashboard</h2>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
              @analytics slot
            </span>
          </div>
          <Suspense fallback={<AnalyticsLoading />}>
            {analytics}
          </Suspense>
        </div>

        {/* User Info Slot */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">User Information</h2>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
              @user slot
            </span>
          </div>
          <Suspense fallback={<UserInfoLoading />}>
            {user}
          </Suspense>
        </div>
      </div>

      {/* Explanation Card */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>How This Layout Works</CardTitle>
          <CardDescription>
            This layout demonstrates the power of parallel routes in Next.js App Router
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">File Structure:</h3>
              <div className="text-xs space-y-1 font-mono bg-muted p-2 rounded">
                <div>app/dashboard/</div>
                <div>├── layout.tsx</div>
                <div>├── (overview)/page.tsx</div>
                <div>├── @analytics/page.tsx</div>
                <div>└── @user/page.tsx</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Layout Props:</h3>
              <div className="text-xs space-y-1">
                <div>• <code>children</code> - Main page content</div>
                <div>• <code>analytics</code> - @analytics slot</div>
                <div>• <code>user</code> - @user slot</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-sm">Benefits:</h3>
              <div className="text-xs space-y-1">
                <div>• Independent loading states</div>
                <div>• Separate error boundaries</div>
                <div>• Modular composition</div>
                <div>• Better user experience</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Loading components for parallel routes
function AnalyticsLoading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[200px]" />
        <Skeleton className="h-3 w-[150px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
    </Card>
  )
}

function UserInfoLoading() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[180px]" />
        <Skeleton className="h-3 w-[120px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  )
}