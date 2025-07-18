import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/types/database'

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

    const body = await request.json()
    const { 
      discord_username, 
      mentor_bio, 
      mentor_specialties, 
      mentor_application_reason 
    } = body

    // Validate required fields
    if (!discord_username || !mentor_bio || !mentor_specialties?.length || !mentor_application_reason) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Validate specialties array
    if (!Array.isArray(mentor_specialties) || mentor_specialties.length === 0) {
      return NextResponse.json(
        { error: 'At least one specialty is required' },
        { status: 400 }
      )
    }

    // Check if user already has a mentor application or is already a mentor
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('is_mentor, mentor_status, user_id')
      .eq('user_id', user.id)
      .single()

    if (existingProfile?.is_mentor) {
      return NextResponse.json(
        { error: 'You are already a mentor' },
        { status: 400 }
      )
    }

    if (existingProfile?.mentor_status === 'pending') {
      return NextResponse.json(
        { error: 'You already have a pending mentor application' },
        { status: 400 }
      )
    }

    // Update user profile with mentor application data
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        discord_username,
        mentor_bio,
        mentor_specialties,
        mentor_application_reason,
        mentor_status: 'pending',
        students_helped_this_week: 0,
        hours_mentored_this_week: 0,
        total_students_helped: 0,
        total_hours_mentored: 0,
        mentor_rating: 0,
        mentor_active_status: 'active',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Error updating profile:', updateError)
      return NextResponse.json(
        { error: 'Failed to submit application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Mentor application submitted successfully',
      status: 'pending'
    })

  } catch (error) {
    console.error('Error in mentor application:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET: Check mentor application status
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ 
      cookies: () => cookies() 
    })
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's mentor status
    const { data: profile, error } = await supabase
      .from('user_profiles')
      .select(`
        mentor_status,
        is_mentor,
        mentor_application_reason,
        mentor_approved_at,
        mentor_active_status,
        discord_username,
        mentor_bio,
        mentor_specialties
      `)
      .eq('user_id', user.id)
      .single()

    if (error) {
      console.error('Error fetching profile:', error)
      return NextResponse.json(
        { error: 'Failed to fetch application status' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      mentor_status: profile?.mentor_status || null,
      is_mentor: profile?.is_mentor || false,
      mentor_application_reason: profile?.mentor_application_reason || null,
      mentor_approved_at: profile?.mentor_approved_at || null,
      mentor_active_status: profile?.mentor_active_status || 'active',
      discord_username: profile?.discord_username || null,
      mentor_bio: profile?.mentor_bio || null,
      mentor_specialties: profile?.mentor_specialties || []
    })

  } catch (error) {
    console.error('Error checking mentor status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
