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
      case 'Beginner': return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'Advanced': return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
    }
  }

  return (
    <div className="mission-briefing max-w-7xl mx-auto p-6">
      {/* Mission Control Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🎯</div>
        <h1 className="text-4xl font-bold mb-4">Mission Briefings Available</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
          Choose your path to professional developer transformation. Each mission builds real-world skills and portfolio projects that land jobs.
        </p>
        <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
          <span className="text-blue-600">📊</span>
          <span className="text-sm font-medium">All missions include portfolio projects + professional deployment</span>
        </div>
      </div>

      {/* Mission Selection Grid */}
      <div className="missions-grid grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {missions.map((mission) => (
          <div
            key={mission.id}
            className={clsx(
              "mission-card border rounded-lg p-6 cursor-pointer transition-all hover:shadow-lg",
              selectedMission === mission.id
                ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300"
            )}
            onClick={() => setSelectedMission(selectedMission === mission.id ? null : mission.id)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{mission.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">{mission.description}</p>
                
                <div className="flex items-center space-x-4 text-sm mb-4">
                  <div className={clsx("px-2 py-1 rounded-full", getDifficultyColor(mission.difficulty))}>
                    {mission.difficulty}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    ⏱️ {mission.estimatedTime}
                  </div>
                </div>
              </div>
              
              <div className="text-2xl">
                {selectedMission === mission.id ? '🔽' : '▶️'}
              </div>
            </div>

            {/* Expanded Mission Details */}
            {selectedMission === mission.id && (
              <div className="mission-details border-t pt-4 space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <span>🎯</span>
                    <span>Mission Objectives:</span>
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {mission.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <span>🛠️</span>
                    <span>Mission Equipment:</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mission.tools.map((tool, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <h4 className="font-semibold mb-2 flex items-center space-x-2 text-green-800 dark:text-green-200">
                    <span>🏆</span>
                    <span>Mission Outcome:</span>
                  </h4>
                  <p className="text-sm text-green-700 dark:text-green-300">{mission.outcome}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center space-x-2">
                    <span>🔓</span>
                    <span>Unlocks:</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {mission.unlocks.map((unlock, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs rounded"
                      >
                        {unlock}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                    🚀 Accept Mission
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    📋 View Details
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mission Path Visualization */}
      <div className="mission-path bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
          <span>🗺️</span>
          <span>Professional Development Mission Path</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-center">
          <div className="path-step">
            <div className="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl">
              🌐
            </div>
            <div className="font-medium text-sm">Portfolio</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Foundation</div>
          </div>
          
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          
          <div className="path-step">
            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl">
              ⚛️
            </div>
            <div className="font-medium text-sm">Frontend</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">UI Skills</div>
          </div>
          
          <div className="hidden md:flex items-center justify-center">
            <div className="w-full h-0.5 bg-gray-300 dark:bg-gray-600"></div>
          </div>
          
          <div className="path-step">
            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl">
              🔗
            </div>
            <div className="font-medium text-sm">Full-Stack</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">Complete Systems</div>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Each mission builds on the previous, creating a complete professional portfolio that demonstrates real-world development capabilities.
          </p>
        </div>
      </div>
    </div>
  )
}

export default MissionBriefing
