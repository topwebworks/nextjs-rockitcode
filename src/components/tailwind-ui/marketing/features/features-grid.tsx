'use client'

import { 
  CodeBracketIcon, 
  AcademicCapIcon, 
  SparklesIcon,
  ClockIcon,
  TrophyIcon,
  UsersIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Interactive Coding',
    description: 'Learn by doing with hands-on coding exercises and real-time feedback on your progress.',
    icon: CodeBracketIcon,
  },
  {
    name: 'Beginner Friendly',
    description: 'No prior experience needed. Start from the basics and build your skills step by step.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Modern Curriculum',
    description: 'Learn the latest technologies and best practices used by professional developers.',
    icon: SparklesIcon,
  },
  {
    name: 'Learn at Your Pace',
    description: 'Self-paced learning that fits your schedule. Access lessons anytime, anywhere.',
    icon: ClockIcon,
  },
  {
    name: 'Project-Based',
    description: 'Build real projects that you can showcase in your portfolio to future employers.',
    icon: TrophyIcon,
  },
  {
    name: 'Community Support',
    description: 'Join a community of learners and get help when you need it most.',
    icon: UsersIcon,
  },
]

export default function FeaturesGrid() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600">Learn effectively</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            Everything you need to master coding
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">
            Our platform combines the best teaching methods with modern technology to give you the skills 
            that today's employers are looking for.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base/7 font-semibold text-gray-900">
                  <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
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
