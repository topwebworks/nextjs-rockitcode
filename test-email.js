// Email configuration test utility for RockitCode
// Run: node test-email.js

const nodemailer = require('nodemailer');

async function testEmailConfig() {
  console.log('🧪 Testing Multiple Outlook Configurations...\n');

  // Test multiple Outlook configurations
  const configs = [
    {
      name: 'Outlook Config 1 (Port 587)',
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: { user: 'rockitcode@outlook.com', pass: 'walfrobrmynrngwa' },
      tls: { rejectUnauthorized: false }
    },
    {
      name: 'Outlook Config 2 (Port 465 SSL)',
      host: 'smtp-mail.outlook.com', 
      port: 465,
      secure: true,
      auth: { user: 'rockitcode@outlook.com', pass: 'walfrobrmynrngwa' },
      tls: { rejectUnauthorized: false }
    },
    {
      name: 'Outlook Config 3 (smtp.live.com)',
      host: 'smtp.live.com',
      port: 587,
      secure: false,
      auth: { user: 'rockitcode@outlook.com', pass: 'walfrobrmynrngwa' },
      tls: { rejectUnauthorized: false }
    }
  ];

  for (const config of configs) {
    console.log(`\n🔧 Testing: ${config.name}`);
    console.log('📧 Configuration:', {
      host: config.host,
      port: config.port,
      secure: config.secure,
      user: config.auth.user
    });

  try {
    // Create transporter
    const transporter = nodemailer.createTransport(config);
    
    // Verify connection
    console.log('\n🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');

    // Send test email
    console.log('\n📤 Sending test email...');
    const testEmail = {
      from: `"RockitCode Test" <${config.auth.user}>`,
      to: config.auth.user, // Send to yourself for testing
      subject: 'cPanel Email Test - ' + new Date().toLocaleString(),
      html: `
        <h2>🎉 cPanel Email Test Successful!</h2>
        <p>Your cPanel email configuration is working correctly.</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>From:</strong> ${config.host}:${config.port}</p>
        <hr>
        <p><em>This is an automated test from RockitCode sponsor report system.</em></p>
      `
    };

    const result = await transporter.sendMail(testEmail);
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('📬 Check your inbox at:', config.auth.user);

  } catch (error) {
    console.error('❌ Email configuration test failed:');
    console.error('Error:', error.message);
    
    try {
      console.log('🔍 Verifying SMTP connection...');
      const transporter = nodemailer.createTransport(config);
      await transporter.verify();
      console.log('✅ SMTP connection successful!');
      
      // Try sending a test email
      console.log('📧 Sending test email...');
      const testResult = await transporter.sendMail({
        from: `"RockitCode Test" <${config.auth.user}>`,
        to: config.auth.user, // Send to self for testing
        subject: 'RockitCode Email Test - Success!',
        text: 'If you receive this, your email configuration is working perfectly!',
        html: '<h1>🎉 Email Test Successful!</h1><p>Your RockitCode email system is ready to send sponsor reports.</p>'
      });
      
      console.log('✅ Test email sent successfully!');
      console.log(`📬 Message ID: ${testResult.messageId}`);
      break; // Exit loop on first success
      
    } catch (error) {
      console.log(`❌ ${config.name} failed:`, error.message);
    }
  }

  console.log('\n🔧 If all configs failed, try:');
  console.log('1. Enable "Less secure app access" in Microsoft account settings');
  console.log('2. Check if SMTP is enabled in Outlook settings');
  console.log('3. Try creating a new app password');
  console.log('4. Consider using Gmail as alternative');
}

// Run the test
testEmailConfig();

module.exports = testEmailConfig;
