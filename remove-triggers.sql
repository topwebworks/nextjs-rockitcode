-- Alternative approach: Remove the trigger completely and handle user creation in app code
-- This prevents OAuth from failing due to database trigger issues

-- Remove all existing triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_created_safe ON auth.users;

-- Keep the functions for manual use but don't auto-trigger them
-- The application will handle user profile creation after successful OAuth

-- Verify no triggers exist
SELECT 
    trigger_name,
    event_manipulation,
    action_timing
FROM information_schema.triggers 
WHERE event_object_table = 'users'
AND event_object_schema = 'auth';

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'All auth.users triggers removed!';
    RAISE NOTICE 'OAuth should now work without database trigger interference.';
    RAISE NOTICE 'User profiles will need to be created manually in application code.';
END $$;
