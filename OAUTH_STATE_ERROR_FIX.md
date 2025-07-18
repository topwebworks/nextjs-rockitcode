# OAuth State Error Fix Guide

## Error Analysis
```
http://localhost:3000/?error=invalid_request&error_code=bad_oauth_state&error_description=OAuth+callback+with+invalid+state
```

**Root Cause:** OAuth state parameter validation failure between GitHub and Supabase.

## Quick Fixes

### Fix 1: Test Direct Supabase OAuth (Bypass API Route)

Create a test page to use Supabase OAuth directly:

```typescript
// test-direct-oauth.html
<!DOCTYPE html>
<html>
<head>
    <title>Direct OAuth Test</title>
    <script src="https://unpkg.com/@supabase/supabase-js@2"></script>
</head>
<body>
    <h1>Direct OAuth Test</h1>
    <button onclick="testOAuth()">Login with GitHub (Direct)</button>
    
    <script>
        const supabase = window.supabase.createClient(
            'https://lkntrrjnwbbuueqluqou.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrbnRycmpud2JidXVlcWx1cW91Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1MDIzMTQsImV4cCI6MjA2ODA3ODMxNH0.dBCtXEuuHsY9js47ScVFNsrg3eh76Mb07u8CpxTxeaU'
        )
        
        async function testOAuth() {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: 'http://localhost:3000/auth/callback'
                }
            })
            
            if (error) {
                console.error('OAuth error:', error)
            } else {
                console.log('OAuth data:', data)
            }
        }
        
        // Check for session on page load
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                document.body.innerHTML += '<p>Session found: ' + session.user.email + '</p>'
            }
        })
    </script>
</body>
</html>
```

### Fix 2: Clear Browser Storage

1. **Open DevTools** → Application tab
2. **Clear all data** for localhost:3000
3. **Clear cookies** for .supabase.co
4. **Try authentication again**

### Fix 3: Check Supabase Auth Settings

Go to: https://supabase.com/dashboard/project/lkntrrjnwbbuueqluqou/auth/url-configuration

**Verify these exact settings:**
- **Site URL:** `http://localhost:3000`
- **Redirect URLs:** `http://localhost:3000/**`

### Fix 4: Update GitHub OAuth Route (Simplified)

The issue might be in how we're handling the OAuth initiation. Try this simplified version:

```typescript
// src/app/api/auth/github/route.ts
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    
    if (!supabase) {
      return NextResponse.json({ error: 'Server error' }, { status: 500 })
    }

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`
      }
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ url: data.url })
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
```

## Testing Steps

### Step 1: Clear All Auth Data
```bash
# Clear browser data completely
# Go to DevTools → Application → Storage → Clear site data
```

### Step 2: Test Direct OAuth
Save the HTML above as `test-oauth.html` and open it in browser

### Step 3: Check Network Tab
1. Open DevTools → Network
2. Try login with GitHub
3. Look for failed requests or state mismatches

### Step 4: Verify OAuth Flow
Expected network requests:
1. `POST /api/auth/github` → Gets OAuth URL
2. `GET github.com/login/oauth/authorize` → GitHub auth
3. `GET supabase.co/auth/v1/callback` → Supabase callback
4. `GET localhost:3000/auth/callback` → Your callback

## Most Likely Causes

1. **Browser cookies disabled/corrupted**
2. **Supabase site URL misconfiguration**
3. **GitHub OAuth App callback URL issues**
4. **PKCE/state parameter generation conflict**

Try the direct OAuth test first - if that works, the issue is in your API route. If it fails, the issue is in Supabase/GitHub configuration.
