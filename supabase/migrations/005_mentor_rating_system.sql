-- Week 7: Simple Mentor Review System Migration
-- Adds lightweight mentor review system optimized for free tier performance

-- Create simple mentor_reviews table for user feedback
CREATE TABLE IF NOT EXISTS mentor_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reviewer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    session_topic TEXT,
    session_date DATE,
    thumbs_up_count INTEGER DEFAULT 0, -- Simple counter for helpfulness
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Prevent duplicate reviews from same user to same mentor
    UNIQUE(mentor_id, reviewer_id)
);

-- Simple table to track who gave thumbs up (prevent spam)
CREATE TABLE IF NOT EXISTS mentor_review_thumbs (
    review_id UUID NOT NULL REFERENCES mentor_reviews(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Prevent duplicate thumbs up from same user
    UNIQUE(review_id, user_id)
);

-- Create mentor_sessions table for tracking mentoring sessions
CREATE TABLE IF NOT EXISTS mentor_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    mentor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    session_topic TEXT NOT NULL,
    session_date DATE NOT NULL,
    duration_minutes INTEGER,
    session_notes TEXT,
    session_status TEXT DEFAULT 'completed' CHECK (session_status IN ('scheduled', 'completed', 'cancelled')),
    reviewed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all new tables
ALTER TABLE mentor_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_review_thumbs ENABLE ROW LEVEL SECURITY;
ALTER TABLE mentor_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for mentor_reviews
CREATE POLICY "Users can view all mentor reviews" ON mentor_reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for mentors who helped them" ON mentor_reviews
    FOR INSERT WITH CHECK (
        auth.uid() = reviewer_id AND
        EXISTS (
            SELECT 1 FROM mentor_sessions 
            WHERE mentor_id = mentor_reviews.mentor_id 
            AND student_id = auth.uid()
            AND session_status = 'completed'
        )
    );

CREATE POLICY "Users can update their own reviews" ON mentor_reviews
    FOR UPDATE USING (auth.uid() = reviewer_id);

CREATE POLICY "Users can delete their own reviews" ON mentor_reviews
    FOR DELETE USING (auth.uid() = reviewer_id);

-- RLS Policies for mentor_review_thumbs
CREATE POLICY "Users can view all thumbs up" ON mentor_review_thumbs
    FOR SELECT USING (true);

CREATE POLICY "Users can give thumbs up" ON mentor_review_thumbs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their own thumbs up" ON mentor_review_thumbs
    FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for mentor_sessions
CREATE POLICY "Mentors and students can view their own sessions" ON mentor_sessions
    FOR SELECT USING (auth.uid() = mentor_id OR auth.uid() = student_id);

CREATE POLICY "Mentors can create sessions" ON mentor_sessions
    FOR INSERT WITH CHECK (auth.uid() = mentor_id);

CREATE POLICY "Mentors and students can update their sessions" ON mentor_sessions
    FOR UPDATE USING (auth.uid() = mentor_id OR auth.uid() = student_id);

-- Function to calculate mentor rating based on reviews
CREATE OR REPLACE FUNCTION calculate_mentor_rating(mentor_user_id UUID)
RETURNS DECIMAL AS $$
DECLARE
    avg_rating DECIMAL;
BEGIN
    SELECT COALESCE(AVG(rating), 0.0)
    INTO avg_rating
    FROM mentor_reviews
    WHERE mentor_id = mentor_user_id;
    
    RETURN ROUND(avg_rating, 1);
END;
$$ LANGUAGE plpgsql;

-- Function to get mentor statistics with reviews (simplified)
CREATE OR REPLACE FUNCTION get_mentor_stats_with_reviews(mentor_user_id UUID)
RETURNS TABLE(
    total_reviews INTEGER,
    average_rating DECIMAL,
    five_star_count INTEGER,
    four_star_count INTEGER,
    three_star_count INTEGER,
    two_star_count INTEGER,
    one_star_count INTEGER,
    total_sessions INTEGER,
    total_students_helped INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(mr.id)::INTEGER as total_reviews,
        COALESCE(AVG(mr.rating), 0.0)::DECIMAL as average_rating,
        COUNT(CASE WHEN mr.rating = 5 THEN 1 END)::INTEGER as five_star_count,
        COUNT(CASE WHEN mr.rating = 4 THEN 1 END)::INTEGER as four_star_count,
        COUNT(CASE WHEN mr.rating = 3 THEN 1 END)::INTEGER as three_star_count,
        COUNT(CASE WHEN mr.rating = 2 THEN 1 END)::INTEGER as two_star_count,
        COUNT(CASE WHEN mr.rating = 1 THEN 1 END)::INTEGER as one_star_count,
        (SELECT COUNT(*)::INTEGER FROM mentor_sessions WHERE mentor_id = mentor_user_id AND session_status = 'completed') as total_sessions,
        (SELECT COUNT(DISTINCT student_id)::INTEGER FROM mentor_sessions WHERE mentor_id = mentor_user_id AND session_status = 'completed') as total_students_helped
    FROM mentor_reviews mr
    WHERE mr.mentor_id = mentor_user_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get recent mentor reviews (simplified, no complex joins)
CREATE OR REPLACE FUNCTION get_mentor_reviews_simple(
    mentor_user_id UUID,
    limit_count INTEGER DEFAULT 10,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE(
    review_id UUID,
    reviewer_name TEXT,
    reviewer_avatar TEXT,
    rating INTEGER,
    review_text TEXT,
    session_topic TEXT,
    session_date DATE,
    thumbs_up_count INTEGER,
    created_at TIMESTAMP WITH TIME ZONE,
    user_gave_thumbs_up BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        mr.id as review_id,
        up.full_name as reviewer_name,
        up.avatar_url as reviewer_avatar,
        mr.rating,
        mr.review_text,
        mr.session_topic,
        mr.session_date,
        mr.thumbs_up_count,
        mr.created_at,
        EXISTS(
            SELECT 1 FROM mentor_review_thumbs mrt 
            WHERE mrt.review_id = mr.id AND mrt.user_id = auth.uid()
        ) as user_gave_thumbs_up
    FROM mentor_reviews mr
    JOIN user_profiles up ON up.user_id = mr.reviewer_id
    WHERE mr.mentor_id = mentor_user_id
    ORDER BY mr.created_at DESC
    LIMIT limit_count OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Function to submit mentor review
CREATE OR REPLACE FUNCTION submit_mentor_review(
    p_mentor_id UUID,
    p_rating INTEGER,
    p_review_text TEXT,
    p_session_topic TEXT,
    p_session_date DATE
)
RETURNS JSON AS $$
DECLARE
    result JSON;
    review_id UUID;
    can_review BOOLEAN := false;
BEGIN
    -- Check if user has had a completed session with this mentor
    SELECT EXISTS (
        SELECT 1 FROM mentor_sessions 
        WHERE mentor_id = p_mentor_id 
        AND student_id = auth.uid()
        AND session_status = 'completed'
    ) INTO can_review;
    
    IF NOT can_review THEN
        RETURN json_build_object(
            'success', false,
            'error', 'To leave a review, you need to have completed a mentoring session first. Ask your mentor to log your session in their dashboard, then you can review them!'
        );
    END IF;
    
    -- Insert or update review
    INSERT INTO mentor_reviews (
        mentor_id, reviewer_id, rating, review_text, session_topic, session_date
    ) VALUES (
        p_mentor_id, auth.uid(), p_rating, p_review_text, p_session_topic, p_session_date
    )
    ON CONFLICT (mentor_id, reviewer_id) 
    DO UPDATE SET 
        rating = EXCLUDED.rating,
        review_text = EXCLUDED.review_text,
        session_topic = EXCLUDED.session_topic,
        session_date = EXCLUDED.session_date,
        updated_at = NOW()
    RETURNING id INTO review_id;
    
    -- Update mentor rating in user_profiles
    UPDATE user_profiles 
    SET mentor_rating = calculate_mentor_rating(p_mentor_id)
    WHERE user_id = p_mentor_id;
    
    RETURN json_build_object(
        'success', true,
        'review_id', review_id,
        'message', 'Review submitted successfully'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to give thumbs up to a review (simple and fast with spam protection)
CREATE OR REPLACE FUNCTION give_review_thumbs_up(p_review_id UUID)
RETURNS JSON AS $$
DECLARE
    already_thumbed_up BOOLEAN;
    new_count INTEGER;
    recent_activity_count INTEGER;
BEGIN
    -- Balanced rate limiting: prevent more than 1 thumbs up per 5 minutes per user
    SELECT COUNT(*) INTO recent_activity_count
    FROM mentor_review_thumbs 
    WHERE user_id = auth.uid() 
    AND created_at > NOW() - INTERVAL '5 minutes';
    
    IF recent_activity_count >= 1 THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Please wait 5 minutes before giving another thumbs up'
        );
    END IF;
    
    -- Check if user already gave thumbs up
    SELECT EXISTS (
        SELECT 1 FROM mentor_review_thumbs 
        WHERE review_id = p_review_id AND user_id = auth.uid()
    ) INTO already_thumbed_up;
    
    IF already_thumbed_up THEN
        -- Remove thumbs up
        DELETE FROM mentor_review_thumbs 
        WHERE review_id = p_review_id AND user_id = auth.uid();
        
        -- Update count
        UPDATE mentor_reviews 
        SET thumbs_up_count = thumbs_up_count - 1
        WHERE id = p_review_id
        RETURNING thumbs_up_count INTO new_count;
        
        RETURN json_build_object(
            'success', true,
            'action', 'removed',
            'new_count', new_count
        );
    ELSE
        -- Add thumbs up
        INSERT INTO mentor_review_thumbs (review_id, user_id)
        VALUES (p_review_id, auth.uid());
        
        -- Update count
        UPDATE mentor_reviews 
        SET thumbs_up_count = thumbs_up_count + 1
        WHERE id = p_review_id
        RETURNING thumbs_up_count INTO new_count;
        
        RETURN json_build_object(
            'success', true,
            'action', 'added',
            'new_count', new_count
        );
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log mentor session (for mentors to record sessions)
CREATE OR REPLACE FUNCTION log_mentor_session(
    p_student_email TEXT,
    p_session_topic TEXT,
    p_session_date DATE,
    p_duration_minutes INTEGER,
    p_session_notes TEXT DEFAULT NULL
)
RETURNS JSON AS $$
DECLARE
    student_user_id UUID;
    session_id UUID;
BEGIN
    -- Find student by email
    SELECT au.id INTO student_user_id
    FROM auth.users au
    WHERE au.email = p_student_email;
    
    IF student_user_id IS NULL THEN
        RETURN json_build_object(
            'success', false,
            'error', 'Student not found with that email address'
        );
    END IF;
    
    -- Insert session
    INSERT INTO mentor_sessions (
        mentor_id, student_id, session_topic, session_date, 
        duration_minutes, session_notes
    ) VALUES (
        auth.uid(), student_user_id, p_session_topic, p_session_date,
        p_duration_minutes, p_session_notes
    ) RETURNING id INTO session_id;
    
    RETURN json_build_object(
        'success', true,
        'session_id', session_id,
        'message', 'Session logged successfully. Student can now review this session.'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create indexes for performance (minimal and focused)
CREATE INDEX IF NOT EXISTS idx_mentor_reviews_mentor_id ON mentor_reviews(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_reviews_created_at ON mentor_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_mentor_review_thumbs_review_id ON mentor_review_thumbs(review_id);
CREATE INDEX IF NOT EXISTS idx_mentor_review_thumbs_user_time ON mentor_review_thumbs(user_id, created_at); -- For rate limiting
CREATE INDEX IF NOT EXISTS idx_mentor_sessions_mentor_id ON mentor_sessions(mentor_id);
CREATE INDEX IF NOT EXISTS idx_mentor_sessions_student_id ON mentor_sessions(student_id);
CREATE INDEX IF NOT EXISTS idx_mentor_sessions_status ON mentor_sessions(session_status);

-- Drop and recreate the mentor leaderboard function to use new rating calculation
DROP FUNCTION IF EXISTS get_mentor_leaderboard(TEXT);

CREATE OR REPLACE FUNCTION get_mentor_leaderboard(
    period_type TEXT DEFAULT 'weekly' -- 'weekly', 'monthly', 'all_time'
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
        WHEN 'weekly' THEN
            date_filter := NOW() - INTERVAL '7 days';
        WHEN 'monthly' THEN
            date_filter := NOW() - INTERVAL '30 days';
        ELSE
            date_filter := '1900-01-01'::TIMESTAMP WITH TIME ZONE; -- All time
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
        COALESCE(up.mentor_rating, 0.0) as mentor_rating,
        COALESCE(review_stats.review_count, 0)::INTEGER as review_count,
        up.mentor_active_status,
        ROW_NUMBER() OVER (
            ORDER BY 
                COALESCE(up.mentor_rating, 0.0) DESC,
                COALESCE(review_stats.review_count, 0) DESC,
                COALESCE(up.total_students_helped, 0) DESC
        )::INTEGER as rank_position
    FROM user_profiles up
    LEFT JOIN (
        SELECT 
            mentor_id,
            COUNT(*) as review_count
        FROM mentor_reviews 
        WHERE created_at >= date_filter
        GROUP BY mentor_id
    ) review_stats ON review_stats.mentor_id = up.user_id
    WHERE up.is_mentor = true 
    AND up.mentor_status = 'approved'
    AND up.mentor_active_status = 'active'
    ORDER BY rank_position;
END;
$$ LANGUAGE plpgsql;
