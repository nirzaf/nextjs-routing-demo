/**
 * PROPS EXAMPLES COMPONENT
 * 
 * Demonstrates various React props patterns:
 * 1. Basic props
 * 2. Destructured props
 * 3. Optional props with defaults
 * 4. Children props
 * 5. Function props (callbacks)
 * 6. Object props
 * 7. Array props
 * 8. Render props pattern
 */

"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, MessageCircle } from "lucide-react"

// 1. Basic Props Interface
interface BasicProps {
  title: string
  count: number
  isActive: boolean
}

// Basic Props Component
function BasicPropsComponent(props: BasicProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold">{props.title}</h3>
      <p>Count: {props.count}</p>
      <Badge variant={props.isActive ? "default" : "secondary"}>
        {props.isActive ? "Active" : "Inactive"}
      </Badge>
    </div>
  )
}

// 2. Destructured Props
interface DestructuredProps {
  name: string
  age: number
  email: string
}

function DestructuredPropsComponent({ name, age, email }: DestructuredProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold">{name}</h3>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  )
}

// 3. Optional Props with Defaults
interface OptionalProps {
  title: string
  subtitle?: string
  color?: "blue" | "green" | "red"
  showIcon?: boolean
}

function OptionalPropsComponent({ 
  title, 
  subtitle = "Default subtitle", 
  color = "blue", 
  showIcon = true 
}: OptionalProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800"
  }

  return (
    <div className={`p-4 border rounded-lg ${colorClasses[color]}`}>
      <div className="flex items-center gap-2">
        {showIcon && <Star className="h-4 w-4" />}
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-sm">{subtitle}</p>
    </div>
  )
}

// 4. Children Props
interface ChildrenProps {
  title: string
  children: React.ReactNode
}

function ChildrenPropsComponent({ title, children }: ChildrenProps) {
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  )
}

// 5. Function Props (Callbacks)
interface FunctionProps {
  label: string
  onClick: () => void
  onHover?: (message: string) => void
}

function FunctionPropsComponent({ label, onClick, onHover }: FunctionProps) {
  return (
    <Button 
      onClick={onClick}
      onMouseEnter={() => onHover?.("Button hovered!")}
      className="w-full"
    >
      {label}
    </Button>
  )
}

// 6. Object Props
interface User {
  id: number
  name: string
  avatar: string
  role: string
}

interface ObjectProps {
  user: User
  settings: {
    theme: "light" | "dark"
    notifications: boolean
  }
}

function ObjectPropsComponent({ user, settings }: ObjectProps) {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.role}</p>
        </div>
      </div>
      <div className="text-sm">
        <p>Theme: {settings.theme}</p>
        <p>Notifications: {settings.notifications ? "On" : "Off"}</p>
      </div>
    </div>
  )
}

// 7. Array Props
interface ArrayProps {
  items: string[]
  numbers: number[]
  tags: { id: number; name: string; color: string }[]
}

