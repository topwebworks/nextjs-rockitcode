// Week 7: Security Compliance API
// Regulatory compliance and standards tracking

import { NextRequest, NextResponse } from 'next/server'

interface SecurityCompliance {
  gdpr: boolean
  ccpa: boolean
  sox: boolean
  pci: boolean
  iso27001: boolean
  owasp: number // OWASP Top 10 compliance score
}

export async function GET(request: NextRequest) {
  try {
    // In production, these would be real compliance assessments
    const compliance: SecurityCompliance = {
      gdpr: true,  // GDPR compliance implemented
      ccpa: true,  // CCPA compliance implemented
      sox: false,  // SOX compliance pending
      pci: false,  // PCI DSS not applicable for current scope
      iso27001: true,  // ISO 27001 controls implemented
      owasp: 85  // 85% OWASP Top 10 coverage
    }

    const complianceDetails = {
      gdpr: {
        status: compliance.gdpr,
        requirements: [
          'Data Processing Consent ✓',
          'Right to be Forgotten ✓',
          'Data Breach Notification ✓',
          'Privacy by Design ✓'
        ],
        lastAudit: '2024-01-15',
        nextReview: '2024-04-15'
      },
      ccpa: {
        status: compliance.ccpa,
        requirements: [
          'Consumer Rights Notice ✓',
          'Data Collection Disclosure ✓',
          'Opt-out Mechanisms ✓',
          'Third-party Sharing Controls ✓'
        ],
        lastAudit: '2024-01-20',
        nextReview: '2024-04-20'
      },
      sox: {
        status: compliance.sox,
        requirements: [
          'Financial Controls ⚠️',
          'Audit Trail Documentation ⚠️',
          'Change Management Process ⚠️',
          'Access Controls ✓'
        ],
        lastAudit: 'pending',
        nextReview: '2024-03-01'
      },
      pci: {
        status: compliance.pci,
        requirements: [
          'Not applicable - no card data processing',
          'Would require SAQ-A if implemented',
          'Network segmentation ready',
          'Encryption standards in place'
        ],
        lastAudit: 'n/a',
        nextReview: 'n/a'
      },
      iso27001: {
        status: compliance.iso27001,
        requirements: [
          'Information Security Policy ✓',
          'Risk Assessment Process ✓',
          'Security Controls Implementation ✓',
          'Incident Response Plan ✓',
          'Business Continuity Planning ⚠️'
        ],
        lastAudit: '2024-01-10',
        nextReview: '2024-07-10'
      },
      owasp: {
        score: compliance.owasp,
        coverage: [
          'A01 Broken Access Control ✓',
          'A02 Cryptographic Failures ✓',
          'A03 Injection ✓',
          'A04 Insecure Design ⚠️',
          'A05 Security Misconfiguration ✓',
          'A06 Vulnerable Components ✓',
          'A07 Identity/Authentication Failures ✓',
          'A08 Software/Data Integrity Failures ⚠️',
          'A09 Security Logging/Monitoring Failures ✓',
          'A10 Server-Side Request Forgery ⚠️'
        ],
        implemented: 7,
        total: 10,
        lastAssessment: '2024-01-25'
      }
    }

    return NextResponse.json({
      success: true,
      compliance,
      details: complianceDetails,
      summary: {
        totalStandards: 6,
        compliant: Object.values(compliance).filter(status => 
          typeof status === 'boolean' ? status : status >= 80
        ).length,
        pending: Object.values(compliance).filter(status => 
          typeof status === 'boolean' ? !status : status < 80
        ).length,
        overallScore: Math.round(
          (Object.values(compliance).reduce((sum, status) => {
            return sum + (typeof status === 'boolean' ? (status ? 100 : 0) : status)
          }, 0) / Object.values(compliance).length)
        )
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Security compliance error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch compliance data',
        compliance: getDefaultCompliance()
      },
      { status: 500 }
    )
  }
}

function getDefaultCompliance(): SecurityCompliance {
  return {
    gdpr: true,
    ccpa: true,
    sox: false,
    pci: false,
    iso27001: true,
    owasp: 75
  }
}
