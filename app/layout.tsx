import type React from "react"
/**
 * ROOT LAYOUT
 *
 * This is the root layout that wraps all pages in the App Router.
 * It demonstrates:
 * 1. Global layout structure
 * 2. Metadata configuration
 * 3. Font optimization
 */

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "./components/Navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Next.js Routing Demo - E-commerce",
  description: "A comprehensive demonstration of Next.js routing concepts",
  keywords: ["Next.js", "React", "TypeScript", "E-commerce", "Routing"],
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <div className="min-h-screen flex flex-col">
          {/* Global Navigation */}
          <Navigation />

          {/* Main Content */}
          <main className="flex-grow pt-16 md:pt-20">
            <div className="container mx-auto px-4 py-6">
              {children}
            </div>
          </main>

          {/* Global Footer */}
          <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto px-4 text-center">
              <p className="text-sm md:text-base">&copy; 2024 Next.js Routing Demo. Built for educational purposes.</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
