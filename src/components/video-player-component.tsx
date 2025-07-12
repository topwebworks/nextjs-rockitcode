'use client'

import React, { useState, useRef, useEffect } from 'react'
import { PlayIcon } from '@/icons/play-icon'
import { clsx } from 'clsx'

interface VideoChapter {
  title: string
  timestamp: number
}

interface VideoPlayerProps {
  src: string
  poster?: string
  onProgress?: (progress: number) => void
  chapters?: VideoChapter[]
  playbackSpeeds?: number[]
  captions?: boolean
  mobileOptimized?: boolean
  className?: string
  showChapters?: boolean // Control chapter visibility
  size?: 'small' | 'medium' | 'large' // Size hint for responsive behavior
}

export function VideoPlayer({
  src,
  poster,
  onProgress,
  chapters = [],
  playbackSpeeds = [0.75, 1, 1.25, 1.5],
  captions = true,
  mobileOptimized = false,
  className = '',
  showChapters = true,
  size = 'large'
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Determine if chapters should be shown based on container size and props
  const shouldShowChapters = () => {
    if (!showChapters) return false
    
    // With dropdowns, we can show chapters even on smaller sizes
    // Only hide on extremely small containers (less than 250px wide or 150px tall)
    if (containerSize.width > 0 && (containerSize.width < 250 || containerSize.height < 150)) {
      return false
    }
    
    return chapters.length > 0
  }

  // Monitor container size
  useEffect(() => {
    if (!containerRef.current) return

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        })
      }
    })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])

  // Format time for display (helper function)
  const formatTime = (seconds: number): string => {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)

    return h > 0
      ? `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
      : `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  // Handle time update
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100
      setCurrentTime(videoRef.current.currentTime)
      onProgress?.(progress)
    }
  }

  // Handle seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect()
      const clickX = e.clientX - rect.left
      const percentage = clickX / rect.width
      const newTime = percentage * duration
      videoRef.current.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  // Jump to chapter - works for both YouTube and local videos
  const jumpToChapter = (timestamp: number) => {
    if (isYouTube) {
      // For YouTube videos, we need to modify the src URL with timestamp
      const iframe = document.querySelector('iframe[src*="youtube"]') as HTMLIFrameElement
      if (iframe) {
        const currentSrc = iframe.src
        let baseUrl = currentSrc.split('?')[0]
        const urlParams = new URLSearchParams(currentSrc.split('?')[1] || '')
        
        // Set the start time parameter
        urlParams.set('start', timestamp.toString())
        urlParams.set('autoplay', '1') // Auto-play when jumping to chapter
        
        // Update the iframe src to jump to the timestamp
        iframe.src = `${baseUrl}?${urlParams.toString()}`
        
        console.log(`Jumping to chapter at ${formatTime(timestamp)}: ${iframe.src}`)
      }
    } else if (videoRef.current) {
      // For local videos, use the video element
      videoRef.current.currentTime = timestamp
      setCurrentTime(timestamp)
      // Auto-play when jumping to chapter
      videoRef.current.play()
    }
  }

  // Handle playback speed change
  const changePlaybackSpeed = (speed: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speed
      setPlaybackRate(speed)
    }
  }

  // Auto-hide controls on mobile
  useEffect(() => {
    if (!mobileOptimized) return

    let timer: NodeJS.Timeout
    const resetTimer = () => {
      clearTimeout(timer)
      setShowControls(true)
      timer = setTimeout(() => {
        if (isPlaying) {
          setShowControls(false)
        }
      }, 3000)
    }

    if (isPlaying) {
      resetTimer()
    }

    return () => clearTimeout(timer)
  }, [isPlaying, mobileOptimized])

  // YouTube embed detection
  const isYouTube = src.includes('youtube.com') || src.includes('youtu.be')
  
  console.log('VideoPlayer Debug:', { src, isYouTube, chaptersCount: chapters.length })

  if (isYouTube) {
    // For YouTube videos, use iframe embed with proper parameter handling
    let youtubeEmbedUrl = src
    
    // Convert various YouTube URL formats to embed format
    if (src.includes('watch?v=')) {
      const videoId = src.split('watch?v=')[1].split('&')[0]
      youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`
    } else if (src.includes('youtu.be/')) {
      const videoId = src.split('youtu.be/')[1].split('?')[0]
      youtubeEmbedUrl = `https://www.youtube.com/embed/${videoId}`
    }
    
    // Add parameters for better embed experience with sound
    const params = new URLSearchParams()
    params.set('playsinline', '1')
    params.set('modestbranding', '1')
    params.set('rel', '0')
    params.set('controls', '1') // Enable YouTube controls (includes volume)
    params.set('enablejsapi', '1') // Enable JavaScript API
    params.set('autoplay', '0') // Don't autoplay (browser policies)
    params.set('mute', '0') // Explicitly unmute
    params.set('fs', '1') // Allow fullscreen
    params.set('cc_load_policy', '0') // Don't show captions by default
    if (!youtubeEmbedUrl.includes('?')) {
      youtubeEmbedUrl += `?${params.toString()}`
    }
    
    return (
      <div ref={containerRef} className={clsx('relative aspect-video bg-black', className)}>
        <iframe
          src={youtubeEmbedUrl}
          className="absolute inset-0 w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Lesson Video"
        />
        
        {/* Chapter dropdown for YouTube - positioned to avoid controls */}
        {chapters.length > 0 && shouldShowChapters() && (
          <div className="absolute top-4 left-4 z-10 pointer-events-auto">
            <select 
              onChange={(e) => {
                const timestamp = parseInt(e.target.value, 10)
                if (!isNaN(timestamp)) {
                  jumpToChapter(timestamp)
                }
                // Reset dropdown after selection
                e.target.value = ""
              }}
              className={clsx(
                "bg-black/80 text-white border border-white/30 rounded-lg cursor-pointer hover:bg-black/90 transition-colors font-medium shadow-lg backdrop-blur-sm",
                {
                  "text-xs px-3 py-2": size === 'large',
                  "text-xs px-2 py-1.5": size === 'medium',
                  "text-xs px-2 py-1": size === 'small'
                }
              )}
              title="Jump to chapter"
              defaultValue=""
            >
              <option value="" disabled>📚 Chapters ({chapters.length})</option>
              {chapters.map((chapter, index) => (
                <option key={index} value={chapter.timestamp} className="bg-black text-white">
                  {formatTime(chapter.timestamp)} - {chapter.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Small indicator when chapters are hidden due to size */}
        {chapters.length > 0 && !shouldShowChapters() && (
          <div className="absolute top-2 right-2 z-10">
            <div 
              className="bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center cursor-pointer hover:bg-black/80 transition-colors"
              title={`${chapters.length} chapters available (hidden in small view)`}
            >
              <span className="mr-1">📚</span>
              <span>{chapters.length}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  // For local videos, use custom video player
  return (
    <div ref={containerRef} className={clsx('relative aspect-video bg-black group', className)}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => {
          if (videoRef.current) {
            setDuration(videoRef.current.duration)
            // Ensure video is not muted
            videoRef.current.muted = false
            videoRef.current.volume = 0.8 // Set reasonable volume
          }
        }}
        onEnded={() => setIsPlaying(false)}
        playsInline={mobileOptimized}
        controls={false}
        muted={false} // Explicitly not muted
        onClick={mobileOptimized ? togglePlay : undefined}
      />

      {/* Custom Controls */}
      <div 
        className={clsx(
          'absolute inset-0 flex items-center justify-center transition-opacity',
          showControls ? 'opacity-100' : 'opacity-0',
          mobileOptimized && 'group-hover:opacity-100'
        )}
      >
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className="w-16 h-16 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
        >
          <PlayIcon className={clsx('w-8 h-8', isPlaying ? 'hidden' : 'block')} />
          {isPlaying && (
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="w-2 h-6 bg-white mr-1"></div>
              <div className="w-2 h-6 bg-white"></div>
            </div>
          )}
        </button>
      </div>

      {/* Bottom Controls */}
      <div 
        className={clsx(
          'absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4 transition-opacity',
          showControls ? 'opacity-100' : 'opacity-0'
        )}
      >
        {/* Progress Bar */}
        <div className="mb-3">
          <div 
            className="w-full h-2 bg-white bg-opacity-30 rounded-full cursor-pointer"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-blue-500 rounded-full transition-all"
              style={{ width: `${(currentTime / duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Control Row */}
        <div className="flex items-center justify-between text-white text-sm">
          <div className="flex items-center space-x-3">
            <button onClick={togglePlay} className="hover:text-blue-400">
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            
            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>

            {/* Playback Speed */}
            <select
              value={playbackRate}
              onChange={(e) => changePlaybackSpeed(Number(e.target.value))}
              className="bg-transparent border border-white border-opacity-30 rounded px-2 py-1 text-xs"
            >
              {playbackSpeeds.map(speed => (
                <option key={speed} value={speed} className="bg-black">
                  {speed}x
                </option>
              ))}
            </select>
          </div>

          {/* Chapters Dropdown */}
          {chapters.length > 0 && shouldShowChapters() && (
            <select
              onChange={(e) => {
                const timestamp = parseInt(e.target.value, 10)
                if (!isNaN(timestamp)) {
                  jumpToChapter(timestamp)
                }
                // Reset dropdown after selection
                e.target.value = ""
              }}
              className={clsx(
                "bg-black/80 text-white border border-white/30 rounded cursor-pointer hover:bg-black/90 transition-colors font-medium",
                {
                  "text-xs px-2 py-1": size === 'medium' || size === 'small',
                  "text-sm px-3 py-1": size === 'large'
                }
              )}
              title="Jump to chapter"
              defaultValue=""
            >
              <option value="" disabled>📚 Chapters</option>
              {chapters.map((chapter, index) => (
                <option key={index} value={chapter.timestamp} className="bg-black text-white">
                  {formatTime(chapter.timestamp)} - {chapter.title.length > 20 ? chapter.title.substring(0, 20) + '...' : chapter.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Small indicator when chapters are hidden due to size (local video) */}
      {chapters.length > 0 && !shouldShowChapters() && (
        <div className="absolute top-2 right-2 z-10">
          <div 
            className="bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center cursor-pointer hover:bg-black/80 transition-colors"
            title={`${chapters.length} chapters available (hidden in small view)`}
          >
            <span className="mr-1">📚</span>
            <span>{chapters.length}</span>
          </div>
        </div>
      )}
    </div>
  )
}
