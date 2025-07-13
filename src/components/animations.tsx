'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'

// Animation variants
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
}

export const slideInFromLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const slideInFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' }
  }
}

export const progressBar = {
  hidden: { width: 0 },
  visible: (width: number) => ({
    width: `${width}%`,
    transition: { duration: 1, ease: 'easeOut', delay: 0.5 }
  })
}

// Animated components
export function AnimatedCounter({ 
  from = 0, 
  to, 
  duration = 2,
  suffix = '',
  className = '' 
}: {
  from?: number
  to: number
  duration?: number
  suffix?: string
  className?: string
}) {
  const [count, setCount] = useState(from)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    const startTime = Date.now()
    const startValue = from
    const endValue = to
    const totalDuration = duration * 1000

    const updateCount = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / totalDuration, 1)
      
      // Easing function (easeOutCubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3)
      const currentValue = Math.floor(startValue + (endValue - startValue) * easedProgress)
      
      setCount(currentValue)
      
      if (progress < 1) {
        requestAnimationFrame(updateCount)
      }
    }

    updateCount()
  }, [isInView, from, to, duration])

  return (
    <span ref={ref} className={className}>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function AnimatedProgressBar({ 
  progress, 
  className = '',
  showPercentage = true,
  color = 'from-blue-500 to-purple-500',
  height = 'h-3'
}: {
  progress: number
  className?: string
  showPercentage?: boolean
  color?: string
  height?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className={className}>
      {showPercentage && (
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Progress</span>
          <AnimatedCounter to={progress} suffix="%" className="font-semibold" />
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full ${height} overflow-hidden`}>
        <motion.div
          className={`bg-gradient-to-r ${color} ${height} rounded-full`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${progress}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
        />
      </div>
    </div>
  )
}

export function FloatingCard({ 
  children, 
  className = '',
  delay = 0 
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={`floating-card ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        ease: 'easeOut',
        delay,
        scale: { duration: 0.4 }
      }}
      whileHover={{ 
        y: -5, 
        transition: { duration: 0.2 } 
      }}
    >
      {children}
    </motion.div>
  )
}

export function PulsingDot({ 
  color = 'bg-blue-500',
  size = 'w-3 h-3' 
}: {
  color?: string
  size?: string
}) {
  return (
    <div className="relative inline-flex">
      <div className={`${size} ${color} rounded-full`}></div>
      <div className={`absolute top-0 left-0 ${size} ${color} rounded-full animate-ping opacity-75`}></div>
    </div>
  )
}

export function TypewriterText({ 
  text, 
  speed = 50,
  className = '',
  onComplete 
}: {
  text: string
  speed?: number
  className?: string
  onComplete?: () => void
}) {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    } else if (onComplete) {
      onComplete()
    }
  }, [currentIndex, text, speed, onComplete])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  )
}

export function SuccessCheckmark({ 
  size = 60,
  color = '#22c55e' 
}: {
  size?: number
  color?: string
}) {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: 0.2
      }}
    >
      <motion.svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="text-green-500"
      >
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={color}
          strokeWidth="3"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
        <motion.path
          d="M30 50 L45 65 L70 35"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.5 }}
        />
      </motion.svg>
    </motion.div>
  )
}

export function LoadingSpinner({ 
  size = 'w-8 h-8',
  color = 'border-blue-500' 
}: {
  size?: string
  color?: string
}) {
  return (
    <motion.div
      className={`${size} border-2 border-gray-200 ${color} border-t-transparent rounded-full`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export function PageTransition({ 
  children 
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

export function SlideUpModal({ 
  isOpen, 
  onClose, 
  children 
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 rounded-t-xl z-50 max-h-[90vh] overflow-y-auto"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <div className="p-6">
              <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4" />
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export function HoverCard({ 
  children, 
  className = '' 
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={`hover-card ${className}`}
      whileHover={{ 
        scale: 1.02,
        y: -5,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  )
}

export function StaggeredList({ 
  children, 
  className = '' 
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  )
}

export function FadeInOnScroll({ 
  children, 
  className = '',
  threshold = 0.1 
}: {
  children: React.ReactNode
  className?: string
  threshold?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: threshold })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
