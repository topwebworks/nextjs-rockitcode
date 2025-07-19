import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API Route for Review Thumbs Up
 * Handles giving/removing thumbs up on mentor reviews
 */

// POST: Give or remove thumbs up on a review
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }
    
    const body = await request.json()
    const { reviewId } = body

    if (!reviewId) {
      return NextResponse.json({ 
        error: 'Review ID is required' 
      }, { status: 400 })
    }

    // Give thumbs up using database function
    const { data: result, error } = await supabase
      .rpc('give_review_thumbs_up', {
        p_review_id: reviewId
      })

    if (error) {
      console.error('Error giving thumbs up:', error)
      return NextResponse.json({ error: 'Failed to process thumbs up' }, { status: 500 })
    }

    // Check if the function returned an error (e.g., rate limiting)
    if (result && !result.success) {
      return NextResponse.json({ error: result.error }, { status: 429 })
    }

    return NextResponse.json({ 
      success: true, 
      action: result?.action || 'updated',
      newCount: result?.new_count || 0,
      message: result?.action === 'added' 
        ? 'Thumbs up added!' 
        : 'Thumbs up removed!'
    })
  } catch (error) {
    console.error('Error in POST /api/mentors/reviews/thumbs-up:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
