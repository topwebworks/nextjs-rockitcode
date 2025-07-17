'use client'

import React from 'react'

interface RockitAssistantProps {
  rockitVisible: boolean
  rockitExpanded: boolean
  rockitHidden: boolean
  setRockitExpanded: (expanded: boolean) => void
  setRockitHidden: (hidden: boolean) => void
  getCurrentSection: () => number
  getTotalProgress: () => number
  getCurrentSectionName: () => string
  getNextAction: () => string
  scrollToTop: () => void
  scrollToSection: (sectionNum: number) => void
  isSectionCompleted: (sectionId: string) => boolean
}

export default function RockitAssistant({
  rockitVisible,
  rockitExpanded,
  rockitHidden,
  setRockitExpanded,
  setRockitHidden,
  getCurrentSection,
  getTotalProgress,
  getCurrentSectionName,
  getNextAction,
  scrollToTop,
  scrollToSection,
  isSectionCompleted
}: RockitAssistantProps) {
  return (
    <>
      {/* Rockit - Smart Learning Assistant */}
      {!rockitHidden && (
        <div
          className={`fixed bottom-6 right-6 z-50 transition-all duration-300 transform ${
            rockitVisible ? 'translate-y-0 opacity-100' : 'translate-y-16 opacity-0'
          }`}
        >
          {/* Compact Mode */}
          {!rockitExpanded && (
            <div
              onClick={() => setRockitExpanded(true)}
              className="relative flex items-center justify-center cursor-pointer w-14 h-14 group"
            >
              {/* Progress Ring */}
              <svg className="absolute inset-0 transform -rotate-90 w-14 h-14">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="2"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="url(#rockitGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${(getTotalProgress() / 100) * 150.8} 150.8`}
                  className="transition-all duration-500"
                />
                <defs>
                  <linearGradient id="rockitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Rockit Icon */}
              <div className="flex items-center justify-center w-10 h-10 text-white transition-all duration-300 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 group-hover:scale-110 group-hover:shadow-lg">
                <span className="text-lg font-bold">🚀</span>
              </div>
              
              {/* Progress Badge */}
              <div className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs font-bold text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-full">
                {getTotalProgress()}%
              </div>
            </div>
          )}

          {/* Expanded Mode */}
          {rockitExpanded && (
            <div className="p-4 border border-gray-700 shadow-2xl w-80 rounded-xl bg-gray-900/95 backdrop-blur-sm">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-gradient-to-br from-emerald-500 to-blue-500">
                    <span className="text-sm font-bold">🚀</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Rockit</h3>
                    <p className="text-xs text-gray-400">Learning Assistant</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setRockitHidden(true)}
                    className="p-1 text-gray-400 transition-colors rounded hover:text-gray-200 hover:bg-gray-800"
                    title="Hide Rockit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setRockitExpanded(false)}
                    className="p-1 text-gray-400 transition-colors rounded hover:text-gray-200 hover:bg-gray-800"
                    title="Minimize"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Progress Overview */}
              <div className="p-3 mb-4 rounded-lg bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-300">Progress</span>
                  <span className="text-sm font-semibold text-green-400">{getTotalProgress()}%</span>
                </div>
                <div className="w-full h-2 overflow-hidden bg-gray-700 rounded-full">
                  <div 
                    className="h-full transition-all duration-500 bg-gradient-to-r from-emerald-500 to-blue-500"
                    style={{ width: `${getTotalProgress()}%` }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  Section {getCurrentSection()}/5: {getCurrentSectionName()}
                </div>
              </div>

              {/* Current Focus */}
              <div className="p-3 mb-4 border rounded-lg border-blue-700/50 bg-blue-900/20">
                <div className="flex items-center mb-2">
                  <span className="w-2 h-2 mr-2 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="text-sm font-medium text-blue-300">Next Action</span>
                </div>
                <p className="text-sm text-blue-200">{getNextAction()}</p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <button
                    onClick={scrollToTop}
                    className="flex-1 px-3 py-2 text-xs font-medium text-white transition-colors bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    ↑ Top
                  </button>
                  <button
                    onClick={() => {
                      const currentSection = getCurrentSection()
                      if (currentSection < 5) scrollToSection(currentSection)
                    }}
                    className="flex-1 px-3 py-2 text-xs font-medium text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                  >
                    → Current
                  </button>
                </div>
                
                {/* Section Jump Buttons */}
                <div className="grid grid-cols-5 gap-1">
                  {[0, 1, 2, 3, 4].map(sectionNum => (
                    <button
                      key={sectionNum}
                      onClick={() => scrollToSection(sectionNum)}
                      className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                        isSectionCompleted(`section${sectionNum}`)
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : getCurrentSection() === sectionNum
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {sectionNum}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Show Rockit Again Button (when hidden) */}
      {rockitHidden && (
        <button
          onClick={() => setRockitHidden(false)}
          className="fixed z-50 p-3 text-white transition-all duration-300 rounded-full bottom-6 right-6 bg-gradient-to-br from-emerald-500 to-blue-500 hover:scale-110 hover:shadow-lg"
          title="Show Rockit Assistant"
        >
          <span className="text-sm">🚀</span>
        </button>
      )}
    </>
  )
}
