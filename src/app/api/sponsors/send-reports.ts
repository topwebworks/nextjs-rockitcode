// Automated sponsor report distribution system
// /api/sponsors/send-reports.ts

import { NextRequest, NextResponse } from 'next/server'
import { createOAuth2Transporter } from '../../../lib/oauth2-gmail'

interface SponsorContact {
  id: string
  name: string
  email: string
  tier: 'premium' | 'basic'
  reportFrequency: 'monthly' | 'quarterly' | 'annual'
}

export async function POST(request: NextRequest) {
  const { type } = await request.json() // 'manual' | 'scheduled'
  
  try {
    // Get all active sponsors
    const sponsors = await getActiveSponsors()
    
    // Configure email transporter (OAuth2 Gmail)
    const transporter = await createOAuth2Transporter()

    const results = []

    for (const sponsor of sponsors) {
      try {
        // Generate PDF report for this sponsor
        const reportPDF = await generateSponsorReportPDF(sponsor.id)
        
        // Send email with attachment - Universal contact approach
        const emailResult = await transporter.sendMail({
          from: `"RockitCode Team" <${process.env.SMTP_USER}>`, // Universal sender
          replyTo: `"RockitCode Partnerships" <${process.env.SMTP_USER}>`, // Same email, different display
          to: sponsor.email,
          subject: `Your ${sponsor.tier} Sponsorship Impact Report - ${new Date().toLocaleDateString()}`,
          html: generateEmailTemplate(sponsor),
          attachments: [
            {
              filename: `${sponsor.name}_Impact_Report_${new Date().getFullYear()}.pdf`,
              content: reportPDF,
              contentType: 'application/pdf'
            }
          ]
        })

        results.push({
          sponsor: sponsor.name,
          status: 'success',
          messageId: emailResult.messageId
        })

        // Log the send in database
        await logReportSent(sponsor.id, 'email', new Date())

      } catch (error) {
        console.error(`Failed to send report to ${sponsor.name}:`, error)
        results.push({
          sponsor: sponsor.name,
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error'
        })
      }
    }

    return NextResponse.json({
      success: true,
      results,
      totalSent: results.filter(r => r.status === 'success').length,
      totalErrors: results.filter(r => r.status === 'error').length
    })

  } catch (error) {
    console.error('Error sending sponsor reports:', error)
    return NextResponse.json({ error: 'Failed to send reports' }, { status: 500 })
  }
}

async function getActiveSponsors(): Promise<SponsorContact[]> {
  // Query your sponsors database
  // return await db.sponsors.findMany({ where: { status: 'active' } })
  
  // Mock data for now
  return [
    {
      id: '1',
      name: 'Microsoft',
      email: 'partnerships@microsoft.com',
      tier: 'premium',
      reportFrequency: 'monthly'
    },
    {
      id: '2',
      name: 'Google',
      email: 'developer-programs@google.com',
      tier: 'premium',
      reportFrequency: 'monthly'
    }
  ]
}

async function generateSponsorReportPDF(sponsorId: string): Promise<Buffer> {
  // This would integrate with your PDF generation
  // For now, return mock PDF buffer
  return Buffer.from('Mock PDF content')
}

function generateEmailTemplate(sponsor: SponsorContact): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
        .highlight { background: #e3f2fd; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .cta { background: #2196f3; color: white; padding: 15px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🚀 Your Sponsorship Impact Report</h1>
          <p>Making coding education accessible worldwide</p>
        </div>
        
        <div class="content">
          <h2>Dear ${sponsor.name} Team,</h2>
          
          <p>Thank you for your continued support as a <strong>${sponsor.tier} sponsor</strong> of RockitCode! Your partnership is making a real difference in the lives of students worldwide.</p>
          
          <div class="highlight">
            <h3>📊 This Month's Highlights</h3>
            <ul>
              <li><strong>1,250+</strong> students reached with free coding education</li>
              <li><strong>45</strong> new interactive lessons created</li>
              <li><strong>420</strong> hours of one-on-one mentoring provided</li>
              <li><strong>52</strong> countries now served by our platform</li>
            </ul>
          </div>
          
          <p>📎 <strong>Attached:</strong> Your detailed impact report PDF with comprehensive metrics, receipt information, and impact stories.</p>
          
          <p>Your sponsorship enables us to:</p>
          <ul>
            <li>Keep all content completely free for students</li>
            <li>Maintain 99.7% server uptime</li>
            <li>Support our mentor community</li>
            <li>Create new educational content regularly</li>
          </ul>
          
          <a href="https://rockitcode.com/contributors" class="cta">View Public Sponsor Recognition</a>
          
          <p>Questions about your report or want to discuss expanding your partnership? Reply to this email or contact us at <a href="mailto:partnerships@rockitcode.com">partnerships@rockitcode.com</a>.</p>
          
          <p>With gratitude,<br>
          <strong>The RockitCode Team</strong></p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #666;">
            This is an automated monthly report. To change your report frequency or update contact details, 
            <a href="mailto:partnerships@rockitcode.com">contact us</a>.
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}

async function logReportSent(sponsorId: string, method: string, sentAt: Date): Promise<void> {
  // Log to database for tracking
  // await db.sponsorReportLogs.create({
  //   data: { sponsorId, method, sentAt }
  // })
}
