'use client'

import { useState, useEffect, useRef } from 'react'

// ========================================
// 🎯 MICRO-LEARNING COMPONENT LIBRARY
// 30 Reusable Educational Building Blocks
// ========================================

// 1. 🔥 LIVE CODE SANDBOX - Instant Gratification
export const LiveCodeSandbox = ({ 
  title, 
  starterCode, 
  expectedOutput, 
  onSuccess,
  language = 'html',
  showPreview = true 
}: any) => {
  const [code, setCode] = useState(starterCode)
  const [isCorrect, setIsCorrect] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [score, setScore] = useState(0)

  const checkCode = () => {
    setAttempts(prev => prev + 1)
    const matches = code.toLowerCase().includes(expectedOutput.toLowerCase())
    if (matches) {
      const finalScore = Math.max(500 - attempts * 50, 100)
      setScore(finalScore)
      setIsCorrect(true)
      onSuccess?.(finalScore)
    }
  }

  return (
    <div className="p-4 border-2 border-blue-300 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
      <h4 className="flex items-center gap-2 mb-3 font-bold text-blue-800">
        💻 {title}
      </h4>
      
      <div className="grid gap-4 md:grid-cols-2">
        {/* Code Editor */}
        <div>
          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="mb-2 text-xs text-green-400">// {language.toUpperCase()} Editor</div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-32 font-mono text-sm text-green-400 bg-transparent resize-none focus:outline-none"
              placeholder="Type your code here..."
            />
          </div>
          <button
            onClick={checkCode}
            className={`w-full mt-2 py-2 px-4 rounded-lg font-semibold ${
              isCorrect 
                ? 'bg-green-500 text-white' 
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isCorrect ? `🎉 +${score} XP` : 'Run Code'}
          </button>
        </div>

        {/* Live Preview */}
        {showPreview && (
          <div>
            <div className="mb-2 text-sm font-semibold text-gray-700">Live Preview:</div>
            <div className="border-2 border-gray-300 rounded-lg p-3 bg-white min-h-[140px]">
              {language === 'html' ? (
                <div dangerouslySetInnerHTML={{ __html: code }} />
              ) : (
                <pre className="text-sm text-gray-800 whitespace-pre-wrap">{code}</pre>
              )}
            </div>
          </div>
        )}
      </div>

      {attempts > 0 && !isCorrect && (
        <div className="mt-2 text-sm text-orange-600">
          💡 Try again! ({attempts} attempts)
        </div>
      )}
    </div>
  )
}

// 2. ⚡ SPEED TYPING CHALLENGE - Build Muscle Memory
export const SpeedTypingChallenge = ({ targetCode, description, onComplete }: any) => {
  const [userInput, setUserInput] = useState('')
  const [timeLeft, setTimeLeft] = useState(30)
  const [isActive, setIsActive] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(100)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isActive, timeLeft])

  useEffect(() => {
    const words = userInput.trim().split(' ').length
    const minutes = (30 - timeLeft) / 60
    if (minutes > 0) setWpm(Math.round(words / minutes))
    
    const correct = userInput.split('').filter((char, i) => char === targetCode[i]).length
    setAccuracy(Math.round((correct / Math.max(userInput.length, 1)) * 100))
  }, [userInput, timeLeft])

  const startChallenge = () => {
    setIsActive(true)
    setUserInput('')
    setTimeLeft(30)
  }

  return (
    <div className="p-4 border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-bold text-yellow-800">⚡ Speed Coding Challenge</h4>
        {isActive && (
          <div className="flex gap-2 text-sm">
            <span className="px-2 py-1 text-white bg-red-500 rounded">⏰ {timeLeft}s</span>
            <span className="px-2 py-1 text-white bg-blue-500 rounded">📊 {wpm} WPM</span>
            <span className="px-2 py-1 text-white bg-green-500 rounded">🎯 {accuracy}%</span>
          </div>
        )}
      </div>

      <p className="mb-3 text-gray-700">{description}</p>

      {!isActive ? (
        <div className="py-6 text-center">
          <div className="p-3 mb-4 font-mono text-sm text-green-400 bg-gray-900 rounded-lg">
            {targetCode}
          </div>
          <button
            onClick={startChallenge}
            className="px-6 py-2 font-bold text-white bg-yellow-500 rounded-lg hover:bg-yellow-600"
          >
            🚀 Start Typing Challenge
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="mb-2 font-mono text-sm text-gray-400">Target:</div>
            <div className="font-mono text-sm text-green-400">{targetCode}</div>
          </div>
          <textarea
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="w-full h-24 p-3 font-mono text-sm border-2 border-yellow-300 rounded-lg"
            placeholder="Type the code above..."
            disabled={timeLeft === 0}
          />
          {timeLeft === 0 && (
            <div className="p-3 text-center bg-green-100 border border-green-300 rounded-lg">
              🏁 Challenge Complete! WPM: {wpm} | Accuracy: {accuracy}%
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// 3. 🎯 DRAG & DROP CODE BUILDER - Visual Learning
export const DragDropCodeBuilder = ({ elements, targetStructure, title, onComplete }: any) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null)
  const [builtCode, setBuiltCode] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedElement && !builtCode.includes(draggedElement)) {
      const newCode = [...builtCode, draggedElement]
      setBuiltCode(newCode)
      
      if (newCode.length === targetStructure.length) {
        const isCorrect = newCode.every((item, index) => item === targetStructure[index])
        if (isCorrect) {
          setIsComplete(true)
          onComplete?.(1000)
        }
      }
    }
    setDraggedElement(null)
  }

  return (
    <div className="p-4 border-2 border-purple-300 bg-gradient-to-br from-purple-50 to-pink-100 rounded-xl">
      <h4 className="mb-3 font-bold text-purple-800">🎯 {title}</h4>
      
      <div className="grid gap-4 md:grid-cols-2">
        {/* Available Elements */}
        <div>
          <h5 className="mb-2 font-semibold text-gray-700">📦 Drag These:</h5>
          <div className="space-y-2">
            {elements.map((element: string, index: number) => (
              <div
                key={index}
                draggable
                onDragStart={() => setDraggedElement(element)}
                className={`p-2 rounded-lg cursor-move transition-all font-mono text-sm ${
                  builtCode.includes(element)
                    ? 'bg-gray-200 text-gray-500 opacity-50'
                    : 'bg-white border-2 border-purple-200 hover:border-purple-400'
                }`}
              >
                {element}
              </div>
            ))}
          </div>
        </div>

        {/* Drop Zone */}
        <div>
          <h5 className="mb-2 font-semibold text-gray-700">🏗️ Build Here:</h5>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="min-h-[200px] border-2 border-dashed border-purple-300 rounded-lg p-3 bg-white"
          >
            {builtCode.map((item, index) => (
              <div key={index} className="p-2 mb-1 font-mono text-sm border rounded bg-purple-50">
                {item}
              </div>
            ))}
            {builtCode.length === 0 && (
              <div className="py-16 text-center text-gray-400">
                Drop code elements here to build
              </div>
            )}
          </div>
          
          {isComplete && (
            <div className="p-3 mt-3 text-center bg-green-100 border border-green-300 rounded-lg">
              🎉 Perfect Structure! +1000 XP
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 4. 🔬 INTERACTIVE CODE DISSECTOR - Understanding Structure
export const InteractiveCodeDissector = ({ codeSnippet, explanations, onComplete }: any) => {
  const [selectedLine, setSelectedLine] = useState<number | null>(null)
  const [revealedLines, setRevealedLines] = useState<Set<number>>(new Set())

  const lines = codeSnippet.split('\n')

  const handleLineClick = (lineIndex: number) => {
    setSelectedLine(lineIndex)
    setRevealedLines(prev => new Set([...prev, lineIndex]))
    
    if (revealedLines.size + 1 === lines.length) {
      onComplete?.(500)
    }
  }

  return (
    <div className="p-4 border-2 border-green-300 bg-gradient-to-br from-green-50 to-blue-100 rounded-xl">
      <h4 className="mb-3 font-bold text-green-800">🔬 Interactive Code Explorer</h4>
      
      <div className="grid gap-4 md:grid-cols-2">
        {/* Code Display */}
        <div>
          <div className="p-3 bg-gray-900 rounded-lg">
            {lines.map((line, index) => (
              <div
                key={index}
                onClick={() => handleLineClick(index)}
                className={`font-mono text-sm py-1 px-2 rounded cursor-pointer transition-all ${
                  selectedLine === index
                    ? 'bg-blue-600 text-white'
                    : revealedLines.has(index)
                      ? 'text-green-400 bg-green-900 bg-opacity-20'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span className="mr-3 text-gray-500">{index + 1}</span>
                {line}
              </div>
            ))}
          </div>
        </div>

        {/* Explanation Panel */}
        <div>
          <h5 className="mb-2 font-semibold text-gray-700">💡 Click lines to understand:</h5>
          <div className="bg-white rounded-lg p-3 border min-h-[200px]">
            {selectedLine !== null ? (
              <div>
                <div className="mb-2 font-semibold text-green-700">
                  Line {selectedLine + 1}: {lines[selectedLine]}
                </div>
                <p className="text-gray-700">
                  {explanations[selectedLine] || 'Click on different lines to explore!'}
                </p>
              </div>
            ) : (
              <div className="py-16 text-center text-gray-400">
                Click any line of code to see explanation
              </div>
            )}
          </div>
          
          <div className="mt-2 text-sm text-gray-600">
            Progress: {revealedLines.size}/{lines.length} lines explored
          </div>
        </div>
      </div>
    </div>
  )
}

