'use client'

import React from 'react'

interface TerminalBasicsProps {
  checkedItems: Set<string>
  setCheckedItems: React.Dispatch<React.SetStateAction<Set<string>>>
  animateSection: string | null
  isSectionCompleted: (sectionId: string) => boolean
  markSectionCompleted: (sectionId: string) => void
}

export default function TerminalBasics({
  checkedItems,
  setCheckedItems,
  animateSection,
  isSectionCompleted,
  markSectionCompleted
}: TerminalBasicsProps) {
  return (
    <div 
      data-section="section3"
      className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
      animateSection === 'section3' ? 'ring-2 ring-green-500 transform scale-105' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-2xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-green-600 rounded-full">3</span>
          Mastering the Integrated Terminal
        </h2>
        {isSectionCompleted('section3') && (
          <div className="flex items-center text-green-400 animate-pulse">
            <span className="mr-2">✅</span>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>

      <p className="mb-6 text-gray-300">
        The integrated terminal is one of VSCode's most powerful features. No more switching between windows - run commands right where you code!
      </p>

      {/* Terminal Benefits */}
      <div className="p-6 mb-6 border border-blue-700 rounded-lg bg-blue-900/20">
        <h3 className="mb-4 text-lg font-semibold text-blue-300">🚀 Why Use the Integrated Terminal?</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-gray-900 border border-blue-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">⚡</span>
              <span className="font-semibold text-blue-300">Stay in Flow</span>
            </div>
            <p className="text-sm text-gray-300">No context switching between editor and terminal</p>
          </div>
          
          <div className="p-4 bg-gray-900 border border-blue-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">📁</span>
              <span className="font-semibold text-blue-300">Project Context</span>
            </div>
            <p className="text-sm text-gray-300">Terminal opens in your project directory automatically</p>
          </div>
          
          <div className="p-4 bg-gray-900 border border-blue-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">🔗</span>
              <span className="font-semibold text-blue-300">Click Links</span>
            </div>
            <p className="text-sm text-gray-300">Clickable file paths and URLs in terminal output</p>
          </div>
          
          <div className="p-4 bg-gray-900 border border-blue-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">🎨</span>
              <span className="font-semibold text-blue-300">Consistent Theme</span>
            </div>
            <p className="text-sm text-gray-300">Terminal matches your editor theme</p>
          </div>
        </div>
      </div>

      {/* Interactive Step Tracker */}
      <div className="p-6 mb-6 border border-green-700 rounded-lg bg-green-900/20">
        <h3 className="mb-4 text-lg font-semibold text-green-300">📝 Terminal Mastery Checklist</h3>
        <div className="space-y-4">
          {[
            { id: 'open', text: 'Open integrated terminal', shortcut: 'Ctrl+` (backtick)', tip: 'Fastest way to access terminal' },
            { id: 'multiple', text: 'Create multiple terminal sessions', shortcut: 'Ctrl+Shift+`', tip: 'Run different commands simultaneously' },
            { id: 'split', text: 'Split terminal pane', shortcut: 'Ctrl+Shift+5', tip: 'Work with multiple terminals side-by-side' },
            { id: 'shell', text: 'Switch shell types (PowerShell, CMD, Bash)', shortcut: 'Terminal dropdown', tip: 'Use the right shell for the job' },
            { id: 'navigate', text: 'Navigate with terminal', command: 'cd, ls/dir, pwd', tip: 'Essential navigation commands' },
            { id: 'npm', text: 'Run npm/node commands', command: 'npm init, npm install', tip: 'Manage JavaScript projects' },
            { id: 'git', text: 'Use Git commands', command: 'git status, git add, git commit', tip: 'Version control from terminal' }
          ].map((step, idx) => (
            <div key={step.id} className="flex items-start space-x-3">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems.has(`terminal-${step.id}`)}
                  onChange={(e) => {
                    const id = `terminal-${step.id}`
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
                  className="w-5 h-5 text-green-600 transition-all bg-gray-700 border-gray-500 rounded focus:ring-green-500"
                />
                <div className="ml-3">
                  <span className={`text-sm transition-all duration-300 ${
                    checkedItems.has(`terminal-${step.id}`) 
                      ? 'text-green-300 line-through' 
                      : 'text-gray-300 group-hover:text-white'
                  }`}>
                    {idx + 1}. {step.text}
                  </span>
                  <div className="mt-1 text-xs text-gray-500">
                    {step.shortcut && <span className="px-1 bg-gray-700 rounded">{step.shortcut}</span>}
                    {step.command && <span className="px-1 font-mono bg-gray-700 rounded">{step.command}</span>}
                    {step.tip && <span className="ml-2 italic">💡 {step.tip}</span>}
                  </div>
                </div>
              </label>
              {step.command && (
                <button
                  onClick={() => navigator.clipboard.writeText(step.command)}
                  className="px-2 py-1 text-xs text-gray-300 transition-colors bg-gray-700 rounded hover:bg-gray-600"
                  title="Copy command"
                >
                  📋
                </button>
              )}
            </div>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Progress: {Array.from(checkedItems).filter(id => id.startsWith('terminal-')).length}/7 skills
            </span>
            <span className="text-sm text-green-400">
              {Math.round((Array.from(checkedItems).filter(id => id.startsWith('terminal-')).length / 7) * 100)}%
            </span>
          </div>
          <div className="w-full h-3 overflow-hidden bg-gray-700 rounded-full">
            <div 
              className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-green-500 to-emerald-500"
              style={{ width: `${(Array.from(checkedItems).filter(id => id.startsWith('terminal-')).length / 7) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Essential Commands Reference */}
      <div className="p-6 mb-6 bg-gray-900 border border-gray-600 rounded-lg">
        <h3 className="mb-4 text-lg font-semibold text-white">📋 Essential Terminal Commands</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h4 className="mb-3 font-semibold text-purple-300">Navigation & Files</h4>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-blue-400">pwd</span>
                <span className="text-gray-400">Show current directory</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400">ls / dir</span>
                <span className="text-gray-400">List files and folders</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400">cd folder</span>
                <span className="text-gray-400">Change directory</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400">mkdir folder</span>
                <span className="text-gray-400">Create new folder</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400">touch file.txt</span>
                <span className="text-gray-400">Create new file</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="mb-3 font-semibold text-green-300">Development</h4>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between">
                <span className="text-blue-400">npm init</span>
                <span className="text-gray-400">Initialize Node project</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400">npm install</span>
                <span className="text-gray-400">Install dependencies</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400">npm start</span>
                <span className="text-gray-400">Start development server</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400">code .</span>
                <span className="text-gray-400">Open current folder in VSCode</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-400">python -m http.server</span>
                <span className="text-gray-400">Start Python web server</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Features */}
      <div className="p-6 mb-6 border border-purple-700 rounded-lg bg-purple-900/20">
        <h3 className="mb-4 text-lg font-semibold text-purple-300">🌟 Advanced Terminal Features</h3>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-white">Terminal Profiles</h4>
            <p className="mb-2 text-sm text-gray-300">Create custom terminal configurations for different projects:</p>
            <ul className="text-sm text-gray-400">
              <li>• Different shells (PowerShell, Bash, Command Prompt)</li>
              <li>• Custom startup commands</li>
              <li>• Environment variables</li>
              <li>• Working directory preferences</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-white">Task Integration</h4>
            <p className="mb-2 text-sm text-gray-300">Run VSCode tasks directly in terminal:</p>
            <ul className="text-sm text-gray-400">
              <li>• Build scripts and compilation</li>
              <li>• Test runners</li>
              <li>• Development servers</li>
              <li>• Custom automation tasks</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-white">Shell Integration</h4>
            <p className="mb-2 text-sm text-gray-300">Enhanced shell features:</p>
            <ul className="text-sm text-gray-400">
              <li>• Command history across sessions</li>
              <li>• Tab completion for file paths</li>
              <li>• Right-click context menus</li>
              <li>• Automatic working directory detection</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="p-4 mb-6 border border-yellow-700 rounded-lg bg-yellow-900/30">
        <div className="flex items-center mb-3">
          <span className="mr-2 text-yellow-400">💡</span>
          <span className="font-semibold text-yellow-300">Pro Tips:</span>
        </div>
        <ul className="space-y-1 text-sm text-yellow-200">
          <li>• Use <kbd className="px-1 text-xs bg-gray-700 rounded">Ctrl+C</kbd> to stop running commands</li>
          <li>• Press <kbd className="px-1 text-xs bg-gray-700 rounded">↑</kbd> arrow to repeat previous commands</li>
          <li>• Right-click terminal output to copy text</li>
          <li>• Drag files from Explorer into terminal for instant paths</li>
          <li>• Use <kbd className="px-1 text-xs bg-gray-700 rounded">Tab</kbd> to auto-complete file/folder names</li>
        </ul>
      </div>

      {/* Complete section button */}
      {Array.from(checkedItems).filter(id => id.startsWith('terminal-')).length >= 5 && !isSectionCompleted('section3') && (
        <button
          onClick={() => markSectionCompleted('section3')}
          className="w-full px-4 py-3 font-semibold text-white transition-all transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 animate-bounce"
        >
          🎉 Terminal Mastery Complete!
        </button>
      )}
    </div>
  )
}
