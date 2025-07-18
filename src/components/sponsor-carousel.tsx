'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Sponsor {
  id: string
  name: string
  logo: string
  website?: string
  tier: 'basic' | 'premium' // $50/mo basic, $100/mo premium
  isActive: boolean
  joinedDate: string
}

interface SponsorCarouselProps {
  tier?: 'basic' | 'premium' | 'all'
  className?: string
}

export default function SponsorCarousel({ tier = 'premium', className = '' }: SponsorCarouselProps) {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Mock data - replace with actual API call
  const mockSponsors: Sponsor[] = [
    {
      id: '1',
      name: 'Vercel',
      logo: 'https://www.vectorlogo.zone/logos/vercel/vercel-ar21.svg',
      website: 'https://vercel.com',
      tier: 'premium',
      isActive: true,
      joinedDate: '2024-01-15'
    },
    {
      id: '2',
      name: 'GitHub',
      logo: 'https://www.vectorlogo.zone/logos/github/github-ar21.svg',
      website: 'https://github.com',
      tier: 'premium',
      isActive: true,
      joinedDate: '2024-02-10'
    },
    {
      id: '3',
      name: 'Netlify',
      logo: 'https://www.vectorlogo.zone/logos/netlify/netlify-ar21.svg',
      website: 'https://netlify.com',
      tier: 'basic',
      isActive: true,
      joinedDate: '2024-03-05'
    }
  ]

  useEffect(() => {
    // Filter sponsors by tier and active status
    const filteredSponsors = mockSponsors.filter(sponsor => 
      sponsor.isActive && (tier === 'all' || sponsor.tier === tier)
    )
    setSponsors(filteredSponsors)
  }, [tier])

  useEffect(() => {
    if (sponsors.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % sponsors.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [sponsors.length])

  const getVisibleSponsors = () => {
    if (sponsors.length === 0) return []
    
    // Show more sponsors at once in horizontal line
    const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 768
    const visibleCount = isDesktop ? Math.min(5, sponsors.length) : Math.min(3, sponsors.length)
    
    const visible = []
    for (let i = 0; i < visibleCount; i++) {
      const index = (currentIndex + i) % sponsors.length
      visible.push(sponsors[index])
    }
    return visible
  }

  if (sponsors.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-sm text-slate-400">
          {tier === 'premium' ? 'Be our first premium sponsor!' : tier === 'basic' ? 'Be our first basic sponsor!' : 'Be our first sponsor!'}
        </p>
        <Link 
          href="/contributors#sponsors"
          className="inline-block mt-2 text-sm text-blue-400 underline hover:text-blue-300"
        >
          Learn about sponsorship
        </Link>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {/* Sponsor Display */}
      <div className="flex justify-center items-center gap-4 sm:gap-8 min-h-[60px] flex-wrap">
        {getVisibleSponsors().map((sponsor, index) => (
          <SponsorItem 
            key={`${sponsor.id}-${currentIndex}-${index}`} 
            sponsor={sponsor} 
          />
        ))}
      </div>
    </div>
  )
}

// Helper component for sponsor items
function SponsorItem({ sponsor }: { sponsor: Sponsor }) {
  return (
    <div className="flex items-center justify-center transition-all duration-300 ease-in-out transform hover:scale-105">
      {sponsor.website ? (
        <Link
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-all hover:opacity-80"
        >
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            className="h-12 sm:h-16 w-auto max-w-[180px] sm:max-w-[220px] object-contain filter brightness-0 invert transition-all"
            onError={(e) => {
              // Fallback to text if image fails
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = `
                <div class="text-white text-lg font-medium px-4 py-3">
                  ${sponsor.name}
                </div>
              `
            }}
          />
        </Link>
      ) : (
        <div className="transition-all hover:opacity-80">
          <img
            src={sponsor.logo}
            alt={`${sponsor.name} logo`}
            className="h-12 sm:h-16 w-auto max-w-[180px] sm:max-w-[220px] object-contain filter brightness-0 invert"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
              target.parentElement!.innerHTML = `
                <div class="text-white text-lg font-medium px-4 py-3">
                  ${sponsor.name}
                </div>
              `
            }}
          />
        </div>
      )}
    </div>
  )
}
