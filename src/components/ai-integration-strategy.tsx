'use client'

import { useState } from 'react'
import { CheckCircleIcon, ExclamationTriangleIcon, XCircleIcon } from '@heroicons/react/24/outline'

/**
 * AI Integration Strategy Component
 * 
 * Explains the three AI integration approaches for RockitCode
 * and why GitHub Copilot + optional student accounts is optimal
 */

interface AIStrategy {
  id: string
  name: string
  cost: {
    toStudents: string
    toPlatform: string
    scalability: string
  }
  implementation: {
    location: string
    setup: string
    billing: string
  }
  pros: string[]
  cons: string[]
  recommendation: 'recommended' | 'optional' | 'avoid'
}

const aiStrategies: AIStrategy[] = [
  {
    id: 'github-copilot',
    name: 'GitHub Copilot Free Tier (PRIMARY)',
    cost: {
      toStudents: '$0',
      toPlatform: '$0',
      scalability: 'Unlimited - GitHub absorbs costs'
    },
    implementation: {
      location: 'VS Code, GitHub Codespaces, local development',
      setup: 'Part of professional developer setup flow',
      billing: 'GitHub handles all AI costs and infrastructure'
    },
    pros: [
      'Zero costs to students and platform',
      'Professional development workflow',
      'No API limits or usage concerns',
      'Teaches real-world AI collaboration',
      'Integrated with version control',
      'Works offline and online',
      'Industry-standard tool'
    ],
    cons: [
      'Not integrated into lesson website',
      'Requires GitHub account setup',
      'Limited to coding assistance'
    ],
    recommendation: 'recommended'
  },
  {
    id: 'student-accounts',
    name: 'Student-Provided AI Accounts (OPTIONAL)',
    cost: {
      toStudents: '$5-20/month (their choice)',
      toPlatform: '$0',
      scalability: 'Perfect - each student pays their own usage'
    },
    implementation: {
      location: 'Integrated into RockitCode Monaco editor',
      setup: 'Students enter their own OpenAI/Claude API keys',
      billing: 'Students pay their chosen AI provider directly'
    },
    pros: [
      'Zero costs to platform',
      'Integrated lesson experience',
      'Students learn AI cost management',
      'Access to latest AI models',
      'Customizable AI preferences',
      'Advanced features available'
    ],
    cons: [
      'Optional cost to students',
      'Requires API key management',
      'Potential for student overspending',
      'Need fallback for students without AI'
    ],
    recommendation: 'optional'
  },
  {
    id: 'platform-provided',
    name: 'Platform-Provided AI (AVOID)',
    cost: {
      toStudents: '$0',
      toPlatform: '$1000s-$10000s/month',
      scalability: 'Terrible - exponential cost growth'
    },
    implementation: {
      location: 'RockitCode servers handle all AI requests',
      setup: 'Platform API keys serve all students',
      billing: 'Every student interaction billed to RockitCode'
    },
    pros: [
      'Free for students',
      'Seamless integration',
      'No student setup required'
    ],
    cons: [
      'Bankrupts free platform model',
      'Scales exponentially with users',
      'Requires strict usage limits',
      'Forces platform to charge students',
      'Single point of failure',
      'Massive infrastructure costs'
    ],
    recommendation: 'avoid'
  }
]

