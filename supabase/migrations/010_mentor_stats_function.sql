-- Create function to get live mentor statistics
CREATE OR REPLACE FUNCTION get_mentor_stats()
RETURNS TABLE(
    total_active_mentors INTEGER,
    total_hours_this_week INTEGER,
    total_students_helped_this_month INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        -- Count of active mentors
        (SELECT COUNT(*)::INTEGER 
         FROM user_profiles 
         WHERE mentor_active_status = 'active')::INTEGER as total_active_mentors,
        
        -- Sum of hours mentored this week across all mentors
        (SELECT COALESCE(SUM(hours_mentored_this_week), 0)::INTEGER 
         FROM user_profiles 
         WHERE mentor_active_status = 'active')::INTEGER as total_hours_this_week,
        
        -- Count of students helped this month (from completed sessions)
        (SELECT COUNT(DISTINCT student_id)::INTEGER 
         FROM mentor_sessions 
         WHERE session_status = 'completed' 
         AND created_at >= NOW() - INTERVAL '30 days')::INTEGER as total_students_helped_this_month;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
