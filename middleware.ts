/**
 * MIDDLEWARE FOR ROUTING
 *
 * Middleware in Next.js runs before a request is completed.
 * It allows you to run code before rendering a page, making it perfect for:
 * - Authentication checks
 * - Redirects
 * - Request/response modification
 * - Logging
 *
 * This middleware demonstrates:
 * 1. Authentication checks for protected routes
 * 2. Redirects based on user state
 * 3. Request logging
 */

import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Log all requests for debugging
  console.log(`${request.method} ${request.url}`)

  // Get the pathname from the request
  const { pathname } = request.nextUrl

  // Check if user is authenticated (in a real app, this would check a JWT token or session)
  const isAuthenticated = request.cookies.get("auth-token")?.value === "authenticated"

  // Protected routes that require authentication
  const protectedRoutes = ["/cart", "/profile", "/orders"]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // If trying to access a protected route without authentication
  if (isProtectedRoute && !isAuthenticated) {
    // Redirect to login page with return URL
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("returnTo", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If authenticated user tries to access login page, redirect to home
  if (pathname === "/login" && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Add custom headers for demonstration
  const response = NextResponse.next()
  response.headers.set("X-Custom-Header", "Next.js Routing Demo")

  return response
}

// Configure which paths the middleware should run on
export const config = {
  // Match all paths except static files and API routes
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
