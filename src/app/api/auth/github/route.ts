// Week 5: GitHub OAuth Authentication API Route
// Seamless GitHub integration for Launch Pad users

import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// POST /api/auth/github - Initiate GitHub OAuth flow
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerSupabaseClient()
    
    const { redirectTo } = await request.json()

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: redirectTo || `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        scopes: 'user:email'
      }
    })

    if (error) {
      console.error('GitHub OAuth error:', error)
      return NextResponse.json({ error: 'Failed to initiate GitHub OAuth' }, { status: 500 })
    }

    return NextResponse.json({ url: data.url })

  } catch (error) {
    console.error('GitHub OAuth error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/auth/github - Handle GitHub OAuth callback (if needed)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    
    if (!code) {
      return NextResponse.redirect('/auth/error?message=No authorization code')
    }

    const cookieStore = await cookies()
    const supabase = await createServerSupabaseClient()

    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('GitHub OAuth callback error:', error)
      return NextResponse.redirect('/auth/error?message=OAuth callback failed')
    }

    // Redirect to dashboard or intended page
    return NextResponse.redirect('/dashboard')

  } catch (error) {
    console.error('GitHub OAuth callback error:', error)
    return NextResponse.redirect('/auth/error?message=Internal server error')
  }
}
