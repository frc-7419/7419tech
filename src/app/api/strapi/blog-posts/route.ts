import { NextRequest, NextResponse } from 'next/server'
import { strapiClient } from '@/lib/strapi/client'
import { rateLimit, generalLimiter } from '@/lib/rate-limit'

export async function GET(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResponse = await rateLimit(request, generalLimiter)
  if (rateLimitResponse) {
    return rateLimitResponse
  }

  try {
    const response = await strapiClient.getBlogPosts({
      pagination: { pageSize: 10 }
    })
    
    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    )
  }
}
