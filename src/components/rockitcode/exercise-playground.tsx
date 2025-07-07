'use client'

import { useState, useRef } from 'react'
import { CodeDisplay } from './code-display'
import { Button } from '../button'

export interface ExercisePlaygroundProps {
  exerciseId: string
  title: string
  description?: string
  initialCode?: string
  language: string
  expectedOutput?: string
  hints?: string[]
  solution?: string
  allowReset?: boolean
  showLineNumbers?: boolean
  className?: string
  onCodeChange?: (code: string) => void
  onSubmit?: (code: string) => void
  onReset?: () => void
}

export function ExercisePlayground({
  exerciseId,
  title,
  description,
  initialCode = '',
  language,
  expectedOutput,
  hints = [],
  solution,
  allowReset = true,
  showLineNumbers = true,
  className = '',
  onCodeChange,
  onSubmit,
  onReset
}: ExercisePlaygroundProps) {
  const [code, setCode] = useState(initialCode)
  const [showHints, setShowHints] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    onCodeChange?.(newCode)
  }

  const handleSubmit = () => {
    setIsRunning(true)
    
    // Simulate code execution (replace with actual execution logic)
    setTimeout(() => {
      setOutput(`Output for:\n${code}`)
      setIsRunning(false)
      onSubmit?.(code)
    }, 1000)
  }

  const handleReset = () => {
    setCode(initialCode)
    setOutput('')
    setShowHints(false)
    setShowSolution(false)
    onReset?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const newCode = code.substring(0, start) + '  ' + code.substring(end)
      setCode(newCode)
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 2
        }
      }, 0)
    }
  }

  return (
    <div className={`rockitcode-exercise-playground space-y-6 ${className}`}>
      {/* Exercise Header */}
      <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-900">
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {description}
          </p>
        )}
        
        {expectedOutput && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Expected Output:
            </h4>
            <div className="mt-2 rounded border border-zinc-200 bg-white p-3 font-mono text-sm dark:border-zinc-700 dark:bg-zinc-800">
              <pre className="whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">
                {expectedOutput}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Code Editor */}
      <div className="rounded-lg border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Code Editor ({language})
          </span>
          <div className="flex gap-2">
            {hints.length > 0 && (
              <Button
                onClick={() => setShowHints(!showHints)}
                className="px-3 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:hover:bg-yellow-800 dark:text-yellow-200"
              >
                {showHints ? 'Hide Hints' : 'Show Hints'}
              </Button>
            )}
            {solution && (
              <Button
                onClick={() => setShowSolution(!showSolution)}
                className="px-3 py-1 text-xs bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900 dark:hover:bg-green-800 dark:text-green-200"
              >
                {showSolution ? 'Hide Solution' : 'Show Solution'}
              </Button>
            )}
            {allowReset && (
              <Button
                onClick={handleReset}
                className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200"
              >
                Reset
              </Button>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-64 w-full resize-none border-0 bg-transparent font-mono text-sm text-zinc-900 placeholder-zinc-500 focus:outline-none dark:text-zinc-100 dark:placeholder-zinc-400"
            placeholder={`Write your ${language} code here...`}
            spellCheck={false}
          />
        </div>
        
        <div className="border-t border-zinc-200 px-4 py-3 dark:border-zinc-700">
          <Button
            onClick={handleSubmit}
            disabled={isRunning || !code.trim()}
            className={`px-4 py-2 text-sm font-medium ${
              isRunning || !code.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400'
                : 'bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700'
            }`}
          >
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
        </div>
      </div>

      {/* Hints */}
      {showHints && hints.length > 0 && (
        <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
          <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
            Hints:
          </h4>
          <ul className="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
            {hints.map((hint, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="mt-1 h-1 w-1 rounded-full bg-yellow-500 dark:bg-yellow-400" />
                {hint}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Solution */}
      {showSolution && solution && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-green-800 dark:text-green-200">
            Solution:
          </h4>
          <CodeDisplay
            code={solution}
            language={language}
            title="Solution Code"
            showLineNumbers={showLineNumbers}
          />
        </div>
      )}

      {/* Output */}
      {output && (
        <div className="rounded-lg border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900">
          <div className="border-b border-zinc-200 px-4 py-2 dark:border-zinc-700">
            <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Output
            </span>
          </div>
          <div className="p-4">
            <pre className="whitespace-pre-wrap font-mono text-sm text-zinc-700 dark:text-zinc-300">
              {output}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function for creating exercises
export function createExercise(
  exerciseId: string,
  title: string,
  language: string,
  options?: Partial<ExercisePlaygroundProps>
): ExercisePlaygroundProps {
  return {
    exerciseId,
    title,
    language,
    ...options
  }
}

// Pre-configured exercises for common scenarios
export const EXERCISE_TEMPLATES = {
  htmlBasic: {
    language: 'html',
    initialCode: `<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <!-- Write your HTML here -->
</body>
</html>`,
    hints: [
      'Remember to use proper HTML structure',
      'All HTML elements should have opening and closing tags',
      'Use semantic HTML elements when possible'
    ]
  },
  
  cssBasic: {
    language: 'css',
    initialCode: `/* Write your CSS here */
body {
    font-family: Arial, sans-serif;
}`,
    hints: [
      'Use CSS selectors to target elements',
      'Remember the CSS box model: margin, border, padding, content',
      'Use specific selectors for better control'
    ]
  },
  
  javascriptBasic: {
    language: 'javascript',
    initialCode: `// Write your JavaScript here
function myFunction() {
    // Your code goes here
}`,
    hints: [
      'Remember to declare variables with let, const, or var',
      'Functions can be declared or expressed',
      'Use console.log() to output values'
    ]
  },
  
  pythonBasic: {
    language: 'python',
    initialCode: `# Write your Python here
def my_function():
    # Your code goes here
    pass`,
    hints: [
      'Python uses indentation to define code blocks',
      'Use print() to output values',
      'Remember to follow Python naming conventions'
    ]
  }
} as const

export type ExerciseTemplate = keyof typeof EXERCISE_TEMPLATES
