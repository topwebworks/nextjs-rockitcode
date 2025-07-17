'use client'

import React from 'react'

interface GitHubRepoProps {
  checkedItems: Set<string>
  setCheckedItems: React.Dispatch<React.SetStateAction<Set<string>>>
  animateSection: string | null
  isSectionCompleted: (sectionId: string) => boolean
  markSectionCompleted: (sectionId: string) => void
}

export default function GitHubRepo({
  checkedItems,
  setCheckedItems,
  animateSection,
  isSectionCompleted,
  markSectionCompleted
}: GitHubRepoProps) {
  return (
    <div 
      data-section="section3"
      className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
      animateSection === 'section3' ? 'ring-2 ring-green-500 transform scale-105' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-2xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-green-600 rounded-full">3</span>
          Your First GitHub Repository
        </h2>
        {isSectionCompleted('section3') && (
          <div className="flex items-center text-green-400 animate-pulse">
            <span className="mr-2">✅</span>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>

      <p className="mb-6 text-gray-300">
        Let's create your first project and put it on GitHub. Follow this real example:
      </p>

      {/* Interactive Step Tracker */}
      <div className="p-6 mb-6 border border-green-700 rounded-lg bg-green-900/20">
        <h3 className="mb-4 text-lg font-semibold text-green-300">📝 Repository Creation Checklist</h3>
        <div className="space-y-4">
          {[
            { id: 'folder', text: 'Create project folder', command: 'mkdir my-portfolio && cd my-portfolio' },
            { id: 'html', text: 'Create your first HTML file', command: 'echo "<h1>Welcome to My Portfolio</h1>" > index.html' },
            { id: 'init', text: 'Initialize Git repository', command: 'git init' },
            { id: 'add', text: 'Stage your files', command: 'git add index.html' },
            { id: 'commit', text: 'Make your first commit', command: 'git commit -m "Initial commit: Add homepage"' },
            { id: 'remote', text: 'Connect to GitHub', command: 'git remote add origin https://github.com/yourusername/my-portfolio.git' },
            { id: 'push', text: 'Push to GitHub', command: 'git push -u origin main' }
          ].map((step, idx) => (
            <div key={step.id} className="flex items-start space-x-3">
              <label className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checkedItems.has(`step-${step.id}`)}
                  onChange={(e) => {
                    const id = `step-${step.id}`
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
                <span className={`ml-3 text-sm transition-all duration-300 ${
                  checkedItems.has(`step-${step.id}`) 
                    ? 'text-green-300 line-through' 
                    : 'text-gray-300 group-hover:text-white'
                }`}>
                  {idx + 1}. {step.text}
                </span>
              </label>
              <button
                onClick={() => navigator.clipboard.writeText(step.command)}
                className="px-2 py-1 text-xs text-gray-300 transition-colors bg-gray-700 rounded hover:bg-gray-600"
                title="Copy command"
              >
                📋
              </button>
            </div>
          ))}
        </div>
        
        {/* Progress bar */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Progress: {Array.from(checkedItems).filter(id => id.startsWith('step-')).length}/7 steps
            </span>
            <span className="text-sm text-green-400">
              {Math.round((Array.from(checkedItems).filter(id => id.startsWith('step-')).length / 7) * 100)}%
            </span>
          </div>
          <div className="w-full h-3 overflow-hidden bg-gray-700 rounded-full">
            <div 
              className="h-full transition-all duration-500 ease-out bg-gradient-to-r from-green-500 to-emerald-500"
              style={{ width: `${(Array.from(checkedItems).filter(id => id.startsWith('step-')).length / 7) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6 mb-6 bg-gray-900 border border-gray-600 rounded-lg">
        <div className="mb-4 font-mono text-sm text-green-400">Step-by-step: Creating "my-portfolio"</div>
        
        <div className="space-y-4 font-mono text-sm">
          <div className={`transition-all duration-300 ${checkedItems.has('step-folder') ? 'opacity-60' : ''}`}>
            <span className="text-blue-400"># 1. Create project folder</span>
            <div className="text-gray-300">mkdir my-portfolio</div>
            <div className="text-gray-300">cd my-portfolio</div>
          </div>
          
          <div className={`transition-all duration-300 ${checkedItems.has('step-html') ? 'opacity-60' : ''}`}>
            <span className="text-blue-400"># 2. Create your first HTML file</span>
            <div className="text-gray-300">echo "&lt;h1&gt;Welcome to My Portfolio&lt;/h1&gt;" &gt; index.html</div>
          </div>
          
          <div className={`transition-all duration-300 ${checkedItems.has('step-init') ? 'opacity-60' : ''}`}>
            <span className="text-blue-400"># 3. Initialize Git</span>
            <div className="text-gray-300">git init</div>
          </div>
          
          <div className={`transition-all duration-300 ${checkedItems.has('step-add') ? 'opacity-60' : ''}`}>
            <span className="text-blue-400"># 4. Add your file</span>
            <div className="text-gray-300">git add index.html</div>
          </div>
          
          <div className={`transition-all duration-300 ${checkedItems.has('step-commit') ? 'opacity-60' : ''}`}>
            <span className="text-blue-400"># 5. Make your first commit</span>
            <div className="text-gray-300">git commit -m "Initial commit: Add homepage"</div>
          </div>
          
          <div className={`transition-all duration-300 ${checkedItems.has('step-remote') ? 'opacity-60' : ''}`}>
            <span className="text-blue-400"># 6. Connect to GitHub (after creating repo there)</span>
            <div className="text-gray-300">git remote add origin https://github.com/yourusername/my-portfolio.git</div>
          </div>
          
          <div className={`transition-all duration-300 ${checkedItems.has('step-push') ? 'opacity-60' : ''}`}>
            <span className="text-blue-400"># 7. Push to GitHub</span>
            <div className="text-gray-300">git push -u origin main</div>
          </div>
        </div>
      </div>

      <div className="p-4 mb-6 border border-yellow-700 rounded-lg bg-yellow-900/30">
        <div className="flex items-center mb-2">
          <span className="mr-2 text-yellow-400">⚡</span>
          <span className="font-semibold text-yellow-300">Pro Result:</span>
        </div>
        <p className="text-yellow-200">
          Now your code is backed up forever, shareable with a link, and visible to potential employers!
        </p>
      </div>

      {/* Complete section button */}
      {Array.from(checkedItems).filter(id => id.startsWith('step-')).length === 7 && !isSectionCompleted('section3') && (
        <button
          onClick={() => markSectionCompleted('section3')}
          className="w-full px-4 py-3 font-semibold text-white transition-all transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 animate-bounce"
        >
          🎉 Repository Creation Complete!
        </button>
      )}
    </div>
  )
}
