// Week 6: AI Learning Dashboard
// Comprehensive AI-powered learning analytics and personalized recommendations

'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import AIAssistant from '@/components/ai/AIAssistant'
import AICodeReview from '@/components/ai/AICodeReview'

interface LearningStats {
  totalLessonsCompleted: number
  totalTimeSpent: number
  currentStreak: number
  averageScore: number
  skillProgression: Array<{
    skill: string
    level: number
    progress: number
    nextMilestone: string
  }>
  recentAchievements: Array<{
    title: string
    description: string
    earnedAt: string
    type: 'completion' | 'streak' | 'score' | 'skill'
  }>
}

interface AIInsight {
  type: 'strength' | 'weakness' | 'recommendation' | 'prediction'
  title: string
  description: string
  actionable: boolean
  priority: 'high' | 'medium' | 'low'
  estimatedImpact: string
}

interface PersonalizedPath {
  id: string
  title: string
  description: string
  estimatedTime: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  steps: Array<{
    title: string
    type: 'lesson' | 'exercise' | 'project'
    completed: boolean
  }>
  aiConfidence: number
}

export function AILearningDashboard() {
  const [stats, setStats] = useState<LearningStats | null>(null)
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([])
  const [personalizedPaths, setPersonalizedPaths] = useState<PersonalizedPath[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedView, setSelectedView] = useState<'overview' | 'insights' | 'paths' | 'tools'>('overview')
  const { user } = useUser()

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      const [statsResponse, insightsResponse, pathsResponse] = await Promise.all([
        fetch('/api/ai/learning-stats'),
        fetch('/api/ai/learning-insights'),
        fetch('/api/ai/learning-path')
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData.stats)
      }

      if (insightsResponse.ok) {
        const insightsData = await insightsResponse.json()
        setAiInsights(insightsData.insights || [])
      }

      if (pathsResponse.ok) {
        const pathsData = await pathsResponse.json()
        setPersonalizedPaths(pathsData.paths || [])
      }
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'strength': return '💪'
      case 'weakness': return '🎯'
      case 'recommendation': return '💡'
      case 'prediction': return '🔮'
      default: return '📊'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your AI-powered learning dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI Learning Dashboard</h1>
          <p className="text-gray-600">Personalized insights and recommendations powered by AI</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={selectedView === 'overview' ? 'default' : 'outline'}
            onClick={() => setSelectedView('overview')}
          >
            📊 Overview
          </Button>
          <Button
            variant={selectedView === 'insights' ? 'default' : 'outline'}
            onClick={() => setSelectedView('insights')}
          >
            🧠 AI Insights
          </Button>
          <Button
            variant={selectedView === 'paths' ? 'default' : 'outline'}
            onClick={() => setSelectedView('paths')}
          >
            🛤️ Learning Paths
          </Button>
          <Button
            variant={selectedView === 'tools' ? 'default' : 'outline'}
            onClick={() => setSelectedView('tools')}
          >
            🛠️ AI Tools
          </Button>
        </div>
      </div>

      {/* Overview Section */}
      {selectedView === 'overview' && stats && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalLessonsCompleted}</div>
                  <div className="text-sm text-gray-600">Lessons Completed</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{Math.round(stats.totalTimeSpent / 60)}h</div>
                  <div className="text-sm text-gray-600">Time Spent Learning</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">{stats.currentStreak}</div>
                  <div className="text-sm text-gray-600">Day Streak</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{stats.averageScore}%</div>
                  <div className="text-sm text-gray-600">Average Score</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Skill Progression */}
          <Card>
            <CardHeader>
              <CardTitle>Skill Progression</CardTitle>
              <CardDescription>Your current skill levels and progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stats.skillProgression.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <span className="text-sm text-gray-600">Level {skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      Next: {skill.nextMilestone}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {stats.recentAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <span className="text-2xl">
                      {achievement.type === 'completion' ? '🏆' : 
                       achievement.type === 'streak' ? '🔥' :
                       achievement.type === 'score' ? '⭐' : '🎯'}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(achievement.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Insights Section */}
      {selectedView === 'insights' && (
        <div className="space-y-4">
          {aiInsights.map((insight, index) => (
            <Card key={index} className={`border-l-4 ${getPriorityColor(insight.priority)}`}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getInsightIcon(insight.type)}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{insight.title}</h3>
                      <Badge className={getDifficultyColor(insight.priority)}>
                        {insight.priority} priority
                      </Badge>
                      {insight.actionable && (
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          Actionable
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700 mb-2">{insight.description}</p>
                    <p className="text-sm text-gray-600">
                      <strong>Estimated Impact:</strong> {insight.estimatedImpact}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Learning Paths Section */}
      {selectedView === 'paths' && (
        <div className="space-y-4">
          {personalizedPaths.map((path) => (
            <Card key={path.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {path.title}
                      <Badge className={getDifficultyColor(path.difficulty)}>
                        {path.difficulty}
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {path.aiConfidence}% AI confidence
                      </Badge>
                    </CardTitle>
                    <CardDescription>{path.description}</CardDescription>
                    <p className="text-sm text-gray-600 mt-1">
                      Estimated time: {path.estimatedTime}
                    </p>
                  </div>
                  <Button>Start Path</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {path.steps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 rounded">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                        step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step.completed ? '✓' : index + 1}
                      </span>
                      <span className={step.completed ? 'line-through text-gray-500' : ''}>
                        {step.title}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {step.type}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* AI Tools Section */}
      {selectedView === 'tools' && (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <AICodeReview />
            <Card>
              <CardHeader>
                <CardTitle>AI Learning Assistant</CardTitle>
                <CardDescription>
                  Get instant help with coding questions and explanations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Click the AI assistant button in the bottom right to start a conversation with your personal learning assistant.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Code review and feedback
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Concept explanations
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Hints and guidance
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Learning path recommendations
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* AI Assistant Component */}
      <AIAssistant />
    </div>
  )
}

export default AILearningDashboard
