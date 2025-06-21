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

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ShoppingCart, User, Home, Package, Menu, X, BookOpen } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/products", label: "Products", icon: Package },
    { href: "/docs/props-reducers", label: "Docs", icon: BookOpen },
    { href: "/about", label: "About", icon: null },
    { href: "/contact", label: "Contact", icon: null },
  ]

  return (
    <nav className={`sticky top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-sm shadow-md' : 'bg-white shadow-sm'}`}>
      {/* Backdrop for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/20 md:hidden z-[-1]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-blue-600">
            RouteDemo
          </Link>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-blue-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-2">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive(href) 
                    ? "bg-blue-50 text-blue-700" 
                    : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                }`}
              >
                {Icon && <Icon size={16} className="flex-shrink-0" />}
                <span>{label}</span>
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              href="/cart"
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive("/cart") 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <ShoppingCart size={18} className="flex-shrink-0" />
              <span>Cart</span>
            </Link>

            <Link
              href="/profile"
              className={`flex items-center space-x-1.5 px-4 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                isActive("/profile")
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              <User size={18} className="flex-shrink-0" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden fixed top-16 left-0 right-0 bg-white shadow-lg z-40 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 bg-white border-t border-gray-100">
          {navLinks.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`block px-4 py-3 rounded-lg text-base font-medium ${
                isActive(href)
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center space-x-3">
                {Icon && <Icon size={18} className="text-gray-500 flex-shrink-0" />}
                <span>{label}</span>
              </div>
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <Link
              href="/cart"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium ${
                isActive("/cart")
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <ShoppingCart size={18} className="text-gray-500 flex-shrink-0" />
              <span>Cart</span>
            </Link>
            <Link
              href="/profile"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium ${
                isActive("/profile")
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <User size={18} className="text-gray-500 flex-shrink-0" />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
