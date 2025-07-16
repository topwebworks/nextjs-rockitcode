'use client'

import { useState, useEffect } from 'react'

// ========================================
// 🎯 MICRO-LEARNING BLOCKS 6-15
// Advanced Interactive Components
// ========================================

// 6. 🎨 LIVE CSS PLAYGROUND - Instant Visual Feedback
export const LiveCSSPlayground = ({ property, values, target, onSuccess }: any) => {
  const [selectedValue, setSelectedValue] = useState(values[0])
  const [isCorrect, setIsCorrect] = useState(false)

  const checkStyle = () => {
    if (selectedValue === target) {
      setIsCorrect(true)
      onSuccess?.(300)
    }
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 to-rose-100 p-4 rounded-xl border-2 border-pink-300">
      <h4 className="font-bold text-pink-800 mb-3">🎨 Live CSS Playground</h4>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold mb-2">🎛️ Try Different Values:</h5>
          <div className="space-y-2">
            {values.map((value: string) => (
              <button
                key={value}
                onClick={() => setSelectedValue(value)}
                className={`w-full p-2 rounded-lg text-left font-mono text-sm transition-all ${
                  selectedValue === value
                    ? 'bg-pink-500 text-white'
                    : 'bg-white border border-pink-200 hover:border-pink-400'
                }`}
              >
                {property}: {value};
              </button>
            ))}
          </div>
          <button
            onClick={checkStyle}
            className="w-full mt-3 bg-pink-600 hover:bg-pink-700 text-white py-2 rounded-lg"
          >
            Apply Style
          </button>
        </div>

        <div>
          <h5 className="font-semibold mb-2">👀 Live Preview:</h5>
          <div 
            className="w-full h-32 border-2 border-gray-300 rounded-lg flex items-center justify-center bg-white"
            style={{ [property]: selectedValue }}
          >
            <span className="font-semibold">Sample Element</span>
          </div>
          
          {isCorrect && (
            <div className="mt-3 p-2 bg-green-100 border border-green-300 rounded text-center">
              🎉 Perfect styling! +300 XP
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 7. 🏗️ STEP-BY-STEP BUILDER - Guided Construction
export const StepByStepBuilder = ({ steps, title, onComplete }: any) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [builtCode, setBuiltCode] = useState('')

  const completeStep = (stepCode: string) => {
    setBuiltCode(prev => prev + stepCode + '\n')
    setCompletedSteps(prev => new Set([...prev, currentStep]))
    
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete?.(steps.length * 100)
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-100 p-4 rounded-xl border-2 border-emerald-300">
      <h4 className="font-bold text-emerald-800 mb-3">🏗️ {title}</h4>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">📋</span>
            <span className="font-semibold">Step {currentStep + 1} of {steps.length}</span>
          </div>
          
          <div className="bg-white p-4 rounded-lg border mb-4">
            <h5 className="font-semibold text-emerald-700 mb-2">
              {steps[currentStep]?.title}
            </h5>
            <p className="text-gray-700 mb-3">{steps[currentStep]?.instruction}</p>
            
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
              {steps[currentStep]?.code}
            </div>
            
            <button
              onClick={() => completeStep(steps[currentStep]?.code)}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-lg"
            >
              ✅ Add This Code
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex gap-2">
            {steps.map((_: any, index: number) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  completedSteps.has(index)
                    ? 'bg-emerald-500 text-white'
                    : index === currentStep
                      ? 'bg-emerald-200 text-emerald-800'
                      : 'bg-gray-200 text-gray-500'
                }`}
              >
                {completedSteps.has(index) ? '✓' : index + 1}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">🔨 Built Code:</h5>
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm min-h-[200px]">
            {builtCode || '// Your code will appear here...'}
          </div>
        </div>
      </div>
    </div>
  )
}

// 8. 🎯 INSTANT FEEDBACK TYPER - Real-time Validation
export const InstantFeedbackTyper = ({ targetCode, title, onSuccess }: any) => {
  const [userCode, setUserCode] = useState('')
  const [feedback, setFeedback] = useState<{type: string, message: string} | null>(null)

  useEffect(() => {
    if (userCode.length === 0) {
      setFeedback(null)
      return
    }

    const isMatching = targetCode.startsWith(userCode)
    const isComplete = userCode === targetCode

    if (isComplete) {
      setFeedback({ type: 'success', message: '🎉 Perfect! Code is complete!' })
      onSuccess?.(500)
    } else if (isMatching) {
      setFeedback({ type: 'progress', message: '✅ Looking good! Keep typing...' })
    } else {
      setFeedback({ type: 'error', message: '❌ Check your typing - something\'s not right' })
    }
  }, [userCode, targetCode])

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-100 p-4 rounded-xl border-2 border-blue-300">
      <h4 className="font-bold text-blue-800 mb-3">🎯 {title}</h4>
      
      <div className="space-y-4">
        <div>
          <h5 className="font-semibold text-gray-700 mb-2">📝 Type this code exactly:</h5>
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
            {targetCode}
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-700 mb-2">⌨️ Your code:</h5>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-24 p-3 border-2 border-blue-300 rounded-lg font-mono text-sm focus:border-blue-500 focus:outline-none"
            placeholder="Start typing..."
          />
        </div>

        {feedback && (
          <div className={`p-3 rounded-lg border ${
            feedback.type === 'success' ? 'bg-green-100 border-green-300 text-green-800' :
            feedback.type === 'progress' ? 'bg-blue-100 border-blue-300 text-blue-800' :
            'bg-red-100 border-red-300 text-red-800'
          }`}>
            {feedback.message}
          </div>
        )}

        <div className="text-sm text-gray-600">
          Progress: {userCode.length}/{targetCode.length} characters
        </div>
      </div>
    </div>
  )
}

// 9. 🔍 CODE DETECTIVE - Find & Fix Bugs
export const CodeDetective = ({ brokenCode, fixes, explanation, onSolve }: any) => {
  const [selectedFix, setSelectedFix] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [solved, setSolved] = useState(false)

  const checkFix = () => {
    setAttempts(prev => prev + 1)
    if (fixes.correct.includes(selectedFix)) {
      setSolved(true)
      onSolve?.(Math.max(400 - attempts * 50, 100))
    }
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-100 p-4 rounded-xl border-2 border-red-300">
      <h4 className="font-bold text-red-800 mb-3 flex items-center gap-2">
        🔍 Code Detective Challenge
      </h4>
      
      <div className="space-y-4">
        <div>
          <h5 className="font-semibold text-gray-700 mb-2">🐛 Broken Code:</h5>
          <div className="bg-gray-900 text-red-400 p-3 rounded-lg font-mono text-sm">
            {brokenCode.split('\n').map((line: string, index: number) => (
              <div key={index} className={line.includes('ERROR') ? 'bg-red-900 bg-opacity-50' : ''}>
                {line}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-gray-700 mb-2">🔧 Choose the fix:</h5>
          <div className="space-y-2">
            {fixes.options.map((option: string) => (
              <button
                key={option}
                onClick={() => setSelectedFix(option)}
                className={`w-full p-3 text-left rounded-lg transition-all ${
                  selectedFix === option
                    ? 'bg-red-500 text-white'
                    : 'bg-white border border-red-200 hover:border-red-400'
                }`}
              >
                <code className="font-mono text-sm">{option}</code>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={checkFix}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
          disabled={!selectedFix}
        >
          🔍 Apply Fix
        </button>

        {solved && (
          <div className="p-3 bg-green-100 border border-green-300 rounded-lg">
            <div className="font-semibold text-green-800 mb-2">🎉 Bug Fixed!</div>
            <p className="text-green-700 text-sm">{explanation}</p>
          </div>
        )}

        {attempts > 0 && !solved && (
          <div className="text-sm text-orange-600">
            🤔 Try again! Debugging takes practice. ({attempts} attempts)
          </div>
        )}
      </div>
    </div>
  )
}

// 10. 🌈 VISUAL CONCEPT BUILDER - Interactive Diagrams
export const VisualConceptBuilder = ({ concept, elements, onComplete }: any) => {
  const [placedElements, setPlacedElements] = useState<{[key: string]: {x: number, y: number}}>({})
  const [isComplete, setIsComplete] = useState(false)

  const handleDrop = (e: React.DragEvent, zone: string) => {
    e.preventDefault()
    const elementId = e.dataTransfer.getData('text/plain')
    
    setPlacedElements(prev => ({
      ...prev,
      [elementId]: { x: e.clientX, y: e.clientY }
    }))

    // Check if placement is correct (simplified)
    if (Object.keys(placedElements).length + 1 >= elements.length) {
      setIsComplete(true)
      onComplete?.(600)
    }
  }

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-100 p-4 rounded-xl border-2 border-violet-300">
      <h4 className="font-bold text-violet-800 mb-3">🌈 {concept} Builder</h4>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold mb-2">🧩 Drag These Elements:</h5>
          <div className="space-y-2">
            {elements.map((element: any) => (
              <div
                key={element.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData('text/plain', element.id)}
                className="p-3 bg-white border-2 border-violet-200 rounded-lg cursor-move hover:border-violet-400 transition-all"
              >
                <div className="font-semibold">{element.name}</div>
                <div className="text-sm text-gray-600">{element.description}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">🏗️ Build Your Concept:</h5>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, 'main')}
            className="min-h-[300px] border-2 border-dashed border-violet-300 rounded-lg p-4 bg-white relative"
          >
            {Object.keys(placedElements).length === 0 ? (
              <div className="text-center text-gray-400 py-20">
                Drop elements here to build your concept
              </div>
            ) : (
              <div className="space-y-2">
                {Object.keys(placedElements).map(elementId => {
                  const element = elements.find((e: any) => e.id === elementId)
                  return (
                    <div key={elementId} className="p-2 bg-violet-50 rounded border">
                      {element?.name}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {isComplete && (
            <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-lg text-center">
              🎉 Concept mastered! +600 XP
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
