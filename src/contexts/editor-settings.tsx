'use client'

import { createContext, useContext, useState, useEffect } from 'react'

export type EditorLayout = 'simple' | 'standard' | 'advanced'

export interface EditorSettings {
  layout: EditorLayout
  showActivityBar: boolean
  showSidebar: boolean
  showStatusBar: boolean
  showMinimap: boolean
  showOutput: boolean
  showLineNumbers: boolean
  enableKeyboardShortcuts: boolean
  theme: 'vs-light' | 'vs-dark'
}

const defaultSettings: EditorSettings = {
  layout: 'simple',
  showActivityBar: false,
  showSidebar: false,
  showStatusBar: false,
  showMinimap: false,
  showOutput: true,
  showLineNumbers: true,
  enableKeyboardShortcuts: false,
  theme: 'vs-dark'
}

const layoutPresets: Record<EditorLayout, EditorSettings> = {
  simple: {
    layout: 'simple',
    showActivityBar: false,
    showSidebar: false,
    showStatusBar: false,
    showMinimap: false,
    showOutput: true,
    showLineNumbers: true,
    enableKeyboardShortcuts: false,
    theme: 'vs-dark'
  },
  standard: {
    layout: 'standard',
    showActivityBar: true,
    showSidebar: true,
    showStatusBar: true,
    showMinimap: false,
    showOutput: true,
    showLineNumbers: true,
    enableKeyboardShortcuts: true,
    theme: 'vs-dark'
  },
  advanced: {
    layout: 'advanced',
    showActivityBar: true,
    showSidebar: true,
    showStatusBar: true,
    showMinimap: true,
    showOutput: true,
    showLineNumbers: true,
    enableKeyboardShortcuts: true,
    theme: 'vs-dark'
  }
}

interface EditorSettingsContextType {
  settings: EditorSettings
  updateSettings: (newSettings: Partial<EditorSettings>) => void
  setLayout: (layout: EditorLayout) => void
  resetToDefaults: () => void
}

const EditorSettingsContext = createContext<EditorSettingsContextType | undefined>(undefined)

export function EditorSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<EditorSettings>(defaultSettings)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('rockitcode-editor-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings({ ...defaultSettings, ...parsed })
      } catch (error) {
        console.warn('Failed to parse saved editor settings:', error)
      }
    }
  }, [])

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('rockitcode-editor-settings', JSON.stringify(settings))
  }, [settings])

  // Keyboard shortcuts for layout switching
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      // Alt + 1/2/3 to switch layouts
      if (e.altKey && !e.ctrlKey && !e.shiftKey && !e.metaKey) {
        switch (e.key) {
          case '1':
            e.preventDefault()
            setLayout('simple')
            break
          case '2':
            e.preventDefault()
            setLayout('standard')
            break
          case '3':
            e.preventDefault()
            setLayout('advanced')
            break
        }
      }
    }

    window.addEventListener('keydown', handleKeydown)
    return () => window.removeEventListener('keydown', handleKeydown)
  }, [])

  const updateSettings = (newSettings: Partial<EditorSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  const setLayout = (layout: EditorLayout) => {
    const preset = layoutPresets[layout]
    setSettings(preset)
  }

  const resetToDefaults = () => {
    setSettings(defaultSettings)
  }

  return (
    <EditorSettingsContext.Provider value={{
      settings,
      updateSettings,
      setLayout,
      resetToDefaults
    }}>
      {children}
    </EditorSettingsContext.Provider>
  )
}

export function useEditorSettings() {
  const context = useContext(EditorSettingsContext)
  if (context === undefined) {
    throw new Error('useEditorSettings must be used within an EditorSettingsProvider')
  }
  return context
}

export { layoutPresets }
