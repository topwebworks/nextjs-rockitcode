// OAuth2 Gmail configuration for RockitCode
// /oauth2-gmail-setup.js

const nodemailer = require('nodemailer')

// OAuth2 configuration for Gmail
async function createOAuth2Transporter() {
  // You'll need to set up OAuth2 credentials in Google Cloud Console
  // 1. Go to https://console.cloud.google.com/
  // 2. Create a new project or select existing
  // 3. Enable Gmail API
  // 4. Create OAuth2 credentials
  // 5. Add your domain to authorized origins
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER, // contact.rockitcode@gmail.com
      clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
      clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
      accessToken: process.env.GMAIL_OAUTH_ACCESS_TOKEN, // Optional, will be auto-generated
    }
  })

  return transporter
}

// Test OAuth2 connection
async function testOAuth2Gmail() {
  try {
    console.log('🧪 Testing Gmail OAuth2 Setup...')
    
    const transporter = await createOAuth2Transporter()
    
    // Verify connection
    await transporter.verify()
    console.log('✅ OAuth2 Gmail connection successful!')
    
    // Send test email
    const result = await transporter.sendMail({
      from: `"RockitCode Team" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // Send to self for testing
      subject: 'OAuth2 Gmail Test - RockitCode Email System',
      html: `
        <h2>🎉 OAuth2 Gmail Setup Successful!</h2>
        <p>Your RockitCode email system is now configured with OAuth2 authentication.</p>
        <p>This is much more secure than app passwords and will work long-term.</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `
    })
    
    console.log('✅ Test email sent successfully!')
    console.log('Message ID:', result.messageId)
    
  } catch (error) {
    console.error('❌ OAuth2 Gmail setup failed:', error.message)
    console.log('\n🔧 Setup Instructions:')
    console.log('1. Go to https://console.cloud.google.com/')
    console.log('2. Create/select project')
    console.log('3. Enable Gmail API')
    console.log('4. Create OAuth2 credentials')
    console.log('5. Set up refresh token')
  }
}

module.exports = { createOAuth2Transporter, testOAuth2Gmail }

// Run test if called directly
if (require.main === module) {
  // Load environment variables first
  const fs = require('fs')
  const path = require('path')
  
  // Manually parse .env.local
  const envPath = path.join(__dirname, '.env.local')
  const envContent = fs.readFileSync(envPath, 'utf8')
  
  const envVars = {}
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=')
      if (key && valueParts.length) {
        process.env[key] = valueParts.join('=')
      }
    }
  })
  
  testOAuth2Gmail()
}
