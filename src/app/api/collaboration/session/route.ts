// Week 6: Real-time Collaboration Socket.io Server
// WebSocket server for collaborative coding sessions

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

// This would typically be implemented with a custom server
// For this demo, we'll create the API structure

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, code, language } = body

    // Get user from session
    const supabase = await createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Create or update collaboration session
    const { data: session, error } = await supabase
      .from('collaboration_sessions')
      .upsert({
        session_id: sessionId,
        host_user_id: user.id,
        code_content: code,
        language,
        is_active: true,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Failed to create collaboration session:', error)
      return NextResponse.json(
        { error: 'Failed to create session' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      sessionId: session.session_id,
      message: 'Collaboration session created successfully'
    })

  } catch (error) {
    console.error('Collaboration session API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('sessionId')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    // Get user from session
    const supabase = await createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get collaboration session details
    const { data: session, error } = await supabase
      .from('collaboration_sessions')
      .select(`
        *,
        shared_code_sessions(*)
      `)
      .eq('session_id', sessionId)
      .eq('is_active', true)
      .single()

    if (error || !session) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      )
    }

    // Get active participants
    const { data: participants } = await supabase
      .from('shared_code_sessions')
      .select(`
        user_id,
        joined_at,
        last_seen,
        user_profiles(display_name, avatar_url)
      `)
      .eq('session_id', sessionId)
      .eq('is_active', true)

    return NextResponse.json({
      session: {
        sessionId: session.session_id,
        hostUserId: session.host_user_id,
        code: session.code_content,
        language: session.language,
        createdAt: session.created_at,
        updatedAt: session.updated_at
      },
      participants: participants || []
    })

  } catch (error) {
    console.error('Get collaboration session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
