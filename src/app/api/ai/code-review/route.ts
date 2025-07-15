// Week 6: AI Code Review API Route
// Intelligent code analysis and feedback system

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase'
import { aiAssistant, AICache } from '@/lib/ai-assistant'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
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

    const { code, language, context, lessonId } = await request.json()

    if (!code || !language) {
      return NextResponse.json({ error: 'Code and language are required' }, { status: 400 })
    }

    // Create cache key for this code review
    const cacheKey = `code_review:${user.id}:${Buffer.from(code).toString('base64').slice(0, 32)}`
    
    // Check cache first
    let review = AICache.get(cacheKey)
    
    if (!review) {
      // Generate AI code review
      review = await aiAssistant.reviewCode(code, language, context)
      
      // Cache the result for 5 minutes
      AICache.set(cacheKey, review, 300)
    }

    // Store the review in the database for analytics
    await supabase.from('ai_interactions').insert({
      user_id: user.id,
      interaction_type: 'code_review',
      input_data: { code, language, context },
      output_data: review,
      lesson_id: lessonId,
      created_at: new Date().toISOString()
    })

    return NextResponse.json({
      success: true,
      review
    })

  } catch (error) {
    console.error('AI code review error:', error)
    return NextResponse.json(
      { error: 'Failed to review code' }, 
      { status: 500 }
    )
  }
}
