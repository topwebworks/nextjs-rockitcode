'use client'

import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'
import Link from 'next/link'

interface ProjectProgress {
  id: string
  title: string
  careerPath: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  progress: number
  timeSpent: string
  lastAccessed: string
  githubRepo?: string
  deploymentUrl?: string
  status: 'not-started' | 'in-progress' | 'completed'
}

interface CareerStats {
  currentCareerPath: string
  careerProgress: number
  totalProjects: number
  completedProjects: number
  inProgressProjects: number
  totalTimeSpent: string
  skillBadges: string[]
  githubRepos: number
}

export default function EnhancedDashboard() {
  const { user, profile, isLoading } = useUser()
  const [selectedTimeframe, setSelectedTimeframe] = useState('week')

  // Mock data - in production this would come from your backend
  const careerStats: CareerStats = {
    currentCareerPath: 'Frontend Developer',
    careerProgress: 65,
    totalProjects: 6,
    completedProjects: 3,
    inProgressProjects: 2,
    totalTimeSpent: '23.5 hours',
    skillBadges: ['HTML/CSS', 'JavaScript', 'Git/GitHub'],
    githubRepos: 4
  }

  const recentProjects: ProjectProgress[] = [
    {
      id: 'portfolio-advanced',
      title: 'Professional Portfolio',
      careerPath: 'Frontend Developer',
      level: 'Advanced',
      progress: 85,
      timeSpent: '2.5 hours',
      lastAccessed: '2 hours ago',
      githubRepo: 'portfolio-advanced',
      deploymentUrl: 'https://your-portfolio.vercel.app',
      status: 'in-progress'
    },
    {
      id: 'ecommerce-beginner',
      title: 'E-commerce Landing Page',
      careerPath: 'Frontend Developer',
      level: 'Beginner',
      progress: 100,
      timeSpent: '1.8 hours',
      lastAccessed: '1 day ago',
      githubRepo: 'ecommerce-beginner',
      deploymentUrl: 'https://your-store.netlify.app',
      status: 'completed'
    },
    {
      id: 'dashboard-intermediate',
      title: 'Analytics Dashboard',
      careerPath: 'Frontend Developer',
      level: 'Intermediate',
      progress: 45,
      timeSpent: '3.2 hours',
      lastAccessed: '3 days ago',
      githubRepo: 'dashboard-intermediate',
      status: 'in-progress'
    },
    {
      id: 'portfolio-beginner',
      title: 'Basic Portfolio Site',
      careerPath: 'Frontend Developer',
      level: 'Beginner',
      progress: 100,
      timeSpent: '1.5 hours',
      lastAccessed: '5 days ago',
      githubRepo: 'portfolio-beginner',
      deploymentUrl: 'https://first-portfolio.github.io',
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

  const getLevelColor = (level: string) => {
    switch (level) {
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
    <div className="p-6 mx-auto max-w-7xl">
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
              href="/dashboard/tools"
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20"
            >
              🔧 Pro Tools
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-blue-600">�</div>
            <h3 className="font-semibold">Career Progress</h3>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {careerStats.careerProgress}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">{careerStats.currentCareerPath}</div>
          <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-blue-600 rounded-full" 
              style={{ width: `${careerStats.careerProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-green-600">🎯</div>
            <h3 className="font-semibold">Projects</h3>
          </div>
          <div className="text-2xl font-bold text-green-600">
            {careerStats.completedProjects}/{careerStats.totalProjects}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
            <div 
              className="h-2 bg-green-600 rounded-full" 
              style={{ width: `${(careerStats.completedProjects / careerStats.totalProjects) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-purple-600">⏱️</div>
            <h3 className="font-semibold">Time Spent</h3>
          </div>
          <div className="text-2xl font-bold text-purple-600">{careerStats.totalTimeSpent}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Total learning</div>
        </div>

        <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-orange-600">�</div>
            <h3 className="font-semibold">GitHub Repos</h3>
          </div>
          <div className="text-2xl font-bold text-orange-600">{careerStats.githubRepos}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Live projects</div>
        </div>
      </div>

      {/* Activity Chart and Recent Lessons */}
      <div className="grid gap-8 mb-8 lg:grid-cols-3">
        {/* Weekly Activity */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg lg:col-span-1 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="mb-4 text-xl font-semibold">This Week's Activity</h3>
          <div className="space-y-3">
            {weeklyActivity.map((day, index) => (
              <div key={day.day} className="flex items-center justify-between">
                <div className="w-10 text-sm font-medium">{day.day}</div>
                <div className="flex-1 mx-3">
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-blue-600 rounded-full" 
                      style={{ width: `${Math.max(day.hours * 25, 2)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-12 text-xs text-right text-gray-600 dark:text-gray-400">
                  {day.hours}h
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="p-6 bg-white border border-gray-200 rounded-lg lg:col-span-2 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Recent Projects</h3>
            <Link 
              href="/launch-pad" 
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-900/50">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">{project.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(project.level)}`}>
                      {project.level}
                    </span>
                    {project.githubRepo && (
                      <a 
                        href={`https://github.com/your-username/${project.githubRepo}`}
                        className="px-2 py-1 text-xs text-white bg-gray-600 rounded-full hover:bg-gray-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        📁 Repo
                      </a>
                    )}
                    {project.deploymentUrl && (
                      <a 
                        href={project.deploymentUrl}
                        className="px-2 py-1 text-xs text-white bg-green-600 rounded-full hover:bg-green-700"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        🚀 Live
                      </a>
                    )}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {project.careerPath} • {project.timeSpent} • {project.lastAccessed}
                  </div>
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full">
                        <div 
                          className="h-2 bg-blue-600 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{project.progress}%</span>
                    </div>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                    {project.status.replace('-', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
        <h3 className="mb-4 text-xl font-semibold">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          <Link 
            href="/launch-pad"
            className="flex items-center gap-3 p-4 transition-colors rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30"
          >
            <div className="text-2xl">�</div>
            <div>
              <div className="font-medium">Launch Pad</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Start building</div>
            </div>
          </Link>

          <Link 
            href="/launch-pad/career-paths"
            className="flex items-center gap-3 p-4 transition-colors rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            <div className="text-2xl">�</div>
            <div>
              <div className="font-medium">Career Paths</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Choose direction</div>
            </div>
          </Link>

          <Link 
            href="/dashboard/missions"
            className="flex items-center gap-3 p-4 transition-colors rounded-lg bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/30"
          >
            <div className="text-2xl">🎯</div>
            <div>
              <div className="font-medium">Missions</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Track goals</div>
            </div>
          </Link>

          <Link 
            href="/dashboard/tools"
            className="flex items-center gap-3 p-4 transition-colors rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30"
          >
            <div className="text-2xl">🤖</div>
            <div>
              <div className="font-medium">AI Tools & Pro Setup</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Professional development tools</div>
            </div>
          </Link>

          <Link 
            href="/dashboard/tools"
            className="flex items-center gap-3 p-4 transition-colors rounded-lg bg-gray-50 dark:bg-gray-900/20 hover:bg-gray-100 dark:hover:bg-gray-900/30"
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
