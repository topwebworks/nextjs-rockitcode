import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/types/database'

// Update mentor status (active, away, retired)
export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ 
      cookies: () => cookies() 
    })

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify user is an approved mentor
    const { data: mentorProfile } = await supabase
      .from('user_profiles')
      .select('is_mentor, mentor_status, mentor_active_status')
      .eq('user_id', user.id)
      .single()

    if (!mentorProfile?.is_mentor || mentorProfile.mentor_status !== 'approved') {
      return NextResponse.json(
        { error: 'Mentor access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { status } = body

    if (!status || !['active', 'away', 'retired'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status. Must be: active, away, or retired' },
        { status: 400 }
      )
    }

    // Update mentor status
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        mentor_active_status: status,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Error updating mentor status:', updateError)
      return NextResponse.json(
        { error: 'Failed to update status' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: `Mentor status updated to ${status}`,
      status
    })

  } catch (error) {
    console.error('Error in mentor status update:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get mentor status
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ 
      cookies: () => cookies() 
    })

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Get mentor status
    const { data: mentorProfile, error } = await supabase
      .from('user_profiles')
      .select(`
        is_mentor,
        mentor_status,
        mentor_active_status,
        students_helped_this_week,
        hours_mentored_this_week,
        total_students_helped,
        total_hours_mentored,
        mentor_rating
      `)
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching mentor status:', error)
      return NextResponse.json(
        { error: 'Failed to fetch status' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      is_mentor: mentorProfile?.is_mentor || false,
      mentor_status: mentorProfile?.mentor_status || null,
      mentor_active_status: mentorProfile?.mentor_active_status || 'active',
      stats: {
        students_helped_this_week: mentorProfile?.students_helped_this_week || 0,
        hours_mentored_this_week: mentorProfile?.hours_mentored_this_week || 0,
        total_students_helped: mentorProfile?.total_students_helped || 0,
        total_hours_mentored: mentorProfile?.total_hours_mentored || 0,
        mentor_rating: mentorProfile?.mentor_rating || 0
      }
    })

  } catch (error) {
    console.error('Error fetching mentor status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
