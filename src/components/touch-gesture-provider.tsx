'use client'

import React, { useRef, useCallback, ReactNode } from 'react'

interface TouchGestureProviderProps {
  children: ReactNode
  onGesture?: (gesture: string, event?: TouchEvent) => void
  className?: string
}

export function TouchGestureProvider({ 
  children, 
  onGesture,
  className = '' 
}: TouchGestureProviderProps) {
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    }

    // Long press detection
    longPressTimerRef.current = setTimeout(() => {
      onGesture?.('longPress', e.nativeEvent)
    }, 500)
  }, [onGesture])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current)
      longPressTimerRef.current = null
    }

    if (!touchStartRef.current) return

    const touch = e.changedTouches[0]
    const deltaX = touch.clientX - touchStartRef.current.x
    const deltaY = touch.clientY - touchStartRef.current.y
    const deltaTime = Date.now() - touchStartRef.current.time

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    // Detect swipe gestures
    if (deltaTime < 500 && (absDeltaX > 50 || absDeltaY > 50)) {
      if (absDeltaX > absDeltaY) {
        // Horizontal swipe
        if (deltaX > 0) {
          onGesture?.('swipeRight', e.nativeEvent)
        } else {
          onGesture?.('swipeLeft', e.nativeEvent)
        }
      } else {
        // Vertical swipe
        if (deltaY > 0) {
          onGesture?.('swipeDown', e.nativeEvent)
        } else {
          onGesture?.('swipeUp', e.nativeEvent)
        }
      }
    }

    // Detect tap (very small movement, quick time)
    if (deltaTime < 300 && absDeltaX < 10 && absDeltaY < 10) {
      onGesture?.('tap', e.nativeEvent)
    }

    touchStartRef.current = null
  }, [onGesture])

  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    onGesture?.('doubleTap', e.nativeEvent as any)
  }, [onGesture])

  return (
    <div
      className={className}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onDoubleClick={handleDoubleClick}
      style={{ touchAction: 'manipulation' }}
    >
      {children}
    </div>
  )
}
