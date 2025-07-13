// Week 5: Enhanced Database Types for User Management
// Auto-generated types based on our Supabase schema

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          username: string | null
          avatar_url: string | null
          github_username: string | null
          github_id: number | null
          learning_streak: number
          total_lessons_completed: number
          current_level: 'beginner' | 'intermediate' | 'advanced'
          preferred_language: string
          timezone: string
          daily_goal_minutes: number
          join_date: string
          last_active: string
          is_premium: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          github_username?: string | null
          github_id?: number | null
          learning_streak?: number
          total_lessons_completed?: number
          current_level?: 'beginner' | 'intermediate' | 'advanced'
          preferred_language?: string
          timezone?: string
          daily_goal_minutes?: number
          join_date?: string
          last_active?: string
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          username?: string | null
          avatar_url?: string | null
          github_username?: string | null
          github_id?: number | null
          learning_streak?: number
          total_lessons_completed?: number
          current_level?: 'beginner' | 'intermediate' | 'advanced'
          preferred_language?: string
          timezone?: string
          daily_goal_minutes?: number
          join_date?: string
          last_active?: string
          is_premium?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      course_progress: {
        Row: {
          id: string
          user_id: string
          course_id: string
          lesson_id: string | null
          chapter_id: string | null
          status: 'not_started' | 'in_progress' | 'completed'
          completion_percentage: number
          time_spent_minutes: number
          started_at: string | null
          completed_at: string | null
          last_accessed: string
          notes: string | null
          quiz_scores: Record<string, any>
          exercise_data: Record<string, any>
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          course_id: string
          lesson_id?: string | null
          chapter_id?: string | null
          status?: 'not_started' | 'in_progress' | 'completed'
          completion_percentage?: number
          time_spent_minutes?: number
          started_at?: string | null
          completed_at?: string | null
          last_accessed?: string
          notes?: string | null
          quiz_scores?: Record<string, any>
          exercise_data?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          course_id?: string
          lesson_id?: string | null
          chapter_id?: string | null
          status?: 'not_started' | 'in_progress' | 'completed'
          completion_percentage?: number
          time_spent_minutes?: number
          started_at?: string | null
          completed_at?: string | null
          last_accessed?: string
          notes?: string | null
          quiz_scores?: Record<string, any>
          exercise_data?: Record<string, any>
          created_at?: string
          updated_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          achievement_id: string
          title: string
          description: string | null
          icon: string | null
          rarity: 'common' | 'rare' | 'epic' | 'legendary'
          points: number
          metadata: Record<string, any>
          earned_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          achievement_id: string
          title: string
          description?: string | null
          icon?: string | null
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          points?: number
          metadata?: Record<string, any>
          earned_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          achievement_id?: string
          title?: string
          description?: string | null
          icon?: string | null
          rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          points?: number
          metadata?: Record<string, any>
          earned_at?: string
          created_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          theme: 'light' | 'dark' | 'system'
          language: string
          notifications_enabled: boolean
          email_notifications: boolean
          browser_notifications: boolean
          daily_reminder_time: string
          weekend_reminders: boolean
          difficulty_preference: 'beginner' | 'intermediate' | 'advanced' | 'adaptive'
          code_editor_theme: string
          font_size: number
          auto_save: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          theme?: 'light' | 'dark' | 'system'
          language?: string
          notifications_enabled?: boolean
          email_notifications?: boolean
          browser_notifications?: boolean
          daily_reminder_time?: string
          weekend_reminders?: boolean
          difficulty_preference?: 'beginner' | 'intermediate' | 'advanced' | 'adaptive'
          code_editor_theme?: string
          font_size?: number
          auto_save?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          theme?: 'light' | 'dark' | 'system'
          language?: string
          notifications_enabled?: boolean
          email_notifications?: boolean
          browser_notifications?: boolean
          daily_reminder_time?: string
          weekend_reminders?: boolean
          difficulty_preference?: 'beginner' | 'intermediate' | 'advanced' | 'adaptive'
          code_editor_theme?: string
          font_size?: number
          auto_save?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      learning_sessions: {
        Row: {
          id: string
          user_id: string
          session_start: string
          session_end: string | null
          duration_minutes: number | null
          courses_accessed: string[]
          lessons_completed: number
          exercises_completed: number
          device_info: Record<string, any>
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          session_start?: string
          session_end?: string | null
          duration_minutes?: number | null
          courses_accessed?: string[]
          lessons_completed?: number
          exercises_completed?: number
          device_info?: Record<string, any>
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          session_start?: string
          session_end?: string | null
          duration_minutes?: number | null
          courses_accessed?: string[]
          lessons_completed?: number
          exercises_completed?: number
          device_info?: Record<string, any>
          created_at?: string
        }
      }
      user_bookmarks: {
        Row: {
          id: string
          user_id: string
          bookmark_type: 'lesson' | 'course' | 'resource' | 'exercise'
          content_id: string
          title: string
          description: string | null
          url: string | null
          tags: string[]
          is_favorite: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          bookmark_type: 'lesson' | 'course' | 'resource' | 'exercise'
          content_id: string
          title: string
          description?: string | null
          url?: string | null
          tags?: string[]
          is_favorite?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          bookmark_type?: 'lesson' | 'course' | 'resource' | 'exercise'
          content_id?: string
          title?: string
          description?: string | null
          url?: string | null
          tags?: string[]
          is_favorite?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      user_statistics: {
        Row: {
          user_id: string
          full_name: string | null
          username: string | null
          learning_streak: number
          total_lessons_completed: number
          current_level: string
          join_date: string
          last_active: string
          courses_started: number
          lessons_completed: number
          avg_completion_rate: number
          total_study_time: number
          total_sessions: number
          avg_session_duration: number
          total_achievements: number
          total_points: number
          last_lesson_accessed: string | null
          last_session_start: string | null
        }
      }
    }
    Functions: {
      award_achievement: {
        Args: {
          p_user_id: string
          p_achievement_id: string
          p_title: string
          p_description?: string
          p_icon?: string
          p_rarity?: 'common' | 'rare' | 'epic' | 'legendary'
          p_points?: number
          p_metadata?: Record<string, any>
        }
        Returns: boolean
      }
      get_user_dashboard: {
        Args: {
          p_user_id: string
        }
        Returns: Record<string, any>
      }
      update_course_progress_with_analytics: {
        Args: {
          p_user_id: string
          p_course_id: string
          p_lesson_id: string
          p_status: 'not_started' | 'in_progress' | 'completed'
          p_completion_percentage?: number
          p_time_spent?: number
        }
        Returns: boolean
      }
      start_learning_session: {
        Args: {
          p_user_id: string
          p_device_info?: Record<string, any>
        }
        Returns: string
      }
      end_learning_session: {
        Args: {
          p_session_id: string
          p_courses_accessed?: string[]
          p_lessons_completed?: number
          p_exercises_completed?: number
        }
        Returns: boolean
      }
    }
  }
}

// Helper types for better developer experience
export type UserProfile = Database['public']['Tables']['user_profiles']['Row']
export type UserProfileInsert = Database['public']['Tables']['user_profiles']['Insert']
export type UserProfileUpdate = Database['public']['Tables']['user_profiles']['Update']

export type CourseProgress = Database['public']['Tables']['course_progress']['Row']
export type CourseProgressInsert = Database['public']['Tables']['course_progress']['Insert']
export type CourseProgressUpdate = Database['public']['Tables']['course_progress']['Update']

export type UserAchievement = Database['public']['Tables']['user_achievements']['Row']
export type UserAchievementInsert = Database['public']['Tables']['user_achievements']['Insert']

export type UserPreferences = Database['public']['Tables']['user_preferences']['Row']
export type UserPreferencesInsert = Database['public']['Tables']['user_preferences']['Insert']
export type UserPreferencesUpdate = Database['public']['Tables']['user_preferences']['Update']

export type LearningSession = Database['public']['Tables']['learning_sessions']['Row']
export type LearningSessionInsert = Database['public']['Tables']['learning_sessions']['Insert']

export type UserBookmark = Database['public']['Tables']['user_bookmarks']['Row']
export type UserBookmarkInsert = Database['public']['Tables']['user_bookmarks']['Insert']

export type UserStatistics = Database['public']['Views']['user_statistics']['Row']

// Enhanced user context type for the application
export interface UserContext {
  user: {
    id: string
    email: string
    user_metadata: Record<string, any>
  } | null
  profile: UserProfile | null
  preferences: UserPreferences | null
  isLoading: boolean
  error: string | null
}

// Dashboard data type returned by get_user_dashboard function
export interface UserDashboardData {
  profile: {
    full_name: string | null
    username: string | null
    avatar_url: string | null
    learning_streak: number
    total_lessons_completed: number
    current_level: string
    last_active: string
  }
  recent_progress: CourseProgress[]
  achievements: UserAchievement[]
  preferences: {
    theme: string
    language: string
    notifications_enabled: boolean
    difficulty_preference: string
    code_editor_theme: string
  }
  stats: {
    total_time_minutes: number
    sessions_this_week: number
    current_streak: number
  }
}

// Progress tracking types
export interface ProgressUpdate {
  courseId: string
  lessonId: string
  status: 'not_started' | 'in_progress' | 'completed'
  completionPercentage?: number
  timeSpent?: number
}

export interface LearningSessionData {
  sessionId: string
  startTime: string
  coursesAccessed: string[]
  lessonsCompleted: number
  exercisesCompleted: number
}

// Achievement system types
export interface Achievement {
  id: string
  type: string
  title: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  points: number
  requirements?: Record<string, any>
}

export const ACHIEVEMENT_DEFINITIONS: Achievement[] = [
  {
    id: 'first_lesson_completed',
    type: 'milestone',
    title: 'First Steps',
    description: 'Completed your first lesson!',
    icon: '🎯',
    rarity: 'common',
    points: 10
  },
  {
    id: 'course_completion',
    type: 'milestone',
    title: 'Course Master',
    description: 'Completed a full course!',
    icon: '🏆',
    rarity: 'rare',
    points: 50
  },
  {
    id: 'week_streak',
    type: 'streak',
    title: 'Week Warrior',
    description: 'Learned for 7 days straight!',
    icon: '🔥',
    rarity: 'epic',
    points: 100
  },
  {
    id: 'night_owl',
    type: 'behavior',
    title: 'Night Owl',
    description: 'Completed lessons after midnight!',
    icon: '🦉',
    rarity: 'common',
    points: 15
  },
  {
    id: 'speed_demon',
    type: 'performance',
    title: 'Speed Demon',
    description: 'Completed a lesson in under 5 minutes!',
    icon: '⚡',
    rarity: 'rare',
    points: 25
  }
]
