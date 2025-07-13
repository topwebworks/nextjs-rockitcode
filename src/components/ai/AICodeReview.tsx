// Week 6: AI Code Review Component
// Advanced code analysis with AI-powered feedback and suggestions

'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface CodeReviewFeedback {
  score: number
  feedback: string
  suggestions: string[]
  strengths: string[]
  weaknesses: string[]
  improvements: Array<{
    line?: number
    type: 'bug' | 'performance' | 'style' | 'best-practice'
    message: string
    suggestion: string
  }>
}

interface AICodeReviewProps {
  initialCode?: string
  language?: string
  context?: string
  onReviewComplete?: (feedback: CodeReviewFeedback) => void
  className?: string
}

export function AICodeReview({ 
  initialCode = '', 
  language = 'javascript', 
  context = '', 
  onReviewComplete,
  className 
}: AICodeReviewProps) {
  const [code, setCode] = useState(initialCode)
  const [feedback, setFeedback] = useState<CodeReviewFeedback | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const analyzeCode = async () => {
    if (!code.trim()) {
      setError('Please enter some code to review')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai/code-review', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          language,
          context
        })
      })

      if (!response.ok) {
        throw new Error('Failed to analyze code')
      }

      const data = await response.json()
      const reviewFeedback = data.feedback

      setFeedback(reviewFeedback)
      onReviewComplete?.(reviewFeedback)
    } catch (error) {
      console.error('Code review error:', error)
      setError('Failed to analyze code. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'bg-green-100 text-green-800 border-green-200'
    if (score >= 6) return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    return 'bg-red-100 text-red-800 border-red-200'
  }

  const getImprovementColor = (type: string) => {
    switch (type) {
      case 'bug': return 'bg-red-100 text-red-800'
      case 'performance': return 'bg-orange-100 text-orange-800'
      case 'style': return 'bg-blue-100 text-blue-800'
      case 'best-practice': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🔍 AI Code Review
            <Badge variant="outline" className="text-xs">
              {language}
            </Badge>
          </CardTitle>
          <CardDescription>
            Get instant AI-powered feedback on your code quality, performance, and best practices
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Code Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Code to Review
            </label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-64 p-3 border rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={`Enter your ${language} code here...`}
            />
          </div>

          {/* Context Input */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Context (Optional)
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 'This is a React component for user authentication'"
            />
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Analyze Button */}
          <Button 
            onClick={analyzeCode} 
            disabled={isLoading || !code.trim()}
            className="w-full"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing Code...
              </div>
            ) : (
              'Analyze Code'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Feedback Results */}
      {feedback && (
        <div className="space-y-4">
          {/* Overall Score */}
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-lg font-semibold border ${getScoreColor(feedback.score)}`}>
                  Score: {feedback.score}/10
                </div>
                <p className="mt-2 text-gray-600">{feedback.feedback}</p>
              </div>
            </CardContent>
          </Card>

          {/* Strengths and Weaknesses */}
          <div className="grid md:grid-cols-2 gap-4">
            {feedback.strengths.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-700 flex items-center gap-2">
                    ✅ Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feedback.strengths.map((strength, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-green-500 mt-0.5">•</span>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {feedback.weaknesses.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-red-700 flex items-center gap-2">
                    ⚠️ Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feedback.weaknesses.map((weakness, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <span className="text-red-500 mt-0.5">•</span>
                        {weakness}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Detailed Improvements */}
          {feedback.improvements.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🛠️ Detailed Improvements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {feedback.improvements.map((improvement, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Badge 
                          className={`${getImprovementColor(improvement.type)} border`}
                        >
                          {improvement.type.replace('-', ' ')}
                        </Badge>
                        {improvement.line && (
                          <Badge variant="outline" className="text-xs">
                            Line {improvement.line}
                          </Badge>
                        )}
                      </div>
                      
                      <div className="mt-3 space-y-2">
                        <p className="text-sm text-gray-700">
                          <strong>Issue:</strong> {improvement.message}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Suggestion:</strong> {improvement.suggestion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* General Suggestions */}
          {feedback.suggestions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  💡 General Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feedback.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-blue-500 mt-0.5">•</span>
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}

export default AICodeReview
