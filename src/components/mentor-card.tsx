'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
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
  const [mounted, setMounted] = useState(false)
  
  // Review form state
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    reviewText: '',
    sessionTopic: '',
    sessionDate: ''
  })

  // Ensure we're on the client side before rendering portal
  useEffect(() => {
    setMounted(true)
  }, [])

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

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      alert('Please sign in to leave a review')
      return
    }

    if (user.id === mentor.user_id) {
      alert('You cannot review yourself')
      return
    }

    setReviewSubmitting(true)
    try {
      const response = await fetch('/api/mentors/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mentorId: mentor.user_id,
          rating: reviewForm.rating,
          reviewText: reviewForm.reviewText.trim() || null,
          sessionTopic: reviewForm.sessionTopic.trim() || null,
          sessionDate: reviewForm.sessionDate || null
        })
      })

      const data = await response.json()
      
      if (response.ok) {
        // Reset form and hide it
        setReviewForm({
          rating: 5,
          reviewText: '',
          sessionTopic: '',
          sessionDate: ''
        })
        setShowReviewForm(false)
        
        // Refresh reviews
        fetchReviews()
        
        alert('Review submitted successfully!')
      } else {
        alert(data.error || 'Failed to submit review')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Failed to submit review')
    } finally {
      setReviewSubmitting(false)
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

  const renderInteractiveStars = (rating: number, onChange: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {Array.from({ length: 5 }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onChange(i + 1)}
            className={`text-2xl transition-colors hover:text-yellow-300 ${
              i < rating ? 'text-yellow-400' : 'text-slate-600 hover:text-yellow-500'
            }`}
          >
            ⭐
          </button>
        ))}
      </div>
    )
  }

  if (!isOpen || !mounted) return null

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-2 sm:p-4">
      <div className="relative w-full max-w-2xl max-h-[95vh] overflow-hidden bg-slate-800/95 backdrop-blur-sm border border-slate-700/50 rounded-xl">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-700/50">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
              {mentor.avatar_url ? (
                <img
                  src={mentor.avatar_url}
                  alt={mentor.full_name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-slate-600 flex-shrink-0"
                />
              ) : (
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-slate-700/50 flex items-center justify-center border-2 border-slate-600 flex-shrink-0">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 truncate">
                  {mentor.full_name}
                </h3>
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 text-xs sm:text-sm text-slate-400 mb-2">
                  <span className="whitespace-nowrap">#{mentor.rank_position} on leaderboard</span>
                  {mentor.discord_username && (
                    <>
                      <span className="hidden sm:inline">•</span>
                      <span className="truncate">Discord: @{mentor.discord_username}</span>
                    </>
                  )}
                </div>
                {/* Mentor Status Badge & Specialties */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-full ${
                    mentor.mentor_active_status === 'active' 
                      ? 'bg-green-600/20 text-green-400 border border-green-500/30' 
                      : mentor.mentor_active_status === 'away'
                      ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-500/30'
                      : 'bg-slate-600/20 text-slate-400 border border-slate-500/30'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      mentor.mentor_active_status === 'active' 
                        ? 'bg-green-400' 
                        : mentor.mentor_active_status === 'away'
                        ? 'bg-yellow-400'
                        : 'bg-slate-400'
                    }`}></div>
                    {mentor.mentor_active_status === 'active' && 'Active'}
                    {mentor.mentor_active_status === 'away' && 'Away'}
                    {mentor.mentor_active_status === 'inactive' && 'Inactive'}
                  </span>
                  {/* Inline Specialties */}
                  {mentor.mentor_specialties && mentor.mentor_specialties.length > 0 && (
                    <>
                      {mentor.mentor_specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs border border-blue-500/30"
                        >
                          {specialty}
                        </span>
                      ))}
                      {mentor.mentor_specialties.length > 3 && (
                        <span className="px-2 py-1 bg-slate-600/20 text-slate-400 rounded-full text-xs border border-slate-500/30">
                          +{mentor.mentor_specialties.length - 3}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white transition-colors flex-shrink-0 ml-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-200px)]">
          {/* Bio */}
          {mentor.mentor_bio && (
            <div className="mb-4 sm:mb-6">
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{mentor.mentor_bio}</p>
            </div>
          )}

          {/* Stats */}
          <div className="mb-4 sm:mb-6">
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 text-center">
                <div className="text-lg sm:text-2xl font-bold text-blue-400">{mentor.students_helped}</div>
                <div className="text-xs text-slate-400">Students Helped</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 text-center">
                <div className="text-lg sm:text-2xl font-bold text-green-400">{mentor.hours_mentored}</div>
                <div className="text-xs text-slate-400">Hours Mentored</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 text-center">
                <div className="text-lg sm:text-2xl font-bold text-yellow-400">{mentor.mentor_rating.toFixed(1)}</div>
                <div className="text-xs text-slate-400">Average Rating</div>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-2 sm:p-3 text-center">
                <div className="text-lg sm:text-2xl font-bold text-purple-400">{mentor.review_count}</div>
                <div className="text-xs text-slate-400">Reviews</div>
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div>
            <div className="flex items-center justify-between mb-3">
              {user && user.id !== mentor.user_id && !showReviewForm && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                >
                  Leave Review
                </button>
              )}
            </div>

            {/* Review Form */}
            {showReviewForm && user && user.id !== mentor.user_id && (
              <div className="mb-6 p-4 bg-slate-700/50 rounded-lg border border-slate-600/50">
                <form onSubmit={handleSubmitReview}>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-2">
                      Rating *
                    </label>
                    {renderInteractiveStars(reviewForm.rating, (rating) => 
                      setReviewForm(prev => ({ ...prev, rating }))
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-white mb-2">
                      Review Text (Optional)
                    </label>
                    <textarea
                      value={reviewForm.reviewText}
                      onChange={(e) => setReviewForm(prev => ({ ...prev, reviewText: e.target.value }))}
                      placeholder="Share your experience with this mentor..."
                      className="w-full p-3 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none resize-none"
                      rows={3}
                      maxLength={500}
                    />
                    <div className="text-xs text-slate-400 mt-1">
                      {reviewForm.reviewText.length}/500 characters
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Session Topic (Optional)
                      </label>
                      <input
                        type="text"
                        value={reviewForm.sessionTopic}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, sessionTopic: e.target.value }))}
                        placeholder="e.g., React Components"
                        className="w-full p-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-blue-500 focus:outline-none text-sm"
                        maxLength={100}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Session Date (Optional)
                      </label>
                      <input
                        type="date"
                        value={reviewForm.sessionDate}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, sessionDate: e.target.value }))}
                        className="w-full p-2 bg-slate-800/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <button
                      type="submit"
                      disabled={reviewSubmitting}
                      className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 text-white rounded-lg transition-colors disabled:cursor-not-allowed"
                    >
                      {reviewSubmitting ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                          Submitting...
                        </div>
                      ) : (
                        'Submit Review'
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

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
                {user && user.id !== mentor.user_id && !showReviewForm && (
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors"
                  >
                    Be the first to review!
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
