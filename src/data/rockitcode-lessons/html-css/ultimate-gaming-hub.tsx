'use client'

import { useState, useEffect } from 'react'

// Global Leaderboard System
const GlobalLeaderboard = () => {
  const [leaderboardData] = useState([
    { 
      rank: 1, 
      name: 'CodeMaster2024', 
      level: 15, 
      totalXP: 18420, 
      streak: 25, 
      badges: ['🏆', '⚡', '🎯', '🧩', '🎨', '⚔️'],
      recentActivity: 'Defeated HTML Overlord',
      country: '🇺🇸'
    },
    { 
      rank: 2, 
      name: 'HTMLHero', 
      level: 13, 
      totalXP: 15890, 
      streak: 18, 
      badges: ['🥇', '🎨', '💻', '🔥'],
      recentActivity: 'CSS Color Master',
      country: '🇨🇦'
    },
    { 
      rank: 3, 
      name: 'WebWizard', 
      level: 12, 
      totalXP: 14200, 
      streak: 22, 
      badges: ['🧙‍♂️', '⚡', '🎯'],
      recentActivity: 'Layout Racing Champion',
      country: '🇬🇧'
    },
    { 
      rank: 4, 
      name: 'CSSNinja', 
      level: 11, 
      totalXP: 13100, 
      streak: 15, 
      badges: ['🥷', '🎨', '⚔️'],
      recentActivity: 'Selector Battle Victory',
      country: '🇯🇵'
    },
    { 
      rank: 5, 
      name: 'PixelPioneer', 
      level: 10, 
      totalXP: 12750, 
      streak: 12, 
      badges: ['🚀', '💎', '🎯'],
      recentActivity: 'Perfect Color Match',
      country: '🇦🇺'
    },
    {
      rank: 847,
      name: 'You',
      level: 3,
      totalXP: 2450,
      streak: 5,
      badges: ['🎉', '📝'],
      recentActivity: 'Learning HTML basics',
      country: '🌍'
    }
  ])

  const [filter, setFilter] = useState('global')
  const [timeframe, setTimeframe] = useState('alltime')

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 flex items-center gap-2">
          🏆 Global Coding Champions
        </h2>
        <div className="flex gap-2">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-1 border border-purple-300 rounded bg-white text-sm"
          >
            <option value="global">🌍 Global</option>
            <option value="friends">👥 Friends</option>
            <option value="country">🏁 Country</option>
            <option value="beginner">🎯 Beginners</option>
          </select>
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-1 border border-purple-300 rounded bg-white text-sm"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="alltime">All Time</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {leaderboardData.slice(0, 10).map((player) => (
          <div
            key={player.rank}
            className={`flex items-center justify-between p-4 rounded-lg transition-all ${
              player.name === 'You' 
                ? 'bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-400 shadow-lg' 
                : 'bg-white border border-gray-200 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-4">
              {/* Rank Badge */}
              <div className={`font-bold text-xl min-w-[3rem] text-center ${
                player.rank === 1 ? 'text-yellow-600' :
                player.rank === 2 ? 'text-gray-500' :
                player.rank === 3 ? 'text-orange-600' : 'text-gray-700'
              }`}>
                {player.rank <= 3 ? ['🥇', '🥈', '🥉'][player.rank - 1] : `#${player.rank}`}
              </div>

              {/* Player Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-lg">{player.name}</span>
                  <span className="text-lg">{player.country}</span>
                  {player.name === 'You' && (
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">YOU</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>Level {player.level}</span>
                  <span>🔥 {player.streak} days</span>
                  <span className="truncate">{player.recentActivity}</span>
                </div>
                <div className="flex gap-1 mt-1">
                  {player.badges.map((badge, i) => (
                    <span key={i} className="text-lg">{badge}</span>
                  ))}
                </div>
              </div>

              {/* XP Score */}
              <div className="text-right">
                <div className="text-2xl font-bold text-purple-700">
                  {player.totalXP.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">XP</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Your Progress Section */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-300 rounded-lg">
        <h3 className="font-bold text-blue-800 mb-3">📈 Your Championship Progress</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-700">2,450</div>
            <div className="text-sm text-gray-600">Total XP</div>
            <div className="text-xs text-gray-500">+650 to Level 4</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-700">5</div>
            <div className="text-sm text-gray-600">Day Streak</div>
            <div className="text-xs text-gray-500">Keep it up! 🔥</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-700">2</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
            <div className="text-xs text-gray-500">18 more available</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="text-sm text-gray-600 mb-2">Climb {847 - 4} more ranks to reach top 5!</div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: '15%' }} />
          </div>
        </div>
      </div>
    </div>
  )
}

