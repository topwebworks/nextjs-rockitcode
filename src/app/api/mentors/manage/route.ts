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

    // Check if user is admin
    const { data: adminProfile } = await supabase
      .from('user_profiles')
      .select('user_role')
      .eq('user_id', user.id)
      .single()

    if (!adminProfile?.user_role || !['admin', 'super_admin'].includes(adminProfile.user_role)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { userId, action } = body

    if (!userId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid request parameters' },
        { status: 400 }
      )
    }

    let updateData: any = {
      updated_at: new Date().toISOString()
    }

    if (action === 'approve') {
      updateData = {
        ...updateData,
        is_mentor: true,
        mentor_status: 'approved',
        mentor_approved_at: new Date().toISOString(),
        mentor_approved_by: user.id,
        students_helped_this_week: 0,
        hours_mentored_this_week: 0,
        total_students_helped: 0,
        total_hours_mentored: 0,
        mentor_rating: 5.0
      }
    } else {
      // Reject - clear mentor application data
      updateData = {
        ...updateData,
        mentor_status: null,
        mentor_application_reason: null,
        mentor_bio: null,
        mentor_specialties: [],
        discord_username: null
      }
    }

    const { error: updateError } = await supabase
      .from('user_profiles')
      .update(updateData)
      .eq('user_id', userId)

    if (updateError) {
      console.error('Error updating mentor status:', updateError)
      return NextResponse.json(
        { error: 'Failed to update mentor status' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: `Mentor application ${action}ed successfully`,
      action
    })

  } catch (error) {
    console.error('Error in mentor management:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Get pending mentor applications (admin only)
export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient<Database>({ 
      cookies: () => cookies() 
    })

    // Check if user is authenticated and admin
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    const { data: adminProfile } = await supabase
      .from('user_profiles')
      .select('user_role')
      .eq('user_id', user.id)
      .single()

    if (!adminProfile?.user_role || !['admin', 'super_admin'].includes(adminProfile.user_role)) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Get pending mentor applications
    const { data: applications, error } = await supabase
      .from('user_profiles')
      .select(`
        user_id,
        full_name,
        username,
        avatar_url,
        discord_username,
        mentor_bio,
        mentor_specialties,
        mentor_application_reason,
        created_at,
        updated_at
      `)
      .eq('mentor_status', 'pending')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching applications:', error)
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    return NextResponse.json({ applications })

  } catch (error) {
    console.error('Error fetching mentor applications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
