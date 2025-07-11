'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const solutions = [
  { name: 'Learning Materials', href: '#' },
  { name: 'Code Examples', href: '#' },
  { name: 'Video Tutorials', href: '#' },
  { name: 'Practice Exercises', href: '#' },
  { name: 'Documentation', href: '#' },
  { name: 'Cheat Sheets', href: '#' },
]

export default function SimpleResources() {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 dark:text-white">
        <span>Resources</span>
        <ChevronDownIcon aria-hidden="true" className="size-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="w-56 shrink rounded-xl bg-white dark:bg-gray-800 p-4 text-sm/6 font-semibold text-gray-900 dark:text-white shadow-lg ring-1 ring-gray-900/5 dark:ring-white/10">
          {solutions.map((item) => (
            <a key={item.name} href={item.href} className="block p-2 hover:text-indigo-600 dark:hover:text-indigo-400">
              {item.name}
            </a>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
