/**
 * SHOPPING CART EXAMPLE WITH useReducer
 * 
 * A real-world implementation demonstrating:
 * 1. Complex state management with useReducer
 * 2. Multiple action types for cart operations
 * 3. Derived state calculations
 * 4. Local storage persistence
 * 5. Optimistic updates
 */

"use client"

import React, { useReducer, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingCart, 
  CreditCard, 
  Package,
  Percent,
  Gift
} from "lucide-react"

// TYPES
interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image?: string
  category: string
  discount?: number
}

interface Coupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  minAmount?: number
}

interface CartState {
  items: CartItem[]
  appliedCoupon: Coupon | null
  isLoading: boolean
  lastUpdated: Date
  shippingCost: number
  tax: number
}

// ACTIONS
type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_COUPON'; payload: Coupon }
  | { type: 'REMOVE_COUPON' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_FROM_STORAGE'; payload: CartItem[] }
  | { type: 'UPDATE_SHIPPING'; payload: number }

// SAMPLE PRODUCTS
const sampleProducts: Omit<CartItem, 'quantity'>[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 99.99,
    category: 'Electronics',
    discount: 10
  },
  {
    id: '2',
    name: 'Coffee Mug',
    price: 15.99,
    category: 'Home & Kitchen'
  },
  {
    id: '3',
    name: 'Notebook',
    price: 8.50,
    category: 'Stationery'
  },
  {
    id: '4',
    name: 'Smartphone Case',
    price: 24.99,
    category: 'Electronics',
    discount: 15
  },
  {
    id: '5',
    name: 'Desk Lamp',
    price: 45.00,
    category: 'Home & Office'
  }
]

// SAMPLE COUPONS
const availableCoupons: Coupon[] = [
  {
    code: 'SAVE10',
    discount: 10,
    type: 'percentage',
    minAmount: 50
  },
  {
    code: 'WELCOME20',
    discount: 20,
    type: 'fixed',
    minAmount: 30
  },
  {
    code: 'STUDENT15',
    discount: 15,
    type: 'percentage'
  }
]

// INITIAL STATE
const initialState: CartState = {
  items: [],
  appliedCoupon: null,
  isLoading: false,
  lastUpdated: new Date(),
  shippingCost: 0,
  tax: 0.08 // 8% tax
}

// REDUCER
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          lastUpdated: new Date()
        }
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        lastUpdated: new Date()
      }
    }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        lastUpdated: new Date()
      }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(item => item.id !== action.payload.id),
          lastUpdated: new Date()
        }
      }
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        lastUpdated: new Date()
      }
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        appliedCoupon: null,
        lastUpdated: new Date()
      }
    
    case 'APPLY_COUPON':
      return {
        ...state,
        appliedCoupon: action.payload
      }
    
    case 'REMOVE_COUPON':
      return {
        ...state,
        appliedCoupon: null
      }
    
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    
    case 'LOAD_FROM_STORAGE':
      return {
        ...state,
        items: action.payload
      }
    
    case 'UPDATE_SHIPPING':
      return {
        ...state,
        shippingCost: action.payload
      }
    
    default:
      return state
  }
}

// DERIVED STATE CALCULATIONS
function useCartCalculations(state: CartState) {
  const subtotal = state.items.reduce((total, item) => {
    const itemPrice = item.discount 
      ? item.price * (1 - item.discount / 100)
      : item.price
    return total + (itemPrice * item.quantity)
  }, 0)
  
  const couponDiscount = state.appliedCoupon 
    ? state.appliedCoupon.type === 'percentage'
      ? subtotal * (state.appliedCoupon.discount / 100)
      : state.appliedCoupon.discount
    : 0
  
  const discountedSubtotal = subtotal - couponDiscount
  const taxAmount = discountedSubtotal * state.tax
  const total = discountedSubtotal + taxAmount + state.shippingCost
  
  const totalItems = state.items.reduce((total, item) => total + item.quantity, 0)
  
  return {
    subtotal,
    couponDiscount,
    taxAmount,
    total,
    totalItems,
    isEmpty: state.items.length === 0
  }
}

