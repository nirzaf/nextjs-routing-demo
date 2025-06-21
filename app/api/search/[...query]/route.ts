/**
 * CATCH-ALL API ROUTES
 *
 * This demonstrates catch-all API routes using [...query] syntax.
 * It can handle flexible search endpoints like:
 * - /api/search/electronics
 * - /api/search/electronics/audio
 * - /api/search/electronics/audio/headphones
 *
 * The query parameter will be an array of all path segments.
 */

import { type NextRequest, NextResponse } from "next/server"
import { mockProducts } from "@/lib/data"

export async function GET(request: NextRequest, { params }: { params: { query: string[] } }) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const sortBy = searchParams.get("sortBy") || "name"
    const order = searchParams.get("order") || "asc"

    // Convert query array to search terms
    const searchTerms = params.query.map((term) => term.toLowerCase())

    // Filter products based on search terms
    let products = mockProducts.filter((product) => {
      const searchableText = [product.name, product.description, product.category, product.subcategory || ""]
        .join(" ")
        .toLowerCase()

      // Check if all search terms are found in the product
      return searchTerms.every((term) => searchableText.includes(term))
    })

    // Sort products
    products.sort((a, b) => {
      let aValue: any = a[sortBy as keyof typeof a]
      let bValue: any = b[sortBy as keyof typeof b]

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (order === "desc") {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
      } else {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
      }
    })

    // Apply limit
    if (limit) {
      const limitNum = Number.parseInt(limit, 10)
      if (!isNaN(limitNum) && limitNum > 0) {
        products = products.slice(0, limitNum)
      }
    }

    return NextResponse.json({
      success: true,
      data: products,
      searchTerms,
      total: products.length,
      query: params.query.join(" > "),
    })
  } catch (error) {
    console.error("Error searching products:", error)
    return NextResponse.json({ success: false, error: "Search failed" }, { status: 500 })
  }
}
