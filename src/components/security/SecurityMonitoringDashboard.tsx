// Week 7: Security Monitoring Dashboard
// Comprehensive security analysis and threat detection

'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

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

interface SecurityCompliance {
  gdpr: boolean
  ccpa: boolean
  sox: boolean
  pci: boolean
  iso27001: boolean
  owasp: number // OWASP Top 10 compliance score
}

export function SecurityMonitoringDashboard() {
  const [metrics, setMetrics] = useState<SecurityMetrics | null>(null)
  const [threats, setThreats] = useState<SecurityThreat[]>([])
  const [compliance, setCompliance] = useState<SecurityCompliance | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isScanning, setIsScanning] = useState(false)
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all')

  useEffect(() => {
    loadSecurityData()
  }, [])

  const loadSecurityData = async () => {
    try {
      const [metricsResponse, threatsResponse, complianceResponse] = await Promise.all([
        fetch('/api/security/metrics'),
        fetch('/api/security/threats'),
        fetch('/api/security/compliance')
      ])

      if (metricsResponse.ok) {
        const metricsData = await metricsResponse.json()
        setMetrics(metricsData.metrics)
      }

      if (threatsResponse.ok) {
        const threatsData = await threatsResponse.json()
        setThreats(threatsData.threats || [])
      }

      if (complianceResponse.ok) {
        const complianceData = await complianceResponse.json()
        setCompliance(complianceData.compliance)
      }
    } catch (error) {
      console.error('Failed to load security data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const runSecurityScan = async () => {
    setIsScanning(true)
    try {
      const response = await fetch('/api/security/scan', { method: 'POST' })
      if (response.ok) {
        const scanResults = await response.json()
        console.log('Security scan completed:', scanResults)
        await loadSecurityData() // Refresh data
      }
    } catch (error) {
      console.error('Security scan failed:', error)
    } finally {
      setIsScanning(false)
    }
  }

  const mitigateThreat = async (threatId: string) => {
    try {
      const response = await fetch(`/api/security/threats/${threatId}/mitigate`, {
        method: 'POST'
      })
      if (response.ok) {
        setThreats(prev => 
          prev.map(threat => 
            threat.id === threatId 
              ? { ...threat, status: 'mitigated' }
              : threat
          )
        )
      }
    } catch (error) {
      console.error('Failed to mitigate threat:', error)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-red-100 text-red-800'
      case 'mitigated': return 'bg-green-100 text-green-800'
      case 'false-positive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredThreats = threats.filter(threat => 
    selectedFilter === 'all' || threat.severity === selectedFilter
  )

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Analyzing security metrics...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Security Monitoring</h1>
          <p className="text-gray-600">Real-time security analysis and threat detection</p>
        </div>
        <Button onClick={runSecurityScan} disabled={isScanning}>
          {isScanning ? 'Scanning...' : '🛡️ Security Scan'}
        </Button>
      </div>

      {/* Security Overview */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="border-2">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(metrics.overallScore)}`}>
                  {metrics.overallScore}
                </div>
                <div className="text-sm text-gray-600">Overall Security</div>
                <div className="text-xs text-gray-500">Score</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(metrics.authenticationScore)}`}>
                  {metrics.authenticationScore}%
                </div>
                <div className="text-sm text-gray-600">Authentication</div>
                <div className="text-xs text-gray-500">Security</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(metrics.dataProtectionScore)}`}>
                  {metrics.dataProtectionScore}%
                </div>
                <div className="text-sm text-gray-600">Data Protection</div>
                <div className="text-xs text-gray-500">Encryption</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(metrics.apiSecurityScore)}`}>
                  {metrics.apiSecurityScore}%
                </div>
                <div className="text-sm text-gray-600">API Security</div>
                <div className="text-xs text-gray-500">Protection</div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(metrics.infrastructureScore)}`}>
                  {metrics.infrastructureScore}%
                </div>
                <div className="text-sm text-gray-600">Infrastructure</div>
                <div className="text-xs text-gray-500">Hardening</div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Vulnerability Summary */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle>Vulnerability Summary</CardTitle>
            <CardDescription>
              Current security vulnerabilities by severity level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg bg-red-50 border-red-200">
                <div className="text-2xl font-bold text-red-600">{metrics.vulnerabilities.critical}</div>
                <div className="text-sm text-red-700">Critical</div>
              </div>
              <div className="text-center p-4 border rounded-lg bg-orange-50 border-orange-200">
                <div className="text-2xl font-bold text-orange-600">{metrics.vulnerabilities.high}</div>
                <div className="text-sm text-orange-700">High</div>
              </div>
              <div className="text-center p-4 border rounded-lg bg-yellow-50 border-yellow-200">
                <div className="text-2xl font-bold text-yellow-600">{metrics.vulnerabilities.medium}</div>
                <div className="text-sm text-yellow-700">Medium</div>
              </div>
              <div className="text-center p-4 border rounded-lg bg-blue-50 border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{metrics.vulnerabilities.low}</div>
                <div className="text-sm text-blue-700">Low</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Compliance Status */}
      {compliance && (
        <Card>
          <CardHeader>
            <CardTitle>Compliance Status</CardTitle>
            <CardDescription>
              Regulatory compliance and security standards
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold mb-3">Data Privacy</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>GDPR</span>
                    <Badge className={compliance.gdpr ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {compliance.gdpr ? 'Compliant' : 'Non-compliant'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>CCPA</span>
                    <Badge className={compliance.ccpa ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {compliance.ccpa ? 'Compliant' : 'Non-compliant'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Financial Standards</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>SOX</span>
                    <Badge className={compliance.sox ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {compliance.sox ? 'Compliant' : 'Non-compliant'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>PCI DSS</span>
                    <Badge className={compliance.pci ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {compliance.pci ? 'Compliant' : 'Non-compliant'}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Security Frameworks</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>ISO 27001</span>
                    <Badge className={compliance.iso27001 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                      {compliance.iso27001 ? 'Compliant' : 'Non-compliant'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>OWASP Top 10</span>
                    <Badge className={`${getScoreColor(compliance.owasp)} bg-opacity-10`}>
                      {compliance.owasp}% Coverage
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Threats */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Security Threats</CardTitle>
              <CardDescription>
                Active security threats and mitigation status
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value as any)}
                className="px-3 py-1 border rounded text-sm"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredThreats.map((threat) => (
              <div key={threat.id} className={`border-l-4 rounded-lg p-4 ${getSeverityColor(threat.severity)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{threat.title}</h4>
                      <Badge className={getSeverityColor(threat.severity)}>
                        {threat.severity}
                      </Badge>
                      <Badge className={getStatusColor(threat.status)}>
                        {threat.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {threat.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">{threat.description}</p>
                    <p className="text-sm text-gray-600 mb-2">
                      <strong>Impact:</strong> {threat.impact}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Recommendation:</strong> {threat.recommendation}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      Detected: {new Date(threat.detectedAt).toLocaleString()}
                    </p>
                  </div>
                  
                  {threat.status === 'active' && (
                    <Button
                      onClick={() => mitigateThreat(threat.id)}
                      size="sm"
                      variant="outline"
                    >
                      Mitigate
                    </Button>
                  )}
                </div>
              </div>
            ))}
            
            {filteredThreats.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">No threats found matching the selected filter.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SecurityMonitoringDashboard
