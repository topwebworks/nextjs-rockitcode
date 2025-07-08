'use client'

import { useState } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { Button } from '../button'

export interface CodeDisplayProps {
  code: string
  language: string
  title?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  allowCopy?: boolean
  maxHeight?: string
  className?: string
}

export function CodeDisplay({
  code,
  language,
  title,
  showLineNumbers = true,
  highlightLines = [],
  allowCopy = true,
  maxHeight = '400px',
  className = ''
}: CodeDisplayProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  return (
    <div className={`relative rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 ${className}`}>
      {title && (
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</span>
          {allowCopy && (
            <Button
              onClick={handleCopy}
              className="h-8 px-2 py-1 text-xs bg-zinc-100 hover:bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-300"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          )}
        </div>
      )}
      
      <div 
        className="overflow-auto p-4"
        style={{ maxHeight }}
      >
        <Highlight
          theme={themes.github}
          code={code.trim()}
          language={language}
        >
          {({ className: highlightClassName, style, tokens, getLineProps, getTokenProps }) => (
            <pre 
              className={`${highlightClassName} text-sm leading-relaxed`}
              style={style}
            >
              {tokens.map((line, i) => {
                const { key: lineKey, ...lineProps } = getLineProps({ line, key: i })
                const isHighlighted = highlightLines.includes(i + 1)
                
                return (
                  <div
                    key={i}
                    {...lineProps}
                    className={`${lineProps.className} ${
                      isHighlighted ? 'bg-yellow-100 dark:bg-yellow-900/20' : ''
                    } ${showLineNumbers ? 'pr-4' : ''}`}
                  >
                    {showLineNumbers && (
                      <span className="mr-4 select-none text-zinc-400 dark:text-zinc-600">
                        {(i + 1).toString().padStart(2, ' ')}
                      </span>
                    )}
                    {line.map((token, index) => {
                      const { key: tokenKey, ...tokenProps } = getTokenProps({ token, key: index });
                      return <span key={index} {...tokenProps} />;
                    })}
                  </div>
                )
              })}
            </pre>
          )}
        </Highlight>
      </div>
    </div>
  )
}

// Helper function for creating code examples with proper typing
export function createCodeExample(
  code: string,
  language: string,
  options?: Partial<CodeDisplayProps>
): CodeDisplayProps {
  return {
    code,
    language,
    ...options
  }
}

// Common language configurations
export const LANGUAGE_CONFIGS = {
  html: { language: 'html', title: 'HTML' },
  css: { language: 'css', title: 'CSS' },
  javascript: { language: 'javascript', title: 'JavaScript' },
  python: { language: 'python', title: 'Python' },
  bash: { language: 'bash', title: 'Terminal' },
  json: { language: 'json', title: 'JSON' }
} as const

export type SupportedLanguage = keyof typeof LANGUAGE_CONFIGS
