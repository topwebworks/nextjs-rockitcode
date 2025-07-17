'use client'

import React from 'react'

interface VSCodeInstallationProps {
  checkedItems: Set<string>
  setCheckedItems: React.Dispatch<React.SetStateAction<Set<string>>>
  animateSection: string | null
  isSectionCompleted: (sectionId: string) => boolean
  markSectionCompleted: (sectionId: string) => void
  triggerAnimation: (sectionId: string) => void
}

export default function VSCodeInstallation({
  checkedItems,
  setCheckedItems,
  animateSection,
  isSectionCompleted,
  markSectionCompleted,
  triggerAnimation
}: VSCodeInstallationProps) {
  return (
    <div 
      data-section="section1"
      className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
      animateSection === 'section1' ? 'ring-2 ring-green-500 transform scale-105' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-2xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-green-600 rounded-full">1</span>
          Installing VSCode on Your Computer
        </h2>
        {isSectionCompleted('section0') && (
          <div className="flex items-center text-green-400 animate-pulse">
            <span className="mr-2">✅</span>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>
      
      <p className="mb-6 text-gray-300">
        Visual Studio Code is the world's most popular code editor. It's free, powerful, and perfect for web development. Let's get it set up!
      </p>

      {/* Installation Progress Tracker */}
      <div className="p-6 mb-6 border border-green-700 rounded-lg bg-green-900/20">
        <h3 className="mb-4 text-lg font-semibold text-green-300">🎯 Installation Progress</h3>
        <div className="space-y-3">
          {[
            { id: 'choose-method', text: 'Choose installation method for your platform (see below)', platform: 'both' },
            { id: 'download-vscode', text: 'Download VSCode installer from official website', platform: 'both' },
            { id: 'run-installer', text: 'Run the installer and follow setup steps', platform: 'both' },
            { id: 'verify-install', text: 'Verify installation by opening VSCode', platform: 'both' }
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
          <span className="mr-3 text-3xl">💻</span>
          <h3 className="text-2xl font-bold text-blue-300">VSCode Installation (All Platforms)</h3>
        </div>
        
        <div className="space-y-6">
          {/* Method 1: Official VSCode (Recommended) */}
          <div className="p-6 bg-gray-900 border border-green-600 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="mr-3 text-2xl">⭐</span>
                <div>
                  <h4 className="text-xl font-bold text-green-300">Official VSCode (Recommended)</h4>
                  <p className="text-sm text-green-200">Direct from Microsoft - most stable and feature-complete</p>
                </div>
              </div>
              <button
                onClick={() => setCheckedItems(prev => new Set([...prev, 'install-choose-method', 'install-download-vscode', 'install-run-installer']))}
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
                  <a href="https://code.visualstudio.com" target="_blank" className="mx-1 text-blue-400 hover:underline">
                    code.visualstudio.com
                  </a>
                </li>
                <li>2. Click "Download for [Your OS]" (auto-detects Windows/Mac/Linux)</li>
                <li>3. Run the installer and <strong className="text-green-300">accept all default settings</strong></li>
                <li>4. When prompted, check "Add to PATH" and "Add Open with Code action"</li>
                <li>5. Launch VSCode and you're ready to code!</li>
              </ol>
              
              <div className="p-3 mt-4 border border-green-700 rounded-lg bg-green-900/30">
                <p className="text-sm text-green-200">
                  ✨ <strong>Pro Tip:</strong> The installer adds helpful shortcuts like "Open with Code" when right-clicking folders!
                </p>
              </div>
            </div>
          </div>

          {/* Method 2: VSCode Insiders */}
          <div className="p-6 bg-gray-900 border border-purple-600 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <span className="mr-3 text-2xl">🚀</span>
                <div>
                  <h4 className="text-xl font-bold text-purple-300">VSCode Insiders</h4>
                  <p className="text-sm text-purple-200">Preview version with latest features (optional for beginners)</p>
                </div>
              </div>
              <button
                onClick={() => setCheckedItems(prev => new Set([...prev, 'install-choose-method', 'install-download-vscode', 'install-run-installer']))}
                className="px-4 py-2 text-sm font-semibold text-white transition-colors bg-purple-600 rounded-lg hover:bg-purple-700"
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
                  <a href="https://code.visualstudio.com/insiders" target="_blank" className="mx-1 text-purple-400 hover:underline">
                    code.visualstudio.com/insiders
                  </a>
                </li>
                <li>2. Download the Insiders build for your platform</li>
                <li>3. Install alongside regular VSCode (they won't conflict)</li>
                <li>4. Get cutting-edge features and daily updates</li>
              </ol>
              
              <div className="p-3 mt-4 border border-purple-700 rounded-lg bg-purple-900/30">
                <p className="text-sm text-purple-200">
                  🧪 <strong>Note:</strong> Insiders builds are less stable but give you the newest features first!
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
              <p className="text-xs text-gray-400">Download the .exe installer. Run as administrator if needed.</p>
            </div>
            
            <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
              <div className="flex items-center mb-2">
                <span className="mr-2 text-xl">🍎</span>
                <span className="font-semibold text-white">Mac</span>
              </div>
              <p className="text-xs text-gray-400">Download .dmg file. Drag VSCode to Applications folder.</p>
            </div>
            
            <div className="p-4 border border-gray-600 rounded-lg bg-gray-800/50">
              <div className="flex items-center mb-2">
                <span className="mr-2 text-xl">🐧</span>
                <span className="font-semibold text-white">Linux</span>
              </div>
              <p className="text-xs text-gray-400">Download .deb/.rpm or use Snap: snap install code --classic</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Steps */}
      <div className="p-6 mb-6 border border-yellow-700 rounded-lg bg-yellow-900/20">
        <h3 className="mb-4 text-lg font-semibold text-yellow-300">🔍 Verify Installation</h3>
        <p className="mb-3 text-yellow-200">Let's make sure VSCode is installed and working properly:</p>
        
        <div className="p-4 bg-gray-900 rounded-lg">
          <h4 className="mb-2 font-semibold text-white">Quick Verification Steps:</h4>
          <ul className="mb-3 space-y-1 text-sm text-gray-300">
            <li>• <strong>Open VSCode:</strong> Find it in your applications or start menu</li>
            <li>• <strong>Check version:</strong> Help → About (should show version number)</li>
            <li>• <strong>Command line test:</strong> Open terminal and type "code --version"</li>
          </ul>
          
          <p className="mb-2 text-sm text-gray-300">Test the command line integration:</p>
          <div className="flex items-center justify-between p-2 mb-3 bg-black rounded">
            <span className="font-mono text-sm text-green-400">code --version</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText('code --version')
                setCheckedItems(prev => new Set([...prev, 'install-verify-install']))
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
            You should see something like: <span className="font-mono text-green-400">1.85.1</span>
          </p>

          {/* Visual feedback when button is clicked */}
          {checkedItems.has('install-verify-install') && (
            <div className="p-3 mt-3 border border-green-700 rounded-lg bg-green-900/30 animate-slideIn">
              <p className="text-sm text-green-300">
                ✅ <strong>Perfect!</strong> VSCode is installed and working. Check the progress tracker above!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Initial Configuration */}
      <div className="p-6 mb-6 border border-purple-700 rounded-lg bg-purple-900/20">
        <h3 className="mb-4 text-lg font-semibold text-purple-300">⚙️ Essential First-Time Setup</h3>
        <p className="mb-3 text-purple-200">Let's configure VSCode for the best development experience:</p>
        
        <div className="space-y-3">
          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-gray-400">Enable Settings Sync:</p>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedItems.has('setup-sync')}
                  onChange={(e) => {
                    const id = 'setup-sync'
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
            <div className="p-2 bg-black rounded">
              <span className="text-sm text-purple-400">File → Preferences → Settings Sync → Turn On</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">Sync your settings, extensions, and shortcuts across devices</p>
          </div>
          
          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-gray-400">Choose a theme:</p>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedItems.has('setup-theme')}
                  onChange={(e) => {
                    const id = 'setup-theme'
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
            <div className="p-2 bg-black rounded">
              <span className="text-sm text-purple-400">Ctrl+K Ctrl+T (or Cmd+K Cmd+T on Mac)</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">Pick Dark+ (default), Light+, or browse themes in Extensions</p>
          </div>

          <div className="p-3 bg-gray-900 rounded-lg">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-gray-400">Configure auto-save:</p>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checkedItems.has('setup-autosave')}
                  onChange={(e) => {
                    const id = 'setup-autosave'
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
            <div className="p-2 bg-black rounded">
              <span className="text-sm text-purple-400">File → Auto Save → afterDelay</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">Never lose work again! Files save automatically after typing</p>
          </div>
        </div>
        
        <div className="p-3 mt-4 rounded-lg bg-blue-900/30">
          <p className="text-sm text-blue-200">
            💡 <strong>Tip:</strong> These settings make VSCode much more pleasant to use. You can always change them later!
          </p>
        </div>
      </div>

      {/* Completion Checklist */}
      <div className="p-6 border border-gray-600 rounded-lg bg-gray-700/30">
        <h3 className="mb-4 text-lg font-semibold text-white">✅ Installation Checklist</h3>
        <div className="space-y-3">
          {[
            { id: 'downloaded', text: 'Downloaded and installed VSCode on my computer', deps: ['install-choose-method', 'install-download-vscode', 'install-run-installer'] },
            { id: 'verified', text: 'Verified VSCode is working and accessible', deps: ['install-verify-install'] },
            { id: 'configured-sync', text: 'Enabled Settings Sync for cross-device synchronization', deps: ['setup-sync'] },
            { id: 'configured-theme', text: 'Selected a comfortable theme for coding', deps: ['setup-theme'] },
            { id: 'configured-autosave', text: 'Enabled auto-save to prevent data loss', deps: ['setup-autosave'] }
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
              {Array.from(checkedItems).filter(id => id.startsWith('install-') || id.startsWith('setup-')).length}/7 tasks
            </span>
          </div>
          
          <div className="w-full h-4 overflow-hidden bg-gray-700 rounded-full">
            <div 
              className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-green-500 via-emerald-500 to-blue-500"
              style={{ width: `${(Array.from(checkedItems).filter(id => id.startsWith('install-') || id.startsWith('setup-')).length / 7) * 100}%` }}
            />
          </div>
          
          <div className="mt-2 text-xs text-gray-400">
            Complete installation steps and setup to unlock the completion button!
          </div>
        </div>
        
        {/* Auto-complete section when all items checked */}
        {(
          [0,1,2,3,4].every(idx => {
            const item = [
              { deps: ['install-choose-method', 'install-download-vscode', 'install-run-installer'] },
              { deps: ['install-verify-install'] },
              { deps: ['setup-sync'] },
              { deps: ['setup-theme'] },
              { deps: ['setup-autosave'] }
            ][idx]
            return item.deps?.every(dep => checkedItems.has(dep)) || checkedItems.has(`section0-${idx}`)
          }) || 
          [0,1,2,3,4].every(idx => checkedItems.has(`section0-${idx}`))
        ) && !isSectionCompleted('section0') && (
          <div className="mt-6">
            <div className="p-3 mb-3 text-center border border-blue-700 rounded-lg bg-blue-900/30">
              <p className="text-sm text-blue-200">
                🎯 <strong>Ready to finish?</strong> This button will complete your VSCode installation and mark all progress items above.
              </p>
            </div>
            <button
              onClick={() => {
                // Auto-complete ALL installation steps when user clicks completion button
                setCheckedItems(prev => new Set([
                  ...prev, 
                  // Installation progress items (top section)
                  'install-choose-method',
                  'install-download-vscode', 
                  'install-run-installer',
                  'install-verify-install',
                  // Setup items
                  'setup-sync',
                  'setup-theme',
                  'setup-autosave',
                  // Checklist items (will be auto-completed by dependencies, but ensuring they're marked)
                  'section0-0', 'section0-1', 'section0-2', 'section0-3', 'section0-4'
                ]))
                markSectionCompleted('section0')
                triggerAnimation('section0')
              }}
              className="relative w-full px-6 py-4 font-bold text-white transition-all transform rounded-lg shadow-lg bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 hover:from-green-700 hover:via-emerald-700 hover:to-blue-700 hover:scale-105 animate-pulse hover:shadow-green-500/50"
            >
              <span className="flex items-center justify-center space-x-3">
                <span className="text-2xl animate-bounce">🎉</span>
                <span>Complete VSCode Installation & Setup!</span>
                <span className="text-2xl animate-bounce">💻</span>
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
              <h4 className="mb-2 text-lg font-bold text-green-300">Excellent! VSCode is Ready!</h4>
              <p className="text-sm text-green-200">
                You now have the world's most popular code editor installed and configured. Ready to build amazing projects!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
