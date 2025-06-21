/**
 * CONTEXT + REDUCER EXAMPLE
 * 
 * Demonstrates global state management using:
 * 1. React Context API
 * 2. useReducer for state management
 * 3. Custom hooks for easy consumption
 * 4. TypeScript for type safety
 */

"use client"

import React, { createContext, useContext, useReducer, ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bell, Settings, User, ShoppingCart, Heart, LogOut } from "lucide-react"

// 1. DEFINE TYPES
interface AppUser {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
}

interface Notification {
  id: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
}

interface AppState {
  user: AppUser | null
  notifications: Notification[]
  theme: 'light' | 'dark'
  cartItems: number
  favorites: string[]
  isLoading: boolean
}

// 2. DEFINE ACTIONS
type AppAction =
  | { type: 'SET_USER'; payload: AppUser }
  | { type: 'LOGOUT' }
  | { type: 'ADD_NOTIFICATION'; payload: Omit<Notification, 'id' | 'timestamp'> }
  | { type: 'MARK_NOTIFICATION_READ'; payload: string }
  | { type: 'CLEAR_NOTIFICATIONS' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'UPDATE_CART'; payload: number }
  | { type: 'ADD_FAVORITE'; payload: string }
  | { type: 'REMOVE_FAVORITE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }

// 3. INITIAL STATE
const initialState: AppState = {
  user: null,
  notifications: [],
  theme: 'light',
  cartItems: 0,
  favorites: [],
  isLoading: false
}

// 4. REDUCER FUNCTION
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isLoading: false
      }
    
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        cartItems: 0,
        favorites: [],
        notifications: []
      }
    
    case 'ADD_NOTIFICATION':
      const newNotification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: new Date()
      }
      return {
        ...state,
        notifications: [newNotification, ...state.notifications].slice(0, 10) // Keep only 10 latest
      }
    
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map(notification =>
          notification.id === action.payload
            ? { ...notification, read: true }
            : notification
        )
      }
    
    case 'CLEAR_NOTIFICATIONS':
      return {
        ...state,
        notifications: []
      }
    
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      }
    
    case 'UPDATE_CART':
      return {
        ...state,
        cartItems: Math.max(0, action.payload)
      }
    
    case 'ADD_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.includes(action.payload)
          ? state.favorites
          : [...state.favorites, action.payload]
      }
    
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload)
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    
    default:
      return state
  }
}

// 5. CREATE CONTEXT
interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// 6. CONTEXT PROVIDER COMPONENT
interface AppProviderProps {
  children: ReactNode
}

export function AppProvider({ children }: AppProviderProps) {
  const [state, dispatch] = useReducer(appReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// 7. CUSTOM HOOK FOR CONSUMING CONTEXT
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// 8. CUSTOM HOOKS FOR SPECIFIC FUNCTIONALITY
export function useAuth() {
  const { state, dispatch } = useApp()
  
  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const user: AppUser = {
      id: '1',
      name: email.split('@')[0],
      email,
      role: email.includes('admin') ? 'admin' : 'user'
    }
    
    dispatch({ type: 'SET_USER', payload: user })
    dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: { 
        message: `Welcome back, ${user.name}!`, 
        type: 'success',
        read: false
      }
    })
  }
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: { 
        message: 'You have been logged out', 
        type: 'info',
        read: false
      }
    })
  }
  
  return {
    user: state.user,
    isLoading: state.isLoading,
    login,
    logout
  }
}

export function useNotifications() {
  const { state, dispatch } = useApp()
  
  const addNotification = (message: string, type: Notification['type'] = 'info') => {
    dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: { message, type, read: false }
    })
  }
  
  const markAsRead = (id: string) => {
    dispatch({ type: 'MARK_NOTIFICATION_READ', payload: id })
  }
  
  const clearAll = () => {
    dispatch({ type: 'CLEAR_NOTIFICATIONS' })
  }
  
  return {
    notifications: state.notifications,
    unreadCount: state.notifications.filter(n => !n.read).length,
    addNotification,
    markAsRead,
    clearAll
  }
}

export function useCart() {
  const { state, dispatch } = useApp()
  
  const addToCart = () => {
    dispatch({ type: 'UPDATE_CART', payload: state.cartItems + 1 })
    dispatch({ 
      type: 'ADD_NOTIFICATION', 
      payload: { 
        message: 'Item added to cart', 
        type: 'success',
        read: false
      }
    })
  }
  
  const removeFromCart = () => {
    if (state.cartItems > 0) {
      dispatch({ type: 'UPDATE_CART', payload: state.cartItems - 1 })
    }
  }
  
  return {
    cartItems: state.cartItems,
    addToCart,
    removeFromCart
  }
}

