'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { renderIcon } from '@/components/icons'

export default function CommunityPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [stats, setStats] = useState({
    members: 2847,
    questionsAnswered: 12420,
    projectsShared: 890,
    successStories: 156
  })

  // Mouse tracking for cursor light effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const communityFeatures = [
    {
      icon: 'discord',
      title: "Discord Server",
      description: "Real-time chat, voice channels, and instant help from peers worldwide.",
      href: "https://discord.gg/rockitcode",
      color: "from-purple-500 to-pink-500",
      stats: "2,800+ members"
    },
    {
      icon: 'chat',
      title: "Study Groups",
      description: "Join focused groups working on the same projects and challenges.",
      href: "/community/study-groups",
      color: "from-blue-500 to-cyan-500",
      stats: "45+ active groups"
    },
    {
      icon: 'trophy',
      title: "Code Reviews",
      description: "Get feedback on your code from experienced community members.",
      href: "/community/code-reviews",
      color: "from-yellow-500 to-orange-500",
      stats: "1,200+ reviews done"
    },
    {
      icon: 'rocket',
      title: "Project Showcase",
      description: "Share your creations and get inspired by others' amazing projects.",
      href: "/community/showcase",
      color: "from-green-500 to-emerald-500",
      stats: "890+ projects shared"
    },
    {
      icon: 'star',
      title: "Success Stories",
      description: "Read about community members who landed their dream jobs.",
      href: "/community/success-stories",
      color: "from-indigo-500 to-purple-500",
      stats: "156+ job placements"
    },
    {
      icon: 'heart',
      title: "Mentorship",
      description: "Connect with mentors or become one yourself to help others.",
      href: "/community/mentorship",
      color: "from-pink-500 to-rose-500",
      stats: "200+ mentor matches"
    }
  ]

  const gamificationFeatures = [
    {
      icon: 'shield',
      title: "Helper Badges",
      description: "Earn recognition for helping fellow learners",
      badges: ["First Helper", "Problem Solver", "Code Reviewer", "Mentor"]
    },
    {
      icon: 'lightning',
      title: "XP Points",
      description: "Gain experience points for community participation",
      activities: ["Answer questions", "Share projects", "Review code", "Help beginners"]
    },
    {
      icon: 'trophy',
      title: "Leaderboards",
      description: "See top contributors and celebrate community heroes",
      categories: ["Most Helpful", "Best Projects", "Active Mentor", "Rising Star"]
    }
  ]

  const communityRules = [
    {
      icon: 'heart',
      title: "Be Kind & Supportive",
      description: "Everyone was a beginner once. Treat others with respect and patience."
    },
    {
      icon: 'chat',
      title: "Share Knowledge Freely",
      description: "Help others learn by sharing your experiences and solutions."
    },
    {
      icon: 'check',
      title: "Quality over Quantity",
      description: "Focus on providing helpful, detailed answers rather than quick responses."
    },
    {
      icon: 'users',
      title: "Celebrate Success",
      description: "Cheer on others' achievements and share your own wins with the community."
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

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-800/30 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            {/* Professional Community Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                {renderIcon('users', "w-16 h-16 text-blue-400")}
                <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
              </div>
            </div>
            
            <h1 className="text-5xl font-light mb-6 text-white tracking-wide">
              Where <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Learners</span>
              <br />
              Teach <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">Learners</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-8 font-light">
              Join a vibrant community where coding knowledge flows freely. Get help when you're stuck, 
              share your victories, and help others on their journey. Because the best way to learn is together.
            </p>

            <div className="flex justify-center">
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl px-6 py-3 border border-slate-700/50">
                <span className="text-slate-300 font-medium">Community-Powered Learning Network</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
              <Link
                href="https://discord.gg/rockitcode"
                className="group inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:from-purple-700 hover:to-pink-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all duration-200 transform hover:scale-105"
              >
                {renderIcon('discord', "w-5 h-5 mr-2")}
                Join Discord Server
                <span className="ml-2 opacity-75 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
              
              <Link
                href="#features"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white/10 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-gray-300 hover:text-white hover:border-gray-200 transition-all duration-200"
              >
                Explore Features
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Community Stats */}
      <section className="relative px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Active Members", value: stats.members.toLocaleString(), icon: 'users' },
              { label: "Questions Answered", value: stats.questionsAnswered.toLocaleString(), icon: 'chat' },
              { label: "Projects Shared", value: stats.projectsShared.toLocaleString(), icon: 'rocket' },
              { label: "Success Stories", value: stats.successStories.toLocaleString(), icon: 'trophy' }
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-lg">
                  {renderIcon(stat.icon, "w-6 h-6 text-blue-400")}
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section id="features" className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6">
              Community-Powered Support
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Experience support that never sleeps. Our global community provides help, encouragement, 
              and expertise around the clock.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {communityFeatures.map((feature, index) => (
              <Link 
                key={feature.title}
                href={feature.href}
                className="group relative bg-white/[0.08] backdrop-blur-xl rounded-xl p-8 border border-white/[0.12] hover:bg-white/[0.12] hover:border-white/[0.2] transition-all duration-300 transform hover:scale-[1.02] shadow-xl"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-gradient-to-r ${feature.color} shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                  {renderIcon(feature.icon, "w-6 h-6 text-white")}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="text-sm text-blue-400 font-medium">
                  {feature.stats}
                </div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span className="text-blue-400">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6">
              Earn Recognition for Helping Others
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              Our gamification system rewards community members who go above and beyond to help others succeed.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {gamificationFeatures.map((feature, index) => (
              <div key={feature.title} className="bg-white/[0.08] backdrop-blur-xl rounded-xl p-8 border border-white/[0.12] shadow-xl">
                <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                  {renderIcon(feature.icon, "w-6 h-6 text-white")}
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-slate-300 mb-6">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {(feature.badges || feature.activities || feature.categories)?.map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-3"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-white mb-6">
              Our Community Values
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light">
              These principles guide our community and help create a supportive environment for everyone.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {communityRules.map((rule, index) => (
              <div key={rule.title} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-lg">
                  {renderIcon(rule.icon, "w-8 h-8 text-green-400")}
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-3">
                  {rule.title}
                </h3>
                
                <p className="text-slate-300 text-sm leading-relaxed">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-white/[0.06] backdrop-blur-xl rounded-2xl border border-white/[0.1] p-12 shadow-2xl">
            <h2 className="text-4xl font-light text-white mb-6">
              Ready to Join Our Community?
            </h2>
            
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              Start your coding journey with thousands of supportive peers. Ask questions, share projects, 
              and help others while building your skills.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="https://discord.gg/rockitcode"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-semibold text-white shadow-lg hover:from-purple-700 hover:to-pink-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all duration-200 transform hover:scale-105"
              >
                {renderIcon('discord', "w-6 h-6 mr-3")}
                Join Discord Now
              </Link>
              
              <Link
                href="/learn"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold text-gray-300 hover:text-white hover:border-gray-200 transition-all duration-200"
              >
                {renderIcon('rocket', "w-6 h-6 mr-3")}
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
