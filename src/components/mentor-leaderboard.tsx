'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import MentorCard from './mentor-card'
import type { Database, MentorProfile } from '@/types/database'

interface MentorLeaderboardProps {
  className?: string
}

interface LeaderboardMentor extends MentorProfile {
  rank: number
}

interface ApiMentor {
  user_id: string
  full_name: string
  username: string
  avatar_url: string
  discord_username: string
  mentor_bio: string
  mentor_specialties: string[]
  students_helped: number
  hours_mentored: number
  mentor_rating: number
  review_count: number
  mentor_active_status: string
  rank_position: number
}

const PERIOD_OPTIONS = [
  { value: 'today', label: 'Today', icon: '⚡' },
  { value: 'weekly', label: 'This Week', icon: '📅' },
  { value: 'monthly', label: 'This Month', icon: '📊' },
  { value: 'allTime', label: 'All Time', icon: '🏆' }
]

export default function MentorLeaderboard({ className = '' }: MentorLeaderboardProps) {
  const [mentors, setMentors] = useState<ApiMentor[]>([])
  const [period, setPeriod] = useState('today')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedMentor, setSelectedMentor] = useState<ApiMentor | null>(null)

  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    fetchLeaderboard()
  }, [period])

  const fetchLeaderboard = async () => {
    try {
      setLoading(true)
      setError('')

      // Try the RPC function first
      let { data: mentors, error } = await supabase
        .rpc('get_mentor_leaderboard', {
          period_type: period === 'allTime' ? 'all_time' : period,
          limit_count: 20 // Top 20 mentors only
        })

      // If RPC function doesn't exist, fall back to direct query
      if (error && error.message?.includes('Could not find the function')) {
        console.log('RPC function not found, using fallback query...')
        
        const { data: fallbackData, error: fallbackError } = await supabase
          .from('user_profiles')
          .select(`
            user_id,
            full_name,
            username,
            avatar_url,
            discord_username,
            mentor_bio,
            mentor_specialties,
            total_students_helped,
            total_hours_mentored,
            mentor_rating,
            mentor_active_status
          `)
          .eq('is_mentor', true)
          .eq('mentor_status', 'approved')
          .in('mentor_active_status', ['active', 'away'])
          .order('total_students_helped', { ascending: false })
          .limit(20)

        if (fallbackError) {
          throw new Error(fallbackError.message || 'Failed to fetch leaderboard')
        }

        // Transform fallback data to match expected format
        mentors = fallbackData?.map((mentor, index) => ({
          ...mentor,
          students_helped: mentor.total_students_helped || 0,
          hours_mentored: mentor.total_hours_mentored || 0,
          review_count: 0, // We don't have this in the fallback
          rank_position: index + 1
        })) || []
      } else if (error) {
        throw new Error(error.message || 'Failed to fetch leaderboard')
      }

      setMentors(mentors || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${rank}`
    }
  }

  const getSpecialtyBadges = (specialties: string[]) => {
    return specialties.slice(0, 3).map((specialty, index) => (
      <span
        key={index}
        className="px-1 sm:px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full border border-blue-500/30"
      >
        {specialty}
      </span>
    ))
  }

  return (
    <div className={`bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-3 sm:p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
        <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          🏆 Mentor Leaderboard
        </h2>
        
        <div className="flex flex-wrap gap-1 sm:gap-2">
          {PERIOD_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => setPeriod(option.value)}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                period === option.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50'
              }`}
            >
              <span className="hidden sm:inline">{option.icon} </span>{option.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400">{error}</p>
          <button
            onClick={fetchLeaderboard}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : mentors.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <p className="text-slate-400">No mentors found for this period</p>
          <p className="text-sm text-slate-500 mt-2">Be the first to help students and appear on the leaderboard!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {mentors.map((mentor) => (
            <div
              key={mentor.user_id}
              className={`p-3 sm:p-4 rounded-xl border transition-all hover:bg-slate-800/30 cursor-pointer ${
                mentor.rank_position <= 3
                  ? 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30'
                  : 'bg-slate-800/20 border-slate-600/30'
              }`}
              onClick={() => setSelectedMentor(mentor)}
            >
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Rank */}
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-slate-700/50 rounded-full flex items-center justify-center font-bold text-sm sm:text-lg">
                  {getRankIcon(mentor.rank_position)}
                </div>

                {/* Avatar */}
                <div className="flex-shrink-0">
                  {mentor.avatar_url ? (
                    <img
                      src={mentor.avatar_url}
                      alt={mentor.full_name || mentor.username || 'Mentor'}
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-slate-600"
                    />
                  ) : (
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg">
                      {(mentor.full_name || mentor.username || 'M')[0].toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                    <h3 className="font-semibold text-white truncate text-sm sm:text-base">
                      {mentor.full_name || mentor.username || 'Anonymous Mentor'}
                    </h3>
                    {mentor.discord_username && (
                      <span className="text-xs text-blue-400 bg-blue-600/20 px-1 sm:px-2 py-1 rounded-full hidden sm:inline">
                        @{mentor.discord_username}
                      </span>
                    )}
                    {/* Status Badge */}
                    <span className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full ${
                      mentor.mentor_active_status === 'active' 
                        ? 'bg-green-600/20 text-green-400' 
                        : mentor.mentor_active_status === 'away'
                        ? 'bg-yellow-600/20 text-yellow-400'
                        : 'bg-slate-600/20 text-slate-400'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        mentor.mentor_active_status === 'active' 
                          ? 'bg-green-400' 
                          : mentor.mentor_active_status === 'away'
                          ? 'bg-yellow-400'
                          : 'bg-slate-400'
                      }`}></div>
                      <span className="hidden sm:inline">
                        {mentor.mentor_active_status === 'active' && 'Active'}
                        {mentor.mentor_active_status === 'away' && 'Away'}
                        {mentor.mentor_active_status === 'inactive' && 'Inactive'}
                      </span>
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-1 sm:mb-2">
                    {getSpecialtyBadges(mentor.mentor_specialties || [])}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-400">
                    <span>⭐ {mentor.mentor_rating.toFixed(1)}</span>
                    <span>👥 {mentor.students_helped}</span>
                    <span>⏱️ {(mentor.hours_mentored || 0).toFixed(1)}h</span>
                    <span className="hidden sm:inline">💬 {mentor.review_count} reviews</span>
                  </div>
                </div>

                {/* View Card Button */}
                <div className="flex-shrink-0">
                  <button className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 rounded-lg text-xs sm:text-sm transition-colors">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mentor Card Modal */}
      {selectedMentor && (
        <MentorCard
          mentor={selectedMentor}
          isOpen={!!selectedMentor}
          onClose={() => setSelectedMentor(null)}
        />
      )}
    </div>
  )
}
