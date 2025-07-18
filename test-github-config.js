// GitHub OAuth Configuration Tester
// Run: node test-github-config.js

console.log('🔍 GitHub OAuth Configuration Checker');
console.log('=====================================\n');

// Your configuration
const GITHUB_CLIENT_ID = 'Ov23li4nuXpq2JjkREnk';
const SUPABASE_URL = 'https://lkntrrjnwbbuueqluqou.supabase.co';
const LOCAL_URL = 'http://localhost:3000';

console.log('📋 Current Configuration:');
console.log(`   GitHub Client ID: ${GITHUB_CLIENT_ID}`);
console.log(`   Supabase URL: ${SUPABASE_URL}`);
console.log(`   Local URL: ${LOCAL_URL}\n`);

console.log('✅ Required GitHub OAuth App Settings:');
console.log(`   Homepage URL: ${LOCAL_URL}`);
console.log(`   Callback URL: ${SUPABASE_URL}/auth/v1/callback`);
console.log('   ☝️  This callback URL MUST point to Supabase, NOT localhost!\n');

console.log('🔗 Manual Test URLs:');
console.log('   1. GitHub OAuth App Settings:');
console.log('      https://github.com/settings/developers\n');

console.log('   2. Test OAuth Flow:');
const testUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(SUPABASE_URL + '/auth/v1/callback')}&scope=user:email&state=test`;
console.log(`      ${testUrl}\n`);

console.log('   3. Supabase Auth Settings:');
console.log(`      https://supabase.com/dashboard/project/lkntrrjnwbbuueqluqou/auth/providers\n`);

console.log('🚨 Common Issues:');
console.log('   ❌ Callback URL points to localhost instead of Supabase');
console.log('   ❌ GitHub App not authorized for your account'); 
console.log('   ❌ Supabase GitHub provider not properly configured');
console.log('   ❌ Client ID/Secret mismatch between GitHub and Supabase\n');

console.log('📝 Next Steps:');
console.log('   1. Copy the test OAuth URL above');
console.log('   2. Paste it in your browser');
console.log('   3. It should redirect to GitHub, then Supabase, then back to localhost');
console.log('   4. If any step fails, check the corresponding configuration\n');

console.log('🔧 Quick Fixes:');
console.log('   • Update GitHub OAuth App callback URL to Supabase URL');
console.log('   • Verify Supabase GitHub provider settings');
console.log('   • Check that your GitHub account has authorized the app');
console.log('   • Ensure no browser blocking/privacy settings interfering\n');

console.log('Test completed! Use the URLs above to verify your configuration.');
