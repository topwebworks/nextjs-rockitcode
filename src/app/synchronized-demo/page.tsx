'use client'

import React from 'react'
import SynchronizedLesson from '@/components/synchronized-lesson'

export default function SynchronizedLearningDemo() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <SynchronizedLesson className="px-6" />
      
      {/* Feature Highlights */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">🎯</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Smart Tracks</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Technology-specific learning paths like Shopify Liquid, React mastery, or web fundamentals
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">�💻</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Mini Video Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Watch video in a floating overlay while coding. Position it in any corner - perfect for following along!
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">⚊</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Split View Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Video and code side-by-side for easy reference. Great for larger screens and detailed tutorials.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="text-2xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Chapter Navigation</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Jump to specific topics with visual chapter buttons that work with YouTube videos
            </p>
          </div>
        </div>
        
        {/* Technology Examples */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            🚀 Technology Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                🛍️ Shopify Development
              </h3>
              <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
                <li>• Liquid template language</li>
                <li>• Theme file structure</li>
                <li>• Product pages & collections</li>
                <li>• Cart functionality</li>
              </ul>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                ⚛️ React Mastery
              </h3>
              <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <li>• Component fundamentals</li>
                <li>• Hooks & state management</li>
                <li>• Advanced patterns</li>
                <li>• Performance optimization</li>
              </ul>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                🌐 Web Fundamentals
              </h3>
              <ul className="text-sm text-purple-800 dark:text-purple-200 space-y-1">
                <li>• HTML semantic structure</li>
                <li>• CSS layout & styling</li>
                <li>• JavaScript interactivity</li>
                <li>• Responsive design</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Future Expansions */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            🔮 Future Technology Tracks
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🎨</div>
              <div className="font-medium">Figma to Code</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📱</div>
              <div className="font-medium">React Native</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🗄️</div>
              <div className="font-medium">Node.js APIs</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">☁️</div>
              <div className="font-medium">AWS Deployment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🎭</div>
              <div className="font-medium">WordPress Themes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="font-medium">Data Visualization</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🤖</div>
              <div className="font-medium">AI Integration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔐</div>
              <div className="font-medium">Security Basics</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
