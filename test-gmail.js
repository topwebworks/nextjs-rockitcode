// Gmail setup test for RockitCode universal contact system
// Run: node test-gmail.js

const nodemailer = require('nodemailer');

async function testGmailSetup() {
  console.log('🧪 Testing Gmail Universal Contact Setup for RockitCode...\n');

  // Gmail configuration - works for all RockitCode communications
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'contact.rockitcode@gmail.com',
      pass: 'REPLACE-WITH-YOUR-16-CHAR-APP-PASSWORD'     // Get this from Gmail security settings
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  console.log('📧 Gmail Configuration:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: config.auth.user,
    status: config.auth.pass !== 'your-app-password-here' ? '✅ Configured' : '❌ Need app password'
  });

  if (config.auth.pass === 'your-app-password-here') {
    console.log('\n📝 Gmail Setup Steps:');
    console.log('1. Go to: https://accounts.google.com');
    console.log('2. Create account: contact.rockitcode@gmail.com');
    console.log('3. Enable 2-factor authentication');
    console.log('4. Generate app password: https://myaccount.google.com/apppasswords');
    console.log('5. Update this file with your credentials');
    console.log('6. Run: node test-gmail.js');
    return;
  }

  try {
    console.log('\n🔍 Testing SMTP connection...');
    const transporter = nodemailer.createTransport(config);
    await transporter.verify();
    console.log('✅ Gmail SMTP connection successful!');
    
    // Test different email types that RockitCode will send
    const testEmails = [
      {
        type: 'Sponsor Report',
        subject: 'RockitCode Sponsor Impact Report - Test',
        html: '<h1>🚀 Sponsor Test</h1><p>Professional sponsor communication ready!</p>'
      },
      {
        type: 'Supabase Auth',
        subject: 'RockitCode Account Verification',
        html: '<h1>📧 Auth Test</h1><p>User authentication emails ready!</p>'
      },
      {
        type: 'General Contact',
        subject: 'RockitCode Contact Confirmation',
        html: '<h1>💬 Contact Test</h1><p>General contact form emails ready!</p>'
      }
    ];

    console.log('\n📧 Testing different email types...');
    
    for (const email of testEmails) {
      try {
        const result = await transporter.sendMail({
          from: `"RockitCode Team" <${config.auth.user}>`,
          to: config.auth.user, // Send to self for testing
          subject: email.subject,
          html: email.html
        });
        
        console.log(`✅ ${email.type} email sent successfully`);
        console.log(`   Message ID: ${result.messageId}`);
      } catch (error) {
        console.log(`❌ ${email.type} email failed:`, error.message);
      }
    }
    
    console.log('\n🎉 Gmail setup complete! Update your .env.local:');
    console.log(`SMTP_HOST=smtp.gmail.com`);
    console.log(`SMTP_PORT=587`);
    console.log(`SMTP_SECURE=false`);
    console.log(`SMTP_USER=${config.auth.user}`);
    console.log(`SMTP_PASS=${config.auth.pass}`);
    
  } catch (error) {
    console.log('\n❌ Gmail setup failed:', error.message);
    console.log('\n🔧 Common fixes:');
    console.log('1. Make sure 2-factor auth is enabled');
    console.log('2. Generate a new app password');
    console.log('3. Use the 16-character app password (not your regular password)');
    console.log('4. Check for typos in email/password');
  }
}

// Run the test
testGmailSetup().catch(console.error);
