'use client'

import { useState } from 'react'
import WelcomeToCodeland from '../lessons/WelcomeToCodeland'
import CSSKingdom from '../lessons/CSSKingdom'
import JavaScriptRealm from '../lessons/JavaScriptRealm'

interface InteractiveLessonLauncherProps {
  component: 'WelcomeToCodeland' | 'CSSKingdom' | 'JavaScriptRealm'
  path: string
  description: string
}

const lessonComponents = {
  WelcomeToCodeland: WelcomeToCodeland,
  CSSKingdom: CSSKingdom,
  JavaScriptRealm: JavaScriptRealm
}

const lessonDetails = {
  WelcomeToCodeland: {
    title: 'Welcome to Codeland',
    emoji: '🌟',
    gradient: 'from-purple-600 to-blue-600',
    features: ['Live Code Sandbox', 'Code Garden', 'Castle Builder', 'Speed Challenges']
  },
  CSSKingdom: {
    title: 'CSS Kingdom',
    emoji: '🎨',
    gradient: 'from-pink-600 to-purple-600',
    features: ['Color Palace', 'Layout Tools', 'Precision Sniper', 'Masterpiece Gallery']
  },
  JavaScriptRealm: {
    title: 'JavaScript Realm',
    emoji: '🧙‍♂️',
    gradient: 'from-green-600 to-blue-600',
    features: ['Spell Laboratory', 'Team Coding', 'Time Travel', 'Challenge Towers']
  }
}

export default function InteractiveLessonLauncher({ component, path, description }: InteractiveLessonLauncherProps) {
  const [isLaunched, setIsLaunched] = useState(false)
  const [isReady, setIsReady] = useState(false)
  
  const LessonComponent = lessonComponents[component]
  const details = lessonDetails[component]

  const handleLaunch = () => {
    setIsReady(true)
    setTimeout(() => setIsLaunched(true), 500)
  }

  if (isLaunched) {
    return (
      <div className="min-h-screen">
        <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Interactive Lesson Active</h3>
              <p className="text-sm text-gray-600">You're now in the {details.title} gaming experience</p>
            </div>
            <button
              onClick={() => setIsLaunched(false)}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
            >
              Return to Lesson Info
            </button>
          </div>
        </div>
        <LessonComponent />
      </div>
    )
  }

  return (
    <div className="my-8">
      {/* Lesson Preview Card */}
      <div className={`bg-gradient-to-r ${details.gradient} p-8 rounded-xl text-white mb-6`}>
        <div className="text-center">
          <div className="text-6xl mb-4">{details.emoji}</div>
          <h2 className="text-3xl font-bold mb-2">{details.title}</h2>
          <p className="text-xl mb-6 opacity-90">{description}</p>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            {details.features.map((feature, index) => (
              <div key={index} className="bg-white bg-opacity-20 rounded-lg p-3">
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Launch Interface */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to Begin Your Adventure?
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4 mb-6 text-left">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-blue-600 font-semibold mb-2">✨ Interactive Learning</div>
              <div className="text-sm text-gray-600">Live coding, instant feedback, visual results</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-green-600 font-semibold mb-2">🎯 Gaming Elements</div>
              <div className="text-sm text-gray-600">XP points, achievements, level progression</div>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="text-purple-600 font-semibold mb-2">🏆 Real Skills</div>
              <div className="text-sm text-gray-600">Build actual portfolio projects you can use</div>
            </div>
          </div>

          <div className="mb-6">
            <div className="text-sm text-gray-500 mb-2">Component Path:</div>
            <code className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">{path}</code>
          </div>

          {!isReady ? (
            <button
              onClick={handleLaunch}
              className={`bg-gradient-to-r ${details.gradient} text-white px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transform transition-all duration-200 shadow-lg`}
            >
              🚀 Launch Interactive Experience
            </button>
          ) : (
            <div className="space-y-4">
              <div className="text-green-600 font-semibold">✅ Loading Interactive Experience...</div>
              <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="bg-green-500 h-full rounded-full animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Traditional vs Interactive Comparison */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6">
        <h4 className="text-lg font-bold text-gray-800 mb-4">Why This Interactive Method Works Better</h4>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h5 className="font-semibold text-red-700 mb-2">❌ Traditional Learning</h5>
            <ul className="text-sm text-red-600 space-y-1">
              <li>• Read walls of text</li>
              <li>• Memorize syntax</li>
              <li>• Copy-paste examples</li>
              <li>• Get confused by errors</li>
              <li>• Feel overwhelmed</li>
            </ul>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h5 className="font-semibold text-green-700 mb-2">✅ Interactive Gaming</h5>
            <ul className="text-sm text-green-600 space-y-1">
              <li>• Learn by playing & creating</li>
              <li>• See instant visual results</li>
              <li>• Build real projects</li>
              <li>• Get immediate feedback</li>
              <li>• Feel excited & confident</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export { InteractiveLessonLauncher }
