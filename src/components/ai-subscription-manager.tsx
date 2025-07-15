'use client'

import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'

interface AIProvider {
  id: string
  name: string
  description: string
  icon: string
  features: string[]
  pricing: {
    free?: string
    paid?: string
  }
  status: 'not-connected' | 'connected' | 'expired'
  apiKey?: string
  lastUsed?: string
}

export default function AISubscriptionManager() {
  const { user } = useUser()
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null)
  const [showApiKeyForm, setShowApiKeyForm] = useState(false)
  const [newApiKey, setNewApiKey] = useState('')

  const aiProviders: AIProvider[] = [
    {
      id: 'openai',
      name: 'OpenAI GPT',
      description: 'Advanced code assistance with GPT-4 and ChatGPT models',
      icon: '🤖',
      features: [
        'Code completion and suggestions',
        'Error debugging and fixes',
        'Code explanation and documentation',
        'Architecture recommendations',
        'Performance optimization tips'
      ],
      pricing: {
        free: 'Limited requests per month',
        paid: '$20/month for unlimited access'
      },
      status: 'not-connected'
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      description: 'Helpful, harmless, and honest AI for code analysis',
      icon: '🧠',
      features: [
        'Code review and analysis',
        'Security vulnerability detection',
        'Code refactoring suggestions',
        'Best practices guidance',
        'Documentation generation'
      ],
      pricing: {
        free: '1,000 requests per month',
        paid: '$20/month for professional use'
      },
      status: 'not-connected'
    },
    {
      id: 'google',
      name: 'Google Gemini',
      description: 'Multimodal AI for comprehensive development support',
      icon: '✨',
      features: [
        'Code and image analysis',
        'Multi-language support',
        'Integration with Google tools',
        'Real-time collaboration',
        'Advanced reasoning'
      ],
      pricing: {
        free: 'Basic usage included',
        paid: '$15/month for advanced features'
      },
      status: 'not-connected'
    }
  ]

  const [providers, setProviders] = useState(aiProviders)

  const handleConnectProvider = (providerId: string) => {
    setSelectedProvider(providerId)
    setShowApiKeyForm(true)
  }

  const handleSaveApiKey = () => {
    if (newApiKey && selectedProvider) {
      setProviders(prev => prev.map(provider => 
        provider.id === selectedProvider 
          ? { ...provider, status: 'connected' as const, apiKey: newApiKey, lastUsed: new Date().toISOString() }
          : provider
      ))
      setShowApiKeyForm(false)
      setNewApiKey('')
      setSelectedProvider(null)
    }
  }

  const handleDisconnectProvider = (providerId: string) => {
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, status: 'not-connected' as const, apiKey: undefined, lastUsed: undefined }
        : provider
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'expired': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Connected'
      case 'expired': return 'Expired'
      default: return 'Not Connected'
    }
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to manage your AI subscriptions.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">🤖</div>
          <h1 className="text-3xl font-bold">AI Subscriptions</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Connect your AI assistant accounts to get enhanced coding support during lessons.
        </p>
      </div>

      {/* Usage Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-blue-600">📊</div>
            <h3 className="font-semibold">This Month</h3>
          </div>
          <div className="text-2xl font-bold text-blue-600">1,247</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">AI requests used</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-green-600">⚡</div>
            <h3 className="font-semibold">Active Sessions</h3>
          </div>
          <div className="text-2xl font-bold text-green-600">3</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Connected providers</div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="text-purple-600">💡</div>
            <h3 className="font-semibold">Avg Response</h3>
          </div>
          <div className="text-2xl font-bold text-purple-600">2.3s</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Response time</div>
        </div>
      </div>

      {/* AI Providers */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Available AI Providers</h2>
        
        <div className="grid gap-6">
          {providers.map((provider) => (
            <div key={provider.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{provider.icon}</div>
                    <div>
                      <h3 className="text-xl font-semibold">{provider.name}</h3>
                      <p className="text-gray-600 dark:text-gray-400">{provider.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(provider.status)}`}>
                      {getStatusText(provider.status)}
                    </span>
                    {provider.status === 'connected' ? (
                      <button
                        onClick={() => handleDisconnectProvider(provider.id)}
                        className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        Disconnect
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConnectProvider(provider.id)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Connect
                      </button>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {provider.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="text-green-600">✓</div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Pricing:</h4>
                  <div className="flex gap-6 text-sm">
                    {provider.pricing.free && (
                      <div>
                        <span className="font-medium">Free:</span> {provider.pricing.free}
                      </div>
                    )}
                    {provider.pricing.paid && (
                      <div>
                        <span className="font-medium">Paid:</span> {provider.pricing.paid}
                      </div>
                    )}
                  </div>
                </div>

                {/* Last Used */}
                {provider.lastUsed && (
                  <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                    Last used: {new Date(provider.lastUsed).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Key Modal */}
      {showApiKeyForm && selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Connect {providers.find(p => p.id === selectedProvider)?.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Enter your API key to connect this AI provider:
            </p>
            <input
              type="password"
              value={newApiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
              placeholder="Enter API key..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowApiKeyForm(false)
                  setNewApiKey('')
                  setSelectedProvider(null)
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveApiKey}
                disabled={!newApiKey}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
