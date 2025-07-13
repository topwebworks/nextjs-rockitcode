// Week 7: Deployment Dashboard
// Production deployment status and management

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DeploymentStatus {
  environment: string
  status: 'pending' | 'building' | 'deploying' | 'healthy' | 'failed'
  version: string
  lastDeployed: string
  health: 'healthy' | 'warning' | 'critical'
  uptime: string
  responseTime: number
  url: string
}

interface BuildInfo {
  id: string
  version: string
  status: 'pending' | 'building' | 'success' | 'failed'
  startTime: string
  duration?: string
  branch: string
  commit: string
  author: string
  message: string
  logs?: string[]
}

interface DeploymentMetrics {
  deploymentsToday: number
  successRate: number
  averageBuildTime: string
  averageDeployTime: string
  totalDeployments: number
  failureRate: number
}

export function DeploymentDashboard() {
  const [environments, setEnvironments] = useState<DeploymentStatus[]>([])
  const [builds, setBuilds] = useState<BuildInfo[]>([])
  const [metrics, setMetrics] = useState<DeploymentMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('')

  useEffect(() => {
    loadDeploymentData()
  }, [])

  const loadDeploymentData = async () => {
    try {
      const [envResponse, buildsResponse, metricsResponse] = await Promise.all([
        fetch('/api/deployment/environments'),
        fetch('/api/deployment/builds'),
        fetch('/api/deployment/metrics')
      ])

      if (envResponse.ok) {
        const envData = await envResponse.json()
        setEnvironments(envData.environments || [])
      }

      if (buildsResponse.ok) {
        const buildsData = await buildsResponse.json()
        setBuilds(buildsData.builds || [])
      }

      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json()
        setMetrics(metricsData.metrics)
      }
    } catch (error) {
      console.error('Failed to load deployment data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const triggerDeployment = async (environment: string) => {
    try {
      const response = await fetch('/api/deployment/deploy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ environment })
      })
      
      if (response.ok) {
        const deployData = await response.json()
        console.log('Deployment triggered:', deployData)
        await loadDeploymentData() // Refresh data
      }
    } catch (error) {
      console.error('Failed to trigger deployment:', error)
    }
  }

  const rollbackDeployment = async (environment: string) => {
    try {
      const response = await fetch('/api/deployment/rollback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ environment })
      })
      
      if (response.ok) {
        const rollbackData = await response.json()
        console.log('Rollback completed:', rollbackData)
        await loadDeploymentData() // Refresh data
      }
    } catch (error) {
      console.error('Failed to rollback deployment:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'success': return 'text-green-600 bg-green-100 border-green-200'
      case 'building':
      case 'deploying':
      case 'pending': return 'text-blue-600 bg-blue-100 border-blue-200'
      case 'warning': return 'text-yellow-600 bg-yellow-100 border-yellow-200'
      case 'critical':
      case 'failed': return 'text-red-600 bg-red-100 border-red-200'
      default: return 'text-gray-600 bg-gray-100 border-gray-200'
    }
  }

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'critical': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading deployment status...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Deployment Dashboard</h1>
          <p className="text-gray-600">Production deployment management and monitoring</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedEnvironment}
            onChange={(e) => setSelectedEnvironment(e.target.value)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="">All Environments</option>
            {environments.map(env => (
              <option key={env.environment} value={env.environment}>
                {env.environment}
              </option>
            ))}
          </select>
          <Button onClick={loadDeploymentData} size="sm">
            🔄 Refresh
          </Button>
        </div>
      </div>

      {/* Deployment Metrics */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{metrics.deploymentsToday}</div>
                <div className="text-sm text-gray-600">Today</div>
                <div className="text-xs text-gray-500">Deployments</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{metrics.successRate}%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
                <div className="text-xs text-gray-500">Last 30 days</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{metrics.averageBuildTime}</div>
                <div className="text-sm text-gray-600">Avg Build</div>
                <div className="text-xs text-gray-500">Time</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{metrics.averageDeployTime}</div>
                <div className="text-sm text-gray-600">Avg Deploy</div>
                <div className="text-xs text-gray-500">Time</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{metrics.totalDeployments}</div>
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-xs text-gray-500">Deployments</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{metrics.failureRate}%</div>
                <div className="text-sm text-gray-600">Failure Rate</div>
                <div className="text-xs text-gray-500">Last 30 days</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Environment Status */}
      <Card>
        <CardHeader>
          <CardTitle>Environment Status</CardTitle>
          <CardDescription>
            Production environment health and deployment status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {environments.map((env) => (
              <div key={env.environment} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-semibold text-lg">{env.environment}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(env.status)}>
                        {env.status}
                      </Badge>
                      <Badge className={`${getHealthColor(env.health)} bg-opacity-10`}>
                        {env.health}
                      </Badge>
                      <span className="text-sm text-gray-600">v{env.version}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Uptime:</span> {env.uptime}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Response:</span> {env.responseTime}ms
                  </div>
                  <div className="text-xs text-gray-500">
                    Last deployed: {new Date(env.lastDeployed).toLocaleString()}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    onClick={() => window.open(env.url, '_blank')}
                    size="sm"
                    variant="outline"
                  >
                    🌐 View
                  </Button>
                  <Button
                    onClick={() => triggerDeployment(env.environment)}
                    size="sm"
                    disabled={env.status === 'building' || env.status === 'deploying'}
                  >
                    🚀 Deploy
                  </Button>
                  <Button
                    onClick={() => rollbackDeployment(env.environment)}
                    size="sm"
                    variant="outline"
                  >
                    ⏪ Rollback
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Builds */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Builds</CardTitle>
          <CardDescription>
            Build history and deployment pipeline status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {builds.slice(0, 8).map((build) => (
              <div key={build.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(build.status)}>
                    {build.status}
                  </Badge>
                  <div>
                    <div className="font-medium">v{build.version}</div>
                    <div className="text-sm text-gray-600">
                      {build.branch} • {build.commit.slice(0, 8)}
                    </div>
                  </div>
                </div>
                
                <div className="flex-1 mx-4">
                  <div className="text-sm">{build.message}</div>
                  <div className="text-xs text-gray-500">by {build.author}</div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    {build.duration || 'Building...'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(build.startTime).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
            
            {builds.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No recent builds found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common deployment and management tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button onClick={() => triggerDeployment('production')} className="h-16">
              🚀 Deploy to Production
            </Button>
            <Button onClick={() => triggerDeployment('staging')} variant="outline" className="h-16">
              🧪 Deploy to Staging
            </Button>
            <Button onClick={() => rollbackDeployment('production')} variant="outline" className="h-16">
              ⏪ Rollback Production
            </Button>
            <Button onClick={loadDeploymentData} variant="outline" className="h-16">
              📊 Refresh Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DeploymentDashboard
