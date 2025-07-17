'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('mission')

  const navigationItems = [
    { id: 'mission', label: 'Our Mission', icon: '🎯' },
    { id: 'difference', label: 'What Makes Us Different', icon: '⭐' },
    { id: 'portfolio', label: 'Living Portfolio Ecosystem', icon: '🏗️' },
    { id: 'philosophy', label: 'Student-First Philosophy', icon: '💡' },
    { id: 'future', label: 'Your Future', icon: '🌟' }
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
            {/* Professional About Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
              </div>
            </div>
            <h1 className="text-5xl font-light mb-6 text-white tracking-wide">
              Mission Control for Developer Careers
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
              We're not just another coding bootcamp. We're Mission Control for your developer career launch.
            </p>
            <div className="flex justify-center">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-700/50">
                <span className="text-slate-300 font-medium">Professional Development Command Center</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Pills */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-wrap justify-center gap-3">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-all duration-300 font-medium ${
                  activeSection === item.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-800/30 text-slate-400 hover:bg-slate-700/30 hover:text-slate-300 border border-slate-700/50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Mission Section */}
        {activeSection === 'mission' && (
          <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-white mb-6">Our Mission</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission Statement */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4">Success-First Philosophy</h3>
                </div>
                <div className="text-slate-300 space-y-4 leading-relaxed">
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
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-green-400/30 transition-all duration-300">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-4">Free Forever Promise</h3>
                </div>
                <div className="text-slate-300 space-y-4 leading-relaxed">
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
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-sm rounded-xl p-8 border border-slate-600/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-light text-blue-400 mb-2">$200k+</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wide">Free Professional Tools</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-purple-400 mb-2">92%</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wide">Mission Completion Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-green-400 mb-2">74%</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wide">Job Placement Within 6 Months</div>
                </div>
                <div>
                  <div className="text-3xl font-light text-amber-400 mb-2">$67.5k</div>
                  <div className="text-slate-400 text-sm uppercase tracking-wide">Average Starting Salary</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* What Makes Us Different */}
        {activeSection === 'difference' && (
          <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-white mb-6">What Makes Us Different</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Why No Videos? */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white">Why No Videos?</h3>
                </div>
                <div className="text-slate-300 text-sm space-y-2">
                  <p>• Quick concepts, current content</p>
                  <p>• Skip phone-reel saturation</p>
                  <p>• No outdated tutorials</p>
                  <p>• Apply immediately, not passively watch</p>
                </div>
              </div>

              {/* Why Multiple Technologies? */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-purple-400/30 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white">Why Multiple Technologies?</h3>
                </div>
                <div className="text-slate-300 text-sm space-y-2">
                  <p>• Real projects use technology stacks</p>
                  <p>• Portfolio projects from day one</p>
                  <p>• HTML + CSS + JavaScript + React + Deploy</p>
                  <p>• Industry-standard full-stack approach</p>
                </div>
              </div>

              {/* How Is This Free? */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-green-400/30 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white">How Is This Free?</h3>
                </div>
                <div className="text-slate-300 text-sm space-y-2">
                  <p>• Affiliate revenue transparency</p>
                  <p>• Your success = our success</p>
                  <p>• Professional tool partnerships</p>
                  <p>• No hidden fees, ever</p>
                </div>
              </div>

              {/* Launch Pad Living Projects */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white">Launch Pad Living Projects</h3>
                </div>
                <div className="text-slate-300 text-sm space-y-2">
                  <p>• Portfolio-worthy projects</p>
                  <p>• Mission Control guidance</p>
                  <p>• Real-world applications</p>
                  <p>• Career-focused outcomes</p>
                </div>
              </div>

              {/* Rock IT Skills */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-amber-400/30 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white">Rock IT Skills</h3>
                </div>
                <div className="text-slate-300 text-sm space-y-2">
                  <p>• Professional tools: Git, GitHub</p>
                  <p>• Deployment workflows</p>
                  <p>• AI-assisted development</p>
                  <p>• Industry-standard practices</p>
                </div>
              </div>

              {/* Code → Deploy → Succeed */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-indigo-400/30 transition-all duration-300 group">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-white">Code → Deploy → Succeed</h3>
                </div>
                <div className="text-slate-300 text-sm space-y-2">
                  <p>• Never learn in isolation</p>
                  <p>• Deploy while you learn</p>
                  <p>• Live portfolio building</p>
                  <p>• Immediate professional results</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Living Portfolio Ecosystem */}
        {activeSection === 'portfolio' && (
          <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-white mb-6">Living Portfolio Ecosystem</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Traditional courses build throwaway projects. We build careers that evolve over 10+ years.
              </p>
            </div>

            <div className="space-y-12">
              {/* Three Core Projects */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white">Personal Brand Hub</h3>
                    <p className="text-slate-400 mt-2">Your professional identity</p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                      <div className="text-green-400 font-medium text-sm">Foundation</div>
                      <div className="text-slate-300 text-sm">Beautiful static portfolio</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                      <div className="text-yellow-400 font-medium text-sm">Intermediate</div>
                      <div className="text-slate-300 text-sm">Dynamic portfolio with CMS</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                      <div className="text-red-400 font-medium text-sm">Advanced</div>
                      <div className="text-slate-300 text-sm">Enterprise-grade platform</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-purple-400/30 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                      <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v2" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white">Business Solutions Platform</h3>
                    <p className="text-slate-400 mt-2">SaaS that grows with industry</p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                      <div className="text-green-400 font-medium text-sm">Foundation</div>
                      <div className="text-slate-300 text-sm">Task management interface</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                      <div className="text-yellow-400 font-medium text-sm">Intermediate</div>
                      <div className="text-slate-300 text-sm">Multi-tenant SaaS app</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                      <div className="text-red-400 font-medium text-sm">Advanced</div>
                      <div className="text-slate-300 text-sm">Enterprise SaaS platform</div>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 hover:border-pink-400/30 transition-all duration-300">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                      <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white">Open Source Impact</h3>
                    <p className="text-slate-400 mt-2">Community contribution legacy</p>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                      <div className="text-green-400 font-medium text-sm">Foundation</div>
                      <div className="text-slate-300 text-sm">Documentation contributions</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                      <div className="text-yellow-400 font-medium text-sm">Intermediate</div>
                      <div className="text-slate-300 text-sm">Feature development</div>
                    </div>
                    <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600/30">
                      <div className="text-red-400 font-medium text-sm">Advanced</div>
                      <div className="text-slate-300 text-sm">Project maintainership</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Evolution Timeline */}
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
                <h3 className="text-2xl font-light text-white text-center mb-8">Portfolio Evolution Timeline</h3>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-green-400/30">
                    <div className="w-12 h-12 bg-green-500/20 border border-green-400 rounded-full flex items-center justify-center text-green-400 font-semibold">1</div>
                    <div>
                      <div className="font-medium text-white">Months 1-3: Foundation Launch</div>
                      <div className="text-slate-300">Master HTML, CSS, JavaScript fundamentals with live projects</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-yellow-400/30">
                    <div className="w-12 h-12 bg-yellow-500/20 border border-yellow-400 rounded-full flex items-center justify-center text-yellow-400 font-semibold">2</div>
                    <div>
                      <div className="font-medium text-white">Year 1: Intermediate Orbit</div>
                      <div className="text-slate-300">Full-stack development, React, Node.js, databases</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-red-400/30">
                    <div className="w-12 h-12 bg-red-500/20 border border-red-400 rounded-full flex items-center justify-center text-red-400 font-semibold">3</div>
                    <div>
                      <div className="font-medium text-white">Year 2-3: Advanced Deep Space</div>
                      <div className="text-slate-300">Enterprise architecture, DevOps, AI integration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-purple-400/30">
                    <div className="w-12 h-12 bg-purple-500/20 border border-purple-400 rounded-full flex items-center justify-center text-purple-400 font-semibold">∞</div>
                    <div>
                      <div className="font-medium text-white">Lifetime: Continuous Evolution</div>
                      <div className="text-slate-300">AI features, performance optimizations, new technologies</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Student-First Philosophy */}
        {activeSection === 'philosophy' && (
          <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-white mb-6">Student-First Philosophy</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Every decision we make puts your success first, not our profits.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Why We're Different */}
              <div className="space-y-8">
                <h3 className="text-2xl font-medium text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  Why Traditional Platforms Fail
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-800/30 border border-red-400/20 rounded-lg p-4">
                    <div className="text-red-300 font-medium">Profit-First Model</div>
                    <div className="text-slate-300 text-sm mt-1">Extract maximum money from students</div>
                  </div>
                  <div className="bg-slate-800/30 border border-red-400/20 rounded-lg p-4">
                    <div className="text-red-300 font-medium">Throwaway Projects</div>
                    <div className="text-slate-300 text-sm mt-1">Build projects that go nowhere</div>
                  </div>
                  <div className="bg-slate-800/30 border border-red-400/20 rounded-lg p-4">
                    <div className="text-red-300 font-medium">No Long-term Support</div>
                    <div className="text-slate-300 text-sm mt-1">Course ends, support disappears</div>
                  </div>
                  <div className="bg-slate-800/30 border border-red-400/20 rounded-lg p-4">
                    <div className="text-red-300 font-medium">Passive Learning</div>
                    <div className="text-slate-300 text-sm mt-1">Watch videos, copy code, forget everything</div>
                  </div>
                </div>
              </div>

              {/* Why We Succeed */}
              <div className="space-y-8">
                <h3 className="text-2xl font-medium text-white mb-6 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Why RockitCode Succeeds
                </h3>
                <div className="space-y-4">
                  <div className="bg-slate-800/30 border border-green-400/20 rounded-lg p-4">
                    <div className="text-green-400 font-medium">Student Success Model</div>
                    <div className="text-slate-300 text-sm mt-1">We only succeed when you succeed</div>
                  </div>
                  <div className="bg-slate-800/30 border border-green-400/20 rounded-lg p-4">
                    <div className="text-green-400 font-medium">Living Portfolio Projects</div>
                    <div className="text-slate-300 text-sm mt-1">Portfolio evolves with your career</div>
                  </div>
                  <div className="bg-slate-800/30 border border-green-400/20 rounded-lg p-4">
                    <div className="text-green-400 font-medium">Lifetime Career Support</div>
                    <div className="text-slate-300 text-sm mt-1">10+ years of continuous updates</div>
                  </div>
                  <div className="bg-slate-800/30 border border-green-400/20 rounded-lg p-4">
                    <div className="text-green-400 font-medium">Interactive from Day One</div>
                    <div className="text-slate-300 text-sm mt-1">Hands-on practice with real tools</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Commitments */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50">
              <h3 className="text-2xl font-light text-white text-center mb-8">Our Commitments to You</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                    </svg>
                  </div>
                  <div className="font-medium text-white mb-2">Aligned Incentives</div>
                  <div className="text-slate-300 text-sm">Your career success drives our business success</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="font-medium text-white mb-2">Transparent Goals</div>
                  <div className="text-slate-300 text-sm">Every recommendation serves your career advancement</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div className="font-medium text-white mb-2">Continuous Evolution</div>
                  <div className="text-slate-300 text-sm">Your portfolio stays current with industry trends</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <div className="font-medium text-white mb-2">Quality Focus</div>
                  <div className="text-slate-300 text-sm">Professional-grade projects from day one</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="font-medium text-white mb-2">Student-First Design</div>
                  <div className="text-slate-300 text-sm">Every feature designed for your learning success</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                    <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="font-medium text-white mb-2">Career Launch Ready</div>
                  <div className="text-slate-300 text-sm">Graduate with interview-ready portfolio</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Your Future */}
        {activeSection === 'future' && (
          <div className="space-y-16 animate-in slide-in-from-bottom-8 duration-700">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-light text-white mb-6">Your Future Starts Here</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            </div>

            {/* Success Stories Preview */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="text-2xl font-light text-green-400 mb-2">$67,500</div>
                <div className="text-slate-300">Average Starting Salary</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-2xl font-light text-blue-400 mb-2">6 Months</div>
                <div className="text-slate-300">Average Time to Employment</div>
              </div>
              <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="text-2xl font-light text-purple-400 mb-2">74%</div>
                <div className="text-slate-300">Job Placement Rate</div>
              </div>
            </div>

            {/* The RockitCode Promise */}
            <div className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
                <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-3xl font-light text-white mb-6">The RockitCode Promise</h3>
              <div className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
                "We don't just teach you to code. We help you build a career that evolves with technology 
                for the next decade and beyond. Your portfolio becomes your competitive advantage, 
                growing stronger every year."
              </div>
              <div className="space-y-4 text-slate-300 max-w-2xl mx-auto">
                <p className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span><strong className="text-white">Free forever education</strong> - No hidden costs, no paywalls</span>
                </p>
                <p className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h4a1 1 0 011 1v5m-6 0V9a1 1 0 011-1h4a1 1 0 011 1v2" />
                  </svg>
                  <span><strong className="text-white">Living portfolio evolution</strong> - Projects that grow with your career</span>
                </p>
                <p className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span><strong className="text-white">Professional tool mastery</strong> - Industry-standard workflows from day one</span>
                </p>
                <p className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span><strong className="text-white">Lifetime career support</strong> - Community and resources that last</span>
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-light text-white">Ready to Launch Your Career?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link 
                  href="/launch-pad" 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Begin Pre-Flight Check
                </Link>
                <Link 
                  href="/foundation" 
                  className="bg-slate-800/50 hover:bg-slate-700/50 text-white font-medium py-3 px-8 rounded-lg transition-all duration-300 border border-slate-600/50 hover:border-slate-500/50"
                >
                  Explore Foundation Course
                </Link>
              </div>
              <p className="text-slate-400 text-sm max-w-md mx-auto">
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
