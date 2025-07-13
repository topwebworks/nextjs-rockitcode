// Week 6: AI Hint Generation API Route
// Smart hint system for guided learning

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

    const { problem, userCode, language, difficulty, lessonId } = await request.json()

    if (!problem || !userCode || !language) {
      return NextResponse.json({ 
        error: 'Problem, user code, and language are required' 
      }, { status: 400 })
    }

    // Create cache key for this hint request
    const cacheKey = `hint:${user.id}:${Buffer.from(problem + userCode).toString('base64').slice(0, 32)}`
    
    // Check cache first (shorter TTL for hints to ensure relevance)
    let hint = AICache.get(cacheKey)
    
    if (!hint) {
      // Generate AI hint
      hint = await aiAssistant.generateHint(problem, userCode, language, difficulty || 5)
      
      // Cache the result for 2 minutes
      AICache.set(cacheKey, hint, 120)
    }

    // Store the interaction in the database
    await supabase.from('ai_interactions').insert({
      user_id: user.id,
      interaction_type: 'hint_generation',
      input_data: { problem, userCode, language, difficulty },
      output_data: hint,
      lesson_id: lessonId,
      created_at: new Date().toISOString()
    })

    // Update hint usage count for analytics
    await supabase.rpc('increment_hint_usage', {
      p_user_id: user.id,
      p_lesson_id: lessonId
    })

    return NextResponse.json({
      success: true,
      hint
    })

  } catch (error) {
    console.error('AI hint generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate hint' }, 
      { status: 500 }
    )
  }
}
