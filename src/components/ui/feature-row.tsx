import Image from "next/image"
import { cn } from "@/lib/utils"

interface FeatureRowProps {
  image: string
  alt: string
  /** Renders with a white background behind it (for CAD plates and logos shot on white). */
  plate?: boolean
  /** Put the image on the right instead of the left. */
  flip?: boolean
  children: React.ReactNode
}

/** Alternating photo-and-copy row, the repeating editorial unit used across the site. */
export function FeatureRow({ image, alt, plate = false, flip = false, children }: FeatureRowProps) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-white/10",
          plate ? "bg-white p-4" : "",
          flip && "md:order-2"
        )}
      >
        <Image
          src={image}
          alt={alt}
          width={1400}
          height={900}
          loading="lazy"
          className={cn("h-auto w-full", plate ? "object-contain" : "object-cover")}
        />
      </div>
      <div className={cn(flip && "md:order-1")}>{children}</div>
    </div>
  )
}
