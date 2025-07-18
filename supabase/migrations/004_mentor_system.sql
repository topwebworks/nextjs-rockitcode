-- Week 7: Mentor System Enhancement Migration
-- Adds mentor status field and admin role functionality

-- Add mentor_status field if it doesn't exist (for mentor retirement feature)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'mentor_active_status'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN mentor_active_status TEXT DEFAULT 'active' 
        CHECK (mentor_active_status IN ('active', 'away', 'retired'));
    END IF;
END $$;

-- Add admin role field if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'user_role'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN user_role TEXT DEFAULT 'student' 
        CHECK (user_role IN ('student', 'mentor', 'admin', 'super_admin'));
    END IF;
END $$;

-- Create mentor statistics tracking function
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
    mentor_active_status TEXT,
    rank_position INTEGER
) AS $$
DECLARE
    date_filter TIMESTAMPTZ;
BEGIN
    -- Set date filter based on period
    CASE period_type
        WHEN 'weekly' THEN
            date_filter := NOW() - INTERVAL '7 days';
        WHEN 'monthly' THEN
            date_filter := NOW() - INTERVAL '30 days';
        ELSE
            date_filter := '1970-01-01'::TIMESTAMPTZ; -- All time
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
        CASE 
            WHEN period_type = 'weekly' THEN up.students_helped_this_week
            WHEN period_type = 'monthly' THEN COALESCE(up.total_students_helped, 0) -- Placeholder for monthly stats
            ELSE up.total_students_helped
        END as students_helped,
        CASE 
            WHEN period_type = 'weekly' THEN up.hours_mentored_this_week
            WHEN period_type = 'monthly' THEN COALESCE(up.total_hours_mentored, 0) -- Placeholder for monthly stats
            ELSE up.total_hours_mentored
        END as hours_mentored,
        up.mentor_rating,
        COALESCE(up.mentor_active_status, 'active'),
        ROW_NUMBER() OVER (
            ORDER BY 
                CASE 
                    WHEN period_type = 'weekly' THEN up.students_helped_this_week
                    WHEN period_type = 'monthly' THEN COALESCE(up.total_students_helped, 0)
                    ELSE up.total_students_helped
                END DESC,
                up.mentor_rating DESC
        )::INTEGER as rank_position
    FROM user_profiles up
    WHERE up.is_mentor = true 
    AND up.mentor_status = 'approved'
    AND COALESCE(up.mentor_active_status, 'active') != 'retired'
    AND up.updated_at >= date_filter
    ORDER BY rank_position;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update mentor stats (honor-based system)
CREATE OR REPLACE FUNCTION update_mentor_stats(
    p_user_id UUID,
    p_students_helped_week INTEGER DEFAULT NULL,
    p_hours_mentored_week INTEGER DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Only allow mentors to update their own stats
    IF NOT EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_id = p_user_id 
        AND is_mentor = true 
        AND mentor_status = 'approved'
    ) THEN
        RETURN FALSE;
    END IF;

    UPDATE user_profiles 
    SET 
        students_helped_this_week = COALESCE(p_students_helped_week, students_helped_this_week),
        hours_mentored_this_week = COALESCE(p_hours_mentored_week, hours_mentored_this_week),
        total_students_helped = total_students_helped + COALESCE(p_students_helped_week, 0) - COALESCE(students_helped_this_week, 0),
        total_hours_mentored = total_hours_mentored + COALESCE(p_hours_mentored_week, 0) - COALESCE(hours_mentored_this_week, 0),
        updated_at = NOW()
    WHERE user_id = p_user_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to retire mentor (preserves all data)
