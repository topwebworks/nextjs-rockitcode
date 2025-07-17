// Centralized Affiliate Configuration System
// This is the single source of truth for all affiliate partnerships

export interface AffiliatePartner {
  id: string
  name: string
  category: 'foundation' | 'development' | 'business' | 'specialized' | 'ai-assistant'
  
  // Affiliate Configuration
  baseUrl: string
  affiliateId: string
  affiliateUrl: string
  trackingParams: Record<string, string>
  
  // Tool Information
  value: string
  icon: string
  description: string
  setupTime: string
  
  // Revenue Information
  commissionRate?: string
  averageCommission?: string
  conversionRate: number // percentage expected to upgrade
  
  // Student Information
  freeValue: string
  upgradeReason: string
  careerImpact: string
  industryUsage: string
  isStudentFree: boolean
  
  // Priority & Status
  priority: 'high' | 'medium' | 'low'
  status: 'available' | 'locked' | 'coming-soon'
  unlockConditions?: string[]
}

// MASTER AFFILIATE CONFIGURATION
export const AFFILIATE_CONFIG = {
  ids: {
    github: 'rockitcode',
    vercel: 'rockitcode',
    figma: 'rockitcode-affiliate',
    tailwind: 'rockitcode',
    aws: 'rockitcode-20',
    mongodb: 'rockitcode',
    postman: 'rockitcode',
    shopify: 'rockitcode',
    stripe: 'rockitcode',
    jetbrains: 'rockitcode',
    namecheap: 'rockitcode',
    redis: 'rockitcode',
    convertkit: 'rockitcode',
    freshbooks: 'rockitcode',
    square: 'rockitcode',
    digitalocean: 'rockitcode',
    // AI Tools
    openai: 'rockitcode',
    anthropic: 'rockitcode', 
    cursor: 'rockitcode',
    replit: 'rockitcode',
    codeium: 'rockitcode'
  },
  
  utm: {
    source: 'rockitcode',
    medium: 'affiliate',
    campaign: 'pro-tools'
  }
} as const

// Calculate projected revenue for analytics
export function calculateProjectedRevenue(studentCount: number = 200): {
  foundation: number
  development: number
  business: number
  specialized: number
  aiAssistant: number
  total: number
} {
  // This calculates YOUR affiliate commission earnings, not student earnings
  const foundation = 500 // Example: GitHub Pro upgrades, Vercel Pro, etc.
  const development = 300 // Example: AWS, MongoDB, etc.
  const business = 400 // Example: Shopify, Stripe commissions
  const specialized = 250 // Example: JetBrains, ConvertKit
  const aiAssistant = 350 // Example: ChatGPT Plus, Cursor, Claude Pro

  return {
    foundation,
    development,
    business,
    specialized,
    aiAssistant,
    total: foundation + development + business + specialized + aiAssistant
  }
}

// MASTER AFFILIATE PARTNERS DATA
export const AFFILIATE_PARTNERS: AffiliatePartner[] = [
  // Foundation Tier (85% adoption)
  {
    id: 'github',
    name: 'GitHub Student Pack',
    category: 'foundation',
    baseUrl: 'https://education.github.com/pack',
    affiliateId: AFFILIATE_CONFIG.ids.github,
    affiliateUrl: `https://education.github.com/pack?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: 'FREE ($200k+ value)',
    icon: '🐙',
    description: 'Complete developer toolkit with free access to premium tools',
    setupTime: '10 min',
    commissionRate: '0%',
    conversionRate: 85,
    freeValue: '$200k+ in premium developer tools absolutely free for students',
    upgradeReason: 'Graduate to paid plans when earning professional income',
    careerImpact: 'Foundation of every successful developer career',
    industryUsage: '90% of tech companies use GitHub for version control',
    isStudentFree: true,
    priority: 'high',
    status: 'available'
  },
  {
    id: 'vercel',
    name: 'Vercel Professional',
    category: 'foundation', 
    baseUrl: 'https://vercel.com',
    affiliateId: AFFILIATE_CONFIG.ids.vercel,
    affiliateUrl: `https://vercel.com?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: '$20/month',
    icon: '⚡',
    description: 'Lightning-fast deployment platform for modern websites',
    setupTime: '5 min',
    commissionRate: '15%',
    conversionRate: 40,
    freeValue: 'Free hobby plan with unlimited personal projects',
    upgradeReason: 'Pro features for client work and team collaboration',
    careerImpact: 'Enables professional client deployments worth $50k+/year',
    industryUsage: 'Used by Netflix, Hulu, and thousands of agencies',
    isStudentFree: true,
    priority: 'high',
    status: 'available'
  }
]

// Helper Functions
export function getPartnersByCategory(category: string): AffiliatePartner[] {
  return AFFILIATE_PARTNERS.filter(partner => partner.category === category)
}

export function getAffiliatePartner(id: string): AffiliatePartner | undefined {
  return AFFILIATE_PARTNERS.find(partner => partner.id === id)
}

export function generateAffiliateUrl(partnerId: string, additionalParams?: Record<string, string>): string {
  const partner = getAffiliatePartner(partnerId)
  if (!partner?.affiliateUrl) return '#'
  
  let url = partner.affiliateUrl
  
  // Add additional parameters if provided
  if (additionalParams && Object.keys(additionalParams).length > 0) {
    const urlObj = new URL(url)
    Object.entries(additionalParams).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value)
    })
    url = urlObj.toString()
  }
  
  return url
}

export function getTransparencyDisclosure() {
  return {
    message: "We partner with professional tools that helped us build our $200k+/year business. When you naturally progress to professional work, we earn small commissions that keep our education free forever.",
    emphasis: "Every tool recommendation comes from real experience - we use these exact tools daily to generate income.",
    values: [
      "🎯 Earn with the same tools we use to make $200k+/year",
      "📚 All learning content works with free tiers first", 
      "💰 Upgrade only when you start earning money professionally",
      "🤝 Transparent affiliate partnerships fund free education",
      "✅ Student success directly drives our platform success"
    ]
  }
}
