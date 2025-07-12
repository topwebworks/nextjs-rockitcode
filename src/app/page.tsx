import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RockitCode - Interactive Coding Platform",
  description: "Learn to code with interactive courses, synchronized video lessons, and hands-on projects. Master Python, Web Development, and more!",
};

export default function HomePage() {
  return (
    <div className="px-8 py-6">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center py-20">
        <div className="mb-6">
          <span className="text-6xl mb-4 block">🚀</span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Welcome to <span className="text-blue-600">RockitCode</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Rock your IT skills with solid programming foundations and rocket-fast career growth. 
            Master coding through interactive courses, synchronized video lessons, and hands-on projects that launch your tech career!
          </p>
        </div>

        {/* Quick Start Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">🐍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Python Fundamentals
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Start with Python basics and build your programming foundation
            </p>
            <a 
              href="/python/synchronized" 
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Learning
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Web Development
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Build modern websites with HTML, CSS, and JavaScript
            </p>
            <a 
              href="/html-css/synchronized" 
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Explore Course
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-3xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              All Courses
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Browse our complete library of interactive coding courses
            </p>
            <a 
              href="/synchronized-lessons" 
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              View All
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">
            Why Choose RockitCode?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎥</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Synchronized Learning
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Code syncs with video lessons for seamless learning
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Real Code Editor
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Write and run code in a full-featured VSCode editor
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Instant Execution
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                See your code results immediately with live output
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Interactive Projects
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Build real applications as you learn
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
