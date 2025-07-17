'use client'

import React from 'react'

interface WorkspaceSetupProps {
  checkedItems: Set<string>
  setCheckedItems: React.Dispatch<React.SetStateAction<Set<string>>>
  quizAnswers: Record<string, string>
  setQuizAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>
  animateSection: string | null
  isSectionCompleted: (sectionId: string) => boolean
  markSectionCompleted: (sectionId: string) => void
}

export default function WorkspaceSetup({
  checkedItems,
  setCheckedItems,
  quizAnswers,
  setQuizAnswers,
  animateSection,
  isSectionCompleted,
  markSectionCompleted
}: WorkspaceSetupProps) {
  return (
    <div 
      data-section="section1"
      className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
      animateSection === 'section1' ? 'ring-2 ring-blue-500 transform scale-105' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-2xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-blue-600 rounded-full">1</span>
          Workspace Setup & Management
        </h2>
        {isSectionCompleted('section1') && (
          <div className="flex items-center text-green-400 animate-pulse">
            <span className="mr-2">✅</span>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>
      
      <p className="mb-6 text-gray-300">
        Your workspace is your coding environment. Think of it like organizing your desk - everything should be where you need it. 
        VSCode workspaces help you stay organized and productive.
      </p>

      <div className="p-4 mb-6 bg-gray-900 border border-gray-600 rounded-lg">
        <div className="mb-2 font-mono text-sm text-green-400">Messy Desktop Approach:</div>
        <div className="font-mono text-gray-300">
          💻 Desktop/<br/>
          &nbsp;&nbsp;📄 index.html<br/>
          &nbsp;&nbsp;📄 style.css<br/>
          &nbsp;&nbsp;📁 New folder/<br/>
          &nbsp;&nbsp;📄 script.js<br/>
          &nbsp;&nbsp;📄 Resume.pdf<br/>
          &nbsp;&nbsp;📄 random-file.txt<br/>
        </div>
      </div>

      <div className="p-4 mb-6 bg-gray-900 border border-gray-600 rounded-lg">
        <div className="mb-2 font-mono text-sm text-green-400">VSCode Workspace:</div>
        <div className="font-mono text-gray-300">
          📁 my-website/ (Open as workspace)<br/>
          &nbsp;&nbsp;📄 index.html<br/>
          &nbsp;&nbsp;📄 style.css<br/>
          &nbsp;&nbsp;📄 script.js<br/>
          &nbsp;&nbsp;📁 images/<br/>
          &nbsp;&nbsp;📁 pages/<br/>
        </div>
      </div>

      {/* Workspace Benefits */}
      <div className="p-6 mb-6 border border-purple-700 rounded-lg bg-purple-900/20">
        <h3 className="mb-4 text-lg font-semibold text-purple-300">🚀 Why Use Workspaces?</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-gray-900 border border-purple-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">📁</span>
              <span className="font-semibold text-purple-300">Project Organization</span>
            </div>
            <p className="text-sm text-gray-300">Keep all project files together and easily accessible</p>
          </div>
          
          <div className="p-4 bg-gray-900 border border-purple-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">⚡</span>
              <span className="font-semibold text-purple-300">Smart Features</span>
            </div>
            <p className="text-sm text-gray-300">IntelliSense, auto-complete, and error detection work better</p>
          </div>
          
          <div className="p-4 bg-gray-900 border border-purple-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">🔍</span>
              <span className="font-semibold text-purple-300">Search & Replace</span>
            </div>
            <p className="text-sm text-gray-300">Find and replace across all project files instantly</p>
          </div>
          
          <div className="p-4 bg-gray-900 border border-purple-600 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-xl">🔧</span>
              <span className="font-semibold text-purple-300">Extensions</span>
            </div>
            <p className="text-sm text-gray-300">Extensions can provide project-specific features</p>
          </div>
        </div>
      </div>

      {/* Opening Methods */}
      <div className="p-6 mb-6 border border-green-700 rounded-lg bg-green-900/20">
        <h3 className="mb-4 text-lg font-semibold text-green-300">🎯 How to Open a Project</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-green-300">Method 1: File Menu</h4>
            <div className="font-mono text-sm text-gray-300">
              File → Open Folder → Select your project folder
            </div>
            <p className="mt-2 text-xs text-gray-400">Most reliable method, works on all platforms</p>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-green-300">Method 2: Drag & Drop</h4>
            <div className="font-mono text-sm text-gray-300">
              Drag project folder → Drop onto VSCode window
            </div>
            <p className="mt-2 text-xs text-gray-400">Quick and easy, especially for existing projects</p>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-green-300">Method 3: Command Line</h4>
            <div className="font-mono text-sm text-gray-300">
              code . (opens current directory)<br/>
              code /path/to/project (opens specific folder)
            </div>
            <p className="mt-2 text-xs text-gray-400">Perfect for developers who use terminal</p>
          </div>
          
          <div className="p-4 bg-gray-900 rounded-lg">
            <h4 className="mb-2 font-semibold text-green-300">Method 4: Right-Click Menu</h4>
            <div className="font-mono text-sm text-gray-300">
              Right-click folder → "Open with Code"
            </div>
            <p className="mt-2 text-xs text-gray-400">Available if you checked this option during installation</p>
          </div>
        </div>
      </div>

      {/* Interactive Quiz */}
      <div className="p-6 mb-6 border border-blue-700 rounded-lg bg-blue-900/20">
        <h3 className="mb-4 text-lg font-semibold text-blue-300">📝 Quick Check</h3>
        <div className="space-y-3">
          <p className="mb-3 text-blue-200">What's the best way to organize your web development projects?</p>
          
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="workspace-quiz"
              value="desktop"
              onChange={(e) => setQuizAnswers({...quizAnswers, workspace: e.target.value})}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300 transition-colors group-hover:text-white">
              Keep all files scattered on the desktop
            </span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="workspace-quiz"
              value="workspace"
              onChange={(e) => setQuizAnswers({...quizAnswers, workspace: e.target.value})}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300 transition-colors group-hover:text-white">
              Create project folders and open them as VSCode workspaces
            </span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="workspace-quiz"
              value="single"
              onChange={(e) => setQuizAnswers({...quizAnswers, workspace: e.target.value})}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300 transition-colors group-hover:text-white">
              Open individual files one by one
            </span>
          </label>
        </div>
        
        {quizAnswers.workspace === 'workspace' && (
          <div className="p-3 mt-4 border border-green-700 rounded-lg bg-green-900/30 animate-slideIn">
            <p className="text-sm text-green-300">
              ✅ Perfect! Workspaces give you the full power of VSCode's features.
            </p>
          </div>
        )}
        
        {quizAnswers.workspace === 'desktop' && (
          <div className="p-3 mt-4 border border-red-700 rounded-lg bg-red-900/30 animate-slideIn">
            <p className="text-sm text-red-300">
              ❌ This gets messy quickly and you lose VSCode's smart features!
            </p>
          </div>
        )}
        
        {quizAnswers.workspace === 'single' && (
          <div className="p-3 mt-4 border border-yellow-700 rounded-lg bg-yellow-900/30 animate-slideIn">
            <p className="text-sm text-yellow-300">
              ⚠️ This works but you miss out on project-wide features like search and IntelliSense.
            </p>
          </div>
        )}
      </div>

      {/* Multi-Root Workspaces */}
      <div className="p-6 mb-6 border border-indigo-700 rounded-lg bg-indigo-900/20">
        <h3 className="mb-4 text-lg font-semibold text-indigo-300">🌟 Optional: Multi-Root Workspaces</h3>
        <p className="mb-3 text-indigo-200">
          Want to work on multiple projects simultaneously? VSCode can handle that!
        </p>
        
        <div className="p-4 bg-gray-900 rounded-lg">
          <h4 className="mb-2 font-semibold text-white">How to create a multi-root workspace:</h4>
          <ol className="space-y-1 text-sm text-gray-300">
            <li>1. Open your first project folder</li>
            <li>2. File → Add Folder to Workspace</li>
            <li>3. Select additional project folders</li>
            <li>4. Save as .code-workspace file</li>
          </ol>
          
          <div className="p-3 mt-3 border border-indigo-700 rounded-lg bg-indigo-900/30">
            <p className="text-sm text-indigo-200">
              💡 <strong>Use case:</strong> Compare code between projects, work on client + server simultaneously, or manage related projects together.
            </p>
          </div>
        </div>
      </div>

      {/* Learning Checklist */}
      <div className="p-6 border border-gray-600 rounded-lg bg-gray-700/30">
        <h3 className="mb-4 text-lg font-semibold text-white">🎯 Workspace Fundamentals</h3>
        <div className="space-y-3">
          {[
            'I understand the benefits of using VSCode workspaces',
            'I know how to open a project folder in VSCode',
            'I can organize my projects in dedicated folders',
            'I understand when to use multi-root workspaces'
          ].map((item, idx) => (
            <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={checkedItems.has(`section1-${idx}`)}
                onChange={(e) => {
                  const id = `section1-${idx}`
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
                className="w-4 h-4 text-blue-600 transition-all bg-gray-700 border-gray-500 rounded focus:ring-blue-500"
              />
              <span className={`text-sm transition-all duration-300 ${
                checkedItems.has(`section1-${idx}`) 
                  ? 'text-green-300 line-through' 
                  : 'text-gray-300 group-hover:text-white'
              }`}>
                {item}
              </span>
            </label>
          ))}
        </div>
        
        {/* Auto-complete section when all items checked */}
        {[0,1,2,3].every(idx => checkedItems.has(`section1-${idx}`)) && !isSectionCompleted('section1') && (
          <div className="mt-4">
            <button
              onClick={() => markSectionCompleted('section1')}
              className="w-full px-4 py-2 font-semibold text-white transition-all transform bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 animate-bounce"
            >
              ✅ Mark Section Complete
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
