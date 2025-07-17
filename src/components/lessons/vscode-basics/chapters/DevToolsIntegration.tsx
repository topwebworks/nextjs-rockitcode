'use client'

import React from 'react'

interface DevToolsIntegrationProps {
  terminalHistory: Array<{command: string, output: string}>
  currentCommand: string
  setCurrentCommand: React.Dispatch<React.SetStateAction<string>>
  completedExercises: Set<string>
  handleTerminalCommand: (e: React.KeyboardEvent<HTMLInputElement>) => void
  animateSection: string | null
  isSectionCompleted: (sectionId: string) => boolean
  markSectionCompleted: (sectionId: string) => void
}

export default function DevToolsIntegration({
  terminalHistory,
  currentCommand,
  setCurrentCommand,
  completedExercises,
  handleTerminalCommand,
  animateSection,
  isSectionCompleted,
  markSectionCompleted
}: DevToolsIntegrationProps) {
  return (
    <div 
      data-section="section4"
      className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
      animateSection === 'section4' ? 'ring-2 ring-orange-500 transform scale-105' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-2xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-orange-600 rounded-full">4</span>
          DevTools Integration & Live Development
        </h2>
        {isSectionCompleted('section4') && (
          <div className="flex items-center text-orange-400 animate-pulse">
            <span className="mr-2">✅</span>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>

      <p className="mb-6 text-gray-300">
        Time to bring your code to life! Learn to integrate browser developer tools, live servers, and debugging workflow with VSCode.
      </p>

      {/* Interactive Terminal for Live Development */}
      <div className="mb-6 overflow-hidden bg-black border border-gray-600 rounded-lg">
        <div className="flex items-center px-4 py-2 space-x-2 bg-gray-700">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="ml-4 text-sm text-gray-300">VSCode Development Terminal</span>
        </div>
        
        <div className="p-4 overflow-y-auto h-80">
          {/* Terminal Output */}
          <div className="space-y-2 font-mono text-sm">
            <div className="text-green-400">VSCode DevTools Integration Terminal</div>
            <div className="text-gray-400">Practice development commands and see live results!</div>
            <div className="text-gray-400">Current directory: ~/my-website</div>
            <div className="text-gray-400">─────────────────────────────────────────────────────────</div>
            
            {terminalHistory.map((entry, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-blue-400">
                  <span className="text-green-400">dev@vscode</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~/my-website</span>
                  <span className="text-white">$ {entry.command}</span>
                </div>
                <div className="pl-4 text-gray-300 whitespace-pre-line">
                  {entry.output}
                </div>
              </div>
            ))}
            
            {/* Current Input Line */}
            <div className="flex items-center">
              <span className="text-green-400">dev@vscode</span>
              <span className="text-white">:</span>
              <span className="text-blue-400">~/my-website</span>
              <span className="text-white">$ </span>
              <input
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleTerminalCommand}
                className="flex-1 text-white bg-transparent outline-none"
                placeholder="Type development command here..."
                autoFocus
              />
            </div>
          </div>
        </div>
      </div>

      {/* Development Workflow */}
      <div className="p-6 mb-6 border border-purple-700 rounded-lg bg-purple-900/20">
        <h3 className="mb-4 text-lg font-semibold text-purple-300">🔧 Development Workflow Integration</h3>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-gray-900 border border-purple-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">🌐</span>
              <span className="font-semibold text-purple-300">Live Server</span>
            </div>
            <p className="mb-3 text-sm text-gray-300">Start a local development server with auto-reload</p>
            <div className="p-2 font-mono text-sm bg-black rounded">
              <span className="text-blue-400">Right-click index.html → "Open with Live Server"</span>
            </div>
          </div>
          
          <div className="p-4 bg-gray-900 border border-purple-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">🔍</span>
              <span className="font-semibold text-purple-300">Browser DevTools</span>
            </div>
            <p className="mb-3 text-sm text-gray-300">Debug HTML, CSS, and JavaScript in real-time</p>
            <div className="p-2 font-mono text-sm bg-black rounded">
              <span className="text-blue-400">F12 or Right-click → "Inspect Element"</span>
            </div>
          </div>
          
          <div className="p-4 bg-gray-900 border border-purple-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">🔄</span>
              <span className="font-semibold text-purple-300">Auto-Refresh</span>
            </div>
            <p className="mb-3 text-sm text-gray-300">See changes instantly when you save files</p>
            <div className="p-2 font-mono text-sm bg-black rounded">
              <span className="text-blue-400">Ctrl+S → Browser updates automatically</span>
            </div>
          </div>
          
          <div className="p-4 bg-gray-900 border border-purple-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">📱</span>
              <span className="font-semibold text-purple-300">Responsive Testing</span>
            </div>
            <p className="mb-3 text-sm text-gray-300">Test mobile layouts with device emulation</p>
            <div className="p-2 font-mono text-sm bg-black rounded">
              <span className="text-blue-400">DevTools → Toggle device toolbar</span>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Exercises */}
      <div className="space-y-6">
        <div className="p-6 border border-orange-700 rounded-lg bg-orange-900/20">
          <h3 className="mb-4 text-lg font-semibold text-orange-300">🎯 Live Development Exercises</h3>
          
          <div className="space-y-4">
            {[
              { 
                id: 'ex1', 
                task: 'Check VSCode version', 
                hint: 'Use code --version',
                expectedCommand: 'code --version',
                difficulty: 'Beginner',
                description: 'Verify VSCode command line integration'
              },
              { 
                id: 'ex2', 
                task: 'Open current directory in VSCode', 
                hint: 'Use code with a dot',
                expectedCommand: 'code .',
                difficulty: 'Beginner',
                description: 'Quick way to open project in VSCode'
              },
              { 
                id: 'ex3', 
                task: 'Install Live Server extension', 
                hint: 'Use code --install-extension',
                expectedCommand: 'code --install-extension ms-vscode.live-server',
                difficulty: 'Intermediate',
                description: 'Install extensions from command line'
              },
              { 
                id: 'ex4', 
                task: 'Initialize a new npm project', 
                hint: 'Use npm init with -y flag',
                expectedCommand: 'npm init -y',
                difficulty: 'Intermediate',
                description: 'Set up Node.js project structure'
              },
              { 
                id: 'ex5', 
                task: 'List directory contents', 
                hint: 'Use ls (Mac/Linux) or dir (Windows)',
                expectedCommand: 'ls',
                difficulty: 'Beginner',
                description: 'Basic navigation in terminal'
              }
            ].map((exercise, idx) => (
              <div key={exercise.id} className="p-4 border border-gray-600 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-white">Exercise {idx + 1}: {exercise.task}</h4>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded ${
                      exercise.difficulty === 'Beginner' 
                        ? 'bg-green-800 text-green-200' 
                        : 'bg-yellow-800 text-yellow-200'
                    }`}>
                      {exercise.difficulty}
                    </span>
                    {completedExercises.has(exercise.id) && (
                      <span className="text-green-400">✅</span>
                    )}
                  </div>
                </div>
                
                <p className="mb-2 text-sm text-gray-400">{exercise.description}</p>
                <p className="mb-2 text-sm text-gray-400">💡 Hint: {exercise.hint}</p>
                
                <div className="p-2 font-mono text-sm bg-gray-900 rounded">
                  <span className="text-blue-400">Expected: </span>
                  <span className="text-gray-300">{exercise.expectedCommand}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DevTools Tips */}
        <div className="p-6 border border-blue-700 rounded-lg bg-blue-900/20">
          <h3 className="mb-4 text-lg font-semibold text-blue-300">🛠️ Essential DevTools Tips</h3>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="mb-3 font-semibold text-blue-300">Elements Panel</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Inspect and modify HTML structure</li>
                <li>• Edit CSS styles in real-time</li>
                <li>• See box model visualization</li>
                <li>• Test hover and focus states</li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-3 font-semibold text-blue-300">Console Panel</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• View JavaScript errors and logs</li>
                <li>• Test JavaScript code snippets</li>
                <li>• Monitor network requests</li>
                <li>• Debug performance issues</li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-3 font-semibold text-blue-300">Network Panel</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Monitor file loading times</li>
                <li>• Check for 404 errors</li>
                <li>• Optimize image sizes</li>
                <li>• Test offline scenarios</li>
              </ul>
            </div>
            
            <div>
              <h4 className="mb-3 font-semibold text-blue-300">Mobile Testing</h4>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Emulate different screen sizes</li>
                <li>• Test touch interactions</li>
                <li>• Check responsive breakpoints</li>
                <li>• Simulate slow connections</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Progress Tracking */}
        <div className="p-4 bg-gray-900 border border-gray-600 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="font-semibold text-white">Development Practice Progress</span>
            <span className="text-orange-400">
              {completedExercises.size}/5 exercises completed
            </span>
          </div>
          
          <div className="w-full h-3 overflow-hidden bg-gray-700 rounded-full">
            <div 
              className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-orange-500 to-red-500"
              style={{ width: `${(completedExercises.size / 5) * 100}%` }}
            />
          </div>
          
          <div className="mt-3 text-sm text-gray-400">
            {completedExercises.size === 0 && "Start practicing development commands in the terminal above!"}
            {completedExercises.size > 0 && completedExercises.size < 5 && "Excellent progress! You're building a complete development workflow."}
            {completedExercises.size === 5 && "🎉 All exercises completed! You're ready for professional web development."}
          </div>
        </div>
      </div>

      {/* Complete section button */}
      {completedExercises.size === 5 && !isSectionCompleted('section4') && (
        <button
          onClick={() => markSectionCompleted('section4')}
          className="w-full px-4 py-3 mt-6 font-semibold text-white transition-all transform bg-orange-600 rounded-lg hover:bg-orange-700 hover:scale-105 animate-bounce"
        >
          🚀 DevTools Integration Complete! Ready for Professional Development
        </button>
      )}
    </div>
  )
}
