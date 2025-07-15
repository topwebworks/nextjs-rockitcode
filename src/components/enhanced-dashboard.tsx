'use client'

import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import Link from 'next/link'

interface LessonProgress {
  id: string
  title: string
  course: string
  progress: number
  timeSpent: string
  lastAccessed: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  status: 'not-started' | 'in-progress' | 'completed'
}

interface CourseStats {
  totalCourses: number
  completedCourses: number
  inProgressCourses: number
  totalLessons: number
  completedLessons: number
  totalTimeSpent: string
}

export default function EnhancedDashboard() {
  const { user, profile, isLoading } = useUser()
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')

  // Mock data - in production this would come from your backend
  const courseStats: CourseStats = {
    totalCourses: 8,
    completedCourses: 3,
    inProgressCourses: 2,
    totalLessons: 127,
    completedLessons: 45,
    totalTimeSpent: '23.5 hours'
  }

  const recentLessons: LessonProgress[] = [
    {
      id: 'react-hooks',
      title: 'React Hooks Deep Dive',
      course: 'React Development',
      progress: 85,
      timeSpent: '2.5 hours',
      lastAccessed: '2 hours ago',
      difficulty: 'Intermediate',
      status: 'in-progress'
    },
    {
      id: 'css-grid',
      title: 'CSS Grid Layout',
      course: 'CSS Fundamentals',
      progress: 100,
      timeSpent: '1.8 hours',
      lastAccessed: '1 day ago',
      difficulty: 'Beginner',
      status: 'completed'
    },
    {
      id: 'api-integration',
      title: 'REST API Integration',
      course: 'Full-Stack Development',
      progress: 45,
      timeSpent: '3.2 hours',
      lastAccessed: '3 days ago',
      difficulty: 'Advanced',
      status: 'in-progress'
    },
    {
      id: 'git-workflow',
      title: 'Git Workflow & Collaboration',
      course: 'Developer Tools',
      progress: 100,
      timeSpent: '1.5 hours',
      lastAccessed: '5 days ago',
      difficulty: 'Beginner',
      status: 'completed'
    }
  ]

  const weeklyActivity = [
    { day: 'Mon', lessons: 3, hours: 2.5 },
    { day: 'Tue', lessons: 2, hours: 1.8 },
    { day: 'Wed', lessons: 1, hours: 0.5 },
    { day: 'Thu', lessons: 4, hours: 3.2 },
    { day: 'Fri', lessons: 2, hours: 1.5 },
    { day: 'Sat', lessons: 1, hours: 0.8 },
    { day: 'Sun', lessons: 0, hours: 0 }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'in-progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600'
      case 'Intermediate': return 'text-yellow-600'
      case 'Advanced': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  // If no user, redirect to homepage immediately - no loading screens
  if (!user) {
    if (typeof window !== 'undefined') {
      window.location.replace('/')
    }
    return null
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {profile?.full_name || profile?.username || user.email?.split('@')[0]}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Ready to continue your developer journey?
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/dashboard/missions"
              className="px-4 py-2 text-orange-600 border border-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20"
            >
              🎯 Missions
            </Link>
            <Link 
              href="/dashboard/subscriptions"
              className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              🤖 AI Tools
            </Link>
            <Link 
              href="/dashboard/tools"
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              🔧 Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-blue-600">📚</div>
            <h3 className="font-semibold">Courses</h3>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {courseStats.completedCourses}/{courseStats.totalCourses}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(courseStats.completedCourses / courseStats.totalCourses) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-green-600">✅</div>
            <h3 className="font-semibold">Lessons</h3>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {courseStats.completedLessons}/{courseStats.totalLessons}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full" 
              style={{ width: `${(courseStats.completedLessons / courseStats.totalLessons) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-purple-600">⏱️</div>
            <h3 className="font-semibold">Time Spent</h3>
          </div>
          <div className="text-2xl font-bold text-purple-600">{courseStats.totalTimeSpent}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total learning</div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-orange-600">🎯</div>
            <h3 className="font-semibold">Streak</h3>
          </div>
          <div className="text-2xl font-bold text-orange-600">7</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Days active</div>
        </div>
      </div>

      {/* Activity Chart and Recent Lessons */}
      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Weekly Activity */}
        <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-semibold mb-4">This Week's Activity</h3>
          <div className="space-y-3">
            {weeklyActivity.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between">
                <div className="text-sm font-medium w-10">{day.day}</div>
                <div className="flex-1 mx-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.max(day.hours * 25, 2)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 w-12 text-right">
                  {day.hours}h
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Lessons */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Recent Lessons</h3>
            <Link 
              href="/courses" 
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentLessons.map((lesson) => (
              <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{lesson.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(lesson.difficulty)}`}>
                      {lesson.difficulty}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {lesson.course} • {lesson.timeSpent} • {lesson.lastAccessed}
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${lesson.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{lesson.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(lesson.status)}`}>
                    {lesson.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link 
            href="/courses"
            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
          >
            <div className="text-2xl">📚</div>
            <div>
              <div className="font-medium">Browse Courses</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Find new lessons</div>
            </div>
          </Link>

          <Link 
            href="/launch-pad"
            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
          >
            <div className="text-2xl">🚀</div>
            <div>
              <div className="font-medium">Launch Pad</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Practice coding</div>
            </div>
          </Link>

          <Link 
            href="/dashboard/missions"
            className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
          >
            <div className="text-2xl">🎯</div>
            <div>
              <div className="font-medium">Missions</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Choose objectives</div>
            </div>
          </Link>

          <Link 
            href="/dashboard/subscriptions"
            className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
          >
            <div className="text-2xl">🤖</div>
            <div>
              <div className="font-medium">AI Assistant</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Get help coding</div>
            </div>
          </Link>

          <Link 
            href="/dashboard/tools"
            className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-900/20 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900/30 transition-colors"
          >
            <div className="text-2xl">🔧</div>
            <div>
              <div className="font-medium">Tools</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Access partners</div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
