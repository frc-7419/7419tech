'use client'

import { useState } from "react"

type Status = "idle" | "submitting" | "success" | "error"

// Give up rather than leave the button stuck on "Subscribing…" if the server never answers.
const REQUEST_TIMEOUT_MS = 10_000
const GENERIC_ERROR = "Something went wrong. Please try again."

/** Single-row newsletter signup; posts to /api/newsletter. */
export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMessage, setErrorMessage] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const honeypot = new FormData(event.currentTarget).get("company")
    setStatus("submitting")
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company: honeypot }),
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      })
      const data: { error?: string } = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(data.error || GENERIC_ERROR)
      }
      setStatus("success")
      setEmail("")
    } catch (error: unknown) {
      setStatus("error")
      if (error instanceof DOMException && error.name === "TimeoutError") {
        setErrorMessage("This is taking longer than expected. Please try again in a moment.")
      } else {
        setErrorMessage(error instanceof Error ? error.message : GENERIC_ERROR)
      }
    }
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        aria-label="Newsletter signup"
        className="flex flex-col items-center gap-4 md:flex-row md:justify-center"
      >
        <label
          htmlFor="newsletter-email"
          className="font-display text-lg font-bold uppercase tracking-wide text-[#122350]"
        >
          Subscribe to our newsletter
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          placeholder="Email*"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-11 w-full max-w-sm border-2 border-[#122350] bg-white px-4 text-[#122350] placeholder:text-[#122350]/50 focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold))]"
        />
        {/* Honeypot: invisible to people, filled in by bots. */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="h-11 rounded-sm bg-[#122350] px-8 font-display font-bold uppercase tracking-wide text-white transition-colors hover:bg-[hsl(var(--brand-gold))] hover:text-[#122350] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold))] focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {status === "submitting" ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
      <p
        role="status"
        aria-live="polite"
        className={status === "error" ? "mt-3 text-sm text-red-700" : "mt-3 text-sm text-[#122350]"}
      >
        {status === "success" && "Thanks for subscribing!"}
        {status === "error" && errorMessage}
      </p>
    </div>
  )
}
