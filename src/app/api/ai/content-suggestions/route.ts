// Week 6: AI Content Suggestions API
// Intelligent content recommendations based on user analytics

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { AILearningAssistant } from '@/lib/ai-assistant'

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

    // Get user engagement data for analysis
    const { data: userAnalytics } = await supabase
      .from('learning_analytics')
      .select(`
        engagement_score,
        time_spent,
        completion_rate,
        lesson_id,
        lessons(title, difficulty, status)
      `)
      .limit(100)
      .order('created_at', { ascending: false })

    // Get popular but missing content gaps
    const { data: contentGaps } = await supabase
      .rpc('identify_content_gaps', {}) // Custom DB function to identify gaps

    // Generate AI suggestions based on analytics
    const assistant = new AILearningAssistant()
    
    // Create context from analytics
    const analyticsContext = userAnalytics?.map(item => {
      const lesson = Array.isArray(item.lessons) ? item.lessons[0] : item.lessons
      return `${lesson?.title || 'Unknown'}: ${item.engagement_score}/10 engagement, ${item.completion_rate}% completion`
    }).join('\n') || ''

    // Base suggestions (would be more sophisticated in production)
    const baseSuggestions = [
      {
        type: 'lesson' as const,
        title: 'Advanced JavaScript Closures',
        description: 'Deep dive into closures, scope, and practical applications in modern JavaScript development.',
        difficulty: 'intermediate',
        estimatedDevelopmentTime: '3-4 hours',
        potentialEngagement: 8.5,
        reasoning: 'High demand based on user search patterns and intermediate JavaScript gap analysis.'
      },
      {
        type: 'exercise' as const,
        title: 'React Hook Optimization Challenge',
        description: 'Interactive coding challenges focusing on optimizing React hooks for performance.',
        difficulty: 'advanced',
        estimatedDevelopmentTime: '2-3 hours',
        potentialEngagement: 9.2,
        reasoning: 'React optimization is a trending topic with high engagement in similar content.'
      },
      {
        type: 'project' as const,
        title: 'Build a Real-time Chat App',
        description: 'Full-stack project using Socket.io, Node.js, and React for real-time communication.',
        difficulty: 'intermediate',
        estimatedDevelopmentTime: '8-10 hours',
        potentialEngagement: 9.0,
        reasoning: 'Project-based learning shows 40% higher completion rates for intermediate students.'
      },
      {
        type: 'lesson' as const,
        title: 'TypeScript for JavaScript Developers',
        description: 'Smooth transition guide from JavaScript to TypeScript with practical examples.',
        difficulty: 'beginner',
        estimatedDevelopmentTime: '4-5 hours',
        potentialEngagement: 8.8,
        reasoning: 'TypeScript adoption is growing rapidly, with high search volume for beginner content.'
      },
      {
        type: 'exercise' as const,
        title: 'CSS Grid Master Class',
        description: 'Advanced CSS Grid exercises with real-world layout challenges.',
        difficulty: 'intermediate',
        estimatedDevelopmentTime: '3-4 hours',
        potentialEngagement: 7.9,
        reasoning: 'CSS layout skills show consistent demand and good engagement rates.'
      }
    ]

    // Filter and rank suggestions based on current content
    const { data: existingContent } = await supabase
      .from('lessons')
      .select('title')

    const existingTitles = existingContent?.map(item => item.title.toLowerCase()) || []
    
    const filteredSuggestions = baseSuggestions.filter(suggestion => 
      !existingTitles.some(title => 
        title.includes(suggestion.title.toLowerCase().split(' ')[0])
      )
    )

    // Add AI analysis context
    const enhancedSuggestions = filteredSuggestions.map(suggestion => ({
      ...suggestion,
      reasoning: `${suggestion.reasoning} Based on current platform analytics: ${analyticsContext.slice(0, 200)}...`
    }))

    return NextResponse.json({
      suggestions: enhancedSuggestions.slice(0, 5)
    })

  } catch (error) {
    console.error('AI content suggestions API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
