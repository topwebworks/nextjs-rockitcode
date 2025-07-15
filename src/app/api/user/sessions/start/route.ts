// Week 5: Learning Sessions API Routes
// Real-time session tracking for analytics and engagement

import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// POST /api/user/sessions/start - Start a new learning session
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { deviceInfo } = await request.json()

    // Start learning session using our custom function
    const { data: sessionId, error } = await supabase.rpc('start_learning_session', {
      p_user_id: user.id,
      p_device_info: deviceInfo || {}
    })

    if (error) {
      console.error('Session start error:', error)
      return NextResponse.json({ error: 'Failed to start session' }, { status: 500 })
    }

    return NextResponse.json({ 
      sessionId,
      startTime: new Date().toISOString() 
    })

  } catch (error) {
    console.error('Session start error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
