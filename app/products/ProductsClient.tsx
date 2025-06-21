/**
 * PRODUCTS CLIENT COMPONENT
 *
 * This client component handles interactive features like search and filtering.
 * It demonstrates the separation between server and client components.
 */

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Search, Filter, Star } from "lucide-react"
import type { Product } from "@/types"

interface ProductsClientProps {
  initialProducts: Product[]
  categories: string[]
  searchParams: { search?: string; category?: string; view?: string }
}

export default function ProductsClient({ initialProducts, categories, searchParams }: ProductsClientProps) {
  const router = useRouter()
  const currentSearchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")

  useEffect(() => {
    setSearchQuery(searchParams.search || "")
    setSelectedCategory(searchParams.category || "")
  }, [searchParams.search, searchParams.category])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(currentSearchParams)

    if (searchQuery) {
      params.set("search", searchQuery)
    } else {
      params.delete("search")
    }

    router.push(`/products?${params.toString()}`)
  }

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(currentSearchParams)

    if (category) {
      params.set("category", category)
    } else {
      params.delete("category")
    }

    router.push(`/products?${params.toString()}`)
  }

  const isListView = searchParams.view === "list"

  return (
    <>
      {/* Search and Filter Bar */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter size={20} className="text-gray-400" />
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value)
                handleCategoryChange(e.target.value)
              }}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filters */}
        {(searchParams.search || searchParams.category) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchParams.search && (
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Search: {searchParams.search}
                <button
                  onClick={() => {
                    const params = new URLSearchParams(currentSearchParams)
                    params.delete("search")
                    router.push(`/products?${params.toString()}`)
                  }}
                  className="ml-2 text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            )}
            {searchParams.category && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Category: {searchParams.category}
                <button onClick={() => handleCategoryChange("")} className="ml-2 text-green-600 hover:text-green-800">
                  ×
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Products Grid/List */}
      <div className={isListView ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}>
        {initialProducts.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        ) : (
          initialProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                isListView ? "flex" : ""
              }`}
            >
              <Link href={`/products/${product.id}`} className={isListView ? "flex w-full" : ""}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={300}
                  height={300}
                  className={`object-cover ${isListView ? "w-48 h-32" : "w-full h-48"}`}
                />
                <div className="p-4 flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">{product.category}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <div className="flex items-center">
                      <Star className="text-yellow-400 fill-current" size={16} />
                      <span className="text-sm text-gray-600 ml-1">4.5</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    {product.stock > 0 ? (
                      <span className="text-green-600">In Stock ({product.stock})</span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  )
}
