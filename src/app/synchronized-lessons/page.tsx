import { Metadata } from 'next'
import { SynchronizedLesson } from '@/components/synchronized-lesson'

export const metadata: Metadata = {
  title: 'Synchronized Learning Platform | RockitCode',
  description: 'Interactive coding lessons with synchronized video content and live code editor. Learn by coding along with our step-by-step video tutorials.',
}

export default function SynchronizedLessonsPage() {
  return (
    <div className="w-full">
      <SynchronizedLesson />
    </div>
  )
}
