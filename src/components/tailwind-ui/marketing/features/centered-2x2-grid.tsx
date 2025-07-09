'use client'

import { 
  ArrowPathIcon, 
  CloudArrowUpIcon, 
  FingerPrintIcon, 
  LockClosedIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Start coding instantly',
    description:
      'Jump straight into coding with our browser-based editor. No downloads, no setup, just pure learning.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Certificate courses',
    description:
      'Earn industry-recognized certificates that validate your skills and boost your career prospects.',
    icon: LockClosedIcon,
  },
  {
    name: 'Adaptive learning',
    description:
      'Our platform adapts to your learning style and pace, ensuring you master each concept before moving forward.',
    icon: ArrowPathIcon,
  },
  {
    name: 'Expert mentorship',
    description:
      'Get guidance from experienced developers who will help you navigate your coding journey and career goals.',
    icon: FingerPrintIcon,
  },
]

export default function Centered2x2Grid() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Learn smarter</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            Everything you need to master coding
          </p>
          <p className="mt-6 text-lg/8 text-gray-700">
            From complete beginner to job-ready developer, our comprehensive platform gives you all the tools and support you need to succeed.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
