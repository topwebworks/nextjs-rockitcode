'use client'

import { useEffect, useRef } from 'react'

export default function AnimatedBackground() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current) return
      
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Convert mouse position to percentage of viewport
      const x = (clientX / innerWidth) * 100
      const y = (clientY / innerHeight) * 100
      
      glowRef.current.style.left = `${x}%`
      glowRef.current.style.top = `${y}%`
      glowRef.current.style.opacity = '0.8'
    }

    const handleRocketHover = () => {
      if (!glowRef.current) return
      
      // Super dramatic effect when hovering rocket
      glowRef.current.style.opacity = '1'
      glowRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)'
      glowRef.current.style.filter = 'blur(80px) brightness(1.5)'
    }

    const handleRocketLeave = () => {
      if (!glowRef.current) return
      
      // Return to normal
      glowRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      glowRef.current.style.filter = 'blur(60px) brightness(1)'
      glowRef.current.style.opacity = '0.8'
    }

    const handleMouseLeave = () => {
      if (!glowRef.current) return
      
      glowRef.current.style.opacity = '0.4'
      glowRef.current.style.left = '50%'
      glowRef.current.style.top = '50%'
      glowRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      glowRef.current.style.filter = 'blur(60px) brightness(1)'
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    // Listen for rocket hover events
    const rocketElement = document.querySelector('.rocket-hover-target')
    if (rocketElement) {
      rocketElement.addEventListener('mouseenter', handleRocketHover)
      rocketElement.addEventListener('mouseleave', handleRocketLeave)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      
      if (rocketElement) {
        rocketElement.removeEventListener('mouseenter', handleRocketHover)
        rocketElement.removeEventListener('mouseleave', handleRocketLeave)
      }
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        ref={glowRef}
        className="absolute w-[800px] h-[800px] rounded-full transition-all duration-700 ease-out opacity-50"
        style={{
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.3) 40%, rgba(236, 72, 153, 0.2) 70%, transparent 100%)',
          transform: 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
          filter: 'blur(60px)',
          animation: 'float 12s ease-in-out infinite, pulse 8s ease-in-out infinite alternate',
        }}
      />
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translate(-50%, -50%) translateX(0px) translateY(0px) scale(1);
          }
          25% { 
            transform: translate(-50%, -50%) translateX(40px) translateY(-30px) scale(1.1);
          }
          50% { 
            transform: translate(-50%, -50%) translateX(-30px) translateY(40px) scale(0.9);
          }
          75% { 
            transform: translate(-50%, -50%) translateX(30px) translateY(20px) scale(1.05);
          }
        }
        
        @keyframes pulse {
          0% { 
            filter: blur(60px) brightness(1) saturate(1);
          }
          100% { 
            filter: blur(80px) brightness(1.3) saturate(1.2);
          }
        }
        
        @media (max-width: 768px) {
          div[style*="w-[800px]"] {
            width: 500px !important;
            height: 500px !important;
          }
        }
      `}</style>
    </div>
  )
}
