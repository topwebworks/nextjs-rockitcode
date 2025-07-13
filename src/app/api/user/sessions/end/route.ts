// Week 5: End Learning Session API Route
// Complete session tracking with analytics

import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// POST /api/user/sessions/end - End a learning session
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { 
      sessionId, 
      coursesAccessed = [], 
      lessonsCompleted = 0, 
      exercisesCompleted = 0 
    } = await request.json()

    // End learning session using our custom function
    const { data: success, error } = await supabase.rpc('end_learning_session', {
      p_session_id: sessionId,
      p_courses_accessed: coursesAccessed,
      p_lessons_completed: lessonsCompleted,
      p_exercises_completed: exercisesCompleted
    })

    if (error) {
      console.error('Session end error:', error)
      return NextResponse.json({ error: 'Failed to end session' }, { status: 500 })
    }

    // Get the completed session data
    const { data: sessionData, error: fetchError } = await supabase
      .from('learning_sessions')
      .select('*')
      .eq('id', sessionId)
      .single()

    if (fetchError) {
      console.error('Session fetch error:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch session data' }, { status: 500 })
    }

    return NextResponse.json({ 
      success,
      session: sessionData,
      endTime: new Date().toISOString()
    })

  } catch (error) {
    console.error('Session end error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
