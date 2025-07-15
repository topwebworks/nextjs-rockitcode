'use client'

import { useState, useEffect, useCallback } from 'react'
import { AIAssistedMonacoEditor } from './ai-assisted-monaco-editor'
import { Video } from './video-player'
import { AILearningAnalytics } from './ai-learning-analytics'
import { clsx } from 'clsx'

interface TimelessChapter {
  id: string
  title: string
  videoUrl: string
  videoTimestamp?: number
  conceptExplanation: string
  timelessPrinciples: string[]
  implementations: ChapterImplementation[]
  aiLearningObjectives: string[]
}

interface ChapterImplementation {
  framework: 'vanilla' | 'react' | 'vue' | 'angular' | 'next'
  difficulty: 'foundation' | 'intermediate' | 'advanced'
  codeTemplate: string
  aiPrompts: AIPromptTemplate[]
  expectedOutcomes: string[]
  commonMistakes: string[]
}

interface AIPromptTemplate {
  trigger: string
  prompt: string
  expectedResponse: string
  learningGoal: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

interface AILessonState {
  currentChapter: TimelessChapter
  selectedFramework: string
  userCode: string
  aiInteractions: number
  conceptsUnderstood: string[]
  strugglingWith: string[]
  nextSuggestedAction: string
}

export function AIEnhancedLessonPlayer() {
  const [lessonState, setLessonState] = useState<AILessonState | null>(null)
  const [currentVideoTime, setCurrentVideoTime] = useState(0)
  const [showAIAnalytics, setShowAIAnalytics] = useState(false)
  const [aiLearningLevel, setAILearningLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner')

  // Mock lesson data (in real app, this would come from API)
  const mockChapter: TimelessChapter = {
    id: 'responsive-navigation-001',
    title: 'Building Responsive Navigation',
    videoUrl: 'https://example.com/responsive-nav-video.mp4',
    videoTimestamp: 0,
    conceptExplanation: `
      Navigation is the backbone of user experience. In this chapter, we'll explore 
      timeless principles of navigation design that remain consistent across all frameworks 
      and technologies. You'll learn how AI can help you implement these principles 
      more efficiently while maintaining your understanding of the core concepts.
    `,
    timelessPrinciples: [
      'Progressive disclosure of navigation options',
      'Consistent navigation patterns across devices',
      'Accessibility-first navigation design',
      'Performance-optimized navigation loading',
      'User-centered navigation hierarchy'
    ],
    implementations: [
      {
        framework: 'vanilla',
        difficulty: 'foundation',
        codeTemplate: `<!-- Foundation: Basic HTML Navigation -->
<nav class="main-navigation">
  <div class="nav-container">
    <div class="nav-brand">
      <a href="#home">Your Logo</a>
    </div>
    <div class="nav-menu">
      <!-- Navigation items go here -->
    </div>
  </div>
</nav>`,
        aiPrompts: [
          {
            trigger: 'responsive',
            prompt: 'Help me make this navigation responsive for mobile devices',
            expectedResponse: 'CSS media queries and mobile-first approach',
            learningGoal: 'Understand responsive design principles',
            difficulty: 'beginner'
          },
          {
            trigger: 'accessibility',
            prompt: 'Add accessibility features to this navigation',
            expectedResponse: 'ARIA attributes and keyboard navigation',
            learningGoal: 'Learn accessibility best practices',
            difficulty: 'beginner'
          }
        ],
        expectedOutcomes: [
          'Working responsive navigation',
          'Understanding of CSS flexbox/grid',
          'Mobile-first design approach'
        ],
        commonMistakes: [
          'Forgetting to test on actual mobile devices',
          'Not considering keyboard navigation',
          'Overlooking loading performance'
        ]
      },
      {
        framework: 'react',
        difficulty: 'intermediate',
        codeTemplate: `// Intermediate: React Navigation Component
import { useState, useEffect } from 'react'

export function ResponsiveNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  return (
    <nav className="main-navigation">
      {/* Component implementation goes here */}
    </nav>
  )
}`,
        aiPrompts: [
          {
            trigger: 'state management',
            prompt: 'Help me manage the mobile menu state effectively',
            expectedResponse: 'useState hook with proper event handling',
            learningGoal: 'Master React state management',
            difficulty: 'intermediate'
          },
          {
            trigger: 'performance',
            prompt: 'Optimize this navigation component for performance',
            expectedResponse: 'useMemo, useCallback, and code splitting',
            learningGoal: 'Learn React performance optimization',
            difficulty: 'intermediate'
          }
        ],
        expectedOutcomes: [
          'Reusable React navigation component',
          'Proper state management',
          'Component optimization techniques'
        ],
        commonMistakes: [
          'Not memoizing expensive calculations',
          'Creating new objects in render',
          'Forgetting to clean up event listeners'
        ]
      }
    ],
    aiLearningObjectives: [
      'Use AI to generate responsive CSS media queries',
      'Collaborate with AI to implement accessibility features',
      'Learn to critically evaluate AI-suggested code',
      'Practice modifying AI suggestions to fit your needs',
      'Develop prompt engineering skills for navigation challenges'
    ]
  }

  useEffect(() => {
    // Initialize lesson state
    setLessonState({
      currentChapter: mockChapter,
      selectedFramework: 'vanilla',
      userCode: mockChapter.implementations[0].codeTemplate,
      aiInteractions: 0,
      conceptsUnderstood: [],
      strugglingWith: [],
      nextSuggestedAction: 'Start by making the navigation responsive'
    })
  }, [])

  const handleVideoTimeUpdate = useCallback((time: number) => {
    setCurrentVideoTime(time)
    
    // Update lesson context based on video timestamp
    if (lessonState) {
      const updatedState = { ...lessonState }
      
      // Example: Auto-suggest AI prompts based on video content
      if (time >= 120 && time <= 180) { // 2-3 minutes into video
        updatedState.nextSuggestedAction = 'Try asking AI: "make this responsive"'
      } else if (time >= 300 && time <= 360) { // 5-6 minutes
        updatedState.nextSuggestedAction = 'Ask AI to add accessibility features'
      }
      
      setLessonState(updatedState)
    }
  }, [lessonState])

  const handleCodeChange = useCallback((newCode: string) => {
    if (lessonState) {
      setLessonState(prev => prev ? {
        ...prev,
        userCode: newCode
      } : null)
    }
  }, [lessonState])

  const handleAIInteraction = useCallback((interaction: any) => {
    if (lessonState) {
      setLessonState(prev => prev ? {
        ...prev,
        aiInteractions: prev.aiInteractions + 1
      } : null)
    }
  }, [lessonState])

  const handleFrameworkChange = useCallback((framework: string) => {
    if (lessonState) {
      const implementation = lessonState.currentChapter.implementations.find(
        impl => impl.framework === framework
      )
      
      if (implementation) {
        setLessonState(prev => prev ? {
          ...prev,
          selectedFramework: framework,
          userCode: implementation.codeTemplate
        } : null)
      }
    }
  }, [lessonState])

  if (!lessonState) {
    return <div className="loading">Loading AI-enhanced lesson...</div>
  }

  const currentImplementation = lessonState.currentChapter.implementations.find(
    impl => impl.framework === lessonState.selectedFramework
  )

  return (
    <div className="ai-enhanced-lesson-player min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Lesson Header */}
      <div className="lesson-header bg-white dark:bg-gray-800 border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{lessonState.currentChapter.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              AI-Enhanced Learning • {lessonState.aiInteractions} AI interactions
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Framework Selector */}
            <select
              value={lessonState.selectedFramework}
              onChange={(e) => handleFrameworkChange(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              {lessonState.currentChapter.implementations.map(impl => (
                <option key={impl.framework} value={impl.framework}>
                  {impl.framework} ({impl.difficulty})
                </option>
              ))}
            </select>
            
            {/* AI Level Selector */}
            <select
              value={aiLearningLevel}
              onChange={(e) => setAILearningLevel(e.target.value as any)}
              className="px-3 py-2 border rounded"
            >
              <option value="beginner">AI Beginner</option>
              <option value="intermediate">AI Intermediate</option>
              <option value="advanced">AI Advanced</option>
            </select>
            
            <button
              onClick={() => setShowAIAnalytics(!showAIAnalytics)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              AI Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="lesson-content flex flex-1">
        {/* Video Section */}
        <div className="video-section w-1/2 p-4">
          <Video
            src={lessonState.currentChapter.videoUrl}
            onTimeUpdate={(e) => {
              const video = e.currentTarget
              handleVideoTimeUpdate(video.currentTime)
            }}
            className="mb-4"
          />
          
          {/* Concept Explanation */}
          <div className="concept-explanation bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
            <h3 className="font-semibold mb-2">🎯 Core Concepts</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              {lessonState.currentChapter.conceptExplanation}
            </p>
            
            <h4 className="font-medium mb-2">Timeless Principles:</h4>
            <ul className="text-sm space-y-1">
              {lessonState.currentChapter.timelessPrinciples.map((principle, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Learning Objectives */}
          <div className="ai-objectives bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h3 className="font-semibold mb-2">🤖 AI Collaboration Goals</h3>
            <ul className="text-sm space-y-1">
              {lessonState.currentChapter.aiLearningObjectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Code Editor Section */}
        <div className="editor-section w-1/2 p-4">
          <AIAssistedMonacoEditor
            value={lessonState.userCode}
            onChange={handleCodeChange}
            language={lessonState.selectedFramework === 'vanilla' ? 'html' : 'typescript'}
            height="400px"
            aiConfig={{
              enabled: true,
              fallbackMode: true,
              contextAware: true
            }}
            learningLevel={{
              current: aiLearningLevel,
              aiAssistanceLevel: aiLearningLevel === 'beginner' ? 'high' : 
                               aiLearningLevel === 'intermediate' ? 'balanced' : 'strategic',
              nextMilestone: 'Complete responsive navigation challenge'
            }}
            lessonContext={{
              topic: lessonState.currentChapter.title,
              objectives: lessonState.currentChapter.aiLearningObjectives,
              currentConcept: `${lessonState.selectedFramework} navigation at ${currentImplementation?.difficulty} level`
            }}
            onAIInteraction={handleAIInteraction}
            enableCodeReview={true}
            enableExplanations={true}
            showAIAttribution={true}
          />

          {/* Quick AI Prompts */}
          {currentImplementation && (
            <div className="quick-prompts mt-4 bg-white dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-2">💡 Suggested AI Prompts</h3>
              <div className="grid grid-cols-1 gap-2">
                {currentImplementation.aiPrompts.map((promptTemplate, index) => (
                  <button
                    key={index}
                    className="text-left p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => {
                      // Auto-fill AI prompt (would integrate with AIAssistedMonacoEditor)
                      console.log('Auto-fill prompt:', promptTemplate.prompt)
                    }}
                  >
                    <div className="font-medium">{promptTemplate.trigger}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-xs">
                      Goal: {promptTemplate.learningGoal}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Progress Indicator */}
          <div className="progress-indicator mt-4 bg-white dark:bg-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">📈 Learning Progress</h3>
            <div className="text-sm space-y-2">
              <div>Next Action: {lessonState.nextSuggestedAction}</div>
              <div>AI Interactions: {lessonState.aiInteractions}</div>
              <div>Video Progress: {Math.round((currentVideoTime / 600) * 100)}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Analytics Modal */}
      {showAIAnalytics && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">AI Learning Analytics</h2>
              <button
                onClick={() => setShowAIAnalytics(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <AILearningAnalytics
              userId="user-123"
              courseId="responsive-design-course"
              lessonId={lessonState.currentChapter.id}
              timeframe="week"
              showDetailedMetrics={true}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default AIEnhancedLessonPlayer
