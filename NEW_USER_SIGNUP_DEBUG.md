# New User Signup Debug

## Issue: Existing users work, new users fail

This indicates that:
✅ OAuth flow is working
✅ GitHub authorization is working  
❌ New user creation is failing in Supabase

## Check These Supabase Settings:

### 1. Auth Settings
**URL:** https://supabase.com/dashboard/project/lkntrrjnwbbuueqluqou/auth/settings

**Look for:**
- ✅ **Enable signup:** Should be ON (green)
- ✅ **Auto-confirm users:** Should be ON (green)
- ❌ **Confirm email:** Should be OFF (gray)

### 2. URL Configuration
**URL:** https://supabase.com/dashboard/project/lkntrrjnwbbuueqluqou/auth/url-configuration

**Should be:**
- **Site URL:** `http://localhost:3000`
- **Redirect URLs:** `http://localhost:3000/**`

### 3. Database Issues
Possible database problems:
- User table constraints
- Row Level Security (RLS) policies
- Triggers failing on user creation
- Storage quota exceeded

## Test: Manual User Creation

Try this SQL in Supabase SQL Editor:

```sql
-- Check if we can insert into auth.users
SELECT count(*) FROM auth.users;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'users' AND schemaname = 'auth';

-- Check if there are any triggers on auth.users
SELECT trigger_name, event_manipulation, event_object_table 
FROM information_schema.triggers 
WHERE event_object_table = 'users' AND event_object_schema = 'auth';
```

## Common Causes:

1. **"Enable signup" is disabled**
2. **RLS policy blocking new users**
3. **Custom trigger/function failing**
4. **Database storage limit reached**
5. **Email domain restrictions**

## Quick Test:

Try creating a test user with a completely different email domain to see if it's email-specific:

```javascript
// Test with different email domain
const testEmail = 'test@gmail.com';
// vs your other account email domain
```

Most likely cause: **"Enable signup" is disabled** in Auth Settings.
