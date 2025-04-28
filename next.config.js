/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning instead of error during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Only do type checking during development, not during production build
    ignoreBuildErrors: true,
  },
  images: {
    // Enable image optimization
    domains: ['localhost', 'example.com', 'your-production-domain.com'],
    // Configure image formats supported
    formats: ['image/avif', 'image/webp'],
    // Set reasonable defaults for image sizing
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Limit of 50 is the Next.js default
    minimumCacheTTL: 60,
  },
  // Experimental features for performance
  experimental: {
    // Enable memory optimizations
    optimizeCss: true,
    // Enable faster builds
    turbotrace: true,
  },
}

module.exports = nextConfig 