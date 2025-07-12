import { Metadata } from 'next'
import { SynchronizedLesson } from '@/components/synchronized-lesson'

export const metadata: Metadata = {
  title: 'HTML & CSS Synchronized Learning | RockitCode',
  description: 'Learn HTML & CSS with synchronized video content and live code editor. Interactive coding lessons with step-by-step video tutorials.',
}

export default function HtmlCssSynchronizedPage() {
  return (
    <div className="w-full">
      <SynchronizedLesson />
    </div>
  )
}
