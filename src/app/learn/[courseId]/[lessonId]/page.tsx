import { getRockitCourse, getRockitLesson, getRockitLessonContent } from '@/data/rockitcode-courses'
import { RockitLessonRenderer } from '@/components/rockitcode/lesson-renderer'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface LessonPageProps {
  params: Promise<{
    courseId: string
    lessonId: string
  }>
}

export default async function LessonPage({ params }: LessonPageProps) {
  const resolvedParams = await params
  const course = await getRockitCourse(resolvedParams.courseId)
  const lesson = await getRockitLesson(resolvedParams.courseId, resolvedParams.lessonId)
  
  if (!course || !lesson) {
    notFound()
  }

  // Try to get MDX content for the lesson
  const LessonContent = await getRockitLessonContent(resolvedParams.courseId, resolvedParams.lessonId)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl px-6 py-8 mx-auto">
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
        <div className="p-6 mb-8 bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{course.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {lesson.title}
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
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

        {/* Lesson Content */}
        <div className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <div className="p-8 prose prose-lg dark:prose-invert max-w-none">
            {LessonContent ? (
              <LessonContent />
            ) : (
              <RockitLessonRenderer 
                lesson={lesson} 
                courseId={resolvedParams.courseId}
                className="lesson-content"
              />
            )}
          </div>
        </div>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between mt-8">
          <Link
            href={`/learn/${course.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
          >
            ← Back to Course
          </Link>
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Lesson {lesson.order} of {course.milestones.reduce((sum: number, milestone: any) => sum + milestone.lessons.length, 0)}
          </div>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all lessons
export async function generateStaticParams() {
  const courses = [
    { id: 'html-css' },
    { id: 'javascript' }, 
    { id: 'python' }
  ]
  
  const paths: { courseId: string; lessonId: string }[] = []
  
  for (const courseData of courses) {
    const course = await getRockitCourse(courseData.id)
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
