'use client'

import { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeExample {
  id: string
  title: string
  description: string
  code: string
  language: string
  explanation: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  interactive: boolean
}

interface Quiz {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
  codeExample?: string
}

export function InteractiveCodeBlock({ 
  code, 
  language = 'javascript', 
  title,
  explanation = [],
  editable = false 
}: {
  code: string
  language?: string
  title?: string
  explanation?: string[]
  editable?: boolean
}) {
  const [editableCode, setEditableCode] = useState(code)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)

  return (
    <div className="interactive-code-block bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
      {/* Header */}
      {title && (
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-gray-800 dark:text-gray-200">{title}</h4>
            <div className="flex items-center space-x-2">
              {explanation.length > 0 && (
                <button
                  onClick={() => setShowExplanation(!showExplanation)}
                  className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-md hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                >
                  {showExplanation ? '📖 Hide Explanation' : '💡 Explain'}
                </button>
              )}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
              >
                {isExpanded ? '⬆️ Collapse' : '⬇️ Expand'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Explanation Section */}
      {showExplanation && explanation.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-900/20 px-4 py-3 border-b border-blue-200 dark:border-blue-800">
          <div className="text-sm text-blue-800 dark:text-blue-200">
            {explanation.map((line, index) => (
              <p key={index} className="mb-2 last:mb-0">{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* Code Section */}
      <div className={`transition-all duration-300 ${isExpanded ? 'max-h-none' : 'max-h-96 overflow-hidden'}`}>
        {editable ? (
          <textarea
            value={editableCode}
            onChange={(e) => setEditableCode(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm bg-gray-900 text-gray-100 border-none resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            spellCheck={false}
          />
        ) : (
          <div className="relative">
            <SyntaxHighlighter
              language={language}
              style={tomorrow}
              customStyle={{
                margin: 0,
                padding: '1rem',
                background: 'transparent'
              }}
              codeTagProps={{
                style: {
                  fontSize: '0.875rem',
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
                }
              }}
            >
              {editableCode}
            </SyntaxHighlighter>
            
            {/* Copy button */}
            <button
              onClick={() => navigator.clipboard.writeText(editableCode)}
              className="absolute top-3 right-3 px-2 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            >
              📋 Copy
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      {editable && (
        <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-t border-gray-200 dark:border-gray-600">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setEditableCode(code)}
              className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              🔄 Reset
            </button>
            <button
              onClick={() => {
                // Here you could integrate with an online code runner
                alert('Code execution would happen here!')
              }}
              className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              ▶️ Run Code
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export function InteractiveQuiz({ quiz, onAnswer }: { 
  quiz: Quiz
  onAnswer: (correct: boolean) => void 
}) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [hasAnswered, setHasAnswered] = useState(false)

  const handleAnswer = (answerIndex: number) => {
    if (hasAnswered) return
    
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    setHasAnswered(true)
    onAnswer(answerIndex === quiz.correctAnswer)
  }

  const resetQuiz = () => {
    setSelectedAnswer(null)
    setShowResult(false)
    setHasAnswered(false)
  }

  return (
    <div className="interactive-quiz bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-6">
      {/* Question */}
      <div className="mb-4">
        <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          🤔 Quick Check
        </h4>
        <p className="text-gray-700 dark:text-gray-300">{quiz.question}</p>
      </div>

      {/* Code Example (if provided) */}
      {quiz.codeExample && (
        <div className="mb-4">
          <InteractiveCodeBlock 
            code={quiz.codeExample}
            language="javascript"
            title="Code to analyze:"
          />
        </div>
      )}

      {/* Options */}
      <div className="space-y-2 mb-4">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={hasAnswered}
            className={`w-full text-left p-3 rounded-lg border transition-all duration-200 ${
              hasAnswered
                ? index === quiz.correctAnswer
                  ? 'bg-green-100 dark:bg-green-900/20 border-green-500 text-green-700 dark:text-green-300'
                  : selectedAnswer === index
                  ? 'bg-red-100 dark:bg-red-900/20 border-red-500 text-red-700 dark:text-red-300'
                  : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-500 dark:text-gray-400'
                : 'bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
            }`}
          >
            <div className="flex items-center">
              <span className="mr-3 font-mono text-sm">
                {String.fromCharCode(65 + index)}
              </span>
              <span>{option}</span>
              {hasAnswered && index === quiz.correctAnswer && (
                <span className="ml-auto text-green-600">✅</span>
              )}
              {hasAnswered && selectedAnswer === index && index !== quiz.correctAnswer && (
                <span className="ml-auto text-red-600">❌</span>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Result and Explanation */}
      {showResult && (
        <div className={`p-4 rounded-lg ${
          selectedAnswer === quiz.correctAnswer
            ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
            : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
        }`}>
          <div className="flex items-start space-x-2">
            <span className="text-lg">
              {selectedAnswer === quiz.correctAnswer ? '🎉' : '💡'}
            </span>
            <div>
              <h5 className={`font-semibold mb-2 ${
                selectedAnswer === quiz.correctAnswer
                  ? 'text-green-800 dark:text-green-200'
                  : 'text-red-800 dark:text-red-200'
              }`}>
                {selectedAnswer === quiz.correctAnswer ? 'Correct!' : 'Not quite right'}
              </h5>
              <p className={`text-sm ${
                selectedAnswer === quiz.correctAnswer
                  ? 'text-green-700 dark:text-green-300'
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {quiz.explanation}
              </p>
            </div>
          </div>
          
          <button
            onClick={resetQuiz}
            className="mt-3 px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            🔄 Try Again
          </button>
        </div>
      )}
    </div>
  )
}

export function ProgressTracker({ 
  currentLesson, 
  totalLessons, 
  completedLessons,
  onLessonComplete 
}: {
  currentLesson: number
  totalLessons: number
  completedLessons: number[]
  onLessonComplete: (lessonId: number) => void
}) {
  const progressPercentage = Math.round((completedLessons.length / totalLessons) * 100)

  return (
    <div className="progress-tracker bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          📈 Your Progress
        </h3>
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {completedLessons.length}/{totalLessons} lessons complete
        </span>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Course Progress</span>
          <span>{progressPercentage}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Lessons Grid */}
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
        {Array.from({ length: totalLessons }, (_, index) => {
          const lessonNumber = index + 1
          const isCompleted = completedLessons.includes(lessonNumber)
          const isCurrent = lessonNumber === currentLesson
          
          return (
            <div
              key={lessonNumber}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                isCompleted
                  ? 'bg-green-500 text-white'
                  : isCurrent
                  ? 'bg-blue-500 text-white ring-2 ring-blue-200 dark:ring-blue-800'
                  : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
              }`}
            >
              {isCompleted ? '✓' : lessonNumber}
            </div>
          )
        })}
      </div>

      {/* Achievement Message */}
      {progressPercentage > 0 && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {progressPercentage === 100 ? (
            <span className="text-green-600 dark:text-green-400 font-semibold">
              🎉 Congratulations! You've completed this course!
            </span>
          ) : progressPercentage >= 75 ? (
            <span className="text-blue-600 dark:text-blue-400 font-semibold">
              🔥 You're almost there! Keep up the great work!
            </span>
          ) : progressPercentage >= 50 ? (
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              💪 Halfway through! You're doing amazing!
            </span>
          ) : (
            <span className="text-orange-600 dark:text-orange-400 font-semibold">
              🚀 Great start! Keep the momentum going!
            </span>
          )}
        </div>
      )}
    </div>
  )
}
