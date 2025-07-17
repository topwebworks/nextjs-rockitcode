'use client'

import { useState, useEffect } from 'react'
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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for cursor light effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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
      case 'completed': return 'text-green-400 bg-green-400/10 border border-green-400/20'
      case 'in-progress': return 'text-blue-400 bg-blue-400/10 border border-blue-400/20'
      default: return 'text-slate-400 bg-slate-400/10 border border-slate-400/20'
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border border-green-400/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
      case 'Advanced': return 'text-red-400 bg-red-400/10 border border-red-400/20'
      default: return 'text-slate-400 bg-slate-400/10 border border-slate-400/20'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        {/* Cursor Light Effect */}
        <div 
          className="absolute transition-all duration-300 ease-out rounded-full pointer-events-none w-96 h-96"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.08) 30%, rgba(139,92,246,0.05) 60%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />
        
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

      <div className="relative z-10 p-6 mx-auto max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="mb-2 text-4xl font-light text-white">
                Welcome back, {profile?.full_name || profile?.username || user.email?.split('@')[0]}
              </h1>
              <p className="text-lg text-slate-300">
                Ready to continue your developer journey?
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link 
                href="/dashboard/missions"
                className="flex items-center gap-2 px-4 py-2 text-orange-400 transition-all duration-300 border rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50 hover:border-orange-400/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Missions
              </Link>
              <Link 
                href="/dashboard/tools"
                className="flex items-center gap-2 px-4 py-2 text-purple-400 transition-all duration-300 border rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50 hover:border-purple-400/30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Pro Tools
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-blue-400/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-slate-700/50 border-slate-600/50">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="font-medium text-white">Career Progress</h3>
            </div>
            <div className="mb-2 text-3xl font-light text-blue-400">
              {careerStats.careerProgress}%
            </div>
            <div className="mb-3 text-sm text-slate-400">{careerStats.currentCareerPath}</div>
            <div className="w-full h-2 rounded-full bg-slate-700/50">
              <div 
                className="h-2 transition-all duration-300 rounded-full bg-gradient-to-r from-blue-400 to-blue-500" 
                style={{ width: `${careerStats.careerProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-green-400/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-slate-700/50 border-slate-600/50">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="font-medium text-white">Projects</h3>
            </div>
            <div className="mb-2 text-3xl font-light text-green-400">
              {careerStats.completedProjects}/{careerStats.totalProjects}
            </div>
            <div className="mb-3 text-sm text-slate-400">Completed</div>
            <div className="w-full h-2 rounded-full bg-slate-700/50">
              <div 
                className="h-2 transition-all duration-300 rounded-full bg-gradient-to-r from-green-400 to-green-500" 
                style={{ width: `${(careerStats.completedProjects / careerStats.totalProjects) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-6 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-purple-400/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-slate-700/50 border-slate-600/50">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-white">Time Spent</h3>
            </div>
            <div className="mb-2 text-3xl font-light text-purple-400">{careerStats.totalTimeSpent}</div>
            <div className="text-sm text-slate-400">Total learning</div>
          </div>

          <div className="p-6 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-orange-400/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-slate-700/50 border-slate-600/50">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v2" />
                </svg>
              </div>
              <h3 className="font-medium text-white">GitHub Repos</h3>
            </div>
            <div className="mb-2 text-3xl font-light text-orange-400">{careerStats.githubRepos}</div>
            <div className="text-sm text-slate-400">Live projects</div>
          </div>
        </div>

        {/* Activity Chart and Recent Lessons */}
        <div className="grid gap-8 mb-8 lg:grid-cols-3">
          {/* Weekly Activity */}
          <div className="p-6 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 lg:col-span-1">
            <h3 className="mb-6 text-xl font-medium text-white">This Week's Activity</h3>
            <div className="space-y-4">
              {weeklyActivity.map((day, index) => (
                <div key={day.day} className="flex items-center justify-between">
                  <div className="w-10 text-sm font-medium text-slate-300">{day.day}</div>
                  <div className="flex-1 mx-3">
                    <div className="w-full h-2 rounded-full bg-slate-700/50">
                      <div 
                        className="h-2 transition-all duration-300 rounded-full bg-gradient-to-r from-blue-400 to-blue-500" 
                        style={{ width: `${Math.max(day.hours * 25, 2)}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-xs text-right text-slate-400">
                    {day.hours}h
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="p-6 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-medium text-white">Recent Projects</h3>
              <Link 
                href="/launch-pad" 
                className="text-sm font-medium text-blue-400 transition-colors hover:text-blue-300"
              >
                View all →
              </Link>
            </div>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="flex items-center justify-between p-4 transition-all duration-300 border rounded-lg bg-slate-700/30 border-slate-600/30 hover:border-slate-500/50">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-white">{project.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getLevelColor(project.level)}`}>
                        {project.level}
                      </span>
                      {project.githubRepo && (
                        <a 
                          href={`https://github.com/your-username/${project.githubRepo}`}
                          className="px-2 py-1 text-xs transition-all duration-300 border rounded-full text-slate-300 bg-slate-600/50 border-slate-500/50 hover:bg-slate-500/50"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="inline w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                          Repo
                        </a>
                      )}
                      {project.deploymentUrl && (
                        <a 
                          href={project.deploymentUrl}
                          className="px-2 py-1 text-xs text-white transition-all duration-300 border rounded-full bg-green-500/20 border-green-400/30 hover:bg-green-500/30"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <svg className="inline w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Live
                        </a>
                      )}
                    </div>
                    <div className="mb-3 text-sm text-slate-400">
                      {project.careerPath} • {project.timeSpent} • {project.lastAccessed}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 rounded-full bg-slate-700/50">
                        <div 
                          className="h-2 transition-all duration-300 rounded-full bg-gradient-to-r from-blue-400 to-blue-500" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-blue-400">{project.progress}%</span>
                    </div>
                  </div>
                  <div className="ml-6">
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
        <div className="p-6 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50">
          <h3 className="mb-6 text-xl font-medium text-white">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Link 
              href="/launch-pad"
              className="flex items-center gap-3 p-4 transition-all duration-300 border rounded-lg bg-slate-700/30 border-slate-600/30 hover:border-blue-400/30 hover:bg-slate-700/50 group"
            >
              <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-full bg-slate-600/50 border-slate-500/50 group-hover:border-blue-400/30">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white">Launch Pad</div>
                <div className="text-sm text-slate-400">Start building</div>
              </div>
            </Link>

            <Link 
              href="/launch-pad/career-paths"
              className="flex items-center gap-3 p-4 transition-all duration-300 border rounded-lg bg-slate-700/30 border-slate-600/30 hover:border-green-400/30 hover:bg-slate-700/50 group"
            >
              <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-full bg-slate-600/50 border-slate-500/50 group-hover:border-green-400/30">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white">Career Paths</div>
                <div className="text-sm text-slate-400">Choose direction</div>
              </div>
            </Link>

            <Link 
              href="/dashboard/missions"
              className="flex items-center gap-3 p-4 transition-all duration-300 border rounded-lg bg-slate-700/30 border-slate-600/30 hover:border-orange-400/30 hover:bg-slate-700/50 group"
            >
              <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-full bg-slate-600/50 border-slate-500/50 group-hover:border-orange-400/30">
                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white">Missions</div>
                <div className="text-sm text-slate-400">Track goals</div>
              </div>
            </Link>

            <Link 
              href="/dashboard/tools"
              className="flex items-center gap-3 p-4 transition-all duration-300 border rounded-lg bg-slate-700/30 border-slate-600/30 hover:border-purple-400/30 hover:bg-slate-700/50 group"
            >
              <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-full bg-slate-600/50 border-slate-500/50 group-hover:border-purple-400/30">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white">AI Tools & Pro Setup</div>
                <div className="text-sm text-slate-400">Professional development tools</div>
              </div>
            </Link>

            <Link 
              href="/dashboard/tools"
              className="flex items-center gap-3 p-4 transition-all duration-300 border rounded-lg bg-slate-700/30 border-slate-600/30 hover:border-amber-400/30 hover:bg-slate-700/50 group"
            >
              <div className="flex items-center justify-center w-10 h-10 transition-all duration-300 border rounded-full bg-slate-600/50 border-slate-500/50 group-hover:border-amber-400/30">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-white">Tools</div>
                <div className="text-sm text-slate-400">Access partners</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
