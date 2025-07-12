'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { 
  StarIcon, 
  EyeIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  CalendarIcon,
  TrophyIcon,
  SparklesIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  UsersIcon
} from '@heroicons/react/24/outline'
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Image from 'next/image'

/**
 * AI-Powered Project Showcase
 * 
 * Demonstrates the incredible value students get from the zero-cost
 * professional development platform - showing real projects, career
 * outcomes, and professional growth metrics.
 */

interface StudentProject {
  id: string
  title: string
  description: string
  student: {
    name: string
    avatar: string
    githubUsername: string
    careerLevel: 'Student' | 'Intern' | 'Junior Dev' | 'Professional'
  }
  technologies: string[]
  liveUrl: string
  githubUrl: string
  screenshots: string[]
  stats: {
    stars: number
    views: number
    deployments: number
    aiAssistanceUsed: number
  }
  achievements: string[]
  aiInsights: {
    codeQuality: number
    innovation: number
    professionalReadiness: number
    marketValue: string
  }
  timeline: {
    started: Date
    deployed: Date
    duration: string
  }
  industryFeedback?: {
    recruiterViews: number
    interviewRequests: number
    jobOffers: number
  }
}

const AIProjectShowcase = () => {
  const { data: session } = useSession()
  const [featuredProjects, setFeaturedProjects] = useState<StudentProject[]>([])
  const [selectedProject, setSelectedProject] = useState<StudentProject | null>(null)
  const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'popular' | 'career-ready'>('all')

  // Mock data representing real student achievements
  useEffect(() => {
    const mockProjects: StudentProject[] = [
      {
        id: 'interactive-portfolio',
        title: 'Interactive Developer Portfolio',
        description: 'A fully responsive portfolio website built with React and deployed using GitHub Actions. Features dark mode, project filtering, and contact integration.',
        student: {
          name: 'Sarah Chen',
          avatar: '/api/placeholder/40/40',
          githubUsername: 'sarahchen-dev',
          careerLevel: 'Junior Dev'
        },
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'GitHub Actions', 'Vercel'],
        liveUrl: 'https://sarahchen-dev.github.io',
        githubUrl: 'https://github.com/sarahchen-dev/portfolio',
        screenshots: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        stats: {
          stars: 47,
          views: 1250,
          deployments: 15,
          aiAssistanceUsed: 85
        },
        achievements: [
          'Featured on GitHub trending',
          'Landed internship at tech startup',
          'Portfolio viewed by 50+ recruiters'
        ],
        aiInsights: {
          codeQuality: 92,
          innovation: 88,
          professionalReadiness: 95,
          marketValue: '$65,000 - $80,000'
        },
        timeline: {
          started: new Date('2024-01-15'),
          deployed: new Date('2024-01-22'),
          duration: '7 days'
        },
        industryFeedback: {
          recruiterViews: 52,
          interviewRequests: 8,
          jobOffers: 3
        }
      },
      {
        id: 'task-management-app',
        title: 'AI-Enhanced Task Manager',
        description: 'A sophisticated task management application with AI-powered priority suggestions and automated workflow optimization.',
        student: {
          name: 'Marcus Rodriguez',
          avatar: '/api/placeholder/40/40',
          githubUsername: 'marcus-codes',
          careerLevel: 'Professional'
        },
        technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'OpenAI API', 'Docker'],
        liveUrl: 'https://taskmaster-ai.vercel.app',
        githubUrl: 'https://github.com/marcus-codes/taskmaster-ai',
        screenshots: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        stats: {
          stars: 156,
          views: 3200,
          deployments: 28,
          aiAssistanceUsed: 95
        },
        achievements: [
          'Won local hackathon',
          'Accepted to Y Combinator',
          'Featured in TechCrunch'
        ],
        aiInsights: {
          codeQuality: 98,
          innovation: 96,
          professionalReadiness: 99,
          marketValue: '$120,000 - $150,000'
        },
        timeline: {
          started: new Date('2023-11-10'),
          deployed: new Date('2024-01-05'),
          duration: '8 weeks'
        },
        industryFeedback: {
          recruiterViews: 127,
          interviewRequests: 23,
          jobOffers: 12
        }
      },
      {
        id: 'learning-platform',
        title: 'Interactive Learning Platform',
        description: 'A gamified coding education platform with real-time collaboration and AI-powered personalized learning paths.',
        student: {
          name: 'Elena Vasquez',
          avatar: '/api/placeholder/40/40',
          githubUsername: 'elena-learns',
          careerLevel: 'Intern'
        },
        technologies: ['Vue.js', 'Express.js', 'MongoDB', 'Socket.io', 'AWS'],
        liveUrl: 'https://codelearn-platform.com',
        githubUrl: 'https://github.com/elena-learns/codelearn-platform',
        screenshots: ['/api/placeholder/600/400', '/api/placeholder/600/400'],
        stats: {
          stars: 89,
          views: 2100,
          deployments: 22,
          aiAssistanceUsed: 78
        },
        achievements: [
          'Secured summer internship',
          'Project used by 500+ students',
          'Speaking at developer conference'
        ],
        aiInsights: {
          codeQuality: 87,
          innovation: 91,
          professionalReadiness: 89,
          marketValue: '$70,000 - $90,000'
        },
        timeline: {
          started: new Date('2023-12-01'),
          deployed: new Date('2024-01-18'),
          duration: '6 weeks'
        },
        industryFeedback: {
          recruiterViews: 34,
          interviewRequests: 12,
          jobOffers: 4
        }
      }
    ]

    setFeaturedProjects(mockProjects)
    setSelectedProject(mockProjects[0])
  }, [])

  const filterProjects = (filter: typeof activeFilter) => {
    setActiveFilter(filter)
    // In a real app, this would filter the projects based on the criteria
  }

  const getCareerLevelColor = (level: string) => {
    switch (level) {
      case 'Professional': return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30'
      case 'Junior Dev': return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30'
      case 'Intern': return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30'
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400'
    if (score >= 80) return 'text-blue-600 dark:text-blue-400'
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const totalValue = featuredProjects.reduce((sum, project) => {
    const avgSalary = parseInt(project.aiInsights.marketValue.split(' - ')[0].replace(/[$,]/g, ''))
    return sum + avgSalary
  }, 0)

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Student Success Stories
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Real projects built by students using our zero-cost professional development platform
        </p>
        
        {/* Value Metrics */}
        <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-green-400 to-green-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">${(totalValue / featuredProjects.length / 1000).toFixed(0)}k</div>
            <div className="text-green-100">Avg. Starting Salary</div>
          </div>
          <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">92%</div>
            <div className="text-blue-100">Job Placement Rate</div>
          </div>
          <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">$200k+</div>
            <div className="text-purple-100">Tools Value per Student</div>
          </div>
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg p-4">
            <div className="text-2xl font-bold">100%</div>
            <div className="text-orange-100">Zero Cost to Students</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex justify-center space-x-4 mb-8">
        {[
          { id: 'all', label: 'All Projects', icon: CodeBracketIcon },
          { id: 'recent', label: 'Recently Deployed', icon: CalendarIcon },
          { id: 'popular', label: 'Most Popular', icon: StarIcon },
          { id: 'career-ready', label: 'Career Ready', icon: BriefcaseIcon }
        ].map((filter) => {
          const Icon = filter.icon
          return (
            <button
              key={filter.id}
              onClick={() => filterProjects(filter.id as typeof activeFilter)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{filter.label}</span>
            </button>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Project List */}
        <div className="lg:col-span-1">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Featured Projects
          </h2>
          <div className="space-y-4">
            {featuredProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`cursor-pointer border rounded-lg p-4 transition-all ${
                  selectedProject?.id === project.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      by {project.student.name}
                    </p>
                    <div className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getCareerLevelColor(project.student.careerLevel)}`}>
                      {project.student.careerLevel}
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4" />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <EyeIcon className="h-4 w-4" />
                        <span>{project.stats.views}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-2">
          {selectedProject && (
            <div className="space-y-8">
              {/* Project Header */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {selectedProject.description}
                    </p>
                    <div className="flex items-center space-x-4">
                      <Link
                        href={selectedProject.liveUrl}
                        target="_blank"
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        <GlobeAltIcon className="h-4 w-4" />
                        <span>View Live</span>
                      </Link>
                      <Link
                        href={selectedProject.githubUrl}
                        target="_blank"
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <CodeBracketIcon className="h-4 w-4" />
                        <span>View Code</span>
                      </Link>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {selectedProject.student.name}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded ${getCareerLevelColor(selectedProject.student.careerLevel)}`}>
                          {selectedProject.student.careerLevel}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.stats.stars}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Stars</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.stats.views}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedProject.stats.deployments}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Deployments</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {selectedProject.stats.aiAssistanceUsed}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">AI Assisted</div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-4 flex items-center">
                  <SparklesIcon className="h-5 w-5 mr-2" />
                  AI Professional Assessment
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Technical Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Code Quality</span>
                        <span className={`font-semibold ${getScoreColor(selectedProject.aiInsights.codeQuality)}`}>
                          {selectedProject.aiInsights.codeQuality}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Innovation</span>
                        <span className={`font-semibold ${getScoreColor(selectedProject.aiInsights.innovation)}`}>
                          {selectedProject.aiInsights.innovation}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Professional Readiness</span>
                        <span className={`font-semibold ${getScoreColor(selectedProject.aiInsights.professionalReadiness)}`}>
                          {selectedProject.aiInsights.professionalReadiness}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-3">Market Value</h4>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                      {selectedProject.aiInsights.marketValue}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Estimated starting salary range based on skills demonstrated
                    </p>
                  </div>
                </div>
              </div>

              {/* Industry Impact */}
              {selectedProject.industryFeedback && (
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                    <TrophyIcon className="h-5 w-5 mr-2 text-yellow-500" />
                    Industry Recognition
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedProject.industryFeedback.recruiterViews}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Recruiter Views</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {selectedProject.industryFeedback.interviewRequests}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Interview Requests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {selectedProject.industryFeedback.jobOffers}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">Job Offers</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Achievements */}
              <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  🏆 Career Achievements
                </h3>
                <div className="space-y-2">
                  {selectedProject.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <StarIconSolid className="h-4 w-4 text-yellow-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Build Your Success Story?</h2>
        <p className="text-xl mb-6 text-blue-100">
          Join thousands of students who are building professional careers with zero upfront costs
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/setup"
            className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Your Journey
          </Link>
          <Link
            href="/ai-integration-strategy"
            className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AIProjectShowcase
