'use client'

import { useDynamicMedia } from '@/hooks/useDynamicMedia'
import { getStrapiMediaUrl } from '@/lib/strapi/client'
import Image from 'next/image'

interface DynamicMediaProps {
  location: string
  className?: string
  limit?: number
}

export function DynamicMedia({ location, className = '', limit }: DynamicMediaProps) {
  const { media, loading, error } = useDynamicMedia({ location, limit })

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-[#122350]/10 rounded-lg h-48 w-full"></div>
      </div>
    )
  }

  if (error) {
    return null // Fail silently for better UX
  }

  if (!media || media.length === 0) {
    return null // No media to show
  }

  // A single photo gets a wide banner treatment; everything else shares one
  // consistent, symmetric grid of equal-sized tiles regardless of count.
  if (media.length === 1) {
    const item = media[0]
    return (
      <div className={className}>
        <MediaTile item={item} aspect="aspect-[16/9]" />
      </div>
    )
  }

  return (
    <div className={`grid grid-cols-2 gap-4 md:grid-cols-3 ${className}`}>
      {media.map((item) => (
        <MediaTile key={item.id} item={item} aspect="aspect-[4/3]" />
      ))}
    </div>
  )
}

interface MediaItem {
  id: number | string
  image: unknown
  alt_text?: string
  title?: string
  description?: string
}

function MediaTile({ item, aspect }: { item: MediaItem; aspect: string }) {
  // No visible caption - alt text still carries a real description for screen readers.
  const altText = item.alt_text?.trim() || item.title?.trim() || ''

  return (
    <div className={`relative group overflow-hidden rounded-lg bg-[#122350]/5 ${aspect}`}>
      <Image
        src={getStrapiMediaUrl(item.image) || ''}
        alt={altText}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  )
}

/** Same equal-sized, cropped tile as MediaTile, for the plain static image grids below. */
function StaticTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#122350]/5 group">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 33vw, 50vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  )
}

// Enhanced components with fallbacks
export function OurRobotImage() {
  return <DynamicMedia location="our-robot" className="w-full" limit={1} />
}

export function OurCommitmentImages() {
  const { media, loading, error } = useDynamicMedia({ location: 'our-commitment' })
  
  // Fallback image
  const fallbackSrc = "/static/fll_ftc/kickoff.jpg"
  
  if (loading) {
    return <div className="mt-6 bg-[#122350]/10 animate-pulse rounded-lg h-48"></div>
  }
  
  // Use dynamic media if available, otherwise show fallback
  if (!media || media.length === 0) {
    return (
      <div className="mt-6 relative group overflow-hidden rounded-lg">
        <Image
          src={fallbackSrc}
          alt="Team members engaged in outreach activities"
          width={800}
          height={600}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )
  }
  
  return <DynamicMedia location="our-commitment" className="mt-6" />
}

export function FllFtcSupportImages() {
  const { media, loading, error } = useDynamicMedia({ location: 'fll-ftc-support' })
  
  // Fallback image  
  const fallbackSrc = "/static/fll_ftc/DSC07546.JPEG"
  
  if (loading) {
    return <div className="mt-6 bg-[#122350]/10 animate-pulse rounded-lg h-48"></div>
  }
  
  // Use dynamic media if available, otherwise show fallback
  if (!media || media.length === 0) {
    return (
      <div className="mt-6 relative group overflow-hidden rounded-lg">
        <Image
          src={fallbackSrc}
          alt="FLL and FTC teams in action"
          width={800}
          height={600}
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )
  }
  
  return <DynamicMedia location="fll-ftc-support" className="mt-6" />
}

// From the East Bay League Tournament (FTC) we hosted Feb 8 - the CMS-managed
// competition photos above only cover Half Moon Bay, so these round out the season.
const SEASON_2025_EXTRA_PHOTOS = [
  {
    src: "/static/media2026/ftc-tournament-field-setup.jpg",
    alt: "Team 7419 members setting up the playing field before the East Bay League Tournament",
  },
  {
    src: "/static/media2026/ftc-tournament-emcee.jpg",
    alt: "Team 7419 members emceeing awards at the East Bay League Tournament",
  },
  {
    src: "/static/media2026/ftc-tournament-match-action.jpg",
    alt: "FTC teams competing on the field at the East Bay League Tournament hosted by Team 7419",
  },
  {
    src: "/static/media2026/ftc-tournament-team-support.jpg",
    alt: "A visiting FTC team getting their robot ready as a match starts at the East Bay League Tournament",
  },
]

