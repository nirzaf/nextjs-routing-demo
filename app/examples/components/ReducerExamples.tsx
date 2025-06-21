/**
 * REDUCER EXAMPLES COMPONENT
 * 
 * Demonstrates useReducer patterns:
 * 1. Simple counter with multiple actions
 * 2. Form state management
 * 3. Todo list with complex state
 * 4. Async actions with loading states
 */

"use client"

import React, { useReducer, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Minus, RotateCcw, Trash2, Edit, Check, X } from "lucide-react"

// 1. SIMPLE COUNTER REDUCER
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

function CounterExample() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, history: [0] })
  const [inputValue, setInputValue] = useState('')

  const handleSetValue = () => {
    const value = parseInt(inputValue)
    if (!isNaN(value)) {
      dispatch({ type: 'SET_VALUE', payload: value })
      setInputValue('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="text-4xl font-bold mb-4">{state.count}</div>
        <div className="flex gap-2 justify-center mb-4">
          <Button onClick={() => dispatch({ type: 'DECREMENT' })} variant="outline">
            <Minus className="h-4 w-4" />
          </Button>
          <Button onClick={() => dispatch({ type: 'INCREMENT' })}>
            <Plus className="h-4 w-4" />
          </Button>
          <Button onClick={() => dispatch({ type: 'RESET' })} variant="destructive">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 justify-center">
          <Input 
            type="number" 
            placeholder="Set value" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-32"
          />
          <Button onClick={handleSetValue} variant="outline">Set</Button>
        </div>
      </div>
      <div>
        <h4 className="font-medium mb-2">History:</h4>
        <div className="flex flex-wrap gap-1">
          {state.history.slice(-10).map((value, index) => (
            <Badge key={index} variant="outline">{value}</Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

// 2. FORM STATE REDUCER
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
        values: {
          ...state.values,
          [action.field]: action.value
        },
        errors: {
          ...state.errors,
          [action.field]: '' // Clear error when user types
        }
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.field]: action.error
        }
      }
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: {}
      }
    case 'RESET_FORM':
      return {
        values: {},
        errors: {},
        isSubmitting: false
      }
    case 'SET_SUBMITTING':
      return {
        ...state,
        isSubmitting: action.submitting
      }
    default:
      return state
  }
}

function FormExample() {
  const [state, dispatch] = useReducer(formReducer, {
    values: {},
    errors: {},
    isSubmitting: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    dispatch({ type: 'CLEAR_ERRORS' })
    
    // Validation
    if (!state.values.name) {
      dispatch({ type: 'SET_ERROR', field: 'name', error: 'Name is required' })
      return
    }
    if (!state.values.email) {
      dispatch({ type: 'SET_ERROR', field: 'email', error: 'Email is required' })
      return
    }
    if (!state.values.email.includes('@')) {
      dispatch({ type: 'SET_ERROR', field: 'email', error: 'Invalid email format' })
      return
    }

    dispatch({ type: 'SET_SUBMITTING', submitting: true })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    dispatch({ type: 'SET_SUBMITTING', submitting: false })
    dispatch({ type: 'RESET_FORM' })
    alert('Form submitted successfully!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          placeholder="Name"
          value={state.values.name || ''}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
          className={state.errors.name ? 'border-red-500' : ''}
        />
        {state.errors.name && (
          <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
        )}
      </div>
      
      <div>
        <Input
          type="email"
          placeholder="Email"
          value={state.values.email || ''}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'email', value: e.target.value })}
          className={state.errors.email ? 'border-red-500' : ''}
        />
        {state.errors.email && (
          <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
        )}
      </div>
      
      <div>
        <Input
          placeholder="Message"
          value={state.values.message || ''}
          onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'message', value: e.target.value })}
        />
      </div>
      
      <div className="flex gap-2">
        <Button type="submit" disabled={state.isSubmitting}>
          {state.isSubmitting ? 'Submitting...' : 'Submit'}
        </Button>
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => dispatch({ type: 'RESET_FORM' })}
        >
          Reset
        </Button>
      </div>
    </form>
  )
}

// 3. TODO LIST REDUCER
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

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: state.nextId,
            text: action.text,
            completed: false,
            createdAt: new Date()
          }
        ],
        nextId: state.nextId + 1
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
        )
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id)
      }
    case 'EDIT_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? { ...todo, text: action.text } : todo
        )
      }
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter(todo => !todo.completed)
      }
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.filter
      }
    default:
      return state
  }
}

