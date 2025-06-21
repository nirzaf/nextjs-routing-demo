/**
 * ROUTE GROUPS: SETTINGS PAGE
 * 
 * This page demonstrates route groups by being organized in a (settings) group.
 * Route groups allow you to:
 * 1. Organize routes logically without affecting URL structure
 * 2. Apply different layouts to different route groups
 * 3. Create cleaner file organization
 * 
 * File Structure:
 * app/dashboard/(overview)/page.tsx → /dashboard
 * app/dashboard/(settings)/settings/page.tsx → /dashboard/settings
 * 
 * The (overview) and (settings) folders are route groups that don't appear in URLs
 * but help organize the codebase logically.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  ArrowLeft,
  Save
} from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and application settings
          </p>
        </div>
      </div>

      {/* Route Group Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Route Groups Demo
          </CardTitle>
          <CardDescription>
            This page is in a (settings) route group, separate from the (overview) group
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">File Organization:</h3>
              <div className="text-sm font-mono bg-muted p-3 rounded space-y-1">
                <div>app/dashboard/</div>
                <div>├── (overview)/</div>
                <div>│   └── page.tsx → /dashboard</div>
                <div>├── (settings)/</div>
                <div>│   └── settings/page.tsx → /dashboard/settings</div>
                <div>├── @analytics/page.tsx</div>
                <div>├── @user/page.tsx</div>
                <div>└── layout.tsx</div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Benefits:</h3>
              <ul className="text-sm space-y-1">
                <li>• <Badge variant="secondary" className="text-xs mr-2">Organization</Badge>Logical grouping of related routes</li>
                <li>• <Badge variant="secondary" className="text-xs mr-2">Clean URLs</Badge>Groups don't affect URL structure</li>
                <li>• <Badge variant="secondary" className="text-xs mr-2">Layouts</Badge>Different layouts per route group</li>
                <li>• <Badge variant="secondary" className="text-xs mr-2">Maintenance</Badge>Easier code organization</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Settings
            </CardTitle>
            <CardDescription>
              Update your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input id="bio" placeholder="Tell us about yourself" />
            </div>
            <Button size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Profile
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Email Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive push notifications</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Marketing Emails</Label>
                <p className="text-sm text-muted-foreground">Receive promotional content</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security
            </CardTitle>
            <CardDescription>
              Manage your account security
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>
            <Button size="sm" variant="outline">
              Update Security
            </Button>
          </CardContent>
        </Card>

        {/* Appearance Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Compact Mode</Label>
                <p className="text-sm text-muted-foreground">Reduce spacing and padding</p>
              </div>
              <Switch />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Language</Label>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">English (US)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Save All Changes */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Save Changes</h3>
              <p className="text-sm text-muted-foreground">
                Make sure to save your changes before leaving this page
              </p>
            </div>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save All Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}