// Mega Achievement System
const MegaAchievementSystem = () => {
  const [unlockedAchievements] = useState(['welcome', 'first-html', 'first-css'])
  
  const achievementCategories = [
    {
      name: 'Learning Milestones',
      icon: '📚',
      achievements: [
        { id: 'welcome', name: 'Welcome Rookie!', description: 'Started your coding journey', icon: '🎉', xp: 50, unlocked: true },
        { id: 'first-html', name: 'HTML Explorer', description: 'Created your first HTML element', icon: '📝', xp: 100, unlocked: true },
        { id: 'first-css', name: 'Style Apprentice', description: 'Applied your first CSS style', icon: '🎨', xp: 100, unlocked: true },
        { id: 'first-page', name: 'Web Creator', description: 'Built your first complete web page', icon: '🌐', xp: 200, unlocked: false },
        { id: 'responsive-master', name: 'Mobile Wizard', description: 'Mastered responsive design', icon: '📱', xp: 500, unlocked: false }
      ]
    },
    {
      name: 'Gaming Achievements',
      icon: '🎮',
      achievements: [
        { id: 'puzzle-solver', name: 'Puzzle Solver', description: 'Completed 5 code puzzles', icon: '🧩', xp: 200, unlocked: false },
        { id: 'speed-demon', name: 'Speed Demon', description: 'Completed challenge in under 30s', icon: '⚡', xp: 300, unlocked: false },
        { id: 'color-master', name: 'Color Master', description: 'Perfect color mixing accuracy', icon: '🎨', xp: 250, unlocked: false },
        { id: 'layout-racer', name: 'Layout Racer', description: 'Won CSS layout speed race', icon: '🏎️', xp: 400, unlocked: false },
        { id: 'boss-slayer', name: 'Boss Slayer', description: 'Defeated the HTML Overlord', icon: '👹', xp: 1000, unlocked: false }
      ]
    },
    {
      name: 'Social & Competitive',
      icon: '🏆',
      achievements: [
        { id: 'leaderboard-top10', name: 'Elite Coder', description: 'Reached top 10 on leaderboard', icon: '🥇', xp: 500, unlocked: false },
        { id: 'streak-master', name: 'Streak Master', description: '30-day learning streak', icon: '🔥', xp: 750, unlocked: false },
        { id: 'helper', name: 'Community Helper', description: 'Helped 10 other learners', icon: '🤝', xp: 300, unlocked: false },
        { id: 'perfectionist', name: 'Perfectionist', description: 'Completed lesson with 100% score', icon: '💎', xp: 400, unlocked: false },
        { id: 'champion', name: 'Grand Champion', description: 'Won tournament championship', icon: '👑', xp: 2000, unlocked: false }
      ]
    }
  ]

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-6 rounded-xl border border-yellow-300">
      <h2 className="text-2xl font-bold text-yellow-800 mb-6 flex items-center gap-2">
        🏅 Achievement Gallery
      </h2>

      <div className="space-y-6">
        {achievementCategories.map((category) => (
          <div key={category.name}>
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">{category.icon}</span>
              {category.name}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {category.achievements.map((achievement) => {
                const isUnlocked = unlockedAchievements.includes(achievement.id)
                return (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg text-center transition-all transform hover:scale-105 ${
                      isUnlocked
                        ? 'bg-white border-2 border-yellow-400 shadow-lg'
                        : 'bg-gray-100 border border-gray-300 opacity-60'
                    }`}
                  >
                    <div className="text-4xl mb-2">{isUnlocked ? achievement.icon : '🔒'}</div>
                    <div className="font-semibold text-sm">{achievement.name}</div>
                    <div className="text-xs text-gray-600 mt-1 min-h-[2rem]">{achievement.description}</div>
                    {isUnlocked ? (
                      <div className="text-xs text-yellow-600 font-semibold mt-2">
                        +{achievement.xp} XP ✨
                      </div>
                    ) : (
                      <div className="text-xs text-gray-500 mt-2">
                        🔒 Locked
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border border-yellow-400 rounded-lg">
        <div className="text-center">
          <div className="text-lg font-bold text-yellow-800 mb-2">Achievement Progress</div>
          <div className="text-3xl font-bold text-yellow-700">3/20</div>
          <div className="text-sm text-gray-600">Achievements Unlocked</div>
          <div className="text-xs text-gray-500 mt-1">Keep learning to unlock more badges!</div>
        </div>
      </div>
    </div>
  )
}

// Weekly Challenges Hub
const WeeklyChallengesHub = () => {
  const [selectedChallenge, setSelectedChallenge] = useState<any>(null)

  const weeklyEvents = [
    {
      id: 'speed-week',
      title: '⚡ Speed Coding Week',
      description: 'Complete challenges faster than ever before!',
      duration: '6 days left',
      difficulty: 'All Levels',
      reward: '2X XP + Lightning Badge',
      participants: 1247,
      color: 'from-yellow-400 to-orange-500'
    },
    {
      id: 'color-challenge',
      title: '🎨 Color Mastery Challenge',
      description: 'Perfect your CSS color mixing skills',
      duration: '3 days left',
      difficulty: 'Beginner',
      reward: 'Rainbow Badge + 1000 XP',
      participants: 892,
      color: 'from-pink-400 to-purple-500'
    },
    {
      id: 'boss-rush',
      title: '👹 Boss Rush Tournament',
      description: 'Face all bosses in ultimate challenge mode',
      duration: '2 days left',
      difficulty: 'Expert',
      reward: 'Champion Crown + 5000 XP',
      participants: 234,
      color: 'from-red-400 to-purple-600'
    }
  ]

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl border border-green-300">
      <h2 className="text-2xl font-bold text-green-800 mb-6 flex items-center gap-2">
        🌟 Weekly Challenge Hub
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {weeklyEvents.map((event) => (
          <div
            key={event.id}
            className={`bg-gradient-to-br ${event.color} text-white p-6 rounded-xl shadow-lg transform transition hover:scale-105 cursor-pointer`}
            onClick={() => setSelectedChallenge(event)}
          >
            <h3 className="text-xl font-bold mb-2">{event.title}</h3>
            <p className="text-sm opacity-90 mb-4">{event.description}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>⏰ Duration:</span>
                <span className="font-semibold">{event.duration}</span>
              </div>
              <div className="flex justify-between">
                <span>🎯 Difficulty:</span>
                <span className="font-semibold">{event.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span>👥 Participants:</span>
                <span className="font-semibold">{event.participants.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-white bg-opacity-20 rounded-lg">
              <div className="text-sm font-semibold">🏆 Reward:</div>
              <div className="text-sm">{event.reward}</div>
            </div>

            <button className="w-full mt-4 bg-white text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition">
              Join Challenge
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-white border border-green-300 rounded-lg">
        <h3 className="font-bold text-green-800 mb-3">📅 Upcoming Events</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span>🚀 HTML Mastery Marathon</span>
            <span className="text-gray-600">Starts in 5 days</span>
          </div>
          <div className="flex justify-between items-center">
            <span>🎨 CSS Animation Festival</span>
            <span className="text-gray-600">Starts in 12 days</span>
          </div>
          <div className="flex justify-between items-center">
            <span>👑 Grand Championship Final</span>
            <span className="text-gray-600">Starts in 19 days</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Learning Analytics Dashboard
const LearningAnalytics = () => {
  const [timeframe, setTimeframe] = useState('week')

  const analyticsData = {
    week: {
      lessonsCompleted: 3,
      timeSpent: '4h 32m',
      xpGained: 850,
      streak: 5,
      accuracy: 87,
      improvement: '+15%'
    },
    month: {
      lessonsCompleted: 12,
      timeSpent: '18h 45m',
      xpGained: 3420,
      streak: 15,
      accuracy: 91,
      improvement: '+23%'
    }
  }

  const current = analyticsData[timeframe as keyof typeof analyticsData]

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-300">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-800 flex items-center gap-2">
          📊 Learning Analytics
        </h2>
        <select 
          value={timeframe} 
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-3 py-1 border border-indigo-300 rounded bg-white"
        >
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">📚</div>
            <div>
              <div className="text-2xl font-bold text-indigo-700">{current.lessonsCompleted}</div>
              <div className="text-sm text-gray-600">Lessons Completed</div>
            </div>
          </div>
          <div className="text-xs text-green-600 font-semibold">{current.improvement} vs last {timeframe}</div>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">⏱️</div>
            <div>
              <div className="text-2xl font-bold text-indigo-700">{current.timeSpent}</div>
              <div className="text-sm text-gray-600">Time Spent Learning</div>
            </div>
          </div>
          <div className="text-xs text-blue-600 font-semibold">Consistent daily practice!</div>
        </div>

        <div className="bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">⚡</div>
            <div>
              <div className="text-2xl font-bold text-indigo-700">{current.xpGained}</div>
              <div className="text-sm text-gray-600">XP Gained</div>
            </div>
          </div>
          <div className="text-xs text-purple-600 font-semibold">Level up incoming!</div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-bold text-indigo-800 mb-3">🎯 Accuracy Score</h3>
          <div className="relative">
            <div className="text-4xl font-bold text-indigo-700 mb-2">{current.accuracy}%</div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-4 rounded-full transition-all duration-500"
                style={{ width: `${current.accuracy}%` }}
              />
            </div>
            <div className="text-sm text-gray-600 mt-2">Great accuracy! Keep it up! 🎉</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border">
          <h3 className="font-bold text-indigo-800 mb-3">🔥 Learning Streak</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-orange-600 mb-2">{current.streak}</div>
            <div className="text-sm text-gray-600">Days in a row</div>
            <div className="text-xs text-orange-600 font-semibold mt-2">
              {30 - current.streak} more days for Streak Master badge!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function UltimateGamingHub() {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white p-8 rounded-xl text-center">
        <h1 className="text-5xl font-bold mb-4">🏆 Ultimate Gaming Hub</h1>
        <p className="text-xl text-purple-100 mb-2">
          The world's most addictive coding learning platform
        </p>
        <p className="text-purple-200">
          Compete globally • Unlock achievements • Master through play
        </p>
      </div>

      {/* Global Leaderboard */}
      <GlobalLeaderboard />

      {/* Analytics Dashboard */}
      <LearningAnalytics />

      {/* Achievement System */}
      <MegaAchievementSystem />

      {/* Weekly Challenges */}
      <WeeklyChallengesHub />

      {/* Quick Access Gaming Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 text-white p-6 rounded-xl text-center transform transition hover:scale-105 cursor-pointer">
          <div className="text-4xl mb-3">🧩</div>
          <h3 className="font-bold mb-2">Speed Puzzles</h3>
          <p className="text-sm opacity-90">Race against time!</p>
        </div>
        
        <div className="bg-gradient-to-br from-green-400 to-blue-500 text-white p-6 rounded-xl text-center transform transition hover:scale-105 cursor-pointer">
          <div className="text-4xl mb-3">🎨</div>
          <h3 className="font-bold mb-2">Color Mixing</h3>
          <p className="text-sm opacity-90">Master CSS colors!</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-400 to-pink-500 text-white p-6 rounded-xl text-center transform transition hover:scale-105 cursor-pointer">
          <div className="text-4xl mb-3">⚔️</div>
          <h3 className="font-bold mb-2">Selector Battles</h3>
          <p className="text-sm opacity-90">Fight CSS monsters!</p>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-6 rounded-xl text-center transform transition hover:scale-105 cursor-pointer">
          <div className="text-4xl mb-3">👹</div>
          <h3 className="font-bold mb-2">Boss Battles</h3>
          <p className="text-sm opacity-90">Epic challenges!</p>
        </div>
      </div>

      {/* Global Stats */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-xl border">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">🌍 Global Platform Stats</h2>
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">142,847</div>
            <div className="text-sm text-gray-600">Active Learners</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">2.8M</div>
            <div className="text-sm text-gray-600">Challenges Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">45,892</div>
            <div className="text-sm text-gray-600">Badges Earned</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">99.7%</div>
            <div className="text-sm text-gray-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: "Ultimate Gaming Hub: The World's Best Coding Learning Platform",
  description: "Global leaderboards, achievements, analytics, weekly tournaments and addictive learning games all in one epic hub!",
  estimatedTime: 60,
  difficulty: "all-levels" as const,
  technologies: ["HTML5", "CSS3", "JavaScript", "Gaming"],
  gameElements: ["global-leaderboards", "achievement-system", "analytics", "tournaments", "social-features"],
  objectives: [
    "Compete with learners worldwide on global leaderboards",
    "Unlock comprehensive achievement systems and badges", 
    "Track learning progress with detailed analytics",
    "Participate in weekly challenges and tournaments",
    "Experience the world's most engaging coding education"
  ]
}
