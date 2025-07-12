'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/button'
import { 
  Rocket, 
  Github, 
  Star, 
  Zap, 
  Target, 
  Trophy, 
  Code2, 
  Briefcase, 
  Globe, 
  ArrowRight,
  CheckCircle,
  Clock,
  Users,
  TrendingUp
} from 'lucide-react'

// Simple Badge component
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}>
    {children}
  </span>
)

// Simple Progress component
const Progress = ({ value, className }: { value: number, className?: string }) => (
  <div className={`bg-gray-700 rounded-full overflow-hidden ${className}`}>
    <div 
      className="h-full bg-blue-500 transition-all duration-300"
      style={{ width: `${value}%` }}
    />
  </div>
)

interface LaunchSequence {
  phase: string
  title: string
  description: string
  status: 'completed' | 'active' | 'upcoming'
  progress: number
  icon: React.ElementType
  estimatedTime: string
  value: string
}

interface StudentStats {
  githubCommits: number
  projectsDeployed: number
  skillsLearned: number
  portfolioViews: number
  daysActive: number
}

const LAUNCH_SEQUENCE: LaunchSequence[] = [
  {
    phase: 'pre-flight',
    title: 'Pre-Flight Check',
    description: 'GitHub setup, Copilot activation, Student Pack registration',
    status: 'completed',
    progress: 100,
    icon: CheckCircle,
    estimatedTime: '15 mins',
    value: '$200k+ tools unlocked'
  },
  {
    phase: 'foundation',
    title: 'Foundation Launch',
    description: 'HTML, CSS, JavaScript fundamentals with live portfolio projects',
    status: 'active',
    progress: 65,
    icon: Code2,
    estimatedTime: '4-6 weeks',
    value: '3-5 portfolio projects'
  },
  {
    phase: 'orbit',
    title: 'Orbital Mechanics',
    description: 'React, Next.js, advanced deployment with professional workflows',
    status: 'upcoming',
    progress: 0,
    icon: Globe,
    estimatedTime: '6-8 weeks',
    value: 'Full-stack applications'
  },
  {
    phase: 'deep-space',
    title: 'Deep Space Mission',
    description: 'Advanced specializations, open source contributions, career launch',
    status: 'upcoming',
    progress: 0,
    icon: Star,
    estimatedTime: '8-12 weeks',
    value: 'Professional developer'
  }
]

