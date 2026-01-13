import { NextRequest, NextResponse } from 'next/server'
import { rateLimit, generalLimiter } from '@/lib/rate-limit'

const STRAPI_API_URL =
  process.env.STRAPI_API_URL ||
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  'https://innovative-luck-8fe8e1c24e.strapiapp.com/api'

function joinUrl(base: string, path: string) {
  const normalizedBase = base.replace(/\/+$/, '')
  const normalizedPath = path.replace(/^\/+/, '')
  return `${normalizedBase}/${normalizedPath}`
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  // Apply rate limiting
  const rateLimitResponse = await rateLimit(request, generalLimiter)
  if (rateLimitResponse) return rateLimitResponse

  const { path } = await context.params
  const upstreamUrl = new URL(joinUrl(STRAPI_API_URL, path.join('/')))

  // Preserve querystring
  request.nextUrl.searchParams.forEach((value, key) => {
    upstreamUrl.searchParams.append(key, value)
  })

  try {
    const upstreamRes = await fetch(upstreamUrl.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      // Cache Strapi responses briefly at the Next.js layer
      next: { revalidate: 60 },
    })

    const contentType = upstreamRes.headers.get('content-type') || 'application/json'
    const body = await upstreamRes.text()

    return new NextResponse(body, {
      status: upstreamRes.status,
      headers: {
        'content-type': contentType,
        // Encourage browsers/CDNs to cache lightly too (safe for public content)
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    })
  } catch (error) {
    console.error('Error proxying Strapi request:', error)
    return NextResponse.json({ error: 'Failed to reach content service' }, { status: 502 })
  }
}

