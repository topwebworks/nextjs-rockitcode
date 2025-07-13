'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { InteractiveCodeBlock, InteractiveQuiz, ProgressTracker } from './interactive-content'
import { AnimatedProgressBar, FloatingCard, FadeInOnScroll } from './animations'

// Simple icon components
const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
  </svg>
)

const ClockIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
)

const BookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
)

const PlayIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
  </svg>
)

// Enhanced course data with interactive content
const enhancedCourses = [
  {
    id: 'html-css-basics',
    title: 'HTML & CSS Fundamentals',
    description: 'Master the building blocks of web development',
    difficulty: 'Beginner',
    duration: '4 weeks',
    chapters: [
      {
        id: 'html-structure',
        title: 'HTML Document Structure',
        lessons: [
          {
            id: 'basic-html',
            title: 'Basic HTML Elements',
            content: {
              type: 'interactive',
              blocks: [
                {
                  type: 'text',
                  content: 'HTML (HyperText Markup Language) is the foundation of web development. Let\'s start with a basic HTML document structure:'
                },
                {
                  type: 'code',
                  language: 'html',
                  code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Website</title>
</head>
<body>
    <h1>Welcome to Web Development!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`,
                  explanation: 'This is a complete HTML document. Try modifying the title and paragraph text!',
                  editable: true
                },
                {
                  type: 'quiz',
                  question: 'What does the <!DOCTYPE html> declaration do?',
                  options: [
                    'Defines the document as HTML5',
                    'Sets the page title',
                    'Creates a heading',
                    'Adds styling to the page'
                  ],
                  correct: 0,
                  explanation: 'The <!DOCTYPE html> declaration tells the browser that this is an HTML5 document.'
                }
              ]
            }
          },
          {
            id: 'semantic-html',
            title: 'Semantic HTML Elements',
            content: {
              type: 'interactive',
              blocks: [
                {
                  type: 'text',
                  content: 'Semantic HTML elements provide meaning to your content. They help both browsers and developers understand the structure of your page.'
                },
                {
                  type: 'code',
                  language: 'html',
                  code: `<header>
  <nav>
    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </nav>
</header>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Article content goes here...</p>
  </article>
  
  <aside>
    <h2>Related Links</h2>
    <ul>
      <li><a href="#">Link 1</a></li>
      <li><a href="#">Link 2</a></li>
    </ul>
  </aside>
</main>

<footer>
  <p>&copy; 2024 My Website</p>
</footer>`,
                  explanation: 'These semantic elements clearly define different sections of your webpage.',
                  editable: true
                }
              ]
            }
          }
        ]
      },
      {
        id: 'css-styling',
        title: 'CSS Styling Fundamentals',
        lessons: [
          {
            id: 'css-selectors',
            title: 'CSS Selectors & Properties',
            content: {
              type: 'interactive',
              blocks: [
                {
                  type: 'text',
                  content: 'CSS selectors allow you to target specific HTML elements and apply styles to them.'
                },
                {
                  type: 'code',
                  language: 'css',
                  code: `/* Element selector */
h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* Class selector */
.highlight {
  background-color: yellow;
  padding: 0.5rem;
}

/* ID selector */
#main-content {
  max-width: 800px;
  margin: 0 auto;
}

/* Descendant selector */
nav ul li {
  list-style: none;
  display: inline-block;
  margin-right: 1rem;
}`,
                  explanation: 'Try changing the colors, sizes, or adding new properties!',
                  editable: true
                },
                {
                  type: 'quiz',
                  question: 'Which CSS selector targets elements with class="highlight"?',
                  options: [
                    '#highlight',
                    '.highlight',
                    'highlight',
                    'class.highlight'
                  ],
                  correct: 1,
                  explanation: 'The dot (.) prefix is used to select elements by their class attribute.'
                }
              ]
            }
          }
        ]
      }
    ],
    progress: 65,
    completedLessons: 8,
    totalLessons: 12
  },
  {
    id: 'javascript-fundamentals',
    title: 'JavaScript Programming',
    description: 'Learn the language that powers modern web applications',
    difficulty: 'Intermediate',
    duration: '6 weeks',
    chapters: [
      {
        id: 'js-basics',
        title: 'JavaScript Basics',
        lessons: [
          {
            id: 'variables-functions',
            title: 'Variables and Functions',
            content: {
              type: 'interactive',
              blocks: [
                {
                  type: 'text',
                  content: 'JavaScript variables store data values, and functions allow you to organize and reuse code.'
                },
                {
                  type: 'code',
                  language: 'javascript',
                  code: `// Variables
let userName = 'Alice';
const age = 25;
var isStudent = true;

// Functions
function greetUser(name) {
  return \`Hello, \${name}! Welcome to JavaScript.\`;
}

// Arrow function
const calculateAge = (birthYear) => {
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
};

// Usage
console.log(greetUser(userName));
console.log(\`Age: \${calculateAge(1998)}\`);`,
                  explanation: 'Try changing the values or creating your own functions!',
                  editable: true
                },
                {
                  type: 'quiz',
                  question: 'What is the difference between let and const?',
                  options: [
                    'let is for numbers, const is for strings',
                    'let can be reassigned, const cannot',
                    'const is faster than let',
                    'There is no difference'
                  ],
                  correct: 1,
                  explanation: 'const creates immutable bindings - you cannot reassign the variable after declaration.'
                }
              ]
            }
          }
        ]
      }
    ],
    progress: 30,
    completedLessons: 4,
    totalLessons: 18
  }
]

