'use client'

import { useState } from 'react'
import { clsx } from 'clsx'

interface HTMLPlaygroundProps {
  initialCode?: string
  title?: string
  className?: string
}

export function HTMLPlayground({ 
  initialCode = `<!DOCTYPE html>
<html>
<head>
    <title>My First Web Page</title>
</head>
<body>
    <h1>Welcome to My Website!</h1>
    <p>This is my very first web page. I'm learning HTML!</p>
    
    <!-- Try editing this code! -->
    <h2>About Me</h2>
    <p>Add your own content here...</p>
</body>
</html>`,
  title = "HTML Playground",
  className = ""
}: HTMLPlaygroundProps) {
  const [code, setCode] = useState(initialCode)

  return (
    <div className={clsx("html-playground w-full max-w-none overflow-hidden rounded-lg border border-gray-950/10 bg-white shadow-lg dark:border-white/10 dark:bg-gray-950", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-950/10 bg-gray-50 px-6 py-4 dark:border-white/10 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
          </div>
          <h3 className="text-sm font-semibold text-gray-950 dark:text-white">{title}</h3>
        </div>
        <div className="text-xs text-gray-700 dark:text-gray-400">
          Live Preview
        </div>
      </div>
      
      {/* Main Content - Always Stacked */}
      <div className="flex flex-col h-[600px]">
        {/* Code Editor */}
        <div className="flex flex-col border-b border-gray-950/10 dark:border-white/10 h-1/2">
          <div className="flex items-center justify-between border-b border-gray-950/10 bg-gray-50 px-4 py-2.5 dark:border-white/10 dark:bg-gray-900">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">index.html</span>
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400">HTML</span>
          </div>
          
          <div className="flex-1">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-full w-full resize-none border-none bg-white p-4 font-mono text-sm leading-relaxed text-gray-950 outline-none placeholder:text-gray-400 dark:bg-gray-950 dark:text-gray-50 dark:placeholder:text-gray-500"
              style={{
                fontFamily: '"Fira Code", "SF Mono", Monaco, Inconsolata, "Roboto Mono", Consolas, "Courier New", monospace',
                lineHeight: '1.6',
                tabSize: 2
              }}
              spellCheck={false}
              placeholder="Enter your HTML code here..."
            />
          </div>
        </div>
        
        {/* Preview */}
        <div className="flex flex-col h-1/2">
          <div className="flex items-center justify-between border-b border-gray-950/10 bg-gray-50 px-4 py-2.5 dark:border-white/10 dark:bg-gray-900">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Preview</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-400"></div>
            </div>
          </div>
          
          <div className="flex-1 bg-white">
            <iframe
              srcDoc={code}
              title="HTML Preview"
              className="h-full w-full border-none"
              sandbox="allow-scripts"
            />
          </div>
        </div>
      </div>
      
      {/* Footer with Instructions */}
      <div className="border-t border-gray-950/10 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 px-6 py-4 dark:border-white/10 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
            <span className="text-xs">💡</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-950 dark:text-white">
              Try experimenting with your HTML!
            </p>
            <p className="mt-1 text-xs text-gray-700 dark:text-gray-400">
              Edit the code on the left and watch the preview update in real-time. Try adding new headings, paragraphs, lists, or changing the text content.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
