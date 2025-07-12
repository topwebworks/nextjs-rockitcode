'use client'

import React from 'react'
import VSCodeMonacoEditor from '@/components/vscode-monaco-editor'

const mobileTestCode = `# Mobile Python Test
print("Testing mobile editor!")

# Variables
name = "Mobile User"
device = "Smartphone"

print(f"Hello {name} on {device}!")

# Simple function
def greet_mobile_user():
    return "Welcome to mobile coding!"

message = greet_mobile_user()
print(message)

# Loop test
for i in range(3):
    print(f"Mobile test {i + 1}")

print("Mobile editor test complete!")`

export default function MobileTestPage() {
  const [code, setCode] = React.useState(mobileTestCode)

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Test Header */}
      <div className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-lg font-bold">📱 Mobile Editor Test</h1>
        <p className="text-sm opacity-90">Test responsiveness down to 320px width</p>
      </div>

      {/* Instructions for Testing */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border-b">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-2">🧪 Testing Instructions:</h2>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li>• Open browser dev tools (F12)</li>
          <li>• Set device emulation to 320px width</li>
          <li>• Test touch targets and mobile menu</li>
          <li>• Verify editor functionality at small sizes</li>
          <li>• Try running the Python code</li>
        </ul>
      </div>

      {/* Editor Container */}
      <div className="h-screen">
        <VSCodeMonacoEditor
          value={code}
          onChange={setCode}
          language="python"
          theme="vs-dark"
          showOutput={true}
          showSidebar={false}  // Start collapsed for mobile test
          showActivityBar={true}
          showStatusBar={true}
          showMinimap={false}  // Start disabled for mobile test
          enableErrorSquiggles={true}
        />
      </div>
    </div>
  )
}
