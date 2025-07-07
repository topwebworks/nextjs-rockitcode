'use client'

import Link from 'next/link'
import { PlayIcon } from '@/icons/play-icon'
import { ClockIcon } from '@/icons/clock-icon'
import { CheckmarkIcon } from '@/icons/checkmark-icon'
import { type RockitMilestone, type RockitLesson } from '@/data/rockitcode-courses'
import { useState } from 'react'

interface LessonNavigationProps {
  courseId: string
  milestones: RockitMilestone[]
  className?: string
}

export function LessonNavigation({ courseId, milestones, className = '' }: LessonNavigationProps) {
  const [expandedMilestones, setExpandedMilestones] = useState<string[]>([milestones[0]?.id || ''])

  const toggleMilestone = (milestoneId: string) => {
    setExpandedMilestones(prev => 
      prev.includes(milestoneId)
        ? prev.filter(id => id !== milestoneId)
        : [...prev, milestoneId]
    )
  }

  const formatDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours > 0) {
      return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`
    }
    return `${mins}m`
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {milestones.map((milestone) => {
        const isExpanded = expandedMilestones.includes(milestone.id)
        const totalMinutes = milestone.lessons.reduce((sum, lesson) => sum + lesson.estimatedMinutes, 0)
        
        return (
          <div key={milestone.id} className="border border-zinc-200 dark:border-zinc-800 rounded-lg overflow-hidden">
            {/* Milestone Header */}
            <button
              onClick={() => toggleMilestone(milestone.id)}
              className="w-full p-4 text-left bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{milestone.isPaid ? '🔒' : '🆓'}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                        {milestone.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center gap-1">
                    <span>{milestone.lessons.length} lessons</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{formatDuration(totalMinutes)}</span>
                  </div>
                  <svg 
                    className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>

            {/* Lessons List */}
            {isExpanded && (
              <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {milestone.lessons.map((lesson) => (
                  <LessonCard
                    key={lesson.id}
                    courseId={courseId}
                    lesson={lesson}
                    milestone={milestone}
                  />
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

interface LessonCardProps {
  courseId: string
  lesson: RockitLesson
  milestone: RockitMilestone
}

function LessonCard({ courseId, lesson, milestone }: LessonCardProps) {
  const isLocked = milestone.isPaid // For now, just based on milestone
  const isCompleted = false // TODO: Integrate with progress tracking
  
  return (
    <div className="p-4 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
      <div className="flex items-center gap-4">
        {/* Status Icon */}
        <div className="flex-shrink-0">
          {isCompleted ? (
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <CheckmarkIcon className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
          ) : isLocked ? (
            <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-zinc-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <PlayIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
          )}
        </div>

        {/* Lesson Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {isLocked ? (
                <div className="cursor-not-allowed">
                  <h4 className="text-sm font-medium text-zinc-400 dark:text-zinc-500 truncate">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1">
                    {lesson.description}
                  </p>
                </div>
              ) : (
                <Link 
                  href={`/learn/${courseId}/${lesson.id}`}
                  className="block hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <h4 className="text-sm font-medium text-zinc-900 dark:text-white truncate">
                    {lesson.title}
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    {lesson.description}
                  </p>
                </Link>
              )}
            </div>
            
            {/* Duration & Actions */}
            <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 ml-4">
              <div className="flex items-center gap-1">
                <ClockIcon className="w-3 h-3" />
                <span>{lesson.estimatedMinutes}m</span>
              </div>
              {lesson.video && (
                <div className="flex items-center gap-1">
                  <PlayIcon className="w-3 h-3" />
                  <span>Video</span>
                </div>
              )}
              {lesson.exercises.length > 0 && (
                <div className="flex items-center gap-1">
                  <span>📝 {lesson.exercises.length}</span>
                </div>
              )}
              {isLocked && (
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Pro
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
