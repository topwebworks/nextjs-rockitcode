'use client'

import { useState } from 'react'
import Link from 'next/link'
import { DiscordIcon } from './icons'

const social = [
  {
    name: 'Discord',
    href: 'https://discord.gg/rockitcode',
    icon: DiscordIcon,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/rockitcode',
    icon: (props: any) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
]

const navigation = [
  {
    name: 'Learn',
    items: [
      { name: 'Foundation', href: '/foundation' },
      { name: 'Projects', href: '/projects' },
      { name: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    name: 'Community',
    items: [
      { name: 'Discord Server', href: 'https://discord.gg/rockitcode' },
      { name: 'Community Hub', href: '/community' },
      { name: 'Contributors', href: '/community/contributors' },
    ],
  },
  {
    name: 'Support',
    items: [
      { name: 'Help Center', href: '/help' },
      { name: 'FAQ', href: '/help/faq' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    name: 'Company',
    items: [
      { name: 'About', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Careers', href: '/careers' },
    ],
  },
]

export default function CommunityFooter() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter signup
    console.log('Newsletter signup:', email)
    setEmail('')
  }

  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-xs">RC</span>
              </div>
              <span className="text-lg font-semibold text-white">RockitCode</span>
            </div>
            <p className="text-sm text-gray-400 mb-6 max-w-xs">
              A community-driven platform where learners teach learners through real projects and peer collaboration.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-8 md:grid-cols-4">
            {navigation.map((section) => (
              <div key={section.name}>
                <h3 className="text-sm font-medium text-white mb-4">{section.name}</h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-sm font-medium text-white mb-2">Stay updated</h3>
              <p className="text-sm text-gray-400 max-w-md">
                Get the latest tutorials and community highlights delivered to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 text-sm bg-slate-900 border border-slate-700 rounded text-white placeholder:text-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:w-64"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            &copy; 2025 RockitCode. Built by the community, for the community.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-6">
            <Link href="/legal/privacy" className="text-xs text-gray-500 hover:text-gray-400 transition-colors duration-200">
              Privacy
            </Link>
            <Link href="/legal/terms" className="text-xs text-gray-500 hover:text-gray-400 transition-colors duration-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
