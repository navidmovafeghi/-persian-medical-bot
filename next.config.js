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
}

module.exports = nextConfig 