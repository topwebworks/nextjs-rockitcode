// Week 6: AI Learning Stats API
// Comprehensive learning analytics and statistics

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

    // Get user progress data
    const { data: progressData } = await supabase
      .from('user_progress')
      .select(`
        lesson_id,
        completion_percentage,
        time_spent,
        score,
        completed_at,
        lessons(title, difficulty)
      `)
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })

    // Get learning sessions
    const { data: sessions } = await supabase
      .from('learning_sessions')
      .select('*')
      .eq('user_id', user.id)
      .order('started_at', { ascending: false })

    // Calculate statistics
    const completedLessons = progressData?.filter(p => p.completion_percentage >= 100) || []
    const totalTimeSpent = progressData?.reduce((sum, p) => sum + (p.time_spent || 0), 0) || 0
    const averageScore = progressData?.length 
      ? progressData.reduce((sum, p) => sum + (p.score || 0), 0) / progressData.length 
      : 0

    // Calculate current streak
    let currentStreak = 0
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (sessions?.length) {
      const sortedSessions = sessions.sort((a, b) => 
        new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
      )
      
      for (let i = 0; i < sortedSessions.length; i++) {
        const sessionDate = new Date(sortedSessions[i].started_at)
        sessionDate.setHours(0, 0, 0, 0)
        
        const daysDiff = Math.floor((today.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24))
        
        if (daysDiff === i) {
          currentStreak++
        } else {
          break
        }
      }
    }

    // Skill progression (simplified - would be more sophisticated in production)
    const skillProgression = [
      {
        skill: 'JavaScript',
        level: Math.min(5, Math.floor(completedLessons.length / 10) + 1),
        progress: Math.min(100, (completedLessons.length % 10) * 10),
        nextMilestone: 'Advanced Functions'
      },
      {
        skill: 'React',
        level: Math.min(4, Math.floor(completedLessons.length / 15) + 1),
        progress: Math.min(100, (completedLessons.length % 15) * 6.67),
        nextMilestone: 'Component Optimization'
      },
      {
        skill: 'CSS',
        level: Math.min(4, Math.floor(completedLessons.length / 12) + 1),
        progress: Math.min(100, (completedLessons.length % 12) * 8.33),
        nextMilestone: 'Grid Mastery'
      }
    ]

    // Recent achievements
    const recentAchievements = [
      {
        title: 'First Lesson Completed',
        description: 'Completed your first coding lesson',
        earnedAt: progressData?.[0]?.completed_at || new Date().toISOString(),
        type: 'completion' as const
      },
      ...(currentStreak >= 3 ? [{
        title: 'Learning Streak',
        description: `${currentStreak} days of consistent learning`,
        earnedAt: new Date().toISOString(),
        type: 'streak' as const
      }] : []),
      ...(averageScore >= 80 ? [{
        title: 'High Achiever',
        description: 'Maintained an average score above 80%',
        earnedAt: new Date().toISOString(),
        type: 'score' as const
      }] : [])
    ]

    const stats = {
      totalLessonsCompleted: completedLessons.length,
      totalTimeSpent: Math.round(totalTimeSpent),
      currentStreak,
      averageScore: Math.round(averageScore),
      skillProgression,
      recentAchievements: recentAchievements.slice(0, 5)
    }

    return NextResponse.json({ stats })

  } catch (error) {
    console.error('Learning stats API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
