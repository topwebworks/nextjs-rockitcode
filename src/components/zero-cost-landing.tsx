'use client'

import Link from 'next/link'
import { CheckCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import { AuthButton } from '@/components/rockitcode/auth-button'

/**
 * Zero-Cost Professional Development Landing Page
 * 
 * Showcases the complete free professional development stack
 * and drives users to the setup flow.
 */

const professionalTools = [
  {
    name: 'GitHub Copilot',
    description: 'AI coding assistant',
    normalPrice: '$10/month',
    rockitCodePrice: 'FREE',
    features: ['Code completion', 'Chat assistance', 'Code explanation']
  },
  {
    name: 'GitHub Student Pack',
    description: 'Professional developer tools',
    normalPrice: '$200,000+ value',
    rockitCodePrice: 'FREE',
    features: ['JetBrains IDEs', 'Figma Pro', 'Cloud credits', 'Domain names']
  },
  {
    name: 'Vercel Pro Features',
    description: 'Professional hosting',
    normalPrice: '$20/month',
    rockitCodePrice: 'FREE',
    features: ['Global CDN', 'Serverless functions', 'Auto deployments']
  },
  {
    name: 'GitHub Pages',
    description: 'Portfolio hosting',
    normalPrice: '$10/month elsewhere',
    rockitCodePrice: 'FREE',
    features: ['Custom domains', 'HTTPS', 'Global distribution']
  }
]

const competitorComparison = [
  {
    feature: 'Professional AI Tools',
    bootcamp: '❌ Not included',
    codecademy: '❌ Extra cost',
    rockitcode: '✅ GitHub Copilot Free'
  },
  {
    feature: 'Live Portfolio Hosting',
    bootcamp: '❌ Manual setup',
    codecademy: '❌ Not included',
    rockitcode: '✅ Automatic deployment'
  },
  {
    feature: 'Enterprise Development Tools',
    bootcamp: '❌ Student versions only',
    codecademy: '❌ Not included',
    rockitcode: '✅ $200k+ value included'
  },
  {
    feature: 'Total Cost',
    bootcamp: '$15,000+',
    codecademy: '$300+/year',
    rockitcode: '100% FREE'
  }
]

export function ZeroCostLanding() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-32 sm:py-48">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-flex items-center rounded-full bg-green-50 dark:bg-green-900/20 px-6 py-2 text-sm font-medium text-green-700 dark:text-green-400 ring-1 ring-green-600/20">
                <CheckCircleIcon className="h-4 w-4 mr-2" />
                100% Free Forever • No Credit Card Required
              </div>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
              Professional Developer Environment
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Get the exact same development tools used by professionals at{' '}
              <strong>GitHub, Netflix, and Airbnb</strong>. 
              AI assistance, hosting, and $200k+ worth of enterprise tools.
            </p>
            
            <div className="mt-8 flex items-center justify-center gap-x-6">
              <AuthButton 
                variant="primary" 
                size="lg"
                redirectTo="/setup"
                className="px-8 py-4 text-lg"
              />
              <Link 
                href="/setup" 
                className="text-sm font-semibold leading-6 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
              >
                View setup process <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Value Proposition */}
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 text-center">
              <div className="p-4">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">$0</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Cost to Students</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">$200k+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Tools Value</div>
              </div>
              <div className="p-4">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">30min</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Setup Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Professional Tools Section */}
      <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Enterprise Tools at Zero Cost
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Everything you need for professional development, completely free
            </p>
          </div>
          
          <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2">
            {professionalTools.map((tool) => (
              <div key={tool.name} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {tool.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400 line-through">
                      {tool.normalPrice}
                    </div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">
                      {tool.rockitCodePrice}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {tool.description}
                </p>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              How RockitCode Compares
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Professional development education that doesn't break the bank
            </p>
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Feature
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Bootcamps
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Codecademy
                  </th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center justify-center">
                      RockitCode
                      <StarIcon className="h-4 w-4 text-yellow-400 ml-1" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {competitorComparison.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {row.feature}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                      {row.bootcamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500 dark:text-gray-400">
                      {row.codecademy}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-green-600 dark:text-green-400">
                      {row.rockitcode}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to start your professional developer journey?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-blue-100">
              Join thousands of students learning with the same tools used by professionals at top tech companies.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <AuthButton 
                variant="secondary" 
                size="lg"
                redirectTo="/setup"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
              />
              <Link 
                href="/foundation" 
                className="text-sm font-semibold leading-6 text-white hover:text-blue-100"
              >
                View curriculum <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZeroCostLanding
