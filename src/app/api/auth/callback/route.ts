// Week 5: OAuth Callback Handler
// Handles Supabase OAuth redirects and session management

import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    const next = searchParams.get('next') ?? '/dashboard'

    if (code) {
      const cookieStore = await cookies()
      const supabase = await createServerSupabaseClient()
      
      const { error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (!error) {
        // Successful authentication - redirect to intended page
        return NextResponse.redirect(new URL(next, request.url))
      }
    }

    // Return the user to an error page with some instructions
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
  } catch (error) {
    console.error('Auth callback error:', error)
    return NextResponse.redirect(new URL('/auth/auth-code-error', request.url))
  }
}
