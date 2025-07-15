/** @type {import('next').NextConfig} */
const nextConfig = {
  // AGGRESSIVE VERCEL CPU OPTIMIZATION
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint to save CPU
  },
  typescript: {
    ignoreBuildErrors: false, // Keep for safety
  },
  
  // CRITICAL: Remove heavy experimental optimizations
  experimental: {
    // Only optimize essential packages
    optimizePackageImports: [
      '@heroicons/react' // Keep lightweight icons only
    ]
    // REMOVED: framer-motion, react-syntax-highlighter, @monaco-editor
  },
  
  // PRODUCTION OPTIMIZATIONS
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    // Add more aggressive optimizations
    styledComponents: false,
    emotion: false
  },
  
  // STATIC OPTIMIZATION
  output: 'standalone', // Optimize for Vercel
  trailingSlash: false,
  generateEtags: false, // Reduce CPU on edge
  poweredByHeader: false,
  
  // MINIMAL WEBPACK CONFIG
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      }
    }
    
    // SIMPLIFIED chunk strategy - less CPU
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'async', // Changed from 'all' to 'async' - less CPU
        maxAsyncRequests: 6, // Limit async requests
        maxInitialRequests: 4, // Limit initial requests
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            reuseExistingChunk: true
          }
        }
      }
    }
    
    return config
  },
  
  // IMAGE OPTIMIZATION - REDUCED CPU
  images: {
    formats: ['image/webp'], // Only webp, remove avif (CPU intensive)
    deviceSizes: [640, 828, 1200], // Fewer sizes = less CPU
    imageSizes: [16, 32, 64, 128], // Fewer sizes = less CPU
  }
}

module.exports = nextConfig
