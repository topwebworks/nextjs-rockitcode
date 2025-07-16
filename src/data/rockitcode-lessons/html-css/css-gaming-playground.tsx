'use client'

import { useState, useEffect } from 'react'

// CSS Color Mixing Game
const ColorMixingGame = ({ onComplete }: any) => {
  const [target] = useState({ r: 255, g: 100, b: 150 }) // Target pink color
  const [playerColor, setPlayerColor] = useState({ r: 128, g: 128, b: 128 })
  const [score, setScore] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [isWin, setIsWin] = useState(false)

  const calculateDifference = () => {
    const diff = Math.abs(target.r - playerColor.r) + 
                 Math.abs(target.g - playerColor.g) + 
                 Math.abs(target.b - playerColor.b)
    return diff
  }

  const checkMatch = () => {
    const diff = calculateDifference()
    setAttempts(prev => prev + 1)
    
    if (diff < 30) { // Close enough!
      const finalScore = Math.max(1000 - diff * 10 - attempts * 50, 100)
      setScore(finalScore)
      setIsWin(true)
      onComplete({ score: finalScore, type: 'color-mixing' })
    }
  }

  return (
    <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-xl border-2 border-pink-300">
      <h4 className="font-bold text-pink-800 mb-4 flex items-center gap-2">
        🎨 CSS Color Mixing Challenge
      </h4>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Target Color */}
        <div>
          <h5 className="font-semibold mb-2">🎯 Target Color:</h5>
          <div 
            className="w-full h-24 rounded-lg border-2 border-gray-300 mb-2"
            style={{ backgroundColor: `rgb(${target.r}, ${target.g}, ${target.b})` }}
          />
          <p className="text-sm text-gray-600">Match this color exactly!</p>
        </div>

        {/* Player Color */}
        <div>
          <h5 className="font-semibold mb-2">🎮 Your Color:</h5>
          <div 
            className="w-full h-24 rounded-lg border-2 border-gray-300 mb-2"
            style={{ backgroundColor: `rgb(${playerColor.r}, ${playerColor.g}, ${playerColor.b})` }}
          />
          <div className="text-sm font-mono">
            rgb({playerColor.r}, {playerColor.g}, {playerColor.b})
          </div>
        </div>
      </div>

      {/* Color Sliders */}
      <div className="mt-6 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-red-700 mb-1">
            Red: {playerColor.r}
          </label>
          <input
            type="range"
            min="0"
            max="255"
            value={playerColor.r}
            onChange={(e) => setPlayerColor(prev => ({ ...prev, r: parseInt(e.target.value) }))}
            className="w-full h-2 bg-red-200 rounded-lg appearance-none slider-thumb"
            disabled={isWin}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-green-700 mb-1">
            Green: {playerColor.g}
          </label>
          <input
            type="range"
            min="0"
            max="255"
            value={playerColor.g}
            onChange={(e) => setPlayerColor(prev => ({ ...prev, g: parseInt(e.target.value) }))}
            className="w-full h-2 bg-green-200 rounded-lg appearance-none"
            disabled={isWin}
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-blue-700 mb-1">
            Blue: {playerColor.b}
          </label>
          <input
            type="range"
            min="0"
            max="255"
            value={playerColor.b}
            onChange={(e) => setPlayerColor(prev => ({ ...prev, b: parseInt(e.target.value) }))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none"
            disabled={isWin}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Difference: {calculateDifference()} | Attempts: {attempts}
        </div>
        <button
          onClick={checkMatch}
          disabled={isWin}
          className={`px-6 py-2 rounded-lg font-semibold ${
            isWin 
              ? 'bg-green-500 text-white' 
              : 'bg-pink-500 hover:bg-pink-600 text-white'
          }`}
        >
          {isWin ? `🎉 +${score} points!` : 'Check Match'}
        </button>
      </div>
    </div>
  )
}

