'use client'

import React, { useState, useEffect } from 'react'

// Professional JavaScript Learning Experience - CodeAvengers Style
export default function JavaScriptMastery() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [userCode, setUserCode] = useState('')
  const [consoleOutput, setConsoleOutput] = useState<string[]>([])
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())

  const challenges = [
    {
      id: 1,
      title: "JavaScript Fundamentals Engine",
      description: "Master variables, functions, and basic operations",
      instruction: "Create a function called 'calculateTip' that takes a bill amount and tip percentage, then returns the total amount including tip",
      starterCode: "// Write your function here\nfunction calculateTip(bill, tipPercent) {\n  // Your code here\n}\n\n// Test your function\nconsole.log(calculateTip(50, 20));",
      expectedKeywords: ["function", "calculateTip", "return", "*", "+"],
      testCases: [
        { input: "calculateTip(50, 20)", expected: "60" },
        { input: "calculateTip(100, 15)", expected: "115" }
      ],
      hints: ["Calculate tip: bill * (tipPercent / 100)", "Add tip to original bill", "Use return to give back the result"],
      points: 100
    },
    {
      id: 2,
      title: "DOM Manipulation Laboratory",
      description: "Control web page elements with JavaScript",
      instruction: "Write code that changes the text content of an element with id 'message' to 'Hello, JavaScript!' when a button is clicked",
      starterCode: "// DOM manipulation challenge\nfunction changeMessage() {\n  // Get element by ID and change its text\n  \n}\n\n// Test it (this would work with the HTML below)\nconsole.log('Function ready!');",
      htmlStructure: `<div id="message">Original text</div>
<button onclick="changeMessage()">Change Text</button>`,
      expectedKeywords: ["getElementById", "textContent", "innerHTML"],
      testCases: [
        { input: "changeMessage should exist", expected: "function" }
      ],
      hints: ["Use document.getElementById('message')", "Set textContent or innerHTML property", "The function should modify the DOM element"],
      points: 150
    },
    {
      id: 3,
      title: "Advanced Logic & Algorithms",
      description: "Build complex programming solutions",
      instruction: "Create a function 'findLargest' that takes an array of numbers and returns the largest number using a loop (not Math.max)",
      starterCode: "// Algorithm challenge\nfunction findLargest(numbers) {\n  // Use a loop to find the largest number\n  \n}\n\n// Test cases\nconsole.log(findLargest([3, 7, 2, 9, 1])); // Should return 9\nconsole.log(findLargest([15, 8, 23, 4])); // Should return 23",
      expectedKeywords: ["function", "findLargest", "for", "if", "return"],
      testCases: [
        { input: "findLargest([3, 7, 2, 9, 1])", expected: "9" },
        { input: "findLargest([15, 8, 23, 4])", expected: "23" }
      ],
      hints: ["Start with first number as largest", "Loop through array comparing each number", "Update largest when you find a bigger number"],
      points: 200
    }
  ]

  const currentChal = challenges[currentChallenge]

  const executeCode = () => {
    try {
      // Clear previous console output
      setConsoleOutput([])
      
      // Create a custom console for capturing output
      const output: string[] = []
      const customConsole = {
        log: (...args: any[]) => {
          output.push(args.map(arg => String(arg)).join(' '))
        }
      }

      // Execute user code in a safe context
      const func = new Function('console', userCode)
      func(customConsole)
      
      setConsoleOutput(output)
      return output
    } catch (error) {
      const errorMsg = `Error: ${error}`
      setConsoleOutput([errorMsg])
      return [errorMsg]
    }
  }

  const checkCode = () => {
    const normalizedUser = userCode.toLowerCase()
    const hasKeywords = currentChal.expectedKeywords.every(keyword => 
      normalizedUser.includes(keyword.toLowerCase())
    )

    const output = executeCode()
    
    // Basic validation - check if code runs and has expected keywords
    if (hasKeywords && !output.some(line => line.includes('Error'))) {
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
      setFeedback('🚀 Outstanding! Algorithm executed successfully!')
    } else {
      setFeedback('Logic error detected. Review your code structure and syntax.')
      setStreak(0)
    }
  }

  const handleRunCode = () => {
    executeCode()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-cyan-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-emerald-400">JavaScript Mastery Console</h1>
              <p className="text-slate-300">Advanced Programming & Algorithm Development</p>
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
                <h2 className="text-xl font-bold text-emerald-400">
                  Algorithm {currentChallenge + 1}/{challenges.length}
                </h2>
                <div className="bg-emerald-500/20 px-3 py-1 rounded-full">
                  <span className="text-emerald-400 text-sm font-medium">
                    {currentChal.points} XP
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">{currentChal.title}</h3>
              <p className="text-slate-300 mb-4">{currentChal.description}</p>
              
              <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-400 mb-2">⚡ Programming Challenge:</h4>
                <p className="text-slate-200">{currentChal.instruction}</p>
              </div>

              {currentChal.htmlStructure && (
                <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-400 mb-2">🌐 HTML Context:</h4>
                  <pre className="text-sm text-gray-300 overflow-x-auto">
                    <code>{currentChal.htmlStructure}</code>
                  </pre>
                </div>
              )}

              {showHint && (
                <div className="bg-emerald-900/30 rounded-lg p-4 mb-4 border border-emerald-500/30">
                  <h4 className="font-semibold text-emerald-400 mb-2">💡 Algorithm Hints:</h4>
                  <ul className="space-y-1">
                    {currentChal.hints.map((hint, idx) => (
                      <li key={idx} className="text-emerald-200 text-sm">• {hint}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleRunCode}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Run Code
                </button>
                <button
                  onClick={handleCheck}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Submit Solution
                </button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {showHint ? 'Hide Hints' : 'Show Hints'}
                </button>
              </div>

              {feedback && (
                <div className={`mb-4 p-3 rounded-lg ${
                  feedback.includes('Outstanding') 
                    ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                    : 'bg-red-900/30 text-red-400 border border-red-500/30'
                }`}>
                  {feedback}
                </div>
              )}

              {/* Console Output */}
              <div className="bg-black/50 rounded-lg p-4 border border-slate-600">
                <h4 className="font-semibold text-green-400 mb-2">🖥️ Console Output:</h4>
                <div className="font-mono text-sm min-h-[100px]">
                  {consoleOutput.length > 0 ? (
                    consoleOutput.map((line, idx) => (
                      <div key={idx} className={`${line.includes('Error') ? 'text-red-400' : 'text-green-300'}`}>
                        → {line}
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">Click "Run Code" to see output...</div>
                  )}
                </div>
              </div>
            </div>

            {/* Algorithm Progress */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-300 mb-4">Algorithm Mastery</h3>
              <div className="space-y-3">
                {['Core Programming', 'DOM Control', 'Advanced Logic'].map((skill, idx) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      completedChallenges.has(idx) ? 'bg-emerald-500' : 
                      currentChallenge === idx ? 'bg-cyan-500' : 'bg-slate-600'
                    }`}>
                      {completedChallenges.has(idx) ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{skill}</div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            completedChallenges.has(idx) ? 'bg-emerald-500 w-full' :
                            currentChallenge === idx ? 'bg-cyan-500 w-1/3' : 'w-0'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-700/50 px-4 py-3 border-b border-slate-600 flex items-center justify-between">
                <h3 className="font-semibold text-slate-200">JavaScript Editor</h3>
                <div className="text-xs text-slate-400">script.js</div>
              </div>
              <div className="p-0">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-96 bg-slate-900 text-yellow-300 font-mono text-sm p-4 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  placeholder={currentChal.starterCode}
                  style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
                />
              </div>
            </div>

            {/* Test Cases */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-300 mb-4">Test Cases</h3>
              <div className="space-y-2">
                {currentChal.testCases.map((test, idx) => (
                  <div key={idx} className="bg-slate-700/30 rounded-lg p-3">
                    <div className="text-sm font-mono text-blue-300">
                      Input: {test.input}
                    </div>
                    <div className="text-sm font-mono text-green-300">
                      Expected: {test.expected}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
