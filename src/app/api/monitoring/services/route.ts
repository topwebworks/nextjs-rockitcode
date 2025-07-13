// Week 7: Service Status Monitoring API
// Individual service health and availability tracking

import { NextRequest, NextResponse } from 'next/server'

interface ServiceStatus {
  name: string
  status: 'online' | 'offline' | 'degraded'
  responseTime: number
  lastChecked: string
  uptime: number
  dependencies: string[]
  healthEndpoint?: string
  description: string
}

export async function GET(request: NextRequest) {
  try {
    // In production, these would be real service checks
    const services: ServiceStatus[] = [
      {
        name: 'API Gateway',
        status: getRandomStatus(),
        responseTime: Math.round(20 + Math.random() * 30),
        lastChecked: new Date().toISOString(),
        uptime: Math.floor(Math.random() * 86400 * 30), // Up to 30 days
        dependencies: ['Database', 'Redis Cache'],
        healthEndpoint: '/api/health',
        description: 'Main API routing and request handling'
      },
      {
        name: 'Authentication Service',
        status: getRandomStatus(),
        responseTime: Math.round(15 + Math.random() * 25),
        lastChecked: new Date().toISOString(),
        uptime: Math.floor(Math.random() * 86400 * 25),
        dependencies: ['Database', 'JWT Service'],
        healthEndpoint: '/api/auth/health',
        description: 'User authentication and authorization'
      },
      {
        name: 'AI Processing Service',
        status: getRandomStatus(),
        responseTime: Math.round(100 + Math.random() * 200),
        lastChecked: new Date().toISOString(),
        uptime: Math.floor(Math.random() * 86400 * 20),
        dependencies: ['OpenAI API', 'Redis Cache'],
        healthEndpoint: '/api/ai/health',
        description: 'AI content generation and processing'
      },
      {
        name: 'Database',
        status: getRandomStatus(),
        responseTime: Math.round(5 + Math.random() * 15),
        lastChecked: new Date().toISOString(),
        uptime: Math.floor(Math.random() * 86400 * 45),
        dependencies: [],
        healthEndpoint: '/api/db/health',
        description: 'Primary database server'
      },
      {
        name: 'Redis Cache',
        status: getRandomStatus(),
        responseTime: Math.round(2 + Math.random() * 8),
        lastChecked: new Date().toISOString(),
        uptime: Math.floor(Math.random() * 86400 * 35),
        dependencies: [],
        healthEndpoint: '/api/cache/health',
        description: 'In-memory caching service'
      },
      {
        name: 'File Storage',
        status: getRandomStatus(),
        responseTime: Math.round(30 + Math.random() * 50),
        lastChecked: new Date().toISOString(),
        uptime: Math.floor(Math.random() * 86400 * 40),
        dependencies: [],
        healthEndpoint: '/api/storage/health',
        description: 'File upload and storage service'
      },
      {
        name: 'Email Service',
        status: getRandomStatus(),
        responseTime: Math.round(200 + Math.random() * 300),
        lastChecked: new Date().toISOString(),
        uptime: Math.floor(Math.random() * 86400 * 28),
        dependencies: ['SMTP Server'],
        healthEndpoint: '/api/email/health',
        description: 'Email notification and delivery'
      },
      {
        name: 'Search Engine',
        status: getRandomStatus(),
        responseTime: Math.round(25 + Math.random() * 40),
        lastChecked: new Date().toISOString(),
        uptime: Math.floor(Math.random() * 86400 * 22),
        dependencies: ['Database'],
        healthEndpoint: '/api/search/health',
        description: 'Content search and indexing'
      }
    ]

    // Calculate overall service health
    const onlineServices = services.filter(s => s.status === 'online').length
    const degradedServices = services.filter(s => s.status === 'degraded').length
    const offlineServices = services.filter(s => s.status === 'offline').length

    const summary = {
      total: services.length,
      online: onlineServices,
      degraded: degradedServices,
      offline: offlineServices,
      healthPercentage: Math.round((onlineServices / services.length) * 100),
      averageResponseTime: Math.round(
        services.reduce((sum, service) => sum + service.responseTime, 0) / services.length
      )
    }

    return NextResponse.json({
      success: true,
      services,
      summary,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Services monitoring error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch service status',
        services: []
      },
      { status: 500 }
    )
  }
}

function getRandomStatus(): 'online' | 'offline' | 'degraded' {
  const random = Math.random()
  
  if (random < 0.05) return 'offline'    // 5% chance of offline
  if (random < 0.15) return 'degraded'   // 10% chance of degraded
  return 'online'                        // 85% chance of online
}
