/**
 * Content Templates and Builders
 * 
 * Pre-built templates and helper functions for quickly creating
 * standardized educational content for RockitCode.
 */

import { 
  ContentItem, 
  LessonContent, 
  ExerciseContent, 
  QuizContent, 
  VideoContent, 
  ReadingContent,
  LessonSection,
  QuizQuestion,
  TestCase
} from '@/lib/content-management'

// Content Template Builders

/**
 * Create a complete lesson with common sections
 */
export function createLessonTemplate(
  title: string,
  description: string,
  options: {
    language?: 'html' | 'css' | 'javascript' | 'python' | 'general'
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    estimatedMinutes?: number
    includeVideo?: boolean
    includeExercise?: boolean
    includeQuiz?: boolean
  } = {}
): Omit<LessonContent, 'id' | 'createdAt' | 'updatedAt'> {
  const sections: LessonSection[] = [
    {
      id: 'introduction',
      title: 'Introduction',
      content: `Welcome to "${title}". In this lesson, you'll learn ${description.toLowerCase()}.`,
      type: 'text',
      estimatedMinutes: 2
    }
  ]

  if (options.includeVideo) {
    sections.push({
      id: 'video-explanation',
      title: 'Video Explanation',
      content: '<!-- Video embed will be configured in the content manager -->',
      type: 'video',
      estimatedMinutes: 8
    })
  }

  sections.push({
    id: 'key-concepts',
    title: 'Key Concepts',
    content: `
## What You'll Learn

- Concept 1: [Brief description]
- Concept 2: [Brief description]  
- Concept 3: [Brief description]

## Why This Matters

[Explain the practical importance and real-world applications]
    `,
    type: 'text',
    estimatedMinutes: 3
  })

  if (options.language && options.language !== 'general') {
    sections.push({
      id: 'code-example',
      title: 'Code Example',
      content: '<!-- Code examples will be added based on the lesson topic -->',
      type: 'code',
      estimatedMinutes: 5
    })
  }

  if (options.includeExercise) {
    sections.push({
      id: 'practice-exercise',
      title: 'Practice Exercise',
      content: '<!-- Interactive exercise will be configured separately -->',
      type: 'exercise',
      estimatedMinutes: 15
    })
  }

  if (options.includeQuiz) {
    sections.push({
      id: 'knowledge-check',
      title: 'Knowledge Check',
      content: '<!-- Quiz questions will be configured separately -->',
      type: 'quiz',
      estimatedMinutes: 5
    })
  }

  sections.push({
    id: 'summary',
    title: 'Summary',
    content: `
## What You've Learned

In this lesson, you've covered:

- [Key takeaway 1]
- [Key takeaway 2]
- [Key takeaway 3]

## Next Steps

- Apply these concepts in the next lesson
- Practice with additional exercises
- Review any challenging concepts
    `,
    type: 'text',
    estimatedMinutes: 2
  })

  return {
    type: 'lesson',
    title,
    description,
    content: {
      sections,
      resources: [
        {
          id: 'docs',
          title: 'Official Documentation',
          url: '#',
          type: 'documentation',
          description: 'Learn more from the official docs'
        }
      ]
    },
    metadata: {
      estimatedMinutes: options.estimatedMinutes || sections.reduce((total, section) => total + (section.estimatedMinutes || 0), 0),
      difficulty: options.difficulty || 'beginner',
      tags: [options.language || 'general'].filter(Boolean),
      prerequisites: [],
      learningObjectives: [
        `Understand the fundamentals of ${title.toLowerCase()}`,
        `Apply ${title.toLowerCase()} concepts in practical scenarios`,
        `Build confidence with ${title.toLowerCase()} through hands-on practice`
      ],
      language: options.language,
      isRequired: true,
      sortOrder: 0
    },
    status: 'draft'
  }
}

/**
 * Create a coding exercise template
 */
