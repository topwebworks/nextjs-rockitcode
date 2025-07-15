'use client'

import { useState } from 'react'
import Link from 'next/link'
import { createBrowserSupabaseClient } from '@/lib/supabase'

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
        {/* Tab Buttons */}
        <div className="mb-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px space-x-8">
            <button 
              onClick={() => handleTabSwitch('signup')}
              className={`relative px-1 py-2 text-sm font-medium border-b-2 transition-all duration-300 group ${
                activeTab === 'signup'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              New Student
              {/* Animated underline */}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                activeTab === 'signup' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
            <button 
              onClick={() => handleTabSwitch('signin')}
              className={`relative px-1 py-2 text-sm font-medium border-b-2 transition-all duration-300 group ${
                activeTab === 'signin'
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              Sign In
              {/* Animated underline */}
              <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${
                activeTab === 'signin' ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </button>
          </nav>
        </div>

        {/* GitHub Auth Button */}
        <div className="mb-6">
          <button
            onClick={handleGitHubSignIn}
            className="relative flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition-all duration-300 bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {/* Subtle shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <svg className="relative w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="relative">
              {isLoading ? 'Connecting...' : 'Connect GitHub for Full Access'}
            </span>
          </button>
          <p className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
            🎯 Progress tracking • 🏆 Certificates • 📁 Portfolio features • 👥 Community access
          </p>
        </div>

        {/* Or Browse as Guest */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400">Or start learning immediately</span>
          </div>
        </div>

        {/* Guest Access Button */}
        <Link
          href="/launch-pad"
          className="relative block w-full px-4 py-3 text-base font-medium text-center text-gray-700 transition-all duration-300 bg-gray-50 border border-gray-200 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 hover:shadow-md group overflow-hidden"
        >
          {/* Subtle shine effect */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/50 dark:via-gray-600/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative">Browse as Guest</span>
        </Link>

        <p className="mt-3 text-xs text-center text-gray-500 dark:text-gray-400">
          📚 Access all lessons • 💻 Try code examples • 🔗 Connect GitHub anytime for progress tracking
        </p>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400">Or continue with email</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className={`mb-4 p-3 rounded-md text-sm ${
            error.includes('Success!') 
              ? 'bg-green-50 border border-green-200 text-green-700 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400' 
              : 'bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400'
          }`}>
            {error}
          </div>
        )}

        {/* Form Content - Changes based on active tab */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="your@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder={activeTab === 'signup' ? 'Create a password' : 'Enter your password'}
            />
          </div>

          {/* Confirm Password - Only show for signup */}
          {activeTab === 'signup' && (
            <div>
              <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="block w-full px-3 py-2 text-gray-900 placeholder-gray-500 bg-white border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="relative block w-full px-4 py-3 text-base font-semibold text-center text-white transition-all duration-300 bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {/* Subtle shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative">
              {isLoading ? 'Processing...' : activeTab === 'signup' ? 'Start Learning Journey' : 'Sign In to Continue'}
            </span>
          </button>
          
          {/* Forgot Password Link - Only show for signin */}
          {activeTab === 'signin' && (
            <div className="text-center">
              <Link
                href="/auth/forgot-password"
                className="relative inline-block text-sm text-blue-600 transition-colors duration-200 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 group"
              >
                Forgot your password?
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          )}
          
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            {activeTab === 'signup' ? 'Free forever • No credit card required' : 'Welcome back to RockitCode'}
          </p>
        </form>
      </div>
    </div>
  )
}
