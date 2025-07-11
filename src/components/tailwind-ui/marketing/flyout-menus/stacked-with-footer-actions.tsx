'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import {
  CodeBracketIcon,
  CpuChipIcon,
  PaintBrushIcon,
  CommandLineIcon,
  DocumentTextIcon,
  PlayIcon,
} from '@heroicons/react/24/outline'

const courses = [
  { 
    name: 'HTML & CSS Fundamentals', 
    description: 'Master the building blocks of web development', 
    href: '/html-css', 
    icon: PaintBrushIcon 
  },
  { 
    name: 'JavaScript Programming', 
    description: 'Learn interactive web development with JavaScript', 
    href: '/javascript', 
    icon: CodeBracketIcon 
  },
  { 
    name: 'Python Programming', 
    description: 'Build powerful applications with Python', 
    href: '/python', 
    icon: CommandLineIcon 
  },
  { 
    name: 'React Development', 
    description: 'Create modern user interfaces with React', 
    href: '/react', 
    icon: CpuChipIcon 
  },
]

const callsToAction = [
  { name: 'View All Courses', href: '/courses', icon: DocumentTextIcon },
  { name: 'Learning Path', href: '/path', icon: PlayIcon },
]

export default function StackedWithFooterActions() {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 dark:text-white">
        <span>Courses</span>
        <ChevronDownIcon aria-hidden="true" className="size-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm/6 shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-950 dark:ring-white/10">
          <div className="p-4">
            {courses.map((item) => (
              <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <div className="mt-1 flex size-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white dark:bg-gray-800/50 dark:group-hover:bg-gray-800">
                  <item.icon aria-hidden="true" className="size-6 text-gray-600 group-hover:text-indigo-600 dark:text-gray-400 dark:group-hover:text-indigo-400" />
                </div>
                <div>
                  <a href={item.href} className="font-semibold text-gray-900 dark:text-white">
                    {item.name}
                    <span className="absolute inset-0" />
                  </a>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50 dark:divide-white/5 dark:bg-gray-800/50">
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                <item.icon aria-hidden="true" className="size-5 flex-none text-gray-400 dark:text-gray-500" />
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  )
}
