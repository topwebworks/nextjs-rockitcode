import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { BookOpenIcon, PlayIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

const links = [
  {
    name: 'Browse Courses',
    href: '/courses',
    description: 'Explore our comprehensive coding curriculum.',
    icon: BookOpenIcon,
  },
  { 
    name: 'Tutorials', 
    href: '/tutorials', 
    description: 'Step-by-step guides for learning to code.', 
    icon: PlayIcon 
  },
  {
    name: 'Community',
    href: '/community',
    description: 'Connect with fellow students and get help.',
    icon: UserGroupIcon,
  },
  { 
    name: 'Learning Paths', 
    href: '/paths', 
    description: 'Structured routes to master programming.', 
    icon: AcademicCapIcon 
  },
]

export default function WithPopularPages() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <main className="mx-auto w-full max-w-7xl px-6 pt-10 pb-16 sm:pb-24 lg:px-8">
        <div className="mx-auto h-10 w-auto sm:h-12 flex justify-center">
          <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">RockitCode</div>
        </div>
        <div className="mx-auto mt-20 max-w-2xl text-center sm:mt-24">
          <p className="text-base/8 font-semibold text-indigo-600 dark:text-indigo-400">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white sm:text-6xl">
            This page does not exist
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 dark:text-gray-400 sm:text-xl/8">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. Try one of these popular sections instead:
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root max-w-lg sm:mt-20">
          <h2 className="sr-only">Popular pages</h2>
          <ul role="list" className="-mt-6 divide-y divide-gray-900/5 dark:divide-white/10 border-b border-gray-900/5 dark:border-white/10">
            {links.map((link, linkIdx) => (
              <li key={linkIdx} className="relative flex gap-x-6 py-6">
                <div className="flex size-10 flex-none items-center justify-center rounded-lg shadow-sm ring-1 ring-gray-900/10 dark:ring-white/10 bg-white dark:bg-gray-800">
                  <link.icon aria-hidden="true" className="size-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex-auto">
                  <h3 className="text-sm/6 font-semibold text-gray-900 dark:text-white">
                    <a href={link.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {link.name}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm/6 text-gray-600 dark:text-gray-400">{link.description}</p>
                </div>
                <div className="flex-none self-center">
                  <ChevronRightIcon aria-hidden="true" className="size-5 text-gray-400 dark:text-gray-500" />
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex justify-center">
            <a href="/" className="text-sm/6 font-semibold text-indigo-600 dark:text-indigo-400">
              <span aria-hidden="true">&larr;</span> Back to home
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
