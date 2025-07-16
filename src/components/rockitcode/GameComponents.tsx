import { useState } from 'react'

// Simple Leaderboard Component for Lessons
const MiniLeaderboard = ({ lessonId }: { lessonId: string }) => {
  const [scores] = useState([
    { name: 'CodeNinja', score: 2850, time: '1:23', streak: 15 },
    { name: 'HTMLHero', score: 2720, time: '1:45', streak: 12 },
    { name: 'WebWizard', score: 2680, time: '1:52', streak: 8 },
    { name: 'You', score: 0, time: '--', streak: 0 }
  ])

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
      <h4 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
        🏆 Top Performers - {lessonId}
      </h4>
      <div className="space-y-2">
        {scores.slice(0, 3).map((player, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
            <div className="flex items-center gap-2">
              <span className={`font-bold ${
                index === 0 ? 'text-yellow-600' : 
                index === 1 ? 'text-gray-500' : 'text-orange-600'
              }`}>
                {['🥇', '🥈', '🥉'][index]}
              </span>
              <span className="font-medium">{player.name}</span>
            </div>
            <div className="text-right text-sm">
              <div className="font-bold">{player.score}</div>
              <div className="text-gray-600">{player.time}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 p-2 bg-blue-100 border border-blue-200 rounded">
        <div className="text-sm font-medium text-blue-800">
          Beat the leaderboard to earn bonus XP! 🚀
        </div>
      </div>
    </div>
  )
}

// Achievement Unlock Animation
const AchievementUnlock = ({ achievement }: { achievement: any }) => {
  return (
    <div className="fixed top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg shadow-xl animate-bounce z-50">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{achievement.icon}</span>
        <div>
          <div className="font-bold">Achievement Unlocked!</div>
          <div className="text-sm">{achievement.name}</div>
        </div>
      </div>
    </div>
  )
}

// XP Progress Bar
const XPProgress = ({ currentXP, levelXP, level }: { currentXP: number, levelXP: number, level: number }) => {
  const progress = (currentXP / levelXP) * 100
  
  return (
    <div className="bg-white p-4 rounded-lg border shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-gray-700">Level {level} Coder</span>
        <span className="text-sm text-gray-600">{currentXP}/{levelXP} XP</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
      <div className="text-xs text-gray-600 mt-1">
        {levelXP - currentXP} XP to level {level + 1}
      </div>
    </div>
  )
}

// Daily Streak Counter
const StreakCounter = ({ days }: { days: number }) => {
  return (
    <div className="bg-gradient-to-br from-orange-100 to-red-100 p-4 rounded-lg border border-orange-300">
      <div className="text-center">
        <div className="text-3xl mb-2">🔥</div>
        <div className="text-2xl font-bold text-orange-700">{days}</div>
        <div className="text-sm text-orange-600">Day Streak</div>
        <div className="text-xs text-gray-600 mt-1">Keep learning daily!</div>
      </div>
    </div>
  )
}

export { MiniLeaderboard, AchievementUnlock, XPProgress, StreakCounter }
