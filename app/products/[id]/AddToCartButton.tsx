/**
 * ADD TO CART BUTTON - CLIENT COMPONENT
 *
 * This client component handles the interactive add to cart functionality.
 * It demonstrates the separation between server and client components.
 */

"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import type { Product } from "@/types"

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    setIsAdding(false)
    setAdded(true)

    // Reset after 2 seconds
    setTimeout(() => setAdded(false), 2000)
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center space-x-4">
        <span className="font-medium">Quantity:</span>
        <div className="flex items-center border rounded-lg">
          <button
            onClick={decrementQuantity}
            disabled={quantity <= 1}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-2 border-x">{quantity}</span>
          <button
            onClick={incrementQuantity}
            disabled={quantity >= product.stock}
            className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={isAdding || product.stock === 0 || added}
        className={`w-full flex items-center justify-center space-x-2 py-3 px-6 rounded-lg font-semibold transition-colors ${
          added
            ? "bg-green-600 text-white"
            : product.stock === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
        } disabled:opacity-50`}
      >
        {isAdding ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Adding...</span>
          </>
        ) : added ? (
          <>
            <span>✓ Added to Cart!</span>
          </>
        ) : (
          <>
            <ShoppingCart size={20} />
            <span>Add to Cart (${(product.price * quantity).toFixed(2)})</span>
          </>
        )}
      </button>
    </div>
  )
}
