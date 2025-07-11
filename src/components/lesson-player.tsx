'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { VideoPlayer } from '@/components/video-player-component'
import { MobileCodeEditor } from '@/components/mobile-code-editor'
import { LessonProgress } from '@/components/lesson-progress'
import { TouchGestureProvider } from '@/components/touch-gesture-provider'
import { PlayIcon } from '@/icons/play-icon'
import { ChevronRightIcon } from '@/icons/chevron-right-icon'
import { CheckmarkIcon } from '@/icons/checkmark-icon'
import { clsx } from 'clsx'

export interface LessonComponent {
  // Video integration
  video: {
    source: string // YouTube embed URL
    chapters: VideoChapter[] // For mobile scrubbing
    autoPlay: boolean // false for mobile data savings
    playbackSpeeds: number[] // [0.75, 1, 1.25, 1.5]
    captions: boolean // always true for accessibility
  }
  
  // Interactive editor
  codeEditor: {
    template: string // Starter code
    solution: string // Expected outcome
    hints: string[] // Progressive help system
    validation: ValidationRule[] // Real-time checking
    mobileOptimizations: MobileEditorConfig
  }
  
  // Gamification
  challenges: {
    type: 'multiple-choice' | 'code-completion' | 'bug-fix' | 'build-feature'
    difficulty: 1 | 2 | 3 | 4 | 5
    timeEstimate: number // minutes
    points: number
    achievements: string[] // Unlockable badges
  }
  
  // Mobile-specific features
  mobileFeatures: {
    voiceCoding: boolean
    hapticFeedback: boolean
    offlineMode: boolean
    portraitOptimized: boolean
    gestureControls: GestureConfig
  }
}

interface VideoChapter {
  title: string
  timestamp: number
}

interface ValidationRule {
  rule: string
  message: string
}

interface MobileEditorConfig {
  fontSize: number
  lineHeight: number
  touchTargets: number
  wordWrap: boolean
  minimap: boolean
}

interface GestureConfig {
  swipeLeft: string
  swipeRight: string
  doubleTap: string
  longPress: string
}

interface LessonPlayerProps {
  lesson: LessonComponent
  onComplete?: () => void
  onProgress?: (progress: number) => void
  className?: string
}

