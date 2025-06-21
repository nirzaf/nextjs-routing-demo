'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronRight, FileText, Code, Zap, Settings, BookOpen, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface TableOfContentsItem {
  id: string
  title: string
  level: number
}

const tableOfContents: TableOfContentsItem[] = [
  { id: 'overview', title: 'Overview', level: 1 },
  { id: 'file-structure', title: 'File Structure', level: 1 },
  { id: 'props-patterns', title: 'Props Patterns', level: 1 },
  { id: 'basic-props', title: 'Basic Props', level: 2 },
  { id: 'destructured-props', title: 'Destructured Props', level: 2 },
  { id: 'optional-props', title: 'Optional Props', level: 2 },
  { id: 'children-props', title: 'Children Props', level: 2 },
  { id: 'function-props', title: 'Function Props', level: 2 },
  { id: 'object-array-props', title: 'Object & Array Props', level: 2 },
  { id: 'render-props', title: 'Render Props', level: 2 },
  { id: 'usereducer-patterns', title: 'useReducer Patterns', level: 1 },
  { id: 'counter-example', title: 'Counter with History', level: 2 },
  { id: 'form-state', title: 'Form State Management', level: 2 },
  { id: 'todo-list', title: 'Todo List CRUD', level: 2 },
  { id: 'context-reducer', title: 'Context + useReducer', level: 1 },
  { id: 'global-state', title: 'Global State Setup', level: 2 },
  { id: 'shopping-cart', title: 'Shopping Cart Example', level: 1 },
  { id: 'testing', title: 'How to Test', level: 1 },
  { id: 'key-concepts', title: 'Key Concepts', level: 1 },
  { id: 'best-practices', title: 'Best Practices', level: 1 },
  { id: 'performance', title: 'Performance Considerations', level: 1 },
  { id: 'resources', title: 'Additional Resources', level: 1 },
]

const CodeBlock = ({ children, language = 'typescript' }: { children: string; language?: string }) => (
  <div className="relative">
    <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm border border-slate-700">
      <code className={`language-${language} block whitespace-pre text-slate-100`} style={{ 
        backgroundColor: '#0f172a',
        color: '#f1f5f9',
        fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
      }}>
        {children}
      </code>
    </pre>
  </div>
)

const FeatureCard = ({ icon: Icon, title, description, implemented = true }: {
  icon: any
  title: string
  description: string
  implemented?: boolean
}) => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-blue-600" />
        <CardTitle className="text-lg">{title}</CardTitle>
        {implemented && <Badge variant="secondary" className="ml-auto">✅ Implemented</Badge>}
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
)

export default function PropsReducersDocPage() {
  const [activeSection, setActiveSection] = useState('overview')

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/" className="text-blue-600 hover:text-blue-800">
                ← Back to Home
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">Props & Reducers Documentation</h1>
              </div>
            </div>
            <Link href="/examples">
              <Button variant="outline" className="gap-2">
                <ExternalLink className="h-4 w-4" />
                View Live Examples
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Table of Contents */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Table of Contents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px]">
                  <nav className="space-y-1">
                    {tableOfContents.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          activeSection === item.id
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        } ${item.level === 2 ? 'ml-4' : ''}`}
                      >
                        {item.level === 2 && <ChevronRight className="h-3 w-3 inline mr-1" />}
                        {item.title}
                      </button>
                    ))}
                  </nav>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview */}
            <section id="overview">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    Props and Reducers Implementation in Next.js
                  </CardTitle>
                  <CardDescription className="text-lg">
                    A comprehensive guide to implementing Props patterns and useReducer for state management in Next.js applications.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FeatureCard
                      icon={Code}
                      title="Props Patterns"
                      description="8 different prop patterns with TypeScript examples"
                    />
                    <FeatureCard
                      icon={Settings}
                      title="useReducer Examples"
                      description="Complex state management with reducers"
                    />
                    <FeatureCard
                      icon={Zap}
                      title="Real-world Examples"
                      description="Shopping cart and global state management"
                    />
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* File Structure */}
            <section id="file-structure">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">📁 File Structure</CardTitle>
                </CardHeader>
                <CardContent>
                  <CodeBlock language="text">{`app/examples/
