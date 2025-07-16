import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Free Tier optimized middleware
export const config = {
  runtime: 'edge', // Fastest startup, lowest memory
  matcher: [
    '/learn/:path*',     // Only lessons need optimization
    '/dashboard/:path*',
    '/admin/:path*'
  ],
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Lesson route optimization
  if (pathname.startsWith('/learn/')) {
    const response = NextResponse.next()
    
    // Free Tier Cache Strategy:
    // 1. Cache lesson pages aggressively (they rarely change)
    // 2. Use CDN edge caching to reduce function invocations
    // 3. Set browser cache for static content
    
    if (pathname.match(/\/learn\/[^\/]+\/[^\/]+$/)) {
      // Individual lesson pages - cache for 1 hour
      response.headers.set('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
      
      // Preload critical resources in middleware (Free Tier optimization)
      response.headers.set('Link', '</fonts/Inter.woff2>; rel=preload; as=font; type=font/woff2; crossorigin')
    } else if (pathname.match(/\/learn\/[^\/]+$/)) {
      // Course overview pages - cache for 30 minutes
      response.headers.set('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600')
    }
    
    // Add performance monitoring headers (Free Tier tracking)
    response.headers.set('X-Lesson-Route', 'true')
    
    return response
  }
  
  // Existing auth handling for dashboard/admin
  return NextResponse.next()
}
