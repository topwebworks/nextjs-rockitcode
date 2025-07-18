# Gmail OAuth2 Setup Guide for RockitCode

## Why OAuth2 is Required

As of January 2025, Google has disabled "less secure apps" access, including traditional SMTP authentication with app passwords for many account types. This is why your app password authentication is failing.

**Solution: Switch to OAuth2 authentication**

## Step-by-Step OAuth2 Setup

### 1. Google Cloud Console Setup

1. **Go to** https://console.cloud.google.com/
2. **Create a new project** or select an existing one
   - Project name: "RockitCode Email System"
3. **Enable Gmail API**
   - Go to "APIs & Services" > "Library"
   - Search for "Gmail API"
   - Click "Enable"

### 2. Create OAuth2 Credentials

1. **Go to** "APIs & Services" > "Credentials"
2. **Click** "Create Credentials" > "OAuth 2.0 Client IDs"
3. **Application type:** Web application
4. **Name:** RockitCode Email Client
5. **Authorized redirect URIs:** 
   - Add: `http://localhost:3000/auth/callback`
   - Add: `https://developers.google.com/oauthplayground`

### 3. Get Refresh Token

1. **Go to** https://developers.google.com/oauthplayground
2. **Click the gear icon** (Settings) in top right
3. **Check** "Use your own OAuth credentials"
4. **Enter your Client ID and Client Secret**
5. **In Step 1:** 
   - Select "Gmail API v1"
   - Choose scope: `https://mail.google.com/`
   - Click "Authorize APIs"
6. **Sign in** with contact.rockitcode@gmail.com
7. **In Step 2:** Click "Exchange authorization code for tokens"
8. **Copy the Refresh Token** (you'll need this!)

### 4. Update Environment Variables

Add these to your `.env.local`:

```bash
# Gmail OAuth2 Configuration (PRODUCTION READY)
GMAIL_USER=contact.rockitcode@gmail.com
GMAIL_OAUTH_CLIENT_ID=your-google-oauth-client-id
GMAIL_OAUTH_CLIENT_SECRET=your-google-oauth-client-secret
GMAIL_OAUTH_REFRESH_TOKEN=your-refresh-token-here
```

### 5. Update Your Email Code

Replace the old SMTP configuration with OAuth2:

```typescript
// In your email sending code
import { createOAuth2Transporter } from './oauth2-gmail-setup'

const transporter = await createOAuth2Transporter()
```

## Benefits of OAuth2

✅ **More Secure**: No passwords stored in environment variables
✅ **Future-Proof**: Google's recommended authentication method
✅ **Token-Based**: Automatic token refresh
✅ **Granular Permissions**: Only email sending access

## Testing

Run: `node oauth2-gmail-setup.js` to test the configuration

## Troubleshooting

- **Error: Invalid client**: Double-check Client ID/Secret
- **Error: Invalid grant**: Refresh token may be expired, regenerate it
- **Error: Insufficient permissions**: Ensure Gmail API is enabled

This setup will work long-term and is Google's recommended approach for 2025+.
