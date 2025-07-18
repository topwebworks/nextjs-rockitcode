'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/UserContext'

interface MentorCardProps {
  mentor: {
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
  isOpen: boolean
  onClose: () => void
}

interface Review {
  review_id: string
  reviewer_name: string
  reviewer_avatar: string
  rating: number
  review_text: string
  session_topic: string
  session_date: string
  thumbs_up_count: number
  created_at: string
  user_gave_thumbs_up: boolean
}

export default function MentorCard({ mentor, isOpen, onClose }: MentorCardProps) {
  const { user } = useAuth()
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [thumbsUpLoading, setThumbsUpLoading] = useState<string | null>(null)

  // Fetch reviews when modal opens
  useEffect(() => {
    if (isOpen && mentor.user_id) {
      fetchReviews()
    }
  }, [isOpen, mentor.user_id])

  const fetchReviews = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/mentors/reviews?mentorId=${mentor.user_id}&limit=5`)
      const data = await response.json()
      
      if (response.ok) {
        setReviews(data.reviews || [])
      } else {
        console.error('Failed to fetch reviews:', data.error)
      }
    } catch (error) {
      console.error('Error fetching reviews:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleThumbsUp = async (reviewId: string) => {
    if (!user || thumbsUpLoading) return

    setThumbsUpLoading(reviewId)
    try {
      const response = await fetch('/api/mentors/reviews/thumbs-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId })
      })

      const data = await response.json()
      
      if (response.ok) {
        // Update the review in state
        setReviews(prevReviews => 
          prevReviews.map(review => 
            review.review_id === reviewId 
              ? { 
                  ...review, 
                  thumbs_up_count: data.newCount,
                  user_gave_thumbs_up: data.action === 'added'
                }
              : review
          )
        )
      } else {
        alert(data.error || 'Failed to update thumbs up')
      }
    } catch (error) {
      console.error('Error updating thumbs up:', error)
      alert('Failed to update thumbs up')
    } finally {
      setThumbsUpLoading(null)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-slate-600'}`}
      >
        ⭐
      </span>
    ))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl">
        {/* Header */}
        <div className="p-6 border-b border-slate-700/50">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              {mentor.avatar_url ? (
                <img
                  src={mentor.avatar_url}
                  alt={mentor.full_name}
                  className="w-16 h-16 rounded-full border-2 border-slate-600"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-slate-700/50 flex items-center justify-center border-2 border-slate-600">
                  <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div>
                <h3 className="text-xl font-semibold text-white mb-1">
                  {mentor.full_name}
                </h3>
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span>#{mentor.rank_position} on leaderboard</span>
                  {mentor.discord_username && (
                    <>
                      <span>•</span>
                      <span>Discord: @{mentor.discord_username}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Bio */}
          {mentor.mentor_bio && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-2">About</h4>
              <p className="text-slate-300 leading-relaxed">{mentor.mentor_bio}</p>
            </div>
          )}

          {/* Specialties */}
          {mentor.mentor_specialties && mentor.mentor_specialties.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-medium text-white mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {mentor.mentor_specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="mb-6">
            <h4 className="text-lg font-medium text-white mb-3">Stats</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-blue-400">{mentor.students_helped}</div>
                <div className="text-xs text-slate-400">Students Helped</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-green-400">{mentor.hours_mentored}</div>
                <div className="text-xs text-slate-400">Hours Mentored</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-yellow-400">{mentor.mentor_rating.toFixed(1)}</div>
                <div className="text-xs text-slate-400">Average Rating</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-3 text-center">
                <div className="text-2xl font-bold text-purple-400">{mentor.review_count}</div>
                <div className="text-xs text-slate-400">Reviews</div>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div>
            <h4 className="text-lg font-medium text-white mb-3">Recent Reviews</h4>
            {loading ? (
              <div className="text-center py-4">
                <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                <p className="text-slate-400 mt-2">Loading reviews...</p>
              </div>
            ) : reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.review_id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {review.reviewer_avatar ? (
                          <img
                            src={review.reviewer_avatar}
                            alt={review.reviewer_name}
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center">
                            <span className="text-xs text-slate-300">
                              {review.reviewer_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-white">{review.reviewer_name}</p>
                          <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    
                    {review.session_topic && (
                      <p className="text-xs text-blue-300 mb-2">Session: {review.session_topic}</p>
                    )}
                    
                    {review.review_text && (
                      <p className="text-slate-300 text-sm mb-3">{review.review_text}</p>
                    )}
                    
                    {user && (
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => handleThumbsUp(review.review_id)}
                          disabled={thumbsUpLoading === review.review_id}
                          className={`flex items-center gap-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                            review.user_gave_thumbs_up
                              ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                              : 'bg-slate-600/50 text-slate-300 hover:bg-slate-600/70 border border-slate-600'
                          } ${thumbsUpLoading === review.review_id ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <span>👍</span>
                          <span>{review.thumbs_up_count}</span>
                          {thumbsUpLoading === review.review_id && (
                            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <p>No reviews yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
