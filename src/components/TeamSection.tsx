"use client"

import Image from "next/image"
import Link from "next/link"
import { Flag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NumeralWatermark } from "@/components/ui/numeral-watermark"
import { SectionDivider } from "@/components/ui/section-divider"
import { SplitPanel } from "@/components/ui/split-panel"
import { useDynamicMedia } from "@/hooks/useDynamicMedia"
import { getStrapiMediaUrl } from "@/lib/strapi/client"
import { SEASON_PHOTOS } from "@/lib/season-photos"

// Only shown if Strapi is unreachable, deliberately not the old hardcoded team photo.
const TEAM_PHOTO_FALLBACK = "/static/media2026/ftc-awards-ceremony.jpg"

const CORE_VALUES = [
  { title: "Technology", body: "Design, build, and program a competitive robot every season, from CAD and CNC machining to Java, vision, and autonomous code." },
  { title: "Education", body: "Keep learning and teach what we learn: training new members, mentoring 13 FLL and FTC teams, and running our Summer Robotics Camp." },
  { title: "Collaboration", body: "Stay mentor-driven but student-organized. We train, support, and elevate each other while holding ourselves accountable." },
  { title: "Humanities", body: "Put people first, from menstrual equity drives and coral cleanups to teaching robotics in 100+ countries through Project STEAMBOT." },
]

// From thebluealliance.com/team/7419/history, update after each event.
const AWARDS = [
  { year: 2026, award: "Team Sustainability Award", event: "CA District Half Moon Bay" },
  { year: 2025, award: "Moonshot Thinking Award", event: "Sunset Showdown" },
  { year: 2024, award: "Regional Engineering Inspiration Award", event: "Arizona East Regional" },
  { year: 2024, award: "Regional Finalists", event: "Arizona East Regional" },
  { year: 2024, award: "Gracious Professionalism Award", event: "Silicon Valley Regional" },
  { year: 2024, award: "Engineering Inspiration Award", event: "Sunset Showdown" },
  { year: 2022, award: "Regional Winners", event: "Silicon Valley Regional", banner: true },
  { year: 2019, award: "Rookie All Star Award", event: "San Francisco Regional" },
  { year: 2019, award: "Highest Rookie Seed", event: "San Francisco Regional" },
  { year: 2019, award: "Rookie Inspiration Award", event: "Silicon Valley Regional" },
  { year: 2019, award: "Highest Rookie Seed", event: "Silicon Valley Regional" },
  { year: 2019, award: "Finalist", event: "Capital City Classic" },
]

const CHAMPIONSHIPS = ["2019 Carver", "2022 Roebling", "2024 Johnson"]

const SEASONS = [
  { year: 2026, game: "REBUILT", href: "/robot" },
  { year: 2025, game: "REEFSCAPE" },
  { year: 2024, game: "CRESCENDO" },
  { year: 2023, game: "CHARGED UP" },
  { year: 2022, game: "RAPID REACT" },
  { year: 2021, game: "INFINITE RECHARGE At Home" },
  { year: 2020, game: "INFINITE RECHARGE" },
  { year: 2019, game: "DESTINATION: DEEP SPACE" },
]

const EVENTS_2026 = [
  { name: "CA District Half Moon Bay", date: "Mar 6–8", href: "https://www.thebluealliance.com/event/2026cahal" },
  { name: "CA District Aerospace Valley", date: "Apr 2–4", href: "https://www.thebluealliance.com/event/2026caasv" },
  { name: "FIRST California Northern State Championship" },
]

const panelHeading = "font-display text-4xl font-extrabold tracking-tight text-[#122350] md:text-5xl"
const navyButton =
  "bg-[#122350] font-display font-bold uppercase tracking-wide text-white hover:bg-[hsl(var(--brand-gold))] hover:text-[#122350]"
const inlineLink = "font-semibold text-[#122350] underline decoration-[hsl(var(--brand-gold))] decoration-2 underline-offset-2 hover:opacity-80"

