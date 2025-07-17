import { Metadata } from 'next'
import Link from 'next/link'
import { foundationCourse } from '@/data/foundation-course'
import { renderIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Foundation Course: Design to Code Fundamentals | RockitCode',
  description: 'Build a beautiful personal portfolio from Figma design to deployed website. Learn modern web development with real-world projects.',
}

export default function FoundationCoursePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Subtle Space Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        {/* Subtle Stars */}
        <div className="absolute w-1 h-1 rounded-full top-20 left-20 bg-white/60"></div>
        <div className="absolute w-1 h-1 rounded-full top-40 right-32 bg-blue-200/40"></div>
        <div className="absolute top-64 left-1/3 w-0.5 h-0.5 bg-white/50 rounded-full"></div>
        <div className="absolute w-1 h-1 rounded-full bottom-40 right-20 bg-white/30"></div>
        <div className="absolute bottom-64 left-16 w-0.5 h-0.5 bg-blue-100/40 rounded-full"></div>
      </div>

      <div className="relative max-w-7xl px-6 mx-auto py-20">
        {/* Course Header */}
        <div className="text-center mb-16">
          {/* Professional Foundation Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              {renderIcon('building', "w-16 h-16 text-blue-400")}
              <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
            </div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-700/50 inline-block mb-6">
            <span className="text-slate-300 font-medium">Foundation Course</span>
          </div>
          
          <h1 className="text-5xl font-light mb-6 text-white tracking-wide">
            {foundationCourse.title}
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
            {foundationCourse.description}
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="bg-white/[0.08] backdrop-blur-xl rounded-xl px-6 py-3 border border-white/[0.12]">
              <span className="text-slate-400 text-sm">Duration:</span>
              <span className="ml-2 font-semibold text-white">{foundationCourse.duration}</span>
            </div>
            <div className="bg-white/[0.08] backdrop-blur-xl rounded-xl px-6 py-3 border border-white/[0.12]">
              <span className="text-slate-400 text-sm">Level:</span>
              <span className="ml-2 font-semibold text-white capitalize">{foundationCourse.level}</span>
            </div>
            <div className="bg-white/[0.08] backdrop-blur-xl rounded-xl px-6 py-3 border border-white/[0.12]">
              <span className="text-slate-400 text-sm">Lessons:</span>
              <span className="ml-2 font-semibold text-white">
                {foundationCourse.milestones.reduce((total, milestone) => total + milestone.lessons.length, 0)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Project Showcase */}
        <div className="bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/[0.1] p-12 mb-16 shadow-2xl">
          <div className="text-center">
            <h2 className="text-4xl font-light text-white mb-6">Build: {foundationCourse.project.name}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
              {foundationCourse.project.description}
            </p>
            
            <div className="grid gap-8 text-left md:grid-cols-2 mb-8">
              <div className="bg-white/[0.08] backdrop-blur-xl rounded-xl p-8 border border-white/[0.12]">
                <h3 className="text-xl font-semibold text-white mb-4">What You'll Build</h3>
                <p className="text-slate-300 leading-relaxed">{foundationCourse.project.finalResult}</p>
              </div>
              <div className="bg-white/[0.08] backdrop-blur-xl rounded-xl p-8 border border-white/[0.12]">
                <h3 className="text-xl font-semibold text-white mb-4">Portfolio Value</h3>
                <p className="text-slate-300 leading-relaxed">{foundationCourse.project.portfolioValue}</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-white mb-4">Technologies You'll Master</h3>
              <div className="flex flex-wrap justify-center gap-3">
                {foundationCourse.technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-4 py-2 text-sm font-medium text-white bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700/50"
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
          <h2 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">
            Course Milestones
          </h2>
          
          {foundationCourse.milestones.map((milestone, milestoneIndex) => (
            <div 
              key={milestone.id}
              className="overflow-hidden bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700"
            >
              {/* Milestone Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold text-white bg-blue-600 rounded-full">
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
                      className="p-4 transition-colors border border-gray-200 rounded-lg dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-6 h-6 mr-3 text-xs font-bold text-gray-600 bg-gray-100 rounded-full dark:bg-gray-600 dark:text-gray-300">
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
                      
                      <p className="mb-3 text-sm text-gray-600 dark:text-gray-400">
                        {lesson.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {lesson.chapters.length} chapters • {lesson.quiz.length} quiz questions
                        </div>
                        
                        {/* Lesson links to actual working lessons */}
                        {lesson.id === 'portfolio-strategy' && (
                          <Link
                            href="/foundation/portfolio-strategy"
                            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                          >
                            Start Lesson
                          </Link>
                        )}
                        {lesson.id === 'lesson-1-vscode-basics' && (
                          <Link
                            href="/foundation/chapter-1-vscode"
                            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                          >
                            Start VSCode Journey
                          </Link>
                        )}
                        {lesson.id === 'lesson-2-git-github' && (
                          <Link
                            href="/foundation/chapter-2-git"
                            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                          >
                            Start Git Journey
                          </Link>
                        )}
                        {lesson.id === 'vscode-mastery' && (
                          <Link
                            href="/foundation/vscode-mastery"
                            className="px-4 py-2 text-sm font-medium text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
                          >
                            Start VSCode Lab
                          </Link>
                        )}
                      </div>
                      
                      {/* Add manual Git lesson link if this is the only lesson in Chapter 1 */}
                      {milestone.id === 'chapter-1' && lessonIndex === 0 && (
                        <div className="p-4 mt-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-600">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                Lesson 2: Git & GitHub Basics
                              </h4>
                              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
                                Master version control with interactive git terminal simulation
                              </p>
                            </div>
                            <Link
                              href="/foundation/chapter-2-git"
                              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                            >
                              Start Git Journey
                            </Link>
                          </div>
                        </div>
                      )}
                      
                      {/* Project Component */}
                      <div className="p-3 mt-3 border border-blue-200 rounded bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700">
                        <div className="flex items-center text-blue-800 dark:text-blue-200">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm font-medium">
                            Project Component: {lesson.codeProject.portfolioComponent}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Milestone Project Summary */}
                <div className="p-4 mt-6 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900/20 dark:border-green-700">
                  <h4 className="mb-2 font-semibold text-green-800 dark:text-green-200">
                    Milestone Project: {milestone.project.component}
                  </h4>
                  <p className="mb-3 text-sm text-green-700 dark:text-green-300">
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
        <div className="p-8 mt-12 text-center bg-white border border-gray-200 shadow-sm dark:bg-gray-800 rounded-xl dark:border-gray-700">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Ready to Rock Your IT Skills?
          </h2>
          <p className="max-w-2xl mx-auto mb-6 text-gray-600 dark:text-gray-400">
            Join thousands of students building interview-ready portfolios and landing their dream developer jobs.
          </p>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/foundation/chapter-1-vscode"
              className="px-8 py-3 font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Start Foundation Course
            </Link>
            <Link
              href="/foundation/portfolio-strategy"
              className="px-8 py-3 font-semibold text-gray-700 transition-colors border border-gray-300 rounded-lg dark:border-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Portfolio Strategy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