// id 53 shows another team's robot with no 7419 presence (flagged as wrong). 32 is a
// near-duplicate of the 971 Scrimmage shot at 30, dropped to land on an even 3x3 grid
// together with the 4 photos above (id 44 is an inactive duplicate Strapi already excludes).
const SEASON_2025_EXCLUDED_IDS = new Set<number | string>([53, 32])

export function SeasonMedia2025() {
  const { media, loading } = useDynamicMedia({ location: 'season-2025-2026' })

  if (loading) {
    return <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {[1,2,3].map(i => <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-[#122350]/10"></div>)}
    </div>
  }

  const filtered = media?.filter((item) => !SEASON_2025_EXCLUDED_IDS.has(item.id)) || []

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {filtered.map((item) => (
        <MediaTile key={item.id} item={item} aspect="aspect-[4/3]" />
      ))}
      {SEASON_2025_EXTRA_PHOTOS.map((photo) => (
        <StaticTile key={photo.src} src={photo.src} alt={photo.alt} />
      ))}
    </div>
  )
}

// Fallback photos - Capital City Classic 2024 (used only if the CMS has nothing for this season yet)
const CCC_2024_PHOTOS = [
  "/static/comps/ccc2024/20241026_112449.jpg",
  "/static/comps/ccc2024/20241026_163310.jpg",
  "/static/comps/ccc2024/IMG_9638.jpg",
  "/static/comps/ccc2024/IMG_9648.jpg",
  "/static/comps/ccc2024/IMG_9707.jpg",
]

export function SeasonMedia2024() {
  const { media, loading } = useDynamicMedia({ location: 'season-2024-2025' })

  if (loading) {
    return <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {[1,2,3,4,5].map(i => <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-[#122350]/10"></div>)}
    </div>
  }

  // Custom render for fallback
  if (!media || media.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {CCC_2024_PHOTOS.map((src, index) => (
          <StaticTile key={index} src={src} alt={`Team 7419 at Capital City Classic 2024`} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {media.map((item) => (
        <MediaTile key={item.id} item={item} aspect="aspect-[4/3]" />
      ))}
    </div>
  )
}

// Fallback photos - FIRST Championship and Silicon Valley Regional 2024 (used only if the
// CMS has nothing for this season yet). One flat grid, same as every other season tab.
const CHAMPS_SVR_2024_PHOTOS = [
  { src: "/static/comps/champs2024/DSC06887.JPG", event: "FIRST Championship 2024" },
  { src: "/static/comps/champs2024/DSC06924.JPG", event: "FIRST Championship 2024" },
  { src: "/static/comps/champs2024/DSC06941.JPG", event: "FIRST Championship 2024" },
  { src: "/static/comps/champs2024/IMG_6749.JPG", event: "FIRST Championship 2024" },
  { src: "/static/comps/champs2024/IMG_6754.png", event: "FIRST Championship 2024" },
  { src: "/static/comps/svr2024/image.png", event: "Silicon Valley Regional 2024" },
  { src: "/static/comps/svr2024/img1.png", event: "Silicon Valley Regional 2024" },
  { src: "/static/comps/svr2024/img2.png", event: "Silicon Valley Regional 2024" },
  { src: "/static/comps/svr2024/img4.png", event: "Silicon Valley Regional 2024" },
]

export function SeasonMedia2023() {
  const { media, loading } = useDynamicMedia({ location: 'season-2023-2024' })

  if (loading) {
    return <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {[1,2,3,4,5,6,7,8,9].map(i => <div key={i} className="aspect-[4/3] animate-pulse rounded-lg bg-[#122350]/10"></div>)}
    </div>
  }

  if (!media || media.length === 0) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        {CHAMPS_SVR_2024_PHOTOS.map((photo, index) => (
          <StaticTile key={index} src={photo.src} alt={`Team 7419 at the ${photo.event}`} />
        ))}
      </div>
    )
  }

  return <DynamicMedia location="season-2023-2024" />
}

export function HomePageSlideshow() {
  return <DynamicMedia location="home-page" className="w-full h-full" />
}
