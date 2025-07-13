// Week 7: Performance Speed Test API
// Network speed testing endpoint

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Generate test payload for speed measurement
    const testData = {
      timestamp: new Date().toISOString(),
      payload: 'x'.repeat(1000), // 1KB test payload
      metadata: {
        server: 'RockitCode Performance Test',
        version: '1.0.0',
        test: true
      }
    }

    const response = NextResponse.json(testData)
    
    // Add headers for speed testing
    response.headers.set('Content-Length', JSON.stringify(testData).length.toString())
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('X-Performance-Test', 'true')
    
    return response

  } catch (error) {
    console.error('Speed test API error:', error)
    return NextResponse.json(
      { error: 'Speed test failed' },
      { status: 500 }
    )
  }
}
