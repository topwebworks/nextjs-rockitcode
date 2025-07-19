// OAuth2 Gmail Setup Documentation
// Step-by-step guide for configuring Gmail OAuth2 email sending

/*
SETUP STEPS:

1. Google Cloud Console Setup:
   - Go to https://console.cloud.google.com
   - Create new project or select existing one
   - Enable Gmail API
   - Create OAuth2 credentials (Web application)
   - Add authorized redirect URIs if needed

2. OAuth2 Credentials:
   - Client ID: Get from Google Cloud Console
   - Client Secret: Get from Google Cloud Console  
   - Refresh Token: Generate using OAuth2 Playground or scripts

3. Environment Variables (.env.local):
   GMAIL_USER=contact.rockitcode@gmail.com
   GMAIL_OAUTH_CLIENT_ID=your_client_id
   GMAIL_OAUTH_CLIENT_SECRET=your_client_secret
   GMAIL_OAUTH_REFRESH_TOKEN=your_refresh_token

4. Generate Refresh Token:
   - Use Google OAuth2 Playground: https://developers.google.com/oauthplayground
   - Select Gmail API v1 scope: https://www.googleapis.com/auth/gmail.send
   - Follow authorization flow to get refresh token

5. Test Configuration:
   - Use testOAuth2Connection() from src/lib/oauth2-gmail.ts
   - Send test email to verify setup

CURRENT STATUS:
✅ OAuth2 Gmail is configured and working
✅ Email sending API is active at /api/auth/send-email
✅ Custom email templates implemented
✅ Production-ready configuration

FILES INVOLVED:
- src/lib/oauth2-gmail.ts (OAuth2 setup)
- src/app/api/auth/send-email/route.ts (Email API)
- .env.local (Environment variables)

TROUBLESHOOTING:
- Check Gmail API is enabled in Google Cloud Console
- Verify OAuth2 credentials are correct
- Ensure refresh token is valid (they can expire)
- Check Gmail account security settings allow app access
*/

// Helper function to test OAuth2 setup
const testEmailSetup = async () => {
  try {
    const response = await fetch('/api/auth/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'signup',
        email: 'test@example.com',
        data: { confirmationUrl: 'https://yoursite.com/confirm' }
      })
    });
    
    if (response.ok) {
      console.log('✅ Email system is working');
    } else {
      console.log('❌ Email system needs attention');
    }
  } catch (error) {
    console.error('Email test failed:', error);
  }
};

export default { testEmailSetup };