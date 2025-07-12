'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Rocket, 
  Target, 
  Zap, 
  Github, 
  Code2, 
  Globe, 
  Star, 
  Trophy,
  Users,
  ArrowRight,
  CheckCircle,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/button'

const MissionPhases = [
  {
    id: 'pre-flight',
    title: 'Pre-Flight Check',
    description: 'Professional setup & mission equipment activation',
    duration: '15 minutes',
    value: '$200k+ tools unlocked',
    icon: CheckCircle,
    color: 'green'
  },
  {
    id: 'foundation',
    title: 'Foundation Launch',
    description: 'Core skills with live portfolio missions',
    duration: '4-6 weeks', 
    value: '3-5 portfolio projects',
    icon: Code2,
    color: 'blue'
  },
  {
    id: 'orbital',
    title: 'Orbital Mechanics',
    description: 'Advanced development & deployment mastery',
    duration: '6-8 weeks',
    value: 'Full-stack applications',
    icon: Globe,
    color: 'purple'
  },
  {
    id: 'deep-space',
    title: 'Deep Space Mission',
    description: 'Specialization & career launch preparation',
    duration: '8-12 weeks',
    value: 'Professional developer',
    icon: Star,
    color: 'orange'
  }
]

const MissionStats = [
  { value: '10,000+', label: 'Mission Specialists', icon: Users },
  { value: '95%', label: 'Launch Readiness', icon: Target },
  { value: '50,000+', label: 'Missions Deployed', icon: Rocket },
  { value: '2,500+', label: 'Career Launches', icon: Trophy }
]

const MissionEquipment = [
  {
    name: 'GitHub Copilot',
    description: 'AI co-pilot for all missions',
    tier: 'Free',
    value: 'Essential for professional development'
  },
  {
    name: 'GitHub Pages',
    description: 'Mission control hosting',
    tier: 'Free',
    value: 'Professional portfolio deployment'
  },
  {
    name: 'Vercel Platform',
    description: 'Advanced mission deployment',
    tier: 'Free',
    value: 'Next.js and React applications'
  },
  {
    name: 'Student Pack',
    description: 'Professional mission equipment',
    tier: 'Free',
    value: '$200k+ in developer tools'
  }
]

export default function MissionHomepage() {
  const [countdownTime, setCountdownTime] = useState(3)
  const [missionReady, setMissionReady] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTime((prev) => {
        if (prev <= 1) {
          setMissionReady(true)
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Hero Section - Mission Control */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6">
                🚀 <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  RockitCode Launch Pad
                </span>
              </h1>
              <p className="text-2xl md:text-3xl text-slate-300 mb-4">
                Mission Control for Professional Developers
              </p>
              <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
                Transform from coding newcomer to job-ready developer using the same professional tools 
                and AI-powered workflows used at GitHub, Netflix, and Airbnb.
              </p>
            </motion.div>

            {/* Mission Countdown */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className="mb-8"
            >
              {!missionReady ? (
                <div className="text-center">
                  <div className="text-6xl font-bold text-yellow-400 mb-2">
                    T-{countdownTime}
                  </div>
                  <div className="text-slate-400">Mission Launch Sequence</div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    🚀 MISSION READY
                  </div>
                  <div className="text-slate-400">All systems go for career launch</div>
                </div>
              )}
            </motion.div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-2xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <span>Begin Pre-Flight Check 🎯</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
              <div className="text-sm text-slate-400">
                100% Free Forever • No Credit Card • Professional Tools Included
              </div>
            </motion.div>

            {/* Mission Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {MissionStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-full mb-2">
                    <stat.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mission Phases */}
      <div className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🎯 Mission Phases</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Your complete career launch sequence with clear objectives, professional tools, 
              and portfolio outcomes at every phase.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MissionPhases.map((phase, index) => (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${
                  phase.color === 'green' ? 'bg-green-500/20 text-green-400' :
                  phase.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  phase.color === 'purple' ? 'bg-purple-500/20 text-purple-400' :
                  'bg-orange-500/20 text-orange-400'
                }`}>
                  <phase.icon className="h-6 w-6" />
                </div>
                
                <h3 className="text-xl font-bold mb-2">{phase.title}</h3>
                <p className="text-slate-300 mb-4">{phase.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="text-white">{phase.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Outcome:</span>
                    <span className="text-white">{phase.value}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Equipment */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🛠️ Mission Equipment</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Professional developer tools used by teams at GitHub, Netflix, and Airbnb. 
              All included free with your mission training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MissionEquipment.map((equipment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full mb-4">
                  <Github className="h-8 w-8 text-blue-400" />
                </div>
                
                <h3 className="text-lg font-bold mb-2">{equipment.name}</h3>
                <p className="text-slate-300 text-sm mb-3">{equipment.description}</p>
                
                <div className="inline-flex items-center px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium mb-2">
                  {equipment.tier}
                </div>
                
                <p className="text-xs text-slate-400">{equipment.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Success Stories */}
      <div className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">🏆 Mission Graduates</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real mission specialists who successfully launched their developer careers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "Frontend Developer at Netflix",
                mission: "Completed Deep Space Mission in 4 months",
                quote: "The mission structure kept me focused on career goals, not just learning syntax."
              },
              {
                name: "Marcus Rodriguez", 
                role: "Full-Stack Developer at Airbnb",
                mission: "Launched portfolio with 8 live projects",
                quote: "Having GitHub Copilot from day 1 taught me professional AI-assisted development."
              },
              {
                name: "Aisha Patel",
                role: "React Developer at GitHub",
                mission: "Mission ready in 6 months, hired in 2 weeks",
                quote: "My portfolio impressed recruiters because every project was deployed and professional."
              }
            ].map((graduate, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {graduate.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">{graduate.name}</div>
                    <div className="text-sm text-slate-400">{graduate.role}</div>
                  </div>
                </div>
                
                <div className="text-sm text-blue-400 mb-3">{graduate.mission}</div>
                <p className="text-slate-300 italic">"{graduate.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-400/20 p-8"
          >
            <h2 className="text-4xl font-bold mb-4">Ready for Mission Launch? 🚀</h2>
            <p className="text-xl text-slate-300 mb-6">
              Join 10,000+ mission specialists preparing for career launch. 
              Professional tools, AI assistance, and portfolio development - all completely free.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold shadow-2xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <span>Begin Pre-Flight Check 🎯</span>
                <Rocket className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>$200k+ Tools Included</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span>Free Forever</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
