// Week 6: AI-Powered Content Management Dashboard
// Intelligent content creation, curation, and analytics

'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ContentItem {
  id: string
  title: string
  type: 'lesson' | 'exercise' | 'project' | 'quiz'
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  topics: string[]
  aiScore: number
  engagementScore: number
  completionRate: number
  estimatedTime: number
  prerequisites: string[]
  aiGenerated: boolean
  status: 'draft' | 'published' | 'archived'
  createdAt: string
  updatedAt: string
}

interface ContentAnalytics {
  totalContent: number
  aiGeneratedPercent: number
  averageEngagement: number
  popularTopics: Array<{ topic: string; count: number }>
  difficultyDistribution: Array<{ difficulty: string; count: number }>
  recentActivity: Array<{ action: string; content: string; timestamp: string }>
}

interface AIContentSuggestion {
  type: 'lesson' | 'exercise' | 'project'
  title: string
  description: string
  difficulty: string
  estimatedDevelopmentTime: string
  potentialEngagement: number
  reasoning: string
}

export function ContentManagementDashboard() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [analytics, setAnalytics] = useState<ContentAnalytics | null>(null)
  const [aiSuggestions, setAiSuggestions] = useState<AIContentSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isGeneratingContent, setIsGeneratingContent] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ai-generated' | 'manual'>('all')
  const [selectedType, setSelectedType] = useState<'all' | 'lesson' | 'exercise' | 'project' | 'quiz'>('all')
  const { user } = useUser()

  useEffect(() => {
    loadContentData()
    loadAnalytics()
    loadAISuggestions()
  }, [])

  const loadContentData = async () => {
    try {
      const response = await fetch('/api/content/management')
      if (response.ok) {
        const data = await response.json()
        setContent(data.content || [])
      }
    } catch (error) {
      console.error('Failed to load content:', error)
    }
  }

  const loadAnalytics = async () => {
    try {
      const response = await fetch('/api/content/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data.analytics)
      }
    } catch (error) {
      console.error('Failed to load analytics:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadAISuggestions = async () => {
    try {
      const response = await fetch('/api/ai/content-suggestions')
      if (response.ok) {
        const data = await response.json()
        setAiSuggestions(data.suggestions || [])
      }
    } catch (error) {
      console.error('Failed to load AI suggestions:', error)
    }
  }

  const generateAIContent = async (suggestion: AIContentSuggestion) => {
    setIsGeneratingContent(true)
    try {
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: suggestion.type,
          title: suggestion.title,
          description: suggestion.description,
          difficulty: suggestion.difficulty
        })
      })

      if (response.ok) {
        const data = await response.json()
        // Refresh content list
        await loadContentData()
        await loadAnalytics()
        
        // Remove the suggestion that was implemented
        setAiSuggestions(prev => prev.filter(s => s.title !== suggestion.title))
        
        console.log('AI content generated:', data.contentId)
      }
    } catch (error) {
      console.error('Failed to generate AI content:', error)
    } finally {
      setIsGeneratingContent(false)
    }
  }

  const optimizeContent = async (contentId: string) => {
    try {
      const response = await fetch(`/api/ai/optimize-content/${contentId}`, {
        method: 'POST'
      })

      if (response.ok) {
        const data = await response.json()
        // Update the content item with new AI score
        setContent(prev => 
          prev.map(item => 
            item.id === contentId 
              ? { ...item, aiScore: data.newScore }
              : item
          )
        )
        console.log('Content optimized:', data.improvements)
      }
    } catch (error) {
      console.error('Failed to optimize content:', error)
    }
  }

  const filteredContent = content.filter(item => {
    const typeMatch = selectedType === 'all' || item.type === selectedType
    const filterMatch = selectedFilter === 'all' || 
      (selectedFilter === 'ai-generated' && item.aiGenerated) ||
      (selectedFilter === 'manual' && !item.aiGenerated)
    
    return typeMatch && filterMatch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'lesson': return '📚'
      case 'exercise': return '💪'
      case 'project': return '🏗️'
      case 'quiz': return '❓'
      default: return '📄'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600'
    if (score >= 6) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading content management dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management</h1>
          <p className="text-gray-600">AI-powered content creation and optimization</p>
        </div>
        <Button onClick={() => loadAISuggestions()} disabled={isGeneratingContent}>
          🔄 Refresh AI Suggestions
        </Button>
      </div>

      {/* Analytics Overview */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{analytics.totalContent}</div>
                <div className="text-sm text-gray-600">Total Content</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{analytics.aiGeneratedPercent}%</div>
                <div className="text-sm text-gray-600">AI Generated</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{analytics.averageEngagement.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Avg. Engagement</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{analytics.popularTopics.length}</div>
                <div className="text-sm text-gray-600">Active Topics</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* AI Content Suggestions */}
      {aiSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              🤖 AI Content Suggestions
            </CardTitle>
            <CardDescription>
              AI-recommended content based on user engagement and learning patterns
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {aiSuggestions.slice(0, 3).map((suggestion, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className={getDifficultyColor(suggestion.difficulty)}>
                          {suggestion.difficulty}
                        </Badge>
                        <Badge variant="outline">
                          {getTypeIcon(suggestion.type)} {suggestion.type}
                        </Badge>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {suggestion.potentialEngagement}/10 engagement
                        </Badge>
                      </div>
                      
                      <h4 className="font-semibold mb-1">{suggestion.title}</h4>
                      <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                      <p className="text-xs text-gray-500">
                        <strong>Reasoning:</strong> {suggestion.reasoning}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        <strong>Est. Development:</strong> {suggestion.estimatedDevelopmentTime}
                      </p>
                    </div>
                    
                    <Button
                      onClick={() => generateAIContent(suggestion)}
                      disabled={isGeneratingContent}
                      size="sm"
                    >
                      {isGeneratingContent ? 'Generating...' : 'Generate'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Filter by:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as any)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="all">All Content</option>
                <option value="ai-generated">AI Generated</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Type:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="all">All Types</option>
                <option value="lesson">Lessons</option>
                <option value="exercise">Exercises</option>
                <option value="project">Projects</option>
                <option value="quiz">Quizzes</option>
              </select>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredContent.length} of {content.length} items
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <div className="grid gap-4">
        {filteredContent.map((item) => (
          <Card key={item.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">{getTypeIcon(item.type)}</span>
                    <h3 className="font-semibold">{item.title}</h3>
                    {item.aiGenerated && (
                      <Badge className="bg-blue-100 text-blue-800">
                        🤖 AI Generated
                      </Badge>
                    )}
                    <Badge className={getDifficultyColor(item.difficulty)}>
                      {item.difficulty}
                    </Badge>
                    <Badge variant="outline" className={item.status === 'published' ? 'border-green-500 text-green-700' : 'border-gray-500'}>
                      {item.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>AI Score: <span className={`font-semibold ${getScoreColor(item.aiScore)}`}>{item.aiScore}/10</span></span>
                    <span>Engagement: {item.engagementScore}/10</span>
                    <span>Completion: {item.completionRate}%</span>
                    <span>~{item.estimatedTime}min</span>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.topics.map((topic, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => optimizeContent(item.id)}
                    size="sm"
                    variant="outline"
                  >
                    🚀 Optimize
                  </Button>
                  <Button size="sm" variant="outline">
                    ✏️ Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-gray-600">No content matches the selected filters.</p>
              <Button onClick={() => { setSelectedFilter('all'); setSelectedType('all') }} className="mt-4">
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ContentManagementDashboard
