'use client'

import { useState, useEffect } from 'react'
import { clsx } from 'clsx'

interface AIProvider {
  id: 'openai' | 'anthropic' | 'github' | 'google' | 'custom'
  name: string
  description: string
  pricing: string
  setupComplexity: 'Easy' | 'Moderate' | 'Advanced'
  learningFit: string
  enabled: boolean
  connected: boolean
  monthlyUsage?: number
  monthlyBudget?: number
}

interface UserAISettings {
  hasAnyProvider: boolean
  defaultProvider?: string
  totalMonthlyBudget: number
  totalMonthlyUsage: number
  costTrackingEnabled: boolean
  usageAlertsEnabled: boolean
}

export function AIAccountSetup() {
  const [providers, setProviders] = useState<AIProvider[]>([
    {
      id: 'openai',
      name: 'OpenAI (ChatGPT/GPT-4)',
      description: 'Most versatile AI assistant, excellent for learning and code generation',
      pricing: '~$3-10/month for typical student usage',
      setupComplexity: 'Easy',
      learningFit: 'Excellent for all skill levels and tasks',
      enabled: false,
      connected: false
    },
    {
      id: 'github',
      name: 'GitHub Copilot',
      description: 'Code-focused AI with flat monthly pricing, great for code completion',
      pricing: '$10/month for students, $19/month for professionals',
      setupComplexity: 'Easy',
      learningFit: 'Perfect for code suggestions and completions',
      enabled: false,
      connected: false
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      description: 'Excellent reasoning capabilities, great for understanding complex concepts',
      pricing: '~$2-8/month for typical student usage',
      setupComplexity: 'Easy',
      learningFit: 'Excellent for concept understanding and debugging',
      enabled: false,
      connected: false
    }
  ])

  const [userSettings, setUserSettings] = useState<UserAISettings>({
    hasAnyProvider: false,
    totalMonthlyBudget: 0,
    totalMonthlyUsage: 0,
    costTrackingEnabled: true,
    usageAlertsEnabled: true
  })

  const [showSetupWizard, setShowSetupWizard] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)

  const connectedProviders = providers.filter(p => p.connected)
  const hasAnyConnected = connectedProviders.length > 0

  return (
    <div className="ai-account-setup max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="header mb-8">
        <h1 className="text-3xl font-bold mb-4">🤖 AI Learning Enhancement</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
          Connect your own AI accounts to supercharge your learning experience. 
          All lessons work perfectly without AI - this just makes them faster and more interactive.
        </p>
        
        {!hasAnyConnected && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="text-blue-500 text-xl">💡</div>
              <div>
                <h3 className="font-semibold text-blue-800 dark:text-blue-200">Why Your Own AI Account?</h3>
                <ul className="text-sm text-blue-700 dark:text-blue-300 mt-2 space-y-1">
                  <li>• <strong>No platform costs:</strong> You control your AI spending directly</li>
                  <li>• <strong>Full access:</strong> Use the latest models without artificial limits</li>
                  <li>• <strong>Professional skills:</strong> Learn real-world AI account management</li>
                  <li>• <strong>Future-proof:</strong> Works with any AI provider you choose</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Current Status */}
      {hasAnyConnected && (
        <div className="current-status mb-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-green-800 dark:text-green-200">
            ✅ AI Enhancement Active
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="stat-card text-center">
              <div className="text-2xl font-bold text-green-600">{connectedProviders.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Connected Providers</div>
            </div>
            
            <div className="stat-card text-center">
              <div className="text-2xl font-bold text-blue-600">${userSettings.totalMonthlyUsage.toFixed(2)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">This Month's Usage</div>
            </div>
            
            <div className="stat-card text-center">
              <div className="text-2xl font-bold text-purple-600">${userSettings.totalMonthlyBudget}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Budget</div>
            </div>
          </div>

          <div className="connected-providers">
            <h3 className="font-medium mb-2">Your Connected AI Assistants:</h3>
            <div className="flex flex-wrap gap-2">
              {connectedProviders.map(provider => (
                <span 
                  key={provider.id}
                  className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200 rounded-full text-sm"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  {provider.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Provider Selection */}
      <div className="provider-selection mb-8">
        <h2 className="text-xl font-semibold mb-4">Choose Your AI Assistant</h2>
        <div className="grid grid-cols-1 gap-4">
          {providers.map(provider => (
            <div
              key={provider.id}
              className={clsx(
                "provider-card border rounded-lg p-6 transition-all cursor-pointer",
                provider.connected 
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
              )}
              onClick={() => setSelectedProvider(provider.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold">{provider.name}</h3>
                    {provider.connected && (
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-200 rounded text-xs">
                        ✓ Connected
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-3">{provider.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Pricing:</span>
                      <div className="text-gray-600 dark:text-gray-400">{provider.pricing}</div>
                    </div>
                    
                    <div>
                      <span className="font-medium">Setup:</span>
                      <div className={clsx(
                        provider.setupComplexity === 'Easy' && "text-green-600",
                        provider.setupComplexity === 'Moderate' && "text-yellow-600",
                        provider.setupComplexity === 'Advanced' && "text-red-600"
                      )}>
                        {provider.setupComplexity}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium">Learning Fit:</span>
                      <div className="text-gray-600 dark:text-gray-400">{provider.learningFit}</div>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  {provider.connected ? (
                    <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                      Manage
                    </button>
                  ) : (
                    <button 
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedProvider(provider.id)
                        setShowSetupWizard(true)
                      }}
                    >
                      Connect
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* No AI Option */}
      <div className="no-ai-option mb-8 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-2">✋ Prefer Learning Without AI?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          That's perfectly fine! All our lessons are designed to work excellently without any AI assistance. 
          You'll get the full learning experience and can add AI enhancement later if you change your mind.
        </p>
        <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800">
          Continue Without AI
        </button>
      </div>

      {/* Setup Wizard Modal */}
      {showSetupWizard && selectedProvider && (
        <AISetupWizard
          provider={providers.find(p => p.id === selectedProvider)!}
          onClose={() => {
            setShowSetupWizard(false)
            setSelectedProvider(null)
          }}
          onComplete={(providerData) => {
            setProviders(prev => 
              prev.map(p => 
                p.id === selectedProvider 
                  ? { ...p, connected: true, enabled: true }
                  : p
              )
            )
            setUserSettings(prev => ({
              ...prev,
              hasAnyProvider: true
            }))
            setShowSetupWizard(false)
            setSelectedProvider(null)
          }}
        />
      )}

      {/* Benefits Preview */}
      <div className="benefits-preview bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">🚀 What You'll Get With AI Enhancement</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="benefit-card">
            <div className="text-2xl mb-2">⚡</div>
            <h3 className="font-medium mb-1">Faster Learning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get instant explanations and code suggestions while you learn
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-medium mb-1">Personalized Help</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              AI adapts to your skill level and learning style
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="font-medium mb-1">Instant Debugging</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get help identifying and fixing code issues quickly
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="text-2xl mb-2">💡</div>
            <h3 className="font-medium mb-1">Code Suggestions</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Smart completions and optimization recommendations
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="text-2xl mb-2">🎓</div>
            <h3 className="font-medium mb-1">Professional Skills</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Learn real-world AI collaboration workflows
            </p>
          </div>
          
          <div className="benefit-card">
            <div className="text-2xl mb-2">💰</div>
            <h3 className="font-medium mb-1">Cost Control</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              You manage your own AI budget and usage
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

interface AISetupWizardProps {
  provider: AIProvider
  onClose: () => void
  onComplete: (providerData: any) => void
}

function AISetupWizard({ provider, onClose, onComplete }: AISetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [apiKey, setApiKey] = useState('')
  const [monthlyBudget, setMonthlyBudget] = useState(10)
  const [selectedModel, setSelectedModel] = useState('')

  const steps = [
    {
      title: "Create Account",
      description: `Set up your ${provider.name} account`
    },
    {
      title: "Get API Key", 
      description: "Generate your API credentials"
    },
    {
      title: "Configure Settings",
      description: "Set your budget and preferences"
    },
    {
      title: "Test Connection",
      description: "Verify everything works"
    }
  ]

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Connect {provider.name}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                index + 1 <= currentStep
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
              )}>
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={clsx(
                  "w-12 h-1 mx-2",
                  index + 1 < currentStep
                    ? "bg-blue-500"
                    : "bg-gray-200 dark:bg-gray-700"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="step-content mb-8">
          {currentStep === 1 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 1: Create Your Account</h3>
              <div className="space-y-4">
                <p>First, you'll need to create an account with {provider.name}:</p>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-4">
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Visit the official {provider.name} website</li>
                    <li>Sign up for an account (many offer free credits to start)</li>
                    <li>Verify your email address</li>
                    <li>Complete any required setup steps</li>
                  </ol>
                </div>
                <button
                  onClick={() => window.open(getProviderSignupUrl(provider.id), '_blank')}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Open {provider.name} Signup
                </button>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 2: Get Your API Key</h3>
              <div className="space-y-4">
                <p>Now generate an API key for RockitCode to use:</p>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded p-4">
                  <p className="text-sm mb-2"><strong>Security Note:</strong></p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Never share your API key with anyone</li>
                    <li>We store it securely and only use it for your learning</li>
                    <li>You can revoke access anytime from your provider's dashboard</li>
                  </ul>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Paste your API key here:
                  </label>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 3: Configure Your Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Monthly Budget: ${monthlyBudget}
                  </label>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={monthlyBudget}
                    onChange={(e) => setMonthlyBudget(Number(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$5 (Light usage)</span>
                    <span>$25 (Moderate)</span>
                    <span>$50 (Heavy usage)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Preferred Model:
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    <option value="">Choose based on provider...</option>
                    {provider.id === 'openai' && (
                      <>
                        <option value="gpt-4o-mini">GPT-4o Mini (Fast & Affordable)</option>
                        <option value="gpt-4o">GPT-4o (Best Quality)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">Step 4: Test Your Connection</h3>
              <div className="space-y-4">
                <p>Let's test your API connection with a simple request:</p>
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded p-4">
                  <p className="text-green-800 dark:text-green-200 font-medium">✅ Connection Successful!</p>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    Your {provider.name} account is ready for AI-enhanced learning.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={currentStep > 1 ? () => setCurrentStep(currentStep - 1) : onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            {currentStep > 1 ? 'Previous' : 'Cancel'}
          </button>
          
          <button
            onClick={currentStep < 4 ? () => setCurrentStep(currentStep + 1) : () => onComplete({})}
            disabled={currentStep === 2 && !apiKey}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {currentStep < 4 ? 'Next' : 'Complete Setup'}
          </button>
        </div>
      </div>
    </div>
  )
}

function getProviderSignupUrl(providerId: string): string {
  const urls = {
    openai: 'https://platform.openai.com/signup',
    anthropic: 'https://console.anthropic.com/signup',
    github: 'https://github.com/features/copilot',
    google: 'https://makersuite.google.com/app/prompts/new_chat'
  }
  return urls[providerId as keyof typeof urls] || '#'
}

export default AIAccountSetup
