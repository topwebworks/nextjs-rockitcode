'use client'

import { useState } from 'react'
import { SimpleMonacoEditor } from '@/components/simple-monaco-editor'

export default function MonacoTestPage() {
  const [code, setCode] = useState('<h1>Hello World!</h1>')
  const [language, setLanguage] = useState('html')

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Monaco Editor Test - Simplified</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Editor Info</h2>
            <div className="space-y-2 text-sm">
              <p>Language: <span className="text-blue-400">{language}</span></p>
              <p>Characters: <span className="text-green-400">{code.length}</span></p>
              <p>Lines: <span className="text-purple-400">{code.split('\n').length}</span></p>
            </div>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Language Selector</h2>
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="json">JSON</option>
            </select>
          </div>
          
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => {
                  setCode('<h1>Hello Monaco!</h1>\n<p>This is a test.</p>')
                  setLanguage('html')
                }}
                className="w-full px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
              >
                HTML Sample
              </button>
              <button
                onClick={() => {
                  setCode('body {\n  background: #333;\n  color: white;\n}')
                  setLanguage('css')
                }}
                className="w-full px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
              >
                CSS Sample
              </button>
              <button
                onClick={() => {
                  setCode('function greet(name) {\n  console.log(`Hello, ${name}!`);\n}\n\ngreet("Monaco");')
                  setLanguage('javascript')
                }}
                className="w-full px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
              >
                JS Sample
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden" style={{ height: '500px' }}>
          <div className="h-full">
            <SimpleMonacoEditor
              value={code}
              onChange={setCode}
              language={language}
              height="100%"
            />
          </div>
        </div>

        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Code Preview</h3>
          <pre className="bg-gray-900 p-4 rounded text-sm overflow-auto max-h-40">
            <code>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  )
}
