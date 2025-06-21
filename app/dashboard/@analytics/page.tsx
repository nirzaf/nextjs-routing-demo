/**
 * PARALLEL ROUTE: ANALYTICS DASHBOARD
 * 
 * This component is rendered in the @analytics slot of the dashboard layout.
 * It demonstrates how parallel routes work by providing independent content
 * that can be loaded, updated, and managed separately from other parts of the page.
 * 
 * Key Features:
 * - Independent from main page content
 * - Can have its own loading states
 * - Can have its own error boundaries
 * - Updates independently of other parallel routes
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, ShoppingCart, DollarSign } from "lucide-react"

// Simulate async data fetching
async function getAnalyticsData() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    totalUsers: 12345,
    totalOrders: 8901,
    revenue: 45678.90,
    conversionRate: 3.2,
    topProducts: [
      { name: "Wireless Headphones", sales: 234, growth: 12.5 },
      { name: "Smart Watch", sales: 189, growth: 8.3 },
      { name: "Laptop Stand", sales: 156, growth: -2.1 },
      { name: "USB-C Cable", sales: 143, growth: 15.7 },
    ],
    monthlyGrowth: {
      users: 15.3,
      orders: 22.1,
      revenue: 18.7,
    }
  }
}

export default async function AnalyticsPage() {
  const data = await getAnalyticsData()

  return (
    <div className="space-y-4">
      {/* Analytics Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Analytics Overview
          </CardTitle>
          <CardDescription>
            Real-time data from your e-commerce store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {/* Key Metrics */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Total Users</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{data.totalUsers.toLocaleString()}</div>
                  <Badge variant="secondary" className="text-xs">
                    +{data.monthlyGrowth.users}%
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Total Orders</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{data.totalOrders.toLocaleString()}</div>
                  <Badge variant="secondary" className="text-xs">
                    +{data.monthlyGrowth.orders}%
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">Revenue</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">${data.revenue.toLocaleString()}</div>
                  <Badge variant="secondary" className="text-xs">
                    +{data.monthlyGrowth.revenue}%
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Conversion Rate */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium">Conversion Rate</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Rate</span>
                  <span className="font-medium">{data.conversionRate}%</span>
                </div>
                <Progress value={data.conversionRate * 10} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  Target: 5.0% (Industry average: 2.8%)
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Top Performing Products</CardTitle>
          <CardDescription>
            Best sellers this month with growth indicators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <span className="text-sm font-medium">{product.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">{product.sales} sales</span>
                  <Badge 
                    variant={product.growth > 0 ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {product.growth > 0 ? '+' : ''}{product.growth}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Parallel Route Info */}
      <Card className="border-dashed">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              📊 This is a Parallel Route
            </div>
            <p className="text-xs text-muted-foreground">
              Rendered independently in the @analytics slot with its own loading state
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}