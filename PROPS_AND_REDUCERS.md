# Props and Reducers Implementation in Next.js

This document provides a comprehensive guide to implementing **Props patterns** and **useReducer** for state management in Next.js applications.

## 📁 File Structure

```
app/examples/
├── page.tsx                           # Main examples page with tabs
└── components/
    ├── PropsExamples.tsx              # Props patterns demonstration
    ├── ReducerExamples.tsx            # useReducer examples
    ├── ContextReducerExample.tsx      # Context + Reducer global state
    └── ShoppingCartExample.tsx        # Real-world cart implementation
```

## 🎯 What's Implemented

### 1. Props Patterns (`PropsExamples.tsx`)

#### Basic Props

```typescript
interface BasicProps {
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
}
```

#### Destructured Props

```typescript
function DestructuredComponent({ name, age, email }: DestructuredProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  )
}
```

#### Optional Props with Defaults

```typescript
interface OptionalProps {
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
}
```

#### Children Props

```typescript
interface ChildrenProps {
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
}
```

#### Function Props (Callbacks)

```typescript
interface FunctionProps {
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
}
```

#### Object and Array Props

```typescript
interface User {
  id: number
  name: string
  role: string
}

interface ComplexProps {
  user: User
  tags: { id: number; name: string; color: string }[]
  settings: { theme: "light" | "dark"; notifications: boolean }
}
```

#### Render Props Pattern

```typescript
interface RenderProps {
  data: any[]
  loading: boolean
  render: (data: any[], loading: boolean) => React.ReactNode
}

function RenderPropsComponent({ data, loading, render }: RenderProps) {
  return <div>{render(data, loading)}</div>
}
```

### 2. useReducer Patterns (`ReducerExamples.tsx`)

#### Simple Counter with History

```typescript
type CounterAction = 
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
    case 'SET_VALUE':
      return {
        count: action.payload,
        history: [...state.history, action.payload]
      }
    default:
      return state
  }
}
```

#### Form State Management

```typescript
type FormAction = 
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'CLEAR_ERRORS' }
  | { type: 'RESET_FORM' }
  | { type: 'SET_SUBMITTING'; submitting: boolean }

interface FormState {
  values: Record<string, string>
  errors: Record<string, string>
  isSubmitting: boolean
}

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        values: { ...state.values, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: '' }
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error }
      }
    // ... other cases
  }
}
```

#### Todo List with CRUD Operations

```typescript
interface Todo {
  id: number
  text: string
  completed: boolean
  createdAt: Date
}

type TodoAction = 
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number }
  | { type: 'EDIT_TODO'; id: number; text: string }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; filter: 'all' | 'active' | 'completed' }

interface TodoState {
  todos: Todo[]
  filter: 'all' | 'active' | 'completed'
  nextId: number
}
```

### 3. Context + useReducer (`ContextReducerExample.tsx`)

#### Global State Setup

```typescript
// 1. Define State and Actions
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
  // ... more actions

// 2. Create Context
interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<AppAction>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

// 3. Provider Component
export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

// 4. Custom Hook
export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

// 5. Specialized Hooks
export function useAuth() {
  const { state, dispatch } = useApp()
  
  const login = async (email: string, password: string) => {
    // Login logic
    dispatch({ type: 'SET_USER', payload: user })
  }
  
  const logout = () => {
    dispatch({ type: 'LOGOUT' })
  }
  
  return { user: state.user, login, logout }
}
```

### 4. Real-World Example: Shopping Cart (`ShoppingCartExample.tsx`)

#### Features Implemented

- ✅ Add/remove items
- ✅ Update quantities
- ✅ Apply coupon codes
- ✅ Calculate taxes and shipping
- ✅ Local storage persistence
- ✅ Dynamic shipping (free over $50)
- ✅ Form validation
- ✅ Loading states
- ✅ Optimistic updates

#### Cart State Structure

