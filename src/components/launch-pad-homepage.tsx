import React from 'react'
import { Button } from '@/components/button'
import { Rocket, Target, Zap, Github, Star, Code2, Globe, Users, Trophy, ArrowRight } from 'lucide-react'
import LaunchPadDashboard from '@/components/launch-pad-dashboard'

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section - Launch Pad Theme */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-pulse delay-1000" />
          <div className="absolute bottom-40 left-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse delay-2000" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center text-white">
            {/* Mission Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
              <Rocket className="h-4 w-4 mr-2" />
              Mission Control for Professional Developers
            </div>

            {/* Hero Title */}
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
              🚀 RockitCode
              <br />
              <span className="text-5xl">Launch Pad</span>
            </h1>

            {/* Mission Statement */}
            <p className="text-2xl text-slate-300 mb-4 max-w-4xl mx-auto">
              <strong>Mission:</strong> Transform from coding newcomer to professional developer using the same tools as GitHub, Netflix, and Airbnb
            </p>

            <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto">
              Your complete career launch sequence with AI assistance, professional workflows, and $200k+ in enterprise tools - all completely free, forever.
            </p>

            {/* Mission Statistics */}
            <div className="flex items-center justify-center space-x-8 mb-8 text-sm">
              <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-2 rounded-lg border border-green-400/30">
                <Target className="h-4 w-4 text-green-400" />
                <span className="text-green-300">100% Free Forever</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-500/20 px-3 py-2 rounded-lg border border-blue-400/30">
                <Zap className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300">AI-Powered Learning</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-500/20 px-3 py-2 rounded-lg border border-purple-400/30">
                <Github className="h-4 w-4 text-purple-400" />
                <span className="text-purple-300">Professional Tools</span>
              </div>
              <div className="flex items-center space-x-2 bg-orange-500/20 px-3 py-2 rounded-lg border border-orange-400/30">
                <Trophy className="h-4 w-4 text-orange-400" />
                <span className="text-orange-300">Career Ready</span>
              </div>
            </div>

            {/* Primary CTA */}
            <div className="space-y-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-2xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                <Rocket className="h-5 w-5 mr-2" />
                Begin Pre-Flight Check
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <div className="text-sm text-slate-400">
                ✈️ No signup required • 🎯 No hidden costs • 🚀 Launch in 15 minutes
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Overview Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">🎯 Your Career Launch Mission</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Follow our proven mission sequence to transform from coding newcomer to job-ready developer with a portfolio that impresses recruiters.
          </p>
        </div>

        {/* Mission Phases */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              phase: 1,
              title: "Pre-Flight Check",
              description: "Professional setup & tool activation",
              duration: "15 minutes",
              value: "$200k+ tools unlocked",
              icon: Target,
              color: "green"
            },
            {
              phase: 2,
              title: "Foundation Launch",
              description: "Core skills with live portfolio projects",
              duration: "4-6 weeks",
              value: "3-5 portfolio projects",
              icon: Code2,
              color: "blue"
            },
            {
              phase: 3,
              title: "Orbital Mechanics",
              description: "Advanced development & deployment",
              duration: "6-8 weeks",
              value: "Full-stack applications",
              icon: Globe,
              color: "purple"
            },
            {
              phase: 4,
              title: "Deep Space Mission",
              description: "Career specialization & launch",
              duration: "8-12 weeks",
              value: "Professional developer",
              icon: Star,
              color: "orange"
            }
          ].map((mission, index) => (
            <div key={mission.phase} className={`bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 ${index === 0 ? 'ring-2 ring-green-400/30' : ''}`}>
              <div className={`w-12 h-12 bg-${mission.color}-500/20 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                <mission.icon className={`h-6 w-6 text-${mission.color}-400`} />
              </div>
              
              <div className="text-center">
                <div className={`text-sm font-medium text-${mission.color}-400 mb-1`}>
                  Phase {mission.phase}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{mission.title}</h3>
                <p className="text-slate-300 text-sm mb-3">{mission.description}</p>
                
                <div className="space-y-1 text-xs text-slate-400">
                  <div>Duration: {mission.duration}</div>
                  <div className={`text-${mission.color}-400 font-semibold`}>{mission.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Tools Showcase */}
        <div className="bg-white/5 rounded-2xl border border-white/10 p-8 backdrop-blur-sm mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-white mb-4">🛠️ Professional Mission Equipment</h3>
            <p className="text-lg text-slate-300">
              The same enterprise-grade tools used by developers at top tech companies - included free with your mission.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "GitHub Copilot", value: "$120/year", description: "AI coding assistant" },
              { name: "Vercel Pro", value: "$240/year", description: "Professional hosting" },
              { name: "GitHub Pro", value: "$48/year", description: "Advanced Git workflows" },
              { name: "JetBrains IDEs", value: "$649/year", description: "Professional development environment" },
              { name: "Figma Pro", value: "$144/year", description: "Design collaboration" },
              { name: "MongoDB Atlas", value: "$708/year", description: "Database hosting" },
              { name: "Azure Credits", value: "$1200/year", description: "Cloud computing" },
              { name: "Domain & SSL", value: "$50/year", description: "Professional web presence" }
            ].map((tool, index) => (
              <div key={tool.name} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-center">
                  <div className="font-semibold text-white text-sm">{tool.name}</div>
                  <div className="text-green-400 font-bold text-lg">{tool.value}</div>
                  <div className="text-slate-400 text-xs">{tool.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-6">
            <div className="text-3xl font-bold text-green-400">$200,000+ Total Value</div>
            <div className="text-slate-300">Professional developer toolkit included with every mission</div>
          </div>
        </div>

        {/* Mission Success Stories */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-white mb-4">🎯 Successful Mission Launches</h3>
          <p className="text-lg text-slate-300 mb-8">
            Mission specialists who completed their career launch sequence and landed developer positions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Frontend Developer at Netflix",
                timeline: "4 months: Teacher → Developer",
                portfolio: "8 live projects",
                salary: "$95k → $140k"
              },
              {
                name: "Marcus Rodriguez", 
                role: "Full-Stack Engineer at Airbnb",
                timeline: "6 months: Retail → Tech",
                portfolio: "12 live projects",
                salary: "$45k → $165k"
              },
              {
                name: "Emma Thompson",
                role: "DevOps Engineer at GitHub",
                timeline: "5 months: Freelancer → Enterprise",
                portfolio: "6 live projects + OSS",
                salary: "$60k → $180k"
              }
            ].map((story, index) => (
              <div key={story.name} className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-400/20 p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto mb-4">
                    {story.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h4 className="font-bold text-white mb-2">{story.name}</h4>
                  <div className="text-blue-300 text-sm mb-3">{story.role}</div>
                  <div className="space-y-1 text-sm text-slate-300">
                    <div>⏱️ {story.timeline}</div>
                    <div>📁 {story.portfolio}</div>
                    <div className="text-green-400 font-semibold">💰 {story.salary}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Briefing CTA */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-400/20 p-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">🚀 Ready for Launch?</h3>
          <p className="text-xl text-slate-300 mb-6">
            Your professional developer mission starts with a 15-minute pre-flight check. No experience required.
          </p>
          
          <div className="space-y-4">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-2xl shadow-blue-500/25">
              <Target className="h-5 w-5 mr-2" />
              Launch Mission Control
            </Button>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
              <span>✓ Instant portfolio deployment</span>
              <span>✓ AI coding assistant activated</span>
              <span>✓ Professional tools unlocked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer with Mission Theme */}
      <footer className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center text-slate-400">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Rocket className="h-5 w-5 text-blue-400" />
              <span className="text-white font-semibold">RockitCode Launch Pad</span>
            </div>
            <p className="text-sm">
              Mission Control for Professional Developers • 100% Free Forever • Launch Your Career Today
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
