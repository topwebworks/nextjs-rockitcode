import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Portfolio Project - Intermediate Level | RockitCode',
  description: 'Build an interactive React portfolio with TypeScript, dark mode, animations, and modern deployment. The perfect evolution from your beginner portfolio.',
}

export default function PortfolioIntermediate() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Project Header */}
        <div className="mb-12">
          <nav className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <Link href="/launch-pad" className="hover:text-blue-600">Launch Pad</Link>
            <span className="mx-2">→</span>
            <Link href="/launch-pad?career=frontend" className="hover:text-blue-600">Frontend Developer</Link>
            <span className="mx-2">→</span>
            <span className="text-gray-900 dark:text-white">Portfolio Project</span>
          </nav>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              Intermediate Level
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm font-medium">
              Portfolio Evolution
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive React Portfolio
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl">
            Transform your beginner portfolio into a modern React application. Add interactivity, dark mode, animations, and professional deployment. Perfect evolution of your existing work!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Duration</div>
              <div className="text-lg font-semibold">4-6 weeks</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Technologies</div>
              <div className="text-lg font-semibold">React, TypeScript, Tailwind</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-sm text-gray-500 dark:text-gray-400">Deployment</div>
              <div className="text-lg font-semibold">Vercel/Netlify</div>
            </div>
          </div>

          {/* Prerequisites */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 mb-8">
            <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">📋 Prerequisites</h3>
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Complete the <Link href="/projects/portfolio/beginner" className="underline font-medium">Beginner Portfolio Project</Link> first. 
              You'll migrate your existing portfolio to React - no starting from scratch!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors opacity-50 cursor-not-allowed"
              disabled
            >
              🔒 Coming Soon
            </button>
            <a 
              href="https://github.com/rockitcode-learning/portfolio-intermediate-template"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors opacity-50"
              target="_blank"
              rel="noopener noreferrer"
            >
              📁 Preview Repository
            </a>
            <a 
              href="https://portfolio-demo-intermediate.vercel.app"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              👀 View Demo
            </a>
          </div>
        </div>

        {/* Enhanced Features */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">🚀 Enhanced Features</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-600">New Interactive Features</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Smooth scroll navigation with active highlighting
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Filterable project gallery by technology
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Dark/light mode toggle with persistence
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Contact form with JavaScript validation
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      Loading animations and micro-interactions
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-purple-600">Technical Upgrades</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      React.js component architecture
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      TypeScript for type safety
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Tailwind CSS utility framework
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      Framer Motion animations
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      GitHub API integration
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Migration Strategy */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h2 className="text-2xl font-bold mb-6">🔄 Smart Migration Strategy</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Phase 1: Foundation Migration</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Convert your HTML/CSS portfolio to React components
                  </p>
                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg text-sm">
                    <strong>Smart Approach:</strong> We'll break your existing portfolio into React components, 
                    keeping the same design while adding component reusability.
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Phase 2: Interactivity Layer</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Add dynamic features without changing your design
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm">
                    <strong>Enhancement Focus:</strong> Dark mode, smooth scrolling, project filtering, 
                    and form validation - all additions that enhance rather than replace.
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold mb-2">Phase 3: Professional Polish</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Add animations, optimization, and modern deployment
                  </p>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg text-sm">
                    <strong>Professional Touches:</strong> Framer Motion animations, TypeScript type safety, 
                    performance optimization, and Vercel deployment with custom domain.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Tracker */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">📊 Your Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Beginner Level</span>
                  <span className="text-sm font-medium text-green-600">Complete ✓</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Intermediate Level</span>
                  <span className="text-sm font-medium text-blue-600">In Progress</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Advanced Level</span>
                  <span className="text-sm font-medium text-gray-400">Locked</span>
                </div>
              </div>
            </div>

            {/* Back to Beginner */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">🏗️ Need the Foundation?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Start with the beginner portfolio to build your HTML/CSS foundation first.
              </p>
              <Link 
                href="/projects/portfolio/beginner"
                className="block w-full bg-green-600 text-white text-center py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Start Beginner Level
              </Link>
            </div>

            {/* What's Next */}
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold mb-4">🚀 What's Next?</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                After completing this level, advance to the full-stack portfolio with database integration.
              </p>
              <Link 
                href="/projects/portfolio/advanced"
                className="block w-full bg-purple-600 text-white text-center py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                Preview Advanced Level
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
