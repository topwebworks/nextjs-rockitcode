import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "@/components/breadcrumbs";
import { PageSection } from "@/components/page-section";
import { SidebarLayoutContent } from "@/components/sidebar-layout";
import { getRockitCourse } from "@/data/rockitcode-courses";
import { LessonNavigation } from "@/components/rockitcode/lesson-navigation";
import { BookIcon } from "@/icons/book-icon";
import { ClockIcon } from "@/icons/clock-icon";
import { LessonsIcon } from "@/icons/lessons-icon";
import { PlayIcon } from "@/icons/play-icon";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "HTML & CSS Fundamentals - RockitCode",
  description: "Master the building blocks of the web. Learn to create beautiful, responsive websites from scratch.",
};

function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return mins > 0 ? `${hours} hr ${mins} min` : `${hours} hr`;
  }
  return `${mins} min`;
}

export default async function HtmlCssPage() {
  const course = await getRockitCourse("html-css");
  
  if (!course) {
    notFound();
  }

  // Calculate totals
  const totalLessons = course.milestones.reduce((sum, milestone) => sum + milestone.lessons.length, 0);
  const totalMinutes = course.milestones.reduce(
    (sum, milestone) => sum + milestone.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.estimatedMinutes, 0),
    0
  );
  const freeLessons = course.milestones
    .filter(milestone => !milestone.isPaid)
    .reduce((sum, milestone) => sum + milestone.lessons.length, 0);

  return (
    <SidebarLayoutContent
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>HTML & CSS</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Hero Background */}
        <div className="absolute -inset-x-2 top-0 -z-10 h-80 overflow-hidden rounded-t-2xl mask-b-from-60% sm:h-88 md:h-112 lg:-inset-x-4 lg:h-128">
          <div className={`absolute inset-0 ${course.color} opacity-10`} />
          <div className="absolute inset-0 rounded-t-2xl outline-1 -outline-offset-1 outline-gray-950/10 dark:outline-white/10" />
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="relative">
            {/* Hero Section */}
            <div className="px-4 pt-48 pb-12 lg:py-24">
              <div className="text-6xl mb-4">{course.icon}</div>
              <h1 className="text-3xl font-bold text-gray-950 dark:text-white">
                {course.title}
              </h1>
              <p className="mt-7 max-w-lg text-base/7 text-pretty text-gray-600 dark:text-gray-400">
                {course.description}
              </p>
              
              {/* Course Stats */}
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm/7 font-semibold text-gray-950 sm:gap-3 dark:text-white">
                <div className="flex items-center gap-1.5">
                  <BookIcon className="stroke-gray-950/40 dark:stroke-white/40" />
                  {course.milestones.length} milestones
                </div>
                <span className="hidden text-gray-950/25 sm:inline dark:text-white/25">
                  &middot;
                </span>
                <div className="flex items-center gap-1.5">
                  <LessonsIcon className="stroke-gray-950/40 dark:stroke-white/40" />
                  {totalLessons} lessons
                </div>
                <span className="hidden text-gray-950/25 sm:inline dark:text-white/25">
                  &middot;
                </span>
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="stroke-gray-950/40 dark:stroke-white/40" />
                  {course.estimatedHours} hours
                </div>
                <span className="hidden text-gray-950/25 sm:inline dark:text-white/25">
                  &middot;
                </span>
                <div className="flex items-center gap-1.5">
                  <span className="text-green-600 dark:text-green-400">
                    {freeLessons} free lessons
                  </span>
                </div>
              </div>

              {/* Prerequisites */}
              {course.prerequisites.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    <strong>Prerequisites:</strong> {course.prerequisites.join(", ")}
                  </p>
                </div>
              )}

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Start Button */}
              <div className="mt-10">
                <Link
                  href={`/learn/html-css/${course.milestones[0].lessons[0].id}`}
                  className="inline-flex items-center gap-x-2 rounded-full bg-gray-950 px-3 py-0.5 text-sm/7 font-semibold text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <PlayIcon className="fill-white" />
                  Start learning
                </Link>
              </div>
            </div>

            {/* Course Content */}
            <div className="pb-10 sm:px-4">
              <PageSection title="Course Content">
                <div className="space-y-6">
                  <p className="text-gray-600 dark:text-gray-400">
                    Progress through the milestones below to master HTML & CSS fundamentals.
                  </p>
                  
                  <LessonNavigation
                    courseId={course.id}
                    milestones={course.milestones}
                  />
                </div>
              </PageSection>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayoutContent>
  );
}
