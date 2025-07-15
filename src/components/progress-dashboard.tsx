'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ProgressData {
  studentPackActivated: boolean
  toolsActivated: number
  coursesStarted: number
  projectsCompleted: number
  interviewPrepStarted: boolean
}

export default function ProgressDashboard() {
  const [progressData, setProgressData] = useState<ProgressData>({
    studentPackActivated: false,
    toolsActivated: 0,
    coursesStarted: 0,
    projectsCompleted: 0,
    interviewPrepStarted: false
  })

  // Load progress from localStorage only on client side
  useEffect(() => {
    const savedProgress = localStorage.getItem('launchpad-progress')
    if (savedProgress) {
      try {
        setProgressData(JSON.parse(savedProgress))
      } catch (error) {
        console.error('Error loading progress:', error)
      }
    }
  }, [])

  // Save progress to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('launchpad-progress', JSON.stringify(progressData))
  }, [progressData])

  const updateProgress = (updates: Partial<ProgressData>) => {
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
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-blue-600 mb-2">{overallProgress}%</div>
          <div className="text-lg font-semibold mb-3">Mission Progress</div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {Math.floor(overallProgress / 20)} of 5 mission phases complete
          </div>
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center border border-green-200 dark:border-green-700">
          <div className="text-2xl font-bold text-green-600">
            ${progressData.studentPackActivated ? '200k+' : '0'}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tools Unlocked</div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center border border-blue-200 dark:border-blue-700">
          <div className="text-2xl font-bold text-blue-600">{progressData.toolsActivated}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tools Active</div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center border border-purple-200 dark:border-purple-700">
          <div className="text-2xl font-bold text-purple-600">{progressData.coursesStarted}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Courses Started</div>
        </div>
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center border border-orange-200 dark:border-orange-700">
          <div className="text-2xl font-bold text-orange-600">{progressData.projectsCompleted}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Projects Built</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link 
          href="/launch-pad" 
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🚀</div>
          <h3 className="font-bold mb-2">Continue Mission</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Access your Launch Pad and track progress
          </p>
        </Link>
        
        <Link 
          href="/courses" 
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📚</div>
          <h3 className="font-bold mb-2">Start Learning</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Browse courses and begin coding
          </p>
        </Link>
        
        <Link 
          href="/dashboard" 
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 group"
        >
          <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📊</div>
          <h3 className="font-bold mb-2">View Dashboard</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            See detailed progress and stats
          </p>
        </Link>
      </div>

      {/* Mission Phases */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold mb-4">Mission Phases</h3>
        
        <div className={`p-4 rounded-lg border ${progressData.studentPackActivated 
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{progressData.studentPackActivated ? '✅' : '⭕'}</div>
              <div>
                <div className="font-semibold">Phase 1: Student Pack Activation</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Unlock $200k+ worth of professional tools
                </div>
              </div>
            </div>
            {!progressData.studentPackActivated && (
              <button
                onClick={() => updateProgress({ studentPackActivated: true })}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Activate
              </button>
            )}
          </div>
        </div>
        
        <div className={`p-4 rounded-lg border ${progressData.coursesStarted >= 1
          ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' 
          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">{progressData.coursesStarted >= 1 ? '✅' : '⭕'}</div>
              <div>
                <div className="font-semibold">Phase 2: Begin Learning Journey</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Start your first course and build foundations
                </div>
              </div>
            </div>
            {progressData.coursesStarted < 1 && (
              <Link
                href="/courses"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start Course
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
