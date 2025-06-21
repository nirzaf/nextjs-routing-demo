/**
 * INTERCEPTING ROUTES
 * 
 * This demonstrates intercepting routes using (.) syntax.
 * Intercepting routes allow you to load a route from another part of your application
 * within the current layout. This is commonly used for modals, overlays, or inline content.
 * 
 * Intercepting Route Conventions:
 * - (.) to match segments on the same level
 * - (..) to match segments one level above
 * - (..)(..) to match segments two levels above
 * - (...) to match segments from the root app directory
 * 
 * This route intercepts /products/[id] when navigated to from within the products section,
 * showing the product details in a modal instead of a full page.
 * 
 * File: app/products/(.)modal/[id]/page.tsx
 * Intercepts: app/products/[id]/page.tsx
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  X, 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2,
  ArrowLeft,
  Eye,
  Layers
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"

// Mock product data (same as in the regular product page)
const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    image: '/placeholder.svg',
    category: 'Electronics',
    rating: 4.5,
    reviews: 128,
    inStock: true,
    features: ['Noise Cancellation', 'Wireless', '30hr Battery', 'Premium Sound']
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    description: 'Advanced smartwatch with health monitoring, GPS, and long battery life.',
    image: '/placeholder.svg',
    category: 'Wearables',
    rating: 4.7,
    reviews: 89,
    inStock: true,
    features: ['Health Monitoring', 'GPS', 'Water Resistant', 'Long Battery']
  },
  {
    id: '3',
    name: 'Laptop Stand',
    price: 79.99,
    description: 'Ergonomic laptop stand for better posture and improved workspace setup.',
    image: '/placeholder.svg',
    category: 'Accessories',
    rating: 4.3,
    reviews: 45,
    inStock: false,
    features: ['Ergonomic', 'Adjustable', 'Portable', 'Aluminum Build']
  }
]

export default function ProductModalPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const product = products.find(p => p.id === params.id)
  
  if (!product) {
    notFound()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-background border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" />
            <h2 className="font-semibold">Intercepting Route Modal</h2>
          </div>
          <Link href="/products">
            <Button variant="ghost" size="sm">
              <X className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Intercepting Route Explanation */}
        <Card className="m-4 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4" />
              Intercepting Route Demo
            </CardTitle>
            <CardDescription className="text-xs">
              This modal is rendered by an intercepting route at (.)modal/[id]/page.tsx
            </CardDescription>
          </CardHeader>
          <CardContent className="text-xs space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium">Intercepted Route:</p>
                <code className="text-xs bg-muted p-1 rounded">/products/{params.id}</code>
              </div>
              <div>
                <p className="font-medium">Intercepting File:</p>
                <code className="text-xs bg-muted p-1 rounded">(.)modal/[id]/page.tsx</code>
              </div>
            </div>
            <Separator />
            <p className="text-muted-foreground">
              When you navigate to a product from the products list, this modal intercepts the route.
              If you refresh the page or navigate directly, you'll see the full product page instead.
            </p>
          </CardContent>
        </Card>

        {/* Product Content */}
        <div className="p-4 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="sm">
                  <Heart className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{product.category}</Badge>
                  {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                </div>
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div>
                <p className="text-3xl font-bold text-primary">
                  ${product.price}
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Features */}
              <div>
                <h3 className="font-semibold mb-2">Key Features</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Modal Actions */}
          <div className="flex gap-2 pt-4 border-t">
            <Link href="/products" className="flex-1">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <Link href={`/products/${params.id}`} className="flex-1">
              <Button className="w-full">
                View Full Page
                <Eye className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}