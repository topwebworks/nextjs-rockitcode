import { getServerSession } from 'next-auth/next'
import { config } from './auth'
import type { Session } from 'next-auth'

/**
 * RockitCode User Utilities
 * 
 * Server-side utilities for user authentication and session management.
 * These functions provide type-safe access to user data across the application.
 */

/**
 * Get the current user session on the server side
 * 
 * @returns Promise<Session | null> - The user session or null if not authenticated
 */
export async function getCurrentUser(): Promise<Session | null> {
  try {
    const session = await getServerSession(config)
    return session
  } catch (error) {
    console.error('Failed to get current user:', error)
    return null
  }
}

/**
 * Check if a user is authenticated
 * 
 * @returns Promise<boolean> - True if user is authenticated
 */
export async function isUserAuthenticated(): Promise<boolean> {
  const session = await getCurrentUser()
  return !!session?.user
}

/**
 * Get user ID from session
 * 
 * @returns Promise<string | null> - User ID or null if not authenticated
 */
export async function getCurrentUserId(): Promise<string | null> {
  const session = await getCurrentUser()
  return session?.user?.id || null
}

/**
 * Check if user has premium access
 * This is a placeholder for future premium feature implementation
 * 
 * @returns Promise<boolean> - True if user has premium access
 */
export async function hasUserPremiumAccess(): Promise<boolean> {
  const session = await getCurrentUser()
  
  // For now, all authenticated users have premium access
  // In the future, this would check subscription status
  return !!session?.user
}

/**
 * Get user profile information
 * 
 * @returns Promise<UserProfile | null> - User profile or null if not authenticated
 */
export async function getUserProfile(): Promise<UserProfile | null> {
  const session = await getCurrentUser()
  
  if (!session?.user) {
    return null
  }
  
  return {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
    login: session.user.login,
    createdAt: new Date().toISOString(), // Placeholder - would come from database
    lastActiveAt: new Date().toISOString(), // Placeholder - would come from database
    coursesEnrolled: [], // Placeholder - would come from database
    lessonsCompleted: 0, // Placeholder - would come from database
    certificatesEarned: [], // Placeholder - would come from database
  }
}

/**
 * User profile interface
 */
export interface UserProfile {
  id: string
  name: string
  email: string
  image?: string
  login?: string
  createdAt: string
  lastActiveAt: string
  coursesEnrolled: string[]
  lessonsCompleted: number
  certificatesEarned: string[]
}

/**
 * Require authentication - throws redirect if not authenticated
 * Use this in server components that require authentication
 */
export async function requireAuth(): Promise<Session> {
  const session = await getCurrentUser()
  
  if (!session) {
    throw new Error('Authentication required')
  }
  
  return session
}