// COMPONENTS

// Product List Component
function ProductList({ onAddToCart }: { onAddToCart: (product: Omit<CartItem, 'quantity'>) => void }) {
  return (
    <div className="space-y-3">
      <h3 className="font-semibold flex items-center gap-2">
        <Package className="h-4 w-4" />
        Available Products
      </h3>
      <div className="grid gap-3">
        {sampleProducts.map(product => (
          <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{product.name}</h4>
                {product.discount && (
                  <Badge variant="destructive" className="text-xs">
                    -{product.discount}%
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{product.category}</p>
              <div className="flex items-center gap-2">
                {product.discount ? (
                  <>
                    <span className="text-sm line-through text-gray-400">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="font-medium text-green-600">
                      ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                    </span>
                  </>
                ) : (
                  <span className="font-medium">${product.price.toFixed(2)}</span>
                )}
              </div>
            </div>
            <Button size="sm" onClick={() => onAddToCart(product)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

// Cart Items Component
function CartItems({ 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}: { 
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
        <p>Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {items.map(item => {
        const itemPrice = item.discount 
          ? item.price * (1 - item.discount / 100)
          : item.price
        
        return (
          <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{item.name}</h4>
                {item.discount && (
                  <Badge variant="destructive" className="text-xs">
                    -{item.discount}%
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="font-medium">${itemPrice.toFixed(2)} each</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              
              <span className="w-8 text-center">{item.quantity}</span>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onRemoveItem(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="text-right">
              <p className="font-medium">${(itemPrice * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Coupon Component
function CouponSection({ 
  appliedCoupon, 
  onApplyCoupon, 
  onRemoveCoupon,
  subtotal 
}: {
  appliedCoupon: Coupon | null
  onApplyCoupon: (coupon: Coupon) => void
  onRemoveCoupon: () => void
  subtotal: number
}) {
  const [couponCode, setCouponCode] = useState('')
  const [error, setError] = useState('')

  const handleApplyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code === couponCode.toUpperCase())
    
    if (!coupon) {
      setError('Invalid coupon code')
      return
    }
    
    if (coupon.minAmount && subtotal < coupon.minAmount) {
      setError(`Minimum order amount: $${coupon.minAmount}`)
      return
    }
    
    setError('')
    setCouponCode('')
    onApplyCoupon(coupon)
  }

  return (
    <div className="space-y-3">
      <h4 className="font-medium flex items-center gap-2">
        <Gift className="h-4 w-4" />
        Coupon Code
      </h4>
      
      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
          <div>
            <p className="font-medium text-green-800">{appliedCoupon.code}</p>
            <p className="text-sm text-green-600">
              {appliedCoupon.type === 'percentage' 
                ? `${appliedCoupon.discount}% off`
                : `$${appliedCoupon.discount} off`
              }
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={onRemoveCoupon}>
            Remove
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => {
                setCouponCode(e.target.value)
                setError('')
              }}
              className={error ? 'border-red-500' : ''}
            />
            <Button onClick={handleApplyCoupon}>
              Apply
            </Button>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <div className="text-xs text-gray-600">
            <p>Available codes: SAVE10, WELCOME20, STUDENT15</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Order Summary Component
function OrderSummary({ 
  calculations, 
  appliedCoupon,
  shippingCost,
  onCheckout 
}: {
  calculations: ReturnType<typeof useCartCalculations>
  appliedCoupon: Coupon | null
  shippingCost: number
  onCheckout: () => void
}) {
  return (
    <div className="space-y-3">
      <h4 className="font-medium">Order Summary</h4>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal ({calculations.totalItems} items)</span>
          <span>${calculations.subtotal.toFixed(2)}</span>
        </div>
        
        {appliedCoupon && (
          <div className="flex justify-between text-green-600">
            <span>Coupon ({appliedCoupon.code})</span>
            <span>-${calculations.couponDiscount.toFixed(2)}</span>
          </div>
        )}
        
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
        </div>
        
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${calculations.taxAmount.toFixed(2)}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-medium text-lg">
          <span>Total</span>
          <span>${calculations.total.toFixed(2)}</span>
        </div>
      </div>
      
      <Button 
        onClick={onCheckout} 
        disabled={calculations.isEmpty}
        className="w-full"
      >
        <CreditCard className="h-4 w-4 mr-2" />
        Proceed to Checkout
      </Button>
    </div>
  )
}

// Main Shopping Cart Component
export default function ShoppingCartExample() {
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const calculations = useCartCalculations(state)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart')
    if (savedCart) {
      try {
        const items = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: items })
      } catch (error) {
        console.error('Failed to load cart from storage:', error)
      }
    }
  }, [])

  // Save cart to localStorage when items change
  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(state.items))
  }, [state.items])

  // Update shipping cost based on subtotal
  useEffect(() => {
    const newShippingCost = calculations.subtotal >= 50 ? 0 : 9.99
    if (newShippingCost !== state.shippingCost) {
      dispatch({ type: 'UPDATE_SHIPPING', payload: newShippingCost })
    }
  }, [calculations.subtotal, state.shippingCost])

  const handleAddToCart = (product: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const handleApplyCoupon = (coupon: Coupon) => {
    dispatch({ type: 'APPLY_COUPON', payload: coupon })
  }

  const handleRemoveCoupon = () => {
    dispatch({ type: 'REMOVE_COUPON' })
  }

  const handleCheckout = async () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    // Simulate checkout process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    alert(`Order placed! Total: $${calculations.total.toFixed(2)}`)
    dispatch({ type: 'CLEAR_CART' })
    dispatch({ type: 'SET_LOADING', payload: false })
  }

  const handleClearCart = () => {
    if (confirm('Are you sure you want to clear your cart?')) {
      dispatch({ type: 'CLEAR_CART' })
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Products */}
        <Card>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Add items to your cart</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductList onAddToCart={handleAddToCart} />
          </CardContent>
        </Card>

        {/* Cart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Shopping Cart
                  {calculations.totalItems > 0 && (
                    <Badge>{calculations.totalItems}</Badge>
                  )}
                </CardTitle>
                <CardDescription>
                  {calculations.isEmpty ? 'No items in cart' : `${calculations.totalItems} items`}
                </CardDescription>
              </div>
              {!calculations.isEmpty && (
                <Button size="sm" variant="outline" onClick={handleClearCart}>
                  Clear Cart
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <CartItems
              items={state.items}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </CardContent>
        </Card>
      </div>

      {/* Coupon and Summary */}
      {!calculations.isEmpty && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Coupon Code</CardTitle>
              <CardDescription>Apply a discount to your order</CardDescription>
            </CardHeader>
            <CardContent>
              <CouponSection
                appliedCoupon={state.appliedCoupon}
                onApplyCoupon={handleApplyCoupon}
                onRemoveCoupon={handleRemoveCoupon}
                subtotal={calculations.subtotal}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>
                {calculations.subtotal >= 50 ? 'Free shipping!' : 'Add $' + (50 - calculations.subtotal).toFixed(2) + ' for free shipping'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <OrderSummary
                calculations={calculations}
                appliedCoupon={state.appliedCoupon}
                shippingCost={state.shippingCost}
                onCheckout={handleCheckout}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Implementation Details */}
      <Card>
        <CardHeader>
          <CardTitle>Implementation Features</CardTitle>
          <CardDescription>What this example demonstrates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold mb-2">useReducer Features:</h4>
              <ul className="text-sm space-y-1">
                <li>• Complex state with multiple properties</li>
                <li>• Multiple action types for different operations</li>
                <li>• Immutable state updates</li>
                <li>• Derived state calculations</li>
                <li>• Optimistic updates</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Real-world Features:</h4>
              <ul className="text-sm space-y-1">
                <li>• Local storage persistence</li>
                <li>• Coupon system with validation</li>
                <li>• Dynamic shipping calculation</li>
                <li>• Tax calculation</li>
                <li>• Loading states</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}