'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { EnhancedMonacoEditor } from './enhanced-monaco-editor'
import { clsx } from 'clsx'

interface ValidationRule {
  rule: string
  message: string
}

interface MobileEditorConfig {
  fontSize: number
  lineHeight: number
  touchTargets: number
  wordWrap: boolean
  minimap: boolean
}

interface MobileCodeEditorProps {
  initialCode: string
  solution: string
  language: string
  validation: ValidationRule[]
  hints: string[]
  onProgress?: (progress: number) => void
  mobileConfig: MobileEditorConfig
  showHints?: boolean
  onHintRequest?: () => void
  className?: string
}

export function MobileCodeEditor({
  initialCode,
  solution,
  language,
  validation,
  hints,
  onProgress,
  mobileConfig,
  showHints = false,
  onHintRequest,
  className = ''
}: MobileCodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [errors, setErrors] = useState<string[]>([])
  const [isMobile, setIsMobile] = useState(false)

  // Stable ref for onProgress callback
  const onProgressRef = useRef(onProgress)
  useEffect(() => {
    onProgressRef.current = onProgress
  })

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

  // Code validation
  const validateCode = useCallback((currentCode: string) => {
    const newErrors: string[] = []
    
    validation.forEach(rule => {
      switch (rule.rule) {
        case 'contains_h1':
          if (!currentCode.includes('<h1>')) {
            newErrors.push(rule.message)
          }
          break
        case 'contains_p':
          if (!currentCode.includes('<p>')) {
            newErrors.push(rule.message)
          }
          break
        case 'properly_nested':
          // Simple check for basic HTML nesting
          const openTags = (currentCode.match(/<[^/][^>]*>/g) || []).length
          const closeTags = (currentCode.match(/<\/[^>]*>/g) || []).length
          if (openTags !== closeTags) {
            newErrors.push(rule.message)
          }
          break
        case 'contains_css_rule':
          if (!currentCode.includes('h1 {') && !currentCode.includes('p {')) {
            newErrors.push(rule.message)
          }
          break
        case 'contains_color':
          if (!currentCode.includes('color:')) {
            newErrors.push(rule.message)
          }
          break
        case 'properly_formatted':
          // Check for semicolons in CSS
          if (currentCode.includes('{') && !currentCode.includes(';')) {
            newErrors.push(rule.message)
          }
          break
        case 'contains_getelementbyid':
          if (!currentCode.includes('getElementById')) {
            newErrors.push(rule.message)
          }
          break
        case 'changes_text':
          if (!currentCode.includes('innerText')) {
            newErrors.push(rule.message)
          }
          break
        case 'function_complete':
          if (currentCode.includes('function changeTitle()') && 
              currentCode.includes('changeTitle() {') && 
              !currentCode.includes('getElementById')) {
            newErrors.push(rule.message)
          }
          break
      }
    })

    setErrors(newErrors)
    
    // Calculate progress based on completion
    const progress = Math.max(0, Math.min(100, 
      ((validation.length - newErrors.length) / validation.length) * 100
    ))
    onProgressRef.current?.(progress)
  }, [validation])

  // Handle code changes
  const handleCodeChange = useCallback((value: string) => {
    setCode(value)
    validateCode(value)
  }, [validateCode])

  // Run code function
  const runCode = useCallback(() => {
    if (errors.length === 0) {
      // Code is valid, show success
      if ('vibrate' in navigator) {
        navigator.vibrate([50, 100, 50]) // Success haptic pattern
      }
    } else {
      // Show errors
      if ('vibrate' in navigator) {
        navigator.vibrate([100]) // Error haptic
      }
    }
  }, [errors])

  return (
    <div className={clsx('flex flex-col h-full bg-gray-900', className)}>
      {/* Mobile Toolbar */}
      {isMobile && (
        <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gray-400 uppercase font-medium">
              {language}
            </span>
            {errors.length === 0 && (
              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                ✓ Valid
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onHintRequest}
              className="px-3 py-1.5 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              💡 Hints
            </button>
            <button
              onClick={runCode}
              className="px-3 py-1.5 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            >
              ▶ Run
            </button>
          </div>
        </div>
      )}

      {/* Editor Container */}
      <div className="flex-1 relative">
        <EnhancedMonacoEditor
          value={code}
          onChange={handleCodeChange}
          language={language}
          height="100%"
          hints={hints}
          samples={[]} // Could be populated based on lesson content
          enableVoiceCoding={true}
          enableGestures={true}
          showLineNumbers={!isMobile}
          mobileOptimized={true}
          onHintRequest={onHintRequest}
        />
      </div>

      {/* Error Display */}
      {errors.length > 0 && (
        <div className="bg-red-900/50 border-t border-red-800 p-3">
          <div className="flex items-start space-x-2">
            <span className="text-red-400 font-medium text-sm">⚠️ Issues:</span>
            <div className="flex-1">
              {errors.map((error, index) => (
                <div key={index} className="text-red-300 text-sm">
                  {error}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Success State */}
      {isMobile && errors.length === 0 && code !== initialCode && (
        <div className="bg-green-900/50 border-t border-green-800 p-3">
          <div className="flex items-center space-x-2">
            <span className="text-green-400">✅</span>
            <span className="text-green-300 text-sm font-medium">
              Great job! Your code looks perfect.
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
