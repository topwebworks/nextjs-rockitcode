import { createServerSupabaseClient } from '@/lib/supabase'
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
      mentorSpecialties
    } = body

    console.log('Received mentor profile update data:', {
      discordUsername,
      mentorBio: mentorBio ? 'provided' : 'missing',
      mentorSpecialties
    })

    // Validate required fields
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

    if (errors.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${errors.join(', ')}` },
        { status: 400 }
      )
    }

    // Check if user is an approved mentor
    const { data: existingProfile } = await supabase
      .from('user_profiles')
      .select('is_mentor, mentor_status, user_id')
      .eq('user_id', user.id)
      .single()

    if (!existingProfile?.is_mentor || existingProfile?.mentor_status !== 'approved') {
      return NextResponse.json(
        { error: 'Only approved mentors can update their profile' },
        { status: 403 }
      )
    }

    // Update mentor profile
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        discord_username: discordUsername,
        mentor_bio: mentorBio,
        mentor_specialties: mentorSpecialties,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Error updating profile:', updateError)
      return NextResponse.json(
        { error: 'Failed to update profile' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Mentor profile updated successfully'
    })

  } catch (error) {
    console.error('Error in mentor profile update:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