export function LessonPlayer({ 
  lesson, 
  onComplete, 
  onProgress,
  className = '' 
}: LessonPlayerProps) {
  const [currentView, setCurrentView] = useState<'video' | 'code' | 'split'>('video')
  const [videoProgress, setVideoProgress] = useState(0)
  const [codeProgress, setCodeProgress] = useState(0)
  const [showHints, setShowHints] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const [achievements, setAchievements] = useState<string[]>([])
  const [isCompleted, setIsCompleted] = useState(false)

  // Stable refs for callbacks to prevent infinite re-renders
  const onProgressRef = useRef(onProgress)
  const onCompleteRef = useRef(onComplete)
  
  useEffect(() => {
    onProgressRef.current = onProgress
    onCompleteRef.current = onComplete
  })

  // Mobile viewport detection
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Calculate overall progress
  const overallProgress = useMemo(() => (videoProgress + codeProgress) / 2, [videoProgress, codeProgress])
  
  useEffect(() => {
    onProgressRef.current?.(overallProgress)
    if (overallProgress >= 90 && !isCompleted) {
      setIsCompleted(true)
      onCompleteRef.current?.()
      if (lesson.mobileFeatures.hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate([50, 100, 50])
      }
    }
  }, [overallProgress, isCompleted, lesson.mobileFeatures.hapticFeedback])

  // Haptic feedback for mobile
  const triggerHapticFeedback = useCallback((type: 'light' | 'medium' | 'heavy' | 'success') => {
    if (lesson.mobileFeatures.hapticFeedback && 'vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [50],
        success: [50, 100, 50]
      }
      navigator.vibrate(patterns[type])
    }
  }, [lesson.mobileFeatures.hapticFeedback])

  // Touch gesture handlers
  const handleGesture = useCallback((gesture: string) => {
    const { gestureControls } = lesson.mobileFeatures
    
    switch (gesture) {
      case 'swipeLeft':
        if (gestureControls.swipeLeft === 'next-lesson') {
          // Navigate to next lesson
          if (lesson.mobileFeatures.hapticFeedback && 'vibrate' in navigator) {
            navigator.vibrate([10])
          }
        }
        break
      case 'swipeRight':
        if (gestureControls.swipeRight === 'previous-lesson') {
          // Navigate to previous lesson
          if (lesson.mobileFeatures.hapticFeedback && 'vibrate' in navigator) {
            navigator.vibrate([10])
          }
        }
        break
      case 'doubleTap':
        if (gestureControls.doubleTap === 'run-code') {
          // Execute code
          if (lesson.mobileFeatures.hapticFeedback && 'vibrate' in navigator) {
            navigator.vibrate([20])
          }
        }
        break
      case 'longPress':
        if (gestureControls.longPress === 'show-hints') {
          setShowHints(!showHints)
          if (lesson.mobileFeatures.hapticFeedback && 'vibrate' in navigator) {
            navigator.vibrate([20])
          }
        }
        break
    }
  }, [lesson.mobileFeatures.gestureControls, lesson.mobileFeatures.hapticFeedback, showHints])

  // Mobile-optimized layout switching
  const getLayoutForMobile = () => {
    if (!isMobile) return 'split'
    if (lesson.mobileFeatures.portraitOptimized) {
      return 'video' // Start with video on mobile
    }
    return currentView
  }

  const actualView = isMobile ? getLayoutForMobile() : currentView

  return (
    <TouchGestureProvider onGesture={handleGesture}>
      <div className={clsx(
        'flex flex-col h-full bg-gray-50 dark:bg-gray-900',
        className
      )}>
        {/* Mobile Progress Bar */}
        {isMobile && (
          <div className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <LessonProgress progress={overallProgress} />
          </div>
        )}

        {/* Mobile View Switcher */}
        {isMobile && (
          <div className="flex bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setCurrentView('video')}
              className={clsx(
                'flex-1 py-3 text-sm font-medium transition-colors',
                currentView === 'video' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              📺 Watch
            </button>
            <button
              onClick={() => setCurrentView('code')}
              className={clsx(
                'flex-1 py-3 text-sm font-medium transition-colors',
                currentView === 'code' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              )}
            >
              💻 Code
            </button>
          </div>
        )}

        {/* Main Content Area */}
        <div className={clsx(
          'flex-1 flex',
          isMobile ? 'flex-col' : 'flex-row'
        )}>
          {/* Video Section */}
          {(actualView === 'video' || actualView === 'split') && (
            <div className={clsx(
              'bg-white dark:bg-gray-800',
              actualView === 'split' ? 'w-1/2' : 'w-full'
            )}>
              <VideoPlayer
                src={lesson.video.source}
                poster="/api/placeholder/800/450"
                onProgress={setVideoProgress}
                chapters={lesson.video.chapters}
                playbackSpeeds={lesson.video.playbackSpeeds}
                captions={lesson.video.captions}
                mobileOptimized={isMobile}
                className="h-full"
              />
            </div>
          )}

          {/* Code Editor Section */}
          {(actualView === 'code' || actualView === 'split') && (
            <div className={clsx(
              'bg-gray-900',
              actualView === 'split' ? 'w-1/2' : 'w-full'
            )}>
              <MobileCodeEditor
                initialCode={lesson.codeEditor.template}
                solution={lesson.codeEditor.solution}
                language="html"
                validation={lesson.codeEditor.validation}
                hints={lesson.codeEditor.hints}
                onProgress={setCodeProgress}
                mobileConfig={lesson.codeEditor.mobileOptimizations}
                showHints={showHints}
                onHintRequest={() => setShowHints(true)}
                className="h-full"
              />
            </div>
          )}
        </div>

        {/* Mobile Hint Panel */}
        {isMobile && showHints && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-blue-900 dark:text-blue-100">
                💡 Hint {currentHint + 1} of {lesson.codeEditor.hints.length}
              </h3>
              <button
                onClick={() => setShowHints(false)}
                className="text-blue-600 hover:text-blue-800"
              >
                ✕
              </button>
            </div>
            <p className="text-blue-800 dark:text-blue-200 text-sm">
              {lesson.codeEditor.hints[currentHint]}
            </p>
            <div className="flex justify-between mt-3">
              <button
                onClick={() => setCurrentHint(Math.max(0, currentHint - 1))}
                disabled={currentHint === 0}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded disabled:opacity-50"
              >
                ← Previous
              </button>
              <button
                onClick={() => setCurrentHint(Math.min(lesson.codeEditor.hints.length - 1, currentHint + 1))}
                disabled={currentHint === lesson.codeEditor.hints.length - 1}
                className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded disabled:opacity-50"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Mobile Achievement Notification */}
        {achievements.length > 0 && (
          <div className="fixed bottom-4 left-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg animate-bounce z-20">
            <div className="flex items-center">
              <CheckmarkIcon className="w-5 h-5 mr-2" />
              <span className="font-medium">Achievement Unlocked: {achievements[achievements.length - 1]}</span>
            </div>
          </div>
        )}

        {/* Completion Celebration */}
        {isCompleted && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mx-4 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h2 className="text-xl font-bold mb-2">Lesson Complete!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                You earned {lesson.challenges.points} points
              </p>
              <button
                onClick={() => setIsCompleted(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Continue Learning
              </button>
            </div>
          </div>
        )}
      </div>
    </TouchGestureProvider>
  )
}
