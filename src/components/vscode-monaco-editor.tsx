'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { clsx } from 'clsx'

// VS Code-like Monaco Editor with full professional features
const MonacoEditor = dynamic(
  () => import('@monaco-editor/react').then(mod => mod.Editor),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
        <div className="text-center text-white">
          <div className="w-8 h-8 mx-auto mb-4 border-2 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
          <p className="text-sm text-[#cccccc]">Loading VS Code Editor...</p>
        </div>
      </div>
    )
  }
)

interface FileTab {
  id: string
  name: string
  language: string
  content: string
  isDirty: boolean
  isActive: boolean
}

interface EditorAction {
  id: string
  label: string
  icon: string
  keybinding?: string
  action: () => void
}

interface VSCodeMonacoEditorProps {
  value: string
  onChange: (value: string) => void
  language: string
  height?: string
  theme?: 'vs-dark' | 'vs-light' | 'hc-black'
  readOnly?: boolean
  minimap?: boolean
  lineNumbers?: boolean
  wordWrap?: boolean
  folding?: boolean
  showActivityBar?: boolean
  showSidebar?: boolean
  showStatusBar?: boolean
  showMinimap?: boolean
  showOutput?: boolean
  enableIntelliSense?: boolean
  enableErrorSquiggles?: boolean
  enableQuickSuggestions?: boolean
  enableBracketMatching?: boolean
  enableAutoClosingBrackets?: boolean
  enableAutoIndent?: boolean
  enableCodeLens?: boolean
  enableHover?: boolean
  enableContextMenu?: boolean
  tabs?: FileTab[]
  onTabChange?: (tabId: string) => void
  onTabClose?: (tabId: string) => void
  onRunCode?: (code: string) => Promise<string>
  actions?: EditorAction[]
}

