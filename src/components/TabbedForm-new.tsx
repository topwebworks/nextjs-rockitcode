'use client'

import { useState } from 'react'

export default function TabbedForm() {
  const [isLoading, setIsLoading] = useState(false)

  const handleGitHubConnect = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          redirectTo: `${window.location.origin}/auth/callback?next=/launch-pad`
        })
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('Failed to get auth URL')
      }
    } catch (error) {
      console.error('GitHub auth error:', error)
      setIsLoading(false)
    }
  }

  const handleStartAsGuest = () => {
    window.location.href = '/launch-pad?mode=guest'
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="p-6 bg-white border border-gray-200 shadow-xl dark:bg-gray-800 rounded-xl dark:border-gray-700">
        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Ready to Start Learning?
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Choose how you'd like to begin your coding journey
          </p>
        </div>

        {/* GitHub Connect Button */}
        <div className="mb-4">
          <button
            onClick={handleGitHubConnect}
            className="relative flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-all duration-300 bg-gray-900 border border-gray-900 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 hover:shadow-md group overflow-hidden"
            disabled={isLoading}
          >
            {/* Subtle shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <svg className="relative w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="relative">
              {isLoading ? 'Connecting...' : 'Connect with GitHub'}
            </span>
          </button>
          <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
            Track progress, save work, and build your portfolio
          </p>
        </div>

        {/* Divider */}
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400">or</span>
          </div>
        </div>

        {/* Guest Access Button */}
        <div className="mb-6">
          <button
            onClick={handleStartAsGuest}
            className="relative flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-gray-700 transition-all duration-300 bg-white border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-md hover:border-gray-400 dark:hover:border-gray-500 group overflow-hidden"
          >
            {/* Subtle shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 dark:via-gray-600/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <svg className="relative w-5 h-5 mr-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <span className="relative">Browse as Guest</span>
          </button>
          <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
            Explore lessons without creating an account
          </p>
        </div>

        {/* Benefits */}
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            🚀 <strong>Why GitHub?</strong> All our lessons integrate with Git workflows. 
            Plus, employers love seeing active GitHub profiles!
          </p>
        </div>
      </div>
    </div>
  )
}
