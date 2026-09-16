import Image from "next/image"
import Link from "next/link"
import { Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SectionDivider } from "@/components/ui/section-divider"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { cn } from "@/lib/utils"
import { SEASON_PHOTOS } from "@/lib/season-photos"
import { NewsletterForm } from "./NewsletterForm"

const INSTAGRAM_URL = "https://www.instagram.com/7419tech/"

const goldButton =
  "bg-[hsl(var(--brand-gold))] font-display font-bold uppercase tracking-wide text-[#122350] hover:bg-[hsl(var(--brand-gold))]/90"
const outlineButton =
  "border-white/60 bg-transparent font-display font-bold uppercase tracking-wide text-white hover:bg-white hover:text-[#122350]"
const navyButton =
  "bg-[#122350] font-display font-bold uppercase tracking-wide text-white hover:bg-[hsl(var(--brand-gold))] hover:text-[#122350]"

/** Centered emblem, headline, three-paragraph story, and two CTAs. */
export function HomeIntro() {
  return (
    <section className="bg-[#122350]">
      <SectionDivider />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center md:py-28">
        {/* Logo is 641×389, keep its aspect ratio. */}
        <Image src="/Logo.png" alt="" width={185} height={112} className="mx-auto h-28 w-auto" style={{ width: "auto" }} />
        <h2 className="mt-8 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Get to know <span className="text-[hsl(var(--brand-gold))]">7419 QLS Tech Support</span>
        </h2>
        <div className="mt-8 space-y-5 text-lg leading-relaxed text-white/80 [text-wrap:pretty]">
          <p>
            We are 7419 QLS Tech Support, a student-led <em>FIRST</em> Robotics
            Competition team of 85 students from The Quarry Lane School in Dublin, California. Since
            our founding in 2018, we&apos;ve competed at the <em>FIRST</em> World Championship three
            times.
          </p>
          <p>
            Our 2026 <em>REBUILT</em> season took us to the CA District Half Moon Bay and Aerospace
            Valley events with a turreted, full-field shooter that students designed, prototyped, and
            programmed themselves.
          </p>
          <p>
            When we aren&apos;t competing, we&apos;re hosting FTC and FLL league meets for 30+ teams,
            mentoring the 13 FLL and FTC teams we&apos;ve supported since 2023, running our Summer
            Robotics Camp, and teaching robotics to 1,150+ students in 100+ countries through Project
            STEAMBOT.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild className={goldButton}>
            <Link href="/outreach">Our Impact</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className={outlineButton}>
            <Link href="/team">Our History</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

/** Full-width current-season banner. */
export function SeasonBand() {
  return (
    <section className="relative overflow-hidden bg-navy-alt">
      <Image
        src="/static/robot2026/hero-render.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover opacity-60"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#172C64] via-[#172C64]/70 to-[#172C64]/30" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 py-24 text-center md:py-32">
        <SectionEyebrow>2026 Season</SectionEyebrow>
        <h2 className="mt-4 font-display text-6xl font-black uppercase italic tracking-tight text-white md:text-8xl">
          Rebuilt
        </h2>
        <p className="mt-2 font-display text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
          presented by Haas
        </p>
        <Button size="lg" asChild className={cn(goldButton, "mt-8")}>
          <Link href="/robot">Meet Our 2026 Robot</Link>
        </Button>
      </div>
    </section>
  )
}

// Tiles share one row height: text sets it, photos stretch to fill (no fixed aspect on sm+).
const TILE_HEIGHT = "sm:min-h-[20rem] lg:min-h-[22rem]"

interface PhotoTileProps {
  src: string
  alt: string
}

function PhotoTile({ src, alt }: PhotoTileProps) {
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden bg-navy-alt sm:aspect-auto", TILE_HEIGHT)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  )
}

interface TextTileProps {
  logo: React.ReactNode
  dark?: boolean
  children: React.ReactNode
}

function TextTile({ logo, dark = false, children }: TextTileProps) {
  return (
    // items-start: without it the flex column stretches logos to the tile's full width.
    <div
      className={cn(
        "flex flex-col items-start justify-center gap-5 p-8 xl:p-10",
        TILE_HEIGHT,
        dark ? "bg-[#122350]" : "bg-navy-alt"
      )}
    >
      {logo}
      <p className="text-sm leading-relaxed text-white/80 [text-wrap:pretty] xl:text-base">{children}</p>
    </div>
  )
}

/** Edge-to-edge checkerboard of photos and logo/copy tiles explaining FIRST and the team. */
export function FirstGrid() {
  return (
    <section
      aria-label="About FIRST"
      className="grid grid-cols-1 bg-[#122350] sm:grid-cols-2 sm:[&>*:nth-child(2n)]:border-l-2 sm:[&>*:nth-child(2n)]:border-[hsl(var(--brand-gold))] lg:grid-cols-4 lg:[&>*:nth-child(4n+3)]:border-l-2 lg:[&>*:nth-child(4n+3)]:border-[hsl(var(--brand-gold))]"
    >
      <PhotoTile src="/static/media2026/mechanical-mayhem-field.jpg" alt="Team 7419's robot competing at the Mechanical Mayhem offseason event" />
      <TextTile
        dark
        logo={<Image src="/FirstLogo-reverse.png" alt="FIRST" width={85} height={64} className="h-16 w-auto" style={{ width: "auto" }} />}
      >
        <em>FIRST</em> (For Inspiration and Recognition of Science and Technology) is a global
        nonprofit that inspires young people to become science and technology leaders and innovators.
      </TextTile>
      <PhotoTile src="/static/media2026/ftc-match-action.jpg" alt="Robots and referees mid-match at an FTC tournament" />
      <TextTile
        logo={
          <p className="font-display text-2xl font-extrabold uppercase leading-tight text-white">
            <span className="italic">FIRST</span>
            <br />
            Robotics Competition
          </p>
        }
      >
        High school teams design, build, and program competition robots alongside professional
        mentors, gaining real engineering skills, confidence, and leadership experience.
      </TextTile>

      <TextTile
        logo={<Image src="/Logo.png" alt="Team 7419" width={105} height={64} className="h-16 w-auto" style={{ width: "auto" }} />}
      >
        Team 7419 gives Quarry Lane students a place to become engineers, programmers, designers, and
        leaders, and to share what they learn with the community around them.
      </TextTile>
      <PhotoTile src="/static/media2026/ftc-high-fives.jpg" alt="Teams and referees trading high-fives at an FTC tournament" />
      <TextTile
        dark
        logo={
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-2">
            <Image src="/QuarryLaneLogo.png" alt="The Quarry Lane School" width={47} height={48} className="h-full w-auto" style={{ width: "auto" }} />
          </span>
        }
      >
        The Quarry Lane School in Dublin, CA backs <em>FIRST</em> at every level, with 6 FTC and 7 FLL
        teams growing alongside our FRC team.
      </TextTile>
      <PhotoTile src={SEASON_PHOTOS.scrimmageField} alt="Our 2026 robot on the field at the 971 Scrimmage" />
    </section>
  )
}

const SOCIAL_PHOTOS = [
  { src: "/static/robot2026/competition.jpg", alt: "Our 2026 robot on the practice field at competition" },
  { src: "/static/robot2026/proto-hopper.jpg", alt: "Students testing a wooden hopper prototype during build season" },
  { src: "/static/outreach/girl-scouts.jpg", alt: "Showing a Girl Scout troop around our machine shop" },
  { src: SEASON_PHOTOS.halfMoonBayFuel, alt: "Our robot surrounded by fuel at CA District Half Moon Bay" },
  { src: "/static/robot2026/electronics.jpg", alt: "Wiring the robot's electronics during build season" },
  { src: "/static/outreach/steambot-india.jpg", alt: "Project STEAMBOT reaching students in India" },
]

/** Handle, follow CTA, photo grid linking to Instagram, and the newsletter signup row. */
export function SocialSection() {
  return (
    <section className="bg-white py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="font-display text-5xl font-black italic tracking-tight text-[#122350] md:text-6xl">
          #7419tech
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-[#122350]/75">
          Follow @7419tech on Instagram for match days, outreach events, and everything happening in the shop. Tag your posts #frc7419 or #7419tech.
        </p>
        <Button size="lg" asChild className={cn(navyButton, "mt-8")}>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            <Instagram className="mr-2 h-4 w-4" />
            Follow Us
          </a>
        </Button>
        {/* Photos are 3:2 originals, show them uncropped. */}
        <ul className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
          {SOCIAL_PHOTOS.map((photo) => (
            <li key={photo.src}>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[3/2] overflow-hidden rounded-sm bg-navy-alt"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[#122350]/0 transition-colors duration-300 group-hover:bg-[#122350]/30" />
              </a>
            </li>
          ))}
        </ul>
        <div className="mt-16 border-t border-[#122350]/10 pt-12">
          <NewsletterForm />
        </div>
      </div>
    </section>
  )
}
