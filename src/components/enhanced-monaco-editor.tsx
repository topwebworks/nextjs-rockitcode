'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { clsx } from 'clsx'

// Enhanced Monaco Editor with learning features
const MonacoEditorWrapper = dynamic(
  async () => {
    const { Editor } = await import('@monaco-editor/react')
    return { default: Editor }
  },
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-gray-800">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-lg">Loading Enhanced Code Editor...</p>
          <p className="text-sm text-gray-400 mt-2">VSCode-powered learning experience</p>
        </div>
      </div>
    )
  }
)

interface CodeSample {
  label: string
  code: string
  description: string
  category: 'basic' | 'intermediate' | 'advanced'
}

interface HintSystem {
  progressiveHints: string[]
  currentHintIndex: number
  maxHints: number
  contextualTips: string[]
}

interface VoiceCoding {
  isListening: boolean
  speechSupported: boolean
  transcript: string
}

interface EnhancedMonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
  theme?: string
  // Learning features
  hints?: string[]
  samples?: CodeSample[]
  enableVoiceCoding?: boolean
  enableGestures?: boolean
  showLineNumbers?: boolean
  mobileOptimized?: boolean
  onHintRequest?: () => void
  onSampleInsert?: (sample: CodeSample) => void
}

export function EnhancedMonacoEditor({ 
  value, 
  onChange, 
  language = 'html',
  height = '100%',
  theme = 'vs-dark',
  hints = [],
  samples = [],
  enableVoiceCoding = true,
  enableGestures = true,
  showLineNumbers = true,
  mobileOptimized = true,
  onHintRequest,
  onSampleInsert
}: EnhancedMonacoEditorProps) {
  const [editorReady, setEditorReady] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [showHints, setShowHints] = useState(false)
  const [showSamples, setShowSamples] = useState(false)
  const [hintSystem, setHintSystem] = useState<HintSystem>({
    progressiveHints: hints,
    currentHintIndex: 0,
    maxHints: hints.length,
    contextualTips: []
  })
  const [voiceCoding, setVoiceCoding] = useState<VoiceCoding>({
    isListening: false,
    speechSupported: typeof window !== 'undefined' && 'webkitSpeechRecognition' in window,
    transcript: ''
  })
  
  const editorRef = useRef<any>(null)
  const speechRecognitionRef = useRef<any>(null)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Voice coding setup
  useEffect(() => {
    if (enableVoiceCoding && voiceCoding.speechSupported) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      if (SpeechRecognition) {
        speechRecognitionRef.current = new SpeechRecognition()
        speechRecognitionRef.current.continuous = true
        speechRecognitionRef.current.interimResults = true
        speechRecognitionRef.current.lang = 'en-US'
        
        speechRecognitionRef.current.onresult = (event: any) => {
          let transcript = ''
          for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
              transcript += event.results[i][0].transcript
            }
          }
          
          if (transcript.trim()) {
            // Convert speech to code
            const codeFromSpeech = convertSpeechToCode(transcript, language)
            if (codeFromSpeech && editorRef.current) {
              const currentPosition = editorRef.current.getPosition()
              editorRef.current.executeEdits('voice-input', [{
                range: {
                  startLineNumber: currentPosition.lineNumber,
                  startColumn: currentPosition.column,
                  endLineNumber: currentPosition.lineNumber,
                  endColumn: currentPosition.column
                },
                text: codeFromSpeech
              }])
              onChange(editorRef.current.getValue())
            }
            setVoiceCoding(prev => ({ ...prev, transcript }))
          }
        }

        speechRecognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error)
          setVoiceCoding(prev => ({ ...prev, isListening: false }))
        }
      }
    }
  }, [enableVoiceCoding, language, onChange])

  // Convert speech to code
  const convertSpeechToCode = (speech: string, lang: string): string => {
    const lowerSpeech = speech.toLowerCase()
    
    // Common coding phrases
    const codeMap: Record<string, string> = {
      // HTML
      'paragraph': '<p></p>',
      'heading one': '<h1></h1>',
      'heading two': '<h2></h2>',
      'div': '<div></div>',
      'button': '<button></button>',
      'link': '<a href=""></a>',
      'image': '<img src="" alt="">',
      
      // CSS
      'color red': 'color: red;',
      'background blue': 'background: blue;',
      'font size': 'font-size: px;',
      'margin': 'margin: px;',
      'padding': 'padding: px;',
      
      // JavaScript
      'function': 'function () {\n  \n}',
      'console log': 'console.log();',
      'if statement': 'if () {\n  \n}',
      'for loop': 'for (let i = 0; i < ; i++) {\n  \n}',
      'variable': 'let = ;'
    }

    for (const [phrase, code] of Object.entries(codeMap)) {
      if (lowerSpeech.includes(phrase)) {
        return code
      }
    }
    
    return speech // Return original if no match
  }

  // Toggle voice coding
  const toggleVoiceCoding = useCallback(() => {
    if (!voiceCoding.speechSupported) return
    
    if (voiceCoding.isListening) {
      speechRecognitionRef.current?.stop()
      setVoiceCoding(prev => ({ ...prev, isListening: false }))
    } else {
      speechRecognitionRef.current?.start()
      setVoiceCoding(prev => ({ ...prev, isListening: true }))
    }
  }, [voiceCoding.speechSupported, voiceCoding.isListening])

  // Get next hint
  const getNextHint = useCallback(() => {
    if (hintSystem.currentHintIndex < hintSystem.maxHints - 1) {
      setHintSystem(prev => ({
        ...prev,
        currentHintIndex: prev.currentHintIndex + 1
      }))
    }
    onHintRequest?.()
  }, [hintSystem.currentHintIndex, hintSystem.maxHints, onHintRequest])

  // Insert code sample
  const insertSample = useCallback((sample: CodeSample) => {
    if (editorRef.current) {
      const currentPosition = editorRef.current.getPosition()
      editorRef.current.executeEdits('sample-insert', [{
        range: {
          startLineNumber: currentPosition.lineNumber,
          startColumn: currentPosition.column,
          endLineNumber: currentPosition.lineNumber,
          endColumn: currentPosition.column
        },
        text: sample.code
      }])
      onChange(editorRef.current.getValue())
      setShowSamples(false)
      onSampleInsert?.(sample)
    }
  }, [onChange, onSampleInsert])

  return (
    <div className="w-full h-full relative bg-gray-900">
      {error && (
        <div className="absolute top-0 left-0 w-full bg-red-600 text-white p-4 z-20">
          <p className="font-semibold">Editor Error:</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
      
      {/* Mobile Learning Toolbar */}
      {isMobile && mobileOptimized && (
        <div className="absolute top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 p-2 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-400 uppercase font-medium">
                {language}
              </span>
              {editorReady && (
                <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                  Ready
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-1">
              {/* Hints Button */}
              {hints.length > 0 && (
                <button
                  onClick={() => setShowHints(!showHints)}
                  className={clsx(
                    "px-2 py-1 text-xs rounded transition-colors",
                    showHints 
                      ? "bg-blue-600 text-white" 
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  💡 Hints
                </button>
              )}
              
              {/* Samples Button */}
              {samples.length > 0 && (
                <button
                  onClick={() => setShowSamples(!showSamples)}
                  className={clsx(
                    "px-2 py-1 text-xs rounded transition-colors",
                    showSamples 
                      ? "bg-purple-600 text-white" 
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  📝 Samples
                </button>
              )}
              
              {/* Voice Coding Button */}
              {enableVoiceCoding && voiceCoding.speechSupported && (
                <button
                  onClick={toggleVoiceCoding}
                  className={clsx(
                    "px-2 py-1 text-xs rounded transition-colors",
                    voiceCoding.isListening 
                      ? "bg-red-600 text-white animate-pulse" 
                      : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                  )}
                >
                  🎤 {voiceCoding.isListening ? 'Stop' : 'Voice'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hints Panel */}
      {showHints && hints.length > 0 && (
        <div className="absolute top-16 left-4 right-4 bg-blue-900/95 backdrop-blur-sm rounded-lg p-4 z-15 max-h-40 overflow-y-auto">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-200">
              Hint {hintSystem.currentHintIndex + 1} of {hintSystem.maxHints}
            </h3>
            <button
              onClick={() => setShowHints(false)}
              className="text-blue-300 hover:text-white"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-blue-100 mb-3">
            {hints[hintSystem.currentHintIndex]}
          </p>
          <div className="flex justify-between">
            <button
              onClick={() => setHintSystem(prev => ({ 
                ...prev, 
                currentHintIndex: Math.max(0, prev.currentHintIndex - 1) 
              }))}
              disabled={hintSystem.currentHintIndex === 0}
              className="px-2 py-1 text-xs bg-blue-700 text-white rounded disabled:opacity-50"
            >
              ← Previous
            </button>
            <button
              onClick={getNextHint}
              disabled={hintSystem.currentHintIndex === hintSystem.maxHints - 1}
              className="px-2 py-1 text-xs bg-blue-700 text-white rounded disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Samples Panel */}
      {showSamples && samples.length > 0 && (
        <div className="absolute top-16 left-4 right-4 bg-purple-900/95 backdrop-blur-sm rounded-lg p-4 z-15 max-h-60 overflow-y-auto">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-sm font-medium text-purple-200">Code Samples</h3>
            <button
              onClick={() => setShowSamples(false)}
              className="text-purple-300 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2">
            {samples.map((sample, index) => (
              <div key={index} className="bg-purple-800/50 rounded p-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-purple-200">
                    {sample.label}
                  </span>
                  <span className={clsx(
                    "text-xs px-1 rounded",
                    sample.category === 'basic' ? 'bg-green-600' :
                    sample.category === 'intermediate' ? 'bg-yellow-600' :
                    'bg-red-600'
                  )}>
                    {sample.category}
                  </span>
                </div>
                <p className="text-xs text-purple-100 mb-2">{sample.description}</p>
                <div className="flex justify-between items-center">
                  <code className="text-xs bg-gray-800 px-1 rounded text-gray-300">
                    {sample.code.substring(0, 30)}...
                  </code>
                  <button
                    onClick={() => insertSample(sample)}
                    className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-500"
                  >
                    Insert
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Voice Transcript */}
      {voiceCoding.isListening && voiceCoding.transcript && (
        <div className="absolute bottom-4 left-4 right-4 bg-red-900/90 backdrop-blur-sm rounded-lg p-3 z-15">
          <p className="text-xs text-red-200 mb-1">Voice Input:</p>
          <p className="text-sm text-white">{voiceCoding.transcript}</p>
        </div>
      )}

      {/* Monaco Editor */}
      <div className={clsx(
        "w-full h-full",
        isMobile && mobileOptimized ? "pt-16" : ""
      )}>
        <MonacoEditorWrapper
          height="100%"
          defaultLanguage={language}
          value={value}
          onChange={(val) => onChange(val || '')}
          theme={theme}
          options={{
            fontSize: isMobile ? 16 : 14,
            lineHeight: isMobile ? 24 : 20,
            minimap: { enabled: !isMobile },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            lineNumbers: showLineNumbers ? (isMobile ? 'off' : 'on') : 'off',
            renderLineHighlight: 'line',
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            cursorStyle: 'line',
            suggestOnTriggerCharacters: true,
            acceptSuggestionOnCommitCharacter: true,
            acceptSuggestionOnEnter: 'on',
            accessibilitySupport: 'auto',
            // Mobile optimizations
            folding: !isMobile,
            glyphMargin: !isMobile,
            scrollbar: {
              verticalSliderSize: isMobile ? 8 : 14,
              horizontalSliderSize: isMobile ? 8 : 14,
            }
          }}
          beforeMount={(monaco) => {
            console.log('Enhanced Monaco Editor loading...')
            setError(null)
          }}
          onMount={(editor, monaco) => {
            console.log('Enhanced Monaco Editor mounted!')
            editorRef.current = editor
            setEditorReady(true)
            
            // Enhanced learning theme
            monaco.editor.defineTheme('learning-dark', {
              base: 'vs-dark',
              inherit: true,
              rules: [
                { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
                { token: 'keyword', foreground: '569CD6', fontStyle: 'bold' },
                { token: 'string', foreground: 'CE9178' },
                { token: 'number', foreground: 'B5CEA8' },
                { token: 'tag', foreground: '569CD6' },
                { token: 'attribute.name', foreground: '9CDCFE' },
                { token: 'attribute.value', foreground: 'CE9178' },
              ],
              colors: {
                'editor.background': '#1e1e1e',
                'editor.foreground': '#d4d4d4',
                'editorLineNumber.foreground': '#858585',
                'editor.selectionBackground': '#264f78',
                'editor.inactiveSelectionBackground': '#3a3d41',
                'editorCursor.foreground': '#A7A7A7',
                'editor.lineHighlightBackground': '#2a2d2e',
              }
            })
            monaco.editor.setTheme('learning-dark')
            
            // Enhanced mobile gestures
            if (isMobile && enableGestures) {
              let touchStartY = 0
              let touchStartX = 0
              
              editor.getDomNode()?.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY
                touchStartX = e.touches[0].clientX
              })
              
              editor.getDomNode()?.addEventListener('touchend', (e) => {
                const touchEndY = e.changedTouches[0].clientY
                const touchEndX = e.changedTouches[0].clientX
                const deltaY = touchStartY - touchEndY
                const deltaX = touchStartX - touchEndX
                
                // Vertical swipe for hints
                if (Math.abs(deltaY) > 50 && Math.abs(deltaX) < 30) {
                  if (deltaY > 0 && hints.length > 0) {
                    setShowHints(true)
                  }
                }
                
                // Horizontal swipe for samples
                if (Math.abs(deltaX) > 50 && Math.abs(deltaY) < 30) {
                  if (deltaX < 0 && samples.length > 0) {
                    setShowSamples(true)
                  }
                }
              })
            }
            
            // Focus editor
            editor.focus()
          }}
          onValidate={(markers) => {
            if (markers.length > 0) {
              console.log('Code validation issues:', markers)
            }
          }}
        />
      </div>
      
      {/* Ready indicator */}
      {editorReady && !isMobile && (
        <div className="absolute bottom-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
          Enhanced Monaco Ready
        </div>
      )}
    </div>
  )
}
