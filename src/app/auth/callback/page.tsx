'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import { createBrowserSupabaseClient } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const { user } = useUser()

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createBrowserSupabaseClient()
      
      if (!supabase) {
        console.error('Supabase client creation failed')
        return
      }
      
      try {
        // Handle the OAuth callback by exchanging the code for a session
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
        }

        // Check URL for OAuth parameters
        const url = new URL(window.location.href)
        const accessToken = url.searchParams.get('access_token') || url.hash.match(/access_token=([^&]+)/)?.[1]
        const refreshToken = url.searchParams.get('refresh_token') || url.hash.match(/refresh_token=([^&]+)/)?.[1]
        
        // If we have tokens in the URL, set the session manually
        if (accessToken) {
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || ''
          })
          
          if (sessionError) {
            console.error('Session setting error:', sessionError)
          } else if (sessionData.session) {
            console.log('✅ Session set successfully')
            window.location.href = '/dashboard'
            return
          }
        }

        // Check if we have a session after the callback
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        if (session) {
          // Redirect immediately if session exists
          window.location.href = '/dashboard'
        } else {
          // Quick retry after 500ms instead of 3 seconds
          setTimeout(async () => {
            const { data: { session: retrySession } } = await supabase.auth.getSession()
            if (retrySession) {
              window.location.href = '/dashboard'
            } else {
              window.location.href = '/?error=no_session'
            }
          }, 500)
        }
      } catch (err) {
        console.error('Callback error:', err)
        setTimeout(() => {
          window.location.href = '/?error=callback_exception'
        }, 5000)
      }
    }

    handleCallback()
  }, [user])

  // Show debug info for troubleshooting
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-2xl p-6 mx-auto text-center">
        <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
          Completing Sign In
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Please wait...
        </p>
      </div>
    </div>
  )
}
