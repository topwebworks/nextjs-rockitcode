'use client'

import { useState } from 'react'
import Link from 'next/link'
import SponsorCarousel from './sponsor-carousel'
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
      { name: 'Contributors', href: '/contributors' },
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
    <>
      {/* Sponsors Section - Visually above footer but part of footer component */}
      <div className="border-t bg-slate-900 border-slate-800/50">
        <div className="px-6 py-8 mx-auto max-w-7xl lg:px-8">
          <div className="mb-6 text-center">
            <Link
              href="/contributors#sponsors"
              className="inline-block px-4 py-2 text-sm font-medium text-white transition-all duration-200 border rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/30 hover:border-slate-500/50"
            >
              We ❤️ our sponsors
            </Link>
          </div>
          
          {/* Sponsor Carousel - Only Premium Sponsors ($100/mo) */}
          <SponsorCarousel tier="premium" />
        </div>
      </div>

      {/* Main Footer */}
      <footer className="border-t bg-slate-950 border-slate-800">
        <div className="px-6 py-12 mx-auto max-w-7xl lg:px-8">
        
        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4 space-x-2">
              <div className="flex items-center justify-center w-6 h-6 bg-blue-600 rounded">
                <span className="text-xs font-bold text-white">RC</span>
              </div>
              <span className="text-lg font-semibold text-white">RockitCode</span>
            </div>
            <p className="max-w-xs mb-6 text-sm text-gray-400">
              A community-driven platform where learners teach learners through real projects and peer collaboration.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 transition-colors duration-200 hover:text-white"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="grid grid-cols-2 gap-8 lg:col-span-3 md:grid-cols-4">
            {navigation.map((section) => (
              <div key={section.name}>
                <h3 className="mb-4 text-sm font-medium text-white">{section.name}</h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
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
        <div className="pt-8 mt-12 border-t border-slate-800">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="mb-2 text-sm font-medium text-white">Stay updated</h3>
              <p className="max-w-md text-sm text-gray-400">
                Get the latest tutorials and community highlights delivered to your inbox.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="px-4 py-2 text-sm text-white border rounded bg-slate-900 border-slate-700 placeholder:text-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:w-64"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium text-white transition-colors duration-200 bg-blue-600 rounded hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col pt-6 mt-8 border-t border-slate-800 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">
            &copy; 2025 RockitCode. Built by the community, for the community.
          </p>
          <div className="flex mt-4 space-x-6 sm:mt-0">
            <Link href="/legal/privacy" className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-400">
              Privacy
            </Link>
            <Link href="/legal/terms" className="text-xs text-gray-500 transition-colors duration-200 hover:text-gray-400">
              Terms
            </Link>
          </div>
        </div>
        </div>
      </footer>
    </>
  )
}