interface LessonViewerProps {
  courseId: string
  chapterId: string
  lessonId: string
  onComplete?: () => void
}

export function LessonViewer({ courseId, chapterId, lessonId, onComplete }: LessonViewerProps) {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0)
  const [lessonProgress, setLessonProgress] = useState(0)

  // Find the lesson content
  const course = enhancedCourses.find(c => c.id === courseId)
  const chapter = course?.chapters.find(ch => ch.id === chapterId)
  const lesson = chapter?.lessons.find(l => l.id === lessonId)

  if (!lesson) {
    return <div>Lesson not found</div>
  }

  const blocks = lesson.content.blocks
  const currentBlock = blocks[currentBlockIndex]

  const handleNext = () => {
    if (currentBlockIndex < blocks.length - 1) {
      setCurrentBlockIndex(prev => prev + 1)
      setLessonProgress(((currentBlockIndex + 1) / blocks.length) * 100)
    } else {
      setLessonProgress(100)
      onComplete?.()
    }
  }

  const handlePrevious = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(prev => prev - 1)
      setLessonProgress((currentBlockIndex / blocks.length) * 100)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {lesson.title}
          </h1>
          <span className="text-sm text-gray-500">
            {currentBlockIndex + 1} of {blocks.length}
          </span>
        </div>
        <AnimatedProgressBar 
          progress={lessonProgress} 
          showPercentage={false}
          height="h-2"
        />
      </div>

      {/* Content block */}
      <FadeInOnScroll key={currentBlockIndex}>
        <FloatingCard className="mb-8">
          {currentBlock.type === 'text' && (
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg leading-relaxed">{currentBlock.content}</p>
            </div>
          )}

          {currentBlock.type === 'code' && (
            <InteractiveCodeBlock
              language={currentBlock.language || 'text'}
              code={currentBlock.code || ''}
              explanation={[currentBlock.explanation || '']}
              editable={currentBlock.editable}
            />
          )}

          {currentBlock.type === 'quiz' && (
            <InteractiveQuiz
              quiz={{
                id: `quiz-${currentBlockIndex}`,
                question: currentBlock.question || '',
                options: currentBlock.options || [],
                correctAnswer: currentBlock.correct || 0,
                explanation: currentBlock.explanation || ''
              }}
              onAnswer={(correct) => {
                if (correct) handleNext()
              }}
            />
          )}
        </FloatingCard>
      </FadeInOnScroll>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <motion.button
          onClick={handlePrevious}
          disabled={currentBlockIndex === 0}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ChevronRightIcon className="w-4 h-4 rotate-180" />
          Previous
        </motion.button>

        {currentBlock.type !== 'quiz' && (
          <motion.button
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentBlockIndex === blocks.length - 1 ? 'Complete Lesson' : 'Continue'}
            <ChevronRightIcon className="w-4 h-4" />
          </motion.button>
        )}
      </div>
    </div>
  )
}

