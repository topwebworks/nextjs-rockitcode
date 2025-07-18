-- Fix decimal hours support by changing integer columns to numeric

-- Update hours columns to support decimals
ALTER TABLE user_profiles 
ALTER COLUMN hours_mentored_this_week TYPE NUMERIC(5,2),
ALTER COLUMN total_hours_mentored TYPE NUMERIC(7,2);

-- Add a comment for clarity
COMMENT ON COLUMN user_profiles.hours_mentored_this_week IS 'Hours mentored this week (supports decimals like 1.5 for 1 hour 30 minutes)';
COMMENT ON COLUMN user_profiles.total_hours_mentored IS 'Total hours mentored (supports decimals like 1.5 for 1 hour 30 minutes)';

-- Update the leaderboard function to handle decimal hours
-- Only drop the function that actually exists
DROP FUNCTION IF EXISTS get_mentor_leaderboard(TEXT, INTEGER);

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
    hours_mentored NUMERIC,
    mentor_rating DECIMAL,
    review_count INTEGER,
    mentor_active_status TEXT,
    rank_position INTEGER
) AS $$
DECLARE
    date_filter TIMESTAMP WITH TIME ZONE;
BEGIN
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
        COALESCE(up.total_hours_mentored, 0.0) as hours_mentored,
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

-- Grant execute permission only for the function we created
GRANT EXECUTE ON FUNCTION get_mentor_leaderboard(TEXT, INTEGER) TO authenticated;
