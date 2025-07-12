'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import IntegratedOnboarding from '@/components/integrated-onboarding'
import ProfessionalDashboard from '@/components/professional-dashboard'
import MonacoEditorEnhanced from '@/components/monaco-editor-enhanced'
import GitHubPortfolioDeployment from '@/components/github-portfolio-deployment'
import AIProjectShowcase from '@/components/ai-project-showcase'
import AffiliatePerformanceDashboard from '@/components/affiliate-performance-dashboard'

/**
 * Integration Demo Page
 * 
 * Shows how the zero-cost professional development platform integrates
 * with your existing RockitCode course structure and lesson flow.
 */

const IntegrationDemo = () => {
  const { data: session } = useSession()
  const [activeDemo, setActiveDemo] = useState<string>('onboarding')

  // Example lesson project for Monaco editor demo
  const exampleProject = {
    id: 'responsive-navigation',
    title: 'Responsive Navigation Component',
    description: 'Build a professional navigation component with mobile-first design and accessibility features.',
    template: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Professional Navigation</title>
    <style>
        /* Add your CSS here */
        .nav {
            
        }
    </style>
</head>
<body>
    <nav class="nav">
        <!-- Build your navigation here -->
    </nav>
    
    <script>
        // Add interactive functionality
    </script>
</body>
</html>`,
    expectedOutput: 'A fully responsive navigation that works on desktop, tablet, and mobile devices with smooth animations and accessibility features.',
    aiHints: [
      'Use semantic HTML5 elements for better accessibility',
      'Implement mobile-first responsive design with CSS Grid',
      'Add proper ARIA labels for screen readers',
      'Use CSS custom properties for consistent theming',
      'Test navigation with keyboard navigation'
    ],
    githubWorkflow: {
      branchName: 'feature/responsive-navigation',
      commitMessage: 'feat: add responsive navigation component with accessibility features',
      deploymentUrl: 'https://username.github.io/responsive-nav-demo'
    }
  }

  const demoSections = [
    {
      id: 'onboarding',
      title: '🚀 Professional Setup Flow',
      description: 'GitHub and Vercel signup integration with affiliate tracking',
      component: <IntegratedOnboarding />
    },
    {
      id: 'dashboard',
      title: '📊 Student Progress Dashboard',
      description: 'Career readiness tracking and professional development metrics',
      component: <ProfessionalDashboard />
    },
    {
      id: 'editor',
      title: '💻 AI-Enhanced Code Editor',
      description: 'Monaco editor with GitHub Copilot-style assistance',
      component: <MonacoEditorEnhanced project={exampleProject} />
    },
    {
      id: 'deployment',
      title: '🌐 Automated Portfolio Deployment',
      description: 'GitHub Pages deployment with professional workflow',
      component: (
        <GitHubPortfolioDeployment 
          projectId="responsive-nav" 
          projectName="Responsive Navigation" 
          projectCode={exampleProject.template}
        />
      )
    },
    {
      id: 'showcase',
      title: '🏆 Student Success Stories',
      description: 'AI-powered project showcase demonstrating student achievements',
      component: <AIProjectShowcase />
    },
    {
      id: 'analytics',
      title: '📈 Affiliate Performance Analytics',
      description: 'Revenue tracking and optimization insights (Admin only)',
      component: <AffiliatePerformanceDashboard />
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
                RockitCode
              </Link>
              <span className="text-gray-400">|</span>
              <span className="text-gray-600 dark:text-gray-300">
                Zero-Cost Professional Development Integration Demo
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {session?.user ? (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {session.user.name}
                  </span>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Integration Overview */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Zero-Cost Professional Development Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            See how GitHub and Vercel affiliate integration creates a sustainable business model 
            while delivering $200k+ value to students completely free.
          </p>
          
          {/* Value Proposition */}
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-8">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                100% Free
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Students & Platform
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                $200k+
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Tools Value per Student
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                Professional
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Enterprise-grade Stack
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                Scalable
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Infinite Students
              </div>
            </div>
          </div>
        </div>

        {/* Demo Navigation */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6">
              {demoSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveDemo(section.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeDemo === section.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </nav>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {demoSections.find(s => s.id === activeDemo)?.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {demoSections.find(s => s.id === activeDemo)?.description}
              </p>
            </div>
          </div>
        </div>

        {/* Active Demo Component */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          {demoSections.find(s => s.id === activeDemo)?.component}
        </div>

        {/* Integration Benefits */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-green-900 dark:text-green-300 mb-4">
              ✅ Benefits for Students
            </h3>
            <ul className="space-y-2 text-green-800 dark:text-green-300">
              <li>• Professional GitHub profile from day 1</li>
              <li>• $200k+ in free developer tools</li>
              <li>• AI-assisted learning with GitHub Copilot</li>
              <li>• Live portfolio projects with each lesson</li>
              <li>• Industry-standard development workflow</li>
              <li>• Zero cost throughout entire learning journey</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
              💰 Benefits for RockitCode
            </h3>
            <ul className="space-y-2 text-blue-800 dark:text-blue-300">
              <li>• Zero operational costs for AI features</li>
              <li>• Sustainable affiliate revenue stream</li>
              <li>• Professional differentiation vs competitors</li>
              <li>• Scalable to unlimited students</li>
              <li>• 1-2 year free operation runway</li>
              <li>• Premium positioning without premium costs</li>
            </ul>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🔧 Technical Implementation
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Affiliate Integration
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Direct GitHub/Vercel signup flows</li>
                <li>• Transparent affiliate tracking</li>
                <li>• Conversion optimization</li>
                <li>• Revenue analytics dashboard</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Course Integration
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Professional setup milestone</li>
                <li>• GitHub workflow in every lesson</li>
                <li>• Automatic portfolio building</li>
                <li>• AI-assisted code editor</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                Business Model
              </h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Free tier leverages GitHub/Vercel</li>
                <li>• Affiliate commissions from upgrades</li>
                <li>• GitHub sponsorship integration</li>
                <li>• Zero platform costs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="mt-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Implement?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            This integration can be deployed alongside your existing course structure with minimal changes.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/learn/foundation"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Foundation Course
            </Link>
            <Link
              href="/onboarding"
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Start Professional Setup
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntegrationDemo
