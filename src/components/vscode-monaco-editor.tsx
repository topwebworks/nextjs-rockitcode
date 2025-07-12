'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { clsx } from 'clsx'
import { useEditorSettings } from '@/contexts/editor-settings'

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
  // Get editor settings from context
  const { settings, setLayout } = useEditorSettings()
  
  // Apply settings to override props
  const effectiveShowActivityBar = settings.showActivityBar ?? showActivityBar
  const effectiveShowSidebar = settings.showSidebar ?? showSidebar
  const effectiveShowStatusBar = settings.showStatusBar ?? showStatusBar
  const effectiveShowMinimap = settings.showMinimap ?? showMinimap
  const effectiveShowOutput = settings.showOutput ?? showOutput

  const [editorInstance, setEditorInstance] = useState<any>(null)
  const [activeTab, setActiveTab] = useState<string>(tabs[0]?.id || '')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(!effectiveShowSidebar)
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [currentLine, setCurrentLine] = useState(1)
  const [currentColumn, setCurrentColumn] = useState(1)
  const [totalLines, setTotalLines] = useState(1)
  const [selectedText, setSelectedText] = useState('')
  const [problems, setProblems] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  
  // Helper to format problem count for display
  const formatProblemCount = useCallback((count: number): string => {
    if (count === 0) return '0'
    if (count < 100) return count.toString()
    if (count < 1000) return count.toString()
    if (count < 10000) return `${Math.floor(count / 1000)}k`
    return '9k+'
  }, [])
  const [replaceQuery, setReplaceQuery] = useState('')
  const [showSearch, setShowSearch] = useState(false)
  const [outputPanelHeight, setOutputPanelHeight] = useState(180) // Slightly smaller default for better demonstration of resize range
  const [outputContent, setOutputContent] = useState<string[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [outputTab, setOutputTab] = useState<'output' | 'problems' | 'terminal'>('output')
  const [isResizing, setIsResizing] = useState(false)
  const [editorHeight, setEditorHeight] = useState(400)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  
  const editorRef = useRef<any>(null)
  const monacoRef = useRef<any>(null)

  // Enhanced fluid responsive handling for Monaco layout
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout
    
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      
      // Clear previous timeout
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
      
      // Trigger Monaco layout recalculation with immediate and delayed updates
      if (editorInstance) {
        // Immediate layout update
        editorInstance.layout()
        
        // Additional delayed update to ensure proper sizing
        resizeTimeout = setTimeout(() => {
          editorInstance.layout()
        }, 150)
      }
    }
    
    // Initial setup
    handleResize()
    
    // Listen for resize events with throttling
    window.addEventListener('resize', handleResize)
    
    // Also listen for orientationchange on mobile devices
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 200)
    })
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
      if (resizeTimeout) {
        clearTimeout(resizeTimeout)
      }
    }
  }, [editorInstance])

  // ResizeObserver for Monaco editor container to ensure fluid responsiveness
  useEffect(() => {
    if (!editorInstance) return

    const editorContainer = document.querySelector('.monaco-editor-container')
    if (!editorContainer) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        // Trigger Monaco layout when container size changes
        if (editorInstance) {
          // Use requestAnimationFrame for smooth layout updates
          requestAnimationFrame(() => {
            editorInstance.layout()
          })
        }
      }
    })

    resizeObserver.observe(editorContainer)

    return () => {
      resizeObserver.disconnect()
    }
  }, [editorInstance])

  // Listen for native fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        (document as any).webkitFullscreenElement ||
        (document as any).msFullscreenElement
      )
      setIsFullscreen(isCurrentlyFullscreen)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange)
    document.addEventListener('msfullscreenchange', handleFullscreenChange)

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange)
      document.removeEventListener('msfullscreenchange', handleFullscreenChange)
    }
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + J to toggle output panel size
      if ((e.ctrlKey || e.metaKey) && e.key === 'j' && !e.shiftKey && !e.altKey) {
        e.preventDefault()
        setOutputPanelHeight(prev => prev === 200 ? 400 : 200)
      }
      // Alt + L to open in browser (similar to Live Server)
      if (e.altKey && e.key === 'l' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault()
        // Trigger view in browser
        const event = new CustomEvent('viewInBrowser')
        document.dispatchEvent(event)
      }
      // Alt + T to toggle layout between Simple and Advanced
      if (e.altKey && e.key === 't' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        e.preventDefault()
        // Toggle between simple and advanced (treat standard as simple for toggle)
        const isCurrentlySimple = settings.layout === 'simple' || settings.layout === 'standard'
        setLayout(isCurrentlySimple ? 'advanced' : 'simple')
      }
    }

    // Listen for the custom event
    const handleViewInBrowserEvent = () => {
      if (editorInstance) {
        const code = editorInstance.getValue()
        if (code.includes('<') && code.includes('>')) {
          const blob = new Blob([code], { type: 'text/html' })
          const url = URL.createObjectURL(blob)
          
          const newWindow = window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')
          if (newWindow) {
            setOutputContent(prev => [...prev, '🌐 Opened HTML in new browser window via Alt+L shortcut!', ''])
          }
          
          setTimeout(() => URL.revokeObjectURL(url), 10000)
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('viewInBrowser', handleViewInBrowserEvent)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('viewInBrowser', handleViewInBrowserEvent)
    }
  }, [])

  // Monaco editor configuration with responsive settings
  const editorOptions = {
    theme,
    language,
    value,
    readOnly,
    minimap: {
      enabled: effectiveShowMinimap && minimap
    },
    lineNumbers: lineNumbers ? 'on' as const : 'off' as const,
    wordWrap: wordWrap ? 'on' as const : 'off' as const,
    folding,
    automaticLayout: true,
    scrollBeyondLastLine: false,
    fontSize: 14, // Fixed font size - responsive sizing handled by CSS
    fontFamily: 'Fira Code, Monaco, Menlo, Ubuntu Mono, monospace',
    fontLigatures: true,
    cursorBlinking: 'blink' as const,
    cursorStyle: 'line' as const,
    lineHeight: 22, // Fixed line height - responsive handled by CSS
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

    // Focus editor and trigger initial layout for fluid responsiveness
    editor.focus()
    
    // Trigger initial layout to ensure proper sizing
    setTimeout(() => {
      editor.layout()
    }, 100)
    
    // Additional layout trigger after a brief delay to handle any CSS transitions
    setTimeout(() => {
      editor.layout()
    }, 300)
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

  // Enhanced Python execution simulation with realistic terminal-like output
  const simulatePythonExecution = useCallback(async (code: string): Promise<string> => {
    const lines = code.split('\n')
    const result: string[] = []
    
    // Terminal header
    result.push('🐍 Python 3.11.0 (Educational Simulator)')
    result.push('>>> # Starting Python execution...')
    result.push('')
    
    // Variables to track execution state
    const variables: Record<string, any> = {}
    let currentIndent = 0
    let insideFunction = false
    let insideFunctionName = ''
    const functions: Record<string, string[]> = {}
    let insideClass = false
    let currentClassName = ''
    const classes: Record<string, string[]> = {}
    
    // Process each line with realistic terminal output
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      const trimmedLine = line.trim()
      
      if (!trimmedLine || trimmedLine.startsWith('#')) {
        // Show comment lines in output
        if (trimmedLine.startsWith('#')) {
          result.push(`>>> ${line}`)
        }
        continue
      }
      
      // Show the line being executed (like interactive Python)
      result.push(`>>> ${line}`)
      
      try {
        // Handle imports
        if (trimmedLine.startsWith('import ') || trimmedLine.startsWith('from ')) {
          result.push(`# Imported: ${trimmedLine}`)
          continue
        }
        
        // Handle function definitions
        if (trimmedLine.startsWith('def ')) {
          const functionMatch = trimmedLine.match(/def\s+(\w+)\s*\([^)]*\):/)
          if (functionMatch) {
            insideFunction = true
            insideFunctionName = functionMatch[1]
            functions[insideFunctionName] = []
            result.push(`# Function '${insideFunctionName}' defined`)
            continue
          }
        }
        
        // Handle class definitions
        if (trimmedLine.startsWith('class ')) {
          const classMatch = trimmedLine.match(/class\s+(\w+).*:/)
          if (classMatch) {
            insideClass = true
            currentClassName = classMatch[1]
            classes[currentClassName] = []
            result.push(`# Class '${currentClassName}' defined`)
            continue
          }
        }
        
        // Track indentation to exit functions/classes
        const lineIndent = line.length - line.trimStart().length
        if (lineIndent <= currentIndent && (insideFunction || insideClass)) {
          insideFunction = false
          insideClass = false
          currentIndent = 0
        } else if (insideFunction || insideClass) {
          currentIndent = lineIndent
          continue
        }
        
        // Handle print statements
        if (trimmedLine.includes('print(')) {
          const printMatches = trimmedLine.match(/print\s*\(\s*([^)]+)\s*\)/g)
          if (printMatches) {
            for (const printMatch of printMatches) {
              try {
                // Extract content inside print()
                const content = printMatch.match(/print\s*\(\s*([^)]+)\s*\)/)?.[1] || ''
                
                // Handle different types of print content
                if (content.startsWith('"') && content.endsWith('"')) {
                  // String literal
                  const text = content.slice(1, -1)
                  result.push(text)
                } else if (content.startsWith("'") && content.endsWith("'")) {
                  // String literal with single quotes
                  const text = content.slice(1, -1)
                  result.push(text)
                } else if (content.includes('f"') || content.includes("f'")) {
                  // F-string (simplified)
                  const text = content.replace(/f["']([^"']+)["']/, '$1')
                  result.push(text)
                } else if (!isNaN(Number(content))) {
                  // Number
                  result.push(content)
                } else if (variables[content]) {
                  // Variable
                  result.push(String(variables[content]))
                } else {
                  // Expression or complex content
                  result.push(`${content}`)
                }
              } catch {
                result.push('(print output)')
              }
            }
          }
          continue
        }
        
        // Handle variable assignments
        if (trimmedLine.includes(' = ') && !trimmedLine.includes('==')) {
          const assignMatch = trimmedLine.match(/(\w+)\s*=\s*(.+)/)
          if (assignMatch) {
            const varName = assignMatch[1]
            const varValue = assignMatch[2].trim()
            
            // Simple value assignment
            if (varValue.startsWith('"') && varValue.endsWith('"')) {
              variables[varName] = varValue.slice(1, -1)
            } else if (varValue.startsWith("'") && varValue.endsWith("'")) {
              variables[varName] = varValue.slice(1, -1)
            } else if (!isNaN(Number(varValue))) {
              variables[varName] = Number(varValue)
            } else {
              variables[varName] = varValue
            }
            result.push(`# ${varName} = ${variables[varName]}`)
            continue
          }
        }
        
        // Handle input() statements
        if (trimmedLine.includes('input(')) {
          const inputMatch = trimmedLine.match(/(\w+)?\s*=?\s*input\s*\(\s*([^)]*)\s*\)/)
          if (inputMatch) {
            const varName = inputMatch[1]
            const prompt = inputMatch[2] || ''
            const promptText = prompt.replace(/['"]/g, '')
            
            if (promptText) {
              result.push(promptText)
            }
            result.push('(waiting for user input...)')
            
            // Simulate user input
            const simulatedInput = 'user_input'
            result.push(`> ${simulatedInput}`)
            
            if (varName) {
              variables[varName] = simulatedInput
              result.push(`# ${varName} = "${simulatedInput}"`)
            }
            continue
          }
        }
        
        // Handle simple expressions and function calls
        if (trimmedLine.includes('(') && trimmedLine.includes(')')) {
          // Function call or expression
          result.push(`# Executed: ${trimmedLine}`)
          continue
        }
        
        // Handle control structures
        if (trimmedLine.startsWith('if ') || trimmedLine.startsWith('elif ') || 
            trimmedLine.startsWith('else:') || trimmedLine.startsWith('for ') || 
            trimmedLine.startsWith('while ')) {
          result.push(`# Control structure: ${trimmedLine}`)
          continue
        }
        
        // Default case - show as executed
        if (trimmedLine) {
          result.push(`# Processed: ${trimmedLine}`)
        }
        
      } catch (error) {
        result.push(`Error: ${error instanceof Error ? error.message : String(error)}`)
      }
    }
    
    // Add execution summary
    result.push('')
    result.push('>>> # Execution complete!')
    result.push('')
    
    // Show defined functions and classes
    if (Object.keys(functions).length > 0) {
      result.push('📝 Functions defined:')
      Object.keys(functions).forEach(funcName => {
        result.push(`   • ${funcName}()`)
      })
      result.push('')
    }
    
    if (Object.keys(classes).length > 0) {
      result.push('🏗️ Classes defined:')
      Object.keys(classes).forEach(className => {
        result.push(`   • ${className}`)
      })
      result.push('')
    }
    
    // Show variables
    if (Object.keys(variables).length > 0) {
      result.push('📊 Variables:')
      Object.entries(variables).forEach(([name, value]) => {
        result.push(`   • ${name} = ${typeof value === 'string' ? `"${value}"` : value}`)
      })
      result.push('')
    }
    
    result.push('💡 Educational Note:')
    result.push('   This is a simulation for learning purposes.')
    result.push('   For real Python execution, consider:')
    result.push('   • Pyodide (Python in browser)')
    result.push('   • Backend Python API')
    result.push('   • Jupyter notebooks')
    result.push('   • Local Python installation')
    
    return result.join('\n')
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
          result.push('\n💡 Use "View in Browser" to see the live result and access dev tools!')
          output = result.join('\n')
          
        } else if (language === 'css' || detectedType === 'css') {
          // For CSS, analyze and show info
          const ruleCount = (code.match(/[^{}]+{[^}]*}/g) || []).length
          const selectorCount = (code.match(/[^{}]+(?={)/g) || []).length
          
          output = `🎨 CSS Analysis:\n\n${ruleCount} CSS rules found\n${selectorCount} selectors detected\n\n✓ CSS code parsed successfully. In a real lesson, this would apply styles to a preview.`
        } else if (language === 'python') {
          // Enhanced Python simulation with realistic terminal-like execution
          output = await simulatePythonExecution(code)
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

  // Handle viewing code in browser (like VS Code Live Server)
  const handleViewInBrowser = useCallback(() => {
    if (!editorInstance) return
    
    const code = editorInstance.getValue()
    const detectedType = detectContentType(code)
    
    // Check if it's HTML content or contains HTML
    if (language === 'html' || detectedType === 'html' || 
        code.includes('<html') || code.includes('<!DOCTYPE') || 
        (code.includes('<') && code.includes('>'))) {
      
      // Create a blob URL for the HTML content
      const blob = new Blob([code], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      
      // Open in new window (like Live Server)
      const newWindow = window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')
      
      if (newWindow) {
        // Set title for the new window
        newWindow.addEventListener('load', () => {
          if (!newWindow.document.title) {
            newWindow.document.title = 'RockitCode Live Preview'
          }
        })
        
        // Add output feedback with dev tools tips
        setOutputContent(prev => [...prev, 
          '🌐 Opened HTML in new browser window!', 
          '',
          '💡 Pro Tips:',
          '   • Press F12 to open Developer Tools',
          '   • Right-click elements and select "Inspect"',
          '   • Use Console tab for JavaScript debugging',
          '   • Elements tab shows HTML structure and CSS',
          '   • Network tab shows resource loading',
          ''
        ])
      } else {
        setOutputContent(prev => [...prev, '❌ Could not open browser window - popup blocked?', ''])
      }
      
      // Clean up blob URL after a delay
      setTimeout(() => URL.revokeObjectURL(url), 10000)
      
    } else if (language === 'css' || detectedType === 'css') {
      // For CSS, create a minimal HTML wrapper
      const htmlWrapper = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Preview - RockitCode</title>
    <style>
${code}
    </style>
</head>
<body>
    <h1>CSS Preview</h1>
    <p>Your CSS styles are applied to this page. Use dev tools to inspect!</p>
    <div class="demo-content">
        <h2>Demo Content</h2>
        <p>This is a paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
        <ul>
            <li>List item 1</li>
            <li>List item 2</li>
            <li>List item 3</li>
        </ul>
        <button>Demo Button</button>
    </div>
</body>
</html>`
      
      const blob = new Blob([htmlWrapper], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      
      const newWindow = window.open(url, '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes')
      if (newWindow) {
        setOutputContent(prev => [...prev, 
          '🎨 Opened CSS preview in new browser window!',
          '',
          '💡 Try inspecting the demo elements to see your CSS in action!',
          ''
        ])
      } else {
        setOutputContent(prev => [...prev, '❌ Could not open browser window - popup blocked?', ''])
      }
      
      setTimeout(() => URL.revokeObjectURL(url), 10000)
      
    } else {
      setOutputContent(prev => [...prev, '💡 "View in Browser" works with HTML and CSS code. Try writing some HTML!', ''])
    }
  }, [editorInstance, language, detectContentType])

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

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(!showMobileMenu)
  }, [showMobileMenu])

  // Handle resize
  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    setIsResizing(true)
    e.preventDefault()
    
    const startY = 'touches' in e ? e.touches[0].clientY : e.clientY
    const startHeight = outputPanelHeight
    
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
      const deltaY = startY - clientY
      // Allow output panel from 40px minimum to 90% of screen height for maximum flexibility
      const containerHeight = window.innerHeight
      const minHeight = 40 // Very small minimum - just enough to see tabs
      const maxHeight = containerHeight * 0.9 // 90% of screen height - leaves small space for editor
      const newHeight = Math.max(minHeight, Math.min(maxHeight, startHeight + deltaY))
      setOutputPanelHeight(newHeight)
    }
    
    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchmove', handleMouseMove, { passive: false })
    document.addEventListener('touchend', handleMouseUp)
  }, [outputPanelHeight])

  // Calculate editor height based on container and output panel
  const calculateEditorHeight = useCallback(() => {
    if (showOutput) {
      return `calc(100% - ${outputPanelHeight}px)`
    }
    return '100%'
  }, [showOutput, outputPanelHeight])

  // Toggle fullscreen with native browser fullscreen API
  const toggleFullscreen = useCallback(async () => {
    if (!isFullscreen) {
      try {
        // Try to use native fullscreen API
        const element = document.documentElement
        if (element.requestFullscreen) {
          await element.requestFullscreen()
        } else if ((element as any).webkitRequestFullscreen) {
          await (element as any).webkitRequestFullscreen()
        } else if ((element as any).msRequestFullscreen) {
          await (element as any).msRequestFullscreen()
        }
      } catch (error) {
        console.log('Native fullscreen not available, using CSS fullscreen')
      }
    } else {
      try {
        // Exit native fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen()
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen()
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen()
        }
      } catch (error) {
        console.log('Exiting native fullscreen failed, using CSS toggle')
      }
    }
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
      "flex bg-[#252526] text-[#cccccc] font-mono w-full vscode-editor",
      // Fluid text sizing with more granular breakpoints
      "text-xs xs:text-xs sm:text-sm md:text-sm lg:text-base",
      isFullscreen ? "fixed inset-0 z-50" : "min-h-0",
      isResizing && "resizing"
    )}
    style={{
      // Ensure full width and fluid layout with flexible height
      width: '100%',
      maxWidth: '100%',
      minWidth: '320px', // Minimum supported width
      height: isFullscreen ? '100vh' : height,
      minHeight: isFullscreen ? '100vh' : 'clamp(400px, 60vh, 800px)'
    }}
    >
      {/* Mobile Header */}
      {isMobile && !isFullscreen && (
        <div className="mobile-header fixed top-0 left-0 right-0 z-10 h-10 bg-[#2c2c2c] border-b border-[#3e3e42] flex items-center px-2">
          <button
            onClick={toggleMobileMenu}
            className="flex items-center justify-center w-8 h-8 text-[#cccccc] hover:text-white hover:bg-[#37373d] rounded text-lg"
            title="Menu"
          >
            ☰
          </button>
          <div className="flex-1 text-center text-xs text-[#cccccc] truncate">
            {language.toUpperCase()} Editor
          </div>
          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className={clsx(
              "flex items-center justify-center w-8 h-8 rounded text-sm",
              isRunning 
                ? "bg-[#4a4a4a] text-[#888] cursor-not-allowed"
                : "bg-[#0e639c] text-white hover:bg-[#1177bb]"
            )}
            title="Run Code"
          >
            {isRunning ? "⏳" : "▶"}
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay - Fluid width */}
      {isMobile && showMobileMenu && !isFullscreen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
          <div 
            className="absolute top-10 left-0 bg-[#252526] border-r border-[#3e3e42] h-full shadow-lg"
            style={{ 
              width: 'clamp(16rem, 80vw, 20rem)',
              maxWidth: '80vw'
            }}
          >
            <div className="p-4">
              <h3 className="text-sm font-semibold text-[#cccccc] mb-4">Editor Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    handleRunCode()
                    toggleMobileMenu()
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-[#cccccc] hover:bg-[#37373d] rounded"
                >
                  ▶ Run Code
                </button>
                <button
                  onClick={() => {
                    setOutputContent([])
                    toggleMobileMenu()
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-[#cccccc] hover:bg-[#37373d] rounded"
                >
                  🗑️ Clear Output
                </button>
                <button
                  onClick={() => {
                    handleViewInBrowser()
                    toggleMobileMenu()
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-[#cccccc] hover:bg-[#37373d] rounded"
                >
                  🌐 View in Browser
                </button>
                <button
                  onClick={() => {
                    toggleFullscreen()
                    toggleMobileMenu()
                  }}
                  className="w-full flex items-center px-3 py-2 text-left text-sm text-[#cccccc] hover:bg-[#37373d] rounded"
                >
                  🗖 Fullscreen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Activity Bar - Fluid width, responsive to settings */}
      {effectiveShowActivityBar && !isMobile && !isFullscreen && (
        <div className="flex flex-col bg-[#2c2c2c] border-r border-[#3e3e42] flex-shrink-0" style={{ width: '3rem' }}>
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

      {/* Sidebar - Fluid width, hidden on mobile via CSS */}
      {showSidebar && !sidebarCollapsed && !isFullscreen && (
        <div 
          className="flex-col bg-[#252526] border-r border-[#3e3e42] flex-shrink-0 hidden md:flex"
          style={{ 
            width: 'clamp(12rem, 20vw, 20rem)',
            minWidth: '12rem',
            maxWidth: '20rem'
          }}
        >
          <div className="flex items-center justify-between h-9 px-3 bg-[#2c2c2c] border-b border-[#3e3e42]">
            <span className="text-xs uppercase font-semibold text-[#cccccc]">Explorer</span>
            <button onClick={toggleSidebar} title="Close Sidebar" className="text-[#cccccc] hover:text-white">
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

      {/* Main Editor Area - CSS-only responsive */}
      <div className="flex flex-col flex-1 main-editor-area">
        {/* Mobile header padding handled by CSS media query */}
        {tabs.length > 0 && (
          <div className="tab-container flex bg-[#2c2c2c] border-b border-[#3e3e42] overflow-x-auto" style={{ height: 'clamp(28px, 4vh, 32px)' }}>
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={clsx(
                  "mobile-tab flex items-center cursor-pointer border-r border-[#3e3e42] min-w-0 shrink-0 text-xs",
                  tab.isActive 
                    ? "bg-[#1e1e1e] text-[#ffffff]" 
                    : "bg-[#2c2c2c] text-[#cccccc] hover:bg-[#37373d]"
                )}
                style={{
                  padding: 'clamp(4px, 1vw, 12px) clamp(8px, 2vw, 16px)',
                  height: '100%',
                  fontSize: 'clamp(10px, 1.2vw, 12px)'
                }}
                onClick={() => handleTabChange(tab.id)}
              >
                <span className="tab-icon">📄</span>
                <span className="truncate" style={{ marginRight: 'clamp(0px, 0.5vw, 8px)' }}>
                  {tab.name}
                </span>
                {tab.isDirty && <span className="text-[#f0f0f0]" style={{ marginLeft: 'clamp(2px, 0.3vw, 4px)' }}>●</span>}
                <button
                  onClick={(e) => handleTabClose(tab.id, e)}
                  title={`Close ${tab.name}`}
                  className="tab-close-btn text-[#cccccc] hover:text-white hover:bg-[#5a5a5a] rounded px-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search Bar - Simplified on mobile */}
        {showSearch && (
          <div className="flex flex-col md:flex-row items-center bg-[#3c3c3c] border-b border-[#3e3e42] h-auto md:h-9 px-2 md:px-3 py-1 md:py-0 space-y-1 md:space-y-0">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:flex-1 bg-[#3c3c3c] text-[#cccccc] text-xs border-none outline-none"
            />
            <input
              type="text"
              placeholder="Replace"
              value={replaceQuery}
              onChange={(e) => setReplaceQuery(e.target.value)}
              className="w-full md:flex-1 md:ml-2 bg-[#3c3c3c] text-[#cccccc] text-xs border-none outline-none"
            />
            <button
              onClick={() => setShowSearch(false)}
              title="Close Search"
              className="text-[#cccccc] hover:text-white ml-0 md:ml-2 self-end md:self-center"
            >
              ×
            </button>
          </div>
        )}

        {/* Main Editor Content - Flexible and responsive */}
        <div 
          className="flex flex-col flex-1 min-h-0 editor-main-content"
          style={{
            width: '100%',
            maxWidth: '100%',
            minWidth: '0',
            flex: '1 1 auto',
            height: '100%'
          }}
        >
          {/* Editor - Fluid responsive */}
          <div 
            className="relative flex-1 min-h-0 monaco-editor-container"
            style={{
              width: '100%',
              maxWidth: '100%',
              height: calculateEditorHeight(),
              minHeight: '60px' // Ensure editor never disappears completely
            }}
          >
            <MonacoEditor
              height="100%"
              options={editorOptions}
              onMount={handleEditorDidMount}
              onChange={(value) => onChange(value || '')}
            />
          </div>

          {/* Resize Handle */}
          {showOutput && (
            <div
              className={clsx(
                "h-2 bg-[#3e3e42] cursor-row-resize hover:bg-[#007acc] transition-colors relative group select-none touch-none",
                isResizing && "bg-[#007acc]"
              )}
              onMouseDown={handleResizeStart}
              onTouchStart={handleResizeStart}
              title="Drag to resize output panel - can go almost full height for maximum viewing (Ctrl+J to toggle)"
            >
              {/* Visual indicators */}
              <div className="absolute inset-x-0 flex justify-center transform -translate-y-1/2 top-1/2">
                <div className="flex space-x-1">
                  <div className="w-8 h-0.5 bg-[#666] group-hover:bg-[#007acc] transition-colors rounded" />
                </div>
              </div>
            </div>
          )}

          {/* Output Panel - Fluid responsive height */}
          {showOutput && (
            <div 
              className="bg-[#1e1e1e] border-t border-[#3e3e42] flex flex-col min-h-0 editor-output-panel"
              style={{ 
                height: `${outputPanelHeight}px`
              }}
            >
              {/* Output Panel Header - CSS-only responsive */}
              <div 
                className="flex items-center bg-[#2c2c2c] border-b border-[#3e3e42] min-w-0"
                style={{ height: 'clamp(28px, 4vh, 32px)' }}
              >
                <div className="flex shrink-0">
                  <button
                    onClick={() => setOutputTab('output')}
                    title="Output"
                    className={clsx(
                      "border-r border-[#3e3e42] shrink-0 text-xs",
                      outputTab === 'output' 
                        ? "bg-[#1e1e1e] text-[#ffffff]" 
                        : "text-[#cccccc] hover:text-white"
                    )}
                    style={{
                      padding: 'clamp(3px, 0.8vw, 6px) clamp(6px, 1.5vw, 11px)',
                      fontSize: '11px',
                      minWidth: 'clamp(35px, 10vw, 80px)'
                    }}
                  >
                    <span className="block btn-icon md:hidden">📄</span>
                    <span className="hidden btn-text md:inline" style={{ marginLeft: '4px' }}>Output</span>
                  </button>
                  <button
                    onClick={() => setOutputTab('problems')}
                    title={`Problems (${problems.length})`}
                    className={clsx(
                      "border-r border-[#3e3e42] shrink-0 text-xs",
                      outputTab === 'problems' 
                        ? "bg-[#1e1e1e] text-[#ffffff]" 
                        : "text-[#cccccc] hover:text-white"
                    )}
                    style={{
                      padding: 'clamp(3px, 0.8vw, 6px) clamp(6px, 1.5vw, 11px)',
                      fontSize: '11px',
                      minWidth: '100px',
                      paddingRight: 'clamp(8px, 2vw, 16px)'
                    }}
                  >
                    <span className="block btn-icon md:hidden">⚠{formatProblemCount(problems.length)}</span>
                    <span className="hidden btn-text md:inline" style={{ marginLeft: '4px' }}>Problems {formatProblemCount(problems.length)}</span>
                  </button>
                  <button
                    onClick={() => setOutputTab('terminal')}
                    title="Terminal"
                    className={clsx(
                      "border-r border-[#3e3e42] shrink-0 text-xs",
                      outputTab === 'terminal' 
                        ? "bg-[#1e1e1e] text-[#ffffff]" 
                        : "text-[#cccccc] hover:text-white"
                    )}
                    style={{
                      padding: 'clamp(3px, 0.8vw, 6px) clamp(6px, 1.5vw, 11px)',
                      fontSize: '11px',
                      minWidth: 'clamp(35px, 10vw, 80px)'
                    }}
                  >
                    <span className="block btn-icon md:hidden">⚡</span>
                    <span className="hidden btn-text md:inline" style={{ marginLeft: '4px' }}>Terminal</span>
                  </button>
                </div>
                <div 
                  className="flex items-center ml-auto space-x-1 overflow-hidden shrink-0"
                  style={{ 
                    padding: 'clamp(2px, 0.5vw, 6px)',
                    flexShrink: 0,
                    flexWrap: 'nowrap'
                  }}
                >
                  {/* View in Browser Button */}
                  <button
                    onClick={handleViewInBrowser}
                    className="flex items-center justify-center text-xs transition-colors rounded"
                    title="View in Browser"
                  >
                    <span className="block btn-icon md:hidden">🌐</span>
                    <span className="hidden btn-text md:inline">View Browser</span>
                  </button>
                  
                  {/* Run Code Button */}
                  <button
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="flex items-center justify-center text-xs transition-colors rounded"
                    title="Run Code"
                  >
                    {isRunning ? (
                      <>
                        <span className="block btn-icon md:hidden">⏳</span>
                        <span className="hidden btn-text md:inline">Running...</span>
                      </>
                    ) : (
                      <>
                        <span className="block btn-icon md:hidden">▶</span>
                        <span className="hidden btn-text md:inline">Run Code</span>
                      </>
                    )}
                  </button>
                  
                  {/* Clear Button */}
                  <button
                    onClick={() => setOutputContent([])}
                    className="flex items-center justify-center text-xs transition-colors"
                    title="Clear"
                  >
                    <span className="block btn-icon md:hidden">🗑️</span>
                    <span className="hidden btn-text md:inline">Clear</span>
                  </button>
                  
                  {/* Fullscreen Button */}
                  <button
                    onClick={toggleFullscreen}
                    className="flex items-center justify-center text-xs transition-colors"
                    title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                  >
                    <span className="block btn-icon md:hidden">
                      {isFullscreen ? "🗗" : "🗖"}
                    </span>
                    <span className="hidden btn-text md:inline">
                      {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </span>
                  </button>
                  
                  {/* Layout Toggle - Desktop Only */}
                  {!isMobile && (
                    <button
                      onClick={() => {
                        const isCurrentlySimple = settings.layout === 'simple' || settings.layout === 'standard'
                        setLayout(isCurrentlySimple ? 'advanced' : 'simple')
                      }}
                      className="flex items-center justify-center text-xs transition-colors"
                      title={`Current: ${settings.layout === 'simple' ? 'Simple' : settings.layout === 'standard' ? 'Standard' : 'Advanced'} Layout - Click to switch (Alt+T)`}
                    >
                      <span>
                        {(settings.layout === 'simple' || settings.layout === 'standard') ? 'Simple' : 'Advanced'}
                      </span>
                    </button>
                  )}
                </div>
              </div>

              {/* Output Content - CSS-only responsive */}
              <div className="flex-1 min-h-0 p-2 overflow-y-auto font-mono text-xs md:p-3 md:text-sm">
                {outputTab === 'output' && (
                  <div className="text-[#cccccc]">
                    {outputContent.length === 0 ? (
                      <div className="text-[#888] italic">
                        <span className="md:hidden">Tap ▶ to run code</span>
                        <span className="hidden md:inline">Click "Run Code" or press F5 to execute your code and see the output here.</span>
                      </div>
                    ) : (
                      outputContent.map((line, index) => (
                        <div key={index} className="mb-1 break-words">
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
                      <>
                        {problems.length > 100 && (
                          <div className="mb-3 p-2 bg-[#3c3c3c] rounded text-xs border-l-2 border-orange-500">
                            <div className="flex items-center mb-1 text-orange-400">
                              <span className="mr-2">⚠️</span>
                              <span className="font-semibold">Large number of problems detected</span>
                            </div>
                            <div className="text-[#cccccc]">
                              Showing first 100 of {problems.length} problems. 
                              Fix critical issues first for better performance.
                            </div>
                          </div>
                        )}
                        {problems.slice(0, 100).map((problem, index) => (
                          <div key={index} className="mb-2 p-2 bg-[#2c2c2c] rounded text-xs">
                            <div className="flex items-center mb-1 text-xs text-red-400">
                              <span className="mr-2">🔴</span>
                              <span>Line {problem.startLineNumber}, Col {problem.startColumn}</span>
                            </div>
                            <div className="text-[#cccccc] break-words">{problem.message}</div>
                          </div>
                        ))}
                        {problems.length > 100 && (
                          <div className="mt-3 p-2 bg-[#2c2c2c] rounded text-xs text-center">
                            <div className="text-[#888]">
                              ... and {problems.length - 100} more problems
                            </div>
                            <div className="text-[#666] text-xs mt-1">
                              💡 Consider fixing syntax errors first to reduce the total count
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                )}

                {outputTab === 'terminal' && (
                  <div className="text-[#cccccc]">
                    <div className="text-[#888] italic">
                      Terminal functionality would be implemented here.
                      {!isMobile && (
                        <>
                          <br />
                          This could include shell commands, package installation, etc.
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Status Bar - Simplified on mobile */}
        {showStatusBar && !isMobile && (
          <div className="flex items-center justify-between h-6 px-3 bg-[#007acc] text-white text-xs">
            <div className="flex items-center space-x-4">
              <span>🌿 main</span>
              <span>🔴 {formatProblemCount(problems.length)} problems</span>
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

        {/* Mobile Status Bar - Minimal */}
        {showStatusBar && isMobile && (
          <div className="flex items-center justify-between h-5 px-2 bg-[#007acc] text-white text-xs">
            <span>Ln {currentLine}:{currentColumn}</span>
            <span>{language.toUpperCase()}</span>
          </div>
        )}
      </div>

      {/* Command Palette - Mobile responsive */}
      {commandPaletteOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50" style={{ paddingTop: isMobile ? '60px' : '80px' }}>
          <div className={clsx(
            "bg-[#252526] border border-[#3e3e42] rounded-lg shadow-lg",
            isMobile ? "w-full mx-4 max-w-sm" : "w-96 max-w-full"
          )}>
            <input
              type="text"
              placeholder="Type a command..."
              className={clsx(
                "w-full bg-[#3c3c3c] text-[#cccccc] border-none outline-none rounded-t-lg",
                isMobile ? "p-2 text-sm" : "p-3"
              )}
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
                  className={clsx(
                    "flex items-center justify-between hover:bg-[#37373d] cursor-pointer",
                    isMobile ? "px-2 py-2" : "px-3 py-2"
                  )}
                  onClick={() => {
                    action.action()
                    setCommandPaletteOpen(false)
                  }}
                >
                  <div className="flex items-center">
                    <span className={clsx("mr-3", isMobile && "text-sm")}>{action.icon}</span>
                    <span className={clsx("text-[#cccccc]", isMobile ? "text-sm" : "")}>{action.label}</span>
                  </div>
                  {action.keybinding && !isMobile && (
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
