// Quick OAuth2 fix for Gmail - bypass verification issues
// /quick-oauth2-fix.js

const nodemailer = require('nodemailer')

// Simple OAuth2 setup that works with unverified apps
async function createSimpleOAuth2Transporter() {
  try {
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
        clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
        refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
        // Add these to bypass some verification issues
        accessUrl: 'https://oauth2.googleapis.com/token',
        expires: 3599
      }
    })

    return transporter
  } catch (error) {
    console.error('OAuth2 setup failed:', error.message)
    throw error
  }
}

// Fallback: Use the working app password method
async function createFallbackTransporter() {
  console.log('🔄 Using fallback SMTP with app password...')
  
  const transporter = nodemailer.createTransporter({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS // Your working app password
    }
  })

  return transporter
}

// Smart transporter that tries OAuth2 first, falls back to app password
async function createSmartTransporter() {
  try {
    console.log('🧪 Trying OAuth2 first...')
    return await createSimpleOAuth2Transporter()
  } catch (error) {
    console.log('⚠️ OAuth2 failed, using app password fallback...')
    return await createFallbackTransporter()
  }
}

module.exports = { 
  createSimpleOAuth2Transporter, 
  createFallbackTransporter,
  createSmartTransporter 
}

// Test both methods
async function testBothMethods() {
  console.log('🧪 Testing Gmail connection methods...')
  
  try {
    const transporter = await createSmartTransporter()
    
    // Test connection
    await transporter.verify()
    console.log('✅ Gmail connection successful!')
    
    // Send test email
    const result = await transporter.sendMail({
      from: `"RockitCode Team" <${process.env.GMAIL_USER || process.env.SMTP_USER}>`,
      to: process.env.GMAIL_USER || process.env.SMTP_USER,
      subject: 'RockitCode Email Test - Working!',
      html: `
        <h2>🎉 Email System Working!</h2>
        <p>Your RockitCode email system is now functional.</p>
        <p><strong>Method:</strong> Smart fallback (OAuth2 → App Password)</p>
        <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
      `
    })
    
    console.log('✅ Test email sent successfully!')
    console.log('Message ID:', result.messageId)
    
  } catch (error) {
    console.error('❌ Both methods failed:', error.message)
  }
}

// Run test if called directly
if (require.main === module) {
  // Load environment variables
  require('dotenv').config({ path: '.env.local' })
  testBothMethods()
}
