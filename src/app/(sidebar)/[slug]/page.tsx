import {
  Breadcrumb,
  BreadcrumbHome,
  Breadcrumbs,
  BreadcrumbSeparator,
} from "@/components/breadcrumbs";
import { NextPageLink } from "@/components/next-page-link";
import { SidebarLayoutContent } from "@/components/sidebar-layout";
import TableOfContents from "@/components/table-of-contents";
import { Video } from "@/components/video-player";
import { EnhancedLesson } from "@/components/enhanced-lesson";
import { getLesson, getLessonContent } from "@/data/lessons";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  let lesson = await getLesson((await params).slug);

  return {
    title: `${lesson?.title} - RockitCode`,
    description: lesson?.description,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  let slug = (await params).slug;
  let lesson = await getLesson(slug);

  if (!lesson) {
    notFound();
  }

  let Content = await getLessonContent(slug);

  // Check if this lesson has interactive code sections
  if (lesson.codeSections && lesson.codeSections.length > 0) {
    return (
      <SidebarLayoutContent
        breadcrumbs={
          <Breadcrumbs>
            <BreadcrumbHome />
            <BreadcrumbSeparator className="max-md:hidden" />
            <Breadcrumb href={`/#${lesson.course}`} className="max-md:hidden">
              {lesson.course.split('-').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' & ')}
            </Breadcrumb>
            <BreadcrumbSeparator />
            <Breadcrumb>{lesson.title}</Breadcrumb>
          </Breadcrumbs>
        }
      >
        <EnhancedLesson
          title={lesson.title}
          description={lesson.description}
          video={lesson.video ? {
            url: lesson.video.url,
            poster: lesson.video.poster.src
          } : undefined}
          codeSections={lesson.codeSections}
        >
          <div dangerouslySetInnerHTML={{ __html: Content || '' }} />
        </EnhancedLesson>
      </SidebarLayoutContent>
    );
  }

  // Fallback to traditional lesson layout
  return (
    <SidebarLayoutContent
      breadcrumbs={
        <Breadcrumbs>
          <BreadcrumbHome />
          <BreadcrumbSeparator className="max-md:hidden" />
          <Breadcrumb href={`/#${lesson.course}`} className="max-md:hidden">
            {lesson.course.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' & ')}
          </Breadcrumb>
          <BreadcrumbSeparator />
          <Breadcrumb>{lesson.title}</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="mx-auto max-w-7xl">
        <div className="-mx-2 sm:-mx-4">
          {lesson.video && (
            <Video
              id="video"
              src={lesson.video.url}
              poster={lesson.video.poster.src}
            />
          )}
        </div>
        <div className="flex max-w-2xl py-10 mx-auto gap-x-10 sm:py-14 lg:max-w-5xl">
          <div className="flex-1 w-full">
            <div id="content" className="prose">
              <div dangerouslySetInnerHTML={{ __html: Content || '' }} />
            </div>
            <div className="pt-8 mt-16 border-t border-gray-200 dark:border-white/10">
              <NextPageLink
                title="Continue Learning"
                description="Explore more lessons and advance your coding skills."
                href="/learn"
              />
            </div>
          </div>
          <div className="hidden w-66 lg:block">
            <TableOfContents contentId="content" />
          </div>
        </div>
      </div>
    </SidebarLayoutContent>
  );
}
