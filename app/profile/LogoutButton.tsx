/**
 * LOGOUT BUTTON - CLIENT COMPONENT
 *
 * This client component handles user logout functionality.
 */

"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    // Remove authentication cookie
    document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT"

    // Redirect to home page
    router.push("/")
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
    >
      <LogOut size={18} />
      <span>Logout</span>
    </button>
  )
}
