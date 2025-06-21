/**
 * PARALLEL ROUTE: USER INFORMATION
 * 
 * This component is rendered in the @user slot of the dashboard layout.
 * It demonstrates how parallel routes can manage different types of content
 * independently, with their own data fetching and state management.
 * 
 * Key Features:
 * - Independent data fetching from @analytics slot
 * - Separate loading and error states
 * - Can be updated without affecting other parallel routes
 * - Demonstrates real-world dashboard composition
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Mail, MapPin, Calendar, Settings, Bell, Shield } from "lucide-react"
import { mockUsers } from "@/lib/data"

// Simulate async user data fetching
async function getUserData() {
  // Simulate API delay (different from analytics)
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    ...mockUsers[0], // Use first user from the array
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    accountStatus: "Premium",
    notifications: 3,
    recentActivity: [
      { action: "Viewed product", item: "Wireless Headphones", time: "2 minutes ago" },
      { action: "Added to cart", item: "Smart Watch", time: "1 hour ago" },
      { action: "Completed order", item: "USB-C Cable", time: "3 hours ago" },
      { action: "Updated profile", item: "Personal information", time: "1 day ago" },
    ],
    preferences: {
      emailNotifications: true,
      pushNotifications: false,
      marketingEmails: true,
      theme: "light"
    }
  }
}

export default async function UserPage() {
  const userData = await getUserData()

  return (
    <div className="space-y-4">
      {/* User Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            User Profile
          </CardTitle>
          <CardDescription>
            Current user information and account status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* User Info */}
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg" alt={userData.name} />
                <AvatarFallback className="text-lg">
                  {userData.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h3 className="font-semibold text-lg">{userData.name}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {userData.email}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{userData.accountStatus}</Badge>
                  <Badge variant="outline" className="text-xs">
                    <Bell className="h-3 w-3 mr-1" />
                    {userData.notifications} notifications
                  </Badge>
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className="grid gap-3 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Last Login</span>
                </div>
                <span className="font-medium">
                  {userData.lastLogin.toLocaleString()}
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span>Account Security</span>
                </div>
                <Badge variant="default" className="text-xs">Verified</Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>Location</span>
                </div>
                <span className="font-medium">San Francisco, CA</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
          <CardDescription>
            Your latest actions and interactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-sm font-medium">{activity.action}</div>
                  <div className="text-xs text-muted-foreground">{activity.item}</div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
          <CardDescription>
            Manage your account and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              <Settings className="h-4 w-4 mr-2" />
              Account Settings
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Notification Preferences
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              <Shield className="h-4 w-4 mr-2" />
              Security Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Parallel Route Info */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              👤 This is a Parallel Route
            </div>
            <p className="text-xs text-muted-foreground">
              Rendered independently in the @user slot with separate data fetching
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}