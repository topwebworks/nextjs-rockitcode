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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6">
              Course Milestones
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto"></div>
          </div>
          
          {foundationCourse.milestones.map((milestone, milestoneIndex) => (
            <div 
              key={milestone.id}
              className="bg-white/[0.08] backdrop-blur-xl rounded-xl border border-white/[0.12] shadow-xl overflow-hidden"
            >
              {/* Milestone Header */}
              <div className="px-8 py-6 bg-white/[0.06] border-b border-white/[0.1]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-10 h-10 mr-6 text-sm font-semibold text-white bg-blue-600/80 backdrop-blur-sm rounded-full border border-blue-500/30">
                      {milestoneIndex + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-slate-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-slate-700/50">
                    <span className="text-slate-300 font-medium text-sm">
                      {milestone.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Milestone Lessons */}
              <div className="p-8">
                <div className="grid gap-6">
                  {milestone.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="bg-white/[0.06] backdrop-blur-xl rounded-xl p-6 border border-white/[0.1] hover:border-white/[0.2] transition-all duration-300 hover:bg-white/[0.08]"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <div className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-semibold text-white bg-slate-700/50 backdrop-blur-sm rounded-full border border-slate-600/50">
                            {lessonIndex + 1}
                          </div>
                          <h4 className="text-lg font-semibold text-white">
                            {lesson.title}
                          </h4>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-slate-400">
                            {lesson.duration} min
                          </span>
                          <span className={`px-3 py-1 rounded-lg text-xs font-medium backdrop-blur-sm ${
                            lesson.difficulty === 'beginner' 
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : lesson.difficulty === 'intermediate'
                              ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {lesson.difficulty}
                          </span>
                        </div>
                      </div>
                      
                      <p className="mb-4 text-slate-300 leading-relaxed">
                        {lesson.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-400">
                          {lesson.chapters.length} chapters • {lesson.quiz.length} quiz questions
                        </div>
                        
                        {/* Lesson links to actual working lessons */}
                        {lesson.id === 'portfolio-strategy' && (
                          <Link
                            href="/foundation/portfolio-strategy"
                            className="px-6 py-3 text-sm font-medium text-white bg-blue-600/80 backdrop-blur-sm rounded-lg hover:bg-blue-600 transition-all duration-200 border border-blue-500/30"
                          >
                            Start Lesson
                          </Link>
                        )}
                        {lesson.id === 'lesson-1-vscode-basics' && (
                          <Link
                            href="/foundation/chapter-1-vscode"
                            className="px-6 py-3 text-sm font-medium text-white bg-purple-600/80 backdrop-blur-sm rounded-lg hover:bg-purple-600 transition-all duration-200 border border-purple-500/30"
                          >
                            Start VSCode Journey
                          </Link>
                        )}
                        {lesson.id === 'lesson-2-git-github' && (
                          <Link
                            href="/foundation/chapter-2-git"
                            className="px-6 py-3 text-sm font-medium text-white bg-green-600/80 backdrop-blur-sm rounded-lg hover:bg-green-600 transition-all duration-200 border border-green-500/30"
                          >
                            Start Git Journey
                          </Link>
                        )}
                        {lesson.id === 'vscode-mastery' && (
                          <Link
                            href="/foundation/vscode-mastery"
                            className="px-6 py-3 text-sm font-medium text-white bg-purple-600/80 backdrop-blur-sm rounded-lg hover:bg-purple-600 transition-all duration-200 border border-purple-500/30"
                          >
                            Start VSCode Lab
                          </Link>
                        )}
                      </div>
                      
                      {/* Add manual Git lesson link if this is the only lesson in Chapter 1 */}
                      {milestone.id === 'chapter-1' && lessonIndex === 0 && (
                        <div className="bg-white/[0.04] backdrop-blur-xl rounded-xl p-6 mt-6 border border-white/[0.08]">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-white mb-2">
                                Lesson 2: Git & GitHub Basics
                              </h4>
                              <p className="text-slate-300 text-sm">
                                Master version control with interactive git terminal simulation
                              </p>
                            </div>
                            <Link
                              href="/foundation/chapter-2-git"
                              className="px-6 py-3 text-sm font-medium text-white bg-green-600/80 backdrop-blur-sm rounded-lg hover:bg-green-600 transition-all duration-200 border border-green-500/30"
                            >
                              Start Git Journey
                            </Link>
                          </div>
                        </div>
                      )}
                      
                      {/* Project Component */}
                      <div className="bg-blue-500/10 backdrop-blur-xl rounded-xl p-4 mt-4 border border-blue-500/20">
                        <div className="flex items-center text-blue-400">
                          {renderIcon('building', "w-5 h-5 mr-3")}
                          <span className="text-sm font-medium">
                            Project Component: {lesson.codeProject.portfolioComponent}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Milestone Project Summary */}
                <div className="bg-green-500/10 backdrop-blur-xl rounded-xl p-6 mt-8 border border-green-500/20">
                  <h4 className="text-xl font-semibold text-green-400 mb-3">
                    Milestone Project: {milestone.project.component}
                  </h4>
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {milestone.project.description}
                  </p>
                  <div className="text-sm text-green-400">
                    Portfolio Integration: {milestone.project.portfolioIntegration}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* CTA Section */}
        <div className="bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/[0.1] p-12 mt-16 text-center shadow-2xl">
          <h2 className="text-4xl font-light text-white mb-6">
            Ready to Rock Your IT Skills?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed font-light">
            Join thousands of students building interview-ready portfolios and landing their dream developer jobs.
          </p>
          
          <div className="flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href="/foundation/chapter-1-vscode"
              className="px-8 py-4 font-semibold text-white bg-blue-600/80 backdrop-blur-sm rounded-lg hover:bg-blue-600 transition-all duration-200 border border-blue-500/30 transform hover:scale-105"
            >
              Start Foundation Course
            </Link>
            <Link
              href="/foundation/portfolio-strategy"
              className="px-8 py-4 font-semibold text-slate-300 bg-white/[0.08] backdrop-blur-xl rounded-lg border border-white/[0.2] hover:bg-white/[0.12] hover:text-white transition-all duration-200"
            >
              Portfolio Strategy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
