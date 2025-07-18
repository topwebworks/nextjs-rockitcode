import { createServerSupabaseClient } from '@/lib/supabase'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/types/database'

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
      console.error('Authentication error:', authError)
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    console.log('Authenticated user:', user.email, 'User ID:', user.id)

    const body = await request.json()
    const { 
      discordUsername,
      mentorBio, 
      mentorSpecialties, 
      applicationReason 
    } = body

    console.log('Received mentor application data:', {
      discordUsername,
      mentorBio: mentorBio ? 'provided' : 'missing',
      mentorSpecialties,
      applicationReason: applicationReason ? 'provided' : 'missing'
    })

    // Validate required fields with specific errors
    const errors = []
    if (!discordUsername || discordUsername.trim() === '') {
      errors.push('Discord username is required')
    }
    if (!mentorBio || mentorBio.trim() === '') {
      errors.push('Mentor bio is required')
    }
    if (!mentorSpecialties || !Array.isArray(mentorSpecialties) || mentorSpecialties.length === 0) {
      errors.push('At least one specialty is required')
    }
    if (!applicationReason || applicationReason.trim() === '') {
      errors.push('Application reason is required')
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${errors.join(', ')}` },
        { status: 400 }
      )
    }

    // Validate specialties array
    if (!Array.isArray(mentorSpecialties) || mentorSpecialties.length === 0) {
      return NextResponse.json(
        { error: 'At least one specialty is required' },
        { status: 400 }
      )
    }

    // Check if user already has a mentor application or is already a mentor
    let { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('is_mentor, mentor_status, user_id')
      .eq('user_id', user.id)
      .single()

    // If no profile exists, create one
    if (!existingProfile) {
      console.log('No user profile found for:', user.email, 'Creating new profile...')
      
      const { data: newProfile, error: createError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          full_name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          avatar_url: user.user_metadata?.avatar_url || null,
          username: user.email?.split('@')[0] || 'user',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select('is_mentor, mentor_status, user_id')
        .single()

      if (createError) {
        console.error('Error creating user profile:', createError)
        return NextResponse.json(
          { error: 'Failed to create user profile. Please try again.' },
          { status: 500 }
        )
      }

      existingProfile = newProfile
      console.log('Created new user profile for:', user.email)
    }

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
        discord_username: discordUsername,
        mentor_bio: mentorBio,
        mentor_specialties: mentorSpecialties,
        mentor_application_reason: applicationReason,
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
    const supabase = await createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }
    
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
        mentor_specialties,
        mentor_rating,
        students_helped_this_week,
        hours_mentored_this_week,
        total_students_helped,
        total_hours_mentored
      `)
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error fetching profile:', error)
      return NextResponse.json(
        { error: 'Failed to fetch application status' },
        { status: 500 }
      )
    }

    // If no profile exists, return default values
    if (!profile) {
      return NextResponse.json({
        mentor_status: null,
        is_mentor: false,
        mentor_application_reason: null,
        mentor_approved_at: null,
        mentor_active_status: 'active',
        discord_username: null,
        mentor_bio: null,
        mentor_specialties: [],
        mentor_rating: 0,
        students_helped_this_week: 0,
        hours_mentored_this_week: 0,
        total_students_helped: 0,
        total_hours_mentored: 0
      })
    }

    return NextResponse.json({
      mentor_status: profile?.mentor_status || null,
      is_mentor: profile?.is_mentor || false,
      mentor_application_reason: profile?.mentor_application_reason || null,
      mentor_approved_at: profile?.mentor_approved_at || null,
      mentor_active_status: profile?.mentor_active_status || 'active',
      discord_username: profile?.discord_username || null,
      mentor_bio: profile?.mentor_bio || null,
      mentor_specialties: profile?.mentor_specialties || [],
      mentor_rating: profile?.mentor_rating || 0,
      students_helped_this_week: profile?.students_helped_this_week || 0,
      hours_mentored_this_week: profile?.hours_mentored_this_week || 0,
      total_students_helped: profile?.total_students_helped || 0,
      total_hours_mentored: profile?.total_hours_mentored || 0
    })

  } catch (error) {
    console.error('Error checking mentor status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
