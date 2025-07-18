import { createServerSupabaseClient } from '@/lib/supabase'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database connection failed' },
        { status: 500 }
      )
    }

    // Check if user is authenticated and admin
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      )
    }

    // Check if user is admin
    const isAdmin = user.email?.includes('topwebworks') || 
                    user.email?.includes('@yourcompany.com') || 
                    user.email === 'admin@rockitcode.com'

    if (!isAdmin) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      )
    }

    // Create the get_mentor_leaderboard function
    const createFunctionSQL = `
-- Drop existing function if it exists
DROP FUNCTION IF EXISTS get_mentor_leaderboard(TEXT);
DROP FUNCTION IF EXISTS get_mentor_leaderboard();

-- Create the updated function with limit parameter
CREATE OR REPLACE FUNCTION get_mentor_leaderboard(
    period_type TEXT DEFAULT 'today',
    limit_count INTEGER DEFAULT 20
)
RETURNS TABLE(
    user_id UUID,
    full_name TEXT,
    username TEXT,
    avatar_url TEXT,
    discord_username TEXT,
    mentor_bio TEXT,
    mentor_specialties TEXT[],
    students_helped INTEGER,
    hours_mentored INTEGER,
    mentor_rating DECIMAL,
    review_count INTEGER,
    mentor_active_status TEXT,
    rank_position INTEGER
) AS $$
DECLARE
    date_filter TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Determine date filter based on period
    CASE period_type
        WHEN 'today' THEN
            date_filter := DATE_TRUNC('day', NOW());
        WHEN 'weekly' THEN
            date_filter := NOW() - INTERVAL '7 days';
        WHEN 'monthly' THEN
            date_filter := NOW() - INTERVAL '30 days';
        ELSE
            date_filter := '1900-01-01'::TIMESTAMP WITH TIME ZONE;
    END CASE;

    RETURN QUERY
    SELECT 
        up.user_id,
        up.full_name,
        up.username,
        up.avatar_url,
        up.discord_username,
        up.mentor_bio,
        up.mentor_specialties,
        COALESCE(up.total_students_helped, 0) as students_helped,
        COALESCE(up.total_hours_mentored, 0) as hours_mentored,
        COALESCE(mentor_ratings.avg_rating, 0.0)::DECIMAL as mentor_rating,
        COALESCE(review_stats.review_count, 0)::INTEGER as review_count,
        up.mentor_active_status,
        ROW_NUMBER() OVER (
            ORDER BY 
                COALESCE(up.total_students_helped, 0) DESC,
                COALESCE(mentor_ratings.avg_rating, 0.0) DESC,
                up.created_at ASC
        )::INTEGER as rank_position
    FROM user_profiles up
    LEFT JOIN (
        SELECT 
            mentor_id,
            AVG(rating)::DECIMAL as avg_rating
        FROM mentor_reviews 
        WHERE created_at >= date_filter
        GROUP BY mentor_id
    ) mentor_ratings ON up.user_id = mentor_ratings.mentor_id
    LEFT JOIN (
        SELECT 
            mentor_id,
            COUNT(*) as review_count
        FROM mentor_reviews 
        WHERE created_at >= date_filter
        GROUP BY mentor_id
    ) review_stats ON up.user_id = review_stats.mentor_id
    WHERE up.is_mentor = true 
        AND up.mentor_status = 'approved'
        AND up.mentor_active_status IN ('active', 'away')
    ORDER BY 
        COALESCE(up.total_students_helped, 0) DESC,
        COALESCE(mentor_ratings.avg_rating, 0.0) DESC,
        up.created_at ASC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
    `

    // For now, return the SQL that needs to be executed manually
    // Since we can't execute DDL statements directly through the API
    return NextResponse.json({ 
      message: 'Please execute the following SQL in your Supabase SQL editor',
      sql: createFunctionSQL,
      instructions: [
        '1. Go to your Supabase dashboard',
        '2. Navigate to SQL Editor',
        '3. Create a new query',
        '4. Paste the SQL provided in the "sql" field',
        '5. Run the query',
        '6. The leaderboard should work after this'
      ]
    })

    return NextResponse.json({ 
      message: 'get_mentor_leaderboard function created successfully',
      success: true
    })

  } catch (error) {
    console.error('Error in migration:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
