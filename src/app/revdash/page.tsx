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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Show access denied for non-admins
  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Access Restricted
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This area is restricted to administrators only.
          </p>
          <button
            onClick={() => router.push('/dashboard')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Render the full revenue dashboard for admins
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            📊 Revenue Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Admin-only affiliate revenue analytics and management system
          </p>
        </div>
        
        <AffiliateRevenueManager />
      </div>
    </div>
  )
}
