import { cn } from "@/lib/utils"

interface SplitPanelProps {
  /** Usually a `fill` next/image; the cell is `relative` and sized for it. */
  media: React.ReactNode
  mediaSide?: "left" | "right"
  children: React.ReactNode
}

/** Edge-to-edge half photo, half white copy panel. */
export function SplitPanel({ media, mediaSide = "left", children }: SplitPanelProps) {
  return (
    <section className="grid md:grid-cols-2">
      <div
        className={cn(
          "relative min-h-[20rem] overflow-hidden bg-navy-alt md:min-h-[34rem]",
          mediaSide === "right" && "md:order-2"
        )}
      >
        {media}
      </div>
      <div
        className={cn(
          "flex items-center justify-center bg-white px-6 py-16 text-center text-[#122350] md:px-12",
          mediaSide === "right" && "md:order-1"
        )}
      >
        <div className="w-full max-w-lg">{children}</div>
      </div>
    </section>
  )
}
