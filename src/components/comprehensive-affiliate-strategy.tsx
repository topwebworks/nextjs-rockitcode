'use client'

import { useState } from 'react'
import { CheckIcon, ExternalLinkIcon, InfoIcon, TrendingUpIcon, DollarSignIcon } from 'lucide-react'

interface AffiliatePartner {
  name: string
  category: string
  description: string
  freeValue: string
  upgradeValue: string
  industryUsage: string
  commission: string
  studentBenefit: string
  missionIntegration: string
  conversionRate: number
  revenueImpact: string
}

const affiliatePartners: AffiliatePartner[] = [
  // Foundation Tier - Essential Tools
  {
    name: "GitHub",
    category: "Version Control & AI",
    description: "Industry-standard version control and AI assistance",
    freeValue: "Unlimited public repos + Copilot for students",
    upgradeValue: "Private repos, teams, and advanced Copilot features",
    industryUsage: "100% of professional developers use Git/GitHub",
    commission: "We earn a small commission on upgrades",
    studentBenefit: "Essential skill that appears in every developer job description",
    missionIntegration: "Foundation of every mission workflow and portfolio deployment",
    conversionRate: 0.85,
    revenueImpact: "High volume, foundational revenue"
  },
  {
    name: "Vercel",
    category: "Deployment & Hosting",
    description: "Modern deployment and performance optimization",
    freeValue: "Generous hobby tier for all learning projects",
    upgradeValue: "Team collaboration and commercial applications",
    industryUsage: "Industry standard for React/Next.js deployment",
    commission: "Commission on team and pro upgrades",
    studentBenefit: "Modern deployment skills essential for portfolio",
    missionIntegration: "Every frontend mission deploys to Vercel",
    conversionRate: 0.45,
    revenueImpact: "Steady recurring revenue"
  },
  {
    name: "Tailwind CSS",
    category: "Design & UI",
    description: "Modern CSS framework and component libraries",
    freeValue: "Open source framework with complete documentation",
    upgradeValue: "Tailwind UI components and advanced templates",
    industryUsage: "78% faster CSS development, industry adoption leader",
    commission: "Commission on UI component subscriptions",
    studentBenefit: "Modern CSS skills dramatically improve productivity",
    missionIntegration: "Default styling approach for all UI missions",
    conversionRate: 0.35,
    revenueImpact: "High-value design conversions"
  },
  
  // Cloud Infrastructure Tier
  {
    name: "AWS",
    category: "Cloud Infrastructure",
    description: "Enterprise cloud infrastructure and scalable deployment",
    freeValue: "Free tier covers all learning and portfolio projects",
    upgradeValue: "Production-scale infrastructure and enterprise features",
    industryUsage: "99.7% of Fortune 500 companies use AWS",
    commission: "We earn referral credits when you scale",
    studentBenefit: "Cloud skills are essential for enterprise readiness",
    missionIntegration: "Advanced missions deploy to enterprise infrastructure",
    conversionRate: 0.08,
    revenueImpact: "Low volume, high value"
  },
  {
    name: "Azure",
    category: "Cloud Infrastructure", 
    description: "Microsoft ecosystem integration and enterprise deployment",
    freeValue: "Azure for Students with $100 credit annually",
    upgradeValue: "Enterprise applications and team collaboration",
    industryUsage: "93% of Fortune 500 use Azure - corporate readiness",
    commission: "Microsoft Partner Network revenue sharing",
    studentBenefit: "Microsoft stack skills highly valued in enterprise",
    missionIntegration: "Microsoft tech stack missions and enterprise workflows",
    conversionRate: 0.06,
    revenueImpact: "Enterprise-focused revenue"
  },
  {
    name: "DigitalOcean",
    category: "Cloud Infrastructure",
    description: "Developer-friendly cloud infrastructure and deployment",
    freeValue: "$200 in credits for new users, perfect for learning",
    upgradeValue: "Production applications and scaling infrastructure",
    industryUsage: "Popular choice for startups and independent developers",
    commission: "Monthly infrastructure spending commissions",
    studentBenefit: "Simple cloud deployment essential for portfolio projects",
    missionIntegration: "Cloud deployment missions and infrastructure management",
    conversionRate: 0.25,
    revenueImpact: "Accessible cloud revenue"
  },
  
  // Business & E-commerce Tier
  {
    name: "Shopify",
    category: "E-commerce Development",
    description: "E-commerce development and business applications",
    freeValue: "Development stores unlimited for learning",
    upgradeValue: "Real store hosting and business features",
    industryUsage: "$200B+ in e-commerce powered by Shopify",
    commission: "Monthly recurring commission on active stores",
    studentBenefit: "E-commerce skills open massive market opportunities",
    missionIntegration: "E-commerce mission track with real store deployment",
    conversionRate: 0.12,
    revenueImpact: "High-value recurring revenue"
  },
  {
    name: "Stripe",
    category: "Payment Processing",
    description: "Payment processing and financial technology",
    freeValue: "Test mode unlimited for learning payment flows",
    upgradeValue: "Live payment processing for real applications",
    industryUsage: "Payment skills required for 95% of applications",
    commission: "Small percentage of payment processing fees",
    studentBenefit: "Payment integration expertise is highly valued",
    missionIntegration: "Payment missions teach real-world transaction flows",
    conversionRate: 0.18,
    revenueImpact: "Transaction-based revenue"
  },
  {
    name: "FreshBooks",
    category: "Business Management",
    description: "Freelance business management and client invoicing",
    freeValue: "30-day free trial with full feature access",
    upgradeValue: "Ongoing freelance business and client management",
    industryUsage: "Essential for freelance developers and consultants",
    commission: "Monthly subscription commissions",
    studentBenefit: "Business skills essential for freelancing and consulting",
    missionIntegration: "Freelance business missions and client management workflows",
    conversionRate: 0.15,
    revenueImpact: "Freelancer-focused revenue"
  },
  
  // Specialized Tools Tier
  {
    name: "MongoDB",
    category: "Database Services",
    description: "NoSQL database development and cloud database services",
    freeValue: "MongoDB Atlas free tier for learning and small projects",
    upgradeValue: "Production databases and advanced features",
    industryUsage: "Leading NoSQL database for modern applications",
    commission: "Atlas subscription and enterprise license commissions",
    studentBenefit: "NoSQL skills essential for modern application development",
    missionIntegration: "Database missions and full-stack application development",
    conversionRate: 0.22,
    revenueImpact: "Database-as-a-service revenue"
  },
  {
    name: "Postman",
    category: "API Development",
    description: "API development, testing, and documentation",
    freeValue: "Postman free tier covers learning and personal projects",
    upgradeValue: "Team collaboration and advanced API management",
    industryUsage: "API skills essential for 90% of modern development roles",
    commission: "Team subscription and professional plan commissions",
    studentBenefit: "API development skills highly sought after",
    missionIntegration: "API development missions and testing workflows",
    conversionRate: 0.28,
    revenueImpact: "API-focused team revenue"
  },
  {
    name: "JetBrains",
    category: "Development Environment",
    description: "Professional IDE experience and advanced debugging",
    freeValue: "All IDEs free for students with GitHub Student Pack",
    upgradeValue: "Professional licenses after graduation or employment",
    industryUsage: "Industry-standard IDEs used by 83% of professional teams",
    commission: "Individual and team license commissions",
    studentBenefit: "Professional development environment experience",
    missionIntegration: "Advanced debugging missions and professional workflows",
    conversionRate: 0.32,
    revenueImpact: "Post-graduation conversion revenue"
  }
]