function PanelPhoto({ src, alt }: { src: string; alt: string }) {
  return <Image src={src} alt={alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
}

export default function TeamSection() {
  // Same Strapi "about-us" photo as the home hero, the only two places the team photo appears.
  const { media, loading } = useDynamicMedia({ location: "about-us", limit: 1 })
  const strapiPhoto = media?.[0] ? getStrapiMediaUrl(media[0].image) : null
  const teamPhoto = loading ? null : strapiPhoto || TEAM_PHOTO_FALLBACK

  return (
    <>
      <section className="relative overflow-hidden bg-[#122350] pb-16 pt-32 md:pb-20 md:pt-36">
        <NumeralWatermark />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            About <span className="text-[hsl(var(--brand-gold))]">7419 QLS Tech Support</span>
          </h1>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/80 [text-wrap:pretty]">
            <p>
              7419 QLS Tech Support is a student-led <em>FIRST</em> Robotics Competition team from
              The Quarry Lane School in Dublin, California. We&apos;re much more than a robotics team.
              We solve problems, help people, and treat each other like family.
            </p>
            <p>
              Our programmers write Java for complex behaviors and autonomous routines, our mechanical
              team fabricates custom parts on CNC machines and manual mills, and our electrical team
              wires the control systems and sensors that bring the robot to life.
            </p>
          </div>
          <p className="mt-6 text-white/80 [text-wrap:balance]">
            Younger students can get started on one of the FLL and FTC teams we mentor.{" "}
            <Link href="/outreach" className="font-semibold text-[hsl(var(--brand-gold))] underline underline-offset-2">
              See our impact
            </Link>
            .
          </p>
        </div>
      </section>

      <SplitPanel media={teamPhoto && <PanelPhoto src={teamPhoto} alt="Team 7419" />}>
        <h2 className={panelHeading}>Our Mission</h2>
        <p className="mt-6 leading-relaxed text-[#122350]/80 [text-wrap:pretty]">
          7419 QLS Tech Support instills technical expertise and collaboration in every member of
          our student-led team. We are a supportive, dedicated family that gives back to the community
          with the skills we gain through <em>FIRST</em> Robotics, and every day, we work to become
          the leaders of tomorrow.
        </p>
        <Button size="lg" asChild className={`${navyButton} mt-8`}>
          <Link href="/outreach">Our Impact</Link>
        </Button>
      </SplitPanel>

      <section className="bg-[#122350] py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
            Our Core Values
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {CORE_VALUES.map((value) => (
              <li
                key={value.title}
                className="group flex min-h-[13rem] flex-col items-center justify-center border border-[hsl(var(--brand-gold))]/70 p-8 text-center transition-colors duration-300 hover:bg-[hsl(var(--brand-gold))]"
              >
                <h3 className="font-display text-xl font-bold uppercase tracking-[0.15em] text-white transition-colors duration-300 group-hover:text-[#122350]">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/75 transition-colors duration-300 group-hover:text-[#122350]">
                  {value.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SplitPanel
        mediaSide="right"
        media={<PanelPhoto src="/static/media2026/ftc-award-plaques.jpg" alt="Award plaques lined up at an FTC tournament" />}
      >
        <h2 className={panelHeading}>Awards</h2>
        <ul className="mt-6 space-y-1.5 text-sm">
          {AWARDS.map((item) => (
            <li key={`${item.year}-${item.award}-${item.event}`}>
              <span className="font-bold">{item.year}</span> {item.award}, <em>{item.event}</em>
              {item.banner && (
                <Flag aria-label="Blue banner" className="ml-1 inline h-3.5 w-3.5 fill-[hsl(var(--brand-gold))] text-[hsl(var(--brand-gold))]" />
              )}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm">
          <span className="font-bold">
            <em>FIRST</em> Championship divisions:
          </span>{" "}
          {CHAMPIONSHIPS.join(" · ")}
        </p>
        <Button size="lg" asChild className={`${navyButton} mt-8`}>
          <a href="https://www.thebluealliance.com/team/7419" target="_blank" rel="noopener noreferrer">
            7419 on The Blue Alliance
          </a>
        </Button>
      </SplitPanel>

      <SplitPanel media={<PanelPhoto src={SEASON_PHOTOS.teamWithRobot} alt="Team 7419 with our 2026 robot, alongside Team 2473" />}>
        <h2 className={panelHeading}>Our Seasons</h2>
        <ul className="mt-6 grid gap-y-1.5 text-sm sm:grid-cols-2 sm:gap-x-6">
          {SEASONS.map((season) => (
            <li key={season.year}>
              <span className="font-bold">{season.year}</span>:{" "}
              {season.href ? (
                <Link href={season.href} className={inlineLink}>
                  {season.game}
                </Link>
              ) : (
                season.game
              )}
            </li>
          ))}
        </ul>
        <h3 className="mt-8 font-display text-sm font-bold uppercase tracking-wide">2026 Events</h3>
        <ul className="mt-2 space-y-1 text-sm">
          {EVENTS_2026.map((event) => (
            <li key={event.name}>
              {event.href ? (
                <a href={event.href} target="_blank" rel="noopener noreferrer" className={inlineLink}>
                  {event.name}
                </a>
              ) : (
                event.name
              )}
              {event.date && <span className="text-[#122350]/70"> · {event.date}</span>}
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button size="lg" asChild className={navyButton}>
            <a href="https://github.com/frc-7419" target="_blank" rel="noopener noreferrer">
              7419 on GitHub
            </a>
          </Button>
          <Button size="lg" asChild className={navyButton}>
            <Link href="/robot">Our 2026 Robot</Link>
          </Button>
        </div>
      </SplitPanel>

      <SplitPanel
        mediaSide="right"
        media={<PanelPhoto src="/static/media2026/ftc-teams-field.jpg" alt="FTC teams at the field during a tournament" />}
      >
        <h2 className={panelHeading}>Mentorship</h2>
        <p className="mt-6 leading-relaxed text-[#122350]/80 [text-wrap:pretty]">
          Since 2023, we&apos;ve mentored 13 FLL and FTC teams and started 7 of our own, including 4
          all-girls teams.
        </p>
        <dl className="mt-6 space-y-3 text-sm">
          <div>
            <dt className="font-display font-bold uppercase tracking-wide">FLL Teams</dt>
            <dd className="mt-1 text-[#122350]/80">
              QLS MiniBytes, MegaBytes, CloudBots, PoppeBots, HopperBots, 5-G, Creators, and FlashBots
            </dd>
          </div>
          <div>
            <dt className="font-display font-bold uppercase tracking-wide">FTC Teams</dt>
            <dd className="mt-1 text-[#122350]/80">B.R.O., QLS RaD Team, Control+Q, HotsBots, Glitch, Innovix, and more</dd>
          </div>
        </dl>
        <p className="mt-6 text-sm leading-relaxed text-[#122350]/80 [text-wrap:pretty]">
          Our all-girls teams HotsBots and Innovix reflect our commitment to diversity in STEM. Innovix
          is an official #FIRSTLikeAGirl ambassador team and Society of Women Engineers chapter.
        </p>
        <Button size="lg" asChild className={`${navyButton} mt-8`}>
          <Link href="/outreach">Learn More</Link>
        </Button>
      </SplitPanel>

      <SectionDivider />
      <div className="relative h-[45vh] min-h-[18rem] overflow-hidden bg-navy-alt">
        <Image
          src={SEASON_PHOTOS.halfMoonBayPits}
          alt="Team members moving our robot through the pits at CA District Half Moon Bay"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </>
  )
}