// 5. 🎮 CODE COMPLETION GAME - Fill in the Blanks
export const CodeCompletionGame = ({ template, blanks, hints, onComplete }: any) => {
  const [answers, setAnswers] = useState<{[key: string]: string}>({})
  const [attempts, setAttempts] = useState(0)
  const [score, setScore] = useState(0)

  const checkAnswers = () => {
    setAttempts(prev => prev + 1)
    const correct = Object.keys(blanks).filter(key => 
      answers[key]?.toLowerCase().trim() === blanks[key].toLowerCase().trim()
    ).length
    
    if (correct === Object.keys(blanks).length) {
      const finalScore = Math.max(1000 - attempts * 100, 200)
      setScore(finalScore)
      onComplete?.(finalScore)
    }
  }

  const renderTemplate = () => {
    let result = template
    Object.keys(blanks).forEach(key => {
      const input = `<input class="inline-input" data-key="${key}" placeholder="?" />`
      result = result.replace(`{${key}}`, input)
    })
    return result
  }

  return (
    <div className="p-4 border-2 border-indigo-300 bg-gradient-to-br from-indigo-50 to-purple-100 rounded-xl">
      <h4 className="mb-3 font-bold text-indigo-800">🎮 Code Completion Challenge</h4>
      
      <div className="p-4 mb-4 bg-gray-900 rounded-lg">
        <div className="font-mono text-sm text-green-400 whitespace-pre-wrap">
          {template.split('\n').map((line: string, index: number) => (
            <div key={index} className="mb-1">
              {line.includes('{') ? (
                line.split(/(\{[^}]+\})/).map((part: string, i: number) => {
                  if (part.match(/\{([^}]+)\}/)) {
                    const key = part.replace(/[{}]/g, '')
                    return (
                      <input
                        key={i}
                        value={answers[key] || ''}
                        onChange={(e) => setAnswers(prev => ({...prev, [key]: e.target.value}))}
                        className="inline-block w-20 px-2 py-1 mx-1 font-mono text-sm text-black bg-yellow-400 rounded"
                        placeholder="?"
                      />
                    )
                  }
                  return part
                })
              ) : (
                line
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h5 className="mb-2 font-semibold text-gray-700">💡 Hints:</h5>
          <div className="space-y-1 text-sm">
            {Object.keys(blanks).map(key => (
              <div key={key} className="p-2 bg-white border rounded">
                <span className="font-mono text-yellow-600">{key}:</span> {hints[key]}
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <button
            onClick={checkAnswers}
            className="px-6 py-2 font-bold text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
          >
            Check Code
          </button>
          {score > 0 && (
            <div className="p-3 mt-3 bg-green-100 border border-green-300 rounded-lg">
              🎉 Perfect! +{score} XP
            </div>
          )}
          {attempts > 0 && score === 0 && (
            <div className="mt-3 text-sm text-orange-600">
              Keep trying! ({attempts} attempts)
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
