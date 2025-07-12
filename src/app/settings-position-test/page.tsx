'use client'

import { useState } from 'react'
import VSCodeMonacoEditor from '@/components/vscode-monaco-editor'
import { EditorSettingsProvider } from '@/contexts/editor-settings'

export default function SettingsPositionTestPage() {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Settings Position Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            margin: 0;
        }
        
        .container {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
        }
        
        .card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            backdrop-filter: blur(10px);
        }
        
        .button {
            background: #ff6b6b;
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            margin: 10px;
            transition: all 0.3s ease;
        }
        
        .button:hover {
            transform: scale(1.05);
            box-shadow: 0 8px 20px rgba(255, 107, 107, 0.4);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Smart Settings Position Test</h1>
        <div class="card">
            <h2>Test the floating settings positioning</h2>
            <p>Scroll to different positions and test the settings button.</p>
            <p>The settings panel should intelligently position itself above or below based on available space.</p>
            <button class="button" onclick="alert('Hello from the test page!')">Click me!</button>
        </div>
        
        <div class="card">
            <h3>Features to Test</h3>
            <ul style="text-align: left;">
                <li>Settings button at bottom of screen (panel should open above)</li>
                <li>Settings button with space below (panel should open below)</li>
                <li>Mobile vs desktop positioning</li>
                <li>Panel boundary detection</li>
            </ul>
        </div>
    </div>
    
    <script>
        // Add some dynamic content for testing
        for (let i = 0; i < 10; i++) {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = \`
                <h3>Test Card \${i + 1}</h3>
                <p>This is additional content to create scroll space for testing the smart positioning of the floating settings panel.</p>
                <button class="button" onclick="console.log('Card \${i + 1} clicked')">Test Button</button>
            \`;
            document.querySelector('.container').appendChild(card);
        }
    </script>
</body>
</html>`)

  return (
    <EditorSettingsProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Settings Position Test
                </h1>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Test smart positioning of floating settings
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Instructions */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
              📍 Test Instructions
            </h2>
            <ul className="list-disc list-inside space-y-1 text-blue-800 dark:text-blue-200">
              <li>Scroll to different positions</li>
              <li>Click the settings button (bottom-right)</li>
              <li>Panel positions above/below based on space</li>
              <li>Test on different screen sizes</li>
              <li>Panel stays within viewport</li>
            </ul>
          </div>

          {/* Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Monaco Editor with Smart Settings
              </h2>
              <div style={{ height: '600px' }}>
                <VSCodeMonacoEditor
                  value={code}
                  onChange={setCode}
                  language="html"
                  showActivityBar={true}
                  showSidebar={true}
                  showStatusBar={true}
                  showOutput={true}
                  enableIntelliSense={true}
                />
              </div>
            </div>
          </div>

          {/* Additional content to create scroll space */}
          <div className="mt-8 space-y-6">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Test Section {i + 1}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  This section provides additional scrollable content to test the smart positioning 
                  of the floating settings panel. When you scroll to different positions, the settings 
                  panel should intelligently position itself above or below the button based on available 
                  viewport space.
                </p>
                <div className="mt-4 flex gap-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    Test Button {i + 1}
                  </button>
                  <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                    Secondary Action
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom spacing to allow scrolling past the floating button */}
          <div className="h-96"></div>
        </div>
      </div>
    </EditorSettingsProvider>
  )
}
