'use client'

import React, { useState } from 'react'
import { Button } from '@/components/button'
import { 
  Rocket, 
  Github, 
  Zap, 
  Target, 
  CheckCircle, 
  Star, 
  Code2, 
  Globe,
  ArrowRight,
  ExternalLink,
  Gift
} from 'lucide-react'

interface MissionEquipment {
  name: string
  value: string
  description: string
  provider: 'github' | 'vercel' | 'student-pack'
  setupTime: string
  icon: React.ElementType
}

const MISSION_EQUIPMENT: MissionEquipment[] = [
  {
    name: "GitHub Copilot AI",
    value: "$120/year",
    description: "AI coding assistant for professional development",
    provider: "github",
    setupTime: "2 minutes",
    icon: Zap
  },
  {
    name: "GitHub Pro Account", 
    value: "$48/year",
    description: "Advanced Git workflows and private repositories",
    provider: "github",
    setupTime: "1 minute",
    icon: Github
  },
  {
    name: "Vercel Pro Hosting",
    value: "$240/year", 
    description: "Professional deployment and custom domains",
    provider: "vercel",
    setupTime: "3 minutes",
    icon: Globe
  },
  {
    name: "Student Developer Pack",
    value: "$200k+ tools",
    description: "JetBrains IDEs, Figma Pro, MongoDB, Azure credits, and more",
    provider: "student-pack",
    setupTime: "5 minutes",
    icon: Gift
  }
]

