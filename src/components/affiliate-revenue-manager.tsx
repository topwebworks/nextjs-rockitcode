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
      case 'Active': return 'text-green-400 bg-green-400/10 border border-green-400/20'
      case 'Pending': return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
      case 'Planned': return 'text-blue-400 bg-blue-400/10 border border-blue-400/20'
      default: return 'text-slate-400 bg-slate-400/10 border border-slate-400/20'
    }
  }

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Easy': return 'text-green-400 bg-green-400/10 border border-green-400/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
      case 'Hard': return 'text-red-400 bg-red-400/10 border border-red-400/20'
      default: return 'text-slate-400 bg-slate-400/10 border border-slate-400/20'
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Revenue Overview */}
      <div className="p-6 mb-8 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50">
        <h2 className="mb-6 text-2xl font-medium text-center text-white">Revenue Projections</h2>
        <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-4">
          <div className="p-4 border rounded-lg bg-slate-700/30 border-slate-600/50">
            <div className="mb-2 text-3xl font-light text-green-400">${totalMonthlyRevenue.toLocaleString()}</div>
            <div className="text-sm text-slate-300">Monthly Revenue</div>
            <div className="text-xs text-slate-400">Current trajectory</div>
          </div>
          <div className="p-4 border rounded-lg bg-slate-700/30 border-slate-600/50">
            <div className="mb-2 text-3xl font-light text-blue-400">${totalAnnualRevenue.toLocaleString()}</div>
            <div className="text-sm text-slate-300">Annual Revenue</div>
            <div className="text-xs text-slate-400">Year 1 projection</div>
          </div>
          <div className="p-4 border rounded-lg bg-slate-700/30 border-slate-600/50">
            <div className="mb-2 text-3xl font-light text-purple-400">${(projectedYear5Revenue / 1000000).toFixed(1)}M+</div>
            <div className="text-sm text-slate-300">5-Year Projection</div>
            <div className="text-xs text-slate-400">Conservative estimate</div>
          </div>
          <div className="p-4 border rounded-lg bg-slate-700/30 border-slate-600/50">
            <div className="mb-2 text-3xl font-light text-orange-400">{affiliateTools.length}</div>
            <div className="text-sm text-slate-300">Partner Tools</div>
            <div className="text-xs text-slate-400">Professional ecosystem</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-6">
        <div className="flex gap-1 p-1 border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700/50">
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'tools', label: 'Partner Tools', icon: '🛠️' },
            { key: 'analytics', label: 'Analytics', icon: '📈' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.key
                  ? 'bg-slate-700/50 text-blue-400 border border-blue-400/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Integration Status */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="p-6 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50">
              <h3 className="flex items-center gap-3 mb-4 font-medium text-white">
                <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-green-500/20 border-green-400/30">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                Active Integrations
              </h3>
              <div className="mb-2 text-2xl font-light text-green-400">{activeTools.length}</div>
              <div className="text-sm text-slate-300">
                ${activeTools.reduce((sum, tool) => sum + tool.monthlyRevenue, 0).toLocaleString()}/month
              </div>
            </div>

            <div className="p-6 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50">
              <h3 className="flex items-center gap-3 mb-4 font-medium text-white">
                <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-yellow-500/20 border-yellow-400/30">
                  <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                Pending Setup
              </h3>
              <div className="mb-2 text-2xl font-light text-yellow-400">{pendingTools.length}</div>
              <div className="text-sm text-slate-300">
                +${pendingTools.reduce((sum, tool) => sum + tool.monthlyRevenue, 0).toLocaleString()}/month potential
              </div>
            </div>

            <div className="p-6 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50">
              <h3 className="flex items-center gap-3 mb-4 font-medium text-white">
                <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-blue-500/20 border-blue-400/30">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                Planned
              </h3>
              <div className="mb-2 text-2xl font-light text-blue-400">{plannedTools.length}</div>
              <div className="text-sm text-slate-300">
                +${plannedTools.reduce((sum, tool) => sum + tool.monthlyRevenue, 0).toLocaleString()}/month future
              </div>
            </div>
          </div>

          {/* Sustainability Model */}
          <div className="p-6 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50">
            <h3 className="flex items-center gap-3 mb-6 text-xl font-medium text-white">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Sustainability Model
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 font-medium text-blue-400">Revenue Sources:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <svg className="flex-shrink-0 w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">Professional tool upgrades (after graduation)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="flex-shrink-0 w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">Cloud services usage (AWS, Azure)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="flex-shrink-0 w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">Enterprise team solutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="flex-shrink-0 w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-300">Professional services partnerships</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="mb-3 font-medium text-purple-400">Free Forever Guarantee:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <svg className="flex-shrink-0 w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-slate-300">All learning content remains free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="flex-shrink-0 w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-slate-300">Student tiers of tools always free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="flex-shrink-0 w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-slate-300">No paywalls on core features</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="flex-shrink-0 w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <span className="text-slate-300">Transparent upgrade recommendations only</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tools' && (
        <div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {affiliateTools.map((tool) => (
              <div key={tool.id} className="p-6 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-blue-400/30">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-medium text-white">{tool.name}</h3>
                    <p className="mb-3 text-sm text-slate-300">{tool.description}</p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusColor(tool.integrationStatus)}`}>
                        {tool.integrationStatus}
                      </span>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getComplexityColor(tool.setupComplexity)}`}>
                        {tool.setupComplexity} Setup
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-slate-700/50 text-slate-300 border border-slate-600/50">
                        {tool.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <div className="text-lg font-medium text-green-400">
                      ${tool.monthlyRevenue.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-400">monthly</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="font-medium text-blue-400">Student:</span> <span className="text-slate-300">{tool.studentPrice}</span>
                  </div>
                  <div>
                    <span className="font-medium text-purple-400">Pro:</span> <span className="text-slate-300">{tool.professionalPrice}</span>
                  </div>
                  <div>
                    <span className="font-medium text-green-400">Commission:</span> <span className="text-slate-300">{tool.affiliateCommission}</span>
                  </div>
                  <div>
                    <span className="font-medium text-orange-400">Conversions:</span> <span className="text-slate-300">{tool.estimatedConversions}/month</span>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium text-yellow-400">Key Benefits:</h4>
                  <ul className="space-y-1 text-xs">
                    {tool.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <svg className="flex-shrink-0 w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-slate-300">{benefit}</span>
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
        <div>
          <div className="p-6 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50">
            <h3 className="flex items-center gap-3 mb-6 text-xl font-medium text-white">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Revenue Analytics
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-4 font-medium text-green-400">Monthly Revenue by Category:</h4>
                <div className="space-y-3">
                  {['AI Development', 'Cloud Computing', 'Hosting & Deployment', 'Development Tools', 'Design Tools', 'Version Control', 'E-commerce'].map(category => {
                    const categoryRevenue = affiliateTools
                      .filter(tool => tool.category === category)
                      .reduce((sum, tool) => sum + tool.monthlyRevenue, 0)
                    
                    if (categoryRevenue === 0) return null
                    
                    return (
                      <div key={category} className="flex items-center justify-between p-3 border rounded-lg bg-slate-700/30 border-slate-600/50">
                        <span className="text-sm text-slate-300">{category}</span>
                        <span className="font-medium text-green-400">${categoryRevenue.toLocaleString()}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
              
              <div>
                <h4 className="mb-4 font-medium text-purple-400">Growth Projections:</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-700/30 border-slate-600/50">
                    <span className="text-sm text-slate-300">Year 1:</span>
                    <span className="font-medium text-blue-400">${totalAnnualRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-700/30 border-slate-600/50">
                    <span className="text-sm text-slate-300">Year 2:</span>
                    <span className="font-medium text-purple-400">${(totalAnnualRevenue * 2.5).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-700/30 border-slate-600/50">
                    <span className="text-sm text-slate-300">Year 3:</span>
                    <span className="font-medium text-orange-400">${(totalAnnualRevenue * 4).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg bg-slate-700/30 border-slate-600/50">
                    <span className="text-sm text-slate-300">Year 5:</span>
                    <span className="font-medium text-green-400">${(projectedYear5Revenue / 1000000).toFixed(1)}M+</span>
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
