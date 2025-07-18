-- Week 5: Sample Data and Development Setup
-- This migration adds sample data for development and testing

-- Note: Sample achievements will be inserted when users actually earn them
-- The actual achievement awarding will be handled by the application logic

-- Create a function to award achievements
CREATE OR REPLACE FUNCTION award_achievement(
    p_user_id UUID,
    p_achievement_id TEXT,
    p_title TEXT,
    p_description TEXT DEFAULT NULL,
    p_icon TEXT DEFAULT NULL,
    p_rarity TEXT DEFAULT 'common',
    p_points INTEGER DEFAULT 10,
    p_metadata JSONB DEFAULT '{}'
)
RETURNS BOOLEAN AS $$
DECLARE
    achievement_exists BOOLEAN;
BEGIN
    -- Check if user already has this achievement
    SELECT EXISTS(
        SELECT 1 FROM user_achievements 
        WHERE user_id = p_user_id AND achievement_id = p_achievement_id
    ) INTO achievement_exists;
    
    -- Only award if they don't already have it
    IF NOT achievement_exists THEN
        INSERT INTO user_achievements (
            user_id, achievement_type, achievement_id, title, description, 
            icon, rarity, points, metadata
        ) VALUES (
            p_user_id, 'milestone', p_achievement_id, p_title, p_description,
            p_icon, p_rarity, p_points, p_metadata
        );
        RETURN TRUE;
    END IF;
    
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get user dashboard data
CREATE OR REPLACE FUNCTION get_user_dashboard(p_user_id UUID)
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'profile', (
            SELECT row_to_json(up) FROM (
                SELECT full_name, username, avatar_url, learning_streak, 
                       total_lessons_completed, current_level, last_active
                FROM user_profiles WHERE user_id = p_user_id
            ) up
        ),
        'recent_progress', (
            SELECT json_agg(cp) FROM (
                SELECT course_id, lesson_id, status, completion_percentage, 
                       time_spent_minutes, last_accessed
                FROM course_progress 
                WHERE user_id = p_user_id 
                ORDER BY last_accessed DESC 
                LIMIT 5
            ) cp
        ),
        'achievements', (
            SELECT json_agg(ua) FROM (
                SELECT achievement_id, title, description, icon, rarity, 
                       points, earned_at
                FROM user_achievements 
                WHERE user_id = p_user_id 
                ORDER BY earned_at DESC 
                LIMIT 10
            ) ua
        ),
        'preferences', (
            SELECT row_to_json(pref) FROM (
                SELECT theme, language, notifications_enabled, 
                       difficulty_preference, code_editor_theme
                FROM user_preferences WHERE user_id = p_user_id
            ) pref
        ),
        'stats', (
            SELECT json_build_object(
                'total_time_minutes', COALESCE(SUM(duration_minutes), 0),
                'sessions_this_week', COUNT(CASE WHEN session_start > NOW() - INTERVAL '7 days' THEN 1 END),
                'current_streak', (SELECT learning_streak FROM user_profiles WHERE user_id = p_user_id)
            )
            FROM learning_sessions WHERE user_id = p_user_id
        )
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update course progress with analytics
CREATE OR REPLACE FUNCTION update_course_progress_with_analytics(
    p_user_id UUID,
    p_course_id TEXT,
    p_lesson_id TEXT,
    p_status TEXT,
    p_completion_percentage INTEGER DEFAULT NULL,
    p_time_spent INTEGER DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Insert or update progress
    INSERT INTO course_progress (
        user_id, course_id, lesson_id, status, completion_percentage, 
        time_spent_minutes, started_at, completed_at, last_accessed
    ) VALUES (
        p_user_id, p_course_id, p_lesson_id, p_status, 
        COALESCE(p_completion_percentage, 0),
        COALESCE(p_time_spent, 0),
        CASE WHEN p_status != 'not_started' THEN NOW() END,
        CASE WHEN p_status = 'completed' THEN NOW() END,
        NOW()
    )
    ON CONFLICT (user_id, course_id, lesson_id) 
    DO UPDATE SET
        status = EXCLUDED.status,
        completion_percentage = COALESCE(EXCLUDED.completion_percentage, course_progress.completion_percentage),
        time_spent_minutes = course_progress.time_spent_minutes + COALESCE(p_time_spent, 0),
        completed_at = CASE WHEN EXCLUDED.status = 'completed' THEN NOW() ELSE course_progress.completed_at END,
        last_accessed = NOW(),
        updated_at = NOW();
    
    -- Award achievements for milestones
    IF p_status = 'completed' THEN
        -- First lesson achievement
        PERFORM award_achievement(
            p_user_id,
            'first_lesson_completed',
            'First Steps',
            'Completed your first lesson!',
            '🎯',
            'common',
            10
        );
        
        -- Check for course completion
        IF (SELECT COUNT(*) FROM course_progress 
            WHERE user_id = p_user_id AND course_id = p_course_id AND status = 'completed') >= 5 THEN
            PERFORM award_achievement(
                p_user_id,
                'course_completion_' || p_course_id,
                'Course Master',
                'Completed a full course!',
                '🏆',
                'rare',
                50
            );
        END IF;
    END IF;
    
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to start a learning session
CREATE OR REPLACE FUNCTION start_learning_session(
    p_user_id UUID,
    p_device_info JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
    session_id UUID;
BEGIN
    INSERT INTO learning_sessions (user_id, device_info)
    VALUES (p_user_id, p_device_info)
    RETURNING id INTO session_id;
    
    -- Update last_active in user profile
    UPDATE user_profiles 
    SET last_active = NOW() 
    WHERE user_id = p_user_id;
    
    RETURN session_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to end a learning session
CREATE OR REPLACE FUNCTION end_learning_session(
    p_session_id UUID,
    p_courses_accessed TEXT[] DEFAULT '{}',
    p_lessons_completed INTEGER DEFAULT 0,
    p_exercises_completed INTEGER DEFAULT 0
)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE learning_sessions 
    SET 
        session_end = NOW(),
        duration_minutes = EXTRACT(EPOCH FROM (NOW() - session_start)) / 60,
        courses_accessed = p_courses_accessed,
        lessons_completed = p_lessons_completed,
        exercises_completed = p_exercises_completed
    WHERE id = p_session_id;
    
    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a view for user statistics
CREATE OR REPLACE VIEW user_statistics AS
SELECT 
    up.user_id,
    up.full_name,
    up.username,
    up.learning_streak,
    up.total_lessons_completed,
    up.current_level,
    up.join_date,
    up.last_active,
    
    -- Progress statistics
    COUNT(DISTINCT cp.course_id) as courses_started,
    COUNT(CASE WHEN cp.status = 'completed' THEN 1 END) as lessons_completed,
    AVG(cp.completion_percentage) as avg_completion_rate,
    SUM(cp.time_spent_minutes) as total_study_time,
    
    -- Session statistics
    COUNT(DISTINCT ls.id) as total_sessions,
    AVG(ls.duration_minutes) as avg_session_duration,
    
    -- Achievement statistics
    COUNT(DISTINCT ua.id) as total_achievements,
    SUM(ua.points) as total_points,
    
    -- Recent activity
    MAX(cp.last_accessed) as last_lesson_accessed,
    MAX(ls.session_start) as last_session_start

FROM user_profiles up
LEFT JOIN course_progress cp ON up.user_id = cp.user_id
LEFT JOIN learning_sessions ls ON up.user_id = ls.user_id
LEFT JOIN user_achievements ua ON up.user_id = ua.user_id
GROUP BY up.user_id, up.full_name, up.username, up.learning_streak, 
         up.total_lessons_completed, up.current_level, up.join_date, up.last_active;

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO authenticated;