const AIIntegrationStrategy = () => {
  const [selectedStrategy, setSelectedStrategy] = useState<string>('github-copilot')

  const getRecommendationIcon = (rec: string) => {
    switch (rec) {
      case 'recommended':
        return <CheckCircleIcon className="h-6 w-6 text-green-500" />
      case 'optional':
        return <ExclamationTriangleIcon className="h-6 w-6 text-yellow-500" />
      case 'avoid':
        return <XCircleIcon className="h-6 w-6 text-red-500" />
    }
  }

  const getRecommendationColor = (rec: string) => {
    switch (rec) {
      case 'recommended':
        return 'border-green-500 bg-green-50 dark:bg-green-900/20'
      case 'optional':
        return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      case 'avoid':
        return 'border-red-500 bg-red-50 dark:bg-red-900/20'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          AI Integration Strategy for RockitCode
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Three approaches to AI integration with cost and implementation analysis
        </p>
        
        {/* Strategic Overview */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-3">
            Recommended Hybrid Strategy
          </h2>
          <p className="text-blue-800 dark:text-blue-200">
            <strong>Primary:</strong> GitHub Copilot Free Tier for professional development workflow<br/>
            <strong>Optional:</strong> Student-provided AI accounts for advanced lesson integration<br/>
            <strong>Result:</strong> $0 platform costs, professional tools, maximum flexibility
          </p>
        </div>
      </div>

      {/* Strategy Cards */}
      <div className="grid gap-6 mb-8">
        {aiStrategies.map((strategy) => (
          <div 
            key={strategy.id}
            className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
              selectedStrategy === strategy.id 
                ? getRecommendationColor(strategy.recommendation)
                : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
            onClick={() => setSelectedStrategy(strategy.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                {getRecommendationIcon(strategy.recommendation)}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {strategy.name}
                </h3>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Platform Cost</div>
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  {strategy.cost.toPlatform}
                </div>
              </div>
            </div>

            {selectedStrategy === strategy.id && (
              <div className="space-y-6">
                {/* Cost Breakdown */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Student Cost</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {strategy.cost.toStudents}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Platform Cost</div>
                    <div className="text-lg font-semibold text-gray-900 dark:text-white">
                      {strategy.cost.toPlatform}
                    </div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Scalability</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">
                      {strategy.cost.scalability}
                    </div>
                  </div>
                </div>

                {/* Implementation Details */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Implementation Details
                  </h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 mb-1">Location</div>
                      <div className="text-gray-700 dark:text-gray-300">{strategy.implementation.location}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 mb-1">Setup</div>
                      <div className="text-gray-700 dark:text-gray-300">{strategy.implementation.setup}</div>
                    </div>
                    <div>
                      <div className="text-gray-500 dark:text-gray-400 mb-1">Billing</div>
                      <div className="text-gray-700 dark:text-gray-300">{strategy.implementation.billing}</div>
                    </div>
                  </div>
                </div>

                {/* Pros and Cons */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                      ✅ Advantages
                    </h4>
                    <ul className="space-y-1 text-sm text-green-800 dark:text-green-200">
                      {strategy.pros.map((pro, index) => (
                        <li key={index}>• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-3">
                      ⚠️ Considerations
                    </h4>
                    <ul className="space-y-1 text-sm text-red-800 dark:text-red-200">
                      {strategy.cons.map((con, index) => (
                        <li key={index}>• {con}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Vercel API Usage Explanation */}
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100 mb-3">
          🚨 Critical: Vercel API Usage & Billing
        </h3>
        <div className="space-y-3 text-orange-800 dark:text-orange-200">
          <p>
            <strong>If students use YOUR API keys:</strong> Every AI request (OpenAI/Claude/etc) gets billed to YOUR Vercel account.
            With 1000 active students, this could cost $1000s-$10000s per month.
          </p>
          <p>
            <strong>If students use THEIR OWN API keys:</strong> Each student's AI usage is billed to their personal account.
            Your Vercel usage remains at $0 for AI costs.
          </p>
          <p>
            <strong>If students use GitHub Copilot:</strong> All AI costs are handled by GitHub.
            Your platform has zero AI-related costs.
          </p>
        </div>
      </div>

      {/* Implementation Roadmap */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🛣️ Implementation Roadmap
        </h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Phase 1: GitHub Professional Setup</div>
              <div className="text-gray-600 dark:text-gray-300">Integrate GitHub Copilot free tier into professional developer onboarding</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Phase 2: Optional AI Integration</div>
              <div className="text-gray-600 dark:text-gray-300">Add Monaco editor AI features for students who want enhanced lesson experience</div>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">Phase 3: AI Education</div>
              <div className="text-gray-600 dark:text-gray-300">Teach responsible AI usage, cost management, and professional AI workflows</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIIntegrationStrategy
