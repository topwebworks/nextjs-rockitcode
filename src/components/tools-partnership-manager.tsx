'use client'

import { useState } from 'react'
import { useUser } from '@/contexts/UserContext'

interface Tool {
  id: string
  name: string
  description: string
  category: 'development' | 'design' | 'deployment' | 'analytics' | 'learning'
  icon: string
  features: string[]
  pricing: {
    free?: boolean
    discount?: string
    originalPrice?: string
    partnerPrice?: string
  }
  partnerStatus: 'partner' | 'affiliate' | 'recommended'
  url: string
  isPopular?: boolean
}

interface AffiliateProgram {
  id: string
  name: string
  description: string
  commission: string
  requirements: string[]
  benefits: string[]
  status: 'not-applied' | 'pending' | 'approved' | 'active'
  icon: string
}

export default function ToolsPartnershipManager() {
  const { user } = useUser()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showAffiliateForm, setShowAffiliateForm] = useState(false)
  const [selectedAffiliate, setSelectedAffiliate] = useState<string | null>(null)

  const tools: Tool[] = [
    {
      id: 'vercel',
      name: 'Vercel',
      description: 'Deploy your frontend applications with zero configuration',
      category: 'deployment',
      icon: '▲',
      features: [
        'Instant deployments',
        'Global CDN',
        'Automatic HTTPS',
        'Preview deployments',
        'Analytics dashboard'
      ],
      pricing: {
        free: true,
        discount: '50% off Pro plan',
        originalPrice: '$20/month',
        partnerPrice: '$10/month'
      },
      partnerStatus: 'partner',
      url: 'https://vercel.com',
      isPopular: true
    },
    {
      id: 'supabase',
      name: 'Supabase',
      description: 'Open source Firebase alternative with PostgreSQL',
      category: 'development',
      icon: '🚀',
      features: [
        'PostgreSQL database',
        'Real-time subscriptions',
        'Authentication',
        'Storage',
        'Edge functions'
      ],
      pricing: {
        free: true,
        discount: '3 months free',
        originalPrice: '$25/month',
        partnerPrice: 'Free for 3 months'
      },
      partnerStatus: 'partner',
      url: 'https://supabase.com',
      isPopular: true
    },
    {
      id: 'figma',
      name: 'Figma',
      description: 'Collaborative interface design tool',
      category: 'design',
      icon: '🎨',
      features: [
        'Real-time collaboration',
        'Component libraries',
        'Prototyping',
        'Developer handoff',
        'Version history'
      ],
      pricing: {
        free: true,
        discount: '20% off Professional',
        originalPrice: '$12/month',
        partnerPrice: '$9.60/month'
      },
      partnerStatus: 'affiliate',
      url: 'https://figma.com'
    },
    {
      id: 'github',
      name: 'GitHub Copilot',
      description: 'AI-powered code completion and assistance',
      category: 'development',
      icon: '🤖',
      features: [
        'Code suggestions',
        'Auto-completion',
        'Multi-language support',
        'Context awareness',
        'Learning from your code'
      ],
      pricing: {
        discount: '2 months free',
        originalPrice: '$10/month',
        partnerPrice: 'Free for 2 months'
      },
      partnerStatus: 'partner',
      url: 'https://github.com/features/copilot',
      isPopular: true
    },
    {
      id: 'railway',
      name: 'Railway',
      description: 'Deploy applications and databases with ease',
      category: 'deployment',
      icon: '🚄',
      features: [
        'One-click deployments',
        'Built-in databases',
        'Environment management',
        'Custom domains',
        'Usage-based pricing'
      ],
      pricing: {
        free: true,
        discount: '$10 credits',
        originalPrice: 'Usage-based',
        partnerPrice: '$10 free credits'
      },
      partnerStatus: 'partner',
      url: 'https://railway.app'
    },
    {
      id: 'plausible',
      name: 'Plausible Analytics',
      description: 'Privacy-friendly website analytics',
      category: 'analytics',
      icon: '📊',
      features: [
        'No cookies needed',
        'GDPR compliant',
        'Lightweight script',
        'Real-time dashboard',
        'Goal tracking'
      ],
      pricing: {
        discount: '30% off first year',
        originalPrice: '$9/month',
        partnerPrice: '$6.30/month'
      },
      partnerStatus: 'affiliate',
      url: 'https://plausible.io'
    }
  ]

  const affiliatePrograms: AffiliateProgram[] = [
    {
      id: 'vercel-affiliate',
      name: 'Vercel Partner Program',
      description: 'Earn commission promoting the leading deployment platform',
      commission: '25% recurring commission',
      requirements: [
        'Active developer or content creator',
        'Experience with Vercel platform',
        'Audience interested in web development'
      ],
      benefits: [
        'Recurring commission on referrals',
        'Early access to new features',
        'Marketing materials and support',
        'Monthly performance reports'
      ],
      status: 'approved',
      icon: '▲'
    },
    {
      id: 'supabase-affiliate',
      name: 'Supabase Partnership',
      description: 'Partner with the open source Firebase alternative',
      commission: '20% commission + bonuses',
      requirements: [
        'Technical background in backend development',
        'Experience with databases',
        'Community presence or following'
      ],
      benefits: [
        'Commission on paid plan referrals',
        'Co-marketing opportunities',
        'Technical support priority',
        'Exclusive partner events'
      ],
      status: 'active',
      icon: '🚀'
    },
    {
      id: 'github-campus',
      name: 'GitHub Campus Expert',
      description: 'Lead the developer community at your institution',
      commission: 'Swag, credits, and recognition',
      requirements: [
        'Student or recent graduate',
        'Technical leadership experience',
        'Commitment to community building'
      ],
      benefits: [
        'GitHub Pro account',
        'Exclusive swag and merchandise',
        'Direct line to GitHub team',
        'Training and resources'
      ],
      status: 'not-applied',
      icon: '🎓'
    }
  ]

  const categories = [
    { id: 'all', name: 'All Tools', icon: '🔧' },
    { id: 'development', name: 'Development', icon: '💻' },
    { id: 'design', name: 'Design', icon: '🎨' },
    { id: 'deployment', name: 'Deployment', icon: '🚀' },
    { id: 'analytics', name: 'Analytics', icon: '📊' },
    { id: 'learning', name: 'Learning', icon: '📚' }
  ]

  const filteredTools = selectedCategory === 'all' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory)

  const getPartnerStatusColor = (status: string) => {
    switch (status) {
      case 'partner': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'affiliate': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const getAffiliateStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'approved': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  const handleApplyAffiliate = (programId: string) => {
    setSelectedAffiliate(programId)
    setShowAffiliateForm(true)
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Authentication Required</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Please sign in to access tools and partnership programs.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">🔧</div>
          <h1 className="text-3xl font-bold">Tools & Partners</h1>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Access exclusive partner tools, join affiliate programs, and discover resources to accelerate your development journey.
        </p>
      </div>

      {/* Affiliate Programs Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Partnership Programs</h2>
        <div className="grid gap-6">
          {affiliatePrograms.map((program) => (
            <div key={program.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{program.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold">{program.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{program.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAffiliateStatusColor(program.status)}`}>
                    {program.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  {program.status === 'not-applied' && (
                    <button
                      onClick={() => handleApplyAffiliate(program.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Apply
                    </button>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-2 text-green-600">Commission</h4>
                  <p className="text-sm">{program.commission}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Requirements</h4>
                  <ul className="text-sm space-y-1">
                    {program.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-gray-400">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Benefits</h4>
                  <ul className="text-sm space-y-1">
                    {program.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Partner Tools</h2>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{category.icon}</span>
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid gap-6">
          {filteredTools.map((tool) => (
            <div key={tool.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{tool.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-semibold">{tool.name}</h3>
                        {tool.isPopular && (
                          <span className="text-xs bg-orange-100 text-orange-600 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">{tool.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPartnerStatusColor(tool.partnerStatus)}`}>
                      {tool.partnerStatus.charAt(0).toUpperCase() + tool.partnerStatus.slice(1)}
                    </span>
                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Access Tool
                    </a>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-2">Features</h4>
                    <div className="space-y-1">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <span className="text-green-600">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h4 className="font-semibold mb-2">Pricing</h4>
                    <div className="space-y-2 text-sm">
                      {tool.pricing.free && (
                        <div className="flex items-center gap-2">
                          <span className="text-green-600">🆓</span>
                          <span>Free tier available</span>
                        </div>
                      )}
                      {tool.pricing.discount && (
                        <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                          <div className="font-medium text-green-600">Partner Discount</div>
                          <div>{tool.pricing.discount}</div>
                          {tool.pricing.originalPrice && tool.pricing.partnerPrice && (
                            <div className="text-xs mt-1">
                              <span className="line-through text-gray-500">{tool.pricing.originalPrice}</span>
                              <span className="ml-2 font-medium">{tool.pricing.partnerPrice}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Affiliate Application Modal */}
      {showAffiliateForm && selectedAffiliate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">
              Apply for Partnership
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Your application will be submitted for review. We'll notify you of the status within 3-5 business days.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAffiliateForm(false)
                  setSelectedAffiliate(null)
                }}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAffiliateForm(false)
                  setSelectedAffiliate(null)
                  // Here you would typically submit to an API
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
