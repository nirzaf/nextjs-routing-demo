/**
 * DYNAMIC API ROUTES
 *
 * This demonstrates dynamic API routes using [id] parameter.
 * It handles operations on individual products:
 * - GET /api/products/[id] - Fetch single product
 * - PUT /api/products/[id] - Update product
 * - DELETE /api/products/[id] - Delete product
 */

import { type NextRequest, NextResponse } from "next/server"
import { getProductById, mockProducts } from "@/lib/data"

// GET /api/products/[id] - Fetch single product
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const product = getProductById(params.id)

    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: product,
    })
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch product" }, { status: 500 })
  }
}

// PUT /api/products/[id] - Update product
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productIndex = mockProducts.findIndex((p) => p.id === params.id)

    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    const body = await request.json()
    const updatedProduct = { ...mockProducts[productIndex], ...body }

    // In a real application, you would update the database
    mockProducts[productIndex] = updatedProduct

    return NextResponse.json({
      success: true,
      data: updatedProduct,
    })
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ success: false, error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE /api/products/[id] - Delete product
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const productIndex = mockProducts.findIndex((p) => p.id === params.id)

    if (productIndex === -1) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 })
    }

    // In a real application, you would delete from the database
    const deletedProduct = mockProducts.splice(productIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedProduct,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ success: false, error: "Failed to delete product" }, { status: 500 })
  }
}
