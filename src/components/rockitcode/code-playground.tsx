'use client'

// Lightweight CodePlayground component optimized for Free Tier
import { useState } from 'react'

interface CodePlaygroundProps {
  initialCode: string
  language: string
  title?: string
  preview?: boolean
}

export function CodePlayground({ initialCode, language, title, preview = false }: CodePlaygroundProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className="my-6 border border-gray-200 rounded-lg overflow-hidden dark:border-gray-700">
      {title && (
        <div className="px-4 py-2 bg-gray-50 border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white">{title}</h4>
        </div>
      )}
      
      <div className="relative">
        <pre className="p-4 bg-gray-900 text-gray-100 overflow-x-auto text-sm">
          <code className={`language-${language}`}>
            {initialCode}
          </code>
        </pre>
        
        {/* Copy button */}
        <button
          onClick={() => navigator.clipboard.writeText(initialCode)}
          className="absolute top-2 right-2 px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600 transition-colors"
        >
          Copy
        </button>
      </div>
      
      {/* Optional live preview for HTML (Free Tier friendly) */}
      {preview && language === 'html' && (
        <div className="border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full px-4 py-2 text-left text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            {isExpanded ? 'Hide' : 'Show'} Preview
          </button>
          
          {isExpanded && (
            <div className="p-4 bg-white dark:bg-gray-900">
              <iframe
                srcDoc={initialCode}
                className="w-full h-32 border border-gray-200 rounded dark:border-gray-700"
                title="Code Preview"
                sandbox="allow-same-origin"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
