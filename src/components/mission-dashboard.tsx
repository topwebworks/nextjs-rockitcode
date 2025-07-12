'use client'

import { useState } from 'react'
import Link from 'next/link'

interface MissionStatus {
  id: string
  title: string
  category: string
  completion: number
  totalSteps: number
  completedSteps: number
  nextAction: string
  priority: 'High' | 'Medium' | 'Low'
  estimatedTime: string
}

export function MissionDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'active' | 'completed'>('overview')

  const missions: MissionStatus[] = [
    {
      id: 'setup',
      title: 'Mission Systems Initialization',
      category: 'Foundation',
      completion: 85,
      totalSteps: 6,
      completedSteps: 5,
      nextAction: 'Activate VS Code Professional Setup',
      priority: 'High',
      estimatedTime: '8 minutes'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Launch Sequence',
      category: 'Web Development',
      completion: 0,
      totalSteps: 5,
      completedSteps: 0,
      nextAction: 'Begin Mission Alpha briefing',
      priority: 'High',
      estimatedTime: '2 hours'
    },
    {
      id: 'react',
      title: 'React Command Center',
      category: 'Frontend',
      completion: 0,
      totalSteps: 5,
      completedSteps: 0,
      nextAction: 'Complete Portfolio Launch first',
      priority: 'Medium',
      estimatedTime: '3 hours'
    }
  ]

  const activeMissions = missions.filter(m => m.completion > 0 && m.completion < 100)
  const completedMissions = missions.filter(m => m.completion === 100)
  const availableMissions = missions.filter(m => m.completion === 0)

  const totalProgress = Math.round(
    missions.reduce((sum, mission) => sum + mission.completion, 0) / missions.length
  )

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'Low': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  return (
    <div className="mission-dashboard">
      {/* Mission Control Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">🚀</div>
        <h1 className="text-3xl font-bold mb-4">Mission Control Center</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Your professional developer transformation command center
        </p>
      </div>

      {/* Overall Progress */}
      <div className="overall-progress bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">{totalProgress}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">{activeMissions.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Missions</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">{completedMissions.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">{availableMissions.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Available</div>
          </div>
        </div>
      </div>

      {/* Mission Status Tabs */}
      <div className="mission-tabs mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {[
            { key: 'overview', label: '📊 Overview', count: missions.length },
            { key: 'active', label: '🎯 Active', count: activeMissions.length },
            { key: 'completed', label: '✅ Completed', count: completedMissions.length }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {/* Mission List */}
      <div className="missions-list space-y-4">
        {(activeTab === 'overview' ? missions : 
          activeTab === 'active' ? activeMissions : 
          completedMissions).map((mission) => (
          <div key={mission.id} className="mission-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold">{mission.title}</h3>
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded">
                    {mission.category}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${getPriorityColor(mission.priority)}`}>
                    {mission.priority} Priority
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-medium">Progress:</span> {mission.completedSteps}/{mission.totalSteps} steps
                  </div>
                  <div>
                    <span className="font-medium">Next:</span> {mission.nextAction}
                  </div>
                  <div>
                    <span className="font-medium">Time:</span> {mission.estimatedTime}
                  </div>
                </div>
                
                <div className="progress-bar mb-4">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                    <span>Mission Progress</span>
                    <span>{mission.completion}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${mission.completion}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="ml-6 text-center">
                {mission.completion === 100 ? (
                  <div className="text-green-500 text-2xl mb-2">✅</div>
                ) : mission.completion > 0 ? (
                  <div className="text-blue-500 text-2xl mb-2">🎯</div>
                ) : (
                  <div className="text-gray-400 text-2xl mb-2">⏳</div>
                )}
                
                {mission.completion === 0 ? (
                  <Link href="/launch">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                      🚀 Begin
                    </button>
                  </Link>
                ) : mission.completion < 100 ? (
                  <Link href="/dashboard">
                    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                      Continue
                    </button>
                  </Link>
                ) : (
                  <button className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded text-sm">
                    ✓ Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="quick-actions mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/launch" className="action-card bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
          <div className="text-2xl mb-2">🚀</div>
          <div className="font-semibold text-blue-800 dark:text-blue-200">Launch Sequence</div>
          <div className="text-sm text-blue-600 dark:text-blue-400">Initialize mission systems</div>
        </Link>
        
        <Link href="/dashboard" className="action-card bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
          <div className="text-2xl mb-2">📋</div>
          <div className="font-semibold text-green-800 dark:text-green-200">Mission Briefings</div>
          <div className="text-sm text-green-600 dark:text-green-400">View available missions</div>
        </Link>
        
        <Link href="/settings" className="action-card bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
          <div className="text-2xl mb-2">⚙️</div>
          <div className="font-semibold text-purple-800 dark:text-purple-200">Equipment Settings</div>
          <div className="text-sm text-purple-600 dark:text-purple-400">Configure tools & preferences</div>
        </Link>
      </div>

      {/* Professional Development Stats */}
      <div className="dev-stats mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
          <span>📈</span>
          <span>Professional Development Metrics</span>
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          <div>
            <div className="text-2xl font-bold text-blue-600">$200k+</div>
            <div className="text-gray-600 dark:text-gray-400">Tools Activated</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-gray-600 dark:text-gray-400">Systems Online</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">0</div>
            <div className="text-gray-600 dark:text-gray-400">Projects Deployed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">85%</div>
            <div className="text-gray-600 dark:text-gray-400">Launch Readiness</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionDashboard
