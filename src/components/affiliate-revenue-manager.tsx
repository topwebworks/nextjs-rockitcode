'use client'

import { useState } from 'react'

interface AffiliateTool {
  id: string
  name: string
  category: string
  provider: string
  studentPrice: string
  professionalPrice: string
  affiliateCommission: string
  estimatedConversions: number
  monthlyRevenue: number
  setupComplexity: 'Easy' | 'Medium' | 'Hard'
  integrationStatus: 'Active' | 'Pending' | 'Planned'
  description: string
  benefits: string[]
}

export function AffiliateRevenueManager() {
  const [activeTab, setActiveTab] = useState<'overview' | 'tools' | 'analytics'>('overview')

  const affiliateTools: AffiliateTool[] = [
    {
      id: 'github-copilot',
      name: 'GitHub Copilot',
      category: 'AI Development',
      provider: 'GitHub',
      studentPrice: 'Free',
      professionalPrice: '$10/month',
      affiliateCommission: '25%',
      estimatedConversions: 500,
      monthlyRevenue: 1250,
      setupComplexity: 'Easy',
      integrationStatus: 'Active',
      description: 'AI-powered code completion and chat assistance',
      benefits: ['Real-time code suggestions', 'Natural language coding', 'Learning acceleration']
    },
    {
      id: 'github-pro',
      name: 'GitHub Pro',
      category: 'Version Control',
      provider: 'GitHub',
      studentPrice: 'Free',
      professionalPrice: '$4/month',
      affiliateCommission: '20%',
      estimatedConversions: 800,
      monthlyRevenue: 640,
      setupComplexity: 'Easy',
      integrationStatus: 'Active',
      description: 'Professional GitHub features and private repositories',
      benefits: ['Unlimited private repos', 'Advanced insights', 'Pages with custom domains']
    },
    {
      id: 'vercel-pro',
      name: 'Vercel Pro',
      category: 'Hosting & Deployment',
      provider: 'Vercel',
      studentPrice: 'Free tier',
      professionalPrice: '$20/month',
      affiliateCommission: '30%',
      estimatedConversions: 300,
      monthlyRevenue: 1800,
      setupComplexity: 'Easy',
      integrationStatus: 'Active',
      description: 'Professional web hosting with edge functions',
      benefits: ['Unlimited deployments', 'Custom domains', 'Analytics', 'Team collaboration']
    },
    {
      id: 'aws-credits',
      name: 'AWS Cloud Credits',
      category: 'Cloud Computing',
      provider: 'Amazon Web Services',
      studentPrice: '$100 credits',
      professionalPrice: '$50-500/month',
      affiliateCommission: '4-8%',
      estimatedConversions: 200,
      monthlyRevenue: 2000,
      setupComplexity: 'Medium',
      integrationStatus: 'Active',
      description: 'Cloud computing services and infrastructure',
      benefits: ['EC2 instances', 'S3 storage', 'Database services', 'Machine learning tools']
    },
    {
      id: 'jetbrains',
      name: 'JetBrains IDEs',
      category: 'Development Tools',
      provider: 'JetBrains',
      studentPrice: 'Free',
      professionalPrice: '$199/year',
      affiliateCommission: '25%',
      estimatedConversions: 150,
      monthlyRevenue: 621,
      setupComplexity: 'Easy',
      integrationStatus: 'Pending',
      description: 'Professional IDE suite for all languages',
      benefits: ['WebStorm', 'IntelliJ IDEA', 'PyCharm', 'Advanced debugging']
    },
    {
      id: 'figma-pro',
      name: 'Figma Professional',
      category: 'Design Tools',
      provider: 'Figma',
      studentPrice: 'Free',
      professionalPrice: '$12/month',
      affiliateCommission: '20%',
      estimatedConversions: 400,
      monthlyRevenue: 960,
      setupComplexity: 'Easy',
      integrationStatus: 'Pending',
      description: 'Professional design and prototyping platform',
      benefits: ['Unlimited projects', 'Version history', 'Team collaboration', 'Advanced prototyping']
    },
    {
      id: 'azure-credits',
      name: 'Microsoft Azure',
      category: 'Cloud Computing',
      provider: 'Microsoft',
      studentPrice: '$100 credits',
      professionalPrice: '$100-1000/month',
      affiliateCommission: '5-10%',
      estimatedConversions: 100,
      monthlyRevenue: 2500,
      setupComplexity: 'Hard',
      integrationStatus: 'Planned',
      description: 'Microsoft cloud computing platform',
      benefits: ['Virtual machines', 'AI services', 'Database hosting', 'DevOps tools']
    },
    {
      id: 'shopify-partners',
      name: 'Shopify Development',
      category: 'E-commerce',
      provider: 'Shopify',
      studentPrice: 'Free dev stores',
      professionalPrice: '$29-299/month',
      affiliateCommission: '20%',
      estimatedConversions: 75,
      monthlyRevenue: 1740,
      setupComplexity: 'Medium',
      integrationStatus: 'Planned',
      description: 'E-commerce platform development and hosting',
      benefits: ['Development stores', 'Theme customization', 'App development', 'Partner benefits']
    }
  ]

  const totalMonthlyRevenue = affiliateTools.reduce((sum, tool) => sum + tool.monthlyRevenue, 0)
  const totalAnnualRevenue = totalMonthlyRevenue * 12
  const projectedYear5Revenue = totalAnnualRevenue * 5 // Conservative growth estimate

  const activeTools = affiliateTools.filter(tool => tool.integrationStatus === 'Active')
  const pendingTools = affiliateTools.filter(tool => tool.integrationStatus === 'Pending')
  const plannedTools = affiliateTools.filter(tool => tool.integrationStatus === 'Planned')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'Planned': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Easy': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'Medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'Hard': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  return (
    <div className="affiliate-revenue-manager max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">💰</div>
        <h1 className="text-4xl font-bold mb-4">Affiliate Revenue System</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Sustaining 100% free education through transparent professional tool partnerships
        </p>
      </div>

      {/* Revenue Overview */}
      <div className="revenue-overview bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-center">Revenue Projections</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-green-600">${totalMonthlyRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</div>
            <div className="text-xs text-gray-500">Current trajectory</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">${totalAnnualRevenue.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Annual Revenue</div>
            <div className="text-xs text-gray-500">Year 1 projection</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">${(projectedYear5Revenue / 1000000).toFixed(1)}M+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">5-Year Projection</div>
            <div className="text-xs text-gray-500">Conservative estimate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600">{affiliateTools.length}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Partner Tools</div>
            <div className="text-xs text-gray-500">Professional ecosystem</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="tabs mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {[
            { key: 'overview', label: '📊 Overview' },
            { key: 'tools', label: '🛠️ Partner Tools' },
            { key: 'analytics', label: '📈 Analytics' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.key
                  ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="overview-content space-y-6">
          {/* Integration Status */}
          <div className="integration-status grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="status-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <span className="text-green-500">✅</span>
                <span>Active Integrations</span>
              </h3>
              <div className="text-2xl font-bold text-green-600 mb-2">{activeTools.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ${activeTools.reduce((sum, tool) => sum + tool.monthlyRevenue, 0).toLocaleString()}/month
              </div>
            </div>

            <div className="status-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <span className="text-yellow-500">⏳</span>
                <span>Pending Setup</span>
              </h3>
              <div className="text-2xl font-bold text-yellow-600 mb-2">{pendingTools.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                +${pendingTools.reduce((sum, tool) => sum + tool.monthlyRevenue, 0).toLocaleString()}/month potential
              </div>
            </div>

            <div className="status-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <span className="text-blue-500">📋</span>
                <span>Planned</span>
              </h3>
              <div className="text-2xl font-bold text-blue-600 mb-2">{plannedTools.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                +${plannedTools.reduce((sum, tool) => sum + tool.monthlyRevenue, 0).toLocaleString()}/month future
              </div>
            </div>
          </div>

          {/* Sustainability Model */}
          <div className="sustainability-model bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">🌱 Sustainability Model</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Revenue Sources:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">•</span>
                    <span>Professional tool upgrades (after graduation)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">•</span>
                    <span>Cloud services usage (AWS, Azure)</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">•</span>
                    <span>Enterprise team solutions</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-green-500">•</span>
                    <span>Professional services partnerships</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Free Forever Guarantee:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>All learning content remains free</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Student tiers of tools always free</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>No paywalls on core features</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <span className="text-blue-500">•</span>
                    <span>Transparent upgrade recommendations only</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tools' && (
        <div className="tools-content">
          <div className="tools-grid grid grid-cols-1 lg:grid-cols-2 gap-6">
            {affiliateTools.map((tool) => (
              <div key={tool.id} className="tool-card bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{tool.description}</p>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`text-xs px-2 py-1 rounded ${getStatusColor(tool.integrationStatus)}`}>
                        {tool.integrationStatus}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${getComplexityColor(tool.setupComplexity)}`}>
                        {tool.setupComplexity} Setup
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      ${tool.monthlyRevenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">monthly</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                  <div>
                    <span className="font-medium">Student:</span> {tool.studentPrice}
                  </div>
                  <div>
                    <span className="font-medium">Pro:</span> {tool.professionalPrice}
                  </div>
                  <div>
                    <span className="font-medium">Commission:</span> {tool.affiliateCommission}
                  </div>
                  <div>
                    <span className="font-medium">Conversions:</span> {tool.estimatedConversions}/month
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-sm">Key Benefits:</h4>
                  <ul className="text-xs space-y-1">
                    {tool.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <span className="text-green-500">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="analytics-content">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">📈 Revenue Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Monthly Revenue by Category:</h4>
                <div className="space-y-3">
                  {['AI Development', 'Cloud Computing', 'Hosting & Deployment', 'Development Tools', 'Design Tools', 'Version Control', 'E-commerce'].map(category => {
                    const categoryRevenue = affiliateTools
                      .filter(tool => tool.category === category)
                      .reduce((sum, tool) => sum + tool.monthlyRevenue, 0)
                    
                    if (categoryRevenue === 0) return null
                    
                    return (
                      <div key={category} className="flex justify-between items-center">
                        <span className="text-sm">{category}</span>
                        <span className="font-medium">${categoryRevenue.toLocaleString()}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Growth Projections:</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Year 1:</span>
                    <span className="font-medium">${totalAnnualRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year 2:</span>
                    <span className="font-medium">${(totalAnnualRevenue * 2.5).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year 3:</span>
                    <span className="font-medium">${(totalAnnualRevenue * 4).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Year 5:</span>
                    <span className="font-medium">${(projectedYear5Revenue / 1000000).toFixed(1)}M+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AffiliateRevenueManager
