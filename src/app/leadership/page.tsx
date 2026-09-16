import Image from "next/image"
import { UserRound } from "lucide-react"
import { PageShell } from "@/components/PageShell"
import { NumeralWatermark } from "@/components/ui/numeral-watermark"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { LEADERSHIP_GROUPS, type LeadershipRole } from "@/components/leadership/leadership-structure"

function LeaderCard({ role }: { role: LeadershipRole }) {
  return (
    <li className="w-40 text-center">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border-2 border-[hsl(var(--brand-gold))]/60 bg-navy-alt">
        {role.photo ? (
          <Image src={role.photo} alt={role.name || role.title} fill sizes="11rem" className="object-cover" />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-white/70">
            <UserRound aria-hidden className="h-12 w-12" />
            <span className="text-xs uppercase tracking-wider">Photo coming soon</span>
          </div>
        )}
      </div>
      <p className="mt-3 font-display text-lg font-bold leading-tight text-[#122350]">{role.name || "To be announced"}</p>
      <p className="mt-1 font-display text-xs font-semibold uppercase tracking-wide text-[#122350]/70">
        {role.title}
        {role.optional && " (optional)"}
      </p>
    </li>
  )
}

export default function Leadership() {
  return (
    <PageShell>
      <section className="relative overflow-hidden bg-[#122350] pb-16 pt-32 md:pb-20 md:pt-36">
        <NumeralWatermark />
        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <SectionEyebrow className="mb-3">Student-Led, Mentor-Guided</SectionEyebrow>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white md:text-6xl">Student Leadership</h1>
          <p className="mt-6 text-lg text-white/80">
            Team operations at 7419 QLS Tech Support are entirely student-led. Meet the students leading each part of
            the team.
          </p>
        </div>
      </section>

      <section aria-label="Leadership roster" className="bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl space-y-16 px-4">
          {LEADERSHIP_GROUPS.map((group) => (
            <div key={group.name}>
              <h2 className="text-center font-display text-2xl font-bold text-[#122350] md:text-3xl">{group.name}</h2>
              <div aria-hidden className="mx-auto mt-3 h-1 w-12 bg-[hsl(var(--brand-gold))]" />
              <ul className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-10">
                {group.roles.map((role) => (
                  <LeaderCard key={role.title} role={role} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
