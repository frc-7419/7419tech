import { Trophy } from "lucide-react"

interface AwardRowProps {
  year: string | number
  title: string
}

export function AwardRow({ year, title }: AwardRowProps) {
  return (
    <li className="flex items-center gap-4 border-b border-white/10 py-3 last:border-b-0">
      <Trophy className="h-4 w-4 shrink-0 text-[hsl(var(--brand-gold))]" />
      <span className="font-display text-sm font-semibold text-[hsl(var(--brand-gold))]">{year}</span>
      <span className="text-sm text-white/80">{title}</span>
    </li>
  )
}
