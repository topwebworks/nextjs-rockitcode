'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/UserContext'

interface MentorStats {
  is_mentor: boolean
  mentor_status: string | null
  mentor_rating: number
  students_helped_this_week: number
  hours_mentored_this_week: number
  total_students_helped: number
  total_hours_mentored: number
  rank_position: number | null
  mentor_active_status: string
}

export default function ProfileMentorStats() {
  const { user } = useAuth()
  const [stats, setStats] = useState<MentorStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchMentorStats()
    }
  }, [user])

  const fetchMentorStats = async () => {
    try {
      // Get mentor data
      const response = await fetch('/api/mentors/apply', { method: 'GET' })
      const data = await response.json()

      if (response.ok) {
        // Get rank position if they're an active mentor
        let rankPosition = null
        if (data.is_mentor && data.mentor_status === 'approved') {
          const rankResponse = await fetch('/api/mentors/rank')
          const rankData = await rankResponse.json()
          if (rankResponse.ok) {
            rankPosition = rankData.rank_position
          }
        }

        setStats({
          is_mentor: data.is_mentor || false,
          mentor_status: data.mentor_status,
          mentor_rating: data.mentor_rating || 0,
          students_helped_this_week: data.students_helped_this_week || 0,
          hours_mentored_this_week: data.hours_mentored_this_week || 0,
          total_students_helped: data.total_students_helped || 0,
          total_hours_mentored: data.total_hours_mentored || 0,
          rank_position: rankPosition,
          mentor_active_status: data.mentor_active_status || 'active'
        })
      }
    } catch (err) {
      console.error('Error fetching mentor stats:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-slate-700 rounded w-1/3"></div>
        <div className="h-20 bg-slate-700 rounded"></div>
      </div>
    )
  }

  if (!stats?.is_mentor) {
    return (
      <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <h3 className="text-lg font-medium text-white mb-2">Mentor Status</h3>
        <p className="text-slate-400">Not a mentor yet. Apply in the Mentor tab!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white">Your Mentor Stats</h3>
      
      {/* Status Card */}
      <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-400">Status</p>
            <p className={`font-medium ${
              stats.mentor_status === 'approved' ? 'text-green-400' : 
              stats.mentor_status === 'pending' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {stats.mentor_status === 'approved' ? 'Active Mentor ✅' : 
               stats.mentor_status === 'pending' ? 'Pending Review ⏳' : 'Not Active'}
            </p>
          </div>
          {stats.rank_position && (
            <div>
              <p className="text-sm text-slate-400">Leaderboard Rank</p>
              <p className="font-medium text-blue-400">#{stats.rank_position}</p>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      {stats.mentor_status === 'approved' && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.students_helped_this_week}</div>
            <div className="text-xs text-slate-400">Students This Week</div>
          </div>
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 text-center">
            <div className="text-2xl font-bold text-green-400">
              {(stats.hours_mentored_this_week || 0).toFixed(1)}
            </div>
            <div className="text-xs text-slate-400">Hours This Week</div>
          </div>
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 text-center">
            <div className="text-2xl font-bold text-purple-400">{stats.total_students_helped}</div>
            <div className="text-xs text-slate-400">Total Students</div>
          </div>
          <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50 text-center">
            <div className="text-2xl font-bold text-orange-400">
              {(stats.total_hours_mentored || 0).toFixed(1)}
            </div>
            <div className="text-xs text-slate-400">Total Hours</div>
          </div>
        </div>
      )}

      {/* Rating */}
      {stats.mentor_status === 'approved' && (
        <div className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Mentor Rating</p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 text-lg">★</span>
                <span className="text-white font-medium">{stats.mentor_rating.toFixed(1)}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-slate-400">Active Status</p>
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                stats.mentor_active_status === 'active' ? 'bg-green-500/20 text-green-400' :
                stats.mentor_active_status === 'away' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {stats.mentor_active_status}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
