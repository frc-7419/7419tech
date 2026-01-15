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
  context: { params: Promise<Record<string, string | string[] | undefined>> }
) {
  // Apply rate limiting
  const rateLimitResponse = await rateLimit(request, generalLimiter)
  if (rateLimitResponse) return rateLimitResponse

  const resolvedParams = await context.params
  const pathParam = resolvedParams?.path
  const path = Array.isArray(pathParam) ? pathParam : typeof pathParam === 'string' ? [pathParam] : null

  if (!path || path.length === 0) {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 })
  }
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
      cache: 'no-store',
    })

    const contentType = upstreamRes.headers.get('content-type') || 'application/json'
    const body = await upstreamRes.text()

    return new NextResponse(body, {
      status: upstreamRes.status,
      headers: {
        'content-type': contentType,
        'cache-control': 'no-store',
      },
    })
  } catch (error) {
    console.error('Error proxying Strapi request:', error)
    return NextResponse.json({ error: 'Failed to reach content service' }, { status: 502 })
  }
}

