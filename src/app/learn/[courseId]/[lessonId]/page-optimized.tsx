// Free Tier optimized lesson page
import { getRockitCourse, getRockitLessonContent } from '@/data/rockitcode-courses'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface LessonPageProps {
  params: {
    courseId: string
    lessonId: string
  }
}

// Free Tier optimization: Pre-render everything, revalidate rarely
export const revalidate = 86400 // 24 hours - lessons rarely change

export default async function LessonPage({ params }: LessonPageProps) {
  const course = await getRockitCourse(params.courseId)
  
  if (!course) {
    notFound()
  }

  // Get lesson from course data (no separate DB call needed)
  const lesson = course.milestones
    .flatMap(m => m.lessons)
    .find(l => l.id === params.lessonId)
  
  if (!lesson) {
    notFound()
  }

  // Load React component (fast, no MDX compilation)
  const LessonContent = await getRockitLessonContent(params.courseId, params.lessonId)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link 
              href="/learn" 
              className="hover:text-gray-700 dark:hover:text-gray-300"
            >
              Learn
            </Link>
            <span>→</span>
            <Link 
              href={`/learn/${course.id}`}
              className="hover:text-gray-700 dark:hover:text-gray-300"
            >
              {course.title}
            </Link>
            <span>→</span>
            <span className="text-gray-900 dark:text-white">
              {lesson.title}
            </span>
          </div>
        </nav>

        {/* Lesson Header */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{course.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {lesson.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                {lesson.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span>🕒 {lesson.estimatedMinutes} minutes</span>
            {lesson.video && <span>🎥 Video included</span>}
            {lesson.exercises.length > 0 && <span>📝 {lesson.exercises.length} exercises</span>}
          </div>
        </div>

        {/* Lesson Content - React Component (fast!) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="p-8 prose prose-lg dark:prose-invert max-w-none">
            {LessonContent && <LessonContent />}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="mt-8 flex justify-between items-center">
          <Link
            href={`/learn/${course.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
          >
            ← Back to Course
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Lesson {lesson.order} of {course.milestones.reduce((sum, milestone) => sum + milestone.lessons.length, 0)}
          </div>
        </div>
      </div>
    </div>
  )
}

// Free Tier optimization: Pre-generate all lesson combinations
export async function generateStaticParams() {
  // This runs at build time, not runtime - perfect for Free Tier!
  const courseIds = ['html-css'] // Add more as you create them
  const paths: { courseId: string; lessonId: string }[] = []
  
  for (const courseId of courseIds) {
    const course = await getRockitCourse(courseId)
    if (course) {
      for (const milestone of course.milestones) {
        for (const lesson of milestone.lessons) {
          paths.push({
            courseId: course.id,
            lessonId: lesson.id
          })
        }
      }
    }
  }
  
  return paths
}

// Metadata for SEO (also pre-generated)
export async function generateMetadata({ params }: LessonPageProps) {
  const course = await getRockitCourse(params.courseId)
  const lesson = course?.milestones
    .flatMap(m => m.lessons)
    .find(l => l.id === params.lessonId)
  
  return {
    title: lesson ? `${lesson.title} | ${course?.title}` : 'Lesson Not Found',
    description: lesson?.description || 'Learn web development with RockitCode',
  }
}
