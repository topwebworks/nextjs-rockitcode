// Week 5: Progress Tracking API Routes
// Real-time progress synchronization for user learning journey

import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import type { ProgressUpdate } from '@/types/database'

// POST /api/user/progress - Update course progress
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const progressUpdate: ProgressUpdate = await request.json()
    
    // Use our custom function for progress tracking with analytics
    const { data, error } = await supabase.rpc('update_course_progress_with_analytics', {
      p_user_id: user.id,
      p_course_id: progressUpdate.courseId,
      p_lesson_id: progressUpdate.lessonId,
      p_status: progressUpdate.status,
      p_completion_percentage: progressUpdate.completionPercentage || 0,
      p_time_spent: progressUpdate.timeSpent || 0
    })

    if (error) {
      console.error('Progress update error:', error)
      return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 })
    }

    // Get updated progress for response
    const { data: updatedProgress, error: fetchError } = await supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', progressUpdate.courseId)
      .eq('lesson_id', progressUpdate.lessonId)
      .single()

    if (fetchError) {
      console.error('Progress fetch error:', fetchError)
      return NextResponse.json({ error: 'Failed to fetch updated progress' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      progress: updatedProgress,
      analyticsUpdated: data 
    })

  } catch (error) {
    console.error('Progress update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// GET /api/user/progress - Get user progress data
export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const courseId = searchParams.get('courseId')
    const lessonId = searchParams.get('lessonId')

    let query = supabase
      .from('course_progress')
      .select('*')
      .eq('user_id', user.id)
      .order('last_accessed', { ascending: false })

    if (courseId) {
      query = query.eq('course_id', courseId)
    }

    if (lessonId) {
      query = query.eq('lesson_id', lessonId)
    }

    const { data: progress, error } = await query

    if (error) {
      console.error('Progress fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
    }

    return NextResponse.json({ progress })

  } catch (error) {
    console.error('Progress fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
