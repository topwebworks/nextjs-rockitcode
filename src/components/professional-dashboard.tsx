'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { 
  CheckCircleIcon, 
  CodeBracketIcon, 
  StarIcon, 
  ChartBarIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  BriefcaseIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

/**
 * Professional Development Dashboard
 * 
 * Shows students their progress in building a professional developer portfolio
 * with GitHub integration, live projects, and career readiness metrics.
 */

interface ProfessionalProgress {
  githubProfile: {
    completed: boolean
    profileOptimized: boolean
    contributionActivity: number
    repositoryCount: number
  }
  portfolioProjects: {
    liveProjects: number
    technologiesUsed: string[]
    totalCommits: number
    deploymentCount: number
  }
  professionalSkills: {
    aiCollaboration: number // 0-100 score
    codeQuality: number // 0-100 score
    deploymentExperience: number // 0-100 score
    documentationSkills: number // 0-100 score
  }
  careerReadiness: {
    overallScore: number // 0-100
    portfolioStrength: number
    professionalPresence: number
    technicalSkills: number
  }
}

const ProfessionalDashboard = () => {
  const { data: session } = useSession()
  const [progress, setProgress] = useState<ProfessionalProgress>({
    githubProfile: {
      completed: !!session?.user,
      profileOptimized: false,
      contributionActivity: 15,
      repositoryCount: 3
    },
    portfolioProjects: {
      liveProjects: 2,
      technologiesUsed: ['HTML', 'CSS', 'JavaScript', 'React', 'GitHub Pages'],
      totalCommits: 24,
      deploymentCount: 6
    },
    professionalSkills: {
      aiCollaboration: 75,
      codeQuality: 80,
      deploymentExperience: 85,
      documentationSkills: 70
    },
    careerReadiness: {
      overallScore: 78,
      portfolioStrength: 85,
      professionalPresence: 75,
      technicalSkills: 80
    }
  })

  const professionalMilestones = [
    {
      id: 'github-setup',
      title: 'Professional GitHub Profile',
      description: 'Optimized profile that attracts recruiters',
      completed: progress.githubProfile.completed && progress.githubProfile.profileOptimized,
      url: session?.user ? `https://github.com/${session.user.login}` : '/setup',
      icon: CheckCircleIcon,
      value: 'Industry presence established'
    },
    {
      id: 'live-portfolio',
      title: 'Live Portfolio Website',
      description: 'Professional portfolio with deployed projects',
      completed: progress.portfolioProjects.liveProjects > 0,
      url: `https://${session?.user?.login || 'username'}.github.io`,
      icon: GlobeAltIcon,
      value: `${progress.portfolioProjects.liveProjects} live projects`
    },
    {
      id: 'ai-collaboration',
      title: 'AI-Assisted Development',
      description: 'Proficient in GitHub Copilot and AI workflows',
      completed: progress.professionalSkills.aiCollaboration > 70,
      url: '/lessons/ai-collaboration',
      icon: StarIcon,
      value: `${progress.professionalSkills.aiCollaboration}% proficiency`
    },
    {
      id: 'deployment-pipeline',
      title: 'Professional Deployment',
      description: 'Automated CI/CD and deployment workflows',
      completed: progress.portfolioProjects.deploymentCount > 3,
      url: '/lessons/deployment',
      icon: ChartBarIcon,
      value: `${progress.portfolioProjects.deploymentCount} deployments`
    }
  ]

  const technicalAchievements = [
    {
      category: 'Frontend Development',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Responsive Design'],
      projects: progress.portfolioProjects.liveProjects,
      level: 'Intermediate'
    },
    {
      category: 'Professional Tools',
      skills: ['Git', 'GitHub', 'VS Code', 'GitHub Copilot', 'GitHub Actions'],
      projects: progress.portfolioProjects.deploymentCount,
      level: 'Advanced'
    },
    {
      category: 'AI Collaboration',
      skills: ['Prompt Engineering', 'Code Review', 'AI Ethics', 'Copilot Integration'],
      projects: Math.floor(progress.professionalSkills.aiCollaboration / 25),
      level: 'Intermediate'
    }
  ]

  const careerReadinessMetrics = [
    {
      metric: 'Portfolio Strength',
      score: progress.careerReadiness.portfolioStrength,
      description: 'Quality and impact of your projects',
      color: 'blue'
    },
    {
      metric: 'Professional Presence',
      score: progress.careerReadiness.professionalPresence,
      description: 'GitHub profile and online visibility',
      color: 'green'
    },
    {
      metric: 'Technical Skills',
      score: progress.careerReadiness.technicalSkills,
      description: 'Demonstrated coding and development abilities',
      color: 'purple'
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400'
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Professional Development Dashboard
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Track your progress toward becoming a professional developer with industry-standard tools and workflows.
        </p>
      </div>

      {/* Overall Career Readiness Score */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Career Readiness Score</h2>
            <p className="text-blue-100">
              Your overall readiness for professional developer roles
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold mb-2">
              {progress.careerReadiness.overallScore}%
            </div>
            <div className="text-blue-100">
              {progress.careerReadiness.overallScore >= 80 ? 'Job Ready' : 
               progress.careerReadiness.overallScore >= 60 ? 'Nearly Ready' : 'Building Skills'}
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-blue-400/30 rounded-full h-3 mt-6">
          <div 
            className="bg-white rounded-full h-3 transition-all duration-500"
            style={{ width: `${progress.careerReadiness.overallScore}%` }}
          />
        </div>
      </div>

      {/* Professional Milestones */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Professional Milestones
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {professionalMilestones.map((milestone) => {
            const Icon = milestone.icon
            return (
              <div 
                key={milestone.id}
                className={`border rounded-lg p-6 transition-all ${
                  milestone.completed 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    milestone.completed 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {milestone.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {milestone.value}
                      </span>
                      <Link
                        href={milestone.url}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                      >
                        {milestone.completed ? 'View →' : 'Complete →'}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Career Readiness Breakdown */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Career Readiness Breakdown
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {careerReadinessMetrics.map((metric) => (
            <div key={metric.metric} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {metric.metric}
              </h3>
              <div className="flex items-center space-x-3 mb-3">
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {metric.score}%
                </div>
                <div className={`text-sm font-medium ${getScoreColor(metric.score)}`}>
                  {metric.score >= 80 ? 'Excellent' : metric.score >= 60 ? 'Good' : 'Improving'}
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
                <div 
                  className={`${getScoreBackground(metric.score)} rounded-full h-2 transition-all duration-500`}
                  style={{ width: `${metric.score}%` }}
                />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {metric.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Achievements */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Technical Achievements
        </h2>
        <div className="space-y-6">
          {technicalAchievements.map((achievement) => (
            <div key={achievement.category} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {achievement.category}
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {achievement.projects} projects
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded ${
                    achievement.level === 'Advanced' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                    achievement.level === 'Intermediate' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300' :
                    'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                  }`}>
                    {achievement.level}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {achievement.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🚀 Recommended Next Steps
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Immediate Actions
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Complete GitHub profile optimization</li>
              <li>• Deploy next portfolio project</li>
              <li>• Practice AI-assisted code review</li>
              <li>• Add project documentation</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Career Development
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>• Apply for developer internships</li>
              <li>• Join developer communities</li>
              <li>• Contribute to open source projects</li>
              <li>• Network with industry professionals</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfessionalDashboard
