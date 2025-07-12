'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { foundationCourse } from '@/data/foundation-course'
import type { Chapter, Lesson, QuizQuestion } from '@/data/foundation-course'

interface LessonPageProps {
  courseId: string
  milestoneId: string
  lessonId: string
}

export default function LessonPage({ courseId, milestoneId, lessonId }: LessonPageProps) {
  const router = useRouter()
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0)
  const [completedChapters, setCompletedChapters] = useState<Set<string>>(new Set())
  const [quizAttempts, setQuizAttempts] = useState<Record<string, number>>({})
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess] = useState(false)
  const [codeProgress, setCodeProgress] = useState('')
  
  // Find current lesson
  const milestone = foundationCourse.milestones.find(m => m.id === milestoneId)
  const lesson = milestone?.lessons.find(l => l.id === lessonId)
  
  if (!lesson) {
    return <div>Lesson not found</div>
  }
  
  const currentChapter = lesson.chapters[currentChapterIndex]
  const isLastChapter = currentChapterIndex === lesson.chapters.length - 1
  const allChaptersComplete = lesson.chapters.every(chapter => completedChapters.has(chapter.id))
  
  const handleChapterComplete = () => {
    const newCompleted = new Set(completedChapters)
    newCompleted.add(currentChapter.id)
    setCompletedChapters(newCompleted)
    
    // Show success animation
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    
    // Auto-advance to next chapter
    if (!isLastChapter) {
      setTimeout(() => {
        setCurrentChapterIndex(prev => prev + 1)
      }, 1500)
    }
  }
  
  const handleQuizSubmit = (questionId: string, answer: string) => {
    const question = lesson.quiz.find(q => q.id === questionId)
    if (!question) return
    
    const attempts = quizAttempts[questionId] || 0
    const isCorrect = question.correctAnswer === answer || 
                     (Array.isArray(question.correctAnswer) && question.correctAnswer.includes(answer))
    
    if (isCorrect) {
      // Correct answer - mark as complete
      handleChapterComplete()
    } else {
      // Wrong answer - increment attempts and show hint
      const newAttempts = attempts + 1
      setQuizAttempts(prev => ({ ...prev, [questionId]: newAttempts }))
      
      if (newAttempts < question.maxAttempts) {
        // Show hint
        alert(`Not quite right! Hint: ${question.hints[Math.min(newAttempts - 1, question.hints.length - 1)]}`)
      } else {
        // Max attempts reached - show answer and allow continue
        alert(`The correct answer is: ${question.correctAnswer}. ${question.explanation}`)
        handleChapterComplete()
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Success Animation */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center animate-bounce">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Chapter Complete!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Great job! You've mastered this concept.
            </p>
          </div>
        </div>
      )}
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => router.back()}
              className="flex items-center text-blue-600 hover:text-blue-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Course
            </button>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {milestone?.title} • Lesson {lesson.id}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {lesson.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            {lesson.description}
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${(completedChapters.size / lesson.chapters.length) * 100}%` 
              }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>{completedChapters.size}/{lesson.chapters.length} chapters complete</span>
            <span>{lesson.duration} minutes</span>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chapter Navigation Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Chapters
              </h3>
              
              <div className="space-y-3">
                {lesson.chapters.map((chapter, index) => {
                  const isCompleted = completedChapters.has(chapter.id)
                  const isCurrent = index === currentChapterIndex
                  const isUnlocked = index <= currentChapterIndex || isCompleted
                  
                  return (
                    <button
                      key={chapter.id}
                      onClick={() => isUnlocked && setCurrentChapterIndex(index)}
                      disabled={!isUnlocked}
                      className={`w-full text-left p-4 rounded-lg border transition-all ${
                        isCurrent
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : isCompleted
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : isUnlocked
                          ? 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                          : 'border-gray-100 dark:border-gray-700 opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">
                          Chapter {index + 1}
                        </span>
                        {isCompleted && (
                          <div className="text-green-500">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                        {chapter.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                        {chapter.description}
                      </p>
                      <div className="mt-2 text-xs text-gray-500">
                        {Math.ceil(chapter.duration / 60)} min
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Chapter Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-blue-100 text-sm font-medium">
                    Chapter {currentChapterIndex + 1} of {lesson.chapters.length}
                  </span>
                  <span className="text-blue-100 text-sm">
                    {Math.ceil(currentChapter.duration / 60)} minutes
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{currentChapter.title}</h2>
                <p className="text-blue-100">{currentChapter.description}</p>
              </div>
              
              {/* Video Player Placeholder */}
              <div className="bg-black aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl mb-4">📺</div>
                  <h3 className="text-xl font-semibold mb-2">Video Content</h3>
                  <p className="text-gray-300">Chapter video would be embedded here</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Timestamp: {Math.floor(currentChapter.videoTimestamp / 60)}:{(currentChapter.videoTimestamp % 60).toString().padStart(2, '0')}
                  </p>
                </div>
              </div>
              
              {/* Chapter Content */}
              <div className="p-6">
                {/* Learning Objectives */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Learning Objectives
                  </h3>
                  <ul className="space-y-2">
                    {currentChapter.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-700 dark:text-gray-300">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Key Concepts */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Key Concepts
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentChapter.concepts.map((concept, index) => (
                      <span 
                        key={index}
                        className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Code Example */}
                {currentChapter.codeExample && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Code Example
                    </h3>
                    <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-gray-100 text-sm">
                        <code>{currentChapter.codeExample.code}</code>
                      </pre>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">
                      {currentChapter.codeExample.explanation}
                    </p>
                  </div>
                )}
                
                {/* Practice Exercise */}
                {currentChapter.practiceExercise && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      Practice Exercise
                    </h3>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4">
                      <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                        {currentChapter.practiceExercise.title}
                      </h4>
                      <p className="text-yellow-700 dark:text-yellow-300 mb-3">
                        {currentChapter.practiceExercise.instruction}
                      </p>
                      
                      {/* Code Editor Placeholder */}
                      <div className="bg-gray-900 rounded-lg p-4 mb-3">
                        <div className="text-gray-300 text-sm mb-2">Your code:</div>
                        <textarea
                          value={codeProgress}
                          onChange={(e) => setCodeProgress(e.target.value)}
                          placeholder={currentChapter.practiceExercise.startingCode}
                          className="w-full bg-gray-800 text-gray-100 border border-gray-600 rounded p-2 font-mono text-sm"
                          rows={8}
                        />
                      </div>
                      
                      <button
                        onClick={handleChapterComplete}
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        Test Code
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Chapter Complete Button */}
                {!completedChapters.has(currentChapter.id) && !currentChapter.practiceExercise && (
                  <div className="text-center">
                    <button
                      onClick={handleChapterComplete}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold"
                    >
                      Mark Chapter Complete
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Quiz Section */}
            {allChaptersComplete && lesson.quiz.length > 0 && (
              <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Knowledge Check
                </h3>
                
                <div className="space-y-6">
                  {lesson.quiz.map((question) => (
                    <QuizQuestion
                      key={question.id}
                      question={question}
                      onSubmit={(answer) => handleQuizSubmit(question.id, answer)}
                      attempts={quizAttempts[question.id] || 0}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {/* Lesson Complete */}
            {allChaptersComplete && (
              <div className="mt-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-8 text-center text-white">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-3xl font-bold mb-2">Lesson Complete!</h2>
                <p className="text-green-100 mb-6">
                  Congratulations! You've completed "{lesson.title}" and added new skills to your portfolio.
                </p>
                
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => router.push('/courses')}
                    className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-green-50"
                  >
                    Back to Course
                  </button>
                  <button
                    onClick={() => {/* Navigate to next lesson */}}
                    className="bg-green-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800"
                  >
                    Next Lesson
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Quiz Question Component
function QuizQuestion({ 
  question, 
  onSubmit, 
  attempts 
}: { 
  question: QuizQuestion
  onSubmit: (answer: string) => void
  attempts: number 
}) {
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = () => {
    if (selectedAnswer) {
      setSubmitted(true)
      onSubmit(selectedAnswer)
    }
  }
  
  return (
    <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
        {question.question}
      </h4>
      
      {question.type === 'multiple-choice' && question.options && (
        <div className="space-y-2 mb-4">
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center">
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className="mr-3"
                disabled={submitted}
              />
              <span className="text-gray-700 dark:text-gray-300">{option}</span>
            </label>
          ))}
        </div>
      )}
      
      {question.type === 'fill-blank' && (
        <div className="mb-4">
          <input
            type="text"
            value={selectedAnswer}
            onChange={(e) => setSelectedAnswer(e.target.value)}
            placeholder="Type your answer here..."
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2"
            disabled={submitted}
          />
        </div>
      )}
      
      {attempts > 0 && attempts < question.maxAttempts && (
        <div className="mb-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded">
          <p className="text-yellow-800 dark:text-yellow-200 text-sm">
            Attempt {attempts} of {question.maxAttempts}
          </p>
        </div>
      )}
      
      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer || submitted}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium"
      >
        Submit Answer
      </button>
    </div>
  )
}
