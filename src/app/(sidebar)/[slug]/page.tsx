import { notFound } from 'next/navigation'
import { lessons } from '@/data/lessons'
import InteractiveLessonRenderer from '@/components/lessons/InteractiveLessonRenderer'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params
  
  // Find the lesson by slug
  const lesson = lessons.find(l => l.id === slug)
  
  if (!lesson) {
    notFound()
  }
  
  // Handle interactive lessons
  if (lesson.type === 'interactive' && lesson.interactiveData) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <InteractiveLessonRenderer 
          lesson={lesson.interactiveData}
          studentId="demo-student"
        />
      </div>
    )
  }
  
  // Handle traditional lessons (placeholder for now)
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {lesson.title}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {lesson.description}
        </p>
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <p className="text-blue-800 dark:text-blue-200">
            Traditional lesson rendering will be implemented here.
          </p>
          <p className="text-sm text-blue-600 dark:text-blue-400 mt-2">
            Duration: {lesson.duration} • Difficulty: {lesson.difficulty}
          </p>
        </div>
      </div>
    </div>
  )
}

// Generate static params for all lessons
export async function generateStaticParams() {
  return lessons.map((lesson) => ({
    slug: lesson.id,
  }))
}
