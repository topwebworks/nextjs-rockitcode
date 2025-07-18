import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/types/database'

// Update mentor stats (honor system - mentors self-report)
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

    if (!mentorProfile?.is_mentor || 
        mentorProfile.mentor_status !== 'approved' ||
        mentorProfile.mentor_active_status === 'retired') {
      return NextResponse.json(
        { error: 'Active mentor access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { studentsHelped, hoursLogged } = body

    if (typeof studentsHelped !== 'number' || typeof hoursLogged !== 'number' ||
        studentsHelped < 0 || hoursLogged < 0) {
      return NextResponse.json(
        { error: 'Invalid stats data' },
        { status: 400 }
      )
    }

    // Get current stats
    const { data: currentStats } = await supabase
      .from('user_profiles')
      .select(`
        students_helped_this_week,
        hours_mentored_this_week,
        total_students_helped,
        total_hours_mentored
      `)
      .eq('user_id', user.id)
      .single()

    const updatedStats = {
      students_helped_this_week: (currentStats?.students_helped_this_week || 0) + studentsHelped,
      hours_mentored_this_week: (currentStats?.hours_mentored_this_week || 0) + hoursLogged,
      total_students_helped: (currentStats?.total_students_helped || 0) + studentsHelped,
      total_hours_mentored: (currentStats?.total_hours_mentored || 0) + hoursLogged,
      updated_at: new Date().toISOString()
    }

    const { error: updateError } = await supabase
      .from('user_profiles')
      .update(updatedStats)
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Error updating mentor stats:', updateError)
      return NextResponse.json(
        { error: 'Failed to update stats' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Stats updated successfully',
      stats: updatedStats
    })

  } catch (error) {
    console.error('Error in mentor stats update:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get mentor leaderboard
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ 
      cookies: () => cookies() 
    })

    const url = new URL(request.url)
    const period = url.searchParams.get('period') || 'weekly'

    let orderColumn = 'students_helped_this_week'
    if (period === 'monthly' || period === 'allTime') {
      orderColumn = 'total_students_helped'
    }

    // Get mentor leaderboard
    const { data: mentors, error } = await supabase
      .from('user_profiles')
      .select(`
        user_id,
        full_name,
        username,
        avatar_url,
        discord_username,
        mentor_specialties,
        students_helped_this_week,
        hours_mentored_this_week,
        total_students_helped,
        total_hours_mentored,
        mentor_rating,
        mentor_active_status
      `)
      .eq('is_mentor', true)
      .eq('mentor_status', 'approved')
      .neq('mentor_active_status', 'retired')
      .order(orderColumn, { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error fetching leaderboard:', error)
      return NextResponse.json(
        { error: 'Failed to fetch leaderboard' },
        { status: 500 }
      )
    }

    // Add rankings
    const rankedMentors = mentors?.map((mentor, index) => ({
      ...mentor,
      rank: index + 1
    })) || []

    return NextResponse.json({ 
      mentors: rankedMentors,
      period 
    })

  } catch (error) {
    console.error('Error fetching mentor leaderboard:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
