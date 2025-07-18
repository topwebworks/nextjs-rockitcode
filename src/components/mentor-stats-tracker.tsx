'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '@/types/database'

interface MentorStatsTrackerProps {
  className?: string
}

export default function MentorStatsTracker({ className = '' }: MentorStatsTrackerProps) {
  const [stats, setStats] = useState({
    studentsHelped: 0,
    hoursLogged: 0
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const supabase = createClientComponentClient<Database>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/mentors/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(stats)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update stats')
      }

      setSuccess('Stats updated successfully! 🎉')
      setStats({ studentsHelped: 0, hoursLogged: 0 })
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 ${className}`}>
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-2">
          📊 Update Your Impact
        </h2>
        <p className="text-slate-300">
          Track your mentoring contributions to climb the leaderboard
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Students Helped */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            👥 Students Helped Today
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="50"
              value={stats.studentsHelped}
              onChange={(e) => setStats(prev => ({ ...prev, studentsHelped: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-white pl-12"
              placeholder="0"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
              👥
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            How many students did you help with coding questions, reviews, or guidance?
          </p>
        </div>

        {/* Hours Logged */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            ⏱️ Hours Mentored Today
          </label>
          <div className="relative">
            <input
              type="number"
              min="0"
              max="24"
              step="0.5"
              value={stats.hoursLogged}
              onChange={(e) => setStats(prev => ({ ...prev, hoursLogged: parseFloat(e.target.value) || 0 }))}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-white pl-12"
              placeholder="0.0"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
              ⏱️
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Total time spent in mentoring activities (1-on-1s, code reviews, etc.)
          </p>
        </div>

        {success && (
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <p className="text-green-400 text-sm">{success}</p>
          </div>
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || (stats.studentsHelped === 0 && stats.hoursLogged === 0)}
          className="w-full px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Updating Stats...
            </div>
          ) : (
            '📈 Update Impact Stats'
          )}
        </button>
      </form>

      <div className="mt-6 space-y-4">
        <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <h3 className="font-semibold text-blue-400 mb-2">🏆 Honor System</h3>
          <p className="text-sm text-slate-300">
            We trust our mentors to accurately report their contributions. Your honesty helps 
            maintain the integrity of our community recognition system.
          </p>
        </div>

        <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
          <h3 className="font-semibold text-purple-400 mb-2">💡 Tracking Tips</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Count meaningful interactions, not just quick answers</li>
            <li>• Include code reviews, pair programming, and career guidance</li>
            <li>• Round time to nearest 30 minutes for accuracy</li>
            <li>• Update daily for best leaderboard representation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
