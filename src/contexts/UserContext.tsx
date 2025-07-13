// Week 5: User Context Provider for Launch Pad
// Centralized user state management with real-time synchronization

'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase'
import type { UserContext, UserProfile, UserPreferences } from '@/types/database'
import type { User } from '@supabase/supabase-js'

const UserContextProvider = createContext<UserContext | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const supabase = createBrowserSupabaseClient()

  // Load user data on mount and auth changes
  useEffect(() => {
    // If Supabase is not configured, set user to null and stop loading
    if (!supabase) {
      setUser(null)
      setProfile(null)
      setPreferences(null)
      setIsLoading(false)
      return
    }

    const getUser = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        
        if (authError) {
          throw authError
        }

        setUser(user)
        
        if (user) {
          await loadUserData(user.id)
        } else {
          setProfile(null)
          setPreferences(null)
        }
      } catch (err) {
        console.error('Error loading user:', err)
        setError(err instanceof Error ? err.message : 'Failed to load user')
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      
      if (session?.user) {
        await loadUserData(session.user.id)
      } else {
        setProfile(null)
        setPreferences(null)
      }
      
      setIsLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const loadUserData = async (userId: string) => {
    if (!supabase) {
      console.warn('Supabase not configured - skipping user data loading')
      return
    }

    try {
      // Load profile and preferences
      const [profileResult, preferencesResult] = await Promise.all([
        supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', userId)
          .single(),
        supabase
          .from('user_preferences')
          .select('*')
          .eq('user_id', userId)
          .single()
      ])

      if (profileResult.error && profileResult.error.code !== 'PGRST116') {
        throw profileResult.error
      }
      if (preferencesResult.error && preferencesResult.error.code !== 'PGRST116') {
        throw preferencesResult.error
      }

      setProfile(profileResult.data)
      setPreferences(preferencesResult.data)
      setError(null)
    } catch (err) {
      console.error('Error loading user data:', err)
      setError(err instanceof Error ? err.message : 'Failed to load user data')
    }
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !supabase) return false

    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .upsert({
          user_id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      setProfile(data)
      return true
    } catch (err) {
      console.error('Error updating profile:', err)
      setError(err instanceof Error ? err.message : 'Failed to update profile')
      return false
    }
  }

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    if (!user || !supabase) return false

    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...updates,
          updated_at: new Date().toISOString()
        })
        .select()
        .single()

      if (error) throw error

      setPreferences(data)
      return true
    } catch (err) {
      console.error('Error updating preferences:', err)
      setError(err instanceof Error ? err.message : 'Failed to update preferences')
      return false
    }
  }

  const signInWithGitHub = async (redirectTo?: string) => {
    if (!supabase) {
      const errorMsg = 'Authentication not available - Supabase not configured'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    }

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: redirectTo || `${window.location.origin}/auth/callback`,
          scopes: 'user:email'
        }
      })

      if (error) throw error
      
      return { success: true, url: data.url }
    } catch (err) {
      console.error('GitHub sign-in error:', err)
      setError(err instanceof Error ? err.message : 'Failed to sign in with GitHub')
      return { success: false, error: err instanceof Error ? err.message : 'Unknown error' }
    }
  }

  const signOut = async () => {
    if (!supabase) {
      // If no Supabase, just clear local state
      setUser(null)
      setProfile(null)
      setPreferences(null)
      setError(null)
      return true
    }

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      setUser(null)
      setProfile(null)
      setPreferences(null)
      setError(null)
      
      return true
    } catch (err) {
      console.error('Sign out error:', err)
      setError(err instanceof Error ? err.message : 'Failed to sign out')
      return false
    }
  }

  const contextValue = {
    user: user ? {
      id: user.id,
      email: user.email!,
      user_metadata: user.user_metadata
    } : null,
    profile,
    preferences,
    isLoading,
    error,
    updateProfile,
    updatePreferences,
    signInWithGitHub,
    signOut,
    refreshUser: () => user ? loadUserData(user.id) : Promise.resolve()
  }

  return (
    <UserContextProvider.Provider value={contextValue}>
      {children}
    </UserContextProvider.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContextProvider)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

// Utility hook for authentication status
export function useAuth() {
  const { user, isLoading } = useUser()
  
  return {
    isAuthenticated: !!user,
    isLoading,
    user
  }
}

// Utility hook for progress tracking
export function useProgressTracking() {
  const { user } = useUser()
  const supabase = createBrowserSupabaseClient()

  const updateProgress = async (
    courseId: string,
    lessonId: string,
    status: 'not_started' | 'in_progress' | 'completed',
    completionPercentage?: number,
    timeSpent?: number
  ) => {
    if (!user || !supabase) return false

    try {
      const response = await fetch('/api/user/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId,
          lessonId,
          status,
          completionPercentage,
          timeSpent
        })
      })

      if (!response.ok) {
        throw new Error('Failed to update progress')
      }

      const result = await response.json()
      return result.success
    } catch (err) {
      console.error('Progress update error:', err)
      return false
    }
  }

  const getProgress = async (courseId?: string, lessonId?: string) => {
    if (!user || !supabase) return []

    try {
      const params = new URLSearchParams()
      if (courseId) params.set('courseId', courseId)
      if (lessonId) params.set('lessonId', lessonId)

      const response = await fetch(`/api/user/progress?${params}`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch progress')
      }

      const result = await response.json()
      return result.progress || []
    } catch (err) {
      console.error('Progress fetch error:', err)
      return []
    }
  }

  return {
    updateProgress,
    getProgress
  }
}
