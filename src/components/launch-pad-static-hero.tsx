import React from 'react'
import { Target, Zap, Github, Trophy } from 'lucide-react'

export function LaunchPadStaticHero() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🚀 RockitCode Launch Pad
          </h1>
          <p className="text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Your mission control center for launching from coding newcomer to job-ready developer
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-400" />
              <span>100% Free Forever</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-yellow-400" />
              <span>AI-Powered Learning</span>
            </div>
            <div className="flex items-center space-x-2">
              <Github className="h-5 w-5 text-blue-400" />
              <span>Professional Tools</span>
            </div>
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-orange-400" />
              <span>Career Ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
