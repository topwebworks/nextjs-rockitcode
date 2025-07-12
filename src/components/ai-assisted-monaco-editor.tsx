'use client'

import { useState, useEffect, useCallback } from 'react'
import { EnhancedMonacoEditor } from './enhanced-monaco-editor'
import { clsx } from 'clsx'

interface AIAssistantIntegration {
  enabled: boolean
  userProvider?: {
    type: 'openai' | 'anthropic' | 'github' | 'custom'
    name: string
    hasValidCredentials: boolean
    monthlyUsage: number
    monthlyBudget: number
    costPerRequest: number
  }
  fallbackMode: boolean // True when no AI provider connected
  contextAware: boolean
}

interface AIResponse {
  suggestion: string
  explanation: string
  confidence: number // 0-1 scale
  alternatives: string[]
  warnings?: string[]
}

interface AICodeReview {
  issues: AIIssue[]
  improvements: AIImprovement[]
  score: number // 1-10 overall code quality
  learningPoints: string[]
}

interface AIIssue {
  line: number
  column: number
  severity: 'error' | 'warning' | 'info'
  message: string
  suggestion: string
  learnMore?: string
}

interface AIImprovement {
  description: string
  before: string
  after: string
  reasoning: string
  impact: 'performance' | 'accessibility' | 'maintainability' | 'security'
}

interface AILearningLevel {
  current: 'beginner' | 'intermediate' | 'advanced'
  aiAssistanceLevel: 'high' | 'balanced' | 'strategic'
  nextMilestone: string
}

export interface AIAssistedMonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
  
  // AI Configuration
  aiConfig: AIAssistantIntegration
  learningLevel: AILearningLevel
  lessonContext?: {
    topic: string
    objectives: string[]
    currentConcept: string
  }
  
  // Learning Features
  onAIInteraction?: (interaction: AIInteraction) => void
  enableCodeReview?: boolean
  enableExplanations?: boolean
  showAIAttribution?: boolean
}

interface AIInteraction {
  type: 'suggestion' | 'explanation' | 'review' | 'prompt'
  input: string
  output: string
  timestamp: Date
  accepted: boolean
  humanModifications?: string
}

