import MissionBriefing from '@/components/mission-briefing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mission Briefings - RockitCode Launch Pad',
  description: 'Choose your mission path to professional developer transformation. Each mission builds real-world skills and portfolio projects.',
}

/**
 * Mission Briefings Page
 * 
 * Shows available missions, difficulty levels, objectives, and tools.
 * Each mission is designed to build professional development skills.
 */
export default function MissionBriefingsPage() {
  return <MissionBriefing />
}
