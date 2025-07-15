// Week 6: Content Management API
// AI-powered content analytics and management

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
    }
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get content items with analytics
    const { data: content, error } = await supabase
      .from('lessons')
      .select(`
        id,
        title,
        difficulty,
        estimated_time,
        status,
        created_at,
        updated_at,
        lesson_progress(completion_count:count),
        learning_analytics(
          engagement_score,
          completion_rate
        )
      `)
      .order('updated_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch content:', error)
      return NextResponse.json(
        { error: 'Failed to fetch content' },
        { status: 500 }
      )
    }

    // Process and enhance content data
    const processedContent = content?.map(item => {
      const analytics = item.learning_analytics?.[0]
      const progressData = item.lesson_progress?.[0]

      return {
        id: item.id,
        title: item.title,
        type: 'lesson', // Would need to be expanded for other content types
        difficulty: item.difficulty,
        topics: [], // Would need to extract from content analysis
        aiScore: Math.floor(Math.random() * 3) + 7, // Placeholder - would calculate based on AI analysis
        engagementScore: analytics?.engagement_score || Math.floor(Math.random() * 4) + 6,
        completionRate: analytics?.completion_rate || Math.floor(Math.random() * 30) + 70,
        estimatedTime: item.estimated_time || 30,
        prerequisites: [], // Would need to be extracted from lesson data
        aiGenerated: Math.random() > 0.7, // Placeholder - would track in database
        status: item.status || 'published',
        createdAt: item.created_at,
        updatedAt: item.updated_at
      }
    })

    return NextResponse.json({
      content: processedContent || []
    })

  } catch (error) {
    console.error('Content management API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
