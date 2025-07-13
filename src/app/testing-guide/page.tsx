import Link from 'next/link'

export default function TestingGuidePage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🧪</div>
        <h1 className="text-4xl font-bold mb-4">Launch Pad Testing Guide</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Comprehensive testing areas for the RockitCode transformation
        </p>
      </div>

      {/* Testing Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Core Launch Pad */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">🚀</span>
            Core Launch Pad
          </h3>
          <div className="space-y-2 text-sm">
            <div>✅ Homepage transformation</div>
            <div>✅ GitHub integration flow</div>
            <div>✅ Progress tracking UI</div>
            <div>✅ Command center layout</div>
            <div>⏳ Mission progression logic</div>
          </div>
          <Link href="/" className="mt-4 inline-block text-blue-600 hover:text-blue-800">
            Test Homepage →
          </Link>
        </div>

        {/* Learning Platforms */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">📚</span>
            Learning Platforms
          </h3>
          <div className="space-y-2 text-sm">
            <div>⏳ Python synchronized lessons</div>
            <div>⏳ Web development courses</div>
            <div>⏳ Interactive code editor</div>
            <div>⏳ Video synchronization</div>
            <div>⏳ Progress tracking</div>
          </div>
          <div className="mt-4 space-y-1">
            <Link href="/python/synchronized" className="block text-green-600 hover:text-green-800">
              Test Python Course →
            </Link>
            <Link href="/html-css/synchronized" className="block text-green-600 hover:text-green-800">
              Test Web Dev Course →
            </Link>
          </div>
        </div>

        {/* Mission Features */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">🎯</span>
            Mission Features
          </h3>
          <div className="space-y-2 text-sm">
            <div>⏳ Launch sequence automation</div>
            <div>⏳ Mission briefings dashboard</div>
            <div>⏳ Professional profile setup</div>
            <div>⏳ AI assistant integration</div>
            <div>⏳ Revenue transparency model</div>
          </div>
          <div className="mt-4 space-y-1">
            <span className="block text-purple-600">Available after GitHub setup</span>
          </div>
        </div>

        {/* UI/UX Testing */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">🎨</span>
            UI/UX Testing
          </h3>
          <div className="space-y-2 text-sm">
            <div>✅ Dark/light theme toggle</div>
            <div>✅ Responsive design (mobile/desktop)</div>
            <div>✅ Component library integration</div>
            <div>⏳ Accessibility features</div>
            <div>⏳ Performance optimization</div>
          </div>
          <div className="mt-4 space-y-1">
            <span className="block text-orange-600">Test on different screen sizes</span>
          </div>
        </div>

        {/* Integration Testing */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">🔧</span>
            Integration Testing
          </h3>
          <div className="space-y-2 text-sm">
            <div>⏳ GitHub OAuth flow</div>
            <div>⏳ Student Developer Pack API</div>
            <div>⏳ Repository creation automation</div>
            <div>⏳ Profile optimization scripts</div>
            <div>⏳ Deployment workflows</div>
          </div>
          <div className="mt-4 space-y-1">
            <span className="block text-red-600">Requires production setup</span>
          </div>
        </div>

        {/* Demo/Testing Pages */}
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <span className="mr-2">🧪</span>
            Demo/Testing Pages
          </h3>
          <div className="space-y-2 text-sm">
            <div>✅ Component showcase</div>
            <div>✅ Interactive demos</div>
            <div>✅ Development testing</div>
            <div>✅ UI pattern library</div>
            <div>✅ Performance benchmarks</div>
          </div>
          <div className="mt-4 space-y-1">
            <Link href="/demo" className="block text-gray-600 hover:text-gray-800">
              Component Demo →
            </Link>
            <Link href="/synchronized-lessons" className="block text-gray-600 hover:text-gray-800">
              All Lessons →
            </Link>
          </div>
        </div>
      </div>

      {/* Priority Testing Areas */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">🎯 Priority Testing Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Immediate Testing:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Launch Pad homepage experience</li>
              <li>• GitHub integration demo flow</li>
              <li>• Course exploration paths</li>
              <li>• Mobile responsiveness</li>
              <li>• Theme switching</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Development Testing:</h4>
            <ul className="space-y-1 text-sm">
              <li>• Interactive learning components</li>
              <li>• Video synchronization features</li>
              <li>• Code editor functionality</li>
              <li>• Progress tracking systems</li>
              <li>• Mission progression logic</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Test Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/" className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
          <div className="text-2xl mb-1">🏠</div>
          <div className="text-sm font-medium">Launch Pad</div>
        </Link>
        
        <Link href="/python/synchronized" className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg text-center hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
          <div className="text-2xl mb-1">🐍</div>
          <div className="text-sm font-medium">Python Course</div>
        </Link>
        
        <Link href="/html-css/synchronized" className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-center hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
          <div className="text-2xl mb-1">🌐</div>
          <div className="text-sm font-medium">Web Dev</div>
        </Link>
        
        <Link href="/demo" className="p-4 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-center hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors">
          <div className="text-2xl mb-1">🎨</div>
          <div className="text-sm font-medium">Components</div>
        </Link>
      </div>

      {/* Back to Launch Pad */}
      <div className="text-center mt-8">
        <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          ← Back to Launch Pad
        </Link>
      </div>
    </div>
  )
}