// CSS Layout Racing Game
const LayoutRacingGame = ({ onComplete }: any) => {
  const [timeLeft, setTimeLeft] = useState(60)
  const [isActive, setIsActive] = useState(false)
  const [completedLayouts, setCompletedLayouts] = useState(0)
  const [currentChallenge, setCurrentChallenge] = useState(0)

  const challenges = [
    { task: "Center a div", solution: "display: flex; justify-content: center; align-items: center;" },
    { task: "Create 3 columns", solution: "display: grid; grid-template-columns: 1fr 1fr 1fr;" },
    { task: "Make it responsive", solution: "width: 100%; max-width: 1200px; margin: 0 auto;" }
  ]

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && isActive) {
      // Time's up!
      const finalScore = completedLayouts * 500
      onComplete({ score: finalScore, type: 'layout-racing' })
    }
  }, [isActive, timeLeft])

  const startRace = () => {
    setIsActive(true)
    setTimeLeft(60)
    setCompletedLayouts(0)
    setCurrentChallenge(0)
  }

  const completeChallenge = () => {
    setCompletedLayouts(prev => prev + 1)
    setCurrentChallenge(prev => (prev + 1) % challenges.length)
  }

  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-xl border-2 border-blue-300">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-blue-800 flex items-center gap-2">
          🏎️ CSS Layout Speed Race
        </h4>
        {isActive && (
          <div className="flex gap-2 text-sm">
            <span className="bg-red-500 text-white px-2 py-1 rounded">⏰ {timeLeft}s</span>
            <span className="bg-green-500 text-white px-2 py-1 rounded">🏁 {completedLayouts}</span>
          </div>
        )}
      </div>

      {!isActive ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🏎️</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">CSS Layout Speed Challenge</h3>
          <p className="text-gray-600 mb-4">Complete as many layout challenges as possible in 60 seconds!</p>
          <button
            onClick={startRace}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transform transition hover:scale-105"
          >
            🚀 Start Racing!
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <div className="text-yellow-400 mb-2">
              Challenge #{completedLayouts + 1}: {challenges[currentChallenge].task}
            </div>
            <div className="text-green-400 font-mono text-sm">
              /* Write CSS to: {challenges[currentChallenge].task} */
            </div>
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Type CSS properties..."
              className="flex-1 px-3 py-2 border-2 border-blue-300 rounded-lg"
            />
            <button
              onClick={completeChallenge}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              🏁 Complete
            </button>
          </div>

          <div className="text-xs text-gray-600">
            Points per completion: 500 | Current streak: {completedLayouts}
          </div>
        </div>
      )}
    </div>
  )
}

// CSS Selector Battle Arena
const SelectorBattleArena = ({ onComplete }: any) => {
  const [playerHP, setPlayerHP] = useState(100)
  const [enemyHP, setEnemyHP] = useState(100)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [playerAnswer, setPlayerAnswer] = useState('')

  const battles = [
    { question: "Select all paragraphs", answer: "p", damage: 25 },
    { question: "Select element with ID 'header'", answer: "#header", damage: 30 },
    { question: "Select all elements with class 'button'", answer: ".button", damage: 25 },
    { question: "Select first child of nav", answer: "nav > :first-child", damage: 20 }
  ]

  const attack = () => {
    const current = battles[currentQuestion]
    if (playerAnswer.toLowerCase().includes(current.answer.toLowerCase())) {
      // Player wins this round
      setEnemyHP(prev => Math.max(0, prev - current.damage))
      setCurrentQuestion(prev => (prev + 1) % battles.length)
      setPlayerAnswer('')
      
      if (enemyHP - current.damage <= 0) {
        onComplete({ score: 2000, type: 'selector-battle' })
      }
    } else {
      // Enemy counterattacks
      setPlayerHP(prev => Math.max(0, prev - 15))
      if (playerHP - 15 <= 0) {
        // Game over
        onComplete({ score: 0, type: 'selector-battle' })
      }
    }
  }

  return (
    <div className="bg-gradient-to-br from-red-100 to-orange-100 p-6 rounded-xl border-2 border-red-300">
      <h4 className="font-bold text-red-800 mb-4 flex items-center gap-2">
        ⚔️ CSS Selector Battle Arena
      </h4>

      {/* Health Bars */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <div className="text-sm font-semibold text-blue-700 mb-1">🧙‍♂️ You ({playerHP} HP)</div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-blue-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${playerHP}%` }}
            />
          </div>
        </div>
        <div>
          <div className="text-sm font-semibold text-red-700 mb-1">👹 CSS Monster ({enemyHP} HP)</div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-red-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${enemyHP}%` }}
            />
          </div>
        </div>
      </div>

      {/* Battle Interface */}
      <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
        <div className="text-yellow-400 mb-2">
          🎯 Challenge: {battles[currentQuestion].question}
        </div>
        <div className="text-green-400 text-sm">
          Damage: {battles[currentQuestion].damage} | Type the correct CSS selector...
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={playerAnswer}
          onChange={(e) => setPlayerAnswer(e.target.value)}
          placeholder="Enter CSS selector..."
          className="flex-1 px-3 py-2 border-2 border-red-300 rounded-lg font-mono"
        />
        <button
          onClick={attack}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          ⚔️ Attack!
        </button>
      </div>
    </div>
  )
}