export function AIAssistedMonacoEditor({
  value,
  onChange,
  language,
  height = '400px',
  aiConfig,
  learningLevel,
  lessonContext,
  onAIInteraction,
  enableCodeReview = true,
  enableExplanations = true,
  showAIAttribution = true
}: AIAssistedMonacoEditorProps) {
  const [aiSuggestion, setAISuggestion] = useState<AIResponse | null>(null)
  const [codeReview, setCodeReview] = useState<AICodeReview | null>(null)
  const [isAIThinking, setIsAIThinking] = useState(false)
  const [aiPrompt, setAIPrompt] = useState('')
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [interactions, setInteractions] = useState<AIInteraction[]>([])

  // Mock AI responses for demo (replace with real AI integration)
  const generateAISuggestion = useCallback(async (code: string, prompt: string): Promise<AIResponse> => {
    // Simulate AI thinking time
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock responses based on common scenarios
    if (prompt.toLowerCase().includes('responsive')) {
      return {
        suggestion: `/* AI Suggestion: Add responsive breakpoints */
@media (max-width: 768px) {
  .navigation {
    flex-direction: column;
    padding: 1rem;
  }
}

@media (min-width: 769px) {
  .navigation {
    flex-direction: row;
    padding: 0 2rem;
  }
}`,
        explanation: "I added responsive breakpoints using mobile-first design principles. This ensures your navigation adapts well to different screen sizes.",
        confidence: 0.9,
        alternatives: [
          "Use CSS Grid with auto-fit for automatic responsiveness",
          "Implement container queries for more granular control",
          "Use CSS-in-JS with dynamic breakpoints"
        ],
        warnings: ["Remember to test on actual devices, not just browser resize"]
      }
    }

    if (prompt.toLowerCase().includes('accessibility')) {
      return {
        suggestion: `<!-- AI Suggestion: Add accessibility features -->
<nav role="navigation" aria-label="Main navigation">
  <button 
    class="menu-toggle"
    aria-expanded="false"
    aria-controls="navigation-menu"
    aria-label="Toggle navigation menu"
  >
    <span class="sr-only">Menu</span>
    <span class="hamburger-icon" aria-hidden="true"></span>
  </button>
  
  <ul id="navigation-menu" class="nav-list">
    <li><a href="#home" aria-current="page">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>`,
        explanation: "I added ARIA attributes, semantic HTML, and screen reader support. This makes your navigation accessible to users with disabilities.",
        confidence: 0.95,
        alternatives: [
          "Use skip navigation links for keyboard users",
          "Add focus management for SPA navigation",
          "Implement voice navigation support"
        ]
      }
    }

    // Default response
    return {
      suggestion: `// AI analyzed your code and suggests:\n// Consider adding error handling and input validation\n// This improves code reliability and user experience`,
      explanation: "Based on your current code, I recommend adding defensive programming practices.",
      confidence: 0.7,
      alternatives: ["Add TypeScript for better type safety", "Implement unit tests", "Add JSDoc comments"]
    }
  }, [])

  const performCodeReview = useCallback(async (code: string): Promise<AICodeReview> => {
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock code review based on common issues
    const issues: AIIssue[] = []
    const improvements: AIImprovement[] = []
    
    // Check for accessibility issues
    if (!code.includes('aria-') && code.includes('<nav')) {
      issues.push({
        line: 1,
        column: 1,
        severity: 'warning',
        message: 'Missing ARIA attributes for navigation',
        suggestion: 'Add aria-label and role attributes for better accessibility',
        learnMore: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA'
      })
    }

    // Check for performance issues
    if (code.includes('document.querySelector') && !code.includes('getElementById')) {
      improvements.push({
        description: 'Optimize DOM queries for better performance',
        before: 'document.querySelector(".menu")',
        after: 'document.getElementById("menu")',
        reasoning: 'getElementById is faster than querySelector for ID-based selections',
        impact: 'performance'
      })
    }

    // Check for modern CSS usage
    if (code.includes('float:') || code.includes('clearfix')) {
      improvements.push({
        description: 'Use modern CSS layout methods',
        before: 'float: left; clear: both;',
        after: 'display: flex; justify-content: space-between;',
        reasoning: 'Flexbox provides more control and is easier to maintain than floats',
        impact: 'maintainability'
      })
    }

    const score = Math.max(1, 10 - (issues.length * 2) - improvements.length)

    return {
      issues,
      improvements,
      score,
      learningPoints: [
        'Always consider accessibility when building navigation',
        'Modern CSS layout methods are more reliable than legacy approaches',
        'Performance optimization should be built-in, not an afterthought'
      ]
    }
  }, [])

  const handleAIPrompt = async () => {
    if (!aiPrompt.trim() || !aiConfig.enabled) return

    setIsAIThinking(true)
    
    try {
      const response = await generateAISuggestion(value, aiPrompt)
      setAISuggestion(response)
      
      const interaction: AIInteraction = {
        type: 'prompt',
        input: aiPrompt,
        output: response.suggestion,
        timestamp: new Date(),
        accepted: false
      }
      
      setInteractions(prev => [...prev, interaction])
      onAIInteraction?.(interaction)
      
    } catch (error) {
      console.error('AI suggestion failed:', error)
    } finally {
      setIsAIThinking(false)
      setAIPrompt('')
    }
  }

  const acceptAISuggestion = () => {
    if (!aiSuggestion) return
    
    const newValue = value + '\n\n' + aiSuggestion.suggestion
    onChange(newValue)
    
    // Update interaction record
    setInteractions(prev => 
      prev.map(interaction => 
        interaction.output === aiSuggestion.suggestion 
          ? { ...interaction, accepted: true }
          : interaction
      )
    )
    
    setAISuggestion(null)
  }

  const requestCodeReview = async () => {
    if (!enableCodeReview || !value.trim()) return
    
    setIsAIThinking(true)
    try {
      const review = await performCodeReview(value)
      setCodeReview(review)
    } catch (error) {
      console.error('Code review failed:', error)
    } finally {
      setIsAIThinking(false)
    }
  }

  // Auto-review on significant code changes
  useEffect(() => {
    if (enableCodeReview && value.length > 100) {
      const timeoutId = setTimeout(() => {
        requestCodeReview()
      }, 3000) // Review after 3 seconds of no changes
      
      return () => clearTimeout(timeoutId)
    }
  }, [value, enableCodeReview])

  return (
    <div className="ai-assisted-editor">
      {/* AI Configuration Status */}
      <div className="ai-status-bar flex items-center justify-between p-2 bg-gray-100 dark:bg-gray-800 text-sm">
        <div className="flex items-center space-x-2">
          <div className={clsx(
            "w-2 h-2 rounded-full",
            aiConfig.enabled && aiConfig.userProvider?.hasValidCredentials ? "bg-green-500" : "bg-gray-400"
          )} />
          <span>
            AI Assistant: {
              aiConfig.enabled && aiConfig.userProvider?.hasValidCredentials
                ? `${aiConfig.userProvider.name} Active`
                : aiConfig.fallbackMode
                ? 'Learning Mode (No AI)'
                : 'Disabled'
            }
          </span>
          {aiConfig.userProvider && (
            <span className="text-xs text-gray-500">
              (${aiConfig.userProvider.monthlyUsage.toFixed(2)}/${aiConfig.userProvider.monthlyBudget}/month)
            </span>
          )}
          {lessonContext && (
            <span className="text-gray-600 dark:text-gray-400">
              • Learning: {lessonContext.currentConcept}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">
            Level: {learningLevel.current} ({learningLevel.aiAssistanceLevel} assistance)
          </span>
          <button
            onClick={() => setShowAIPanel(!showAIPanel)}
            className={clsx(
              "px-2 py-1 text-xs rounded hover:opacity-80",
              aiConfig.enabled && aiConfig.userProvider?.hasValidCredentials
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            )}
          >
            {aiConfig.fallbackMode ? 'Setup AI' : 'AI Panel'}
          </button>
        </div>
      </div>

      <div className="editor-container flex">
        {/* Main Editor */}
        <div className="flex-1">
          <EnhancedMonacoEditor
            value={value}
            onChange={onChange}
            language={language}
            height={height}
            // Pass through additional props as needed
          />
        </div>

        {/* AI Assistant Panel */}
        {showAIPanel && (
          <div className="ai-panel w-80 border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="p-4 space-y-4">
              
              {/* No AI Provider Setup */}
              {aiConfig.fallbackMode && (
                <div className="no-ai-setup bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                    🚀 Supercharge Your Learning with AI
                  </h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300 mb-4">
                    Connect your own AI account to get instant code suggestions, explanations, and learning assistance.
                  </p>
                  <div className="space-y-2 text-xs text-blue-600 dark:text-blue-400 mb-4">
                    <div>• Use your existing GitHub Copilot subscription</div>
                    <div>• Or spend just $3-10/month on OpenAI/Claude</div>
                    <div>• Full control over your AI usage and costs</div>
                    <div>• All lessons work perfectly without AI too!</div>
                  </div>
                  <button
                    onClick={() => {
                      // Navigate to AI setup page
                      window.location.href = '/settings/ai-accounts'
                    }}
                    className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                  >
                    Connect Your AI Account
                  </button>
                  <button
                    onClick={() => setShowAIPanel(false)}
                    className="w-full px-3 py-2 mt-2 border border-blue-300 text-blue-600 rounded hover:bg-blue-50 text-sm"
                  >
                    Continue Without AI
                  </button>
                </div>
              )}

              {/* AI Provider Connected */}
              {aiConfig.enabled && aiConfig.userProvider?.hasValidCredentials && (
                <>
                  {/* AI Prompt Input */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium">
                        Ask AI Assistant
                      </label>
                      <span className="text-xs text-gray-500">
                        ${aiConfig.userProvider.costPerRequest.toFixed(3)}/request
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={aiPrompt}
                        onChange={(e) => setAIPrompt(e.target.value)}
                        placeholder="e.g., 'make this responsive' or 'add accessibility'"
                        className="flex-1 px-3 py-2 border rounded text-sm"
                        onKeyPress={(e) => e.key === 'Enter' && handleAIPrompt()}
                        disabled={!aiConfig.enabled || isAIThinking}
                      />
                      <button
                        onClick={handleAIPrompt}
                        disabled={!aiConfig.enabled || isAIThinking || !aiPrompt.trim()}
                        className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                      >
                        {isAIThinking ? '...' : 'Ask'}
                      </button>
                    </div>
                  </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAIPrompt('make this responsive')}
                    className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
                  >
                    Make Responsive
                  </button>
                  <button
                    onClick={() => setAIPrompt('add accessibility')}
                    className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
                  >
                    Add A11y
                  </button>
                  <button
                    onClick={() => setAIPrompt('optimize performance')}
                    className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
                  >
                    Optimize
                  </button>
                  <button
                    onClick={requestCodeReview}
                    className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
                    disabled={isAIThinking}
                  >
                    Review Code
                  </button>
                </div>
              </div>

              {/* AI Suggestion Display */}
              {aiSuggestion && (
                <div className="border rounded p-3 bg-blue-50 dark:bg-blue-900/20">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">AI Suggestion</h4>
                    <span className="text-xs text-gray-500">
                      Confidence: {Math.round(aiSuggestion.confidence * 100)}%
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {aiSuggestion.explanation}
                  </p>
                  
                  <pre className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded mb-3 overflow-x-auto">
                    {aiSuggestion.suggestion}
                  </pre>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={acceptAISuggestion}
                      className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => setAISuggestion(null)}
                      className="px-3 py-1 text-xs border rounded hover:bg-gray-50"
                    >
                      Dismiss
                    </button>
                  </div>
                  
                  {aiSuggestion.alternatives.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-medium mb-1">Alternatives:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {aiSuggestion.alternatives.map((alt, index) => (
                          <li key={index}>• {alt}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Code Review Results */}
              {codeReview && (
                <div className="border rounded p-3">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium">Code Review</h4>
                    <span className={clsx(
                      "text-xs px-2 py-1 rounded",
                      codeReview.score >= 8 ? "bg-green-100 text-green-800" :
                      codeReview.score >= 6 ? "bg-yellow-100 text-yellow-800" :
                      "bg-red-100 text-red-800"
                    )}>
                      Score: {codeReview.score}/10
                    </span>
                  </div>

                  {codeReview.issues.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium mb-1">Issues Found:</p>
                      <div className="space-y-1">
                        {codeReview.issues.map((issue, index) => (
                          <div key={index} className="text-xs p-2 bg-yellow-50 rounded">
                            <p className="font-medium">{issue.message}</p>
                            <p className="text-gray-600">{issue.suggestion}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {codeReview.improvements.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs font-medium mb-1">Improvements:</p>
                      <div className="space-y-1">
                        {codeReview.improvements.map((improvement, index) => (
                          <div key={index} className="text-xs p-2 bg-blue-50 rounded">
                            <p className="font-medium">{improvement.description}</p>
                            <p className="text-gray-600">{improvement.reasoning}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {codeReview.learningPoints.length > 0 && (
                    <div>
                      <p className="text-xs font-medium mb-1">Learning Points:</p>
                      <ul className="text-xs text-gray-600 space-y-1">
                        {codeReview.learningPoints.map((point, index) => (
                          <li key={index}>💡 {point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* AI Attribution & Learning */}
              {showAIAttribution && interactions.length > 0 && (
                <div className="border-t pt-3">
                  <h4 className="text-xs font-medium mb-2">AI Interaction History</h4>
                  <div className="text-xs text-gray-600 space-y-1">
                    <p>AI-assisted coding: {interactions.filter(i => i.accepted).length} suggestions used</p>
                    <p>Human modifications: {interactions.filter(i => i.humanModifications).length}</p>
                    <p className="font-medium">
                      Remember: You're learning to collaborate with AI, not depend on it.
                    </p>
                  </div>
                </div>
              )}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* AI Learning Progress */}
      <div className="ai-progress-bar p-2 bg-gray-50 dark:bg-gray-800 text-xs">
        <div className="flex justify-between items-center">
          <span>
            AI Collaboration Progress: {learningLevel.current} level
          </span>
          <span className="text-gray-500">
            Next milestone: {learningLevel.nextMilestone}
          </span>
        </div>
      </div>
    </div>
  )
}

export default AIAssistedMonacoEditor
