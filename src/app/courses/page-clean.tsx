import Link from 'next/link'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Courses - RockitCode Learning Platform',
  description: 'Master web development with our interactive courses. HTML, CSS, JavaScript, and full-stack projects.',
};

// Force static generation for better Vercel performance
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export default function CoursesPage() {
  return (
    <div className="px-8 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            📚 Interactive Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Master coding with our hands-on, project-based courses
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Python Course */}
          <div className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <span className="mr-3 text-3xl">🐍</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Python Fundamentals
                </h3>
                <span className="px-2 py-1 text-sm text-green-600 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                  Beginner
                </span>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Master Python from basics to advanced programming concepts with hands-on projects.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">⏱️ 4h 30m</span>
              <span className="text-sm text-gray-500">🎯 20 lessons</span>
            </div>
            <a 
              href="/python/synchronized" 
              className="block w-full px-4 py-2 text-center text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Start Learning
            </a>
          </div>

          {/* HTML & CSS Course */}
          <div className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <span className="mr-3 text-3xl">🎨</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  HTML & CSS
                </h3>
                <span className="px-2 py-1 text-sm text-green-600 bg-green-100 rounded dark:bg-green-900 dark:text-green-300">
                  Beginner
                </span>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Learn the foundation of web development with HTML structure and CSS styling.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">⏱️ 3h 45m</span>
              <span className="text-sm text-gray-500">🎯 15 lessons</span>
            </div>
            <a 
              href="/html-css" 
              className="block w-full px-4 py-2 text-center text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Start Learning
            </a>
          </div>

          {/* React Course */}
          <div className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <span className="mr-3 text-3xl">⚛️</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  React Development
                </h3>
                <span className="px-2 py-1 text-sm text-yellow-600 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300">
                  Intermediate
                </span>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Build modern user interfaces with React hooks, components, and state management.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">⏱️ 8h 45m</span>
              <span className="text-sm text-gray-500">🎯 30 lessons</span>
            </div>
            <button className="block w-full px-4 py-2 text-center text-white bg-gray-400 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>

          {/* JavaScript Course */}
          <div className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <span className="mr-3 text-3xl">🚀</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Advanced JavaScript
                </h3>
                <span className="px-2 py-1 text-sm text-red-600 bg-red-100 rounded dark:bg-red-900 dark:text-red-300">
                  Advanced
                </span>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Deep dive into modern JavaScript, ES6+, async programming, and design patterns.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">⏱️ 10h 20m</span>
              <span className="text-sm text-gray-500">🎯 35 lessons</span>
            </div>
            <button className="block w-full px-4 py-2 text-center text-white bg-gray-400 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>

          {/* Shopify Development */}
          <div className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <span className="mr-3 text-3xl">🛍️</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Shopify Development
                </h3>
                <span className="px-2 py-1 text-sm text-yellow-600 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300">
                  Intermediate
                </span>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Master Liquid templating and build custom Shopify themes and apps.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">⏱️ 5h 30m</span>
              <span className="text-sm text-gray-500">🎯 18 lessons</span>
            </div>
            <a 
              href="/synchronized-lessons" 
              className="block w-full px-4 py-2 text-center text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
            >
              Explore Lessons
            </a>
          </div>

          {/* Full Stack Course */}
          <div className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 hover:shadow-xl">
            <div className="flex items-center mb-4">
              <span className="mr-3 text-3xl">🌐</span>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Full Stack Development
                </h3>
                <span className="px-2 py-1 text-sm text-red-600 bg-red-100 rounded dark:bg-red-900 dark:text-red-300">
                  Advanced
                </span>
              </div>
            </div>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Complete web development stack: frontend, backend, databases, and deployment.
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">⏱️ 15h 45m</span>
              <span className="text-sm text-gray-500">🎯 50 lessons</span>
            </div>
            <button className="block w-full px-4 py-2 text-center text-white bg-gray-400 rounded-lg cursor-not-allowed">
              Coming Soon
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="p-8 mt-12 text-center rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Ready to Start Your Coding Journey?
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            Join thousands of students learning to code with our interactive platform
          </p>
          <a 
            href="/synchronized-lessons" 
            className="inline-block px-8 py-3 text-white transition-all rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            Browse All Courses
          </a>
        </div>
      </div>
    </div>
  );
}
