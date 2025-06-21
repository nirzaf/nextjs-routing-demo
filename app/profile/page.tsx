/**
 * PROFILE PAGE - PROTECTED ROUTE WITH USER DATA
 *
 * This demonstrates:
 * 1. Protected route (handled by middleware)
 * 2. User-specific data rendering
 * 3. Account management interface
 */

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { User, Mail, Phone, MapPin, Package, Heart, Settings } from "lucide-react"
import LogoutButton from "./LogoutButton"

export default async function ProfilePage() {
  // Check authentication
  const cookieStore = cookies()
  const authToken = cookieStore.get("auth-token")

  if (!authToken || authToken.value !== "authenticated") {
    redirect("/login?returnTo=/profile")
  }

  // In a real app, you would fetch user data from a database
  const userData = {
    name: "John Doe",
    email: "demo@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Demo Street, Next.js City, RC 12345",
    joinDate: "2024-01-15",
    orderCount: 12,
    wishlistCount: 5,
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <User className="mr-3" size={32} />
          <h1 className="text-3xl font-bold">My Profile</h1>
        </div>
        <LogoutButton />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="text-gray-400" size={20} />
                <div>
                  <p className="font-medium">{userData.name}</p>
                  <p className="text-sm text-gray-600">Full Name</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-gray-400" size={20} />
                <div>
                  <p className="font-medium">{userData.email}</p>
                  <p className="text-sm text-gray-600">Email Address</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-gray-400" size={20} />
                <div>
                  <p className="font-medium">{userData.phone}</p>
                  <p className="text-sm text-gray-600">Phone Number</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-gray-400" size={20} />
                <div>
                  <p className="font-medium">{userData.address}</p>
                  <p className="text-sm text-gray-600">Address</p>
                </div>
              </div>
            </div>
            <button className="mt-6 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Edit Profile</button>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>
            <div className="space-y-3">
              {[1, 2, 3].map((order) => (
                <div key={order} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Order #{1000 + order}</p>
                    <p className="text-sm text-gray-600">
                      {new Date(Date.now() - order * 86400000).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(Math.random() * 200 + 50).toFixed(2)}</p>
                    <p className="text-sm text-green-600">Delivered</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm">View All Orders →</button>
          </div>
        </div>

        {/* Account Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Account Stats</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Package className="text-blue-600" size={20} />
                  <span>Total Orders</span>
                </div>
                <span className="font-semibold">{userData.orderCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Heart className="text-red-600" size={20} />
                  <span>Wishlist Items</span>
                </div>
                <span className="font-semibold">{userData.wishlistCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="text-green-600" size={20} />
                  <span>Member Since</span>
                </div>
                <span className="font-semibold">{new Date(userData.joinDate).getFullYear()}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center space-x-2 p-3 text-left hover:bg-gray-50 rounded-lg">
                <Package size={20} />
                <span>View Orders</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-3 text-left hover:bg-gray-50 rounded-lg">
                <Heart size={20} />
                <span>My Wishlist</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-3 text-left hover:bg-gray-50 rounded-lg">
                <Settings size={20} />
                <span>Account Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Protected Route Information */}
      <div className="mt-12 p-6 bg-red-50 rounded-lg">
        <h3 className="font-semibold mb-2">🔒 Protected Route Example</h3>
        <p className="text-sm text-gray-600 mb-2">This page is protected by middleware and requires authentication.</p>
        <p className="text-sm text-gray-600">Unauthenticated users are automatically redirected to the login page.</p>
      </div>
    </div>
  )
}
