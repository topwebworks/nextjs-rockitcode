// Week 7: System Monitoring Dashboard
// Real-time system health and performance monitoring

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface SystemMetrics {
  status: 'healthy' | 'warning' | 'critical'
  uptime: string
  responseTime: number
  throughput: number
  errorRate: number
  memoryUsage: number
  cpuUsage: number
  diskUsage: number
  activeUsers: number
  totalRequests: number
  cacheHitRate: number
  databaseConnections: number
}

interface ServiceStatus {
  name: string
  status: 'online' | 'offline' | 'degraded'
  responseTime: number
  lastChecked: string
  uptime: number
  dependencies: string[]
}

interface Alert {
  id: string
  level: 'info' | 'warning' | 'error' | 'critical'
  title: string
  message: string
  timestamp: string
  resolved: boolean
  service?: string
}

export function SystemMonitoringDashboard() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [services, setServices] = useState<ServiceStatus[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1h' | '6h' | '24h' | '7d'>('1h')

  useEffect(() => {
    loadMonitoringData()
    
    if (autoRefresh) {
      const interval = setInterval(loadMonitoringData, 30000) // Refresh every 30 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  const loadMonitoringData = async () => {
    try {
      const [metricsResponse, servicesResponse, alertsResponse] = await Promise.all([
        fetch('/api/monitoring/metrics'),
        fetch('/api/monitoring/services'),
        fetch('/api/monitoring/alerts')
      ])

      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json()
        setMetrics(metricsData.metrics)
      }

      if (servicesResponse.ok) {
        const servicesData = await servicesResponse.json()
        setServices(servicesData.services || [])
      }

      if (alertsResponse.ok) {
        const alertsData = await alertsResponse.json()
        setAlerts(alertsData.alerts || [])
      }
    } catch (error) {
      console.error('Failed to load monitoring data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const runHealthCheck = async () => {
    try {
      const response = await fetch('/api/monitoring/health-check', { method: 'POST' })
      if (response.ok) {
        const healthData = await response.json()
        console.log('Health check completed:', healthData)
        await loadMonitoringData() // Refresh data
      }
    } catch (error) {
      console.error('Health check failed:', error)
    }
  }

  const resolveAlert = async (alertId: string) => {
    try {
      const response = await fetch(`/api/monitoring/alerts/${alertId}/resolve`, {
        method: 'POST'
      })
      if (response.ok) {
        setAlerts(prev => 
          prev.map(alert => 
            alert.id === alertId 
              ? { ...alert, resolved: true }
              : alert
          )
        )
      }
    } catch (error) {
      console.error('Failed to resolve alert:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'online': return 'text-green-600 bg-green-100'
      case 'warning':
      case 'degraded': return 'text-yellow-600 bg-yellow-100'
      case 'critical':
      case 'offline': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'error': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  const unresolved = alerts.filter(alert => !alert.resolved)
  const critical = unresolved.filter(alert => alert.level === 'critical')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading system metrics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">System Monitoring</h1>
          <p className="text-gray-600">Real-time system health and performance tracking</p>
        </div>
        <div className="flex gap-2">
          <select
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as any)}
            className="px-3 py-1 border rounded text-sm"
          >
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
          <Button
            onClick={() => setAutoRefresh(!autoRefresh)}
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
          >
            {autoRefresh ? '🔄 Auto' : '⏸️ Manual'}
          </Button>
          <Button onClick={runHealthCheck} size="sm">
            🏥 Health Check
          </Button>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {critical.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-red-600 font-semibold">🚨 Critical Alert:</span>
            <span className="text-red-700">
              {critical.length} critical issue{critical.length > 1 ? 's' : ''} require immediate attention
            </span>
          </div>
        </div>
      )}

      {/* System Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-2xl font-bold px-3 py-1 rounded-full ${getStatusColor(metrics.status)}`}>
                  {metrics.status.toUpperCase()}
                </div>
                <div className="text-sm text-gray-600 mt-2">System Status</div>
                <div className="text-xs text-gray-500">Uptime: {metrics.uptime}</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{metrics.responseTime}ms</div>
                <div className="text-sm text-gray-600">Response Time</div>
                <div className="text-xs text-gray-500">Average</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{metrics.throughput}</div>
                <div className="text-sm text-gray-600">Requests/min</div>
                <div className="text-xs text-gray-500">Throughput</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{metrics.activeUsers}</div>
                <div className="text-sm text-gray-600">Active Users</div>
                <div className="text-xs text-gray-500">Current</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Resource Usage */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle>Resource Usage</CardTitle>
            <CardDescription>
              System resource consumption and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">CPU Usage</span>
                  <span className="text-sm text-gray-600">{metrics.cpuUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${metrics.cpuUsage}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm text-gray-600">{metrics.memoryUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${metrics.memoryUsage}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Disk Usage</span>
                  <span className="text-sm text-gray-600">{metrics.diskUsage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 h-2 rounded-full transition-all"
                    style={{ width: `${metrics.diskUsage}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Cache Hit Rate</span>
                  <span className="text-sm text-gray-600">{metrics.cacheHitRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all"
                    style={{ width: `${metrics.cacheHitRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="text-lg font-semibold">{metrics.errorRate}%</div>
                <div className="text-sm text-gray-600">Error Rate</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{metrics.totalRequests}</div>
                <div className="text-sm text-gray-600">Total Requests</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">{metrics.databaseConnections}</div>
                <div className="text-sm text-gray-600">DB Connections</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Services Status */}
      <Card>
        <CardHeader>
          <CardTitle>Services Status</CardTitle>
          <CardDescription>
            Individual service health and availability
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {services.map((service) => (
              <div key={service.name} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Badge className={getStatusColor(service.status)}>
                    {service.status}
                  </Badge>
                  <div>
                    <h4 className="font-semibold">{service.name}</h4>
                    <p className="text-sm text-gray-600">
                      Response: {service.responseTime}ms | Uptime: {formatUptime(service.uptime)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Last checked: {new Date(service.lastChecked).toLocaleTimeString()}
                  </div>
                  {service.dependencies.length > 0 && (
                    <div className="text-xs text-gray-500">
                      Dependencies: {service.dependencies.join(', ')}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>
            System alerts and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {alerts.slice(0, 10).map((alert) => (
              <div key={alert.id} className={`border-l-4 rounded-lg p-4 ${getAlertColor(alert.level)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{alert.title}</h4>
                      <Badge className={getAlertColor(alert.level)}>
                        {alert.level}
                      </Badge>
                      {alert.service && (
                        <Badge variant="outline" className="text-xs">
                          {alert.service}
                        </Badge>
                      )}
                      {alert.resolved && (
                        <Badge className="bg-green-100 text-green-800">
                          Resolved
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm mb-2">{alert.message}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                  
                  {!alert.resolved && (
                    <Button
                      onClick={() => resolveAlert(alert.id)}
                      size="sm"
                      variant="outline"
                    >
                      Resolve
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {alerts.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No recent alerts</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SystemMonitoringDashboard
