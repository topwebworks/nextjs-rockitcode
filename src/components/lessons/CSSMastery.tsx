'use client'

import React, { useState, useEffect } from 'react'

// Professional CSS Learning Experience - CodeAvengers Style
export default function CSSMastery() {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [userCode, setUserCode] = useState('')
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())

  const challenges = [
    {
      id: 1,
      title: "CSS Fundamentals Lab",
      description: "Master selectors, properties, and styling basics",
      instruction: "Style the given HTML elements: Make the heading blue, paragraph text 18px, and add a red border to the container",
      starterCode: "/* Write your CSS here */\n",
      htmlStructure: `<div class="container">
  <h1>Welcome to CSS</h1>
  <p>This is a paragraph that needs styling.</p>
</div>`,
      expectedCSS: `.container {
  border: 2px solid red;
}

h1 {
  color: blue;
}

p {
  font-size: 18px;
}`,
      hints: ["Use class selector with .container", "Element selectors don't need dots or #", "Remember the colon and semicolon syntax"],
      points: 100
    },
    {
      id: 2,
      title: "Layout Engineering Challenge",
      description: "Build responsive layouts with Flexbox",
      instruction: "Create a navigation bar using flexbox: center the nav items horizontally and add space between them",
      starterCode: "/* Complete the flexbox layout */\n.navbar {\n  \n}\n\n.nav-item {\n  \n}",
      htmlStructure: `<nav class="navbar">
  <div class="nav-item">Home</div>
  <div class="nav-item">About</div>
  <div class="nav-item">Contact</div>
</nav>`,
      expectedCSS: `.navbar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem;
  background-color: #333;
}

.nav-item {
  color: white;
  padding: 0.5rem 1rem;
  cursor: pointer;
}`,
      hints: ["Use display: flex on the container", "justify-content controls horizontal spacing", "align-items centers vertically"],
      points: 150
    },
    {
      id: 3,
      title: "Advanced Styling Systems",
      description: "Master animations, transitions, and modern CSS",
      instruction: "Create a hover effect: card should lift up (transform) and shadow should increase on hover with smooth transition",
      starterCode: "/* Add hover effects and transitions */\n.card {\n  \n}\n\n.card:hover {\n  \n}",
      htmlStructure: `<div class="card">
  <h3>Interactive Card</h3>
  <p>Hover over me to see the effect!</p>
</div>`,
      expectedCSS: `.card {
  padding: 2rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.2);
}`,
      hints: ["Use transform: translateY() to move vertically", "Transition property makes animations smooth", "Box-shadow creates depth"],
      points: 200
    }
  ]

  const currentChal = challenges[currentChallenge]

  const checkCode = () => {
    const normalizedUser = userCode.trim().replace(/\s+/g, ' ').toLowerCase()
    const normalizedExpected = currentChal.expectedCSS.trim().replace(/\s+/g, ' ').toLowerCase()
    
    // More flexible checking for CSS
    const userHasKeywords = [
      currentChallenge === 0 ? ['container', 'border', 'red', 'h1', 'color', 'blue', 'font-size', '18px'] :
      currentChallenge === 1 ? ['display', 'flex', 'justify-content', 'space'] :
      ['transition', 'transform', 'hover', 'box-shadow']
    ][currentChallenge]

    const hasAllKeywords = userHasKeywords.every(keyword => 
      normalizedUser.includes(keyword.toLowerCase())
    )

    if (hasAllKeywords) {
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
      setFeedback('🎯 Perfect! CSS mastery achieved!')
    } else {
      setFeedback('Code needs refinement. Check syntax and required properties.')
      setStreak(0)
    }
  }

  const combinedCode = `
<!DOCTYPE html>
<html>
<head>
<style>
${userCode}
</style>
</head>
<body>
${currentChal.htmlStructure}
</body>
</html>`

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-purple-400">CSS Mastery Studio</h1>
              <p className="text-slate-300">Advanced Styling & Layout Engineering</p>
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
                <h2 className="text-xl font-bold text-purple-400">
                  Lab {currentChallenge + 1}/{challenges.length}
                </h2>
                <div className="bg-purple-500/20 px-3 py-1 rounded-full">
                  <span className="text-purple-400 text-sm font-medium">
                    {currentChal.points} XP
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold mb-3">{currentChal.title}</h3>
              <p className="text-slate-300 mb-4">{currentChal.description}</p>
              
              <div className="bg-slate-700/50 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-yellow-400 mb-2">🎯 Challenge Brief:</h4>
                <p className="text-slate-200">{currentChal.instruction}</p>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4 mb-4">
                <h4 className="font-semibold text-blue-400 mb-2">📝 HTML Structure:</h4>
                <pre className="text-sm text-gray-300 overflow-x-auto">
                  <code>{currentChal.htmlStructure}</code>
                </pre>
              </div>

              {showHint && (
                <div className="bg-purple-900/30 rounded-lg p-4 mb-4 border border-purple-500/30">
                  <h4 className="font-semibold text-purple-400 mb-2">💡 Pro Tips:</h4>
                  <ul className="space-y-1">
                    {currentChal.hints.map((hint, idx) => (
                      <li key={idx} className="text-purple-200 text-sm">• {hint}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleCheck}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Test Solution
                </button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {showHint ? 'Hide Tips' : 'Show Tips'}
                </button>
              </div>

              {feedback && (
                <div className={`mt-4 p-3 rounded-lg ${
                  feedback.includes('Perfect') 
                    ? 'bg-green-900/30 text-green-400 border border-green-500/30' 
                    : 'bg-red-900/30 text-red-400 border border-red-500/30'
                }`}>
                  {feedback}
                </div>
              )}
            </div>

            {/* Skills Progression */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="font-semibold text-slate-300 mb-4">Skills Progression</h3>
              <div className="space-y-3">
                {['CSS Fundamentals', 'Layout Systems', 'Advanced Effects'].map((skill, idx) => (
                  <div key={skill} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      completedChallenges.has(idx) ? 'bg-green-500' : 
                      currentChallenge === idx ? 'bg-purple-500' : 'bg-slate-600'
                    }`}>
                      {completedChallenges.has(idx) ? '✓' : idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium">{skill}</div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            completedChallenges.has(idx) ? 'bg-green-500 w-full' :
                            currentChallenge === idx ? 'bg-purple-500 w-1/2' : 'w-0'
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Editor & Preview */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-700/50 px-4 py-3 border-b border-slate-600 flex items-center justify-between">
                <h3 className="font-semibold text-slate-200">CSS Editor</h3>
                <div className="text-xs text-slate-400">style.css</div>
              </div>
              <div className="p-0">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-80 bg-slate-900 text-blue-300 font-mono text-sm p-4 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                  placeholder={currentChal.starterCode}
                  style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
                />
              </div>
            </div>

            {/* Live Preview */}
            <div className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
              <div className="bg-slate-700/50 px-4 py-3 border-b border-slate-600 flex items-center justify-between">
                <h3 className="font-semibold text-slate-200">Live Preview</h3>
                <div className="text-xs text-slate-400">Responsive View</div>
              </div>
              <div className="bg-white h-80 overflow-auto">
                <iframe
                  srcDoc={combinedCode}
                  className="w-full h-full border-0"
                  title="CSS Preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
