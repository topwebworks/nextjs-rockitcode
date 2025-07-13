// Week 6: AI Learning Insights API
// Intelligent insights and recommendations based on learning patterns

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { AILearningAssistant } from '@/lib/ai-assistant'

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

    // Get user learning data for analysis
    const { data: progressData } = await supabase
      .from('user_progress')
      .select(`
        lesson_id,
        completion_percentage,
        time_spent,
        score,
        attempts,
        lessons(title, difficulty, estimated_time)
      `)
      .eq('user_id', user.id)
      .order('completed_at', { ascending: false })
      .limit(50)

    // Get learning analytics
    const { data: analyticsData } = await supabase
      .from('learning_analytics')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20)

    // Analyze patterns and generate insights
    const insights = []

    // Strength analysis
    const highScoreLessons = progressData?.filter(p => (p.score || 0) >= 85) || []
    if (highScoreLessons.length > 0) {
      const strongSubjects = [...new Set(highScoreLessons.map(l => {
        const lesson = Array.isArray(l.lessons) ? l.lessons[0] : l.lessons
        return lesson?.title?.split(' ')[0] || 'Programming'
      }))]
      
      insights.push({
        type: 'strength' as const,
        title: 'Strong Performance Areas',
        description: `You consistently excel in ${strongSubjects.slice(0, 2).join(' and ')} topics with an average score of ${Math.round(highScoreLessons.reduce((sum, l) => sum + (l.score || 0), 0) / highScoreLessons.length)}%.`,
        actionable: true,
        priority: 'low' as const,
        estimatedImpact: 'Continue building on these strengths to reach advanced levels'
      })
    }

    // Weakness analysis
    const lowScoreLessons = progressData?.filter(p => (p.score || 0) < 70) || []
    if (lowScoreLessons.length > 0) {
      const weakSubjects = [...new Set(lowScoreLessons.map(l => {
        const lesson = Array.isArray(l.lessons) ? l.lessons[0] : l.lessons
        return lesson?.title?.split(' ')[0] || 'Programming'
      }))]
      
      insights.push({
        type: 'weakness' as const,
        title: 'Areas for Improvement',
        description: `Focus on ${weakSubjects.slice(0, 2).join(' and ')} topics where your average score is ${Math.round(lowScoreLessons.reduce((sum, l) => sum + (l.score || 0), 0) / lowScoreLessons.length)}%. Consider reviewing fundamentals.`,
        actionable: true,
        priority: 'high' as const,
        estimatedImpact: 'Improving these areas could boost overall performance by 15-20%'
      })
    }

    // Time efficiency analysis
    const avgTimeSpent = progressData?.length 
      ? progressData.reduce((sum, p) => sum + (p.time_spent || 0), 0) / progressData.length 
      : 0
    
    if (avgTimeSpent > 0) {
      const fastLearner = avgTimeSpent < 25 // minutes
      const slowLearner = avgTimeSpent > 45
      
      if (fastLearner) {
        insights.push({
          type: 'recommendation' as const,
          title: 'Efficient Learner',
          description: `You complete lessons quickly (avg: ${Math.round(avgTimeSpent)} min). Consider challenging yourself with advanced topics or project-based learning.`,
          actionable: true,
          priority: 'medium' as const,
          estimatedImpact: 'Could accelerate learning by 25% with appropriate challenges'
        })
      } else if (slowLearner) {
        insights.push({
          type: 'recommendation' as const,
          title: 'Deep Learning Approach',
          description: `You take time to understand concepts thoroughly (avg: ${Math.round(avgTimeSpent)} min). Consider breaking complex topics into smaller chunks.`,
          actionable: true,
          priority: 'medium' as const,
          estimatedImpact: 'Could improve retention and reduce cognitive load'
        })
      }
    }

    // Completion pattern analysis
    const incompleteLessons = progressData?.filter(p => p.completion_percentage < 100) || []
    if (incompleteLessons.length > 3) {
      insights.push({
        type: 'weakness' as const,
        title: 'Completion Challenge',
        description: `You have ${incompleteLessons.length} incomplete lessons. Completing these will solidify your foundation and improve confidence.`,
        actionable: true,
        priority: 'high' as const,
        estimatedImpact: 'Completing these could improve overall understanding by 30%'
      })
    }

    // Engagement prediction
    const recentEngagement = analyticsData?.slice(0, 5)
    const avgEngagement = recentEngagement?.length 
      ? recentEngagement.reduce((sum, a) => sum + (a.engagement_score || 0), 0) / recentEngagement.length 
      : 7

    if (avgEngagement < 6) {
      insights.push({
        type: 'prediction' as const,
        title: 'Engagement Risk',
        description: `Recent engagement score is ${avgEngagement.toFixed(1)}/10. Consider varying learning methods or taking a short break to maintain motivation.`,
        actionable: true,
        priority: 'high' as const,
        estimatedImpact: 'Addressing engagement issues could prevent learning plateau'
      })
    }

    // Success prediction
    if (progressData && progressData.length > 10) {
      const successRate = progressData.filter(p => (p.score || 0) >= 75).length / progressData.length
      insights.push({
        type: 'prediction' as const,
        title: 'Learning Trajectory',
        description: `Based on your ${Math.round(successRate * 100)}% success rate, you're on track to master current topics within ${Math.ceil(10 / Math.max(successRate, 0.1))} more lessons.`,
        actionable: false,
        priority: 'low' as const,
        estimatedImpact: 'Continue current pace for optimal learning outcomes'
      })
    }

    return NextResponse.json({
      insights: insights.slice(0, 6) // Limit to 6 most relevant insights
    })

  } catch (error) {
    console.error('Learning insights API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
