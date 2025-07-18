-- Just show the diagnostic results to see what we found
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
    'handle_new_user_safe function' as component,
    CASE WHEN EXISTS(SELECT 1 FROM information_schema.routines WHERE routine_name = 'handle_new_user_safe') 
         THEN 'EXISTS ✓' ELSE 'MISSING ✗' END as status;

SELECT 
    'on_auth_user_created trigger' as component,
    CASE WHEN EXISTS(SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'on_auth_user_created') 
         THEN 'EXISTS ✓' ELSE 'MISSING ✗' END as status;
