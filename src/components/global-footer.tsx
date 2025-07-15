import Link from 'next/link'

// RockitCode logo component with Lucide rocket icon (consistent with header)
function RockitLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center space-x-2 ${className || ''}`}>
      <div className="relative w-6 h-6">
        {/* Authentic Lucide Rocket icon */}
        <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-blue-500 dark:text-blue-400 drop-shadow-sm">
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
        {/* Subtle glow effect */}
        <div className="absolute inset-0 w-6 h-6 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-sm -z-10"></div>
      </div>
      <span className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
        RockitCode
      </span>
    </div>
  )
}

// Authentic Lucide social media icons with elegant styling and subtle glows
function DiscordIcon({ className }: { className?: string }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M8.5 6.5a1.5 1.5 0 0 0-1.5 1.5v7a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M13.5 6.5a1.5 1.5 0 0 0-1.5 1.5v7a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-1Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 8c0 6-3 10-7 10a4.5 4.5 0 0 1-2.5-.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 8c0 6 3 10 7 10a4.5 4.5 0 0 0 2.5-.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M8.5 6.5v.5a2 2 0 0 0 4 0v-.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      </svg>
      <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
    </div>
  )
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className="absolute inset-0 bg-blue-600/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
    </div>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <div className="relative">
      <svg viewBox="0 0 24 24" fill="none" className={className}>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 18c-4.51 2-5-2-7-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div className="absolute inset-0 bg-slate-400/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10"></div>
    </div>
  )
}

const navigation = {
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Community', href: '/community' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
  ],
  social: [
    {
      name: 'Discord',
      href: '#',
      icon: DiscordIcon,
    },
    {
      name: 'Facebook',
      href: '#',
      icon: FacebookIcon,
    },
    {
      name: 'GitHub',
      href: '#',
      icon: GitHubIcon,
    },
  ],
}

export function GlobalFooter() {
  return (
    <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-800/50">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <RockitLogo />
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-400">
              Learn to code through hands-on projects and build your professional portfolio with elegant, modern tools.
            </p>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="relative text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all duration-200 group"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6 drop-shadow-sm" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">Support</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="relative text-sm leading-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 group"
                      >
                        {item.name}
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-200 rounded-full"></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">Company</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="relative text-sm leading-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 group"
                      >
                        {item.name}
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-200 rounded-full"></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100">Legal</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link 
                        href={item.href} 
                        className="relative text-sm leading-6 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-all duration-200 group"
                      >
                        {item.name}
                        <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 group-hover:w-full transition-all duration-200 rounded-full"></div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-slate-900/10 dark:border-slate-100/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-slate-500 dark:text-slate-400">
            &copy; 2024 RockitCode. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
