import Link from 'next/link'

export function StaticLaunchPadContent() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            🚀 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RockitCode Launch Pad
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-4xl mx-auto">
            Your mission control center for launching from coding newcomer to job-ready developer. 
            100% free forever with AI-powered learning.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link 
              href="/courses" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-xl"
            >
              🎯 Start Learning Now
            </Link>
            <Link 
              href="/dashboard" 
              className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all shadow-lg"
            >
              📊 View Progress
            </Link>
          </div>
          
          {/* Success Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Students Learning</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-gray-600 dark:text-gray-400">Completion Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">$75k+</div>
              <div className="text-gray-600 dark:text-gray-400">Avg Graduate Salary</div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🛣️ Your Learning Journey</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Structured path from beginner to professional developer
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl border border-green-200 dark:border-green-700">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-green-800 dark:text-green-300 mb-4">Foundation</h3>
              <p className="text-green-700 dark:text-green-400 mb-6">
                Master HTML, CSS, JavaScript fundamentals with hands-on projects
              </p>
              <div className="bg-green-100 dark:bg-green-800 rounded-lg p-4">
                <div className="text-sm font-medium text-green-800 dark:text-green-200">
                  4-6 weeks • 3 courses • 45 projects
                </div>
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border border-blue-200 dark:border-blue-700">
              <div className="text-6xl mb-4">🔄</div>
              <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-300 mb-4">Intermediate</h3>
              <p className="text-blue-700 dark:text-blue-400 mb-6">
                React, APIs, state management, and modern development workflows
              </p>
              <div className="bg-blue-100 dark:bg-blue-800 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  6-8 weeks • 4 courses • 60 projects
                </div>
              </div>
            </div>
            
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl border border-purple-200 dark:border-purple-700">
              <div className="text-6xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-4">Advanced</h3>
              <p className="text-purple-700 dark:text-purple-400 mb-6">
                Full-stack development, databases, deployment, and optimization
              </p>
              <div className="bg-purple-100 dark:bg-purple-800 rounded-lg p-4">
                <div className="text-sm font-medium text-purple-800 dark:text-purple-200">
                  8-12 weeks • 5 courses • 75 projects
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🎮 Interactive Learning Experience</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to become a professional developer
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-700">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-300 mb-4">
                Live Code Editor
              </h3>
              <p className="text-blue-700 dark:text-blue-400 mb-6">
                Practice coding with our built-in VS Code environment. No setup required - just open and start coding!
              </p>
              <Link href="/demo" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Try Demo
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl p-8 border border-purple-200 dark:border-purple-700">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-300 mb-4">
                AI Code Assistant
              </h3>
              <p className="text-purple-700 dark:text-purple-400 mb-6">
                Get instant help, code reviews, and explanations from our advanced AI teaching assistant.
              </p>
              <Link href="/ai-demo" className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Ask AI Anything
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl p-8 border border-green-200 dark:border-green-700">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-4">
                Portfolio Builder
              </h3>
              <p className="text-green-700 dark:text-green-400 mb-6">
                Create impressive projects that showcase your skills to potential employers and land interviews.
              </p>
              <Link href="/portfolio" className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium">
                Build Portfolio
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-2xl p-8 border border-orange-200 dark:border-orange-700">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-300 mb-4">
                Instant Deployment
              </h3>
              <p className="text-orange-700 dark:text-orange-400 mb-6">
                Deploy your projects instantly to show employers your live work. One-click deployment to the web.
              </p>
              <Link href="/deploy" className="inline-block bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
                Deploy Now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