// Tournament System
const CSSTournament = ({ onComplete }: any) => {
  const [round, setRound] = useState(1)
  const [wins, setWins] = useState(0)
  const [totalScore, setTotalScore] = useState(0)

  const handleGameComplete = (result: any) => {
    if (result.score > 0) {
      setWins(prev => prev + 1)
    }
    setTotalScore(prev => prev + result.score)
    setRound(prev => prev + 1)
    
    if (round >= 3) {
      onComplete({ totalScore, wins, rounds: round })
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl border-2 border-purple-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-purple-800 flex items-center gap-2">
          🏆 CSS Championship Tournament
        </h3>
        <div className="text-right text-sm">
          <div>Round {round}/3</div>
          <div>Wins: {wins} | Score: {totalScore}</div>
        </div>
      </div>

      {round <= 3 ? (
        <div className="space-y-6">
          {round === 1 && <ColorMixingGame onComplete={handleGameComplete} />}
          {round === 2 && <LayoutRacingGame onComplete={handleGameComplete} />}
          {round === 3 && <SelectorBattleArena onComplete={handleGameComplete} />}
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold mb-2">Tournament Complete!</h3>
          <div className="text-lg mb-4">
            Wins: {wins}/3 | Final Score: {totalScore.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">
            {wins === 3 ? '🥇 Perfect Tournament!' : wins === 2 ? '🥈 Great Performance!' : '🥉 Keep Practicing!'}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CSSGamingPlayground() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white p-8 rounded-xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">🎨 CSS Gaming Playground</h1>
          <p className="text-purple-100">Master CSS through fun, interactive games and challenges!</p>
        </div>
      </div>

      {/* Tournament Mode */}
      <CSSTournament onComplete={(result: any) => console.log('Tournament:', result)} />

      {/* Individual Games */}
      <div className="grid lg:grid-cols-2 gap-8">
        <ColorMixingGame onComplete={(result: any) => console.log('Color Game:', result)} />
        <LayoutRacingGame onComplete={(result: any) => console.log('Layout Game:', result)} />
      </div>
      
      <SelectorBattleArena onComplete={(result: any) => console.log('Selector Battle:', result)} />

      {/* Daily CSS Challenges */}
      <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-xl border border-green-300">
        <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
          🌟 Daily CSS Challenges
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-semibold mb-1">Color Master</h4>
            <p className="text-sm text-gray-600 mb-3">Create the perfect color palette using only CSS properties</p>
            <div className="text-xs text-green-600 font-semibold">Reward: 750 XP + Artist Badge</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl mb-2">📱</div>
            <h4 className="font-semibold mb-1">Responsive Wizard</h4>
            <p className="text-sm text-gray-600 mb-3">Make a layout work perfectly on all device sizes</p>
            <div className="text-xs text-green-600 font-semibold">Reward: 1000 XP + Mobile Badge</div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold mb-1">Animation Expert</h4>
            <p className="text-sm text-gray-600 mb-3">Create smooth animations using CSS transitions</p>
            <div className="text-xs text-green-600 font-semibold">Reward: 1250 XP + Motion Badge</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: "CSS Gaming Playground: Master Styling Through Play",
  description: "Learn CSS through interactive games including color mixing, layout racing, selector battles and tournaments!",
  estimatedTime: 45,
  difficulty: "beginner" as const,
  technologies: ["CSS3", "Flexbox", "Grid", "Animations"],
  gameElements: ["color-mixing", "layout-racing", "selector-battles", "tournaments", "daily-challenges"],
  objectives: [
    "Master CSS colors through visual mixing games",
    "Learn layout techniques through speed challenges",
    "Perfect CSS selectors through battle gameplay",
    "Compete in tournaments for ultimate mastery"
  ]
}
