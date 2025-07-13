import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Python Fundamentals - Launch Pad',
  description: 'Learn Python programming with synchronized video lessons and interactive coding',
}

export default function PythonSynchronizedPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🐍</div>
        <h1 className="text-3xl font-bold mb-4">Python Fundamentals</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Master Python programming with synchronized video lessons and interactive coding
        </p>
      </div>

      {/* Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Course Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div className="font-medium">Python Basics & Syntax</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Variables, data types, operators</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">✓ Complete</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <div className="font-medium">Control Structures</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">If statements, loops, functions</div>
                  </div>
                </div>
                <div className="text-blue-600 font-medium">📖 Current</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg opacity-60">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div className="font-medium">Data Structures</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Lists, dictionaries, sets</div>
                  </div>
                </div>
                <div className="text-gray-500 font-medium">🔒 Locked</div>
              </div>
            </div>
          </div>

          {/* Interactive Demo */}
          <div className="bg-gray-900 text-green-400 rounded-lg p-6 font-mono text-sm">
            <div className="mb-2 text-gray-400"># Python Interactive Demo</div>
            <div className="mb-1">&gt;&gt;&gt; name = &quot;Launch Pad Student&quot;</div>
            <div className="mb-1">&gt;&gt;&gt; print(f&quot;Welcome to Python, {'{name}'}!&quot;)</div>
            <div className="mb-3 text-white">Welcome to Python, Launch Pad Student!</div>
            
            <div className="mb-1">&gt;&gt;&gt; for i in range(3):</div>
            <div className="mb-1">...     print(f&quot;Mission step {'{i+1}'} complete ✓&quot;)</div>
            <div className="mb-1 text-white">Mission step 1 complete ✓</div>
            <div className="mb-1 text-white">Mission step 2 complete ✓</div>
            <div className="mb-3 text-white">Mission step 3 complete ✓</div>
            
            <div className="text-gray-400">&gt;&gt;&gt; # Ready for your next mission?</div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🎯 Mission Objectives</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Master Python syntax</li>
              <li>📝 Build real projects</li>
              <li>🤖 AI-assisted coding</li>
              <li>🚀 Deploy to GitHub</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🛠️ Tools Unlocked</h3>
            <ul className="space-y-2 text-sm">
              <li>🐍 Python 3.11+ environment</li>
              <li>📝 VS Code integration</li>
              <li>🤖 GitHub Copilot assistance</li>
              <li>☁️ Cloud development setup</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">⚡ Demo Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              This is a demonstration of the course interface. Full interactive features available after GitHub integration.
            </p>
            <a href="/" className="text-blue-600 hover:text-blue-800 text-sm">
              ← Back to Launch Pad
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
