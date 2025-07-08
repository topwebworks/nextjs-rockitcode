// RockitCode Component Library
// Modular, scalable components for the learning platform

// Core Components
export { CodeDisplay, createCodeExample, LANGUAGE_CONFIGS } from './code-display'
export type { CodeDisplayProps, SupportedLanguage } from './code-display'

export { YouTubeEmbed, YouTubeThumbnail, createYouTubeEmbed, extractYouTubeVideoId } from './youtube-embed'
export type { YouTubeEmbedProps } from './youtube-embed'

export { HTMLPlayground } from './html-playground'

export { ProgressTracker, createProgressItem, getProgressStats } from './progress-tracker'
export type { ProgressItem, ProgressTrackerProps } from './progress-tracker'

export { ExercisePlayground, createExercise, EXERCISE_TEMPLATES } from './exercise-playground'
export type { ExercisePlaygroundProps, ExerciseTemplate } from './exercise-playground'

export { LessonContent, createLessonSection, SECTION_TEMPLATES } from './lesson-content'
export type { LessonContentProps, LessonSection } from './lesson-content'

export { RockitCourseCard } from './course-card'

export { RockitLessonRenderer } from './lesson-renderer'

export { LessonNavigation } from './lesson-navigation'

// Authentication Components
export { RockitSessionProvider } from './session-provider'
export { AuthButton, AuthStatus } from './auth-button'

// Content Management Components
export { ContentManagerUI } from './content-manager'

// Helper functions and utilities
export { type RockitCourse, type RockitMilestone } from '../../data/rockitcode-courses'
