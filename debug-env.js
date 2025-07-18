// Debug environment variables - manual load
const fs = require('fs')
const path = require('path')

// Manually parse .env.local
const envPath = path.join(__dirname, '.env.local')
const envContent = fs.readFileSync(envPath, 'utf8')

const envVars = {}
envContent.split('\n').forEach(line => {
  if (line.trim() && !line.startsWith('#')) {
    const [key, ...valueParts] = line.split('=')
    if (key && valueParts.length) {
      envVars[key] = valueParts.join('=')
    }
  }
})

console.log('🔍 Environment Variable Debug:')
console.log('SMTP_HOST:', envVars.SMTP_HOST)
console.log('SMTP_PORT:', envVars.SMTP_PORT)
console.log('SMTP_SECURE:', envVars.SMTP_SECURE)
console.log('SMTP_USER:', envVars.SMTP_USER)
console.log('SMTP_PASS length:', envVars.SMTP_PASS ? envVars.SMTP_PASS.length : 'undefined')
console.log('SMTP_PASS (masked):', envVars.SMTP_PASS ? envVars.SMTP_PASS.substring(0, 4) + '***' + envVars.SMTP_PASS.substring(envVars.SMTP_PASS.length - 4) : 'undefined')
console.log('SMTP_PASS actual:', envVars.SMTP_PASS)
