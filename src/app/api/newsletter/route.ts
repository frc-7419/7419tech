import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const MAX_EMAIL_LENGTH = 254
const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX_REQUESTS = 5
const RATE_LIMIT_MAX_TRACKED_IPS = 10_000
const UNIQUE_VIOLATION = "23505"

// ponytail: per-instance in-memory limiter, reset wholesale past 10k IPs; move to a shared store (e.g. Upstash) if signups get abused.
const requestLog = new Map<string, number[]>()

function isRateLimited(key: string, now: number): boolean {
  if (requestLog.size > RATE_LIMIT_MAX_TRACKED_IPS) requestLog.clear()
  const recent = (requestLog.get(key) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS)
  requestLog.set(key, [...recent, now])
  return recent.length >= RATE_LIMIT_MAX_REQUESTS
}

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status })
}

export async function POST(request: Request) {
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
  if (isRateLimited(clientIp, Date.now())) {
    return json({ error: "Too many attempts. Please try again in a minute." }, 429)
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return json({ error: "Invalid request." }, 400)
  }
  const { email, company } = (payload ?? {}) as { email?: unknown; company?: unknown }

  // Honeypot filled in: report success so bots don't retry, but store nothing.
  if (typeof company === "string" && company.length > 0) return json({ ok: true })

  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : ""
  if (!normalizedEmail || normalizedEmail.length > MAX_EMAIL_LENGTH || !EMAIL_PATTERN.test(normalizedEmail)) {
    return json({ error: "Please enter a valid email address." }, 400)
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Newsletter signup: Supabase environment variables are missing")
    return json({ error: "Newsletter signups aren't available right now. Please try again later." }, 503)
  }

  // Anonymous, insert-only access, enforced by RLS in supabase/migrations.
  const supabase = createClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false } })
  const { error } = await supabase.from("newsletter_subscribers").insert({ email: normalizedEmail })

  if (error && error.code !== UNIQUE_VIOLATION) {
    console.error("Newsletter signup failed", error)
    return json({ error: "We couldn't save your signup right now. Please try again later." }, 503)
  }

  // Already-subscribed emails get the same response, so the list can't be probed.
  return json({ ok: true })
}
