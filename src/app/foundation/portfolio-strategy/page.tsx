import LessonPage from '@/components/lesson-page'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio Strategy & Personal Branding | RockitCode Foundation Course',
  description: 'Learn to define your developer brand and plan your portfolio strategy in this comprehensive lesson.',
}

export default function PortfolioStrategyLesson() {
  return (
    <LessonPage 
      courseId="foundation-design-to-code"
      milestoneId="design-foundation"
      lessonId="portfolio-strategy"
    />
  )
}
