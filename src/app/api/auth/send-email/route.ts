import { NextRequest, NextResponse } from 'next/server'
import { createOAuth2Transporter } from '../../../../lib/oauth2-gmail'

// Custom Supabase Email API using OAuth2 Gmail
// Handles all authentication emails with professional templates

interface EmailRequest {
  type: 'signup' | 'reset' | 'invite' | 'magic-link' | 'email-change'
  email: string
  data: {
    confirmationUrl?: string
    resetUrl?: string
    magicUrl?: string
    emailChangeUrl?: string
    userData?: any
  }
}

export async function POST(request: NextRequest) {
  try {
    const { type, email, data }: EmailRequest = await request.json()

    if (!email || !type) {
      return NextResponse.json({ error: 'Email and type are required' }, { status: 400 })
    }

    // Configure OAuth2 Gmail transporter
    const transporter = await createOAuth2Transporter()

    // Generate email content based on type
    const emailContent = generateEmailTemplate(type, email, data)

    // Send email with OAuth2 Gmail
    const emailResult = await transporter.sendMail({
      from: `"RockitCode" <${process.env.GMAIL_USER}>`,
      replyTo: `"RockitCode Support" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: emailContent.subject,
      html: emailContent.html,
      text: emailContent.text
    })

    console.log(`✅ Supabase email sent successfully to ${email}:`, emailResult.messageId)

    return NextResponse.json({ 
      success: true, 
      messageId: emailResult.messageId,
      type: type
    })

  } catch (error) {
    console.error('❌ Supabase email sending failed:', error)
    return NextResponse.json({ 
      error: 'Failed to send email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

function generateEmailTemplate(type: string, email: string, data: any) {
  const baseStyle = `
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
      .container { max-width: 600px; margin: 0 auto; padding: 20px; }
      .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
      .content { background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
      .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
      .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
      .logo { font-size: 24px; font-weight: bold; }
    </style>
  `

  switch (type) {
    case 'signup':
      return {
        subject: '🚀 Welcome to RockitCode - Confirm Your Account',
        html: `
          ${baseStyle}
          <div class="container">
            <div class="header">
              <div class="logo">🚀 RockitCode</div>
              <h1>Welcome to Your Coding Journey!</h1>
            </div>
            <div class="content">
              <h2>Hi there! 👋</h2>
              <p>Welcome to RockitCode! We're excited to help you launch your coding career.</p>
              <p>To get started, please confirm your account by clicking the button below:</p>
              <p style="text-align: center;">
                <a href="${data.confirmationUrl}" class="button">Confirm Your Account</a>
              </p>
              <p>Once confirmed, you'll have access to:</p>
              <ul>
                <li>🎯 Career-focused project tutorials</li>
                <li>📚 Interactive learning experiences</li>
                <li>💼 Professional portfolio building</li>
                <li>🤖 AI-powered learning assistance</li>
                <li>🚀 Launch Pad for professional tool setup</li>
              </ul>
              <p>Ready to launch your career? Let's get started!</p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or visit <a href="https://rockitcode.com/help">our help center</a></p>
              <p>RockitCode - Launch Your Coding Career</p>
            </div>
          </div>
        `,
        text: `Welcome to RockitCode! Please confirm your account: ${data.confirmationUrl}`
      }

    case 'reset':
      return {
        subject: '🔐 Reset Your RockitCode Password',
        html: `
          ${baseStyle}
          <div class="container">
            <div class="header">
              <div class="logo">🚀 RockitCode</div>
              <h1>Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Reset Your Password</h2>
              <p>We received a request to reset your RockitCode password.</p>
              <p>Click the button below to create a new password:</p>
              <p style="text-align: center;">
                <a href="${data.resetUrl}" class="button">Reset Password</a>
              </p>
              <p><strong>This link will expire in 1 hour for security.</strong></p>
              <p>If you didn't request this password reset, you can safely ignore this email.</p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or visit <a href="https://rockitcode.com/help">our help center</a></p>
              <p>RockitCode - Launch Your Coding Career</p>
            </div>
          </div>
        `,
        text: `Reset your RockitCode password: ${data.resetUrl}`
      }

    case 'magic-link':
      return {
        subject: '🔗 Your RockitCode Login Link',
        html: `
          ${baseStyle}
          <div class="container">
            <div class="header">
              <div class="logo">🚀 RockitCode</div>
              <h1>Your Login Link</h1>
            </div>
            <div class="content">
              <h2>Sign in to RockitCode</h2>
              <p>Click the button below to sign in to your account:</p>
              <p style="text-align: center;">
                <a href="${data.magicUrl}" class="button">Sign In</a>
              </p>
              <p><strong>This link will expire in 1 hour for security.</strong></p>
              <p>Continue building your coding career with RockitCode!</p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or visit <a href="https://rockitcode.com/help">our help center</a></p>
              <p>RockitCode - Launch Your Coding Career</p>
            </div>
          </div>
        `,
        text: `Sign in to RockitCode: ${data.magicUrl}`
      }

    case 'email-change':
      return {
        subject: '📧 Confirm Your New Email Address',
        html: `
          ${baseStyle}
          <div class="container">
            <div class="header">
              <div class="logo">🚀 RockitCode</div>
              <h1>Confirm Email Change</h1>
            </div>
            <div class="content">
              <h2>Confirm Your New Email</h2>
              <p>You requested to change your email address to: <strong>${email}</strong></p>
              <p>Click the button below to confirm this change:</p>
              <p style="text-align: center;">
                <a href="${data.emailChangeUrl}" class="button">Confirm Email Change</a>
              </p>
              <p><strong>This link will expire in 1 hour for security.</strong></p>
              <p>If you didn't request this change, please contact our support team immediately.</p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or visit <a href="https://rockitcode.com/help">our help center</a></p>
              <p>RockitCode - Launch Your Coding Career</p>
            </div>
          </div>
        `,
        text: `Confirm your new email address: ${data.emailChangeUrl}`
      }

    case 'invite':
      return {
        subject: '🎉 You\'ve been invited to RockitCode!',
        html: `
          ${baseStyle}
          <div class="container">
            <div class="header">
              <div class="logo">🚀 RockitCode</div>
              <h1>You're Invited!</h1>
            </div>
            <div class="content">
              <h2>Welcome to RockitCode! 🎉</h2>
              <p>You've been invited to join RockitCode and launch your coding career!</p>
              <p>Click the button below to accept your invitation and create your account:</p>
              <p style="text-align: center;">
                <a href="${data.confirmationUrl}" class="button">Accept Invitation</a>
              </p>
              <p>Once you join, you'll have access to:</p>
              <ul>
                <li>🎯 Career-focused project tutorials</li>
                <li>📚 Interactive learning experiences</li>
                <li>💼 Professional portfolio building</li>
                <li>🤖 AI-powered learning assistance</li>
                <li>🚀 Launch Pad for professional tool setup</li>
              </ul>
              <p>Ready to launch your career? Let's get started!</p>
            </div>
            <div class="footer">
              <p>Questions? Reply to this email or visit <a href="https://rockitcode.com/help">our help center</a></p>
              <p>RockitCode - Launch Your Coding Career</p>
            </div>
          </div>
        `,
        text: `You've been invited to RockitCode! Accept your invitation: ${data.confirmationUrl}`
      }

    default:
      return {
        subject: 'RockitCode Notification',
        html: `
          ${baseStyle}
          <div class="container">
            <div class="header">
              <div class="logo">🚀 RockitCode</div>
              <h1>Notification</h1>
            </div>
            <div class="content">
              <p>This is a notification from RockitCode.</p>
            </div>
          </div>
        `,
        text: 'This is a notification from RockitCode.'
      }
  }
}
