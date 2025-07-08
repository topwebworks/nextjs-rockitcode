/**
 * Content Validation and Testing System
 * 
 * Comprehensive testing and validation tools for educational content.
 * Ensures content quality, accessibility, and pedagogical effectiveness.
 */

import { ContentItem, LessonContent, ExerciseContent, QuizContent } from '@/lib/content-management'

export interface ContentTest {
  id: string
  name: string
  description: string
  category: 'structure' | 'accessibility' | 'pedagogy' | 'technical' | 'performance'
  severity: 'error' | 'warning' | 'info'
  test: (content: ContentItem) => ContentTestResult
}

export interface ContentTestResult {
  passed: boolean
  message: string
  suggestions?: string[]
  details?: any
}

export interface ContentTestSuite {
  id: string
  name: string
  description: string
  tests: ContentTest[]
}

// Individual Content Tests

const structureTests: ContentTest[] = [
  {
    id: 'has-title',
    name: 'Has Title',
    description: 'Content must have a clear, descriptive title',
    category: 'structure',
    severity: 'error',
    test: (content) => ({
      passed: !!content.title?.trim(),
      message: content.title?.trim() ? 'Title is present' : 'Title is missing or empty',
      suggestions: !content.title?.trim() ? ['Add a clear, descriptive title'] : undefined
    })
  },
  {
    id: 'has-description',
    name: 'Has Description',
    description: 'Content should have a helpful description',
    category: 'structure',
    severity: 'warning',
    test: (content) => ({
      passed: !!content.description?.trim(),
      message: content.description?.trim() ? 'Description is present' : 'Description is missing',
      suggestions: !content.description?.trim() ? ['Add a description explaining what learners will gain'] : undefined
    })
  },
  {
    id: 'valid-duration',
    name: 'Valid Duration',
    description: 'Estimated minutes should be realistic (1-120 minutes)',
    category: 'structure',
    severity: 'warning',
    test: (content) => {
      const minutes = content.metadata.estimatedMinutes
      const isValid = minutes >= 1 && minutes <= 120
      return {
        passed: isValid,
        message: isValid ? `Duration of ${minutes} minutes is reasonable` : `Duration of ${minutes} minutes seems ${minutes < 1 ? 'too short' : 'too long'}`,
        suggestions: !isValid ? ['Consider breaking long content into smaller chunks', 'Verify the estimated time is accurate'] : undefined
      }
    }
  }
]

const pedagogyTests: ContentTest[] = [
  {
    id: 'has-learning-objectives',
    name: 'Has Learning Objectives',
    description: 'Content should specify clear learning objectives',
    category: 'pedagogy',
    severity: 'warning',
    test: (content) => {
      const hasObjectives = content.metadata.learningObjectives.length > 0
      return {
        passed: hasObjectives,
        message: hasObjectives ? 'Learning objectives are defined' : 'Learning objectives are missing',
        suggestions: !hasObjectives ? ['Add 2-4 specific learning objectives', 'Use action verbs like "understand", "apply", "create"'] : undefined
      }
    }
  },
  {
    id: 'appropriate-difficulty',
    name: 'Appropriate Difficulty',
    description: 'Content difficulty should match the target audience',
    category: 'pedagogy',
    severity: 'info',
    test: (content) => {
      // This is a placeholder - in practice, you'd analyze content complexity
      return {
        passed: true,
        message: `Content is marked as ${content.metadata.difficulty} level`,
        suggestions: ['Review content to ensure difficulty level is appropriate for target audience']
      }
    }
  },
  {
    id: 'prerequisite-check',
    name: 'Prerequisites Defined',
    description: 'Advanced content should list prerequisites',
    category: 'pedagogy',
    severity: 'warning',
    test: (content) => {
      const isAdvanced = content.metadata.difficulty === 'intermediate' || content.metadata.difficulty === 'advanced'
      const hasPrereqs = content.metadata.prerequisites.length > 0
      
      if (!isAdvanced) {
        return { passed: true, message: 'Beginner content does not require prerequisites' }
      }
      
      return {
        passed: hasPrereqs,
        message: hasPrereqs ? 'Prerequisites are defined' : 'Advanced content missing prerequisites',
        suggestions: !hasPrereqs ? ['List required knowledge or previous lessons', 'Help learners prepare for the content'] : undefined
      }
    }
  }
]

