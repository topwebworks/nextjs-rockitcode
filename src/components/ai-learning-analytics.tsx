'use client'

import React, { useState, useEffect } from 'react'
import { renderIcon } from '@/components/icons'
import { clsx } from 'clsx'

interface AISkillMetric {
  skill: string
  level: number // 0-100
  interactions: number
  successRate: number // 0-1
  lastImprovement: Date
  milestones: string[]
}

interface AILearningInsight {
  type: 'strength' | 'improvement' | 'milestone' | 'warning'
  title: string
  description: string
  actionable: string
  priority: 'low' | 'medium' | 'high'
}

interface AICollaborationStats {
  totalInteractions: number
  acceptedSuggestions: number
  humanModifications: number
  independentSolutions: number
  codeQualityImprovement: number // percentage
  learningVelocity: number // concepts per week
}

interface AILearningAnalyticsProps {
  userId: string
  courseId: string
  lessonId?: string
  timeframe?: 'week' | 'month' | 'all'
  showDetailedMetrics?: boolean
}

export function AILearningAnalytics({
  userId,
  courseId,
  lessonId,
  timeframe = 'week',
  showDetailedMetrics = false
}: AILearningAnalyticsProps) {
  const [skills, setSkills] = useState<AISkillMetric[]>([])
  const [insights, setInsights] = useState<AILearningInsight[]>([])
  const [stats, setStats] = useState<AICollaborationStats | null>(null)
  const [loading, setLoading] = useState(true)

  // Mock data generation (replace with real analytics API)
  useEffect(() => {
    const loadAnalytics = async () => {
      setLoading(true)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock AI skill metrics
      const mockSkills: AISkillMetric[] = [
        {
          skill: 'Prompt Engineering',
          level: 75,
          interactions: 45,
          successRate: 0.82,
          lastImprovement: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          milestones: ['Basic prompts', 'Context-aware requests', 'Complex debugging prompts']
        },
        {
          skill: 'AI Code Review',
          level: 60,
          interactions: 23,
          successRate: 0.71,
          lastImprovement: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          milestones: ['Accepting suggestions', 'Critical evaluation', 'Custom modifications']
        },
        {
          skill: 'Human-AI Collaboration',
          level: 85,
          interactions: 67,
          successRate: 0.89,
          lastImprovement: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          milestones: ['Using AI as tool', 'Maintaining critical thinking', 'Teaching AI context']
        },
        {
          skill: 'AI-Assisted Debugging',
          level: 45,
          interactions: 12,
          successRate: 0.58,
          lastImprovement: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          milestones: ['Error identification', 'Solution evaluation']
        }
      ]

      // Mock insights
      const mockInsights: AILearningInsight[] = [
        {
          type: 'strength',
          title: 'Excellent AI Collaboration',
          description: 'You maintain strong critical thinking while leveraging AI effectively',
          actionable: 'Share your approach with other learners in the community',
          priority: 'low'
        },
        {
          type: 'improvement',
          title: 'Prompt Engineering Opportunity',
          description: 'Your prompts could be more specific to get better AI responses',
          actionable: 'Try including more context about your goals and constraints',
          priority: 'medium'
        },
        {
          type: 'milestone',
          title: 'Ready for Advanced AI Debugging',
          description: 'Your collaboration skills qualify you for advanced debugging techniques',
          actionable: 'Unlock the AI-Assisted Debugging specialization',
          priority: 'high'
        },
        {
          type: 'warning',
          title: 'Maintaining Independence',
          description: 'Ensure you can solve problems without AI assistance',
          actionable: 'Practice coding sessions with AI disabled',
          priority: 'medium'
        }
      ]

      // Mock collaboration stats
      const mockStats: AICollaborationStats = {
        totalInteractions: 147,
        acceptedSuggestions: 89,
        humanModifications: 34,
        independentSolutions: 78,
        codeQualityImprovement: 23,
        learningVelocity: 4.2
      }

      setSkills(mockSkills)
      setInsights(mockInsights)
      setStats(mockStats)
      setLoading(false)
    }

    loadAnalytics()
  }, [userId, courseId, lessonId, timeframe])

  if (loading) {
    return (
      <div className="ai-analytics-loading p-6 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-600">Analyzing AI collaboration patterns...</p>
      </div>
    )
  }

  return (
    <div className="ai-learning-analytics space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">AI Collaboration Analytics</h2>
        <div className="flex space-x-2">
          <select 
            value={timeframe}
            onChange={(e) => {/* Handle timeframe change */}}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Key Insights */}
      <div className="insights-grid grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={clsx(
              "p-4 rounded-lg border-l-4",
              insight.type === 'strength' && "bg-green-50 border-green-500",
              insight.type === 'improvement' && "bg-blue-50 border-blue-500",
              insight.type === 'milestone' && "bg-purple-50 border-purple-500",
              insight.type === 'warning' && "bg-yellow-50 border-yellow-500"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-sm">{insight.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{insight.description}</p>
                <p className="text-xs text-gray-500 mt-2 font-medium">
                  {renderIcon('lightbulb', 'w-4 h-4 mr-2 inline')} {insight.actionable}
                </p>
              </div>
              <span className={clsx(
                "text-xs px-2 py-1 rounded ml-2",
                insight.priority === 'high' && "bg-red-100 text-red-800",
                insight.priority === 'medium' && "bg-yellow-100 text-yellow-800",
                insight.priority === 'low' && "bg-gray-100 text-gray-800"
              )}>
                {insight.priority}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* AI Skill Progression */}
      <div className="skills-section">
        <h3 className="text-lg font-semibold mb-4">AI Collaboration Skills</h3>
        <div className="space-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item p-4 bg-white dark:bg-gray-800 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{skill.skill}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>{skill.level}%</span>
                  <span>•</span>
                  <span>{skill.interactions} interactions</span>
                  <span>•</span>
                  <span>{Math.round(skill.successRate * 100)}% success</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              
              {/* Milestones */}
              <div className="milestones flex flex-wrap gap-2">
                {skill.milestones.map((milestone, mIndex) => (
                  <span
                    key={mIndex}
                    className={clsx(
                      "text-xs px-2 py-1 rounded",
                      mIndex < Math.floor(skill.level / 33.33) 
                        ? "bg-green-100 text-green-800" 
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {mIndex < Math.floor(skill.level / 33.33) ? '✓' : '○'} {milestone}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Collaboration Statistics */}
      {stats && (
        <div className="stats-section">
          <h3 className="text-lg font-semibold mb-4">Collaboration Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="stat-card p-4 bg-blue-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalInteractions}</div>
              <div className="text-sm text-gray-600">Total AI Interactions</div>
            </div>
            
            <div className="stat-card p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((stats.acceptedSuggestions / stats.totalInteractions) * 100)}%
              </div>
              <div className="text-sm text-gray-600">Suggestion Acceptance</div>
            </div>
            
            <div className="stat-card p-4 bg-purple-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.humanModifications}</div>
              <div className="text-sm text-gray-600">Human Modifications</div>
            </div>
            
            <div className="stat-card p-4 bg-orange-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{stats.independentSolutions}</div>
              <div className="text-sm text-gray-600">Independent Solutions</div>
            </div>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="improvement-metric p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg">
              <h4 className="font-medium mb-2">Code Quality Improvement</h4>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-green-600">+{stats.codeQualityImprovement}%</div>
                <div className="text-sm text-gray-600 ml-2">since AI collaboration</div>
              </div>
            </div>
            
            <div className="learning-velocity p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Learning Velocity</h4>
              <div className="flex items-center">
                <div className="text-2xl font-bold text-purple-600">{stats.learningVelocity}</div>
                <div className="text-sm text-gray-600 ml-2">concepts per week</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Ethics & Best Practices */}
      <div className="ethics-section p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <h3 className="font-semibold text-yellow-800 mb-2">🤖 AI Collaboration Ethics</h3>
        <div className="text-sm text-yellow-700 space-y-1">
          <p>• Always attribute AI assistance in your code comments</p>
          <p>• Understand and verify AI suggestions before implementing</p>
          <p>• Maintain your ability to code independently</p>
          <p>• Use AI to enhance learning, not replace thinking</p>
          <p>• Respect intellectual property and licensing in AI-generated code</p>
        </div>
      </div>

      {/* Next Steps */}
      <div className="next-steps p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2 flex items-center">{renderIcon('target', 'w-4 h-4 mr-2')} Recommended Next Steps</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span>Practice advanced prompt engineering for complex debugging scenarios</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span>Complete a coding session without AI to maintain independence</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span>Mentor another student on effective AI collaboration</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AILearningAnalytics
