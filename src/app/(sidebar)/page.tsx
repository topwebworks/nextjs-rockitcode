import ComprehensiveLaunchPad from '@/components/comprehensive-launch-pad'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RockitCode Launch Pad - Mission Control for Professional Developers',
  description: 'Transform into a professional developer with our mission-driven learning platform. AI assistance, live deployment, and $200k+ worth of tools - completely free forever.',
}

/**
 * Launch Pad Homepage - Mission Control for Developer Careers
 * 
 * Features the complete Launch Pad experience with rocket-themed
 * mission progression and professional tool integration.
 */
export default function HomePage() {
  return <ComprehensiveLaunchPad />
}