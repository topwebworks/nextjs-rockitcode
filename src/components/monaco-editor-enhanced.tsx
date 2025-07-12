'use client'

import { useState, useRef, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { 
  SparklesIcon, 
  DocumentTextIcon, 
  BugAntIcon,
  CodeBracketIcon,
  LightBulbIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline'

/**
 * Enhanced Monaco Editor with GitHub Copilot-style AI assistance
 * 
 * This component simulates the AI assistance experience that students
 * will get when using GitHub Copilot, helping them learn professional
 * development patterns.
 */

interface AIAssistance {
  suggestion: string
  type: 'completion' | 'optimization' | 'explanation' | 'debugging'
  confidence: number
  reasoning: string
}

interface CodeProject {
  id: string
  title: string
  description: string
  template: string
  expectedOutput: string
  aiHints: string[]
  githubWorkflow?: {
    branchName: string
    commitMessage: string
    deploymentUrl: string
  }
}

const MonacoEditorEnhanced = ({ project }: { project: CodeProject }) => {
  const { data: session } = useSession()
  const editorRef = useRef<HTMLTextAreaElement>(null)
  const [code, setCode] = useState(project.template)
  const [aiAssistance, setAiAssistance] = useState<AIAssistance | null>(null)
  const [showAI, setShowAI] = useState(false)
  const [cursorPosition, setCursorPosition] = useState(0)
  const [aiLoading, setAiLoading] = useState(false)
  const [professionalMode, setProfessionalMode] = useState(true)

  // Simulate AI assistance based on cursor position and code context
  useEffect(() => {
    const timer = setTimeout(() => {
      generateAIAssistance()
    }, 1000)

    return () => clearTimeout(timer)
  }, [code, cursorPosition])

  const generateAIAssistance = () => {
    if (!professionalMode) return

    const codeBeforeCursor = code.substring(0, cursorPosition)
    const codeAfterCursor = code.substring(cursorPosition)
    
    // Analyze code context to provide relevant suggestions
    let suggestion: AIAssistance | null = null

    if (codeBeforeCursor.includes('function') && !codeBeforeCursor.includes('return')) {
      suggestion = {
        type: 'completion',
        confidence: 85,
        suggestion: '  return result;\n}',
        reasoning: 'Functions typically need a return statement to complete their logic flow.'
      }
    } else if (codeBeforeCursor.includes('const') && codeBeforeCursor.endsWith('= ')) {
      suggestion = {
        type: 'completion',
        confidence: 90,
        suggestion: 'document.getElementById(\'target\')',
        reasoning: 'Common pattern for DOM element selection in web development.'
      }
    } else if (codeBeforeCursor.includes('console.log') && codeBeforeCursor.split('console.log').length > 2) {
      suggestion = {
        type: 'optimization',
        confidence: 75,
        suggestion: 'Consider using a debugger or proper logging framework for production code.',
        reasoning: 'Multiple console.log statements can be replaced with more professional debugging approaches.'
      }
    } else if (codeBeforeCursor.includes('document.querySelector') && !codeBeforeCursor.includes('null')) {
      suggestion = {
        type: 'debugging',
        confidence: 80,
        suggestion: 'Add null check: if (element) { ... }',
        reasoning: 'DOM queries can return null, so checking for element existence prevents runtime errors.'
      }
    } else if (codeBeforeCursor.trim().endsWith('//')) {
      suggestion = {
        type: 'explanation',
        confidence: 70,
        suggestion: ' TODO: Implement user interaction logic here',
        reasoning: 'Comments help document intent and create clear development milestones.'
      }
    }

    setAiAssistance(suggestion)
    setShowAI(!!suggestion)
  }

  const acceptAISuggestion = () => {
    if (!aiAssistance) return

    if (aiAssistance.type === 'completion') {
      const newCode = code.substring(0, cursorPosition) + aiAssistance.suggestion + code.substring(cursorPosition)
      setCode(newCode)
      setCursorPosition(cursorPosition + aiAssistance.suggestion.length)
    }
    
    setShowAI(false)
    setAiAssistance(null)
  }

  const rejectAISuggestion = () => {
    setShowAI(false)
    setAiAssistance(null)
  }

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
    setCursorPosition(e.target.selectionStart)
  }

  const handleCursorChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCursorPosition(e.target.selectionStart)
  }

  const runCode = () => {
    // In a real implementation, this would execute the code
    // For now, we'll simulate the professional workflow
    console.log('Running code with professional workflow...')
  }

  const initiateGitHubWorkflow = async () => {
    setAiLoading(true)
    
    // Simulate GitHub workflow creation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const workflowSteps = [
      'Creating feature branch...',
      'Committing changes...',
      'Pushing to GitHub...',
      'Creating deployment preview...',
      'Updating portfolio...'
    ]
    
    for (const step of workflowSteps) {
      console.log(step)
      await new Promise(resolve => setTimeout(resolve, 500))
    }
    
    setAiLoading(false)
  }

  const getAIIcon = (type: string) => {
    switch (type) {
      case 'completion': return CodeBracketIcon
      case 'optimization': return SparklesIcon
      case 'explanation': return DocumentTextIcon
      case 'debugging': return BugAntIcon
      default: return LightBulbIcon
    }
  }

  const getAIColor = (type: string) => {
    switch (type) {
      case 'completion': return 'text-blue-500'
      case 'optimization': return 'text-green-500'
      case 'explanation': return 'text-yellow-500'
      case 'debugging': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Project Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {project.description}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setProfessionalMode(!professionalMode)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                professionalMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              <SparklesIcon className="h-4 w-4 inline mr-2" />
              AI Assistant: {professionalMode ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>

        {/* Professional Workflow Info */}
        {project.githubWorkflow && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-4">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
              🚀 Professional GitHub Workflow Active
            </h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium text-blue-800 dark:text-blue-300">Branch:</span>
                <span className="ml-2 text-blue-600 dark:text-blue-400">{project.githubWorkflow.branchName}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800 dark:text-blue-300">Deploy to:</span>
                <span className="ml-2 text-blue-600 dark:text-blue-400">{project.githubWorkflow.deploymentUrl}</span>
              </div>
              <div>
                <span className="font-medium text-blue-800 dark:text-blue-300">Portfolio:</span>
                <span className="ml-2 text-blue-600 dark:text-blue-400">Auto-update enabled</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Code Editor */}
        <div className="lg:col-span-2">
          <div className="relative">
            <div className="bg-gray-900 rounded-t-lg px-4 py-2 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="text-gray-300 text-sm font-mono">index.html</span>
            </div>
            
            <div className="relative">
              <textarea
                ref={editorRef}
                value={code}
                onChange={handleCodeChange}
                onSelect={handleCursorChange}
                className="w-full h-96 bg-gray-800 text-gray-100 font-mono text-sm p-4 border-0 outline-none resize-none rounded-b-lg"
                placeholder="Start coding with AI assistance..."
                spellCheck={false}
              />
              
              {/* Line Numbers */}
              <div className="absolute left-0 top-0 h-full w-12 bg-gray-700 rounded-bl-lg flex flex-col text-gray-400 text-xs font-mono pt-4">
                {code.split('\n').map((_, index) => (
                  <div key={index} className="h-5 flex items-center justify-end pr-2">
                    {index + 1}
                  </div>
                ))}
              </div>

              {/* AI Assistance Overlay */}
              {showAI && aiAssistance && professionalMode && (
                <div className="absolute right-4 top-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-4 max-w-sm z-10">
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 ${getAIColor(aiAssistance.type)}`}>
                      {(() => {
                        const Icon = getAIIcon(aiAssistance.type)
                        return <Icon className="h-4 w-4" />
                      })()}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        GitHub Copilot Suggestion
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-300 mb-2">
                        {aiAssistance.reasoning}
                      </p>
                      
                      {aiAssistance.type === 'completion' && (
                        <div className="bg-gray-50 dark:bg-gray-700 rounded p-2 mb-3">
                          <code className="text-xs font-mono text-gray-800 dark:text-gray-200">
                            {aiAssistance.suggestion}
                          </code>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {aiAssistance.confidence}% confidence
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={acceptAISuggestion}
                            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                          >
                            Accept
                          </button>
                          <button
                            onClick={rejectAISuggestion}
                            className="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mt-4">
            <button
              onClick={runCode}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Run Code
            </button>
            
            {project.githubWorkflow && (
              <button
                onClick={initiateGitHubWorkflow}
                disabled={aiLoading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {aiLoading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full inline-block mr-2"></div>
                    Deploying...
                  </>
                ) : (
                  'Deploy to GitHub'
                )}
              </button>
            )}
          </div>
        </div>

        {/* AI Assistant Panel */}
        <div className="space-y-6">
          {/* AI Assistance Status */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              AI Development Assistant
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className={`w-2 h-2 rounded-full ${professionalMode ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  GitHub Copilot Integration
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Professional Workflow Active
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Auto-deployment Enabled
                </span>
              </div>
            </div>
          </div>

          {/* AI Hints */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              💡 AI Learning Hints
            </h3>
            
            <div className="space-y-3">
              {project.aiHints.map((hint, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <LightBulbIcon className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {hint}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Expected Output */}
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              🎯 Expected Result
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded p-3">
              <code className="text-sm text-gray-800 dark:text-gray-200">
                {project.expectedOutput}
              </code>
            </div>
          </div>

          {/* Professional Development Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
              🚀 Pro Developer Tips
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <li>• Use Tab to accept AI suggestions quickly</li>
              <li>• Comment your code for better AI assistance</li>
              <li>• Commit frequently with descriptive messages</li>
              <li>• Test your code before deploying</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MonacoEditorEnhanced
