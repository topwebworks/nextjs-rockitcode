'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'

// Authentic Lucide icon family with elegant styling and subtle glows
function SunIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} drop-shadow-sm transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(251,191,36,0.3)] dark:group-hover:drop-shadow-[0_0_8px_rgba(253,224,71,0.25)]`}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m12 2 0 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m12 20 0 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m4.93 4.93 1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m17.66 17.66 1.41 1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m2 12 2 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m20 12 2 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m4.93 19.07 1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m17.66 6.34 1.41-1.41" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} drop-shadow-sm transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] dark:group-hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.25)]`}>
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} drop-shadow-sm transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(148,163,184,0.3)]`}>
      <line x1="4" x2="20" y1="6" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="4" x2="20" y1="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="4" x2="20" y1="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} drop-shadow-sm transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(248,113,113,0.3)]`}>
      <path d="m18 6-12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m6 6 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} transition-transform duration-200`}>
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} drop-shadow-sm transition-all duration-200`}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function SettingsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} drop-shadow-sm transition-all duration-200`}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m12 1 3 6-3 6-3-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m21 16-6-3 6-3 6 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="m3 16 6-3-6-3-6 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function LogOutIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} drop-shadow-sm transition-all duration-200`}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="21" x2="9" y1="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} drop-shadow-sm transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]`}>
      <rect x="3" y="3" width="7" height="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="14" y="3" width="7" height="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="14" y="12" width="7" height="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="3" y="16" width="7" height="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ToolsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} drop-shadow-sm transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(147,51,234,0.3)]`}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function AIIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${className} drop-shadow-sm transition-all duration-200 group-hover:drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]`}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

function RockitLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-3 ${className || ''}`}>
      <div className="relative w-8 h-8">
        {/* Authentic Lucide Rocket icon */}
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          className="w-8 h-8 text-blue-600 dark:text-blue-400 drop-shadow-sm transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] dark:hover:drop-shadow-[0_0_8px_rgba(96,165,250,0.25)]"
        >
          <path
            d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span className="text-xl font-semibold text-gray-900 dark:text-white">
        RockitCode
      </span>
    </div>
  )
}

const navigation = [
  { name: 'Courses', href: '/courses' },
  { name: 'Why Us', href: '/about' },
  { name: 'Careers', href: '/launch-pad' },
]

// Simple theme toggle component
function SimpleThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    const savedTheme = localStorage.getItem('theme')
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialDark = savedTheme === 'dark' || (!savedTheme && systemDark)
    setIsDark(initialDark)
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle('dark', newTheme)
    localStorage.setItem('theme', newTheme ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-500 transition-colors duration-200 rounded-md hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 group"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </button>
  )
}

// User dropdown component
function UserDropdown() {
  const userContext = useUser() as any // Temporarily use any to access signOut method
  const { user, profile } = userContext
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    try {
      await userContext.signOut()
      setIsOpen(false)
    } catch (error) {
      console.error('Sign out error:', error)
    } finally {
      setIsSigningOut(false)
    }
  }

  if (!user) return null

  const displayName = profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || 'User'
  const avatarUrl = profile?.avatar_url || user.user_metadata?.avatar_url

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 text-gray-700 transition-colors duration-200 rounded-md hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group"
      >
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {avatarUrl ? (
            <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            <UserIcon className="w-4 h-4" />
          )}
        </div>
        <span className="hidden sm:block text-sm font-medium">{displayName}</span>
        <ChevronDownIcon className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          
          {/* Menu */}
          <div className="absolute right-0 z-50 w-56 mt-2 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">{displayName}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            </div>
            
            <div className="py-1">
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 group"
                onClick={() => setIsOpen(false)}
              >
                <DashboardIcon className="w-4 h-4 mr-3" />
                Dashboard
              </Link>
              
              <Link
                href="/dashboard/tools"
                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 group"
                onClick={() => setIsOpen(false)}
              >
                <ToolsIcon className="w-4 h-4 mr-3" />
                Tools
              </Link>
              
              <Link
                href="/dashboard/subscriptions"
                className="flex items-center px-4 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 group"
                onClick={() => setIsOpen(false)}
              >
                <AIIcon className="w-4 h-4 mr-3" />
                AI Connect
              </Link>
              
              <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                <button
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 transition-colors duration-200 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <LogOutIcon className="w-4 h-4 mr-3" />
                  {isSigningOut ? 'Signing out...' : 'Log Out'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function GlobalHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const userContext = useUser() as any
  const { user, profile } = userContext

  const handleSignOut = async () => {
    try {
      await userContext.signOut()
      setMobileMenuOpen(false)
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const handleGitHubConnect = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/auth/github', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          redirectTo: `${window.location.origin}/auth/callback?next=/launch-pad`
        })
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('Failed to get auth URL')
      }
    } catch (error) {
      console.error('GitHub auth error:', error)
      setIsLoading(false)
    }
  }

  return (
    <header className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-800">
      <nav className="flex items-center justify-between p-6 mx-auto max-w-7xl lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">RockitCode</span>
            <RockitLogo />
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-lg font-medium text-gray-700 transition-colors duration-200 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-6">
          <SimpleThemeToggle />
          {user ? (
            <UserDropdown />
          ) : (
            <button
              onClick={handleGitHubConnect}
              disabled={isLoading}
              className="relative flex items-center px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-md shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-md hover:border-gray-400 dark:hover:border-gray-500 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {/* Subtle shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 dark:via-gray-600/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <svg className="relative w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="relative">
                {isLoading ? 'Connecting...' : 'GitHub Connect'}
              </span>
            </button>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-gray-600/80" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full px-6 py-6 overflow-y-auto bg-white dark:bg-gray-900 sm:max-w-sm sm:border-l sm:border-gray-200 dark:sm:border-gray-800">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">RockitCode</span>
                <RockitLogo />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 group"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/25">
                <div className="py-6 space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 -mx-3 text-base font-semibold leading-7 text-gray-900 transition-colors duration-200 rounded-lg dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Theme</span>
                    <SimpleThemeToggle />
                  </div>
                  {user ? (
                    <>
                      <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{profile?.full_name || user.user_metadata?.full_name || user.user_metadata?.name || 'User'}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        className="flex items-center px-3 py-2.5 text-base font-semibold text-gray-700 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <DashboardIcon className="w-4 h-4 mr-3" />
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/tools"
                        className="flex items-center px-3 py-2.5 text-base font-semibold text-gray-700 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <ToolsIcon className="w-4 h-4 mr-3" />
                        Tools
                      </Link>
                      <Link
                        href="/dashboard/subscriptions"
                        className="flex items-center px-3 py-2.5 text-base font-semibold text-gray-700 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 group"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <AIIcon className="w-4 h-4 mr-3" />
                        AI Connect
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-3 py-2.5 text-base font-semibold text-red-600 transition-colors duration-200 rounded-lg hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 group"
                      >
                        <LogOutIcon className="w-4 h-4 mr-3" />
                        Log Out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        handleGitHubConnect()
                      }}
                      disabled={isLoading}
                      className="relative flex items-center justify-center w-full px-3 py-2.5 text-base font-semibold text-gray-700 transition-all duration-200 bg-white border border-gray-300 rounded-lg shadow-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 hover:shadow-md hover:border-gray-400 dark:hover:border-gray-500 group overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {/* Subtle shine effect */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-100/50 dark:via-gray-600/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <svg className="relative w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      <span className="relative">
                        {isLoading ? 'Connecting...' : 'GitHub Connect'}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
