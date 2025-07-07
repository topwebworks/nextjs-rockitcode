import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getRockitLesson, getRockitCourse } from '@/data/rockitcode-courses';
import { ProgressTracker } from '@/components/rockitcode';
import { RockitLessonRenderer } from '@/components/rockitcode/lesson-renderer';
import { Breadcrumbs, Breadcrumb, BreadcrumbSeparator } from '@/components/breadcrumbs';
import { NextPageLink } from '@/components/next-page-link';
import { type RockitLesson } from '@/data/rockitcode-courses';

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

  return (
    <div className="mx-auto max-w-4xl">
      {/* Breadcrumbs */}
      <div className="mb-6">
        <Breadcrumbs>
          <Breadcrumb href="/">Courses</Breadcrumb>
          <BreadcrumbSeparator />
          <Breadcrumb href={`/${course.id}`}>{course.title}</Breadcrumb>
          <BreadcrumbSeparator />
          <Breadcrumb href={`/${course.id}#${milestone.id}`}>{milestone.title}</Breadcrumb>
          <BreadcrumbSeparator />
          <Breadcrumb>{lesson.title}</Breadcrumb>
        </Breadcrumbs>
      </div>

      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-lg ${course.color} flex items-center justify-center text-white text-xl font-bold`}>
            {course.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">
              {lesson.title}
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 mt-1">
              {lesson.description}
            </p>
          </div>
        </div>

        {/* Lesson Meta */}
        <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {lesson.estimatedMinutes} minutes
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {milestone.title}
          </div>
          {milestone.isPaid && (
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Pro
            </div>
          )}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="mb-8">
        <ProgressTracker
          courseId={course.id}
          items={[{
            id: lesson.id,
            title: lesson.title,
            type: 'lesson',
            estimatedMinutes: lesson.estimatedMinutes,
            isRequired: true
          }]}
        />
      </div>

      {/* Lesson Content */}
      <div className="mb-12">
        <RockitLessonRenderer
          lesson={lesson}
          courseId={course.id}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-12">
        <div>
          {previous && (
            <NextPageLink
              href={`/learn/${course.id}/${previous.id}`}
              title={previous.title}
              description="Previous lesson"
            />
          )}
        </div>
        <div>
          {next && (
            <NextPageLink
              href={`/learn/${course.id}/${next.id}`}
              title={next.title}
              description="Next lesson"
            />
          )}
        </div>
      </div>

      {/* Course Progress Summary */}
      <div className="mt-12 p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-2">
          Course Progress
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
          Continue your learning journey in {course.title}
        </p>
        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            {course.milestones.length} milestones • {course.estimatedHours} hours total
          </div>
          <NextPageLink
            href={`/${course.id}`}
            title="Course Overview"
            description="View all lessons"
          />
        </div>
      </div>
    </div>
  );
}
