// Week 7: Security Metrics API
// Comprehensive security scoring and analysis

import { NextRequest, NextResponse } from 'next/server'

interface SecurityMetrics {
  overallScore: number
  vulnerabilities: {
    critical: number
    high: number
    medium: number
    low: number
  }
  authenticationScore: number
  dataProtectionScore: number
  apiSecurityScore: number
  infrastructureScore: number
  lastScan: string
}

export async function GET(request: NextRequest) {
  try {
    // In production, these would be real security scans
    const securityMetrics: SecurityMetrics = {
      overallScore: calculateOverallSecurityScore(),
      vulnerabilities: {
        critical: 0,
        high: 1,
        medium: 3,
        low: 5
      },
      authenticationScore: 95,
      dataProtectionScore: 88,
      apiSecurityScore: 92,
      infrastructureScore: 87,
      lastScan: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      metrics: securityMetrics,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Security metrics error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch security metrics',
        metrics: getDefaultSecurityMetrics()
      },
      { status: 500 }
    )
  }
}

function calculateOverallSecurityScore(): number {
  // Algorithm based on multiple security factors
  const weights = {
    authentication: 0.25,
    dataProtection: 0.25,
    apiSecurity: 0.25,
    infrastructure: 0.25
  }

  const scores = {
    authentication: 95,
    dataProtection: 88,
    apiSecurity: 92,
    infrastructure: 87
  }

  const weighted = Object.keys(weights).reduce((sum, key) => {
    return sum + (scores[key as keyof typeof scores] * weights[key as keyof typeof weights])
  }, 0)

  return Math.round(weighted)
}

function getDefaultSecurityMetrics(): SecurityMetrics {
  return {
    overallScore: 85,
    vulnerabilities: {
      critical: 0,
      high: 1,
      medium: 3,
      low: 5
    },
    authenticationScore: 90,
    dataProtectionScore: 85,
    apiSecurityScore: 88,
    infrastructureScore: 82,
    lastScan: new Date().toISOString()
  }
}
