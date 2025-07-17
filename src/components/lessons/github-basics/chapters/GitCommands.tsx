'use client'

import React from 'react'
import { Icons } from '../../shared/Icons'

interface GitCommandsProps {
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

export default function GitCommands({
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
}: GitCommandsProps) {
  return (
    <div 
      data-section="section2"
      className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
      animateSection === 'section2' ? 'ring-2 ring-purple-500 transform scale-105' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-2xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-purple-600 rounded-full">2</span>
          Essential Git Commands
        </h2>
        {isSectionCompleted('section2') && (
          <div className="flex items-center text-green-400 animate-pulse">
            <span className="mr-2">✅</span>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>

      <p className="mb-6 text-gray-300">
        These 5 commands handle 90% of your daily Git usage. Let's see them in action:
      </p>

      {/* Detailed Commands with Toggles */}
      <div className="space-y-6">
        {[
          {
            command: 'git init',
            description: 'Start tracking a project',
            example: '# Creates a new Git repository\ngit init my-first-website\n\n# Result: Creates .git folder to track changes',
            icon: <Icons.Terminal />,
            color: 'blue',
            exerciseId: 'init',
            challenge: 'Initialize a new repository called "my-portfolio"',
            solution: 'git init my-portfolio'
          },
          {
            command: 'git add',
            description: 'Stage files for commit',
            example: '# Add specific file\ngit add index.html\n\n# Add all files\ngit add .\n\n# Add multiple files\ngit add *.css *.js',
            icon: <Icons.Code />,
            color: 'green',
            exerciseId: 'add',
            challenge: 'Stage all files in your project for commit',
            solution: 'git add .'
          },
          {
            command: 'git commit',
            description: 'Save a snapshot',
            example: '# Save your changes with a message\ngit commit -m "Add homepage header"\n\n# More detailed commit\ngit commit -m "Add contact form\n\n- Added email validation\n- Styled with CSS\n- Added success message"',
            icon: <Icons.CheckCircle />,
            color: 'yellow',
            exerciseId: 'commit',
            challenge: 'Commit your changes with the message "Initial portfolio setup"',
            solution: 'git commit -m "Initial portfolio setup"'
          },
          {
            command: 'git push',
            description: 'Upload to GitHub',
            example: '# Send your commits to GitHub\ngit push origin main\n\n# First time push\ngit push -u origin main',
            icon: <Icons.Rocket />,
            color: 'purple',
            exerciseId: 'push',
            challenge: 'Push your repository to GitHub for the first time',
            solution: 'git push -u origin main'
          },
          {
            command: 'git pull',
            description: 'Download latest changes',
            example: '# Get updates from GitHub\ngit pull origin main\n\n# Pull and merge automatically\ngit pull',
            icon: <Icons.GitBranch />,
            color: 'indigo',
            exerciseId: 'pull',
            challenge: 'Pull the latest changes from the main branch',
            solution: 'git pull origin main'
          }
        ].map((cmd, idx) => (
          <div key={idx} className="overflow-hidden transition-all border border-gray-600 rounded-lg hover:border-gray-500">
            <div 
              className={`bg-gray-700 px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-600 transition-colors`}
              onClick={() => setActiveToggle(activeToggle === `cmd-${idx}` ? null : `cmd-${idx}`)}
            >
              <div className="flex items-center space-x-3">
                <div className={`text-${cmd.color}-400`}>{cmd.icon}</div>
                <div>
                  <span className={`font-mono text-${cmd.color}-400 font-bold`}>{cmd.command}</span>
                  <span className="ml-4 text-gray-300">{cmd.description}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {codingCompleted.has(cmd.exerciseId) && (
                  <div className="flex items-center text-green-400">
                    <Icons.CheckCircle />
                    <span className="ml-1 text-sm">Completed</span>
                  </div>
                )}
                <button className="text-blue-400 transition-colors transform hover:text-blue-300">
                  <span className={`transform transition-transform duration-200 ${
                    activeToggle === `cmd-${idx}` ? 'rotate-90' : ''
                  }`}>
                    ▶
                  </span>
                </button>
              </div>
            </div>
            {activeToggle === `cmd-${idx}` && (
              <div className="px-4 py-3 bg-gray-900 animate-slideDown">
                <pre className="mb-4 font-mono text-sm text-green-400 whitespace-pre-wrap">
                  {cmd.example}
                </pre>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      // Copy to clipboard logic
                      navigator.clipboard.writeText(cmd.command)
                    }}
                    className="px-3 py-1 text-xs text-white transition-colors bg-blue-600 rounded hover:bg-blue-700"
                  >
                    📋 Copy
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCheckedItems(prev => new Set([...prev, `cmd-${idx}`]))
                    }}
                    className={`px-3 py-1 text-xs rounded transition-all ${
                      checkedItems.has(`cmd-${idx}`)
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                    }`}
                  >
                    {checkedItems.has(`cmd-${idx}`) ? '✅ Got it!' : '🎯 Mark as learned'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interactive Command Sequence */}
      <div className="p-6 mt-8 mb-6 border border-yellow-700 rounded-lg bg-yellow-900/20">
        <h3 className="mb-4 text-lg font-semibold text-yellow-300">🎯 Command Sequence Challenge</h3>
        <p className="mb-4 text-yellow-200">Drag the commands into the correct order for creating a new project:</p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {/* Draggable Commands */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-300">Available Commands (drag these):</h4>
            <div className="space-y-2">
              {[
                { cmd: 'git push', order: 5, id: 'push' },
                { cmd: 'git init', order: 1, id: 'init' },
                { cmd: 'git commit', order: 4, id: 'commit' },
                { cmd: 'git add', order: 3, id: 'add' },
                { cmd: 'Create files', order: 2, id: 'create' }
              ].filter(command => !commandSequence.includes(command.id)).map((command) => (
                <div
                  key={command.id}
                  draggable
                  onDragStart={(e) => {
                    setDraggedCommand(command.id)
                    e.dataTransfer.effectAllowed = 'move'
                  }}
                  onDragEnd={() => setDraggedCommand(null)}
                  className={`p-3 bg-purple-900/30 border border-purple-700 rounded-lg cursor-move hover:bg-purple-800/40 transition-all transform hover:scale-105 ${
                    draggedCommand === command.id ? 'opacity-50 rotate-3' : ''
                  }`}
                >
                  <span className="font-mono text-purple-300">{command.cmd}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Drop Zones */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-gray-300">Correct Order (drop here):</h4>
            <div className="space-y-2">
              {[1,2,3,4,5].map((step) => {
                const commandData = [
                  { cmd: 'git init', order: 1, id: 'init' },
                  { cmd: 'Create files', order: 2, id: 'create' },
                  { cmd: 'git add', order: 3, id: 'add' },
                  { cmd: 'git commit', order: 4, id: 'commit' },
                  { cmd: 'git push', order: 5, id: 'push' }
                ]
                const placedCommand = commandSequence[step - 1]
                const commandInfo = commandData.find(cmd => cmd.id === placedCommand)
                
                return (
                  <div
                    key={step}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault()
                      if (draggedCommand) {
                        const newSequence = [...commandSequence]
                        // Remove command from other positions first
                        const currentIndex = newSequence.indexOf(draggedCommand)
                        if (currentIndex !== -1) {
                          newSequence[currentIndex] = null
                        }
                        // Place command in new position
                        newSequence[step - 1] = draggedCommand
                        setCommandSequence(newSequence)
                        setDraggedCommand(null)
                      }
                    }}
                    className={`p-3 border-2 border-dashed rounded-lg min-h-[50px] flex items-center justify-center transition-colors ${
                      placedCommand 
                        ? 'bg-green-900/30 border-green-500 text-green-300' 
                        : 'bg-gray-700/50 border-gray-600 text-gray-400 hover:border-green-500'
                    }`}
                  >
                    {placedCommand ? (
                      <div className="flex items-center justify-between w-full">
                        <span className="font-mono text-green-300">{commandInfo?.cmd}</span>
                        <button
                          onClick={() => {
                            const newSequence = [...commandSequence]
                            newSequence[step - 1] = null
                            setCommandSequence(newSequence)
                          }}
                          className="text-red-400 hover:text-red-300"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      `Step ${step}: Drop command here`
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Sequence Validation */}
        {commandSequence.every(cmd => cmd !== null) && (
          <div className={`mt-4 p-4 rounded-lg border ${
            commandSequence.join(',') === 'init,create,add,commit,push'
              ? 'border-green-700 bg-green-900/30'
              : 'border-red-700 bg-red-900/30'
          }`}>
            {commandSequence.join(',') === 'init,create,add,commit,push' ? (
              <div>
                <div className="mb-3 text-green-300">
                  🎉 Perfect! You've got the correct Git workflow sequence!
                </div>
                {!checkedItems.has('sequence-challenge') && (
                  <button
                    onClick={() => {
                      setCheckedItems(prev => new Set([...prev, 'sequence-challenge']))
                      triggerAnimation('sequence-challenge')
                    }}
                    className="px-4 py-2 text-sm font-semibold text-white transition-all transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 animate-pulse"
                  >
                    ✅ Mark Challenge Complete
                  </button>
                )}
                {checkedItems.has('sequence-challenge') && (
                  <div className="flex items-center text-green-400">
                    <span className="mr-2">✅</span>
                    <span className="text-sm">Challenge Completed!</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-red-300">
                ❌ Not quite right. Try again! Remember: initialize → create files → stage → commit → push
              </div>
            )}
          </div>
        )}
      </div>

      {/* Progress indicator */}
      <div className="pt-4 mt-6 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-400">
            Commands learned: {Array.from(checkedItems).filter(id => id.startsWith('cmd-')).length}/5
            {checkedItems.has('sequence-challenge') && (
              <span className="ml-2 text-green-400">• Sequence Challenge ✓</span>
            )}
          </span>
          <div className="w-32 h-2 overflow-hidden bg-gray-700 rounded-full">
            <div 
              className="h-full transition-all duration-500 bg-gradient-to-r from-purple-500 to-blue-500"
              style={{ width: `${(Array.from(checkedItems).filter(id => id.startsWith('cmd-')).length / 5) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Auto-complete section when requirements met */}
        {Array.from(checkedItems).filter(id => id.startsWith('cmd-')).length >= 3 && 
         checkedItems.has('sequence-challenge') && 
         !isSectionCompleted('section2') && (
          <div className="mt-4">
            <button
              onClick={() => markSectionCompleted('section2')}
              className="w-full px-4 py-3 font-semibold text-white transition-all transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 animate-bounce"
            >
              🎉 Complete Git Commands Section!
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
