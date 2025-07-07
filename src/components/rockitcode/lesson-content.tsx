'use client'

import { useState } from 'react'
import { ChevronRightIcon } from '../../icons/chevron-right-icon'
import { ChevronDownIcon } from '../../icons/chevron-down-icon'
import { CheckmarkIcon } from '../../icons/checkmark-icon'

export interface LessonSection {
  id: string
  title: string
  content: React.ReactNode
  type: 'text' | 'code' | 'video' | 'exercise' | 'quiz'
  isOptional?: boolean
  estimatedMinutes?: number
}

export interface LessonContentProps {
  lessonId: string
  title: string
  description?: string
  sections: LessonSection[]
  allowCollapse?: boolean
  showProgress?: boolean
  className?: string
  onSectionComplete?: (sectionId: string) => void
  onLessonComplete?: () => void
}

export function LessonContent({
  lessonId,
  title,
  description,
  sections,
  allowCollapse = true,
  showProgress = true,
  className = '',
  onSectionComplete,
  onLessonComplete
}: LessonContentProps) {
  const [completedSections, setCompletedSections] = useState<string[]>([])
  const [collapsedSections, setCollapsedSections] = useState<string[]>([])

  const toggleSectionCollapse = (sectionId: string) => {
    if (!allowCollapse) return
    
    setCollapsedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const markSectionComplete = (sectionId: string) => {
    if (!completedSections.includes(sectionId)) {
      const newCompleted = [...completedSections, sectionId]
      setCompletedSections(newCompleted)
      onSectionComplete?.(sectionId)
      
      // Check if all required sections are complete
      const requiredSections = sections.filter(s => !s.isOptional)
      const allRequiredComplete = requiredSections.every(s => 
        newCompleted.includes(s.id)
      )
      
      if (allRequiredComplete) {
        onLessonComplete?.()
      }
    }
  }

  const progressPercent = sections.length > 0 
    ? (completedSections.length / sections.length) * 100 
    : 0

  const totalEstimatedTime = sections.reduce((total, section) => 
    total + (section.estimatedMinutes || 0), 0
  )

  const getSectionIcon = (type: LessonSection['type']) => {
    switch (type) {
      case 'text': return '📖'
      case 'code': return '💻'
      case 'video': return '🎥'
      case 'exercise': return '✏️'
      case 'quiz': return '❓'
      default: return '📄'
    }
  }

  return (
    <div className={`rockitcode-lesson-content ${className}`}>
      {/* Lesson Header */}
      <div className="mb-8 rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-900">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          {title}
        </h1>
        {description && (
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
        
        <div className="mt-4 flex items-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
          <span>{sections.length} sections</span>
          {totalEstimatedTime > 0 && (
            <span>~{totalEstimatedTime} minutes</span>
          )}
          {showProgress && (
            <span>{completedSections.length} completed</span>
          )}
        </div>

        {showProgress && (
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-zinc-600 dark:text-zinc-400">Progress</span>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {Math.round(progressPercent)}%
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
              <div 
                className="h-full bg-green-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Lesson Sections */}
      <div className="space-y-4">
        {sections.map((section, index) => {
          const isCompleted = completedSections.includes(section.id)
          const isCollapsed = collapsedSections.includes(section.id)

          return (
            <div
              key={section.id}
              className={`rounded-lg border transition-colors ${
                isCompleted 
                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                  : 'border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800'
              }`}
            >
              {/* Section Header */}
              <div 
                className={`flex items-center justify-between p-4 ${
                  allowCollapse ? 'cursor-pointer' : ''
                }`}
                onClick={() => allowCollapse && toggleSectionCollapse(section.id)}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                    isCompleted
                      ? 'border-green-500 bg-green-500 text-white'
                      : 'border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800'
                  }`}>
                    {isCompleted ? (
                      <CheckmarkIcon className="h-4 w-4" />
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getSectionIcon(section.type)}</span>
                    <div>
                      <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
                        {section.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                        <span className="capitalize">{section.type}</span>
                        {section.isOptional && (
                          <span className="rounded bg-zinc-200 px-1.5 py-0.5 dark:bg-zinc-700">
                            Optional
                          </span>
                        )}
                        {section.estimatedMinutes && (
                          <span>{section.estimatedMinutes}m</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!isCompleted && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        markSectionComplete(section.id)
                      }}
                      className="rounded bg-blue-500 px-3 py-1 text-xs font-medium text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                    >
                      Mark Complete
                    </button>
                  )}
                  
                  {allowCollapse && (
                    <div className="text-zinc-400">
                      {isCollapsed ? (
                        <ChevronRightIcon className="h-4 w-4" />
                      ) : (
                        <ChevronDownIcon className="h-4 w-4" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Section Content */}
              {!isCollapsed && (
                <div className="border-t border-zinc-200 p-4 dark:border-zinc-700">
                  {section.content}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Helper function for creating lesson sections
export function createLessonSection(
  id: string,
  title: string,
  content: React.ReactNode,
  type: LessonSection['type'],
  options?: Partial<LessonSection>
): LessonSection {
  return {
    id,
    title,
    content,
    type,
    ...options
  }
}

// Pre-built section templates
export const SECTION_TEMPLATES = {
  introduction: (content: React.ReactNode) => createLessonSection(
    'introduction',
    'Introduction',
    content,
    'text',
    { estimatedMinutes: 5 }
  ),
  
  conceptExplanation: (title: string, content: React.ReactNode) => createLessonSection(
    `concept-${title.toLowerCase().replace(/\s+/g, '-')}`,
    title,
    content,
    'text',
    { estimatedMinutes: 10 }
  ),
  
  codeExample: (title: string, content: React.ReactNode) => createLessonSection(
    `code-${title.toLowerCase().replace(/\s+/g, '-')}`,
    title,
    content,
    'code',
    { estimatedMinutes: 15 }
  ),
  
  practiceExercise: (title: string, content: React.ReactNode) => createLessonSection(
    `exercise-${title.toLowerCase().replace(/\s+/g, '-')}`,
    title,
    content,
    'exercise',
    { estimatedMinutes: 20 }
  ),
  
  quiz: (title: string, content: React.ReactNode) => createLessonSection(
    `quiz-${title.toLowerCase().replace(/\s+/g, '-')}`,
    title,
    content,
    'quiz',
    { estimatedMinutes: 5 }
  )
}
