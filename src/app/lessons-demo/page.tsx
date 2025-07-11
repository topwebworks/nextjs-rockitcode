'use client'

import React, { useState, useCallback } from 'react'
import { LessonPlayer } from '@/components/lesson-player'
import { htmlBasicsLesson, cssBasicsLesson, javascriptBasicsLesson } from '@/data/mobile-lessons'

const lessons = [
  { id: 'html', title: 'HTML Basics', lesson: htmlBasicsLesson },
  { id: 'css', title: 'CSS Styling', lesson: cssBasicsLesson },
  { id: 'js', title: 'JavaScript Interactive', lesson: javascriptBasicsLesson }
]

export default function LessonsDemo() {
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({})

  const currentLesson = lessons[currentLessonIndex]

  const handleLessonComplete = useCallback(() => {
    const lessonId = lessons[currentLessonIndex].id
    setCompletedLessons(prev => {
      if (!prev.includes(lessonId)) {
        return [...prev, lessonId]
      }
      return prev
    })
    
    // Celebrate completion
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200])
    }
  }, [currentLessonIndex])

  const handleProgress = useCallback((progress: number) => {
    const lessonId = lessons[currentLessonIndex].id
    setLessonProgress(prev => ({
      ...prev,
      [lessonId]: progress
    }))
  }, [currentLessonIndex])

  const nextLesson = () => {
    if (currentLessonIndex < lessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1)
    }
  }

  const prevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                🚀 RockitCode Lessons
              </h1>
              <span className="text-sm text-gray-500">
                Mobile-First Coding Education
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {currentLessonIndex + 1} of {lessons.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2 overflow-x-auto">
            {lessons.map((lesson, index) => (
              <button
                key={lesson.id}
                onClick={() => setCurrentLessonIndex(index)}
                className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  index === currentLessonIndex
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2">
                  {completedLessons.includes(lesson.id) && (
                    <span className="text-green-500">✅</span>
                  )}
                  <span>{lesson.title}</span>
                  {lessonProgress[lesson.id] > 0 && lessonProgress[lesson.id] < 100 && (
                    <span className="text-xs text-blue-500">
                      {Math.round(lessonProgress[lesson.id])}%
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Lesson Area */}
      <div className="max-w-7xl mx-auto h-[calc(100vh-8rem)]">
        <LessonPlayer
          lesson={currentLesson.lesson}
          onComplete={handleLessonComplete}
          onProgress={handleProgress}
          className="h-full"
        />
      </div>

      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 md:hidden">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={prevLesson}
            disabled={currentLessonIndex === 0}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span>←</span>
            <span className="text-sm">Previous</span>
          </button>
          
          <div className="text-center">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {currentLesson.title}
            </div>
            <div className="text-xs text-gray-500">
              Lesson {currentLessonIndex + 1} of {lessons.length}
            </div>
          </div>
          
          <button
            onClick={nextLesson}
            disabled={currentLessonIndex === lessons.length - 1}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-sm">Next</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Success Toast */}
      {completedLessons.length > 0 && (
        <div className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50">
          <div className="flex items-center space-x-2">
            <span>🎉</span>
            <span className="text-sm font-medium">
              {completedLessons.length} lesson{completedLessons.length > 1 ? 's' : ''} completed!
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
