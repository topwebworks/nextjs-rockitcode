import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Web Development - HTML & CSS - Launch Pad',
  description: 'Master web development with HTML, CSS, and JavaScript through interactive lessons',
}

export default function HtmlCssSynchronizedPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🌐</div>
        <h1 className="text-3xl font-bold mb-4">Web Development</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Build modern websites with HTML, CSS, and JavaScript
        </p>
      </div>

      {/* Course Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Course Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 border rounded-lg p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Learning Path</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <div className="font-medium">HTML Foundations</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Structure, elements, semantic markup</div>
                  </div>
                </div>
                <div className="text-green-600 font-medium">✓ Complete</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <div className="font-medium">CSS Styling & Layout</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Flexbox, Grid, responsive design</div>
                  </div>
                </div>
                <div className="text-blue-600 font-medium">📖 Current</div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg opacity-60">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <div className="font-medium">JavaScript Interactivity</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">DOM manipulation, events, APIs</div>
                  </div>
                </div>
                <div className="text-gray-500 font-medium">🔒 Locked</div>
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="bg-white dark:bg-gray-800 border rounded-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="ml-4 text-sm text-gray-600 dark:text-gray-400">Live Preview</div>
              </div>
            </div>
            <div className="p-6">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-blue-600 mb-2">Welcome to My Portfolio</h3>
                <p className="text-gray-600 dark:text-gray-400">Built with HTML, CSS, and passion!</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">🎨</div>
                  <div className="font-semibold">Design</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Modern & Clean</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">📱</div>
                  <div className="font-semibold">Responsive</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Works Everywhere</div>
                </div>
                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                  <div className="text-2xl mb-2">⚡</div>
                  <div className="font-semibold">Fast</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Optimized Code</div>
                </div>
              </div>
              
              <div className="text-center">
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🎯 Mission Objectives</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Master HTML structure</li>
              <li>📝 Build responsive layouts</li>
              <li>🎨 Advanced CSS techniques</li>
              <li>🚀 Deploy live websites</li>
            </ul>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">🛠️ Tools & Technologies</h3>
            <ul className="space-y-2 text-sm">
              <li>🌐 HTML5 semantic elements</li>
              <li>🎨 CSS3 Grid & Flexbox</li>
              <li>📱 Responsive design patterns</li>
              <li>⚡ Modern CSS features</li>
            </ul>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">⚡ Demo Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
              This showcases the course interface. Full interactive coding environment available after GitHub integration.
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
