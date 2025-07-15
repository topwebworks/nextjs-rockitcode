import EnhancedDashboard from '@/components/enhanced-dashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard - RockitCode Launch Pad',
  description: 'Your personal mission control center. Track your progress, manage lessons, and monitor your path to professional developer status.',
}

/**
 * Dashboard - Personal Command Center
 * 
 * Shows lesson progress, learning metrics, quick actions, and 
 * navigation to AI subscriptions and tools for each mission specialist.
 */
export default function DashboardPage() {
  return <EnhancedDashboard />
}
