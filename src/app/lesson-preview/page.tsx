import Link from 'next/link'

export default function LessonPreviewPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            🚀 Revolutionary Learning Experience
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            The first 3 lessons have been transformed from traditional text-heavy instruction 
            into engaging, interactive gaming experiences!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Lesson 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white text-center">
              <div className="text-4xl mb-2">🌟</div>
              <h2 className="text-xl font-bold">Lesson 1</h2>
              <p className="opacity-90">Welcome to Codeland</p>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-2">HTML Gaming Adventure</h3>
              <p className="text-gray-600 text-sm mb-4">
                Learn HTML through interactive gaming, live coding sandboxes, and achievement unlocks.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Live Code Sandboxes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Code Garden Building</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>XP & Achievement System</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-6 text-white text-center">
              <div className="text-4xl mb-2">🎨</div>
              <h2 className="text-xl font-bold">Lesson 2</h2>
              <p className="opacity-90">CSS Kingdom</p>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-2">Royal Styling Adventure</h3>
              <p className="text-gray-600 text-sm mb-4">
                Master CSS through artistic challenges, color palaces, and precision gaming.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Color Palace Workshop</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Layout Castle Building</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Precision Sniper Training</span>
                </div>
              </div>
            </div>
          </div>

          {/* Lesson 3 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-6 text-white text-center">
              <div className="text-4xl mb-2">🧙‍♂️</div>
              <h2 className="text-xl font-bold">Lesson 3</h2>
              <p className="opacity-90">JavaScript Realm</p>
            </div>
            <div className="p-6">
              <h3 className="font-bold text-gray-800 mb-2">Wizard Programming Magic</h3>
              <p className="text-gray-600 text-sm mb-4">
                Become a JavaScript wizard through spell crafting and team collaboration.
              </p>
              <div className="space-y-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Spell Laboratory</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Team Coding Arena</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Time Travel Debugging</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            🎯 Revolutionary Learning Transformation
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="font-bold text-red-700 mb-4">❌ Traditional Method (Replaced)</h3>
              <ul className="space-y-2 text-red-600">
                <li>• Walls of text to read</li>
                <li>• Memorize syntax rules</li>
                <li>• Copy-paste examples</li>
                <li>• Struggle with errors alone</li>
                <li>• Feel overwhelmed and confused</li>
                <li>• Low engagement and retention</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="font-bold text-green-700 mb-4">✅ Interactive Gaming Method (New)</h3>
              <ul className="space-y-2 text-green-600">
                <li>• Learn through playing and creating</li>
                <li>• See instant visual feedback</li>
                <li>• Build real portfolio projects</li>
                <li>• Get immediate help and validation</li>
                <li>• Feel excited and confident</li>
                <li>• High engagement and skill retention</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-6 rounded-xl">
            <h3 className="text-xl font-bold mb-2">🎊 Ready to Experience the Revolution?</h3>
            <p className="mb-4">
              All 3 lessons now feature the new interactive gaming approach that makes learning 
              coding feel like an adventure instead of a chore!
            </p>
            <div className="space-y-2 text-sm">
              <p>📍 Files updated:</p>
              <div className="font-mono bg-black bg-opacity-20 rounded p-2">
                <div>• src/data/rockitcode-lessons/html-css/html-basics.mdx</div>
                <div>• src/data/rockitcode-lessons/html-css/css-basics.mdx</div>
                <div>• src/data/rockitcode-lessons/html-css/multi-page-navigation.mdx</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Return to Main Site
          </Link>
        </div>
      </div>
    </div>
  )
}
