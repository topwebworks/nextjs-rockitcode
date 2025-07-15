import { Metadata } from 'next'
import ToolsPartnershipManager from '@/components/tools-partnership-manager'

export const metadata: Metadata = {
  title: 'Tools & Partners - RockitCode Launch Pad',
  description: 'Access partner tools, join affiliate programs, and discover resources to accelerate your development journey.',
}

/**
 * Tools and Partnership Page
 * 
 * Provides access to partner tools, affiliate programs, and additional
 * resources that complement the RockitCode learning experience.
 */
export default function ToolsPage() {
  return <ToolsPartnershipManager />
}
