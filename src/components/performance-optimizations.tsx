'use client'

import { lazy, Suspense } from 'react'
import { useInView } from 'react-intersection-observer'

// Lazy load heavy components
const LazyLearningDashboard = lazy(() => 
  import('@/components/enhanced-learning-dashboard').then(module => ({
    default: module.EnhancedLearningDashboard
  }))
)

// Loading skeleton components
export function DashboardSkeleton() {
  return (
    <div className="max-w-6xl mx-auto p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center mb-8">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto"></div>
      </div>

      {/* Stats Skeleton */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 mb-8">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-12 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto"></div>
            </div>
          ))}
        </div>
        <div className="mt-4 h-3 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Course Cards Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="h-32 bg-gray-200 dark:bg-gray-700"></div>
            <div className="p-6">
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function CourseCardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      <div className="h-32 bg-gray-200 dark:bg-gray-700"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  )
}

export function LaunchPadSkeleton() {
  return (
    <div className="comprehensive-launch-pad max-w-6xl mx-auto p-6 animate-pulse">
      {/* Header Skeleton */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4"></div>
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto mb-6"></div>
        
        {/* Progress Skeleton */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6 max-w-4xl mx-auto">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto mb-3"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto mb-2"></div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 mx-auto"></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 mx-auto mb-2"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 mx-auto"></div>
          </div>
        ))}
      </div>

      {/* Command Center Skeleton */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
              <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-8 mx-auto mb-2"></div>
              <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mx-auto mb-2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Optimized image loading
export function OptimizedImage({ 
  src, 
  alt, 
  className = '', 
  priority = false,
  ...props 
}: {
  src: string
  alt: string
  className?: string
  priority?: boolean
  [key: string]: any
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '50px'
  })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {inView || priority ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover transition-opacity duration-300"
          loading={priority ? 'eager' : 'lazy'}
          {...props}
        />
      ) : (
        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
      )}
    </div>
  )
}

// Lazy loading wrapper for any component
export function LazyLoadWrapper({ 
  children, 
  fallback, 
  threshold = 0.1,
  rootMargin = '50px'
}: {
  children: React.ReactNode
  fallback?: React.ReactNode
  threshold?: number
  rootMargin?: string
}) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold,
    rootMargin
  })

  return (
    <div ref={ref}>
      {inView ? children : (fallback || <div className="h-64 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />)}
    </div>
  )
}

// Performance monitoring hook
export function usePerformanceMonitor() {
  const measurePerformance = (name: string, fn: () => void) => {
    const start = performance.now()
    fn()
    const end = performance.now()
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${end - start} milliseconds`)
    }
  }

  const measureAsync = async (name: string, fn: () => Promise<any>) => {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`${name} took ${end - start} milliseconds`)
    }
    
    return result
  }

  return { measurePerformance, measureAsync }
}

// Bundle analyzer helper
export function logBundleInfo() {
  if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
    // Log performance metrics
    window.addEventListener('load', () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
        const paint = performance.getEntriesByType('paint')
        
        console.group('🚀 Performance Metrics')
        console.log('DOM Content Loaded:', navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart, 'ms')
        console.log('Load Complete:', navigation.loadEventEnd - navigation.loadEventStart, 'ms')
        
        paint.forEach((entry) => {
          console.log(`${entry.name}:`, entry.startTime, 'ms')
        })
        
        // Memory usage (if available)
        if ('memory' in performance) {
          const memory = (performance as any).memory
          console.log('Memory Used:', Math.round(memory.usedJSHeapSize / 1024 / 1024), 'MB')
          console.log('Memory Total:', Math.round(memory.totalJSHeapSize / 1024 / 1024), 'MB')
        }
        console.groupEnd()
      }, 1000)
    })
  }
}
