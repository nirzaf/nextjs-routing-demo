// Mock data for our e-commerce application
import type { Product, User } from "@/types"

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation and 20-hour battery life.",
    price: 199.99,
    category: "electronics",
    subcategory: "audio",
    image: "https://placehold.co/300x300/DBEAFE/312E81?text=Headphones",
    stock: 50,
    featured: true,
  },
  {
    id: "2",
    name: "Smart Watch Series 8",
    description: "Feature-rich smartwatch with health tracking, GPS, and a vibrant always-on display.",
    price: 299.99,
    category: "electronics",
    subcategory: "wearables",
    image: "https://placehold.co/300x300/E0E7FF/4338CA?text=Smart+Watch",
    stock: 30,
    featured: true,
  },
  {
    id: "3",
    name: "Organic Cotton T-Shirt",
    description: "Comfortable and soft 100% organic cotton t-shirt, available in multiple colors.",
    price: 29.99,
    category: "clothing",
    subcategory: "shirts",
    image: "https://placehold.co/300x300/D1FAE5/065F46?text=T-Shirt",
    stock: 100,
  },
  {
    id: "4",
    name: "Trail Running Shoes",
    description: "Lightweight, durable trail running shoes for all-terrain athletes.",
    price: 129.99,
    category: "clothing",
    subcategory: "shoes",
    image: "https://placehold.co/300x300/F3E8FF/5B21B6?text=Shoes",
    stock: 25,
  },
  {
    id: "5",
    name: "Espresso Machine",
    description: "Automatic espresso machine with a built-in grinder and milk frother.",
    price: 449.99,
    category: "home",
    subcategory: "kitchen",
    image: "https://placehold.co/300x300/FEF3C7/92400E?text=Espresso",
    stock: 15,
    featured: true,
  },
  {
    id: "6",
    name: "The Midnight Library",
    description: "A novel by Matt Haig, a captivating story about choices, regrets, and second chances.",
    price: 15.99,
    category: "books",
    subcategory: "fiction",
    image: "https://placehold.co/300x300/E0F2FE/0891B2?text=Book",
    stock: 75,
  },
  {
    id: "7",
    name: "Ergonomic Office Chair",
    description: "A comfortable and adjustable chair designed for long hours of work.",
    price: 250.50,
    category: "home",
    subcategory: "furniture",
    image: "https://placehold.co/300x300/FCE7F3/831843?text=Chair",
    stock: 20,
  },
  {
    id: "8",
    name: "LEGO Starship",
    description: "A 1,200 piece starship building kit for ages 10 and up.",
    price: 99.99,
    category: "toys",
    subcategory: "building blocks",
    image: "https://placehold.co/300x300/FEE2E2/991B1B?text=LEGO",
    stock: 40,
  },
  {
    id: "9",
    name: "Yoga Mat",
    description: "Eco-friendly, non-slip yoga mat for all types of practice.",
    price: 39.99,
    category: "sports",
    subcategory: "fitness",
    image: "https://placehold.co/300x300/E4E4E7/18181B?text=Yoga+Mat",
    stock: 60,
  },
  {
    id: "10",
    name: "4K Webcam",
    description: "High-resolution 4K webcam with a built-in microphone for crystal-clear video calls.",
    price: 120.00,
    category: "electronics",
    subcategory: "accessories",
    image: "https://placehold.co/300x300/D4D4D8/27272A?text=Webcam",
    stock: 35,
  },
  {
    id: "11",
    name: "Denim Jeans",
    description: "Classic straight-leg denim jeans made from durable, high-quality fabric.",
    price: 79.99,
    category: "clothing",
    subcategory: "pants",
    image: "https://placehold.co/300x300/BFDBFE/1E3A8A?text=Jeans",
    stock: 80,
  },
  {
    id: "12",
    name: "Scented Soy Candle",
    description: "Hand-poured soy wax candle with a lavender and chamomile scent. 40-hour burn time.",
    price: 24.99,
    category: "home",
    subcategory: "decor",
    image: "https://placehold.co/300x300/F5D0FE/701A75?text=Candle",
    stock: 150,
  },
];

// Expanded user data
export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    isAuthenticated: false,
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    isAuthenticated: true,
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@example.com",
    isAuthenticated: true,
  },
];


// Helper functions
export function getProductById(id: string): Product | undefined {
  return mockProducts.find((product) => product.id === id)
}

export function getProductsByCategory(category: string, subcategory?: string): Product[] {
  return mockProducts.filter((product) => {
    if (subcategory) {
      return product.category === category && product.subcategory === subcategory
    }
    return product.category === category
  })
}

export function getFeaturedProducts(): Product[] {
  return mockProducts.filter((product) => product.featured)
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase()
  return mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery),
  )
}
