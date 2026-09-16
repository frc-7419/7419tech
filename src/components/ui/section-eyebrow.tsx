import { cn } from "@/lib/utils"

interface SectionEyebrowProps {
  className?: string
  children: React.ReactNode
  /** Use "h2" when the eyebrow is the only title for its section, so heading order stays intact. */
  as?: "p" | "h2"
}

export function SectionEyebrow({ className, children, as: Tag = "p" }: SectionEyebrowProps) {
  return <Tag className={cn("eyebrow text-sm", className)}>{children}</Tag>
}
