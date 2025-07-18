-- Emergency fix: Create a simpler user profile trigger that handles errors gracefully
-- This script creates a more robust version that won't fail the OAuth process

-- First, let's disable the existing trigger temporarily
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create a more robust function that handles all potential errors
CREATE OR REPLACE FUNCTION handle_new_user_safe()
RETURNS TRIGGER AS $$
BEGIN
    -- Insert into user_profiles with error handling
    BEGIN
        INSERT INTO user_profiles (user_id, full_name, avatar_url)
        VALUES (
            NEW.id, 
            COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'User'),
            COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
        )
        ON CONFLICT (user_id) DO UPDATE SET
            full_name = COALESCE(EXCLUDED.full_name, user_profiles.full_name),
            avatar_url = COALESCE(EXCLUDED.avatar_url, user_profiles.avatar_url),
            updated_at = NOW();
    EXCEPTION WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE WARNING 'Failed to create user profile for user %: %', NEW.id, SQLERRM;
    END;

    -- Insert into user_preferences with error handling
    BEGIN
        INSERT INTO user_preferences (user_id)
        VALUES (NEW.id)
        ON CONFLICT (user_id) DO NOTHING;
    EXCEPTION WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE WARNING 'Failed to create user preferences for user %: %', NEW.id, SQLERRM;
    END;
    
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create the trigger with the safe function
CREATE TRIGGER on_auth_user_created_safe
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user_safe();

-- Verify the trigger was created
SELECT 
    trigger_name,
    event_manipulation,
    action_timing
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created_safe';

-- Test message
DO $$
BEGIN
    RAISE NOTICE 'Safe user creation trigger installed successfully!';
    RAISE NOTICE 'This version will not fail OAuth even if profile creation has issues.';
END $$;
