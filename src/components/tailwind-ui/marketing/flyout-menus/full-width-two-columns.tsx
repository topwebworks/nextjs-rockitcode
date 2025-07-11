'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  BookOpenIcon,
  UserGroupIcon,
  VideoCameraIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CodeBracketIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline'

const learningMaterials = [
  { name: 'Study Guides', href: '/guides', icon: BookOpenIcon },
  { name: 'Video Tutorials', href: '/tutorials', icon: VideoCameraIcon },
  { name: 'Code Examples', href: '/examples', icon: CodeBracketIcon },
  { name: 'Practice Exercises', href: '/exercises', icon: AcademicCapIcon },
  { name: 'Cheat Sheets', href: '/cheatsheets', icon: ClipboardDocumentListIcon },
]

const community = [
  { name: 'Discussion Forums', href: '/forums', icon: UserGroupIcon },
  { name: 'Study Groups', href: '/groups', icon: UserGroupIcon },
  { name: 'Progress Tracking', href: '/progress', icon: ChartBarIcon },
  { name: 'Documentation', href: '/docs', icon: DocumentTextIcon },
]

const recentTutorials = [
  {
    id: 1,
    title: 'Advanced React Hooks Patterns',
    href: '/tutorials/react-hooks',
    date: 'Jan 15, 2025',
    datetime: '2025-01-15',
    category: { title: 'React', href: '/react' },
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Master custom hooks and advanced React patterns for better component composition.',
  },
  {
    id: 2,
    title: 'CSS Grid Layout Mastery',
    href: '/tutorials/css-grid',
    date: 'Jan 12, 2025',
    datetime: '2025-01-12',
    category: { title: 'CSS', href: '/css' },
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    description: 'Create complex layouts with CSS Grid - from basics to advanced techniques.',
  },
]

export default function FullWidthTwoColumns() {
  return (
    <Popover className="relative isolate z-50 shadow-sm">
      <div className="bg-white dark:bg-gray-950 py-5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 dark:text-white">
            Resources
            <ChevronDownIcon aria-hidden="true" className="size-5" />
          </PopoverButton>
        </div>
      </div>

      <PopoverPanel
        transition
        className="absolute inset-x-0 top-16 bg-white dark:bg-gray-950 transition data-closed:-translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white dark:bg-gray-950 shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10" />
        <div className="relative bg-white dark:bg-gray-950">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-6 py-10 lg:grid-cols-2 lg:px-8">
            <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8">
              <div>
                <h3 className="text-sm/6 font-medium text-gray-500 dark:text-gray-400">Learning Materials</h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {learningMaterials.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex gap-x-4 py-2 text-sm/6 font-semibold text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                      >
                        <item.icon aria-hidden="true" className="size-6 flex-none text-gray-400 dark:text-gray-500" />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm/6 font-medium text-gray-500 dark:text-gray-400">Community</h3>
                <div className="mt-6 flow-root">
                  <div className="-my-2">
                    {community.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex gap-x-4 py-2 text-sm/6 font-semibold text-gray-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                      >
                        <item.icon aria-hidden="true" className="size-6 flex-none text-gray-400 dark:text-gray-500" />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
              <h3 className="sr-only">Recent tutorials</h3>
              {recentTutorials.map((tutorial) => (
                <article
                  key={tutorial.id}
                  className="relative isolate flex max-w-2xl flex-col gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                >
                  <div className="relative flex-none">
                    <img
                      alt=""
                      src={tutorial.imageUrl}
                      className="aspect-2/1 w-full rounded-lg bg-gray-100 object-cover sm:aspect-video sm:h-32 lg:h-auto dark:bg-gray-800"
                    />
                    <div className="absolute inset-0 rounded-lg ring-1 ring-gray-900/10 ring-inset dark:ring-white/10" />
                  </div>
                  <div>
                    <div className="flex items-center gap-x-4">
                      <time dateTime={tutorial.datetime} className="text-sm/6 text-gray-600 dark:text-gray-400">
                        {tutorial.date}
                      </time>
                      <a
                        href={tutorial.category.href}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
                      >
                        {tutorial.category.title}
                      </a>
                    </div>
                    <h4 className="mt-2 text-sm/6 font-semibold text-gray-900 dark:text-white">
                      <a href={tutorial.href}>
                        <span className="absolute inset-0" />
                        {tutorial.title}
                      </a>
                    </h4>
                    <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-300">{tutorial.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
