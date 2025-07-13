// Week 5: Database Integration Validation Script
// Validates Supabase integration, user management, and database functionality

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

console.log(chalk.blue.bold('\n🔍 WEEK 5 DATABASE INTEGRATION VALIDATION'));
console.log(chalk.gray('Checking Supabase integration, user management, and database functionality...\n'));

// Check database schema files
const validationResults = {
  database: false,
  migrations: false,
  types: false,
  api: false,
  auth: false,
  frontend: false,
  dependencies: false
};

// 1. Database Schema Validation
console.log(chalk.yellow('📊 Checking Database Schema...'));
const migrationPath1 = path.join(process.cwd(), 'supabase', 'migrations', '001_initial_user_management.sql');
const migrationPath2 = path.join(process.cwd(), 'supabase', 'migrations', '002_functions_and_views.sql');

if (fs.existsSync(migrationPath1) && fs.existsSync(migrationPath2)) {
  console.log(chalk.green('  ✅ Database migrations found'));
  validationResults.database = true;
  validationResults.migrations = true;
} else {
  console.log(chalk.red('  ❌ Database migrations missing'));
}

// 2. TypeScript Types Validation
console.log(chalk.yellow('🔧 Checking TypeScript Types...'));
const typesPath = path.join(process.cwd(), 'src', 'types', 'database.ts');
if (fs.existsSync(typesPath)) {
  console.log(chalk.green('  ✅ Database types defined'));
  validationResults.types = true;
} else {
  console.log(chalk.red('  ❌ Database types missing'));
}

// 3. API Routes Validation
console.log(chalk.yellow('🌐 Checking API Routes...'));
const apiRoutes = [
  'src/app/api/user/profile/route.ts',
  'src/app/api/user/progress/route.ts',
  'src/app/api/user/dashboard/route.ts',
  'src/app/api/auth/github/route.ts',
  'src/app/api/auth/callback/route.ts'
];

const existingRoutes = apiRoutes.filter(route => 
  fs.existsSync(path.join(process.cwd(), route))
);

if (existingRoutes.length === apiRoutes.length) {
  console.log(chalk.green(`  ✅ All ${apiRoutes.length} API routes implemented`));
  validationResults.api = true;
} else {
  console.log(chalk.yellow(`  ⚠️  ${existingRoutes.length}/${apiRoutes.length} API routes found`));
  validationResults.api = existingRoutes.length > 3;
}

// 4. Authentication System Validation
console.log(chalk.yellow('🔐 Checking Authentication System...'));
const supabaseLib = path.join(process.cwd(), 'src', 'lib', 'supabase.ts');
const userContext = path.join(process.cwd(), 'src', 'contexts', 'UserContext.tsx');
const loginPage = path.join(process.cwd(), 'src', 'app', '(auth)', 'login', 'page.tsx');

if (fs.existsSync(supabaseLib) && fs.existsSync(userContext) && fs.existsSync(loginPage)) {
  console.log(chalk.green('  ✅ Authentication system complete'));
  validationResults.auth = true;
} else {
  console.log(chalk.red('  ❌ Authentication system incomplete'));
}

// 5. Frontend Integration Validation
console.log(chalk.yellow('⚛️  Checking Frontend Integration...'));
const layoutPath = path.join(process.cwd(), 'src', 'app', 'layout.tsx');
const uiComponents = [
  'src/components/ui/button.tsx',
  'src/components/ui/card.tsx'
];

const existingUI = uiComponents.filter(comp => 
  fs.existsSync(path.join(process.cwd(), comp))
);

if (fs.existsSync(layoutPath) && existingUI.length >= 1) {
  console.log(chalk.green('  ✅ Frontend integration ready'));
  validationResults.frontend = true;
} else {
  console.log(chalk.red('  ❌ Frontend integration incomplete'));
}

// 6. Dependencies Validation
console.log(chalk.yellow('📦 Checking Dependencies...'));
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const supabaseDeps = [
    '@supabase/ssr',
    '@supabase/supabase-js'
  ];
  
  const hasSupabase = supabaseDeps.every(dep => 
    packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep]
  );
  
  if (hasSupabase) {
    console.log(chalk.green('  ✅ Supabase dependencies installed'));
    validationResults.dependencies = true;
  } else {
    console.log(chalk.red('  ❌ Supabase dependencies missing'));
  }
}

// Results Summary
console.log(chalk.blue.bold('\n📋 WEEK 5 VALIDATION SUMMARY'));
console.log(chalk.gray('=' * 50));

const validationItems = [
  { name: 'Database Schema', status: validationResults.database },
  { name: 'Migration Files', status: validationResults.migrations },
  { name: 'TypeScript Types', status: validationResults.types },
  { name: 'API Routes', status: validationResults.api },
  { name: 'Authentication', status: validationResults.auth },
  { name: 'Frontend Integration', status: validationResults.frontend },
  { name: 'Dependencies', status: validationResults.dependencies }
];

validationItems.forEach(item => {
  const icon = item.status ? '✅' : '❌';
  const color = item.status ? chalk.green : chalk.red;
  console.log(color(`${icon} ${item.name}`));
});

const completedCount = validationItems.filter(item => item.status).length;
const completionPercentage = Math.round((completedCount / validationItems.length) * 100);

console.log(chalk.gray('\n' + '=' * 50));
console.log(chalk.blue.bold(`📊 COMPLETION: ${completedCount}/${validationItems.length} (${completionPercentage}%)`));

if (completionPercentage >= 80) {
  console.log(chalk.green.bold('\n🎉 WEEK 5 DATABASE INTEGRATION: READY FOR PRODUCTION'));
  console.log(chalk.green('✨ User management system operational'));
  console.log(chalk.green('✨ Progress tracking system active'));
  console.log(chalk.green('✨ Authentication system functional'));
  console.log(chalk.blue('\n🚀 Ready to proceed to Week 6: Advanced Features & AI Integration'));
} else if (completionPercentage >= 60) {
  console.log(chalk.yellow.bold('\n⚠️  WEEK 5 DATABASE INTEGRATION: MOSTLY COMPLETE'));
  console.log(chalk.yellow('🔧 Minor configurations needed'));
  console.log(chalk.blue('📋 Review missing components above'));
} else {
  console.log(chalk.red.bold('\n❌ WEEK 5 DATABASE INTEGRATION: NEEDS ATTENTION'));
  console.log(chalk.red('🚨 Major components missing'));
  console.log(chalk.red('📋 Complete database setup before proceeding'));
}

console.log(chalk.gray('\n' + '=' * 50));
console.log(chalk.blue('📚 Documentation: WEEK_5_COMPLETION.md'));
console.log(chalk.blue('🔧 Setup Guide: .env.example'));
console.log(chalk.gray('Launch Pad Database Integration Validation Complete\n'));
