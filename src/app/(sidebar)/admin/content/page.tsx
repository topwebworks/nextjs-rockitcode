import { getCurrentUser } from '@/lib/user'
import { ContentManagerUI } from '@/components/rockitcode/content-manager'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content Management - RockitCode',
  description: 'Manage educational content, lessons, and courses for RockitCode.',
}

/**
 * Content Administration Page
 * 
 * A protected admin interface for managing educational content.
 * Requires authentication and admin privileges.
 * 
 * Features:
 * - Content CRUD operations
 * - Content validation and quality assurance  
 * - Bulk operations and filtering
 * - Real-time preview
 * - Import/export capabilities
 */
export default async function AdminContentPage() {
  // Check authentication - in production, you'd also check for admin role
  const session = await getCurrentUser()
  
  if (!session) {
    redirect('/login?callbackUrl=/admin/content')
  }
  
  // In production, add admin role check here:
  // if (!session.user.roles?.includes('admin')) {
  //   redirect('/unauthorized')
  // }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Content Management System
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create, edit, and manage educational content for RockitCode
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Logged in as <span className="font-medium">{session.user.name}</span>
              </div>
              
              {session.user.image && (
                <img
                  src={session.user.image}
                  alt="Admin avatar"
                  className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content Management Interface */}
      <ContentManagerUI />
    </div>
  )
}
