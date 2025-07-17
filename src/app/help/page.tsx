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
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* Professional Help Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {renderIcon('help', 'w-16 h-16 text-blue-400')}
                <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl font-light mb-6 text-white tracking-wide">
              Mission Control Support Center
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
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
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-white mb-4">Need Help Right Now?</h2>
          <p className="text-slate-300 font-light">Choose the fastest way to get assistance</p>
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
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              )}
              
              <div className={`inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-r ${action.color} shadow-lg`}>
                {renderIcon(action.icon, 'w-6 h-6 text-white')}
              </div>
              
              <h3 className="text-lg font-light text-white mb-2 group-hover:text-blue-300 transition-colors">
                {action.title}
              </h3>
              
              <p className="text-sm text-slate-300 leading-relaxed">
                {action.description}
              </p>

              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span className="text-blue-400">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Help Categories */}
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-6 tracking-wide">
            Browse by Category
          </h2>
          <p className="text-xl text-slate-300 font-light">
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
              
              <h3 className="text-xl font-light text-white mb-3 group-hover:text-blue-300 transition-colors">
                {category.name}
              </h3>
              
              <p className="text-slate-300 mb-6 leading-relaxed">
                {category.description}
              </p>
              
              <div className="space-y-2">
                {category.articles.map((article, idx) => (
                  <Link
                    key={idx}
                    href={`/help/${category.id}/${article.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center text-sm text-slate-400 hover:text-blue-400 transition-colors duration-200 group/item"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity"></div>
                    {article}
                    <span className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                  </Link>
                ))}
              </div>
              
              <Link
                href={`/help/${category.id}`}
                className="inline-flex items-center mt-6 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                View all articles
                <span className="ml-1 transform group-hover:translate-x-1 transition-transform duration-200">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light text-white mb-6 tracking-wide">
            Most Helpful Articles
          </h2>
          <p className="text-xl text-slate-300 font-light">
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
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border border-blue-400/20">
                  {article.category}
                </span>
                <span className="text-xs text-slate-400">{article.readTime}</span>
              </div>
              
              <h3 className="text-lg font-light text-white mb-3 group-hover:text-blue-300 transition-colors duration-200">
                {article.title}
              </h3>
              
              <p className="text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                {article.description}
              </p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center text-slate-400">
                  {renderIcon('heart', 'w-4 h-4 mr-1 text-red-400')}
                  {article.helpful} found helpful
                </div>
                <span className="text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Read more →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Community Support CTA */}
      <div className="relative max-w-4xl mx-auto px-6 py-24">
        <div className="text-center">
          <div className="backdrop-blur-xl bg-white/[0.08] border border-white/[0.12] rounded-2xl p-12">
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                {renderIcon('users', 'w-8 h-8 text-white')}
              </div>
            </div>
            
            <h2 className="text-4xl font-light text-white mb-6 tracking-wide">
              Still Need Help?
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              Our community is here 24/7. Join thousands of helpful learners who are ready to assist you 
              on your coding journey.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://discord.gg/rockitcode"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 text-lg font-medium text-white shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105"
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
