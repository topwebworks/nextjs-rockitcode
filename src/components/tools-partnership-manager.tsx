'use client'

import { useState, useEffect } from 'react'
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
      case 'partner': return 'text-blue-400 bg-blue-400/10 border border-blue-400/20'
      case 'affiliate': return 'text-green-400 bg-green-400/10 border border-green-400/20'
      default: return 'text-slate-400 bg-slate-400/10 border border-slate-400/20'
    }
  }

  const getAffiliateStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10 border border-green-400/20'
      case 'approved': return 'text-blue-400 bg-blue-400/10 border border-blue-400/20'
      case 'pending': return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
      default: return 'text-slate-400 bg-slate-400/10 border border-slate-400/20'
    }
  }

  const handleApplyAffiliate = (programId: string) => {
    setSelectedAffiliate(programId)
    setShowAffiliateForm(true)
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
          
          <div className="absolute inset-0">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400/20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative z-10 max-w-4xl p-6 mx-auto">
          <div className="py-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-6 border rounded-full bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
                <svg className="w-12 h-12 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
            <h1 className="mb-4 text-4xl font-light tracking-wide text-white">Authentication Required</h1>
            <p className="text-xl font-light text-slate-300">
              Please sign in to access tools and partnership programs.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 p-6 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-center mb-8">
            <div className="relative">
              <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
            </div>
          </div>
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-light tracking-wide text-white">
              Pro Tools & Partners
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl font-light leading-relaxed text-slate-300">
              Access exclusive partner tools, join affiliate programs, and discover resources to accelerate your development journey.
            </p>
            <div className="flex justify-center">
              <div className="px-6 py-3 border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700/50">
                <span className="font-medium text-slate-300">Professional Development Partnerships</span>
              </div>
            </div>
          </div>
        </div>        {/* Affiliate Programs Section */}
        <div className="mb-12">
          <h2 className="mb-8 text-3xl font-light tracking-wide text-center text-white">Partnership Programs</h2>
          <div className="grid gap-6">
            {affiliatePrograms.map((program) => (
              <div key={program.id} className="p-6 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-purple-400/30">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 border rounded-full bg-slate-700/50 border-slate-600/50">
                      <span className="text-xl">{program.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-medium text-white">{program.name}</h3>
                      <p className="text-slate-300">{program.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAffiliateStatusColor(program.status)}`}>
                      {program.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    {program.status === 'not-applied' && (
                      <button
                        onClick={() => handleApplyAffiliate(program.id)}
                        className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 border rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50 hover:border-blue-400/30"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <h4 className="mb-3 font-medium text-green-400">Commission</h4>
                    <p className="text-sm text-slate-300">{program.commission}</p>
                  </div>
                  
                  <div>
                    <h4 className="mb-3 font-medium text-blue-400">Requirements</h4>
                    <ul className="space-y-2 text-sm">
                      {program.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-slate-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                          </svg>
                          <span className="text-slate-300">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="mb-3 font-medium text-purple-400">Benefits</h4>
                    <ul className="space-y-2 text-sm">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>        {/* Tools Section */}
        <div>
          <h2 className="mb-8 text-3xl font-light tracking-wide text-center text-white">Partner Tools</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-blue-500/20 text-blue-400 border-blue-400/30'
                    : 'bg-slate-800/30 text-slate-300 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-700/30'
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
              <div key={tool.id} className="p-6 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-blue-400/30">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 border rounded-full bg-slate-700/50 border-slate-600/50">
                      <span className="text-xl">{tool.icon}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-xl font-medium text-white">{tool.name}</h3>
                        {tool.isPopular && (
                          <span className="px-2 py-1 text-xs text-orange-400 border rounded-full bg-orange-500/20 border-orange-400/30">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="text-slate-300">{tool.description}</p>
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
                      className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 border rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50 hover:border-blue-400/30"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Access Tool
                    </a>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Features */}
                  <div>
                    <h4 className="mb-3 font-medium text-blue-400">Features</h4>
                    <div className="space-y-2">
                      {tool.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <svg className="flex-shrink-0 w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing */}
                  <div>
                    <h4 className="mb-3 font-medium text-purple-400">Pricing</h4>
                    <div className="space-y-3 text-sm">
                      {tool.pricing.free && (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center justify-center w-6 h-6 border rounded-full bg-green-500/20 border-green-400/30">
                            <svg className="w-3 h-3 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="text-slate-300">Free tier available</span>
                        </div>
                      )}
                      {tool.pricing.discount && (
                        <div className="p-3 border rounded-lg bg-green-500/10 border-green-400/20">
                          <div className="mb-1 font-medium text-green-400">Partner Discount</div>
                          <div className="mb-2 text-slate-300">{tool.pricing.discount}</div>
                          {tool.pricing.originalPrice && tool.pricing.partnerPrice && (
                            <div className="text-xs">
                              <span className="line-through text-slate-500">{tool.pricing.originalPrice}</span>
                              <span className="ml-2 font-medium text-green-400">{tool.pricing.partnerPrice}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>        {/* Affiliate Application Modal */}
        {showAffiliateForm && selectedAffiliate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-md p-6 mx-4 border bg-slate-800/90 backdrop-blur-md rounded-xl border-slate-700/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-700/50 border-slate-600/50">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-white">
                  Apply for Partnership
                </h3>
              </div>
              <p className="mb-6 text-slate-300">
                Your application will be submitted for review. We'll notify you of the status within 3-5 business days.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAffiliateForm(false)
                    setSelectedAffiliate(null)
                  }}
                  className="px-4 py-2 transition-colors text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowAffiliateForm(false)
                    setSelectedAffiliate(null)
                    // Here you would typically submit to an API
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-300 border rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50 hover:border-blue-400/30"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
