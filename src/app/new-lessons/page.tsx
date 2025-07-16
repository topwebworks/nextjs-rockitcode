import Link from 'next/link'

export default function NewLessonsIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🚀 Revolutionary Interactive Lessons
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience the future of coding education - no boring text, just pure interactive gaming!
          </p>
          <div className="bg-green-100 border border-green-300 rounded-lg p-4 inline-block">
            <p className="text-green-800 font-medium">
              ✅ The first 3 lessons have been completely transformed with gaming elements
            </p>
          </div>
        </div>

        {/* Lesson Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Lesson 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white text-center">
              <div className="text-6xl mb-4">🌟</div>
              <h2 className="text-2xl font-bold">Lesson 1</h2>
              <p className="text-purple-100">Welcome to Codeland</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">HTML Adventure</h3>
              <p className="text-gray-600 mb-4">
                Learn HTML through magical quests, code gardens, and castle building. No boring syntax - just pure adventure!
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Live Code Sandboxes</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Code Garden & Castle Builder</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>XP & Achievement System</span>
                </div>
              </div>
              <Link 
                href="/learn/html-css/html-basics"
                className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition-all"
              >
                🚀 Start Adventure
              </Link>
            </div>
          </div>

          {/* Lesson 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-8 text-white text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h2 className="text-2xl font-bold">Lesson 2</h2>
              <p className="text-pink-100">CSS Kingdom</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Royal Design Quest</h3>
              <p className="text-gray-600 mb-4">
                Become a royal CSS artist through color palaces, precision challenges, and masterpiece creation!
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Color Palace Workshop</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Layout Castle Building</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Precision Sniper Training</span>
                </div>
              </div>
              <Link 
                href="/learn/html-css/css-basics"
                className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white text-center py-3 rounded-lg font-bold hover:from-pink-700 hover:to-purple-700 transition-all"
              >
                🎨 Enter Kingdom
              </Link>
            </div>
          </div>

          {/* Lesson 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white text-center">
              <div className="text-6xl mb-4">🧙‍♂️</div>
              <h2 className="text-2xl font-bold">Lesson 3</h2>
              <p className="text-green-100">JavaScript Realm</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Wizard Programming</h3>
              <p className="text-gray-600 mb-4">
                Master JavaScript magic through spell crafting, team collaboration, and time travel debugging!
              </p>
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Spell Laboratory</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Team Coding Arena</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Time Travel Debugging</span>
                </div>
              </div>
              <Link 
                href="/learn/html-css/javascript-realm"
                className="block w-full bg-gradient-to-r from-green-600 to-blue-600 text-white text-center py-3 rounded-lg font-bold hover:from-green-700 hover:to-blue-700 transition-all"
              >
                🧙‍♂️ Enter Realm
              </Link>
            </div>
          </div>
        </div>

        {/* Comparison Section */}
        <div className="bg-white rounded-xl p-8 shadow-lg mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            🎯 Revolutionary Learning Transformation
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-bold text-red-700 mb-4 text-xl">❌ Old Method (Replaced)</h3>
              <ul className="space-y-3 text-red-600">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Read walls of overwhelming text</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Memorize boring syntax rules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Copy-paste dead examples</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Get stuck and give up</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span>Feel overwhelmed and confused</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-700 mb-4 text-xl">✅ New Method (Revolutionary)</h3>
              <ul className="space-y-3 text-green-600">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Learn through interactive gaming</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>See instant visual results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Build real portfolio projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Get immediate help and validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  <span>Feel excited and confident</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Experience the Revolution?</h3>
          <p className="mb-6 text-blue-100">
            Jump directly into any lesson or follow the complete learning journey
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/learn/html-css/html-basics"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors"
            >
              Start With HTML
            </Link>
            <Link 
              href="/learn/html-css/css-basics"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-bold hover:bg-purple-50 transition-colors"
            >
              Jump to CSS
            </Link>
            <Link 
              href="/learn/html-css/javascript-realm"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-green-50 transition-colors"
            >
              Try JavaScript
            </Link>
          </div>
        </div>

        {/* Back to Site */}
        <div className="text-center mt-8">
          <Link 
            href="/"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← Back to Main Site
          </Link>
        </div>
      </div>
    </div>
  )
}
