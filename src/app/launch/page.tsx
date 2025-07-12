import { GitHubMissionControl } from '@/components/github-mission-control'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Begin Mission Sequence - RockitCode Launch Pad',
  description: 'Start your professional developer transformation. Connect GitHub, activate $200k+ in professional tools, and begin your mission to career launch.',
}

/**
 * Launch Sequence Onboarding - Real Mission Initialization
 * 
 * Guides new mission specialists through actual professional tool activation,
 * real GitHub integration, AI setup, and first mission assignment.
 */
export default function LaunchSequencePage() {
  return <GitHubMissionControl />
}
