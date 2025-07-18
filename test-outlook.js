// RockitCode Outlook Email Test
// Run: node test-outlook.js

const nodemailer = require('nodemailer');

async function testOutlookConfigs() {
  console.log('🧪 Testing Multiple Outlook Configurations for RockitCode...\n');

  const configs = [
    {
      name: 'Outlook Standard (Port 587)',
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: { user: 'rockitcode@outlook.com', pass: 'walfrobrmynrngwa' },
      tls: { rejectUnauthorized: false }
    },
    {
      name: 'Outlook SSL (Port 465)',
      host: 'smtp-mail.outlook.com', 
      port: 465,
      secure: true,
      auth: { user: 'rockitcode@outlook.com', pass: 'walfrobrmynrngwa' },
      tls: { rejectUnauthorized: false }
    },
    {
      name: 'Live.com Server',
      host: 'smtp.live.com',
      port: 587,
      secure: false,
      auth: { user: 'rockitcode@outlook.com', pass: 'walfrobrmynrngwa' },
      tls: { rejectUnauthorized: false }
    }
  ];

  for (const config of configs) {
    console.log(`\n🔧 Testing: ${config.name}`);
    console.log('📧 Settings:', {
      host: config.host,
      port: config.port,
      secure: config.secure,
      user: config.auth.user
    });

    try {
      console.log('🔍 Verifying SMTP connection...');
      const transporter = nodemailer.createTransport(config);
      await transporter.verify();
      console.log('✅ SMTP connection successful!');
      
      // Try sending test email
      console.log('📧 Sending test email...');
      const result = await transporter.sendMail({
        from: `"RockitCode Test" <${config.auth.user}>`,
        to: config.auth.user,
        subject: 'RockitCode Email Test - Success!',
        html: '<h1>🎉 Email Working!</h1><p>RockitCode sponsor reports ready to send.</p>'
      });
      
      console.log('✅ SUCCESS! Test email sent');
      console.log(`📬 Message ID: ${result.messageId}`);
      console.log(`\n🎯 Use this configuration in your .env.local:`);
      console.log(`SMTP_HOST=${config.host}`);
      console.log(`SMTP_PORT=${config.port}`);
      console.log(`SMTP_SECURE=${config.secure}`);
      console.log(`SMTP_USER=${config.auth.user}`);
      console.log(`SMTP_PASS=${config.auth.pass}`);
      return; // Exit on first success
      
    } catch (error) {
      console.log(`❌ ${config.name} failed:`, error.message);
    }
  }

  console.log('\n🔧 All configurations failed. Try these steps:');
  console.log('1. Go to: https://account.microsoft.com/security');
  console.log('2. Look for "Sign-in options" or "App passwords"');
  console.log('3. Enable "Less secure app access" if available');
  console.log('4. Or try: Settings gear in Outlook → View all settings → Mail → Sync email');
  console.log('5. Alternative: Create Gmail account for testing');
}

// Run the test
testOutlookConfigs().catch(console.error);
