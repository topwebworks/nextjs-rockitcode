'use client'

import { useUser } from '@/contexts/UserContext'
import { useState } from 'react'

/**
 * Account Settings Page - User Profile Management
 * 
 * Allows all users to manage their profile, preferences, and account settings.
 * This is separate from admin functions which are in the revenue dashboard.
 */
export default function AccountSettingsPage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'privacy'>('profile')

  const tabs = [
    { id: 'profile' as const, name: 'Profile', icon: '👤' },
    { id: 'preferences' as const, name: 'Preferences', icon: '⚙️' },
    { id: 'privacy' as const, name: 'Privacy', icon: '🔒' }
  ]

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔐</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Sign In Required
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to access your account settings.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Account Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your profile, preferences, and account settings
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{tab.icon}</span>
                    {tab.name}
                  </span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Profile Information
              </h2>
              
              <div className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-6">
                  <div className="shrink-0">
                    {user.user_metadata?.avatar_url ? (
                      <img
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata?.full_name || 'User avatar'}
                        className="w-16 h-16 rounded-full border-2 border-gray-200 dark:border-gray-700"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Profile Photo
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Managed through your authentication provider
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={user.user_metadata?.full_name || user.user_metadata?.name || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Name is managed through your authentication provider
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Email is managed through your authentication provider
                  </p>
                </div>

                {/* User ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={user.id || 'Not available'}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Your unique user identifier
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Learning Preferences
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Notification Settings
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                        Email notifications for course updates
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                        Weekly progress summaries
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600" />
                      <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                        New feature announcements
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Learning Style
                  </h3>
                  <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                    <option>Hands-on practice focused</option>
                    <option>Theory and practice balanced</option>
                    <option>Video and visual learning</option>
                    <option>Self-paced exploration</option>
                  </select>
                </div>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Privacy & Data
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Data Collection
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        Learning Analytics
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        We collect anonymous learning progress data to improve the platform.
                      </p>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600" defaultChecked />
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                          Allow anonymous learning analytics
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Account Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Download my data
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium block">
                      Delete my account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
