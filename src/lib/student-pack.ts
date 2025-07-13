'use client'

// GitHub Student Pack integration utilities
export interface StudentPackBenefit {
  id: string
  name: string
  description: string
  value: string
  category: 'development' | 'hosting' | 'learning' | 'design' | 'productivity'
  provider: string
  setupUrl: string
  isActivated?: boolean
  icon: string
  priority: 1 | 2 | 3
}

export const STUDENT_PACK_BENEFITS: StudentPackBenefit[] = [
  // Priority 1: Essential Development Tools
  {
    id: 'github-copilot',
    name: 'GitHub Copilot',
    description: 'AI-powered code completion and suggestions',
    value: '$120/year',
    category: 'development',
    provider: 'GitHub',
    setupUrl: 'https://github.com/settings/copilot',
    icon: '🤖',
    priority: 1
  },
  {
    id: 'github-codespaces',
    name: 'GitHub Codespaces',
    description: 'Cloud development environments',
    value: '$180/month',
    category: 'development',
    provider: 'GitHub',
    setupUrl: 'https://github.com/codespaces',
    icon: '☁️',
    priority: 1
  },
  {
    id: 'vercel-pro',
    name: 'Vercel Pro',
    description: 'Professional hosting and deployment',
    value: '$240/year',
    category: 'hosting',
    provider: 'Vercel',
    setupUrl: 'https://vercel.com/github-students',
    icon: '🚀',
    priority: 1
  },

  // Priority 2: Enhanced Development
  {
    id: 'digitalocean',
    name: 'DigitalOcean',
    description: 'Cloud infrastructure credits',
    value: '$200 credit',
    category: 'hosting',
    provider: 'DigitalOcean',
    setupUrl: 'https://www.digitalocean.com/github-students',
    icon: '🌊',
    priority: 2
  },
  {
    id: 'mongodb-atlas',
    name: 'MongoDB Atlas',
    description: 'Database hosting with additional storage',
    value: '$200 credit',
    category: 'development',
    provider: 'MongoDB',
    setupUrl: 'https://www.mongodb.com/students',
    icon: '🍃',
    priority: 2
  },
  {
    id: 'jetbrains',
    name: 'JetBrains IDEs',
    description: 'Professional development environments',
    value: '$690/year',
    category: 'development',
    provider: 'JetBrains',
    setupUrl: 'https://www.jetbrains.com/student/',
    icon: '🔧',
    priority: 2
  },

  // Priority 3: Design & Learning
  {
    id: 'figma',
    name: 'Figma Pro',
    description: 'Professional design and prototyping',
    value: '$180/year',
    category: 'design',
    provider: 'Figma',
    setupUrl: 'https://www.figma.com/education/',
    icon: '🎨',
    priority: 3
  },
  {
    id: 'notion',
    name: 'Notion Plus',
    description: 'Advanced workspace and documentation',
    value: '$96/year',
    category: 'productivity',
    provider: 'Notion',
    setupUrl: 'https://www.notion.so/students',
    icon: '📝',
    priority: 3
  },
  {
    id: 'canva',
    name: 'Canva Pro',
    description: 'Professional design tools',
    value: '$120/year',
    category: 'design',
    provider: 'Canva',
    setupUrl: 'https://www.canva.com/education/',
    icon: '🖼️',
    priority: 3
  }
]

export function calculateTotalValue(benefits: StudentPackBenefit[]): number {
  return benefits.reduce((total, benefit) => {
    const value = benefit.value.match(/\$(\d+)/)?.[1]
    return total + (value ? parseInt(value) : 0)
  }, 0)
}

export function getBenefitsByCategory(category: StudentPackBenefit['category']): StudentPackBenefit[] {
  return STUDENT_PACK_BENEFITS.filter(benefit => benefit.category === category)
}

export function getBenefitsByPriority(priority: 1 | 2 | 3): StudentPackBenefit[] {
  return STUDENT_PACK_BENEFITS.filter(benefit => benefit.priority === priority)
}

// Track activation progress
export interface StudentPackProgress {
  activatedBenefits: string[]
  totalValue: number
  completionPercentage: number
  priority1Complete: boolean
  priority2Complete: boolean
  priority3Complete: boolean
}

export function calculateProgress(activatedBenefits: string[]): StudentPackProgress {
  const activated = STUDENT_PACK_BENEFITS.filter(benefit => 
    activatedBenefits.includes(benefit.id)
  )
  
  const totalValue = calculateTotalValue(activated)
  const completionPercentage = Math.round((activated.length / STUDENT_PACK_BENEFITS.length) * 100)
  
  const priority1Benefits = getBenefitsByPriority(1)
  const priority2Benefits = getBenefitsByPriority(2)
  const priority3Benefits = getBenefitsByPriority(3)
  
  const priority1Complete = priority1Benefits.every(benefit => 
    activatedBenefits.includes(benefit.id)
  )
  const priority2Complete = priority2Benefits.every(benefit => 
    activatedBenefits.includes(benefit.id)
  )
  const priority3Complete = priority3Benefits.every(benefit => 
    activatedBenefits.includes(benefit.id)
  )

  return {
    activatedBenefits,
    totalValue,
    completionPercentage,
    priority1Complete,
    priority2Complete,
    priority3Complete
  }
}
