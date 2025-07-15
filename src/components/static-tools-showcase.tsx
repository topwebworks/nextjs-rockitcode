export function StaticToolsShowcase() {
  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">$200k+ Professional Developer Tools</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to become a professional developer — completely free
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="tool-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-3">AI Code Assistant</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get instant help, code reviews, and explanations from advanced AI
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600">$50/month value</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">FREE</span>
            </div>
          </div>
          
          <div className="tool-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border border-green-200 dark:border-green-700">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-bold mb-3">Live Code Editor</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Professional VS Code environment with syntax highlighting and IntelliSense
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-green-600">$30/month value</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">FREE</span>
            </div>
          </div>
          
          <div className="tool-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-700">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Instant Deployment</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Deploy projects instantly to showcase your work to employers
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-purple-600">$40/month value</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">FREE</span>
            </div>
          </div>
          
          <div className="tool-card bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-xl p-6 border border-orange-200 dark:border-orange-700">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-3">Progress Analytics</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Track your learning journey with detailed analytics and insights
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-orange-600">$25/month value</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">FREE</span>
            </div>
          </div>
          
          <div className="tool-card bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900/20 dark:to-pink-800/20 rounded-xl p-6 border border-pink-200 dark:border-pink-700">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Project Templates</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Professional project templates and boilerplates for rapid development
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-pink-600">$35/month value</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">FREE</span>
            </div>
          </div>
          
          <div className="tool-card bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 rounded-xl p-6 border border-indigo-200 dark:border-indigo-700">
            <div className="text-4xl mb-4">🏆</div>
            <h3 className="text-xl font-bold mb-3">Portfolio Builder</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create stunning portfolios that impress employers and land interviews
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-indigo-600">$45/month value</span>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">FREE</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 border border-green-200 dark:border-green-700">
            <h3 className="text-2xl font-bold mb-4">Total Value: $225/month</h3>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              That&apos;s $2,700 per year in professional development tools
            </p>
            <div className="text-4xl font-bold text-green-600 mb-2">100% FREE FOREVER</div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No hidden costs • No trial periods • No credit card required
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
