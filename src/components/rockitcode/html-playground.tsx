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
    <div className={clsx("w-full max-w-none overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-lg", className)}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-red-400"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
          </div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">{title}</h3>
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Live Preview
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-2 h-[500px]">
        {/* Code Editor Side */}
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">index.html</span>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-400">HTML</span>
          </div>
          
          <div className="flex-1">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="h-full w-full resize-none border-none bg-white p-4 font-mono text-sm leading-relaxed text-zinc-900 outline-none placeholder:text-zinc-400 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
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
        
        {/* Preview Side */}
        <div className="flex h-full flex-col border-l border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800/50 px-4 py-2.5">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Preview</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-400"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-400"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-zinc-400"></div>
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
      <div className="border-t border-zinc-200 dark:border-zinc-800 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/30 dark:via-indigo-950/30 dark:to-purple-950/30 px-6 py-4">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50">
            <span className="text-xs">💡</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Try experimenting with your HTML!
            </p>
            <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
              Edit the code on the left and watch the preview update in real-time. Try adding new headings, paragraphs, lists, or changing the text content.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
