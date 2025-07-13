/**
 * Interactive Lesson Component - Mission Control Setup
 * 
 * This component renders the highly interactive, beginner-focused lesson
 * with real-time validation, progress tracking, and celebration moments.
 */

'use client'

import { useState, useEffect } from 'react'
import { InteractiveLesson, StudentProgress, LabValidation } from '@/types/interactive-lesson'
import missionControlSetupLesson from '@/data/lessons/week-1-chapter-1-mission-control-setup'

// Utility function to convert text with URLs to clickable links and handle code blocks
const linkifyText = (text: string) => {
  // Check if this looks like HTML code (starts with < and contains tags)
  if (text.trim().startsWith('<') && text.includes('>')) {
    return (
      <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm font-mono overflow-x-auto border">
        <code className="text-gray-800 dark:text-gray-200">{text}</code>
      </pre>
    )
  }
  
  const urlRegex = /(https?:\/\/[^\s]+|(?:github\.com|education\.github\.com|code\.visualstudio\.com)(?:\/[^\s]*)?)/g
  const parts = text.split(urlRegex)
  
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      const url = part.startsWith('http') ? part : `https://${part}`
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="lesson-link"
        >
          {part}
        </a>
      )
    }
    return part
  })
}

interface InteractiveLessonRendererProps {
  lesson: InteractiveLesson
  studentId: string
  onProgressUpdate?: (progress: StudentProgress) => void
}

