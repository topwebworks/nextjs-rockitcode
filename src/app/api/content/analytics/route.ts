// Week 6: Content Analytics API
// Advanced analytics for content performance and engagement

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get total content count
    const { count: totalContent } = await supabase
      .from('lessons')
      .select('*', { count: 'exact', head: true })

    // Get analytics data
    const { data: analyticsData } = await supabase
      .from('learning_analytics')
      .select(`
        engagement_score,
        completion_rate,
        lesson_id,
        lessons(title, difficulty)
      `)

    // Calculate average engagement
    const avgEngagement = analyticsData?.length 
      ? analyticsData.reduce((sum, item) => sum + (item.engagement_score || 0), 0) / analyticsData.length
      : 0

    // Get popular topics (simplified)
    const popularTopics = [
      { topic: 'JavaScript Fundamentals', count: 45 },
      { topic: 'React Components', count: 38 },
      { topic: 'CSS Styling', count: 32 },
      { topic: 'API Integration', count: 28 },
      { topic: 'Database Basics', count: 24 }
    ]

    // Difficulty distribution
    const difficultyMap = analyticsData?.reduce((acc, item) => {
      const lesson = Array.isArray(item.lessons) ? item.lessons[0] : item.lessons
      const difficulty = lesson?.difficulty || 'beginner'
      acc[difficulty] = (acc[difficulty] || 0) + 1
      return acc
    }, {} as Record<string, number>) || {}

    const difficultyDistribution = Object.entries(difficultyMap).map(([difficulty, count]) => ({
      difficulty,
      count
    }))

    // Recent activity (simplified)
    const recentActivity = [
      { action: 'Content Created', content: 'Advanced React Hooks', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
      { action: 'Content Optimized', content: 'JavaScript Basics', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
      { action: 'Content Published', content: 'CSS Grid Layout', timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() },
      { action: 'AI Generated', content: 'Node.js Introduction', timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
      { action: 'Content Updated', content: 'Python Functions', timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString() }
    ]

    const analytics = {
      totalContent: totalContent || 0,
      aiGeneratedPercent: Math.floor(Math.random() * 30) + 15, // Placeholder
      averageEngagement: Number(avgEngagement.toFixed(1)),
      popularTopics,
      difficultyDistribution,
      recentActivity
    }

    return NextResponse.json({ analytics })

  } catch (error) {
    console.error('Content analytics API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
