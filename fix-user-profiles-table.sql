-- Fix for missing user_profiles table causing new user signup failures
-- This script creates the user_profiles table and related infrastructure

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enhanced user profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    username TEXT UNIQUE,
    avatar_url TEXT,
    github_username TEXT,
    github_id INTEGER,
    learning_streak INTEGER DEFAULT 0,
    total_lessons_completed INTEGER DEFAULT 0,
    current_level TEXT DEFAULT 'beginner',
    preferred_language TEXT DEFAULT 'javascript',
    timezone TEXT DEFAULT 'UTC',
    daily_goal_minutes INTEGER DEFAULT 30,
    join_date DATE DEFAULT CURRENT_DATE,
    last_active TIMESTAMPTZ DEFAULT NOW(),
    is_premium BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create course progress tracking table
CREATE TABLE IF NOT EXISTS course_progress (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL,
    lesson_id TEXT,
    chapter_id TEXT,
    status TEXT DEFAULT 'not_started' CHECK (status IN ('not_started', 'in_progress', 'completed')),
    completion_percentage INTEGER DEFAULT 0 CHECK (completion_percentage >= 0 AND completion_percentage <= 100),
    time_spent_minutes INTEGER DEFAULT 0,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    notes TEXT,
    quiz_scores JSONB DEFAULT '{}',
    exercise_data JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, course_id, lesson_id)
);

-- Create user achievements and badges table
CREATE TABLE IF NOT EXISTS user_achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_type TEXT NOT NULL,
    achievement_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    icon TEXT,
    rarity TEXT DEFAULT 'common' CHECK (rarity IN ('common', 'rare', 'epic', 'legendary')),
    points INTEGER DEFAULT 0,
    metadata JSONB DEFAULT '{}',
    earned_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, achievement_id)
);

-- Create user preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    theme TEXT DEFAULT 'system' CHECK (theme IN ('light', 'dark', 'system')),
    language TEXT DEFAULT 'en',
    notifications_enabled BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT TRUE,
    browser_notifications BOOLEAN DEFAULT FALSE,
    daily_reminder_time TIME DEFAULT '09:00:00',
    weekend_reminders BOOLEAN DEFAULT FALSE,
    difficulty_preference TEXT DEFAULT 'adaptive' CHECK (difficulty_preference IN ('beginner', 'intermediate', 'advanced', 'adaptive')),
    code_editor_theme TEXT DEFAULT 'vs-dark',
    font_size INTEGER DEFAULT 14,
    auto_save BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id)
);

-- Create learning sessions table for analytics
CREATE TABLE IF NOT EXISTS learning_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    session_start TIMESTAMPTZ DEFAULT NOW(),
    session_end TIMESTAMPTZ,
    duration_minutes INTEGER,
    courses_accessed TEXT[] DEFAULT '{}',
    lessons_completed INTEGER DEFAULT 0,
    exercises_completed INTEGER DEFAULT 0,
    device_info JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_sessions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_profiles
CREATE POLICY "Users can view own profile" ON user_profiles
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON user_profiles
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON user_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for course_progress
CREATE POLICY "Users can view own progress" ON course_progress
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own progress" ON course_progress
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own progress" ON course_progress
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_achievements
CREATE POLICY "Users can view own achievements" ON user_achievements
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements" ON user_achievements
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for user_preferences
CREATE POLICY "Users can view own preferences" ON user_preferences
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON user_preferences
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON user_preferences
    FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for learning_sessions
CREATE POLICY "Users can view own sessions" ON learning_sessions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sessions" ON learning_sessions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at columns
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_progress_updated_at BEFORE UPDATE ON course_progress
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at BEFORE UPDATE ON user_preferences
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update user stats when lessons are completed
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        UPDATE user_profiles 
        SET 
            total_lessons_completed = total_lessons_completed + 1,
            last_active = NOW()
        WHERE user_id = NEW.user_id;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update stats on lesson completion
CREATE TRIGGER update_user_stats_on_progress AFTER UPDATE ON course_progress
    FOR EACH ROW EXECUTE FUNCTION update_user_stats();

-- Function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (user_id, full_name, avatar_url)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url');
    
    INSERT INTO user_preferences (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for new user setup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_course_progress_user_id ON course_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_course_progress_course_lesson ON course_progress(course_id, lesson_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_learning_sessions_user_id ON learning_sessions(user_id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON course_progress TO authenticated;
GRANT ALL ON user_achievements TO authenticated;
GRANT ALL ON user_preferences TO authenticated;
GRANT ALL ON learning_sessions TO authenticated;
