# GitHub OAuth Testing Guide

## Now that your callback URL is correct, let's test step by step:

### Test 1: Direct GitHub OAuth URL

Copy and paste this URL in your browser:
```
https://github.com/login/oauth/authorize?client_id=Ov23li4nuXpq2JjkREnk&redirect_uri=https://lkntrrjnwbbuueqluqou.supabase.co/auth/v1/callback&scope=user:email&state=direct-test
```

**Expected flow:**
1. GitHub asks for authorization
2. Redirects to Supabase briefly
3. Supabase should redirect to your app
4. You should see debug info in the callback page

### Test 2: Check Your App

1. Go to http://localhost:3000
2. Click "Login with GitHub"
3. Check browser console for any errors
4. Look at the debug info in the callback page

### Test 3: Check Supabase Settings

Go to: https://supabase.com/dashboard/project/lkntrrjnwbbuueqluqou/auth/url-configuration

**Verify:**
- Site URL: `http://localhost:3000`
- Redirect URLs: `http://localhost:3000/**`

### Test 4: Check GitHub App Authorization

1. Go to: https://github.com/settings/applications
2. Find "Rockitcode" app
3. Make sure it's authorized for your account
4. If not, click "Grant" or "Authorize"

## Common Issues & Solutions

### Issue 1: "AuthSessionMissingError"
**Cause:** Supabase can't create session from GitHub callback
**Fix:** Check Supabase GitHub provider settings

### Issue 2: Infinite redirect loop
**Cause:** Callback URL mismatch
**Fix:** Verify all URLs match exactly

### Issue 3: GitHub authorization fails
**Cause:** App not authorized for your account
**Fix:** Manually authorize the app in GitHub settings

## Debug Information

The enhanced callback page now shows:
- Whether user context has data
- Whether Supabase session exists
- Any session errors
- User email if session exists
- Current URL
- Timestamp

This will help identify exactly where the authentication is failing.

## Next Steps

1. Try the direct OAuth URL above
2. Check the debug info in the callback page
3. Look at browser console for errors
4. Report what you see!
