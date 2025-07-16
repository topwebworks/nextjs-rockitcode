'use client'

import { useState, useEffect } from 'react'

// ========================================
// 🎯 MICRO-LEARNING BLOCKS 11-20
// Gamified & Assessment Components
// ========================================

// 11. 🏆 PROGRESS QUEST - RPG-Style Learning
export const ProgressQuest = ({ questName, challenges, rewards, onQuestComplete }: any) => {
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [completedChallenges, setCompletedChallenges] = useState<Set<number>>(new Set())
  const [xp, setXp] = useState(0)
  const [level, setLevel] = useState(1)

  const completeChallenge = (challengeXP: number) => {
    const newXP = xp + challengeXP
    setXp(newXP)
    setCompletedChallenges(prev => new Set([...prev, currentChallenge]))
    
    // Level up logic
    if (newXP >= level * 1000) {
      setLevel(prev => prev + 1)
    }

    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(prev => prev + 1)
    } else {
      onQuestComplete?.(newXP)
    }
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-yellow-100 p-4 rounded-xl border-2 border-amber-300">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-amber-800 flex items-center gap-2">
          🏆 Quest: {questName}
        </h4>
        <div className="flex gap-2 text-sm">
          <span className="bg-blue-500 text-white px-2 py-1 rounded">Lvl {level}</span>
          <span className="bg-purple-500 text-white px-2 py-1 rounded">{xp} XP</span>
        </div>
      </div>

      {/* Quest Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Quest Progress</span>
          <span>{completedChallenges.size}/{challenges.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-amber-500 to-yellow-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedChallenges.size / challenges.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Current Challenge */}
      {currentChallenge < challenges.length && (
        <div className="bg-white p-4 rounded-lg border border-amber-200">
          <h5 className="font-semibold text-amber-700 mb-2">
            Challenge {currentChallenge + 1}: {challenges[currentChallenge].title}
          </h5>
          <p className="text-gray-700 mb-3">{challenges[currentChallenge].description}</p>
          
          <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
            {challenges[currentChallenge].code}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Reward: {challenges[currentChallenge].xp} XP
            </span>
            <button
              onClick={() => completeChallenge(challenges[currentChallenge].xp)}
              className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg"
            >
              ⚔️ Complete Challenge
            </button>
          </div>
        </div>
      )}

      {/* Quest Complete */}
      {completedChallenges.size === challenges.length && (
        <div className="text-center py-6">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold text-amber-800 mb-2">Quest Complete!</h3>
          <div className="text-lg text-amber-700">Total XP Earned: {xp}</div>
          <div className="text-sm text-gray-600 mt-2">You've unlocked: {rewards}</div>
        </div>
      )}
    </div>
  )
}

// 12. 🎲 CODE RANDOMIZER - Adaptive Challenges
export const CodeRandomizer = ({ patterns, difficulty, onComplete }: any) => {
  const [currentPattern, setCurrentPattern] = useState<any>(null)
  const [userSolution, setUserSolution] = useState('')
  const [streak, setStreak] = useState(0)

  const generateChallenge = () => {
    const availablePatterns = patterns.filter((p: any) => p.difficulty <= difficulty)
    const randomPattern = availablePatterns[Math.floor(Math.random() * availablePatterns.length)]
    setCurrentPattern(randomPattern)
    setUserSolution('')
  }

  useEffect(() => {
    generateChallenge()
  }, [])

  const checkSolution = () => {
    if (userSolution.toLowerCase().includes(currentPattern.solution.toLowerCase())) {
      setStreak(prev => prev + 1)
      onComplete?.(streak * 100 + 200)
      generateChallenge()
    } else {
      setStreak(0)
    }
  }

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-4 rounded-xl border-2 border-cyan-300">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-cyan-800">🎲 Random Code Challenge</h4>
        <div className="flex gap-2 text-sm">
          <span className="bg-orange-500 text-white px-2 py-1 rounded">🔥 {streak}</span>
          <button
            onClick={generateChallenge}
            className="bg-cyan-500 text-white px-2 py-1 rounded text-xs hover:bg-cyan-600"
          >
            🎲 New
          </button>
        </div>
      </div>

      {currentPattern && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <h5 className="font-semibold text-cyan-700 mb-2">{currentPattern.title}</h5>
            <p className="text-gray-700 mb-3">{currentPattern.prompt}</p>
            
            {currentPattern.example && (
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                {currentPattern.example}
              </div>
            )}
          </div>

          <textarea
            value={userSolution}
            onChange={(e) => setUserSolution(e.target.value)}
            className="w-full h-24 p-3 border-2 border-cyan-300 rounded-lg font-mono text-sm"
            placeholder="Write your solution here..."
          />

          <button
            onClick={checkSolution}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg font-semibold"
          >
            🎯 Submit Solution
          </button>

          <div className="text-sm text-gray-600 text-center">
            Difficulty: {difficulty} | Streak Bonus: {streak * 100} XP
          </div>
        </div>
      )}
    </div>
  )
}

