import AffiliateRevenueManager from '@/components/affiliate-revenue-manager'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Equipment Settings - RockitCode Launch Pad',
  description: 'Configure your mission equipment, manage professional tools, view transparent revenue model, and customize your development environment.',
}

/**
 * Equipment Settings Page - Mission Configuration & Revenue Transparency
 * 
 * Allows mission specialists to configure their professional development
 * environment, understand our transparent revenue model, and manage
 * their Launch Pad experience.
 */
export default function EquipmentSettingsPage() {
  return <AffiliateRevenueManager />
}
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Configure your professional development environment
          </p>
        </div>

        {/* Equipment Configuration */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Professional Tools */}
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              🛠️ Professional Tools
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">GitHub Copilot</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">AI coding assistant</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                    Active
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">GitHub Student Pack</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">$200k+ professional tools</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                    Claimed
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Vercel Deployment</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Professional hosting</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-200">
                    Connected
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Preferences */}
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              🎯 Mission Preferences
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Mission Difficulty
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option>Adaptive (Recommended)</option>
                  <option>Beginner Friendly</option>
                  <option>Standard Challenge</option>
                  <option>Advanced Mode</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  AI Assistance Level
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option>Balanced (Recommended)</option>
                  <option>High Assistance</option>
                  <option>Minimal Assistance</option>
                  <option>Strategic Only</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Portfolio Focus
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option>Full-Stack Development</option>
                  <option>Frontend Specialization</option>
                  <option>Backend Focus</option>
                  <option>Data Science Track</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              📡 Mission Communications
            </h2>
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Mission progress updates
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  New equipment available
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Career opportunity alerts
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  Mission completion celebrations
                </span>
              </label>
            </div>
          </div>

          {/* Profile Settings */}
          <div className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              👤 Mission Specialist Profile
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Display Name
                </label>
                <input
                  type="text"
                  placeholder="Mission Specialist Name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Career Goal
                </label>
                <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option>Land First Developer Job</option>
                  <option>Career Change to Tech</option>
                  <option>Advance to Senior Role</option>
                  <option>Start Freelance Business</option>
                  <option>Build Startup</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  GitHub Username
                </label>
                <input
                  type="text"
                  placeholder="your-github-username"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Settings */}
        <div className="mt-8 text-center">
          <button className="rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900">
            🚀 Update Mission Configuration
          </button>
        </div>
      </div>
    </div>
  )
}
