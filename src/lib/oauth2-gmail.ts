import nodemailer from 'nodemailer'

// OAuth2 Gmail Configuration for Production Email System
export const createOAuth2Transporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER || 'contact.rockitcode@gmail.com',
      clientId: process.env.GMAIL_OAUTH_CLIENT_ID,
      clientSecret: process.env.GMAIL_OAUTH_CLIENT_SECRET,
      refreshToken: process.env.GMAIL_OAUTH_REFRESH_TOKEN,
    },
  })
}

// Test OAuth2 connection
export const testOAuth2Connection = async () => {
  try {
    const transporter = createOAuth2Transporter()
    await transporter.verify()
    console.log('✅ OAuth2 Gmail connection successful')
    return true
  } catch (error) {
    console.error('❌ OAuth2 Gmail connection failed:', error)
    return false
  }
}

// Helper function to send email with OAuth2
export const sendOAuth2Email = async (mailOptions: any) => {
  try {
    const transporter = createOAuth2Transporter()
    const result = await transporter.sendMail(mailOptions)
    console.log('✅ Email sent successfully:', result.messageId)
    return result
  } catch (error) {
    console.error('❌ Failed to send email:', error)
    throw error
  }
}
