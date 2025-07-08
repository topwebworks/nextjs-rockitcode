'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface RockitSessionProviderProps {
  children: ReactNode
  session?: any
}

/**
 * RockitCode Session Provider
 * 
 * Wraps the NextAuth SessionProvider with RockitCode-specific configuration.
 * This component provides authentication context to all child components.
 * 
 * @param children - React components that need access to session data
 * @param session - Optional session object for SSR
 */
export function RockitSessionProvider({ children, session }: RockitSessionProviderProps) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
