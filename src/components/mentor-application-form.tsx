'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Database, MentorSpecialty } from '@/types/database'

const MENTOR_SPECIALTIES: MentorSpecialty[] = [
  'Frontend Development',
  'Backend Development', 
  'Full Stack',
  'Mobile Development',
  'DevOps',
  'UI/UX Design',
  'Data Science',
  'Machine Learning',
  'Game Development',
  'Career Guidance',
  'Interview Prep',
  'Code Review',
  'Project Planning',
  'Debugging',
  'Architecture'
]

interface MentorApplicationFormProps {
  onSuccess?: () => void
  onCancel?: () => void
}

export default function MentorApplicationForm({ onSuccess, onCancel }: MentorApplicationFormProps) {
  const [formData, setFormData] = useState({
    discordUsername: '',
    mentorBio: '',
    specialties: [] as string[],
    applicationReason: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const supabase = createClientComponentClient<Database>()

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/mentors/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit application')
      }

      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Become a Mentor
          </h2>
          <p className="text-slate-300">
            Join our community of mentors and help shape the next generation of developers
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Discord Username */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Discord Username *
            </label>
            <input
              type="text"
              value={formData.discordUsername}
              onChange={(e) => setFormData(prev => ({ ...prev, discordUsername: e.target.value }))}
              placeholder="username#1234"
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white"
              required
            />
            <p className="text-xs text-slate-400 mt-1">
              We'll use Discord for mentor coordination and communication
            </p>
          </div>

          {/* Mentor Bio */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Mentor Bio *
            </label>
            <textarea
              value={formData.mentorBio}
              onChange={(e) => setFormData(prev => ({ ...prev, mentorBio: e.target.value }))}
              placeholder="Tell us about your experience, background, and what makes you passionate about mentoring..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white resize-none"
              required
            />
          </div>

          {/* Specialties */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Areas of Expertise * (Select at least 2)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {MENTOR_SPECIALTIES.map((specialty) => (
                <button
                  key={specialty}
                  type="button"
                  onClick={() => handleSpecialtyToggle(specialty)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    formData.specialties.includes(specialty)
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-slate-800/50 text-slate-300 border-slate-600 hover:bg-slate-700/50'
                  } border`}
                >
                  {specialty}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Selected: {formData.specialties.length} / {MENTOR_SPECIALTIES.length}
            </p>
          </div>

          {/* Application Reason */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Why do you want to be a mentor? *
            </label>
            <textarea
              value={formData.applicationReason}
              onChange={(e) => setFormData(prev => ({ ...prev, applicationReason: e.target.value }))}
              placeholder="Share your motivation for mentoring and how you plan to contribute to our community..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-white resize-none"
              required
            />
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || formData.specialties.length < 2}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </div>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
          <h3 className="font-semibold text-blue-400 mb-2">What happens next?</h3>
          <ul className="text-sm text-slate-300 space-y-1">
            <li>• Your application will be reviewed by our team</li>
            <li>• We'll reach out via Discord for a brief chat</li>
            <li>• Approved mentors get access to mentor tools and leaderboards</li>
            <li>• Start helping students and track your impact!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