```typescript
interface CartItem {
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
  | { type: 'CLEAR_CART' }
  // ... more actions
```

#### Derived State Calculations

```typescript
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
  
  const taxAmount = (subtotal - couponDiscount) * state.tax
  const total = subtotal - couponDiscount + taxAmount + state.shippingCost
  
  return { subtotal, couponDiscount, taxAmount, total }
}
```

## 🚀 How to Test

1. **Navigate to Examples Page**:

   ```
   http://localhost:3001/examples
   ```

2. **Test Props Patterns**:
   - Click the "Props Patterns" tab
   - Interact with different prop examples
   - See how props are passed and handled

3. **Test useReducer**:
   - Click the "useReducer" tab
   - Try the counter, form, and todo examples
   - Observe state management patterns

4. **Test Context + Reducer**:
   - Click the "Context + Reducer" tab
   - Login with different emails (try <admin@example.com>)
   - Add notifications and manage cart

5. **Test Shopping Cart**:
   - Click the "Shopping Cart" tab
   - Add products to cart
   - Apply coupon codes (SAVE10, WELCOME20, STUDENT15)
   - Test checkout process

## 📚 Key Concepts

### When to Use Props vs useReducer vs Context

#### Use Props When

- ✅ Passing data down one or two levels
- ✅ Simple, independent values
- ✅ Component-specific data
- ✅ Event handlers and callbacks

#### Use useReducer When

- ✅ Complex state logic with multiple sub-values
- ✅ State transitions depend on previous state
- ✅ Multiple actions can update the same state
- ✅ Need predictable state updates
- ✅ State logic benefits from testing

#### Use Context + useReducer When

- ✅ Global application state
- ✅ State needed by many components
- ✅ Avoiding prop drilling
- ✅ User authentication state
- ✅ Theme, settings, or preferences
- ✅ Shopping cart or similar features

### Best Practices

#### Props

1. **Use TypeScript interfaces** for type safety
2. **Destructure props** for cleaner code
3. **Provide default values** for optional props
4. **Use union types** for restricted values
5. **Keep props focused** - single responsibility

#### useReducer

1. **Use discriminated unions** for action types
2. **Keep reducers pure** - no side effects
3. **Use immutable updates** with spread operator
4. **Group related state** in single reducer
5. **Add TypeScript** for action and state types

#### Context + useReducer

1. **Create custom hooks** for easier consumption
2. **Split contexts** by domain (auth, cart, etc.)
3. **Provide error boundaries** for context errors
4. **Use React.memo** to optimize re-renders
5. **Keep context focused** - avoid god objects

## 🔧 Performance Considerations

### Props

- Use `React.memo` for expensive components
- Avoid creating objects/functions in render
- Use `useCallback` and `useMemo` when needed

### useReducer

- Reducers are called on every dispatch
- Use `React.memo` to prevent unnecessary re-renders
- Consider splitting large reducers

### Context

- Context triggers re-renders for all consumers
- Split contexts to minimize re-renders
- Use `useMemo` for context values
- Consider state colocation

## 🎨 UI Components Used

The examples use shadcn/ui components:

- `Button` - Interactive buttons
- `Input` - Form inputs
- `Card` - Content containers
- `Badge` - Status indicators
- `Tabs` - Navigation tabs
- `Checkbox` - Form checkboxes
- `Avatar` - User avatars
- `Separator` - Visual dividers

## 📖 Additional Resources

- [React Props Documentation](https://react.dev/learn/passing-props-to-a-component)
- [useReducer Hook](https://react.dev/reference/react/useReducer)
- [Context API](https://react.dev/reference/react/createContext)
- [TypeScript with React](https://react.dev/learn/typescript)
- [Next.js Documentation](https://nextjs.org/docs)

---

**Note**: All examples include comprehensive TypeScript types, error handling, and follow React best practices. The implementations demonstrate both simple and complex use cases to provide a complete learning experience.
