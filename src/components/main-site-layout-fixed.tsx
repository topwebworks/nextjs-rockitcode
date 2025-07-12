'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import SmartSidebar from '@/components/smart-sidebar'
import { useLearningContext } from '@/contexts/learning-context'

interface MainSiteLayoutProps {
  children: React.ReactNode
}

export function MainSiteLayout({ children }: MainSiteLayoutProps) {
  const pathname = usePathname()
  const { currentTrack, currentVideo, setCurrentTrack, setCurrentVideo } = useLearningContext()
  
  // Check if we're in a synchronized learning context
  const isInSynchronizedMode = pathname.includes('/synchronized')
  
  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Smart Sidebar Navigation */}
      <div className="border-r border-gray-200 w-80 bg-gray-50 dark:bg-gray-900 dark:border-gray-700">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <SmartSidebar />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto px-6 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
