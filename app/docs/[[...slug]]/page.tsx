/**
 * OPTIONAL CATCH-ALL ROUTES
 * 
 * This demonstrates optional catch-all routes using [[...slug]] syntax.
 * Unlike regular catch-all routes [...slug], optional catch-all routes
 * also match the route without any parameters.
 * 
 * This route matches:
 * - /docs (slug will be undefined)
 * - /docs/getting-started (slug will be ['getting-started'])
 * - /docs/api/authentication (slug will be ['api', 'authentication'])
 * - /docs/guides/routing/advanced (slug will be ['guides', 'routing', 'advanced'])
 * 
 * Key Differences from Regular Catch-All Routes:
 * - [...slug] requires at least one segment
 * - [[...slug]] can match zero or more segments
 * - Perfect for documentation sites, blogs, or flexible content structures
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  BookOpen, 
  FileText, 
  Code, 
  Zap, 
  ArrowRight, 
  Home,
  ChevronRight
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock documentation structure
const docsStructure = {
  'getting-started': {
    title: 'Getting Started',
    description: 'Learn the basics of Next.js routing',
    content: 'Welcome to Next.js routing! This guide will help you understand the fundamentals of file-based routing, dynamic routes, and advanced patterns.',
    sections: ['Installation', 'First Route', 'File Structure', 'Basic Navigation']
  },
  'api': {
    'authentication': {
      title: 'API Authentication',
      description: 'Secure your API routes with authentication',
      content: 'Learn how to implement authentication in your Next.js API routes using various strategies including JWT, OAuth, and session-based auth.',
      sections: ['JWT Tokens', 'OAuth Integration', 'Session Management', 'Middleware Protection']
    },
    'rate-limiting': {
      title: 'Rate Limiting',
      description: 'Implement rate limiting for your API endpoints',
      content: 'Protect your API from abuse by implementing rate limiting strategies.',
      sections: ['Basic Rate Limiting', 'Advanced Strategies', 'Redis Integration']
    }
  },
  'guides': {
    'routing': {
      'advanced': {
        title: 'Advanced Routing Patterns',
        description: 'Master complex routing scenarios',
        content: 'Explore advanced routing patterns including parallel routes, intercepting routes, and route groups.',
        sections: ['Parallel Routes', 'Intercepting Routes', 'Route Groups', 'Middleware']
      },
      'dynamic': {
        title: 'Dynamic Routes',
        description: 'Create flexible URL structures',
        content: 'Learn how to create dynamic routes that can handle variable URL segments.',
        sections: ['Basic Dynamic Routes', 'Catch-all Routes', 'Optional Catch-all']
      }
    }
  }
}

// Helper function to get nested content
function getContentBySlug(slug?: string[]): any {
  if (!slug || slug.length === 0) {
    return {
      title: 'Documentation',
      description: 'Complete guide to Next.js routing',
      isIndex: true
    }
  }

  let current: any = docsStructure
  for (const segment of slug) {
    if (current[segment]) {
      current = current[segment]
    } else {
      return null
    }
  }

  return current
}

// Generate breadcrumbs
function generateBreadcrumbs(slug?: string[]) {
  const breadcrumbs = [{ label: 'Docs', href: '/docs' }]
  
  if (slug && slug.length > 0) {
    let currentPath = '/docs'
    for (let i = 0; i < slug.length; i++) {
      currentPath += `/${slug[i]}`
      breadcrumbs.push({
        label: slug[i].replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
        href: currentPath
      })
    }
  }
  
  return breadcrumbs
}

export default function DocsPage({ 
  params 
}: { 
  params: { slug?: string[] } 
}) {
  const content = getContentBySlug(params.slug)
  
  if (!content) {
    notFound()
  }

  const breadcrumbs = generateBreadcrumbs(params.slug)
  const isIndex = content.isIndex

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
        {breadcrumbs.map((crumb, index) => (
          <div key={crumb.href} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 mx-2" />}
            <Link 
              href={crumb.href}
              className={index === breadcrumbs.length - 1 ? 'text-foreground font-medium' : 'hover:text-foreground'}
            >
              {crumb.label}
            </Link>
          </div>
        ))}
      </nav>

      {/* Optional Catch-All Route Explanation */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Optional Catch-All Routes Demo
          </CardTitle>
          <CardDescription>
            This page uses [[...slug]] syntax to handle flexible URL structures
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h3 className="font-semibold">Current Route:</h3>
              <code className="block bg-muted p-2 rounded text-sm">
                {params.slug ? `/docs/${params.slug.join('/')}` : '/docs'}
              </code>
              <p className="text-sm text-muted-foreground">
                Slug parameters: {params.slug ? `[${params.slug.map(s => `"${s}"`).join(', ')}]` : 'undefined'}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Route Pattern:</h3>
              <code className="block bg-muted p-2 rounded text-sm">
                app/docs/[[...slug]]/page.tsx
              </code>
              <p className="text-sm text-muted-foreground">
                Double brackets make the catch-all optional
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {isIndex ? (
        /* Documentation Index */
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{content.title}</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {content.description}
            </p>
          </div>

          {/* Quick Start Links */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/docs/getting-started">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Getting Started
                  </CardTitle>
                  <CardDescription>
                    Learn the basics of Next.js routing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Quick start guide</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/api/authentication">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    API Routes
                  </CardTitle>
                  <CardDescription>
                    Secure your API endpoints
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Authentication & more</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/docs/guides/routing/advanced">
              <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                    Advanced Guides
                  </CardTitle>
                  <CardDescription>
                    Master complex routing patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span>Expert techniques</span>
                    <ArrowRight className="h-4 w-4 ml-auto" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Example Routes */}
          <Card>
            <CardHeader>
              <CardTitle>Example Routes</CardTitle>
              <CardDescription>
                Try these URLs to see optional catch-all routes in action
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 text-sm">
                <Link href="/docs" className="flex items-center justify-between p-2 rounded hover:bg-muted">
                  <code>/docs</code>
                  <Badge variant="secondary">Index page</Badge>
                </Link>
                <Link href="/docs/getting-started" className="flex items-center justify-between p-2 rounded hover:bg-muted">
                  <code>/docs/getting-started</code>
                  <Badge variant="secondary">Single segment</Badge>
                </Link>
                <Link href="/docs/api/authentication" className="flex items-center justify-between p-2 rounded hover:bg-muted">
                  <code>/docs/api/authentication</code>
                  <Badge variant="secondary">Two segments</Badge>
                </Link>
                <Link href="/docs/guides/routing/advanced" className="flex items-center justify-between p-2 rounded hover:bg-muted">
                  <code>/docs/guides/routing/advanced</code>
                  <Badge variant="secondary">Three segments</Badge>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        /* Individual Documentation Page */
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">{content.title}</h1>
            <p className="text-xl text-muted-foreground">{content.description}</p>
          </div>

          <Card>
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                {content.content}
              </p>
            </CardContent>
          </Card>

          {content.sections && (
            <Card>
              <CardHeader>
                <CardTitle>In This Section</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  {content.sections.map((section: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 p-2 rounded hover:bg-muted">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </div>
                      <span className="text-sm">{section}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between">
            <Link href="/docs">
              <Button variant="outline">
                <Home className="h-4 w-4 mr-2" />
                Back to Docs
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button>
                View Dashboard Demo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}