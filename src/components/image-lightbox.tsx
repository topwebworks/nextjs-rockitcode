'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { clsx } from 'clsx'

interface ImageLightboxProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function ImageLightbox({ src, alt, width, height, className }: ImageLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when lightbox is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Thumbnail image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={clsx(
          "cursor-pointer transition-all duration-200 hover:opacity-90 hover:shadow-lg rounded-lg",
          "hover:ring-2 hover:ring-blue-500/50",
          className
        )}
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setIsOpen(true)
          }
        }}
        aria-label={`Click to enlarge: ${alt}`}
        title="Click to enlarge"
      />

      {/* Lightbox overlay - rendered in portal */}
      {isOpen && mounted && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setIsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-image"
        >
          <div className="relative max-h-full max-w-full">
            <img
              id="lightbox-image"
              src={src}
              alt={alt}
              className="max-h-full max-w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
              aria-label="Close image"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Instructions */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/50 px-4 py-2 text-sm text-white">
              Click anywhere to close • ESC to close
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
