-- Fix get_mentor_leaderboard function to use correct column names
-- Column name fix for students_helped and hours_mentored

CREATE OR REPLACE FUNCTION get_mentor_leaderboard()
RETURNS TABLE (
    user_id UUID,
    full_name TEXT,
    username TEXT,
    avatar_url TEXT,
    discord_username TEXT,
    mentor_bio TEXT,
    mentor_specialties TEXT[],
    students_helped INTEGER,
    hours_mentored INTEGER,
    mentor_rating NUMERIC,
    review_count INTEGER,
    mentor_active_status BOOLEAN,
    rank_position INTEGER
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
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
        COALESCE(ms.mentor_rating, 0.0)::NUMERIC as mentor_rating,
        COALESCE(ms.review_count, 0)::INTEGER as review_count,
        COALESCE(up.mentor_active_status, false) as mentor_active_status,
        ROW_NUMBER() OVER (
            ORDER BY 
                COALESCE(ms.mentor_rating, 0.0) DESC,
                COALESCE(up.total_students_helped, 0) DESC
        )::INTEGER as rank_position
    FROM user_profiles up
    LEFT JOIN mentor_stats ms ON up.user_id = ms.mentor_id
    WHERE up.mentor_active_status = true
    ORDER BY 
        COALESCE(ms.mentor_rating, 0.0) DESC,
        COALESCE(up.total_students_helped, 0) DESC;
END;
$$;
