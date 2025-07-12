'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLearningContext } from '../contexts/learning-context'
import { lessons } from '../data/lessons'

// Main navigation items
const mainNavigation = [
  {
    id: 'home',
    title: 'RockitCode',
    href: '/',
    icon: '🚀',
    description: 'Rock your IT skills with solid foundations and rocket-fast growth'
  },
  {
    id: 'courses',
    title: 'Courses',
    href: '/courses',
    icon: '📚',
    description: 'Browse all available courses'
  },
  {
    id: 'blog',
    title: 'Blog',
    href: '/blog',
    icon: '✍️',
    description: 'Latest articles and tutorials'
  },
  {
    id: 'contact',
    title: 'Contact',
    href: '/contact',
    icon: '📧',
    description: 'Get in touch with us'
  },
  {
    id: 'login',
    title: 'Login',
    href: '/login',
    icon: '👤',
    description: 'Sign in to your account'
  }
]

// Learning tracks for secondary navigation
const learningTracksNav = [
  {
    id: 'html-css',
    title: 'HTML & CSS',
    href: '/html-css',
    icon: '🎨',
    description: 'Frontend fundamentals'
  },
  {
    id: 'javascript',
    title: 'JavaScript',
    href: '/javascript',
    icon: '⚡',
    description: 'Interactive programming'
  },
  {
    id: 'python',
    title: 'Python',
    href: '/python',
    icon: '🐍',
    description: 'General-purpose programming'
  },
  {
    id: 'learn',
    title: 'Learning Hub',
    href: '/learn',
    icon: '🎓',
    description: 'Guided learning paths'
  }
]

export default function SmartSidebar() {
  const [isExpanded, setIsExpanded] = useState(true)
  const pathname = usePathname()
  const learningContext = useLearningContext()
  
  // Determine current section for secondary navigation
  const getCurrentSection = () => {
    if (pathname.startsWith('/html-css')) return 'html-css'
    if (pathname.startsWith('/javascript')) return 'javascript'
    if (pathname.startsWith('/python')) return 'python'
    if (pathname.startsWith('/learn')) return 'learn'
    return null
  }

  const currentSection = getCurrentSection()
  const showLearningTracks = ['/', '/courses'].includes(pathname) || currentSection

  return (
    <div className={`bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
      isExpanded ? 'w-80' : 'w-16'
    }`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {isExpanded && (
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  RockitCode
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Rock IT
                </p>
              </div>
            )}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isExpanded ? "M11 19l-7-7 7-7m8 14l-7-7 7-7" : "M13 5l7 7-7 7M5 5l7 7-7 7"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {isExpanded && (
              <h2 className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Main Navigation
              </h2>
            )}
            
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
              
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center p-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  title={!isExpanded ? item.title : undefined}
                >
                  <span className="text-lg">{item.icon}</span>
                  {isExpanded && (
                    <div className="ml-3">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {item.description}
                      </div>
                    </div>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Learning Tracks Section */}
          {showLearningTracks && isExpanded && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Learning Tracks
              </h2>
              
              <div className="space-y-2">
                {learningTracksNav.map((track) => {
                  const isTrackActive = pathname.startsWith(track.href)
                  
                  return (
                    <Link
                      key={track.id}
                      href={track.href}
                      className={`flex items-center p-3 rounded-lg transition-colors ${
                        isTrackActive
                          ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                      }`}
                    >
                      <span className="text-lg">{track.icon}</span>
                      <div className="ml-3">
                        <div className="font-medium">{track.title}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {track.description}
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Current Learning Progress */}
          {currentSection && learningContext && isExpanded && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <h2 className="mb-4 text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-gray-400">
                Current Progress
              </h2>
              
              <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Current Track: {learningContext.currentTrack || 'None selected'}
                </div>
                {learningContext.currentVideo && (
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Video: {learningContext.currentVideo}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
