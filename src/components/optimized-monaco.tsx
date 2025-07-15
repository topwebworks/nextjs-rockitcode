'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

// SMART MONACO LOADING: Only load when user interacts with editor
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then(mod => mod.default),
  {
    loading: () => (
      <div className="flex items-center justify-center w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg border">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading VS Code Editor...</p>
        </div>
      </div>
    ),
    ssr: false // Don't load on server - saves CPU
  }
)

interface OptimizedMonacoProps {
  value?: string
  onChange?: (value: string | undefined) => void
  language?: string
  theme?: string
  height?: string
  options?: any
}

export function OptimizedMonaco({
  value = '',
  onChange,
  language = 'javascript',
  theme = 'vs-dark',
  height = '400px',
  options = {}
}: OptimizedMonacoProps) {
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [userHasInteracted, setUserHasInteracted] = useState(false)

  // CPU-OPTIMIZED Monaco options
  const optimizedOptions = {
    minimap: { enabled: false }, // Disable minimap to save CPU
    fontSize: 14,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    wordWrap: 'on',
    // PERFORMANCE OPTIMIZATIONS:
    renderLineHighlight: 'none', // Reduces CPU
    renderWhitespace: 'none', // Reduces CPU
    smoothScrolling: false, // Reduces CPU
    cursorBlinking: 'solid', // Reduces CPU
    ...options
  }

  // Show placeholder until user wants to code
  if (!userHasInteracted) {
    return (
      <div 
        className="flex items-center justify-center w-full h-64 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
        onClick={() => setUserHasInteracted(true)}
      >
        <div className="text-center">
          <div className="mb-4">
            <svg className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            VS Code Editor Ready
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Click to open the professional code editor
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start Coding
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-900">
      <div className="bg-gray-100 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400 ml-3">
              main.{language}
            </span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            VS Code Editor
          </div>
        </div>
      </div>
      
      <MonacoEditor
        height={height}
        language={language}
        theme={theme}
        value={value}
        onChange={onChange}
        options={optimizedOptions}
        onMount={() => setIsEditorReady(true)}
      />
    </div>
  )
}
