// Supabase Email Configuration Reference
// This file documents email setup options for Supabase Auth

// Option 1: Custom SMTP (Currently Active)
// Using OAuth2 Gmail via custom email API in src/app/api/auth/send-email/route.ts
// Configured in .env.local with GMAIL_* variables

// Option 2: Supabase Built-in SMTP (Fallback)
// If you ever need to use Supabase's built-in email service:
/*
const supabaseEmailConfig = {
  // In Supabase Dashboard > Authentication > Settings > SMTP Settings
  smtp: {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'contact.rockitcode@gmail.com',
    pass: 'your_app_password',
    admin_email: 'contact.rockitcode@gmail.com',
    max_frequency: 1 // emails per hour per user
  },
  
  // Email templates can be customized in Supabase Dashboard
  templates: {
    confirmation: 'Confirm your RockitCode account',
    recovery: 'Reset your RockitCode password',
    magic_link: 'Your RockitCode magic link',
    email_change: 'Confirm your new email address'
  }
}
*/

// Option 3: Third-party Services
// Examples: SendGrid, Mailgun, AWS SES, etc.
// Would require custom implementation similar to our OAuth2 Gmail setup

// Current Status: Using OAuth2 Gmail with custom email templates
// Location: src/lib/oauth2-gmail.ts + src/app/api/auth/send-email/route.ts
// Environment: .env.local (GMAIL_* variables)

export default {};