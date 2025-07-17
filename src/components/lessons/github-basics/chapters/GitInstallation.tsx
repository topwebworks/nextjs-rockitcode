'use client'

import React from 'react'

interface GitInstallationProps {
  checkedItems: Set<string>
  setCheckedItems: React.Dispatch<React.SetStateAction<Set<string>>>
  animateSection: string | null
  isSectionCompleted: (sectionId: string) => boolean
  markSectionCompleted: (sectionId: string) => void
  triggerAnimation: (sectionId: string) => void
}

export default function GitInstallation({
  checkedItems,
  setCheckedItems,
  animateSection,
  isSectionCompleted,
  markSectionCompleted,
  triggerAnimation
}: GitInstallationProps) {
  return (
    <div 
      data-section="section0"
      className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
      animateSection === 'section0' ? 'ring-2 ring-green-500 transform scale-105' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-2xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-green-600 rounded-full">0</span>
          Installing Git on Your Computer
        </h2>
        {isSectionCompleted('section0') && (
          <div className="flex items-center text-green-400 animate-pulse">
            <span className="mr-2">✅</span>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>
      
      <p className="mb-6 text-gray-300">
        Before we can use Git commands, we need to install Git on your computer. Don't worry - it's free and takes just a few minutes!
      </p>

      {/* Installation Progress Tracker */}
      <div className="p-6 mb-6 border border-green-700 rounded-lg bg-green-900/20">
        <h3 className="mb-4 text-lg font-semibold text-green-300">🎯 Installation Progress</h3>
        <div className="space-y-3">
          {[
            { id: 'choose-method', text: 'Choose installation method for your platform (see below)', platform: 'both' },
            { id: 'download-git', text: 'Download Git installer or GitHub Desktop (see below)', platform: 'both' },
            { id: 'run-installer', text: 'Run the installer and follow setup steps', platform: 'both' },
            { id: 'verify-install', text: 'Verify installation with "git --version" command', platform: 'both' }
          ].map((step, idx) => (
            <label key={step.id} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={checkedItems.has(`install-${step.id}`)}
                onChange={(e) => {
                  const id = `install-${step.id}`
                  if (e.target.checked) {
                    setCheckedItems(prev => new Set([...prev, id]))
                  } else {
                    setCheckedItems(prev => {
                      const newSet = new Set(prev)
                      newSet.delete(id)
                      return newSet
                    })
                  }
                }}
                className="w-4 h-4 text-green-600 transition-all bg-gray-700 border-gray-500 rounded focus:ring-green-500"
              />
              <span className={`text-sm transition-all duration-300 ${
                checkedItems.has(`install-${step.id}`) 
                  ? 'text-green-300 line-through' 
                  : 'text-gray-300 group-hover:text-white'
              }`}>
                {idx + 1}. {step.text}
              </span>
            </label>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Installation steps: {Array.from(checkedItems).filter(id => id.startsWith('install-')).length}/4
            </span>
            <span className="text-sm text-green-400">
              {Math.round((Array.from(checkedItems).filter(id => id.startsWith('install-')).length / 4) * 100)}%
            </span>
          </div>
          <div className="w-full h-3 overflow-hidden bg-gray-700 rounded-full">
            <div 
              className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-green-500 to-emerald-500"
              style={{ width: `${(Array.from(checkedItems).filter(id => id.startsWith('install-')).length / 4) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Unified Installation Options */}
      <div className="p-6 mb-6 border border-blue-700 rounded-lg bg-blue-900/20">
        <div className="flex items-center mb-6">
          <span className="mr-3 text-3xl">🔥</span>
          <h3 className="text-2xl font-bold text-blue-300">Git Installation (All Platforms)</h3>
        </div>
        
        <div className="space-y-6">
          {/* Method 1: GitHub Desktop (Recommended for Beginners) */}
          <div className="p-6 bg-gray-900 border border-green-600 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="mr-3 text-2xl">⭐</span>
                <div>
                  <h4 className="text-xl font-bold text-green-300">GitHub Desktop (Recommended)</h4>
                  <p className="text-sm text-green-200">Easiest option - includes Git + visual interface</p>
                </div>
              </div>
              <button
                onClick={() => setCheckedItems(prev => new Set([...prev, 'install-choose-method', 'install-download-git', 'install-run-installer']))}
                className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700"
              >
                Choose This Method
              </button>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg">
              <h5 className="mb-3 font-semibold text-white">Installation Steps:</h5>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center">
                  <span className="mr-2">1.</span>
                  <span>Go to </span>
                  <a href="https://desktop.github.com" target="_blank" className="mx-1 text-blue-400 hover:underline">
                    desktop.github.com
                  </a>
                </li>
                <li>2. Click "Download for [Your OS]" (auto-detects Windows/Mac/Linux)</li>
                <li>3. Run the installer and <strong className="text-green-300">follow the default prompts</strong> - no need to change anything!</li>
                <li>4. Git is included automatically - no extra setup needed!</li>
              </ol>
              
              <div className="p-3 mt-4 border border-green-700 rounded-lg bg-green-900/30">
                <p className="text-sm text-green-200">
                  ✨ <strong>Bonus:</strong> GitHub Desktop gives you a visual interface for Git commands, perfect for beginners!
                </p>
              </div>
            </div>
          </div>

          {/* Method 2: Official Git */}
          <div className="p-6 bg-gray-900 border border-blue-600 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="mr-3 text-2xl">⚙️</span>
                <div>
                  <h4 className="text-xl font-bold text-blue-300">Official Git</h4>
                  <p className="text-sm text-blue-200">Command-line focused installation</p>
                </div>
              </div>
              <button
                onClick={() => setCheckedItems(prev => new Set([...prev, 'install-choose-method', 'install-download-git', 'install-run-installer']))}
                className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Choose This Method
              </button>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg">
              <h5 className="mb-3 font-semibold text-white">Installation Steps:</h5>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center">
                  <span className="mr-2">1.</span>
                  <span>Go to </span>
                  <a href="https://git-scm.com/downloads" target="_blank" className="mx-1 text-blue-400 hover:underline">
                    git-scm.com/downloads
                  </a>
                </li>
                <li>2. Click your operating system (Windows/Mac/Linux)</li>
                <li>3. Download and run the installer</li>
                <li>4. <strong>Windows:</strong> Accept all defaults (<span className="text-green-300">just keep clicking "Next"</span>)</li>
                <li>5. <strong>Mac:</strong> Open .dmg file and <span className="text-green-300">follow default installation</span></li>
                <li>6. <strong>Linux:</strong> Use your package manager (apt, yum, pacman, etc.)</li>
              </ol>
              
              <div className="p-3 mt-4 border border-blue-700 rounded-lg bg-blue-900/30">
                <p className="text-sm text-blue-200">
                  😌 <strong>Don't stress:</strong> The default settings work perfectly for most users - no need to customize anything!
                </p>
              </div>
            </div>
          </div>

          {/* Quick Platform Notes */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
              <div className="flex items-center mb-2">
                <span className="mr-2 text-xl">🪟</span>
                <span className="font-semibold text-white">Windows</span>
              </div>
              <p className="text-xs text-gray-400">Both methods work great. GitHub Desktop is easier for beginners.</p>
            </div>
            
            <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
              <div className="flex items-center mb-2">
                <span className="mr-2 text-xl">🍎</span>
                <span className="font-semibold text-white">Mac</span>
              </div>
              <p className="text-xs text-gray-400">GitHub Desktop recommended. Git may already be installed via Xcode.</p>
            </div>
            
            <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
              <div className="flex items-center mb-2">
                <span className="mr-2 text-xl">🐧</span>
                <span className="font-semibold text-white">Linux</span>
              </div>
              <p className="text-xs text-gray-400">Usually installed via package manager: apt install git</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="p-6 mb-6 border border-yellow-700 rounded-lg bg-yellow-900/20">
        <h3 className="mb-4 text-lg font-semibold text-yellow-300">🔍 Verify Installation</h3>
        <p className="mb-3 text-yellow-200">After installation, let's make sure Git is working:</p>
        
        <div className="p-4 bg-gray-900 rounded-lg">
          <h4 className="mb-2 font-semibold text-white">Open your terminal/command prompt:</h4>
          <ul className="mb-3 space-y-1 text-sm text-gray-300">
            <li>• <strong>Windows:</strong> Press Win + R, type "cmd", press Enter</li>
            <li>• <strong>Mac:</strong> Press Cmd + Space, type "Terminal", press Enter</li>
          </ul>
          
          <p className="mb-2 text-sm text-gray-300">Type this command and press Enter:</p>
          <div className="flex items-center justify-between p-2 mb-3 bg-black rounded">
            <span className="font-mono text-sm text-green-400">git --version</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText('git --version')
                setCheckedItems(prev => new Set([...prev, 'install-verify-install']))
                // Show immediate feedback
                console.log('Verification marked complete!')
              }}
              className={`px-2 py-1 text-xs text-white transition-colors rounded ${
                checkedItems.has('install-verify-install') 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-yellow-600 hover:bg-yellow-700'
              }`}
            >
              {checkedItems.has('install-verify-install') ? '✅ Copied & Done!' : '📋 Copy & Mark Done'}
            </button>
          </div>
          
          <p className="text-sm text-gray-300">
            You should see something like: <span className="font-mono text-green-400">git version 2.39.0</span>
          </p>

          {/* Visual feedback when button is clicked */}
          {checkedItems.has('install-verify-install') && (
            <div className="p-3 mt-3 border border-green-700 rounded-lg bg-green-900/30 animate-slideIn">
              <p className="text-sm text-green-300">
                ✅ <strong>Great!</strong> Verification step completed. Check the Installation Checklist below to see it marked as done!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Setup Configuration */}
      <div className="p-6 mb-6 border border-purple-700 rounded-lg bg-purple-900/20">
        <h3 className="mb-4 text-lg font-semibold text-purple-300">⚙️ First-Time Setup</h3>
        <p className="mb-3 text-purple-200">Configure Git with your information (run these commands in terminal):</p>
        
        <div className="space-y-3">
          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-gray-400">Set your name:</p>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedItems.has('setup-name')}
                  onChange={(e) => {
                    const id = 'setup-name'
                    if (e.target.checked) {
                      setCheckedItems(prev => new Set([...prev, id]))
                    } else {
                      setCheckedItems(prev => {
                        const newSet = new Set(prev)
                        newSet.delete(id)
                        return newSet
                      })
                    }
                  }}
                  className="w-3 h-3 text-purple-600 bg-gray-700 border-gray-500 rounded focus:ring-purple-500"
                />
                <span className="text-xs text-gray-400">Done</span>
              </label>
            </div>
            <div className="flex items-center justify-between p-2 bg-black rounded">
              <span className="font-mono text-sm text-green-400">git config --global user.name "Your Name"</span>
              <button
                onClick={() => navigator.clipboard.writeText('git config --global user.name "Your Name"')}
                className="px-2 py-1 text-xs text-white transition-colors bg-purple-600 rounded hover:bg-purple-700"
              >
                📋
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-gray-400">Set your email:</p>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedItems.has('setup-email')}
                  onChange={(e) => {
                    const id = 'setup-email'
                    if (e.target.checked) {
                      setCheckedItems(prev => new Set([...prev, id]))
                    } else {
                      setCheckedItems(prev => {
                        const newSet = new Set(prev)
                        newSet.delete(id)
                        return newSet
                      })
                    }
                  }}
                  className="w-3 h-3 text-purple-600 bg-gray-700 border-gray-500 rounded focus:ring-purple-500"
                />
                <span className="text-xs text-gray-400">Done</span>
              </label>
            </div>
            <div className="flex items-center justify-between p-2 bg-black rounded">
              <span className="font-mono text-sm text-green-400">git config --global user.email "your.email@example.com"</span>
              <button
                onClick={() => navigator.clipboard.writeText('git config --global user.email "your.email@example.com"')}
                className="px-2 py-1 text-xs text-white transition-colors bg-purple-600 rounded hover:bg-purple-700"
              >
                📋
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-3 mt-4 rounded-lg bg-blue-900/30">
          <p className="text-sm text-blue-200">
            💡 <strong>Tip:</strong> Use the same email address you'll use for GitHub to keep everything connected!
          </p>
        </div>
      </div>

      {/* Completion Checklist */}
      <div className="p-6 border border-gray-600 rounded-lg bg-gray-700/30">
        <h3 className="mb-4 text-lg font-semibold text-white">✅ Installation Checklist</h3>
        <div className="space-y-3">
          {[
            { id: 'downloaded', text: 'Downloaded and installed Git on my computer', deps: ['install-choose-method', 'install-download-git', 'install-run-installer'] },
            { id: 'verified', text: 'Verified Git is working with "git --version" command', deps: ['install-verify-install'] },
            { id: 'configured-name', text: 'Configured my name with "git config --global user.name"', deps: ['setup-name'] },
            { id: 'configured-email', text: 'Configured my email with "git config --global user.email"', deps: ['setup-email'] }
          ].map((item, idx) => {
            const isAutoChecked = item.deps?.every(dep => checkedItems.has(dep))
            const isManuallyChecked = checkedItems.has(`section0-${idx}`)
            const isChecked = isAutoChecked || isManuallyChecked
            
            return (
              <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => {
                    const id = `section0-${idx}`
                    if (e.target.checked) {
                      setCheckedItems(prev => new Set([...prev, id]))
                    } else {
                      setCheckedItems(prev => {
                        const newSet = new Set(prev)
                        newSet.delete(id)
                        return newSet
                      })
                    }
                  }}
                  className="w-4 h-4 text-green-600 transition-all bg-gray-700 border-gray-500 rounded focus:ring-green-500"
                />
                <span className={`text-sm transition-all duration-300 flex-1 ${
                  isChecked 
                    ? 'text-green-300 line-through' 
                    : 'text-gray-300 group-hover:text-white'
                }`}>
                  {item.text}
                </span>
                {isAutoChecked && !isManuallyChecked && (
                  <span className="px-2 py-1 text-xs text-green-200 bg-green-800 rounded">
                    Auto-completed ✨
                  </span>
                )}
              </label>
            )
          })}
        </div>
        
        {/* Installation Progress Summary */}
        <div className="p-4 mt-6 bg-gray-800 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Overall Installation Progress</span>
            <span className="text-green-400">
              {Array.from(checkedItems).filter(id => id.startsWith('install-') || id.startsWith('setup-')).length}/6 tasks
            </span>
          </div>
          
          <div className="w-full h-4 overflow-hidden bg-gray-700 rounded-full">
            <div 
              className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500"
              style={{ width: `${(Array.from(checkedItems).filter(id => id.startsWith('install-') || id.startsWith('setup-')).length / 6) * 100}%` }}
            />
          </div>
          
          <div className="mt-2 text-xs text-gray-400">
            Complete installation steps and setup commands to unlock the completion button!
          </div>
        </div>
        
        {/* Auto-complete section when all items checked */}
        {(
          [0,1,2,3].every(idx => {
            const item = [
              { deps: ['install-choose-method', 'install-download-git', 'install-run-installer'] },
              { deps: ['install-verify-install'] },
              { deps: ['setup-name'] },
              { deps: ['setup-email'] }
            ][idx]
            return item.deps?.every(dep => checkedItems.has(dep)) || checkedItems.has(`section0-${idx}`)
          }) || 
          [0,1,2,3].every(idx => checkedItems.has(`section0-${idx}`))
        ) && !isSectionCompleted('section0') && (
          <div className="mt-6">
            <div className="p-3 mb-3 text-center border border-blue-700 rounded-lg bg-blue-900/30">
              <p className="text-sm text-blue-200">
                🎯 <strong>Ready to finish?</strong> This button will complete your entire Git installation and mark all progress items above.
              </p>
            </div>
            <button
              onClick={() => {
                // Auto-complete ALL installation steps when user clicks completion button
                setCheckedItems(prev => new Set([
                  ...prev, 
                  // Installation progress items (top section)
                  'install-choose-method',
                  'install-download-git', 
                  'install-run-installer',
                  'install-verify-install',
                  // Setup items
                  'setup-name',
                  'setup-email',
                  // Checklist items (will be auto-completed by dependencies, but ensuring they're marked)
                  'section0-0', 'section0-1', 'section0-2', 'section0-3'
                ]))
                markSectionCompleted('section0')
                triggerAnimation('section0')
              }}
              className="relative w-full px-6 py-4 font-bold text-white transition-all transform rounded-lg shadow-lg bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 hover:scale-105 animate-pulse hover:shadow-green-500/50"
            >
              <span className="flex items-center justify-center space-x-3">
                <span className="text-2xl animate-bounce">🎉</span>
                <span>Complete Git Installation & Setup!</span>
                <span className="text-2xl animate-bounce">🚀</span>
              </span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
            </button>
          </div>
        )}
        
        {/* Celebration message after completion */}
        {isSectionCompleted('section0') && (
          <div className="p-4 mt-4 border border-green-500 rounded-lg bg-green-900/40 animate-slideIn">
            <div className="text-center">
              <div className="mb-2 text-3xl">🎊</div>
              <h4 className="mb-2 text-lg font-bold text-green-300">Awesome! Git is Ready to Go!</h4>
              <p className="text-sm text-green-200">
                You now have Git installed and configured. You're ready to start version controlling your projects like a pro!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
