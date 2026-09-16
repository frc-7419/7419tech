'use client'

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PennantBadge } from "@/components/ui/pennant-badge"
import { useDynamicMedia } from "@/hooks/useDynamicMedia"
import { getStrapiMediaUrl } from "@/lib/strapi/client"

// Only shown if Strapi is unreachable, deliberately not the old hardcoded team photo.
const HERO_FALLBACK = "/static/media2026/ftc-awards-ceremony.jpg"

/** Tinted team photo with the official team name, gold program line, and an outlined CTA centered on top. */
export function HeroSection() {
  // Same Strapi "about-us" photo as the About page, so the two never drift apart.
  const { media, loading } = useDynamicMedia({ location: "about-us", limit: 1 })
  const strapiPhoto = media?.[0] ? getStrapiMediaUrl(media[0].image) : null
  const photo = loading ? null : strapiPhoto || HERO_FALLBACK

  return (
    <section className="relative flex h-[90vh] max-h-[60rem] min-h-[36rem] items-center justify-center overflow-hidden bg-[#122350] pt-20">
      {photo && (
        <Image src={photo} alt="7419 QLS Tech Support team" fill priority sizes="100vw" className="object-cover" />
      )}
      <div className="absolute inset-0 bg-[#122350]/70" />

      <a
        href="https://www.thebluealliance.com/team/7419"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Team 7419 on The Blue Alliance"
        className="absolute right-6 top-20 z-20 transition-transform duration-300 hover:translate-y-1 md:right-16"
      >
        <PennantBadge title="3×" subtitle="World Championship" />
      </a>

      <div className="relative z-10 mx-auto max-w-5xl px-4 text-center">
        {/* Official team name, 7419 Branding Standards §1.1 */}
        <p className="font-display text-5xl font-bold uppercase italic leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.35)] [text-wrap:balance] sm:text-6xl md:text-7xl">
          7419 QLS Tech Support
        </p>
        <h1 className="mt-6 font-display text-2xl font-bold uppercase leading-tight tracking-wide text-[hsl(var(--brand-gold))] sm:text-3xl md:text-4xl">
          <span className="italic">FIRST</span> Robotics
          <br />
          Competition Team 7419
        </h1>
        <Button
          variant="outline"
          asChild
          className="mt-8 border-2 border-white bg-transparent px-8 font-display font-bold uppercase tracking-wide text-white hover:bg-white hover:text-[#122350]"
        >
          <Link href="/contact">Join Our Team!</Link>
        </Button>
      </div>
    </section>
  )
}
