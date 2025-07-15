'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn } from 'next-auth/react'
import { 
  CheckCircleIcon, 
  SparklesIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  CodeBracketIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
  GiftIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

/**
 * Integrated Onboarding Flow
 * 
 * Handles GitHub and Vercel signups directly with affiliate tracking.
 * Sets up students with professional development environment in minutes.
 */

interface OnboardingStep {
  id: string
  title: string
  description: string
  estimatedTime: string
  status: 'pending' | 'in-progress' | 'completed' | 'skipped'
  isRequired: boolean
  affiliateUrl?: string
  signupUrl?: string
  benefits: string[]
  icon: any
}

interface AffiliateTracking {
  github: {
    partnerCode: string
    trackingParams: string
  }
  vercel: {
    affiliateId: string
    referralCode: string
  }
}

const IntegratedOnboarding = () => {
  const { data: session } = useSession()
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())
  const [isProcessing, setIsProcessing] = useState(false)
  const [showAffiliateInfo, setShowAffiliateInfo] = useState(false)

  // Affiliate tracking configuration
  const affiliateConfig: AffiliateTracking = {
    github: {
      partnerCode: 'rockitcode-partner',
      trackingParams: 'utm_source=rockitcode&utm_medium=integration&utm_campaign=professional-setup'
    },
    vercel: {
      affiliateId: 'rockitcode-aff-001', // Replace with actual Vercel affiliate ID
      referralCode: 'ref_rockitcode'
    }
  }

  const onboardingSteps: OnboardingStep[] = [
    {
      id: 'github-signup',
      title: 'Create Professional GitHub Account',
      description: 'Your GitHub profile is your professional developer identity. Recruiters check GitHub profiles before interviews.',
      estimatedTime: '3 minutes',
      status: session?.user ? 'completed' : 'pending',
      isRequired: true,
      signupUrl: `https://github.com/join?${affiliateConfig.github.trackingParams}&source=rockitcode`,
      benefits: [
        'Professional developer identity',
        'Code portfolio hosting',
        'Collaboration with other developers',
        'Industry-standard version control'
      ],
      icon: CodeBracketIcon
    },
    {
      id: 'github-student-pack',
      title: 'Claim $200k+ in Free Developer Tools',
      description: 'GitHub Student Pack gives you access to premium developer tools used by professional teams.',
      estimatedTime: '5 minutes',
      status: 'pending',
      isRequired: true,
      signupUrl: `https://education.github.com/pack?${affiliateConfig.github.trackingParams}`,
      benefits: [
        'JetBrains IDEs (normally $200/year)',
        'Figma Pro (normally $144/year)',
        'MongoDB Atlas credits',
        'Domain names and SSL certificates',
        'Cloud hosting credits'
      ],
      icon: GiftIcon
    },
    {
      id: 'github-copilot',
      title: 'Activate AI Coding Assistant',
      description: 'GitHub Copilot free tier gives you AI-powered code completion and explanation.',
      estimatedTime: '2 minutes',
      status: 'pending',
      isRequired: true,
      signupUrl: `https://github.com/features/copilot?${affiliateConfig.github.trackingParams}`,
      benefits: [
        'AI-powered code completion',
        'Code explanation and learning',
        'Faster development workflow',
        'Professional AI collaboration skills'
      ],
      icon: SparklesIcon
    },
    {
      id: 'vercel-signup',
      title: 'Set Up Professional Hosting',
      description: 'Vercel provides lightning-fast hosting for your portfolio and projects with automatic deployments.',
      estimatedTime: '3 minutes',
      status: 'pending',
      isRequired: true,
      affiliateUrl: `https://vercel.com/signup?${affiliateConfig.vercel.referralCode}&utm_source=rockitcode`,
      signupUrl: `https://vercel.com/signup?${affiliateConfig.vercel.referralCode}&utm_source=rockitcode`,
      benefits: [
        'Professional project hosting',
        'Automatic deployments from GitHub',
        'Global CDN for fast loading',
        'Custom domain support'
      ],
      icon: GlobeAltIcon
    },
    {
      id: 'portfolio-setup',
      title: 'Initialize Professional Portfolio',
      description: 'Create your portfolio repository that will showcase all your projects to potential employers.',
      estimatedTime: '5 minutes',
      status: 'pending',
      isRequired: true,
      benefits: [
        'Live portfolio website',
        'Automatic project showcasing',
        'Professional web presence',
        'Recruiter-friendly presentation'
      ],
      icon: AcademicCapIcon
    }
  ]

  const [steps, setSteps] = useState(onboardingSteps)

  useEffect(() => {
    // Update GitHub signup status based on session
    if (session?.user) {
      setSteps(prev => prev.map(step => 
        step.id === 'github-signup' 
          ? { ...step, status: 'completed' }
          : step
      ))
      setCompletedSteps(prev => new Set([...prev, 'github-signup']))
    }
  }, [session])

  const handleStepAction = async (step: OnboardingStep) => {
    setIsProcessing(true)
    
    try {
      if (step.id === 'github-signup' && !session?.user) {
        // Handle GitHub OAuth signup through NextAuth
        await signIn('github', { 
          callbackUrl: '/onboarding?step=github-student-pack',
          redirect: false 
        })
      } else if (step.signupUrl) {
        // Track affiliate clicks
        trackAffiliateClick(step.id, step.signupUrl)
        
        // Open signup in new tab
        window.open(step.signupUrl, '_blank', 'noopener,noreferrer')
        
        // Mark as in progress and provide completion confirmation
        setSteps(prev => prev.map(s => 
          s.id === step.id ? { ...s, status: 'in-progress' } : s
        ))
        
        // Show completion verification after a delay
        setTimeout(() => {
          if (confirm(`Have you completed setting up ${step.title}?`)) {
            markStepCompleted(step.id)
          }
        }, 3000)
      } else if (step.id === 'portfolio-setup') {
        // Handle portfolio setup internally
        await initializePortfolio()
        markStepCompleted(step.id)
      }
    } catch (error) {
      console.error('Error in step action:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const trackAffiliateClick = (stepId: string, url: string) => {
    // Track affiliate clicks for analytics and commission attribution
    console.log(`Affiliate click tracked: ${stepId} -> ${url}`)
    
    // Send to analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'affiliate_click', {
        event_category: 'onboarding',
        event_label: stepId,
        value: 1
      })
    }
    
    // Could also send to your own analytics endpoint
    fetch('/api/track-affiliate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        step: stepId,
        url: url,
        userId: session?.user?.id,
        timestamp: new Date().toISOString()
      })
    }).catch(console.error)
  }

  const markStepCompleted = (stepId: string) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, status: 'completed' } : step
    ))
    setCompletedSteps(prev => new Set([...prev, stepId]))
    
    // Auto-advance to next step
    const currentIndex = steps.findIndex(s => s.id === stepId)
    if (currentIndex < steps.length - 1) {
      setCurrentStep(currentIndex + 1)
    }
  }

  const initializePortfolio = async () => {
    // This would integrate with GitHub API to create portfolio repository
    console.log('Initializing portfolio repository...')
    
    // Simulate portfolio setup
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    return true
  }

  const completedCount = completedSteps.size
  const progressPercentage = (completedCount / steps.length) * 100

  const getStepIcon = (step: OnboardingStep) => {
    const Icon = step.icon
    const baseClasses = "h-6 w-6"
    
    switch (step.status) {
      case 'completed':
        return <CheckCircleIcon className={`${baseClasses} text-green-500`} />
      case 'in-progress':
        return <Icon className={`${baseClasses} text-blue-500 animate-pulse`} />
      default:
        return <Icon className={`${baseClasses} text-gray-400`} />
    }
  }

  const getStepButtonText = (step: OnboardingStep) => {
    switch (step.status) {
      case 'completed':
        return 'Completed ✓'
      case 'in-progress':
        return 'In Progress...'
      default:
        return step.id === 'github-signup' ? 'Sign Up with GitHub' : 'Set Up Now'
    }
  }

  const getStepButtonClass = (step: OnboardingStep) => {
    const baseClasses = "px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2"
    
    switch (step.status) {
      case 'completed':
        return `${baseClasses} bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 cursor-default`
      case 'in-progress':
        return `${baseClasses} bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 cursor-default`
      default:
        return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50`
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
          Get the same professional development environment used by developers at GitHub, Netflix, and Airbnb - completely free.
        </p>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Progress</span>
            <span>{completedCount} of {steps.length} completed</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-lg p-6 mb-8 text-white">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">$200,000+</div>
            <div className="text-green-100">Value in Free Tools</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">100%</div>
            <div className="text-blue-100">Free Forever</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">15 min</div>
            <div className="text-purple-100">Setup Time</div>
          </div>
        </div>
      </div>

      {/* Affiliate Transparency */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
        <div className="flex items-start space-x-3">
          <ExclamationTriangleIcon className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-1">
              Transparency Notice
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              RockitCode may earn small commissions from GitHub and Vercel if you upgrade to paid plans in the future. 
              This helps keep our platform free for students. All recommended tools have generous free tiers.
            </p>
            <button
              onClick={() => setShowAffiliateInfo(!showAffiliateInfo)}
              className="text-xs text-blue-600 dark:text-blue-400 underline mt-1"
            >
              {showAffiliateInfo ? 'Hide details' : 'Learn more'}
            </button>
            {showAffiliateInfo && (
              <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 border-l-2 border-blue-300 pl-3">
                <p>• GitHub Copilot: Free tier → $10/month Pro (after you get a job)</p>
                <p>• Vercel: Free tier → $20/month Pro (for advanced features)</p>
                <p>• All core learning features remain free forever</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Setup Steps */}
      <div className="space-y-6">
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`border rounded-lg p-6 transition-all ${
              step.status === 'completed' 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : currentStep === index
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                {getStepIcon(step)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {step.estimatedTime}
                  </span>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {step.description}
                </p>
                
                {/* Benefits */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    What you get:
                  </h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                    {step.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircleIcon className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Action Button */}
                <button
                  onClick={() => handleStepAction(step)}
                  disabled={step.status === 'completed' || step.status === 'in-progress' || isProcessing}
                  className={getStepButtonClass(step)}
                >
                  <span>{getStepButtonText(step)}</span>
                  {step.status === 'pending' && <ArrowRightIcon className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completion State */}
      {completedCount === steps.length && (
        <div className="mt-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-8 text-center text-white">
          <CheckCircleIcon className="h-16 w-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">
            🎉 Professional Setup Complete!
          </h2>
          <p className="text-lg mb-6 text-green-100">
            You now have the same development environment used by professional developers at top tech companies.
          </p>
          <Link
            href="/learn/foundation"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Learning
            <ArrowRightIcon className="h-5 w-5 ml-2" />
          </Link>
        </div>
      )}

      {/* Next Steps Preview */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🚀 What's Next?
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              Start Building Projects
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Every lesson creates a portfolio project that deploys automatically to your professional portfolio.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-2">
              AI-Assisted Learning
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Use GitHub Copilot to accelerate your learning while building real coding skills.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntegratedOnboarding
