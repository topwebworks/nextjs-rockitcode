'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/button'
import { useState } from 'react'
import { clsx } from 'clsx'

interface AuthButtonProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  showAvatar?: boolean
  redirectTo?: string
  className?: string
}

/**
 * RockitCode Authentication Button
 * 
 * A smart button component that automatically shows either:
 * - "Sign in with GitHub" button for unauthenticated users
 * - User avatar and sign out option for authenticated users
 * 
 * Features:
 * - GitHub OAuth integration
 * - Loading states
 * - Customizable appearance
 * - Responsive design
 * - Error handling
 */
export function AuthButton({ 
  variant = 'primary', 
  size = 'md', 
  showAvatar = true,
  redirectTo = '/',
  className
}: AuthButtonProps) {
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await signIn('github', { callbackUrl: redirectTo })
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignOut = async () => {
    setIsLoading(true)
    try {
      await signOut({ callbackUrl: '/login' })
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Size styles
  const sizeClasses = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3.5 py-2 text-sm',
    lg: 'px-4 py-2.5 text-base'
  }

  // Variant styles for sign out button
  const variantClasses = {
    primary: 'bg-gray-950 hover:bg-gray-800 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white',
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200'
  }

  if (status === 'loading') {
    return (
      <Button 
        disabled 
        className={clsx(sizeClasses[size], className)}
      >
        Loading...
      </Button>
    )
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        {showAvatar && session.user.image && (
          <img
            src={session.user.image}
            alt={session.user.name || 'User avatar'}
            className="h-8 w-8 rounded-full border border-gray-200 dark:border-gray-700"
          />
        )}
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {session.user.name}
          </p>
          {session.user.login && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              @{session.user.login}
            </p>
          )}
        </div>
        <button
          onClick={handleSignOut}
          disabled={isLoading}
          className={clsx(
            'rounded-full font-semibold transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-blue-500',
            sizeClasses[size],
            variantClasses[variant],
            className
          )}
        >
          {isLoading ? 'Signing out...' : 'Sign out'}
        </button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleSignIn}
      disabled={isLoading}
      className={clsx(
        'inline-flex items-center gap-2',
        sizeClasses[size], 
        className
      )}
    >
      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
      </svg>
      {isLoading ? 'Signing in...' : 'Sign in with GitHub'}
    </Button>
  )
}

interface AuthStatusProps {
  showLoginPrompt?: boolean
}

/**
 * Authentication Status Display
 * 
 * Shows current authentication status and optionally prompts
 * users to sign in to access premium features.
 */
export function AuthStatus({ showLoginPrompt = false }: AuthStatusProps) {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></div>
        Checking authentication...
      </div>
    )
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        Signed in as {session.user.name}
      </div>
    )
  }

  if (showLoginPrompt) {
    return (
      <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-950">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Sign in to unlock all features
            </p>
            <p className="mt-1 text-sm text-blue-600 dark:text-blue-300">
              Track your progress, save your work, and access premium lessons.
            </p>
            <div className="mt-3">
              <AuthButton variant="primary" size="sm" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
      <div className="h-2 w-2 rounded-full bg-gray-400"></div>
      Not signed in
    </div>
  )
}