interface CourseOverviewProps {
  courseId: string
  onStartLesson?: (chapterId: string, lessonId: string) => void
}

export function CourseOverview({ courseId, onStartLesson }: CourseOverviewProps) {
  const course = enhancedCourses.find(c => c.id === courseId)

  if (!course) {
    return <div>Course not found</div>
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Course header */}
      <div className="mb-12">
        <FloatingCard className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-xl">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-xl opacity-90 mb-6">{course.description}</p>
          
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <ClockIcon className="w-4 h-4" />
              {course.duration}
            </div>
            <div className="flex items-center gap-2">
              <BookIcon className="w-4 h-4" />
              {course.difficulty}
            </div>
            <div className="flex items-center gap-2">
              <PlayIcon className="w-4 h-4" />
              {course.completedLessons}/{course.totalLessons} lessons
            </div>
          </div>
        </FloatingCard>
      </div>

      {/* Progress overview */}
      <div className="mb-12">
        <FloatingCard className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
          <ProgressTracker 
            currentLesson={course.completedLessons} 
            totalLessons={course.totalLessons}
            completedLessons={Array.from({ length: course.completedLessons }, (_, i) => i + 1)}
            onLessonComplete={() => {}}
          />
        </FloatingCard>
      </div>

      {/* Chapters and lessons */}
      <div className="space-y-8">
        {course.chapters.map((chapter, chapterIndex) => (
          <FadeInOnScroll key={chapter.id}>
            <FloatingCard className="p-6" delay={chapterIndex * 0.1}>
              <h3 className="text-xl font-semibold mb-4">{chapter.title}</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                {chapter.lessons.map((lesson, lessonIndex) => (
                  <motion.div
                    key={lesson.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => onStartLesson?.(chapter.id, lesson.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <h4 className="font-medium mb-2">{lesson.title}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Lesson {lessonIndex + 1}</span>
                      <ChevronRightIcon className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </FloatingCard>
          </FadeInOnScroll>
        ))}
      </div>
    </div>
  )
}

export function CourseContentIntegration() {
  const [currentView, setCurrentView] = useState<'overview' | 'lesson'>('overview')
  const [currentCourse, setCurrentCourse] = useState('html-css-basics')
  const [currentChapter, setCurrentChapter] = useState('')
  const [currentLesson, setCurrentLesson] = useState('')

  const handleStartLesson = (chapterId: string, lessonId: string) => {
    setCurrentChapter(chapterId)
    setCurrentLesson(lessonId)
    setCurrentView('lesson')
  }

  const handleLessonComplete = () => {
    // Update progress and return to overview
    setCurrentView('overview')
    // Here you would typically update the course progress in your state management
  }

  const handleBackToOverview = () => {
    setCurrentView('overview')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {currentView === 'overview' ? (
        <CourseOverview 
          courseId={currentCourse}
          onStartLesson={handleStartLesson}
        />
      ) : (
        <div>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <motion.button
              onClick={handleBackToOverview}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
              whileHover={{ x: -5 }}
            >
              <ChevronRightIcon className="w-4 h-4 rotate-180" />
              Back to Course Overview
            </motion.button>
          </div>
          
          <LessonViewer
            courseId={currentCourse}
            chapterId={currentChapter}
            lessonId={currentLesson}
            onComplete={handleLessonComplete}
          />
        </div>
      )}
    </div>
  )
}