export function createExerciseTemplate(
  title: string,
  description: string,
  language: 'html' | 'css' | 'javascript' | 'python',
  options: {
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    estimatedMinutes?: number
    startingCode?: string
    solutionCode?: string
    hints?: string[]
  } = {}
): Omit<ExerciseContent, 'id' | 'createdAt' | 'updatedAt'> {
  const templates = {
    html: {
      starting: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    <!-- Your HTML code here -->
    
</body>
</html>`,
      solution: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is a sample solution.</p>
</body>
</html>`
    },
    css: {
      starting: `/* ${title} */

/* Add your CSS styles here */
`,
      solution: `/* ${title} */

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.title {
    color: #333;
    font-size: 2rem;
    margin-bottom: 1rem;
}`
    },
    javascript: {
      starting: `// ${title}

// Add your JavaScript code here
function solution() {
    // Your implementation
}`,
      solution: `// ${title}

function solution() {
    return "Hello, World!";
}

// Example usage
console.log(solution());`
    },
    python: {
      starting: `# ${title}

# Add your Python code here
def solution():
    # Your implementation
    pass`,
      solution: `# ${title}

def solution():
    return "Hello, World!"

# Example usage
if __name__ == "__main__":
    print(solution())`
    }
  }

  const template = templates[language]
  
  return {
    type: 'exercise',
    title,
    description,
    content: {
      instructions: description,
      startingCode: options.startingCode || template.starting,
      solutionCode: options.solutionCode || template.solution,
      hints: options.hints || [
        'Read the instructions carefully',
        'Start with the basic structure',
        'Test your code frequently',
        'Don\'t hesitate to check the solution if you\'re stuck'
      ],
      testCases: [
        {
          id: 'basic-test',
          input: 'basic input',
          expectedOutput: 'expected output',
          description: 'Basic functionality test',
          isHidden: false
        }
      ],
      language,
      environment: language === 'python' ? 'python' : language === 'javascript' ? 'node' : 'browser'
    },
    metadata: {
      estimatedMinutes: options.estimatedMinutes || 20,
      difficulty: options.difficulty || 'beginner',
      tags: [language, 'exercise', 'practice'],
      prerequisites: [],
      learningObjectives: [
        `Practice ${language} programming concepts`,
        'Apply problem-solving skills',
        'Build coding confidence through hands-on experience'
      ],
      language,
      isRequired: true,
      sortOrder: 0
    },
    status: 'draft'
  }
}

/**
 * Create a quiz template
 */
export function createQuizTemplate(
  title: string,
  description: string,
  options: {
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    estimatedMinutes?: number
    questionCount?: number
    language?: 'html' | 'css' | 'javascript' | 'python' | 'general'
  } = {}
): Omit<QuizContent, 'id' | 'createdAt' | 'updatedAt'> {
  const questionCount = options.questionCount || 5
  const questions: QuizQuestion[] = []

  // Generate sample questions
  for (let i = 1; i <= questionCount; i++) {
    questions.push({
      id: `question-${i}`,
      type: 'multiple-choice',
      question: `Sample question ${i} about ${title.toLowerCase()}?`,
      options: [
        'Option A',
        'Option B',
        'Option C',
        'Option D'
      ],
      correctAnswer: 'Option A',
      explanation: 'This is the correct answer because...',
      points: 1
    })
  }

  return {
    type: 'quiz',
    title,
    description,
    content: {
      questions,
      passingScore: Math.ceil(questionCount * 0.7), // 70% passing score
      randomizeQuestions: true,
      allowRetries: true,
      timeLimit: questionCount * 2 // 2 minutes per question
    },
    metadata: {
      estimatedMinutes: options.estimatedMinutes || questionCount * 2,
      difficulty: options.difficulty || 'beginner',
      tags: [options.language || 'general', 'quiz', 'assessment'].filter(Boolean),
      prerequisites: [],
      learningObjectives: [
        'Test understanding of key concepts',
        'Identify areas for review',
        'Reinforce learning through assessment'
      ],
      language: options.language,
      isRequired: true,
      sortOrder: 0
    },
    status: 'draft'
  }
}

/**
 * Create a video lesson template
 */
export function createVideoTemplate(
  title: string,
  description: string,
  videoId: string,
  provider: 'youtube' | 'vimeo' = 'youtube',
  options: {
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    estimatedMinutes?: number
    language?: 'html' | 'css' | 'javascript' | 'python' | 'general'
    includeTranscript?: boolean
  } = {}
): Omit<VideoContent, 'id' | 'createdAt' | 'updatedAt'> {
  return {
    type: 'video',
    title,
    description,
    content: {
      videoId,
      provider,
      transcript: options.includeTranscript ? 'Video transcript will be added here...' : undefined,
      chapters: [
        {
          id: 'intro',
          title: 'Introduction',
          startTime: 0,
          endTime: 60,
          description: 'Overview of the topic'
        },
        {
          id: 'main-content',
          title: 'Main Content',
          startTime: 60,
          endTime: 300,
          description: 'Core concepts and examples'
        },
        {
          id: 'summary',
          title: 'Summary',
          startTime: 300,
          endTime: 360,
          description: 'Key takeaways and next steps'
        }
      ]
    },
    metadata: {
      estimatedMinutes: options.estimatedMinutes || 6,
      difficulty: options.difficulty || 'beginner',
      tags: [options.language || 'general', 'video', 'tutorial'].filter(Boolean),
      prerequisites: [],
      learningObjectives: [
        'Visual learning through demonstration',
        'Follow along with expert instruction',
        'See concepts applied in real-time'
      ],
      language: options.language,
      isRequired: true,
      sortOrder: 0
    },
    status: 'draft'
  }
}

/**
 * Create a reading material template
 */
