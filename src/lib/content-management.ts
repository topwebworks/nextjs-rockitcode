/**
 * RockitCode Content Management System
 * 
 * A comprehensive system for creating, editing, and managing educational content.
 * Built with modularity, scalability, and type safety in mind.
 */

export interface ContentItem {
  id: string
  type: 'lesson' | 'exercise' | 'quiz' | 'video' | 'reading'
  title: string
  description?: string
  content: any // Will be more specific based on type
  metadata: ContentMetadata
  createdAt: string
  updatedAt: string
  createdBy?: string
  status: 'draft' | 'review' | 'published' | 'archived'
}

export interface ContentMetadata {
  estimatedMinutes: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  prerequisites: string[]
  learningObjectives: string[]
  language?: 'html' | 'css' | 'javascript' | 'python' | 'general'
  isRequired: boolean
  sortOrder: number
}

export interface LessonContent extends ContentItem {
  type: 'lesson'
  content: {
    sections: LessonSection[]
    resources?: Resource[]
    assessments?: Assessment[]
  }
}

export interface ExerciseContent extends ContentItem {
  type: 'exercise'
  content: {
    instructions: string
    startingCode: string
    solutionCode: string
    hints: string[]
    testCases: TestCase[]
    language: 'html' | 'css' | 'javascript' | 'python'
    environment: 'browser' | 'node' | 'python'
  }
}

export interface QuizContent extends ContentItem {
  type: 'quiz'
  content: {
    questions: QuizQuestion[]
    passingScore: number
    randomizeQuestions: boolean
    allowRetries: boolean
    timeLimit?: number
  }
}

export interface VideoContent extends ContentItem {
  type: 'video'
  content: {
    videoId: string
    provider: 'youtube' | 'vimeo' | 'local'
    transcript?: string
    chapters?: VideoChapter[]
    interactive?: InteractiveElement[]
  }
}

export interface ReadingContent extends ContentItem {
  type: 'reading'
  content: {
    markdown: string
    estimatedReadingTime: number
    resources?: Resource[]
  }
}

// Supporting interfaces
export interface LessonSection {
  id: string
  title: string
  content: React.ReactNode | string
  type: 'text' | 'code' | 'video' | 'exercise' | 'quiz'
  isOptional?: boolean
  estimatedMinutes?: number
}

export interface Resource {
  id: string
  title: string
  url: string
  type: 'documentation' | 'article' | 'video' | 'tool' | 'example'
  description?: string
}

export interface Assessment {
  id: string
  type: 'quiz' | 'exercise' | 'project'
  title: string
  passingCriteria: string
  weight: number
}

export interface TestCase {
  id: string
  input: any
  expectedOutput: any
  description: string
  isHidden: boolean
}

export interface QuizQuestion {
  id: string
  type: 'multiple-choice' | 'true-false' | 'fill-blank' | 'code-completion'
  question: string
  options?: string[]
  correctAnswer: string | string[]
  explanation?: string
  points: number
}

export interface VideoChapter {
  id: string
  title: string
  startTime: number
  endTime: number
  description?: string
}

export interface InteractiveElement {
  id: string
  type: 'pause' | 'question' | 'note'
  timestamp: number
  content: any
}

// Course and milestone management
export interface CourseContent {
  id: string
  title: string
  description: string
  language: string
  level: 'beginner' | 'intermediate' | 'advanced'
  milestones: MilestoneContent[]
  metadata: CourseMetadata
  status: 'draft' | 'published' | 'archived'
}

export interface MilestoneContent {
  id: string
  title: string
  description: string
  lessons: string[] // ContentItem IDs
  objectives: string[]
  estimatedHours: number
  sortOrder: number
}

export interface CourseMetadata {
  prerequisites: string[]
  learningPath: string[]
  estimatedTotalHours: number
  certificateEligible: boolean
  tags: string[]
  targetAudience: string[]
}

// Content management operations
export interface ContentOperation {
  id: string
  type: 'create' | 'update' | 'delete' | 'publish' | 'archive'
  contentId: string
  contentType: string
  changes: any
  performedBy: string
  performedAt: string
  reason?: string
}

// Validation and quality assurance
export interface ContentValidation {
  contentId: string
  isValid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
  checkedAt: string
}

export interface ValidationError {
  field: string
  message: string
  severity: 'error' | 'warning'
  code: string
}

export interface ValidationWarning {
  field: string
  message: string
  suggestion?: string
  code: string
}

// Export and import interfaces
export interface ContentExport {
  version: string
  exportedAt: string
  exportedBy: string
  courses: CourseContent[]
  content: ContentItem[]
  metadata: ExportMetadata
}

export interface ExportMetadata {
  totalCourses: number
  totalContent: number
  formatVersion: string
  compatibilityNotes?: string[]
}

