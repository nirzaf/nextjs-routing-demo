/**
 * NAVIGATION COMPONENT
 *
 * Demonstrates the use of Next.js Link component for client-side navigation.
 * The Link component provides:
 * 1. Client-side navigation (SPA behavior)
 * 2. Prefetching for better performance
 * 3. Active link styling
 */

"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Home, Package } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/about", label: "About", icon: null },
    { href: "/contact", label: "Contact", icon: null },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            RouteDemo
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                  isActive(href) ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
                }`}
              >
                {Icon && <Icon size={18} />}
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive("/cart") ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              <ShoppingCart size={18} />
              <span className="hidden sm:inline">Cart</span>
            </Link>

            <Link
              href="/profile"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
                isActive("/profile")
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-100"
              }`}
            >
              <User size={18} />
              <span className="hidden sm:inline">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
