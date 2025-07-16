import { getRockitCourse, getRockitCourses } from '@/data/rockitcode-courses'
import { LessonNavigation } from '@/components/rockitcode/lesson-navigation'
import { notFound } from 'next/navigation'

interface CoursePageProps {
  params: {
    courseId: string
  }
}

export default async function CoursePage({ params }: CoursePageProps) {
  const course = await getRockitCourse(params.courseId)
  
  if (!course) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl px-6 py-8 mx-auto">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-4xl">{course.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {course.title}
              </h1>
              <p className="mt-1 text-gray-600 dark:text-gray-400">
                {course.description}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              course.difficulty === 'beginner' 
                ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                : course.difficulty === 'intermediate'
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'  
                : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
            }`}>
              {course.difficulty}
            </span>
            <span>🕒 {course.estimatedHours}h total</span>
            <span>📚 {course.milestones.reduce((sum: number, milestone: any) => sum + milestone.lessons.length, 0)} lessons</span>
          </div>
        </div>

        {/* Course Navigation */}
        <LessonNavigation 
          courseId={course.id} 
          milestones={course.milestones}
          className="bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700"
        />
      </div>
    </div>
  )
}

// Generate static params for known courses
export async function generateStaticParams() {
  const courses = getRockitCourses()
  return courses.map(course => ({
    courseId: course.id
  }))
}
