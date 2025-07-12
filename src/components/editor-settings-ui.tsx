'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEditorSettings, EditorLayout } from '@/contexts/editor-settings'
import { QuickSettings } from '@/components/quick-settings'

interface SettingsIconProps {
  className?: string
}

const SettingsIcon = ({ className = "w-5 h-5" }: SettingsIconProps) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
)

export function EditorSettingsButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [panelPosition, setPanelPosition] = useState<'above' | 'below'>('below')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { settings, setLayout, updateSettings } = useEditorSettings()

  // Calculate optimal panel position based on button location
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const panelHeight = 400 // Approximate panel height
      const spaceBelow = viewportHeight - buttonRect.bottom - 16 // Account for margin
      const spaceAbove = buttonRect.top - 16 // Account for margin
      
      // Set CSS custom properties for dynamic height calculation
      document.documentElement.style.setProperty('--button-bottom', `${viewportHeight - buttonRect.bottom}px`)
      document.documentElement.style.setProperty('--button-top', `${buttonRect.top}px`)
      
      // Position above if there's not enough space below but enough space above
      if (spaceBelow < panelHeight && spaceAbove > panelHeight * 0.6) {
        setPanelPosition('above')
      } else {
        setPanelPosition('below')
      }
    }
  }, [isOpen])

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  const layoutDescriptions = {
    simple: {
      title: 'Simple',
      description: 'Clean, minimal editor for focused coding.',
      features: ['Editor', 'Output', 'Line numbers']
    },
    standard: {
      title: 'Standard',
      description: 'Balanced interface with essential tools.',
      features: ['Explorer', 'Editor', 'Output', 'Status bar', 'IntelliSense']
    },
    advanced: {
      title: 'Advanced',
      description: 'Full VS Code experience with all features.',
      features: ['Activity bar', 'Explorer', 'Minimap', 'Shortcuts', 'Command palette']
    }
  }

  return (
    <div className="relative">
      {/* Settings Button */}
      <motion.button
        ref={buttonRef}
        onClick={handleToggle}
        className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm hover:shadow-md transition-shadow min-h-[40px]"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <SettingsIcon className="w-4 h-4 text-slate-600 dark:text-slate-400 flex-shrink-0" />
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:inline whitespace-nowrap">
          Settings
        </span>
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300 sm:hidden">
          Settings
        </span>
      </motion.button>

      {/* Settings Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Settings Panel - Smart positioning */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: panelPosition === 'below' ? -10 : 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: panelPosition === 'below' ? -10 : 10 }}
              className={`absolute ${
                panelPosition === 'below' ? 'top-full mt-2' : 'bottom-full mb-2'
              } right-0 w-80 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl z-50 flex flex-col settings-panel ${
                panelPosition === 'below' ? 'settings-panel-below' : 'settings-panel-above'
              }`}
              style={{
                height: panelPosition === 'below' 
                  ? 'min(400px, calc(100vh - var(--button-bottom, 0px) - 16px))'
                  : 'min(400px, calc(var(--button-top, 100vh) - 16px))',
                maxWidth: 'min(320px, calc(100vw - 32px))'
              }}
            >
              {/* Header - Fixed */}
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  Editor Layout
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Choose your coding experience
                </p>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto min-h-0">

              {/* Layout Options */}
              <div className="p-4 space-y-3">
                {(Object.keys(layoutDescriptions) as EditorLayout[]).map((layout) => {
                  const info = layoutDescriptions[layout]
                  const isSelected = settings.layout === layout

                  return (
                    <motion.button
                      key={layout}
                      onClick={() => setLayout(layout)}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-colors min-h-[80px] touch-manipulation ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className={`font-medium ${
                          isSelected 
                            ? 'text-blue-700 dark:text-blue-300' 
                            : 'text-slate-900 dark:text-white'
                        }`}>
                          {info.title}
                        </h4>
                        {isSelected && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {info.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {info.features.map((feature) => (
                          <span
                            key={feature}
                            className="text-xs px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-md"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </motion.button>
                  )
                })}
              </div>

              {/* Advanced Settings */}
              <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700">
                <h4 className="text-sm font-medium text-slate-900 dark:text-white mb-3">
                  Quick Toggles
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={settings.showMinimap}
                      onChange={(e) => updateSettings({ showMinimap: e.target.checked })}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-slate-700 dark:text-slate-300">Minimap</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={settings.enableKeyboardShortcuts}
                      onChange={(e) => updateSettings({ enableKeyboardShortcuts: e.target.checked })}
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                    <span className="text-slate-700 dark:text-slate-300">Shortcuts</span>
                  </label>
                </div>
              </div>
              </div>

              {/* Footer - Fixed at bottom */}
              <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
                <div className="mb-2">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                    Shortcuts:
                  </p>
                  <div className="flex gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span><kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded text-xs">Alt+1</kbd> Simple</span>
                    <span><kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded text-xs">Alt+2</kbd> Standard</span>
                    <span><kbd className="px-1 py-0.5 bg-white dark:bg-slate-800 rounded text-xs">Alt+3</kbd> Advanced</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Settings auto-save and persist.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FloatingEditorSettings() {
  return (
    <>
      {/* Desktop floating settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-30 hidden sm:block"
      >
        <EditorSettingsButton />
      </motion.div>
      
      {/* Mobile quick settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-4 right-4 z-30 sm:hidden"
      >
        <QuickSettings />
      </motion.div>
    </>
  )
}
