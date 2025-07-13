'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CourseContentIntegration } from './course-content-integration'

interface CourseProgress {
  courseId: string
  lessonsCompleted: number
  totalLessons: number
  lastAccessed: string
  completionPercentage: number
  currentLesson: string
}

interface LearningStats {
  totalCourses: number
  coursesStarted: number
  coursesCompleted: number
  totalLessons: number
  lessonsCompleted: number
  streakDays: number
  totalTimeMinutes: number
}

export function EnhancedLearningDashboard() {
  const { data: session } = useSession()
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([])
  const [learningStats, setLearningStats] = useState<LearningStats>({
    totalCourses: 3,
    coursesStarted: 0,
    coursesCompleted: 0,
    totalLessons: 45,
    lessonsCompleted: 0,
    streakDays: 0,
    totalTimeMinutes: 0
  })

  // Load progress from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedProgress = localStorage.getItem('course-progress')
      const savedStats = localStorage.getItem('learning-stats')
      
      if (savedProgress) {
        setCourseProgress(JSON.parse(savedProgress))
      }
      if (savedStats) {
        setLearningStats(JSON.parse(savedStats))
      }
    }
  }, [])

  // Save progress when it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('course-progress', JSON.stringify(courseProgress))
      localStorage.setItem('learning-stats', JSON.stringify(learningStats))
    }
  }, [courseProgress, learningStats])

  const availableCourses = [
    {
      id: 'html-css',
      title: 'HTML & CSS Fundamentals',
      description: 'Build beautiful, responsive websites from scratch',
      duration: '4-6 hours',
      lessons: 12,
      difficulty: 'Beginner',
      icon: '🎨',
      color: 'from-blue-500 to-cyan-500',
      technologies: ['HTML5', 'CSS3', 'Flexbox', 'Grid', 'Responsive Design']
    },
    {
      id: 'javascript',
      title: 'JavaScript Essentials',
      description: 'Master modern JavaScript and build interactive applications',
      duration: '8-10 hours',
      lessons: 18,
      difficulty: 'Intermediate',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-500',
      technologies: ['ES6+', 'DOM', 'Async/Await', 'APIs', 'Modules']
    },
    {
      id: 'python',
      title: 'Python Programming',
      description: 'Learn Python for web development, automation, and data science',
      duration: '10-12 hours',
      lessons: 15,
      difficulty: 'Beginner',
      icon: '🐍',
      color: 'from-green-500 to-emerald-500',
      technologies: ['Python 3', 'Flask', 'APIs', 'Data Structures', 'OOP']
    }
  ]

  const getCourseProgress = (courseId: string): CourseProgress | null => {
    return courseProgress.find(cp => cp.courseId === courseId) || null
  }

  const startCourse = (courseId: string) => {
    const existingProgress = getCourseProgress(courseId)
    if (!existingProgress) {
      const newProgress: CourseProgress = {
        courseId,
        lessonsCompleted: 0,
        totalLessons: availableCourses.find(c => c.id === courseId)?.lessons || 0,
        lastAccessed: new Date().toISOString(),
        completionPercentage: 0,
        currentLesson: 'introduction'
      }
      setCourseProgress([...courseProgress, newProgress])
      setLearningStats(prev => ({
        ...prev,
        coursesStarted: prev.coursesStarted + 1
      }))
    }
  }

  const calculateOverallProgress = () => {
    if (courseProgress.length === 0) return 0
    const totalProgress = courseProgress.reduce((sum, cp) => sum + cp.completionPercentage, 0)
    return Math.round(totalProgress / courseProgress.length)
  }

  return (
    <div className="max-w-6xl p-6 mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">
          🎯 Learning Mission Center
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Transform from beginner to professional developer with guided missions
        </p>
      </div>

      {/* Learning Stats Dashboard */}
      <div className="p-6 mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
        <h2 className="flex items-center mb-4 text-xl font-semibold">
          <span className="mr-2">📊</span>
          Mission Intelligence
        </h2>
        
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{learningStats.coursesStarted}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Missions Active</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{learningStats.lessonsCompleted}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lessons Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{calculateOverallProgress()}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Overall Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{learningStats.streakDays}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2 text-sm text-gray-600 dark:text-gray-400">
            <span>Mission Progress</span>
            <span>{calculateOverallProgress()}% Complete</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full dark:bg-gray-700">
            <div 
              className="h-3 transition-all duration-500 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              style={{ width: `${calculateOverallProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableCourses.map((course) => {
          const progress = getCourseProgress(course.id)
          const isStarted = progress !== null
          const isCompleted = progress?.completionPercentage === 100

          return (
            <div
              key={course.id}
              className="overflow-hidden transition-all duration-300 transform bg-white border border-gray-200 dark:bg-gray-800 rounded-xl dark:border-gray-700 hover:shadow-lg hover:-translate-y-1"
            >
              {/* Course Header */}
              <div className={`bg-gradient-to-r ${course.color} p-6 text-white`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-3xl">{course.icon}</span>
                  <div className="text-right">
                    <div className="text-sm opacity-90">{course.difficulty}</div>
                    <div className="text-xs opacity-75">{course.duration}</div>
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold">{course.title}</h3>
                <p className="text-sm opacity-90">{course.description}</p>
              </div>

              {/* Progress Section */}
              {isStarted && (
                <div className="p-4 bg-gray-50 dark:bg-gray-700">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Progress</span>
                    <span className={`font-semibold ${
                      isCompleted ? 'text-green-600' : 'text-blue-600'
                    }`}>
                      {progress.lessonsCompleted}/{progress.totalLessons} lessons
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-600">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isCompleted ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${progress.completionPercentage}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Course Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="flex items-center mb-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="mr-1">📚</span>
                    {course.lessons} lessons
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {course.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                    {course.technologies.length > 3 && (
                      <span className="inline-block px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded dark:bg-gray-700 dark:text-gray-300">
                        +{course.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="space-y-2">
                  {!isStarted ? (
                    <button
                      onClick={() => startCourse(course.id)}
                      className={`w-full px-4 py-3 bg-gradient-to-r ${course.color} text-white rounded-lg font-semibold hover:opacity-90 transition-opacity`}
                    >
                      🚀 Start Mission
                    </button>
                  ) : isCompleted ? (
                    <div className="space-y-2">
                      <div className="w-full px-4 py-3 font-semibold text-center text-green-700 bg-green-100 rounded-lg dark:bg-green-900/20 dark:text-green-300">
                        ✅ Mission Complete!
                      </div>
                      <Link
                        href={`/${course.id}`}
                        className="block w-full px-4 py-2 text-center transition-colors border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        📖 Review Content
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link
                        href={`/${course.id}/${progress.currentLesson}`}
                        className={`block w-full px-4 py-3 bg-gradient-to-r ${course.color} text-white rounded-lg font-semibold text-center hover:opacity-90 transition-opacity`}
                      >
                        📖 Continue Mission
                      </Link>
                      <Link
                        href={`/${course.id}`}
                        className="block w-full px-4 py-2 text-sm text-center transition-colors border border-gray-300 rounded-lg dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        📋 View All Lessons
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="mt-12 text-center">
        <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
          <h3 className="mb-4 text-lg font-semibold">🎯 Next Steps</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Link
              href="/interviews"
              className="p-4 transition-colors border border-gray-200 rounded-lg dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700"
            >
              <div className="mb-2 text-2xl">💼</div>
              <div className="font-semibold">Interview Prep</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Practice coding interviews</div>
            </Link>
            <Link
              href="/projects"
              className="p-4 transition-colors border border-gray-200 rounded-lg dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700"
            >
              <div className="mb-2 text-2xl">🚀</div>
              <div className="font-semibold">Build Projects</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Apply your skills</div>
            </Link>
            <Link
              href="/resources"
              className="p-4 transition-colors border border-gray-200 rounded-lg dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700"
            >
              <div className="mb-2 text-2xl">📚</div>
              <div className="font-semibold">Developer Resources</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tools & references</div>
            </Link>
          </div>
        </div>
      </div>

      {/* Course Content Integration - Show when a course is active */}
      {courseProgress.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <div className="overflow-hidden bg-white border border-gray-200 dark:bg-gray-800 rounded-xl dark:border-gray-700">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="flex items-center text-xl font-semibold">
                <span className="mr-2">🎓</span>
                Interactive Learning Environment
              </h3>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                Dive deep into course content with interactive examples and quizzes
              </p>
            </div>
            <CourseContentIntegration />
          </div>
        </motion.div>
      )}
    </div>
  )
}
