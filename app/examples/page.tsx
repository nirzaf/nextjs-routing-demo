/**
 * PROPS AND REDUCERS EXAMPLES IN NEXT.JS
 * 
 * This page demonstrates comprehensive implementation of:
 * 1. Props patterns (basic, destructured, optional, children, etc.)
 * 2. useReducer for complex state management
 * 3. Context API with reducers for global state
 * 4. TypeScript interfaces for props
 */

import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Settings, Users, ShoppingCart } from "lucide-react"
import Link from "next/link"

// Import our example components
import PropsExamples from "./components/PropsExamples"
import ReducerExamples from "./components/ReducerExamples"
import ContextReducerExample from "./components/ContextReducerExample"
import ShoppingCartExample from "./components/ShoppingCartExample"

export default function ExamplesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Props & Reducers in Next.js</h1>
          <p className="text-muted-foreground">
            Comprehensive examples of React Props patterns and useReducer implementation
          </p>
        </div>
        <Link 
          href="/"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Props Patterns</CardTitle>
            <Code className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8+</div>
            <p className="text-xs text-muted-foreground">
              Different prop patterns demonstrated
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">useReducer</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Complex state management examples
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Context API</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Global state with Context + Reducer
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Real Example</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">
              Shopping cart with reducer
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="props" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="props">Props Patterns</TabsTrigger>
          <TabsTrigger value="reducers">useReducer</TabsTrigger>
          <TabsTrigger value="context">Context + Reducer</TabsTrigger>
          <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
        </TabsList>
        
        <TabsContent value="props" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>React Props Patterns</CardTitle>
              <CardDescription>
                Various ways to pass and handle props in React components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading props examples...</div>}>
                <PropsExamples />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reducers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>useReducer Hook</CardTitle>
              <CardDescription>
                Complex state management with useReducer for predictable state updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading reducer examples...</div>}>
                <ReducerExamples />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="context" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Context API + useReducer</CardTitle>
              <CardDescription>
                Global state management combining Context API with useReducer
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading context examples...</div>}>
                <ContextReducerExample />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cart" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-World Example: Shopping Cart</CardTitle>
              <CardDescription>
                A practical implementation using useReducer for cart state management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<div>Loading shopping cart example...</div>}>
                <ShoppingCartExample />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}