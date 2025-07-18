import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import type { Database } from '@/types/database'

// Retire from mentor program (preserves all historical data)
export async function DELETE(request: NextRequest) {
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

    if (mentorProfile.mentor_active_status === 'retired') {
      return NextResponse.json(
        { error: 'You are already retired from mentoring' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { confirmation } = body

    if (confirmation !== 'RETIRE_FROM_MENTORING') {
      return NextResponse.json(
        { error: 'Invalid confirmation. Please type "RETIRE_FROM_MENTORING" to confirm.' },
        { status: 400 }
      )
    }

    // Set mentor status to retired (preserves all historical data)
    const { error: updateError } = await supabase
      .from('user_profiles')
      .update({
        mentor_active_status: 'retired',
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)

    if (updateError) {
      console.error('Error retiring mentor:', updateError)
      return NextResponse.json(
        { error: 'Failed to retire from mentoring' },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: 'Successfully retired from mentor program. Your historical contributions are preserved.',
      status: 'retired'
    })

  } catch (error) {
    console.error('Error in mentor retirement:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
