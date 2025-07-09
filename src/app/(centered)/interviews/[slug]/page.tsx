import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "@/components/breadcrumbs";
import { CenteredPageLayout } from "@/components/centered-layout";
import { getDeveloperStory, getDeveloperStories } from "@/data/interviews";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  const stories = getDeveloperStories();
  return stories.map((story) => ({ slug: story.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const story = getDeveloperStory((await params).slug);

  return {
    title: `${story?.name} - Developer Success Story - RockitCode`,
    description: story?.subtitle,
  };
}

export default async function DeveloperStoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const story = getDeveloperStory((await params).slug);

  if (!story) {
    notFound();
  }

  return (
    <CenteredPageLayout
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator />
          <Breadcrumb href="/interviews">Developer Stories</Breadcrumb>
          <BreadcrumbSeparator />
          <Breadcrumb>{story.name}</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="mt-10 sm:mt-14">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {story.name}
          </h1>
          <p className="mt-4 text-xl text-blue-600 dark:text-blue-400 font-semibold">
            {story.role} at {story.company}
          </p>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            {story.subtitle}
          </p>
          {story.timeToLanding && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium dark:bg-green-900 dark:text-green-300">
              Landed job in {story.timeToLanding}
            </div>
          )}
        </div>

        {/* Story Content */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Success Story
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {story.story}
            </p>
            
            {story.testimonial && (
              <div className="mt-8 border-l-4 border-blue-500 pl-6">
                <blockquote className="text-lg italic text-gray-600 dark:text-gray-400">
                  "{story.testimonial}"
                </blockquote>
                <cite className="block mt-2 text-sm font-medium text-gray-500 dark:text-gray-500">
                  — {story.name}
                </cite>
              </div>
            )}
          </div>

          {/* Career Journey */}
          <div className="mt-8 bg-gray-50 rounded-2xl p-8 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Career Journey
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
              {story.careerPath}
            </p>
            {story.previousRole && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Previous role: {story.previousRole}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm dark:bg-gray-900 dark:border-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {story.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Ready to start your journey?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join {story.name} and thousands of other successful developers who transformed their careers with RockitCode.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              Start Learning Today
            </Link>
          </div>
        </div>

        {/* Back to Stories */}
        <div className="mt-16 text-center">
          <Link
            href="/interviews"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to All Developer Stories
          </Link>
        </div>
      </div>
    </CenteredPageLayout>
  );
}
