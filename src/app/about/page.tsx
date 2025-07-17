'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('mission')

  const navigationItems = [
    { id: 'mission', label: 'Our Mission', icon: '🚀' },
    { id: 'difference', label: 'What Makes Us Different', icon: '⭐' },
    { id: 'portfolio', label: 'Living Portfolio Ecosystem', icon: '🏗️' },
    { id: 'philosophy', label: 'Student-First Philosophy', icon: '💡' },
    { id: 'future', label: 'Your Future', icon: '🌟' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="text-7xl animate-pulse">🚀</div>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              About RockitCode
            </h1>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              We don't just teach you to code. We build careers that last a lifetime.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20">
                <span className="text-blue-200 font-medium">Mission Control for Professional Developers</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-wrap justify-center gap-3">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Mission Section */}
        {activeSection === 'mission' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">🎯 Our Mission</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission Statement */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-blue-400/50 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">💝</div>
                  <h3 className="text-2xl font-bold text-white mb-4">It's Never About the Money</h3>
                </div>
                <div className="text-blue-100 space-y-4 leading-relaxed">
                  <p>
                    While other platforms focus on subscription revenue, we focus on your success. Our entire 
                    business model is built around <strong className="text-blue-300">helping you succeed</strong>, not extracting money from you.
                  </p>
                  <p>
                    We earn through professional tool partnerships only when you're ready to upgrade - 
                    because you've landed a job or built something amazing. Your success is our success.
                  </p>
                </div>
              </div>

              {/* Free Forever Promise */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:border-green-400/50 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="text-5xl mb-4">🆓</div>
                  <h3 className="text-2xl font-bold text-white mb-4">Free Forever Promise</h3>
                </div>
                <div className="text-blue-100 space-y-4 leading-relaxed">
                  <p>
                    No hidden fees. No premium tiers. No paywalls. <strong className="text-green-300">100% free education forever.</strong>
                  </p>
                  <p>
                    We believe access to quality coding education is a human right, not a privilege. 
                    Every lesson, every tool, every career resource - completely free.
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-300 mb-2">$200k+</div>
                  <div className="text-blue-100 text-sm">Free Professional Tools</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-300 mb-2">92%</div>
                  <div className="text-blue-100 text-sm">Mission Completion Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-300 mb-2">74%</div>
                  <div className="text-blue-100 text-sm">Job Placement Within 6 Months</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-300 mb-2">$67.5k</div>
                  <div className="text-blue-100 text-sm">Average Starting Salary</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* What Makes Us Different */}
        {activeSection === 'difference' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">⭐ What Makes Us Different</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Interactive from Day One */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-blue-400/50 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:animate-bounce">🎮</div>
                  <h3 className="text-xl font-bold text-white">Interactive from Day One</h3>
                </div>
                <div className="text-blue-100 text-sm space-y-2">
                  <p>• Live Git terminal simulation</p>
                  <p>• Real GitHub workflow practice</p>
                  <p>• Hands-on coding challenges</p>
                  <p>• No passive video watching</p>
                </div>
              </div>

              {/* GitHub-First Workflow */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-purple-400/50 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:animate-pulse">⚡</div>
                  <h3 className="text-xl font-bold text-white">GitHub-First Workflow</h3>
                </div>
                <div className="text-blue-100 text-sm space-y-2">
                  <p>• Professional tools from lesson 1</p>
                  <p>• Real version control practice</p>
                  <p>• Live portfolio deployment</p>
                  <p>• Industry-standard practices</p>
                </div>
              </div>

              {/* Mission-Driven Experience */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-pink-400/50 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:animate-spin">🚀</div>
                  <h3 className="text-xl font-bold text-white">Mission-Driven Experience</h3>
                </div>
                <div className="text-blue-100 text-sm space-y-2">
                  <p>• Space mission theme throughout</p>
                  <p>• Career launch preparation</p>
                  <p>• Mission control dashboard</p>
                  <p>• Achievement unlocking system</p>
                </div>
              </div>

              {/* AI-Powered Learning */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:animate-pulse">🤖</div>
                  <h3 className="text-xl font-bold text-white">AI-Powered Learning</h3>
                </div>
                <div className="text-blue-100 text-sm space-y-2">
                  <p>• Rockit AI assistant</p>
                  <p>• Personalized learning paths</p>
                  <p>• Smart hint system</p>
                  <p>• Adaptive difficulty</p>
                </div>
              </div>

              {/* Mobile-First Design */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-green-400/50 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:animate-bounce">📱</div>
                  <h3 className="text-xl font-bold text-white">Mobile-First Design</h3>
                </div>
                <div className="text-blue-100 text-sm space-y-2">
                  <p>• Learn anywhere, anytime</p>
                  <p>• Touch-friendly coding</p>
                  <p>• Offline capability</p>
                  <p>• Cross-device sync</p>
                </div>
              </div>

              {/* Community-Driven */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 hover:border-yellow-400/50 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3 group-hover:animate-pulse">👥</div>
                  <h3 className="text-xl font-bold text-white">Community-Driven</h3>
                </div>
                <div className="text-blue-100 text-sm space-y-2">
                  <p>• Peer learning system</p>
                  <p>• Code review exchange</p>
                  <p>• Study groups</p>
                  <p>• Mentor connections</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Living Portfolio Ecosystem */}
        {activeSection === 'portfolio' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">🏗️ Living Portfolio Ecosystem</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Traditional courses build throwaway projects. We build careers that evolve over 10+ years.
              </p>
            </div>

            <div className="space-y-8">
              {/* Three Core Projects */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-gradient-to-b from-blue-600/20 to-blue-800/20 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">👤</div>
                    <h3 className="text-2xl font-bold text-white">Personal Brand Hub</h3>
                    <p className="text-blue-200 mt-2">Your professional identity</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-green-300 font-medium text-sm">Foundation</div>
                      <div className="text-blue-100 text-sm">Beautiful static portfolio</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-yellow-300 font-medium text-sm">Intermediate</div>
                      <div className="text-blue-100 text-sm">Dynamic portfolio with CMS</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-red-300 font-medium text-sm">Advanced</div>
                      <div className="text-blue-100 text-sm">Enterprise-grade platform</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-purple-600/20 to-purple-800/20 backdrop-blur-md rounded-2xl p-8 border border-purple-400/30">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">💼</div>
                    <h3 className="text-2xl font-bold text-white">Business Solutions Platform</h3>
                    <p className="text-purple-200 mt-2">SaaS that grows with industry</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-green-300 font-medium text-sm">Foundation</div>
                      <div className="text-purple-100 text-sm">Task management interface</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-yellow-300 font-medium text-sm">Intermediate</div>
                      <div className="text-purple-100 text-sm">Multi-tenant SaaS app</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-red-300 font-medium text-sm">Advanced</div>
                      <div className="text-purple-100 text-sm">Enterprise SaaS platform</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-b from-pink-600/20 to-pink-800/20 backdrop-blur-md rounded-2xl p-8 border border-pink-400/30">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">🌟</div>
                    <h3 className="text-2xl font-bold text-white">Open Source Impact</h3>
                    <p className="text-pink-200 mt-2">Community contribution legacy</p>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-green-300 font-medium text-sm">Foundation</div>
                      <div className="text-pink-100 text-sm">Documentation contributions</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-yellow-300 font-medium text-sm">Intermediate</div>
                      <div className="text-pink-100 text-sm">Feature development</div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                      <div className="text-red-300 font-medium text-sm">Advanced</div>
                      <div className="text-pink-100 text-sm">Project maintainership</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Evolution Timeline */}
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-bold text-white text-center mb-8">Portfolio Evolution Timeline</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-green-600/20 rounded-lg border border-green-400/30">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                    <div>
                      <div className="font-bold text-white">Months 1-3: Foundation Launch</div>
                      <div className="text-green-200">Master HTML, CSS, JavaScript fundamentals with live projects</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-yellow-600/20 rounded-lg border border-yellow-400/30">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                    <div>
                      <div className="font-bold text-white">Year 1: Intermediate Orbit</div>
                      <div className="text-yellow-200">Full-stack development, React, Node.js, databases</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-red-600/20 rounded-lg border border-red-400/30">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                    <div>
                      <div className="font-bold text-white">Year 2-3: Advanced Deep Space</div>
                      <div className="text-red-200">Enterprise architecture, DevOps, AI integration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-purple-600/20 rounded-lg border border-purple-400/30">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">∞</div>
                    <div>
                      <div className="font-bold text-white">Lifetime: Continuous Evolution</div>
                      <div className="text-purple-200">AI features, performance optimizations, new technologies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Student-First Philosophy */}
        {activeSection === 'philosophy' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">💡 Student-First Philosophy</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                Every decision we make puts your success first, not our profits.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Why We're Different */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">🎯 Why Traditional Platforms Fail</h3>
                <div className="space-y-4">
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <div className="text-red-300 font-medium">❌ Profit-First Model</div>
                    <div className="text-red-100 text-sm mt-1">Extract maximum money from students</div>
                  </div>
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <div className="text-red-300 font-medium">❌ Throwaway Projects</div>
                    <div className="text-red-100 text-sm mt-1">Build projects that go nowhere</div>
                  </div>
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <div className="text-red-300 font-medium">❌ No Long-term Support</div>
                    <div className="text-red-100 text-sm mt-1">Course ends, support disappears</div>
                  </div>
                  <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
                    <div className="text-red-300 font-medium">❌ Passive Learning</div>
                    <div className="text-red-100 text-sm mt-1">Watch videos, copy code, forget everything</div>
                  </div>
                </div>
              </div>

              {/* Why We Succeed */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">✨ Why RockitCode Succeeds</h3>
                <div className="space-y-4">
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="text-green-300 font-medium">✅ Student Success Model</div>
                    <div className="text-green-100 text-sm mt-1">We only succeed when you succeed</div>
                  </div>
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="text-green-300 font-medium">✅ Living Portfolio Projects</div>
                    <div className="text-green-100 text-sm mt-1">Portfolio evolves with your career</div>
                  </div>
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="text-green-300 font-medium">✅ Lifetime Career Support</div>
                    <div className="text-green-100 text-sm mt-1">10+ years of continuous updates</div>
                  </div>
                  <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
                    <div className="text-green-300 font-medium">✅ Interactive from Day One</div>
                    <div className="text-green-100 text-sm mt-1">Hands-on practice with real tools</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Commitments */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white text-center mb-8">Our Commitments to You</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl mb-3">🤝</div>
                  <div className="font-bold text-white mb-2">Aligned Incentives</div>
                  <div className="text-blue-100 text-sm">Your career success drives our business success</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🎯</div>
                  <div className="font-bold text-white mb-2">Transparent Goals</div>
                  <div className="text-blue-100 text-sm">Every recommendation serves your career advancement</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🔄</div>
                  <div className="font-bold text-white mb-2">Continuous Evolution</div>
                  <div className="text-blue-100 text-sm">Your portfolio stays current with industry trends</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🌟</div>
                  <div className="font-bold text-white mb-2">Quality Focus</div>
                  <div className="text-blue-100 text-sm">Professional-grade projects from day one</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">💝</div>
                  <div className="font-bold text-white mb-2">Student-First Design</div>
                  <div className="text-blue-100 text-sm">Every feature designed for your learning success</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl mb-3">🚀</div>
                  <div className="font-bold text-white mb-2">Career Launch Ready</div>
                  <div className="text-blue-100 text-sm">Graduate with interview-ready portfolio</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Your Future */}
        {activeSection === 'future' && (
          <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">🌟 Your Future Starts Here</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            </div>

            {/* Success Stories Preview */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">📈</div>
                <div className="text-2xl font-bold text-green-400 mb-2">$67,500</div>
                <div className="text-blue-100">Average Starting Salary</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">⚡</div>
                <div className="text-2xl font-bold text-blue-400 mb-2">6 Months</div>
                <div className="text-blue-100">Average Time to Employment</div>
              </div>
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 text-center">
                <div className="text-4xl mb-4">🎯</div>
                <div className="text-2xl font-bold text-purple-400 mb-2">74%</div>
                <div className="text-blue-100">Job Placement Rate</div>
              </div>
            </div>

            {/* The RockitCode Promise */}
            <div className="bg-gradient-to-br from-blue-600/30 to-purple-600/30 backdrop-blur-md rounded-2xl p-12 border border-white/30 text-center">
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-3xl font-bold text-white mb-6">The RockitCode Promise</h3>
              <div className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
                "We don't just teach you to code. We help you build a career that evolves with technology 
                for the next decade and beyond. Your portfolio becomes your competitive advantage, 
                growing stronger every year."
              </div>
              <div className="space-y-4 text-blue-200 max-w-2xl mx-auto">
                <p>✨ <strong className="text-white">Free forever education</strong> - No hidden costs, no paywalls</p>
                <p>🏗️ <strong className="text-white">Living portfolio evolution</strong> - Projects that grow with your career</p>
                <p>🎯 <strong className="text-white">Professional tool mastery</strong> - Industry-standard workflows from day one</p>
                <p>🤝 <strong className="text-white">Lifetime career support</strong> - Community and resources that last</p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold text-white">Ready to Launch Your Career?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/launch-pad" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🚀 Begin Pre-Flight Check
                </Link>
                <Link 
                  href="/foundation" 
                  className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 border border-white/20 hover:border-white/40"
                >
                  📚 Explore Foundation Course
                </Link>
              </div>
              <p className="text-blue-200 text-sm max-w-md mx-auto">
                Join thousands of developers who've launched successful careers with RockitCode.
                Your future self will thank you.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
