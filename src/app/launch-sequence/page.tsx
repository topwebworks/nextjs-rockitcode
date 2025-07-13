'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { useState } from 'react'
import { STUDENT_PACK_BENEFITS, calculateProgress } from '@/lib/student-pack'

export default function LaunchSequencePage() {
  const { data: session, status } = useSession()
  const [activatedTools, setActivatedTools] = useState<string[]>([])

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Mission Control Loading...</div>
      </div>
    )
  }

  if (!session) {
    redirect('/')
  }

  const handleActivateTool = (toolId: string) => {
    if (activatedTools.includes(toolId)) return
    setActivatedTools([...activatedTools, toolId])
  }

  const currentProgress = calculateProgress(activatedTools)
  const priority1Benefits = STUDENT_PACK_BENEFITS.filter(b => b.priority === 1)
  const priority2Benefits = STUDENT_PACK_BENEFITS.filter(b => b.priority === 2)
  const priority3Benefits = STUDENT_PACK_BENEFITS.filter(b => b.priority === 3)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mission Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            🚀 GitHub Student Pack Activation
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Welcome, {session.user?.name}! Activate your professional development tools worth over $200,000.
          </p>
          
          {/* Enhanced Progress Stats */}
          <div className="bg-slate-800/50 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {activatedTools.length}/{STUDENT_PACK_BENEFITS.length}
                </div>
                <div className="text-sm text-gray-400">Tools Activated</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  ${currentProgress.totalValue.toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Value Unlocked</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {currentProgress.completionPercentage}%
                </div>
                <div className="text-sm text-gray-400">Complete</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  {[currentProgress.priority1Complete, currentProgress.priority2Complete, currentProgress.priority3Complete].filter(Boolean).length}/3
                </div>
                <div className="text-sm text-gray-400">Priority Levels</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="bg-slate-700 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${currentProgress.completionPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Priority 1: Essential Tools */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-white mr-4">🎯 Priority 1: Essential Development</h2>
            {currentProgress.priority1Complete && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                ✓ Complete
              </span>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {priority1Benefits.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                isActivated={activatedTools.includes(tool.id)}
                onActivate={handleActivateTool}
              />
            ))}
          </div>
        </div>

        {/* Priority 2: Enhanced Development */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-white mr-4">⚡ Priority 2: Enhanced Development</h2>
            {currentProgress.priority2Complete && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                ✓ Complete
              </span>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {priority2Benefits.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                isActivated={activatedTools.includes(tool.id)}
                onActivate={handleActivateTool}
              />
            ))}
          </div>
        </div>

        {/* Priority 3: Design & Learning */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-white mr-4">🎨 Priority 3: Design & Learning</h2>
            {currentProgress.priority3Complete && (
              <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                ✓ Complete
              </span>
            )}
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {priority3Benefits.map((tool) => (
              <ToolCard 
                key={tool.id} 
                tool={tool} 
                isActivated={activatedTools.includes(tool.id)}
                onActivate={handleActivateTool}
              />
            ))}
          </div>
        </div>

        {/* Mission Status */}
        <div className="text-center mt-12">
          {currentProgress.completionPercentage === 100 ? (
            <div className="bg-green-500/20 border border-green-500 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-green-400 mb-2">
                🎉 GitHub Student Pack Complete!
              </h2>
              <p className="text-gray-300 mb-4">
                You've unlocked ${currentProgress.totalValue.toLocaleString()} worth of professional tools. Ready for missions!
              </p>
              <a
                href="/learn"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition-colors"
              >
                Begin Training Missions →
              </a>
            </div>
          ) : currentProgress.priority1Complete ? (
            <div className="bg-blue-500/20 border border-blue-500 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-blue-400 mb-2">
                🚀 Essential Tools Ready!
              </h2>
              <p className="text-gray-300 mb-4">
                Core development environment activated. Continue with Priority 2 & 3 tools for maximum benefit.
              </p>
              <a
                href="/learn"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold inline-block transition-colors mr-4"
              >
                Start Learning →
              </a>
            </div>
          ) : (
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-xl font-bold text-white mb-2">
                Mission Progress: {currentProgress.completionPercentage}% Complete
              </h2>
              <p className="text-gray-400">
                Start with Priority 1 tools to unlock your development environment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Tool Card Component
function ToolCard({ 
  tool, 
  isActivated, 
  onActivate 
}: { 
  tool: any, 
  isActivated: boolean, 
  onActivate: (id: string) => void 
}) {
  return (
    <div 
      className={`bg-slate-800/50 border rounded-xl p-6 transition-all duration-300 ${
        isActivated 
          ? 'border-green-500 bg-green-500/10' 
          : 'border-slate-700 hover:border-purple-500'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <span className="text-3xl mr-3">{tool.icon}</span>
          <div>
            <h3 className="text-lg font-semibold text-white">{tool.name}</h3>
            <span className="text-sm text-gray-400">{tool.category}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-green-400">{tool.value}</div>
          <div className="text-xs text-gray-500">{tool.provider}</div>
        </div>
      </div>
      
      <p className="text-gray-300 text-sm mb-4">{tool.description}</p>
      
      <div className="flex items-center justify-between">
        {isActivated ? (
          <div className="flex items-center text-green-400">
            <span className="mr-2">✓</span>
            <span className="font-medium">Activated</span>
          </div>
        ) : (
          <a
            href={tool.setupUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onActivate(tool.id)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            Activate {tool.icon}
          </a>
        )}
      </div>
    </div>
  )
}
