'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEditorSettings } from '@/contexts/editor-settings'

export function EditorTutorial() {
  const [showTutorial, setShowTutorial] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const { settings } = useEditorSettings()

  // Show tutorial for first-time users
  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('rockitcode-editor-tutorial-seen')
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => setShowTutorial(true), 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  const tutorialSteps = [
    {
      title: "Welcome to RockitCode! 🚀",
      content: "Your coding journey starts here. Let's get you set up with the perfect editor experience.",
      action: "Continue"
    },
    {
      title: "Choose Your Layout",
      content: "We have three editor layouts designed for different learning stages:\n\n📝 **Simple** - Clean and focused (recommended for beginners)\n💻 **Standard** - Balanced with essential tools\n🚀 **Advanced** - Full professional experience\n\nOn mobile, use the ⚙️ button to switch quickly!",
      action: "Got it!"
    },
    {
      title: "Quick Switching",
      content: "You can quickly switch layouts anytime:\n\n⚙️ Click the settings button\n⌨️ Use keyboard shortcuts: Alt+1, Alt+2, Alt+3\n\nYour preferences are saved automatically!",
      action: "Start Coding!"
    }
  ]

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowTutorial(false)
      localStorage.setItem('rockitcode-editor-tutorial-seen', 'true')
    }
  }

  const closeTutorial = () => {
    setShowTutorial(false)
    localStorage.setItem('rockitcode-editor-tutorial-seen', 'true')
  }

  return (
    <AnimatePresence>
      {showTutorial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Tutorial Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative max-w-md mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 max-h-[90vh] overflow-y-auto"
          >
            {/* Close Button */}
            <button
              onClick={closeTutorial}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <div className="p-4 sm:p-6">
              <div className="mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {tutorialSteps[currentStep].title}
                </h3>
                <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 whitespace-pre-line">
                  {tutorialSteps[currentStep].content}
                </div>
              </div>

              {/* Progress Indicators */}
              <div className="flex justify-center gap-2 mb-6">
                {tutorialSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentStep 
                        ? 'bg-blue-500' 
                        : index < currentStep 
                          ? 'bg-blue-300 dark:bg-blue-600' 
                          : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Action Button */}
              <motion.button
                onClick={handleNext}
                className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-sm sm:text-base touch-manipulation"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {tutorialSteps[currentStep].action}
              </motion.button>

              {/* Skip Option */}
              {currentStep < tutorialSteps.length - 1 && (
                <button
                  onClick={closeTutorial}
                  className="w-full mt-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                >
                  Skip tutorial
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export function showEditorTutorial() {
  localStorage.removeItem('rockitcode-editor-tutorial-seen')
  window.location.reload()
}
