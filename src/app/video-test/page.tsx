'use client'

import React from 'react'
import { VideoPlayer } from '@/components/video-player-component'

const testChapters = [
  { title: "Introduction", timestamp: 0 },
  { title: "HTML Structure", timestamp: 45 },
  { title: "Adding Content", timestamp: 120 },
  { title: "Practice Time", timestamp: 180 }
]

export default function VideoTestPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Video Player Test</h1>
      
      {/* YouTube Video Test */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">YouTube Video with Chapters</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded mb-4">
          <h3 className="font-medium mb-2">Debug Info:</h3>
          <p className="text-sm">Original URL: https://www.youtube.com/embed/qz0aGYrrlhU?playsinline=1</p>
          <p className="text-sm">Chapters: {testChapters.length} defined</p>
          <p className="text-sm text-green-600">✓ VideoPlayer component should render below</p>
          <div className="text-xs mt-2 bg-gray-200 dark:bg-gray-700 p-2 rounded max-h-32 overflow-auto">
            {testChapters.map((ch, i) => (
              <div key={i}>{i+1}. {ch.title} at {ch.timestamp}s</div>
            ))}
          </div>
        </div>
        <VideoPlayer
          src="https://www.youtube.com/embed/qz0aGYrrlhU?playsinline=1"
          chapters={testChapters}
          onProgress={(progress) => console.log('Progress:', progress)}
        />
      </div>

      {/* Local Video Test (fallback) */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Local Video (if available)</h2>
        <VideoPlayer
          src="/videos/test-video.mp4"
          chapters={testChapters}
          onProgress={(progress) => console.log('Local video progress:', progress)}
        />
      </div>

      {/* Chapter Testing Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          🧪 Testing Instructions
        </h3>
        <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
          <li>• Chapter buttons should appear at the bottom of the video</li>
          <li>• Clicking a chapter should jump to that timestamp in the video</li>
          <li>• YouTube videos will reload with the new timestamp</li>
          <li>• Check browser console for progress updates</li>
        </ul>
      </div>

      {/* Manual Chapter Test */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
        <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
          🔧 Manual Chapter Test
        </h3>
        <div className="flex flex-wrap gap-2">
          {testChapters.map((chapter, index) => (
            <button
              key={index}
              onClick={() => {
                console.log('Manual chapter test:', chapter)
                // Try to find and control the iframe directly
                const iframe = document.querySelector('iframe[src*="youtube"]') as HTMLIFrameElement
                if (iframe) {
                  const currentSrc = iframe.src
                  let baseUrl = currentSrc.split('?')[0]
                  const urlParams = new URLSearchParams(currentSrc.split('?')[1] || '')
                  urlParams.set('start', chapter.timestamp.toString())
                  urlParams.set('autoplay', '1')
                  iframe.src = `${baseUrl}?${urlParams.toString()}`
                  console.log('Updated iframe src:', iframe.src)
                }
              }}
              className="px-3 py-2 text-xs bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium"
            >
              {chapter.title} ({chapter.timestamp}s)
            </button>
          ))}
        </div>
        <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-2">
          These buttons test chapter navigation manually. Check browser console for debug info.
        </p>
      </div>
    </div>
  )
}