function ArrayPropsComponent({ items, numbers, tags }: ArrayProps) {
  return (
    <div className="p-4 border rounded-lg space-y-3">
      <div>
        <h4 className="font-medium mb-1">String Items:</h4>
        <ul className="text-sm space-y-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h4 className="font-medium mb-1">Numbers:</h4>
        <div className="flex gap-2">
          {numbers.map((num, index) => (
            <Badge key={index} variant="outline">{num}</Badge>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-medium mb-1">Tags:</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge key={tag.id} style={{ backgroundColor: tag.color, color: "white" }}>
              {tag.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}

// 8. Render Props Pattern
interface RenderProps {
  data: any[]
  loading: boolean
  render: (data: any[], loading: boolean) => React.ReactNode
}

function RenderPropsComponent({ data, loading, render }: RenderProps) {
  return <div className="p-4 border rounded-lg">{render(data, loading)}</div>
}

// Main Props Examples Component
export default function PropsExamples() {
  const [message, setMessage] = useState("")
  const [clickCount, setClickCount] = useState(0)

  const sampleUser: User = {
    id: 1,
    name: "John Doe",
    avatar: "/avatar.jpg",
    role: "Developer"
  }

  const sampleSettings = {
    theme: "light" as const,
    notifications: true
  }

  const sampleTags = [
    { id: 1, name: "React", color: "#61DAFB" },
    { id: 2, name: "Next.js", color: "#000000" },
    { id: 3, name: "TypeScript", color: "#3178C6" }
  ]

  const sampleData = ["Item 1", "Item 2", "Item 3"]

  return (
    <div className="space-y-6">
      {/* Status Message */}
      {message && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-blue-800">{message}</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* 1. Basic Props */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">1. Basic Props</CardTitle>
            <CardDescription>Standard prop passing without destructuring</CardDescription>
          </CardHeader>
          <CardContent>
            <BasicPropsComponent 
              title="Basic Component" 
              count={42} 
              isActive={true} 
            />
          </CardContent>
        </Card>

        {/* 2. Destructured Props */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">2. Destructured Props</CardTitle>
            <CardDescription>Props destructured in function parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <DestructuredPropsComponent 
              name="Alice Smith" 
              age={28} 
              email="alice@example.com" 
            />
          </CardContent>
        </Card>

        {/* 3. Optional Props */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">3. Optional Props</CardTitle>
            <CardDescription>Props with default values and optional parameters</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <OptionalPropsComponent title="With Defaults" />
            <OptionalPropsComponent 
              title="Custom Props" 
              subtitle="Custom subtitle" 
              color="green" 
              showIcon={false} 
            />
          </CardContent>
        </Card>

        {/* 4. Children Props */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">4. Children Props</CardTitle>
            <CardDescription>Components that accept children elements</CardDescription>
          </CardHeader>
          <CardContent>
            <ChildrenPropsComponent title="Container Component">
              <p>This is child content</p>
              <Button size="sm">Child Button</Button>
              <div className="flex gap-2">
                <Heart className="h-4 w-4 text-red-500" />
                <MessageCircle className="h-4 w-4 text-blue-500" />
              </div>
            </ChildrenPropsComponent>
          </CardContent>
        </Card>

        {/* 5. Function Props */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">5. Function Props (Callbacks)</CardTitle>
            <CardDescription>Props that are functions for event handling</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Click count: {clickCount}</p>
              <FunctionPropsComponent 
                label="Click Me!" 
                onClick={() => {
                  setClickCount(prev => prev + 1)
                  setMessage(`Button clicked ${clickCount + 1} times!`)
                }}
                onHover={(msg) => setMessage(msg)}
              />
            </div>
          </CardContent>
        </Card>

        {/* 6. Object Props */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">6. Object Props</CardTitle>
            <CardDescription>Passing complex objects as props</CardDescription>
          </CardHeader>
          <CardContent>
            <ObjectPropsComponent user={sampleUser} settings={sampleSettings} />
          </CardContent>
        </Card>

        {/* 7. Array Props */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">7. Array Props</CardTitle>
            <CardDescription>Passing arrays and rendering lists</CardDescription>
          </CardHeader>
          <CardContent>
            <ArrayPropsComponent 
              items={["First item", "Second item", "Third item"]}
              numbers={[1, 2, 3, 4, 5]}
              tags={sampleTags}
            />
          </CardContent>
        </Card>

        {/* 8. Render Props */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">8. Render Props Pattern</CardTitle>
            <CardDescription>Function as children for flexible rendering</CardDescription>
          </CardHeader>
          <CardContent>
            <RenderPropsComponent 
              data={sampleData}
              loading={false}
              render={(data, loading) => (
                <div>
                  <h4 className="font-medium mb-2">Custom Render:</h4>
                  {loading ? (
                    <p>Loading...</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {data.map((item, index) => (
                        <div key={index} className="p-2 bg-gray-100 rounded text-center text-sm">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            />
          </CardContent>
        </Card>
      </div>

      {/* Code Examples */}
      <Card>
        <CardHeader>
          <CardTitle>TypeScript Interface Examples</CardTitle>
          <CardDescription>How to define props interfaces in TypeScript</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`// Basic Props Interface
interface BasicProps {
  title: string
  count: number
  isActive: boolean
}

// Optional Props with Defaults
interface OptionalProps {
  title: string
  subtitle?: string  // Optional
  color?: "blue" | "green" | "red"  // Union type
  showIcon?: boolean
}

// Children Props
interface ChildrenProps {
  title: string
  children: React.ReactNode  // For any React content
}

// Function Props
interface FunctionProps {
  onClick: () => void  // No parameters, no return
  onHover?: (message: string) => void  // Optional with parameter
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}