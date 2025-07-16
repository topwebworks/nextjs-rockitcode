// Lightweight YouTube embed optimized for Free Tier
'use client'

import { useState } from 'react'

interface YouTubeEmbedLiteProps {
  videoId: string
  title: string
  description?: string
}

export function YouTubeEmbedLite({ videoId, title, description }: YouTubeEmbedLiteProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Free Tier optimization: Only load iframe when user clicks
  // This prevents heavy YouTube scripts from loading automatically
  const handleLoadVideo = () => {
    setIsLoaded(true)
  }
  
  if (!isLoaded) {
    return (
      <div className="my-8">
        <div 
          className="relative bg-gray-900 rounded-lg overflow-hidden cursor-pointer group"
          onClick={handleLoadVideo}
        >
          {/* YouTube thumbnail - much lighter than full embed */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title}
            className="w-full aspect-video object-cover"
          />
          
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all">
            <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors">
              <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
          
          {/* Video info */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <h3 className="text-white font-medium text-lg">{title}</h3>
            {description && (
              <p className="text-gray-300 text-sm mt-1">{description}</p>
            )}
          </div>
        </div>
        
        <p className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
          Click to load video (saves bandwidth & memory)
        </p>
      </div>
    )
  }
  
  return (
    <div className="my-8">
      <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
      )}
    </div>
  )
}
