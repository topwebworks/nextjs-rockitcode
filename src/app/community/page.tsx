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



      {/* Discord Community Mission */}
      <section className="relative px-6 py-24 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-indigo-900/10 to-blue-900/10"></div>
        <div className="relative mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              {renderIcon('discord', "w-16 h-16 text-purple-400")}
            </div>
            <h2 className="text-4xl font-light text-white mb-6">
              Discord Community Mission
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-blue-400 mx-auto mb-8"></div>
            <p className="text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed font-light">
              Our Discord server is designed to be a self-sustaining ecosystem where every member contributes to collective growth. 
              Here's the awesome why you'll find and how our structured mentorship creates lasting connections.
            </p>
          </div>

          {/* Mission Core Values */}
          <div className="grid gap-8 lg:grid-cols-3 mb-16">
            <div className="bg-white/[0.08] backdrop-blur-xl rounded-xl p-8 border border-white/[0.12] shadow-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 shadow-lg">
                {renderIcon('users', "w-6 h-6 text-white")}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Learning Together</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                Every question is welcomed, every success celebrated. Our community believes that explaining concepts to others 
                deepens your own understanding while helping fellow learners overcome obstacles.
              </p>
              <div className="text-purple-400 font-medium text-sm">
                "Teaching is the best way to learn" - Community Principle
              </div>
            </div>

            <div className="bg-white/[0.08] backdrop-blur-xl rounded-xl p-8 border border-white/[0.12] shadow-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg">
                {renderIcon('rocket', "w-6 h-6 text-white")}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Growth Through Action</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                We encourage project sharing, code reviews, and collaborative problem-solving. Real learning happens when 
                you apply knowledge and receive constructive feedback from peers who understand the journey.
              </p>
              <div className="text-blue-400 font-medium text-sm">
                "Code together, grow together" - Community Motto
              </div>
            </div>

            <div className="bg-white/[0.08] backdrop-blur-xl rounded-xl p-8 border border-white/[0.12] shadow-xl">
              <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg">
                {renderIcon('heart', "w-6 h-6 text-white")}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">Respectful Environment</h3>
              <p className="text-slate-300 leading-relaxed mb-4">
                We maintain a welcoming space where everyone feels safe to ask questions, share struggles, and celebrate 
                wins. Patience, kindness, and constructive communication are the foundation of our interactions.
              </p>
              <div className="text-green-400 font-medium text-sm">
                "Kindness scales infinitely" - Community Value
              </div>
            </div>
          </div>

          {/* Channel Structure */}
          <div className="mb-16">
            <h3 className="text-3xl font-light text-white mb-8 text-center">Smart Channel Organization</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  category: "Learning Channels",
                  color: "from-blue-500 to-cyan-500",
                  channels: [
                    { name: "🤔 help-general", purpose: "Quick questions and general coding help" },
                    { name: "💡 help-specific", purpose: "Detailed debugging and complex problems" },
                    { name: "📚 resources-share", purpose: "Useful tutorials, tools, and learning materials" },
                    { name: "🎯 daily-goals", purpose: "Share learning objectives and progress updates" }
                  ]
                },
                {
                  category: "Project Channels",
                  color: "from-purple-500 to-pink-500",
                  channels: [
                    { name: "🚀 project-showcase", purpose: "Show off completed projects and get feedback" },
                    { name: "🔧 work-in-progress", purpose: "Share ongoing projects and collaborate" },
                    { name: "👥 find-team", purpose: "Connect with others for group projects" },
                    { name: "💼 portfolio-review", purpose: "Get feedback on portfolios and resumes" }
                  ]
                },
                {
                  category: "Community Channels",
                  color: "from-green-500 to-emerald-500",
                  channels: [
                    { name: "🎉 celebrations", purpose: "Share wins, job offers, and milestones" },
                    { name: "☕ casual-chat", purpose: "Off-topic discussions and community bonding" },
                    { name: "📢 announcements", purpose: "Important updates and community events" },
                    { name: "🎮 study-together", purpose: "Virtual co-working and study sessions" }
                  ]
                }
              ].map((section, index) => (
                <div key={section.category} className="bg-white/[0.06] backdrop-blur-xl rounded-lg p-6 border border-white/[0.1]">
                  <div className={`inline-flex items-center justify-center w-10 h-10 mb-4 rounded-lg bg-gradient-to-r ${section.color} shadow-lg`}>
                    {renderIcon(index === 0 ? 'chat' : index === 1 ? 'rocket' : 'users', "w-5 h-5 text-white")}
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-4">{section.category}</h4>
                  <div className="space-y-3">
                    {section.channels.map((channel, idx) => (
                      <div key={idx} className="border-l-2 border-slate-600 pl-3">
                        <div className="text-sm font-medium text-blue-300">{channel.name}</div>
                        <div className="text-xs text-slate-400">{channel.purpose}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mentorship Structure */}
          <div className="mb-16">
            <h3 className="text-3xl font-light text-white mb-8 text-center">Structured Mentorship Program</h3>
            <div className="grid gap-8 lg:grid-cols-2">
              <div className="bg-white/[0.08] backdrop-blur-xl rounded-xl p-8 border border-white/[0.12] shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg">
                    {renderIcon('star', "w-6 h-6 text-white")}
                  </div>
                  <h4 className="text-xl font-semibold text-white">Peer Mentorship</h4>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Students who've progressed help those just starting. This creates a natural learning ladder where 
                  recent learners provide the most relatable guidance.
                </p>
                <div className="space-y-3">
                  {[
                    "Study buddy matching based on learning goals",
                    "Beginner-friendly explanations from recent learners",
                    "Project collaboration opportunities",
                    "Regular check-ins and progress accountability"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 mr-3"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.08] backdrop-blur-xl rounded-xl p-8 border border-white/[0.12] shadow-xl">
                <div className="flex items-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 mr-4 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg">
                    {renderIcon('trophy', "w-6 h-6 text-white")}
                  </div>
                  <h4 className="text-xl font-semibold text-white">Expert Guidance</h4>
                </div>
                <p className="text-slate-300 mb-6 leading-relaxed">
                  Experienced developers and industry professionals provide advanced insights, career guidance, 
                  and technical expertise for complex challenges.
                </p>
                <div className="space-y-3">
                  {[
                    "Weekly office hours with industry professionals",
                    "Code review sessions for advanced projects",
                    "Career path guidance and interview preparation",
                    "Technical deep-dives and best practices"
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center text-sm text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 mr-3"></div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Self-Running Community Guidelines */}
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-xl rounded-2xl p-8 border border-white/[0.1] shadow-2xl">
            <h3 className="text-3xl font-light text-white mb-8 text-center">How to Be a Great Community Member</h3>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-400 mr-3"></div>
                  When Asking for Help
                </h4>
                <div className="space-y-4 text-slate-300">
                  <div className="border-l-4 border-green-400 pl-4">
                    <div className="font-medium text-white">Provide Context</div>
                    <div className="text-sm">Share your code, error messages, and what you've already tried</div>
                  </div>
                  <div className="border-l-4 border-blue-400 pl-4">
                    <div className="font-medium text-white">Use the Right Channel</div>
                    <div className="text-sm">Post general questions in help-general, complex issues in help-specific</div>
                  </div>
                  <div className="border-l-4 border-purple-400 pl-4">
                    <div className="font-medium text-white">Be Patient & Grateful</div>
                    <div className="text-sm">Give helpers time to respond and always thank those who help you</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-3"></div>
                  When Helping Others
                </h4>
                <div className="space-y-4 text-slate-300">
                  <div className="border-l-4 border-purple-400 pl-4">
                    <div className="font-medium text-white">Explain, Don't Just Give Answers</div>
                    <div className="text-sm">Help others understand the "why" behind your solution</div>
                  </div>
                  <div className="border-l-4 border-yellow-400 pl-4">
                    <div className="font-medium text-white">Be Encouraging</div>
                    <div className="text-sm">Remember everyone was a beginner once - guide with patience and kindness</div>
                  </div>
                  <div className="border-l-4 border-cyan-400 pl-4">
                    <div className="font-medium text-white">Share Your Experience</div>
                    <div className="text-sm">Mention similar challenges you faced and how you overcame them</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-slate-300 italic">
                "Great communities are built when learners help learners. Every question answered and every project shared makes us all stronger."
              </p>
            </div>
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
