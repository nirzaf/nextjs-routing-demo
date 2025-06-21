/**
 * PRODUCTS PAGE - INCREMENTAL STATIC REGENERATION (ISR)
 *
 * This demonstrates:
 * 1. Nested routing (app/products/page.tsx -> /products)
 * 2. Incremental Static Regeneration (ISR) for dynamic content
 * 3. Search functionality
 * 4. Category filtering
 *
 * ISR allows you to update static content after build time,
 * perfect for product catalogs that change frequently.
 */

import Link from "next/link"
import { mockProducts } from "@/lib/data"
import { Grid, List } from "lucide-react"
import ProductsClient from "./ProductsClient"

// This page will be statically generated at build time
// and revalidated every 60 seconds (ISR)
export const revalidate = 60

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { search?: string; category?: string; view?: string }
}) {
  let products = mockProducts

  const { search, category, view } = await searchParams

  // Filter by search query
  if (search) {
    const query = search.toLowerCase()
    products = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query),
    )
  }

  // Filter by category
  if (category) {
    products = products.filter((product) => product.category === category)
  }

  // Get unique categories for filter
  const categories = Array.from(new Set(mockProducts.map((p) => p.category)))

  return (
    <div>
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-600 mt-2">Discover our amazing collection of products</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2">
          <Link
            href="/products?view=grid"
            className={`p-2 rounded ${view !== "list" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
          >
            <Grid size={20} />
          </Link>
          <Link
            href="/products?view=list"
            className={`p-2 rounded ${view === "list" ? "bg-blue-100 text-blue-600" : "text-gray-600"}`}
          >
            <List size={20} />
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <ProductsClient initialProducts={products} categories={categories} searchParams={{ search, category, view }} />

      {/* Products Grid/List */}
      <div className="mt-8">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className={view === "list" ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
            {products.map((product) => (
              <div key={product.id} className={`border rounded-lg p-4 ${view === "list" ? "flex space-x-4" : ""}`}>
                <div className={view === "list" ? "flex-shrink-0" : ""}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`rounded-lg object-cover ${view === "list" ? "w-24 h-24" : "w-full h-48"}`}
                  />
                </div>
                <div className={`${view === "list" ? "flex-1" : "mt-4"}`}>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <p className="text-blue-600 font-medium mt-2">${product.price}</p>
                  <div className="mt-4">
                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/products/${product.id}`}>
                        <button className="w-full px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center justify-center">
                          <span className="mr-2">👁</span>
                          Modal View
                        </button>
                      </Link>
                      <Link href={`/products/${product.id}`}>
                        <button className="w-full px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                          Full Page
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Routing Examples */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Routing Examples</h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium mb-2">Dynamic Routes:</h3>
            <ul className="space-y-1">
              <li>
                •{" "}
                <Link href="/products/1" className="text-blue-600 hover:underline">
                  /products/1
                </Link>{" "}
                - Product detail
              </li>
              <li>
                •{" "}
                <Link href="/products/2" className="text-blue-600 hover:underline">
                  /products/2
                </Link>{" "}
                - Another product
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-2">Catch-all Routes:</h3>
            <ul className="space-y-1">
              <li>
                •{" "}
                <Link href="/products/category/electronics" className="text-blue-600 hover:underline">
                  /products/category/electronics
                </Link>
              </li>
              <li>
                •{" "}
                <Link href="/products/category/clothing/shirts" className="text-blue-600 hover:underline">
                  /products/category/clothing/shirts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
