// Types for our e-commerce application
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  subcategory?: string
  image: string
  stock: number
  featured?: boolean
}

export interface User {
  id: string
  name: string
  email: string
  isAuthenticated: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
}

// API Response types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
