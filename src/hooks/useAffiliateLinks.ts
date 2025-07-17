import { 
  getAffiliatePartner, 
  generateAffiliateUrl, 
  getTransparencyDisclosure,
  calculateProjectedRevenue,
  AFFILIATE_PARTNERS,
  type AffiliatePartner 
} from '@/lib/affiliate-config'

/**
 * Custom hook for managing affiliate links and partner data
 * This provides a simple interface for components to access affiliate functionality
 */
export function useAffiliateLinks() {
  
  /**
   * Get a specific affiliate partner by ID
   */
  const getPartner = (id: string): AffiliatePartner | undefined => {
    return getAffiliatePartner(id)
  }

  /**
   * Generate an affiliate URL for a partner with optional additional tracking
   */
  const getAffiliateUrl = (partnerId: string, additionalParams?: Record<string, string>): string => {
    return generateAffiliateUrl(partnerId, additionalParams)
  }

  /**
   * Get partners by category
   */
  const getPartnersByCategory = (category: AffiliatePartner['category']): AffiliatePartner[] => {
    return AFFILIATE_PARTNERS.filter(partner => partner.category === category)
  }

  /**
   * Get high-priority partners for featured placement
   */
  const getHighPriorityPartners = (): AffiliatePartner[] => {
    return AFFILIATE_PARTNERS.filter(partner => partner.priority === 'high')
  }

  /**
   * Get available partners (not locked)
   */
  const getAvailablePartners = (): AffiliatePartner[] => {
    return AFFILIATE_PARTNERS.filter(partner => partner.status === 'available')
  }

  /**
   * Calculate revenue projections
   */
  const getRevenueProjections = (studentCount: number = 200) => {
    return calculateProjectedRevenue(studentCount)
  }

  /**
   * Get transparency messaging
   */
  const getTransparencyInfo = () => {
    return getTransparencyDisclosure()
  }

  /**
   * Helper function to get affiliate data for Professional Setup
   */
  const getProfessionalSetupTools = () => {
    const toolIds = [
      'github-student-pack',
      'vercel-pro', 
      'figma-professional',
      'tailwind-ui',
      'aws-professional',
      'mongodb-atlas',
      'stripe-professional',
      'shopify-partner',
      'jetbrains-professional',
      'domain-ssl'
    ]

    return toolIds.map(id => {
      const partner = getAffiliatePartner(id)
      if (!partner) return null

      // Map to Professional Setup format
      return {
        ...partner,
        status: partner.status,
        affiliateNote: partner.careerImpact,
        affiliateUrl: generateAffiliateUrl(id)
      }
    }).filter(Boolean)
  }

  /**
   * Helper function to get commission info for a tool
   */
  const getCommissionInfo = (partnerId: string) => {
    const partner = getAffiliatePartner(partnerId)
    if (!partner) return null

    return {
      rate: partner.commissionRate,
      average: partner.averageCommission,
      conversionRate: partner.conversionRate
    }
  }

  /**
   * Helper to generate revenue messages for specific tools
   */
  const getRevenueNote = (partnerId: string): string | null => {
    const partner = getAffiliatePartner(partnerId)
    if (!partner || !partner.averageCommission) return null

    switch (partnerId) {
      case 'github-student-pack':
        return 'Free for students, we earn when you upgrade professionally - the same platform we use to earn $200k+!'
      case 'vercel-pro':
        return `~${partner.averageCommission} commission when you upgrade - we use Vercel Pro to earn $150k+ from client deployments`
      case 'tailwind-ui':
        return `~${partner.averageCommission} commission - Tailwind UI helps us build faster = higher hourly rates!`
      case 'aws-professional':
        return 'Small percentage of usage for production apps - AWS powers our highest-value client projects'
      case 'shopify-partner':
        return `${partner.averageCommission} per store referral - our Shopify projects generate $100k+ annually!`
      case 'stripe-professional':
        return 'Ongoing small percentage - Stripe processes payments for all our client applications'
      default:
        return `We earn ~${partner.averageCommission} when you upgrade - the same tool we use to make money!`
    }
  }

  return {
    // Core functions
    getPartner,
    getAffiliateUrl,
    getPartnersByCategory,
    getHighPriorityPartners,
    getAvailablePartners,
    
    // Analytics
    getRevenueProjections,
    getTransparencyInfo,
    getCommissionInfo,
    
    // Helpers
    getProfessionalSetupTools,
    getRevenueNote,
    
    // Raw data access
    allPartners: AFFILIATE_PARTNERS
  }
}

// Export some commonly used categories for convenience
export const AFFILIATE_CATEGORIES = {
  FOUNDATION: 'foundation' as const,
  DEVELOPMENT: 'development' as const,
  BUSINESS: 'business' as const,
  SPECIALIZED: 'specialized' as const,
  MARKETING: 'marketing' as const
}
