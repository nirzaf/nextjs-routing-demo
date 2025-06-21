/**
 * CATEGORY PAGE - CATCH-ALL ROUTES
 *
 * This demonstrates catch-all routes using [...slug] syntax.
 * This route can match:
 * - /products/category/electronics
 * - /products/category/clothing/shirts
 * - /products/category/home/kitchen/appliances
 *
 * The slug parameter will be an array containing all path segments.
 */

import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { mockProducts } from "@/lib/data"
import { ArrowLeft } from "lucide-react"

// Generate static params for known categories
export async function generateStaticParams() {
  const categories = Array.from(new Set(mockProducts.map((p) => p.category)))
  const subcategories = Array.from(
    new Set(
      mockProducts.filter((p) => p.subcategory).map((p) => ({ category: p.category, subcategory: p.subcategory! })),
    ),
  )

  const params = [
    // Single category routes
    ...categories.map((category) => ({ slug: [category] })),
    // Category + subcategory routes
    ...subcategories.map(({ category, subcategory }) => ({
      slug: [category, subcategory],
    })),
  ]

  return params
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string[] }
}) {
  const { slug } = params
  const [category, subcategory] = slug

  // Filter products based on category and subcategory
  const products = mockProducts.filter((product) => {
    if (subcategory) {
      return product.category === category && product.subcategory === subcategory
    }
    return product.category === category
  })

  // If no products found, show 404
  if (products.length === 0) {
    notFound()
  }

  // Get breadcrumb path
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: category.charAt(0).toUpperCase() + category.slice(1), href: `/products/category/${category}` },
  ]

  if (subcategory) {
    breadcrumbs.push({
      label: subcategory.charAt(0).toUpperCase() + subcategory.slice(1),
      href: `/products/category/${category}/${subcategory}`,
    })
  }

  // Get available subcategories for current category
  const availableSubcategories = Array.from(
    new Set(mockProducts.filter((p) => p.category === category && p.subcategory).map((p) => p.subcategory!)),
  )

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-900">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="hover:text-blue-600">
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </nav>

      {/* Back Button */}
      <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </Link>

      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            {category.charAt(0).toUpperCase() + category.slice(1)}
            {subcategory && ` - ${subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}`}
          </h1>
          <p className="text-gray-600 mt-2">
            {products.length} product{products.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Subcategory Filter */}
      {!subcategory && availableSubcategories.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Browse by Subcategory</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              href={`/products/category/${category}`}
              className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
            >
              All {category}
            </Link>
            {availableSubcategories.map((sub) => (
              <Link
                key={sub}
                href={`/products/category/${category}/${sub}`}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200"
              >
                {sub.charAt(0).toUpperCase() + sub.slice(1)}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <Link href={`/products/${product.id}`}>
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <span className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-600"}`}>
                    {product.stock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Routing Information */}
      <div className="p-6 bg-green-50 rounded-lg">
        <h3 className="font-semibold mb-2">🔍 Catch-All Routes Example</h3>
        <p className="text-sm text-gray-600 mb-2">
          This page demonstrates catch-all routes with the <code className="bg-gray-200 px-1 rounded">[...slug]</code>{" "}
          parameter.
        </p>
        <p className="text-sm text-gray-600 mb-2">
          Current route: <code className="bg-gray-200 px-1 rounded">/products/category/{slug.join("/")}</code>
        </p>
        <p className="text-sm text-gray-600">
          Slug array: <code className="bg-gray-200 px-1 rounded">[{slug.map((s) => `"${s}"`).join(", ")}]</code>
        </p>
      </div>
    </div>
  )
}
