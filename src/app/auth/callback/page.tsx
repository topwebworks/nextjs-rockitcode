'use client'

import { useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'

export default function AuthCallbackPage() {
  const { user } = useUser()

  useEffect(() => {
    // Simple check - if user exists, redirect immediately
    if (user) {
      window.location.href = '/dashboard'
    } else {
      // Give a moment for auth to complete, then redirect
      const timer = setTimeout(() => {
        if (user) {
          window.location.href = '/dashboard'
        } else {
          window.location.href = '/?error=auth_failed'
        }
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [user])

  // Minimal UI - no spinner, just text
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Completing Sign In
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Please wait...
        </p>
      </div>
    </div>
  )
}
