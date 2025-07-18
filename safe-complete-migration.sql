-- SAFE MIGRATION - Only creates what doesn't exist
-- This handles the case where tables might already exist

-- Create user_profiles table only if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') THEN
        CREATE TABLE user_profiles (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID UNIQUE NOT NULL,
            full_name TEXT,
            avatar_url TEXT,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        RAISE NOTICE 'Created user_profiles table';
    ELSE
        RAISE NOTICE 'user_profiles table already exists';
    END IF;
END $$;

-- Create user_preferences table only if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'user_preferences') THEN
        CREATE TABLE user_preferences (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            user_id UUID UNIQUE NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        RAISE NOTICE 'Created user_preferences table';
    ELSE
        RAISE NOTICE 'user_preferences table already exists';
    END IF;
END $$;

-- Add foreign key constraints only if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_profiles_user_id_fkey'
    ) THEN
        ALTER TABLE user_profiles 
            ADD CONSTRAINT user_profiles_user_id_fkey 
            FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
        RAISE NOTICE 'Added foreign key constraint to user_profiles';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'user_preferences_user_id_fkey'
    ) THEN
        ALTER TABLE user_preferences 
            ADD CONSTRAINT user_preferences_user_id_fkey 
            FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
        RAISE NOTICE 'Added foreign key constraint to user_preferences';
    END IF;
END $$;

-- Enable RLS if not already enabled
DO $$
BEGIN
    -- Check and enable RLS for user_profiles
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE tablename = 'user_profiles' AND rowsecurity = true
    ) THEN
        ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'Enabled RLS on user_profiles';
    END IF;

    -- Check and enable RLS for user_preferences
    IF NOT EXISTS (
        SELECT 1 FROM pg_tables 
        WHERE tablename = 'user_preferences' AND rowsecurity = true
    ) THEN
        ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;
        RAISE NOTICE 'Enabled RLS on user_preferences';
    END IF;
END $$;

-- Create RLS policies only if they don't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_profiles' AND policyname = 'Users can access own profile'
    ) THEN
        CREATE POLICY "Users can access own profile" ON user_profiles
            FOR ALL USING (auth.uid() = user_id);
        RAISE NOTICE 'Created RLS policy for user_profiles';
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'user_preferences' AND policyname = 'Users can access own preferences'
    ) THEN
        CREATE POLICY "Users can access own preferences" ON user_preferences
            FOR ALL USING (auth.uid() = user_id);
        RAISE NOTICE 'Created RLS policy for user_preferences';
    END IF;
END $$;

-- Create or replace the function (safe to run multiple times)
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert basic profile
    INSERT INTO user_profiles (user_id, full_name, avatar_url)
    VALUES (
        NEW.id, 
        NEW.raw_user_meta_data->>'full_name',
        NEW.raw_user_meta_data->>'avatar_url'
    );
    
    -- Insert basic preferences
    INSERT INTO user_preferences (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create trigger only if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.triggers 
        WHERE trigger_name = 'on_auth_user_created'
    ) THEN
        CREATE TRIGGER on_auth_user_created
            AFTER INSERT ON auth.users
            FOR EACH ROW EXECUTE FUNCTION handle_new_user();
        RAISE NOTICE 'Created trigger on_auth_user_created';
    ELSE
        RAISE NOTICE 'Trigger on_auth_user_created already exists';
    END IF;
END $$;

-- Grant permissions (safe to run multiple times)
GRANT ALL ON user_profiles TO authenticated;
GRANT ALL ON user_preferences TO authenticated;

-- Final verification
DO $$
DECLARE
    profile_exists BOOLEAN;
    preferences_exists BOOLEAN;
    trigger_exists BOOLEAN;
BEGIN
    -- Check tables
    SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') INTO profile_exists;
    SELECT EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'user_preferences') INTO preferences_exists;
    
    -- Check trigger
    SELECT EXISTS(SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created') INTO trigger_exists;
    
    RAISE NOTICE '=== MIGRATION COMPLETE ===';
    RAISE NOTICE 'user_profiles table: %', CASE WHEN profile_exists THEN 'EXISTS ✓' ELSE 'MISSING ✗' END;
    RAISE NOTICE 'user_preferences table: %', CASE WHEN preferences_exists THEN 'EXISTS ✓' ELSE 'MISSING ✗' END;
    RAISE NOTICE 'on_auth_user_created trigger: %', CASE WHEN trigger_exists THEN 'EXISTS ✓' ELSE 'MISSING ✗' END;
    
    IF profile_exists AND preferences_exists AND trigger_exists THEN
        RAISE NOTICE 'GitHub OAuth should now work! 🚀';
    ELSE
        RAISE NOTICE 'Some components are missing - OAuth may still fail';
    END IF;
END $$;
