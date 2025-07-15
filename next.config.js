const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel Optimization Configuration
  eslint: {
    // Skip ESLint during builds for faster deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TypeScript checks during builds (for faster deployment)
    ignoreBuildErrors: false, // Keep this false for safety
  },
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'react-syntax-highlighter',
      '@heroicons/react'
    ]
  },
  // Performance optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Enable static optimization
  trailingSlash: false,
  generateEtags: true,
  poweredByHeader: false,
  // Bundle optimization
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
        path: false,
        os: false,
      }
    }
    
    // Optimize chunks
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          animations: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: 'animations',
            chunks: 'all',
          },
          syntax: {
            test: /[\\/]node_modules[\\/](react-syntax-highlighter)[\\/]/,
            name: 'syntax-highlighting',
            chunks: 'all',
          }
        }
      }
    }
    
    return config
  }
}

module.exports = withBundleAnalyzer(nextConfig)
