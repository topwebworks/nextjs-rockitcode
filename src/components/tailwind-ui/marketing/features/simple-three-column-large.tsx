'use client'

import { InboxIcon, TrashIcon, UsersIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Unlimited practice',
    description:
      'Access hundreds of coding challenges and exercises. Practice as much as you want with our extensive library of problems.',
    href: '#',
    icon: InboxIcon,
  },
  {
    name: 'Community support',
    description:
      'Join thousands of learners in our supportive community. Get help, share projects, and learn together.',
    href: '#',
    icon: UsersIcon,
  },
  {
    name: 'Career preparation',
    description:
      'Prepare for technical interviews with our coding challenges and get ready to land your dream developer job.',
    href: '#',
    icon: TrashIcon,
  },
]

export default function SimpleThreeColumnLarge() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
            Build your coding career
          </h2>
          <p className="mt-6 text-lg/8 text-gray-600">
            Join thousands of students who have transformed their careers through our comprehensive coding education platform.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="mb-6 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon aria-hidden="true" className="size-6 text-white" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-1 flex flex-auto flex-col text-base/7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                  <p className="mt-6">
                    <a href={feature.href} className="text-sm/6 font-semibold text-indigo-600 hover:text-indigo-500">
                      Learn more <span aria-hidden="true">→</span>
                    </a>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
