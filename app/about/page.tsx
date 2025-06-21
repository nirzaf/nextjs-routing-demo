/**
 * ABOUT PAGE - FILE-BASED ROUTING
 *
 * This demonstrates basic file-based routing in Next.js App Router.
 * The file path app/about/page.tsx automatically creates the route /about
 *
 * This page uses Static Site Generation (SSG) by default since it doesn't
 * fetch dynamic data or use dynamic functions.
 */

import { Code, FileText, Zap, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About This Demo</h1>
        <p className="text-xl text-gray-600">A comprehensive demonstration of Next.js routing concepts</p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Code className="text-blue-600 mb-4" size={48} />
          <h2 className="text-2xl font-semibold mb-3">Built with Next.js</h2>
          <p className="text-gray-600">
            This project showcases the powerful routing capabilities of Next.js, including file-based routing, dynamic
            routes, API routes, and more.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <FileText className="text-green-600 mb-4" size={48} />
          <h2 className="text-2xl font-semibold mb-3">Educational Purpose</h2>
          <p className="text-gray-600">
            Every route and component is thoroughly documented with comments explaining the concepts being demonstrated.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Zap className="text-yellow-600 mb-4" size={48} />
          <h2 className="text-2xl font-semibold mb-3">Performance Optimized</h2>
          <p className="text-gray-600">
            Demonstrates SSG, SSR, and ISR for optimal performance in different scenarios.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="text-purple-600 mb-4" size={48} />
          <h2 className="text-2xl font-semibold mb-3">Real-world Example</h2>
          <p className="text-gray-600">
            Uses an e-commerce site structure to demonstrate routing concepts in a practical, relatable context.
          </p>
        </div>
      </div>

      {/* Routes Implementation Table */}
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Routes Implementation in This Project</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Route Type</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Relevant Page/Component</th>
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Section #Workspace</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium text-blue-600">File-based Routing</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/about/page.tsx</code><br/>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/contact/page.tsx</code><br/>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/cart/page.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Static pages with automatic route creation based on file structure
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-green-600">Dynamic Routes</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/products/[id]/page.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Individual product pages with dynamic ID parameters
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium text-yellow-600">Catch-all Routes</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/products/category/[...slug]/page.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Product categories with nested subcategories
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-purple-600">Optional Catch-all Routes</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/docs/[[...slug]]/page.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Documentation system with flexible URL structures
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium text-red-600">API Routes</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/api/products/route.ts</code><br/>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/api/products/[id]/route.ts</code><br/>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/api/search/[...query]/route.ts</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  RESTful API endpoints for data operations
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-indigo-600">Parallel Routes</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/dashboard/@analytics/page.tsx</code><br/>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/dashboard/@user/page.tsx</code><br/>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/dashboard/layout.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Dashboard with multiple sections rendered simultaneously
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium text-pink-600">Route Groups</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/dashboard/(overview)/page.tsx</code><br/>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/dashboard/(settings)/settings/page.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Logical organization without affecting URL structure
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-teal-600">Intercepting Routes</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/products/(.)modal/[id]/page.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Product modal overlay when navigating from products list
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium text-orange-600">Server-Side Rendering (SSR)</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/login/page.tsx</code><br/>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/profile/page.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Dynamic pages with server-side data fetching
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-cyan-600">Incremental Static Regeneration (ISR)</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/products/page.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Products listing with 60-second revalidation
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium text-gray-600">Static Site Generation (SSG)</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/about/page.tsx</code><br/>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/page.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Static pages generated at build time
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-violet-600">Custom Routes (next.config.js)</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">next.config.mjs</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Redirects, rewrites, and custom headers configuration
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-3 font-medium text-emerald-600">Middleware</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">middleware.ts</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Authentication and request processing before route handling
                </td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 px-4 py-3 font-medium text-rose-600">Loading & Error States</td>
                <td className="border border-gray-300 px-4 py-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/login/loading.tsx</code><br/>
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm">app/dashboard/layout.tsx</code>
                </td>
                <td className="border border-gray-300 px-4 py-3 text-gray-600">
                  Special files for loading states and error boundaries
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">📚 Additional Resources</h3>
          <p className="text-blue-700 text-sm">
            For detailed implementation examples and advanced patterns, see the 
            <code className="bg-blue-100 px-2 py-1 rounded mx-1">ADVANCED_ROUTING.md</code> 
            file in the project root.
          </p>
        </div>
      </div>
    </div>
  )
}
