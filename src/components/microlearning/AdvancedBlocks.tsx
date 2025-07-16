'use client'

import { useState, useEffect } from 'react'

// ========================================
// 🎯 MICRO-LEARNING BLOCKS 26-30
// Advanced & Collaborative Learning Tools
// ========================================

// 26. 🌐 TEAM CODE NEXUS - Collaborative Coding
export const TeamCodeNexus = ({ teammates, project, onTeamSuccess }: any) => {
  const [myContribution, setMyContribution] = useState('')
  const [teamProgress, setTeamProgress] = useState<{[key: string]: any}>({})
  const [isConnected, setIsConnected] = useState(false)

  const contributeCode = () => {
    const contribution = {
      author: 'You',
      code: myContribution,
      timestamp: Date.now(),
      lines: myContribution.split('\n').length
    }
    
    setTeamProgress(prev => ({
      ...prev,
      myContribution: contribution
    }))
    
    // Simulate team completion
    if (myContribution.length > 50) {
      onTeamSuccess?.(contribution.lines * 25)
    }
  }

  const simulateTeammate = (teammate: any) => {
    const mockCode = teammate.expertise.includes('frontend') 
      ? '<div className="component">\n  <h1>Hello World</h1>\n</div>'
      : 'function calculate() {\n  return data.map(x => x * 2)\n}'
    
    setTeamProgress(prev => ({
      ...prev,
      [teammate.id]: {
        author: teammate.name,
        code: mockCode,
        timestamp: Date.now(),
        lines: mockCode.split('\n').length
      }
    }))
  }

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-100 p-4 rounded-xl border-2 border-indigo-300">
      <h4 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
        🌐 Team Code Nexus
        <span className={`text-xs px-2 py-1 rounded ${isConnected ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
          {isConnected ? '🟢 Connected' : '🔴 Offline'}
        </span>
      </h4>

      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <h5 className="font-semibold mb-2">👥 Team Members:</h5>
          <div className="space-y-2">
            {teammates.map((teammate: any) => (
              <div
                key={teammate.id}
                className="p-3 bg-white border border-indigo-200 rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h6 className="font-semibold text-sm">{teammate.name}</h6>
                    <p className="text-xs text-gray-600">{teammate.role}</p>
                    <div className="text-xs text-indigo-600">
                      {teammate.expertise.join(', ')}
                    </div>
                  </div>
                  <button
                    onClick={() => simulateTeammate(teammate)}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    💬
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsConnected(!isConnected)}
            className={`w-full mt-3 py-2 rounded-lg ${
              isConnected ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {isConnected ? '🔌 Disconnect' : '🌐 Connect to Team'}
          </button>
        </div>

        <div>
          <h5 className="font-semibold mb-2">📝 My Contribution:</h5>
          <textarea
            value={myContribution}
            onChange={(e) => setMyContribution(e.target.value)}
            className="w-full h-32 p-3 border-2 border-indigo-300 rounded-lg font-mono text-sm mb-3"
            placeholder="Write your part of the project..."
          />
          
          <button
            onClick={contributeCode}
            disabled={!isConnected}
            className="w-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white py-2 rounded-lg"
          >
            🚀 Submit Contribution
          </button>

          <div className="mt-3 text-xs text-gray-600">
            Project: {project.name}
            <br />
            Goal: {project.description}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">📊 Team Progress:</h5>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {Object.values(teamProgress).map((contribution: any, index) => (
              <div
                key={index}
                className="p-2 bg-white border border-indigo-200 rounded"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="font-semibold text-sm">{contribution.author}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(contribution.timestamp).toLocaleTimeString()}
                  </span>
                </div>
                <div className="bg-gray-900 text-green-400 p-2 rounded text-xs font-mono">
                  {contribution.code.substring(0, 100)}
                  {contribution.code.length > 100 && '...'}
                </div>
                <div className="text-xs text-gray-600 mt-1">
                  {contribution.lines} lines
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 27. 🎯 PRECISION SNIPER - Exact Code Targeting
export const PrecisionSniper = ({ targets, onBullseye }: any) => {
  const [currentTarget, setCurrentTarget] = useState(0)
  const [shots, setShots] = useState<any[]>([])
  const [scope, setScope] = useState('')

  const takeShot = () => {
    const target = targets[currentTarget]
    const accuracy = calculateAccuracy(scope, target.solution)
    
    const shot = {
      code: scope,
      accuracy,
      target: target.id,
      timestamp: Date.now(),
      score: Math.round(accuracy * 100)
    }
    
    setShots(prev => [...prev, shot])
    
    if (accuracy >= 0.9) {
      onBullseye?.(target, shot.score)
      if (currentTarget < targets.length - 1) {
        setCurrentTarget(prev => prev + 1)
        setScope('')
      }
    }
  }

  const calculateAccuracy = (userCode: string, solution: string) => {
    const userWords = userCode.toLowerCase().split(/\W+/).filter(w => w.length > 2)
    const solutionWords = solution.toLowerCase().split(/\W+/).filter(w => w.length > 2)
    
    const matches = userWords.filter(word => solutionWords.includes(word))
    return matches.length / Math.max(solutionWords.length, 1)
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-orange-100 p-4 rounded-xl border-2 border-red-300">
      <h4 className="font-bold text-red-800 mb-4">🎯 Precision Code Sniper</h4>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold mb-2">🎯 Target #{currentTarget + 1}:</h5>
          <div className="bg-white p-4 border-2 border-red-300 rounded-lg mb-4">
            <h6 className="font-semibold text-red-700 mb-2">
              {targets[currentTarget]?.title}
            </h6>
            <p className="text-gray-700 mb-3">
              {targets[currentTarget]?.challenge}
            </p>
            
            <div className="bg-yellow-50 p-2 rounded border text-sm">
              <strong>Target Specs:</strong>
              <ul className="text-xs mt-1 list-disc list-inside">
                {targets[currentTarget]?.specs.map((spec: string, index: number) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          </div>

          <h5 className="font-semibold mb-2">🔍 Sniper Scope:</h5>
          <textarea
            value={scope}
            onChange={(e) => setScope(e.target.value)}
            className="w-full h-32 p-3 border-2 border-red-300 rounded-lg font-mono text-sm mb-3"
            placeholder="Aim carefully... precision is key!"
          />
          
          <button
            onClick={takeShot}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
          >
            🎯 FIRE!
          </button>
        </div>

        <div>
          <h5 className="font-semibold mb-2">📊 Shot History:</h5>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {shots.map((shot, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  shot.accuracy >= 0.9 ? 'bg-green-100 border-green-300' :
                  shot.accuracy >= 0.7 ? 'bg-yellow-100 border-yellow-300' :
                  'bg-red-100 border-red-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold text-sm">
                      Shot #{index + 1}
                      {shot.accuracy >= 0.9 && ' 🎯'}
                    </div>
                    <div className="text-xs text-gray-600">
                      Accuracy: {Math.round(shot.accuracy * 100)}%
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-lg">{shot.score}</div>
                    <div className="text-xs text-gray-600">pts</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-white border border-red-200 rounded-lg">
            <h6 className="font-semibold text-sm mb-2">🏆 Sniper Stats:</h6>
            <div className="text-xs space-y-1">
              <div>Total Shots: {shots.length}</div>
              <div>Bullseyes: {shots.filter(s => s.accuracy >= 0.9).length}</div>
              <div>Average Accuracy: {shots.length > 0 ? Math.round(shots.reduce((acc, s) => acc + s.accuracy, 0) / shots.length * 100) : 0}%</div>
              <div>Total Score: {shots.reduce((acc, s) => acc + s.score, 0)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 28. 🔮 FUTURE CODER - Time Travel Learning
export const FutureCoder = ({ timePeriods, technologies, onTimeTravel }: any) => {
  const [currentEra, setCurrentEra] = useState(0)
  const [futureCode, setFutureCode] = useState('')
  const [timelineScore, setTimelineScore] = useState(0)

  const travelToEra = (eraIndex: number) => {
    setCurrentEra(eraIndex)
    setFutureCode('')
    onTimeTravel?.(timePeriods[eraIndex], 100)
  }

  const adaptCode = () => {
    const era = timePeriods[currentEra]
    const adaptationScore = calculateAdaptation(futureCode, era.requirements)
    
    setTimelineScore(prev => prev + adaptationScore)
    
    if (adaptationScore > 150) {
      // Unlock next era
      if (currentEra < timePeriods.length - 1) {
        setCurrentEra(prev => prev + 1)
      }
    }
  }

  const calculateAdaptation = (code: string, requirements: string[]) => {
    const matches = requirements.filter(req => 
      code.toLowerCase().includes(req.toLowerCase())
    )
    return matches.length * 50
  }

  return (
    <div className="bg-gradient-to-br from-violet-50 to-cyan-100 p-4 rounded-xl border-2 border-violet-300">
      <h4 className="font-bold text-violet-800 mb-4 flex items-center gap-2">
        🔮 Future Coder Time Machine
        <span className="text-sm bg-violet-200 px-2 py-1 rounded">Timeline Score: {timelineScore}</span>
      </h4>

      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <h5 className="font-semibold mb-2">⏰ Time Periods:</h5>
          <div className="space-y-2">
            {timePeriods.map((period: any, index: number) => (
              <button
                key={index}
                onClick={() => travelToEra(index)}
                disabled={index > currentEra + 1}
                className={`w-full p-3 text-left rounded-lg border transition-all ${
                  index === currentEra ? 'bg-violet-100 border-violet-400' :
                  index <= currentEra ? 'bg-green-100 border-green-300' :
                  'bg-gray-100 border-gray-200 cursor-not-allowed'
                }`}
              >
                <div className="font-semibold text-sm">{period.name}</div>
                <div className="text-xs text-gray-600">{period.year}</div>
                <div className="text-xs text-violet-600 mt-1">
                  {period.description}
                </div>
                {index === currentEra && <div className="text-xs text-violet-700 mt-1">📍 Current Era</div>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">
            🌟 Era: {timePeriods[currentEra]?.name}
          </h5>
          
          <div className="bg-white p-3 border border-violet-200 rounded-lg mb-3">
            <h6 className="font-semibold text-sm mb-2">Available Technologies:</h6>
            <div className="flex flex-wrap gap-1">
              {timePeriods[currentEra]?.technologies.map((tech: string, index: number) => (
                <span
                  key={index}
                  className="text-xs bg-violet-100 text-violet-700 px-2 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white p-3 border border-violet-200 rounded-lg mb-3">
            <h6 className="font-semibold text-sm mb-2">Era Requirements:</h6>
            <ul className="text-xs space-y-1">
              {timePeriods[currentEra]?.requirements.map((req: string, index: number) => (
                <li key={index} className="text-gray-600">• {req}</li>
              ))}
            </ul>
          </div>

          <h5 className="font-semibold mb-2">⚡ Future Code:</h5>
          <textarea
            value={futureCode}
            onChange={(e) => setFutureCode(e.target.value)}
            className="w-full h-32 p-3 border-2 border-violet-300 rounded-lg font-mono text-sm mb-3"
            placeholder={`Write code for the ${timePeriods[currentEra]?.name} era...`}
          />
          
          <button
            onClick={adaptCode}
            className="w-full bg-violet-500 hover:bg-violet-600 text-white py-2 rounded-lg"
          >
            🔮 Adapt to Era
          </button>
        </div>

        <div>
          <h5 className="font-semibold mb-2">📊 Time Travel Progress:</h5>
          
          <div className="bg-black rounded-lg p-4 mb-4 min-h-[200px] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900 via-blue-900 to-cyan-900 opacity-50"></div>
            <div className="relative text-white">
              <div className="text-center mb-4">
                <div className="text-2xl">🚀</div>
                <div className="text-xs">Time Traveler</div>
              </div>
              
              <div className="space-y-2">
                {timePeriods.map((period: any, index: number) => (
                  <div
                    key={index}
                    className={`text-xs p-2 rounded ${
                      index <= currentEra ? 'bg-white bg-opacity-20' : 'bg-gray-800 bg-opacity-20'
                    }`}
                  >
                    <div className="flex justify-between">
                      <span>{period.year}</span>
                      {index <= currentEra && <span>✅</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-3 border border-violet-200 rounded-lg">
            <h6 className="font-semibold text-sm mb-2">🏆 Timeline Achievements:</h6>
            <div className="text-xs space-y-1">
              <div>Eras Visited: {currentEra + 1}/{timePeriods.length}</div>
              <div>Technologies Mastered: {Math.floor(timelineScore / 100)}</div>
              <div>Adaptation Score: {timelineScore}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 29. 🎮 RETRO ARCADE - Classic Game Learning
export const RetroArcade = ({ games, onHighScore }: any) => {
  const [selectedGame, setSelectedGame] = useState(0)
  const [gameState, setGameState] = useState<any>({ score: 0, level: 1, lives: 3 })
  const [isPlaying, setIsPlaying] = useState(false)
  const [playerCode, setPlayerCode] = useState('')

  const startGame = () => {
    setIsPlaying(true)
    setGameState({ score: 0, level: 1, lives: 3 })
    setPlayerCode('')
  }

  const executeCode = () => {
    const game = games[selectedGame]
    const codeQuality = analyzeCode(playerCode, game.codePatterns)
    
    setGameState(prev => ({
      ...prev,
      score: prev.score + codeQuality.points,
      level: codeQuality.points > 100 ? prev.level + 1 : prev.level,
      lives: codeQuality.isValid ? prev.lives : prev.lives - 1
    }))

    if (gameState.lives <= 1 && !codeQuality.isValid) {
      setIsPlaying(false)
      onHighScore?.(gameState.score + codeQuality.points)
    }
  }

  const analyzeCode = (code: string, patterns: string[]) => {
    const matches = patterns.filter(pattern => 
      code.toLowerCase().includes(pattern.toLowerCase())
    )
    
    return {
      points: matches.length * 50,
      isValid: matches.length > 0,
      matches
    }
  }

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-red-100 p-4 rounded-xl border-2 border-yellow-300">
      <h4 className="font-bold text-yellow-800 mb-4">🎮 Retro Code Arcade</h4>

      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <h5 className="font-semibold mb-2">🕹️ Game Selection:</h5>
          <div className="space-y-2">
            {games.map((game: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedGame(index)}
                className={`w-full p-3 text-left rounded-lg border transition-all ${
                  selectedGame === index
                    ? 'bg-yellow-100 border-yellow-400'
                    : 'bg-white border-yellow-200 hover:border-yellow-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{game.icon}</span>
                  <div>
                    <h6 className="font-semibold text-sm">{game.name}</h6>
                    <p className="text-xs text-gray-600">{game.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">
            🎯 Playing: {games[selectedGame]?.name}
          </h5>
          
          {!isPlaying ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">{games[selectedGame]?.icon}</div>
              <h6 className="text-lg font-bold mb-2">{games[selectedGame]?.name}</h6>
              <p className="text-sm text-gray-600 mb-4">{games[selectedGame]?.description}</p>
              <button
                onClick={startGame}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg"
              >
                🕹️ Insert Code Coin
              </button>
            </div>
          ) : (
            <div>
              <div className="bg-black text-green-400 p-3 rounded-lg mb-3 font-mono text-center">
                <div className="flex justify-between items-center mb-2">
                  <span>SCORE: {gameState.score}</span>
                  <span>LEVEL: {gameState.level}</span>
                  <span>LIVES: {'💚'.repeat(gameState.lives)}</span>
                </div>
                <div className="text-lg">{games[selectedGame]?.challenge}</div>
              </div>

              <textarea
                value={playerCode}
                onChange={(e) => setPlayerCode(e.target.value)}
                className="w-full h-24 p-3 border-2 border-yellow-300 rounded-lg font-mono text-sm mb-3"
                placeholder="Enter your code to play..."
              />
              
              <button
                onClick={executeCode}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                🚀 EXECUTE CODE
              </button>
            </div>
          )}
        </div>

        <div>
          <h5 className="font-semibold mb-2">🏆 High Scores:</h5>
          <div className="bg-black text-green-400 p-3 rounded-lg font-mono text-sm min-h-[200px]">
            <div className="text-center mb-4">
              ═══ HALL OF FAME ═══
            </div>
            
            <div className="space-y-2">
              {games[selectedGame]?.highScores?.map((score: any, index: number) => (
                <div key={index} className="flex justify-between">
                  <span>{index + 1}. {score.player}</span>
                  <span>{score.points}</span>
                </div>
              ))}
            </div>
            
            {isPlaying && (
              <div className="border-t border-green-600 mt-4 pt-2">
                <div className="text-yellow-400">CURRENT GAME:</div>
                <div className="flex justify-between">
                  <span>YOU</span>
                  <span>{gameState.score}</span>
                </div>
              </div>
            )}
          </div>

          <div className="mt-3 bg-white p-3 border border-yellow-200 rounded-lg">
            <h6 className="font-semibold text-sm mb-2">🎮 Game Patterns:</h6>
            <div className="text-xs space-y-1">
              {games[selectedGame]?.codePatterns?.map((pattern: string, index: number) => (
                <div key={index} className="bg-gray-100 p-1 rounded font-mono">
                  {pattern}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// 30. 🌟 MASTER BUILDER - Ultimate Creation Tool
export const MasterBuilder = ({ blueprints, materials, onMasterpiece }: any) => {
  const [selectedBlueprint, setSelectedBlueprint] = useState(0)
  const [inventory, setInventory] = useState<{[key: string]: number}>({})
  const [buildProgress, setBuildProgress] = useState<{[key: string]: boolean}>({})
  const [masterScore, setMasterScore] = useState(0)

  const addMaterial = (material: any, code: string) => {
    if (validateMaterial(code, material.pattern)) {
      setInventory(prev => ({
        ...prev,
        [material.id]: (prev[material.id] || 0) + 1
      }))
    }
  }

  const validateMaterial = (code: string, pattern: string) => {
    return code.toLowerCase().includes(pattern.toLowerCase())
  }

  const buildComponent = (component: any) => {
    const hasRequiredMaterials = component.requiredMaterials.every((req: any) => 
      (inventory[req.materialId] || 0) >= req.quantity
    )

    if (hasRequiredMaterials) {
      // Consume materials
      component.requiredMaterials.forEach((req: any) => {
        setInventory(prev => ({
          ...prev,
          [req.materialId]: prev[req.materialId] - req.quantity
        }))
      })

      setBuildProgress(prev => ({
        ...prev,
        [component.id]: true
      }))

      setMasterScore(prev => prev + component.points)

      // Check if blueprint is complete
      const blueprint = blueprints[selectedBlueprint]
      const isComplete = blueprint.components.every((comp: any) => 
        buildProgress[comp.id] || comp.id === component.id
      )

      if (isComplete) {
        onMasterpiece?.(blueprint, masterScore + component.points)
      }
    }
  }

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-100 p-4 rounded-xl border-2 border-amber-300">
      <h4 className="font-bold text-amber-800 mb-4 flex items-center gap-2">
        🌟 Master Builder Workshop
        <span className="text-sm bg-amber-200 px-2 py-1 rounded">Master Score: {masterScore}</span>
      </h4>

      <div className="grid lg:grid-cols-4 gap-4">
        <div>
          <h5 className="font-semibold mb-2">📋 Blueprints:</h5>
          <div className="space-y-2">
            {blueprints.map((blueprint: any, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedBlueprint(index)}
                className={`w-full p-3 text-left rounded-lg border transition-all ${
                  selectedBlueprint === index
                    ? 'bg-amber-100 border-amber-400'
                    : 'bg-white border-amber-200 hover:border-amber-300'
                }`}
              >
                <div className="font-semibold text-sm">{blueprint.name}</div>
                <div className="text-xs text-gray-600">{blueprint.description}</div>
                <div className="text-xs text-amber-600 mt-1">
                  Difficulty: {blueprint.difficulty}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">🧱 Material Forge:</h5>
          <div className="space-y-3">
            {materials.map((material: any) => (
              <div key={material.id} className="bg-white p-3 border border-amber-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h6 className="font-semibold text-sm">{material.name}</h6>
                    <p className="text-xs text-gray-600">{material.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg">{material.icon}</div>
                    <div className="text-xs font-bold">x{inventory[material.id] || 0}</div>
                  </div>
                </div>
                
                <textarea
                  className="w-full h-16 p-2 text-xs border border-amber-300 rounded font-mono mb-2"
                  placeholder={`Forge ${material.name}...`}
                  onChange={(e) => {
                    if (e.target.value.length > 10) {
                      addMaterial(material, e.target.value)
                      e.target.value = ''
                    }
                  }}
                />
                
                <div className="text-xs text-amber-600">
                  Pattern: {material.pattern}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">
            🏗️ Building: {blueprints[selectedBlueprint]?.name}
          </h5>
          <div className="space-y-2">
            {blueprints[selectedBlueprint]?.components.map((component: any) => {
              const isBuilt = buildProgress[component.id]
              const canBuild = component.requiredMaterials.every((req: any) => 
                (inventory[req.materialId] || 0) >= req.quantity
              )

              return (
                <div
                  key={component.id}
                  className={`p-3 rounded-lg border ${
                    isBuilt ? 'bg-green-100 border-green-300' :
                    canBuild ? 'bg-white border-amber-200' :
                    'bg-gray-100 border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h6 className="font-semibold text-sm">{component.name}</h6>
                      <div className="text-xs text-gray-600">
                        Requires:
                        {component.requiredMaterials.map((req: any, index: number) => (
                          <span key={index} className="ml-1">
                            {req.quantity}x {materials.find((m: any) => m.id === req.materialId)?.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {!isBuilt && (
                      <button
                        onClick={() => buildComponent(component)}
                        disabled={!canBuild}
                        className={`px-3 py-1 rounded text-xs ${
                          canBuild
                            ? 'bg-amber-500 hover:bg-amber-600 text-white'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Build
                      </button>
                    )}
                    
                    {isBuilt && <span className="text-green-600">✅</span>}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">🏆 Masterpiece Gallery:</h5>
          <div className="bg-gradient-to-b from-yellow-200 to-orange-300 rounded-lg p-4 min-h-[300px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              {Object.keys(buildProgress).length > 0 ? (
                <div className="text-center">
                  <div className="text-4xl mb-2">🏗️</div>
                  <div className="text-sm font-semibold">
                    Building in Progress...
                  </div>
                  <div className="text-xs text-gray-600">
                    {Object.keys(buildProgress).length} components built
                  </div>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Start forging materials to begin building! 🔨
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 bg-white p-3 border border-amber-200 rounded-lg">
            <h6 className="font-semibold text-sm mb-2">📊 Builder Stats:</h6>
            <div className="text-xs space-y-1">
              <div>Total Materials: {Object.values(inventory).reduce((sum: number, count: number) => sum + count, 0)}</div>
              <div>Components Built: {Object.keys(buildProgress).length}</div>
              <div>Master Score: {masterScore}</div>
              <div>Current Project: {blueprints[selectedBlueprint]?.name}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
