import { createServerSupabaseClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/types/database'

// Update mentor stats (honor system - mentors self-report)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

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

    console.log('Stats update request:', { studentsHelped, hoursLogged, userId: user.id })

    if (typeof studentsHelped !== 'number' || typeof hoursLogged !== 'number' ||
        studentsHelped < 0 || hoursLogged < 0) {
      console.log('Invalid stats validation failed:', { studentsHelped, hoursLogged, types: { students: typeof studentsHelped, hours: typeof hoursLogged } })
      return NextResponse.json(
        { error: 'Invalid stats data' },
        { status: 400 }
      )
    }

    // Get current stats to calculate total differences
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

    // Calculate the difference for total stats
    const currentWeeklyStudents = currentStats?.students_helped_this_week || 0
    const currentWeeklyHours = currentStats?.hours_mentored_this_week || 0
    
    const studentsDiff = studentsHelped - currentWeeklyStudents
    const hoursDiff = hoursLogged - currentWeeklyHours

    const updatedStats = {
      // Set weekly stats to the new values (not add to them)
      students_helped_this_week: studentsHelped,
      hours_mentored_this_week: hoursLogged,
      // Adjust total stats by the difference
      total_students_helped: Math.max(0, (currentStats?.total_students_helped || 0) + studentsDiff),
      total_hours_mentored: Math.max(0, (currentStats?.total_hours_mentored || 0) + hoursDiff),
      updated_at: new Date().toISOString()
    }

    const { error: updateError } = await supabase
      .from('user_profiles')
      .update(updatedStats)
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Error updating mentor stats:', updateError)
      console.error('Updated stats data:', updatedStats)
      console.error('User ID:', user.id)
      return NextResponse.json(
        { error: `Failed to update stats: ${updateError.message}` },
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
    const supabase = await createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

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
    const rankedMentors = mentors?.map((mentor: any, index: number) => ({
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
