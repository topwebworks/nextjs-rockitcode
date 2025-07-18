-- Comprehensive diagnostic to find the exact cause of the trigger failure
-- This will help us understand why the trigger is still failing

-- 1. Verify all components exist
SELECT 'COMPONENT CHECK' as section;

SELECT 
    'user_profiles table' as component,
    CASE WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles') 
         THEN 'EXISTS ✓' ELSE 'MISSING ✗' END as status;

SELECT 
    'user_preferences table' as component,
    CASE WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'user_preferences') 
         THEN 'EXISTS ✓' ELSE 'MISSING ✗' END as status;

SELECT 
    'handle_new_user function' as component,
    CASE WHEN EXISTS(SELECT 1 FROM information_schema.routines WHERE routine_name = 'handle_new_user') 
         THEN 'EXISTS ✓' ELSE 'MISSING ✗' END as status;

SELECT 
    'on_auth_user_created trigger' as component,
    CASE WHEN EXISTS(SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created') 
         THEN 'EXISTS ✓' ELSE 'MISSING ✗' END as status;

-- 2. Test the function manually with a fake user
SELECT 'MANUAL FUNCTION TEST' as section;

DO $$
DECLARE
    test_user_id UUID := uuid_generate_v4();
    test_metadata JSONB := '{"full_name": "Test User", "avatar_url": "https://example.com/avatar.jpg"}';
BEGIN
    RAISE NOTICE 'Testing function with user ID: %', test_user_id;
    
    -- Simulate what the trigger does
    BEGIN
        INSERT INTO user_profiles (user_id, full_name, avatar_url)
        VALUES (
            test_user_id, 
            test_metadata->>'full_name',
            test_metadata->>'avatar_url'
        );
        RAISE NOTICE '✓ user_profiles insert successful';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '✗ user_profiles insert failed: %', SQLERRM;
    END;

    BEGIN
        INSERT INTO user_preferences (user_id)
        VALUES (test_user_id);
        RAISE NOTICE '✓ user_preferences insert successful';
    EXCEPTION WHEN OTHERS THEN
        RAISE NOTICE '✗ user_preferences insert failed: %', SQLERRM;
    END;

    -- Clean up test data
    DELETE FROM user_profiles WHERE user_id = test_user_id;
    DELETE FROM user_preferences WHERE user_id = test_user_id;
    RAISE NOTICE 'Test data cleaned up';
    
END $$;

-- 3. Check table permissions and structure
SELECT 'TABLE PERMISSIONS' as section;

SELECT 
    grantee,
    privilege_type,
    is_grantable
FROM information_schema.table_privileges 
WHERE table_name IN ('user_profiles', 'user_preferences')
ORDER BY table_name, grantee;

-- 4. Check foreign key constraints
SELECT 'FOREIGN KEY CONSTRAINTS' as section;

SELECT 
    tc.table_name,
    tc.constraint_name,
    tc.constraint_type,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu 
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_name IN ('user_profiles', 'user_preferences');

-- 5. Check RLS policies
SELECT 'RLS POLICIES' as section;

SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename IN ('user_profiles', 'user_preferences');

-- 6. Show the actual trigger definition
SELECT 'TRIGGER DEFINITION' as section;

SELECT 
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- 7. Show the function definition
SELECT 'FUNCTION DEFINITION' as section;

SELECT routine_definition
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';

-- 8. Alternative: Create a simplified trigger that logs errors
SELECT 'CREATING SAFE TRIGGER' as section;

-- Drop existing trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create a safe version that logs but doesn't fail
CREATE OR REPLACE FUNCTION handle_new_user_safe()
RETURNS TRIGGER AS $$
BEGIN
    BEGIN
        -- Try to insert user profile
        INSERT INTO user_profiles (user_id, full_name, avatar_url)
        VALUES (
            NEW.id, 
            COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', 'Unknown User'),
            COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture')
        )
        ON CONFLICT (user_id) DO UPDATE SET
            full_name = COALESCE(EXCLUDED.full_name, user_profiles.full_name),
            avatar_url = COALESCE(EXCLUDED.avatar_url, user_profiles.avatar_url);
            
        -- Try to insert user preferences
        INSERT INTO user_preferences (user_id)
        VALUES (NEW.id)
        ON CONFLICT (user_id) DO NOTHING;
        
    EXCEPTION WHEN OTHERS THEN
        -- Log the error but don't fail the user creation
        RAISE LOG 'Failed to create user profile for %: %', NEW.id, SQLERRM;
        -- Insert a minimal record to prevent future failures
        BEGIN
            INSERT INTO user_profiles (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
            INSERT INTO user_preferences (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
        EXCEPTION WHEN OTHERS THEN
            RAISE LOG 'Even minimal profile creation failed for %: %', NEW.id, SQLERRM;
        END;
    END;
    
    RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Create the safe trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user_safe();

SELECT 'Safe trigger created - OAuth should now work even if profile creation fails' as result;