const categoryColors: Record<string, string> = {
  "Version Control & AI": "bg-blue-50 border-blue-200 text-blue-900",
  "Deployment & Hosting": "bg-green-50 border-green-200 text-green-900", 
  "Design & UI": "bg-purple-50 border-purple-200 text-purple-900",
  "Cloud Infrastructure": "bg-orange-50 border-orange-200 text-orange-900",
  "E-commerce Development": "bg-pink-50 border-pink-200 text-pink-900",
  "Payment Processing": "bg-yellow-50 border-yellow-200 text-yellow-900",
  "Business Management": "bg-indigo-50 border-indigo-200 text-indigo-900",
  "Database Services": "bg-teal-50 border-teal-200 text-teal-900",
  "API Development": "bg-cyan-50 border-cyan-200 text-cyan-900",
  "Development Environment": "bg-slate-50 border-slate-200 text-slate-900"
}

export default function ComprehensiveAffiliateStrategy() {
  const [selectedPartner, setSelectedPartner] = useState<AffiliatePartner | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", ...Array.from(new Set(affiliatePartners.map(p => p.category)))]
  const filteredPartners = selectedCategory === "all" 
    ? affiliatePartners 
    : affiliatePartners.filter(p => p.category === selectedCategory)

  // Calculate revenue projections
  const totalMonthlyRevenue = affiliatePartners.reduce((total, partner) => {
    return total + (partner.conversionRate * 200 * 25) // 200 students, ~$25 avg commission
  }, 0)

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Strategy Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-8 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <TrendingUpIcon className="h-8 w-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              🚀 RockitCode Mission Equipment: Comprehensive Affiliate Strategy
            </h1>
            <p className="text-gray-700 mb-4">
              Our affiliate strategy aligns student success with platform sustainability. Every tool we recommend 
              is industry-standard, essential for professional development, and provides genuine career value. 
              We earn commissions when students upgrade, which keeps our platform free forever.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span>Tools selected for career impact, not commission rates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span>Free tiers cover all learning missions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span>Upgrades only when projects scale to production</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="text-2xl font-bold text-green-600">${(totalMonthlyRevenue/1000).toFixed(1)}k</div>
              <div className="text-sm text-gray-600">Projected Monthly Revenue</div>
              <div className="text-xs text-gray-500">@ 200 monthly completions</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
              selectedCategory === category 
                ? 'bg-blue-600 text-white' 
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {category === "all" ? "All Equipment" : category}
          </button>
        ))}
      </div>

      {/* Partner Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredPartners.map((partner) => (
          <div 
            key={partner.name}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer"
            onClick={() => setSelectedPartner(partner)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-semibold">{partner.name[0]}</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{partner.name}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${categoryColors[partner.category] || 'bg-gray-50 border-gray-200 text-gray-900'}`}>
                    {partner.category}
                  </span>
                </div>
              </div>
              <div className="text-right text-xs">
                <div className="font-semibold text-blue-600">{(partner.conversionRate * 100).toFixed(0)}%</div>
                <div className="text-gray-500">conversion</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{partner.description}</p>
            
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Industry Usage:</span>
                <span className="font-medium text-green-600">Essential</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Learning Access:</span>
                <span className="font-medium text-blue-600">Free</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue Impact:</span>
                <span className="font-medium text-purple-600">{partner.revenueImpact.split(',')[0]}</span>
              </div>
            </div>
            
            <button 
              className="w-full mt-4 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
              View Equipment Details
              <ExternalLinkIcon className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Revenue Projections */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <DollarSignIcon className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-900">Sustainable Revenue Model</h2>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-blue-600">200</div>
            <div className="text-sm text-gray-600">Monthly Completions</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-green-600">${(totalMonthlyRevenue/1000).toFixed(1)}k</div>
            <div className="text-sm text-gray-600">Monthly Revenue</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-purple-600">${((totalMonthlyRevenue * 12)/1000).toFixed(0)}k</div>
            <div className="text-sm text-gray-600">Annual Revenue</div>
          </div>
          <div className="bg-white p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-orange-600">100%</div>
            <div className="text-sm text-gray-600">Platform Remains Free</div>
          </div>
        </div>

        <p className="text-sm text-gray-700 text-center">
          Revenue scales with student success. At 1000 monthly completions, we project $400k+ annually 
          while maintaining 100% free access to all learning content.
        </p>
      </div>

      {/* Mission Integration Examples */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">🎯 Mission-Integrated Learning</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Natural Integration Points</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span>Tool setup during mission prerequisites</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span>Professional workflows within mission execution</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span>Portfolio deployment using affiliate platforms</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckIcon className="h-4 w-4 text-green-600" />
                <span>Career preparation with industry-standard tools</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Conversion Optimization</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4 text-blue-600" />
                <span>Value-first messaging: career benefits before features</span>
              </li>
              <li className="flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4 text-blue-600" />
                <span>Contextual introductions during relevant missions</span>
              </li>
              <li className="flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4 text-blue-600" />
                <span>Progressive disclosure: advanced features as projects scale</span>
              </li>
              <li className="flex items-center gap-2">
                <TrendingUpIcon className="h-4 w-4 text-blue-600" />
                <span>Success-driven upgrades: tools needed for real applications</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Detailed Partner Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-lg font-bold">{selectedPartner.name[0]}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedPartner.name}</h2>
                    <span className={`text-sm px-2 py-1 rounded-full ${categoryColors[selectedPartner.category]}`}>
                      {selectedPartner.category}
                    </span>
                  </div>
                </div>
                <button 
                  className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                  onClick={() => setSelectedPartner(null)}
                >
                  Close
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  {/* Industry Relevance */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-2">🏭 Industry Relevance</h3>
                    <p className="text-green-800 text-sm mb-2">{selectedPartner.industryUsage}</p>
                    <p className="text-green-700 text-sm">{selectedPartner.studentBenefit}</p>
                  </div>

                  {/* Mission Integration */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 mb-2">🚀 Mission Integration</h3>
                    <p className="text-blue-800 text-sm">{selectedPartner.missionIntegration}</p>
                  </div>

                  {/* Revenue Impact */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-semibold text-purple-900 mb-2">📊 Revenue Impact</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-purple-700">Conversion Rate:</span>
                        <span className="font-medium">{(selectedPartner.conversionRate * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-purple-700">Revenue Type:</span>
                        <span className="font-medium">{selectedPartner.revenueImpact}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  {/* Learning Access */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">🎓 Learning Access (Free)</h3>
                    <p className="text-gray-700 text-sm">{selectedPartner.freeValue}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-green-600">
                      <CheckIcon className="h-3 w-3" />
                      <span>Covers all mission requirements</span>
                    </div>
                  </div>
                  
                  {/* Professional Upgrade */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">💼 Professional Upgrade</h3>
                    <p className="text-gray-700 text-sm">{selectedPartner.upgradeValue}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs text-blue-600">
                      <InfoIcon className="h-3 w-3" />
                      <span>Needed when scaling to production</span>
                    </div>
                  </div>

                  {/* Transparency */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h3 className="font-semibold text-yellow-900 mb-2">💰 Affiliate Transparency</h3>
                    <p className="text-yellow-800 text-sm mb-2">{selectedPartner.commission}</p>
                    <p className="text-yellow-700 text-xs">
                      This partnership helps keep RockitCode free while ensuring you learn with 
                      professional tools that advance your career.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-6">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  Start Mission with {selectedPartner.name}
                  <ExternalLinkIcon className="h-4 w-4" />
                </button>
                <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  Learn More About {selectedPartner.category}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
