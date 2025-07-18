import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
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

    // Get user's rank from the leaderboard
    let { data: leaderboard, error } = await supabase
      .rpc('get_mentor_leaderboard', {
        period_type: 'all_time',
        limit_count: 1000 // Get more results to find user's rank
      })

    // If RPC function doesn't exist, fall back to direct query
    if (error && error.message?.includes('Could not find the function')) {
      console.log('RPC function not found, using fallback query...')
      
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('user_profiles')
        .select(`
          user_id,
          total_students_helped
        `)
        .eq('is_mentor', true)
        .eq('mentor_status', 'approved')
        .in('mentor_active_status', ['active', 'away'])
        .order('total_students_helped', { ascending: false })
        .limit(1000)

      if (fallbackError) {
        console.error('Error fetching leaderboard fallback:', fallbackError)
        return NextResponse.json(
          { error: 'Failed to fetch rank' },
          { status: 500 }
        )
      }

      leaderboard = fallbackData || []
    } else if (error) {
      console.error('Error fetching leaderboard:', error)
      return NextResponse.json(
        { error: 'Failed to fetch rank' },
        { status: 500 }
      )
    }

    // Find user's position in leaderboard
    const userPosition = leaderboard?.findIndex((mentor: any) => mentor.user_id === user.id)
    const rankPosition = userPosition !== -1 ? userPosition + 1 : null

    return NextResponse.json({ 
      rank_position: rankPosition,
      total_mentors: leaderboard?.length || 0
    })

  } catch (error) {
    console.error('Error getting mentor rank:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
