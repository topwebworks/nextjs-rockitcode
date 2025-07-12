import AffiliateRevenueManager from '@/components/affiliate-revenue-manager'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equipment Settings - RockitCode Launch Pad',
  description: 'Configure your mission equipment, manage professional tools, view transparent revenue model, and customize your development environment.',
}

/**
 * Equipment Settings Page - Mission Configuration & Revenue Transparency
 * 
 * Allows mission specialists to configure their professional development
 * environment, understand our transparent revenue model, and manage
 * their Launch Pad experience.
 */
export default function EquipmentSettingsPage() {
  return <AffiliateRevenueManager />
}
