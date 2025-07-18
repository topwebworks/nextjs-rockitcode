-- Safe migration: Only create missing objects for user_profiles table
-- This script checks for existence before creating to avoid conflicts

-- Enable UUID extension (safe to run multiple times)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create user_profiles table only if it doesn't exist
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

-- Create user_preferences table only if it doesn't exist
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

-- Enable RLS only if not already enabled
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE tablename = 'user_profiles' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE tablename = 'user_preferences' 
        AND rowsecurity = true
    ) THEN
        ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create policies only if they don't exist
DO $$
BEGIN
    -- user_profiles policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_profiles' 
        AND policyname = 'Users can view own profile'
    ) THEN
        CREATE POLICY "Users can view own profile" ON user_profiles
            FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_profiles' 
        AND policyname = 'Users can insert own profile'
    ) THEN
        CREATE POLICY "Users can insert own profile" ON user_profiles
            FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_profiles' 
        AND policyname = 'Users can update own profile'
    ) THEN
        CREATE POLICY "Users can update own profile" ON user_profiles
            FOR UPDATE USING (auth.uid() = user_id);
    END IF;

    -- user_preferences policies
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_preferences' 
        AND policyname = 'Users can view own preferences'
    ) THEN
        CREATE POLICY "Users can view own preferences" ON user_preferences
            FOR SELECT USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_preferences' 
        AND policyname = 'Users can insert own preferences'
    ) THEN
        CREATE POLICY "Users can insert own preferences" ON user_preferences
            FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_preferences' 
        AND policyname = 'Users can update own preferences'
    ) THEN
        CREATE POLICY "Users can update own preferences" ON user_preferences
            FOR UPDATE USING (auth.uid() = user_id);
    END IF;
END $$;

-- Create function to update updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers only if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_user_profiles_updated_at'
    ) THEN
        CREATE TRIGGER update_user_profiles_updated_at 
            BEFORE UPDATE ON user_profiles
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_user_preferences_updated_at'
    ) THEN
        CREATE TRIGGER update_user_preferences_updated_at 
            BEFORE UPDATE ON user_preferences
            FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    END IF;
END $$;

-- Create the critical function for new user handling
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (user_id, full_name, avatar_url)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'avatar_url')
    ON CONFLICT (user_id) DO NOTHING;
    
    INSERT INTO user_preferences (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the critical trigger for new user signup
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'on_auth_user_created'
    ) THEN
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION handle_new_user();
    END IF;
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);

-- Grant permissions (safe to run multiple times)
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON user_preferences TO authenticated;

-- Verify the setup
DO $$
BEGIN
    RAISE NOTICE 'Migration completed successfully!';
    RAISE NOTICE 'user_profiles table: %', CASE WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN 'EXISTS' ELSE 'MISSING' END;
    RAISE NOTICE 'user_preferences table: %', CASE WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'user_preferences') THEN 'EXISTS' ELSE 'MISSING' END;
    RAISE NOTICE 'handle_new_user function: %', CASE WHEN EXISTS(SELECT 1 FROM pg_proc WHERE proname = 'handle_new_user') THEN 'EXISTS' ELSE 'MISSING' END;
    RAISE NOTICE 'on_auth_user_created trigger: %', CASE WHEN EXISTS(SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created') THEN 'EXISTS' ELSE 'MISSING' END;
END $$;
