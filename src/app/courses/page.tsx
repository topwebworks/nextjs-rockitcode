import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Courses - RockitCode",
  description: "Browse our comprehensive library of interactive coding courses. Master Python, Web Development, JavaScript, and more!",
};

export default function CoursesPage() {
  return (
    <div className="px-8 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📚 Interactive Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Master coding with our hands-on, project-based courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Python Course */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🐍</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Python Fundamentals
                </h3>
                <span className="text-sm text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded">
                  Beginner
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Master Python from basics to advanced programming concepts with hands-on projects.
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">⏱️ 4h 30m</span>
              <span className="text-sm text-gray-500">🎯 20 lessons</span>
            </div>
            <a 
              href="/python/synchronized" 
              className="block w-full bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Course
            </a>
          </div>

          {/* Web Development Course */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🌐</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Web Development
                </h3>
                <span className="text-sm text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded">
                  Beginner
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Build modern websites with HTML, CSS, and JavaScript fundamentals.
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">⏱️ 6h 15m</span>
              <span className="text-sm text-gray-500">🎯 25 lessons</span>
            </div>
            <a 
              href="/html-css/synchronized" 
              className="block w-full bg-green-600 text-white text-center px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Start Course
            </a>
          </div>

          {/* React Course */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">⚛️</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  React Mastery
                </h3>
                <span className="text-sm text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded">
                  Intermediate
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Build modern React applications with hooks, state management, and best practices.
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">⏱️ 8h 45m</span>
              <span className="text-sm text-gray-500">🎯 30 lessons</span>
            </div>
            <button className="block w-full bg-gray-400 text-white text-center px-4 py-2 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>

          {/* JavaScript Course */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🚀</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Advanced JavaScript
                </h3>
                <span className="text-sm text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded">
                  Advanced
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Deep dive into modern JavaScript, ES6+, async programming, and design patterns.
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">⏱️ 10h 20m</span>
              <span className="text-sm text-gray-500">🎯 35 lessons</span>
            </div>
            <button className="block w-full bg-gray-400 text-white text-center px-4 py-2 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>

          {/* Shopify Development */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🛍️</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Shopify Development
                </h3>
                <span className="text-sm text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded">
                  Intermediate
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Master Liquid templating and build custom Shopify themes and apps.
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">⏱️ 5h 30m</span>
              <span className="text-sm text-gray-500">🎯 18 lessons</span>
            </div>
            <a 
              href="/synchronized-lessons" 
              className="block w-full bg-purple-600 text-white text-center px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Explore Lessons
            </a>
          </div>

          {/* Full Stack Course */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-3">🔧</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Full Stack Development
                </h3>
                <span className="text-sm text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded">
                  Advanced
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Complete web development stack: frontend, backend, databases, and deployment.
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">⏱️ 15h 45m</span>
              <span className="text-sm text-gray-500">🎯 50 lessons</span>
            </div>
            <button className="block w-full bg-gray-400 text-white text-center px-4 py-2 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Join thousands of students learning to code with our interactive platform
          </p>
          <a 
            href="/synchronized-lessons" 
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            Browse All Courses
          </a>
        </div>
      </div>
    </div>
  );
}
