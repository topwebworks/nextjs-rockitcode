'use client'

import { useUser } from '@/contexts/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import AffiliateRevenueManager from '@/components/affiliate-revenue-manager'

/**
 * Revenue Dashboard - Admin Only
 * 
 * Comprehensive affiliate revenue analytics and management system.
 * Only accessible to users with admin email addresses.
 */
export default function RevenueDashboardPage() {
  const { user, isLoading } = useUser()
  const router = useRouter()

  // Admin check - same logic as in affiliate-link-manager
  const isAdmin = user?.email?.includes('topwebworks') || 
                  user?.email?.includes('@yourcompany.com') || 
                  user?.email === 'admin@rockitcode.com'

  useEffect(() => {
    // Redirect non-admins after user data loads
    if (!isLoading && (!user || !isAdmin)) {
      router.push('/dashboard')
    }
  }, [user, isAdmin, isLoading, router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
          
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400/20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 border rounded-full bg-slate-800/30 backdrop-blur-sm border-slate-700/50 animate-pulse">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
            </div>
            <p className="text-lg text-slate-300">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  // Show access denied for non-admins
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
          
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400/20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-md p-6 mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="p-6 border rounded-full bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-light tracking-wide text-white">
              Access Restricted
            </h1>
            <p className="mb-6 text-lg text-slate-300">
              This area is restricted to administrators only.
            </p>
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-300 border rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50 hover:border-blue-400/30"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render the full revenue dashboard for admins
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="relative z-10 p-6 mx-auto max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3-.895-3-2s1.343-2 3-2 3 .895 3 2-1.343 2-3 2zm-7 4c0-.552.448-1 1-1s1 .448 1 1-.448 1-1 1-1-.448-1-1zm14 0c0-.552.448-1 1-1s1 .448 1 1-.448 1-1 1-1-.448-1-1zM7.003 14C7.003 14 7.003 14.448 7.003 15s0 1-.448 1H5.552C5.104 16 5 15.552 5 15s.104-1 .552-1h1.003zm9.994 0c.448 0 .552.448.552 1s-.104 1-.552 1H15.55c-.448 0-.552-.448-.552-1s.104-1 .552-1h1.447z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zm6 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z" />
                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
              </svg>
              <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-light tracking-wide text-white">
              Revenue Dashboard
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl font-light leading-relaxed text-slate-300">
              Admin-only affiliate revenue analytics and management system
            </p>
            <div className="flex justify-center">
              <div className="px-6 py-3 border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700/50">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-slate-300">Administrative Revenue Analytics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <AffiliateRevenueManager />
      </div>
    </div>
  )
}
