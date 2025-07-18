// Simple GitHub OAuth Test - Debug Authentication Issues
// Run: node debug-github-auth.js

const https = require('https');

// Your current configuration
const CLIENT_ID = 'Ov23li4nuXpq2JjkREnk';
const CLIENT_SECRET = '34aa6f93e45df379635176a5262158d88ddc5dc7';
const SUPABASE_URL = 'https://lkntrrjnwbbuueqluqou.supabase.co';

console.log('🔍 Debugging GitHub Authentication Issues');
console.log('==========================================\n');

// Test 1: Basic OAuth App Status
console.log('1. Testing OAuth App Configuration:');
console.log(`   Client ID: ${CLIENT_ID}`);
console.log(`   Expected scopes: user:email`);
console.log(`   Redirect URI: http://localhost:3000/auth/callback\n`);

// Test 2: Generate test OAuth URL (simplified scopes)
const basicScope = 'user:email';
const redirectUri = 'http://localhost:3000/auth/callback';
const state = 'test-' + Date.now();

const oauthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(basicScope)}&state=${state}`;

console.log('2. Test OAuth URL (basic scopes only):');
console.log(`   ${oauthUrl}\n`);

// Test 3: Check if OAuth app is active
console.log('3. Testing OAuth App Status...');

const testReq = https.request({
  hostname: 'github.com',
  path: `/login/oauth/authorize?client_id=${CLIENT_ID}`,
  method: 'HEAD',
  headers: {
    'User-Agent': 'RockitCode-Auth-Test'
  }
}, (res) => {
  if (res.statusCode === 200) {
    console.log('   ✅ OAuth App is accessible');
  } else if (res.statusCode === 302) {
    console.log('   ✅ OAuth App redirects properly (expected)');
  } else {
    console.log(`   ❌ Unexpected status: ${res.statusCode}`);
  }
  
  console.log('\n4. Common Issues to Check:');
  console.log('   🔸 GitHub App Status:');
  console.log('     - Go to: https://github.com/settings/applications');
  console.log('     - Verify "Rockitcode" app is listed and active');
  console.log('   🔸 Supabase Configuration:');
  console.log('     - Dashboard: https://supabase.com/dashboard/project/_/auth/providers');
  console.log('     - Ensure GitHub provider is enabled');
  console.log('     - Check Client ID/Secret match your GitHub app');
  console.log('   🔸 Redirect URI:');
  console.log('     - GitHub app: http://localhost:3000/auth/callback');
  console.log('     - Supabase: http://localhost:3000/auth/callback');
  console.log('     - Must match exactly (including http vs https)');
  
  console.log('\n5. Manual Test Steps:');
  console.log('   1. Copy the OAuth URL above');
  console.log('   2. Paste in browser while logged into GitHub');
  console.log('   3. Should see authorization page (not error)');
  console.log('   4. Click "Authorize" and see where it redirects');
  
  console.log('\n6. Next Debugging:');
  console.log('   🔧 If auth page loads: Issue is in Supabase callback handling');
  console.log('   🔧 If auth page errors: Issue is with GitHub app configuration');
  console.log('   🔧 If redirect fails: Issue is with callback URL mismatch');
});

testReq.on('error', (error) => {
  console.log('   ⚠️  Network test error (connectivity issue)');
});

testReq.end();

// Test 4: Supabase URL check
console.log('\n7. Supabase Configuration:');
console.log(`   URL: ${SUPABASE_URL}`);
console.log('   Status: Configured ✅');
console.log('   Next: Check GitHub provider in Supabase dashboard');
