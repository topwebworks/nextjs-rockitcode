'use client'

import { useState } from 'react'
import VSCodeMonacoEditor from '@/components/vscode-monaco-editor'

export default function FluidResponsiveTestPage() {
  const [code, setCode] = useState(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fluid Responsive Test</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            color: white;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(255,255,255,0.1);
            padding: 30px;
            border-radius: 15px;
            backdrop-filter: blur(10px);
        }
        h1 { text-align: center; margin-bottom: 30px; }
        .responsive-demo {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }
        .card {
            background: rgba(255,255,255,0.1);
            padding: 20px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.2);
        }
        .card h3 { margin-top: 0; color: #ffd700; }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 True Fluid Responsive Test</h1>
        <p>This Monaco editor now works with <strong>CSS-only responsive design</strong>!</p>
        <p>✅ <strong>Resize your browser window</strong> and see how everything adapts smoothly without page refresh.</p>
        
        <div class="responsive-demo">
            <div class="card">
                <h3>📱 Mobile (< 768px)</h3>
                <ul>
                    <li>Compact icon buttons</li>
                    <li>Smaller font sizes</li>
                    <li>Simplified UI</li>
                    <li>Touch-optimized</li>
                </ul>
            </div>
            <div class="card">
                <h3>💻 Desktop (≥ 768px)</h3>
                <ul>
                    <li>Full text buttons</li>
                    <li>Larger font sizes</li>
                    <li>Complete toolbar</li>
                    <li>Mouse-optimized</li>
                </ul>
            </div>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background: rgba(0,255,0,0.1); border-radius: 10px; border-left: 4px solid #00ff00;">
            <h3>✅ Fixed: Responsive Now Works Without Page Refresh!</h3>
            <p>The editor now uses <strong>CSS-only responsive design</strong> with Tailwind's responsive utilities and CSS media queries.</p>
            <p><strong>Try this:</strong> Open browser dev tools, toggle device simulation, or manually resize the window. Everything adapts instantly!</p>
        </div>
    </div>
</body>
</html>`)

  const tabs = [
    {
      id: 'fluid-test',
      name: 'fluid-responsive-test.html',
      label: 'Fluid Responsive Test',
      language: 'html',
      content: code,
      isActive: true,
      isDirty: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-gray-900">🚀 Fluid Responsive Monaco Editor Test</h1>
          <p className="text-gray-600 mt-2">
            This editor now uses <strong>CSS-only responsive design</strong> - resize your browser window to see instant adaptation without page refresh!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="text-lg font-semibold text-gray-900">✅ Test Instructions</h2>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p>1. Open browser developer tools (F12)</p>
              <p>2. Toggle device simulation or manually resize the browser window</p>
              <p>3. Notice how buttons, layout, and typography adapt instantly without page refresh</p>
              <p>4. Click "View in Browser" to see the demo content</p>
            </div>
          </div>
          
          <div style={{ height: '600px' }}>
            <VSCodeMonacoEditor
              value={code}
              onChange={setCode}
              language="html"
              theme="vs-dark"
              tabs={tabs}
              showActivityBar={true}
              showSidebar={true}
              showOutput={true}
              showStatusBar={true}
              showMinimap={false}
              wordWrap={true}
              lineNumbers={true}
              minimap={false}
              folding={true}
              enableIntelliSense={true}
              enableQuickSuggestions={true}
              enableHover={true}
              enableContextMenu={true}
              enableAutoClosingBrackets={true}
              enableAutoIndent={true}
            />
          </div>
        </div>

        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3">✅ What Was Fixed</h3>
          <div className="space-y-2 text-green-700">
            <p><strong>Before:</strong> Responsive behavior only worked on page refresh due to JavaScript-based conditional rendering</p>
            <p><strong>After:</strong> True CSS-only responsive design using Tailwind utilities and media queries</p>
            <p><strong>Result:</strong> Instant responsive adaptation when resizing browser window</p>
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-green-800">CSS Responsive Classes Used:</h4>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li><code>hidden md:inline</code> - Hide/show text</li>
                <li><code>w-7 h-7 md:w-auto md:h-auto</code> - Button sizing</li>
                <li><code>px-2 md:px-3</code> - Responsive padding</li>
                <li><code>text-xs md:text-sm</code> - Responsive font sizes</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold text-green-800">Benefits:</h4>
              <ul className="text-sm text-green-700 mt-2 space-y-1">
                <li>✅ No page refresh needed</li>
                <li>✅ Smooth, instant transitions</li>
                <li>✅ Better performance</li>
                <li>✅ More maintainable code</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
