'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface OnboardingStep {
  id: string
  title: string
  description: string
  estimatedTime: string
  completed: boolean
  current: boolean
  locked: boolean
  ctaText: string
  ctaLink: string
  benefits: string[]
}

export function ComprehensiveLaunchPad() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: '🚀 Welcome to Launch Pad',
      description: 'Understand your mission: transform into a professional developer with $200k+ in free tools',
      estimatedTime: '5 minutes',
      completed: false,
      current: true,
      locked: false,
      ctaText: 'Begin Mission Briefing',
      ctaLink: '#mission-briefing',
      benefits: [
        'Clear roadmap to professional developer status',
        'Access to enterprise-grade tools for free',
        'Mission-based learning with real projects',
        'AI-powered assistance throughout your journey'
      ]
    },
    {
      id: 'github-setup',
      title: '🔗 GitHub Mission Control',
      description: 'Connect GitHub account and activate professional developer tools',
      estimatedTime: '15 minutes',
      completed: false,
      current: false,
      locked: false,
      ctaText: 'Activate GitHub Systems',
      ctaLink: '/launch',
      benefits: [
        'GitHub Copilot AI assistance',
        'GitHub Student Pack ($200k+ value)',
        'Professional portfolio hosting',
        'Version control for all projects'
      ]
    },
    {
      id: 'first-mission',
      title: '🎯 First Mission Assignment',
      description: 'Choose and begin your first professional development mission',
      estimatedTime: '30 minutes',
      completed: false,
      current: false,
      locked: true,
      ctaText: 'Select Mission',
      ctaLink: '/dashboard',
      benefits: [
        'Portfolio website deployment',
        'Professional project experience',
        'Live code in production environment',
        'Real-world development workflow'
      ]
    },
    {
      id: 'ai-integration',
      title: '🤖 AI Co-Pilot Activation',
      description: 'Learn to work with AI assistance for accelerated development',
      estimatedTime: '20 minutes',
      completed: false,
      current: false,
      locked: true,
      ctaText: 'Activate AI Systems',
      ctaLink: '/dashboard',
      benefits: [
        'Faster code completion',
        'Intelligent debugging assistance',
        'Natural language programming',
        'Learning acceleration'
      ]
    },
    {
      id: 'mission-complete',
      title: '🏆 Mission Specialist Status',
      description: 'Complete first mission and unlock advanced mission tracks',
      estimatedTime: '2-4 hours',
      completed: false,
      current: false,
      locked: true,
      ctaText: 'Continue Missions',
      ctaLink: '/dashboard',
      benefits: [
        'Professional developer portfolio',
        'Enterprise tool proficiency',
        'Real project deployment experience',
        'Advanced mission track access'
      ]
    }
  ]

  const [steps, setSteps] = useState(onboardingSteps)

  useEffect(() => {
    // Update step states based on completion
    const updatedSteps = steps.map((step, index) => ({
      ...step,
      completed: completedSteps.includes(step.id),
      current: index === currentStepIndex && !completedSteps.includes(step.id),
      locked: index > 0 && !completedSteps.includes(steps[index - 1].id)
    }))
    setSteps(updatedSteps)
  }, [completedSteps, currentStepIndex])

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
      const nextIndex = steps.findIndex(step => step.id === stepId) + 1
      if (nextIndex < steps.length) {
        setCurrentStepIndex(nextIndex)
      }
    }
  }

  const overallProgress = Math.round((completedSteps.length / steps.length) * 100)

  return (
    <div className="comprehensive-launch-pad max-w-6xl mx-auto p-6">
      {/* Mission Control Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🚀</div>
        <h1 className="text-4xl font-bold mb-4">Launch Pad Mission Control</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Your guided transformation to professional developer status
        </p>
        
        {/* Overall Progress */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <div className="text-center mb-3">
            <div className="text-2xl font-bold text-blue-600">{overallProgress}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Mission Progress</div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            {completedSteps.length} of {steps.length} mission phases complete
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="stat-card bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">$200k+</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Tools Value</div>
        </div>
        <div className="stat-card bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">100%</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Free Forever</div>
        </div>
        <div className="stat-card bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">5</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Mission Phases</div>
        </div>
        <div className="stat-card bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">AI</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Powered</div>
        </div>
      </div>

      {/* Mission Timeline - Simplified for homepage */}
      <div className="mission-timeline space-y-4 mb-8">
        {steps.slice(0, 3).map((step, index) => (
          <div
            key={step.id}
            className={`mission-step-card border rounded-lg p-4 ${
              step.completed
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                : step.current
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step.completed
                    ? 'bg-green-500 text-white'
                    : step.current
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  <div className="text-xs text-gray-500 mt-1">
                    ⏱️ {step.estimatedTime}
                  </div>
                </div>
              </div>
              
              <div>
                {step.completed ? (
                  <span className="text-green-600 text-sm font-medium">✅ Complete</span>
                ) : step.current ? (
                  <Link href={step.ctaLink}>
                    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm">
                      {step.ctaText}
                    </button>
                  </Link>
                ) : (
                  <span className="text-gray-400 text-sm">🔒 Locked</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mission Command Center */}
      <div className="command-center bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <span>🎛️</span>
          <span>Mission Command Center</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/launch" className="command-card bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <div className="text-2xl mb-2">🚀</div>
            <div className="font-semibold text-blue-800 dark:text-blue-200">Launch Sequence</div>
            <div className="text-sm text-blue-600 dark:text-blue-400">Activate GitHub & tools</div>
          </Link>
          
          <Link href="/dashboard" className="command-card bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
            <div className="text-2xl mb-2">🎯</div>
            <div className="font-semibold text-green-800 dark:text-green-200">Mission Briefings</div>
            <div className="text-sm text-green-600 dark:text-green-400">Active missions & progress</div>
          </Link>
          
          <Link href="/settings" className="command-card bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 text-center hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
            <div className="text-2xl mb-2">💰</div>
            <div className="font-semibold text-purple-800 dark:text-purple-200">Revenue Model</div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Transparent sustainability</div>
          </Link>
        </div>
      </div>

      {/* Professional Guarantee */}
      <div className="professional-guarantee bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-6 text-center">
        <h3 className="text-2xl font-bold mb-4">🏆 Professional Developer Transformation</h3>
        <p className="text-lg mb-4">
          Get the same development environment used by engineers at Google, Netflix, and Airbnb
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-lg font-semibold">$200k+ Tools</div>
            <div className="text-sm opacity-80">Enterprise grade, free forever</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-lg font-semibold">Portfolio Projects</div>
            <div className="text-sm opacity-80">Live deployments that impress</div>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-lg p-3">
            <div className="text-lg font-semibold">AI-Powered Learning</div>
            <div className="text-sm opacity-80">Accelerated skill development</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Link href="/launch">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              🚀 Begin Mission Sequence
            </button>
          </Link>
          <div className="text-sm opacity-90">
            Join thousands who launched their developer careers through our mission-based approach
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComprehensiveLaunchPad
