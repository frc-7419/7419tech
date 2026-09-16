'use client'

import { TEAM_EMAIL } from "@/lib/team-contact"

const labelClass = "font-display text-sm font-bold uppercase tracking-wide text-[#122350]"
const inputClass =
  "mt-1 w-full border-2 border-[#122350]/20 bg-white px-4 py-2.5 text-[#122350] placeholder:text-[#122350]/40 focus:border-[#122350] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--brand-gold))]"

// ponytail: opens the visitor's email app with the message filled in, no mail server or credentials.
// Upgrade path: an API route that sends via SMTP once the team has an app password to store as a secret.
export function ContactForm() {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const field = (key: string) => String(data.get(key) ?? "").trim()
    const name = `${field("firstName")} ${field("lastName")}`.trim()

    const lines = [`Name: ${name}`, `Email: ${field("email")}`]
    if (field("phone")) lines.push(`Phone: ${field("phone")}`)
    lines.push("", field("message"))

    const subject = encodeURIComponent(`Website message from ${name}`)
    const body = encodeURIComponent(lines.join("\n"))
    window.location.href = `mailto:${TEAM_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-first-name" className={labelClass}>First name</label>
          <input id="contact-first-name" name="firstName" required maxLength={60} autoComplete="given-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-last-name" className={labelClass}>Last name</label>
          <input id="contact-last-name" name="lastName" required maxLength={60} autoComplete="family-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>Email</label>
          <input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} />
        </div>
        <div>
          <label htmlFor="contact-phone" className={labelClass}>
            Phone <span className="font-normal normal-case text-[#122350]/70">(optional)</span>
          </label>
          <input id="contact-phone" name="phone" type="tel" maxLength={30} autoComplete="tel" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>Message</label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={6}
          maxLength={2000}
          placeholder="Type your message here..."
          className={inputClass}
        />
      </div>
      <button
        type="submit"
        className="h-12 rounded-sm bg-[#122350] px-10 font-display font-bold uppercase tracking-wide text-white transition-colors hover:bg-[hsl(var(--brand-gold))] hover:text-[#122350] focus:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--brand-gold))] focus-visible:ring-offset-2"
      >
        Send Message
      </button>
      <p className="text-sm text-[#122350]/70">
        This opens your email app with your message ready to send to{" "}
        <a href={`mailto:${TEAM_EMAIL}`} className="font-semibold text-[#122350] underline decoration-[hsl(var(--brand-gold))] decoration-2 underline-offset-2">
          {TEAM_EMAIL}
        </a>
        .
      </p>
    </form>
  )
}
