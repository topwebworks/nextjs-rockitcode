'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  AFFILIATE_PARTNERS, 
  getAffiliatePartner, 
  generateAffiliateUrl, 
  getTransparencyDisclosure,
  calculateProjectedRevenue 
} from '@/lib/affiliate-config'

interface CareerPath {
  id: string
  title: string
  description: string
  icon: string
  projects: string[]
  averageTime: string
  skillsGained: string[]
  difficulty: 'Beginner Friendly' | 'Some Experience' | 'Advanced'
  salaryRange: string
  jobGrowth: string
}

interface Project {
  id: string
  title: string
  description: string
  levels: {
    beginner: { title: string; tech: string[]; time: string; githubRepo: string }
    intermediate: { title: string; tech: string[]; time: string; githubRepo: string }
    advanced: { title: string; tech: string[]; time: string; githubRepo: string }
  }
  careerPaths: string[]
  realWorldUse: string
}

interface MissionPhase {
  id: string
  title: string
  description: string
  icon: string
  status: 'locked' | 'available' | 'in-progress' | 'completed'
  estimatedTime: string
  reward: string
}

export function CareerLaunchPad() {
  const [selectedCareer, setSelectedCareer] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'mission-control' | 'career-paths' | 'professional-setup'>('mission-control')
  const [missionProgress] = useState({
    totalMissions: 12,
    completedMissions: 0,
    currentLevel: 'Mission Specialist',
    careerReadiness: 15,
    portfolioStrength: 8,
    professionalTools: 5
  })

  const missionPhases: MissionPhase[] = [
    {
      id: 'pre-flight',
      title: 'Pre-Flight Check',
      description: 'Professional developer environment setup',
      icon: '🚀',
      status: 'available',
      estimatedTime: '15 minutes',
      reward: '$200k+ in free professional tools unlocked'
    },
    {
      id: 'foundation-launch',
      title: 'Foundation Launch',
      description: 'HTML, CSS, JavaScript mastery with live portfolio',
      icon: '🏗️',
      status: 'locked',
      estimatedTime: '4-6 weeks',
      reward: '3-5 deployed portfolio projects'
    },
    {
      id: 'orbital-mechanics',
      title: 'Orbital Mechanics',
      description: 'Advanced development & deployment mastery',
      icon: '⚡',
      status: 'locked',
      estimatedTime: '6-8 weeks',
      reward: 'Full-stack applications with CI/CD'
    },
    {
      id: 'deep-space',
      title: 'Deep Space Mission',
      description: 'Specialization & career launch preparation',
      icon: '🌟',
      status: 'locked',
      estimatedTime: '8-12 weeks',
      reward: 'Professional developer ready for hiring'
    }
  ]

  // Professional Tools using centralized affiliate configuration
  const professionalTools = [
    // Foundation Tier - Essential Professional Setup
    {
      ...(getAffiliatePartner('github-student-pack') || {}),
      name: 'GitHub Student Pack',
      status: 'available' as const,
      affiliateNote: 'Free for students, supports RockitCode when you upgrade professionally'
    },
    {
      ...(getAffiliatePartner('vercel-pro') || {}),
      name: 'Vercel Pro Hosting',
      status: 'available' as const,
      affiliateNote: 'Free tier perfect for learning, upgrade when building client projects'
    },
    {
      ...(getAffiliatePartner('figma-professional') || {}),
      name: 'Figma Professional',
      status: 'available' as const,
      affiliateNote: 'Used by 85% of design teams worldwide for professional projects'
    },
    {
      ...(getAffiliatePartner('tailwind-ui') || {}),
      name: 'Tailwind UI Components',
      status: 'locked' as const,
      affiliateNote: 'Speeds up development by 5x - professional design patterns included'
    },
    {
      ...(getAffiliatePartner('aws-professional') || {}),
      name: 'AWS Professional Setup',
      status: 'locked' as const,
      affiliateNote: 'Free tier covers learning, essential for enterprise career readiness'
    },
    {
      ...(getAffiliatePartner('mongodb-atlas') || {}),
      name: 'MongoDB Atlas Pro',
      status: 'locked' as const,
      affiliateNote: 'Free tier available, upgrade for production applications and teams'
    },
    {
      ...(getAffiliatePartner('stripe-professional') || {}),
      name: 'Stripe Professional',
      status: 'locked' as const,
      affiliateNote: 'Essential for any e-commerce or SaaS project - industry leader'
    },
    {
      ...(getAffiliatePartner('shopify-partner') || {}),
      name: 'Shopify Partner',
      status: 'locked' as const,
      affiliateNote: 'Free development stores, massive freelance and business opportunities'
    },
    {
      ...(getAffiliatePartner('jetbrains-professional') || {}),
      name: 'JetBrains Professional',
      status: 'locked' as const,
      affiliateNote: 'Free for students, standard for enterprise development teams'
    },
    {
      ...(getAffiliatePartner('domain-ssl') || {}),
      name: 'Domain & SSL Setup',
      status: 'available' as const,
      affiliateNote: 'Essential for professional presence - supports platform when you purchase'
    }
  ]

  const careerPaths: CareerPath[] = [
    {
      id: 'frontend',
      title: 'Frontend Developer',
      description: 'Build beautiful, interactive user interfaces and experiences',
      icon: '🎨',
      projects: ['Portfolio Site', 'E-commerce Store', 'Dashboard App', 'Landing Pages'],
      averageTime: '3-6 months',
      skillsGained: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX Design'],
      difficulty: 'Beginner Friendly',
      salaryRange: '$55k - $85k',
      jobGrowth: '+8% annually'
    },
    {
      id: 'fullstack',
      title: 'Full-Stack Developer',
      description: 'Master both frontend and backend to build complete applications',
      icon: '⚡',
      projects: ['Social Platform', 'SaaS Application', 'E-commerce Platform', 'API Services'],
      averageTime: '6-12 months',
      skillsGained: ['React/Next.js', 'Node.js', 'Databases', 'APIs', 'Deployment'],
      difficulty: 'Some Experience',
      salaryRange: '$65k - $120k',
      jobGrowth: '+13% annually'
    },
    {
      id: 'mobile',
      title: 'Mobile Developer',
      description: 'Create mobile apps for iOS and Android platforms',
      icon: '📱',
      projects: ['Weather App', 'Social Media App', 'E-commerce App', 'Productivity Tools'],
      averageTime: '4-8 months',
      skillsGained: ['React Native', 'Mobile UI', 'App Store Deployment', 'Push Notifications'],
      difficulty: 'Some Experience',
      salaryRange: '$60k - $110k',
      jobGrowth: '+11% annually'
    },
    {
      id: 'devops',
      title: 'DevOps Engineer',
      description: 'Automate deployment and manage cloud infrastructure',
      icon: '☁️',
      projects: ['CI/CD Pipeline', 'Cloud Infrastructure', 'Monitoring Dashboard', 'Auto-Scaling'],
      averageTime: '6-10 months',
      skillsGained: ['Docker', 'AWS/Azure', 'CI/CD', 'Monitoring', 'Infrastructure as Code'],
      difficulty: 'Advanced',
      salaryRange: '$70k - $140k',
      jobGrowth: '+19% annually'
    }
  ]

  const projects: Project[] = [
    {
      id: 'portfolio',
      title: 'Professional Portfolio',
      description: 'Your personal showcase site that evolves with your skills',
      realWorldUse: 'Every developer needs a professional online presence',
      levels: {
        beginner: {
          title: 'Static Portfolio',
          tech: ['HTML', 'CSS', 'GitHub Pages'],
          time: '1-2 weeks',
          githubRepo: 'rockitcode-portfolio-beginner'
        },
        intermediate: {
          title: 'Interactive Portfolio',
          tech: ['JavaScript', 'Animations', 'Contact Forms'],
          time: '2-3 weeks',
          githubRepo: 'rockitcode-portfolio-intermediate'
        },
        advanced: {
          title: 'Dynamic Portfolio',
          tech: ['React/Next.js', 'CMS', 'Analytics'],
          time: '3-4 weeks',
          githubRepo: 'rockitcode-portfolio-advanced'
        }
      },
      careerPaths: ['frontend', 'fullstack', 'mobile', 'devops']
    },
    {
      id: 'ecommerce',
      title: 'E-commerce Platform',
      description: 'Build online stores from simple landing pages to full marketplaces',
      realWorldUse: 'E-commerce powers $4.9 trillion in global sales',
      levels: {
        beginner: {
          title: 'Product Landing Page',
          tech: ['HTML', 'CSS', 'Basic JavaScript'],
          time: '1-2 weeks',
          githubRepo: 'rockitcode-ecommerce-beginner'
        },
        intermediate: {
          title: 'Shopping Cart',
          tech: ['JavaScript', 'Local Storage', 'Forms'],
          time: '3-4 weeks',
          githubRepo: 'rockitcode-ecommerce-intermediate'
        },
        advanced: {
          title: 'Full Marketplace',
          tech: ['React', 'Payment API', 'Database'],
          time: '6-8 weeks',
          githubRepo: 'rockitcode-ecommerce-advanced'
        }
      },
      careerPaths: ['frontend', 'fullstack']
    },
    {
      id: 'dashboard',
      title: 'Analytics Dashboard',
      description: 'Create data visualization and admin interfaces',
      realWorldUse: 'Every business needs data insights and admin tools',
      levels: {
        beginner: {
          title: 'Static Charts',
          tech: ['HTML', 'CSS', 'Chart.js'],
          time: '2-3 weeks',
          githubRepo: 'rockitcode-dashboard-beginner'
        },
        intermediate: {
          title: 'Interactive Dashboard',
          tech: ['JavaScript', 'APIs', 'Real-time Updates'],
          time: '4-5 weeks',
          githubRepo: 'rockitcode-dashboard-intermediate'
        },
        advanced: {
          title: 'Enterprise Dashboard',
          tech: ['React', 'Backend APIs', 'Authentication'],
          time: '6-8 weeks',
          githubRepo: 'rockitcode-dashboard-advanced'
        }
      },
      careerPaths: ['frontend', 'fullstack', 'devops']
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner Friendly': return 'text-green-400 bg-green-500/20 border-green-500/50'
      case 'Some Experience': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/50'
      case 'Advanced': return 'text-red-400 bg-red-500/20 border-red-500/50'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-500/20 border-green-500/50'
      case 'in-progress': return 'text-blue-400 bg-blue-500/20 border-blue-500/50'
      case 'completed': return 'text-purple-400 bg-purple-500/20 border-purple-500/50'
      case 'locked': return 'text-gray-400 bg-gray-500/20 border-gray-500/50'
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/50'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="text-7xl animate-pulse">🚀</div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Mission Control
            </h1>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-8">
              Your command center for launching a successful developer career. Professional setup, skill progression, and career tracking all in one place.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-blue-300">{missionProgress.careerReadiness}%</div>
                <div className="text-blue-200 text-sm">Career Ready</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-purple-300">{missionProgress.completedMissions}/{missionProgress.totalMissions}</div>
                <div className="text-blue-200 text-sm">Missions</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-green-300">{missionProgress.portfolioStrength}/10</div>
                <div className="text-blue-200 text-sm">Portfolio</div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <div className="text-2xl font-bold text-yellow-300">{missionProgress.professionalTools}/13</div>
                <div className="text-blue-200 text-sm">Pro Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveTab('mission-control')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === 'mission-control'
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span className="text-xl">🎮</span>
              <span className="font-medium">Mission Control</span>
            </button>
            <button
              onClick={() => setActiveTab('professional-setup')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === 'professional-setup'
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span className="text-xl">🛠️</span>
              <span className="font-medium">Professional Setup</span>
            </button>
            <button
              onClick={() => setActiveTab('career-paths')}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === 'career-paths'
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                  : 'bg-white/10 text-blue-200 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span className="text-xl">🎯</span>
              <span className="font-medium">Career Paths</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        
        {/* Mission Control Dashboard */}
        {activeTab === 'mission-control' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">🎮 Mission Control Dashboard</h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Track your progress through the developer career launch sequence
              </p>
            </div>

            {/* Mission Progress */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">🚀 Mission Progress</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {missionPhases.map((phase) => (
                  <div
                    key={phase.id}
                    className={`bg-white/5 backdrop-blur-md rounded-xl p-6 border transition-all duration-300 hover:scale-105 ${getStatusColor(phase.status)}`}
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-3">{phase.icon}</div>
                      <h4 className="text-lg font-bold text-white">{phase.title}</h4>
                      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(phase.status)}`}>
                        {phase.status.replace('-', ' ').toUpperCase()}
                      </div>
                    </div>
                    <p className="text-blue-100 text-sm mb-4">{phase.description}</p>
                    <div className="space-y-2 text-xs text-blue-200">
                      <div>⏱️ {phase.estimatedTime}</div>
                      <div>🎁 {phase.reward}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Career Readiness Meter */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">📊 Career Launch Readiness</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-600"/>
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="40" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - missionProgress.careerReadiness / 100)}`}
                        className="text-blue-400 transition-all duration-700"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{missionProgress.careerReadiness}%</span>
                    </div>
                  </div>
                  <div className="text-white font-medium">Career Readiness</div>
                  <div className="text-blue-200 text-sm">Professional skills & portfolio</div>
                </div>

                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-600"/>
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="40" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - missionProgress.portfolioStrength / 10)}`}
                        className="text-purple-400 transition-all duration-700"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{missionProgress.portfolioStrength}/10</span>
                    </div>
                  </div>
                  <div className="text-white font-medium">Portfolio Strength</div>
                  <div className="text-blue-200 text-sm">Live projects & quality</div>
                </div>

                <div className="text-center">
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <svg className="w-24 h-24 transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-600"/>
                      <circle 
                        cx="48" 
                        cy="48" 
                        r="40" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        fill="transparent" 
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (1 - missionProgress.professionalTools / 12)}`}
                        className="text-green-400 transition-all duration-700"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{missionProgress.professionalTools}/12</span>
                    </div>
                  </div>
                  <div className="text-white font-medium">Professional Tools</div>
                  <div className="text-blue-200 text-sm">Industry-standard setup</div>
                </div>
              </div>
            </div>

            {/* Next Mission CTA */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-green-600/30 to-blue-600/30 backdrop-blur-md rounded-2xl p-8 border border-green-400/50">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-2xl font-bold text-white mb-4">Ready for Your First Mission?</h3>
                <p className="text-green-200 mb-6 max-w-2xl mx-auto">
                  Complete your Pre-Flight Check to unlock $200k+ in professional tools and begin your journey to becoming a developer.
                </p>
                <button
                  onClick={() => setActiveTab('professional-setup')}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🚀 Begin Pre-Flight Check
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Professional Setup */}
        {activeTab === 'professional-setup' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">🛠️ Professional Developer Setup</h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto mb-6">
                Configure your professional development environment with industry-standard tools
              </p>
              {/* Enhanced Transparency Notice */}
              <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-lg p-4 max-w-2xl mx-auto">
                <p className="text-blue-200 text-sm">
                  💜 We partner with these professional tools to keep RockitCode free forever. 
                  Every tool is selected for genuine career value, not commission rates.
                </p>
              </div>
            </div>

            {/* Professional Tools Grid with Enhanced Affiliate Integration */}
            <div className="grid md:grid-cols-2 gap-8">
              {professionalTools.map((tool) => (
                <div
                  key={tool.name}
                  className={`bg-white/5 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 ${getStatusColor(tool.status)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{tool.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{tool.name}</h3>
                        <div className="text-green-400 font-bold">{tool.value} value</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(tool.status)}`}>
                      {tool.status.toUpperCase()}
                    </div>
                  </div>
                  <p className="text-blue-100 mb-4">{tool.description}</p>
                  
                  {/* Enhanced Affiliate Note with Career Impact */}
                  {tool.affiliateNote && (
                    <div className="bg-blue-600/20 border border-blue-400/50 rounded-lg p-3 mb-4">
                      <div className="text-blue-300 text-sm">
                        <span className="font-medium">🎯 Career Impact:</span> {tool.affiliateNote}
                      </div>
                      {/* Revenue Transparency by Tool */}
                      {tool.name === 'GitHub Student Pack' && (
                        <div className="text-green-300 text-xs mt-2">
                          � <strong>Revenue Model:</strong> Free for students, we earn when you upgrade professionally (keeps RockitCode free!)
                        </div>
                      )}
                      {tool.name === 'Vercel Pro Hosting' && (
                        <div className="text-green-300 text-xs mt-2">
                          💰 <strong>Revenue Model:</strong> ~$36/year commission when you upgrade for team/commercial projects
                        </div>
                      )}
                      {tool.name === 'Tailwind UI Components' && (
                        <div className="text-green-300 text-xs mt-2">
                          💰 <strong>Revenue Model:</strong> ~$75/year commission - helps fund free Tailwind CSS education
                        </div>
                      )}
                      {tool.name === 'AWS Professional Setup' && (
                        <div className="text-green-300 text-xs mt-2">
                          💰 <strong>Revenue Model:</strong> Small percentage of usage for production apps (free tier covers learning)
                        </div>
                      )}
                      {tool.name === 'Shopify Partner' && (
                        <div className="text-green-300 text-xs mt-2">
                          💰 <strong>Revenue Model:</strong> $58-200 per store referral (massive e-commerce opportunity for you!)
                        </div>
                      )}
                      {tool.name === 'Stripe Professional' && (
                        <div className="text-green-300 text-xs mt-2">
                          💰 <strong>Revenue Model:</strong> Ongoing small percentage of payment processing (industry standard)
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <span className="text-blue-200 text-sm">⏱️ {tool.setupTime} setup</span>
                    {/* Enhanced Setup Button with Centralized Affiliate Links */}
                    <a
                      href={
                        tool.name === 'GitHub Student Pack' ? generateAffiliateUrl('github-student-pack') :
                        tool.name === 'Vercel Pro Hosting' ? generateAffiliateUrl('vercel-pro') :
                        tool.name === 'Figma Professional' ? generateAffiliateUrl('figma-professional') :
                        tool.name === 'Tailwind UI Components' ? generateAffiliateUrl('tailwind-ui') :
                        tool.name === 'AWS Professional Setup' ? generateAffiliateUrl('aws-professional') :
                        tool.name === 'MongoDB Atlas Pro' ? generateAffiliateUrl('mongodb-atlas') :
                        tool.name === 'Stripe Professional' ? generateAffiliateUrl('stripe-professional') :
                        tool.name === 'Shopify Partner' ? generateAffiliateUrl('shopify-partner') :
                        tool.name === 'JetBrains Professional' ? generateAffiliateUrl('jetbrains-professional') :
                        tool.name === 'Domain & SSL Setup' ? generateAffiliateUrl('domain-ssl') :
                        '#'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                        tool.status === 'available' 
                          ? 'bg-green-600 hover:bg-green-700 text-white' 
                          : 'bg-gray-600 text-gray-400 cursor-not-allowed pointer-events-none'
                      }`}
                    >
                      {tool.status === 'available' ? '🚀 Setup Now' : '🔒 Locked'}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Enhanced Setup Progress with Revenue Transparency */}
            <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">🎯 Setup Progress</h3>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">5/12</div>
                  <div className="text-blue-100">Tools Configured</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">42%</div>
                  <div className="text-blue-100">Setup Complete</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">$200k+</div>
                  <div className="text-blue-100">Tools Unlocked</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">35min</div>
                  <div className="text-blue-100">Est. Remaining</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              {/* Comprehensive Affiliate Revenue Transparency */}
              <div className="mt-8 space-y-6">
                <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                  <div className="text-center">
                    <div className="text-yellow-400 font-semibold text-xl mb-4">💰 How We Keep RockitCode Free Forever</div>
                    <p className="text-blue-200 text-lg leading-relaxed mb-6">
                      We partner with the exact same professional tools you'll use in your career. When you naturally progress 
                      from learning to professional work, small commissions fund our free education platform.
                    </p>
                    
                    {/* Revenue Model Breakdown */}
                    <div className="grid md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                        <h4 className="text-green-400 font-semibold mb-2">🎯 Career-First Selection</h4>
                        <p className="text-gray-200 text-sm">Every tool is used by 85%+ of professional developers and appears in job descriptions</p>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                        <h4 className="text-blue-400 font-semibold mb-2">🆓 Free Learning Forever</h4>
                        <p className="text-gray-200 text-sm">All 200+ lessons work with free tiers. Upgrades only benefit professional projects</p>
                      </div>
                      <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                        <h4 className="text-purple-400 font-semibold mb-2">🚀 Success Alignment</h4>
                        <p className="text-gray-200 text-sm">We only succeed when you get hired. 74% job placement rate proves our commitment</p>
                      </div>
                    </div>

                    {/* Projected Revenue Impact using Centralized Calculations */}
                    <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-4">
                      <h4 className="text-lg font-semibold text-white mb-3">📊 Projected Monthly Revenue (200 active students)</h4>
                      {(() => {
                        const revenue = calculateProjectedRevenue(200)
                        return (
                          <>
                            <div className="grid md:grid-cols-4 gap-3 text-sm">
                              <div>
                                <p className="text-gray-200"><strong className="text-green-400">Foundation:</strong> ${revenue.foundation.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs">GitHub, Vercel, Figma</p>
                              </div>
                              <div>
                                <p className="text-gray-200"><strong className="text-blue-400">Development:</strong> ${revenue.development.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs">AWS, MongoDB, APIs</p>
                              </div>
                              <div>
                                <p className="text-gray-200"><strong className="text-purple-400">Business:</strong> ${revenue.business.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs">Shopify, Stripe, domains</p>
                              </div>
                              <div>
                                <p className="text-gray-200"><strong className="text-orange-400">Specialized:</strong> ${revenue.specialized.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs">JetBrains, Redis, marketing</p>
                              </div>
                            </div>
                            <p className="text-green-400 font-semibold mt-3">
                              Total: ${revenue.total.toLocaleString()}/month → Scales to ${(revenue.total * 12).toLocaleString()} annually at 1,000 students
                            </p>
                          </>
                        )
                      })()}
                    </div>

                    <div className="bg-green-600/20 border border-green-400/50 rounded-lg p-4 mt-4">
                      <div className="text-green-300 text-sm">
                        <span className="font-medium">🤖 AI Strategy:</span> GitHub Copilot (included in Student Pack) provides all the AI assistance you need. 
                        No additional AI subscriptions required on our platform - keeping costs low and learning focused!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Setup Benefits */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">✨ Why Professional Setup Matters</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-4">💼</div>
                  <h4 className="text-lg font-bold text-white mb-2">Industry Standard</h4>
                  <p className="text-blue-200 text-sm">Use the exact tools professional developers use every day</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">🚀</div>
                  <h4 className="text-lg font-bold text-white mb-2">Career Ready</h4>
                  <p className="text-blue-200 text-sm">Graduate with professional workflow experience</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-4">💰</div>
                  <h4 className="text-lg font-bold text-white mb-2">Higher Salary</h4>
                  <p className="text-blue-200 text-sm">Developers skilled in these tools earn 25-40% more</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Career Paths */}
        {activeTab === 'career-paths' && (
          <div>
            {!selectedCareer ? (
              /* Career Path Selection */
              <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-white mb-4">🎯 Choose Your Career Path</h2>
                  <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                    Select the developer career that aligns with your interests and goals
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {careerPaths.map((career) => (
                    <div
                      key={career.id}
                      onClick={() => setSelectedCareer(career.id)}
                      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 cursor-pointer hover:bg-white/10 transition-all duration-300 hover:scale-105 group"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="text-5xl group-hover:animate-bounce">{career.icon}</div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{career.title}</h3>
                          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border mt-2 ${getDifficultyColor(career.difficulty)}`}>
                            {career.difficulty}
                          </div>
                        </div>
                      </div>
                      <p className="text-blue-200 mb-6 leading-relaxed">{career.description}</p>
                      
                      {/* Salary & Growth */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-white/10 rounded-lg p-4 text-center">
                          <div className="text-green-400 font-bold">{career.salaryRange}</div>
                          <div className="text-blue-200 text-sm">Salary Range</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4 text-center">
                          <div className="text-blue-400 font-bold">{career.jobGrowth}</div>
                          <div className="text-blue-200 text-sm">Job Growth</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-3">You'll Build:</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.projects.map((project) => (
                            <span key={project} className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-full text-sm">
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-blue-200">
                        <span>⏱️ {career.averageTime}</span>
                        <span>🎯 {career.skillsGained.length} core skills</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : !selectedProject ? (
              /* Project Selection */
              <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => setSelectedCareer(null)}
                    className="text-blue-200 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                  >
                    ← Back to Career Paths
                  </button>
                  <h2 className="text-4xl font-bold text-white">
                    Choose Your First Project
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {projects
                    .filter(project => project.careerPaths.includes(selectedCareer))
                    .map((project) => (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProject(project.id)}
                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 cursor-pointer hover:bg-white/10 transition-all duration-300 hover:scale-105"
                      >
                        <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                        <p className="text-blue-200 mb-4">{project.description}</p>
                        
                        {/* Real World Use */}
                        <div className="bg-green-500/20 border border-green-400/50 rounded-lg p-3 mb-4">
                          <div className="text-green-400 font-medium text-sm">💡 Real-World Impact</div>
                          <div className="text-green-200 text-sm">{project.realWorldUse}</div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="border-l-4 border-green-500 pl-3">
                            <div className="text-green-400 font-semibold">Beginner</div>
                            <div className="text-sm text-blue-200">{project.levels.beginner.title}</div>
                            <div className="text-xs text-blue-300">{project.levels.beginner.time}</div>
                          </div>
                          <div className="border-l-4 border-yellow-500 pl-3">
                            <div className="text-yellow-400 font-semibold">Intermediate</div>
                            <div className="text-sm text-blue-200">{project.levels.intermediate.title}</div>
                            <div className="text-xs text-blue-300">{project.levels.intermediate.time}</div>
                          </div>
                          <div className="border-l-4 border-red-500 pl-3">
                            <div className="text-red-400 font-semibold">Advanced</div>
                            <div className="text-sm text-blue-200">{project.levels.advanced.title}</div>
                            <div className="text-xs text-blue-300">{project.levels.advanced.time}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              /* Level Selection */
              <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-blue-200 hover:text-white flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                  >
                    ← Back to Projects
                  </button>
                  <h2 className="text-4xl font-bold text-white">
                    Choose Your Skill Level
                  </h2>
                </div>
                
                {(() => {
                  const project = projects.find(p => p.id === selectedProject)!
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Beginner Level */}
                      <div className="bg-white/5 backdrop-blur-md border border-green-500/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
                            1
                          </div>
                          <h3 className="text-2xl font-bold text-white">Beginner</h3>
                          <p className="text-green-400">{project.levels.beginner.title}</p>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                          <div>
                            <h4 className="text-white font-semibold mb-2">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.levels.beginner.tech.map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-green-600/50 text-green-100 rounded text-sm">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-blue-200">
                            <span className="font-semibold">Time:</span> {project.levels.beginner.time}
                          </div>
                          <div className="text-blue-200">
                            <span className="font-semibold">GitHub:</span> {project.levels.beginner.githubRepo}
                          </div>
                        </div>
                        
                        <a
                          href={`https://github.com/rockitcodeHQ/${project.levels.beginner.githubRepo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-semibold text-center block transition-colors mb-3"
                        >
                          📁 Clone Repository
                        </a>
                        <Link
                          href={`/foundation/chapter-1-vscode`}
                          className="w-full bg-green-600/20 border border-green-500 hover:bg-green-600/30 text-green-400 py-3 px-4 rounded-lg font-semibold text-center block transition-colors"
                        >
                          📖 Start Foundation Course
                        </Link>
                      </div>

                      {/* Intermediate Level */}
                      <div className="bg-white/5 backdrop-blur-md border border-yellow-500/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
                            2
                          </div>
                          <h3 className="text-2xl font-bold text-white">Intermediate</h3>
                          <p className="text-yellow-400">{project.levels.intermediate.title}</p>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                          <div>
                            <h4 className="text-white font-semibold mb-2">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.levels.intermediate.tech.map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-yellow-600/50 text-yellow-100 rounded text-sm">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-blue-200">
                            <span className="font-semibold">Time:</span> {project.levels.intermediate.time}
                          </div>
                          <div className="text-blue-200">
                            <span className="font-semibold">GitHub:</span> {project.levels.intermediate.githubRepo}
                          </div>
                        </div>
                        
                        <a
                          href={`https://github.com/rockitcodeHQ/${project.levels.intermediate.githubRepo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-lg font-semibold text-center block transition-colors mb-3"
                        >
                          📁 Clone Repository
                        </a>
                        <button className="w-full bg-yellow-600/20 border border-yellow-500 text-yellow-400 py-3 px-4 rounded-lg font-semibold cursor-not-allowed">
                          🔒 Complete Foundation First
                        </button>
                      </div>

                      {/* Advanced Level */}
                      <div className="bg-white/5 backdrop-blur-md border border-red-500/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className="text-center mb-6">
                          <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-3">
                            3
                          </div>
                          <h3 className="text-2xl font-bold text-white">Advanced</h3>
                          <p className="text-red-400">{project.levels.advanced.title}</p>
                        </div>
                        
                        <div className="space-y-4 mb-6">
                          <div>
                            <h4 className="text-white font-semibold mb-2">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.levels.advanced.tech.map((tech) => (
                                <span key={tech} className="px-2 py-1 bg-red-600/50 text-red-100 rounded text-sm">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="text-blue-200">
                            <span className="font-semibold">Time:</span> {project.levels.advanced.time}
                          </div>
                          <div className="text-blue-200">
                            <span className="font-semibold">GitHub:</span> {project.levels.advanced.githubRepo}
                          </div>
                        </div>
                        
                        <a
                          href={`https://github.com/rockitcodeHQ/${project.levels.advanced.githubRepo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold text-center block transition-colors mb-3"
                        >
                          📁 Clone Repository
                        </a>
                        <button className="w-full bg-red-600/20 border border-red-500 text-red-400 py-3 px-4 rounded-lg font-semibold cursor-not-allowed">
                          🔒 Complete Intermediate First
                        </button>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
