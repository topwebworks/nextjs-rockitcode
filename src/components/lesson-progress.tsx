'use client'

import React from 'react'
import { clsx } from 'clsx'

interface LessonProgressProps {
  progress: number
  className?: string
}

export function LessonProgress({ progress, className = '' }: LessonProgressProps) {
  return (
    <div className={clsx('px-4 py-2', className)}>
      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
        <span>Lesson Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          {progress >= 100 && (
            <div className="w-full h-full rounded-full animate-pulse bg-gradient-to-r from-green-400 to-blue-500" />
          )}
        </div>
      </div>
    </div>
  )
}
