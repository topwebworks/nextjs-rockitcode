'use client'

import React from 'react'

interface VersionControlProps {
  checkedItems: Set<string>
  setCheckedItems: React.Dispatch<React.SetStateAction<Set<string>>>
  quizAnswers: Record<string, string>
  setQuizAnswers: React.Dispatch<React.SetStateAction<Record<string, string>>>
  animateSection: string | null
  isSectionCompleted: (sectionId: string) => boolean
  markSectionCompleted: (sectionId: string) => void
}

export default function VersionControl({
  checkedItems,
  setCheckedItems,
  quizAnswers,
  setQuizAnswers,
  animateSection,
  isSectionCompleted,
  markSectionCompleted
}: VersionControlProps) {
  return (
    <div 
      data-section="section1"
      className={`bg-gray-800 border border-gray-700 rounded-xl p-8 transition-all duration-500 ${
      animateSection === 'section1' ? 'ring-2 ring-blue-500 transform scale-105' : ''
    }`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="flex items-center text-2xl font-bold">
          <span className="flex items-center justify-center w-8 h-8 mr-4 text-sm font-bold bg-blue-600 rounded-full">1</span>
          What is Version Control?
        </h2>
        {isSectionCompleted('section1') && (
          <div className="flex items-center text-green-400 animate-pulse">
            <span className="mr-2">✅</span>
            <span className="text-sm">Completed</span>
          </div>
        )}
      </div>
      
      <p className="mb-6 text-gray-300">
        Imagine you're writing a research paper. You save versions like "Essay_v1.doc", "Essay_v2.doc", "Essay_FINAL.doc", "Essay_FINAL_REALLY.doc"... 
        Sound familiar? Version control does this automatically for code.
      </p>

      <div className="p-4 mb-6 bg-gray-900 border border-gray-600 rounded-lg">
        <div className="mb-2 font-mono text-sm text-green-400">Without Version Control:</div>
        <div className="font-mono text-gray-300">
          📁 my-website/<br/>
          &nbsp;&nbsp;📄 index.html<br/>
          &nbsp;&nbsp;📄 index_backup.html<br/>
          &nbsp;&nbsp;📄 index_working.html<br/>
          &nbsp;&nbsp;📄 index_FINAL.html<br/>
          &nbsp;&nbsp;📄 index_FINAL_v2.html<br/>
        </div>
      </div>

      <div className="p-4 mb-6 bg-gray-900 border border-gray-600 rounded-lg">
        <div className="mb-2 font-mono text-sm text-green-400">With Git:</div>
        <div className="font-mono text-gray-300">
          📁 my-website/<br/>
          &nbsp;&nbsp;📄 index.html<br/>
          &nbsp;&nbsp;🔄 .git/ (tracks all versions automatically)
        </div>
      </div>

      {/* Interactive Quiz */}
      <div className="p-6 mb-6 border border-blue-700 rounded-lg bg-blue-900/20">
        <h3 className="mb-4 text-lg font-semibold text-blue-300">📝 Quick Check</h3>
        <div className="space-y-3">
          <p className="mb-3 text-blue-200">Which file naming approach is better for organizing code?</p>
          
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="version-control-quiz"
              value="manual"
              onChange={(e) => setQuizAnswers({...quizAnswers, versionControl: e.target.value})}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300 transition-colors group-hover:text-white">
              index_v1.html, index_v2.html, index_FINAL.html
            </span>
          </label>
          
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input
              type="radio"
              name="version-control-quiz"
              value="git"
              onChange={(e) => setQuizAnswers({...quizAnswers, versionControl: e.target.value})}
              className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <span className="text-gray-300 transition-colors group-hover:text-white">
              index.html + Git version tracking
            </span>
          </label>
        </div>
        
        {quizAnswers.versionControl === 'git' && (
          <div className="p-3 mt-4 border border-green-700 rounded-lg bg-green-900/30 animate-slideIn">
            <p className="text-sm text-green-300">
              ✅ Correct! Git keeps one clean file and tracks all changes automatically.
            </p>
          </div>
        )}
        
        {quizAnswers.versionControl === 'manual' && (
          <div className="p-3 mt-4 border border-red-700 rounded-lg bg-red-900/30 animate-slideIn">
            <p className="text-sm text-red-300">
              ❌ This gets messy quickly! Git does this automatically and keeps your folder clean.
            </p>
          </div>
        )}
      </div>

      {/* Learning Checklist */}
      <div className="p-6 border border-gray-600 rounded-lg bg-gray-700/30">
        <h3 className="mb-4 text-lg font-semibold text-white">🎯 Key Takeaways</h3>
        <div className="space-y-3">
          {[
            'Version control automatically tracks file changes',
            'Git keeps your project folder clean and organized',
            'You can jump back to any previous version instantly',
            'No more confusing file names with v1, v2, FINAL, etc.'
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
