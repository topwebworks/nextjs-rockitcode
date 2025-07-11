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
}

export function VideoPlayer({
  src,
  poster,
  onProgress,
  chapters = [],
  playbackSpeeds = [0.75, 1, 1.25, 1.5],
  captions = true,
  mobileOptimized = false,
  className = ''
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const [playbackRate, setPlaybackRate] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Format time for display
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

  // Jump to chapter
  const jumpToChapter = (timestamp: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = timestamp
      setCurrentTime(timestamp)
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

  if (isYouTube) {
    // For YouTube videos, use iframe embed
    const youtubeEmbedUrl = src.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')
    
    return (
      <div className={clsx('relative aspect-video bg-black', className)}>
        <iframe
          src={youtubeEmbedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Lesson Video"
        />
        
        {/* Chapter markers for YouTube */}
        {chapters.length > 0 && (
          <div className="absolute bottom-16 left-4 right-4 bg-black bg-opacity-50 rounded p-2">
            <div className="text-white text-xs mb-2">Chapters:</div>
            <div className="flex flex-wrap gap-1">
              {chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => jumpToChapter(chapter.timestamp)}
                  className="px-2 py-1 text-xs bg-white bg-opacity-20 text-white rounded hover:bg-opacity-30"
                >
                  {chapter.title}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  // For local videos, use custom video player
  return (
    <div className={clsx('relative aspect-video bg-black group', className)}>
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
          }
        }}
        onEnded={() => setIsPlaying(false)}
        playsInline={mobileOptimized}
        controls={false}
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

          {/* Chapters */}
          {chapters.length > 0 && (
            <div className="flex space-x-1">
              {chapters.map((chapter, index) => (
                <button
                  key={index}
                  onClick={() => jumpToChapter(chapter.timestamp)}
                  className={clsx(
                    'px-2 py-1 text-xs rounded transition-colors',
                    currentTime >= chapter.timestamp 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white bg-opacity-20 hover:bg-opacity-30'
                  )}
                  title={chapter.title}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
