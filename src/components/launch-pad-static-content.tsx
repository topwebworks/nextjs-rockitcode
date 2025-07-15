import React from 'react'
import { Rocket, Target, Zap, Star } from 'lucide-react'

export function LaunchPadStaticContent() {
  return (
    <>
      {/* Concept Explanation */}
      <div className="bg-black/20 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-16 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center space-x-3">
                <Rocket className="h-8 w-8 text-blue-400" />
                <span>Why "Launch Pad"?</span>
              </h2>
              
              <div className="space-y-4 text-slate-300">
                <p>
                  🎯 <strong>Perfect Brand Alignment:</strong> "RockitCode" + "Launch Pad" = 
                  Your coding career launch sequence, perfectly branded for the rocket/space theme.
                </p>
                
                <p>
                  🚀 <strong>Mission-Driven Learning:</strong> Every lesson is a "mission" with clear objectives, 
                  progress tracking, and real-world outcomes. Students aren't just learning - they're 
                  preparing for career launch.
                </p>
                
                <p>
                  📊 <strong>Professional Readiness Tracking:</strong> Like a real launch pad, we monitor 
                  all systems - GitHub profile, portfolio quality, AI collaboration skills, and 
                  professional tool mastery.
                </p>
                
                <p>
                  🎮 <strong>Gamified Experience:</strong> Launch sequences, mission phases, and readiness 
                  scores make learning addictive while building real professional skills.
                </p>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl border border-white/10 p-8 backdrop-blur-sm">
              <h3 className="text-2xl font-bold mb-6 text-center">🎯 Mission Phases</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-500/10 rounded-lg border border-green-400/20">
                  <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                    <span className="text-green-400 font-bold">1</span>
                  </div>
                  <div>
                    <div className="font-semibold text-green-400">Pre-Flight Check</div>
                    <div className="text-sm text-slate-400">Professional setup & tool activation</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-blue-500/10 rounded-lg border border-blue-400/20">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <span className="text-blue-400 font-bold">2</span>
                  </div>
                  <div>
                    <div className="font-semibold text-blue-400">Foundation Launch</div>
                    <div className="text-sm text-slate-400">Core skills with live portfolio projects</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-400/20">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <span className="text-purple-400 font-bold">3</span>
                  </div>
                  <div>
                    <div className="font-semibold text-purple-400">Orbital Mechanics</div>
                    <div className="text-sm text-slate-400">Advanced development & deployment</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-3 bg-orange-500/10 rounded-lg border border-orange-400/20">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <span className="text-orange-400 font-bold">4</span>
                  </div>
                  <div>
                    <div className="font-semibold text-orange-400">Deep Space Mission</div>
                    <div className="text-sm text-slate-400">Specialization & career launch</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-12">🎯 Launch Pad Advantages</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Mission-Driven Focus</h3>
                <p className="text-slate-300">
                  Every lesson has clear objectives and measurable outcomes. 
                  No more aimless learning - you're always working toward career launch.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Professional Readiness</h3>
                <p className="text-slate-300">
                  Real-time tracking of your career launch readiness across all 
                  professional developer skills and portfolio quality.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3">Addictive Progress</h3>
                <p className="text-slate-300">
                  Gamified learning experience with mission phases, achievements, 
                  and visual progress tracking that keeps you motivated.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl border border-blue-400/20 p-8">
              <h2 className="text-3xl font-bold mb-4">Ready for Launch? 🚀</h2>
              <p className="text-xl text-slate-300 mb-6">
                Start your professional developer mission today. 100% free, forever.
              </p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-semibold text-white text-lg shadow-2xl shadow-blue-500/25 transition-all duration-300 transform hover:scale-105">
                Begin Pre-Flight Check 🎯
              </button>
              <div className="mt-4 text-sm text-slate-400">
                No credit card required • No hidden costs • Professional tools included
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
