import type { Metadata } from "next";
import { renderIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: "Blog - RockitCode",
  description: "Latest coding tutorials, tips, and industry insights. Stay updated with the latest in web development, Python, JavaScript, and more!",
};

// Force static generation for better Vercel performance
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour for blog content

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Subtle Space Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        {/* Subtle Stars */}
        <div className="absolute w-1 h-1 rounded-full top-20 left-20 bg-white/60"></div>
        <div className="absolute w-1 h-1 rounded-full top-40 right-32 bg-blue-200/40"></div>
        <div className="absolute top-64 left-1/3 w-0.5 h-0.5 bg-white/50 rounded-full"></div>
        <div className="absolute w-1 h-1 rounded-full bottom-40 right-20 bg-white/30"></div>
        <div className="absolute bottom-64 left-16 w-0.5 h-0.5 bg-blue-100/40 rounded-full"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Professional Blog Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {renderIcon('document', 'w-16 h-16 text-blue-400')}
              <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
            </div>
          </div>
          <h1 className="text-5xl font-light mb-6 text-white tracking-wide">
            Developer Knowledge Base
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
            Latest tutorials, tips, and insights from the coding world
          </p>
        </div>

        {/* Featured Post */}
        <div className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] rounded-2xl p-8 mb-12 hover:bg-white/[0.12] transition-all duration-300 group">
          <div className="flex items-center gap-3 mb-6">
            {renderIcon('star', 'w-5 h-5 text-yellow-400')}
            <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
              Featured
            </span>
          </div>
          <h2 className="text-3xl font-light text-white mb-4 group-hover:text-blue-300 transition-colors">
            Building Your First Python Web App in 2025
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Learn how to create a modern Python web application using Flask, with step-by-step instructions, 
            best practices, and deployment tips. Perfect for beginners ready to build real projects.
          </p>
          <div className="flex items-center gap-6 text-sm text-slate-400 mb-6">
            <div className="flex items-center gap-2">
              {renderIcon('clock', 'w-4 h-4')}
              <span>January 10, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              {renderIcon('book', 'w-4 h-4')}
              <span>8 min read</span>
            </div>
            <div className="flex items-center gap-2">
              {renderIcon('code', 'w-4 h-4')}
              <span>Python, Web Development</span>
            </div>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium">
            Read Article
          </button>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Post 1 */}
          <article className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl p-6 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 group">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Beginner
              </span>
            </div>
            <h3 className="text-xl font-light text-white mb-3 group-hover:text-blue-300 transition-colors">
              JavaScript ES6+ Features Every Developer Should Know
            </h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              Explore modern JavaScript features like arrow functions, destructuring, promises, and async/await.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
              <div className="flex items-center gap-1">
                {renderIcon('clock', 'w-3 h-3')}
                <span>Jan 8, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                {renderIcon('book', 'w-3 h-3')}
                <span>6 min</span>
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
              Read More →
            </button>
          </article>

          {/* Post 2 */}
          <article className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl p-6 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 group">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Intermediate
              </span>
            </div>
            <h3 className="text-xl font-light text-white mb-3 group-hover:text-blue-300 transition-colors">
              CSS Grid vs Flexbox: When to Use Which?
            </h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              A comprehensive guide to choosing between CSS Grid and Flexbox for your layout needs.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
              <div className="flex items-center gap-1">
                {renderIcon('clock', 'w-3 h-3')}
                <span>Jan 6, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                {renderIcon('book', 'w-3 h-3')}
                <span>7 min</span>
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
              Read More →
            </button>
          </article>

          {/* Post 3 */}
          <article className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl p-6 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 group">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-purple-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Tutorial
              </span>
            </div>
            <h3 className="text-xl font-light text-white mb-3 group-hover:text-blue-300 transition-colors">
              Python Data Analysis with Pandas
            </h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              Learn how to analyze and manipulate data using Python's powerful Pandas library.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
              <div className="flex items-center gap-1">
                {renderIcon('clock', 'w-3 h-3')}
                <span>Jan 4, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                {renderIcon('book', 'w-3 h-3')}
                <span>10 min</span>
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
              Read More →
            </button>
          </article>

          {/* Post 4 */}
          <article className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl p-6 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 group">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-blue-400 to-cyan-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Tips
              </span>
            </div>
            <h3 className="text-xl font-light text-white mb-3 group-hover:text-blue-300 transition-colors">
              10 VS Code Extensions That Will Boost Your Productivity
            </h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              Discover essential VS Code extensions that every developer should have in their toolkit.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
              <div className="flex items-center gap-1">
                {renderIcon('clock', 'w-3 h-3')}
                <span>Jan 2, 2025</span>
              </div>
              <div className="flex items-center gap-1">
                {renderIcon('book', 'w-3 h-3')}
                <span>5 min</span>
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
              Read More →
            </button>
          </article>

          {/* Post 5 */}
          <article className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl p-6 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 group">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-red-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Advanced
              </span>
            </div>
            <h3 className="text-xl font-light text-white mb-3 group-hover:text-blue-300 transition-colors">
              Building Scalable React Applications
            </h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              Best practices for structuring and scaling React applications for production environments.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
              <div className="flex items-center gap-1">
                {renderIcon('clock', 'w-3 h-3')}
                <span>Dec 30, 2024</span>
              </div>
              <div className="flex items-center gap-1">
                {renderIcon('book', 'w-3 h-3')}
                <span>12 min</span>
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
              Read More →
            </button>
          </article>

          {/* Post 6 */}
          <article className="backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl p-6 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 group">
            <div className="mb-4">
              <span className="inline-block bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Career
              </span>
            </div>
            <h3 className="text-xl font-light text-white mb-3 group-hover:text-blue-300 transition-colors">
              From Beginner to Junior Developer: A Complete Roadmap
            </h3>
            <p className="text-slate-300 mb-4 text-sm leading-relaxed">
              A step-by-step guide to landing your first developer job, including skills, portfolio, and interview tips.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
              <div className="flex items-center gap-1">
                {renderIcon('clock', 'w-3 h-3')}
                <span>Dec 28, 2024</span>
              </div>
              <div className="flex items-center gap-1">
                {renderIcon('book', 'w-3 h-3')}
                <span>15 min</span>
              </div>
            </div>
            <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
              Read More →
            </button>
          </article>
        </div>

        {/* Newsletter Signup */}
        <div className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] rounded-2xl p-8 text-center">
          <div className="flex justify-center mb-4">
            {renderIcon('heart', 'w-8 h-8 text-pink-400')}
          </div>
          <h2 className="text-2xl font-light text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Get the latest tutorials and coding tips delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-white/[0.1] rounded-lg bg-white/[0.05] backdrop-blur-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 transition-colors"
            />
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
