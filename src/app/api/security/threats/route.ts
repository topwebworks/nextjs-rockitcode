// Week 7: Security Threats API
// Active threat detection and management

import { NextRequest, NextResponse } from 'next/server'

interface SecurityThreat {
  id: string
  type: 'authentication' | 'injection' | 'xss' | 'csrf' | 'data-exposure' | 'rate-limit'
  severity: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  impact: string
  recommendation: string
  status: 'active' | 'mitigated' | 'false-positive'
  detectedAt: string
}

export async function GET(request: NextRequest) {
  try {
    // In production, these would be real threat detections
    const threats: SecurityThreat[] = [
      {
        id: 'threat-001',
        type: 'rate-limit',
        severity: 'high',
        title: 'Potential DDoS Attack',
        description: 'Unusual traffic patterns detected from multiple IP addresses',
        impact: 'Service availability may be compromised, user experience degraded',
        recommendation: 'Implement rate limiting and consider IP blocking for suspicious sources',
        status: 'active',
        detectedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString() // 30 minutes ago
      },
      {
        id: 'threat-002',
        type: 'injection',
        severity: 'medium',
        title: 'SQL Injection Attempt',
        description: 'Malicious SQL code detected in user input parameters',
        impact: 'Potential database compromise and data exposure',
        recommendation: 'Review input validation and parameterized queries implementation',
        status: 'active',
        detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() // 2 hours ago
      },
      {
        id: 'threat-003',
        type: 'xss',
        severity: 'medium',
        title: 'Cross-Site Scripting Vector',
        description: 'Unescaped user content detected in rendered output',
        impact: 'User session hijacking and data theft possible',
        recommendation: 'Implement Content Security Policy and sanitize all user inputs',
        status: 'active',
        detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString() // 4 hours ago
      },
      {
        id: 'threat-004',
        type: 'authentication',
        severity: 'low',
        title: 'Weak Password Policy',
        description: 'Users creating passwords below recommended complexity',
        impact: 'Increased risk of account compromise through brute force',
        recommendation: 'Enforce stronger password requirements and implement 2FA',
        status: 'active',
        detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString() // 6 hours ago
      },
      {
        id: 'threat-005',
        type: 'data-exposure',
        severity: 'low',
        title: 'Verbose Error Messages',
        description: 'Error responses containing sensitive system information',
        impact: 'Information disclosure that could aid attackers',
        recommendation: 'Implement generic error messages for production environment',
        status: 'mitigated',
        detectedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() // 8 hours ago
      }
    ]

    return NextResponse.json({
      success: true,
      threats,
      count: threats.length,
      active: threats.filter(t => t.status === 'active').length,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Security threats error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch security threats',
        threats: []
      },
      { status: 500 }
    )
  }
}
