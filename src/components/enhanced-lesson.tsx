'use client'

import { useState } from 'react'
import VSCodeMonacoEditor from '@/components/vscode-monaco-editor'
import { Video } from '@/components/video-player'

interface CodeSection {
  id: string
  title: string
  description: string
  language: string
  initialCode: string
  expectedOutput?: string
  videoTimestamp?: number // When to show this code in relation to video
}

interface EnhancedLessonProps {
  title: string
  description: string
  video?: {
    url: string
    poster?: string
    thumbnail?: string
  }
  codeSections: CodeSection[]
  children?: React.ReactNode
}

export function EnhancedLesson({ 
  title, 
  description, 
  video, 
  codeSections, 
  children 
}: EnhancedLessonProps) {
  const [activeCodeSection, setActiveCodeSection] = useState(0)
  const [currentCode, setCurrentCode] = useState(codeSections[0]?.initialCode || '')
  const [isVideoMode, setIsVideoMode] = useState(true)

  const currentSection = codeSections[activeCodeSection]

  return (
    <div className="mx-auto max-w-7xl">
      {/* Video/Code Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setIsVideoMode(true)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isVideoMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            📹 Watch Video
          </button>
          <button
            onClick={() => setIsVideoMode(false)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              !isVideoMode 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            }`}
          >
            💻 Code Editor
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-8">
          {isVideoMode ? (
            /* Video Mode */
            <div className="space-y-6">
              {video && (
                <div className="-mx-2 sm:-mx-4">
                  <Video
                    id="lesson-video"
                    src={video.url}
                    poster={video.poster || video.thumbnail}
                  />
                </div>
              )}
              
              {/* Lesson Content */}
              <div className="prose dark:prose-invert max-w-none">
                {children}
              </div>
            </div>
          ) : (
            /* Code Editor Mode */
            <div className="space-y-6">
              {/* Code Section Info */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {currentSection?.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentSection?.description}
                </p>
              </div>

              {/* Monaco Editor */}
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <div className="h-[600px]">
                  <VSCodeMonacoEditor
                    value={currentCode}
                    language={currentSection?.language || 'html'}
                    theme="vs-dark"
                    showOutput={true}
                    showSidebar={true}
                    showActivityBar={true}
                    height="100%"
                    tabs={[
                      { 
                        id: '1', 
                        name: `${currentSection?.title.toLowerCase().replace(/\s+/g, '-')}.${currentSection?.language === 'javascript' ? 'js' : currentSection?.language}`, 
                        language: currentSection?.language || 'html', 
                        content: currentCode, 
                        isDirty: false, 
                        isActive: true 
                      }
                    ]}
                    onChange={(value) => setCurrentCode(value)}
                  />
                </div>
              </div>

              {/* Expected Output */}
              {currentSection?.expectedOutput && (
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <h4 className="text-sm font-semibold text-green-900 dark:text-green-100 mb-2">
                    ✅ Expected Output:
                  </h4>
                  <pre className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap">
                    {currentSection.expectedOutput}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4">
          {/* Code Sections Navigation */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 sticky top-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              💻 Code Exercises
            </h3>
            <div className="space-y-2">
              {codeSections.map((section, index) => (
                <button
                  key={section.id}
                  onClick={() => {
                    setActiveCodeSection(index)
                    setCurrentCode(section.initialCode)
                    setIsVideoMode(false)
                  }}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeCodeSection === index
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {index + 1}. {section.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {section.language.toUpperCase()}
                    {section.videoTimestamp && ` • ${section.videoTimestamp}s in video`}
                  </div>
                </button>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                🚀 Quick Actions
              </h4>
              <div className="space-y-2">
                <button
                  onClick={() => setCurrentCode(currentSection?.initialCode || '')}
                  className="w-full text-sm px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  🔄 Reset Code
                </button>
                <button
                  onClick={() => {
                    if (video?.url) setIsVideoMode(true)
                  }}
                  className="w-full text-sm px-3 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  📹 Back to Video
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EnhancedLesson
