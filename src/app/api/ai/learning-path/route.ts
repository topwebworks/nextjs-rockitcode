// Week 6: AI Learning Path Recommendations API Route
// Personalized learning journey optimization

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { aiAssistant, AICache } from '@/lib/ai-assistant'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Create cache key for this user's learning path
    const cacheKey = `learning_path:${user.id}`
    
    // Check cache first (cache for 1 hour)
    let recommendations = AICache.get(cacheKey)
    
    if (!recommendations) {
      // Get comprehensive user data for AI analysis
      const [profileResult, progressResult, preferencesResult, achievementsResult] = await Promise.all([
        supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single(),
        supabase
          .from('course_progress')
          .select('*')
          .eq('user_id', user.id)
          .order('last_accessed', { ascending: false })
          .limit(20),
        supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', user.id)
          .single(),
        supabase
          .from('user_achievements')
          .select('*')
          .eq('user_id', user.id)
          .order('earned_at', { ascending: false })
          .limit(10)
      ])

      const userProgress = {
        profile: profileResult.data,
        recentProgress: progressResult.data || [],
        achievements: achievementsResult.data || [],
        totalLessons: progressResult.data?.length || 0,
        completedLessons: progressResult.data?.filter(p => p.status === 'completed').length || 0
      }

      const userPreferences = preferencesResult.data || {}

      // Generate AI recommendations
      recommendations = await aiAssistant.recommendLearningPath(userProgress, userPreferences)
      
      // Cache the result for 1 hour
      AICache.set(cacheKey, recommendations, 3600)
    }

    // Store the interaction in the database
    await supabase.from('ai_interactions').insert({
      user_id: user.id,
      interaction_type: 'learning_path_recommendation',
      input_data: { timestamp: new Date().toISOString() },
      output_data: recommendations,
      created_at: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      recommendations
    })

  } catch (error) {
    console.error('AI learning path error:', error)
    return NextResponse.json(
      { error: 'Failed to generate learning recommendations' }, 
      { status: 500 }
    )
  }
}

// POST endpoint for updating learning path based on new progress
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { completedLesson, strugglingWith, interests } = await request.json()

    // Clear existing cache to force fresh recommendations
    const cacheKey = `learning_path:${user.id}`
    AICache.set(cacheKey, null, 0) // Expire immediately

    // Update user preferences if provided
    if (interests || strugglingWith) {
      const updates: any = {}
      if (interests) updates.interests = interests
      if (strugglingWith) updates.struggling_areas = strugglingWith

      await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
    }

    // Trigger a new recommendation generation
    const response = await fetch(`${request.url}`, {
      method: 'GET',
      headers: request.headers
    })

    return response

  } catch (error) {
    console.error('AI learning path update error:', error)
    return NextResponse.json(
      { error: 'Failed to update learning path' }, 
      { status: 500 }
    )
  }
}
