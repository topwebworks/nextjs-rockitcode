'use client'

import React from 'react'
import { Icons } from '../../shared/Icons'

interface ExtensionsManagementProps {
  checkedItems: Set<string>
  setCheckedItems: React.Dispatch<React.SetStateAction<Set<string>>>
  activeToggle: string | null
  setActiveToggle: React.Dispatch<React.SetStateAction<string | null>>
  codingCompleted: Set<string>
  draggedCommand: string | null
  setDraggedCommand: React.Dispatch<React.SetStateAction<string | null>>
  commandSequence: (string | null)[]
  setCommandSequence: React.Dispatch<React.SetStateAction<(string | null)[]>>
  animateSection: string | null
  isSectionCompleted: (sectionId: string) => boolean
  markSectionCompleted: (sectionId: string) => void
  triggerAnimation: (sectionId: string) => void
}

export default function ExtensionsManagement({
  checkedItems,
  setCheckedItems,
  activeToggle,
  setActiveToggle,
  codingCompleted,
  draggedCommand,
  setDraggedCommand,
  commandSequence,
  setCommandSequence,
  animateSection,
  isSectionCompleted,
  markSectionCompleted,
  triggerAnimation
}: ExtensionsManagementProps) {
  return (
    <div 
      data-section="section2"
      className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
      animateSection === 'section2' ? 'ring-2 ring-purple-500 transform scale-105' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-2xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-purple-600 rounded-full">2</span>
          Essential Extensions Management
        </h2>
        {isSectionCompleted('section2') && (
          <div className="flex items-center text-green-400 animate-pulse">
            <span className="mr-2">✅</span>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>

      <p className="mb-6 text-gray-300">
        Extensions are what make VSCode incredibly powerful. These 5 extensions will transform your development experience and handle 90% of web development needs:
      </p>

      {/* Essential Extensions with Toggles */}
      <div className="space-y-6">
        {[
          {
            name: 'Live Server',
            id: 'ms-vscode.live-server',
            description: 'Launch a local development server with live reload',
            features: '• Auto-refresh browser when you save files\n• Local development server\n• Works with any HTML/CSS/JS project\n• Perfect for testing responsive designs',
            icon: <Icons.Rocket />,
            color: 'blue',
            exerciseId: 'live-server',
            challenge: 'Install Live Server and launch a local development server',
            benefit: 'See your changes instantly without manually refreshing the browser'
          },
          {
            name: 'GitHub Copilot',
            id: 'GitHub.copilot',
            description: 'AI-powered code completion and suggestions',
            features: '• AI-powered code suggestions\n• Context-aware completions\n• Write code faster with AI assistance\n• Learn coding patterns from AI',
            icon: <Icons.Code />,
            color: 'green',
            exerciseId: 'copilot',
            challenge: 'Install GitHub Copilot and try AI code suggestions',
            benefit: 'Write code 40% faster with intelligent AI assistance'
          },
          {
            name: 'Prettier',
            id: 'esbenp.prettier-vscode',
            description: 'Code formatter for consistent styling',
            features: '• Auto-format code on save\n• Consistent code style\n• Supports HTML, CSS, JavaScript, JSON\n• Customizable formatting rules',
            icon: <Icons.CheckCircle />,
            color: 'yellow',
            exerciseId: 'prettier',
            challenge: 'Install Prettier and enable format on save',
            benefit: 'Never worry about code formatting again - it happens automatically'
          },
          {
            name: 'Auto Rename Tag',
            id: 'formulahendry.auto-rename-tag',
            description: 'Automatically rename paired HTML tags',
            features: '• Rename opening tag → closing tag updates automatically\n• Works with HTML, XML, JSX\n• Prevents broken tag pairs\n• Saves time and reduces errors',
            icon: <Icons.Terminal />,
            color: 'purple',
            exerciseId: 'auto-rename',
            challenge: 'Install Auto Rename Tag and test with HTML elements',
            benefit: 'Edit HTML tags twice as fast without breaking your markup'
          },
          {
            name: 'Bracket Pair Colorizer',
            id: 'CoenraadS.bracket-pair-colorizer-2',
            description: 'Color-code matching brackets and parentheses',
            features: '• Different colors for nested brackets\n• Easily see matching pairs\n• Customizable color schemes\n• Works with all languages',
            icon: <Icons.GitBranch />,
            color: 'indigo',
            exerciseId: 'brackets',
            challenge: 'Install Bracket Pair Colorizer and view nested code',
            benefit: 'Never lose track of which brackets belong together'
          }
        ].map((ext, idx) => (
          <div key={idx} className="overflow-hidden transition-all border border-gray-600 rounded-lg hover:border-gray-500">
            <div 
              className={`bg-gray-700 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-600 transition-colors`}
              onClick={() => setActiveToggle(activeToggle === `ext-${idx}` ? null : `ext-${idx}`)}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-${ext.color}-400`}>{ext.icon}</div>
                <div>
                  <span className={`font-semibold text-${ext.color}-400`}>{ext.name}</span>
                  <span className="ml-4 text-gray-300">{ext.description}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {codingCompleted.has(ext.exerciseId) && (
                  <div className="flex items-center text-green-400">
                    <Icons.CheckCircle />
                    <span className="ml-1 text-sm">Installed</span>
                  </div>
                )}
                <button className="text-blue-400 transition-colors transform hover:text-blue-300">
                  <span className={`transform transition-transform duration-200 ${
                    activeToggle === `ext-${idx}` ? 'rotate-90' : ''
                  }`}>
                    ▶
                  </span>
                </button>
              </div>
            </div>
            {activeToggle === `ext-${idx}` && (
              <div className="px-4 py-3 bg-gray-900 animate-slideDown">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h5 className="mb-2 font-semibold text-white">Features:</h5>
                    <pre className="mb-4 font-mono text-sm text-green-400 whitespace-pre-wrap">
                      {ext.features}
                    </pre>
                  </div>
                  <div>
                    <h5 className="mb-2 font-semibold text-white">Why you need it:</h5>
                    <p className="mb-4 text-sm text-blue-200">{ext.benefit}</p>
                    
                    <div className="p-3 border border-purple-700 rounded-lg bg-purple-900/30">
                      <p className="mb-2 text-sm font-semibold text-purple-300">Extension ID:</p>
                      <code className="text-xs text-purple-200">{ext.id}</code>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Copy extension ID to clipboard
                      navigator.clipboard.writeText(ext.id)
                    }}
                    className="px-3 py-1 text-xs text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                  >
                    📋 Copy Extension ID
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCheckedItems(prev => new Set([...prev, `ext-${idx}`]))
                    }}
                    className={`px-3 py-1 text-xs rounded transition-all ${
                      checkedItems.has(`ext-${idx}`)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                    }`}
                  >
                    {checkedItems.has(`ext-${idx}`) ? '✅ Installed!' : '🎯 Mark as installed'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Installation Methods */}
      <div className="p-6 mt-8 mb-6 border border-green-700 rounded-lg bg-green-900/20">
        <h3 className="mb-4 text-lg font-semibold text-green-300">🎯 How to Install Extensions</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-green-300">Method 1: Extensions Panel</h4>
            <ol className="space-y-1 text-sm text-gray-300">
              <li>1. Click Extensions icon in sidebar (or Ctrl+Shift+X)</li>
              <li>2. Search for extension name</li>
              <li>3. Click "Install" button</li>
              <li>4. Extension is ready to use!</li>
            </ol>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-green-300">Method 2: Command Palette</h4>
            <ol className="space-y-1 text-sm text-gray-300">
              <li>1. Press Ctrl+Shift+P (Cmd+Shift+P on Mac)</li>
              <li>2. Type "Extensions: Install Extensions"</li>
              <li>3. Search and install</li>
              <li>4. Use extension ID for exact matches</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Interactive Extension Priority Challenge */}
      <div className="p-6 mt-8 mb-6 border border-yellow-700 rounded-lg bg-yellow-900/20">
        <h3 className="mb-4 text-lg font-semibold text-yellow-300">🎯 Extension Priority Challenge</h3>
        <p className="mb-4 text-yellow-200">Drag the extensions in order of importance for a new web developer (most important first):</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Draggable Extensions */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-300">Available Extensions (drag these):</h4>
            <div className="space-y-2">
              {[
                { name: 'Live Server', order: 1, id: 'live-server' },
                { name: 'Prettier', order: 2, id: 'prettier' },
                { name: 'Auto Rename Tag', order: 3, id: 'auto-rename' },
                { name: 'GitHub Copilot', order: 4, id: 'copilot' },
                { name: 'Bracket Pair Colorizer', order: 5, id: 'brackets' }
              ].filter(ext => !commandSequence.includes(ext.id)).map((ext) => (
                <div
                  key={ext.id}
                  draggable
                  onDragStart={(e) => {
                    setDraggedCommand(ext.id)
                    e.dataTransfer.effectAllowed = 'move'
                  }}
                  onDragEnd={() => setDraggedCommand(null)}
                  className={`p-3 bg-purple-900/30 border border-purple-700 rounded-lg cursor-move hover:bg-purple-800/40 transition-all transform hover:scale-105 ${
                    draggedCommand === ext.id ? 'opacity-50 rotate-3' : ''
                  }`}
                >
                  <span className="font-semibold text-purple-300">{ext.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Drop Zones */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-300">Priority Order (most important first):</h4>
            <div className="space-y-2">
              {[1,2,3,4,5].map((priority) => {
                const extData = [
                  { name: 'Live Server', order: 1, id: 'live-server' },
                  { name: 'Prettier', order: 2, id: 'prettier' },
                  { name: 'Auto Rename Tag', order: 3, id: 'auto-rename' },
                  { name: 'GitHub Copilot', order: 4, id: 'copilot' },
                  { name: 'Bracket Pair Colorizer', order: 5, id: 'brackets' }
                ]
                const placedExt = commandSequence[priority - 1]
                const extInfo = extData.find(ext => ext.id === placedExt)
                
                return (
                  <div
                    key={priority}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      if (draggedCommand) {
                        const newSequence = [...commandSequence]
                        // Remove extension from other positions first
                        const currentIndex = newSequence.indexOf(draggedCommand)
                        if (currentIndex !== -1) {
                          newSequence[currentIndex] = null
                        }
                        // Place extension in new position
                        newSequence[priority - 1] = draggedCommand
                        setCommandSequence(newSequence)
                        setDraggedCommand(null)
                      }
                    }}
                    className={`p-3 border-2 border-dashed rounded-lg min-h-[50px] flex items-center justify-center transition-colors ${
                      placedExt 
                        ? 'bg-green-900/30 border-green-500 text-green-300' 
                        : 'bg-gray-700/50 border-gray-600 text-gray-400 hover:border-green-500'
                    }`}
                  >
                    {placedExt ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-green-300">{extInfo?.name}</span>
                        <button
                          onClick={() => {
                            const newSequence = [...commandSequence]
                            newSequence[priority - 1] = null
                            setCommandSequence(newSequence)
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      `${priority}. Most important`
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Priority Validation */}
        {commandSequence.every(ext => ext !== null) && (
          <div className={`mt-4 p-4 rounded-lg border ${
            commandSequence.join(',') === 'live-server,prettier,auto-rename,copilot,brackets'
              ? 'border-green-700 bg-green-900/30'
              : 'border-yellow-700 bg-yellow-900/30'
          }`}>
            {commandSequence.join(',') === 'live-server,prettier,auto-rename,copilot,brackets' ? (
              <div>
                <div className="mb-3 text-green-300">
                  🎉 Excellent priority order! You understand which extensions provide the most immediate value!
                </div>
                {!checkedItems.has('priority-challenge') && (
                  <button
                    onClick={() => {
                      setCheckedItems(prev => new Set([...prev, 'priority-challenge']))
                      triggerAnimation('priority-challenge')
                    }}
                    className="px-4 py-2 text-sm font-semibold text-white transition-all transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 animate-pulse"
                  >
                    ✅ Mark Challenge Complete
                  </button>
                )}
                {checkedItems.has('priority-challenge') && (
                  <div className="flex items-center text-green-400">
                    <span className="mr-2">✅</span>
                    <span className="text-sm">Challenge Completed!</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-yellow-300">
                💡 Good attempt! Consider: Live Server gives immediate feedback, Prettier keeps code clean, Auto Rename saves time. 
                Any order that prioritizes productivity is valid!
                {!checkedItems.has('priority-challenge') && (
                  <button
                    onClick={() => {
                      setCheckedItems(prev => new Set([...prev, 'priority-challenge']))
                      triggerAnimation('priority-challenge')
                    }}
                    className="block px-4 py-2 mt-2 text-sm font-semibold text-white transition-all transform bg-yellow-600 rounded-lg hover:bg-yellow-700 hover:scale-105"
                  >
                    ✅ Accept My Order
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Extension Management Tips */}
      <div className="p-6 mb-6 border border-blue-700 rounded-lg bg-blue-900/20">
        <h3 className="mb-4 text-lg font-semibold text-blue-300">💡 Extension Management Tips</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-blue-300">Best Practices</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Start with 3-5 essential extensions</li>
              <li>• Disable extensions you don't use</li>
              <li>• Update extensions regularly</li>
              <li>• Read extension descriptions carefully</li>
            </ul>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-blue-300">Useful Shortcuts</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• <kbd className="px-1 text-xs bg-gray-700 rounded">Ctrl+Shift+X</kbd> Open Extensions</li>
              <li>• <kbd className="px-1 text-xs bg-gray-700 rounded">@installed</kbd> View installed extensions</li>
              <li>• <kbd className="px-1 text-xs bg-gray-700 rounded">@enabled</kbd> View enabled extensions</li>
              <li>• <kbd className="px-1 text-xs bg-gray-700 rounded">@disabled</kbd> View disabled extensions</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="pt-4 mt-6 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Extensions installed: {Array.from(checkedItems).filter(id => id.startsWith('ext-')).length}/5
            {checkedItems.has('priority-challenge') && (
              <span className="ml-2 text-green-400">• Priority Challenge ✓</span>
            )}
          </span>
          <div className="w-32 h-2 overflow-hidden bg-gray-700 rounded-full">
            <div 
              className="h-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-blue-500"
              style={{ width: `${(Array.from(checkedItems).filter(id => id.startsWith('ext-')).length / 5) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Auto-complete section when requirements met */}
        {Array.from(checkedItems).filter(id => id.startsWith('ext-')).length >= 3 && 
         checkedItems.has('priority-challenge') && 
         !isSectionCompleted('section2') && (
          <div className="mt-4">
            <button
              onClick={() => markSectionCompleted('section2')}
              className="w-full px-4 py-3 font-semibold text-white transition-all transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 animate-bounce"
            >
              🎉 Complete Extensions Management Section!
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
