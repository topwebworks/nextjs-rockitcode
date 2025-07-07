'use client'

import { useEffect, useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'
import { CheckmarkIcon } from '../../icons/checkmark-icon'
import { ClockIcon } from '../../icons/clock-icon'

export interface ProgressItem {
  id: string
  title: string
  type: 'lesson' | 'exercise' | 'quiz' | 'project'
  estimatedMinutes?: number
  isRequired?: boolean
}

export interface ProgressTrackerProps {
  courseId: string
  items: ProgressItem[]
  className?: string
  showEstimates?: boolean
  showProgress?: boolean
  onItemComplete?: (itemId: string) => void
  onItemStart?: (itemId: string) => void
}

interface ProgressData {
  completedItems: string[]
  startedItems: string[]
  lastUpdated: string
  totalTimeSpent?: number
}

export function ProgressTracker({
  courseId,
  items,
  className = '',
  showEstimates = true,
  showProgress = true,
  onItemComplete,
  onItemStart
}: ProgressTrackerProps) {
  const [progressData, setProgressData] = useLocalStorageState<ProgressData>(
    `rockitcode-progress-${courseId}`,
    {
      defaultValue: {
        completedItems: [],
        startedItems: [],
        lastUpdated: new Date().toISOString()
      }
    }
  )

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const markAsStarted = (itemId: string) => {
    if (!progressData.startedItems.includes(itemId)) {
      setProgressData((prev: ProgressData) => ({
        ...prev,
        startedItems: [...prev.startedItems, itemId],
        lastUpdated: new Date().toISOString()
      }))
      onItemStart?.(itemId)
    }
  }

  const markAsCompleted = (itemId: string) => {
    setProgressData((prev: ProgressData) => ({
      ...prev,
      completedItems: [...prev.completedItems.filter((id: string) => id !== itemId), itemId],
      startedItems: prev.startedItems.filter((id: string) => id !== itemId),
      lastUpdated: new Date().toISOString()
    }))
    onItemComplete?.(itemId)
  }

  const toggleCompletion = (itemId: string) => {
    if (progressData.completedItems.includes(itemId)) {
      // Mark as incomplete
      setProgressData((prev: ProgressData) => ({
        ...prev,
        completedItems: prev.completedItems.filter((id: string) => id !== itemId),
        lastUpdated: new Date().toISOString()
      }))
    } else {
      markAsCompleted(itemId)
    }
  }

  const getItemStatus = (itemId: string): 'not-started' | 'started' | 'completed' => {
    if (progressData.completedItems.includes(itemId)) return 'completed'
    if (progressData.startedItems.includes(itemId)) return 'started'
    return 'not-started'
  }

  const completedCount = progressData.completedItems.length
  const totalCount = items.length
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  const totalEstimatedTime = items.reduce((total, item) => total + (item.estimatedMinutes || 0), 0)
  const completedEstimatedTime = items
    .filter(item => progressData.completedItems.includes(item.id))
    .reduce((total, item) => total + (item.estimatedMinutes || 0), 0)

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <div className={`rockitcode-progress-tracker ${className}`}>
      {showProgress && (
        <div className="mb-6 rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Course Progress
            </h3>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {completedCount} of {totalCount} completed
            </span>
          </div>
          
          <div className="mb-2 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div 
              className="h-full bg-green-500 transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>{Math.round(progressPercentage)}% complete</span>
            {showEstimates && totalEstimatedTime > 0 && (
              <span className="flex items-center gap-1">
                <ClockIcon className="h-3 w-3" />
                {completedEstimatedTime}m of {totalEstimatedTime}m
              </span>
            )}
          </div>
        </div>
      )}

      <div className="space-y-2">
        {items.map((item, index) => {
          const status = getItemStatus(item.id)
          const isCompleted = status === 'completed'
          const isStarted = status === 'started'

          return (
            <div
              key={item.id}
              className={`group flex items-center justify-between rounded-lg border p-3 transition-colors ${
                isCompleted
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  : isStarted
                  ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                  : 'border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleCompletion(item.id)}
                  className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                    isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-zinc-300 bg-white hover:border-green-500 dark:border-zinc-600 dark:bg-zinc-800'
                  }`}
                >
                  {isCompleted && <CheckmarkIcon className="h-3 w-3" />}
                </button>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      {item.type}
                    </span>
                    {item.isRequired && (
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/20 dark:text-red-400">
                        Required
                      </span>
                    )}
                  </div>
                  <h4 className={`text-sm font-medium ${
                    isCompleted 
                      ? 'text-green-700 dark:text-green-300' 
                      : 'text-zinc-900 dark:text-zinc-100'
                  }`}>
                    {item.title}
                  </h4>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {showEstimates && item.estimatedMinutes && (
                  <span className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                    <ClockIcon className="h-3 w-3" />
                    {item.estimatedMinutes}m
                  </span>
                )}
                
                {!isCompleted && (
                  <button
                    onClick={() => markAsStarted(item.id)}
                    className="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                  >
                    {isStarted ? 'Continue' : 'Start'}
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Helper function for creating progress items
export function createProgressItem(
  id: string,
  title: string,
  type: ProgressItem['type'],
  options?: Partial<ProgressItem>
): ProgressItem {
  return {
    id,
    title,
    type,
    ...options
  }
}

// Helper function to get progress statistics
export function getProgressStats(courseId: string, items: ProgressItem[]) {
  if (typeof window === 'undefined') return null

  const stored = localStorage.getItem(`rockitcode-progress-${courseId}`)
  if (!stored) return null

  try {
    const progressData: ProgressData = JSON.parse(stored)
    const completedCount = progressData.completedItems.length
    const totalCount = items.length
    const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

    return {
      completedCount,
      totalCount,
      progressPercentage,
      lastUpdated: progressData.lastUpdated
    }
  } catch {
    return null
  }
}
