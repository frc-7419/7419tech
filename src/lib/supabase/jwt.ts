import type { UserRole } from './types'

type JwtPayload = Record<string, unknown>

function base64UrlDecode(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/')
  const padLength = (4 - (base64.length % 4)) % 4
  const padded = base64 + '='.repeat(padLength)

  // atob is available in Edge/browser; Buffer is available in Node.
  if (typeof atob === 'function') {
    return atob(padded)
  }
  // eslint-disable-next-line no-restricted-globals
  return Buffer.from(padded, 'base64').toString('utf-8')
}

export function decodeJwtPayload(token: string): JwtPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    const payloadJson = base64UrlDecode(parts[1])
    return JSON.parse(payloadJson) as JwtPayload
  } catch {
    return null
  }
}

export function getUserRoleFromAccessToken(accessToken: string | null | undefined): UserRole | null {
  if (!accessToken) return null
  const payload = decodeJwtPayload(accessToken)
  if (!payload) return null

  // Support a few common shapes depending on how the hook returns data.
  const direct = payload['user_role']
  if (direct === 'public' || direct === 'member' || direct === 'admin') return direct

  const claims = payload['claims']
  if (claims && typeof claims === 'object') {
    const nested = (claims as Record<string, unknown>)['user_role']
    if (nested === 'public' || nested === 'member' || nested === 'admin') return nested
  }

  // Some setups store custom auth data under app_metadata.
  const appMetadata = payload['app_metadata']
  if (appMetadata && typeof appMetadata === 'object') {
    const nested = (appMetadata as Record<string, unknown>)['user_role']
    if (nested === 'public' || nested === 'member' || nested === 'admin') return nested
  }

  return null
}


