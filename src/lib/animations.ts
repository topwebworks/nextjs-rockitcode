import { useRef, useEffect } from 'react'

/**
 * Lightweight CSS animation utilities to replace Framer Motion
 * Optimized for performance and reduced bundle size
 */

export interface AnimationOptions {
  duration?: number
  delay?: number
  easing?: string
  fillMode?: 'none' | 'forwards' | 'backwards' | 'both'
}

export const createAnimation = (
  element: HTMLElement,
  keyframes: Keyframe[],
  options: AnimationOptions = {}
): Animation => {
  const {
    duration = 500,
    delay = 0,
    easing = 'ease-out',
    fillMode = 'both'
  } = options

  return element.animate(keyframes, {
    duration,
    delay,
    easing,
    fill: fillMode
  })
}

// Predefined animation presets
export const animationPresets = {
  fadeIn: [
    { opacity: 0 },
    { opacity: 1 }
  ],
  fadeInUp: [
    { opacity: 0, transform: 'translateY(20px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  fadeInDown: [
    { opacity: 0, transform: 'translateY(-20px)' },
    { opacity: 1, transform: 'translateY(0)' }
  ],
  slideInLeft: [
    { opacity: 0, transform: 'translateX(-50px)' },
    { opacity: 1, transform: 'translateX(0)' }
  ],
  slideInRight: [
    { opacity: 0, transform: 'translateX(50px)' },
    { opacity: 1, transform: 'translateX(0)' }
  ],
  scaleIn: [
    { opacity: 0, transform: 'scale(0.8)' },
    { opacity: 1, transform: 'scale(1)' }
  ],
  bounce: [
    { transform: 'scale(1)' },
    { transform: 'scale(1.05)' },
    { transform: 'scale(1)' }
  ],
  shake: [
    { transform: 'translateX(0)' },
    { transform: 'translateX(-10px)' },
    { transform: 'translateX(10px)' },
    { transform: 'translateX(0)' }
  ]
}

// CSS classes for common animations
export const animationClasses = {
  // Base transition class
  transition: 'transition-all duration-300 ease-out',
  
  // Fade animations
  fadeIn: 'animate-[fadeIn_0.5s_ease-out_forwards]',
  fadeInUp: 'animate-[fadeInUp_0.5s_ease-out_forwards]',
  fadeInDown: 'animate-[fadeInDown_0.5s_ease-out_forwards]',
  
  // Slide animations
  slideInLeft: 'animate-[slideInLeft_0.6s_ease-out_forwards]',
  slideInRight: 'animate-[slideInRight_0.6s_ease-out_forwards]',
  
  // Scale animations
  scaleIn: 'animate-[scaleIn_0.5s_ease-out_forwards]',
  
  // Hover effects
  hoverScale: 'hover:scale-105 transition-transform duration-200',
  hoverGlow: 'hover:shadow-lg hover:shadow-blue-500/25 transition-shadow duration-200',
  
  // Interactive states
  active: 'active:scale-95 transition-transform duration-100',
  focus: 'focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-shadow duration-200'
}

// Stagger animation utility
export const staggerElements = (
  elements: NodeListOf<Element> | Element[],
  animation: Keyframe[],
  options: AnimationOptions & { staggerDelay?: number } = {}
) => {
  const { staggerDelay = 100, ...animationOptions } = options
  
  Array.from(elements).forEach((element, index) => {
    const delay = (animationOptions.delay || 0) + (index * staggerDelay)
    createAnimation(element as HTMLElement, animation, {
      ...animationOptions,
      delay
    })
  })
}

// Intersection Observer for scroll-triggered animations
export class ScrollAnimationObserver {
  private observer: IntersectionObserver
  private elements: Map<Element, () => void> = new Map()

  constructor(options: IntersectionObserverInit = {}) {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const callback = this.elements.get(entry.target)
          if (callback) {
            callback()
            this.unobserve(entry.target)
          }
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      ...options
    })
  }

  observe(element: Element, callback: () => void) {
    this.elements.set(element, callback)
    this.observer.observe(element)
  }

  unobserve(element: Element) {
    this.observer.unobserve(element)
    this.elements.delete(element)
  }

  disconnect() {
    this.observer.disconnect()
    this.elements.clear()
  }
}

// React hook for scroll animations
export const useScrollAnimation = (
  animation: Keyframe[],
  options: AnimationOptions = {}
) => {
  const elementRef = useRef<HTMLElement>(null)
  const observerRef = useRef<ScrollAnimationObserver | null>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    observerRef.current = new ScrollAnimationObserver()
    
    observerRef.current.observe(element, () => {
      createAnimation(element, animation, options)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [animation, options])

  return elementRef
}
