'use client'

import { useState } from 'react'
import Link from 'next/link'
import { renderIcon } from '@/components/icons'

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const helpCategories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: 'rocket',
      color: 'from-green-400 to-emerald-500',
      description: 'New to coding? Start here for the basics.',
      articles: [
        'Setting up VS Code',
        'Creating your first GitHub account',
        'Understanding the command line',
        'Your first HTML page'
      ]
    },
    {
      id: 'technical-issues',
      name: 'Technical Issues',
      icon: 'wrench',
      color: 'from-red-400 to-pink-500',
      description: 'Troubleshoot common technical problems.',
      articles: [
        'Git command not found',
        'VS Code extensions not working',
        'Node.js installation issues',
        'Browser developer tools guide'
      ]
    },
    {
      id: 'learning-path',
      name: 'Learning Path',
      icon: 'map',
      color: 'from-blue-400 to-cyan-500',
      description: 'Navigate your coding journey effectively.',
      articles: [
        'Which course should I take first?',
        'How to build a portfolio',
        'Job-ready skills checklist',
        'Interview preparation guide'
      ]
    },
    {
      id: 'community',
      name: 'Community Help',
      icon: 'users',
      color: 'from-purple-400 to-pink-500',
      description: 'Get help from fellow learners.',
      articles: [
        'How to ask good questions',
        'Discord server guide',
        'Code review guidelines',
        'Mentorship program'
      ]
    }
  ]

  const quickActions = [
    {
      title: 'Ask the Community',
      description: 'Get help from thousands of fellow learners on Discord',
      icon: 'discord',
      href: 'https://discord.gg/rockitcode',
      color: 'from-purple-500 to-indigo-500',
      urgent: true
    },
    {
      title: 'GitHub Discussions',
      description: 'Browse course-specific questions and solutions',
      icon: 'chat',
      href: 'https://github.com/topwebworks/nextjs-rockitcode/discussions',
      color: 'from-gray-500 to-slate-600'
    },
    {
      title: 'Community FAQ',
      description: 'Most common questions answered by peers',
      icon: 'star',
      href: '/help/faq',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Study Groups',
      description: 'Join live coding sessions and peer study groups',
      icon: 'users',
      href: '/help/study-groups',
      color: 'from-blue-500 to-cyan-500'
    }
  ]

  const featuredArticles = [
    {
      title: 'Complete VS Code Setup for Beginners',
      description: 'Everything you need to know to set up your coding environment',
      readTime: '8 min read',
      helpful: 234,
      category: 'Getting Started'
    },
    {
      title: 'How to Get Unstuck When Coding',
      description: 'Proven strategies used by professional developers',
      readTime: '5 min read',
      helpful: 189,
      category: 'Learning Path'
    },
    {
      title: 'Building Your First Portfolio Project',
      description: 'Step-by-step guide to showcase your skills',
      readTime: '12 min read',
      helpful: 156,
      category: 'Learning Path'
    }
  ]

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
            {/* Professional Help Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {renderIcon('help', 'w-16 h-16 text-blue-400')}
                <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
              </div>
            </div>
            <h1 className="mb-6 text-5xl font-light tracking-wide text-white">
              Mission Control Support Center
            </h1>
            <p className="max-w-3xl mx-auto mb-8 text-xl font-light leading-relaxed text-slate-300">
              Find answers, get community support, or dive into our comprehensive guides. 
              Our community-driven help system ensures you're never stuck for long.
            </p>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                {renderIcon('search', 'absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400')}
                <input
                  type="text"
                  placeholder="Search for help articles, guides, or tutorials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:bg-white/[0.12] transition-all duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative px-6 py-16 mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-light text-white">Need Help Right Now?</h2>
          <p className="font-light text-slate-300">Choose the fastest way to get assistance</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Link
              key={action.title}
              href={action.href}
              className={`relative group backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl p-6 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 transform hover:scale-105 ${
                action.urgent ? 'ring-1 ring-yellow-400/50' : ''
              }`}
            >
              {action.urgent && (
                <div className="absolute w-3 h-3 bg-yellow-400 rounded-full -top-1 -right-1 animate-pulse"></div>
              )}
              
              <div className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-r ${action.color} shadow-lg`}>
                {renderIcon(action.icon, 'w-6 h-6 text-white')}
              </div>
              
              <h3 className="mb-2 text-lg font-light text-white transition-colors group-hover:text-blue-300">
                {action.title}
              </h3>
              
              <p className="text-sm leading-relaxed text-slate-300">
                {action.description}
              </p>

              <div className="absolute transition-opacity duration-200 opacity-0 top-4 right-4 group-hover:opacity-100">
                <span className="text-blue-400">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* GitHub Copilot - Primary Coding Support */}
      <div className="relative px-6 py-16 mx-auto max-w-7xl">
        <div className="p-8 border backdrop-blur-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-400/20 rounded-2xl lg:p-12">
          <div className="flex items-start gap-8 mb-8">
            <div className="flex-shrink-0">
              <div className="p-4 bg-green-500/20 rounded-xl">
                {renderIcon('robot', 'w-10 h-10 text-green-400')}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-light tracking-wide text-white">
                  GitHub Copilot - Your AI Coding Partner
                </h2>
                <span className="px-3 py-1 text-sm font-medium text-green-300 rounded-full bg-green-500/20">
                  Recommended
                </span>
              </div>
              <p className="mb-8 text-xl leading-relaxed text-slate-300">
                Our #1 recommended coding support tool. GitHub Copilot provides instant, intelligent assistance 
                for developers at every level - available 24/7 right in your code editor.
              </p>
            </div>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="flex items-center gap-2 mb-6 text-xl font-light text-white">
                {renderIcon('star', 'w-5 h-5 text-yellow-400')}
                Why We Recommend Copilot
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <div>
                    <span className="font-medium text-white">Instant Help:</span>
                    <span className="ml-2 text-slate-300">Get coding assistance 24/7 without waiting for forum responses</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <div>
                    <span className="font-medium text-white">Learn By Example:</span>
                    <span className="ml-2 text-slate-300">See well-structured code patterns and best practices in real-time</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <div>
                    <span className="font-medium text-white">Context Aware:</span>
                    <span className="ml-2 text-slate-300">Understands your project and provides relevant suggestions</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('check', 'w-5 h-5 text-green-400 mt-0.5 flex-shrink-0')}
                  <div>
                    <span className="font-medium text-white">Productivity Boost:</span>
                    <span className="ml-2 text-slate-300">Write code faster while learning new techniques</span>
                  </div>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="flex items-center gap-2 mb-6 text-xl font-light text-white">
                {renderIcon('lightbulb', 'w-5 h-5 text-yellow-400')}
                Best Practices & Important Notes
              </h3>
              
              <div className="p-4 mb-6 border rounded-lg bg-yellow-500/10 border-yellow-500/30">
                <p className="text-sm leading-relaxed text-yellow-200">
                  <strong>⚠️ Tool, Not Replacement:</strong> Copilot is your coding assistant, not a substitute 
                  for understanding fundamentals. Always review and understand the code it suggests.
                </p>
              </div>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  {renderIcon('lightbulb', 'w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0')}
                  <span className="text-slate-300">Great for learning new syntax and language patterns</span>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('lightbulb', 'w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0')}
                  <span className="text-slate-300">Excellent for boilerplate code and repetitive tasks</span>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('lightbulb', 'w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0')}
                  <span className="text-slate-300">Most effective when combined with human mentorship</span>
                </li>
                <li className="flex items-start gap-3">
                  {renderIcon('lightbulb', 'w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0')}
                  <span className="text-slate-300">Perfect complement to our Discord community support</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 mt-8 border-t border-white/10">
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="https://github.com/features/copilot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 font-medium text-white transition-colors duration-200 bg-green-600 rounded-lg hover:bg-green-700"
              >
                {renderIcon('rocket', 'w-5 h-5 mr-2')}
                Get GitHub Copilot
              </Link>
              <Link
                href="https://docs.github.com/en/copilot"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-white transition-colors duration-200 border rounded-lg bg-white/10 hover:bg-white/20 border-white/20"
              >
                {renderIcon('book', 'w-5 h-5 mr-2')}
                View Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Help Categories */}
      <div className="relative px-6 py-24 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-light tracking-wide text-white">
            Browse by Category
          </h2>
          <p className="text-xl font-light text-slate-300">
            Find detailed guides and tutorials organized by topic
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {helpCategories.map((category, index) => (
            <div 
              key={category.id}
              className="group backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl p-8 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-gradient-to-r ${category.color} shadow-lg`}>
                {renderIcon(category.icon, 'w-6 h-6 text-white')}
              </div>
              
              <h3 className="mb-3 text-xl font-light text-white transition-colors group-hover:text-blue-300">
                {category.name}
              </h3>
              
              <p className="mb-6 leading-relaxed text-slate-300">
                {category.description}
              </p>
              
              <div className="space-y-2">
                {category.articles.map((article, idx) => (
                  <Link
                    key={idx}
                    href={`/help/${category.id}/${article.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center text-sm transition-colors duration-200 text-slate-400 hover:text-blue-400 group/item"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                    {article}
                    <span className="ml-auto transition-opacity opacity-0 group-hover/item:opacity-100">→</span>
                  </Link>
                ))}
              </div>
              
              <Link
                href={`/help/${category.id}`}
                className="inline-flex items-center mt-6 text-sm font-medium text-blue-400 transition-colors duration-200 hover:text-blue-300"
              >
                View all articles
                <span className="ml-1 transition-transform duration-200 transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      <div className="relative px-6 py-24 mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-4xl font-light tracking-wide text-white">
            Most Helpful Articles
          </h2>
          <p className="text-xl font-light text-slate-300">
            Top-rated content from our community-driven knowledge base
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {featuredArticles.map((article, index) => (
            <Link
              key={article.title}
              href={`/help/article/${article.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="group backdrop-blur-xl bg-white/[0.06] border border-white/[0.1] rounded-xl p-6 hover:bg-white/[0.1] hover:border-white/[0.2] transition-all duration-300 transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center px-3 py-1 text-xs font-medium text-blue-300 border rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/20">
                  {article.category}
                </span>
                <span className="text-xs text-slate-400">{article.readTime}</span>
              </div>
              
              <h3 className="mb-3 text-lg font-light text-white transition-colors duration-200 group-hover:text-blue-300">
                {article.title}
              </h3>
              
              <p className="mb-4 leading-relaxed text-slate-300 line-clamp-2">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-400">
                  {renderIcon('heart', 'w-4 h-4 mr-1 text-red-400')}
                  {article.helpful} found helpful
                </div>
                <span className="text-blue-400 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Community Support CTA */}
      <div className="relative max-w-4xl px-6 py-24 mx-auto">
        <div className="text-center">
          <div className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] rounded-2xl p-12">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500">
                {renderIcon('users', 'w-8 h-8 text-white')}
              </div>
            </div>
            
            <h2 className="mb-6 text-4xl font-light tracking-wide text-white">
              Still Need Help?
            </h2>
            
            <p className="max-w-2xl mx-auto mb-8 text-xl font-light leading-relaxed text-slate-300">
              Our community is here 24/7. Join thousands of helpful learners who are ready to assist you 
              on your coding journey.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://discord.gg/rockitcode"
                className="inline-flex items-center px-8 py-4 text-lg font-medium text-white transition-all duration-200 transform rounded-lg shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 hover:scale-105"
              >
                {renderIcon('discord', 'w-6 h-6 mr-3')}
                Ask on Discord
              </Link>
              
              <Link
                href="/community"
                className="inline-flex items-center rounded-lg backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] px-8 py-4 text-lg font-medium text-slate-300 hover:text-white hover:border-white/[0.2] transition-all duration-200"
              >
                {renderIcon('users', 'w-6 h-6 mr-3')}
                Visit Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
