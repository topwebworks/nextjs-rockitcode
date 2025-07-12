'use client'

import { useState, useEffect } from 'react'
import { clsx } from 'clsx'

interface GitHubSetupStep {
  id: string
  title: string
  description: string
  estimatedTime: string
  value: string
  completed: boolean
  optional: boolean
  benefits: string[]
}

interface FreeDeveloperStack {
  tool: string
  provider: string
  tier: string
  cost: string
  value: string
  features: string[]
  setupRequired: boolean
}

export function GitHubProfessionalSetup() {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<string[]>([])
  const [githubConnected, setGithubConnected] = useState(false)
  const [studentPackClaimed, setStudentPackClaimed] = useState(false)

  const setupSteps: GitHubSetupStep[] = [
    {
      id: 'github-account',
      title: '🏢 Professional GitHub Account',
      description: 'Create or optimize your GitHub profile for professional development',
      estimatedTime: '5 minutes',
      value: 'Foundation for entire developer career',
      completed: false,
      optional: false,
      benefits: [
        'Industry-standard developer identity',
        'Version control for all projects',
        'Professional portfolio hosting',
        'Collaboration and networking platform'
      ]
    },
    {
      id: 'student-pack',
      title: '🎒 GitHub Student Developer Pack',
      description: 'Claim $200,000+ worth of free professional developer tools',
      estimatedTime: '10 minutes',
      value: 'Enterprise tools without enterprise costs',
      completed: false,
      optional: false,
      benefits: [
        'GitHub Pro features (private repos, advanced insights)',
        'JetBrains IDEs (WebStorm, IntelliJ)',
        'Figma Pro subscription',
        'Free domain names and SSL certificates',
        'Cloud computing credits (Azure, AWS)',
        'Professional design tools (Canva Pro)'
      ]
    },
    {
      id: 'github-copilot',
      title: '🤖 GitHub Copilot Free Tier',
      description: 'Enable AI coding assistance for accelerated learning',
      estimatedTime: '2 minutes',
      value: 'Professional AI-assisted development',
      completed: false,
      optional: false,
      benefits: [
        'AI code completion and suggestions',
        'Chat-based coding assistance',
        'Code explanation and documentation',
        'Learning accelerator and productivity boost'
      ]
    },
    {
      id: 'github-pages',
      title: '🌐 Portfolio Website Setup',
      description: 'Initialize your professional portfolio with GitHub Pages',
      estimatedTime: '10 minutes',
      value: 'Professional web presence from day 1',
      completed: false,
      optional: false,
      benefits: [
        'Live portfolio at username.github.io',
        'Custom domain support',
        'HTTPS security included',
        'Automatic updates from code changes'
      ]
    },
    {
      id: 'vercel-hosting',
      title: '⚡ Vercel Professional Hosting',
      description: 'Connect Vercel for Next.js and React project deployment',
      estimatedTime: '5 minutes',
      value: 'Industry-standard deployment pipeline',
      completed: false,
      optional: false,
      benefits: [
        'Instant Next.js deployments',
        'Global CDN and edge functions',
        'Preview deployments for every commit',
        'Professional hosting used by major companies'
      ]
    },
    {
      id: 'vscode-setup',
      title: '💻 VS Code Professional Setup',
      description: 'Configure VS Code with GitHub integration and extensions',
      estimatedTime: '8 minutes',
      value: 'Professional development environment',
      completed: false,
      optional: true,
      benefits: [
        'GitHub Copilot integration',
        'Git and GitHub seamless workflow',
        'Professional extension recommendations',
        'Synchronized settings across devices'
      ]
    }
  ]

  const freeStack: FreeDeveloperStack[] = [
    {
      tool: 'GitHub Copilot',
      provider: 'GitHub',
      tier: 'Free',
      cost: '$0/month',
      value: '$10/month value',
      features: ['AI code completion', 'Chat assistance', 'Code explanations'],
      setupRequired: true
    },
    {
      tool: 'GitHub Pages',
      provider: 'GitHub',
      tier: 'Free',
      cost: '$0/month',
      value: '$10/month value',
      features: ['Static site hosting', 'Custom domains', 'HTTPS included'],
      setupRequired: true
    },
    {
      tool: 'Vercel Hosting',
      provider: 'Vercel',
      tier: 'Free',
      cost: '$0/month',
      value: '$20/month value',
      features: ['Next.js hosting', 'Global CDN', '100GB bandwidth'],
      setupRequired: true
    },
    {
      tool: 'VS Code',
      provider: 'Microsoft',
      tier: 'Free',
      cost: '$0/month',
      value: '$200/month value',
      features: ['Professional IDE', 'Extensions', 'GitHub integration'],
      setupRequired: false
    },
    {
      tool: 'GitHub Pro',
      provider: 'GitHub',
      tier: 'Free (Student)',
      cost: '$0/month',
      value: '$4/month value',
      features: ['Private repositories', 'Advanced insights', 'Wiki pages'],
      setupRequired: true
    }
  ]

  const totalStackValue = freeStack.reduce((total, tool) => {
    const value = parseInt(tool.value.replace(/[^0-9]/g, ''))
    return total + value
  }, 0)

  const handleStepComplete = (stepId: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId])
    }
  }

  const completionPercentage = Math.round((completedSteps.length / setupSteps.length) * 100)

  return (
    <div className="github-professional-setup max-w-6xl mx-auto p-6">
      {/* Mission Control Header */}
      <div className="header mb-8">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">🚀</div>
          <h1 className="text-4xl font-bold mb-4">
            Mission Initialization Sequence
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Activate your professional developer mission control center. Get the exact same tools used by engineers at <strong>GitHub, Netflix, and Airbnb</strong>. 
            <span className="text-green-600 font-semibold"> Everything is 100% free</span> - no hidden costs, no trial periods.
          </p>
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
            <span className="text-blue-600">🎯</span>
            <span className="text-sm font-medium">Mission Objective: Professional Developer Transformation</span>
          </div>
        </div>
        
        {/* Mission Progress Dashboard */}
        <div className="value-prop bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-6">
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Mission Control Dashboard</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Your professional development command center</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600">${totalStackValue}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Tools Value</div>
              <div className="text-xs text-gray-500">Enterprise grade</div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-blue-600">$0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Mission Cost</div>
              <div className="text-xs text-gray-500">Forever free</div>
            </div>
            
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-4">
              <div className="text-3xl font-bold text-purple-600">{completionPercentage}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Mission Complete</div>
              <div className="text-xs text-gray-500">{completedSteps.length}/{setupSteps.length} systems online</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission System Activation */}
      <div className="setup-progress mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">🛠️</span>
          <h2 className="text-2xl font-semibold">Mission System Activation</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Initialize your professional developer mission systems. Each activation grants you enterprise-level capabilities used by the world's best development teams.
        </p>
        
        <div className="progress-bar mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>🚀 Mission Systems Online</span>
            <span>{completedSteps.length}/{setupSteps.length} systems activated</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>

        <div className="setup-steps space-y-4">
          {setupSteps.map((step, index) => (
            <div
              key={step.id}
              className={clsx(
                "step-card border rounded-lg p-6 transition-all",
                completedSteps.includes(step.id)
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : index === currentStep
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700"
              )}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={clsx(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                      completedSteps.includes(step.id)
                        ? "bg-green-500 text-white"
                        : index === currentStep
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    )}>
                      {completedSteps.includes(step.id) ? '✓' : index + 1}
                    </div>
                    
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    
                    {step.optional && (
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                        Optional
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{step.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-4">
                    <div>
                      <span className="font-medium">Time:</span> {step.estimatedTime}
                    </div>
                    <div>
                      <span className="font-medium">Value:</span> {step.value}
                    </div>
                  </div>
                  
                  <div className="benefits">
                    <p className="font-medium text-sm mb-2">Benefits:</p>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {step.benefits.map((benefit, bIndex) => (
                        <li key={bIndex} className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">•</span>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="ml-6">
                  {completedSteps.includes(step.id) ? (
                    <div className="text-center">
                      <button className="px-4 py-2 bg-green-500 text-white rounded mb-2 opacity-90">
                        ✓ System Online
                      </button>
                      <div className="text-xs text-green-600">Mission system activated</div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <button
                        onClick={() => {
                          handleStepComplete(step.id)
                          if (step.id === 'github-copilot') setGithubConnected(true)
                          if (step.id === 'student-pack') setStudentPackClaimed(true)
                        }}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-2"
                      >
                        🚀 Activate
                      </button>
                      <div className="text-xs text-gray-500">Click to initialize</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Equipment Arsenal */}
      <div className="free-stack-overview mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-2xl">💰</span>
          <h2 className="text-2xl font-semibold">Mission Equipment Arsenal</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Your free professional developer arsenal. These are the exact same mission-critical tools used by development teams at major tech companies. 
          <strong>Total value: ${totalStackValue}+/month</strong> - yours completely free during your mission training.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {freeStack.map((tool, index) => (
            <div key={index} className="tool-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">{tool.tool}</h3>
                <div className="text-right">
                  <div className="text-sm text-gray-500 line-through">{tool.value}</div>
                  <div className="text-green-600 font-semibold">{tool.cost}</div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                by {tool.provider} • {tool.tier} tier
              </div>
              
              <ul className="text-sm space-y-1">
                {tool.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Accomplished */}
      {completedSteps.length === setupSteps.length && (
        <div className="success-state bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-8 text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">
            Mission Systems Fully Operational!
          </h2>
          <p className="text-xl opacity-90 mb-6">
            🚀 Your professional developer mission control is now online. You have the same development environment used by engineers at Google, Netflix, and Spotify. 
            <strong>Mission status: Ready for launch!</strong>
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl mb-2">🤖</div>
              <div className="font-semibold">AI Co-Pilot Online</div>
              <div className="text-sm opacity-80">GitHub Copilot activated</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl mb-2">🌐</div>
              <div className="font-semibold">Deployment Systems</div>
              <div className="text-sm opacity-80">GitHub Pages + Vercel ready</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-3xl mb-2">💼</div>
              <div className="font-semibold">Mission Arsenal</div>
              <div className="text-sm opacity-80">${totalStackValue}+ tools active</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              🚀 Begin First Mission
            </button>
            <div className="text-sm opacity-80">
              Your mission briefings are ready in Mission Control
            </div>
          </div>
        </div>
      )}

      {/* Mission Support & Intel */}
      <div className="support-info bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <span className="text-xl">💡</span>
          <h3 className="font-semibold">Mission Support & Intelligence</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <span>📋</span>
              <span>Mission Status Updates:</span>
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>GitHub Student Pack verification: 1-7 days (automatic approval for .edu emails)</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>GitHub Copilot free tier: Generous usage limits, perfect for learning</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>All mission tools remain free during student status</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>Upgrade paths available when you start earning professionally</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-3 flex items-center space-x-2">
              <span>🎯</span>
              <span>Professional Mission Benefits:</span>
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>GitHub profile demonstrates real project experience to recruiters</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Live portfolio showcases your capabilities instantly</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Industry-standard tools experience sets you apart</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span>Professional development workflow from day one</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <span>🚀</span>
            <span className="font-medium text-blue-800 dark:text-blue-200">Mission Commander Note:</span>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300">
            This exact setup has launched thousands of developers into six-figure careers. Every activation brings you closer to professional readiness. Your mission: complete the sequence and begin your transformation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default GitHubProfessionalSetup
