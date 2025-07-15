import { Metadata } from 'next'
import AISubscriptionManager from '@/components/ai-subscription-manager'

export const metadata: Metadata = {
  title: 'AI Subscriptions - RockitCode Launch Pad',
  description: 'Manage your AI assistant subscriptions and LLM accounts for enhanced coding support.',
}

/**
 * AI Subscription Management Page
 * 
 * Allows users to manage their AI subscriptions, connect LLM accounts,
 * and configure AI assistance preferences for coding lessons.
 */
export default function AISubscriptionsPage() {
  return <AISubscriptionManager />
}
