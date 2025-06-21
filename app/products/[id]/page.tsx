/**
 * PRODUCT DETAIL PAGE - DYNAMIC ROUTING
 *
 * This demonstrates:
 * 1. Dynamic routing with [id] parameter
 * 2. Server-Side Rendering (SSR) for dynamic content
 * 3. generateStaticParams for static generation of known routes
 * 4. Error handling for invalid product IDs
 *
 * The [id] in the filename creates a dynamic route that captures
 * the product ID from the URL (e.g., /products/1, /products/2)
 */

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getProductById, mockProducts } from "@/lib/data"
import { ArrowLeft, Star, Heart, Truck, Shield } from "lucide-react"
import AddToCartButton from "./AddToCartButton"

// Generate static params for known products (SSG)
// This pre-generates pages for all products at build time
export async function generateStaticParams() {
  return mockProducts.map((product) => ({
    id: product.id,
  }))
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params
  const product = getProductById(id)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} - RouteDemo Store`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.image],
    },
  }
}

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = await params
  // Fetch product data based on the dynamic ID parameter
  const product = getProductById(id)

  // If product doesn't exist, show 404 page
  if (!product) {
    notFound()
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = mockProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3)

  return (
    <div className="max-w-6xl mx-auto">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
        <Link href="/" className="hover:text-blue-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600">
          Products
        </Link>
        <span>/</span>
        <Link href={`/products/category/${product.category}`} className="hover:text-blue-600">
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Back Button */}
      <Link href="/products" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Back to Products
      </Link>

      {/* Product Details */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="space-y-4">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            width={600}
            height={600}
            className="w-full rounded-lg shadow-md"
            priority
          />

          {/* Additional Images Placeholder */}
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Image
                key={i}
                src={product.image || "/placeholder.svg"}
                alt={`${product.name} view ${i}`}
                width={150}
                height={150}
                className="w-full h-20 object-cover rounded border-2 border-transparent hover:border-blue-500 cursor-pointer"
              />
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${star <= 4 ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-gray-600">(4.0) • 127 reviews</span>
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-4">${product.price}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500"}`}></div>
            <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <AddToCartButton product={product} />

            <button className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-800 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">
              <Heart size={20} />
              <span>Add to Wishlist</span>
            </button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t">
            <div className="flex items-center space-x-3">
              <Truck className="text-green-600" size={24} />
              <div>
                <p className="font-medium">Free Shipping</p>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="text-blue-600" size={24} />
              <div>
                <p className="font-medium">2 Year Warranty</p>
                <p className="text-sm text-gray-600">Full coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/products/${relatedProduct.id}`}>
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{relatedProduct.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">${relatedProduct.price}</span>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 fill-current" size={16} />
                        <span className="text-sm text-gray-600 ml-1">4.5</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Routing Information */}
      <div className="mt-12 p-6 bg-yellow-50 rounded-lg">
        <h3 className="font-semibold mb-2">🔍 Dynamic Routing Example</h3>
        <p className="text-sm text-gray-600 mb-2">
          This page demonstrates dynamic routing with the <code className="bg-gray-200 px-1 rounded">[id]</code>{" "}
          parameter.
        </p>
        <p className="text-sm text-gray-600">
          Current route: <code className="bg-gray-200 px-1 rounded">/products/{id}</code>
        </p>
      </div>
    </div>
  )
}
