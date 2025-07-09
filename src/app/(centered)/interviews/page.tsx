import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { getDeveloperStories } from "@/data/interviews";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Developer Success Stories - RockitCode",
  description: "Discover how our graduates transformed their careers and landed dream developer jobs.",
};

export default function DeveloperStoriesPage() {
  const stories = getDeveloperStories();

  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb>Developer Stories</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <h1 className="mt-10 text-3xl/10 font-normal tracking-tight text-gray-950 sm:mt-14 dark:text-white">
        Developer Success Stories
      </h1>
      <p className="mt-6 max-w-xl text-base/7 text-gray-700 dark:text-gray-400">
        Discover how our graduates transformed their careers and landed dream developer jobs.
      </p>
      <div className="mt-16 grid grid-cols-1 gap-8 pb-32 lg:grid-cols-2">
        {stories.map((story) => (
          <div
            key={story.id}
            className="relative bg-white rounded-2xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow duration-200 dark:bg-gray-900 dark:border-gray-800"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {story.name}
                </h3>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mt-1">
                  {story.role} at {story.company}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {story.subtitle}
                </p>
              </div>
              {story.timeToLanding && (
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                  {story.timeToLanding}
                </div>
              )}
            </div>
            
            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              {story.story}
            </p>
            
            {story.testimonial && (
              <blockquote className="mt-4 border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400">
                "{story.testimonial}"
              </blockquote>
            )}
            
            <div className="mt-6">
              <div className="flex flex-wrap gap-2">
                {story.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                  >
                    {skill}
                  </span>
                ))}
                {story.skills.length > 4 && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                    +{story.skills.length - 4} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">Journey:</span> {story.careerPath}
              </p>
            </div>
          </div>
        ))}
      </div>
    </CenteredPageLayout>
  );
}
