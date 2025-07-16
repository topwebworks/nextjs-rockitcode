'use client'

import { useState, useEffect } from 'react'

// ========================================
// 🎯 MICRO-LEARNING BLOCKS 16-25
// Advanced Assessment & Social Components
// ========================================

// 16. 🧪 CODE LABORATORY - Experiment & Discover
export const CodeLaboratory = ({ experiments, hypothesis, onDiscovery }: any) => {
  const [activeExperiment, setActiveExperiment] = useState(0)
  const [results, setResults] = useState<{[key: number]: any}>({})
  const [discoveries, setDiscoveries] = useState<string[]>([])

  const runExperiment = (experimentId: number, userCode: string) => {
    const experiment = experiments[experimentId]
    const result = {
      code: userCode,
      output: `Result: ${experiment.expectedResult}`,
      success: userCode.includes(experiment.key),
      timestamp: new Date().toLocaleTimeString()
    }
    
    setResults(prev => ({ ...prev, [experimentId]: result }))
    
    if (result.success && !discoveries.includes(experiment.discovery)) {
      setDiscoveries(prev => [...prev, experiment.discovery])
      onDiscovery?.(experiment.discovery, 400)
    }
  }

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-100 p-4 rounded-xl border-2 border-emerald-300">
      <h4 className="font-bold text-emerald-800 mb-4 flex items-center gap-2">
        🧪 Code Laboratory
      </h4>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold mb-3">🔬 Experiments:</h5>
          <div className="space-y-3">
            {experiments.map((exp: any, index: number) => (
              <div
                key={index}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  activeExperiment === index
                    ? 'bg-emerald-100 border-emerald-400'
                    : 'bg-white border-emerald-200 hover:border-emerald-300'
                }`}
                onClick={() => setActiveExperiment(index)}
              >
                <div className="flex justify-between items-center">
                  <h6 className="font-semibold">{exp.title}</h6>
                  {results[index]?.success && <span className="text-green-600">✅</span>}
                </div>
                <p className="text-sm text-gray-600">{exp.hypothesis}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <h6 className="font-semibold text-blue-800 mb-2">🔍 Discoveries Made:</h6>
            {discoveries.length > 0 ? (
              <ul className="text-sm space-y-1">
                {discoveries.map((discovery, index) => (
                  <li key={index} className="text-blue-700">✨ {discovery}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-blue-600">Run experiments to make discoveries!</p>
            )}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-3">
            🧪 Experiment: {experiments[activeExperiment]?.title}
          </h5>
          <div className="bg-white p-3 rounded-lg border mb-3">
            <p className="text-gray-700 mb-2">{experiments[activeExperiment]?.instructions}</p>
            <div className="text-sm text-blue-600">
              💡 Hypothesis: {experiments[activeExperiment]?.hypothesis}
            </div>
          </div>

          <div className="space-y-3">
            <textarea
              className="w-full h-32 p-3 border-2 border-emerald-300 rounded-lg font-mono text-sm"
              placeholder="Write your experimental code here..."
              onChange={(e) => {
                if (e.target.value.length > 10) { // Auto-run after typing
                  runExperiment(activeExperiment, e.target.value)
                }
              }}
            />

            {results[activeExperiment] && (
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm">
                <div className="text-yellow-400 mb-1">// Experiment Result:</div>
                {results[activeExperiment].output}
                <div className="text-gray-400 text-xs mt-1">
                  Run at: {results[activeExperiment].timestamp}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// 17. 🎭 ROLE PLAY CODER - Learn Through Character
export const RolePlayCoder = ({ character, scenario, tasks, onRoleComplete }: any) => {
  const [currentTask, setCurrentTask] = useState(0)
  const [characterXP, setCharacterXP] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set())

  const completeTask = (taskXP: number) => {
    setCharacterXP(prev => prev + taskXP)
    setCompletedTasks(prev => new Set([...prev, currentTask]))
    
    if (currentTask < tasks.length - 1) {
      setCurrentTask(prev => prev + 1)
    } else {
      onRoleComplete?.(characterXP + taskXP)
    }
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 p-4 rounded-xl border-2 border-indigo-300">
      <div className="flex items-center gap-4 mb-4">
        <div className="text-6xl">{character.avatar}</div>
        <div>
          <h4 className="font-bold text-indigo-800">{character.name}</h4>
          <p className="text-indigo-600">{character.role}</p>
          <div className="text-sm text-gray-600">XP: {characterXP} | Level: {Math.floor(characterXP / 100) + 1}</div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg border mb-4">
        <h5 className="font-semibold text-indigo-700 mb-2">📋 Current Mission:</h5>
        <p className="text-gray-700 mb-3">{scenario}</p>
        
        {currentTask < tasks.length && (
          <div className="bg-indigo-50 p-3 rounded-lg">
            <h6 className="font-semibold text-indigo-800 mb-2">
              Task {currentTask + 1}: {tasks[currentTask].title}
            </h6>
            <p className="text-indigo-700 mb-3">{tasks[currentTask].description}</p>
            
            <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
              {tasks[currentTask].codeChallenge}
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                🎯 Reward: {tasks[currentTask].xp} XP
              </span>
              <button
                onClick={() => completeTask(tasks[currentTask].xp)}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                ✅ Complete Task
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Character Skills */}
      <div className="grid md:grid-cols-3 gap-3">
        {character.skills.map((skill: any) => (
          <div key={skill.name} className="bg-white p-3 rounded-lg border text-center">
            <div className="text-2xl mb-1">{skill.icon}</div>
            <div className="font-semibold text-sm">{skill.name}</div>
            <div className="text-xs text-gray-600">Level {skill.level}</div>
          </div>
        ))}
      </div>

      {completedTasks.size === tasks.length && (
        <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg text-center">
          🎉 Mission Complete! {character.name} gained {characterXP} XP!
        </div>
      )}
    </div>
  )
}

// 18. 🎯 PRECISION CODER - Pixel Perfect Practice  
export const PrecisionCoder = ({ target, tolerance, onPerfection }: any) => {
  const [userCode, setUserCode] = useState('')
  const [accuracy, setAccuracy] = useState(0)
  const [isPerfect, setIsPerfect] = useState(false)

  useEffect(() => {
    if (userCode.length === 0) return
    
    const similarity = calculateSimilarity(userCode, target.code)
    setAccuracy(similarity)
    
    if (similarity >= 100 - tolerance) {
      setIsPerfect(true)
      onPerfection?.(1000 - (100 - similarity) * 10)
    }
  }, [userCode, target.code, tolerance])

  const calculateSimilarity = (code1: string, code2: string) => {
    const minLength = Math.min(code1.length, code2.length)
    const maxLength = Math.max(code1.length, code2.length)
    
    let matches = 0
    for (let i = 0; i < minLength; i++) {
      if (code1[i] === code2[i]) matches++
    }
    
    return Math.round((matches / maxLength) * 100)
  }

  return (
    <div className="bg-gradient-to-br from-rose-50 to-pink-100 p-4 rounded-xl border-2 border-rose-300">
      <h4 className="font-bold text-rose-800 mb-4 flex items-center gap-2">
        🎯 Precision Coding Challenge
      </h4>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold mb-2">🎯 Target Code (Copy Exactly):</h5>
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm mb-3">
            {target.code}
          </div>
          
          <div className="bg-white p-3 rounded-lg border">
            <h6 className="font-semibold text-rose-700 mb-2">📊 Precision Meter:</h6>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full transition-all duration-300 ${
                  accuracy >= 95 ? 'bg-green-500' :
                  accuracy >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${accuracy}%` }}
              />
            </div>
            <div className="text-center font-bold text-lg">
              {accuracy}% Accurate
            </div>
            <div className="text-center text-sm text-gray-600">
              Target: {100 - tolerance}%+ for perfection
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">⌨️ Your Code:</h5>
          <textarea
            value={userCode}
            onChange={(e) => setUserCode(e.target.value)}
            className="w-full h-32 p-3 border-2 border-rose-300 rounded-lg font-mono text-sm mb-3"
            placeholder="Type the target code exactly..."
          />

          {isPerfect && (
            <div className="p-4 bg-green-100 border border-green-300 rounded-lg text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h6 className="font-bold text-green-800 mb-1">Pixel Perfect!</h6>
              <div className="text-sm text-green-700">
                Achieved {accuracy}% accuracy!
              </div>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <div>Characters: {userCode.length}/{target.code.length}</div>
            <div>Tolerance: ±{tolerance}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 19. 🔄 ITERATIVE BUILDER - Build & Improve
export const IterativeBuilder = ({ baseCode, improvements, onIteration }: any) => {
  const [currentVersion, setCurrentVersion] = useState(0)
  const [codeVersions, setCodeVersions] = useState([baseCode])
  const [improvementsMade, setImprovementsMade] = useState<Set<number>>(new Set())

  const applyImprovement = (improvementIndex: number) => {
    const improvement = improvements[improvementIndex]
    const currentCode = codeVersions[currentVersion]
    const improvedCode = currentCode + '\n' + improvement.code
    
    setCodeVersions(prev => [...prev, improvedCode])
    setCurrentVersion(prev => prev + 1)
    setImprovementsMade(prev => new Set([...prev, improvementIndex]))
    
    onIteration?.(improvement.xp)
  }

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-100 p-4 rounded-xl border-2 border-violet-300">
      <h4 className="font-bold text-violet-800 mb-4">🔄 Iterative Code Builder</h4>

      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <h5 className="font-semibold mb-2">🛠️ Available Improvements:</h5>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {improvements.map((imp: any, index: number) => (
              <button
                key={index}
                onClick={() => applyImprovement(index)}
                disabled={improvementsMade.has(index)}
                className={`w-full p-3 text-left rounded-lg transition-all ${
                  improvementsMade.has(index)
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-white border border-violet-200 hover:border-violet-400'
                }`}
              >
                <div className="font-semibold text-sm">{imp.title}</div>
                <div className="text-xs text-gray-600 mb-1">{imp.description}</div>
                <div className="text-xs text-violet-600">+{imp.xp} XP</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h5 className="font-semibold">📜 Version History:</h5>
            <span className="text-sm text-gray-600">v{currentVersion + 1}</span>
          </div>
          
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {codeVersions.map((code, index) => (
              <button
                key={index}
                onClick={() => setCurrentVersion(index)}
                className={`w-full p-2 text-left rounded text-xs transition-all ${
                  index === currentVersion
                    ? 'bg-violet-200 border border-violet-400'
                    : 'bg-white border border-violet-200 hover:bg-violet-50'
                }`}
              >
                Version {index + 1} ({code.split('\n').length} lines)
              </button>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">💻 Current Code:</h5>
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-xs min-h-[200px] overflow-auto">
            {codeVersions[currentVersion]}
          </div>
          
          <div className="mt-2 text-sm text-gray-600 text-center">
            Improvements Applied: {improvementsMade.size}/{improvements.length}
          </div>
        </div>
      </div>
    </div>
  )
}

// 20. 🌟 ACHIEVEMENT HUNTER - Unlock & Collect
export const AchievementHunter = ({ achievements, userActions, onAchievement }: any) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set())
  const [actionCounts, setActionCounts] = useState<{[key: string]: number}>({})

  useEffect(() => {
    // Check if any achievements should be unlocked
    achievements.forEach((achievement: any) => {
      if (!unlockedAchievements.has(achievement.id)) {
        const isUnlocked = achievement.conditions.every((condition: any) => 
          (actionCounts[condition.action] || 0) >= condition.count
        )
        
        if (isUnlocked) {
          setUnlockedAchievements(prev => new Set([...prev, achievement.id]))
          onAchievement?.(achievement)
        }
      }
    })
  }, [actionCounts])

  const trackAction = (action: string) => {
    setActionCounts(prev => ({
      ...prev,
      [action]: (prev[action] || 0) + 1
    }))
  }

  return (
    <div className="bg-gradient-to-br from-gold-50 to-yellow-100 p-4 rounded-xl border-2 border-yellow-300">
      <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-2">
        🌟 Achievement Hunter
      </h4>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        {achievements.map((achievement: any) => {
          const isUnlocked = unlockedAchievements.has(achievement.id)
          const progress = achievement.conditions.map((condition: any) => 
            Math.min((actionCounts[condition.action] || 0) / condition.count, 1)
          )
          const overallProgress = progress.reduce((sum: number, p: number) => sum + p, 0) / progress.length

          return (
            <div
              key={achievement.id}
              className={`p-4 rounded-lg border text-center transition-all ${
                isUnlocked
                  ? 'bg-yellow-200 border-yellow-400 shadow-lg'
                  : 'bg-white border-yellow-200'
              }`}
            >
              <div className="text-4xl mb-2">
                {isUnlocked ? achievement.icon : '🔒'}
              </div>
              <h6 className="font-semibold text-sm mb-1">{achievement.title}</h6>
              <p className="text-xs text-gray-600 mb-2">{achievement.description}</p>
              
              {!isUnlocked && (
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${overallProgress * 100}%` }}
                  />
                </div>
              )}
              
              <div className="text-xs">
                {isUnlocked ? (
                  <span className="text-yellow-700 font-semibold">🏆 Unlocked!</span>
                ) : (
                  <span className="text-gray-600">{Math.round(overallProgress * 100)}% Complete</span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Action Buttons for Testing */}
      <div className="mt-4 flex flex-wrap gap-2">
        {userActions.map((action: string) => (
          <button
            key={action}
            onClick={() => trackAction(action)}
            className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded"
          >
            {action} ({actionCounts[action] || 0})
          </button>
        ))}
      </div>
    </div>
  )
}
