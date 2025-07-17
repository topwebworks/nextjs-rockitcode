'use client'

import { useState } from 'react'
import Link from 'next/link'
import { 
  HelpIcon, 
  DiscordIcon, 
  UsersIcon, 
  ChatIcon, 
  SearchIcon, 
  BookIcon,
  LightningIcon,
  StarIcon,
  CheckIcon,
  HeartIcon,
  RocketIcon, 
  WrenchIcon, 
  MapIcon
} from '../../components/icons'

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const helpCategories = [
    {
      id: 'getting-started',
      name: 'Getting Started',
      icon: RocketIcon,
      color: 'from-green-500 to-emerald-500',
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
      icon: WrenchIcon,
      color: 'from-red-500 to-pink-500',
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
      icon: MapIcon,
      color: 'from-blue-500 to-cyan-500',
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
      icon: UsersIcon,
      color: 'from-purple-500 to-pink-500',
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
      icon: DiscordIcon,
      href: 'https://discord.gg/rockitcode',
      color: 'bg-purple-600 hover:bg-purple-700',
      urgent: true
    },
    {
      title: 'GitHub Discussions',
      description: 'Browse course-specific questions and solutions',
      icon: ChatIcon,
      href: 'https://github.com/topwebworks/nextjs-rockitcode/discussions',
      color: 'bg-gray-600 hover:bg-gray-700'
    },
    {
      title: 'Community FAQ',
      description: 'Most common questions answered by peers',
      icon: StarIcon,
      href: '/help/faq',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Study Groups',
      description: 'Join live coding sessions and peer study groups',
      icon: UsersIcon,
      href: '/help/study-groups',
      color: 'bg-blue-600 hover:bg-blue-700'
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
      </div>

      {/* Header */}
      <section className="relative px-6 pt-20 pb-16 sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-xl">
            <HelpIcon className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Help <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Center</span>
          </h1>
          
          <p className="mt-6 text-lg leading-8 text-gray-300 max-w-2xl mx-auto">
            Find answers, get community support, or dive into our comprehensive guides. 
            Our community-driven help system ensures you're never stuck for long.
          </p>

          {/* Search Bar */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for help articles, guides, or tutorials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-gray-700/50 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="relative px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Need Help Right Now?</h2>
            <p className="text-gray-300">Choose the fastest way to get assistance</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action, index) => (
              <Link
                key={action.title}
                href={action.href}
                className={`relative group rounded-xl ${action.color} p-6 text-white transition-all duration-200 transform hover:scale-105 ${
                  action.urgent ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
                }`}
              >
                {action.urgent && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                )}
                
                <action.icon className="w-8 h-8 mb-4" />
                
                <h3 className="text-lg font-semibold mb-2">
                  {action.title}
                </h3>
                
                <p className="text-sm opacity-90">
                  {action.description}
                </p>

                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-white/80">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Browse by Category
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Find detailed guides and tutorials organized by topic
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
            {helpCategories.map((category, index) => (
              <div 
                key={category.id}
                className="group rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700/50 p-8 hover:bg-white/10 hover:border-gray-600/50 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-gradient-to-r ${category.color} shadow-lg`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {category.name}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {category.description}
                </p>
                
                <div className="space-y-2">
                  {category.articles.map((article, idx) => (
                    <Link
                      key={idx}
                      href={`/help/${category.id}/${article.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200 group/item"
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
      </section>

      {/* Featured Articles */}
      <section className="relative px-6 py-24 bg-gradient-to-r from-purple-900/20 to-pink-900/20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Most Helpful Articles
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Top-rated content from our community-driven knowledge base
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {featuredArticles.map((article, index) => (
              <Link
                key={article.title}
                href={`/help/article/${article.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="group rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700/50 p-6 hover:bg-white/10 hover:border-gray-600/50 transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-600/20 text-blue-400">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime}</span>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200">
                  {article.title}
                </h3>
                
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {article.description}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-gray-400">
                    <HeartIcon className="w-4 h-4 mr-1 text-red-400" />
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
      </section>

      {/* Community Support CTA */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl bg-gradient-to-r from-purple-900/50 to-pink-900/50 backdrop-blur-sm border border-purple-500/20 p-12">
            <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
              <UsersIcon className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-6">
              Still Need Help?
            </h2>
            
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Our community is here 24/7. Join thousands of helpful learners who are ready to assist you 
              on your coding journey.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://discord.gg/rockitcode"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 transform hover:scale-105"
              >
                <DiscordIcon className="w-6 h-6 mr-3" />
                Ask on Discord
              </Link>
              
              <Link
                href="/community"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-gray-300 hover:text-white hover:border-gray-200 transition-all duration-200"
              >
                <UsersIcon className="w-6 h-6 mr-3" />
                Visit Community
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