export default function LaunchPadDashboard() {
  const { data: session } = useSession()
  const [currentPhase, setCurrentPhase] = useState(1)
  const [stats, setStats] = useState<StudentStats>({
    githubCommits: 47,
    projectsDeployed: 3,
    skillsLearned: 12,
    portfolioViews: 156,
    daysActive: 23
  })

  const [missionProgress, setMissionProgress] = useState(32) // Overall progress
  const [launchReadiness, setLaunchReadiness] = useState(85) // Career readiness score

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      {/* Header - Mission Control */}
      <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Rocket className="h-8 w-8 text-blue-400" />
                <h1 className="text-2xl font-bold">RockitCode Launch Pad</h1>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border border-green-400">
                Mission Active
              </Badge>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <div className="text-sm text-slate-400">Mission Progress</div>
                <div className="text-xl font-bold text-blue-400">{missionProgress}%</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Launch Readiness</div>
                <div className="text-xl font-bold text-green-400">{launchReadiness}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Mission Overview */}
        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/5 rounded-2xl border border-white/10 p-6 backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold flex items-center space-x-2">
                <Target className="h-6 w-6 text-orange-400" />
                <span>Mission: Professional Developer</span>
              </h2>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-400">
                T+ {stats.daysActive} days
              </Badge>
            </div>
            
            <p className="text-slate-300 mb-6">
              Transform from coding newcomer to job-ready developer using the same professional tools 
              and workflows used at GitHub, Netflix, and Airbnb. Your personal mission: build an 
              impressive portfolio while mastering AI-assisted development.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.githubCommits}</div>
                <div className="text-sm text-slate-400">GitHub Commits</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{stats.projectsDeployed}</div>
                <div className="text-sm text-slate-400">Live Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.skillsLearned}</div>
                <div className="text-sm text-slate-400">Skills Mastered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">{stats.portfolioViews}</div>
                <div className="text-sm text-slate-400">Portfolio Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">${(stats.portfolioViews * 1.3).toFixed(0)}k</div>
                <div className="text-sm text-slate-400">Tools Value</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Launch Sequence */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-yellow-400" />
            <span>Launch Sequence</span>
          </h2>

          <div className="space-y-4">
            {LAUNCH_SEQUENCE.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white/5 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 ${
                  phase.status === 'active' 
                    ? 'border-blue-400 ring-2 ring-blue-400/20' 
                    : phase.status === 'completed'
                    ? 'border-green-400/50'
                    : 'border-white/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${
                      phase.status === 'completed' 
                        ? 'bg-green-500/20 text-green-400'
                        : phase.status === 'active'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-slate-500/20 text-slate-400'
                    }`}>
                      <phase.icon className="h-6 w-6" />
                    </div>
                    
                    <div>
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-xl font-semibold">{phase.title}</h3>
                        <Badge className={
                          phase.status === 'completed' 
                            ? 'bg-green-500/20 text-green-400 border-green-400'
                            : phase.status === 'active'
                            ? 'bg-blue-500/20 text-blue-400 border-blue-400'
                            : 'bg-slate-500/20 text-slate-400 border-slate-400'
                        }>
                          {phase.status === 'completed' ? 'Complete' : 
                           phase.status === 'active' ? 'In Progress' : 'Upcoming'}
                        </Badge>
                      </div>
                      <p className="text-slate-300">{phase.description}</p>
                      
                      <div className="flex items-center space-x-4 mt-2 text-sm text-slate-400">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{phase.estimatedTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-4 w-4" />
                          <span>{phase.value}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    {phase.status === 'active' && (
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Continue Mission
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    )}
                    {phase.status === 'completed' && (
                      <div className="text-green-400 font-semibold">
                        ✓ Mission Complete
                      </div>
                    )}
                    {phase.status === 'upcoming' && (
                      <div className="text-slate-400">
                        Locked
                      </div>
                    )}
                  </div>
                </div>

                {phase.status !== 'upcoming' && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <Progress 
                      value={phase.progress} 
                      className={`h-2 ${
                        phase.status === 'completed' ? 'bg-green-900' : 'bg-blue-900'
                      }`}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Mission Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <Briefcase className="h-5 w-5 text-blue-400" />
              <span>Active Mission</span>
            </h3>
            
            <div className="space-y-4">
              <div className="bg-blue-500/10 rounded-lg p-4 border border-blue-400/20">
                <h4 className="font-semibold text-blue-400 mb-2">Foundation Launch - Chapter 3</h4>
                <p className="text-slate-300 text-sm mb-3">
                  Building Responsive Navigation with GitHub Copilot assistance
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-400">
                    Next: Deploy to GitHub Pages
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Launch Mission
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-400">Mission Time</div>
                  <div className="font-semibold">2h 15m</div>
                </div>
                <div>
                  <div className="text-slate-400">Completion ETA</div>
                  <div className="font-semibold">Today 6:30 PM</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Launch Readiness Assessment */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <span>Launch Readiness</span>
            </h3>

            <div className="space-y-4">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-400 mb-1">{launchReadiness}%</div>
                <div className="text-slate-400">Career Launch Ready</div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">GitHub Profile</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={95} className="w-20 h-2" />
                    <span className="text-sm text-green-400">95%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Live Portfolio</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={80} className="w-20 h-2" />
                    <span className="text-sm text-blue-400">80%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">AI Collaboration</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={70} className="w-20 h-2" />
                    <span className="text-sm text-yellow-400">70%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm">Professional Tools</span>
                  <div className="flex items-center space-x-2">
                    <Progress value={100} className="w-20 h-2" />
                    <span className="text-sm text-green-400">100%</span>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700 mt-4">
                <Target className="h-4 w-4 mr-2" />
                Career Launch Assessment
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions - Mission Control */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm"
        >
          <h3 className="text-xl font-bold mb-4 flex items-center space-x-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            <span>Mission Control</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 border border-white/20 hover:bg-white/10 bg-transparent">
              <Github className="h-6 w-6" />
              <span>GitHub Profile</span>
            </Button>
            
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 border border-white/20 hover:bg-white/10 bg-transparent">
              <Globe className="h-6 w-6" />
              <span>Live Portfolio</span>
            </Button>
            
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 border border-white/20 hover:bg-white/10 bg-transparent">
              <Code2 className="h-6 w-6" />
              <span>AI Assistant</span>
            </Button>
            
            <Button className="h-20 flex flex-col items-center justify-center space-y-2 border border-white/20 hover:bg-white/10 bg-transparent">
              <Users className="h-6 w-6" />
              <span>Mission Crew</span>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Floating Launch Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
        className="fixed bottom-8 right-8"
      >
        <Button className="rounded-full h-16 w-16 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25">
          <Rocket className="h-8 w-8" />
        </Button>
      </motion.div>
    </div>
  )
}
