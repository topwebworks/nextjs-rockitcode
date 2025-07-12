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
      {/* Header */}
      <div className="header mb-8">
        <h1 className="text-4xl font-bold mb-4">
          🚀 Professional Developer Setup
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Get the exact same development environment used by professionals at GitHub, Netflix, and Airbnb. 
          <strong> Everything is 100% free</strong> - no hidden costs, no trial periods.
        </p>
        
        {/* Value Proposition */}
        <div className="value-prop bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600">${totalStackValue}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Value</div>
              <div className="text-xs text-gray-500">Enterprise tools</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-blue-600">$0</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Your Cost</div>
              <div className="text-xs text-gray-500">Forever free</div>
            </div>
            
            <div>
              <div className="text-3xl font-bold text-purple-600">{completionPercentage}%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Setup Complete</div>
              <div className="text-xs text-gray-500">{completedSteps.length}/{setupSteps.length} steps</div>
            </div>
          </div>
        </div>
      </div>

      {/* Setup Progress */}
      <div className="setup-progress mb-8">
        <h2 className="text-2xl font-semibold mb-4">🛠️ Setup Progress</h2>
        
        <div className="progress-bar mb-6">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Setup Progress</span>
            <span>{completedSteps.length}/{setupSteps.length} completed</span>
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
                    <button className="px-4 py-2 bg-gray-500 text-white rounded opacity-50">
                      ✓ Completed
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleStepComplete(step.id)
                        if (step.id === 'github-copilot') setGithubConnected(true)
                        if (step.id === 'student-pack') setStudentPackClaimed(true)
                      }}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Start Setup
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Free Developer Stack Overview */}
      <div className="free-stack-overview mb-8">
        <h2 className="text-2xl font-semibold mb-4">💰 Your Free Professional Stack</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          These are the exact same tools used by professional developers at major tech companies. 
          You get them all for free while learning.
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

      {/* Success State */}
      {completedSteps.length === setupSteps.length && (
        <div className="success-state bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">
            Professional Developer Environment Complete!
          </h2>
          <p className="text-xl opacity-90 mb-6">
            You now have the same development setup used by engineers at Google, Netflix, and Spotify. 
            Time to start building!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-semibold">AI-Powered Coding</div>
              <div className="text-sm opacity-80">GitHub Copilot ready</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl mb-2">🌐</div>
              <div className="font-semibold">Live Deployments</div>
              <div className="text-sm opacity-80">GitHub Pages + Vercel</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl mb-2">💼</div>
              <div className="font-semibold">Professional Tools</div>
              <div className="text-sm opacity-80">${totalStackValue}+ value</div>
            </div>
          </div>
          
          <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start First Lesson
          </button>
        </div>
      )}

      {/* Support Information */}
      <div className="support-info bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="font-semibold mb-3">💡 Need Help with Setup?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium mb-2">Common Questions:</h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• GitHub Student Pack verification can take 1-7 days</li>
              <li>• GitHub Copilot free tier has usage limits but they're generous</li>
              <li>• All tools remain free while you're a student</li>
              <li>• You can upgrade individually when you start earning</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-2">Professional Benefits:</h4>
            <ul className="space-y-1 text-gray-600 dark:text-gray-400">
              <li>• GitHub profile shows real project experience</li>
              <li>• Live portfolio impresses recruiters</li>
              <li>• Experience with industry-standard tools</li>
              <li>• Professional development workflow</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GitHubProfessionalSetup
