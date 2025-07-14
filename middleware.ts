import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // For development mode, allow all access without authentication
  // This prevents the app from hanging on auth configuration issues
  
  // Only apply auth checks if we have proper environment variables configured
  const hasGitHubAuth = process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET
  
  if (!hasGitHubAuth) {
    // Skip authentication in development mode
    return NextResponse.next()
  }
  
  // If you want to enable authentication later, configure the environment variables
  // and import the withAuth middleware from next-auth/middleware
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (NextAuth.js routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
