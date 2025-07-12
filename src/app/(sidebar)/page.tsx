import ZeroCostLanding from '@/components/zero-cost-landing'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RockitCode - Professional Developer Education, 100% Free',
  description: 'Learn to code with the same tools used by professionals at GitHub, Netflix, and Airbnb. AI assistance, hosting, and $200k+ worth of enterprise tools - completely free.',
}

/**
 * Homepage showcasing the zero-cost professional development approach
 */
export default function HomePage() {
  return <ZeroCostLanding />
}