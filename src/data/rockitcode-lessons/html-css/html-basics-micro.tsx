'use client'

import { useState, useEffect } from 'react'

// Micro-Learning Component System
const MicroLesson = ({ 
  id, 
  title, 
  icon, 
  children, 
  onComplete,
  isUnlocked = true,
  isCompleted = false 
}: any) => {
  const [isActive, setIsActive] = useState(false)
  
  if (!isUnlocked) {
    return (
      <div className="p-4 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 text-center">
        <div className="text-3xl mb-2">🔒</div>
        <p className="text-gray-500 font-medium">Complete previous lesson to unlock</p>
      </div>
    )
  }

  return (
    <div className={`border-2 rounded-xl transition-all duration-300 ${
      isCompleted 
        ? 'border-green-500 bg-green-50' 
        : isActive 
          ? 'border-blue-500 bg-blue-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-blue-300'
    }`}>
      {!isActive ? (
        <button
          onClick={() => setIsActive(true)}
          className="w-full p-6 text-left flex items-center gap-4 hover:bg-gray-50"
        >
          <div className="text-4xl">{icon}</div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600">
              {isCompleted ? '✅ Completed!' : 'Click to start learning'}
            </p>
          </div>
          <div className="ml-auto text-2xl text-gray-400">
            {isCompleted ? '✅' : '▶️'}
          </div>
        </button>
      ) : (
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <span className="text-2xl">{icon}</span>
              {title}
            </h3>
            <button
              onClick={() => setIsActive(false)}
              className="text-gray-400 hover:text-gray-600 text-xl"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      )}
    </div>
  )
}

const ConceptCard = ({ concept, example, visual }: any) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
    <div className="text-center mb-3">
      <div className="text-3xl mb-2">{visual}</div>
      <h4 className="font-semibold text-gray-800">{concept}</h4>
    </div>
    <div className="bg-white p-3 rounded text-sm font-mono">
      {example}
    </div>
  </div>
)

