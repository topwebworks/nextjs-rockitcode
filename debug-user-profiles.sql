-- Debug the user_profiles table and trigger issue
-- This script will help us understand what's wrong

-- First, check if the user_profiles table actually exists and has the right structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'user_profiles'
ORDER BY ordinal_position;

-- Check if the trigger exists
SELECT 
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'on_auth_user_created';

-- Check if the function exists
SELECT 
    routine_name,
    routine_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_name = 'handle_new_user';

-- Test the function manually to see what fails
-- First, let's see if we can insert into user_profiles manually
DO $$
DECLARE
    test_uuid UUID := uuid_generate_v4();
BEGIN
    -- Try to insert a test record
    INSERT INTO user_profiles (user_id, full_name, avatar_url)
    VALUES (test_uuid, 'Test User', 'https://example.com/avatar.jpg');
    
    RAISE NOTICE 'Test insert successful with UUID: %', test_uuid;
    
    -- Clean up the test record
    DELETE FROM user_profiles WHERE user_id = test_uuid;
    
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Test insert failed: %', SQLERRM;
END $$;

-- Check table permissions
SELECT 
    grantee,
    privilege_type
FROM information_schema.table_privileges 
WHERE table_name = 'user_profiles';

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'user_profiles';
