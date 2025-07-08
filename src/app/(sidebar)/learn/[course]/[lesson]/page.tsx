import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getRockitLesson, getRockitLessonContent } from '@/data/rockitcode-courses';
import { Breadcrumbs, Breadcrumb, BreadcrumbSeparator } from '@/components/breadcrumbs';
import { NextPageLink } from '@/components/next-page-link';
import { SidebarLayoutContent } from '@/components/sidebar-layout';
import TableOfContents from '@/components/table-of-contents';
import { YouTubeEmbed } from '@/components/rockitcode';

type Props = {
  params: {
    course: string;
    lesson: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { course: courseId, lesson: lessonId } = await params;
  const lessonData = await getRockitLesson(courseId, lessonId);
  
  if (!lessonData) {
    return {
      title: 'Lesson Not Found | RockitCode',
    };
  }

  return {
    title: `${lessonData.title} | ${lessonData.course.title} | RockitCode`,
    description: lessonData.description,
  };
}

export default async function LessonPage({ params }: Props) {
  const { course: courseId, lesson: lessonId } = await params;
  const lessonResult = await getRockitLesson(courseId, lessonId);

  if (!lessonResult) {
    notFound();
  }

  const { course, milestone, next, previous, ...lesson } = lessonResult;
  const Content = await getRockitLessonContent(courseId, lessonId);

  if (!Content) {
    notFound();
  }

  return (
    <SidebarLayoutContent
      breadcrumbs={
        <Breadcrumbs>
          <Breadcrumb href="/">Courses</Breadcrumb>
          <BreadcrumbSeparator />
          <Breadcrumb href={`/${course.id}`}>{course.title}</Breadcrumb>
          <BreadcrumbSeparator />
          <Breadcrumb>{lesson.title}</Breadcrumb>
        </Breadcrumbs>
      }
    >
      <div className="mx-auto max-w-7xl">
        <div className="-mx-2 sm:-mx-4">
          {lesson.video && (
            <YouTubeEmbed
              videoId={lesson.video.youtubeId}
              title={lesson.title}
            />
          )}
        </div>
        <div className="mx-auto flex max-w-2xl gap-x-10 py-10 sm:py-14 lg:max-w-5xl">
          <div className="w-full flex-1">
            <div id="content" className="prose">
              <Content />
            </div>
            <div className="mt-16 border-t border-gray-200 pt-8 dark:border-white/10">
              {next ? (
                <NextPageLink
                  title={next.title}
                  description={next.description}
                  href={`/learn/${course.id}/${next.id}`}
                />
              ) : (
                <NextPageLink
                  title="Continue Learning"
                  description="Explore more courses and continue your coding journey."
                  href={`/${course.id}`}
                />
              )}
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
