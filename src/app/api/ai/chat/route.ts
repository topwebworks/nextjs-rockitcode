// Week 6: AI General Chat API
// Conversational AI endpoint for general learning assistance

import { NextRequest, NextResponse } from 'next/server'
import { AILearningAssistant } from '@/lib/ai-assistant'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context, lessonId, history } = body

    // Validate required fields
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Get user from session
    const supabase = await createServerSupabaseClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Simple rate limiting - check recent requests
    const identifier = user.id
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000)
    const { count } = await supabase
      .from('ai_interactions')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .gte('created_at', oneMinuteAgo.toISOString())
    
    if (count && count > 10) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // Check cache first
    const cacheKey = `chat:${user.id}:${Buffer.from(message).toString('base64').slice(0, 50)}`
    const { data: cached } = await supabase
      .from('ai_cache')
      .select('response')
      .eq('cache_key', cacheKey)
      .gte('expires_at', new Date().toISOString())
      .single()

    if (cached) {
      return NextResponse.json({ response: cached.response })
    }

    // Initialize AI assistant
    const assistant = new AILearningAssistant()

    // Build conversation context
    let conversationContext = ''
    if (context) {
      conversationContext += `Context: ${context}\n`
    }
    if (lessonId) {
      conversationContext += `Lesson ID: ${lessonId}\n`
    }
    if (history && Array.isArray(history)) {
      conversationContext += 'Recent conversation:\n'
      history.forEach((msg: any) => {
        conversationContext += `${msg.type}: ${msg.content}\n`
      })
    }

    // Get AI response
    const response = await assistant.generateResponse(
      message,
      conversationContext,
      'chat'
    )

    // Cache the response for 5 minutes
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
    await supabase
      .from('ai_cache')
      .upsert({
        cache_key: cacheKey,
        response,
        expires_at: expiresAt.toISOString()
      })

    // Log interaction
    await supabase
      .from('ai_interactions')
      .insert({
        user_id: user.id,
        interaction_type: 'chat',
        input: message,
        output: response,
        context: conversationContext,
        lesson_id: lessonId || null
      })

    return NextResponse.json({ response })

  } catch (error) {
    console.error('AI Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
