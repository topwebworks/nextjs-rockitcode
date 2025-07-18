'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAuth } from '@/contexts/UserContext'
import type { Database } from '@/types/database'

export default function MentorSettings() {
  const { user } = useAuth()
  const supabase = createClientComponentClient<Database>()
  
  const [mentorData, setMentorData] = useState({
    is_mentor: false,
    mentor_status: null as string | null,
    mentor_bio: '',
    mentor_specialties: [] as string[],
    mentor_application_reason: '',
    discord_username: '',
    mentor_rating: 0,
    students_helped_this_week: 0,
    hours_mentored_this_week: 0,
    total_students_helped: 0,
    total_hours_mentored: 0,
    mentor_active_status: 'active'
  })
  
  const [formData, setFormData] = useState({
    mentorBio: '',
    mentorSpecialties: '',
    applicationReason: '',
    discordUsername: ''
  })
  
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Load mentor data on component mount
  useEffect(() => {
    if (user) {
      loadMentorData()
    }
  }, [user])

  const loadMentorData = async () => {
    try {
      // Use the API endpoint which handles missing profiles properly
      const response = await fetch('/api/mentors/apply', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to load mentor data')
      }

      const data = await response.json()

      setMentorData({
        is_mentor: data.is_mentor || false,
        mentor_status: data.mentor_status,
        mentor_bio: data.mentor_bio || '',
        mentor_specialties: data.mentor_specialties || [],
        mentor_application_reason: data.mentor_application_reason || '',
        discord_username: data.discord_username || '',
        mentor_rating: data.mentor_rating || 0,
        students_helped_this_week: data.students_helped_this_week || 0,
        hours_mentored_this_week: data.hours_mentored_this_week || 0,
        total_students_helped: data.total_students_helped || 0,
        total_hours_mentored: data.total_hours_mentored || 0,
        mentor_active_status: data.mentor_active_status || 'active'
      })

      // Only populate form fields if not pending (to keep forms clear after submission)
      // OR if they're an approved mentor (so they can edit their profile)
      if (data.mentor_status !== 'pending' || (data.is_mentor && data.mentor_status === 'approved')) {
        setFormData({
          mentorBio: data.mentor_bio || '',
          mentorSpecialties: (data.mentor_specialties || []).join(', '),
          applicationReason: data.mentor_application_reason || '',
          discordUsername: data.discord_username || ''
        })
      }
    } catch (err) {
      console.error('Error loading mentor data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load mentor data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      // Determine if this is an application or profile update
      const isProfileUpdate = mentorData.is_mentor && mentorData.mentor_status === 'approved'
      const endpoint = isProfileUpdate ? '/api/mentors/update' : '/api/mentors/apply'
      
      // Prepare request body based on type
      const requestBody = isProfileUpdate 
        ? {
            mentorBio: formData.mentorBio,
            mentorSpecialties: formData.mentorSpecialties.split(',').map(s => s.trim()).filter(Boolean),
            discordUsername: formData.discordUsername
          }
        : {
            mentorBio: formData.mentorBio,
            mentorSpecialties: formData.mentorSpecialties.split(',').map(s => s.trim()).filter(Boolean),
            applicationReason: formData.applicationReason,
            discordUsername: formData.discordUsername
          }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || `Failed to ${isProfileUpdate ? 'update profile' : 'submit application'}`)
      }

      const successMessage = isProfileUpdate 
        ? 'Profile updated successfully!'
        : 'Application submitted successfully! We\'ll review it soon.'
      
      setSuccess(successMessage)
      
      // Clear form fields only for new applications, not profile updates
      if (!isProfileUpdate) {
        setFormData({
          mentorBio: '',
          mentorSpecialties: '',
          applicationReason: '',
          discordUsername: ''
        })
      }
      
      await loadMentorData() // Reload data to show updated status
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleRetireMentor = async () => {
    if (!confirm('Are you sure you want to retire as a mentor? You can reapply later if you change your mind.')) {
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/mentors/retire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ confirm: true })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to retire mentor status')
      }

      setSuccess('Successfully retired from mentoring. Thank you for your service!')
      await loadMentorData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleUpdateStats = async (studentsHelped: number, hoursSpent: number) => {
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/mentors/stats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentsHelped: studentsHelped,
          hoursLogged: hoursSpent
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update stats')
      }

      setSuccess('Stats updated successfully!')
      await loadMentorData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleStatusChange = async (newStatus: 'active' | 'away' | 'retired') => {
    if (newStatus === 'retired' && !confirm('Are you sure you want to retire? This will remove you from the leaderboard and you\'ll need to reapply to become a mentor again.')) {
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/mentors/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update status')
      }

      setSuccess(`Status updated to ${newStatus}!`)
      await loadMentorData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-slate-700 rounded w-1/4"></div>
        <div className="h-32 bg-slate-700 rounded"></div>
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
      </div>
    )
  }

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'approved': return 'text-green-400'
      case 'pending': return 'text-yellow-400'
      case 'declined': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusText = (status: string | null) => {
    switch (status) {
      case 'approved': return 'Approved ✅'
      case 'pending': return 'Pending Review ⏳'
      case 'declined': return 'Declined ❌'
      default: return 'Not Applied'
    }
  }

  return (
    <div className="space-y-6">
      {/* Messages at the top for better visibility */}
      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <p className="text-green-300 text-sm">{success}</p>
        </div>
      )}

      {/* Status Overview */}
      <div className="bg-slate-800 rounded-lg p-6 relative z-10">
        <h3 className="text-xl font-semibold text-white mb-4">Mentor Status</h3>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className={`font-medium ${getStatusColor(mentorData.mentor_status)}`}>
              {getStatusText(mentorData.mentor_status)}
            </p>
          </div>
        </div>
      </div>

      {/* Mentor Stats (if approved) */}
      {mentorData.is_mentor && mentorData.mentor_status === 'approved' && (
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Your Mentor Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{mentorData.students_helped_this_week}</div>
              <div className="text-sm text-slate-400">Students This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {(mentorData.hours_mentored_this_week || 0).toFixed(1)}
              </div>
              <div className="text-sm text-slate-400">Hours This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{mentorData.total_students_helped}</div>
              <div className="text-sm text-slate-400">Total Students</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">
                {(mentorData.total_hours_mentored || 0).toFixed(1)}
              </div>
              <div className="text-sm text-slate-400">Total Hours</div>
            </div>
          </div>

          {/* Update Stats Form */}
          <div className="border-t border-slate-700 pt-6">
            <h4 className="text-lg font-medium text-white mb-4">Update This Week's Stats</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-2">Students Helped This Week</label>
                <input
                  type="number"
                  min="0"
                  defaultValue={mentorData.students_helped_this_week}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white"
                  id="students-helped"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-2">
                  Hours Mentored This Week
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.25"
                  placeholder="1.5"
                  defaultValue={mentorData.hours_mentored_this_week}
                  className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400"
                  id="hours-mentored"
                />
              </div>
            </div>
            <button
              onClick={() => {
                const studentsEl = document.getElementById('students-helped') as HTMLInputElement
                const hoursEl = document.getElementById('hours-mentored') as HTMLInputElement
                handleUpdateStats(parseInt(studentsEl.value) || 0, parseFloat(hoursEl.value) || 0)
              }}
              disabled={submitting}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Update Stats'}
            </button>
          </div>

          {/* Status Management */}
          <div className="border-t border-slate-700 pt-6 mt-6">
            <h4 className="text-lg font-medium text-white mb-4">Mentor Status</h4>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <button
                onClick={() => handleStatusChange('active')}
                disabled={submitting}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  mentorData.mentor_active_status === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                🟢 Active
              </button>
              <button
                onClick={() => handleStatusChange('away')}
                disabled={submitting}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  mentorData.mentor_active_status === 'away'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                🟡 Away
              </button>
              <button
                onClick={() => handleStatusChange('retired')}
                disabled={submitting}
                className={`px-4 py-2 rounded text-sm font-medium transition-all ${
                  mentorData.mentor_active_status === 'retired'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                🔴 Retired
              </button>
            </div>
            <p className="text-xs text-slate-400">
              <strong>Active:</strong> Appear on leaderboard and available for mentoring<br/>
              <strong>Away:</strong> Temporarily unavailable but still a mentor<br/>
              <strong>Retired:</strong> No longer mentoring, removed from leaderboard
            </p>
          </div>
        </div>
      )}

      {/* Edit Profile Form (if approved mentor) */}
      {mentorData.is_mentor && mentorData.mentor_status === 'approved' && (
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Update Mentor Profile</h3>
          
          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Discord Username *
              </label>
              <input
                type="text"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleChange}
                placeholder="your_username"
                required
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Mentor Bio *
              </label>
              <textarea
                name="mentorBio"
                value={formData.mentorBio}
                onChange={handleChange}
                placeholder="Tell us about your coding experience and how you help students..."
                required
                rows={3}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Specialties *
              </label>
              <input
                type="text"
                name="mentorSpecialties"
                value={formData.mentorSpecialties}
                onChange={handleChange}
                placeholder="JavaScript, React, Node.js, Python, Web Development..."
                required
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-slate-400 mt-1">
                Separate multiple specialties with commas
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {submitting ? 'Updating...' : 'Update Profile'}
            </button>
          </form>
        </div>
      )}

      {/* Application Form (if not a mentor or application was declined) */}
      {(!mentorData.is_mentor || mentorData.mentor_status === 'declined') && (
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">
            {mentorData.mentor_status === 'declined' ? 'Reapply to Become a Mentor' : 'Apply to Become a Mentor'}
          </h3>
          
          {mentorData.mentor_status === 'declined' && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-yellow-300 text-sm">
                Your previous application was declined - please review your entry and try again with updated information.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmitApplication} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Discord Username *
              </label>
              <input
                type="text"
                name="discordUsername"
                value={formData.discordUsername}
                onChange={handleChange}
                placeholder="your_username"
                required
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-slate-400 mt-1">
                Your Discord username so we can connect with you
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Mentor Bio *
              </label>
              <textarea
                name="mentorBio"
                value={formData.mentorBio}
                onChange={handleChange}
                placeholder="Tell us about your coding experience, what you're passionate about, and how you'd like to help students..."
                required
                rows={3}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Specialties *
              </label>
              <input
                type="text"
                name="mentorSpecialties"
                value={formData.mentorSpecialties}
                onChange={handleChange}
                placeholder="JavaScript, React, Node.js, Python, Web Development..."
                required
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
              <p className="text-xs text-slate-400 mt-1">
                Separate multiple specialties with commas
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Why do you want to become a mentor? *
              </label>
              <textarea
                name="applicationReason"
                value={formData.applicationReason}
                onChange={handleChange}
                placeholder="Share your motivation for mentoring and how you plan to contribute to the community..."
                required
                rows={3}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      )}

      {/* Pending Application Message */}
      {mentorData.mentor_status === 'pending' && (
        <div className="bg-slate-800 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Application Under Review</h3>
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-300">
              Your mentor application is currently being reviewed. We'll update your status soon and notify you via Discord.
            </p>
          </div>
          
          {/* Show current application data */}
          <div className="mt-6 space-y-4">
            <div>
              <p className="text-sm text-slate-400">Discord Username</p>
              <p className="text-white">{mentorData.discord_username}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Bio</p>
              <p className="text-white">{mentorData.mentor_bio}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Specialties</p>
              <p className="text-white">{mentorData.mentor_specialties?.join(', ')}</p>
            </div>
            <div>
              <p className="text-sm text-slate-400">Application Reason</p>
              <p className="text-white">{mentorData.mentor_application_reason}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
