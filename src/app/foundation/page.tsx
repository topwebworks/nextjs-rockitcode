import { Metadata } from 'next'
import Link from 'next/link'
import { foundationCourse } from '@/data/foundation-course'

export const metadata: Metadata = {
  title: 'Foundation Course: Design to Code Fundamentals | RockitCode',
  description: 'Build a beautiful personal portfolio from Figma design to deployed website. Learn modern web development with real-world projects.',
}

export default function FoundationCoursePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Course Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-4">
            Foundation Course
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {foundationCourse.title}
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            {foundationCourse.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 text-sm">Duration:</span>
              <span className="font-semibold text-gray-900 dark:text-white ml-2">{foundationCourse.duration}</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 text-sm">Level:</span>
              <span className="font-semibold text-gray-900 dark:text-white ml-2 capitalize">{foundationCourse.level}</span>
            </div>
            <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700">
              <span className="text-gray-500 text-sm">Lessons:</span>
              <span className="font-semibold text-gray-900 dark:text-white ml-2">
                {foundationCourse.milestones.reduce((total, milestone) => total + milestone.lessons.length, 0)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Project Showcase */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Build: {foundationCourse.project.name}</h2>
            <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
              {foundationCourse.project.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">What You'll Build</h3>
                <p className="text-blue-100">{foundationCourse.project.finalResult}</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-3">Portfolio Value</h3>
                <p className="text-blue-100">{foundationCourse.project.portfolioValue}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-3">Technologies You'll Master</h3>
              <div className="flex flex-wrap justify-center gap-2">
                {foundationCourse.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Milestones */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Course Milestones
          </h2>
          
          {foundationCourse.milestones.map((milestone, milestoneIndex) => (
            <div 
              key={milestone.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Milestone Header */}
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mr-4">
                      {milestoneIndex + 1}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {milestone.duration}
                  </div>
                </div>
              </div>
              
              {/* Milestone Lessons */}
              <div className="p-6">
                <div className="grid gap-4">
                  {milestone.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                            {lessonIndex + 1}
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            {lesson.title}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {lesson.duration} min
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            lesson.difficulty === 'beginner' 
                              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                              : lesson.difficulty === 'intermediate'
                              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                              : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          }`}>
                            {lesson.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                        {lesson.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {lesson.chapters.length} chapters • {lesson.quiz.length} quiz questions
                        </div>
                        
                        {/* Demo lesson link */}
                        {lesson.id === 'portfolio-strategy' && (
                          <Link
                            href="/foundation/portfolio-strategy"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                          >
                            Start Lesson
                          </Link>
                        )}
                      </div>
                      
                      {/* Project Component */}
                      <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded p-3">
                        <div className="flex items-center text-blue-800 dark:text-blue-200">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium text-sm">
                            Project Component: {lesson.codeProject.portfolioComponent}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Milestone Project Summary */}
                <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    Milestone Project: {milestone.project.component}
                  </h4>
                  <p className="text-green-700 dark:text-green-300 text-sm mb-3">
                    {milestone.project.description}
                  </p>
                  <div className="text-xs text-green-600 dark:text-green-400">
                    Portfolio Integration: {milestone.project.portfolioIntegration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Rock Your IT Skills?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Join thousands of students building interview-ready portfolios and landing their dream developer jobs.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/foundation/portfolio-strategy"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Start Foundation Course
            </Link>
            <Link
              href="/courses"
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