export default function LaunchPadOnboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [setupProgress, setSetupProgress] = useState<Record<string, boolean>>({})
  const [totalValue, setTotalValue] = useState(0)

  const handleEquipmentSetup = async (equipment: MissionEquipment) => {
    // Track affiliate click
    await fetch('/api/track-affiliate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        step: 'mission-equipment-setup',
        provider: equipment.provider,
        tool: equipment.name,
        timestamp: new Date().toISOString(),
        conversionPotential: 0.85 // High potential since this is onboarding
      })
    })

    // Open appropriate signup flow
    if (equipment.provider === 'github') {
      window.open('https://github.com/signup?ref=rockitcode', '_blank')
    } else if (equipment.provider === 'vercel') {
      window.open('https://vercel.com/signup?ref=rockitcode', '_blank')
    } else if (equipment.provider === 'student-pack') {
      window.open('https://education.github.com/pack?ref=rockitcode', '_blank')
    }

    // Mark as set up (in real app, this would be verified)
    setSetupProgress(prev => ({
      ...prev,
      [equipment.name]: true
    }))
  }

  const completedEquipment = Object.keys(setupProgress).filter(key => setupProgress[key])
  const totalEquipmentValue = MISSION_EQUIPMENT.reduce((sum, eq) => {
    if (eq.value.includes('$') && eq.value.includes('/year')) {
      return sum + parseInt(eq.value.replace('$', '').replace('/year', ''))
    }
    return sum
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Mission Briefing Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-500/20 border border-blue-400/30 rounded-full text-blue-300 text-sm font-medium mb-6">
            <Target className="h-4 w-4 mr-2" />
            Pre-Flight Check - Mission Equipment Setup
          </div>

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            🚀 Mission Equipment
            <br />
            Activation Sequence
          </h1>

          <p className="text-xl text-slate-300 mb-6 max-w-3xl mx-auto">
            Before launching your professional developer mission, we need to activate your mission-critical equipment. 
            This unlocks $200k+ in professional tools used by developers at top tech companies.
          </p>

          {/* Transparency Notice */}
          <div className="bg-yellow-500/10 border border-yellow-400/30 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-start space-x-3">
              <Star className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <div className="font-semibold text-yellow-300 mb-1">🎯 Mission Transparency</div>
                <p className="text-sm text-yellow-200">
                  RockitCode remains 100% free through affiliate partnerships. When you eventually upgrade these tools 
                  (typically after getting a developer job), we earn a small commission. This helps us keep the platform 
                  free while ensuring you have the best professional tools from day 1.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Equipment Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {MISSION_EQUIPMENT.map((equipment, index) => (
            <div
              key={equipment.name}
              className={`bg-white/5 rounded-xl border p-6 backdrop-blur-sm transition-all duration-300 ${
                setupProgress[equipment.name] 
                  ? 'border-green-400/50 bg-green-500/10' 
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 rounded-full ${
                    setupProgress[equipment.name] 
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {setupProgress[equipment.name] ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <equipment.icon className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{equipment.name}</h3>
                    <div className="text-green-400 font-bold text-sm">{equipment.value}</div>
                  </div>
                </div>

                <div className="text-right text-sm text-slate-400">
                  <div>Setup: {equipment.setupTime}</div>
                </div>
              </div>

              <p className="text-slate-300 text-sm mb-4">{equipment.description}</p>

              {setupProgress[equipment.name] ? (
                <div className="flex items-center space-x-2 text-green-400 text-sm font-medium">
                  <CheckCircle className="h-4 w-4" />
                  <span>Mission Equipment Activated</span>
                </div>
              ) : (
                <Button 
                  onClick={() => handleEquipmentSetup(equipment)}
                  className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center space-x-2"
                >
                  <span>Activate Equipment</span>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Mission Progress Summary */}
        <div className="bg-white/5 rounded-xl border border-white/10 p-6 backdrop-blur-sm mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Rocket className="h-5 w-5 text-blue-400" />
              <span>Mission Equipment Status</span>
            </h3>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-green-400">
                {completedEquipment.length}/{MISSION_EQUIPMENT.length}
              </div>
              <div className="text-sm text-slate-400">Equipment Active</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center bg-blue-500/10 rounded-lg p-4 border border-blue-400/20">
              <div className="text-2xl font-bold text-blue-400">${totalEquipmentValue.toLocaleString()}</div>
              <div className="text-sm text-slate-400">Annual Tool Value</div>
            </div>
            
            <div className="text-center bg-green-500/10 rounded-lg p-4 border border-green-400/20">
              <div className="text-2xl font-bold text-green-400">$0</div>
              <div className="text-sm text-slate-400">Your Cost</div>
            </div>
            
            <div className="text-center bg-purple-500/10 rounded-lg p-4 border border-purple-400/20">
              <div className="text-2xl font-bold text-purple-400">
                {Math.round((completedEquipment.length / MISSION_EQUIPMENT.length) * 100)}%
              </div>
              <div className="text-sm text-slate-400">Setup Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-slate-400 mb-1">
              <span>Equipment Activation Progress</span>
              <span>{completedEquipment.length}/{MISSION_EQUIPMENT.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                style={{ width: `${(completedEquipment.length / MISSION_EQUIPMENT.length) * 100}%` }}
              />
            </div>
          </div>

          {completedEquipment.length === MISSION_EQUIPMENT.length && (
            <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-green-400" />
                <div>
                  <div className="font-semibold text-green-300">🎯 Pre-Flight Check Complete!</div>
                  <p className="text-sm text-green-200 mt-1">
                    All mission equipment activated. You're ready to begin Foundation Launch with professional tools.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Next Mission Phase */}
        <div className="text-center">
          {completedEquipment.length === MISSION_EQUIPMENT.length ? (
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 px-8 py-4 text-lg font-semibold">
              <Rocket className="h-5 w-5 mr-2" />
              Launch Foundation Mission
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          ) : (
            <div className="text-slate-400">
              <p className="mb-4">Complete equipment setup to proceed to Foundation Launch</p>
              <div className="text-sm">
                ⏱️ Estimated completion time: {
                  MISSION_EQUIPMENT
                    .filter(eq => !setupProgress[eq.name])
                    .reduce((total, eq) => total + parseInt(eq.setupTime), 0)
                } minutes remaining
              </div>
            </div>
          )}
        </div>

        {/* Footer Disclaimer */}
        <div className="mt-12 text-center text-sm text-slate-400">
          <p>
            🎯 <strong>Mission Commitment:</strong> RockitCode will always be 100% free for students. 
            Our affiliate partnerships with professional tool providers help us maintain this free platform 
            while giving you access to enterprise-grade development tools from day one.
          </p>
        </div>
      </div>
    </div>
  )
}
