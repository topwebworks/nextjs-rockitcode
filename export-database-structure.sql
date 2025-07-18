-- Complete database structure export for analysis
-- This script will show us exactly what exists in your database

-- 1. List all tables in the public schema
SELECT 
    schemaname,
    tablename,
    tableowner,
    hasindexes,
    hasrules,
    hastriggers
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 2. Show structure of user_profiles table (if it exists)
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default,
    ordinal_position
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_profiles'
ORDER BY ordinal_position;

-- 3. Show structure of user_preferences table (if it exists)
SELECT 
    column_name,
    data_type,
    character_maximum_length,
    is_nullable,
    column_default,
    ordinal_position
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_preferences'
ORDER BY ordinal_position;

-- 4. List all triggers on auth.users table
SELECT 
    trigger_name,
    event_manipulation,
    action_timing,
    action_statement,
    action_condition
FROM information_schema.triggers 
WHERE event_object_schema = 'auth'
AND event_object_table = 'users'
ORDER BY trigger_name;

-- 5. List all functions that might be related to user handling
SELECT 
    routine_name,
    routine_type,
    data_type as return_type,
    routine_definition
FROM information_schema.routines 
WHERE routine_schema = 'public'
AND (routine_name LIKE '%user%' OR routine_name LIKE '%handle%')
ORDER BY routine_name;

-- 6. Show all RLS policies on user-related tables
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename IN ('user_profiles', 'user_preferences', 'course_progress', 'user_achievements', 'learning_sessions')
ORDER BY tablename, policyname;

-- 7. Check constraints on user_profiles table
SELECT 
    tc.constraint_name,
    tc.constraint_type,
    tc.table_name,
    ccu.column_name
FROM information_schema.table_constraints tc
JOIN information_schema.constraint_column_usage ccu 
    ON tc.constraint_name = ccu.constraint_name
WHERE tc.table_name = 'user_profiles'
ORDER BY tc.constraint_type, tc.constraint_name;

-- 8. Check foreign key relationships
SELECT 
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name,
    tc.constraint_name
FROM information_schema.table_constraints tc
JOIN information_schema.key_column_usage kcu 
    ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage ccu 
    ON ccu.constraint_name = tc.constraint_name
WHERE tc.constraint_type = 'FOREIGN KEY'
AND tc.table_name IN ('user_profiles', 'user_preferences')
ORDER BY tc.table_name;

-- 9. Check if UUID extension is enabled
SELECT 
    extname,
    extversion
FROM pg_extension 
WHERE extname = 'uuid-ossp';

-- 10. Sample data check (if any exists)
DO $$
DECLARE
    profile_count INTEGER;
    auth_count INTEGER;
BEGIN
    -- Count records in auth.users
    SELECT COUNT(*) INTO auth_count FROM auth.users;
    
    -- Count records in user_profiles (if table exists)
    BEGIN
        SELECT COUNT(*) INTO profile_count FROM user_profiles;
    EXCEPTION WHEN undefined_table THEN
        profile_count := -1;
    END;
    
    RAISE NOTICE 'Database Summary:';
    RAISE NOTICE 'auth.users records: %', auth_count;
    RAISE NOTICE 'user_profiles records: %', CASE WHEN profile_count = -1 THEN 'TABLE DOES NOT EXIST' ELSE profile_count::TEXT END;
END $$;
