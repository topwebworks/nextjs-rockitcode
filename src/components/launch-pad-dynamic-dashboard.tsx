'use client'

import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import the dashboard with loading fallback
const LaunchPadDashboard = dynamic(() => import('@/components/launch-pad-dashboard'), {
  loading: () => (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="bg-white/5 rounded-xl border border-white/10 p-8 backdrop-blur-sm animate-pulse">
        <div className="h-8 bg-slate-700 rounded w-1/3 mx-auto mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 bg-slate-700 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  ),
  ssr: false
})

export function LaunchPadDynamicDashboard() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-white/5 rounded-xl border border-white/10 p-8 backdrop-blur-sm animate-pulse">
          <div className="h-8 bg-slate-700 rounded w-1/3 mx-auto mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-slate-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <LaunchPadDashboard />
    </Suspense>
  )
}
