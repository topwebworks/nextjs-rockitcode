'use client'

import React from 'react'
import { type RockitLesson } from '@/data/rockitcode-courses'
import { 
  CodeDisplay, 
  YouTubeEmbed, 
  ExercisePlayground, 
  LessonContent,
  type LessonSection 
} from '@/components/rockitcode'

interface RockitLessonRendererProps {
  lesson: RockitLesson
  courseId: string
  className?: string
}

export function RockitLessonRenderer({ 
  lesson, 
  courseId, 
  className = '' 
}: RockitLessonRendererProps) {
  // Convert RockitLesson to LessonContent sections
  const sections: LessonSection[] = []
  
  // Add video section if available
  if (lesson.video) {
    sections.push({
      id: `${lesson.id}-video`,
      title: 'Watch Video',
      type: 'video',
      content: (
        <YouTubeEmbed
          videoId={lesson.video.youtubeId}
          title={lesson.title}
          onProgress={(progress) => {
            console.log(`Video progress: ${progress}%`)
          }}
        />
      )
    })
  }

  // Add code examples as sections
  lesson.codeExamples.forEach((example, index) => {
    sections.push({
      id: `${lesson.id}-code-${index}`,
      title: example.title,
      type: 'code',
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600 dark:text-zinc-400">
            {example.explanation}
          </p>
          <CodeDisplay
            code={example.code}
            language={example.language}
            title={example.title}
            allowCopy={true}
          />
        </div>
      )
    })
  })

  // Add exercises as sections
  lesson.exercises.forEach((exercise, index) => {
    sections.push({
      id: `${lesson.id}-exercise-${index}`,
      title: exercise.title,
      type: 'exercise',
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600 dark:text-zinc-400">
            {exercise.description}
          </p>
          <ExercisePlayground
            exerciseId={`${lesson.id}-ex-${index}`}
            title={exercise.title}
            description={exercise.description}
            initialCode={exercise.starterCode}
            language="javascript"
            solution={exercise.solution}
            hints={exercise.hints}
            onSubmit={(code) => {
              console.log(`Exercise ${exercise.title} submitted with code:`, code)
            }}
          />
        </div>
      )
    })
  })

  // Add embeds as sections
  lesson.embeds.forEach((embed, index) => {
    sections.push({
      id: `${lesson.id}-embed-${index}`,
      title: embed.title,
      type: 'code',
      content: (
        <div className="space-y-4">
          <iframe
            src={embed.url}
            title={embed.title}
            className="w-full h-96 border border-zinc-200 dark:border-zinc-800 rounded-lg"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      )
    })
  })

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Lesson Description */}
      {lesson.description && (
        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-lg text-zinc-600 dark:text-zinc-400">
            {lesson.description}
          </p>
        </div>
      )}

      {/* Lesson Sections */}
      {sections.length > 0 ? (
        <LessonContent
          lessonId={lesson.id}
          title={lesson.title}
          description={lesson.description}
          sections={sections}
          allowCollapse={true}
          showProgress={true}
          onSectionComplete={(sectionId) => {
            console.log(`Section ${sectionId} completed`)
          }}
          onLessonComplete={() => {
            console.log(`Lesson ${lesson.id} completed`)
          }}
        />
      ) : (
        <div className="text-center py-12 text-zinc-500 dark:text-zinc-400">
          <p>This lesson content is coming soon!</p>
          <p className="text-sm mt-2">
            We're working hard to bring you engaging content for {lesson.title}.
          </p>
        </div>
      )}
    </div>
  )
}
