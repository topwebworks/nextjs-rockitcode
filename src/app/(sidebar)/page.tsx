import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "@/components/breadcrumbs";
import { ContentLink } from "@/components/content-link";
import { Logo } from "@/components/logo";
import { PageSection } from "@/components/page-section";
import { SidebarLayoutContent } from "@/components/sidebar-layout";
import { getModules, type Module } from "@/data/lessons";
import { getRockitCourses } from "@/data/rockitcode-courses";
import { BookIcon } from "@/icons/book-icon";
import { ClockIcon } from "@/icons/clock-icon";
import { LessonsIcon } from "@/icons/lessons-icon";
import { PlayIcon } from "@/icons/play-icon";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "RockitCode - Learn to Code Fast & Easy",
  description:
    "The easiest and fastest way to learn to code for any age (13+). Master HTML/CSS, JavaScript, and Python with interactive courses.",
};

function formatDuration(seconds: number): string {
  let h = Math.floor(seconds / 3600);
  let m = Math.floor((seconds % 3600) / 60);

  return h > 0 ? (m > 0 ? `${h} hr ${m} min` : `${h} hr`) : `${m} min`;
}

export default async function Page() {
  let modules = await getModules();
  let rockitCourses = getRockitCourses();
  let lessons = modules.flatMap(({ lessons }) => lessons);
  let duration = lessons.reduce(
    (sum, { video }) => sum + (video?.duration ?? 0),
    0,
  );

  // Calculate RockitCode course stats
  let totalRockitLessons = rockitCourses.reduce((sum, course) => 
    sum + course.milestones.reduce((milestoneSum, milestone) => 
      milestoneSum + milestone.lessons.length, 0), 0);
  let totalRockitHours = rockitCourses.reduce((sum, course) => sum + course.estimatedHours, 0);

  return (
    <SidebarLayoutContent
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Learn to Code</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="relative mx-auto max-w-7xl">
        {/* Hero Section */}
        <div className="absolute -inset-x-2 top-0 -z-10 h-80 overflow-hidden rounded-t-2xl mask-b-from-60% sm:h-88 md:h-112 lg:-inset-x-4 lg:h-128">
          {/* Modern coding background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 opacity-90" />
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3Ccircle cx='13' cy='13' r='1'/%3E%3Ccircle cx='17' cy='7' r='1'/%3E%3Ccircle cx='7' cy='17' r='1'/%3E%3C/g%3E%3C/svg%3E")`
          }} />
          <div className="absolute inset-0 rounded-t-2xl outline-1 -outline-offset-1 outline-gray-950/10 dark:outline-white/10" />
        </div>

        <div className="mx-auto max-w-6xl">
          <div className="relative">
            {/* Hero Content */}
            <div className="px-4 pt-48 pb-12 lg:py-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-4xl">🚀</div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-950 dark:text-white lg:text-4xl">
                    RockitCode
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                    Learn to Code Fast & Easy
                  </p>
                </div>
              </div>
              
              <p className="mt-7 max-w-2xl text-lg/8 text-pretty text-gray-600 dark:text-gray-400">
                The easiest and fastest way to learn to code for any age (13+). 
                Master foundational programming languages with interactive courses, 
                hands-on projects, and real-world applications.
              </p>

              {/* Course Stats */}
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm/7 font-semibold text-gray-950 sm:gap-6 dark:text-white">
                <div className="flex items-center gap-2">
                  <div className="text-lg">🎨</div>
                  <span>HTML & CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg">⚡</div>
                  <span>JavaScript</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-lg">🐍</div>
                  <span>Python</span>
                </div>
                <span className="hidden text-gray-950/25 sm:inline dark:text-white/25">
                  •
                </span>
                <div className="flex items-center gap-1.5">
                  <LessonsIcon className="stroke-gray-950/40 dark:stroke-white/40" />
                  {totalRockitLessons} interactive lessons
                </div>
                <span className="hidden text-gray-950/25 sm:inline dark:text-white/25">
                  •
                </span>
                <div className="flex items-center gap-1.5">
                  <ClockIcon className="stroke-gray-950/40 dark:stroke-white/40" />
                  {totalRockitHours}+ hours of content
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/html-css"
                  className="inline-flex items-center gap-x-2 rounded-full bg-gray-950 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-gray-800 transition-colors dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <PlayIcon className="fill-white" />
                  Start Learning Free
                </Link>
                <Link
                  href="/components-demo"
                  className="inline-flex items-center gap-x-2 rounded-full border border-gray-300 px-6 py-3 text-sm/6 font-semibold text-gray-950 hover:bg-gray-50 transition-colors dark:border-gray-600 dark:text-white dark:hover:bg-gray-800"
                >
                  🧩 Explore Components
                </Link>
              </div>
            </div>

            {/* RockitCode Courses Section */}
            <div className="grid grid-cols-1 gap-y-16 pb-10 sm:px-4">
              <PageSection
                id="courses"
                title="🎯 Choose Your Path"
              >
                <div className="max-w-4xl">
                  <h2 className="text-2xl/7 font-medium tracking-tight text-pretty text-gray-950 dark:text-white mb-4">
                    Interactive Coding Courses
                  </h2>
                  <p className="text-base/7 text-gray-700 sm:text-sm/7 dark:text-gray-400 mb-8">
                    Start with any course - no prerequisites required. Each course includes hands-on projects, 
                    interactive exercises, and real-world applications.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rockitCourses.map((course) => (
                      <Link
                        key={course.id}
                        href={`/${course.id}`}
                        className="group relative rounded-2xl border border-gray-200 p-6 hover:border-gray-300 hover:shadow-lg transition-all duration-200 dark:border-gray-700 dark:hover:border-gray-600"
                      >
                        {/* Course Icon & Title */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="text-3xl">{course.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {course.title}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                course.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                course.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {course.difficulty}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {course.estimatedHours}h
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Course Description */}
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                          {course.description}
                        </p>

                        {/* Course Stats */}
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>{course.milestones.length} milestones</span>
                          <span>
                            {course.milestones.reduce((sum, m) => sum + m.lessons.length, 0)} lessons
                          </span>
                        </div>

                        {/* Hover Arrow */}
                        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="text-blue-600 dark:text-blue-400">→</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </PageSection>

              {/* Additional Resources */}
              <PageSection
                id="resources"
                title="📚 Additional Resources"
              >
                <div className="max-w-2xl">
                  <h2 className="text-2xl/7 font-medium tracking-tight text-pretty text-gray-950 dark:text-white">
                    Explore More Learning Materials
                  </h2>
                  <p className="mt-4 text-base/7 text-gray-700 sm:text-sm/7 dark:text-gray-400">
                    Dive deeper with additional resources, developer interviews, and comprehensive guides.
                  </p>

                  <div className="mt-6 space-y-4">
                    <ContentLink
                      title="Developer Interviews"
                      description="Learn from experienced developers about their coding journey"
                      href="/interviews"
                      type="video"
                    />
                    <ContentLink
                      title="Learning Resources"
                      description="Curated collection of coding resources and tools"
                      href="/resources"
                      type="article"
                    />
                    <ContentLink
                      title="Component Library"
                      description="Interactive showcase of all RockitCode learning components"
                      href="/components-demo"
                      type="article"
                    />
                  </div>
                </div>
              </PageSection>

              {/* Template Content (for backward compatibility) */}
              {modules.length > 0 && (
                <PageSection
                  id="template-content"
                  title="🧭 Additional Learning Modules"
                >
                  <div className="max-w-2xl">
                    <h2 className="text-2xl/7 font-medium tracking-tight text-pretty text-gray-950 dark:text-white">
                      Foundational Learning Concepts
                    </h2>
                    <p className="mt-4 text-base/7 text-gray-700 sm:text-sm/7 dark:text-gray-400">
                      Explore additional learning modules covering essential concepts and methodologies.
                    </p>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {modules.slice(0, 4).map((module: Module) => (
                        <Link
                          key={module.id}
                          href={`/${module.lessons[0]?.id || module.id}`}
                          className="group block p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all dark:border-gray-700 dark:hover:border-gray-600"
                        >
                          <h3 className="font-medium text-gray-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {module.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {module.description}
                          </p>
                          <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                            {module.lessons.length} lessons
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </PageSection>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayoutContent>
  );
}
