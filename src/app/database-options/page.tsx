import Link from 'next/link'

export default function DatabaseOptionsPage() {
  return (
    <div className="max-w-6xl p-6 mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-4 text-6xl">💾</div>
        <h1 className="mb-4 text-4xl font-bold">Database Strategy for Launch Pad</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Comparing free database solutions and understanding when to use each approach
        </p>
      </div>

      {/* Why Not Just JSON Files? */}
      <div className="p-6 mb-8 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
        <h2 className="flex items-center mb-4 text-xl font-semibold">
          <span className="mr-2">📄</span>
          Why Not Just JSON Files?
        </h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-medium text-green-600">✅ JSON Files Work Great For:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Static configuration data</li>
              <li>• Course content & lessons</li>
              <li>• UI components & themes</li>
              <li>• Simple user preferences</li>
              <li>• Demo/prototype data</li>
              <li>• 100% free - no limits!</li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-3 font-medium text-red-600">❌ JSON Files Break Down For:</h4>
            <ul className="space-y-1 text-sm">
              <li>• User authentication & sessions</li>
              <li>• Real-time progress tracking</li>
              <li>• Concurrent user modifications</li>
              <li>• Search & filtering operations</li>
              <li>• Data integrity & validation</li>
              <li>• Scaling beyond 100 users</li>
            </ul>
          </div>
        </div>

        <div className="p-4 mt-4 bg-yellow-100 rounded-lg dark:bg-yellow-900/40">
          <p className="text-sm">
            <strong>Recommendation:</strong> Start with JSON files for static content, upgrade to database only when you need user accounts and progress tracking.
          </p>
        </div>
      </div>

      {/* Free Database Solutions Comparison */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-2">
        
        {/* Supabase */}
        <div className="p-6 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800">
          <div className="flex items-center mb-4">
            <div className="mr-3 text-3xl">🚀</div>
            <div>
              <h3 className="text-lg font-semibold">Supabase (Recommended)</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">PostgreSQL + Auth + Real-time</div>
            </div>
          </div>
          
          <div className="mb-4 space-y-3">
            <div>
              <h4 className="mb-1 font-medium text-green-600">✅ Free Tier:</h4>
              <ul className="space-y-1 text-sm">
                <li>• 50,000 monthly active users</li>
                <li>• 500MB database storage</li>
                <li>• 1GB file storage</li>
                <li>• Built-in authentication</li>
                <li>• Real-time subscriptions</li>
                <li>• GitHub OAuth ready</li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-1 font-medium text-orange-600">⚠️ Limitations:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Projects pause after 1 week inactivity</li>
                <li>• Limited API requests</li>
                <li>• Community support only</li>
              </ul>
            </div>
          </div>
          
          <div className="p-3 text-sm bg-green-100 rounded dark:bg-green-900/40">
            <strong>Perfect for:</strong> Getting GitHub auth working immediately with room to grow to thousands of users
          </div>
        </div>

        {/* PlanetScale */}
        <div className="p-6 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <div className="flex items-center mb-4">
            <div className="mr-3 text-3xl">🌍</div>
            <div>
              <h3 className="text-lg font-semibold">PlanetScale</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">Serverless MySQL</div>
            </div>
          </div>
          
          <div className="mb-4 space-y-3">
            <div>
              <h4 className="mb-1 font-medium text-green-600">✅ Free Tier:</h4>
              <ul className="space-y-1 text-sm">
                <li>• 5GB storage</li>
                <li>• 1 billion row reads/month</li>
                <li>• 10 million row writes/month</li>
                <li>• Branching & schema changes</li>
                <li>• Global edge network</li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-1 font-medium text-red-600">❌ Downsides:</h4>
              <ul className="space-y-1 text-sm">
                <li>• No built-in authentication</li>
                <li>• Need separate auth solution</li>
                <li>• MySQL instead of PostgreSQL</li>
              </ul>
            </div>
          </div>
          
          <div className="p-3 text-sm bg-blue-100 rounded dark:bg-blue-900/40">
            <strong>Good for:</strong> High-traffic apps but need to build auth separately
          </div>
        </div>

        {/* Neon */}
        <div className="p-6 border border-purple-200 rounded-lg bg-purple-50 dark:bg-purple-900/20 dark:border-purple-800">
          <div className="flex items-center mb-4">
            <div className="mr-3 text-3xl">⚡</div>
            <div>
              <h3 className="text-lg font-semibold">Neon</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">Serverless PostgreSQL</div>
            </div>
          </div>
          
          <div className="mb-4 space-y-3">
            <div>
              <h4 className="mb-1 font-medium text-green-600">✅ Free Tier:</h4>
              <ul className="space-y-1 text-sm">
                <li>• 3GB storage</li>
                <li>• PostgreSQL compatible</li>
                <li>• Instant branching</li>
                <li>• Auto-scaling</li>
                <li>• No connection limits</li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-1 font-medium text-red-600">❌ Downsides:</h4>
              <ul className="space-y-1 text-sm">
                <li>• No built-in auth</li>
                <li>• Newer service (less mature)</li>
                <li>• Need separate real-time solution</li>
              </ul>
            </div>
          </div>
          
          <div className="p-3 text-sm bg-purple-100 rounded dark:bg-purple-900/40">
            <strong>Good for:</strong> PostgreSQL fans who want to build custom auth
          </div>
        </div>

        {/* Local SQLite */}
        <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center mb-4">
            <div className="mr-3 text-3xl">💾</div>
            <div>
              <h3 className="text-lg font-semibold">Local SQLite + JSON</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hybrid Approach</div>
            </div>
          </div>
          
          <div className="mb-4 space-y-3">
            <div>
              <h4 className="mb-1 font-medium text-green-600">✅ Completely Free:</h4>
              <ul className="space-y-1 text-sm">
                <li>• 100% free forever</li>
                <li>• No external dependencies</li>
                <li>• Works offline</li>
                <li>• Simple deployment</li>
                <li>• Perfect for prototyping</li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-1 font-medium text-red-600">❌ Limitations:</h4>
              <ul className="space-y-1 text-sm">
                <li>• No real-time collaboration</li>
                <li>• Limited concurrent users</li>
                <li>• No built-in auth</li>
                <li>• Manual backup/sync</li>
              </ul>
            </div>
          </div>
          
          <div className="p-3 text-sm bg-gray-100 rounded dark:bg-gray-700">
            <strong>Perfect for:</strong> Launch Pad demo/prototype phase before real users
          </div>
        </div>
      </div>

      {/* Hybrid Architecture Recommendation */}
      <div className="p-6 mb-8 text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
        <h2 className="mb-4 text-xl font-semibold">🎯 Recommended Hybrid Architecture</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="p-4 rounded-lg bg-white/20">
            <h4 className="mb-2 font-medium">Phase 1: Pure JSON (Current)</h4>
            <ul className="space-y-1 text-sm">
              <li>• Course content in JSON files</li>
              <li>• Static site generation</li>
              <li>• Local storage for user prefs</li>
              <li>• 100% free hosting</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-lg bg-white/20">
            <h4 className="mb-2 font-medium">Phase 2: JSON + Supabase Auth</h4>
            <ul className="space-y-1 text-sm">
              <li>• Keep course content in JSON</li>
              <li>• Add Supabase for GitHub OAuth</li>
              <li>• Store user progress only</li>
              <li>• Still mostly free</li>
            </ul>
          </div>
          
          <div className="p-4 rounded-lg bg-white/20">
            <h4 className="mb-2 font-medium">Phase 3: Full Database (Later)</h4>
            <ul className="space-y-1 text-sm">
              <li>• Move to full Supabase</li>
              <li>• Real-time collaboration</li>
              <li>• Advanced analytics</li>
              <li>• Scale to thousands</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Why Supabase Over Others */}
      <div className="p-6 mb-8 border rounded-lg bg-cyan-50 dark:bg-cyan-900/20 border-cyan-200 dark:border-cyan-800">
        <h2 className="mb-4 text-xl font-semibold">🤔 Why Supabase Over Others?</h2>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-medium">For Launch Pad Specifically:</h4>
            <ul className="space-y-2 text-sm">
              <li><strong>GitHub OAuth built-in:</strong> No extra coding needed</li>
              <li><strong>Real-time subscriptions:</strong> Progress updates instantly</li>
              <li><strong>Row Level Security:</strong> User data protection</li>
              <li><strong>Edge Functions:</strong> Run GitHub API calls serverlessly</li>
              <li><strong>Storage:</strong> User avatars, project files</li>
            </ul>
          </div>
          
          <div>
            <h4 className="mb-3 font-medium">Development Experience:</h4>
            <ul className="space-y-2 text-sm">
              <li><strong>Auto-generated API:</strong> Instant REST & GraphQL</li>
              <li><strong>Database UI:</strong> Easy data management</li>
              <li><strong>TypeScript support:</strong> Auto-generated types</li>
              <li><strong>Next.js integration:</strong> Official helpers</li>
              <li><strong>Migration tools:</strong> Easy schema changes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Implementation Strategy */}
      <div className="p-6 mb-8 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-800">
        <h2 className="mb-4 text-xl font-semibold">🚀 Recommended Implementation Strategy</h2>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-bold text-white bg-green-500 rounded-full">1</div>
            <div>
              <h4 className="font-medium">Start with JSON + Local Storage (This Week)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Keep all course content in JSON files, use localStorage for user preferences. This is what we have now and it works perfectly for the demo.</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-bold text-white bg-blue-500 rounded-full">2</div>
            <div>
              <h4 className="font-medium">Add Supabase for Auth Only (Next Week)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Set up Supabase free tier just for GitHub OAuth and basic user profiles. Course content stays in JSON files.</p>
              <div className="p-2 mt-2 text-xs bg-blue-100 rounded dark:bg-blue-900/40">
                <strong>Cost:</strong> $0/month (well within free tier limits)
              </div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-sm font-bold text-white bg-purple-500 rounded-full">3</div>
            <div>
              <h4 className="font-medium">Gradual Migration (Month 2+)</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Only move to full database features when you have real users and need real-time progress tracking.</p>
              <div className="p-2 mt-2 text-xs bg-purple-100 rounded dark:bg-purple-900/40">
                <strong>Trigger:</strong> When you have 50+ active users or need real-time features
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <div className="p-6 mb-8 overflow-x-auto text-gray-100 bg-gray-900 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-white">📝 Hybrid Approach Code Example</h3>
        <pre className="text-sm"><code>{`// Course content stays in JSON files
// /data/courses/python-fundamentals.json
{
  "id": "python-fundamentals",
  "title": "Python Fundamentals",
  "lessons": [
    {
      "id": "variables",
      "title": "Variables & Data Types",
      "content": "...",
      "exercises": [...]
    }
  ]
}

// User progress goes to Supabase (only when authenticated)
// /lib/progress.ts
export async function saveProgress(userId: string, courseId: string, lessonId: string) {
  if (!userId) {
    // Save to localStorage for demo users
    localStorage.setItem('progress', JSON.stringify(progressData));
    return;
  }
  
  // Save to Supabase for authenticated users
  await supabase
    .from('user_progress')
    .upsert({ user_id: userId, course_id: courseId, lesson_id: lessonId });
}

// This way you get:
// ✅ 100% free for demo users (JSON + localStorage)
// ✅ Professional features for authenticated users (Supabase)
// ✅ Easy migration path when you're ready`}</code></pre>
      </div>

      {/* Alternative: 100% Free Solution */}
      <div className="p-6 mb-8 border border-yellow-200 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
        <h2 className="mb-4 text-xl font-semibold">💰 Alternative: 100% Free Solution</h2>
        
        <p className="mb-4 text-sm">If you want to avoid any external dependencies:</p>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-2 font-medium">JSON + localStorage + GitHub Pages:</h4>
            <ul className="space-y-1 text-sm">
              <li>• All course content in JSON files</li>
              <li>• User progress in localStorage</li>
              <li>• GitHub OAuth via Netlify/Vercel functions</li>
              <li>• Deploy to GitHub Pages (free)</li>
              <li>• Export/import progress feature</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-2 font-medium">Limitations:</h4>
            <ul className="space-y-1 text-sm">
              <li>• No cross-device sync</li>
              <li>• No real-time collaboration</li>
              <li>• Limited to browser storage</li>
              <li>• Manual progress backup</li>
            </ul>
          </div>
        </div>
        
        <div className="p-3 mt-4 bg-yellow-100 rounded dark:bg-yellow-900/40">
          <p className="text-sm"><strong>When to choose this:</strong> If you want to guarantee 100% free forever and don't need real-time features.</p>
        </div>
      </div>

      {/* Back Navigation */}
      <div className="text-center">
        <Link href="/roadmap" className="inline-block px-6 py-3 mr-4 text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700">
          ← Back to Roadmap
        </Link>
        <Link href="/" className="inline-block px-6 py-3 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700">
          Back to Launch Pad
        </Link>
      </div>
    </div>
  )
}