export default function InteractiveLessonRenderer({ 
  lesson, 
  studentId, 
  onProgressUpdate 
}: InteractiveLessonRendererProps) {
  const [currentSection, setCurrentSection] = useState<'overview' | 'concepts' | 'labs' | 'achievements'>('overview')
  const [currentLabIndex, setCurrentLabIndex] = useState(0)
  const [completedLabs, setCompletedLabs] = useState<string[]>([])
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([])
  const [showCelebration, setShowCelebration] = useState(false)

  const currentLab = lesson.interactiveLabs[currentLabIndex]
  const progress = (completedLabs.length / lesson.interactiveLabs.length) * 100

  const handleLabCompletion = async (labId: string) => {
    // Check if lab is already completed (toggle functionality)
    const isAlreadyCompleted = completedLabs.includes(labId)
    
    if (isAlreadyCompleted) {
      // Remove from completed labs (mark as incomplete)
      const newCompletedLabs = completedLabs.filter(id => id !== labId)
      setCompletedLabs(newCompletedLabs)
      
      // Update progress
      onProgressUpdate?.({
        lessonId: lesson.lessonId,
        studentId,
        startedAt: new Date(),
        currentLab: lesson.interactiveLabs[currentLabIndex]?.id,
        completedLabs: newCompletedLabs,
        achievementsUnlocked: unlockedAchievements,
        knowledgeCheckScores: {}
      })
      return
    }

    // Simulate lab validation for new completion
    const validation: LabValidation = {
      labId,
      studentId,
      criteria: {}, // Real implementation would validate actual completion
      validatedAt: new Date()
    }

    // Update completed labs
    const newCompletedLabs = [...completedLabs, labId]
    setCompletedLabs(newCompletedLabs)

    // Check for achievement unlocks
    const newAchievements = lesson.achievements
      .filter(achievement => {
        // Logic to determine if achievement should be unlocked
        switch (achievement.id) {
          case 'first-github-account':
            return labId === 'github-account-creation'
          case 'student-pack-unlocked':
            return labId === 'student-pack-activation'
          case 'first-code-written':
            return labId === 'first-code-creation'
          case 'first-commit-made':
            return labId === 'git-workflow-practice'
          case 'first-deployment':
            return labId === 'github-pages-deployment'
          default:
            return false
        }
      })
      .map(a => a.id)
      .filter(id => !unlockedAchievements.includes(id))

    if (newAchievements.length > 0) {
      setUnlockedAchievements([...unlockedAchievements, ...newAchievements])
      setShowCelebration(true)
    }

    // Move to next lab only if this is a new completion (not unmarking)
    if (currentLabIndex < lesson.interactiveLabs.length - 1) {
      setCurrentLabIndex(currentLabIndex + 1)
    } else {
      // Lesson completed!
      setCurrentSection('achievements')
    }

    // Update progress
    onProgressUpdate?.({
      lessonId: lesson.lessonId,
      studentId,
      startedAt: new Date(),
      currentLab: lesson.interactiveLabs[currentLabIndex + 1]?.id,
      completedLabs: newCompletedLabs,
      achievementsUnlocked: [...unlockedAchievements, ...newAchievements],
      knowledgeCheckScores: {}
    })
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Lesson Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm font-medium text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
            Week {lesson.week} • Chapter {lesson.chapter}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{lesson.title}</h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">{lesson.description}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-green-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Progress: {completedLabs.length}/{lesson.interactiveLabs.length} labs completed
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {['overview', 'concepts', 'labs', 'achievements'].map((section) => (
            <button
              key={section}
              onClick={() => setCurrentSection(section as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                currentSection === section
                  ? 'border-blue-600 text-blue-700 dark:text-blue-400'
                  : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {section === 'celebration' ? 'achievements' : section}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Section */}
      {currentSection === 'overview' && (
        <div className="space-y-6">
          {/* Hero Video Placeholder */}
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5v10l8-5-8-5z"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">{lesson.heroVideo.title}</h3>
            <p className="text-gray-600 mb-4">{lesson.heroVideo.description}</p>
            <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
              📹 Overview Video (Recorded after course completion)
            </span>
          </div>

          {/* Learning Objectives */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="text-lg font-semibold mb-4 text-blue-900 dark:text-blue-100">🎯 What You'll Achieve</h3>
            <ul className="space-y-2">
              {lesson.objectives.map((objective, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-1">✓</span>
                  <span className="text-blue-800 dark:text-blue-200">{linkifyText(objective)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Time Estimate */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <h3 className="text-lg font-semibold mb-2 text-green-900 dark:text-green-100">⏱️ Time Investment</h3>
            <p className="text-green-800 dark:text-green-200">{lesson.estimatedTime}</p>
            <p className="text-sm text-green-700 dark:text-green-300 mt-2">
              Take your time! This is about learning, not rushing.
            </p>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={() => setCurrentSection('concepts')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              🚀 Begin Mission Control Setup
            </button>
          </div>
        </div>
      )}

      {/* Concepts Section */}
      {currentSection === 'concepts' && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🧠 Core Concepts</h2>
          <p className="text-gray-700 dark:text-gray-300">
            Before we dive into hands-on coding, let's understand the fundamental concepts you'll be working with.
          </p>
          
          {lesson.concepts.map((concept, index) => (
            <div key={concept.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{concept.title}</h3>
              <p className="text-gray-800 dark:text-gray-200 mb-4 text-base leading-relaxed">{linkifyText(concept.description)}</p>
              
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
                  <h4 className="font-bold text-yellow-900 dark:text-yellow-100 mb-2">💡 Think of it like this:</h4>
                  <p className="text-yellow-800 dark:text-yellow-200">{linkifyText(concept.analogy)}</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 p-4">
                  <h4 className="font-bold text-blue-900 dark:text-blue-100 mb-2">🎯 Why it matters:</h4>
                  <p className="text-blue-800 dark:text-blue-200">{linkifyText(concept.whyItMatters)}</p>
                </div>
                
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 p-4">
                  <h4 className="font-bold text-green-900 dark:text-green-100 mb-2">🌍 Real-world example:</h4>
                  <p className="text-green-800 dark:text-green-200">{linkifyText(concept.realWorldExample)}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="text-center">
            <button
              onClick={() => setCurrentSection('labs')}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
            >
              🔧 Start Hands-On Labs
            </button>
          </div>
        </div>
      )}

      {/* Labs Section */}
      {currentSection === 'labs' && (
        <div className="space-y-6">
          {/* Expectations Message */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">🎯 Complete All {lesson.interactiveLabs.length} Labs to Master This Lesson</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Follow each lab step-by-step. You'll build skills progressively as you complete each one!
            </p>
          </div>

          {/* Lab Navigation */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-2 sm:p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center gap-1 sm:gap-2">
              <button
                onClick={() => setCurrentLabIndex(Math.max(0, currentLabIndex - 1))}
                disabled={currentLabIndex === 0}
                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                title="Previous Lab"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <div className="flex-1 flex justify-center min-w-0">
                <div className="lab-nav-container">
                  {lesson.interactiveLabs.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentLabIndex(index)}
                      className={`lab-nav-button ${
                        completedLabs.includes(lesson.interactiveLabs[index].id)
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : index === currentLabIndex
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-400 dark:hover:bg-gray-500'
                      }`}
                      title={lesson.interactiveLabs[index].title}
                    >
                      {completedLabs.includes(lesson.interactiveLabs[index].id) ? '✓' : index + 1}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentLabIndex(Math.min(lesson.interactiveLabs.length - 1, currentLabIndex + 1))}
                disabled={currentLabIndex === lesson.interactiveLabs.length - 1}
                className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                title="Next Lab"
              >
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Current Lab */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{currentLab.title}</h3>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Lab {currentLabIndex + 1} of {lesson.interactiveLabs.length}
                </span>
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  ~{currentLab.estimatedMinutes} min
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 mb-6">{linkifyText(currentLab.description)}</p>

            {/* Instructions */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-900 dark:text-white">📋 Step-by-Step Instructions:</h4>
              <ol className="space-y-3">
                {currentLab.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300">
                      {linkifyText(instruction)}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Hints */}
            {currentLab.hints.length > 0 && (
              <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">💡 Helpful Hints:</h4>
                <ul className="space-y-1">
                  {currentLab.hints.map((hint, index) => (
                    <li key={index} className="text-yellow-700 dark:text-yellow-300 text-sm flex items-start space-x-2">
                      <span className="w-1.5 h-1.5 bg-yellow-600 dark:bg-yellow-400 rounded-sm flex-shrink-0 mt-2"></span>
                      <span>{linkifyText(hint)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Completion Section */}
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <button
                  onClick={() => handleLabCompletion(currentLab.id)}
                  className={`font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 ${
                    completedLabs.includes(currentLab.id)
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {completedLabs.includes(currentLab.id) 
                    ? '✅ Completed - Click to Mark as Incomplete' 
                    : '✅ Mark This Lab as Complete'
                  }
                </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {completedLabs.includes(currentLab.id)
                    ? 'Click again if you need to revisit this lab'
                    : 'Click when you\'ve successfully completed all the steps above'
                  }
                </p>
              </div>
              
              {/* Next Lab Preview */}
              {currentLabIndex < lesson.interactiveLabs.length - 1 && (
                <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                        🎯 Coming Up Next:
                      </h5>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        {lesson.interactiveLabs[currentLabIndex + 1].title}
                      </p>
                    </div>
                    <button
                      onClick={() => setCurrentLabIndex(currentLabIndex + 1)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors ml-4"
                    >
                      Preview Next Lab →
                    </button>
                  </div>
                </div>
              )}
              
              {/* Final Lab Indicator */}
              {currentLabIndex === lesson.interactiveLabs.length - 1 && (
                <div className="bg-gradient-to-r from-green-50 to-yellow-50 dark:from-green-900/20 dark:to-yellow-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4">
                  <div className="text-center">
                    <h5 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                      🏁 Final Lab!
                    </h5>
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Complete this lab to unlock your achievements and move to the next lesson!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      )}

      {/* Achievement Celebration Section */}
      {currentSection === 'achievements' && (
        <div className="space-y-8 text-center">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-8 border border-green-200 dark:border-green-800">
            <div className="text-6xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 animate-fade-in">
              Mission Accomplished!
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              You've successfully completed Mission Control Setup and are now officially part of the global developer community!
            </p>
          </div>

          {/* Achievements Grid */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🏆 Your Achievements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {lesson.achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className={`border rounded-lg p-4 transition-all duration-500 transform hover:scale-105 ${
                    unlockedAchievements.includes(achievement.id)
                      ? 'bg-green-50 dark:bg-green-900/30 border-green-300 dark:border-green-700 shadow-lg'
                      : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'
                  }`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{achievement.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{achievement.description}</p>
                  {unlockedAchievements.includes(achievement.id) && (
                    <span className="inline-block mt-2 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 px-2 py-1 rounded text-xs font-medium">
                      Unlocked!
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

            {/* What You've Accomplished */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🚀</span>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">What You've Accomplished</h3>
              </div>
              <div className="grid gap-3">
                {lesson.outcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-800 dark:text-gray-200 font-medium">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Lesson Preview */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800 shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">🎯</span>
                <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100">Up Next</h3>
              </div>
              
              <div className="mb-4">
                <h4 className="text-lg font-bold text-blue-800 dark:text-blue-200 mb-2">{lesson.nextLesson.title}</h4>
                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">{lesson.nextLesson.preview}</p>
              </div>
              
              <div className="mb-4 text-center">
                <h5 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-3 uppercase tracking-wide">New Skills You'll Learn:</h5>
                <div className="flex flex-wrap justify-center gap-2">
                  {lesson.nextLesson.newSkills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-700">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="text-center">
                <button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-105 shadow-md">
                  Continue to Chapter 1.2 →
                </button>
              </div>
            </div>
        </div>
      )}

      {/* Achievement Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-md mx-4 text-center transform animate-fade-in shadow-2xl">
            <div className="text-4xl mb-4 animate-bounce-gentle">🏆</div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Achievement Unlocked!</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">You're making amazing progress!</p>
            <button
              onClick={() => setShowCelebration(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              Continue Learning
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// Export the lesson data for easy access
export { missionControlSetupLesson }
