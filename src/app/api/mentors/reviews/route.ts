import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

/**
 * API Routes for Mentor Review System
 * Handles review submission, fetching, and thumbs up functionality
 */

// GET: Fetch mentor reviews
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }
    
    const { searchParams } = new URL(request.url)
    const mentorId = searchParams.get('mentorId')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    if (!mentorId) {
      return NextResponse.json({ error: 'Mentor ID is required' }, { status: 400 })
    }

    // Get mentor reviews using the database function
    const { data: reviews, error } = await supabase
      .rpc('get_mentor_reviews_simple', {
        mentor_user_id: mentorId,
        limit_count: limit,
        offset_count: offset
      })

    if (error) {
      console.error('Error fetching mentor reviews:', error)
      return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 })
    }

    return NextResponse.json({ reviews })
  } catch (error) {
    console.error('Error in GET /api/mentors/reviews:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: Submit a mentor review
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    if (!supabase) {
      return NextResponse.json({ error: 'Database not configured' }, { status: 500 })
    }
    
    const body = await request.json()
    const { mentorId, rating, reviewText, sessionTopic, sessionDate } = body

    // Validate required fields
    if (!mentorId || !rating) {
      return NextResponse.json({ 
        error: 'Mentor ID and rating are required' 
      }, { status: 400 })
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json({ 
        error: 'Rating must be between 1 and 5' 
      }, { status: 400 })
    }

    // Submit review using database function
    const { data: result, error } = await supabase
      .rpc('submit_mentor_review', {
        p_mentor_id: mentorId,
        p_rating: rating,
        p_review_text: reviewText || null,
        p_session_topic: sessionTopic || null,
        p_session_date: sessionDate || null
      })

    if (error) {
      console.error('Error submitting mentor review:', error)
      return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 })
    }

    // Check if the function returned an error
    if (result && !result.success) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Review submitted successfully',
      reviewId: result?.review_id 
    })
  } catch (error) {
    console.error('Error in POST /api/mentors/reviews:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
