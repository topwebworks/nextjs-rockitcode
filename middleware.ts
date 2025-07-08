import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Add any custom middleware logic here
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Define protected routes
        const protectedPaths = [
          '/dashboard',
          '/settings',
          '/premium',
          '/certificates'
        ]
        
        const { pathname } = req.nextUrl
        
        // Check if the current path needs authentication
        const isProtectedPath = protectedPaths.some(path => 
          pathname.startsWith(path)
        )
        
        // Allow access if not a protected path, or if user is authenticated
        return !isProtectedPath || !!token
      },
    },
    pages: {
      signIn: '/login',
    },
  }
)

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
