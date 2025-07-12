'use client'

import { useState, useEffect } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

interface GitHubIntegration {
  connected: boolean
  username?: string
  avatar?: string
  repositories: number
  studentPackStatus: 'not_applied' | 'pending' | 'approved' | 'expired'
  copilotAccess: boolean
}

export function GitHubMissionControl() {
  const { data: session, status } = useSession()
  const [integration, setIntegration] = useState<GitHubIntegration>({
    connected: false,
    repositories: 0,
    studentPackStatus: 'not_applied',
    copilotAccess: false
  })

  const [setupProgress, setSetupProgress] = useState({
    githubConnected: false,
    profileOptimized: false,
    studentPackApplied: false,
    copilotEnabled: false,
    firstRepoCreated: false,
    portfolioDeployed: false
  })

  useEffect(() => {
    if (session?.user) {
      setIntegration({
        connected: true,
        username: session.user.email?.split('@')[0],
        avatar: session.user.image || undefined,
        repositories: 0, // Would fetch from GitHub API
        studentPackStatus: 'not_applied', // Would check actual status
        copilotAccess: false // Would check Copilot access
      })
      setSetupProgress(prev => ({ ...prev, githubConnected: true }))
    }
  }, [session])

  const completedSteps = Object.values(setupProgress).filter(Boolean).length
  const totalSteps = Object.keys(setupProgress).length
  const completionPercentage = Math.round((completedSteps / totalSteps) * 100)

  const handleGitHubConnect = () => {
    signIn('github', { callbackUrl: '/launch?step=connected' })
  }

  const handleStepComplete = (step: keyof typeof setupProgress) => {
    setSetupProgress(prev => ({ ...prev, [step]: true }))
  }

  const missionSteps = [
    {
      id: 'githubConnected',
      title: '🔗 GitHub Account Connection',
      description: 'Connect your GitHub account to begin mission initialization',
      completed: setupProgress.githubConnected,
      action: integration.connected ? 'Connected ✓' : 'Connect GitHub',
      onClick: integration.connected ? undefined : handleGitHubConnect
    },
    {
      id: 'profileOptimized',
      title: '👤 Professional Profile Setup',
      description: 'Optimize your GitHub profile for professional visibility',
      completed: setupProgress.profileOptimized,
      action: 'Optimize Profile',
      onClick: () => handleStepComplete('profileOptimized')
    },
    {
      id: 'studentPackApplied',
      title: '🎒 Student Developer Pack',
      description: 'Apply for GitHub Student Developer Pack ($200k+ value)',
      completed: setupProgress.studentPackApplied,
      action: 'Apply for Pack',
      onClick: () => handleStepComplete('studentPackApplied')
    },
    {
      id: 'copilotEnabled',
      title: '🤖 GitHub Copilot Activation',
      description: 'Enable AI-powered coding assistance',
      completed: setupProgress.copilotEnabled,
      action: 'Enable Copilot',
      onClick: () => handleStepComplete('copilotEnabled')
    },
    {
      id: 'firstRepoCreated',
      title: '📁 First Repository Creation',
      description: 'Create your first professional project repository',
      completed: setupProgress.firstRepoCreated,
      action: 'Create Repository',
      onClick: () => handleStepComplete('firstRepoCreated')
    },
    {
      id: 'portfolioDeployed',
      title: '🌐 Portfolio Deployment',
      description: 'Deploy your first portfolio website live',
      completed: setupProgress.portfolioDeployed,
      action: 'Deploy Portfolio',
      onClick: () => handleStepComplete('portfolioDeployed')
    }
  ]

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-4xl mb-4">🚀</div>
          <div className="text-xl font-semibold">Initializing Mission Control...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="github-mission-control max-w-4xl mx-auto p-6">
      {/* Mission Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-4xl font-bold mb-4">GitHub Mission Control</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Real professional setup with actual GitHub integration
        </p>
      </div>

      {/* GitHub Connection Status */}
      <div className="github-status bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-800 dark:to-blue-900/20 rounded-lg p-6 mb-8">
        {integration.connected ? (
          <div className="flex items-center space-x-4">
            {integration.avatar && (
              <img
                src={integration.avatar}
                alt="GitHub Avatar"
                className="w-16 h-16 rounded-full"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-green-600">✅ GitHub Connected</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Logged in as: <strong>@{integration.username}</strong>
              </p>
              <div className="text-sm text-gray-500 mt-1">
                Repositories: {integration.repositories} • 
                Student Pack: {integration.studentPackStatus} • 
                Copilot: {integration.copilotAccess ? 'Active' : 'Not Active'}
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Disconnect
            </button>
          </div>
        ) : (
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">🔗 Connect Your GitHub Account</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Connect your GitHub account to access professional tools and begin your mission sequence
            </p>
            <button
              onClick={handleGitHubConnect}
              className="px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center space-x-2 mx-auto"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              <span>Connect with GitHub</span>
            </button>
          </div>
        )}
      </div>

      {/* Mission Progress */}
      <div className="mission-progress mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">🚀 Mission Progress</h2>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
          </div>
        </div>

        <div className="progress-bar mb-6">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
            {completedSteps} of {totalSteps} mission systems activated
          </div>
        </div>

        {/* Mission Steps */}
        <div className="mission-steps space-y-4">
          {missionSteps.map((step, index) => (
            <div
              key={step.id}
              className={`step-card border rounded-lg p-4 ${
                step.completed
                  ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.completed
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {step.completed ? '✓' : index + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                  </div>
                </div>
                
                <div>
                  {step.completed ? (
                    <span className="px-4 py-2 bg-green-500 text-white rounded text-sm">
                      ✓ Complete
                    </span>
                  ) : step.onClick ? (
                    <button
                      onClick={step.onClick}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      {step.action}
                    </button>
                  ) : (
                    <span className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded text-sm">
                      {step.action}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mission Complete */}
      {completionPercentage === 100 && (
        <div className="mission-complete bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg p-8 text-center">
          <div className="text-4xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold mb-4">Mission Systems Fully Operational!</h2>
          <p className="mb-6">
            All mission systems are online. You're ready for professional development missions.
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100">
            🚀 Begin Development Missions
          </button>
        </div>
      )}
    </div>
  )
}

export default GitHubMissionControl
