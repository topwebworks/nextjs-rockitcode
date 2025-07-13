// Week 7: System Alerts API
// Alert management and notification system

import { NextRequest, NextResponse } from 'next/server'

interface Alert {
  id: string
  level: 'info' | 'warning' | 'error' | 'critical'
  title: string
  message: string
  timestamp: string
  resolved: boolean
  service?: string
  category: 'performance' | 'security' | 'infrastructure' | 'application' | 'user'
  impact: 'low' | 'medium' | 'high' | 'critical'
  source: string
}

export async function GET(request: NextRequest) {
  try {
    // In production, these would be real alerts from monitoring systems
    const alerts: Alert[] = [
      {
        id: 'alert-001',
        level: 'warning',
        title: 'High CPU Usage Detected',
        message: 'CPU usage has exceeded 80% for the past 10 minutes on the main application server',
        timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 minutes ago
        resolved: false,
        service: 'API Gateway',
        category: 'performance',
        impact: 'medium',
        source: 'system-monitor'
      },
      {
        id: 'alert-002',
        level: 'error',
        title: 'Database Connection Pool Exhausted',
        message: 'All database connections are in use, new requests are being queued',
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        resolved: false,
        service: 'Database',
        category: 'infrastructure',
        impact: 'high',
        source: 'database-monitor'
      },
      {
        id: 'alert-003',
        level: 'info',
        title: 'Scheduled Maintenance Completed',
        message: 'Redis cache maintenance window completed successfully with no data loss',
        timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
        resolved: true,
        service: 'Redis Cache',
        category: 'infrastructure',
        impact: 'low',
        source: 'maintenance-system'
      },
      {
        id: 'alert-004',
        level: 'warning',
        title: 'API Rate Limit Approaching',
        message: 'OpenAI API usage is at 85% of monthly quota, consider implementing additional caching',
        timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(), // 1.5 hours ago
        resolved: false,
        service: 'AI Processing Service',
        category: 'application',
        impact: 'medium',
        source: 'usage-monitor'
      },
      {
        id: 'alert-005',
        level: 'critical',
        title: 'Security Threat Detected',
        message: 'Multiple failed login attempts detected from suspicious IP addresses',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
        resolved: true,
        service: 'Authentication Service',
        category: 'security',
        impact: 'critical',
        source: 'security-monitor'
      },
      {
        id: 'alert-006',
        level: 'warning',
        title: 'Disk Space Running Low',
        message: 'File storage partition is 85% full, cleanup or expansion recommended',
        timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
        resolved: false,
        service: 'File Storage',
        category: 'infrastructure',
        impact: 'medium',
        source: 'storage-monitor'
      },
      {
        id: 'alert-007',
        level: 'info',
        title: 'Performance Optimization Applied',
        message: 'Automatic query optimization improved database response time by 15%',
        timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(), // 4 hours ago
        resolved: true,
        service: 'Database',
        category: 'performance',
        impact: 'low',
        source: 'optimization-engine'
      },
      {
        id: 'alert-008',
        level: 'error',
        title: 'Email Delivery Failures',
        message: 'SMTP server connection issues causing email notification delays',
        timestamp: new Date(Date.now() - 1000 * 60 * 300).toISOString(), // 5 hours ago
        resolved: false,
        service: 'Email Service',
        category: 'application',
        impact: 'medium',
        source: 'email-monitor'
      },
      {
        id: 'alert-009',
        level: 'warning',
        title: 'Cache Hit Rate Declined',
        message: 'Redis cache hit rate dropped to 78%, consider cache warming strategies',
        timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
        resolved: false,
        service: 'Redis Cache',
        category: 'performance',
        impact: 'low',
        source: 'cache-monitor'
      },
      {
        id: 'alert-010',
        level: 'info',
        title: 'System Health Check Passed',
        message: 'All critical systems passed automated health verification',
        timestamp: new Date(Date.now() - 1000 * 60 * 420).toISOString(), // 7 hours ago
        resolved: true,
        service: 'System Monitor',
        category: 'infrastructure',
        impact: 'low',
        source: 'health-checker'
      }
    ]

    // Filter and sort alerts
    const unresolvedAlerts = alerts.filter(alert => !alert.resolved)
    const criticalAlerts = alerts.filter(alert => alert.level === 'critical')
    const recentAlerts = alerts.filter(alert => 
      Date.now() - new Date(alert.timestamp).getTime() < 24 * 60 * 60 * 1000 // Last 24 hours
    )

    const summary = {
      total: alerts.length,
      unresolved: unresolvedAlerts.length,
      critical: criticalAlerts.filter(a => !a.resolved).length,
      byLevel: {
        critical: alerts.filter(a => a.level === 'critical').length,
        error: alerts.filter(a => a.level === 'error').length,
        warning: alerts.filter(a => a.level === 'warning').length,
        info: alerts.filter(a => a.level === 'info').length
      },
      byCategory: {
        performance: alerts.filter(a => a.category === 'performance').length,
        security: alerts.filter(a => a.category === 'security').length,
        infrastructure: alerts.filter(a => a.category === 'infrastructure').length,
        application: alerts.filter(a => a.category === 'application').length,
        user: alerts.filter(a => a.category === 'user').length
      }
    }

    return NextResponse.json({
      success: true,
      alerts: alerts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
      summary,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Alerts monitoring error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch alerts',
        alerts: []
      },
      { status: 500 }
    )
  }
}
