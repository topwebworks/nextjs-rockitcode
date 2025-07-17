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
    { id: 'profile' as const, name: 'Profile', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )},
    { id: 'preferences' as const, name: 'Preferences', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )},
    { id: 'privacy' as const, name: 'Privacy', icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )}
  ]

  if (!user) {
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
              <div className="p-6 border rounded-full bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-light tracking-wide text-white">
              Sign In Required
            </h1>
            <p className="text-lg text-slate-300">
              Please sign in to access your account settings.
            </p>
          </div>
        </div>
      </div>
    )
  }

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

      <div className="relative z-10 max-w-4xl p-6 mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-light tracking-wide text-white">
              Account Settings
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl font-light leading-relaxed text-slate-300">
              Manage your profile, preferences, and account settings
            </p>
            <div className="flex justify-center">
              <div className="px-6 py-3 border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700/50">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-slate-300">Personal Account Management</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50">
          <div className="border-b border-slate-700/50">
            <nav className="flex px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-4 border-b-2 font-medium text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-400 text-blue-400'
                      : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50">
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="mb-6 text-xl font-semibold text-white">
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
                        className="w-16 h-16 border-2 rounded-full border-slate-600"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-16 h-16 border rounded-full bg-slate-700/50 backdrop-blur-sm border-slate-600">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      Profile Photo
                    </h3>
                    <p className="text-sm text-slate-400">
                      Managed through your authentication provider
                    </p>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={user.user_metadata?.full_name || user.user_metadata?.name || ''}
                    readOnly
                    className="w-full px-4 py-3 text-white border rounded-lg border-slate-600 bg-slate-700/50 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Name is managed through your authentication provider
                  </p>
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={user.email || ''}
                    readOnly
                    className="w-full px-4 py-3 text-white border rounded-lg border-slate-600 bg-slate-700/50 backdrop-blur-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Email is managed through your authentication provider
                  </p>
                </div>

                {/* User ID */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-300">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={user.id || 'Not available'}
                    readOnly
                    className="w-full px-4 py-3 font-mono text-sm text-white border rounded-lg border-slate-600 bg-slate-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-slate-400">
                    Your unique user identifier
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="p-6">
              <h2 className="mb-6 text-xl font-semibold text-white">
                Learning Preferences
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium text-white">
                    Notification Settings
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="text-blue-400 rounded border-slate-600 bg-slate-700/50 focus:ring-blue-400 focus:ring-offset-slate-800" />
                      <span className="ml-3 text-sm text-slate-300">
                        Email notifications for course updates
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-blue-400 rounded border-slate-600 bg-slate-700/50 focus:ring-blue-400 focus:ring-offset-slate-800" />
                      <span className="ml-3 text-sm text-slate-300">
                        Weekly progress summaries
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-blue-400 rounded border-slate-600 bg-slate-700/50 focus:ring-blue-400 focus:ring-offset-slate-800" />
                      <span className="ml-3 text-sm text-slate-300">
                        New feature announcements
                      </span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium text-white">
                    Learning Style
                  </h3>
                  <select className="w-full px-4 py-3 text-white border rounded-lg border-slate-600 bg-slate-700/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent">
                    <option>Hands-on practice focused</option>
                    <option>Theory and practice balanced</option>
                    <option>Text-based and interactive learning</option>
                    <option>Self-paced exploration</option>
                  </select>
                </div>

                <button className="px-6 py-3 font-medium text-white transition-all duration-300 bg-blue-500 rounded-lg hover:bg-blue-600">
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="p-6">
              <h2 className="mb-6 text-xl font-semibold text-white">
                Privacy & Data
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-medium text-white">
                    Data Collection
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-slate-700/50 backdrop-blur-sm border-slate-600">
                      <h4 className="mb-2 font-medium text-white">
                        Learning Analytics
                      </h4>
                      <p className="mb-3 text-sm text-slate-400">
                        We collect anonymous learning progress data to improve the platform.
                      </p>
                      <label className="flex items-center">
                        <input type="checkbox" className="text-blue-400 rounded border-slate-600 bg-slate-700/50 focus:ring-blue-400 focus:ring-offset-slate-800" defaultChecked />
                        <span className="ml-3 text-sm text-slate-300">
                          Allow anonymous learning analytics
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-lg font-medium text-white">
                    Account Actions
                  </h3>
                  <div className="space-y-3">
                    <button className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300">
                      Download my data
                    </button>
                    <button className="block text-sm font-medium text-red-400 transition-colors hover:text-red-300">
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
