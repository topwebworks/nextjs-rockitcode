import GitHubOnboardingFlow from '@/components/github-onboarding-flow'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Professional Developer Setup - RockitCode',
  description: 'Get the exact same development environment used by professionals at GitHub, Netflix, and Airbnb. 100% free forever.',
}

/**
 * Professional Developer Setup Page
 * 
 * Zero-cost onboarding flow that sets up students with enterprise-grade
 * development tools using only free tiers and services.
 */
export default function SetupPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <GitHubOnboardingFlow />
    </div>
  )
}
