import React from 'react'
import { Rocket, Star, Zap, Target, Github, Code2, Globe, Trophy } from 'lucide-react'
import dynamic from 'next/dynamic'

// Lazy load the interactive dashboard only when needed
const LazyInteractiveDashboard = dynamic(
  () => import('@/components/launch-pad-dashboard'),
  {
    loading: () => (
      <div className="animate-pulse bg-gray-800/50 rounded-2xl h-96 flex items-center justify-center">
        <div className="text-white text-lg">🚀 Loading Mission Control...</div>
      </div>
    ),
    ssr: false
  }
)

export default function LaunchPadOptimized() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Static Hero Section - Pure CSS */}
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

      {/* Static Mission Overview */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white border border-white/20">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold mb-3">Mission Briefing</h3>
            <p className="text-slate-300">
              Get your personalized roadmap from beginner to professional developer
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white border border-white/20">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-bold mb-3">Professional Tools</h3>
            <p className="text-slate-300">
              Access $200k+ worth of development tools and services completely free
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white border border-white/20">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-bold mb-3">Launch Sequence</h3>
            <p className="text-slate-300">
              Follow guided missions to build real projects and land your first job
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Dashboard - Lazy Loaded */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <LazyInteractiveDashboard />
      </div>

      {/* Static Benefits Section */}
      <div className="bg-black/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
                <Rocket className="h-8 w-8 text-blue-400" />
                <span>Why Launch Pad Works</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Structured Learning Path</h3>
                    <p className="text-slate-300">Follow a proven curriculum that takes you from basics to job-ready skills</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Real Project Experience</h3>
                    <p className="text-slate-300">Build actual applications that you can showcase to potential employers</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Professional Tools</h3>
                    <p className="text-slate-300">Access the same tools used by professional developers in the industry</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
                    <span className="text-xs text-white">✓</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">AI-Powered Assistance</h3>
                    <p className="text-slate-300">Get instant help and explanations when you're stuck or confused</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-6 text-center">Launch Sequence Preview</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-sm text-white font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Mission Briefing</h4>
                    <p className="text-sm text-slate-300">Get your personalized learning roadmap</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-sm text-white font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Tool Activation</h4>
                    <p className="text-sm text-slate-300">Set up your professional development environment</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <span className="text-sm text-white font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Skills Training</h4>
                    <p className="text-sm text-slate-300">Master coding fundamentals through hands-on projects</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-sm text-white font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Portfolio Launch</h4>
                    <p className="text-sm text-slate-300">Deploy your projects and build your professional portfolio</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-sm text-white font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Career Ignition</h4>
                    <p className="text-sm text-slate-300">Land your first developer job with confidence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
