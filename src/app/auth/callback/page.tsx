'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import { createBrowserSupabaseClient } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const { user } = useUser()
  const [debugInfo, setDebugInfo] = useState('')

  useEffect(() => {
    const handleCallback = async () => {
      const supabase = createBrowserSupabaseClient()
      
      if (!supabase) {
        setDebugInfo('Supabase client creation failed')
        return
      }
      
      try {
        // Handle the OAuth callback by exchanging the code for a session
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Session error:', error)
          setDebugInfo(`Session Error: ${error.message}`)
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
            setDebugInfo(`Session Setting Error: ${sessionError.message}`)
          } else if (sessionData.session) {
            console.log('✅ Session set successfully')
            setDebugInfo(`✅ Session established for ${sessionData.session.user.email}`)
            window.location.href = '/dashboard'
            return
          }
        }

        // Check if we have a session after the callback
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()
        
        const debug = {
          hasUser: !!user,
          hasSession: !!session,
          sessionError: sessionError?.message,
          userEmail: session?.user?.email,
          url: window.location.href,
          urlParams: Object.fromEntries(new URLSearchParams(window.location.search)),
          hashParams: Object.fromEntries(new URLSearchParams(window.location.hash.substring(1))),
          accessTokenInUrl: !!accessToken,
          timestamp: new Date().toISOString()
        }
        
        setDebugInfo(JSON.stringify(debug, null, 2))
        console.log('Auth callback debug:', debug)
        
        if (session) {
          console.log('✅ Session found, redirecting to dashboard')
          window.location.href = '/dashboard'
        } else {
          console.log('❌ No session found after OAuth callback')
          // Wait a bit longer for session to be established
          setTimeout(async () => {
            const { data: { session: retrySession } } = await supabase.auth.getSession()
            if (retrySession) {
              window.location.href = '/dashboard'
            } else {
              window.location.href = '/?error=no_session'
            }
          }, 3000)
        }
      } catch (err) {
        console.error('Callback error:', err)
        setDebugInfo(`Exception: ${err instanceof Error ? err.message : String(err)}`)
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
      <div className="text-center max-w-2xl mx-auto p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Completing Sign In
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Please wait...
        </p>
        
        {debugInfo && (
          <details className="text-left bg-gray-100 dark:bg-gray-800 p-4 rounded">
            <summary className="cursor-pointer text-sm font-medium">Debug Info (click to expand)</summary>
            <pre className="text-xs mt-2 overflow-auto">{debugInfo}</pre>
          </details>
        )}
      </div>
    </div>
  )
}
