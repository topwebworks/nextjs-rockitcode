import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route for Mentor Sessions
 * Handles logging mentor sessions for review eligibility
 */

// POST: Log a mentor session
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }
    
    const body = await request.json()
    const { studentEmail, sessionTopic, sessionDate, durationMinutes, sessionNotes } = body

    // Validate required fields
    if (!studentEmail || !sessionTopic || !sessionDate) {
      return NextResponse.json({ 
        error: 'Student email, session topic, and session date are required' 
      }, { status: 400 })
    }

    // Log session using database function
    const { data: result, error } = await supabase
      .rpc('log_mentor_session', {
        p_student_email: studentEmail,
        p_session_topic: sessionTopic,
        p_session_date: sessionDate,
        p_duration_minutes: durationMinutes || null,
        p_session_notes: sessionNotes || null
      })

    if (error) {
      console.error('Error logging mentor session:', error)
      return NextResponse.json({ error: 'Failed to log session' }, { status: 500 })
    }

    // Check if the function returned an error
    if (result && !result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Session logged successfully. Student can now review this session.',
      sessionId: result?.session_id 
    })
  } catch (error) {
    console.error('Error in POST /api/mentors/sessions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET: Fetch mentor sessions
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }
    
    const { searchParams } = new URL(request.url)
    const mentorId = searchParams.get('mentorId')
    const studentId = searchParams.get('studentId')

    let query = supabase
      .from('mentor_sessions')
      .select(`
        id,
        mentor_id,
        student_id,
        session_topic,
        session_date,
        duration_minutes,
        session_notes,
        session_status,
        reviewed,
        created_at,
        mentor:mentor_id(full_name, avatar_url),
        student:student_id(full_name, avatar_url)
      `)
      .order('session_date', { ascending: false })

    if (mentorId) {
      query = query.eq('mentor_id', mentorId)
    }
    
    if (studentId) {
      query = query.eq('student_id', studentId)
    }

    const { data: sessions, error } = await query

    if (error) {
      console.error('Error fetching mentor sessions:', error)
      return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 })
    }

    return NextResponse.json({ sessions })
  } catch (error) {
    console.error('Error in GET /api/mentors/sessions:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
