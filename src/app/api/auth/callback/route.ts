// Week 5: OAuth Callback Handler
// Handles Supabase OAuth redirects and session management

import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    const errorDescription = searchParams.get('error_description')
    const next = searchParams.get('next') ?? '/'

    // Handle OAuth errors
    if (error) {
      console.error('OAuth error:', error, errorDescription)
      const errorUrl = new URL('/', request.url)
      errorUrl.searchParams.set('error', 'auth_failed')
      errorUrl.searchParams.set('message', errorDescription || error)
      return NextResponse.redirect(errorUrl)
    }

    if (code) {
      const cookieStore = await cookies()
      const supabase = await createServerSupabaseClient()
      
      if (!supabase) {
        const errorUrl = new URL('/', request.url)
        errorUrl.searchParams.set('error', 'server_error')
        return NextResponse.redirect(errorUrl)
      }
      
      // Exchange the code for a session
      const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!exchangeError && data.session) {
        // Successful authentication - redirect to intended page
        const successUrl = new URL(next, request.url)
        return NextResponse.redirect(successUrl)
      }
      
      if (exchangeError) {
        console.error('Token exchange error:', exchangeError)
        const errorUrl = new URL('/', request.url)
        errorUrl.searchParams.set('error', 'token_exchange_failed')
        errorUrl.searchParams.set('message', exchangeError.message)
        return NextResponse.redirect(errorUrl)
      }
    }

    // No code parameter - redirect with error
    const errorUrl = new URL('/', request.url)
    errorUrl.searchParams.set('error', 'no_authorization_code')
    return NextResponse.redirect(errorUrl)
    
  } catch (error) {
    console.error('Auth callback error:', error)
    const errorUrl = new URL('/', request.url)
    errorUrl.searchParams.set('error', 'callback_error')
    return NextResponse.redirect(errorUrl)
  }
}
