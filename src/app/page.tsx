'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import TabbedForm from '../components/TabbedForm'
import AnimatedBackground from '../components/AnimatedBackground'
import EnhancedDashboard from '../components/enhanced-dashboard'
import { useUser } from '@/contexts/UserContext'

function TabbedHero() {
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
    <div className="relative bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <AnimatedBackground />
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
                className="h-16 w-16 text-blue-600 dark:text-blue-400 drop-shadow-sm transition-all duration-500 hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.6)] group-hover:scale-110 group-hover:-translate-y-2 group-hover:rotate-12 rocket-svg"
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
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Launch Your Dev Career
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Interactive coding lessons, AI assistance, and live deployment tools
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

  // If user is logged in, show dashboard content
  if (user) {
    return <EnhancedDashboard />
  }

  // If not logged in, show marketing homepage

  return (
    <div className="bg-white dark:bg-gray-900">
      {/* Hero with Tabbed Form */}
      <TabbedHero />

      {/* Feature Highlights */}
      <div className="py-16 sm:py-24">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Everything You Need to Become a Professional Developer
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              From zero to deployed projects. Learn with interactive lessons, AI guidance, and real-world tools.
            </p>
          </div>
          <div className="max-w-2xl mx-auto mt-16 sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <div className="flex items-center justify-center w-12 h-12 mb-6 bg-blue-600 rounded-lg">
                  <svg className="h-6 w-6 text-white drop-shadow-sm transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <dt className="flex items-center text-base font-semibold leading-7 text-gray-900 gap-x-3 dark:text-white">
                  Interactive Code Editor
                </dt>
                <dd className="flex flex-col flex-auto mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">Write and test code directly in the browser with our Monaco-powered editor. Real-time feedback and syntax highlighting.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-center w-12 h-12 mb-6 bg-purple-600 rounded-lg">
                  <svg className="h-6 w-6 text-white drop-shadow-sm transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                  </svg>
                </div>
                <dt className="flex items-center text-base font-semibold leading-7 text-gray-900 gap-x-3 dark:text-white">
                  AI-Powered Assistant
                </dt>
                <dd className="flex flex-col flex-auto mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">Get instant help with coding problems, explanations, and personalized guidance powered by advanced AI.</p>
                </dd>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center justify-center w-12 h-12 mb-6 bg-green-600 rounded-lg">
                  <svg className="h-6 w-6 text-white drop-shadow-sm transition-all duration-200 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598.542 1.865 1.345l.215.643m5.276-3.67a9.012 9.012 0 01-5.276 3.67m0 0a9 9 0 01-10.275-4.835M15.75 9c0 .896-.393 1.7-1.016 2.25" />
                  </svg>
                </div>
                <dt className="flex items-center text-base font-semibold leading-7 text-gray-900 gap-x-3 dark:text-white">
                  Live Deployment
                </dt>
                <dd className="flex flex-col flex-auto mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                  <p className="flex-auto">Deploy your projects live to the web instantly. Build a professional portfolio while you learn.</p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Course Preview */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800 sm:py-24">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Start With These Popular Courses
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Structured learning paths designed to take you from beginner to job-ready developer.
            </p>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-6 mx-auto mt-16 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
            {[
              {
                title: "HTML & CSS Fundamentals",
                description: "Master web fundamentals with responsive design, flexbox, and modern CSS techniques.",
                lessons: "12 lessons",
                duration: "~3 hours",
                level: "Beginner",
                color: "bg-blue-600"
              },
              {
                title: "JavaScript Essentials",
                description: "Learn modern JavaScript, DOM manipulation, and asynchronous programming.",
                lessons: "18 lessons", 
                duration: "~6 hours",
                level: "Beginner",
                color: "bg-yellow-600"
              },
              {
                title: "React Development",
                description: "Build interactive UIs with React hooks, components, and state management.",
                lessons: "24 lessons",
                duration: "~10 hours", 
                level: "Intermediate",
                color: "bg-purple-600"
              }
            ].map((course, index) => (
              <article key={index} className="flex flex-col items-start justify-between max-w-xl p-6 transition-shadow duration-200 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-700 dark:border-gray-600 hover:shadow-md">
                <div className="flex items-center text-xs gap-x-4">
                  <span className={`inline-flex items-center rounded-full ${course.color} px-2 py-1 text-xs font-medium text-white`}>
                    {course.level}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">{course.lessons}</span>
                  <span className="text-gray-500 dark:text-gray-400">{course.duration}</span>
                </div>
                <div className="relative group">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 transition-colors duration-200 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    <Link href="/courses" className="relative">
                      <span className="absolute inset-0" />
                      {course.title}
                      {/* Animated underline */}
                      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
                    </Link>
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3 dark:text-gray-400">{course.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/courses"
              className="relative inline-block text-base font-semibold leading-7 text-blue-600 transition-colors duration-200 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 group"
            >
              View all courses <span aria-hidden="true">→</span>
              {/* Animated underline */}
              <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </div>
      </div>

      {/* Social Proof & CTA */}
      <div className="py-16 sm:py-24">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Join Thousands of Successful Developers
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
              Our students have landed jobs at top companies and built amazing projects. You could be next.
            </p>
            <div className="flex items-center justify-center mt-10 gap-x-6">
              <Link
                href="/launch-pad"
                className="relative inline-block px-6 py-3 overflow-hidden text-lg font-semibold text-white transition-all duration-300 bg-blue-600 rounded-md shadow-sm hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-500/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 group"
              >
                {/* Subtle shine effect */}
                <span className="absolute inset-0 transition-transform duration-700 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full" />
                <span className="relative">Start Your Journey</span>
              </Link>
              <Link href="/about" className="relative inline-block text-lg font-semibold leading-6 text-gray-900 transition-colors duration-200 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 group">
                Learn more <span aria-hidden="true">→</span>
                {/* Animated underline */}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
