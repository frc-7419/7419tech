import { NextResponse } from 'next/server'
import { strapiClient } from '@/lib/strapi/client'

export async function GET() {
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
