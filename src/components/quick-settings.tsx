'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEditorSettings, EditorLayout } from '@/contexts/editor-settings'

interface QuickSettingsProps {
  className?: string
}

export function QuickSettings({ className = "" }: QuickSettingsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [panelPosition, setPanelPosition] = useState<'above' | 'below'>('below')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const { settings, setLayout } = useEditorSettings()

  // Calculate optimal panel position based on button location
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const panelHeight = 200 // Approximate panel height for quick settings
      const spaceBelow = viewportHeight - buttonRect.bottom - 8 // Account for margin
      const spaceAbove = buttonRect.top - 8 // Account for margin
      
      // Position above if there's not enough space below but enough space above
      if (spaceBelow < panelHeight && spaceAbove > panelHeight * 0.6) {
        setPanelPosition('above')
      } else {
        setPanelPosition('below')
      }
    }
  }, [isOpen])

  const layouts: { key: EditorLayout; label: string; icon: string }[] = [
    { key: 'simple', label: 'Simple', icon: '📝' },
    { key: 'standard', label: 'Standard', icon: '💻' },
    { key: 'advanced', label: 'Advanced', icon: '🚀' }
  ]

  return (
    <div className={`relative ${className}`}>
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-colors min-h-[40px] touch-manipulation"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="text-gray-600 dark:text-gray-400 text-lg">⚙️</span>
        <span className="text-gray-700 dark:text-gray-300 hidden sm:inline whitespace-nowrap">
          {layouts.find(l => l.key === settings.layout)?.label || 'Settings'}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: panelPosition === 'below' ? -5 : 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: panelPosition === 'below' ? -5 : 5 }}
              className={`absolute ${
                panelPosition === 'below' ? 'top-full mt-1' : 'bottom-full mb-1'
              } right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg z-50 min-w-[160px] settings-panel ${
                panelPosition === 'below' ? 'settings-panel-below' : 'settings-panel-above'
              }`}
              style={{
                maxWidth: 'min(200px, calc(100vw - 32px))'
              }}
            >
              <div className="p-2">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 px-2">
                  Layout
                </div>
                {layouts.map((layout) => (
                  <button
                    key={layout.key}
                    onClick={() => {
                      setLayout(layout.key)
                      setIsOpen(false)
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2.5 text-sm rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation ${
                      settings.layout === layout.key 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                        : 'text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span>{layout.icon}</span>
                    <span>{layout.label}</span>
                    {settings.layout === layout.key && (
                      <span className="ml-auto text-blue-500">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
