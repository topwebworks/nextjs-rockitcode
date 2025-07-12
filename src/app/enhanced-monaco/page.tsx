'use client'

import React from 'react'
import VSCodeMonacoEditor from '@/components/vscode-monaco-editor'
import { useEditorSettings } from '@/contexts/editor-settings'

export default function EnhancedMonacoPage() {
  const { settings } = useEditorSettings()
  
  const sampleCode = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RockitCode Demo</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            margin: 0;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
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
            transition: transform 0.2s;
        }
        
        .button:hover {
            transform: scale(1.05);
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Welcome to RockitCode!</h1>
        <p>This demo shows HTML, CSS, and JavaScript working together.</p>
        
        <button class="button" onclick="sayHello()">Click Me!</button>
        <button class="button" onclick="showTime()">Show Time</button>
        <button class="button" onclick="changeColor()">Change Color</button>
        
        <div id="output"></div>
    </div>

    <script>
        console.log("🎉 JavaScript is running!");
        console.log("This mixed content demo includes:");
        console.log("✓ HTML structure");
        console.log("✓ CSS styling");
        console.log("✓ JavaScript functionality");
        
        function sayHello() {
            const output = document.getElementById('output');
            output.innerHTML = '<h2>👋 Hello from JavaScript!</h2>';
            console.log("Hello button clicked!");
        }
        
        function showTime() {
            const output = document.getElementById('output');
            const now = new Date();
            output.innerHTML = '<h2>🕐 Current time: ' + now.toLocaleTimeString() + '</h2>';
            console.log("Time displayed:", now.toLocaleTimeString());
        }
        
        function changeColor() {
            const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24', '#f0932b'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            document.body.style.background = randomColor;
            console.log("Background changed to:", randomColor);
        }
        
        // Auto-run some code when the page loads
        setTimeout(() => {
            console.log("🎯 Demo initialized successfully!");
            console.log("Try clicking the buttons above!");
        }, 100);
    </script>
</body>
</html>`

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
            Enhanced Monaco Editor
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-300">
            A professional VS Code-like editor with layout modes, shortcuts, and extreme resize flexibility
          </p>
        </div>
        
        <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Mixed Content Demo - HTML + CSS + JavaScript
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              This demo shows a complete HTML page with embedded CSS and JavaScript. Press F5 to analyze and run!
            </p>
          </div>
          
          <div className="h-[700px]">
            <VSCodeMonacoEditor
              value={sampleCode}
              language="html"
              theme={settings.theme}
              showOutput={settings.showOutput}
              showSidebar={settings.showSidebar}
              showActivityBar={settings.showActivityBar}
              showStatusBar={settings.showStatusBar}
              showMinimap={settings.showMinimap}
              lineNumbers={settings.showLineNumbers}
              height="100%"
              tabs={[
                { id: '1', name: 'index.html', language: 'html', content: sampleCode, isDirty: false, isActive: true }
              ]}
              onChange={(value) => {
                // Handle code changes
                console.log('Code changed:', value);
              }}
            />
          </div>
        </div>
        
        <div className="p-6 mt-8 border border-blue-200 rounded-lg bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
          <h3 className="mb-3 text-lg font-semibold text-blue-900 dark:text-blue-100">
            🚀 Try These Features:
          </h3>
          <div className="grid grid-cols-1 gap-4 text-sm text-blue-800 md:grid-cols-2 dark:text-blue-200">
            <div>
              <strong>Mixed Content Execution:</strong>
              <ul className="mt-2 space-y-1">
                <li>• <kbd className="px-1 py-0.5 bg-white dark:bg-gray-800 rounded">F5</kbd> - Analyze HTML/CSS/JS content</li>
                <li>• Automatically detects and extracts JavaScript</li>
                <li>• Shows HTML structure analysis</li>
                <li>• Counts CSS rules and selectors</li>
                <li>• Executes embedded JavaScript safely</li>
              </ul>
            </div>
            <div>
              <strong>Editor Features:</strong>
              <ul className="mt-2 space-y-1">
                <li>• <kbd className="px-1 py-0.5 bg-white dark:bg-gray-800 rounded">Ctrl+Space</kbd> - Trigger IntelliSense</li>
                <li>• <kbd className="px-1 py-0.5 bg-white dark:bg-gray-800 rounded">Ctrl+Shift+P</kbd> - Command Palette</li>
                <li>• <kbd className="px-1 py-0.5 bg-white dark:bg-gray-800 rounded">Ctrl+H</kbd> - Find & Replace</li>
                <li>• <kbd className="px-1 py-0.5 bg-white dark:bg-gray-800 rounded">Alt+Click</kbd> - Multi-cursor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