function TodoExample() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [
      { id: 1, text: 'Learn React', completed: true, createdAt: new Date() },
      { id: 2, text: 'Learn Next.js', completed: false, createdAt: new Date() },
      { id: 3, text: 'Build awesome apps', completed: false, createdAt: new Date() }
    ],
    filter: 'all',
    nextId: 4
  })
  
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editText, setEditText] = useState('')

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed
    if (state.filter === 'completed') return todo.completed
    return true
  })

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', text: newTodo.trim() })
      setNewTodo('')
    }
  }

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id)
    setEditText(todo.text)
  }

  const handleSaveEdit = () => {
    if (editingId && editText.trim()) {
      dispatch({ type: 'EDIT_TODO', id: editingId, text: editText.trim() })
    }
    setEditingId(null)
    setEditText('')
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className="space-y-4">
      {/* Add Todo Form */}
      <form onSubmit={handleAddTodo} className="flex gap-2">
        <Input
          placeholder="Add a new todo..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="flex-1"
        />
        <Button type="submit">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      {/* Filter Buttons */}
      <div className="flex gap-2">
        {(['all', 'active', 'completed'] as const).map(filter => (
          <Button
            key={filter}
            variant={state.filter === filter ? 'default' : 'outline'}
            size="sm"
            onClick={() => dispatch({ type: 'SET_FILTER', filter })}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
        ))}
        <Button
          variant="destructive"
          size="sm"
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          disabled={!state.todos.some(todo => todo.completed)}
        >
          Clear Completed
        </Button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {filteredTodos.map(todo => (
          <div key={todo.id} className="flex items-center gap-2 p-3 border rounded-lg">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => dispatch({ type: 'TOGGLE_TODO', id: todo.id })}
            />
            
            {editingId === todo.id ? (
              <div className="flex-1 flex gap-2">
                <Input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit()
                    if (e.key === 'Escape') handleCancelEdit()
                  }}
                  autoFocus
                />
                <Button size="sm" onClick={handleSaveEdit}>
                  <Check className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <>
                <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.text}
                </span>
                <Button size="sm" variant="outline" onClick={() => handleEdit(todo)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive" 
                  onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="text-sm text-gray-600">
        <p>Total: {state.todos.length} | Active: {state.todos.filter(t => !t.completed).length} | Completed: {state.todos.filter(t => t.completed).length}</p>
      </div>
    </div>
  )
}

// Main Reducer Examples Component
export default function ReducerExamples() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Counter Example */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. Counter with History</CardTitle>
            <CardDescription>
              Simple useReducer example with multiple action types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CounterExample />
          </CardContent>
        </Card>

        {/* Form Example */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">2. Form State Management</CardTitle>
            <CardDescription>
              Complex form state with validation and error handling
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormExample />
          </CardContent>
        </Card>
      </div>

      {/* Todo Example - Full Width */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">3. Todo List with Filtering</CardTitle>
          <CardDescription>
            Advanced useReducer example with CRUD operations and filtering
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TodoExample />
        </CardContent>
      </Card>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>useReducer Pattern Examples</CardTitle>
          <CardDescription>Common patterns and best practices</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// 1. Define Action Types
type CounterAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_VALUE'; payload: number }

// 2. Define State Interface
interface CounterState {
  count: number
  history: number[]
}

// 3. Create Reducer Function
const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 }
    case 'DECREMENT':
      return { ...state, count: state.count - 1 }
    case 'SET_VALUE':
      return { ...state, count: action.payload }
    default:
      return state
  }
}

// 4. Use in Component
function Counter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0, history: [] })
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  )
}`}
          </pre>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>When to Use useReducer vs useState</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-green-700 mb-2">Use useReducer when:</h4>
              <ul className="text-sm space-y-1 text-green-600">
                <li>• Complex state logic with multiple sub-values</li>
                <li>• State transitions depend on previous state</li>
                <li>• Multiple actions can update the same state</li>
                <li>• Need predictable state updates</li>
                <li>• State logic is complex and benefits from testing</li>
                <li>• Want to optimize performance with React.memo</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-700 mb-2">Use useState when:</h4>
              <ul className="text-sm space-y-1 text-blue-600">
                <li>• Simple state values (string, number, boolean)</li>
                <li>• Independent state updates</li>
                <li>• State logic is straightforward</li>
                <li>• Quick prototyping</li>
                <li>• Component state is simple</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}