const QuickPractice = ({ challenge, solution, onSuccess }: any) => {
  const [input, setInput] = useState('')
  const [feedback, setFeedback] = useState('')
  const [isCorrect, setIsCorrect] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [isActive, setIsActive] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isActive, timeLeft])

  const startChallenge = () => {
    setIsActive(true)
    setTimeLeft(30)
    setAttempts(0)
    setInput('')
    setFeedback('')
    setIsCorrect(false)
  }

  const checkAnswer = () => {
    setAttempts(prev => prev + 1)
    const isMatch = input.trim().toLowerCase().includes(solution.toLowerCase())
    setIsCorrect(isMatch)
    
    if (isMatch) {
      const timeBonus = timeLeft * 10
      const attemptBonus = Math.max(0, (4 - attempts) * 50)
      const finalScore = 200 + timeBonus + attemptBonus
      setScore(finalScore)
      setFeedback(`🎉 Perfect! +${finalScore} points (${30 - timeLeft}s, ${attempts} attempts)`)
      if (onSuccess) {
        setTimeout(onSuccess, 1500)
      }
    } else {
      setFeedback('🤔 Try again! Bonus decreasing...')
    }
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 border-2 border-yellow-300 rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-semibold text-yellow-800 flex items-center gap-2">
          ⚡ Speed Challenge
        </h4>
        {isActive && (
          <div className="flex gap-2 text-sm">
            <span className="bg-red-500 text-white px-2 py-1 rounded">⏰ {timeLeft}s</span>
            <span className="bg-blue-500 text-white px-2 py-1 rounded">🎯 {score}</span>
          </div>
        )}
      </div>
      
      <p className="text-gray-700 mb-3">{challenge}</p>
      
      {!isActive ? (
        <button
          onClick={startChallenge}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          🚀 Start 30-Second Challenge
        </button>
      ) : (
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 border-2 border-yellow-300 rounded focus:outline-none focus:border-yellow-500"
              placeholder="Type your answer..."
              disabled={isCorrect || timeLeft === 0}
            />
            <button
              onClick={checkAnswer}
              disabled={isCorrect || timeLeft === 0}
              className={`px-4 py-2 rounded font-medium ${
                isCorrect 
                  ? 'bg-green-500 text-white' 
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              {isCorrect ? '🎉 +' + score : 'Submit'}
            </button>
          </div>
          
          {timeLeft === 0 && !isCorrect && (
            <div className="text-center py-2">
              <p className="text-red-600 font-semibold">⏰ Time's up!</p>
              <button
                onClick={startChallenge}
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                🔄 Try Again
              </button>
            </div>
          )}
          
          {feedback && (
            <div className={`p-2 rounded text-sm font-medium ${
              isCorrect ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
            }`}>
              {feedback}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const LiveCodeTest = ({ title, starter, goal, onPass }: any) => {
  const [code, setCode] = useState(starter)
  const [passed, setPassed] = useState(false)

  const testCode = () => {
    // Simple validation - in production would be more sophisticated
    const hasGoal = code.toLowerCase().includes(goal.toLowerCase())
    setPassed(hasGoal)
    if (hasGoal && onPass) {
      onPass()
    }
  }

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-800">{title}</h4>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Code:
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-24 p-2 font-mono text-sm border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
          />
          <button
            onClick={testCode}
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Test My Code
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Live Preview:
          </label>
          <div className="border border-gray-200 rounded p-2 bg-gray-50 h-24 overflow-auto">
            <iframe
              srcDoc={code}
              className="w-full h-full border-none"
              title="Preview"
            />
          </div>
          {passed && (
            <div className="mt-2 p-2 bg-green-100 text-green-800 rounded text-sm">
              ✅ Perfect! You've mastered this concept!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const ProgressOverview = ({ completedCount, totalCount }: any) => (
  <div className="sticky top-4 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
    <h3 className="font-semibold text-gray-800 mb-3">Your Progress</h3>
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Concepts Mastered</span>
        <span>{completedCount}/{totalCount}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${(completedCount / totalCount) * 100}%` }}
        />
      </div>
      <div className="text-xs text-gray-600 text-center">
        {completedCount === totalCount ? '🎉 Lesson Complete!' : `${totalCount - completedCount} concepts to go`}
      </div>
    </div>
  </div>
)

export default function HtmlBasicsMicroLearning() {
  const [completedConcepts, setCompletedConcepts] = useState<Set<string>>(new Set())
  
  const completeConcept = (conceptId: string) => {
    setCompletedConcepts(prev => new Set([...prev, conceptId]))
  }

  const isCompleted = (conceptId: string) => completedConcepts.has(conceptId)
  const isUnlocked = (conceptId: string, requiresConcept?: string) => 
    !requiresConcept || completedConcepts.has(requiresConcept)

  const concepts = [
    'what-is-html',
    'html-elements', 
    'document-structure',
    'headings',
    'paragraphs',
    'complete-page'
  ]

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Main Learning Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Mission Brief */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl">
            <h1 className="text-2xl font-bold mb-2">🚀 Mission: Build Your First Web Page</h1>
            <p className="text-blue-100">
              Master HTML one concept at a time. Each mini-lesson takes 2-3 minutes!
            </p>
          </div>

          {/* Concept 1: What is HTML? */}
          <MicroLesson
            id="what-is-html"
            title="What is HTML?"
            icon="🌐"
            isCompleted={isCompleted('what-is-html')}
            onComplete={() => completeConcept('what-is-html')}
          >
            <div className="space-y-4">
              <ConceptCard
                concept="HTML = Website Structure"
                example="Like the frame of a house"
                visual="🏗️"
              />
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 text-center">
                  Every website you visit uses HTML to organize its content!
                </p>
              </div>

              <QuickPractice
                challenge="What does HTML stand for? (Hint: HyperText Markup...)"
                solution="language"
                onSuccess={() => completeConcept('what-is-html')}
              />
            </div>
          </MicroLesson>

          {/* Concept 2: HTML Elements */}
          <MicroLesson
            id="html-elements"
            title="HTML Elements Are Like Containers"
            icon="📦"
            isUnlocked={isUnlocked('html-elements', 'what-is-html')}
            isCompleted={isCompleted('html-elements')}
          >
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-3">
                <ConceptCard
                  concept="Opening Tag"
                  example="<h1>"
                  visual="📂"
                />
                <ConceptCard
                  concept="Content"
                  example="Hello World"
                  visual="✍️"
                />
                <ConceptCard
                  concept="Closing Tag"
                  example="</h1>"
                  visual="📁"
                />
              </div>

              <LiveCodeTest
                title="Try it! Create a heading"
                starter="<h1>Your heading here</h1>"
                goal="<h1>"
                onPass={() => completeConcept('html-elements')}
              />
            </div>
          </MicroLesson>

          {/* Concept 3: Document Structure */}
          <MicroLesson
            id="document-structure"
            title="Every Web Page Needs This Structure"
            icon="🏠"
            isUnlocked={isUnlocked('document-structure', 'html-elements')}
            isCompleted={isCompleted('document-structure')}
          >
            <div className="space-y-4">
              <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
{`<!DOCTYPE html>  ← "This is HTML5"
<html>           ← Root container
  <head>         ← Page info
    <title></title>
  </head>
  <body>         ← Visible content
  </body>
</html>`}
              </div>

              <QuickPractice
                challenge="Which section contains the visible content of your page?"
                solution="body"
                onSuccess={() => completeConcept('document-structure')}
              />
            </div>
          </MicroLesson>

          {/* Concept 4: Headings */}
          <MicroLesson
            id="headings"
            title="Headings: From Biggest to Smallest"
            icon="📰"
            isUnlocked={isUnlocked('headings', 'document-structure')}
            isCompleted={isCompleted('headings')}
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[1,2,3,4].map(level => (
                  <div key={level} className="bg-white p-3 border rounded">
                    <code className="text-sm text-blue-600">&lt;h{level}&gt;</code>
                    <div className={`font-bold text-gray-800 ${{
                      1: 'text-2xl',
                      2: 'text-xl', 
                      3: 'text-lg',
                      4: 'text-base'
                    }[level]}`}>
                      Heading {level}
                    </div>
                  </div>
                ))}
              </div>

              <LiveCodeTest
                title="Create a page title and subtitle"
                starter={`<h1>My Amazing Website</h1>
<h2>About Me</h2>`}
                goal="<h2>"
                onPass={() => completeConcept('headings')}
              />
            </div>
          </MicroLesson>

          {/* Concept 5: Paragraphs */}
          <MicroLesson
            id="paragraphs"
            title="Paragraphs: Adding Your Story"
            icon="📝"
            isUnlocked={isUnlocked('paragraphs', 'headings')}
            isCompleted={isCompleted('paragraphs')}
          >
            <div className="space-y-4">
              <ConceptCard
                concept="Paragraph Element"
                example="<p>Your text goes here</p>"
                visual="📄"
              />

              <LiveCodeTest
                title="Write a paragraph about yourself"
                starter="<p>I am learning HTML and...</p>"
                goal="<p>"
                onPass={() => completeConcept('paragraphs')}
              />
            </div>
          </MicroLesson>

          {/* Final Challenge */}
          <MicroLesson
            id="complete-page"
            title="🏆 Master Challenge: Complete Web Page"
            icon="🎯"
            isUnlocked={isUnlocked('complete-page', 'paragraphs')}
            isCompleted={isCompleted('complete-page')}
          >
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-300">
                <h4 className="font-semibold text-gray-800 mb-2">🎯 Final Mission</h4>
                <p className="text-gray-700">
                  Combine everything you've learned to create a complete web page!
                </p>
              </div>

              <LiveCodeTest
                title="Build your complete page"
                starter={`<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <!-- Add your content here -->
</body>
</html>`}
                goal="<h1>"
                onPass={() => completeConcept('complete-page')}
              />
            </div>
          </MicroLesson>

          {/* Celebration */}
          {completedConcepts.size === concepts.length && (
            <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-8 rounded-xl text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-2">Mission Accomplished!</h2>
              <p className="text-green-100 mb-4">
                You've mastered HTML basics! You're ready for CSS styling.
              </p>
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                🎨 Continue to CSS Basics →
              </button>
            </div>
          )}
        </div>

        {/* Progress Sidebar */}
        <div className="lg:col-span-1">
          <ProgressOverview 
            completedCount={completedConcepts.size}
            totalCount={concepts.length}
          />
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: "HTML Basics: Micro-Learning Adventure",
  description: "Master HTML through bite-sized, interactive micro-lessons. No walls of text - just engaging, digestible learning!",
  estimatedTime: 20,
  difficulty: "beginner" as const,
  technologies: ["HTML5"],
  learningStyle: "micro-learning",
  objectives: [
    "Master HTML concepts through bite-sized lessons",
    "Practice immediately after learning each concept", 
    "Build confidence through incremental success",
    "Create a complete web page step-by-step"
  ]
}
