'use client'

import { useState } from 'react'

const codeExamples = [
  {
    id: 'html',
    label: 'HTML',
    icon: '🏗️',
    code: '<h1>Hello World!</h1>\n<p>My first webpage</p>\n<button>Click me!</button>',
    preview: `
      <div style="padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h1 style="margin: 0 0 12px 0; color: #1f2937; font-size: 24px;">Hello World!</h1>
        <p style="margin: 0 0 12px 0; color: #6b7280;">My first webpage</p>
        <button style="background: #3b82f6; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Click me!</button>
      </div>
    `
  },
  {
    id: 'css',
    label: 'CSS',
    icon: '🎨',
    code: 'h1 {\n  color: #3b82f6;\n  text-align: center;\n  animation: fadeIn 1s;\n}',
    preview: `
      <div style="padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
        <h1 style="color: #3b82f6; text-align: center; margin: 0; animation: fadeIn 1s ease-in;">Beautiful Styled Text</h1>
        <style>
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        </style>
      </div>
    `
  },
  {
    id: 'js',
    label: 'JavaScript',
    icon: '⚡',
    code: 'function greet() {\n  const name = "Developer";\n  alert(`Hello, ${name}!`);\n}\n\ngreet();',
    preview: `
      <div style="padding: 16px; background: white; border-radius: 8px; border: 1px solid #e5e7eb;">
        <p style="margin: 0 0 12px 0; color: #6b7280;">Interactive JavaScript Demo</p>
        <button onclick="alert('Hello, Developer!')" style="background: #10b981; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Run Code</button>
      </div>
    `
  }
]

export function InteractivePreview() {
  const [activeExample, setActiveExample] = useState(codeExamples[0])
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
            Try It Right Now
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            See how easy it is to code on mobile. Click the tabs to explore different languages.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Code Editor Mockup */}
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl">
            {/* Editor Header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-gray-400 text-sm">mobile-editor.js</div>
            </div>

            {/* Language Tabs */}
            <div className="bg-gray-800 border-b border-gray-700">
              <div className="flex">
                {codeExamples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => setActiveExample(example)}
                    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                      activeExample.id === example.id
                        ? 'border-blue-500 text-blue-400 bg-gray-750'
                        : 'border-transparent text-gray-400 hover:text-gray-300'
                    }`}
                  >
                    <span className="mr-2">{example.icon}</span>
                    {example.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Content */}
            <div className="p-4">
              <pre className="text-green-400 text-sm font-mono leading-relaxed">
                <code>{activeExample.code}</code>
              </pre>
            </div>

            {/* Mobile Optimization Hint */}
            <div className="bg-blue-900/50 px-4 py-2 border-t border-gray-700">
              <div className="flex items-center text-blue-300 text-xs">
                <span className="mr-2">💡</span>
                Voice coding: Say "paragraph" to insert &lt;p&gt;&lt;/p&gt;
              </div>
            </div>
          </div>

          {/* Live Preview */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Live Preview
              </h3>
              <div 
                className="min-h-[200px] rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 p-1"
                dangerouslySetInnerHTML={{ __html: activeExample.preview }}
              />
            </div>

            {/* Feature Highlights */}
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="mr-3 text-green-500">✓</span>
                Real VSCode editor on mobile
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="mr-3 text-green-500">✓</span>
                Voice coding & smart hints
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="mr-3 text-green-500">✓</span>
                Instant preview & feedback
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="mr-3 text-green-500">✓</span>
                Touch-optimized gestures
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/lessons-demo"
                className="inline-flex items-center justify-center w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Try Full Interactive Demo
                <span className="ml-2">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
