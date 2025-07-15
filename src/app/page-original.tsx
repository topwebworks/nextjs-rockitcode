import ComprehensiveLaunchPad from '@/components/comprehensive-launch-pad'
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'RockitCode Launch Pad - Mission Control for Professional Developers',
  description: 'Transform into a professional developer with our mission-driven learning platform. AI assistance, live deployment, and $200k+ worth of tools - completely free forever.',
};

export default function HomePage() {
  return <ComprehensiveLaunchPad />
}
