'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { 
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline'

/**
 * Affiliate Performance Dashboard
 * 
 * Monitors GitHub and Vercel affiliate program performance to optimize
 * revenue while maintaining the free-first student experience.
 */

interface AffiliateMetrics {
  totalClicks: number
  totalConversions: number
  conversionRate: number
  estimatedRevenue: number
  clicksByStep: Array<{
    step: string
    clicks: number
    uniqueUsers: number
  }>
  topPerformingSteps: Array<{
    step: string
    clicks: number
    conversionPotential: number
  }>
  revenueByProgram: Array<{
    program: string
    conversions: number
    estimatedRevenue: number
  }>
}

const AffiliatePerformanceDashboard = () => {
  const { data: session } = useSession()
  const [metrics, setMetrics] = useState<AffiliateMetrics | null>(null)
  const [timeframe, setTimeframe] = useState('30d')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMetrics()
  }, [timeframe])

  const fetchMetrics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/track-affiliate?timeframe=${timeframe}`)
      const data = await response.json()
      
      // Transform data for display
      const transformedMetrics: AffiliateMetrics = {
        totalClicks: data.totalClicks || 0,
        totalConversions: data.totalConversions || 0,
        conversionRate: data.conversionRate || 0,
        estimatedRevenue: calculateEstimatedRevenue(data),
        clicksByStep: data.clicksByStep || [],
        topPerformingSteps: data.topPerformingSteps || [],
        revenueByProgram: transformRevenueData(data.conversionsByProgram || [])
      }
      
      setMetrics(transformedMetrics)
    } catch (error) {
      console.error('Error fetching affiliate metrics:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateEstimatedRevenue = (data: any) => {
    // Estimate revenue based on conversion rates and commission structures
    const revenueEstimates = {
      github: {
        copilotUpgrade: 10 * 0.15, // $10/month * 15% commission
        teamUpgrade: 4 * 25 * 0.10, // $4/user/month * avg 25 users * 10% commission
        enterpriseReferral: 21 * 100 * 0.05 // $21/user/month * avg 100 users * 5% commission
      },
      vercel: {
        proUpgrade: 20 * 0.20, // $20/month * 20% commission
        enterpriseReferral: 50 * 10 * 0.15 // $50/user/month * avg 10 users * 15% commission
      }
    }

    // This is a simplified calculation - in reality you'd have more precise data
    const githubConversions = data.conversionsByProgram?.find((p: any) => p.program === 'github')?.conversions || 0
    const vercelConversions = data.conversionsByProgram?.find((p: any) => p.program === 'vercel')?.conversions || 0

    const githubRevenue = githubConversions * revenueEstimates.github.copilotUpgrade
    const vercelRevenue = vercelConversions * revenueEstimates.vercel.proUpgrade

    return githubRevenue + vercelRevenue
  }

  const transformRevenueData = (conversionData: any[]) => {
    return conversionData.map(item => ({
      program: item.program,
      conversions: item.conversions,
      estimatedRevenue: item.estimatedValue || 0
    }))
  }

  const getStepDisplayName = (step: string) => {
    const names = {
      'github-signup': 'GitHub Account',
      'github-student-pack': 'Student Pack',
      'github-copilot': 'GitHub Copilot',
      'vercel-signup': 'Vercel Hosting',
      'portfolio-setup': 'Portfolio Setup'
    }
    return names[step as keyof typeof names] || step
  }

  if (!session?.user?.email?.includes('admin')) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-red-800 dark:text-red-300 mb-2">
            Access Restricted
          </h2>
          <p className="text-red-600 dark:text-red-400">
            This dashboard is only available to administrators.
          </p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-6"></div>
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Affiliate Performance Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Monitor GitHub and Vercel affiliate program performance
          </p>
        </div>
        
        {/* Timeframe Selector */}
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="1d">Last 24 Hours</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics?.totalClicks.toLocaleString() || 0}
              </p>
            </div>
            <CursorArrowRaysIcon className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Conversions</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics?.totalConversions.toLocaleString() || 0}
              </p>
            </div>
            <ArrowTrendingUpIcon className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {((metrics?.conversionRate || 0) * 100).toFixed(1)}%
              </p>
            </div>
            <ChartBarIcon className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Est. Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${(metrics?.estimatedRevenue || 0).toFixed(0)}
              </p>
            </div>
            <CurrencyDollarIcon className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Clicks by Step */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Clicks by Onboarding Step
          </h3>
          <div className="space-y-4">
            {metrics?.clicksByStep.map((step) => (
              <div key={step.step}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {getStepDisplayName(step.step)}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    {step.clicks} clicks
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ 
                      width: `${Math.min((step.clicks / (metrics?.totalClicks || 1)) * 100, 100)}%` 
                    }}
                  />
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {step.uniqueUsers} unique users
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Program */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Revenue by Affiliate Program
          </h3>
          <div className="space-y-4">
            {metrics?.revenueByProgram.map((program) => (
              <div key={program.program} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white capitalize">
                    {program.program}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {program.conversions} conversions
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    ${program.estimatedRevenue.toFixed(0)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    estimated
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Steps */}
      <div className="mt-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Top Performing Onboarding Steps
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Step
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Clicks
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Conversion Potential
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 dark:text-white">
                  Priority
                </th>
              </tr>
            </thead>
            <tbody>
              {metrics?.topPerformingSteps.map((step) => (
                <tr key={step.step} className="border-b border-gray-100 dark:border-gray-700">
                  <td className="py-3 px-4 text-gray-900 dark:text-white">
                    {getStepDisplayName(step.step)}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {step.clicks}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            step.conversionPotential > 0.8 ? 'bg-green-500' :
                            step.conversionPotential > 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${step.conversionPotential * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {(step.conversionPotential * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      step.conversionPotential > 0.8 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                        : step.conversionPotential > 0.6
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300'
                    }`}>
                      {step.conversionPotential > 0.8 ? 'High' : 
                       step.conversionPotential > 0.6 ? 'Medium' : 'Low'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights and Recommendations */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-4">
          💡 Optimization Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
              High-Impact Opportunities
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• GitHub Student Pack has highest conversion potential</li>
              <li>• Vercel signup could benefit from better value communication</li>
              <li>• Portfolio setup drives long-term engagement</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 dark:text-blue-300 mb-2">
              Revenue Optimization
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Focus on GitHub Copilot upgrade messaging</li>
              <li>• Emphasize Vercel Pro features for graduates</li>
              <li>• Create upgrade timing based on course completion</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AffiliatePerformanceDashboard
