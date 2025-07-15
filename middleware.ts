import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Minimal middleware - only handle essential edge cases
export const config = {
  runtime: 'edge',
  matcher: [
    // Only match specific routes that need middleware processing
    '/dashboard/:path*',
    '/admin/:path*'
  ],
}

export function middleware(request: NextRequest) {
  // Since authentication is handled client-side with Supabase,
  // middleware only needs to handle edge cases
  
  // Allow all requests to pass through
  // Client-side components handle authentication redirects
  return NextResponse.next()
}
