'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TabbedForm from '../components/TabbedForm'
import AnimatedBackground from '../components/AnimatedBackground'
import EnhancedDashboard from '../components/enhanced-dashboard'
import { useUser } from '@/contexts/UserContext'

function TabbedHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for cursor light effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleRocketClick = () => {
    const rocket = document.querySelector('.rocket-svg');
    if (rocket) {
      rocket.classList.add('rocket-takeoff');
      setTimeout(() => {
        rocket.classList.remove('rocket-takeoff');
        rocket.classList.add('rocket-fade-in');
        setTimeout(() => {
          rocket.classList.remove('rocket-fade-in');
        }, 800);
      }, 2000);
    }
  }

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        {/* Cursor Light Effect */}
        <div 
          className="absolute transition-all duration-300 ease-out rounded-full pointer-events-none w-96 h-96"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.08) 30%, rgba(139,92,246,0.05) 60%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />
        
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => {
            // Use deterministic pseudo-random values based on index to prevent hydration mismatch  
            const seed = (i + 100) * 9301 + 49297; // Offset by 100 to differentiate from main page
            const rnd1 = (seed % 233280) / 233280;
            const rnd2 = ((seed + 1) % 233280) / 233280;
            const rnd3 = ((seed + 2) % 233280) / 233280;
            const rnd4 = ((seed + 3) % 233280) / 233280;
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400/20 animate-pulse"
                style={{
                  left: `${rnd1 * 100}%`,
                  top: `${rnd2 * 100}%`,
                  animationDelay: `${rnd3 * 3}s`,
                  animationDuration: `${2 + rnd4 * 2}s`
                }}
              />
            );
          })}
        </div>
      </div>
      <div className="relative z-10 px-6 py-16 mx-auto max-w-7xl sm:py-24 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* Logo and Title */}
          <div className="mb-8">
            <div 
              className="w-16 h-16 mx-auto mb-6 cursor-pointer group rocket-hover-target rocket-container"
              onClick={handleRocketClick}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="h-16 w-16 text-blue-400 drop-shadow-sm transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-12 rocket-svg"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))',
                }}
              >
                {/* Rocket body */}
                <path
                  d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:stroke-orange-400"
                />
                <path
                  d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:stroke-orange-400"
                />
                <path
                  d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:stroke-yellow-400"
                />
                <path
                  d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:stroke-yellow-400"
                />
                
                {/* Gradient definitions removed since no flames */}
              </svg>
            </div>
            <h1 className="text-5xl font-light tracking-wide text-white sm:text-6xl">
              RockitCode Launch Pad
            </h1>
            <p className="mt-4 text-xl font-light text-slate-300">
              Mission Control for Professional Developers
            </p>
          </div>

          {/* Tabbed Form */}
          <TabbedForm />
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const { user } = useUser()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Mouse tracking for cursor light effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // If user is logged in, show dashboard content
  if (user) {
    return <EnhancedDashboard />
  }

  // If not logged in, show marketing homepage

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(139,92,246,0.1),transparent_50%)]"></div>
        
        {/* Cursor Light Effect */}
        <div 
          className="absolute transition-all duration-300 ease-out rounded-full pointer-events-none w-96 h-96"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.08) 30%, rgba(139,92,246,0.05) 60%, transparent 100%)',
            filter: 'blur(40px)',
          }}
        />
        
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => {
            // Use deterministic pseudo-random values based on index to prevent hydration mismatch
            const seed = i * 9301 + 49297;
            const rnd1 = (seed % 233280) / 233280;
            const rnd2 = ((seed + 1) % 233280) / 233280;
            const rnd3 = ((seed + 2) % 233280) / 233280;
            const rnd4 = ((seed + 3) % 233280) / 233280;
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400/20 animate-pulse"
                style={{
                  left: `${rnd1 * 100}%`,
                  top: `${rnd2 * 100}%`,
                  animationDelay: `${rnd3 * 3}s`,
                  animationDuration: `${2 + rnd4 * 2}s`
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Hero with Tabbed Form */}
      <TabbedHero />

      {/* Unified Launch Success Section */}
      <div className="relative py-16 sm:py-24">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          {/* Main Header */}
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-light tracking-wide text-white sm:text-5xl">
              Everything You Need to Launch Your Career
            </h2>
            <p className="mt-6 text-xl font-light leading-8 text-slate-300">
              From zero to deployed projects. Our Launch Pad methodology has helped thousands transition into professional roles with interactive lessons, AI guidance, and real-world tools.
            </p>
          </div>

          {/* Features Grid */}
          <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-8 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <div className="p-6 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-blue-400/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-slate-700/50 border-slate-600/50">
                      <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium text-white">No Video Fatigue</h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">
                    Quick, focused concepts you can apply immediately. Content stays current - no outdated tutorials.
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="p-6 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-purple-400/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-slate-700/50 border-slate-600/50">
                      <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium text-white">Full-Stack Learning</h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">
                    Real projects use technology stacks. HTML + CSS + JavaScript + React + Deploy tools working together.
                  </p>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="p-6 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-green-400/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 border rounded-full bg-slate-700/50 border-slate-600/50">
                      <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                      </svg>
                    </div>
                    <h3 className="text-base font-medium text-white">Live Deployment</h3>
                  </div>
                  <p className="text-sm leading-6 text-slate-300">
                    Every line of code becomes part of your professional portfolio. Deploy immediately, impress employers.
                  </p>
                </div>
              </div>
            </dl>
          </div>

          {/* Mission Sequences */}
          <div className="mt-20">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-light tracking-wide text-white sm:text-3xl">
                Mission Sequences
              </h3>
              <p className="mt-4 text-lg leading-7 text-slate-300">
                Structured learning paths designed to take you from beginner to job-ready developer.
              </p>
            </div>
            <div className="grid max-w-2xl grid-cols-1 gap-6 mx-auto mt-12 sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:gap-8">
              {[
                {
                  title: "Foundation Launch",
                  description: "Master web fundamentals with responsive design, flexbox, and modern CSS techniques.",
                  lessons: "12 lessons",
                  duration: "~3 hours",
                  level: "Beginner",
                  color: "bg-blue-500/20 text-blue-400 border-blue-400/30",
                  href: "/learn/html-css"
                },
                {
                  title: "Interactive Dynamics",
                  description: "Learn modern JavaScript, DOM manipulation, and asynchronous programming.",
                  lessons: "18 lessons", 
                  duration: "~6 hours",
                  level: "Beginner",
                  color: "bg-yellow-500/20 text-yellow-400 border-yellow-400/30",
                  href: "/courses"
                },
                {
                  title: "Component Architecture",
                  description: "Build interactive UIs with React hooks, components, and state management.",
                  lessons: "24 lessons",
                  duration: "~10 hours", 
                  level: "Intermediate",
                  color: "bg-purple-500/20 text-purple-400 border-purple-400/30",
                  href: "/courses"
                }
              ].map((course, index) => (
                <article key={index} className="flex flex-col items-start justify-between p-5 transition-all duration-300 border bg-slate-800/30 backdrop-blur-sm rounded-xl border-slate-700/50 hover:border-blue-400/30">
                  <div className="flex items-center text-xs gap-x-3">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium border ${course.color}`}>
                      {course.level}
                    </span>
                    <span className="text-slate-400">{course.lessons}</span>
                    <span className="text-slate-400">{course.duration}</span>
                  </div>
                  <div className="relative group">
                    <h4 className="mt-3 text-lg font-medium leading-6 text-white transition-colors duration-200 group-hover:text-blue-400">
                      <Link href={course.href} className="relative">
                        <span className="absolute inset-0" />
                        {course.title}
                        <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </h4>
                    <p className="mt-3 text-sm leading-5 text-slate-300 line-clamp-3">{course.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="flex items-center justify-center gap-x-6">
              <Link
                href="/launch-pad"
                className="relative inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-white transition-all duration-300 border rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border-slate-600/50 hover:border-blue-400/30 group"
              >
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span className="relative">Begin Pre-Flight Check</span>
              </Link>
              <Link
                href="/courses"
                className="relative inline-block text-lg font-medium leading-6 transition-colors duration-200 text-slate-300 hover:text-blue-400 group"
              >
                View all courses <span aria-hidden="true">→</span>
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
