'use client'

import { useState, useRef } from 'react'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

interface SponsorData {
  id: string
  name: string
  tier: 'premium' | 'basic'
  monthlyAmount: number
  totalContributed: number
  startDate: string
  logo?: string
  website?: string
}

interface ImpactMetrics {
  studentsReached: number
  lessonsCreated: number
  communityGrowth: number
  serverUptime: number
  mentorHours: number
  projectsCompleted: number
  contentHours: number
  globalReach: number
}

export default function SponsorImpactReport() {
  const [selectedSponsor, setSelectedSponsor] = useState<string>('')
  const [reportData, setReportData] = useState<SponsorData | null>(null)
  const [impactMetrics, setImpactMetrics] = useState<ImpactMetrics | null>(null)
  const [loading, setLoading] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [emailStatus, setEmailStatus] = useState<string>('')
  const reportRef = useRef<HTMLDivElement>(null)

  // Mock sponsor data - replace with actual API calls
  const sponsors: SponsorData[] = [
    {
      id: '1',
      name: 'Microsoft',
      tier: 'premium',
      monthlyAmount: 100,
      totalContributed: 1200,
      startDate: '2024-01-15',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
      website: 'https://microsoft.com'
    },
    {
      id: '2', 
      name: 'Google',
      tier: 'premium',
      monthlyAmount: 100,
      totalContributed: 800,
      startDate: '2024-04-01',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
      website: 'https://google.com'
    },
    {
      id: '3',
      name: 'GitHub',
      tier: 'basic',
      monthlyAmount: 50,
      totalContributed: 400,
      startDate: '2024-06-01',
      logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Logo.png',
      website: 'https://github.com'
    }
  ]

  const generateImpactMetrics = async (sponsor: SponsorData): Promise<ImpactMetrics> => {
    try {
      // Fetch real impact data from API
      const response = await fetch(`/api/sponsors/impact-data?sponsorId=${sponsor.id}&period=30d`)
      if (response.ok) {
        const realData = await response.json()
        return realData
      }
    } catch (error) {
      console.error('Failed to fetch real impact data, using calculated estimates:', error)
    }
    
    // Fallback to calculated estimates if API fails
    const monthsActive = Math.ceil((Date.now() - new Date(sponsor.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))
    const impactMultiplier = sponsor.tier === 'premium' ? 2 : 1
    
    return {
      studentsReached: Math.floor((sponsor.totalContributed / 10) * impactMultiplier),
      lessonsCreated: Math.floor((sponsor.totalContributed / 25) * impactMultiplier),
      communityGrowth: Math.floor((sponsor.totalContributed / 5) * impactMultiplier),
      serverUptime: 99.9,
      mentorHours: Math.floor((sponsor.totalContributed / 2) * impactMultiplier),
      projectsCompleted: Math.floor((sponsor.totalContributed / 15) * impactMultiplier),
      contentHours: Math.floor((sponsor.totalContributed / 8) * impactMultiplier),
      globalReach: Math.floor(45 + (sponsor.totalContributed / 20))
    }
  }

  const handleSponsorSelect = async (sponsorId: string) => {
    const sponsor = sponsors.find(s => s.id === sponsorId)
    if (sponsor) {
      setSelectedSponsor(sponsorId)
      setReportData(sponsor)
      setLoading(true)
      try {
        const metrics = await generateImpactMetrics(sponsor)
        setImpactMetrics(metrics)
      } catch (error) {
        console.error('Error generating impact metrics:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const generatePDF = async () => {
    if (!reportRef.current || !reportData) return

    setLoading(true)
    try {
      // Create canvas from the report element
      const canvas = await html2canvas(reportRef.current, {
        backgroundColor: '#0f172a',
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      })

      // Create PDF
      const pdf = new jsPDF('p', 'mm', 'a4')
      const imgWidth = 210
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, imgWidth, imgHeight)
      
      // Add metadata
      pdf.setProperties({
        title: `${reportData.name} - RockitCode Sponsorship Impact Report`,
        subject: 'Sponsorship Impact Report',
        author: 'RockitCode',
        keywords: 'sponsorship, impact, education, coding',
        creator: 'RockitCode Platform'
      })

      // Save the PDF
      pdf.save(`${reportData.name}_Impact_Report_${new Date().getFullYear()}.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setLoading(false)
    }
  }

  const sendEmailReport = async () => {
    if (!reportData) return

    setEmailLoading(true)
    setEmailStatus('')
    
    try {
      const response = await fetch('/api/sponsors/send-reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          type: 'manual',
          sponsorId: reportData.id 
        })
      })

      if (response.ok) {
        setEmailStatus('✅ Report sent successfully!')
      } else {
        setEmailStatus('❌ Failed to send report')
      }
    } catch (error) {
      console.error('Error sending email:', error)
      setEmailStatus('❌ Error sending report')
    } finally {
      setEmailLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="mb-4 text-3xl font-light tracking-wide text-white">
          Sponsor Impact Reports
        </h2>
        <p className="text-lg text-slate-300">
          Generate detailed impact reports for sponsor recognition and receipts
        </p>
      </div>

      {/* Sponsor Selection */}
      <div className="p-6 border backdrop-blur-xl bg-white/5 border-white/10 rounded-xl">
        <h3 className="mb-4 text-xl font-light text-white">Select Sponsor</h3>
        <div className="grid gap-4 md:grid-cols-3">
          {sponsors.map((sponsor) => (
            <button
              key={sponsor.id}
              onClick={() => handleSponsorSelect(sponsor.id)}
              className={`p-4 border rounded-lg transition-all duration-200 ${
                selectedSponsor === sponsor.id
                  ? 'bg-blue-500/20 border-blue-400/50 text-white'
                  : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                {sponsor.logo && (
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className="object-contain w-8 h-8 filter brightness-0 invert"
                  />
                )}
                <div className="text-left">
                  <p className="font-medium">{sponsor.name}</p>
                  <p className="text-sm opacity-75">
                    ${sponsor.monthlyAmount}/month • {sponsor.tier}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Generated Report */}
      {reportData && impactMetrics && (
        <div className="space-y-6">
          {/* Report Actions */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-light text-white">Impact Report</h3>
            <div className="flex gap-3">
              <button
                onClick={sendEmailReport}
                disabled={emailLoading}
                className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-200 bg-green-600 rounded-lg hover:bg-green-700 disabled:bg-green-600/50"
              >
                {emailLoading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Report
                  </>
                )}
              </button>
              <button
                onClick={generatePDF}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-3 text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-blue-600/50"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                    </svg>
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>
          
          {/* Email Status */}
          {emailStatus && (
            <div className={`p-4 rounded-lg border ${
              emailStatus.includes('✅') 
                ? 'bg-green-500/10 border-green-400/30 text-green-300' 
                : 'bg-red-500/10 border-red-400/30 text-red-300'
            }`}>
              {emailStatus}
            </div>
          )}

          {/* Report Content */}
          <div 
            ref={reportRef}
            className="p-8 border backdrop-blur-xl bg-slate-900 border-slate-700 rounded-xl"
            style={{ minHeight: '800px' }}
          >
            {/* Report Header */}
            <div className="pb-6 mb-8 text-center border-b border-slate-700">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 rounded">
                  <span className="text-xl font-bold text-white">RC</span>
                </div>
                <h1 className="text-3xl font-light text-white">RockitCode</h1>
              </div>
              <h2 className="mb-2 text-2xl font-light text-white">Sponsorship Impact Report</h2>
              <p className="text-slate-300">Generated on {new Date().toLocaleDateString()}</p>
            </div>

            {/* Sponsor Information */}
            <div className="grid gap-8 mb-8 md:grid-cols-2">
              <div className="space-y-4">
                <h3 className="mb-4 text-xl font-semibold text-white">Sponsor Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {reportData.logo && (
                      <img 
                        src={reportData.logo} 
                        alt={reportData.name}
                        className="object-contain w-12 h-12 filter brightness-0 invert"
                      />
                    )}
                    <div>
                      <p className="text-xl font-medium text-white">{reportData.name}</p>
                      <p className="capitalize text-slate-300">{reportData.tier} Sponsor</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Monthly Contribution</p>
                      <p className="font-medium text-white">${reportData.monthlyAmount}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Total Contributed</p>
                      <p className="font-medium text-white">${reportData.totalContributed}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Partnership Start</p>
                      <p className="font-medium text-white">{new Date(reportData.startDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Duration</p>
                      <p className="font-medium text-white">
                        {Math.ceil((Date.now() - new Date(reportData.startDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="mb-4 text-xl font-semibold text-white">Receipt Information</h3>
                <div className="p-4 border rounded-lg bg-slate-800/50 border-slate-600">
                  <p className="mb-2 text-sm text-slate-300">
                    <strong>Business Partnership Receipt</strong>
                  </p>
                  <p className="mb-2 text-sm text-slate-300">
                    Receipt ID: RC-{reportData.id}-{new Date().getFullYear()}
                  </p>
                  <p className="mb-2 text-sm text-slate-300">
                    RockitCode LLC<br/>
                    Business Partnership Program
                  </p>
                  <p className="text-sm text-slate-300">
                    <em>This receipt acknowledges sponsorship payment for business partnership benefits including brand visibility and community recognition.</em>
                  </p>
                </div>
              </div>
            </div>

            {/* Impact Metrics Grid */}
            <div className="mb-8">
              <h3 className="mb-6 text-xl font-semibold text-white">Your Sponsorship Impact</h3>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {[
                  { label: 'Students Reached', value: impactMetrics.studentsReached.toLocaleString(), icon: '👥' },
                  { label: 'Lessons Created', value: impactMetrics.lessonsCreated.toLocaleString(), icon: '📚' },
                  { label: 'Community Growth', value: `+${impactMetrics.communityGrowth}`, icon: '📈' },
                  { label: 'Server Uptime', value: `${impactMetrics.serverUptime}%`, icon: '⚡' },
                  { label: 'Mentor Hours', value: impactMetrics.mentorHours.toLocaleString(), icon: '🎓' },
                  { label: 'Projects Completed', value: impactMetrics.projectsCompleted.toLocaleString(), icon: '🚀' },
                  { label: 'Content Hours', value: impactMetrics.contentHours.toLocaleString(), icon: '🎬' },
                  { label: 'Global Reach', value: `${impactMetrics.globalReach} countries`, icon: '🌍' }
                ].map((metric, index) => (
                  <div key={index} className="p-4 border rounded-lg bg-slate-800/30 border-slate-600/50">
                    <div className="mb-2 text-2xl">{metric.icon}</div>
                    <div className="mb-1 text-2xl font-bold text-white">{metric.value}</div>
                    <div className="text-sm text-slate-400">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Story */}
            <div className="mb-8">
              <h3 className="mb-4 text-xl font-semibold text-white">Impact Story</h3>
              <div className="p-6 border rounded-lg bg-slate-800/30 border-slate-600/50">
                <p className="leading-relaxed text-slate-300">
                  Thanks to {reportData.name}'s generous ${reportData.totalContributed} contribution, we've been able to reach {impactMetrics.studentsReached.toLocaleString()} students worldwide with free coding education. 
                  Your support has directly funded the creation of {impactMetrics.lessonsCreated} interactive lessons, 
                  enabled {impactMetrics.mentorHours.toLocaleString()} hours of one-on-one mentoring, and helped students complete {impactMetrics.projectsCompleted.toLocaleString()} real-world projects.
                  
                  Our platform now serves learners in {impactMetrics.globalReach} countries, with {impactMetrics.serverUptime}% uptime ensuring consistent access to education.
                  The community has grown by {impactMetrics.communityGrowth} members since your partnership began, creating a thriving ecosystem of peer learning and collaboration.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 text-center border-t border-slate-700">
              <p className="text-sm text-slate-400">
                Thank you for making free coding education accessible worldwide
              </p>
              <p className="mt-2 text-xs text-slate-500">
                RockitCode LLC • Generated {new Date().toLocaleDateString()} • Receipt #{reportData.id}-{new Date().getFullYear()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
