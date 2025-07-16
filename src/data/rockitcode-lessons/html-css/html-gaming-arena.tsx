'use client'

import { useState, useEffect } from 'react'

// Game Mechanics & Puzzle System
const CodePuzzleGame = ({ puzzle, onSolve }: any) => {
  const [solution, setSolution] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [streak, setStreak] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isActive, setIsActive] = useState(false)
  const [score, setScore] = useState(0)

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isActive, timeLeft])

  const startPuzzle = () => {
    setIsActive(true)
    setTimeLeft(60)
    setAttempts(0)
  }

  const checkSolution = () => {
    setAttempts(prev => prev + 1)
    const isCorrect = solution.toLowerCase().includes(puzzle.answer.toLowerCase())
    
    if (isCorrect) {
      const timeBonus = Math.max(0, timeLeft * 10)
      const attemptBonus = Math.max(0, (4 - attempts) * 100)
      const newScore = 500 + timeBonus + attemptBonus
      setScore(newScore)
      setStreak(prev => prev + 1)
      onSolve({ score: newScore, time: 60 - timeLeft, attempts })
    } else {
      setStreak(0)
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-xl border-2 border-purple-300">
      <div className="flex justify-between items-center mb-4">
        <h4 className="font-bold text-purple-800 flex items-center gap-2">
          🧩 Code Puzzle Challenge
        </h4>
        <div className="flex gap-4 text-sm">
          <span className="bg-blue-500 text-white px-2 py-1 rounded">⏰ {timeLeft}s</span>
          <span className="bg-green-500 text-white px-2 py-1 rounded">🔥 {streak}</span>
          <span className="bg-yellow-500 text-white px-2 py-1 rounded">⚡ {score}</span>
        </div>
      </div>

      {!isActive ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎮</div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">{puzzle.title}</h3>
          <p className="text-gray-600 mb-4">{puzzle.description}</p>
          <button
            onClick={startPuzzle}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transform transition hover:scale-105"
          >
            🚀 Start Challenge
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
            <div className="text-yellow-400 mb-2">// Challenge: {puzzle.challenge}</div>
            {puzzle.starterCode}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
              placeholder="Type your solution..."
              className="flex-1 px-3 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500"
            />
            <button
              onClick={checkSolution}
              disabled={timeLeft === 0}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              🎯 Submit
            </button>
          </div>

          <div className="text-xs text-gray-600">
            Attempts: {attempts}/3 | Time Bonus: {timeLeft * 10} pts | Attempt Bonus: {Math.max(0, (4 - attempts) * 100)} pts
          </div>
        </div>
      )}
    </div>
  )
}

