'use client'

import React from 'react'
import { SynchronizedLesson } from '@/components/synchronized-lesson'

export default function SynchronizedLearningDemo() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 RockitCode Synchronized Learning Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Experience synchronized video-code learning with Python, Shopify, React, and Web Fundamentals
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-full">🐍 Python Programming</span>
            <span className="bg-green-100 dark:bg-green-900 px-3 py-1 rounded-full">🛍️ Shopify Development</span>
            <span className="bg-purple-100 dark:bg-purple-900 px-3 py-1 rounded-full">⚛️ React Development</span>
            <span className="bg-orange-100 dark:bg-orange-900 px-3 py-1 rounded-full">🌐 Web Fundamentals</span>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Synchronized Learning</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Code automatically syncs with video progress. No more pausing to catch up!
            </p>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
            <div className="text-2xl mb-2">📱</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Multi-View Modes</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Mini video, split view, or fullscreen coding. Learn your way!
            </p>
          </div>
          
          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
            <div className="text-2xl mb-2">🧠</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Navigation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Technology-specific tracks with progressive difficulty and prerequisites.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🎮 How to Use This Demo
          </h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Getting Started:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Choose a learning track (Python, Shopify, React, Web)</li>
                <li>• Select a video from the playlist</li>
                <li>• Watch as code syncs with video progress</li>
                <li>• Try different viewing modes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">Pro Tips:</h3>
              <ul className="space-y-1 ml-4">
                <li>• Use mini video mode while coding</li>
                <li>• Modify sync'd code to experiment</li>
                <li>• Follow the progressive lesson structure</li>
                <li>• Check out Python fundamentals first!</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main Demo Component */}
        <SynchronizedLesson />
        
        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>🚀 Built with Next.js, Tailwind CSS, and Monaco Editor</p>
            <p className="mt-2">This demo showcases the future of interactive programming education</p>
          </div>
        </div>
      </div>
    </div>
  )
}
