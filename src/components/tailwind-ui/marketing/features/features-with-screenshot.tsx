'use client'

import { 
  CloudArrowUpIcon, 
  LockClosedIcon, 
  ServerIcon 
} from '@heroicons/react/20/solid'

const features = [
  {
    name: 'Interactive Learning',
    description:
      'Learn by doing with hands-on coding exercises, real-time feedback, and interactive challenges that make coding fun.',
    icon: CloudArrowUpIcon,
  },
  {
    name: 'Secure Progress Tracking',
    description: 'Your learning progress is safely stored and synced across all devices with enterprise-level security.',
    icon: LockClosedIcon,
  },
  {
    name: 'Project Portfolio',
    description: 'Build real projects that showcase your skills and can be shared with potential employers.',
    icon: ServerIcon,
  },
]

export default function FeaturesWithScreenshot() {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">Learn faster</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                A better way to code
              </p>
              <p className="mt-6 text-lg/8 text-gray-700">
                Experience the most effective way to learn programming with our interactive platform designed for real-world success.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600" />
                      {feature.name}
                    </dt>{' '}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <img
            alt="RockitCode learning interface"
            src="https://tailwindcss.com/plus-assets/img/component-images/project-app-screenshot.png"
            width={2432}
            height={1442}
            className="w-3xl max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-228 md:-ml-4 lg:-ml-0"
          />
        </div>
      </div>
    </div>
  )
}
