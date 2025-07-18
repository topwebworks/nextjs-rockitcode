# GitHub OAuth Debug Guide - AuthSessionMissingError Fix

## The Error
```
AuthSessionMissingError: Auth session missing!
URL: http://localhost:3000/?error=auth_failed
```

## Root Cause
The GitHub OAuth callback is failing to create a session in Supabase. This is likely due to:
1. Incorrect redirect URL configuration
2. GitHub OAuth App settings mismatch
3. Supabase GitHub provider configuration issue

## Step-by-Step Fix

### 1. Check Your GitHub OAuth App Settings

**Go to:** https://github.com/settings/developers
**Find:** Your OAuth App (should be named "Rockitcode")
**Client ID:** `Ov23li4nuXpq2JjkREnk`

**Critical Settings:**
- **Application name:** Rockitcode
- **Homepage URL:** `http://localhost:3000`
- **Authorization callback URL:** `https://lkntrrjnwbbuueqluqou.supabase.co/auth/v1/callback`

⚠️ **The callback URL MUST be the Supabase URL, NOT localhost!**

### 2. Fix GitHub OAuth App Callback URL

If your callback URL is wrong:
1. **Edit your GitHub OAuth App**
2. **Change Authorization callback URL to:**
   ```
   https://lkntrrjnwbbuueqluqou.supabase.co/auth/v1/callback
   ```
3. **Save changes**

### 3. Verify Supabase GitHub Configuration

**Go to:** https://supabase.com/dashboard/project/lkntrrjnwbbuueqluqou/auth/providers
**Check GitHub Provider:**
- **Enable GitHub provider:** ✅ Enabled
- **Client ID:** `Ov23li4nuXpq2JjkREnk`
- **Client Secret:** `34aa6f93e45df379635176a5262158d88ddc5dc7`

### 4. Test the OAuth Flow

**Manual Test:**
1. **Copy this URL:**
   ```
   https://github.com/login/oauth/authorize?client_id=Ov23li4nuXpq2JjkREnk&redirect_uri=https://lkntrrjnwbbuueqluqou.supabase.co/auth/v1/callback&scope=user:email&state=test
   ```

2. **Paste in browser** and authorize
3. **Should redirect to Supabase** (not directly to localhost)
4. **Supabase should then redirect** to your app with session

### 5. Update Your Redirect Configuration

In your auth code, make sure you're using the correct redirect:

```typescript
// Correct configuration
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'github',
  options: {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    scopes: 'user:email'
  }
})
```

### 6. Common Mistakes

❌ **Wrong callback URL:** `http://localhost:3000/auth/callback`
✅ **Correct callback URL:** `https://lkntrrjnwbbuueqluqou.supabase.co/auth/v1/callback`

❌ **Missing redirect:** No `redirectTo` specified
✅ **Correct redirect:** `redirectTo: "http://localhost:3000/auth/callback"`

### 7. Test Script

Run this to test your configuration:

```bash
# Test the OAuth flow
curl -v "https://github.com/login/oauth/authorize?client_id=Ov23li4nuXpq2JjkREnk&redirect_uri=https://lkntrrjnwbbuueqluqou.supabase.co/auth/v1/callback&scope=user:email"
```

### 8. Expected Flow

1. **User clicks "Login with GitHub"** → Calls your API route
2. **API route calls Supabase** → Gets GitHub OAuth URL
3. **User redirects to GitHub** → Authorizes your app
4. **GitHub redirects to Supabase** → `https://lkntrrjnwbbuueqluqou.supabase.co/auth/v1/callback`
5. **Supabase creates session** → Redirects to your app
6. **User lands on your callback** → `http://localhost:3000/auth/callback`
7. **Session is available** → User can access dashboard

## Quick Fix Commands

**Update GitHub OAuth scopes (already done):**
```typescript
scopes: 'user:email'  // Remove read:org since you don't need it
```

**Test the auth flow:**
```bash
cd c:\Users\topwe\Desktop\twwsites\nextjs-rockitcode
npm run dev
# Go to http://localhost:3000
# Click "Login with GitHub"
# Check browser network tab for redirect flow
```

## If Still Failing

1. **Check browser network tab** during login
2. **Look for failed requests** to Supabase
3. **Verify GitHub app authorization** in your GitHub settings
4. **Check Supabase logs** in dashboard

The most common issue is the GitHub OAuth App callback URL pointing to localhost instead of Supabase.
