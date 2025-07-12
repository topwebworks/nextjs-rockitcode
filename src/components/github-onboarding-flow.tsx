'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { CheckCircleIcon, ChevronRightIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { AuthButton } from '@/components/rockitcode/auth-button'

/**
 * GitHub Professional Onboarding Flow
 * 
 * Zero-cost professional developer setup that integrates with existing GitHub auth.
 * This component guides new users through the complete professional setup process
 * using only free tools and services.
 */

interface OnboardingStep {
  id: string
  title: string
  description: string
  estimatedTime: string
  value: string
  completed: boolean
  optional: boolean
  action: 'github-auth' | 'external-link' | 'guide' | 'verification'
  url?: string
  benefits: string[]
}

export function GitHubOnboardingFlow() {
  const { data: session, status } = useSession()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const steps: OnboardingStep[] = [
    {
      id: 'github-account',
      title: '🏢 Professional GitHub Account',
      description: 'Create or optimize your GitHub profile for professional development',
      estimatedTime: '5 minutes',
      value: 'Foundation for entire developer career',
      completed: !!session?.user,
      optional: false,
      action: 'github-auth',
      benefits: [
        'Industry-standard developer identity',
        'Version control for all projects',
        'Professional portfolio hosting',
        'Collaboration and networking platform'
      ]
    },
    {
      id: 'student-pack',
      title: '🎓 GitHub Student Developer Pack',
      description: 'Claim $200,000+ worth of free developer tools and services',
      estimatedTime: '10 minutes',
      value: 'Enterprise tools without enterprise costs',
      completed: false,
      optional: false,
      action: 'external-link',
      url: 'https://education.github.com/pack',
      benefits: [
        'JetBrains IDEs (normally $700/year)',
        'Figma Pro (normally $144/year)',
        'MongoDB Atlas credits',
        'Azure cloud credits',
        'Free domain names and SSL certificates',
        'Advanced development tools'
      ]
    },
    {
      id: 'copilot-setup',
      title: '🤖 GitHub Copilot Free Tier',
      description: 'Enable AI coding assistance for professional development',
      estimatedTime: '3 minutes',
      value: 'Professional AI-assisted development',
      completed: false,
      optional: false,
      action: 'external-link',
      url: 'https://github.com/settings/copilot',
      benefits: [
        'AI-powered code completion',
        'Context-aware suggestions',
        'Natural language to code',
        'Learn professional AI collaboration',
        'Boost coding productivity',
        'Industry-standard AI tool'
      ]
    },
    {
      id: 'portfolio-repo',
      title: '💼 Portfolio Repository Setup',
      description: 'Initialize your professional portfolio with GitHub Pages hosting',
      estimatedTime: '8 minutes',
      value: 'Live portfolio website from day 1',
      completed: false,
      optional: false,
      action: 'guide',
      benefits: [
        'Free portfolio hosting at username.github.io',
        'Custom domain support',
        'Automatic HTTPS security',
        'Professional web presence',
        'Showcase projects to recruiters',
        'Version-controlled portfolio'
      ]
    },
    {
      id: 'vercel-connection',
      title: '🚀 Vercel Deployment Setup',
      description: 'Connect Vercel for Next.js and React project hosting',
      estimatedTime: '5 minutes',
      value: 'Professional deployment pipeline',
      completed: false,
      optional: true,
      action: 'external-link',
      url: 'https://vercel.com/new',
      benefits: [
        'Free Next.js project hosting',
        'Automatic deployments from GitHub',
        'Global CDN for fast loading',
        'Serverless functions support',
        'Professional URLs for projects',
        'CI/CD pipeline experience'
      ]
    },
    {
      id: 'profile-optimization',
      title: '✨ GitHub Profile Optimization',
      description: 'Create a professional README and optimize your GitHub profile',
      estimatedTime: '15 minutes',
      value: 'Recruiter-ready professional presence',
      completed: false,
      optional: true,
      action: 'guide',
      benefits: [
        'Professional first impression',
        'Showcase skills and projects',
        'GitHub profile README',
        'Activity graph optimization',
        'Social proof for employers',
        'Personal branding foundation'
      ]
    }
  ]

  // Calculate progress
  const totalSteps = steps.length
  const completedCount = steps.filter(step => step.completed || completedSteps.includes(step.id)).length
  const progressPercentage = (completedCount / totalSteps) * 100

  const markStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const getStepStatus = (step: OnboardingStep) => {
    if (step.completed || completedSteps.includes(step.id)) {
      return 'completed'
    }
    if (step.id === steps[currentStep]?.id) {
      return 'current'
    }
    return 'pending'
  }

  const handleStepAction = (step: OnboardingStep) => {
    switch (step.action) {
      case 'github-auth':
        // GitHub auth is handled by AuthButton component
        break
      case 'external-link':
        if (step.url) {
          window.open(step.url, '_blank', 'noopener,noreferrer')
          // Auto-mark as completed after opening link
          setTimeout(() => markStepComplete(step.id), 1000)
        }
        break
      case 'guide':
        // Show in-app guide or mark as completed
        markStepComplete(step.id)
        break
      case 'verification':
        // Custom verification logic
        markStepComplete(step.id)
        break
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Professional Developer Setup
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Get the exact same development environment used by professionals at GitHub, Netflix, and Airbnb
        </p>
        
        {/* Progress Bar */}
        <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {completedCount} of {totalSteps} steps completed • 100% free forever
        </p>
      </div>

      {/* Zero Cost Guarantee */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mb-8">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <CheckCircleIcon className="h-6 w-6 text-green-500" />
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-100">
            100% Free Professional Stack
          </h3>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-green-800 dark:text-green-200">
          <div className="text-center">
            <div className="font-semibold">$0 to Students</div>
            <div>No credit card required</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">$200k+ Value</div>
            <div>Enterprise tools included</div>
          </div>
          <div className="text-center">
            <div className="font-semibold">Career Foundation</div>
            <div>Industry-standard workflow</div>
          </div>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => {
          const status = getStepStatus(step)
          const isCompleted = status === 'completed'
          const isCurrent = status === 'current'
          
          return (
            <div 
              key={step.id}
              className={`border rounded-xl p-6 transition-all ${
                isCompleted 
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                  : isCurrent
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
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
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      {step.optional && (
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                          Optional
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {step.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>⏱️ {step.estimatedTime}</span>
                      <span>💎 {step.value}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex-shrink-0">
                  {step.id === 'github-account' && !session?.user ? (
                    <AuthButton 
                      variant="primary" 
                      size="sm"
                      redirectTo="/setup"
                    />
                  ) : isCompleted ? (
                    <div className="flex items-center text-green-600 dark:text-green-400 text-sm font-medium">
                      <CheckCircleIcon className="h-5 w-5 mr-1" />
                      Completed
                    </div>
                  ) : (
                    <button
                      onClick={() => handleStepAction(step)}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                    >
                      {step.action === 'external-link' ? 'Open Link' : 'Start Setup'}
                      {step.action === 'external-link' && <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />}
                      {step.action === 'guide' && <ChevronRightIcon className="h-4 w-4 ml-1" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Benefits */}
              {(isCurrent || isCompleted) && (
                <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    What you'll get:
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-1 text-sm text-gray-600 dark:text-gray-300">
                    {step.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Completion Message */}
      {completedCount === totalSteps && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Setup Complete!
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            You now have the same development environment used by professionals at top tech companies.
            Time to start building your portfolio!
          </p>
          <button className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg transition-colors">
            Start Learning
            <ChevronRightIcon className="h-5 w-5 ml-2" />
          </button>
        </div>
      )}

      {/* Next Steps Preview */}
      <div className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🚀 What's Next?
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Foundation Course</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Start with HTML, CSS, and JavaScript basics while using your professional tools
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Portfolio Projects</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Every lesson creates a live project for your portfolio with automatic deployment
            </p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-700 rounded-lg">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">AI Collaboration</h4>
            <p className="text-gray-600 dark:text-gray-300">
              Learn to work with GitHub Copilot like professional developers
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubOnboardingFlow
