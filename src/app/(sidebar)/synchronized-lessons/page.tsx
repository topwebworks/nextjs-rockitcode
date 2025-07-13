import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Courses - Launch Pad Learning Platform',
  description: 'Browse all available courses and learning paths in the Launch Pad',
}

export default function SynchronizedLessonsPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">📚</div>
        <h1 className="text-3xl font-bold mb-4">All Courses</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Complete library of interactive coding courses and learning paths
        </p>
      </div>

      {/* Course Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Programming Fundamentals */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <div className="text-3xl mb-3">🐍</div>
          <h3 className="text-xl font-semibold mb-3">Python Fundamentals</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Master Python programming from basics to advanced concepts with hands-on projects.
          </p>
          <div className="space-y-2 mb-4 text-sm">
            <div>✓ Variables & Data Types</div>
            <div>✓ Control Structures</div>
            <div>📖 Functions & Modules</div>
            <div>🔒 Object-Oriented Programming</div>
          </div>
          <Link href="/python/synchronized" className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
            Start Learning
          </Link>
        </div>

        {/* Web Development */}
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <div className="text-3xl mb-3">🌐</div>
          <h3 className="text-xl font-semibold mb-3">Web Development</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Build modern websites with HTML, CSS, and JavaScript from scratch to deployment.
          </p>
          <div className="space-y-2 mb-4 text-sm">
            <div>✓ HTML5 Semantic Structure</div>
            <div>📖 CSS3 Grid & Flexbox</div>
            <div>🔒 JavaScript Fundamentals</div>
            <div>🔒 React & Modern Frameworks</div>
          </div>
          <Link href="/html-css/synchronized" className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
            Explore Course
          </Link>
        </div>

        {/* Data Science Track */}
        <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
          <div className="text-3xl mb-3">📊</div>
          <h3 className="text-xl font-semibold mb-3">Data Science</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Analyze data and build machine learning models with Python and popular libraries.
          </p>
          <div className="space-y-2 mb-4 text-sm">
            <div>🔒 NumPy & Pandas</div>
            <div>🔒 Data Visualization</div>
            <div>🔒 Machine Learning</div>
            <div>🔒 Deep Learning Basics</div>
          </div>
          <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed text-sm" disabled>
            Coming Soon
          </button>
        </div>

        {/* Mobile Development */}
        <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
          <div className="text-3xl mb-3">📱</div>
          <h3 className="text-xl font-semibold mb-3">Mobile Development</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Create mobile apps for iOS and Android using React Native and modern tools.
          </p>
          <div className="space-y-2 mb-4 text-sm">
            <div>🔒 React Native Fundamentals</div>
            <div>🔒 Navigation & State</div>
            <div>🔒 Native Device Features</div>
            <div>🔒 App Store Deployment</div>
          </div>
          <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed text-sm" disabled>
            Coming Soon
          </button>
        </div>

        {/* DevOps & Cloud */}
        <div className="bg-cyan-50 dark:bg-cyan-900/20 border border-cyan-200 dark:border-cyan-800 rounded-lg p-6">
          <div className="text-3xl mb-3">☁️</div>
          <h3 className="text-xl font-semibold mb-3">DevOps & Cloud</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Deploy applications and manage infrastructure using modern DevOps practices.
          </p>
          <div className="space-y-2 mb-4 text-sm">
            <div>🔒 Docker & Containers</div>
            <div>🔒 AWS/Azure Fundamentals</div>
            <div>🔒 CI/CD Pipelines</div>
            <div>🔒 Kubernetes Basics</div>
          </div>
          <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed text-sm" disabled>
            Coming Soon
          </button>
        </div>

        {/* Professional Skills */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
          <div className="text-3xl mb-3">🎯</div>
          <h3 className="text-xl font-semibold mb-3">Professional Skills</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
            Essential skills for landing your first developer job and thriving in tech.
          </p>
          <div className="space-y-2 mb-4 text-sm">
            <div>🔒 Git & Version Control</div>
            <div>🔒 Code Review Process</div>
            <div>🔒 Technical Interviews</div>
            <div>🔒 Portfolio Development</div>
          </div>
          <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed text-sm" disabled>
            Coming Soon
          </button>
        </div>
      </div>

      {/* Learning Path Recommendation */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-3">🚀 Recommended Learning Path</h3>
        <p className="mb-4 opacity-90">
          New to programming? Start with Python Fundamentals, then move to Web Development for a complete foundation.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/python/synchronized" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
            1. Start with Python
          </Link>
          <Link href="/html-css/synchronized" className="bg-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors text-sm font-medium">
            2. Learn Web Development
          </Link>
          <span className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium">
            3. Choose Specialization
          </span>
        </div>
      </div>

      {/* Back to Launch Pad */}
      <div className="text-center">
        <Link href="/" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          ← Back to Launch Pad
        </Link>
      </div>
    </div>
  )
}
