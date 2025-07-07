import { ClockIcon } from "@/icons/clock-icon";
import { LessonsIcon } from "@/icons/lessons-icon";
import { PlayIcon } from "@/icons/play-icon";
import type { RockitCourse } from "@/data/rockitcode-courses";
import Link from "next/link";
import { memo } from "react";

interface RockitCourseCardProps {
  course: RockitCourse;
  className?: string;
  showProgress?: boolean;
  progressPercent?: number;
}

/**
 * Reusable course card component following template design patterns
 * Optimized for performance with memo and efficient rendering
 */
export const RockitCourseCard = memo(function RockitCourseCard({ 
  course, 
  className = "",
  showProgress = false,
  progressPercent = 0
}: RockitCourseCardProps) {
  // Calculate course stats
  const totalLessons = course.milestones.reduce((sum, milestone) => sum + milestone.lessons.length, 0);
  const freeLessons = course.milestones
    .filter(milestone => !milestone.isPaid)
    .reduce((sum, milestone) => sum + milestone.lessons.length, 0);

  return (
    <Link
      href={`/${course.id}`}
      className={`group block overflow-hidden rounded-2xl border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700 dark:hover:bg-gray-800 ${className}`}
    >
      {/* Course Header with Icon and Color */}
      <div className={`relative h-32 ${course.color} bg-opacity-10 dark:bg-opacity-20`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5" />
        <div className="relative flex h-full items-center justify-center">
          <span className="text-4xl">{course.icon}</span>
        </div>
        
        {/* Difficulty Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            course.difficulty === 'beginner' 
              ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
              : course.difficulty === 'intermediate'
              ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'  
              : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
          }`}>
            {course.difficulty}
          </span>
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Title and Description */}
          <div>
            <h3 className="text-lg font-semibold text-gray-950 group-hover:text-gray-700 dark:text-white dark:group-hover:text-gray-300">
              {course.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">
              {course.description}
            </p>
          </div>

          {/* Progress Bar (if showing progress) */}
          {showProgress && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>Progress</span>
                <span>{Math.round(progressPercent)}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                <div 
                  className={`h-2 rounded-full transition-all duration-300 ${course.color}`}
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}

          {/* Course Stats */}
          <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <LessonsIcon className="h-3 w-3" />
              {totalLessons} lessons
            </div>
            <div className="flex items-center gap-1">
              <ClockIcon className="h-3 w-3" />
              {course.estimatedHours}h
            </div>
            <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
              <PlayIcon className="h-3 w-3" />
              {freeLessons} free
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {course.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
            {course.tags.length > 3 && (
              <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                +{course.tags.length - 3} more
              </span>
            )}
          </div>

          {/* Prerequisites Warning */}
          {course.prerequisites.length > 0 && (
            <div className="rounded-md bg-amber-50 p-2 dark:bg-amber-900/20">
              <p className="text-xs text-amber-700 dark:text-amber-300">
                <strong>Recommended:</strong> Complete {course.prerequisites.join(", ")} first
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
});

export default RockitCourseCard;