const CodeDragDropGame = ({ elements, target, onComplete }: any) => {
  const [draggedElement, setDraggedElement] = useState<string | null>(null)
  const [droppedElements, setDroppedElements] = useState<string[]>([])
  const [isComplete, setIsComplete] = useState(false)

  const handleDragStart = (element: string) => {
    setDraggedElement(element)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedElement && !droppedElements.includes(draggedElement)) {
      const newElements = [...droppedElements, draggedElement]
      setDroppedElements(newElements)
      
      if (newElements.length === target.length) {
        const isCorrect = newElements.every((el, index) => el === target[index])
        if (isCorrect) {
          setIsComplete(true)
          onComplete({ score: 1000, type: 'drag-drop' })
        }
      }
    }
    setDraggedElement(null)
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-xl border border-blue-300">
      <h4 className="font-bold text-blue-800 mb-4 flex items-center gap-2">
        🎯 Drag & Drop HTML Builder
      </h4>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Elements to drag */}
        <div>
          <h5 className="font-semibold text-gray-700 mb-3">HTML Elements:</h5>
          <div className="space-y-2">
            {elements.map((element: string) => (
              <div
                key={element}
                draggable
                onDragStart={() => handleDragStart(element)}
                className={`p-3 rounded-lg cursor-move transition-all ${
                  droppedElements.includes(element)
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50'
                    : 'bg-white border-2 border-blue-200 hover:border-blue-400 hover:shadow-md'
                }`}
              >
                <code className="font-mono text-sm">{element}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Drop zone */}
        <div>
          <h5 className="font-semibold text-gray-700 mb-3">Build Your HTML:</h5>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="min-h-[200px] border-2 border-dashed border-blue-300 rounded-lg p-4 bg-white"
          >
            {droppedElements.map((element, index) => (
              <div key={index} className="mb-2 p-2 bg-blue-50 rounded border">
                <code className="font-mono text-sm text-blue-800">{element}</code>
              </div>
            ))}
            {droppedElements.length === 0 && (
              <div className="text-center text-gray-400 py-16">
                Drag HTML elements here to build your page
              </div>
            )}
          </div>
          
          {isComplete && (
            <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-lg">
              🎉 Perfect! You built valid HTML structure!
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Leaderboard = ({ scores, currentUser }: any) => {
  const [filter, setFilter] = useState('today')
  
  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-100 p-6 rounded-xl border border-yellow-300">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-yellow-800 flex items-center gap-2">
          🏆 Coding Champions
        </h3>
        <select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1 border border-yellow-300 rounded bg-white"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="alltime">All Time</option>
        </select>
      </div>

      <div className="space-y-2">
        {scores.slice(0, 10).map((player: any, index: number) => (
          <div
            key={player.id}
            className={`flex items-center justify-between p-3 rounded-lg ${
              player.id === currentUser?.id 
                ? 'bg-blue-100 border-2 border-blue-400' 
                : 'bg-white border border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className={`font-bold text-lg ${
                index === 0 ? 'text-yellow-600' :
                index === 1 ? 'text-gray-500' :
                index === 2 ? 'text-orange-600' : 'text-gray-700'
              }`}>
                {index < 3 ? ['🥇', '🥈', '🥉'][index] : `#${index + 1}`}
              </span>
              <div>
                <div className="font-semibold">{player.name}</div>
                <div className="text-xs text-gray-600">
                  Level {player.level} • {player.streak} day streak
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-bold text-lg">{player.totalScore.toLocaleString()}</div>
              <div className="text-xs text-gray-600">{player.lessonsCompleted} lessons</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex justify-between text-sm">
          <span>Your Rank:</span>
          <span className="font-semibold">#{currentUser?.rank || '—'}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Points to Next Rank:</span>
          <span className="font-semibold">{currentUser?.pointsToNext || '—'}</span>
        </div>
      </div>
    </div>
  )
}

const AchievementSystem = ({ achievements, unlockedAchievements }: any) => {
  const [showAll, setShowAll] = useState(false)
  
  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-xl border border-green-300">
      <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
        🏅 Achievement Gallery
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {achievements
          .filter((achievement: any) => showAll || unlockedAchievements.includes(achievement.id))
          .map((achievement: any) => {
            const isUnlocked = unlockedAchievements.includes(achievement.id)
            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg text-center transition-all ${
                  isUnlocked
                    ? 'bg-white border-2 border-green-400 shadow-md'
                    : 'bg-gray-100 border border-gray-300 opacity-60'
                }`}
              >
                <div className="text-3xl mb-2">{isUnlocked ? achievement.icon : '🔒'}</div>
                <div className="font-semibold text-sm">{achievement.name}</div>
                <div className="text-xs text-gray-600 mt-1">{achievement.description}</div>
                {isUnlocked && (
                  <div className="text-xs text-green-600 font-semibold mt-1">
                    +{achievement.points} XP
                  </div>
                )}
              </div>
            )
          })}
      </div>

      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-4 w-full py-2 text-sm text-green-700 hover:text-green-800 font-medium"
      >
        {showAll ? 'Hide Locked Achievements' : 'Show All Achievements'}
      </button>
    </div>
  )
}

const BossChallenge = ({ challenge, onDefeat }: any) => {
  const [lives, setLives] = useState(3)
  const [currentProblem, setCurrentProblem] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [isActive, timeLeft])

  const startBossChallenge = () => {
    setIsActive(true)
    setLives(3)
    setCurrentProblem(0)
    setTimeLeft(300)
  }

  return (
    <div className="bg-gradient-to-br from-red-100 to-purple-200 p-6 rounded-xl border-2 border-red-400">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-red-800 flex items-center gap-2">
          👹 Boss Challenge: {challenge.name}
        </h3>
        <div className="flex gap-2">
          <span className="bg-red-500 text-white px-2 py-1 rounded text-sm">
            ❤️ {lives}
          </span>
          <span className="bg-purple-500 text-white px-2 py-1 rounded text-sm">
            ⏰ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {!isActive ? (
        <div className="text-center py-8">
          <div className="text-6xl mb-4">👹</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{challenge.title}</h3>
          <p className="text-gray-600 mb-4">{challenge.description}</p>
          <div className="bg-yellow-100 border border-yellow-400 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Boss Rules:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• 3 lives only - lose all and you must restart</li>
              <li>• 5 minute time limit</li>
              <li>• Progressive difficulty</li>
              <li>• Defeat the boss to unlock next world</li>
            </ul>
          </div>
          <button
            onClick={startBossChallenge}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transform transition hover:scale-105"
          >
            ⚔️ Challenge the Boss
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <div className="text-red-400 mb-2">
              // Boss Problem {currentProblem + 1}/3
            </div>
            <div className="text-yellow-400 mb-2">
              {challenge.problems[currentProblem]?.question}
            </div>
            <code className="text-green-400">
              {challenge.problems[currentProblem]?.code}
            </code>
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter your solution..."
              className="flex-1 px-3 py-2 border-2 border-red-300 rounded-lg"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold">
              ⚔️ Attack
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

const ProgressRPG = ({ playerData }: any) => {
  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-xl border border-indigo-300">
      <h3 className="font-bold text-indigo-800 mb-4 flex items-center gap-2">
        🧙‍♂️ Developer Stats
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Level {playerData.level} Web Wizard</span>
              <span className="text-sm text-gray-600">{playerData.xp}/{playerData.nextLevelXp} XP</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(playerData.xp / playerData.nextLevelXp) * 100}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-sm font-semibold">Power</div>
              <div className="text-lg font-bold text-blue-600">{playerData.skills.html}</div>
            </div>
            <div className="bg-white p-3 rounded-lg border text-center">
              <div className="text-2xl mb-1">🎨</div>
              <div className="text-sm font-semibold">Style</div>
              <div className="text-lg font-bold text-purple-600">{playerData.skills.css}</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">🎒 Equipment:</h4>
          {playerData.equipment.map((item: any) => (
            <div key={item.id} className="flex items-center gap-3 bg-white p-3 rounded-lg border">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-semibold text-sm">{item.name}</div>
                <div className="text-xs text-gray-600">{item.effect}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function GameifiedHtmlLearning() {
  const [playerScore, setPlayerScore] = useState(0)
  const [playerLevel, setPlayerLevel] = useState(1)
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>(['first-login'])
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set())

  // Mock data - in real app would come from backend
  const leaderboardData = [
    { id: 1, name: 'CodeMaster2024', totalScore: 15420, level: 12, streak: 15, lessonsCompleted: 34, rank: 1 },
    { id: 2, name: 'HTMLHero', totalScore: 12890, level: 10, streak: 8, lessonsCompleted: 28, rank: 2 },
    { id: 3, name: 'WebWizard', totalScore: 11200, level: 9, streak: 12, lessonsCompleted: 25, rank: 3 },
    { id: 4, name: 'You', totalScore: playerScore, level: playerLevel, streak: 5, lessonsCompleted: 3, rank: 847 }
  ]

  const achievements = [
    { id: 'first-login', name: 'Welcome!', description: 'Started your coding journey', icon: '🎉', points: 50 },
    { id: 'first-html', name: 'HTML Rookie', description: 'Created your first HTML element', icon: '📝', points: 100 },
    { id: 'puzzle-master', name: 'Puzzle Master', description: 'Solved 5 code puzzles', icon: '🧩', points: 200 },
    { id: 'speed-demon', name: 'Speed Demon', description: 'Completed challenge in under 30 seconds', icon: '⚡', points: 300 },
    { id: 'perfectionist', name: 'Perfectionist', description: 'Solved puzzle on first try', icon: '🎯', points: 250 },
    { id: 'boss-slayer', name: 'Boss Slayer', description: 'Defeated the HTML Boss', icon: '👹', points: 500 }
  ]

  const playerData = {
    level: playerLevel,
    xp: playerScore,
    nextLevelXp: playerLevel * 1000,
    skills: { html: 15, css: 8, javascript: 3 },
    equipment: [
      { id: 1, name: 'Beginner\'s Tag', icon: '🏷️', effect: '+10% HTML XP' },
      { id: 2, name: 'Debug Glasses', icon: '🤓', effect: 'See syntax errors clearly' }
    ]
  }

  const handleChallengeComplete = (result: any) => {
    setPlayerScore(prev => prev + result.score)
    if (result.score > 800 && !unlockedAchievements.includes('perfectionist')) {
      setUnlockedAchievements(prev => [...prev, 'perfectionist'])
    }
  }

  const puzzles = {
    dragDrop: {
      elements: ['<!DOCTYPE html>', '<html>', '<head>', '<title>My Page</title>', '</head>', '<body>', '<h1>Hello!</h1>', '</body>', '</html>'],
      target: ['<!DOCTYPE html>', '<html>', '<head>', '<title>My Page</title>', '</head>', '<body>', '<h1>Hello!</h1>', '</body>', '</html>']
    },
    codeChallenge: {
      title: 'HTML Element Speedrun',
      description: 'Create the missing HTML element as fast as you can!',
      challenge: 'Complete this heading tag',
      starterCode: '<h1>Welcome to my site',
      answer: '</h1>'
    },
    bossChallenge: {
      name: 'The HTML Overlord',
      title: 'Final Boss: Master of Structure', 
      description: 'Prove your HTML mastery by defeating the ultimate challenge!',
      problems: [
        { question: 'Fix this broken heading:', code: '<h1>Title</h2>' },
        { question: 'Complete the document structure:', code: '<html><head></head><body>' },
        { question: 'Add the missing doctype:', code: '<html><head><title>Page</title></head></html>' }
      ]
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Section with Player Stats */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold mb-2">🎮 HTML Gaming Arena</h1>
            <p className="text-purple-100">Master HTML through epic challenges and puzzles!</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{playerScore.toLocaleString()}</div>
            <div className="text-purple-200">Total Score</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Gaming Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Code Puzzle Game */}
          <CodePuzzleGame 
            puzzle={puzzles.codeChallenge}
            onSolve={handleChallengeComplete}
          />

          {/* Drag & Drop Game */}
          <CodeDragDropGame
            elements={puzzles.dragDrop.elements}
            target={puzzles.dragDrop.target}
            onComplete={handleChallengeComplete}
          />

          {/* Boss Challenge */}
          <BossChallenge
            challenge={puzzles.bossChallenge}
            onDefeat={handleChallengeComplete}
          />
        </div>

        {/* Sidebar with Game Systems */}
        <div className="space-y-6">
          {/* Player RPG Stats */}
          <ProgressRPG playerData={playerData} />

          {/* Leaderboard */}
          <Leaderboard 
            scores={leaderboardData}
            currentUser={leaderboardData[3]}
          />

          {/* Achievement System */}
          <AchievementSystem 
            achievements={achievements}
            unlockedAchievements={unlockedAchievements}
          />
        </div>
      </div>

      {/* Daily Challenges Section */}
      <div className="bg-gradient-to-br from-orange-100 to-red-100 p-6 rounded-xl border border-orange-300">
        <h3 className="font-bold text-orange-800 mb-4 flex items-center gap-2">
          🌅 Daily Challenges
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <div className="text-2xl mb-2">⚡</div>
            <h4 className="font-semibold mb-1">Speed Challenge</h4>
            <p className="text-sm text-gray-600 mb-3">Create 5 HTML elements in under 2 minutes</p>
            <div className="text-xs text-orange-600 font-semibold">Reward: 500 XP + Speed Badge</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <div className="text-2xl mb-2">🎯</div>
            <h4 className="font-semibold mb-1">Precision Challenge</h4>
            <p className="text-sm text-gray-600 mb-3">No mistakes allowed - perfect HTML structure</p>
            <div className="text-xs text-orange-600 font-semibold">Reward: 750 XP + Precision Badge</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-orange-200">
            <div className="text-2xl mb-2">🧠</div>
            <h4 className="font-semibold mb-1">Memory Challenge</h4>
            <p className="text-sm text-gray-600 mb-3">Recreate HTML structure from memory</p>
            <div className="text-xs text-orange-600 font-semibold">Reward: 1000 XP + Memory Badge</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: "HTML Gaming Arena: Learn Through Play",
  description: "Master HTML through gamified puzzles, challenges, leaderboards and RPG-style progression!",
  estimatedTime: 30,
  difficulty: "beginner" as const,
  technologies: ["HTML5"],
  gameElements: ["puzzles", "leaderboards", "achievements", "boss-battles", "daily-challenges", "rpg-progression"],
  objectives: [
    "Learn HTML through engaging game mechanics",
    "Compete with other learners on leaderboards", 
    "Unlock achievements and level up your skills",
    "Master concepts through varied puzzle types"
  ]
}
