'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { CheckCircleIcon, CodeBracketIcon, CommandLineIcon, EyeIcon } from '@heroicons/react/24/outline'
import { AuthButton } from '@/components/rockitcode/auth-button'

/**
 * GitHub-Integrated Lesson Component
 * 
 * Enhances the regular lesson experience with professional GitHub workflow,
 * portfolio integration, and AI-assisted development guidance.
 */

interface GitHubIntegratedLessonProps {
  lesson: {
    id: string
    title: string
    description: string
    githubWorkflow?: {
      branchName: string
      commitMessage: string
      prDescription: string
      deploymentPreview: string
    }
    aiAssistance?: {
      copilotPrompts: string[]
      codeReviewPoints: string[]
      optimizationSuggestions: string[]
    }
    portfolioIntegration?: {
      projectName: string
      liveUrl: string
      description: string
      technologiesUsed: string[]
    }
  }
}

const GitHubIntegratedLesson = ({ lesson }: GitHubIntegratedLessonProps) => {
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const professionalSteps = [
    {
      id: 'branch-creation',
      title: '🌿 Create Feature Branch',
      description: 'Create a professional Git branch for this lesson',
      instruction: `git checkout -b ${lesson.githubWorkflow?.branchName || 'feature/lesson'}`,
      professionalNote: 'Professional developers always work in feature branches to keep the main branch stable.',
      completed: false
    },
    {
      id: 'development',
      title: '💻 Build with AI Assistance',
      description: 'Implement the lesson using GitHub Copilot and professional practices',
      instruction: 'Use GitHub Copilot suggestions and apply code review principles',
      professionalNote: 'Modern developers collaborate with AI tools to increase productivity while maintaining code quality.',
      completed: false
    },
    {
      id: 'commit-changes',
      title: '📝 Professional Commit',
      description: 'Commit your changes with a professional commit message',
      instruction: `git commit -m "${lesson.githubWorkflow?.commitMessage || 'feat: complete lesson implementation'}"`,
      professionalNote: 'Clear commit messages help teams understand project history and facilitate collaboration.',
      completed: false
    },
    {
      id: 'deploy-preview',
      title: '🚀 Deploy & Preview',
      description: 'Push changes and view live deployment preview',
      instruction: 'git push origin branch-name && preview deployment',
      professionalNote: 'Continuous deployment allows teams to see changes instantly and catch issues early.',
      completed: false
    },
    {
      id: 'portfolio-update',
      title: '💼 Update Portfolio',
      description: 'Add this project to your professional portfolio',
      instruction: 'Document the project with live demo and tech stack',
      professionalNote: 'Every project becomes part of your professional portfolio and career development.',
      completed: false
    }
  ]

  const markStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {lesson.title}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {lesson.description}
        </p>

        {/* Professional Development Context */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
            🏢 Professional Development Context
          </h3>
          <p className="text-blue-800 dark:text-blue-200 mb-4">
            This lesson teaches you to work like a professional developer at companies like GitHub, Netflix, and Airbnb.
            You'll use the same tools and workflows used in the industry.
          </p>
          {lesson.portfolioIntegration && (
            <div className="bg-white dark:bg-blue-800/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Portfolio Project: {lesson.portfolioIntegration.projectName}
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-200 mb-2">
                {lesson.portfolioIntegration.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {lesson.portfolioIntegration.technologiesUsed.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-700/50 text-blue-800 dark:text-blue-200 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* GitHub Authentication Check */}
      {!session?.user && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
            🔐 Professional Setup Required
          </h3>
          <p className="text-yellow-800 dark:text-yellow-200 mb-4">
            To follow the professional workflow, you need to connect your GitHub account.
            This enables the full professional development experience.
          </p>
          <div className="flex items-center space-x-4">
            <AuthButton 
              variant="primary" 
              size="sm"
              redirectTo={`/lesson/${lesson.id}`}
            />
            <a 
              href="/setup" 
              className="text-sm font-medium text-yellow-700 dark:text-yellow-300 hover:text-yellow-900 dark:hover:text-yellow-100"
            >
              Complete professional setup →
            </a>
          </div>
        </div>
      )}

      {/* Professional Workflow Steps */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Professional Development Workflow
        </h2>
        <div className="space-y-4">
          {professionalSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(step.id)
            const isCurrent = index === currentStep
            
            return (
              <div 
                key={step.id}
                className={`border rounded-lg p-6 transition-all ${
                  isCompleted 
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                    : isCurrent
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-3">
                      {step.description}
                    </p>
                    
                    {/* Command/Instruction */}
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <CommandLineIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Command/Action:
                        </span>
                      </div>
                      <code className="text-sm text-gray-900 dark:text-gray-100 font-mono">
                        {step.instruction}
                      </code>
                    </div>
                    
                    {/* Professional Note */}
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-400 p-3 mb-4">
                      <p className="text-sm text-indigo-700 dark:text-indigo-300">
                        <strong>Professional Tip:</strong> {step.professionalNote}
                      </p>
                    </div>
                    
                    {/* Action Button */}
                    {!isCompleted && (
                      <button
                        onClick={() => markStepComplete(step.id)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                      >
                        Mark Complete
                        <CheckCircleIcon className="h-4 w-4 ml-2" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* AI Assistance Section */}
      {lesson.aiAssistance && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            🤖 AI-Assisted Development
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Copilot Prompts */}
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-4">
                GitHub Copilot Prompts
              </h3>
              <ul className="space-y-2">
                {lesson.aiAssistance.copilotPrompts.map((prompt, index) => (
                  <li key={index} className="text-sm text-purple-800 dark:text-purple-200">
                    • {prompt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Code Review Points */}
            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-4">
                Code Review Focus
              </h3>
              <ul className="space-y-2">
                {lesson.aiAssistance.codeReviewPoints.map((point, index) => (
                  <li key={index} className="text-sm text-orange-800 dark:text-orange-200">
                    • {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Optimization Suggestions */}
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-4">
                Professional Optimizations
              </h3>
              <ul className="space-y-2">
                {lesson.aiAssistance.optimizationSuggestions.map((suggestion, index) => (
                  <li key={index} className="text-sm text-green-800 dark:text-green-200">
                    • {suggestion}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Portfolio Integration */}
      {lesson.portfolioIntegration && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            💼 Portfolio Integration
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Project Details
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {lesson.portfolioIntegration.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {lesson.portfolioIntegration.technologiesUsed.map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-800/50 text-blue-800 dark:text-blue-200 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Live Deployment
              </h3>
              <div className="space-y-3">
                <a
                  href={lesson.portfolioIntegration.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-white dark:bg-gray-800 border border-blue-300 dark:border-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <EyeIcon className="h-4 w-4 mr-2" />
                  View Live Project
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your project will be live at: {lesson.portfolioIntegration.liveUrl}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GitHubIntegratedLesson
