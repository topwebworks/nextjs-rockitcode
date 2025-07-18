# Database Error Fix - User Creation Failure

## Error Analysis
```
error=server_error&error_code=unexpected_failure&error_description=Database+error+saving+new+user
```

**Root Cause:** GitHub OAuth is working, but Supabase can't create the user record in the database.

## Immediate Fix: Check Supabase Auth Settings

### Step 1: Enable Auto-Confirm Users
Go to: https://supabase.com/dashboard/project/lkntrrjnwbbuueqluqou/auth/settings

**Check these settings:**
- ✅ **Enable email confirmations:** Should be DISABLED for OAuth
- ✅ **Enable phone confirmations:** Should be DISABLED  
- ✅ **Auto-confirm users:** Should be ENABLED

### Step 2: Verify User Table Permissions
Go to: https://supabase.com/dashboard/project/lkntrrjnwbbuueqluqou/editor

**Check auth.users table:**
- Should exist and be accessible
- RLS (Row Level Security) should allow inserts from auth

### Step 3: Create Missing Profiles Table (If Needed)

If you have a custom profiles table, it might be causing the issue. Run this SQL:

```sql
-- Check if profiles table exists and has proper triggers
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name = 'profiles';

-- If profiles table exists, check for user creation trigger
SELECT trigger_name FROM information_schema.triggers 
WHERE event_object_table = 'users' AND event_object_schema = 'auth';
```

### Step 4: Disable Custom User Triggers (Temporary Fix)

If you have any custom triggers on user creation, temporarily disable them:

```sql
-- List all functions that might be triggered on user creation
SELECT proname FROM pg_proc WHERE proname LIKE '%user%' OR proname LIKE '%profile%';

-- Temporarily disable any problematic triggers
-- (We'll identify the specific ones causing issues)
```

## Quick Test Fixes

### Fix 1: Simplify Auth Settings
1. **Go to Auth Settings**
2. **Disable email confirmation**
3. **Enable auto-confirm users**
4. **Save changes**

### Fix 2: Check Database Logs
Go to: https://supabase.com/dashboard/project/lkntrrjnwbbuueqluqou/logs/database

Look for error messages during user creation attempts.

### Fix 3: Test with Minimal User Data

Try creating a simple test user to see if the database is accessible:

```sql
-- Test if we can insert into auth.users (run in SQL editor)
SELECT auth.uid() as current_user_id;

-- Check if there are any restrictive RLS policies
SELECT * FROM pg_policies WHERE tablename = 'users';
```

## Most Likely Causes

1. **Email confirmation enabled** (blocks OAuth users)
2. **Custom profile creation trigger failing**
3. **RLS policy blocking user creation**
4. **Missing required database permissions**

## Expected Behavior After Fix

✅ **GitHub OAuth completes**
✅ **User record created in Supabase**  
✅ **Redirect to /auth/callback with session**
✅ **User can access dashboard**

## Test Command

After making changes, test with this direct URL:
```
https://github.com/login/oauth/authorize?client_id=Ov23li4nuXpq2JjkREnk&redirect_uri=https://lkntrrjnwbbuueqluqou.supabase.co/auth/v1/callback&scope=user:email&state=test
```

The most common fix is **disabling email confirmation** in Auth settings since OAuth users don't need email verification.
