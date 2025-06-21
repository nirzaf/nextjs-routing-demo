/**
 * ROUTE GROUPS AND PARALLEL ROUTES DEMO
 * 
 * This demonstrates advanced Next.js App Router features:
 * 1. Route Groups: (overview) - Groups routes without affecting URL structure
 * 2. Parallel Routes: @analytics and @user - Render multiple components simultaneously
 * 3. Layout composition with parallel slots
 * 
 * Route Groups:
 * - Folders wrapped in parentheses like (overview) don't appear in the URL
 * - Used for organizing routes logically without affecting the URL structure
 * - Useful for grouping related routes or creating different layouts
 * 
 * Parallel Routes:
 * - Allow rendering multiple pages in the same layout simultaneously
 * - Defined with @folder syntax (e.g., @analytics, @user)
 * - Each parallel route can have its own loading, error, and not-found states
 * - Perfect for dashboards, modals, or complex UI compositions
 */

import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Users, TrendingUp, Activity } from "lucide-react"
import Link from "next/link"

export default function DashboardOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">
            Demonstrating Route Groups and Parallel Routes in Next.js App Router
          </p>
        </div>
      </div>

      {/* Route Groups Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Route Groups Demo
          </CardTitle>
          <CardDescription>
            This page is inside a (overview) route group, which doesn't affect the URL structure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Current URL Structure:</h3>
              <code className="block bg-muted p-2 rounded text-sm">
                /dashboard → app/dashboard/(overview)/page.tsx
              </code>
              <p className="text-sm text-muted-foreground">
                The (overview) folder groups this route logically but doesn't appear in the URL
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Benefits:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Organize routes without affecting URLs</li>
                <li>• Create different layouts for route groups</li>
                <li>• Logical separation of concerns</li>
                <li>• Better code organization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parallel Routes Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Parallel Routes Demo
          </CardTitle>
          <CardDescription>
            The layout renders @analytics and @user slots simultaneously
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Parallel Slots:</h3>
              <div className="space-y-1 text-sm">
                <code className="block bg-muted p-1 rounded">@analytics → Analytics Component</code>
                <code className="block bg-muted p-1 rounded">@user → User Info Component</code>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Use Cases:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Dashboard layouts with multiple sections</li>
                <li>• Modal overlays with intercepting routes</li>
                <li>• Complex UI compositions</li>
                <li>• Independent loading states</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Links */}
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/dashboard/settings">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5" />
                Settings
              </CardTitle>
              <CardDescription>
                Navigate to dashboard settings (different route group)
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/products">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5" />
                Products
              </CardTitle>
              <CardDescription>
                Back to products with catch-all routes
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5" />
                Home
              </CardTitle>
              <CardDescription>
                Return to the main page
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  )
}