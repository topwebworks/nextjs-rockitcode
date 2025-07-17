import { createClient } from '@supabase/supabase-js'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createBrowserClient } from '@supabase/ssr'

// Supabase configuration for Launch Pad user progress tracking
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check for required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('WARNING: Supabase environment variables are not configured. User features will be disabled.')
  console.warn('Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file')
  console.warn('Get these values from: https://supabase.com/dashboard/project/_/settings/api')
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Modern Supabase SSR clients for Week 5 enhancement
export async function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('WARNING: Supabase environment variables are not configured')
    return null
  }

  // Import cookies only when needed in Server Component context
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle Server Component cookie setting
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle Server Component cookie removal
          }
        },
      },
    }
  )
}

export function createBrowserSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('WARNING: Supabase environment variables are not configured')
    return null
  }
  
  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Database schema types for Launch Pad progress tracking
export interface UserProfile {
  id: string
  github_id: string
  github_username: string
  email: string
  name: string
  avatar_url: string
  created_at: string
  updated_at: string
}

export interface MissionProgress {
  id: string
  user_id: string
  mission_type: 'student_pack' | 'html_css' | 'javascript' | 'python' | 'interview_prep'
  mission_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  progress_percentage: number
  data: any // JSON data for mission-specific progress
  started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface StudentPackProgress {
  id: string
  user_id: string
  activated_benefits: string[]
  total_value: number
  completion_percentage: number
  priority_1_complete: boolean
  priority_2_complete: boolean
  priority_3_complete: boolean
  github_student_verified: boolean
  created_at: string
  updated_at: string
}

export interface CourseProgress {
  id: string
  user_id: string
  course_type: 'html_css' | 'javascript' | 'python'
  lesson_id: string
  status: 'not_started' | 'in_progress' | 'completed'
  completion_percentage: number
  quiz_scores: number[]
  time_spent_minutes: number
  started_at: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

// Enhanced user progress tracking for Week 5
export interface EnhancedUserProfile extends UserProfile {
  learning_streak: number
  total_lessons_completed: number
  preferred_language: string | null
  timezone: string | null
  daily_goal_minutes: number
  current_level: string
}

// Helper function to check if Supabase is available
function ensureSupabaseClient() {
  if (!supabase) {
    console.warn('Supabase client not available - user features disabled')
    return null
  }
  return supabase
}

// Progress tracking functions
export async function getUserProfile(githubId: string): Promise<UserProfile | null> {
  try {
    const client = ensureSupabaseClient()
    if (!client) return null

    const { data, error } = await client
      .from('user_profiles')
      .select('*')
      .eq('github_id', githubId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getUserProfile:', error)
    return null
  }
}

export async function createOrUpdateUserProfile(profileData: Partial<UserProfile>): Promise<UserProfile | null> {
  try {
    const client = ensureSupabaseClient()
    if (!client) return null

    const { data, error } = await client
      .from('user_profiles')
      .upsert({
        ...profileData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating/updating user profile:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in createOrUpdateUserProfile:', error)
    return null
  }
}

export async function getStudentPackProgress(userId: string): Promise<StudentPackProgress | null> {
  try {
    const client = ensureSupabaseClient()
    if (!client) return null

    const { data, error } = await client
      .from('student_pack_progress')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching student pack progress:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in getStudentPackProgress:', error)
    return null
  }
}

export async function updateStudentPackProgress(
  userId: string, 
  progressData: Partial<StudentPackProgress>
): Promise<StudentPackProgress | null> {
  try {
    const client = ensureSupabaseClient()
    if (!client) return null

    const { data, error } = await client
      .from('student_pack_progress')
      .upsert({
        user_id: userId,
        ...progressData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error updating student pack progress:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in updateStudentPackProgress:', error)
    return null
  }
}

export async function getMissionProgress(userId: string, missionType: string): Promise<MissionProgress[]> {
  try {
    const client = ensureSupabaseClient()
    if (!client) return []

    const { data, error } = await client
      .from('mission_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('mission_type', missionType)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching mission progress:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getMissionProgress:', error)
    return []
  }
}

export async function updateMissionProgress(
  userId: string,
  missionType: string,
  missionId: string,
  progressData: Partial<MissionProgress>
): Promise<MissionProgress | null> {
  try {
    const client = ensureSupabaseClient()
    if (!client) return null

    const { data, error } = await client
      .from('mission_progress')
      .upsert({
        user_id: userId,
        mission_type: missionType,
        mission_id: missionId,
        ...progressData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error updating mission progress:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in updateMissionProgress:', error)
    return null
  }
}

// Course-specific progress tracking
export async function getCourseProgress(userId: string, courseType: string): Promise<CourseProgress[]> {
  try {
    const client = ensureSupabaseClient()
    if (!client) return []

    const { data, error } = await client
      .from('course_progress')
      .select('*')
      .eq('user_id', userId)
      .eq('course_type', courseType)
      .order('lesson_id')

    if (error) {
      console.error('Error fetching course progress:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error in getCourseProgress:', error)
    return []
  }
}

export async function updateCourseProgress(
  userId: string,
  courseType: string,
  lessonId: string,
  progressData: Partial<CourseProgress>
): Promise<CourseProgress | null> {
  try {
    const client = ensureSupabaseClient()
    if (!client) return null

    const { data, error } = await client
      .from('course_progress')
      .upsert({
        user_id: userId,
        course_type: courseType,
        lesson_id: lessonId,
        ...progressData,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error updating course progress:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error in updateCourseProgress:', error)
    return null
  }
}
