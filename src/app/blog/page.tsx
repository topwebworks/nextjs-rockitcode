import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog - RockitCode",
  description: "Latest coding tutorials, tips, and industry insights. Stay updated with the latest in web development, Python, JavaScript, and more!",
};

export default function BlogPage() {
  return (
    <div className="px-8 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            📝 RockitCode Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Latest tutorials, tips, and insights from the coding world
          </p>
        </div>

        {/* Featured Post */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-8 mb-8">
          <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
            Featured
          </span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Building Your First Python Web App in 2025
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Learn how to create a modern Python web application using Flask, with step-by-step instructions, 
            best practices, and deployment tips. Perfect for beginners ready to build real projects.
          </p>
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span>📅 January 10, 2025</span>
            <span>⏱️ 8 min read</span>
            <span>🏷️ Python, Web Development</span>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Read Article
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Post 1 */}
          <article className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <span className="inline-block bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded text-xs font-medium">
                Beginner
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              🎯 JavaScript ES6+ Features Every Developer Should Know
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Explore modern JavaScript features like arrow functions, destructuring, promises, and async/await.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>📅 Jan 8, 2025</span>
              <span>⏱️ 6 min</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Read More →
            </button>
          </article>

          {/* Post 2 */}
          <article className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <span className="inline-block bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 px-2 py-1 rounded text-xs font-medium">
                Intermediate
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              🎨 CSS Grid vs Flexbox: When to Use Which?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A comprehensive guide to choosing between CSS Grid and Flexbox for your layout needs.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>📅 Jan 6, 2025</span>
              <span>⏱️ 7 min</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Read More →
            </button>
          </article>

          {/* Post 3 */}
          <article className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <span className="inline-block bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">
                Tutorial
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              🐍 Python Data Analysis with Pandas
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Learn how to analyze and manipulate data using Python's powerful Pandas library.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>📅 Jan 4, 2025</span>
              <span>⏱️ 10 min</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Read More →
            </button>
          </article>

          {/* Post 4 */}
          <article className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <span className="inline-block bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
                Tips
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              ⚡ 10 VS Code Extensions That Will Boost Your Productivity
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Discover essential VS Code extensions that every developer should have in their toolkit.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>📅 Jan 2, 2025</span>
              <span>⏱️ 5 min</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Read More →
            </button>
          </article>

          {/* Post 5 */}
          <article className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <span className="inline-block bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded text-xs font-medium">
                Advanced
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              🔧 Building Scalable React Applications
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Best practices for structuring and scaling React applications for production environments.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>📅 Dec 30, 2024</span>
              <span>⏱️ 12 min</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Read More →
            </button>
          </article>

          {/* Post 6 */}
          <article className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow">
            <div className="mb-4">
              <span className="inline-block bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300 px-2 py-1 rounded text-xs font-medium">
                Career
              </span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              💼 From Beginner to Junior Developer: A Complete Roadmap
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              A step-by-step guide to landing your first developer job, including skills, portfolio, and interview tips.
            </p>
            <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span>📅 Dec 28, 2024</span>
              <span>⏱️ 15 min</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Read More →
            </button>
          </article>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            📧 Stay Updated
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Get the latest tutorials and coding tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
