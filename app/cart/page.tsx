/**
 * CART PAGE - SERVER-SIDE RENDERING (SSR) WITH AUTHENTICATION
 *
 * This demonstrates:
 * 1. Server-Side Rendering for user-specific data
 * 2. Authentication-protected route (handled by middleware)
 * 3. Dynamic content that changes per request
 *
 * This page is protected by middleware and will redirect
 * unauthenticated users to the login page.
 */

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { mockProducts } from "@/lib/data"
import { ShoppingCart, ArrowRight } from "lucide-react"
import CartActions from "./CartActions"

// This function runs on each request (SSR)
async function getCartData() {
  // In a real application, you would fetch cart data from a database
  // based on the user's session or authentication token

  // Simulate cart data
  const cartItems = [
    { productId: "1", quantity: 2 },
    { productId: "3", quantity: 1 },
  ]

  const cartWithProducts = cartItems
    .map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId)
      return product ? { product, quantity: item.quantity } : null
    })
    .filter(Boolean)

  return cartWithProducts
}

export default async function CartPage() {
  // Check authentication (this would normally be handled by middleware)
  const cookieStore = cookies()
  const authToken = cookieStore.get("auth-token")

  if (!authToken || authToken.value !== "authenticated") {
    redirect("/login?returnTo=/cart")
  }

  // Fetch cart data server-side
  const cartItems = await getCartData()

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item?.product.price || 0) * (item?.quantity || 0), 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + shipping + tax

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center mb-8">
        <ShoppingCart className="mr-3" size={32} />
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingCart className="mx-auto mb-4 text-gray-400" size={64} />
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some products to get started!</p>
          <Link
            href="/products"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(
              (item) =>
                item && (
                  <div key={item.product.id} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex items-center space-x-4">
                      <Image
                        src={item.product.image || "/placeholder.svg"}
                        alt={item.product.name}
                        width={100}
                        height={100}
                        className="rounded-lg"
                      />
                      <div className="flex-1">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="text-lg font-semibold hover:text-blue-600"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-gray-600 text-sm mt-1">{item.product.description}</p>
                        <p className="text-blue-600 font-semibold mt-2">${item.product.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CartActions productId={item.product.id} initialQuantity={item.quantity} />
                      </div>
                    </div>
                  </div>
                ),
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {shipping > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                <p className="text-blue-800">Add ${(50 - subtotal).toFixed(2)} more for free shipping!</p>
              </div>
            )}

            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg mt-6 hover:bg-blue-700 font-semibold">
              Proceed to Checkout
            </button>

            <Link href="/products" className="block text-center text-blue-600 hover:text-blue-800 mt-4">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}

      {/* SSR Information */}
      <div className="mt-12 p-6 bg-purple-50 rounded-lg">
        <h3 className="font-semibold mb-2">🔍 Server-Side Rendering (SSR) Example</h3>
        <p className="text-sm text-gray-600 mb-2">
          This page demonstrates Server-Side Rendering for user-specific cart data.
        </p>
        <p className="text-sm text-gray-600">
          The cart contents are fetched on each request, ensuring up-to-date information.
        </p>
      </div>
    </div>
  )
}
