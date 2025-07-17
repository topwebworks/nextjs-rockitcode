'use client'

import React, { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import VSCodeLearningJourney from './vscode-basics/VSCodeLearningJourney'
import GitHubLearningJourney from './github-basics/GitHubLearningJourney'
import HTMLMastery from './HTMLMastery'

type LearningPhase = 'chapter-1-vscode' | 'chapter-2-git' | 'chapter-3-html-concepts' | 'chapter-4-html-practice'

// Foundation Learning Journey: Chapter 1 VSCode → Chapter 2 Git/GitHub → Chapter 3 HTML Concepts → Chapter 4 HTML Practice
export default function FoundationLearningJourney() {
  const { user, isLoading } = useUser()
  const [currentPhase, setCurrentPhase] = useState<LearningPhase>('chapter-1-vscode')
  const [completedPhases, setCompletedPhases] = useState<Set<LearningPhase>>(new Set())

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('foundation-progress')
    if (savedProgress) {
      const { phase, completed } = JSON.parse(savedProgress)
      setCurrentPhase(phase)
      setCompletedPhases(new Set(completed))
    }
  }, [])

  // Save progress to localStorage
  const saveProgress = (phase: LearningPhase, completed: Set<LearningPhase>) => {
    localStorage.setItem('foundation-progress', JSON.stringify({
      phase,
      completed: Array.from(completed)
    }))
  }

  const completePhase = (phase: LearningPhase) => {
    const newCompleted = new Set([...completedPhases, phase])
    setCompletedPhases(newCompleted)
    
    // Auto-advance to next phase
    const phases: LearningPhase[] = ['chapter-1-vscode', 'chapter-2-git', 'chapter-3-html-concepts', 'chapter-4-html-practice']
    const currentIndex = phases.indexOf(phase)
    if (currentIndex < phases.length - 1) {
      const nextPhase = phases[currentIndex + 1]
      setCurrentPhase(nextPhase)
      saveProgress(nextPhase, newCompleted)
    }
  }

  const navigateToPhase = (phase: LearningPhase) => {
    setCurrentPhase(phase)
    saveProgress(phase, completedPhases)
  }

  // Progress calculation
  const totalPhases = 4
  const completedCount = completedPhases.size
  const overallProgress = Math.round((completedCount / totalPhases) * 100)

  // Phase navigation header
  const renderPhaseNavigation = () => (
    <div className="sticky top-0 z-40 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-white">Foundation Course: Start From Zero</h1>
          <div className="text-sm text-gray-300">
            Progress: {completedCount}/{totalPhases} ({overallProgress}%)
          </div>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto">
          {[
            { id: 'chapter-1-vscode', label: 'Chapter 1: VSCode Basics', icon: '💻' },
            { id: 'chapter-2-git', label: 'Chapter 2: Git Basics', icon: '🔄' },
            { id: 'chapter-3-html-concepts', label: 'Chapter 3: HTML Concepts', icon: '📝' },
            { id: 'chapter-4-html-practice', label: 'Chapter 4: HTML Practice', icon: '🎯' }
          ].map((phase, index) => {
            const isCompleted = completedPhases.has(phase.id as LearningPhase)
            const isCurrent = currentPhase === phase.id
            const isAccessible = index === 0 || completedPhases.has(['vscode', 'github', 'html-concepts'][index - 1] as LearningPhase)
            
            return (
              <button
                key={phase.id}
                onClick={() => isAccessible && navigateToPhase(phase.id as LearningPhase)}
                disabled={!isAccessible}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  isCurrent
                    ? 'bg-blue-600 text-white'
                    : isCompleted
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : isAccessible
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>{phase.icon}</span>
                <span>{phase.label}</span>
                {isCompleted && <span className="text-green-300">✓</span>}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )

  // User authentication check
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Sign in Required</h2>
          <p className="text-gray-300 mb-6">
            Please sign in to access the Foundation Course and track your learning progress from the very beginning.
          </p>
          <a 
            href="/"
            className="inline-block px-6 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Go to Homepage to Sign In
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {renderPhaseNavigation()}
      
      <div className="pt-4">
        {/* Chapter 1: VSCode Basics */}
        {currentPhase === 'chapter-1-vscode' && (
          <div>
            <VSCodeLearningJourney 
              onComplete={() => completePhase('chapter-1-vscode')}
              showBackButton={false}
            />
          </div>
        )}

        {/* Chapter 2: Git & GitHub Basics */}
        {currentPhase === 'chapter-2-git' && (
          <div>
            <GitHubLearningJourney 
              onComplete={() => completePhase('chapter-2-git')}
              showBackButton={true}
              onBack={() => navigateToPhase('chapter-1-vscode')}
            />
          </div>
        )}

        {/* Chapter 3: HTML Concepts */}
        {currentPhase === 'chapter-3-html-concepts' && (
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-4">HTML Concepts</h2>
              <p className="text-gray-300 mb-6">
                Now that you have your development environment set up and understand version control, 
                let's dive into HTML fundamentals.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-300 mb-2">What You'll Learn:</h3>
                  <ul className="text-blue-200 space-y-1 text-sm">
                    <li>• HTML document structure and semantic elements</li>
                    <li>• Forms, tables, and interactive content</li>
                    <li>• Accessibility best practices</li>
                    <li>• Modern HTML5 features</li>
                  </ul>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => navigateToPhase('chapter-2-git')}
                  className="px-6 py-3 font-semibold text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
                >
                  ← Back to Chapter 2: Git & GitHub
                </button>
                <button
                  onClick={() => completePhase('chapter-3-html-concepts')}
                  className="px-6 py-3 font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                >
                  Start Chapter 3: HTML Concepts →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Chapter 4: HTML Practice Lab */}
        {currentPhase === 'chapter-4-html-practice' && (
          <div>
            <HTMLMastery />
            <div className="max-w-4xl mx-auto p-6">
              <button
                onClick={() => navigateToPhase('chapter-3-html-concepts')}
                className="px-6 py-3 font-semibold text-white transition-colors bg-gray-600 rounded-lg hover:bg-gray-700"
              >
                ← Back to Chapter 3: HTML Concepts
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
