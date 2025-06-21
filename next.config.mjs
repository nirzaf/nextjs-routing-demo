/**
 * CUSTOM ROUTES VIA NEXT.CONFIG.JS
 * 
 * Next.js allows you to customize routing behavior through next.config.js
 * This demonstrates:
 * 1. Redirects - Permanently or temporarily redirect users
 * 2. Rewrites - Internally rewrite URLs without changing the browser URL
 * 3. Headers - Add custom headers to responses
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Redirects: Redirect users from old URLs to new ones
  async redirects() {
    return [
      {
        // Redirect old product URLs to new format
        source: '/product/:id',
        destination: '/products/:id',
        permanent: true, // 301 redirect for SEO
      },
      {
        // Redirect old category structure
        source: '/category/:category',
        destination: '/products/category/:category',
        permanent: true,
      },
      {
        // Redirect shop to products
        source: '/shop',
        destination: '/products',
        permanent: false, // 302 redirect
      }
    ];
  },

  // Rewrites: Internally rewrite URLs (user doesn't see the change)
  async rewrites() {
    return [
      {
        // Rewrite API calls to external service (for demonstration)
        source: '/api/external/:path*',
        destination: 'https://jsonplaceholder.typicode.com/:path*',
      },
      {
        // Rewrite legacy URLs internally
        source: '/legacy-products/:id',
        destination: '/products/:id',
      }
    ];
  },

  // Headers: Add custom headers to responses
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-API-Version',
            value: '1.0',
          },
          {
            key: 'X-Custom-Header',
            value: 'Next.js Routing Demo API',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