CREATE OR REPLACE FUNCTION retire_mentor(p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    UPDATE user_profiles 
    SET 
        mentor_active_status = 'retired',
        updated_at = NOW()
    WHERE user_id = p_user_id 
    AND is_mentor = true;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get pending mentor applications (admin only)
CREATE OR REPLACE FUNCTION get_pending_mentor_applications()
RETURNS TABLE(
    user_id UUID,
    full_name TEXT,
    username TEXT,
    avatar_url TEXT,
    discord_username TEXT,
    mentor_application_reason TEXT,
    mentor_specialties TEXT[],
    created_at TIMESTAMPTZ
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        up.user_id,
        up.full_name,
        up.username,
        up.avatar_url,
        up.discord_username,
        up.mentor_application_reason,
        up.mentor_specialties,
        up.created_at
    FROM user_profiles up
    WHERE up.mentor_status = 'pending'
    ORDER BY up.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to approve/reject mentor application (admin only)
CREATE OR REPLACE FUNCTION process_mentor_application(
    p_user_id UUID,
    p_action TEXT, -- 'approve' or 'reject'
    p_admin_id UUID
)
RETURNS BOOLEAN AS $$
BEGIN
    -- Verify admin permissions
    IF NOT EXISTS (
        SELECT 1 FROM user_profiles 
        WHERE user_id = p_admin_id 
        AND user_role IN ('admin', 'super_admin')
    ) THEN
        RETURN FALSE;
    END IF;

    -- Process the application
    UPDATE user_profiles 
    SET 
        mentor_status = CASE 
            WHEN p_action = 'approve' THEN 'approved'::TEXT
            WHEN p_action = 'reject' THEN 'declined'::TEXT
            ELSE mentor_status
        END,
        is_mentor = CASE 
            WHEN p_action = 'approve' THEN true
            ELSE is_mentor
        END,
        mentor_approved_at = CASE 
            WHEN p_action = 'approve' THEN NOW()
            ELSE mentor_approved_at
        END,
        mentor_approved_by = CASE 
            WHEN p_action = 'approve' THEN p_admin_id::TEXT
            ELSE mentor_approved_by
        END,
        mentor_active_status = CASE 
            WHEN p_action = 'approve' THEN 'active'
            ELSE mentor_active_status
        END,
        updated_at = NOW()
    WHERE user_id = p_user_id;

    RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Weekly stats reset function (to be called via cron)
CREATE OR REPLACE FUNCTION reset_weekly_mentor_stats()
RETURNS VOID AS $$
BEGIN
    UPDATE user_profiles 
    SET 
        students_helped_this_week = 0,
        hours_mentored_this_week = 0,
        updated_at = NOW()
    WHERE is_mentor = true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add mentor-related columns if they don't exist
DO $$
BEGIN
    -- Add basic mentor fields
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'is_mentor'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN is_mentor BOOLEAN DEFAULT FALSE;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'mentor_status'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN mentor_status TEXT DEFAULT NULL 
        CHECK (mentor_status IN ('pending', 'approved', 'declined'));
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'mentor_bio'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN mentor_bio TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'mentor_specialties'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN mentor_specialties TEXT[];
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'mentor_application_reason'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN mentor_application_reason TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'mentor_approved_at'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN mentor_approved_at TIMESTAMPTZ;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'mentor_approved_by'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN mentor_approved_by TEXT;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'mentor_rating'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN mentor_rating DECIMAL DEFAULT 0.0;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'students_helped_this_week'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN students_helped_this_week INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'hours_mentored_this_week'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN hours_mentored_this_week INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'total_students_helped'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN total_students_helped INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'total_hours_mentored'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN total_hours_mentored INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'user_profiles' 
        AND column_name = 'discord_username'
    ) THEN
        ALTER TABLE user_profiles 
        ADD COLUMN discord_username TEXT;
    END IF;
END $$;

-- Create indexes for mentor queries (now that columns exist)
CREATE INDEX IF NOT EXISTS idx_user_profiles_mentor_status ON user_profiles(mentor_status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_mentor_active_status ON user_profiles(mentor_active_status);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_role ON user_profiles(user_role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_is_mentor ON user_profiles(is_mentor);

-- RLS Policy for mentor leaderboard (public read)
CREATE POLICY "Public can view approved mentors" ON user_profiles
    FOR SELECT USING (
        is_mentor = true 
        AND mentor_status = 'approved'
        AND COALESCE(mentor_active_status, 'active') != 'retired'
    );

-- Grant permissions
GRANT EXECUTE ON FUNCTION get_mentor_leaderboard(TEXT) TO authenticated;
GRANT EXECUTE ON FUNCTION update_mentor_stats(UUID, INTEGER, INTEGER) TO authenticated;
GRANT EXECUTE ON FUNCTION retire_mentor(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION get_pending_mentor_applications() TO authenticated;
GRANT EXECUTE ON FUNCTION process_mentor_application(UUID, TEXT, UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION reset_weekly_mentor_stats() TO authenticated;