const lessonSpecificTests: ContentTest[] = [
  {
    id: 'lesson-has-sections',
    name: 'Lesson Has Sections',
    description: 'Lessons should be broken into logical sections',
    category: 'structure',
    severity: 'error',
    test: (content) => {
      if (content.type !== 'lesson') {
        return { passed: true, message: 'Not applicable to non-lesson content' }
      }
      
      const lesson = content as LessonContent
      const hasSections = lesson.content.sections && lesson.content.sections.length > 0
      
      return {
        passed: hasSections,
        message: hasSections ? `Lesson has ${lesson.content.sections.length} sections` : 'Lesson has no sections',
        suggestions: !hasSections ? ['Add at least 2-3 sections: Introduction, Main Content, Summary'] : undefined
      }
    }
  },
  {
    id: 'lesson-balanced-sections',
    name: 'Balanced Section Length',
    description: 'Lesson sections should be roughly balanced in length',
    category: 'pedagogy',
    severity: 'info',
    test: (content) => {
      if (content.type !== 'lesson') {
        return { passed: true, message: 'Not applicable to non-lesson content' }
      }
      
      const lesson = content as LessonContent
      const sections = lesson.content.sections || []
      
      if (sections.length < 2) {
        return { passed: true, message: 'Too few sections to analyze balance' }
      }
      
      const times = sections.map(s => s.estimatedMinutes || 5)
      const avg = times.reduce((a, b) => a + b, 0) / times.length
      const isBalanced = times.every(time => Math.abs(time - avg) / avg < 0.5) // Within 50% of average
      
      return {
        passed: isBalanced,
        message: isBalanced ? 'Section lengths are balanced' : 'Some sections are much longer/shorter than others',
        suggestions: !isBalanced ? ['Consider breaking long sections into smaller parts', 'Combine very short sections if appropriate'] : undefined
      }
    }
  }
]

const exerciseSpecificTests: ContentTest[] = [
  {
    id: 'exercise-has-starting-code',
    name: 'Exercise Has Starting Code',
    description: 'Exercises must provide starting code for learners',
    category: 'structure',
    severity: 'error',
    test: (content) => {
      if (content.type !== 'exercise') {
        return { passed: true, message: 'Not applicable to non-exercise content' }
      }
      
      const exercise = content as ExerciseContent
      const hasStartingCode = !!exercise.content.startingCode?.trim()
      
      return {
        passed: hasStartingCode,
        message: hasStartingCode ? 'Starting code is provided' : 'Starting code is missing',
        suggestions: !hasStartingCode ? ['Provide a code template for learners to start with', 'Include comments guiding what to implement'] : undefined
      }
    }
  },
  {
    id: 'exercise-has-solution',
    name: 'Exercise Has Solution',
    description: 'Exercises must include a working solution',
    category: 'technical',
    severity: 'error',
    test: (content) => {
      if (content.type !== 'exercise') {
        return { passed: true, message: 'Not applicable to non-exercise content' }
      }
      
      const exercise = content as ExerciseContent
      const hasSolution = !!exercise.content.solutionCode?.trim()
      
      return {
        passed: hasSolution,
        message: hasSolution ? 'Solution code is provided' : 'Solution code is missing',
        suggestions: !hasSolution ? ['Provide a complete working solution', 'Test the solution thoroughly'] : undefined
      }
    }
  },
  {
    id: 'exercise-has-hints',
    name: 'Exercise Has Helpful Hints',
    description: 'Exercises should provide hints to guide learners',
    category: 'pedagogy',
    severity: 'warning',
    test: (content) => {
      if (content.type !== 'exercise') {
        return { passed: true, message: 'Not applicable to non-exercise content' }
      }
      
      const exercise = content as ExerciseContent
      const hasHints = exercise.content.hints && exercise.content.hints.length > 0
      
      return {
        passed: hasHints,
        message: hasHints ? `Exercise has ${exercise.content.hints.length} hints` : 'Exercise has no hints',
        suggestions: !hasHints ? ['Add 2-4 progressive hints', 'Start with general guidance, get more specific'] : undefined
      }
    }
  }
]

const accessibilityTests: ContentTest[] = [
  {
    id: 'has-meaningful-tags',
    name: 'Has Meaningful Tags',
    description: 'Content should be tagged for discoverability',
    category: 'accessibility',
    severity: 'warning',
    test: (content) => {
      const hasTags = content.metadata.tags.length > 0
      const hasGoodTags = content.metadata.tags.length >= 2 && content.metadata.tags.every(tag => tag.length > 2)
      
      return {
        passed: hasGoodTags,
        message: hasTags ? 
          (hasGoodTags ? 'Content has meaningful tags' : 'Tags could be more descriptive') :
          'Content has no tags',
        suggestions: !hasGoodTags ? ['Add 2-5 relevant tags', 'Include skill level, topic, and technology tags'] : undefined
      }
    }
  }
]