// 9. COMPONENT EXAMPLES USING THE CONTEXT

// Login Component
function LoginForm() {
  const { user, isLoading, login, logout } = useAuth()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email && password) {
      login(email, password)
    }
  }

  if (user) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
              {user.role}
            </Badge>
          </div>
        </div>
        <Button onClick={logout} variant="outline" className="w-full">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="email"
        placeholder="Email (try admin@example.com)"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  )
}

// Notifications Component
function NotificationCenter() {
  const { notifications, unreadCount, markAsRead, clearAll, addNotification } = useNotifications()

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200 text-green-800'
      case 'warning': return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      case 'error': return 'bg-red-50 border-red-200 text-red-800'
      default: return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <span className="font-medium">Notifications</span>
          {unreadCount > 0 && (
            <Badge variant="destructive">{unreadCount}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => addNotification('Test notification', 'info')}
          >
            Add Test
          </Button>
          <Button size="sm" variant="outline" onClick={clearAll}>
            Clear All
          </Button>
        </div>
      </div>
      
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No notifications</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-3 border rounded-lg cursor-pointer transition-opacity ${
                notification.read ? 'opacity-60' : ''
              } ${getNotificationColor(notification.type)}`}
              onClick={() => markAsRead(notification.id)}
            >
              <p className="text-sm">{notification.message}</p>
              <p className="text-xs mt-1">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

// Cart Component
function CartWidget() {
  const { cartItems, addToCart, removeFromCart } = useCart()
  const { state } = useApp()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span className="font-medium">Shopping Cart</span>
          {cartItems > 0 && (
            <Badge>{cartItems}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={addToCart}>
            Add Item
          </Button>
          <Button size="sm" variant="outline" onClick={removeFromCart}>
            Remove Item
          </Button>
        </div>
      </div>
      
      <div className="text-sm text-gray-600">
        <p>Items in cart: {cartItems}</p>
        <p>Favorites: {state.favorites.length}</p>
        <p>Theme: {state.theme}</p>
      </div>
      
      <Button 
        size="sm" 
        variant="outline" 
        onClick={() => {
          const { dispatch } = useApp()
          dispatch({ type: 'TOGGLE_THEME' })
        }}
        className="w-full"
      >
        Toggle Theme
      </Button>
    </div>
  )
}

// Main Context Example Component
export default function ContextReducerExample() {
  return (
    <AppProvider>
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Login/User Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Authentication
              </CardTitle>
              <CardDescription>
                Login/logout with global user state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
              <CardDescription>
                Global notification system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationCenter />
            </CardContent>
          </Card>

          {/* Cart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart & Settings
              </CardTitle>
              <CardDescription>
                Global cart and app settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CartWidget />
            </CardContent>
          </Card>
        </div>

        {/* Code Example */}
        <Card>
          <CardHeader>
            <CardTitle>Context + Reducer Implementation</CardTitle>
            <CardDescription>How to set up global state management</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// 1. Create Context and Provider
const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// 2. Custom Hook for Context
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// 3. Specialized Hooks
export function useAuth() {
  const { state, dispatch } = useApp()
  
  const login = (user: User) => {
    dispatch({ type: 'SET_USER', payload: user })
  }
  
  return { user: state.user, login }
}

// 4. Use in Components
function MyComponent() {
  const { user, login } = useAuth()
  // Component logic here
}`}
            </pre>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <CardTitle>Benefits of Context + useReducer</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="font-semibold text-green-700 mb-2">Advantages:</h4>
                <ul className="text-sm space-y-1 text-green-600">
                  <li>• Centralized state management</li>
                  <li>• Predictable state updates</li>
                  <li>• Type-safe with TypeScript</li>
                  <li>• No external dependencies</li>
                  <li>• Easy to test and debug</li>
                  <li>• Custom hooks for specific features</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 mb-2">Use Cases:</h4>
                <ul className="text-sm space-y-1 text-blue-600">
                  <li>• User authentication state</li>
                  <li>• Shopping cart management</li>
                  <li>• Theme and settings</li>
                  <li>• Notification system</li>
                  <li>• Form data across components</li>
                  <li>• App-wide loading states</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppProvider>
  )
}