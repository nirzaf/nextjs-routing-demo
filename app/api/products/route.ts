/**
 * API ROUTES - BASIC CRUD OPERATIONS
 *
 * API Routes in Next.js App Router are defined in route.ts files.
 * They handle HTTP methods (GET, POST, PUT, DELETE) and can be used
 * to create RESTful APIs or handle form submissions.
 *
 * This demonstrates:
 * 1. GET request to fetch all products
 * 2. POST request to create a new product
 * 3. Error handling and response formatting
 * 4. CORS headers for API access
 */

import { type NextRequest, NextResponse } from "next/server"
import { mockProducts } from "@/lib/data"
import type { Product } from "@/types"

// GET /api/products - Fetch all products with optional filtering
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const search = searchParams.get("search")
    const limit = searchParams.get("limit")

    let products = [...mockProducts]

    // Filter by category
    if (category) {
      products = products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
    }

    // Filter by search query
    if (search) {
      const query = search.toLowerCase()
      products = products.filter(
        (product) => product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query),
      )
    }

    // Limit results
    if (limit) {
      const limitNum = Number.parseInt(limit, 10)
      if (!isNaN(limitNum) && limitNum > 0) {
        products = products.slice(0, limitNum)
      }
    }

    // Add CORS headers
    const response = NextResponse.json({
      success: true,
      data: products,
      total: products.length,
    })

    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type")

    return response
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST /api/products - Create a new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["name", "description", "price", "category", "stock"]
    const missingFields = requiredFields.filter((field) => !body[field])

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing required fields: ${missingFields.join(", ")}`,
        },
        { status: 400 },
      )
    }

    // Create new product
    const newProduct: Product = {
      id: (mockProducts.length + 1).toString(),
      name: body.name,
      description: body.description,
      price: Number.parseFloat(body.price),
      category: body.category,
      subcategory: body.subcategory,
      image: body.image || "/placeholder.svg?height=300&width=300",
      stock: Number.parseInt(body.stock, 10),
      featured: body.featured || false,
    }

    // In a real application, you would save to a database
    mockProducts.push(newProduct)

    return NextResponse.json({ success: true, data: newProduct }, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ success: false, error: "Failed to create product" }, { status: 500 })
  }
}