export function createReadingTemplate(
  title: string,
  description: string,
  options: {
    difficulty?: 'beginner' | 'intermediate' | 'advanced'
    estimatedMinutes?: number
    language?: 'html' | 'css' | 'javascript' | 'python' | 'general'
    wordCount?: number
  } = {}
): Omit<ReadingContent, 'id' | 'createdAt' | 'updatedAt'> {
  const wordCount = options.wordCount || 800
  const estimatedReadingTime = Math.ceil(wordCount / 200) // 200 words per minute average

  return {
    type: 'reading',
    title,
    description,
    content: {
      markdown: `# ${title}

${description}

## Introduction

[Introduction paragraph that hooks the reader and explains what they'll learn]

## Main Content

### Section 1: Key Concept

[Detailed explanation of the first key concept with examples]

### Section 2: Practical Application

[How this concept applies in real-world scenarios]

### Section 3: Common Pitfalls

[Things to watch out for and common mistakes]

## Summary

[Recap of the main points and key takeaways]

## Further Reading

- [Link to additional resources]
- [Link to related documentation]
- [Link to advanced topics]
`,
      estimatedReadingTime,
      resources: [
        {
          id: 'docs',
          title: 'Official Documentation',
          url: '#',
          type: 'documentation',
          description: 'Learn more from the official docs'
        },
        {
          id: 'examples',
          title: 'Code Examples',
          url: '#',
          type: 'example',
          description: 'See practical examples'
        }
      ]
    },
    metadata: {
      estimatedMinutes: options.estimatedMinutes || estimatedReadingTime,
      difficulty: options.difficulty || 'beginner',
      tags: [options.language || 'general', 'reading', 'theory'].filter(Boolean),
      prerequisites: [],
      learningObjectives: [
        'Deep understanding through reading',
        'Theoretical foundation',
        'Reference material for future use'
      ],
      language: options.language,
      isRequired: true,
      sortOrder: 0
    },
    status: 'draft'
  }
}

// Quick Content Builders for Common Scenarios

export const contentTemplates = {
  // HTML/CSS Templates
  htmlBasics: () => createLessonTemplate(
    'HTML Basics',
    'Learn the fundamental structure of HTML documents and common elements',
    { language: 'html', difficulty: 'beginner', estimatedMinutes: 25, includeExercise: true }
  ),

  cssSelectors: () => createLessonTemplate(
    'CSS Selectors',
    'Master CSS selectors to style your HTML elements effectively',
    { language: 'css', difficulty: 'beginner', estimatedMinutes: 30, includeExercise: true, includeQuiz: true }
  ),

  // JavaScript Templates
  jsVariables: () => createLessonTemplate(
    'JavaScript Variables',
    'Understand how to declare and use variables in JavaScript',
    { language: 'javascript', difficulty: 'beginner', estimatedMinutes: 20, includeExercise: true }
  ),

  jsFunctions: () => createLessonTemplate(
    'JavaScript Functions',
    'Learn to create and use functions to organize your code',
    { language: 'javascript', difficulty: 'beginner', estimatedMinutes: 35, includeVideo: true, includeExercise: true }
  ),

  // Python Templates
  pythonBasics: () => createLessonTemplate(
    'Python Basics',
    'Get started with Python programming fundamentals',
    { language: 'python', difficulty: 'beginner', estimatedMinutes: 30, includeExercise: true }
  ),

  pythonDataTypes: () => createLessonTemplate(
    'Python Data Types',
    'Explore different data types available in Python',
    { language: 'python', difficulty: 'beginner', estimatedMinutes: 25, includeExercise: true, includeQuiz: true }
  ),

  // Exercise Templates
  htmlForm: () => createExerciseTemplate(
    'Create a Contact Form',
    'Build a complete contact form using HTML elements',
    'html',
    { difficulty: 'beginner', estimatedMinutes: 30 }
  ),

  cssLayout: () => createExerciseTemplate(
    'Build a Responsive Layout',
    'Create a responsive webpage layout using CSS Flexbox',
    'css',
    { difficulty: 'intermediate', estimatedMinutes: 45 }
  ),

  jsCalculator: () => createExerciseTemplate(
    'Simple Calculator',
    'Build a basic calculator using JavaScript',
    'javascript',
    { difficulty: 'intermediate', estimatedMinutes: 60 }
  ),

  pythonGuessingGame: () => createExerciseTemplate(
    'Number Guessing Game',
    'Create a number guessing game in Python',
    'python',
    { difficulty: 'beginner', estimatedMinutes: 30 }
  )
}

// Content validation helpers
export function validateContentStructure(content: ContentItem): string[] {
  const errors: string[] = []

  if (!content.title?.trim()) {
    errors.push('Title is required')
  }

  if (!content.description?.trim()) {
    errors.push('Description is recommended')
  }

  if (content.metadata.estimatedMinutes <= 0) {
    errors.push('Estimated minutes must be greater than 0')
  }

  if (content.type === 'lesson') {
    const lesson = content as LessonContent
    if (!lesson.content.sections || lesson.content.sections.length === 0) {
      errors.push('Lessons must have at least one section')
    }
  }

  if (content.type === 'exercise') {
    const exercise = content as ExerciseContent
    if (!exercise.content.startingCode?.trim()) {
      errors.push('Exercises must have starting code')
    }
    if (!exercise.content.solutionCode?.trim()) {
      errors.push('Exercises must have solution code')
    }
  }

  return errors
}
