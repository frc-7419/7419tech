import { cn } from "@/lib/utils"

interface PennantBadgeProps {
  title: string
  subtitle: string
  className?: string
}

/** Ribbon-shaped achievement badge, the "trophy case" flair pattern from team sports sites. */
export function PennantBadge({ title, subtitle, className }: PennantBadgeProps) {
  return (
    <div
      className={cn(
        "pennant-badge flex w-28 flex-col items-center bg-[hsl(var(--brand-gold))] px-2 pb-4 pt-3 text-center shadow-lg",
        className
      )}
    >
      <span className="font-display text-lg font-extrabold leading-none text-[#122350]">{title}</span>
      <span className="mt-1 font-display text-[10px] font-semibold uppercase leading-tight tracking-wide text-[#122350]/80">
        {subtitle}
      </span>
    </div>
  )
}