export function VSCodeMonacoEditor({ 
  value, 
  onChange, 
  language = 'html',
  height = '600px',
  theme = 'vs-dark',
  readOnly = false,
  minimap = true,
  lineNumbers = true,
  wordWrap = false,
  folding = true,
  showActivityBar = true,
  showSidebar = true,
  showStatusBar = true,
  showMinimap = true,
  showOutput = true,
  enableIntelliSense = true,
  enableErrorSquiggles = true,
  enableQuickSuggestions = true,
  enableBracketMatching = true,
  enableAutoClosingBrackets = true,
  enableAutoIndent = true,
  enableCodeLens = true,
  enableHover = true,
  enableContextMenu = true,
  tabs = [],
  onTabChange,
  onTabClose,
  onRunCode,
  actions = []
}: VSCodeMonacoEditorProps) {
  const [editorInstance, setEditorInstance] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || '')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [currentLine, setCurrentLine] = useState(1)
  const [currentColumn, setCurrentColumn] = useState(1)
  const [totalLines, setTotalLines] = useState(1)
  const [selectedText, setSelectedText] = useState('')
  const [problems, setProblems] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [replaceQuery, setReplaceQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [outputPanelHeight, setOutputPanelHeight] = useState(200)
  const [outputContent, setOutputContent] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [outputTab, setOutputTab] = useState<'output' | 'problems' | 'terminal'>('output')
  const [isResizing, setIsResizing] = useState(false)
  const [editorHeight, setEditorHeight] = useState(400)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<any>(null)

  // Monaco editor configuration
  const editorOptions = {
    theme,
    language,
    value,
    readOnly,
    minimap: {
      enabled: showMinimap && minimap
    },
    lineNumbers: lineNumbers ? 'on' as const : 'off' as const,
    wordWrap: wordWrap ? 'on' as const : 'off' as const,
    folding,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    fontSize: 14,
    fontFamily: 'Fira Code, Monaco, Menlo, Ubuntu Mono, monospace',
    fontLigatures: true,
    cursorBlinking: 'blink' as const,
    cursorStyle: 'line' as const,
    lineHeight: 22,
    letterSpacing: 0.5,
    renderWhitespace: 'selection' as const,
    renderControlCharacters: false,
    renderLineHighlight: 'line' as const,
    rulers: [80, 120],
    suggestOnTriggerCharacters: enableIntelliSense,
    acceptSuggestionOnEnter: enableIntelliSense ? 'on' as const : 'off' as const,
    tabCompletion: enableIntelliSense ? 'on' as const : 'off' as const,
    quickSuggestions: enableQuickSuggestions,
    parameterHints: {
      enabled: enableIntelliSense
    },
    hover: {
      enabled: enableHover
    },
    contextmenu: enableContextMenu,
    autoClosingBrackets: enableAutoClosingBrackets ? 'always' as const : 'never' as const,
    autoClosingQuotes: enableAutoClosingBrackets ? 'always' as const : 'never' as const,
    autoIndent: enableAutoIndent ? 'advanced' as const : 'none' as const,
    formatOnPaste: true,
    formatOnType: true,
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: true,
    trimAutoWhitespace: true,
    dragAndDrop: true,
    multiCursorModifier: 'ctrlCmd' as const,
    accessibilitySupport: 'auto' as const,
    smoothScrolling: true,
    scrollbar: {
      vertical: 'auto' as const,
      horizontal: 'auto' as const,
      verticalScrollbarSize: 16,
      horizontalScrollbarSize: 16,
      arrowSize: 11
    }
  }

  // Handle editor mount
  const handleEditorDidMount = useCallback((editor: any, monaco: any) => {
    setEditorInstance(editor)
    editorRef.current = editor
    monacoRef.current = monaco

    // Configure language features
    if (enableErrorSquiggles) {
      monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
        noSemanticValidation: false,
        noSyntaxValidation: false
      })
    }

    // Add custom themes
    monaco.editor.defineTheme('vscode-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'class', foreground: '4EC9B0' },
        { token: 'function', foreground: 'DCDCAA' },
        { token: 'variable', foreground: '9CDCFE' }
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2a2a',
        'editor.selectionBackground': '#264f78',
        'editorCursor.foreground': '#ffffff',
        'editorWhitespace.foreground': '#3e3e3e'
      }
    })

    // Set up event listeners
    editor.onDidChangeCursorPosition((e: any) => {
      setCurrentLine(e.position.lineNumber)
      setCurrentColumn(e.position.column)
    })

    editor.onDidChangeModelContent(() => {
      const model = editor.getModel()
      if (model) {
        setTotalLines(model.getLineCount())
        const newValue = model.getValue()
        onChange(newValue)
        
        // Get problems/errors
        const markers = monaco.editor.getModelMarkers({ owner: language })
        setProblems(markers)
      }
    })

    editor.onDidChangeCursorSelection((e: any) => {
      const selection = editor.getModel()?.getValueInRange(e.selection)
      setSelectedText(selection || '')
    })

    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
      setCommandPaletteOpen(true)
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
      setShowSearch(true)
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      // Save action
      console.log('Save triggered')
    })

    // Add Run Code shortcut (F5 or Ctrl+F5)
    editor.addCommand(monaco.KeyCode.F5, () => {
      handleRunCode()
    })

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.F5, () => {
      handleRunCode()
    })

    // Focus editor
    editor.focus()
  }, [language, onChange, enableErrorSquiggles])

  // Detect content type from code
  const detectContentType = useCallback((code: string) => {
    const trimmedCode = code.trim()
    
    // Check for HTML
    if (trimmedCode.includes('<html') || trimmedCode.includes('<!DOCTYPE') || 
        (trimmedCode.includes('<') && trimmedCode.includes('>'))) {
      return 'html'
    }
    
    // Check for CSS
    if (trimmedCode.includes('{') && trimmedCode.includes('}') && 
        (trimmedCode.includes(':') || trimmedCode.includes('selector'))) {
      return 'css'
    }
    
    // Default to JavaScript
    return 'javascript'
  }, [])

  // Extract JavaScript from HTML
  const extractJavaScript = useCallback((htmlCode: string) => {
    const scriptRegex = /<script[^>]*>([\s\S]*?)<\/script>/gi
    const matches = []
    let match
    
    while ((match = scriptRegex.exec(htmlCode)) !== null) {
      matches.push(match[1])
    }
    
    return matches.join('\n\n')
  }, [])

  // Handle running code
  const handleRunCode = useCallback(async () => {
    if (!editorInstance || isRunning) return
    
    setIsRunning(true)
    setOutputTab('output')
    
    try {
      const code = editorInstance.getValue()
      let output = ''
      
      if (onRunCode) {
        // Use custom run function if provided
        output = await onRunCode(code)
      } else {
        // Detect actual content type
        const detectedType = detectContentType(code)
        
        if (language === 'javascript' || language === 'typescript' || detectedType === 'javascript') {
          try {
            // Create a safe execution environment
            const originalConsole = console.log
            const logs: string[] = []
            
            // Override console.log to capture output
            console.log = (...args) => {
              logs.push(args.map(arg => String(arg)).join(' '))
            }
            
            // Execute the code (THIS IS UNSAFE IN PRODUCTION - DEMO ONLY)
            // eslint-disable-next-line no-eval
            eval(code)
            
            // Restore console.log
            console.log = originalConsole
            
            output = logs.length > 0 ? logs.join('\n') : 'Code executed successfully (no output)'
          } catch (error) {
            output = `JavaScript Error: ${error instanceof Error ? error.message : String(error)}`
          }
        } else if (language === 'html' || detectedType === 'html') {
          // Handle mixed HTML/CSS/JS content
          const hasHTML = code.includes('<') && code.includes('>')
          const hasCSS = code.includes('<style') || (code.includes('{') && code.includes('}'))
          const hasJS = code.includes('<script') || code.includes('function') || code.includes('console.log')
          
          let result = []
          
          if (hasHTML) {
            result.push('🌐 HTML Structure detected')
            
            // Extract and count HTML elements
            const elementMatches = code.match(/<(\w+)[^>]*>/g) || []
            const uniqueElements = [...new Set(elementMatches.map((match: string) => match.match(/<(\w+)/)?.[1]))].filter(Boolean)
            result.push(`   Elements: ${uniqueElements.join(', ')}`)
          }
          
          if (hasCSS) {
            result.push('\n🎨 CSS Styles detected')
            const styleContent = code.match(/<style[^>]*>([\s\S]*?)<\/style>/i)?.[1] || ''
            if (styleContent) {
              const ruleCount = (styleContent.match(/[^{}]+{[^}]*}/g) || []).length
              result.push(`   ${ruleCount} CSS rules found`)
            }
          }
          
          if (hasJS) {
            result.push('\n⚡ JavaScript detected - attempting execution...')
            try {
              const jsCode = extractJavaScript(code)
              if (jsCode.trim()) {
                const originalConsole = console.log
                const logs: string[] = []
                
                console.log = (...args) => {
                  logs.push(args.map(arg => String(arg)).join(' '))
                }
                
                // eslint-disable-next-line no-eval
                eval(jsCode)
                
                console.log = originalConsole
                
                if (logs.length > 0) {
                  result.push('\n📄 JavaScript Output:')
                  logs.forEach(log => result.push(`   ${log}`))
                } else {
                  result.push('   JavaScript executed (no console output)')
                }
              }
            } catch (error) {
              result.push(`   JavaScript Error: ${error instanceof Error ? error.message : String(error)}`)
            }
          }
          
          result.push('\n✓ In a real lesson, this would render a live preview below.')
          output = result.join('\n')
          
        } else if (language === 'css' || detectedType === 'css') {
          // For CSS, analyze and show info
          const ruleCount = (code.match(/[^{}]+{[^}]*}/g) || []).length
          const selectorCount = (code.match(/[^{}]+(?={)/g) || []).length
          
          output = `🎨 CSS Analysis:\n\n${ruleCount} CSS rules found\n${selectorCount} selectors detected\n\n✓ CSS code parsed successfully. In a real lesson, this would apply styles to a preview.`
        } else if (language === 'python') {
          output = `🐍 Python execution would require a backend service.\n\nYour Python code:\n${code}\n\n💡 This would be executed on a Python server in production.`
        } else {
          output = `📝 Code preview for ${language.toUpperCase()}:\n\n${code}\n\n📝 Execution support for ${language} can be added with appropriate backend services.`
        }
      }
      
      setOutputContent(prev => [...prev, `> Analyzing and running ${language} code...`, output, ''])
    } catch (error) {
      setOutputContent(prev => [...prev, `Error: ${error instanceof Error ? error.message : String(error)}`, ''])
    } finally {
      setIsRunning(false)
    }
  }, [editorInstance, isRunning, language, onRunCode, detectContentType, extractJavaScript])

  // Handle tab switching
  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId)
  }, [onTabChange])

  // Handle tab closing
  const handleTabClose = useCallback((tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onTabClose?.(tabId)
  }, [onTabClose])

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(!sidebarCollapsed)
  }, [sidebarCollapsed])

  // Handle resize
  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    setIsResizing(true)
    e.preventDefault()
    
    const startY = e.clientY
    const startHeight = outputPanelHeight
    
    const handleMouseMove = (e: MouseEvent) => {
      const deltaY = startY - e.clientY
      const newHeight = Math.max(100, Math.min(400, startHeight + deltaY))
      setOutputPanelHeight(newHeight)
    }
    
    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [outputPanelHeight])

  // Calculate editor height based on container and output panel
  const calculateEditorHeight = useCallback(() => {
    if (showOutput) {
      return `calc(100% - ${outputPanelHeight}px)`
    }
    return '100%'
  }, [showOutput, outputPanelHeight])

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    setIsFullscreen(!isFullscreen)
  }, [isFullscreen])

  // Activity bar items
  const activityBarItems = [
    { id: 'explorer', icon: '📁', label: 'Explorer', active: true },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'git', icon: '🌿', label: 'Source Control' },
    { id: 'debug', icon: '🐛', label: 'Run and Debug' },
    { id: 'extensions', icon: '🧩', label: 'Extensions' }
  ]

  return (
    <div className={clsx(
      "flex bg-[#252526] text-[#cccccc] font-mono text-sm",
      isFullscreen ? "fixed inset-0 z-50" : "h-full"
    )}>
      {/* Activity Bar */}
      {showActivityBar && (
        <div className="flex flex-col w-12 bg-[#2c2c2c] border-r border-[#3e3e42]">
          {activityBarItems.map((item) => (
            <div
              key={item.id}
              className={clsx(
                "flex items-center justify-center h-12 cursor-pointer hover:bg-[#37373d] transition-colors",
                item.active && "bg-[#37373d] border-l-2 border-[#007acc]"
              )}
              title={item.label}
            >
              <span className="text-lg">{item.icon}</span>
            </div>
          ))}
        </div>
      )}

      {/* Sidebar */}
      {showSidebar && !sidebarCollapsed && (
        <div className="flex flex-col w-64 bg-[#252526] border-r border-[#3e3e42]">
          <div className="flex items-center justify-between h-9 px-3 bg-[#2c2c2c] border-b border-[#3e3e42]">
            <span className="text-xs uppercase font-semibold text-[#cccccc]">Explorer</span>
            <button onClick={toggleSidebar} className="text-[#cccccc] hover:text-white">
              ×
            </button>
          </div>
          <div className="flex-1 p-2">
            <div className="text-xs text-[#cccccc] mb-2">Files</div>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={clsx(
                  "flex items-center px-2 py-1 text-xs cursor-pointer hover:bg-[#37373d] rounded",
                  tab.isActive && "bg-[#37373d]"
                )}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="mr-2">📄</span>
                <span className="flex-1">{tab.name}</span>
                {tab.isDirty && <span className="text-[#f0f0f0]">●</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Editor Area */}
      <div className="flex flex-col flex-1">
        {/* Tab Bar */}
        {tabs.length > 0 && (
          <div className="flex h-9 bg-[#2c2c2c] border-b border-[#3e3e42] overflow-x-auto">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={clsx(
                  "flex items-center px-3 h-full cursor-pointer border-r border-[#3e3e42] min-w-0 max-w-48",
                  tab.isActive 
                    ? "bg-[#1e1e1e] text-[#ffffff]" 
                    : "bg-[#2c2c2c] text-[#cccccc] hover:bg-[#37373d]"
                )}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="mr-2 text-xs">📄</span>
                <span className="mr-2 text-xs truncate">{tab.name}</span>
                {tab.isDirty && <span className="text-[#f0f0f0] mr-1">●</span>}
                <button
                  onClick={(e) => handleTabClose(tab.id, e)}
                  className="text-[#cccccc] hover:text-white hover:bg-[#5a5a5a] rounded px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search Bar */}
        {showSearch && (
          <div className="flex items-center h-9 px-3 bg-[#3c3c3c] border-b border-[#3e3e42]">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-[#3c3c3c] text-[#cccccc] text-xs border-none outline-none"
            />
            <input
              type="text"
              placeholder="Replace"
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              className="flex-1 ml-2 bg-[#3c3c3c] text-[#cccccc] text-xs border-none outline-none"
            />
            <button
              onClick={() => setShowSearch(false)}
              className="ml-2 text-[#cccccc] hover:text-white"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Editor Content */}
        <div className="flex flex-col flex-1 min-h-0">
          {/* Editor */}
          <div className="relative flex-1 min-h-0">
            <MonacoEditor
              height={calculateEditorHeight()}
              options={editorOptions}
              onMount={handleEditorDidMount}
              onChange={(value) => onChange(value || '')}
            />
          </div>

          {/* Resize Handle */}
          {showOutput && (
            <div
              className={clsx(
                "h-1 bg-[#3e3e42] cursor-row-resize hover:bg-[#007acc] transition-colors",
                isResizing && "bg-[#007acc]"
              )}
              onMouseDown={handleResizeStart}
              title="Drag to resize output panel"
            />
          )}

          {/* Output Panel */}
          {showOutput && (
            <div 
              className="bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col min-h-0"
              style={{ height: `${outputPanelHeight}px` }}
            >
              {/* Output Panel Header */}
              <div className="flex items-center h-9 bg-[#2c2c2c] border-b border-[#3e3e42]">
                <div className="flex">
                  <button
                    onClick={() => setOutputTab('output')}
                    className={clsx(
                      "px-3 py-1 text-xs border-r border-[#3e3e42]",
                      outputTab === 'output' 
                        ? "bg-[#1e1e1e] text-[#ffffff]" 
                        : "text-[#cccccc] hover:text-white"
                    )}
                  >
                    Output
                  </button>
                  <button
                    onClick={() => setOutputTab('problems')}
                    className={clsx(
                      "px-3 py-1 text-xs border-r border-[#3e3e42]",
                      outputTab === 'problems' 
                        ? "bg-[#1e1e1e] text-[#ffffff]" 
                        : "text-[#cccccc] hover:text-white"
                    )}
                  >
                    Problems ({problems.length})
                  </button>
                  <button
                    onClick={() => setOutputTab('terminal')}
                    className={clsx(
                      "px-3 py-1 text-xs",
                      outputTab === 'terminal' 
                        ? "bg-[#1e1e1e] text-[#ffffff]" 
                        : "text-[#cccccc] hover:text-white"
                    )}
                  >
                    Terminal
                  </button>
                </div>
                <div className="flex-1" />
                <div className="flex items-center space-x-2 px-3">
                  <button
                    onClick={toggleFullscreen}
                    className="text-[#cccccc] hover:text-white text-xs px-2 py-1"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    {isFullscreen ? "🗗" : "🗖"}
                  </button>
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className={clsx(
                      "flex items-center px-2 py-1 text-xs rounded",
                      isRunning 
                        ? "bg-[#4a4a4a] text-[#888] cursor-not-allowed"
                        : "bg-[#0e639c] text-white hover:bg-[#1177bb]"
                    )}
                  >
                    {isRunning ? (
                      <>
                        <div className="w-3 h-3 mr-1 border border-white rounded-full animate-spin border-t-transparent"></div>
                        Running...
                      </>
                    ) : (
                      <>▶ Run Code (F5)</>
                    )}
                  </button>
                  <button
                    onClick={() => setOutputContent([])}
                    className="text-[#cccccc] hover:text-white text-xs px-2 py-1"
                    title="Clear Output"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Output Content */}
              <div className="flex-1 overflow-y-auto p-3 font-mono text-sm min-h-0">
                {outputTab === 'output' && (
                  <div className="text-[#cccccc]">
                    {outputContent.length === 0 ? (
                      <div className="text-[#888] italic">
                        Click "Run Code" or press F5 to execute your code and see the output here.
                      </div>
                    ) : (
                      outputContent.map((line, index) => (
                        <div key={index} className="mb-1">
                          {line}
                        </div>
                      ))
                    )}
                  </div>
                )}

                {outputTab === 'problems' && (
                  <div className="text-[#cccccc]">
                    {problems.length === 0 ? (
                      <div className="text-[#888] italic">No problems detected</div>
                    ) : (
                      problems.map((problem, index) => (
                        <div key={index} className="mb-2 p-2 bg-[#2c2c2c] rounded">
                          <div className="flex items-center text-red-400 text-xs mb-1">
                            <span className="mr-2">🔴</span>
                            <span>Line {problem.startLineNumber}, Column {problem.startColumn}</span>
                          </div>
                          <div className="text-[#cccccc]">{problem.message}</div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {outputTab === 'terminal' && (
                  <div className="text-[#cccccc]">
                    <div className="text-[#888] italic">
                      Terminal functionality would be implemented here.
                      <br />
                      This could include shell commands, package installation, etc.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Bar */}
        {showStatusBar && (
          <div className="flex items-center justify-between h-6 px-3 bg-[#007acc] text-white text-xs">
            <div className="flex items-center space-x-4">
              <span>🌿 main</span>
              <span>🔴 {problems.length} problems</span>
              <span>Ln {currentLine}, Col {currentColumn}</span>
              <span>{selectedText ? `(${selectedText.length} selected)` : `${totalLines} lines`}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>{language.toUpperCase()}</span>
              <span>UTF-8</span>
              <span>LF</span>
              <span>🔔</span>
            </div>
          </div>
        )}
      </div>

      {/* Command Palette */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black bg-opacity-50">
          <div className="bg-[#252526] border border-[#3e3e42] rounded-lg w-96 max-w-full">
            <input
              type="text"
              placeholder="Type a command..."
              className="w-full p-3 bg-[#3c3c3c] text-[#cccccc] border-none outline-none rounded-t-lg"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  setCommandPaletteOpen(false)
                }
              }}
            />
            <div className="overflow-y-auto max-h-64">
              {actions.map((action) => (
                <div
                  key={action.id}
                  className="flex items-center justify-between px-3 py-2 hover:bg-[#37373d] cursor-pointer"
                  onClick={() => {
                    action.action()
                    setCommandPaletteOpen(false)
                  }}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{action.icon}</span>
                    <span className="text-[#cccccc]">{action.label}</span>
                  </div>
                  {action.keybinding && (
                    <span className="text-xs text-[#888] font-mono">{action.keybinding}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// Export default for easier importing
export default VSCodeMonacoEditor
