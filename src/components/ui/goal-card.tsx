import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface GoalCardProps {
  title: string
  description: string
  icon?: LucideIcon
  className?: string
}

export function GoalCard({ title, description, icon: Icon, className }: GoalCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[hsl(var(--brand-gold))]/40 hover:bg-white/[0.06]",
        className
      )}
    >
      {Icon && <Icon className="mb-4 h-8 w-8 text-[hsl(var(--brand-gold))]" strokeWidth={1.75} />}
      <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-[hsl(var(--brand-gold))]">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{description}</p>
    </div>
  )
}
