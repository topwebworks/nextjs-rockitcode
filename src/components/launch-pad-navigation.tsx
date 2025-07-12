import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/button'
import { 
  Rocket, 
  Target, 
  Code2, 
  Users, 
  Briefcase, 
  Star, 
  Menu, 
  X,
  Github,
  Zap
} from 'lucide-react'

export default function LaunchPadNavigation() {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    {
      label: "Mission Tracks",
      href: "/missions",
      icon: Target,
      description: "Complete learning paths for career launch"
    },
    {
      label: "Mission Control",
      href: "/dashboard", 
      icon: Rocket,
      description: "Your personal launch pad dashboard"
    },
    {
      label: "Mission Equipment",
      href: "/tools",
      icon: Code2,
      description: "$200k+ professional developer tools"
    },
    {
      label: "Mission Crew",
      href: "/community",
      icon: Users,
      description: "Connect with fellow mission specialists"
    },
    {
      label: "Launch Success",
      href: "/success-stories",
      icon: Star,
      description: "Completed career launches and outcomes"
    }
  ]

  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 text-white">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-lg">RockitCode</div>
              <div className="text-xs text-blue-400 -mt-1">Launch Pad</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors duration-200 group"
              >
                <item.icon className="h-4 w-4 group-hover:text-blue-400" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mission Status & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Mission Status Indicator */}
            <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-1 rounded-full border border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-300 text-sm">Mission Active</span>
            </div>

            {/* Launch Button */}
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              <Target className="h-4 w-4 mr-2" />
              Launch Mission
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-slate-800/95 backdrop-blur-sm border-t border-white/10">
          <div className="px-6 py-4 space-y-4">
            {navigationItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center space-x-3 text-slate-300 hover:text-white p-3 rounded-lg hover:bg-white/5 transition-all duration-200"
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5 text-blue-400" />
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-slate-400">{item.description}</div>
                </div>
              </Link>
            ))}

            {/* Mobile Mission Status */}
            <div className="border-t border-white/10 pt-4 mt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-green-500/20 px-3 py-2 rounded-lg border border-green-400/30">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-green-300 text-sm">Mission Active</span>
                </div>
                
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Target className="h-4 w-4 mr-2" />
                  Launch
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mission Progress Bar (when user is logged in) */}
      <div className="bg-slate-800/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-slate-400">
              <span>🎯 Active Mission:</span>
              <span className="text-blue-400">Foundation Launch - Navigation Components</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-slate-400">Launch Readiness:</div>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-1 bg-slate-700 rounded-full overflow-hidden">
                  <div className="w-16 h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full" />
                </div>
                <span className="text-green-400 font-semibold">78%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

// Breadcrumb component with mission terminology
export function MissionBreadcrumbs({ 
  mission, 
  phase, 
  objective 
}: { 
  mission: string
  phase?: string 
  objective?: string 
}) {
  return (
    <div className="bg-slate-800/50 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center space-x-2 text-sm text-slate-400">
          <Rocket className="h-4 w-4 text-blue-400" />
          <span>Mission Control</span>
          <span>/</span>
          <span className="text-blue-300">{mission}</span>
          {phase && (
            <>
              <span>/</span>
              <span className="text-purple-300">{phase}</span>
            </>
          )}
          {objective && (
            <>
              <span>/</span>
              <span className="text-white font-medium">{objective}</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Mission Phase Selector
export function MissionPhaseSelector({ 
  currentPhase, 
  onPhaseChange 
}: { 
  currentPhase: number
  onPhaseChange: (phase: number) => void 
}) {
  const phases = [
    { id: 1, name: "Pre-Flight Check", icon: Target, color: "green" },
    { id: 2, name: "Foundation Launch", icon: Code2, color: "blue" },
    { id: 3, name: "Orbital Mechanics", icon: Briefcase, color: "purple" },
    { id: 4, name: "Deep Space Mission", icon: Star, color: "orange" }
  ]

  return (
    <div className="bg-white/5 rounded-lg border border-white/10 p-4">
      <h3 className="text-white font-semibold mb-3 flex items-center space-x-2">
        <Zap className="h-4 w-4 text-yellow-400" />
        <span>Mission Phase Selection</span>
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {phases.map((phase) => (
          <button
            key={phase.id}
            onClick={() => onPhaseChange(phase.id)}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              currentPhase === phase.id
                ? `border-${phase.color}-400 bg-${phase.color}-500/20 text-${phase.color}-300`
                : 'border-white/10 hover:border-white/20 text-slate-400 hover:text-white'
            }`}
          >
            <div className="flex flex-col items-center space-y-1">
              <phase.icon className="h-5 w-5" />
              <span className="text-xs font-medium">{phase.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
