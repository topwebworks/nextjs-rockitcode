import MissionBriefing from '@/components/mission-briefing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mission Control - RockitCode Launch Pad',
  description: 'Your personal mission control center. Track your progress, manage missions, and monitor your path to professional developer status.',
}

/**
 * Mission Control Dashboard - Personal Command Center
 * 
 * Shows mission progress, launch readiness score, professional portfolio,
 * and next mission objectives for each mission specialist.
 */
export default function MissionControlPage() {
  return <MissionBriefing />
}
