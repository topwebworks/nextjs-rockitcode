'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useAuth } from '@/contexts/UserContext'
import type { Database } from '@/types/database'

interface MentorApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function MentorApplicationModal({ isOpen, onClose }: MentorApplicationModalProps) {
  const [formData, setFormData] = useState({
    mentorBio: '',
    mentorSpecialties: '',
    applicationReason: '',
    discordUsername: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const { user } = useAuth()
  const supabase = createClientComponentClient<Database>()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      setError('Please sign in to apply as a mentor')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/mentors/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mentorBio: formData.mentorBio,
          mentorSpecialties: formData.mentorSpecialties.split(',').map(s => s.trim()).filter(Boolean),
          applicationReason: formData.applicationReason,
          discordUsername: formData.discordUsername
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setFormData({
          mentorBio: '',
          mentorSpecialties: '',
          applicationReason: '',
          discordUsername: ''
        })
      }, 2000)

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {success ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-2">Application Submitted!</h3>
            <p className="text-slate-300">
              Thank you for applying! We'll review your application and get back to you soon.
            </p>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Apply to Become a Mentor</h2>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            {!user && (
              <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <p className="text-yellow-300 text-sm">
                  Please sign in to apply as a mentor. You'll need to authenticate to submit your application.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Discord Username *
                </label>
                <input
                  type="text"
                  name="discordUsername"
                  value={formData.discordUsername}
                  onChange={handleChange}
                  placeholder="your_username"
                  required
                  className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Your Discord username so we can connect with you
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Mentor Bio *
                </label>
                <textarea
                  name="mentorBio"
                  value={formData.mentorBio}
                  onChange={handleChange}
                  placeholder="Tell us about your coding experience, what you're passionate about, and how you'd like to help students..."
                  required
                  rows={4}
                  className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Specialties *
                </label>
                <input
                  type="text"
                  name="mentorSpecialties"
                  value={formData.mentorSpecialties}
                  onChange={handleChange}
                  placeholder="JavaScript, React, Node.js, Python, Web Development..."
                  required
                  className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
                <p className="text-xs text-slate-400 mt-1">
                  Separate multiple specialties with commas
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Why do you want to become a mentor? *
                </label>
                <textarea
                  name="applicationReason"
                  value={formData.applicationReason}
                  onChange={handleChange}
                  placeholder="Share your motivation for mentoring and how you plan to contribute to the community..."
                  required
                  rows={4}
                  className="w-full p-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none"
                />
              </div>

              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading || !user}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
