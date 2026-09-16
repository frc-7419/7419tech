import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail } from "lucide-react"
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, SCHOOL_ADDRESS, SCHOOL_NAME, TEAM_EMAIL } from "@/lib/team-contact"

const footerLinks = [
  { href: "/team", label: "Our Team" },
  { href: "/robot", label: "Our Robot" },
  { href: "/outreach", label: "Outreach" },
  { href: "/mentors", label: "Mentors" },
  { href: "/leadership", label: "Leadership" },
  { href: "/blog", label: "Team Blog" },
  { href: "/media", label: "Media" },
  { href: "/sponsors", label: "Sponsors" },
  { href: "/contact", label: "Contact Us" },
]

const contactLink =
  "inline-flex items-center gap-2 text-sm text-white/70 no-underline transition-colors hover:text-[hsl(var(--brand-gold))]"

export default function Footer() {
  return (
    <footer className="bg-navy-alt">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:grid-cols-[1.2fr_2fr] md:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3 no-underline">
            <Image width={79} height={48} src="/Logo.png" alt="" className="h-12 w-auto" style={{ width: "auto" }} />
            <span className="font-display text-2xl font-bold uppercase tracking-wide text-white">
              7419 QLS Tech Support
            </span>
          </Link>
          <address className="mt-6 space-y-1 text-sm not-italic text-white/70">
            <p>{SCHOOL_NAME}</p>
            <p>{SCHOOL_ADDRESS}</p>
            <p>
              <span className="italic">FIRST</span>® Robotics Competition Team 7419
            </p>
          </address>
          <ul className="mt-6 space-y-2">
            <li>
              <a href={`mailto:${TEAM_EMAIL}`} className={contactLink}>
                <Mail className="h-5 w-5" />
                {TEAM_EMAIL}
              </a>
            </li>
            <li>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={contactLink}>
                <Instagram className="h-5 w-5" />
                {INSTAGRAM_HANDLE}
              </a>
            </li>
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 content-start gap-x-8 gap-y-3 sm:grid-cols-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-display text-sm font-semibold uppercase tracking-wide text-white/70 no-underline transition-colors hover:text-[hsl(var(--brand-gold))]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-white/60">
        2018–{new Date().getFullYear()} 7419 QLS Tech Support • <span className="italic">FIRST</span>® Robotics
        Competition Team 7419 • #frc7419 #7419tech
      </div>
    </footer>
  )
}
