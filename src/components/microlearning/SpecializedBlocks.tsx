'use client'

import { useState, useEffect } from 'react'

// ========================================
// 🎯 MICRO-LEARNING BLOCKS 21-30
// Specialized Learning Tools
// ========================================

// 21. 🎪 CODE CIRCUS - Multi-Challenge Arena
export const CodeCircus = ({ acts, onCircusComplete }: any) => {
  const [currentAct, setCurrentAct] = useState(0)
  const [performance, setPerformance] = useState<{[key: number]: any}>({})
  const [totalScore, setTotalScore] = useState(0)

  const completeAct = (score: number) => {
    setPerformance(prev => ({ ...prev, [currentAct]: { score, stars: Math.ceil(score / 200) } }))
    setTotalScore(prev => prev + score)
    
    if (currentAct < acts.length - 1) {
      setCurrentAct(prev => prev + 1)
    } else {
      onCircusComplete?.(totalScore + score)
    }
  }

  return (
    <div className="bg-gradient-to-br from-pink-50 to-purple-100 p-4 rounded-xl border-2 border-pink-300">
      <h4 className="font-bold text-pink-800 mb-4 flex items-center gap-2">
        🎪 Welcome to the Code Circus!
      </h4>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold mb-3">🎭 Circus Acts:</h5>
          <div className="space-y-2">
            {acts.map((act: any, index: number) => (
              <div
                key={index}
                className={`p-3 rounded-lg border transition-all ${
                  index === currentAct ? 'bg-pink-100 border-pink-400' :
                  performance[index] ? 'bg-green-50 border-green-300' :
                  'bg-white border-pink-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h6 className="font-semibold">{act.title}</h6>
                    <p className="text-sm text-gray-600">{act.description}</p>
                  </div>
                  {performance[index] && (
                    <div className="text-right">
                      <div className="text-yellow-500">
                        {'⭐'.repeat(performance[index].stars)}
                      </div>
                      <div className="text-sm text-gray-600">
                        {performance[index].score} pts
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          {currentAct < acts.length ? (
            <div>
              <h5 className="font-semibold mb-2">🎪 Current Act: {acts[currentAct].title}</h5>
              <div className="bg-white p-4 rounded-lg border mb-4">
                <p className="text-gray-700 mb-3">{acts[currentAct].challenge}</p>
                
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
                  {acts[currentAct].starterCode}
                </div>
                
                <textarea
                  className="w-full h-24 p-3 border-2 border-pink-300 rounded-lg font-mono text-sm mb-3"
                  placeholder="Perform your code magic here..."
                />
                
                <button
                  onClick={() => completeAct(Math.floor(Math.random() * 400) + 200)}
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg"
                >
                  🎭 Perform Act
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎪</div>
              <h3 className="text-2xl font-bold text-pink-800 mb-2">Circus Complete!</h3>
              <div className="text-lg text-pink-700">Final Score: {totalScore}</div>
              <div className="text-sm text-gray-600 mt-2">
                Performance Rating: {Math.ceil(totalScore / (acts.length * 200)) * 20}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// 22. 🧬 CODE DNA - Pattern Recognition
export const CodeDNA = ({ patterns, onPatternMastery }: any) => {
  const [recognizedPatterns, setRecognizedPatterns] = useState<Set<string>>(new Set())
  const [currentSequence, setCurrentSequence] = useState('')
  const [analysis, setAnalysis] = useState<any>(null)

  const analyzeSequence = () => {
    const foundPatterns = patterns.filter((pattern: any) => 
      currentSequence.toLowerCase().includes(pattern.signature.toLowerCase())
    )
    
    setAnalysis({
      patterns: foundPatterns,
      complexity: Math.floor(currentSequence.length / 10),
      score: foundPatterns.length * 100
    })
    
    foundPatterns.forEach((pattern: any) => {
      if (!recognizedPatterns.has(pattern.id)) {
        setRecognizedPatterns(prev => new Set([...prev, pattern.id]))
        onPatternMastery?.(pattern.id, 150)
      }
    })
  }

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-blue-100 p-4 rounded-xl border-2 border-cyan-300">
      <h4 className="font-bold text-cyan-800 mb-4">🧬 Code DNA Analyzer</h4>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold mb-2">🔬 Code Sequence Input:</h5>
          <textarea
            value={currentSequence}
            onChange={(e) => setCurrentSequence(e.target.value)}
            className="w-full h-32 p-3 border-2 border-cyan-300 rounded-lg font-mono text-sm mb-3"
            placeholder="Paste or write code to analyze..."
          />
          
          <button
            onClick={analyzeSequence}
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded-lg mb-4"
          >
            🧬 Analyze DNA
          </button>

          {analysis && (
            <div className="bg-white p-3 rounded-lg border">
              <h6 className="font-semibold text-cyan-700 mb-2">📊 Analysis Results:</h6>
              <div className="space-y-1 text-sm">
                <div>Patterns Found: {analysis.patterns.length}</div>
                <div>Complexity Score: {analysis.complexity}</div>
                <div>DNA Score: {analysis.score}</div>
              </div>
            </div>
          )}
        </div>

        <div>
          <h5 className="font-semibold mb-2">🧪 Pattern Library:</h5>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {patterns.map((pattern: any) => (
              <div
                key={pattern.id}
                className={`p-3 rounded-lg border transition-all ${
                  recognizedPatterns.has(pattern.id)
                    ? 'bg-green-100 border-green-300'
                    : 'bg-white border-cyan-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h6 className="font-semibold text-sm">{pattern.name}</h6>
                    <p className="text-xs text-gray-600">{pattern.description}</p>
                  </div>
                  {recognizedPatterns.has(pattern.id) && (
                    <span className="text-green-600">🧬</span>
                  )}
                </div>
                <code className="text-xs bg-gray-100 p-1 rounded block mt-1">
                  {pattern.signature}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// 23. 🚀 ROCKET SHIP BUILDER - Progressive Construction
export const RocketShipBuilder = ({ components, stages, onLaunch }: any) => {
  const [builtComponents, setBuiltComponents] = useState<string[]>([])
  const [currentStage, setCurrentStage] = useState(0)
  const [isReadyToLaunch, setIsReadyToLaunch] = useState(false)

  const addComponent = (component: any) => {
    if (component.stage === currentStage && component.prerequisite.every((req: string) => builtComponents.includes(req))) {
      setBuiltComponents(prev => [...prev, component.id])
      
      // Check if stage is complete
      const stageComponents = components.filter((c: any) => c.stage === currentStage)
      const stageBuilt = stageComponents.filter((c: any) => builtComponents.includes(c.id) || c.id === component.id)
      
      if (stageBuilt.length === stageComponents.length) {
        if (currentStage < stages.length - 1) {
          setCurrentStage(prev => prev + 1)
        } else {
          setIsReadyToLaunch(true)
        }
      }
    }
  }

  const launchRocket = () => {
    onLaunch?.(builtComponents.length * 100)
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-100 p-4 rounded-xl border-2 border-slate-300">
      <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
        🚀 Rocket Ship Code Builder
      </h4>

      <div className="grid lg:grid-cols-3 gap-4">
        <div>
          <h5 className="font-semibold mb-2">🔧 Available Components:</h5>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {components.filter((c: any) => c.stage === currentStage).map((component: any) => {
              const canBuild = component.prerequisite.every((req: string) => builtComponents.includes(req))
              const isBuilt = builtComponents.includes(component.id)
              
              return (
                <button
                  key={component.id}
                  onClick={() => addComponent(component)}
                  disabled={!canBuild || isBuilt}
                  className={`w-full p-3 text-left rounded-lg transition-all ${
                    isBuilt ? 'bg-green-100 border border-green-300 text-green-800' :
                    canBuild ? 'bg-white border border-slate-200 hover:border-slate-400' :
                    'bg-gray-100 border border-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <div className="font-semibold text-sm">{component.name}</div>
                  <div className="text-xs text-gray-600">{component.description}</div>
                  {isBuilt && <div className="text-xs text-green-600 mt-1">✅ Built</div>}
                </button>
              )
            })}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">🏗️ Build Progress:</h5>
          <div className="space-y-3">
            {stages.map((stage: any, index: number) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  index < currentStage ? 'bg-green-100 border-green-300' :
                  index === currentStage ? 'bg-blue-100 border-blue-300' :
                  'bg-gray-100 border-gray-200'
                }`}
              >
                <div className="font-semibold text-sm">{stage.name}</div>
                <div className="text-xs text-gray-600">{stage.description}</div>
                {index < currentStage && <div className="text-xs text-green-600 mt-1">✅ Complete</div>}
                {index === currentStage && <div className="text-xs text-blue-600 mt-1">🔨 Building...</div>}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">🚀 Rocket Visualization:</h5>
          <div className="bg-black rounded-lg p-4 min-h-[300px] flex flex-col-reverse items-center justify-start">
            {builtComponents.map((componentId, index) => {
              const component = components.find((c: any) => c.id === componentId)
              return (
                <div
                  key={index}
                  className="w-16 h-8 bg-gradient-to-r from-red-400 to-orange-500 rounded mb-1 flex items-center justify-center text-white text-xs"
                >
                  {component?.icon}
                </div>
              )
            })}
          </div>
          
          {isReadyToLaunch && (
            <button
              onClick={launchRocket}
              className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-bold animate-pulse"
            >
              🚀 LAUNCH ROCKET!
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// 24. 🎨 MASTERPIECE GALLERY - Code Art Exhibition
export const MasterpieceGallery = ({ artPieces, onMasterpiece }: any) => {
  const [selectedPiece, setSelectedPiece] = useState(0)
  const [userCreation, setUserCreation] = useState('')
  const [gallery, setGallery] = useState<any[]>([])

  const createMasterpiece = () => {
    const newPiece = {
      id: Date.now(),
      code: userCreation,
      title: `Masterpiece #${gallery.length + 1}`,
      created: new Date().toLocaleString(),
      likes: 0
    }
    
    setGallery(prev => [...prev, newPiece])
    onMasterpiece?.(newPiece, 300)
    setUserCreation('')
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 p-4 rounded-xl border-2 border-purple-300">
      <h4 className="font-bold text-purple-800 mb-4">🎨 Code Masterpiece Gallery</h4>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold mb-2">🖼️ Featured Artworks:</h5>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {artPieces.map((piece: any, index: number) => (
              <div
                key={index}
                onClick={() => setSelectedPiece(index)}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedPiece === index
                    ? 'bg-purple-100 border-purple-400'
                    : 'bg-white border-purple-200 hover:border-purple-300'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h6 className="font-semibold">{piece.title}</h6>
                    <p className="text-sm text-gray-600">{piece.artist}</p>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-yellow-500">{'⭐'.repeat(piece.rating)}</div>
                    <div className="text-gray-600">{piece.likes} likes</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <h5 className="font-semibold mb-2">🎭 Your Gallery:</h5>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {gallery.map((piece, index) => (
                <div key={piece.id} className="p-2 bg-green-50 border border-green-200 rounded">
                  <div className="font-semibold text-sm">{piece.title}</div>
                  <div className="text-xs text-gray-600">{piece.created}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">
            🎨 Viewing: {artPieces[selectedPiece]?.title}
          </h5>
          <div className="bg-gray-900 text-green-400 p-3 rounded-lg font-mono text-sm mb-4 min-h-[150px]">
            {artPieces[selectedPiece]?.code}
          </div>

          <h5 className="font-semibold mb-2">✨ Create Your Masterpiece:</h5>
          <textarea
            value={userCreation}
            onChange={(e) => setUserCreation(e.target.value)}
            className="w-full h-32 p-3 border-2 border-purple-300 rounded-lg font-mono text-sm mb-3"
            placeholder="Write beautiful code that tells a story..."
          />
          
          <button
            onClick={createMasterpiece}
            disabled={userCreation.length < 10}
            className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 text-white py-2 rounded-lg"
          >
            🎨 Add to Gallery
          </button>
        </div>
      </div>
    </div>
  )
}

// 25. 🌱 CODE GARDEN - Nurture & Grow
export const CodeGarden = ({ seeds, onHarvest }: any) => {
  const [plantedSeeds, setPlantedSeeds] = useState<{[key: string]: any}>({})
  const [gardenScore, setGardenScore] = useState(0)

  const plantSeed = (seed: any, code: string) => {
    const growth = Math.min(code.length / seed.minLength, 1)
    const plant = {
      id: seed.id,
      type: seed.type,
      growth,
      code,
      planted: Date.now(),
      isHealthy: code.includes(seed.requirements)
    }
    
    setPlantedSeeds(prev => ({ ...prev, [seed.id]: plant }))
    
    if (plant.isHealthy && plant.growth >= 1) {
      setGardenScore(prev => prev + seed.points)
      onHarvest?.(seed, plant.growth * seed.points)
    }
  }

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border-2 border-green-300">
      <h4 className="font-bold text-green-800 mb-4 flex items-center gap-2">
        🌱 Code Garden
        <span className="text-sm bg-green-200 px-2 py-1 rounded">Score: {gardenScore}</span>
      </h4>

      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold mb-2">🌰 Seed Collection:</h5>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {seeds.map((seed: any) => {
              const isPlanted = plantedSeeds[seed.id]
              return (
                <div
                  key={seed.id}
                  className={`p-3 rounded-lg border ${
                    isPlanted ? 'bg-green-100 border-green-300' : 'bg-white border-green-200'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h6 className="font-semibold text-sm">{seed.name}</h6>
                      <p className="text-xs text-gray-600">{seed.description}</p>
                    </div>
                    <div className="text-2xl">
                      {isPlanted ? '🌱' : seed.icon}
                    </div>
                  </div>
                  
                  {!isPlanted && (
                    <div className="mt-2">
                      <textarea
                        className="w-full h-16 p-2 text-xs border border-green-300 rounded font-mono"
                        placeholder={`Plant ${seed.name} with code...`}
                        onChange={(e) => {
                          if (e.target.value.length >= seed.minLength) {
                            plantSeed(seed, e.target.value)
                          }
                        }}
                      />
                    </div>
                  )}
                  
                  {isPlanted && (
                    <div className="mt-2 text-xs">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${plantedSeeds[seed.id].growth * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>{Math.round(plantedSeeds[seed.id].growth * 100)}% grown</span>
                        <span>{plantedSeeds[seed.id].isHealthy ? '💚 Healthy' : '💔 Needs care'}</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div>
          <h5 className="font-semibold mb-2">🌿 Your Garden:</h5>
          <div className="bg-gradient-to-b from-sky-200 to-green-200 rounded-lg p-4 min-h-[300px] relative overflow-hidden">
            {/* Garden Background */}
            <div className="absolute bottom-0 left-0 w-full h-8 bg-green-800 rounded-b-lg"></div>
            
            {/* Planted Seeds/Plants */}
            <div className="absolute bottom-8 left-0 w-full flex justify-around items-end">
              {Object.values(plantedSeeds).map((plant: any, index) => (
                <div
                  key={plant.id}
                  className="text-center"
                  style={{ height: `${20 + plant.growth * 60}px` }}
                >
                  <div className="text-2xl">
                    {plant.growth >= 1 ? '🌳' : plant.growth >= 0.5 ? '🌿' : '🌱'}
                  </div>
                  <div className="text-xs text-white bg-black bg-opacity-50 rounded px-1">
                    {Math.round(plant.growth * 100)}%
                  </div>
                </div>
              ))}
            </div>
            
            {Object.keys(plantedSeeds).length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Plant seeds by writing code above! 🌱
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
