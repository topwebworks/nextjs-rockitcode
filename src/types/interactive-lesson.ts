/**
 * Interactive Lesson Component Types
 * 
 * These types define the structure for highly interactive, beginner-focused lessons
 * that emphasize hands-on learning over passive video consumption.
 */

export interface LessonMetadata {
  courseId: string
  week: number
  chapter: number
  chapterTitle: string
  lessonId: string
  title: string
  description: string
  objectives: string[]
  prerequisites: string[]
  estimatedTime: string
}

export interface HeroVideo {
  id: string
  title: string
  description: string
  duration: string
  placeholder: boolean
  thumbnailAlt: string
  // Will be populated with actual video URL after course completion
  videoUrl?: string
}

export interface ConceptIntroduction {
  id: string
  title: string
  description: string
  analogy: string
  whyItMatters: string
  realWorldExample: string
}

export interface InteractiveLab {
  id: string
  title: string
  description: string
  type: 'guided-setup' | 'hands-on-practice' | 'validation-check' | 'celebration'
  estimatedMinutes: number
  instructions: string[]
  validationCriteria: string[]
  hints: string[]
  successMessage: string
  nextStepPreview: string
}

export interface MicroChallenge {
  id: string
  title: string
  description: string
  task: string
  expectedOutcome: string
  celebrationMessage: string
}

export interface KnowledgeCheck {
  id: string
  question: string
  type: 'explanation' | 'reflection' | 'multiple-choice' | 'code-completion'
  correctAnswer: string
  hints: string[]
  // For multiple choice
  options?: string[]
  // For code completion
  codeTemplate?: string
  expectedCode?: string
}

export interface Achievement {
  id: string
  title: string
  description: string
  badgeIcon: string
  unlockedMessage: string
}

export interface CompletionCriteria {
  required: string[]
  optional: string[]
}

export interface NextLesson {
  id: string
  title: string
  preview: string
  estimatedTime: string
  newSkills: string[]
}

export interface TechnicalRequirements {
  githubOAuth: string
  vsCodeExtension?: string
  livePreview: string
  gitIntegration: string
  deploymentMonitoring: string
  progressTracking: string
}

export interface InteractiveLesson {
  // Course Structure
  courseId: string
  week: number
  chapter: number
  chapterTitle: string
  
  // Lesson Metadata
  lessonId: string
  title: string
  description: string
  objectives: string[]
  prerequisites: string[]
  estimatedTime: string
  
  // Content Components
  heroVideo: HeroVideo
  concepts: ConceptIntroduction[]
  interactiveLabs: InteractiveLab[]
  microChallenges: MicroChallenge[]
  knowledgeChecks: KnowledgeCheck[]
  achievements: Achievement[]
  
  // Completion & Progression
  completionCriteria: CompletionCriteria
  outcomes: string[]
  nextLesson: NextLesson
  
  // Technical Implementation
  technicalRequirements: TechnicalRequirements
}

// Platform Integration Types
export interface StudentProgress {
  lessonId: string
  studentId: string
  startedAt: Date
  completedAt?: Date
  currentLab?: string
  completedLabs: string[]
  achievementsUnlocked: string[]
  knowledgeCheckScores: Record<string, number>
  portfolioUrl?: string
}

export interface LabValidation {
  labId: string
  studentId: string
  criteria: Record<string, boolean>
  validatedAt: Date
  screenshotUrl?: string
  codeSnapshotUrl?: string
}

export interface InteractiveLearningEngine {
  // Real-time validation
  validateLab(labId: string, studentSubmission: any): Promise<LabValidation>
  
  // GitHub integration
  createRepository(studentId: string, repoName: string): Promise<string>
  deployToPages(repoUrl: string): Promise<string>
  
  // Progress tracking
  updateProgress(studentId: string, lessonId: string, update: Partial<StudentProgress>): Promise<void>
  unlockAchievement(studentId: string, achievementId: string): Promise<void>
  
  // AI assistance
  generateHint(studentId: string, labId: string, currentCode?: string): Promise<string>
  validateCode(code: string, expectedOutcome: string): Promise<boolean>
}

export default InteractiveLesson;
