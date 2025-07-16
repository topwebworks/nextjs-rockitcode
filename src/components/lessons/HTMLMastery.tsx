'use client'

import React, { useState, useEffect } from 'react'

// Professional HTML Learning Experience - Code.org Style
export default function HTMLMastery() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [userCode, setUserCode] = useState('')
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())

  const challenges = [
    {
      id: 1,
      title: "HTML Structure Foundation",
      description: "Build the basic structure of any webpage",
      instruction: "Create a complete HTML document with proper doctype, html, head, and body tags",
      starterCode: "",
      expectedOutput: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Hello World</h1>\n</body>\n</html>",
      hints: ["Start with <!DOCTYPE html>", "Don't forget the closing tags", "Add a title in the head section"],
      points: 100
    },
    {
      id: 2,
      title: "Content Hierarchy Challenge",
      description: "Master heading structures and semantic content",
      instruction: "Create a news article layout with proper heading hierarchy (h1, h2, h3) and paragraph content",
      starterCode: "<h1>Breaking News</h1>\n",
      expectedOutput: "<h1>Breaking News</h1>\n<h2>Technology</h2>\n<h3>AI Revolution</h3>\n<p>Artificial intelligence is transforming industries worldwide.</p>\n<h3>Quantum Computing</h3>\n<p>New breakthroughs in quantum technology promise faster computing.</p>",
      hints: ["Use h1 for main title", "h2 for sections", "h3 for subsections", "Add paragraphs with p tags"],
      points: 150
    },
    {
      id: 3,
      title: "Interactive Elements Mastery",
      description: "Build interactive web components",
      instruction: "Create a contact form with input fields, labels, and a submit button",
      starterCode: "<form>\n\n</form>",
      expectedOutput: "<form>\n  <label for=\"name\">Name:</label>\n  <input type=\"text\" id=\"name\" name=\"name\">\n  \n  <label for=\"email\">Email:</label>\n  <input type=\"email\" id=\"email\" name=\"email\">\n  \n  <button type=\"submit\">Submit</button>\n</form>",
      hints: ["Use label elements for accessibility", "Connect labels to inputs with 'for' and 'id'", "Use appropriate input types"],
      points: 200
    }
  ]

  const currentChal = challenges[currentChallenge]

  const checkCode = () => {
    const normalizedUser = userCode.trim().replace(/\s+/g, ' ').toLowerCase()
    const normalizedExpected = currentChal.expectedOutput.trim().replace(/\s+/g, ' ').toLowerCase()
    
    if (normalizedUser.includes(normalizedExpected.substring(0, 50))) {
      setScore(prev => prev + currentChal.points)
      setStreak(prev => prev + 1)
      setCompletedChallenges(prev => new Set([...prev, currentChallenge]))
      
      if (currentChallenge < challenges.length - 1) {
        setTimeout(() => setCurrentChallenge(prev => prev + 1), 1500)
      }
      return true
    }
    return false
  }

  const [feedback, setFeedback] = useState('')
  const [showHint, setShowHint] = useState(false)

  const handleCheck = () => {
    if (checkCode()) {
      setFeedback('🎉 Excellent! Challenge completed!')
    } else {
      setFeedback('Not quite right. Check your syntax and try again.')
      setStreak(0)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-blue-400">HTML Mastery Lab</h1>
              <p className="text-slate-300">Professional Web Development Training</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="bg-green-500/20 px-4 py-2 rounded-lg">
                <span className="text-green-400 font-bold">Score: {score}</span>
              </div>
              <div className="bg-orange-500/20 px-4 py-2 rounded-lg">
                <span className="text-orange-400 font-bold">Streak: {streak}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Challenge Panel */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-blue-400">
                  Challenge {currentChallenge + 1}/{challenges.length}
                </h2>
                <div className="bg-purple-500/20 px-3 py-1 rounded-full">
                  <span className="text-purple-400 text-sm font-medium">
                    {currentChal.points} points
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">{currentChal.title}</h3>
              <p className="text-slate-300 mb-4">{currentChal.description}</p>
              
              <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-400 mb-2">📋 Your Mission:</h4>
                <p className="text-slate-200">{currentChal.instruction}</p>
              </div>

              {showHint && (
                <div className="bg-blue-900/30 rounded-lg p-4 mb-4 border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">💡 Hints:</h4>
                  <ul className="space-y-1">
                    {currentChal.hints.map((hint, idx) => (
                      <li key={idx} className="text-blue-200 text-sm">• {hint}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleCheck}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Check Solution
                </button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {showHint ? 'Hide Hints' : 'Show Hints'}
                </button>
              </div>

              {feedback && (
                <div className={`mt-4 p-3 rounded-lg ${
                  feedback.includes('Excellent') 
                    ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                    : 'bg-red-900/30 text-red-400 border border-red-500/30'
                }`}>
                  {feedback}
                </div>
              )}
            </div>

            {/* Progress Tracker */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-300 mb-4">Progress Tracker</h3>
              <div className="grid grid-cols-3 gap-3">
                {challenges.map((challenge, idx) => (
                  <div
                    key={challenge.id}
                    className={`p-3 rounded-lg text-center ${
                      completedChallenges.has(idx)
                        ? 'bg-green-600/20 border border-green-500/30'
                        : currentChallenge === idx
                        ? 'bg-blue-600/20 border border-blue-500/30'
                        : 'bg-slate-700/30 border border-slate-600/30'
                    }`}
                  >
                    <div className="text-2xl mb-1">
                      {completedChallenges.has(idx) ? '✅' : currentChallenge === idx ? '⏳' : '⭕'}
                    </div>
                    <div className="text-sm text-slate-300">Level {idx + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor Panel */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-700/50 px-4 py-3 border-b border-slate-600">
                <h3 className="font-semibold text-slate-200">Code Editor</h3>
              </div>
              <div className="p-0">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-80 bg-slate-900 text-green-400 font-mono text-sm p-4 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Write your HTML code here..."
                  style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
                />
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-700/50 px-4 py-3 border-b border-slate-600">
                <h3 className="font-semibold text-slate-200">Live Preview</h3>
              </div>
              <div className="bg-white h-80 overflow-auto">
                <iframe
                  srcDoc={userCode}
                  className="w-full h-full border-0"
                  title="Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
