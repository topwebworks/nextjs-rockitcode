'use client'

import { useState } from 'react'
import { clsx } from 'clsx'

interface MissionBriefing {
  id: string
  title: string
  description: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  estimatedTime: string
  objectives: string[]
  tools: string[]
  outcome: string
  unlocks: string[]
}

export function MissionBriefing() {
  const [selectedMission, setSelectedMission] = useState<string | null>(null)

  const missions: MissionBriefing[] = [
    {
      id: 'first-portfolio',
      title: '🌐 Mission Alpha: Portfolio Launch',
      description: 'Deploy your first professional portfolio website using GitHub Pages',
      difficulty: 'Beginner',
      estimatedTime: '2 hours',
      objectives: [
        'Create your GitHub portfolio repository',
        'Design a professional landing page',
        'Deploy live to GitHub Pages',
        'Set up custom domain (optional)',
        'Add contact form and social links'
      ],
      tools: ['GitHub Pages', 'HTML/CSS', 'GitHub Desktop'],
      outcome: 'Live professional website at username.github.io',
      unlocks: ['Web Development Track', 'Professional Profile Badge']
    },
    {
      id: 'first-react-app',
      title: '⚛️ Mission Beta: React Command Center',
      description: 'Build your first React application with professional deployment',
      difficulty: 'Beginner',
      estimatedTime: '3 hours',
      objectives: [
        'Initialize React project with Create React App',
        'Build interactive components',
        'Add state management and hooks',
        'Style with modern CSS/Tailwind',
        'Deploy to Vercel with CI/CD'
      ],
      tools: ['React', 'Vercel', 'GitHub Actions', 'Tailwind CSS'],
      outcome: 'Interactive React app with live deployment',
      unlocks: ['Frontend Development Track', 'React Specialist Badge']
    },
    {
      id: 'fullstack-project',
      title: '🔗 Mission Gamma: Full-Stack API',
      description: 'Create a complete full-stack application with database',
      difficulty: 'Intermediate',
      estimatedTime: '6 hours',
      objectives: [
        'Set up Next.js full-stack project',
        'Design and implement REST API',
        'Connect to database (PostgreSQL)',
        'Add user authentication',
        'Deploy with database hosting'
      ],
      tools: ['Next.js', 'PostgreSQL', 'NextAuth', 'Prisma', 'Railway/Supabase'],
      outcome: 'Production-ready full-stack application',
      unlocks: ['Full-Stack Track', 'Database Architect Badge', 'API Designer Badge']
    },
    {
      id: 'ai-integration',
      title: '🤖 Mission Delta: AI-Powered App',
      description: 'Integrate AI capabilities into a professional application',
      difficulty: 'Intermediate',
      estimatedTime: '4 hours',
      objectives: [
        'Set up OpenAI API integration',
        'Build AI-powered features',
        'Implement chat interface',
        'Add streaming responses',
        'Deploy with API key management'
      ],
      tools: ['OpenAI API', 'React', 'Node.js', 'Vercel KV', 'Streaming'],
      outcome: 'AI-powered application with chat interface',
      unlocks: ['AI Development Track', 'Machine Learning Badge']
    },
    {
      id: 'mobile-app',
      title: '📱 Mission Epsilon: Mobile Deploy',
      description: 'Build and deploy a cross-platform mobile application',
      difficulty: 'Advanced',
      estimatedTime: '8 hours',
      objectives: [
        'Set up React Native development',
        'Build mobile-first UI/UX',
        'Add device integrations',
        'Test on multiple platforms',
        'Deploy to app stores'
      ],
      tools: ['React Native', 'Expo', 'Firebase', 'App Store Connect', 'Google Play'],
      outcome: 'Published mobile app on app stores',
      unlocks: ['Mobile Development Track', 'Cross-Platform Badge', 'App Publisher Badge']
    }
  ]

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-400 bg-green-400/10 border border-green-400/20'
      case 'Intermediate': return 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20'
      case 'Advanced': return 'text-red-400 bg-red-400/10 border border-red-400/20'
      default: return 'text-slate-400 bg-slate-400/10 border border-slate-400/20'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-blue-400/20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 p-6 mx-auto max-w-7xl">
        {/* Mission Control Header */}
        <div className="mb-12 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="absolute w-3 h-3 rounded-full -top-1 -right-1 bg-green-400/80 animate-pulse"></div>
            </div>
          </div>
          <h1 className="mb-6 text-5xl font-light tracking-wide text-white">Mission Briefings</h1>
          <p className="max-w-3xl mx-auto mb-8 text-xl font-light leading-relaxed text-slate-300">
            Choose your path to professional developer transformation. Each mission builds real-world skills and portfolio projects that land jobs.
          </p>
          <div className="flex justify-center">
            <div className="px-6 py-3 border bg-slate-800/50 backdrop-blur-sm rounded-xl border-slate-700/50">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span className="font-medium text-slate-300">All missions include portfolio projects + professional deployment</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Selection Grid */}
        <div className="grid gap-6 mb-12 lg:grid-cols-2">
          {missions.map((mission) => (
            <div
              key={mission.id}
              className={clsx(
                "p-6 transition-all duration-300 border cursor-pointer bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-blue-400/30",
                selectedMission === mission.id
                  ? "border-blue-400/50 bg-slate-700/40"
                  : ""
              )}
              onClick={() => setSelectedMission(selectedMission === mission.id ? null : mission.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="mb-3 text-xl font-medium text-white">{mission.title}</h3>
                  <p className="mb-4 text-slate-300">{mission.description}</p>
                  
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <span className={clsx("px-3 py-1 rounded-full text-xs font-medium", getDifficultyColor(mission.difficulty))}>
                      {mission.difficulty}
                    </span>
                    <div className="flex items-center gap-2 text-slate-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{mission.estimatedTime}</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <svg className={clsx("w-6 h-6 transition-transform text-slate-400", selectedMission === mission.id ? "rotate-90" : "")} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Expanded Mission Details */}
              {selectedMission === mission.id && (
                <div className="pt-4 space-y-6 border-t border-slate-700/50">
                  <div>
                    <h4 className="flex items-center gap-2 mb-3 font-medium text-blue-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                      Mission Objectives
                    </h4>
                    <ul className="space-y-2 text-sm">
                      {mission.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <svg className="flex-shrink-0 w-4 h-4 text-green-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-300">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 mb-3 font-medium text-purple-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Mission Equipment
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mission.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs rounded-lg bg-slate-700/50 text-slate-300 border border-slate-600/50"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg bg-green-400/10 border-green-400/20">
                    <h4 className="flex items-center gap-2 mb-2 font-medium text-green-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Mission Outcome
                    </h4>
                    <p className="text-sm text-green-300">{mission.outcome}</p>
                  </div>

                  <div>
                    <h4 className="flex items-center gap-2 mb-3 font-medium text-yellow-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                      </svg>
                      Unlocks
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {mission.unlocks.map((unlock, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs border rounded-lg bg-purple-400/10 text-purple-300 border-purple-400/20"
                        >
                          {unlock}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button className="flex items-center justify-center flex-1 gap-2 px-4 py-2 text-white transition-all duration-300 border rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50 hover:border-blue-400/30">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Accept Mission
                    </button>
                    <button className="px-4 py-2 text-slate-300 transition-all duration-300 border rounded-lg border-slate-600/50 hover:border-slate-500/50 hover:bg-slate-800/30">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mission Path Visualization */}
        <div className="p-6 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50">
          <h3 className="flex items-center gap-3 mb-6 text-xl font-medium text-white">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 9m0 8V9m0 0l-6-2" />
            </svg>
            Professional Development Mission Path
          </h3>
          
          <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-5">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 mb-3 text-xl text-white rounded-full bg-green-500/80">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <div className="font-medium text-white">Portfolio</div>
              <div className="text-sm text-slate-400">Foundation</div>
            </div>
            
            <div className="items-center justify-center hidden md:flex">
              <div className="w-full h-0.5 bg-slate-600/50"></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 mb-3 text-xl text-white rounded-full bg-blue-500/80">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div className="font-medium text-white">Frontend</div>
              <div className="text-sm text-slate-400">UI Skills</div>
            </div>
            
            <div className="items-center justify-center hidden md:flex">
              <div className="w-full h-0.5 bg-slate-600/50"></div>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center w-12 h-12 mb-3 text-xl text-white rounded-full bg-purple-500/80">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <div className="font-medium text-white">Full-Stack</div>
              <div className="text-sm text-slate-400">Complete Systems</div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-300">
              Each mission builds on the previous, creating a complete professional portfolio that demonstrates real-world development capabilities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MissionBriefing
