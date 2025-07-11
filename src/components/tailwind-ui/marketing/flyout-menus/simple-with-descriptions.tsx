'use client'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const community = [
  { 
    name: 'Discussion Forums', 
    description: 'Connect with fellow learners and get help with coding challenges', 
    href: '/community/forums' 
  },
  {
    name: 'Study Groups',
    description: 'Join or create study sessions with other students learning the same topics',
    href: '/community/groups',
  },
  { 
    name: 'Code Reviews', 
    description: 'Get feedback on your projects from experienced developers and peers', 
    href: '/community/reviews' 
  },
  { 
    name: 'Coding Challenges', 
    description: 'Test your skills with weekly challenges and compete with other learners', 
    href: '/community/challenges' 
  },
  { 
    name: 'Success Stories', 
    description: 'Read inspiring stories from students who landed their dream jobs', 
    href: '/community/success' 
  },
]

export default function SimpleWithDescriptions() {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm/6 font-semibold text-gray-900 dark:text-white">
        <span>Community</span>
        <ChevronDownIcon aria-hidden="true" className="size-5" />
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4 transition data-closed:translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
      >
        <div className="w-screen max-w-sm flex-auto rounded-3xl bg-white p-4 text-sm/6 shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-950 dark:ring-white/10">
          {community.map((item) => (
            <div key={item.name} className="relative rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50">
              <a href={item.href} className="font-semibold text-gray-900 dark:text-white">
                {item.name}
                <span className="absolute inset-0" />
              </a>
              <p className="mt-1 text-gray-600 dark:text-gray-300">{item.description}</p>
            </div>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
