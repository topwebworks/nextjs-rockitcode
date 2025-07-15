'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useUser } from '@/contexts/UserContext'

interface Mission {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  xp: number
  badge?: string
  status: 'locked' | 'available' | 'in-progress' | 'completed'
  prerequisites?: string[]
}

interface CareerPath {
  id: string
  title: string
  description: string
  icon: string
  totalMissions: number
  completedMissions: number
  estimatedDuration: string
  averageSalary: string
  missions: Mission[]
}

const careerPaths: CareerPath[] = [
  {
    id: 'frontend',
    title: 'Frontend Developer',
    description: 'Master React, modern CSS, and user experience design',
    icon: '🎨',
    totalMissions: 12,
    completedMissions: 0,
    estimatedDuration: '3-4 months',
    averageSalary: '$75k',
    missions: [
      {
        id: 'html-css-basics',
        title: 'HTML & CSS Fundamentals',
        description: 'Build your first responsive website from scratch',
        difficulty: 'Beginner',
        estimatedTime: '2 weeks',
        xp: 100,
        badge: '🏗️',
        status: 'available'
      },
      {
        id: 'js-essentials',
        title: 'JavaScript Essentials',
        description: 'Add interactivity and dynamic behavior to websites',
        difficulty: 'Beginner',
        estimatedTime: '3 weeks',
        xp: 150,
        badge: '⚡',
        status: 'locked',
        prerequisites: ['html-css-basics']
      },
      {
        id: 'react-mastery',
        title: 'React Component Mastery',
        description: 'Build modern, reusable UI components with React',
        difficulty: 'Intermediate',
        estimatedTime: '4 weeks',
        xp: 200,
        badge: '⚛️',
        status: 'locked',
        prerequisites: ['js-essentials']
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    description: 'End-to-end development from database to deployment',
    icon: '🚀',
    totalMissions: 15,
    completedMissions: 0,
    estimatedDuration: '4-6 months',
    averageSalary: '$85k',
    missions: [
      {
        id: 'backend-basics',
        title: 'Backend API Development',
        description: 'Create RESTful APIs with Node.js and Express',
        difficulty: 'Intermediate',
        estimatedTime: '3 weeks',
        xp: 180,
        badge: '🔧',
        status: 'available'
      },
      {
        id: 'database-design',
        title: 'Database Design & Management',
        description: 'Design efficient databases with PostgreSQL',
        difficulty: 'Intermediate',
        estimatedTime: '2 weeks',
        xp: 160,
        badge: '🗄️',
        status: 'locked',
        prerequisites: ['backend-basics']
      }
    ]
  },
  {
    id: 'devops',
    title: 'DevOps Engineer',
    description: 'Deployment, scaling, and infrastructure automation',
    icon: '⚙️',
    totalMissions: 10,
    completedMissions: 0,
    estimatedDuration: '2-3 months',
    averageSalary: '$95k',
    missions: [
      {
        id: 'docker-containers',
        title: 'Container Mastery',
        description: 'Package applications with Docker and Docker Compose',
        difficulty: 'Advanced',
        estimatedTime: '2 weeks',
        xp: 220,
        badge: '🐳',
        status: 'available'
      }
    ]
  }
]

const achievements = [
  { id: 'first-mission', title: 'Mission Starter', description: 'Complete your first mission', icon: '🎯', unlocked: false },
  { id: 'week-streak', title: 'Weekly Warrior', description: 'Code for 7 days straight', icon: '🔥', unlocked: false },
  { id: 'path-complete', title: 'Path Master', description: 'Complete an entire career path', icon: '👑', unlocked: false },
  { id: 'mentor', title: 'Community Mentor', description: 'Help 10 fellow developers', icon: '🤝', unlocked: false }
]

export function CareerLaunchPad() {
  const { user } = useUser()
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'paths' | 'missions' | 'achievements'>('paths')

  const selectedPathData = selectedPath ? careerPaths.find(p => p.id === selectedPath) : null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="mb-8">
            <span className="text-6xl mb-4 block">🚀</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Career Launch Pad
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Your mission control center for launching a successful developer career. 
              Choose your path, complete missions, and level up your skills.
            </p>
          </div>

          {user && (
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto mb-12 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-white">Welcome back, {user.user_metadata?.full_name || 'Developer'}!</h3>
                  <p className="text-gray-300">Ready to continue your mission?</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">1,250 XP</div>
                  <div className="text-sm text-gray-300">Level 5 Developer</div>
                </div>
              </div>
            </div>
          )}
          
          {/* Navigation Tabs */}
          <div className="flex justify-center mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-2 border border-white/20">
              {[
                { id: 'paths', label: '🛣️ Career Paths', count: careerPaths.length },
                { id: 'missions', label: '🎯 Active Missions', count: 3 },
                { id: 'achievements', label: '🏆 Achievements', count: achievements.filter(a => a.unlocked).length }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-slate-900 shadow-lg'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          
          {/* Career Paths */}
          {activeTab === 'paths' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Choose Your Career Path</h2>
                <p className="text-xl text-gray-300">
                  Select a specialization and follow structured missions to reach your goals
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {careerPaths.map((path) => (
                  <div
                    key={path.id}
                    className={`bg-white/5 backdrop-blur-sm rounded-2xl p-8 border transition-all hover:bg-white/10 cursor-pointer ${
                      selectedPath === path.id ? 'border-blue-400 bg-white/15' : 'border-white/20'
                    }`}
                    onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
                  >
                    <div className="text-center">
                      <div className="text-6xl mb-4">{path.icon}</div>
                      <h3 className="text-2xl font-bold text-white mb-4">{path.title}</h3>
                      <p className="text-gray-300 mb-6">{path.description}</p>
                      
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="text-sm text-gray-300">Progress</div>
                          <div className="flex items-center justify-between">
                            <div className="text-white font-semibold">
                              {path.completedMissions}/{path.totalMissions} missions
                            </div>
                            <div className="w-16 h-2 bg-gray-600 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all"
                                style={{ width: `${(path.completedMissions / path.totalMissions) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="bg-white/10 rounded-lg p-2 text-center">
                            <div className="text-gray-300">Duration</div>
                            <div className="text-white font-semibold">{path.estimatedDuration}</div>
                          </div>
                          <div className="bg-white/10 rounded-lg p-2 text-center">
                            <div className="text-gray-300">Avg Salary</div>
                            <div className="text-green-400 font-semibold">{path.averageSalary}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Selected Path Details */}
              {selectedPathData && (
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <h3 className="text-3xl font-bold text-white mb-6">
                    {selectedPathData.icon} {selectedPathData.title} Missions
                  </h3>
                  
                  <div className="grid gap-4">
                    {selectedPathData.missions.map((mission) => (
                      <div
                        key={mission.id}
                        className={`p-6 rounded-xl border-2 transition-all ${
                          mission.status === 'available'
                            ? 'bg-green-900/20 border-green-400 hover:bg-green-900/30'
                            : mission.status === 'completed'
                            ? 'bg-blue-900/20 border-blue-400'
                            : mission.status === 'in-progress'
                            ? 'bg-yellow-900/20 border-yellow-400'
                            : 'bg-gray-900/20 border-gray-600 opacity-60'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-2xl">{mission.badge}</span>
                              <h4 className="text-xl font-semibold text-white">{mission.title}</h4>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                mission.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                                mission.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {mission.difficulty}
                              </span>
                            </div>
                            <p className="text-gray-300 mb-3">{mission.description}</p>
                            <div className="flex items-center gap-6 text-sm text-gray-400">
                              <span>⏱️ {mission.estimatedTime}</span>
                              <span>🏆 {mission.xp} XP</span>
                              {mission.status === 'locked' && mission.prerequisites && (
                                <span className="text-yellow-400">
                                  🔒 Requires: {mission.prerequisites.join(', ')}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="ml-6">
                            {mission.status === 'available' && (
                              <Link
                                href="/courses"
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all"
                              >
                                Start Mission
                              </Link>
                            )}
                            {mission.status === 'completed' && (
                              <div className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold">
                                ✅ Completed
                              </div>
                            )}
                            {mission.status === 'in-progress' && (
                              <Link
                                href="/courses"
                                className="px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-all"
                              >
                                Continue
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Active Missions */}
          {activeTab === 'missions' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Your Active Missions</h2>
                <p className="text-xl text-gray-300">
                  Focus on these missions to advance your career path
                </p>
              </div>
              
              <div className="grid gap-6 max-w-4xl mx-auto">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🏗️</span>
                      <h3 className="text-xl font-semibold text-white">HTML & CSS Fundamentals</h3>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">In Progress</span>
                    </div>
                    <div className="text-yellow-400 font-semibold">65% Complete</div>
                  </div>
                  <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 w-[65%]"></div>
                  </div>
                  <p className="text-gray-300 mb-4">Build your first responsive website from scratch</p>
                  <Link
                    href="/courses"
                    className="inline-block px-4 py-2 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 transition-all"
                  >
                    Continue Mission
                  </Link>
                </div>
                
                <div className="text-center py-12 text-gray-400">
                  <div className="text-6xl mb-4">🎯</div>
                  <p>Complete your current mission to unlock new challenges!</p>
                </div>
              </div>
            </div>
          )}

          {/* Achievements */}
          {activeTab === 'achievements' && (
            <div>
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-white mb-4">Your Achievements</h2>
                <p className="text-xl text-gray-300">
                  Unlock badges and recognition as you progress
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-6 rounded-2xl border-2 text-center transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 border-yellow-400'
                        : 'bg-white/5 border-gray-600 opacity-60'
                    }`}
                  >
                    <div className="text-4xl mb-4">{achievement.icon}</div>
                    <h3 className="text-lg font-semibold text-white mb-2">{achievement.title}</h3>
                    <p className="text-gray-300 text-sm">{achievement.description}</p>
                    {achievement.unlocked && (
                      <div className="mt-4 text-yellow-400 font-semibold">✅ Unlocked!</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
