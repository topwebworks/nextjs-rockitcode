'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Component to load Monaco from CDN if needed
const MonacoEditorWrapper = dynamic(
  async () => {
    try {
      // Try to load from npm package first
      const { Editor } = await import('@monaco-editor/react')
      return { default: Editor }
    } catch (error) {
      console.error('Failed to load Monaco from npm package:', error)
      throw error
    }
  },
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-800">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading Monaco Editor...</p>
          <p className="text-sm text-gray-400 mt-2">Initializing code editor</p>
        </div>
      </div>
    )
  }
)

interface SimpleMonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
  theme?: string
}

export function SimpleMonacoEditor({ 
  value, 
  onChange, 
  language = 'html',
  height = '100%',
  theme = 'vs-dark'
}: SimpleMonacoEditorProps) {
  const [editorReady, setEditorReady] = useState(false)
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="w-full h-full relative">
      {error && (
        <div className="absolute top-0 left-0 w-full bg-red-600 text-white p-4 z-10">
          <p className="font-semibold">Monaco Editor Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      <MonacoEditorWrapper
        height={height}
        defaultLanguage={language}
        value={value}
        onChange={(val) => onChange(val || '')}
        theme={theme}
        options={{
          fontSize: 14,
          lineHeight: 20,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on',
          automaticLayout: true,
          lineNumbers: 'on',
          renderLineHighlight: 'line',
          selectOnLineNumbers: true,
          roundedSelection: false,
          readOnly: false,
          cursorStyle: 'line',
          suggestOnTriggerCharacters: true,
          acceptSuggestionOnCommitCharacter: true,
          acceptSuggestionOnEnter: 'on',
          accessibilitySupport: 'auto',
        }}
        beforeMount={(monaco) => {
          console.log('Monaco beforeMount called')
          setError(null)
        }}
        onMount={(editor, monaco) => {
          console.log('Monaco Editor mounted successfully!')
          setEditorReady(true)
          
          // Enhanced dark theme
          monaco.editor.defineTheme('enhanced-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [
              { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
              { token: 'keyword', foreground: '569CD6' },
              { token: 'string', foreground: 'CE9178' },
              { token: 'number', foreground: 'B5CEA8' },
            ],
            colors: {
              'editor.background': '#1e1e1e',
              'editor.foreground': '#d4d4d4',
              'editorLineNumber.foreground': '#858585',
              'editor.selectionBackground': '#264f78',
              'editor.inactiveSelectionBackground': '#3a3d41',
            }
          })
          monaco.editor.setTheme('enhanced-dark')
          
          // Focus the editor
          editor.focus()
        }}
        onValidate={(markers) => {
          if (markers.length > 0) {
            console.log('Monaco validation errors:', markers)
          }
        }}
      />
      
      {editorReady && (
        <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
          Monaco Ready
        </div>
      )}
    </div>
  )
}
