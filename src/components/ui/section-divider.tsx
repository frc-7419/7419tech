import { cn } from "@/lib/utils"

/**
 * Repeating gear-tooth strip used between sections, our engineering-themed
 * answer to the ornamental dividers on other team sites.
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("h-3 w-full", className)}
      style={{
        backgroundColor: "#122350",
        backgroundImage:
          "repeating-linear-gradient(135deg, #FFB419 0, #FFB419 6px, #122350 6px, #122350 12px)",
      }}
    />
  )
}
