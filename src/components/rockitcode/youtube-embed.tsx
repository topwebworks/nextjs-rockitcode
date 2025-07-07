'use client'

import { useState, useEffect } from 'react'
import YouTube, { YouTubeProps } from 'react-youtube'
import { CirclePlayIcon } from '../../icons/circle-play-icon'

export interface YouTubeEmbedProps {
  videoId: string
  title?: string
  description?: string
  startTime?: number
  endTime?: number
  autoplay?: boolean
  showControls?: boolean
  width?: number | string
  height?: number | string
  aspectRatio?: '16:9' | '4:3'
  className?: string
  onProgress?: (progress: number) => void
  onComplete?: () => void
}

export function YouTubeEmbed({
  videoId,
  title,
  description,
  startTime = 0,
  endTime,
  autoplay = false,
  showControls = true,
  width = '100%',
  height,
  aspectRatio = '16:9',
  className = '',
  onProgress,
  onComplete
}: YouTubeEmbedProps) {
  const [isReady, setIsReady] = useState(false)
  const [player, setPlayer] = useState<any>(null)
  const [progress, setProgress] = useState(0)

  // Calculate height based on aspect ratio if not provided
  const calculatedHeight = height || (aspectRatio === '16:9' ? '56.25%' : '75%')

  const opts: YouTubeProps['opts'] = {
    width: typeof width === 'string' ? width : width.toString(),
    height: typeof height === 'string' ? height : height?.toString(),
    playerVars: {
      autoplay: autoplay ? 1 : 0,
      controls: showControls ? 1 : 0,
      start: startTime,
      end: endTime,
      rel: 0, // Don't show related videos
      modestbranding: 1, // Minimal YouTube branding
      fs: 1, // Allow fullscreen
      cc_load_policy: 1, // Show captions if available
      iv_load_policy: 3, // Hide annotations
      origin: typeof window !== 'undefined' ? window.location.origin : undefined
    }
  }

  const onReady = (event: any) => {
    setPlayer(event.target)
    setIsReady(true)
  }

  const onStateChange = (event: any) => {
    // YouTube player states: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering), 5 (cued)
    if (event.data === 0) {
      onComplete?.()
    }
  }

  // Track progress if callback provided
  useEffect(() => {
    if (!player || !isReady || !onProgress) return

    const interval = setInterval(() => {
      if (player.getPlayerState() === 1) { // Playing
        const currentTime = player.getCurrentTime()
        const duration = player.getDuration()
        const currentProgress = (currentTime / duration) * 100
        setProgress(currentProgress)
        onProgress(currentProgress)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [player, isReady, onProgress])

  return (
    <div className={`rockitcode-youtube-embed ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          {description && (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          )}
        </div>
      )}
      
      <div 
        className="relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800"
        style={{ 
          paddingBottom: typeof calculatedHeight === 'string' ? calculatedHeight : `${calculatedHeight}px`,
          height: typeof calculatedHeight === 'number' ? `${calculatedHeight}px` : 0
        }}
      >
        <YouTube
          videoId={videoId}
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
          className="absolute inset-0 h-full w-full"
          iframeClassName="w-full h-full"
        />
      </div>

      {onProgress && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
            <div 
              className="h-full bg-blue-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

// Helper function for creating YouTube embeds with proper typing
export function createYouTubeEmbed(
  videoId: string,
  options?: Partial<YouTubeEmbedProps>
): YouTubeEmbedProps {
  return {
    videoId,
    ...options
  }
}

// Helper function to extract video ID from YouTube URL
export function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/watch\?.*v=([^&\n?#]+)/
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) {
      return match[1]
    }
  }

  return null
}

// Component for displaying a YouTube video thumbnail with play button
export function YouTubeThumbnail({
  videoId,
  title,
  onClick,
  className = ''
}: {
  videoId: string
  title?: string
  onClick?: () => void
  className?: string
}) {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800 ${className}`}
    >
      <img
        src={thumbnailUrl}
        alt={title || 'Video thumbnail'}
        className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
        <CirclePlayIcon className="h-16 w-16 text-white opacity-90 transition-opacity group-hover:opacity-100" />
      </div>
      {title && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h4 className="text-sm font-medium text-white">{title}</h4>
        </div>
      )}
    </button>
  )
}
