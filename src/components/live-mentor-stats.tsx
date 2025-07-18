'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface MentorStats {
  total_active_mentors: number
  total_hours_this_week: number
  total_students_helped_this_month: number
}

export default function LiveMentorStats() {
  const [stats, setStats] = useState<MentorStats>({
    total_active_mentors: 0,
    total_hours_this_week: 0,
    total_students_helped_this_month: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      if (!supabase) {
        console.error('Supabase client not available')
        return
      }

      const { data, error } = await supabase.rpc('get_mentor_stats')
      
      if (error) {
        console.error('Error fetching mentor stats:', error)
        return
      }

      if (data && data[0]) {
        setStats(data[0])
      }
    } catch (err) {
      console.error('Error fetching mentor stats:', err)
    } finally {
      setLoading(false)
    }
  }

  const formatNumber = (num: number) => {
    if (num === 0) return '0'
    return num >= 100 ? `${Math.floor(num / 100) * 100}+` : `${num}+`
  }

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center p-8 backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-xl">
            <div className="text-4xl font-light text-slate-400 mb-3 animate-pulse">--</div>
            <div className="text-lg text-white mb-2">Loading...</div>
            <div className="text-sm text-slate-400">Fetching data</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 mb-12">
      <div className="text-center p-8 backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-xl">
        <div className="text-4xl font-light text-blue-400 mb-3">
          {formatNumber(stats.total_hours_this_week)}
        </div>
        <div className="text-lg text-white mb-2">Hours Per Week</div>
        <div className="text-sm text-slate-400">Collective mentoring time</div>
      </div>
      <div className="text-center p-8 backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-xl">
        <div className="text-4xl font-light text-green-400 mb-3">
          {formatNumber(stats.total_active_mentors)}
        </div>
        <div className="text-lg text-white mb-2">Active Mentors</div>
        <div className="text-sm text-slate-400">Regular contributors</div>
      </div>
      <div className="text-center p-8 backdrop-blur-xl bg-white/[0.04] border border-white/[0.08] rounded-xl">
        <div className="text-4xl font-light text-purple-400 mb-3">
          {formatNumber(stats.total_students_helped_this_month)}
        </div>
        <div className="text-lg text-white mb-2">Students Helped</div>
        <div className="text-sm text-slate-400">This month</div>
      </div>
    </div>
  )
}
