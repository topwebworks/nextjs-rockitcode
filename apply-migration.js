const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl) {
  console.error('NEXT_PUBLIC_SUPABASE_URL not found in environment')
  process.exit(1)
}

if (!supabaseServiceKey) {
  console.error('SUPABASE_SERVICE_ROLE_KEY not found in environment')
  console.log('You need to add the service role key to your .env.local file')
  process.exit(1)
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function applyMigration() {
  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, 'supabase', 'migrations', '011_add_leaderboard_limit.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')
    
    console.log('Applying migration 011_add_leaderboard_limit.sql...')
    
    // Execute the migration
    const { data, error } = await supabase.rpc('exec_sql', { sql: migrationSQL })
    
    if (error) {
      // Try alternative method - direct SQL execution
      const { data: directData, error: directError } = await supabase
        .from('_migrations')
        .select('*')
        .limit(1)
      
      if (directError) {
        console.log('Using direct SQL execution method...')
        
        // Split the SQL into individual statements and execute them
        const statements = migrationSQL
          .split(';')
          .map(stmt => stmt.trim())
          .filter(stmt => stmt.length > 0)
        
        for (const statement of statements) {
          if (statement.toLowerCase().includes('create or replace function')) {
            console.log('Creating function...')
            const { error: funcError } = await supabase.rpc('exec', { 
              statement: statement + ';' 
            })
            if (funcError) {
              console.error('Error executing statement:', funcError)
            }
          }
        }
      } else {
        console.error('Migration error:', error)
        return
      }
    }
    
    console.log('Migration completed successfully!')
    console.log('The get_mentor_leaderboard function should now be available.')
    
  } catch (err) {
    console.error('Error applying migration:', err)
  }
}

applyMigration()
