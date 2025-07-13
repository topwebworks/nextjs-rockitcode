'use client'

import InteractiveLessonRenderer from '@/components/lessons/InteractiveLessonRenderer'
import missionControlSetupLesson from '@/data/lessons/week-1-chapter-1-mission-control-setup'

export default function InteractiveTestPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Interactive Lesson Test</h1>
        <p className="text-muted-foreground">
          Testing the interactive lesson system without authentication requirements.
        </p>
      </div>
      
      <InteractiveLessonRenderer 
        lesson={missionControlSetupLesson} 
        studentId="test-student-id"
      />
    </div>
  )
}
