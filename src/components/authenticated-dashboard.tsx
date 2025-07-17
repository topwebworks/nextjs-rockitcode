'use client'

import { useSession, signIn } from 'next-auth/react'
import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { renderIcon } from '@/components/icons'

// Lazy load the heavy progress tracking component
const LazyProgressDashboard = dynamic(() => import('@/components/progress-dashboard'), {
  loading: () => <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>,
  ssr: false
})

function AuthStatus() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="text-center py-8">
        <div className="animate-spin text-4xl">⚡</div>
        <p className="mt-2 text-gray-600 dark:text-gray-400">Checking authentication...</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 dark:border-gray-700 text-center max-w-2xl mx-auto">
        <div className="text-6xl mb-4 flex justify-center">{renderIcon('target', 'w-16 h-16')}</div>
        <h3 className="text-2xl font-bold mb-4">Mission Briefing Required</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Sign in to access your personalized mission control dashboard and track your progress
        </p>
        <button
          onClick={() => signIn('github')}
          className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold text-lg flex items-center gap-3 mx-auto"
        >
          <span>🔗</span>
          Continue with GitHub
        </button>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          Free forever • No credit card required • Full access immediately
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2 flex justify-center">{renderIcon('star', 'w-10 h-10')}</div>
        <h3 className="text-2xl font-bold mb-2">Welcome back, {session.user?.name || 'Developer'}!</h3>
        <p className="text-gray-600 dark:text-gray-400">
          Continue your mission to professional developer status
        </p>
      </div>
      
      <Suspense fallback={<div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-64"></div>}>
        <LazyProgressDashboard />
      </Suspense>
    </div>
  )
}

export function AuthenticatedDashboard() {
  return (
    <section className="py-16 bg-white/50 dark:bg-gray-800/50">
      <div className="max-w-6xl mx-auto px-6">
        <Suspense fallback={
          <div className="text-center py-8">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-32"></div>
          </div>
        }>
          <AuthStatus />
        </Suspense>
      </div>
    </section>
  )
}
