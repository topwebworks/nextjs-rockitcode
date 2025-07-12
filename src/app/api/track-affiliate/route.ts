import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { config as authOptions } from '@/lib/auth'

/**
 * Affiliate Tracking API
 * 
 * Tracks clicks and conversions for GitHub and Vercel affiliate programs.
 * Helps optimize commission revenue while maintaining student-first approach.
 */

interface AffiliateClickData {
  step: string
  url: string
  userId?: string
  timestamp: string
  userAgent?: string
  referrer?: string
}

interface AffiliateConversion {
  affiliateProgram: 'github' | 'vercel'
  conversionType: 'signup' | 'upgrade' | 'payment'
  userId: string
  value?: number
  timestamp: string
}

// In a real app, this would go to a database
const affiliateClicks: AffiliateClickData[] = []
const affiliateConversions: AffiliateConversion[] = []

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const data: AffiliateClickData = await request.json()

    // Add request metadata
    const enrichedData: AffiliateClickData = {
      ...data,
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
      userId: session?.user?.id || data.userId
    }

    // Store the click data (in production, save to database)
    affiliateClicks.push(enrichedData)

    // Log for analytics
    console.log('Affiliate click tracked:', {
      step: enrichedData.step,
      url: enrichedData.url,
      userId: enrichedData.userId,
      timestamp: enrichedData.timestamp
    })

    // Track conversion potential based on step
    await trackConversionPotential(enrichedData)

    return NextResponse.json({ 
      success: true, 
      message: 'Affiliate click tracked successfully',
      clickId: affiliateClicks.length 
    })

  } catch (error) {
    console.error('Error tracking affiliate click:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to track affiliate click' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    // Only allow admin users to view analytics
    if (!session?.user?.email?.includes('admin')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe') || '30d'
    const step = searchParams.get('step')

    // Calculate analytics
    const analytics = calculateAffiliateAnalytics(timeframe, step)

    return NextResponse.json(analytics)

  } catch (error) {
    console.error('Error fetching affiliate analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}

async function trackConversionPotential(clickData: AffiliateClickData) {
  // Analyze click patterns to predict conversion likelihood
  const conversionScores = {
    'github-signup': 0.8, // High likelihood - required for platform
    'github-student-pack': 0.9, // Very high - free value proposition
    'github-copilot': 0.6, // Medium - may upgrade after graduation
    'vercel-signup': 0.7, // High - needed for deployments
    'portfolio-setup': 0.95 // Very high - core platform feature
  }

  const score = conversionScores[clickData.step as keyof typeof conversionScores] || 0.5

  // Log high-potential conversions for follow-up
  if (score > 0.7) {
    console.log(`High conversion potential: ${clickData.step} (${score * 100}%)`)
    
    // Could trigger email sequences, retargeting, etc.
    await scheduleFollowUp(clickData, score)
  }
}

async function scheduleFollowUp(clickData: AffiliateClickData, conversionScore: number) {
  // In production, this could:
  // 1. Add user to email sequence about tool benefits
  // 2. Schedule check-in messages about setup completion
  // 3. Provide additional setup help if needed
  // 4. Track user progress through onboarding
  
  console.log(`Scheduled follow-up for ${clickData.step} (score: ${conversionScore})`)
}

function calculateAffiliateAnalytics(timeframe: string, step?: string | null) {
  const now = new Date()
  const timeframeMs = getTimeframeMs(timeframe)
  const cutoffDate = new Date(now.getTime() - timeframeMs)

  // Filter data by timeframe
  const recentClicks = affiliateClicks.filter(
    click => new Date(click.timestamp) > cutoffDate
  )

  const recentConversions = affiliateConversions.filter(
    conversion => new Date(conversion.timestamp) > cutoffDate
  )

  // Filter by step if specified
  const filteredClicks = step 
    ? recentClicks.filter(click => click.step === step)
    : recentClicks

  // Calculate metrics
  const clicksByStep = groupBy(filteredClicks, 'step')
  const conversionsByProgram = groupBy(recentConversions, 'affiliateProgram')

  return {
    timeframe,
    totalClicks: filteredClicks.length,
    totalConversions: recentConversions.length,
    conversionRate: recentConversions.length / filteredClicks.length || 0,
    
    clicksByStep: Object.entries(clicksByStep).map(([step, clicks]) => ({
      step,
      clicks: clicks.length,
      uniqueUsers: new Set(clicks.map(c => c.userId).filter(Boolean)).size
    })),

    conversionsByProgram: Object.entries(conversionsByProgram).map(([program, conversions]) => ({
      program,
      conversions: conversions.length,
      estimatedValue: conversions.reduce((sum, c) => sum + (c.value || 0), 0)
    })),

    topPerformingSteps: Object.entries(clicksByStep)
      .sort(([, a], [, b]) => b.length - a.length)
      .slice(0, 5)
      .map(([step, clicks]) => ({
        step,
        clicks: clicks.length,
        conversionPotential: getConversionPotential(step)
      })),

    recentActivity: recentClicks
      .slice(-10)
      .map(click => ({
        step: click.step,
        timestamp: click.timestamp,
        hasUserId: !!click.userId
      }))
  }
}

function getTimeframeMs(timeframe: string): number {
  const timeframes = {
    '1d': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000,
    '90d': 90 * 24 * 60 * 60 * 1000
  }
  
  return timeframes[timeframe as keyof typeof timeframes] || timeframes['30d']
}

function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce((groups, item) => {
    const groupKey = String(item[key])
    groups[groupKey] = groups[groupKey] || []
    groups[groupKey].push(item)
    return groups
  }, {} as Record<string, T[]>)
}

function getConversionPotential(step: string): number {
  const potentials = {
    'github-signup': 0.8,
    'github-student-pack': 0.9,
    'github-copilot': 0.6,
    'vercel-signup': 0.7,
    'portfolio-setup': 0.95
  }
  
  return potentials[step as keyof typeof potentials] || 0.5
}

// Webhook endpoint for affiliate program notifications
export async function PUT(request: NextRequest) {
  try {
    // Handle webhook from GitHub/Vercel about conversions
    const webhookData = await request.json()
    
    // Verify webhook signature (implement based on affiliate program requirements)
    const isValid = await verifyWebhookSignature(request, webhookData)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }

    // Process conversion data
    await processAffiliateConversion(webhookData)

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error processing affiliate webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

async function verifyWebhookSignature(request: NextRequest, data: any): Promise<boolean> {
  // Implement webhook signature verification based on affiliate program requirements
  // This is a placeholder - each program has different signature schemes
  return true
}

async function processAffiliateConversion(webhookData: any) {
  // Process actual conversion data from affiliate programs
  console.log('Processing affiliate conversion:', webhookData)
  
  // Store conversion data
  const conversion: AffiliateConversion = {
    affiliateProgram: webhookData.program,
    conversionType: webhookData.type,
    userId: webhookData.userId,
    value: webhookData.value,
    timestamp: new Date().toISOString()
  }
  
  affiliateConversions.push(conversion)
  
  // Could trigger celebration/thank you messages to users
  // Could update internal metrics and dashboards
  // Could calculate commission earnings
}
