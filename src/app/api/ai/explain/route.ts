// Week 6: AI Explanation API Route
// Intelligent concept explanations and learning assistance

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { aiAssistant, AICache } from '@/lib/ai-assistant'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = await createServerSupabaseClient()
    
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { concept, context, lessonId } = await request.json()

    if (!concept) {
      return NextResponse.json({ error: 'Concept is required' }, { status: 400 })
    }

    // Get user's skill level from profile
    const { data: profile } = await supabase
      .from('user_profiles')
      .select('current_level')
      .eq('user_id', user.id)
      .single()

    const userLevel = profile?.current_level || 'beginner'

    // Create cache key for this explanation
    const cacheKey = `explanation:${concept}:${userLevel}:${context || 'general'}`
    
    // Check cache first
    let explanation = AICache.get(cacheKey)
    
    if (!explanation) {
      // Generate AI explanation
      explanation = await aiAssistant.explainConcept(concept, userLevel, context)
      
      // Cache the result for 30 minutes
      AICache.set(cacheKey, explanation, 1800)
    }

    // Store the interaction in the database
    await supabase.from('ai_interactions').insert({
      user_id: user.id,
      interaction_type: 'concept_explanation',
      input_data: { concept, context, userLevel },
      output_data: explanation,
      lesson_id: lessonId,
      created_at: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      explanation
    })

  } catch (error) {
    console.error('AI explanation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate explanation' }, 
      { status: 500 }
    )
  }
}