// Content management utilities
export class ContentManager {
  private content: Map<string, ContentItem> = new Map()
  private courses: Map<string, CourseContent> = new Map()
  private operations: ContentOperation[] = []

  // CRUD operations
  async createContent(content: Omit<ContentItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContentItem> {
    const newContent: ContentItem = {
      ...content,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    this.content.set(newContent.id, newContent)
    this.logOperation('create', newContent.id, content.type, content, content.createdBy || 'system')
    
    return newContent
  }

  async updateContent(id: string, updates: Partial<ContentItem>): Promise<ContentItem | null> {
    const existing = this.content.get(id)
    if (!existing) return null

    const updated: ContentItem = {
      ...existing,
      ...updates,
      id, // Preserve ID
      createdAt: existing.createdAt, // Preserve creation date
      updatedAt: new Date().toISOString(),
    }

    this.content.set(id, updated)
    this.logOperation('update', id, existing.type, updates, updates.createdBy || 'system')
    
    return updated
  }

  async deleteContent(id: string, performedBy: string): Promise<boolean> {
    const existing = this.content.get(id)
    if (!existing) return false

    this.content.delete(id)
    this.logOperation('delete', id, existing.type, {}, performedBy)
    
    return true
  }

  async getContent(id: string): Promise<ContentItem | null> {
    return this.content.get(id) || null
  }

  async listContent(filters?: {
    type?: ContentItem['type']
    status?: ContentItem['status']
    language?: string
    tags?: string[]
  }): Promise<ContentItem[]> {
    let items = Array.from(this.content.values())

    if (filters) {
      if (filters.type) items = items.filter(item => item.type === filters.type)
      if (filters.status) items = items.filter(item => item.status === filters.status)
      if (filters.language) items = items.filter(item => item.metadata.language === filters.language)
      if (filters.tags) {
        items = items.filter(item => 
          filters.tags!.some(tag => item.metadata.tags.includes(tag))
        )
      }
    }

    return items.sort((a, b) => a.metadata.sortOrder - b.metadata.sortOrder)
  }

  // Validation
  async validateContent(content: ContentItem): Promise<ContentValidation> {
    const errors: ValidationError[] = []
    const warnings: ValidationWarning[] = []

    // Basic validation
    if (!content.title.trim()) {
      errors.push({
        field: 'title',
        message: 'Title is required',
        severity: 'error',
        code: 'TITLE_REQUIRED'
      })
    }

    if (content.metadata.estimatedMinutes <= 0) {
      errors.push({
        field: 'metadata.estimatedMinutes',
        message: 'Estimated minutes must be greater than 0',
        severity: 'error',
        code: 'INVALID_DURATION'
      })
    }

    if (!content.description) {
      warnings.push({
        field: 'description',
        message: 'Description is recommended for better user experience',
        suggestion: 'Add a brief description explaining what learners will achieve',
        code: 'MISSING_DESCRIPTION'
      })
    }

    // Type-specific validation
    if (content.type === 'exercise') {
      const exercise = content as ExerciseContent
      if (!exercise.content.startingCode) {
        errors.push({
          field: 'content.startingCode',
          message: 'Starting code is required for exercises',
          severity: 'error',
          code: 'MISSING_STARTING_CODE'
        })
      }
    }

    return {
      contentId: content.id,
      isValid: errors.length === 0,
      errors,
      warnings,
      checkedAt: new Date().toISOString()
    }
  }

  // Utility methods
  private generateId(): string {
    return `content_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private logOperation(
    type: ContentOperation['type'],
    contentId: string,
    contentType: string,
    changes: any,
    performedBy: string,
    reason?: string
  ): void {
    this.operations.push({
      id: this.generateId(),
      type,
      contentId,
      contentType,
      changes,
      performedBy,
      performedAt: new Date().toISOString(),
      reason
    })
  }

  // Export/Import
  async exportContent(filters?: any): Promise<ContentExport> {
    const content = await this.listContent(filters)
    const courses = Array.from(this.courses.values())

    return {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      exportedBy: 'system',
      courses,
      content,
      metadata: {
        totalCourses: courses.length,
        totalContent: content.length,
        formatVersion: '1.0.0'
      }
    }
  }

  async importContent(data: ContentExport): Promise<{ success: boolean; errors: string[] }> {
    const errors: string[] = []

    try {
      // Import courses
      for (const course of data.courses) {
        this.courses.set(course.id, course)
      }

      // Import content
      for (const item of data.content) {
        this.content.set(item.id, item)
      }

      return { success: true, errors: [] }
    } catch (error) {
      errors.push(`Import failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
      return { success: false, errors }
    }
  }
}

// Singleton instance
export const contentManager = new ContentManager()
