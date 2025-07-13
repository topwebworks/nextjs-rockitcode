'use client'

import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'

export function ComprehensiveLaunchPad() {
  const { data: session, status } = useSession()
  
  // Progress tracking state
  const [progressData, setProgressData] = useState({
    studentPackActivated: false,
    toolsActivated: 0,
    coursesStarted: 0,
    projectsCompleted: 0,
    interviewPrepStarted: false
  })

  // Load progress from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem('launchpad-progress')
      if (savedProgress) {
        setProgressData(JSON.parse(savedProgress))
      }
    }
  }, [])

  // Save progress to localStorage when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('launchpad-progress', JSON.stringify(progressData))
    }
  }, [progressData])

  const updateProgress = (updates: Partial<typeof progressData>) => {
    setProgressData(prev => ({ ...prev, ...updates }))
  }

  // Calculate overall progress
  const calculateProgress = () => {
    let completedTasks = 0
    const totalTasks = 5
    
    if (progressData.studentPackActivated) completedTasks++
    if (progressData.toolsActivated >= 3) completedTasks++
    if (progressData.coursesStarted >= 1) completedTasks++
    if (progressData.projectsCompleted >= 1) completedTasks++
    if (progressData.interviewPrepStarted) completedTasks++
    
    return Math.round((completedTasks / totalTasks) * 100)
  }

  const overallProgress = calculateProgress()

  return (
    <div className="comprehensive-launch-pad max-w-6xl mx-auto p-6">
      {/* Mission Control Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🚀</div>
        <h1 className="text-4xl font-bold mb-4">Launch Pad Mission Control</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Your guided transformation to professional developer status
        </p>
        
        {/* Quick Test Progress */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <div className="text-center mb-3">
            <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Mission Progress</div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500" style={{ width: `${overallProgress}%` }}></div>
          </div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            {progressData.studentPackActivated ? '1 of 5 mission phases complete' : '0 of 5 mission phases complete'}
          </div>
        </div>
      </div>

      {/* Enhanced Stats with Progress */}
      <div className="stats-grid grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-card bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">${progressData.studentPackActivated ? '200k+' : '0'}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tools Unlocked</div>
        </div>
        <div className="stat-card bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{progressData.toolsActivated}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tools Active</div>
        </div>
        <div className="stat-card bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{progressData.coursesStarted}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Courses Started</div>
        </div>
        <div className="stat-card bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{progressData.projectsCompleted}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
        </div>
      </div>

      {/* START HERE - Clear Call to Action */}
      <div className="start-here bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg p-6 mb-8">
        <div className="text-center">
          {!session ? (
            <>
              <h3 className="text-2xl font-bold mb-2">👋 START HERE - Your First Mission</h3>
              <p className="text-lg mb-4 opacity-90">
                Connect your GitHub account to unlock professional developer tools
              </p>
              <button 
                onClick={() => signIn('github', { callbackUrl: '/' })}
                className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🔗 Connect GitHub Account
              </button>
              <div className="text-sm mt-3 opacity-75">
                This connects you to the same tools used at top tech companies
              </div>
            </>
          ) : (
            <>
              <h3 className="text-2xl font-bold mb-2">🎯 Mission Active - Welcome Back!</h3>
              <div className="flex items-center justify-center space-x-3 mb-4">
                {session.user.image && (
                  <img 
                    src={session.user.image} 
                    alt={session.user.name || 'User'} 
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                )}
                <div className="text-left">
                  <div className="text-lg font-semibold">{session.user.name}</div>
                  <div className="text-sm opacity-75">GitHub: @{session.user.login}</div>
                </div>
              </div>
              <Link 
                href="/launch-sequence"
                className="inline-block px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                🚀 Continue Mission: Student Pack Activation
              </Link>
              <div className="text-sm mt-3 opacity-75">
                {progressData.studentPackActivated 
                  ? `Student Pack Activated ✅ • ${progressData.toolsActivated} tools active`
                  : 'Ready for Student Pack activation • $200k+ value waiting'
                }
              </div>
            </>
          )}
        </div>
      </div>

      {/* First Lesson - Mission Control Setup */}
      {session && progressData.studentPackActivated && (
        <div className="first-lesson bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
          <div className="text-center">
            <div className="text-4xl mb-3">🚀</div>
            <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-3">
              Ready for Your First Lesson!
            </h3>
            <p className="text-green-700 dark:text-green-300 mb-4 max-w-2xl mx-auto">
              Now that your Student Pack is activated, start with <strong>Mission Control Setup</strong> - 
              an interactive lesson that will guide you through setting up your professional developer environment.
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4 border border-green-200 dark:border-green-700">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="font-semibold text-gray-900 dark:text-white">Week 1: Mission Control Setup</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Interactive lesson • 90-120 minutes • 7 hands-on labs</div>
                  <div className="text-xs text-green-600 dark:text-green-400 mt-1">✨ Interactive with progress tracking</div>
                </div>
                <Link 
                  href="/mission-control-setup"
                  className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
                >
                  Start Lesson →
                </Link>
              </div>
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              🎯 You'll set up GitHub, VS Code, and deploy your first live website
            </div>
          </div>
        </div>
      )}

      {/* Mission Command Center */}
      <div className="command-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <span>🎛️</span>
          <span>Mission Command Center</span>
          {session && <span className="text-sm text-green-500 font-normal">● Active</span>}
          {!session && <span className="text-sm text-gray-500 font-normal">(Available after GitHub connection)</span>}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`command-card border rounded-lg p-4 text-center transition-all ${
            session ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 hover:border-blue-300' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-50'
          }`}>
            <div className="text-2xl mb-2">🚀</div>
            <div className={`font-semibold ${session ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
              Student Pack Activation
            </div>
            <div className={`text-sm ${session ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-500'}`}>
              {session ? 
                (progressData.studentPackActivated ? 'Complete ✅' : 'Ready for activation') :
                'GitHub OAuth + $200k tools'
              }
            </div>
            {session && (
              <Link href="/launch-sequence" className="text-xs mt-2 text-blue-500 hover:text-blue-600 underline">
                → Launch Sequence
              </Link>
            )}
            {!session && <div className="text-xs mt-2 text-gray-400">🔒 Requires GitHub connection</div>}
          </div>
          
          <div className={`command-card border rounded-lg p-4 text-center transition-all ${
            session && progressData.studentPackActivated ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 hover:border-green-300' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-50'
          }`}>
            <div className="text-2xl mb-2">🎯</div>
            <div className={`font-semibold ${session && progressData.studentPackActivated ? 'text-green-700 dark:text-green-300' : 'text-gray-600 dark:text-gray-400'}`}>
              Learning Missions
            </div>
            <div className={`text-sm ${session && progressData.studentPackActivated ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-500'}`}>
              {session && progressData.studentPackActivated ? 
                `${progressData.coursesStarted} courses started` :
                'HTML/CSS, JavaScript, Python'
              }
            </div>
            {session && progressData.studentPackActivated && (
              <Link href="/mission-control-setup" className="text-xs mt-2 text-green-500 hover:text-green-600 underline">
                → Start Mission Control Setup
              </Link>
            )}
            {(!session || !progressData.studentPackActivated) && (
              <div className="text-xs mt-2 text-gray-400">🔒 Complete Student Pack first</div>
            )}
          </div>
          
          <div className={`command-card border rounded-lg p-4 text-center transition-all ${
            session && progressData.coursesStarted > 0 ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 hover:border-purple-300' : 'bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 opacity-50'
          }`}>
            <div className="text-2xl mb-2">�</div>
            <div className={`font-semibold ${session && progressData.coursesStarted > 0 ? 'text-purple-700 dark:text-purple-300' : 'text-gray-600 dark:text-gray-400'}`}>
              Portfolio Projects
            </div>
            <div className={`text-sm ${session && progressData.coursesStarted > 0 ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-500'}`}>
              {session && progressData.projectsCompleted > 0 ? 
                `${progressData.projectsCompleted} projects built` :
                'Build & deploy real projects'
              }
            </div>
            {session && progressData.coursesStarted > 0 && (
              <Link href="/projects" className="text-xs mt-2 text-purple-500 hover:text-purple-600 underline">
                → View Projects
              </Link>
            )}
            {(!session || progressData.coursesStarted === 0) && (
              <div className="text-xs mt-2 text-gray-400">🔒 Start learning first</div>
            )}
          </div>
        </div>
      </div>

      {/* What You Get */}
      <div className="benefits bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 text-center">� What You Get (All Free Forever)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="benefit-item">
            <span className="text-lg">🛠️</span>
            <strong> GitHub Student Developer Pack</strong> - $200k+ worth of tools
          </div>
          <div className="benefit-item">
            <span className="text-lg">🤖</span>
            <strong> GitHub Copilot</strong> - AI-powered coding assistant
          </div>
          <div className="benefit-item">
            <span className="text-lg">☁️</span>
            <strong> Codespaces</strong> - Cloud development environment
          </div>
          <div className="benefit-item">
            <span className="text-lg">📊</span>
            <strong> Professional Portfolio</strong> - Showcase your work
          </div>
        </div>
      </div>

      {/* Explore Without Connecting */}
      <div className="explore-options bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 text-center">🔍 Want to Explore First?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a 
            href="/python/synchronized" 
            className="explore-card bg-white dark:bg-gray-700 border rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🐍</div>
            <div className="font-semibold">Python Courses</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Traditional learning path</div>
          </a>
          
          <a 
            href="/html-css/synchronized" 
            className="explore-card bg-white dark:bg-gray-700 border rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">🌐</div>
            <div className="font-semibold">Web Development</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">HTML, CSS, JavaScript</div>
          </a>
          
          <a 
            href="/synchronized-lessons" 
            className="explore-card bg-white dark:bg-gray-700 border rounded-lg p-4 text-center hover:shadow-md transition-shadow"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="font-semibold">All Courses</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Browse everything</div>
          </a>
        </div>
        <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
          Note: GitHub connection unlocks professional tools and AI assistance
        </div>
      </div>

      {/* Testing Guide */}
      <div className="testing-guide bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8 text-center">
        <h3 className="text-lg font-semibold mb-2">🧪 Want to test everything?</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          Explore all Launch Pad features, learning platforms, and components
        </p>
        <a 
          href="/testing-guide"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Complete Testing Guide
        </a>
      </div>

      {/* Development Roadmap */}
      <div className="roadmap-link bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mb-8 text-center">
        <h3 className="text-lg font-semibold mb-2">🗺️ Development Roadmap</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          See the complete development plan and next steps for Launch Pad
        </p>
        <a 
          href="/roadmap"
          className="inline-block px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          View Complete Roadmap
        </a>
      </div>
    </div>
  )
}

export default ComprehensiveLaunchPad
