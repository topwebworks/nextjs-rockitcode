import Link from 'next/link'

export default function CSSBasicsPreview() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-xl p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">🎨 CSS Basics: Making Your Website Beautiful</h1>
        <p className="text-xl opacity-90">
          Transform your plain HTML into a stunning, professional-looking website with CSS styling!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">📚 What You'll Learn</h2>
          <ul className="space-y-2 text-gray-600">
            <li>✅ CSS fundamentals and how it works with HTML</li>
            <li>✅ Colors, fonts, and typography</li>
            <li>✅ Layout and spacing with the CSS Box Model</li>
            <li>✅ CSS selectors and targeting elements</li>
            <li>✅ Professional styling techniques</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">🎯 Portfolio Evolution</h2>
          <p className="text-gray-600 mb-4">
            Build upon your HTML foundation from Lesson 1 and transform it into a beautiful, 
            professional portfolio with:
          </p>
          <ul className="space-y-1 text-gray-600">
            <li>• Gradient header with perfect typography</li>
            <li>• Modern card-based layout</li>
            <li>• Professional color scheme</li>
            <li>• Hover effects and transitions</li>
          </ul>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">🚀 Interactive Features</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">💻</span>
            </div>
            <h3 className="font-semibold">Live Code Examples</h3>
            <p className="text-sm text-gray-600">Step-by-step CSS examples with explanations</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="font-semibold">CSS Playground</h3>
            <p className="text-sm text-gray-600">Interactive environment to experiment with styles</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="font-semibold">Hands-on Exercises</h3>
            <p className="text-sm text-gray-600">Practice styling your own portfolio sections</p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link 
          href="/foundation/css-basics"
          className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          Start CSS Lesson 🎨
        </Link>
      </div>

      <div className="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
        <h3 className="font-semibold text-yellow-800 mb-2">💡 Living Portfolio Approach</h3>
        <p className="text-yellow-700">
          This lesson continues building your portfolio from Lesson 1. Instead of throwaway projects, 
          you'll enhance the same portfolio that will evolve throughout your entire learning journey!
        </p>
      </div>
    </div>
  )
}