├── page.tsx                           # Main examples page with tabs
└── components/
    ├── PropsExamples.tsx              # Props patterns demonstration
    ├── ReducerExamples.tsx            # useReducer examples
    ├── ContextReducerExample.tsx      # Context + Reducer global state
    └── ShoppingCartExample.tsx        # Real-world cart implementation`}</CodeBlock>
                </CardContent>
              </Card>
            </section>

            {/* Props Patterns */}
            <section id="props-patterns">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">🎯 Props Patterns</CardTitle>
                  <CardDescription>
                    Comprehensive examples of different prop patterns in React with TypeScript
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="basic" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="basic">Basic</TabsTrigger>
                      <TabsTrigger value="destructured">Destructured</TabsTrigger>
                      <TabsTrigger value="optional">Optional</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic" className="space-y-4">
                      <div id="basic-props">
                        <h4 className="font-semibold mb-2">Basic Props</h4>
                        <CodeBlock>{`interface BasicProps {
  title: string
  count: number
  isActive: boolean
}

function BasicComponent(props: BasicProps) {
  return (
    <div>
      <h3>{props.title}</h3>
      <p>Count: {props.count}</p>
    </div>
  )
}`}</CodeBlock>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="destructured" className="space-y-4">
                      <div id="destructured-props">
                        <h4 className="font-semibold mb-2">Destructured Props</h4>
                        <CodeBlock>{`function DestructuredComponent({ name, age, email }: DestructuredProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  )
}`}</CodeBlock>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="optional" className="space-y-4">
                      <div id="optional-props">
                        <h4 className="font-semibold mb-2">Optional Props with Defaults</h4>
                        <CodeBlock>{`interface OptionalProps {
  title: string
  subtitle?: string
  color?: "blue" | "green" | "red"
  showIcon?: boolean
}

function OptionalComponent({ 
  title, 
  subtitle = "Default subtitle", 
  color = "blue", 
  showIcon = true 
}: OptionalProps) {
  // Component implementation
}`}</CodeBlock>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="advanced" className="space-y-4">
                      <div id="children-props">
                        <h4 className="font-semibold mb-2">Children Props</h4>
                        <CodeBlock>{`interface ChildrenProps {
  title: string
  children: React.ReactNode
}

function ContainerComponent({ title, children }: ChildrenProps) {
  return (
    <div>
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  )
}`}</CodeBlock>
                      </div>
                      
                      <div id="function-props">
                        <h4 className="font-semibold mb-2 mt-6">Function Props (Callbacks)</h4>
                        <CodeBlock>{`interface FunctionProps {
  label: string
  onClick: () => void
  onHover?: (message: string) => void
}

function ButtonComponent({ label, onClick, onHover }: FunctionProps) {
  return (
    <button 
      onClick={onClick}
      onMouseEnter={() => onHover?.("Button hovered!")}
    >
      {label}
    </button>
  )
}`}</CodeBlock>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            {/* useReducer Patterns */}
            <section id="usereducer-patterns">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">⚙️ useReducer Patterns</CardTitle>
                  <CardDescription>
                    Complex state management with useReducer for predictable state updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="counter-example" className="space-y-4">
                    <h4 className="font-semibold">Simple Counter with History</h4>
                    <CodeBlock>{`type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_VALUE'; payload: number }

interface CounterState {
  count: number
  history: number[]
}

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + 1,
        history: [...state.history, state.count + 1]
      }
    case 'DECREMENT':
      return {
        count: state.count - 1,
        history: [...state.history, state.count - 1]
      }
    case 'RESET':
      return {
        count: 0,
        history: [...state.history, 0]
      }
    default:
      return state
  }
}`}</CodeBlock>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Context + useReducer */}
            <section id="context-reducer">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">🌐 Context + useReducer</CardTitle>
                  <CardDescription>
                    Global state management combining React Context with useReducer
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div id="global-state" className="space-y-4">
                    <h4 className="font-semibold">Global State Setup</h4>
                    <CodeBlock>{`// 1. Define State and Actions
interface AppState {
  user: User | null
  notifications: Notification[]
  theme: 'light' | 'dark'
  cartItems: number
  favorites: string[]
  isLoading: boolean
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'TOGGLE_THEME' }

// 2. Create Context
const AppContext = createContext<AppContextType | undefined>(undefined)

// 3. Custom Hook
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}`}</CodeBlock>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Shopping Cart Example */}
            <section id="shopping-cart">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">🛒 Real-World Example: Shopping Cart</CardTitle>
                  <CardDescription>
                    Complete shopping cart implementation with advanced features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <h5 className="font-medium">Features Implemented:</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2"><Badge variant="secondary">✅</Badge> Add/remove items</li>
                        <li className="flex items-center gap-2"><Badge variant="secondary">✅</Badge> Update quantities</li>
                        <li className="flex items-center gap-2"><Badge variant="secondary">✅</Badge> Apply coupon codes</li>
                        <li className="flex items-center gap-2"><Badge variant="secondary">✅</Badge> Calculate taxes and shipping</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="font-medium">Advanced Features:</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2"><Badge variant="secondary">✅</Badge> Local storage persistence</li>
                        <li className="flex items-center gap-2"><Badge variant="secondary">✅</Badge> Dynamic shipping (free over $50)</li>
                        <li className="flex items-center gap-2"><Badge variant="secondary">✅</Badge> Form validation</li>
                        <li className="flex items-center gap-2"><Badge variant="secondary">✅</Badge> Optimistic updates</li>
                      </ul>
                    </div>
                  </div>
                  
                  <CodeBlock>{`interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  category: string
  discount?: number
}

interface CartState {
  items: CartItem[]
  appliedCoupon: Coupon | null
  isLoading: boolean
  lastUpdated: Date
  shippingCost: number
  tax: number
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'APPLY_COUPON'; payload: Coupon }
  | { type: 'CLEAR_CART' }`}</CodeBlock>
                </CardContent>
              </Card>
            </section>

            {/* Testing */}
            <section id="testing">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">🚀 How to Test</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-medium mb-2">Navigate to Examples Page:</h5>
                      <code className="bg-white px-2 py-1 rounded text-sm">http://localhost:3001/examples</code>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h5 className="font-medium">Test Props Patterns:</h5>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Click the "Props Patterns" tab</li>
                          <li>• Interact with different prop examples</li>
                          <li>• See how props are passed and handled</li>
                        </ul>
                      </div>
                      
                      <div className="space-y-2">
                        <h5 className="font-medium">Test useReducer:</h5>
                        <ul className="text-sm space-y-1 text-gray-600">
                          <li>• Click the "useReducer" tab</li>
                          <li>• Try the counter, form, and todo examples</li>
                          <li>• Observe state management patterns</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Key Concepts */}
            <section id="key-concepts">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">📚 Key Concepts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-medium text-green-700">Use Props When</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-green-600">✅</Badge> Passing data down 1-2 levels</li>
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-green-600">✅</Badge> Simple, independent values</li>
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-green-600">✅</Badge> Component-specific data</li>
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-green-600">✅</Badge> Event handlers and callbacks</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium text-blue-700">Use useReducer When</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-blue-600">✅</Badge> Complex state logic</li>
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-blue-600">✅</Badge> State transitions depend on previous state</li>
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-blue-600">✅</Badge> Multiple actions update same state</li>
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-blue-600">✅</Badge> Need predictable state updates</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium text-purple-700">Use Context + useReducer When</h5>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-purple-600">✅</Badge> Global application state</li>
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-purple-600">✅</Badge> State needed by many components</li>
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-purple-600">✅</Badge> Avoiding prop drilling</li>
                        <li className="flex items-center gap-2"><Badge variant="outline" className="text-purple-600">✅</Badge> User authentication state</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Best Practices */}
            <section id="best-practices">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">💡 Best Practices</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="props" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="props">Props</TabsTrigger>
                      <TabsTrigger value="reducer">useReducer</TabsTrigger>
                      <TabsTrigger value="context">Context</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="props" className="space-y-3">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2"><Badge>1</Badge> Use TypeScript interfaces for type safety</li>
                        <li className="flex items-start gap-2"><Badge>2</Badge> Destructure props for cleaner code</li>
                        <li className="flex items-start gap-2"><Badge>3</Badge> Provide default values for optional props</li>
                        <li className="flex items-start gap-2"><Badge>4</Badge> Use union types for restricted values</li>
                        <li className="flex items-start gap-2"><Badge>5</Badge> Keep props focused - single responsibility</li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="reducer" className="space-y-3">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2"><Badge>1</Badge> Use discriminated unions for action types</li>
                        <li className="flex items-start gap-2"><Badge>2</Badge> Keep reducers pure - no side effects</li>
                        <li className="flex items-start gap-2"><Badge>3</Badge> Use immutable updates with spread operator</li>
                        <li className="flex items-start gap-2"><Badge>4</Badge> Group related state in single reducer</li>
                        <li className="flex items-start gap-2"><Badge>5</Badge> Add TypeScript for action and state types</li>
                      </ul>
                    </TabsContent>
                    
                    <TabsContent value="context" className="space-y-3">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2"><Badge>1</Badge> Create custom hooks for easier consumption</li>
                        <li className="flex items-start gap-2"><Badge>2</Badge> Split contexts by domain (auth, cart, etc.)</li>
                        <li className="flex items-start gap-2"><Badge>3</Badge> Provide error boundaries for context errors</li>
                        <li className="flex items-start gap-2"><Badge>4</Badge> Use React.memo to optimize re-renders</li>
                        <li className="flex items-start gap-2"><Badge>5</Badge> Keep context focused - avoid god objects</li>
                      </ul>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            {/* Performance Considerations */}
            <section id="performance">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">🔧 Performance Considerations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <h5 className="font-medium">Props</h5>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Use React.memo for expensive components</li>
                        <li>• Avoid creating objects/functions in render</li>
                        <li>• Use useCallback and useMemo when needed</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium">useReducer</h5>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Reducers are called on every dispatch</li>
                        <li>• Use React.memo to prevent unnecessary re-renders</li>
                        <li>• Consider splitting large reducers</li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium">Context</h5>
                      <ul className="text-sm space-y-1 text-gray-600">
                        <li>• Context triggers re-renders for all consumers</li>
                        <li>• Split contexts to minimize re-renders</li>
                        <li>• Use useMemo for context values</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Additional Resources */}
            <section id="resources">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">📖 Additional Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h5 className="font-medium">Official Documentation</h5>
                      <ul className="space-y-2">
                        <li>
                          <a href="https://react.dev/learn/passing-props-to-a-component" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                            React Props Documentation <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                        <li>
                          <a href="https://react.dev/reference/react/useReducer" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                            useReducer Hook <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                        <li>
                          <a href="https://react.dev/reference/react/createContext" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                            Context API <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <h5 className="font-medium">Additional Learning</h5>
                      <ul className="space-y-2">
                        <li>
                          <a href="https://react.dev/learn/typescript" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                            TypeScript with React <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                        <li>
                          <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                            Next.js Documentation <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                        <li>
                          <Link href="/examples" className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                            Live Examples <ChevronRight className="h-3 w-3" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Footer */}
            <div className="text-center py-8">
              <p className="text-gray-600 text-sm">
                <strong>Note:</strong> All examples include comprehensive TypeScript types, error handling, and follow React best practices. 
                The implementations demonstrate both simple and complex use cases to provide a complete learning experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}