'use client'

import { useState } from 'react'
import { VSCodeMonacoEditor } from '@/components/vscode-monaco-editor'

export default function MonacoFluidTestPage() {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html>
<head>
    <title>Monaco Fluid Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 40px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 10px;
            backdrop-filter: blur(10px);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Monaco Editor Fluid Responsive Test</h1>
        <p>This HTML demonstrates that the Monaco editor is now truly fluid responsive using percentage-based widths instead of fixed pixel values.</p>
        
        <h2>Key Features:</h2>
        <ul>
            <li>100% width container responsiveness</li>
            <li>No fixed pixel widths in Monaco internal elements</li>
            <li>Smooth adaptation to all screen sizes</li>
            <li>ResizeObserver for container changes</li>
        </ul>
        
        <p>Resize your browser window to see the fluid responsive behavior!</p>
    </div>
</body>
</html>`)

  const [containerWidth, setContainerWidth] = useState('100%')

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Monaco Editor Fluid Responsiveness Test
          </h1>
          <p className="text-gray-600 mb-4">
            This page tests that the Monaco editor uses percentage-based widths instead of fixed pixel values.
            Inspect the Monaco editor DOM elements to verify they use 100% width instead of calculated pixel values.
          </p>
          
          {/* Container Width Controls */}
          <div className="mb-4 flex flex-wrap gap-2">
            <label className="text-sm font-medium text-gray-700 mr-2">Test Container Width:</label>
            {['100%', '90%', '80%', '70%', '60%', '50%'].map((width) => (
              <button
                key={width}
                onClick={() => setContainerWidth(width)}
                className={`px-3 py-1 text-sm rounded ${
                  containerWidth === width
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {width}
              </button>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 mb-4">
            <strong>Expected behavior:</strong> Monaco editor should adapt fluidly to container width changes without page refresh.
            Internal Monaco DOM elements should show <code>width: 100% !important</code> instead of pixel values.
          </div>
        </div>

        {/* Monaco Editor Container */}
        <div 
          className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300"
          style={{ width: containerWidth, margin: '0 auto' }}
        >
          <div className="bg-gray-100 px-4 py-2 border-b">
            <div className="text-sm text-gray-600">
              Container Width: <span className="font-mono font-bold">{containerWidth}</span>
            </div>
          </div>
          
          <div style={{ height: '500px' }}>
            <VSCodeMonacoEditor
              value={code}
              onChange={setCode}
              language="html"
              theme="vs-dark"
              showOutput={true}
              showActivityBar={false}
              showSidebar={false}
              showStatusBar={true}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Testing Instructions:</h3>
          <ol className="list-decimal list-inside text-blue-800 space-y-1 text-sm">
            <li>Use the container width buttons above to change the editor container size</li>
            <li>Open browser DevTools and inspect the Monaco editor elements</li>
            <li>Look for elements with class names like <code>.monaco-editor</code>, <code>.overflow-guard</code>, etc.</li>
            <li>Verify these elements show <code>width: 100% !important</code> instead of fixed pixel values</li>
            <li>Resize the browser window and ensure the editor adapts smoothly</li>
            <li>Test the "Run Code" and "View in Browser" buttons remain visible at all sizes</li>
          </ol>
        </div>

        {/* CSS Override Information */}
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-green-900 mb-2">CSS Overrides Applied:</h3>
          <pre className="text-green-800 text-xs bg-green-100 p-3 rounded overflow-x-auto">
{`/* Force Monaco Editor internal elements to be fluid responsive */
.monaco-editor-container .monaco-editor,
.monaco-editor-container .monaco-editor .overflow-guard,
.monaco-editor-container .monaco-editor .monaco-scrollable-element {
  width: 100% !important;
  max-width: 100% !important;
}

/* Override Monaco's calculated pixel widths */
.monaco-editor-container .monaco-editor > div {
  width: 100% !important;
  max-width: 100% !important;
}

/* Additional ResizeObserver for container changes */`}
          </pre>
        </div>
      </div>
    </div>
  )
}
