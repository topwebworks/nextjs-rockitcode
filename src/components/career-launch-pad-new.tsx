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
      id: 'environment-setup',
      title: 'Environment Configuration',
      description: 'Professional development environment and toolchain setup',
      icon: '⚙️',
      status: 'available',
      estimatedTime: '15 minutes',
      reward: '$200k+ in professional tools access'
    },
    {
      id: 'foundation-track',
      title: 'Foundation Development',
      description: 'Core web technologies mastery with portfolio deployment',
      icon: '🏗️',
      status: 'locked',
      estimatedTime: '4-6 weeks',
      reward: '3-5 production-ready projects'
    },
    {
      id: 'advanced-systems',
      title: 'Advanced Systems',
      description: 'Full-stack development and deployment automation',
      icon: '⚡',
      status: 'locked',
      estimatedTime: '6-8 weeks',
      reward: 'Enterprise-grade applications with CI/CD'
    },
    {
      id: 'specialization',
      title: 'Career Specialization',
      description: 'Advanced specialization and professional readiness',
      icon: '�',
      status: 'locked',
      estimatedTime: '8-12 weeks',
      reward: 'Industry-ready professional developer'
    }
  ]

  // Helper function to render professional tool icons
  const renderToolIcon = (toolName: string) => {
    const iconClass = "w-6 h-6 text-slate-300"
    
    switch (toolName) {
      case 'GitHub Student Pack':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        )
      case 'Vercel Pro Hosting':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 22.525H0l12-21.05 12 21.05z"/>
          </svg>
        )
      case 'Figma Professional':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"/>
            <path d="M8.5 8.5a3.5 3.5 0 003.5-3.5V1.5a3.5 3.5 0 10-3.5 3.5v3.5z"/>
            <path d="M8.5 15.5a3.5 3.5 0 003.5 3.5v3.5a3.5 3.5 0 10-3.5-3.5v-3.5z"/>
            <path d="M15.5 8.5a3.5 3.5 0 003.5-3.5V1.5a3.5 3.5 0 10-3.5 3.5v3.5z"/>
            <path d="M19 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"/>
          </svg>
        )
      case 'Tailwind UI Components':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zM6.001 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
          </svg>
        )
      case 'AWS Professional Setup':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.763 10.036c.096.073.175.154.237.242.073.1.11.207.11.323v.242c0 .1-.037.19-.11.27-.062.08-.14.15-.237.193l-1.434.84c-.096.073-.2.11-.323.11-.11 0-.207-.037-.29-.11l-1.45-.84c-.096-.043-.174-.113-.237-.193-.073-.08-.11-.17-.11-.27v-.242c0-.116.037-.223.11-.323.063-.088.14-.17.237-.242l1.45-.84c.083-.073.18-.11.29-.11.123 0 .227.037.323.11l1.434.84zm8.474 0c.096.073.175.154.237.242.073.1.11.207.11.323v.242c0 .1-.037.19-.11.27-.062.08-.14.15-.237.193l-1.434.84c-.096.073-.2.11-.323.11-.11 0-.207-.037-.29-.11l-1.45-.84c-.096-.043-.174-.113-.237-.193-.073-.08-.11-.17-.11-.27v-.242c0-.116.037-.223.11-.323.063-.088.14-.17.237-.242l1.45-.84c.083-.073.18-.11.29-.11.123 0 .227.037.323.11l1.434.84zm0 6.474c.096.073.175.154.237.242.073.1.11.207.11.323v.242c0 .1-.037.19-.11.27-.062.08-.14.15-.237.193l-1.434.84c-.096.073-.2.11-.323.11-.11 0-.207-.037-.29-.11l-1.45-.84c-.096-.043-.174-.113-.237-.193-.073-.08-.11-.17-.11-.27v-.242c0-.116.037-.223.11-.323.063-.088.14-.17.237-.242l1.45-.84c.083-.073.18-.11.29-.11.123 0 .227.037.323.11l1.434.84z"/>
          </svg>
        )
      case 'MongoDB Atlas Pro':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296 5.352-3.823 5.352-9.595-.274-1.72-.476-1.78-.06-1.78z"/>
          </svg>
        )
      case 'Stripe Professional':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.511-.977 1.423-.977 1.667 0 3.379.642 4.558 1.22l.666-4.111c-.935-.446-2.847-1.177-5.49-1.177-1.87 0-3.425.489-4.536 1.401-1.155.912-1.736 2.132-1.736 3.688 0 2.21 1.245 3.606 3.729 4.467 1.403.622 2.118 1.111 2.118 1.803 0 .711-.666 1.067-1.67 1.067-2.006 0-4.047-.933-5.204-1.803l-.778 4.135c1.245.756 3.63 1.489 6.204 1.489 1.911 0 3.516-.445 4.715-1.445 1.245-.977 1.889-2.156 1.889-3.622.022-2.177-1.245-3.667-3.606-4.356z"/>
          </svg>
        )
      case 'Shopify Partner':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.6 5.5c-.4-1.8-1.4-2.5-2.4-2.5-.2 0-.4 0-.6.1-.2-.3-.4-.6-.7-.9-.7-.7-1.7-1-2.8-1-2.1 0-4.2 1.6-5.6 4.3-.8-.2-1.5-.3-2-.3-1.4 0-2.1.9-2.3 2.3l-1.1 8.4c-.1.6.4 1.1 1 1.1h14.8c.6 0 1.1-.5 1.1-1.1l-.9-9.2c-.2-1.1-.5-1.2-.5-1.2z"/>
          </svg>
        )
      case 'JetBrains Professional':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M0 0v24h24V0H0zm3.723 3.111h5v1.834h-1.39v6.277h1.39v1.834h-5v-1.834h1.444V4.945H3.723V3.111zm11.055 0h4.167v1.834h-2.824v1.39h2.824v1.834h-2.824v1.389h2.824v1.834h-4.167V3.111zm-7.778 9.166h2.5v1.389h-2.5v-1.389z"/>
          </svg>
        )
      case 'Domain & SSL Setup':
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
            <path d="M9 12l2 2 4-4"/>
          </svg>
        )
      default:
        return (
          <svg className={iconClass} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        )
    }
  }

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
      description: 'Design and develop responsive user interfaces with modern frameworks',
      icon: '💻',
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
      description: 'Build complete web applications from database to user interface',
      icon: '🔧',
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
      description: 'Develop cross-platform mobile applications for iOS and Android',
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
      description: 'Streamline deployment processes and manage cloud infrastructure',
      icon: '⚙️',
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      {/* Subtle Space Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        {/* Subtle Stars */}
        <div className="absolute w-1 h-1 rounded-full top-20 left-20 bg-white/60"></div>
        <div className="absolute w-1 h-1 rounded-full top-40 right-32 bg-blue-200/40"></div>
        <div className="absolute top-64 left-1/3 w-0.5 h-0.5 bg-white/50 rounded-full"></div>
        <div className="absolute w-1 h-1 rounded-full bottom-40 right-20 bg-white/30"></div>
        <div className="absolute bottom-64 left-16 w-0.5 h-0.5 bg-blue-100/40 rounded-full"></div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-transparent"></div>
        <div className="relative px-6 py-20 mx-auto max-w-7xl">
          <div className="text-center">
            {/* Professional Rocket Launch Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 16.5c-1.5 1.232-2 3-2 3s1.768-.515 3-2c.768-.948 1.5-2 1.5-2s-1.052.732-2.5 1z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                  <circle cx="16" cy="8" r="1" fill="currentColor"/>
                </svg>
                <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
                {/* Rocket exhaust effect */}
                <div className="absolute transform -translate-x-1/2 -bottom-2 left-1/2">
                  <div className="w-2 h-4 rounded-full bg-gradient-to-b from-orange-400 to-red-500 opacity-60 animate-pulse"></div>
                </div>
              </div>
            </div>
            <h1 className="mb-6 text-5xl font-light tracking-wide text-white">
              Developer Launch Pad
            </h1>
            <p className="max-w-3xl mx-auto mb-12 text-xl font-light leading-relaxed text-slate-300">
              Your professional command center for building a successful development career. Track progress, access industry tools, and navigate your path to expertise.
            </p>
            
            {/* Professional Stats Grid */}
            <div className="grid max-w-4xl grid-cols-2 gap-6 mx-auto md:grid-cols-4">
              <div className="p-6 transition-colors border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-blue-500/30">
                <div className="mb-2 text-3xl font-light text-blue-400">{missionProgress.careerReadiness}%</div>
                <div className="text-sm tracking-wide uppercase text-slate-400">Career Readiness</div>
              </div>
              <div className="p-6 transition-colors border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-purple-500/30">
                <div className="mb-2 text-3xl font-light text-purple-400">{missionProgress.completedMissions}/{missionProgress.totalMissions}</div>
                <div className="text-sm tracking-wide uppercase text-slate-400">Phases Complete</div>
              </div>
              <div className="p-6 transition-colors border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-green-500/30">
                <div className="mb-2 text-3xl font-light text-green-400">{missionProgress.portfolioStrength}/10</div>
                <div className="text-sm tracking-wide uppercase text-slate-400">Portfolio Score</div>
              </div>
              <div className="p-6 transition-colors border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-amber-500/30">
                <div className="mb-2 text-3xl font-light text-amber-400">{missionProgress.professionalTools}/13</div>
                <div className="text-sm tracking-wide uppercase text-slate-400">Pro Tools Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-40 border-b bg-slate-900/95 backdrop-blur-md border-slate-700/50">
        <div className="px-6 py-6 mx-auto max-w-7xl">
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setActiveTab('mission-control')}
              className={`flex items-center gap-3 px-8 py-4 rounded-lg transition-all duration-300 font-medium ${
                activeTab === 'mission-control'
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                  : 'bg-slate-800/30 text-slate-400 hover:bg-slate-700/30 hover:text-slate-300 border border-slate-700/50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Progress Dashboard</span>
            </button>
            <button
              onClick={() => setActiveTab('professional-setup')}
              className={`flex items-center gap-3 px-8 py-4 rounded-lg transition-all duration-300 font-medium ${
                activeTab === 'professional-setup'
                  ? 'bg-green-600/20 text-green-400 border border-green-500/30 shadow-lg shadow-green-500/10'
                  : 'bg-slate-800/30 text-slate-400 hover:bg-slate-700/30 hover:text-slate-300 border border-slate-700/50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Professional Tools</span>
            </button>
            <button
              onClick={() => setActiveTab('career-paths')}
              className={`flex items-center gap-3 px-8 py-4 rounded-lg transition-all duration-300 font-medium ${
                activeTab === 'career-paths'
                  ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-800/30 text-slate-400 hover:bg-slate-700/30 hover:text-slate-300 border border-slate-700/50'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span>Career Pathways</span>
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-12 mx-auto max-w-7xl">
        
        {/* Mission Control Dashboard */}
        {activeTab === 'mission-control' && (
          <div className="space-y-16 duration-700 animate-in slide-in-from-bottom-8">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-light text-white">Progress Dashboard</h2>
              <p className="max-w-3xl mx-auto text-xl font-light text-slate-400">
                Track your advancement through the developer career progression pathway
              </p>
            </div>

            {/* Development Phases */}
            <div className="p-8 border bg-slate-800/30 backdrop-blur-sm rounded-2xl border-slate-700/50">
              <h3 className="mb-8 text-2xl font-light text-center text-white">Development Phases</h3>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {missionPhases.map((phase, index) => (
                  <div
                    key={phase.id}
                    className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:scale-[1.02] ${
                      phase.status === 'available' ? 'border-blue-500/30 bg-blue-500/5' :
                      phase.status === 'in-progress' ? 'border-amber-500/30 bg-amber-500/5' :
                      phase.status === 'completed' ? 'border-green-500/30 bg-green-500/5' :
                      'border-slate-600/30'
                    }`}
                  >
                    <div className="mb-6 text-center">
                      {/* Professional phase indicator */}
                      <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 border rounded-full bg-slate-700/50 border-slate-600/50">
                        <span className="font-medium text-slate-300">{index + 1}</span>
                      </div>
                      <h4 className="mb-2 text-lg font-medium text-white">{phase.title}</h4>
                      <div className={`inline-block px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wide ${
                        phase.status === 'available' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        phase.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                        phase.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                      }`}>
                        {phase.status.replace('-', ' ')}
                      </div>
                    </div>
                    <p className="mb-4 text-sm leading-relaxed text-slate-300">{phase.description}</p>
                    <div className="space-y-2 text-xs text-slate-400">
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {phase.estimatedTime}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                        {phase.reward}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Analytics */}
            <div className="p-8 border bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-2xl border-slate-600/50">
              <h3 className="mb-8 text-2xl font-light text-center text-white">Performance Analytics</h3>
              <div className="grid gap-12 md:grid-cols-3">
                <div className="text-center">
                  <div className="relative mx-auto mb-6 w-28 h-28">
                    <svg className="transform -rotate-90 w-28 h-28">
                      <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-700"/>
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="48" 
                        stroke="currentColor" 
                        strokeWidth="6" 
                        fill="transparent" 
                        strokeDasharray={`${2 * Math.PI * 48}`}
                        strokeDashoffset={`${2 * Math.PI * 48 * (1 - missionProgress.careerReadiness / 100)}`}
                        className="text-blue-400 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-light text-white">{missionProgress.careerReadiness}%</span>
                    </div>
                  </div>
                  <div className="mb-2 font-medium text-white">Career Readiness</div>
                  <div className="text-sm text-slate-400">Professional skills assessment</div>
                </div>

                <div className="text-center">
                  <div className="relative mx-auto mb-6 w-28 h-28">
                    <svg className="transform -rotate-90 w-28 h-28">
                      <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-700"/>
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="48" 
                        stroke="currentColor" 
                        strokeWidth="6" 
                        fill="transparent" 
                        strokeDasharray={`${2 * Math.PI * 48}`}
                        strokeDashoffset={`${2 * Math.PI * 48 * (1 - missionProgress.portfolioStrength / 10)}`}
                        className="text-purple-400 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-light text-white">{missionProgress.portfolioStrength}/10</span>
                    </div>
                  </div>
                  <div className="mb-2 font-medium text-white">Portfolio Quality</div>
                  <div className="text-sm text-slate-400">Project depth and impact</div>
                </div>

                <div className="text-center">
                  <div className="relative mx-auto mb-6 w-28 h-28">
                    <svg className="transform -rotate-90 w-28 h-28">
                      <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-700"/>
                      <circle 
                        cx="56" 
                        cy="56" 
                        r="48" 
                        stroke="currentColor" 
                        strokeWidth="6" 
                        fill="transparent" 
                        strokeDasharray={`${2 * Math.PI * 48}`}
                        strokeDashoffset={`${2 * Math.PI * 48 * (1 - missionProgress.professionalTools / 12)}`}
                        className="text-green-400 transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-light text-white">{missionProgress.professionalTools}/12</span>
                    </div>
                  </div>
                  <div className="mb-2 font-medium text-white">Tool Proficiency</div>
                  <div className="text-sm text-slate-400">Industry standard setup</div>
                </div>
              </div>
            </div>

            {/* Next Phase Call-to-Action */}
            <div className="text-center">
              <div className="p-10 border bg-gradient-to-r from-blue-600/20 to-green-600/20 backdrop-blur-sm rounded-2xl border-blue-500/30">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.5 16.5c-1.5 1.232-2 3-2 3s1.768-.515 3-2c.768-.948 1.5-2 1.5-2s-1.052.732-2.5 1z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
                    <circle cx="16" cy="8" r="1" fill="currentColor"/>
                  </svg>
                </div>
                <h3 className="mb-4 text-2xl font-light text-white">Initialize Professional Environment</h3>
                <p className="max-w-2xl mx-auto mb-8 leading-relaxed text-slate-300">
                  Configure your development environment with industry-standard tools valued at $200k+. Complete your setup to unlock advanced training modules.
                </p>
                <button
                  onClick={() => setActiveTab('professional-setup')}
                  className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-500 hover:to-green-500 text-white font-medium py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                >
                  Configure Professional Tools
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Professional Setup */}
        {activeTab === 'professional-setup' && (
          <div className="space-y-16 duration-700 animate-in slide-in-from-bottom-8">
            <div className="mb-16 text-center">
              <h2 className="mb-6 text-4xl font-light text-white">Professional Tool Configuration</h2>
              <p className="max-w-3xl mx-auto mb-8 text-xl font-light text-slate-400">
                Configure your development environment with industry-standard professional tools
              </p>
              {/* Professional Transparency Notice */}
              <div className="max-w-3xl p-6 mx-auto border bg-slate-800/40 backdrop-blur-sm border-slate-600/50 rounded-xl">
                <p className="text-sm leading-relaxed text-slate-300">
                  We partner with industry-leading tools to maintain platform sustainability. 
                  Each tool is selected for professional merit and career advancement value.
                </p>
              </div>
            </div>

            {/* Professional Tools Grid */}
            <div className="grid gap-8 md:grid-cols-2">
              {professionalTools.map((tool) => (
                <div
                  key={tool.name}
                  className={`bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border transition-all duration-300 hover:scale-[1.02] ${
                    tool.status === 'available' ? 'border-green-500/30 bg-green-500/5' : 'border-slate-600/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 border rounded-xl bg-slate-700/50 border-slate-600/50">
                        {renderToolIcon(tool.name)}
                      </div>
                      <div>
                        <h3 className="text-xl font-medium text-white">{tool.name}</h3>
                        <div className="text-sm font-medium text-green-400">{tool.value}</div>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wide ${
                      tool.status === 'available' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                    }`}>
                      {tool.status}
                    </div>
                  </div>
                  <p className="mb-6 leading-relaxed text-slate-300">{tool.description}</p>
                  
                  {/* Professional Impact Note */}
                  {tool.affiliateNote && (
                    <div className="p-4 mb-4 border rounded-lg bg-blue-600/10 border-blue-500/20">
                      <div className="text-sm text-blue-300">
                        <span className="font-medium">Professional Impact:</span> {tool.affiliateNote}
                      </div>
                      {/* Revenue Transparency by Tool */}
                      {tool.name === 'GitHub Student Pack' && (
                        <div className="mt-2 text-xs text-green-300">
                          � <strong>Revenue Model:</strong> Free for students, we earn when you upgrade professionally (keeps RockitCode free!)
                        </div>
                      )}
                      {tool.name === 'Vercel Pro Hosting' && (
                        <div className="mt-2 text-xs text-green-300">
                          💰 <strong>Revenue Model:</strong> ~$36/year commission when you upgrade for team/commercial projects
                        </div>
                      )}
                      {tool.name === 'Tailwind UI Components' && (
                        <div className="mt-2 text-xs text-green-300">
                          💰 <strong>Revenue Model:</strong> ~$75/year commission - helps fund free Tailwind CSS education
                        </div>
                      )}
                      {tool.name === 'AWS Professional Setup' && (
                        <div className="mt-2 text-xs text-green-300">
                          💰 <strong>Revenue Model:</strong> Small percentage of usage for production apps (free tier covers learning)
                        </div>
                      )}
                      {tool.name === 'Shopify Partner' && (
                        <div className="mt-2 text-xs text-green-300">
                          💰 <strong>Revenue Model:</strong> $58-200 per store referral (massive e-commerce opportunity for you!)
                        </div>
                      )}
                      {tool.name === 'Stripe Professional' && (
                        <div className="mt-2 text-xs text-green-300">
                          💰 <strong>Revenue Model:</strong> Ongoing small percentage of payment processing (industry standard)
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-200">⏱️ {tool.setupTime} setup</span>
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
            <div className="p-8 border bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-md rounded-2xl border-white/20">
              <h3 className="mb-6 text-2xl font-bold text-center text-white">🎯 Setup Progress</h3>
              <div className="grid gap-6 text-center md:grid-cols-4">
                <div>
                  <div className="mb-2 text-3xl font-bold text-green-400">5/12</div>
                  <div className="text-blue-100">Tools Configured</div>
                </div>
                <div>
                  <div className="mb-2 text-3xl font-bold text-blue-400">42%</div>
                  <div className="text-blue-100">Setup Complete</div>
                </div>
                <div>
                  <div className="mb-2 text-3xl font-bold text-purple-400">$200k+</div>
                  <div className="text-blue-100">Tools Unlocked</div>
                </div>
                <div>
                  <div className="mb-2 text-3xl font-bold text-yellow-400">35min</div>
                  <div className="text-blue-100">Est. Remaining</div>
                </div>
              </div>
              <div className="mt-6">
                <div className="w-full h-3 bg-gray-700 rounded-full">
                  <div className="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-400" style={{ width: '42%' }}></div>
                </div>
              </div>
              
              {/* Comprehensive Affiliate Revenue Transparency */}
              <div className="mt-8 space-y-6">
                <div className="p-6 border rounded-lg bg-white/10 border-white/20">
                  <div className="text-center">
                    <div className="mb-4 text-xl font-semibold text-yellow-400">💰 How We Keep RockitCode Free Forever</div>
                    <p className="mb-6 text-lg leading-relaxed text-blue-200">
                      We partner with the exact same professional tools you'll use in your career. When you naturally progress 
                      from learning to professional work, small commissions fund our free education platform.
                    </p>
                    
                    {/* Revenue Model Breakdown */}
                    <div className="grid gap-4 mb-6 md:grid-cols-3">
                      <div className="p-4 border rounded-lg bg-green-500/10 border-green-500/30">
                        <h4 className="mb-2 font-semibold text-green-400">🎯 Career-First Selection</h4>
                        <p className="text-sm text-gray-200">Every tool is used by 85%+ of professional developers and appears in job descriptions</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-blue-500/10 border-blue-500/30">
                        <h4 className="mb-2 font-semibold text-blue-400">🆓 Free Learning Forever</h4>
                        <p className="text-sm text-gray-200">All 200+ lessons work with free tiers. Upgrades only benefit professional projects</p>
                      </div>
                      <div className="p-4 border rounded-lg bg-purple-500/10 border-purple-500/30">
                        <h4 className="mb-2 font-semibold text-purple-400">🚀 Success Alignment</h4>
                        <p className="text-sm text-gray-200">We only succeed when you get hired. 74% job placement rate proves our commitment</p>
                      </div>
                    </div>

                    {/* Projected Revenue Impact using Centralized Calculations */}
                    <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-600">
                      <h4 className="mb-3 text-lg font-semibold text-white">📊 Projected Monthly Revenue (200 active students)</h4>
                      {(() => {
                        const revenue = calculateProjectedRevenue(200)
                        return (
                          <>
                            <div className="grid gap-3 text-sm md:grid-cols-4">
                              <div>
                                <p className="text-gray-200"><strong className="text-green-400">Foundation:</strong> ${revenue.foundation.toLocaleString()}</p>
                                <p className="text-xs text-gray-400">GitHub, Vercel, Figma</p>
                              </div>
                              <div>
                                <p className="text-gray-200"><strong className="text-blue-400">Development:</strong> ${revenue.development.toLocaleString()}</p>
                                <p className="text-xs text-gray-400">AWS, MongoDB, APIs</p>
                              </div>
                              <div>
                                <p className="text-gray-200"><strong className="text-purple-400">Business:</strong> ${revenue.business.toLocaleString()}</p>
                                <p className="text-xs text-gray-400">Shopify, Stripe, domains</p>
                              </div>
                              <div>
                                <p className="text-gray-200"><strong className="text-orange-400">Specialized:</strong> ${revenue.specialized.toLocaleString()}</p>
                                <p className="text-xs text-gray-400">JetBrains, Redis, marketing</p>
                              </div>
                            </div>
                            <p className="mt-3 font-semibold text-green-400">
                              Total: ${revenue.total.toLocaleString()}/month → Scales to ${(revenue.total * 12).toLocaleString()} annually at 1,000 students
                            </p>
                          </>
                        )
                      })()}
                    </div>

                    <div className="p-4 mt-4 border rounded-lg bg-green-600/20 border-green-400/50">
                      <div className="text-sm text-green-300">
                        <span className="font-medium">🤖 AI Strategy:</span> GitHub Copilot (included in Student Pack) provides all the AI assistance you need. 
                        No additional AI subscriptions required on our platform - keeping costs low and learning focused!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Setup Benefits */}
            <div className="p-8 border bg-white/5 backdrop-blur-md rounded-2xl border-white/10">
              <h3 className="mb-6 text-2xl font-bold text-center text-white">✨ Why Professional Setup Matters</h3>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-4 text-4xl">💼</div>
                  <h4 className="mb-2 text-lg font-bold text-white">Industry Standard</h4>
                  <p className="text-sm text-blue-200">Use the exact tools professional developers use every day</p>
                </div>
                <div className="text-center">
                  <div className="mb-4 text-4xl">🚀</div>
                  <h4 className="mb-2 text-lg font-bold text-white">Career Ready</h4>
                  <p className="text-sm text-blue-200">Graduate with professional workflow experience</p>
                </div>
                <div className="text-center">
                  <div className="mb-4 text-4xl">💰</div>
                  <h4 className="mb-2 text-lg font-bold text-white">Higher Salary</h4>
                  <p className="text-sm text-blue-200">Developers skilled in these tools earn 25-40% more</p>
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
              <div className="space-y-16 duration-700 animate-in slide-in-from-bottom-8">
                <div className="mb-16 text-center">
                  <h2 className="mb-6 text-4xl font-light text-white">Career Development Pathways</h2>
                  <p className="max-w-3xl mx-auto text-xl font-light text-slate-400">
                    Choose a specialization track that aligns with your professional objectives
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  {careerPaths.map((career) => (
                    <div
                      key={career.id}
                      onClick={() => setSelectedCareer(career.id)}
                      className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-8 cursor-pointer hover:bg-slate-700/30 transition-all duration-300 hover:scale-[1.02] group hover:border-blue-500/30"
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center justify-center w-12 h-12 text-2xl transition-colors border rounded-xl bg-slate-700/50 border-slate-600/50 group-hover:border-blue-500/50">
                          {career.icon}
                        </div>
                        <div>
                          <h3 className="text-2xl font-medium text-white">{career.title}</h3>
                          <div className={`inline-block px-3 py-1 rounded-md text-sm font-medium border mt-2 ${
                            career.difficulty === 'Beginner Friendly' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                            career.difficulty === 'Some Experience' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                            'bg-red-500/20 text-red-400 border-red-500/30'
                          }`}>
                            {career.difficulty}
                          </div>
                        </div>
                      </div>
                      <p className="mb-6 leading-relaxed text-slate-300">{career.description}</p>
                      
                      {/* Professional Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="p-4 text-center border rounded-lg bg-slate-700/30 border-slate-600/30">
                          <div className="font-medium text-green-400">{career.salaryRange}</div>
                          <div className="text-sm text-slate-400">Market Range</div>
                        </div>
                        <div className="p-4 text-center border rounded-lg bg-slate-700/30 border-slate-600/30">
                          <div className="font-medium text-blue-400">{career.jobGrowth}</div>
                          <div className="text-sm text-slate-400">Growth Rate</div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="mb-3 font-medium text-white">Project Portfolio:</h4>
                        <div className="flex flex-wrap gap-2">
                          {career.projects.map((project) => (
                            <span key={project} className="px-3 py-1 text-sm text-blue-300 border rounded-md bg-blue-600/20 border-blue-500/30">
                              {project}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-slate-400">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {career.averageTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {career.skillsGained.length} core skills
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : !selectedProject ? (
              /* Project Selection */
              <div className="space-y-12 duration-700 animate-in slide-in-from-bottom-8">
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => setSelectedCareer(null)}
                    className="flex items-center gap-2 px-4 py-2 text-blue-200 transition-all rounded-lg hover:text-white bg-white/10 hover:bg-white/20"
                  >
                    ← Back to Career Paths
                  </button>
                  <h2 className="text-4xl font-bold text-white">
                    Choose Your First Project
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {projects
                    .filter(project => project.careerPaths.includes(selectedCareer))
                    .map((project) => (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProject(project.id)}
                        className="p-6 transition-all duration-300 border cursor-pointer bg-white/5 backdrop-blur-md border-white/10 rounded-2xl hover:bg-white/10 hover:scale-105"
                      >
                        <h3 className="mb-3 text-xl font-bold text-white">{project.title}</h3>
                        <p className="mb-4 text-blue-200">{project.description}</p>
                        
                        {/* Real World Use */}
                        <div className="p-3 mb-4 border rounded-lg bg-green-500/20 border-green-400/50">
                          <div className="text-sm font-medium text-green-400">💡 Real-World Impact</div>
                          <div className="text-sm text-green-200">{project.realWorldUse}</div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="pl-3 border-l-4 border-green-500">
                            <div className="font-semibold text-green-400">Beginner</div>
                            <div className="text-sm text-blue-200">{project.levels.beginner.title}</div>
                            <div className="text-xs text-blue-300">{project.levels.beginner.time}</div>
                          </div>
                          <div className="pl-3 border-l-4 border-yellow-500">
                            <div className="font-semibold text-yellow-400">Intermediate</div>
                            <div className="text-sm text-blue-200">{project.levels.intermediate.title}</div>
                            <div className="text-xs text-blue-300">{project.levels.intermediate.time}</div>
                          </div>
                          <div className="pl-3 border-l-4 border-red-500">
                            <div className="font-semibold text-red-400">Advanced</div>
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
              <div className="space-y-12 duration-700 animate-in slide-in-from-bottom-8">
                <div className="flex items-center gap-4 mb-8">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="flex items-center gap-2 px-4 py-2 text-blue-200 transition-all rounded-lg hover:text-white bg-white/10 hover:bg-white/20"
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
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                      {/* Beginner Level */}
                      <div className="p-6 transition-all duration-300 border bg-white/5 backdrop-blur-md border-green-500/50 rounded-2xl hover:scale-105">
                        <div className="mb-6 text-center">
                          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 text-2xl font-bold text-white bg-green-500 rounded-full">
                            1
                          </div>
                          <h3 className="text-2xl font-bold text-white">Beginner</h3>
                          <p className="text-green-400">{project.levels.beginner.title}</p>
                        </div>
                        
                        <div className="mb-6 space-y-4">
                          <div>
                            <h4 className="mb-2 font-semibold text-white">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.levels.beginner.tech.map((tech) => (
                                <span key={tech} className="px-2 py-1 text-sm text-green-100 rounded bg-green-600/50">
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
                          className="block w-full px-4 py-3 mb-3 font-semibold text-center text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
                        >
                          📁 Clone Repository
                        </a>
                        <Link
                          href={`/foundation/chapter-1-vscode`}
                          className="block w-full px-4 py-3 font-semibold text-center text-green-400 transition-colors border border-green-500 rounded-lg bg-green-600/20 hover:bg-green-600/30"
                        >
                          📖 Start Foundation Course
                        </Link>
                      </div>

                      {/* Intermediate Level */}
                      <div className="p-6 transition-all duration-300 border bg-white/5 backdrop-blur-md border-yellow-500/50 rounded-2xl hover:scale-105">
                        <div className="mb-6 text-center">
                          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 text-2xl font-bold text-white bg-yellow-500 rounded-full">
                            2
                          </div>
                          <h3 className="text-2xl font-bold text-white">Intermediate</h3>
                          <p className="text-yellow-400">{project.levels.intermediate.title}</p>
                        </div>
                        
                        <div className="mb-6 space-y-4">
                          <div>
                            <h4 className="mb-2 font-semibold text-white">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.levels.intermediate.tech.map((tech) => (
                                <span key={tech} className="px-2 py-1 text-sm text-yellow-100 rounded bg-yellow-600/50">
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
                          className="block w-full px-4 py-3 mb-3 font-semibold text-center text-white transition-colors bg-yellow-600 rounded-lg hover:bg-yellow-700"
                        >
                          📁 Clone Repository
                        </a>
                        <button className="w-full px-4 py-3 font-semibold text-yellow-400 border border-yellow-500 rounded-lg cursor-not-allowed bg-yellow-600/20">
                          🔒 Complete Foundation First
                        </button>
                      </div>

                      {/* Advanced Level */}
                      <div className="p-6 transition-all duration-300 border bg-white/5 backdrop-blur-md border-red-500/50 rounded-2xl hover:scale-105">
                        <div className="mb-6 text-center">
                          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 text-2xl font-bold text-white bg-red-500 rounded-full">
                            3
                          </div>
                          <h3 className="text-2xl font-bold text-white">Advanced</h3>
                          <p className="text-red-400">{project.levels.advanced.title}</p>
                        </div>
                        
                        <div className="mb-6 space-y-4">
                          <div>
                            <h4 className="mb-2 font-semibold text-white">Technologies:</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.levels.advanced.tech.map((tech) => (
                                <span key={tech} className="px-2 py-1 text-sm text-red-100 rounded bg-red-600/50">
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
                          className="block w-full px-4 py-3 mb-3 font-semibold text-center text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
                        >
                          📁 Clone Repository
                        </a>
                        <button className="w-full px-4 py-3 font-semibold text-red-400 border border-red-500 rounded-lg cursor-not-allowed bg-red-600/20">
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
