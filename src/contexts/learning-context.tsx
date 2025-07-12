'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface LearningContextType {
  currentTrack: string | undefined
  currentVideo: string | undefined
  setCurrentTrack: (trackId: string) => void
  setCurrentVideo: (videoId: string | undefined) => void
}

const LearningContext = createContext<LearningContextType | undefined>(undefined)

export function LearningProvider({ children }: { children: ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<string>('python-fundamentals')
  const [currentVideo, setCurrentVideo] = useState<string>()

  return (
    <LearningContext.Provider value={{
      currentTrack,
      currentVideo,
      setCurrentTrack,
      setCurrentVideo
    }}>
      {children}
    </LearningContext.Provider>
  )
}

export function useLearningContext() {
  const context = useContext(LearningContext)
  if (context === undefined) {
    throw new Error('useLearningContext must be used within a LearningProvider')
  }
  return context
}

export { LearningContext }
