import Link from 'next/link'
import { StaticLaunchPadHero } from '@/components/static-launch-pad-hero'
import { AuthenticatedDashboard } from '@/components/authenticated-dashboard'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'RockitCode Launch Pad - Mission Control for Professional Developers',
  description: 'Transform into a professional developer with our mission-driven learning platform. AI assistance, live deployment, and $200k+ worth of tools - completely free forever.',
};

// Force static generation for better performance
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      {/* Static Hero Section - No JavaScript Required */}
      <StaticLaunchPadHero />
      
      {/* Dynamic Authentication Island - Lazy Loaded */}
      <AuthenticatedDashboard />
      
      {/* Static Course Preview Section */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">World-Class Learning Platform</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Interactive lessons, AI assistance, and real project building
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Course Cards - Static Content */}
            <div className="course-card bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6">
              <div className="text-4xl mb-4">💻</div>
              <h3 className="text-xl font-bold mb-3">HTML & CSS Fundamentals</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Master the building blocks of the web with interactive lessons and real projects.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-600">Free Forever</span>
                <Link 
                  href="/courses/html-css-fundamentals" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            </div>
            
            <div className="course-card bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">JavaScript Mastery</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Learn modern JavaScript with interactive coding exercises and real-world projects.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-green-600">Free Forever</span>
                <Link 
                  href="/courses/javascript-mastery" 
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            </div>
            
            <div className="course-card bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Full-Stack Projects</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Build production-ready applications with modern frameworks and deployment.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-purple-600">Free Forever</span>
                <Link 
                  href="/courses/full-stack-projects" 
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Static Features Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Professional tools and resources worth $200k+ — completely free
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="feature-card text-center p-6">
              <div className="text-3xl mb-3">🤖</div>
              <h3 className="font-bold mb-2">AI Code Assistant</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get instant help with coding problems and explanations
              </p>
            </div>
            
            <div className="feature-card text-center p-6">
              <div className="text-3xl mb-3">💻</div>
              <h3 className="font-bold mb-2">Live Code Editor</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Write and test code directly in your browser
              </p>
            </div>
            
            <div className="feature-card text-center p-6">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold mb-2">Progress Tracking</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Monitor your learning journey and achievements
              </p>
            </div>
            
            <div className="feature-card text-center p-6">
              <div className="text-3xl mb-3">🏆</div>
              <h3 className="font-bold mb-2">Portfolio Builder</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Showcase your projects to potential employers
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
