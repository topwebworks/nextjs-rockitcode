import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'All Courses - Launch Pad Learning Platform',
  description: 'Browse all available courses and learning paths in the Launch Pad',
}

export default function SynchronizedLessonsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-light tracking-wide text-white">
            Learning Library
          </h1>
          <p className="max-w-3xl mx-auto mb-8 text-xl font-light leading-relaxed text-slate-300">
            Complete library of interactive coding courses and learning paths
          </p>
          <div className="flex justify-center">
            <div className="px-6 py-3 border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700/50">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-slate-300">Professional Development Courses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Course Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          
          {/* Programming Fundamentals */}
          <div className="border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-blue-500/20">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Python Fundamentals</h3>
            <p className="text-slate-400 mb-4 text-sm">
              Master Python programming from basics to advanced concepts with hands-on projects.
            </p>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Variables & Data Types
              </div>
              <div className="flex items-center gap-2 text-green-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Control Structures
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Functions & Modules
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Object-Oriented Programming
              </div>
            </div>
            <Link href="/python/synchronized" className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium">
              Start Learning
            </Link>
          </div>

          {/* Web Development */}
          <div className="border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-green-500/20">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Web Development</h3>
            <p className="text-slate-400 mb-4 text-sm">
              Build modern websites with HTML, CSS, and JavaScript from scratch to deployment.
            </p>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-green-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                HTML5 Semantic Structure
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                CSS3 Grid & Flexbox
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                JavaScript Fundamentals
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                React & Modern Frameworks
              </div>
            </div>
            <Link href="/html-css/synchronized" className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium">
              Explore Course
            </Link>
          </div>

          {/* Data Science Track */}
          <div className="border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-purple-500/20">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Data Science</h3>
            <p className="text-slate-400 mb-4 text-sm">
              Analyze data and build machine learning models with Python and popular libraries.
            </p>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                NumPy & Pandas
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Data Visualization
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Machine Learning
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Deep Learning Basics
              </div>
            </div>
            <button className="bg-slate-600 text-slate-400 px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium" disabled>
              Coming Soon
            </button>
          </div>

          {/* Mobile Development */}
          <div className="border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-orange-500/20">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Mobile Development</h3>
            <p className="text-slate-400 mb-4 text-sm">
              Create mobile apps for iOS and Android using React Native and modern tools.
            </p>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                React Native Fundamentals
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Navigation & State
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Native Device Features
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                App Store Deployment
              </div>
            </div>
            <button className="bg-slate-600 text-slate-400 px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium" disabled>
              Coming Soon
            </button>
          </div>

          {/* DevOps & Cloud */}
          <div className="border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-cyan-500/20">
              <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">DevOps & Cloud</h3>
            <p className="text-slate-400 mb-4 text-sm">
              Deploy applications and manage infrastructure using modern DevOps practices.
            </p>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Docker & Containers
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                AWS/Azure Fundamentals
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                CI/CD Pipelines
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Kubernetes Basics
              </div>
            </div>
            <button className="bg-slate-600 text-slate-400 px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium" disabled>
              Coming Soon
            </button>
          </div>

          {/* Professional Skills */}
          <div className="border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 p-6 hover:bg-slate-800/40 transition-all duration-300">
            <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-yellow-500/20">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">Professional Skills</h3>
            <p className="text-slate-400 mb-4 text-sm">
              Essential skills for landing your first developer job and thriving in tech.
            </p>
            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Git & Version Control
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Code Review Process
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Technical Interviews
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Portfolio Development
              </div>
            </div>
            <button className="bg-slate-600 text-slate-400 px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium" disabled>
              Coming Soon
            </button>
          </div>
        </div>

        {/* Learning Path Recommendation */}
        <div className="border bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl border-slate-700/50 p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h3 className="text-xl font-semibold text-white">Recommended Learning Path</h3>
          </div>
          <p className="mb-6 text-slate-300">
            New to programming? Start with Python Fundamentals, then move to Web Development for a complete foundation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/python/synchronized" className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium">
              1. Start with Python
            </Link>
            <Link href="/html-css/synchronized" className="bg-slate-700/50 hover:bg-slate-700 text-white px-6 py-3 rounded-lg transition-all duration-300 text-sm font-medium backdrop-blur-sm border border-slate-600">
              2. Learn Web Development
            </Link>
            <span className="bg-slate-800/50 text-slate-400 px-6 py-3 rounded-lg text-sm font-medium backdrop-blur-sm border border-slate-700">
              3. Choose Specialization
            </span>
          </div>
        </div>

        {/* Back to Launch Pad */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 font-medium">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Launch Pad
          </Link>
        </div>
      </div>
    </div>
  )
}
