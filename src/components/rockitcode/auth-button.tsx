'use client'

import { useState } from 'react'
import { Button } from '@/components/button'
import { clsx } from 'clsx'
import { useUser } from '@/contexts/UserContext'
import { createBrowserSupabaseClient } from '@/lib/supabase'

interface AuthButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'transparent'
  size?: 'sm' | 'md' | 'lg'
  showAvatar?: boolean
  redirectTo?: string
  className?: string
}

/**
 * RockitCode Authentication Button - Updated
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
  redirectTo = '/dashboard',
  className
}: AuthButtonProps) {
  const { user, isLoading } = useUser()
  const [isSigningIn, setIsSigningIn] = useState(false)
  const supabase = createBrowserSupabaseClient()

  const handleSignIn = async () => {
    if (!supabase) {
      console.error('Supabase not configured')
      return
    }

    setIsSigningIn(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        // options: {
        //   redirectTo: `${window.location.origin}/auth/callback?redirectTo=${redirectTo}`
        // }
      })
      if (error) throw error
    } catch (error) {
      console.error('Sign in error:', error)
    } finally {
      setIsSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    if (!supabase) {
      console.error('Supabase not configured')
      return
    }

    setIsSigningIn(true)
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      window.location.href = '/'
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setIsSigningIn(false)
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
    outline: 'border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200',
    transparent: 'bg-transparent hover:bg-gray-100 text-gray-900 dark:hover:bg-gray-800 dark:text-white'
  }

  if (isLoading) {
    return (
      <Button 
        disabled 
        className={clsx(sizeClasses[size], className)}
      >
        Loading...
      </Button>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-3">
        {showAvatar && user.user_metadata?.avatar_url && (
          <img
            src={user.user_metadata.avatar_url}
            alt={user.user_metadata?.full_name || 'User avatar'}
            className="w-8 h-8 border border-gray-200 rounded-full dark:border-gray-700"
          />
        )}
        <div className="hidden sm:block">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user.user_metadata?.full_name}
          </p>
          {user.user_metadata?.user_name && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              @{user.user_metadata.user_name}
            </p>
          )}
        </div>
        <button
          onClick={handleSignOut}
          disabled={isSigningIn}
          className={clsx(
            'rounded-full font-semibold transition-colors focus:outline-2 focus:outline-offset-2 focus:outline-blue-500',
            sizeClasses[size],
            variantClasses[variant],
            className
          )}
        >
          {isSigningIn ? 'Signing out...' : 'Sign out'}
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
        variant === 'transparent' ? '!bg-transparent hover:!bg-gray-100 dark:hover:!bg-gray-800 !text-gray-900 dark:!text-white whitespace-nowrap' : '',
        sizeClasses[size], 
        className
      )}
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
      </svg>
      {isSigningIn ? 'Signing in...' : (variant === 'transparent' ? 'Log In' : 'Sign in with GitHub')}
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
  const { user, isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
        Checking authentication...
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        Signed in as {user.user_metadata?.full_name || user.email}
      </div>
    )
  }

  if (showLoginPrompt) {
    return (
      <div className="p-4 border border-blue-200 rounded-lg bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
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
      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
      Not signed in
    </div>
  )
}
