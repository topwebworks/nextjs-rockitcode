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
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>`,
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
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 22.525H0l12-21.05 12 21.05z"/>
    </svg>`,
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
  },
  {
    id: 'github-student-pack',
    name: 'GitHub Student Pack',
    category: 'foundation',
    baseUrl: 'https://education.github.com/pack',
    affiliateId: AFFILIATE_CONFIG.ids.github,
    affiliateUrl: `https://education.github.com/pack?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: 'FREE ($200k+ value)',
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>`,
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
    id: 'vercel-pro',
    name: 'Vercel Pro Hosting',
    category: 'foundation',
    baseUrl: 'https://vercel.com/pro',
    affiliateId: AFFILIATE_CONFIG.ids.vercel,
    affiliateUrl: `https://vercel.com/pro?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: '$20/month',
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M9 11l3 3 8-8-1.5-1.5L12 11l-1.5-1.5L9 11z"/>
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11l2 2v7z"/>
    </svg>`,
    description: 'Professional hosting with team collaboration and advanced features',
    setupTime: '5 min',
    commissionRate: '15%',
    conversionRate: 40,
    freeValue: 'Free tier perfect for learning projects',
    upgradeReason: 'Professional features for client work and teams',
    careerImpact: 'Industry-standard deployment platform',
    industryUsage: 'Used by leading tech companies worldwide',
    isStudentFree: true,
    priority: 'high',
    status: 'available'
  },
  {
    id: 'figma-professional',
    name: 'Figma Professional',
    category: 'development',
    baseUrl: 'https://figma.com',
    affiliateId: AFFILIATE_CONFIG.ids.figma,
    affiliateUrl: `https://figma.com?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: '$12/month',
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 8h8v8H8z"/>
      <circle cx="12" cy="4" r="4"/>
      <circle cx="4" cy="12" r="4"/>
      <circle cx="20" cy="12" r="4"/>
      <circle cx="12" cy="20" r="4"/>
    </svg>`,
    description: 'Industry-standard design tool used by 85% of design teams',
    setupTime: '10 min',
    commissionRate: '20%',
    conversionRate: 60,
    freeValue: 'Free plan with core design features',
    upgradeReason: 'Team collaboration and advanced design features',
    careerImpact: 'Essential for UI/UX design work',
    industryUsage: 'Standard tool across the design industry',
    isStudentFree: true,
    priority: 'high',
    status: 'available'
  },
  {
    id: 'tailwind-ui',
    name: 'Tailwind UI Components',
    category: 'development',
    baseUrl: 'https://tailwindui.com',
    affiliateId: AFFILIATE_CONFIG.ids.tailwind,
    affiliateUrl: `https://tailwindui.com?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: '$149 one-time',
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
    </svg>`,
    description: 'Professional component library that speeds development 5x',
    setupTime: '2 min',
    commissionRate: '25%',
    conversionRate: 25,
    freeValue: 'Free Tailwind CSS framework',
    upgradeReason: 'Ready-made professional components',
    careerImpact: 'Dramatically speeds up development time',
    industryUsage: 'Used by thousands of professional developers',
    isStudentFree: false,
    priority: 'medium',
    status: 'locked'
  },
  {
    id: 'aws-professional',
    name: 'AWS Professional Setup',
    category: 'development',
    baseUrl: 'https://aws.amazon.com',
    affiliateId: AFFILIATE_CONFIG.ids.aws,
    affiliateUrl: `https://aws.amazon.com?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: 'Pay-as-you-go',
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M7.5 7.5L12 3l4.5 4.5M12 3v18M3 12l4.5-4.5M21 12l-4.5-4.5"/>
      <path d="M3 19.5h18"/>
    </svg>`,
    description: 'Cloud infrastructure platform powering the modern web',
    setupTime: '15 min',
    commissionRate: '10%',
    conversionRate: 30,
    freeValue: 'Free tier covers learning and small projects',
    upgradeReason: 'Enterprise applications and scaling',
    careerImpact: 'Essential for enterprise career readiness',
    industryUsage: 'Powers 70% of the internet',
    isStudentFree: true,
    priority: 'medium',
    status: 'locked'
  },
  {
    id: 'mongodb-atlas',
    name: 'MongoDB Atlas Pro',
    category: 'development',
    baseUrl: 'https://mongodb.com/atlas',
    affiliateId: AFFILIATE_CONFIG.ids.mongodb,
    affiliateUrl: `https://mongodb.com/atlas?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: '$9+/month',
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296 5.352-3.823 5.352-9.595-.274-1.72-.476-1.78-.06-1.78z"/>
    </svg>`,
    description: 'Modern database platform for web applications',
    setupTime: '10 min',
    commissionRate: '15%',
    conversionRate: 35,
    freeValue: 'Free tier available for learning',
    upgradeReason: 'Production applications and teams',
    careerImpact: 'Industry-standard database solution',
    industryUsage: 'Used by millions of applications',
    isStudentFree: true,
    priority: 'medium',
    status: 'locked'
  },
  {
    id: 'stripe-professional',
    name: 'Stripe Professional',
    category: 'business',
    baseUrl: 'https://stripe.com',
    affiliateId: AFFILIATE_CONFIG.ids.stripe,
    affiliateUrl: `https://stripe.com?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: '2.9% + 30¢',
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.489-4.536 1.401-1.155.912-1.736 2.132-1.736 3.688 0 2.21 1.245 3.606 3.729 4.467 1.403.622 2.118 1.111 2.118 1.803 0 .711-.666 1.067-1.67 1.067-2.006 0-4.047-.933-5.204-1.803l-.778 4.135c1.245.756 3.63 1.489 6.204 1.489 1.911 0 3.516-.445 4.715-1.445 1.245-.977 1.889-2.156 1.889-3.622.022-2.177-1.245-3.667-3.606-4.356z"/>
    </svg>`,
    description: 'Payment processing platform for online businesses',
    setupTime: '20 min',
    commissionRate: '0%',
    conversionRate: 50,
    freeValue: 'Free to set up, pay only when you earn',
    upgradeReason: 'Essential for any e-commerce or SaaS project',
    careerImpact: 'Enables monetization of projects',
    industryUsage: 'Industry leader in online payments',
    isStudentFree: true,
    priority: 'high',
    status: 'locked'
  },
  {
    id: 'shopify-partner',
    name: 'Shopify Partner',
    category: 'business',
    baseUrl: 'https://partners.shopify.com',
    affiliateId: AFFILIATE_CONFIG.ids.shopify,
    affiliateUrl: `https://partners.shopify.com?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: 'FREE + Revenue Share',
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15.337 2.137c-.398-.398-1.016-.437-1.434-.079l-.456.39c-.438-.278-1.036-.397-1.713-.397-2.17 0-4.226 1.754-5.282 4.67-.398-.119-.835-.199-1.273-.199-1.434 0-2.768.875-3.485 2.29-.398.797-.517 1.554-.398 2.29l1.354 7.14c.119.557.557.956 1.115.956h11.146c.597 0 1.075-.478 1.075-1.075V8.867c1.314-.558 2.449-1.554 3.246-2.848.398-.797.517-1.554.398-2.29l-.199-1.036c-.119-.557-.557-.955-1.115-.955h-1.075l-.358-1.116c-.199-.637-.796-1.076-1.474-1.076h-1.115l.239.597z"/>
    </svg>`,
    description: 'E-commerce platform with massive freelance opportunities',
    setupTime: '15 min',
    commissionRate: '10-20%',
    conversionRate: 40,
    freeValue: 'Free development stores and partner benefits',
    upgradeReason: 'Build and sell custom e-commerce solutions',
    careerImpact: 'Access to lucrative e-commerce market',
    industryUsage: 'Powers over 1 million businesses',
    isStudentFree: true,
    priority: 'medium',
    status: 'locked'
  },
  {
    id: 'jetbrains-professional',
    name: 'JetBrains Professional',
    category: 'specialized',
    baseUrl: 'https://jetbrains.com',
    affiliateId: AFFILIATE_CONFIG.ids.jetbrains,
    affiliateUrl: `https://jetbrains.com?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: '$149/year',
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M0 0v24h24V0H0zm3.723 3.111h5v1.834h-1.39v6.277h1.39v1.834h-5v-1.834h1.444V4.945H3.723V3.111zm11.055 0h4.167v1.834h-2.824v1.39h2.824v1.834h-2.824v1.389h2.824v1.834h-4.167V3.111zm-7.778 9.166h2.5v1.389h-2.5v-1.389z"/>
    </svg>`,
    description: 'Professional IDE suite used by enterprise development teams',
    setupTime: '10 min',
    commissionRate: '15%',
    conversionRate: 20,
    freeValue: 'Free for students with .edu email',
    upgradeReason: 'Professional development workflow',
    careerImpact: 'Standard in enterprise environments',
    industryUsage: 'Used by most enterprise development teams',
    isStudentFree: true,
    priority: 'low',
    status: 'locked'
  },
  {
    id: 'domain-ssl',
    name: 'Domain & SSL Setup',
    category: 'foundation',
    baseUrl: 'https://namecheap.com',
    affiliateId: AFFILIATE_CONFIG.ids.namecheap,
    affiliateUrl: `https://namecheap.com?utm_source=${AFFILIATE_CONFIG.utm.source}&utm_medium=${AFFILIATE_CONFIG.utm.medium}&utm_campaign=${AFFILIATE_CONFIG.utm.campaign}`,
    trackingParams: AFFILIATE_CONFIG.utm,
    value: '$10-15/year',
    icon: `<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
      <path d="M9 12l2 2 4-4"/>
    </svg>`,
    description: 'Professional domain name and SSL certificate',
    setupTime: '10 min',
    commissionRate: '25%',
    conversionRate: 70,
    freeValue: 'Free subdomain available for learning',
    upgradeReason: 'Professional presence and credibility',
    careerImpact: 'Essential for professional portfolio',
    industryUsage: 'Standard for all professional websites',
    isStudentFree: false,
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
      "Earn with the same tools we use to make $200k+/year",
      "All learning content works with free tiers first", 
      "Upgrade only when you start earning money professionally",
      "Transparent affiliate partnerships fund free education",
      "Student success directly drives our platform success"
    ]
  }
}
