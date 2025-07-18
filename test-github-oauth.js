// GitHub OAuth Testing Script for AOP-Marketing Account
// Run: node test-github-oauth.js

const https = require('https');

// Your GitHub OAuth App configuration
const CLIENT_ID = 'Ov23li4nuXpq2JjkREnk';
const CLIENT_SECRET = '34aa6f93e45df379635176a5262158d88ddc5dc7';

console.log('🚀 Testing GitHub OAuth Configuration for AOP-Marketing');
console.log('=====================================\n');

// Test 1: Check OAuth App Info
console.log('1. OAuth App Configuration:');
console.log(`   Client ID: ${CLIENT_ID}`);
console.log(`   Scopes: user:email read:org`);
console.log(`   Redirect URI: http://localhost:3000/auth/callback\n`);

// Test 2: Generate OAuth URL
const scope = 'user:email read:org';
const redirectUri = 'http://localhost:3000/auth/callback';
const state = 'random-state-' + Math.random().toString(36).substring(7);

const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scope)}&state=${state}`;

console.log('2. OAuth Authorization URL:');
console.log(`   ${oauthUrl}\n`);

// Test 3: Organization Check
console.log('3. Manual Verification Steps:');
console.log('   ✅ Go to: https://github.com/settings/applications');
console.log('   ✅ Look for: "Rockitcode" application');
console.log('   ✅ Check: AOP-Marketing organization access');
console.log('   ✅ Status should be: "Granted" (not "Not granted")\n');

// Test 4: Quick App Info Check
const options = {
  hostname: 'api.github.com',
  path: `/applications/${CLIENT_ID}/token`,
  method: 'POST',
  headers: {
    'User-Agent': 'RockitCode-OAuth-Test',
    'Accept': 'application/vnd.github.v3+json',
    'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    'Content-Type': 'application/json'
  }
};

console.log('4. Testing OAuth App Accessibility...');

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (res.statusCode === 422) {
      console.log('   ✅ OAuth App is accessible (422 expected without valid token)');
    } else if (res.statusCode === 401) {
      console.log('   ❌ OAuth App credentials may be invalid');
    } else {
      console.log(`   Status: ${res.statusCode}`);
    }
    
    console.log('\n5. Next Actions:');
    console.log('   🔗 Visit OAuth URL above to test authorization');
    console.log('   👥 Contact AOP-Marketing admin if access denied');
    console.log('   🚀 Run "npm run dev" and test login once approved');
  });
});

req.on('error', (error) => {
  console.log('   ⚠️  Network error (this is okay for testing)');
});

// Send empty request (we expect 422 response)
req.write(JSON.stringify({}));
req.end();

console.log('   Testing GitHub API connectivity...\n');
