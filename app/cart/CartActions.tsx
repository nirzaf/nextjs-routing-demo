/**
 * CART ACTIONS - CLIENT COMPONENT
 *
 * This client component handles cart item quantity updates and removal.
 */

"use client"

import { useState } from "react"
import { Plus, Minus, Trash2 } from "lucide-react"

interface CartActionsProps {
  productId: string
  initialQuantity: number
}

export default function CartActions({ productId, initialQuantity }: CartActionsProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isUpdating, setIsUpdating] = useState(false)

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300))
    setQuantity(newQuantity)
    setIsUpdating(false)
  }

  const removeItem = async () => {
    setIsUpdating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    // In a real app, this would remove the item and refresh the page
    alert("Item would be removed from cart")
    setIsUpdating(false)
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center border rounded-lg">
        <button
          onClick={() => updateQuantity(quantity - 1)}
          disabled={quantity <= 1 || isUpdating}
          className="p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <Minus size={16} />
        </button>
        <span className="px-3 py-2 border-x min-w-[3rem] text-center">{isUpdating ? "..." : quantity}</span>
        <button
          onClick={() => updateQuantity(quantity + 1)}
          disabled={isUpdating}
          className="p-2 hover:bg-gray-100 disabled:opacity-50"
        >
          <Plus size={16} />
        </button>
      </div>
      <button
        onClick={removeItem}
        disabled={isUpdating}
        className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
        title="Remove item"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}