// Test Suites
export const contentTestSuites: ContentTestSuite[] = [
  {
    id: 'basic-structure',
    name: 'Basic Structure',
    description: 'Essential structural requirements for all content',
    tests: structureTests
  },
  {
    id: 'pedagogy',
    name: 'Pedagogical Quality',
    description: 'Educational effectiveness and learning design',
    tests: pedagogyTests
  },
  {
    id: 'lesson-specific',
    name: 'Lesson Quality',
    description: 'Tests specific to lesson content',
    tests: lessonSpecificTests
  },
  {
    id: 'exercise-specific',
    name: 'Exercise Quality',
    description: 'Tests specific to exercise content',
    tests: exerciseSpecificTests
  },
  {
    id: 'accessibility',
    name: 'Accessibility & Discovery',
    description: 'Content accessibility and discoverability',
    tests: accessibilityTests
  }
]

// Main Testing Function
export function runContentTests(content: ContentItem, suiteIds?: string[]): {
  overall: 'pass' | 'warning' | 'fail'
  results: Array<{
    suite: string
    test: string
    result: ContentTestResult
    severity: 'error' | 'warning' | 'info'
  }>
  summary: {
    total: number
    passed: number
    warnings: number
    errors: number
  }
} {
  const suitesToRun = suiteIds ? 
    contentTestSuites.filter(suite => suiteIds.includes(suite.id)) :
    contentTestSuites

  const results: Array<{
    suite: string
    test: string
    result: ContentTestResult
    severity: 'error' | 'warning' | 'info'
  }> = []

  let errors = 0
  let warnings = 0
  let total = 0

  for (const suite of suitesToRun) {
    for (const test of suite.tests) {
      total++
      const result = test.test(content)
      
      results.push({
        suite: suite.name,
        test: test.name,
        result,
        severity: test.severity
      })

      if (!result.passed) {
        if (test.severity === 'error') errors++
        else if (test.severity === 'warning') warnings++
      }
    }
  }

  const passed = total - errors - warnings
  const overall = errors > 0 ? 'fail' : warnings > 0 ? 'warning' : 'pass'

  return {
    overall,
    results,
    summary: {
      total,
      passed,
      warnings,
      errors
    }
  }
}

// Quick Quality Score
export function getContentQualityScore(content: ContentItem): {
  score: number // 0-100
  grade: 'A' | 'B' | 'C' | 'D' | 'F'
  feedback: string[]
} {
  const testResults = runContentTests(content)
  const { total, passed, warnings, errors } = testResults.summary

  // Calculate score: Full points for passed, half points for warnings, no points for errors
  const score = Math.round(((passed + warnings * 0.5) / total) * 100)

  let grade: 'A' | 'B' | 'C' | 'D' | 'F'
  if (score >= 90) grade = 'A'
  else if (score >= 80) grade = 'B'
  else if (score >= 70) grade = 'C'
  else if (score >= 60) grade = 'D'
  else grade = 'F'

  const feedback: string[] = []
  
  if (errors > 0) {
    feedback.push(`${errors} critical issues need to be fixed`)
  }
  if (warnings > 0) {
    feedback.push(`${warnings} improvements recommended`)
  }
  if (score >= 90) {
    feedback.push('Excellent content quality!')
  } else if (score >= 70) {
    feedback.push('Good content with room for improvement')
  } else {
    feedback.push('Content needs significant improvement before publishing')
  }

  return { score, grade, feedback }
}

// Batch Testing
export function runBatchContentTests(contents: ContentItem[]): {
  overall: {
    averageScore: number
    distribution: Record<'A' | 'B' | 'C' | 'D' | 'F', number>
    readyToPublish: number
    needsWork: number
  }
  individual: Array<{
    content: ContentItem
    score: number
    grade: 'A' | 'B' | 'C' | 'D' | 'F'
    issues: number
  }>
} {
  const individual = contents.map(content => {
    const quality = getContentQualityScore(content)
    const testResults = runContentTests(content)
    
    return {
      content,
      score: quality.score,
      grade: quality.grade,
      issues: testResults.summary.errors + testResults.summary.warnings
    }
  })

  const averageScore = individual.reduce((sum, item) => sum + item.score, 0) / individual.length
  
  const distribution = individual.reduce((dist, item) => {
    dist[item.grade]++
    return dist
  }, { A: 0, B: 0, C: 0, D: 0, F: 0 })

  const readyToPublish = individual.filter(item => item.score >= 80 && item.issues === 0).length
  const needsWork = individual.filter(item => item.score < 70 || item.issues > 0).length

  return {
    overall: {
      averageScore: Math.round(averageScore),
      distribution,
      readyToPublish,
      needsWork
    },
    individual
  }
}
