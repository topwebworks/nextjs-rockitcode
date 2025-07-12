'use client'

import React, { useState } from 'react'
import { VideoPlayer } from '@/components/video-player-component'

const testVideo = {
  id: 'test-video',
  title: 'Chapter Visibility Test',
  url: 'https://www.youtube.com/embed/PkZNo7MFNFg?playsinline=1',
  duration: '18:45',
  chapters: [
    { title: 'Introduction', timestamp: 0 },
    { title: 'Getting Started', timestamp: 180 },
    { title: 'Basic Concepts', timestamp: 420 },
    { title: 'Advanced Topics', timestamp: 720 },
    { title: 'Conclusion', timestamp: 1020 }
  ]
}

export default function ChapterTestPage() {
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('large')
  const [showChapters, setShowChapters] = useState(true)

  const sizeClasses = {
    small: 'w-80 h-48',
    medium: 'w-96 h-56', 
    large: 'w-full max-w-4xl'
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          📚 Chapter Button Visibility Test
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Test how chapter buttons adapt to different video sizes. Chapters automatically hide in small views to maintain a clean interface.
        </p>

        {/* Controls */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🎛️ Test Controls
          </h2>
          
          <div className="flex flex-wrap gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Video Size:
              </label>
              <div className="flex gap-2">
                {(['small', 'medium', 'large'] as const).map((sizeOption) => (
                  <button
                    key={sizeOption}
                    onClick={() => setSize(sizeOption)}
                    className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                      size === sizeOption
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {sizeOption.charAt(0).toUpperCase() + sizeOption.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Show Chapters:
              </label>
              <button
                onClick={() => setShowChapters(!showChapters)}
                className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                  showChapters
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {showChapters ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Size Info */}
        <div className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          <p>
            <strong>Current settings:</strong> Size = {size}, Show Chapters = {showChapters ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Expected behavior:</strong>
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><strong>Small:</strong> Chapters hidden, small indicator shown in top-right</li>
            <li><strong>Medium:</strong> Chapters visible with smaller buttons (split view mode)</li>
            <li><strong>Large:</strong> Chapters visible with full-size buttons (full video mode)</li>
            <li><strong>Auto-responsive:</strong> Chapters hide automatically when container &lt; 400px wide</li>
            <li><strong>Mini video mode:</strong> Anchors to screen corners, never blocks code editor</li>
          </ul>
        </div>

        {/* Video Player Test */}
        <div className="flex justify-center">
          <div className={`${sizeClasses[size]} border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden`}>
            <VideoPlayer
              src={testVideo.url}
              chapters={testVideo.chapters}
              size={size}
              showChapters={showChapters}
              className="w-full h-full"
              onProgress={(progress) => {
                // Optional: handle progress for testing
                console.log('Video progress:', progress)
              }}
            />
          </div>
        </div>

        {/* Chapter List for Reference */}
        <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📋 Chapter Reference
          </h3>
          <div className="grid gap-2">
            {testVideo.chapters.map((chapter, index) => (
              <div key={index} className="flex items-center justify-between py-2 px-3 bg-white dark:bg-gray-700 rounded">
                <span className="text-sm text-gray-900 dark:text-white">
                  {index + 1}. {chapter.title}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {Math.floor(chapter.timestamp / 60)}:{(chapter.timestamp % 60).toString().padStart(2, '0')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
