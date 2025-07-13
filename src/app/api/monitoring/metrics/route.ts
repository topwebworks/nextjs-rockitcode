// Week 7: System Metrics API
// Real-time system performance and health metrics

import { NextRequest, NextResponse } from 'next/server'

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

export async function GET(request: NextRequest) {
  try {
    // In production, these would be real system metrics
    const metrics: SystemMetrics = {
      status: determineSystemStatus(),
      uptime: calculateUptime(),
      responseTime: Math.round(50 + Math.random() * 100), // 50-150ms
      throughput: Math.round(150 + Math.random() * 50), // 150-200 req/min
      errorRate: Math.round(Math.random() * 2 * 100) / 100, // 0-2%
      memoryUsage: Math.round(60 + Math.random() * 25), // 60-85%
      cpuUsage: Math.round(30 + Math.random() * 40), // 30-70%
      diskUsage: Math.round(45 + Math.random() * 30), // 45-75%
      activeUsers: Math.round(25 + Math.random() * 75), // 25-100 users
      totalRequests: Math.round(10000 + Math.random() * 5000), // 10k-15k
      cacheHitRate: Math.round(85 + Math.random() * 10), // 85-95%
      databaseConnections: Math.round(8 + Math.random() * 7) // 8-15 connections
    }

    // Calculate additional derived metrics
    const additionalMetrics = {
      load: {
        oneMinute: Math.round((metrics.cpuUsage / 100) * 4 * 100) / 100,
        fiveMinute: Math.round((metrics.cpuUsage / 100) * 3.5 * 100) / 100,
        fifteenMinute: Math.round((metrics.cpuUsage / 100) * 3 * 100) / 100
      },
      network: {
        bytesIn: Math.round(1024 * 1024 * (50 + Math.random() * 100)), // 50-150 MB
        bytesOut: Math.round(1024 * 1024 * (25 + Math.random() * 50)), // 25-75 MB
        packetsIn: Math.round(10000 + Math.random() * 5000),
        packetsOut: Math.round(8000 + Math.random() * 4000)
      },
      database: {
        queryTime: Math.round(5 + Math.random() * 15), // 5-20ms
        slowQueries: Math.round(Math.random() * 3),
        locks: Math.round(Math.random() * 2),
        size: '2.4 GB'
      }
    }

    return NextResponse.json({
      success: true,
      metrics: {
        ...metrics,
        ...additionalMetrics
      },
      timestamp: new Date().toISOString(),
      collectedAt: new Date().toISOString()
    })

  } catch (error) {
    console.error('System metrics error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch system metrics',
        metrics: getDefaultMetrics()
      },
      { status: 500 }
    )
  }
}

function determineSystemStatus(): 'healthy' | 'warning' | 'critical' {
  // Simple health determination based on multiple factors
  const random = Math.random()
  
  if (random < 0.05) return 'critical'  // 5% chance of critical
  if (random < 0.15) return 'warning'   // 10% chance of warning
  return 'healthy'                      // 85% chance of healthy
}

function calculateUptime(): string {
  // Simulate system uptime (in production, this would be real uptime)
  const uptimeSeconds = Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 86400 * 30) // Up to 30 days
  const days = Math.floor(uptimeSeconds / 86400)
  const hours = Math.floor((uptimeSeconds % 86400) / 3600)
  const minutes = Math.floor((uptimeSeconds % 3600) / 60)
  
  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
}

function getDefaultMetrics(): SystemMetrics {
  return {
    status: 'healthy',
    uptime: '7d 12h 34m',
    responseTime: 75,
    throughput: 180,
    errorRate: 0.5,
    memoryUsage: 65,
    cpuUsage: 45,
    diskUsage: 60,
    activeUsers: 42,
    totalRequests: 12500,
    cacheHitRate: 92,
    databaseConnections: 10
  }
}
