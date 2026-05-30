import type { NextConfig } from 'next'
import path from 'path'

const noClerkKey = !process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.clerk.com' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
  webpack(config) {
    if (noClerkKey) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@clerk/nextjs': path.resolve('./src/lib/clerk-noop.tsx'),
        '@clerk/nextjs/server': path.resolve('./src/lib/clerk-noop-server.ts'),
      }
    }
    return config
  },
}

export default nextConfig