// 13. 🎤 CODE NARRATOR - Audio Learning
export const CodeNarrator = ({ codeStory, steps, onComplete }: any) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())

  const nextStep = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]))
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      onComplete?.(300)
    }
  }

  return (
    <div className="bg-gradient-to-br from-teal-50 to-green-100 p-4 rounded-xl border-2 border-teal-300">
      <h4 className="font-bold text-teal-800 mb-4 flex items-center gap-2">
        🎤 Code Story: {codeStory.title}
      </h4>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="bg-white p-4 rounded-lg border mb-4">
            <h5 className="font-semibold text-teal-700 mb-2">
              Chapter {currentStep + 1}: {steps[currentStep]?.title}
            </h5>
            <p className="text-gray-700 leading-relaxed">
              {steps[currentStep]?.narration}
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg"
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play Audio'}
            </button>
            <button
              onClick={nextStep}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
            >
              ➡️ Next
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex gap-2 mt-3 justify-center">
            {steps.map((_: any, index: number) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  completedSteps.has(index) ? 'bg-teal-500' :
                  index === currentStep ? 'bg-teal-300' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">📖 Code in Story:</h5>
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm min-h-[200px]">
            {steps[currentStep]?.code}
          </div>
          
          {completedSteps.size === steps.length && (
            <div className="mt-3 p-3 bg-green-100 border border-green-300 rounded-lg text-center">
              📚 Story Complete! +300 XP
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 14. 🎨 LIVE PREVIEW BUILDER - Real-time Results
export const LivePreviewBuilder = ({ components, target, onSuccess }: any) => {
  const [selectedComponents, setSelectedComponents] = useState<string[]>([])
  const [previewHTML, setPreviewHTML] = useState('')

  useEffect(() => {
    const html = selectedComponents.join('\n')
    setPreviewHTML(html)
  }, [selectedComponents])

  const addComponent = (component: any) => {
    setSelectedComponents(prev => [...prev, component.code])
  }

  const removeComponent = (index: number) => {
    setSelectedComponents(prev => prev.filter((_, i) => i !== index))
  }

  const checkResult = () => {
    const isCorrect = selectedComponents.length === target.length &&
                     selectedComponents.every(comp => target.includes(comp))
    if (isCorrect) {
      onSuccess?.(800)
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl border-2 border-purple-300">
      <h4 className="font-bold text-purple-800 mb-4">🎨 Live Website Builder</h4>

      <div className="grid lg:grid-cols-3 gap-4">
        {/* Component Library */}
        <div>
          <h5 className="font-semibold mb-2">🧱 Components:</h5>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {components.map((comp: any, index: number) => (
              <button
                key={index}
                onClick={() => addComponent(comp)}
                className="w-full p-3 text-left bg-white border border-purple-200 rounded-lg hover:border-purple-400 transition-all"
              >
                <div className="font-semibold text-sm">{comp.name}</div>
                <div className="text-xs text-gray-600">{comp.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Builder Area */}
        <div>
          <h5 className="font-semibold mb-2">🏗️ Your Build:</h5>
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs min-h-[200px]">
            {selectedComponents.map((comp, index) => (
              <div key={index} className="flex justify-between items-start mb-2">
                <span className="flex-1">{comp}</span>
                <button
                  onClick={() => removeComponent(index)}
                  className="text-red-400 hover:text-red-300 ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
            {selectedComponents.length === 0 && (
              <div className="text-gray-500">// Click components to add them</div>
            )}
          </div>
          
          <button
            onClick={checkResult}
            className="w-full mt-2 bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg"
          >
            🎯 Check Build
          </button>
        </div>

        {/* Live Preview */}
        <div>
          <h5 className="font-semibold mb-2">👁️ Live Preview:</h5>
          <div className="border-2 border-gray-300 rounded-lg p-3 bg-white min-h-[200px]">
            <div dangerouslySetInnerHTML={{ __html: previewHTML }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// 15. 🏃‍♂️ SPEED BUILDER - Time Pressure Coding
export const SpeedBuilder = ({ challenges, timeLimit, onComplete }: any) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit)
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [completedCount, setCompletedCount] = useState(0)
  const [userCode, setUserCode] = useState('')

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      onComplete?.(completedCount * 200)
    }
  }, [isActive, timeLeft])

  const startChallenge = () => {
    setIsActive(true)
    setTimeLeft(timeLimit)
    setCurrentChallenge(0)
    setCompletedCount(0)
  }

  const submitSolution = () => {
    const current = challenges[currentChallenge]
    if (userCode.toLowerCase().includes(current.solution.toLowerCase())) {
      setCompletedCount(prev => prev + 1)
      if (currentChallenge < challenges.length - 1) {
        setCurrentChallenge(prev => prev + 1)
        setUserCode('')
      }
    }
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-100 p-4 rounded-xl border-2 border-red-300">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-red-800">🏃‍♂️ Speed Builder Challenge</h4>
        {isActive && (
          <div className="flex gap-2 text-sm">
            <span className="bg-red-500 text-white px-2 py-1 rounded">⏰ {timeLeft}s</span>
            <span className="bg-green-500 text-white px-2 py-1 rounded">✅ {completedCount}</span>
          </div>
        )}
      </div>

      {!isActive ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🏃‍♂️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Speed Coding Challenge</h3>
          <p className="text-gray-600 mb-4">Complete as many challenges as possible in {timeLimit} seconds!</p>
          <button
            onClick={startChallenge}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg"
          >
            🚀 Start Speed Challenge
          </button>
        </div>
      ) : timeLeft > 0 ? (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <h5 className="font-semibold text-red-700 mb-2">
              Challenge {currentChallenge + 1}: {challenges[currentChallenge]?.title}
            </h5>
            <p className="text-gray-700 mb-3">{challenges[currentChallenge]?.prompt}</p>
          </div>

          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-24 p-3 border-2 border-red-300 rounded-lg font-mono text-sm"
            placeholder="Write your solution quickly..."
          />

          <button
            onClick={submitSolution}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold"
          >
            ⚡ Submit & Next
          </button>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🏁</div>
          <h3 className="text-2xl font-bold text-red-800 mb-2">Time's Up!</h3>
          <div className="text-lg text-red-700">Challenges Completed: {completedCount}</div>
          <div className="text-sm text-gray-600 mt-2">Score: {completedCount * 200} XP</div>
        </div>
      )}
    </div>
  )
}
