import { cn } from "@/lib/utils"

/** Giant faint "7419" numeral behind a section header, the team-number flair used across the site. */
export function NumeralWatermark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "numeral-watermark pointer-events-none absolute -right-10 -top-16 hidden select-none text-[20rem] md:block",
        className
      )}
    >
      7419
    </div>
  )
}
