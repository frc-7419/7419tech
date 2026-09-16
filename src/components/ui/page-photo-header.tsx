import Image from "next/image"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"

interface PagePhotoHeaderProps {
  photo: string
  eyebrow: string
  title: string
  description?: string
  /** Shorter header for pages where the content below (not the header photo) is the main event. */
  compact?: boolean
}

/** Photo band + navy overlay + heading, the consistent per-page opener used across the site. */
export function PagePhotoHeader({ photo, eyebrow, title, description, compact = false }: PagePhotoHeaderProps) {
  return (
    <section
      className={`relative flex items-center justify-center overflow-hidden pt-20 ${compact ? "" : "min-h-[45vh]"}`}
    >
      <Image src={photo} alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#122350]/85 via-[#122350]/80 to-[#122350]" />
      <div className={`relative z-10 mx-auto max-w-3xl px-4 text-center ${compact ? "py-8" : "py-12"}`}>
        <SectionEyebrow className="mb-3">{eyebrow}</SectionEyebrow>
        <h1 className="font-display text-5xl font-extrabold tracking-tight text-white lg:text-6xl">{title}</h1>
        {description && <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">{description}</p>}
      </div>
    </section>
  )
}
