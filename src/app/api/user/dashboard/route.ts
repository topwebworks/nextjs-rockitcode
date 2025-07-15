// Week 5: Dashboard API Route
// Comprehensive user dashboard data aggregation

import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { UserDashboardData } from '@/types/database'

// GET /api/user/dashboard - Get comprehensive dashboard data
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Use our custom dashboard function
    const { data: dashboardData, error } = await supabase.rpc('get_user_dashboard', {
      p_user_id: user.id
    })

    if (error) {
      console.error('Dashboard fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 })
    }

    return NextResponse.json(dashboardData)

  } catch (error) {
    console.error('Dashboard fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
