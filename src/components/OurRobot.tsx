import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import { NumeralWatermark } from "@/components/ui/numeral-watermark"
import { SectionDivider } from "@/components/ui/section-divider"
import { FeatureRow } from "@/components/ui/feature-row"
import {
  ANALYSIS_CARDS,
  DESIGN_SECTIONS,
  GAME_ANALYSIS,
  KEY_TAKEAWAYS,
  PROTOTYPES,
  QUICK_SPECS,
  SOFTWARE_SECTIONS,
  STRATEGY_QUESTIONS,
  type BinderSection,
} from "@/components/robot/robot-2026"

function SpecList({ section }: { section: BinderSection }) {
  return (
    <>
      <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white">
        {section.title}
      </h3>
      <p className="mt-3 text-white/70">{section.lead}</p>
      <dl className="mt-6 space-y-5">
        {section.specs.map((spec) => (
          <div key={spec.heading}>
            <dt className="font-display text-sm font-semibold uppercase tracking-wide text-[hsl(var(--brand-gold))]">
              {spec.heading}
            </dt>
            <dd>
              <ul className="mt-1.5 space-y-1.5">
                {spec.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-2.5 text-sm text-white/70">
                    <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[hsl(var(--brand-gold))]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </>
  )
}

export default function OurRobot() {
  return (
    <>
      {/* Hero: the 2026 CAD render is already navy, so it bleeds straight into the page */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#122350] pt-20">
        <Image
          src="/static/robot2026/hero-render.jpg"
          alt="CAD render of Team 7419's 2026 REBUILT robot"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#122350] via-[#122350]/60 to-[#122350]/70" />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 py-16 text-center">
          <SectionEyebrow className="mb-3">REBUILT · 2026 Season</SectionEyebrow>
          <h1 className="font-display text-5xl font-black italic tracking-tight text-white lg:text-7xl">
            Our Robot
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
            A turreted, full-field shooter built around fast, repeatable fuel cycles. Designed,
            prototyped, and programmed by students. Everything below comes from our 2026 technical binder.
          </p>
        </div>
      </section>

      {/* Quick specs band */}
      <section className="border-y border-white/10 bg-navy-alt">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-4 py-10 sm:grid-cols-3 lg:grid-cols-6">
          {QUICK_SPECS.map((spec) => (
            <div key={spec.label} className="text-center">
              <dt className="sr-only">{spec.label}</dt>
              <dd>
                <span className="block font-display text-2xl font-extrabold text-[hsl(var(--brand-gold))]">
                  {spec.value}
                </span>
                <span className="mt-1 block font-display text-[11px] font-semibold uppercase tracking-wide text-white/60">
                  {spec.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Strategy */}
      <section className="relative overflow-hidden bg-[#122350] py-20 md:py-24">
        <NumeralWatermark />
        <div className="relative mx-auto max-w-6xl space-y-16 px-4">
          <div className="text-center">
            <SectionEyebrow className="mb-3">Before The Build</SectionEyebrow>
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white">
              Game Analysis
            </h2>
          </div>

          <FeatureRow image="/static/robot2026/field-analysis.jpg" alt="Render of the 2026 REBUILT field">
            <p className="text-white/70">{GAME_ANALYSIS}</p>
            <h3 className="mt-6 font-display text-sm font-semibold uppercase tracking-wide text-[hsl(var(--brand-gold))]">
              Key takeaways
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {KEY_TAKEAWAYS.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1.5 text-xs text-white/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FeatureRow>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ANALYSIS_CARDS.map((card) => (
              <div
                key={card.heading}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-[hsl(var(--brand-gold))]/40 hover:bg-white/[0.06]"
              >
                <h3 className="font-display text-base font-semibold uppercase tracking-wide text-[hsl(var(--brand-gold))]">
                  {card.heading}
                </h3>
                <ul className="mt-3 space-y-2">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="text-sm text-white/70">
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <FeatureRow
            image="/static/robot2026/strategy-board.jpg"
            alt="The team's 2026 match strategy board"
            plate
            flip
          >
            <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white">
              Strategy Board
            </h3>
            <p className="mt-3 text-white/70">
              Our strategy board maps out match capabilities within each match period, alongside our
              plan for ranking points and scoring. Designing it started with five questions:
            </p>
            <ol className="mt-5 space-y-3">
              {STRATEGY_QUESTIONS.map((question, index) => (
                <li key={question} className="flex gap-3 text-sm text-white/70">
                  <span className="font-display text-sm font-extrabold text-[hsl(var(--brand-gold))]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{question}</span>
                </li>
              ))}
            </ol>
          </FeatureRow>
        </div>
      </section>

      <SectionDivider />

      {/* Design */}
      <section className="relative overflow-hidden bg-[#122350] py-20 md:py-24">
        <div className="relative mx-auto max-w-6xl space-y-20 px-4">
          <div className="text-center">
            <SectionEyebrow className="mb-3">Mechanical</SectionEyebrow>
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white">
              Design
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Six subsystems move fuel from the floor to the hub: a swerve drivebase, a pivoting
              intake, a sprung hopper, a spindexer-and-feeder serializer, a full-rotation turret, and
              a dual-flywheel shooter.
            </p>
          </div>

          <div className="relative">
            <Image
              src="/static/robot2026/robot-overview.png"
              alt="Full CAD render of the 2026 robot showing every mechanism"
              width={1400}
              height={788}
              priority
              className="mx-auto h-auto w-full max-w-4xl"
            />
          </div>

          {/* Prototyping */}
          <div>
            <h3 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white">
              Prototyping
            </h3>
            <p className="mt-3 max-w-3xl text-white/70">
              At the start of the season we built a wooden prototype robot to test key specifications
              and tolerances before committing to final materials. Iterating in laser-cut plywood let
              us find mechanical problems early, while they were still cheap to fix.
            </p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {PROTOTYPES.map((proto) => (
                <figure key={proto.title} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]">
                  <Image
                    src={proto.image}
                    alt={proto.title}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="p-5">
                    <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-[hsl(var(--brand-gold))]">
                      {proto.title}
                    </h4>
                    <p className="mt-2 text-sm text-white/70">{proto.body}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          {DESIGN_SECTIONS.map((section, index) => (
            <FeatureRow
              key={section.id}
              image={section.image}
              alt={`${section.title} CAD render`}
              plate={section.plate}
              flip={index % 2 === 1}
            >
              <SpecList section={section} />
            </FeatureRow>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Software */}
      <section className="relative overflow-hidden bg-navy-alt py-20 md:py-24">
        <div className="relative mx-auto max-w-6xl space-y-20 px-4">
          <div className="text-center">
            <SectionEyebrow className="mb-3">Code</SectionEyebrow>
            <h2 className="font-display text-4xl font-extrabold uppercase tracking-tight text-white">
              Software
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/70">
              Written in Java on AdvantageKit, our code runs identically in simulation and on the
              real robot, so autonomous routines and control loops are debugged long before the
              hardware is wired.
            </p>
          </div>

          {SOFTWARE_SECTIONS.map((section, index) => (
            <FeatureRow
              key={section.id}
              image={section.image}
              alt={`${section.title} software`}
              flip={index % 2 === 1}
            >
              <SpecList section={section} />
            </FeatureRow>
          ))}

        </div>
      </section>

      {/* Closing */}
      <section className="relative overflow-hidden bg-[#122350]">
        <Image
          src="/static/robot2026/competition.jpg"
          alt="Team 7419's robot on the practice field at competition"
          fill
          loading="lazy"
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122350]/80 to-[#122350]/95" />
        <div className="relative z-10 mx-auto max-w-2xl px-4 py-24 text-center">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-tight text-white">
            All of it is open source
          </h2>
          <p className="mt-4 text-white/80">
            Our robot code, scouting tools, and internal apps live on GitHub. Read it, fork it, or
            ask us about it.
          </p>
          <Button
            size="lg"
            className="mt-8 bg-[hsl(var(--brand-gold))] font-display font-semibold uppercase tracking-wide text-[#122350] hover:bg-[hsl(var(--brand-gold))]/90"
            asChild
          >
            <a href="https://github.com/frc-7419" target="_blank" rel="noopener noreferrer">
              See our code
            </a>
          </Button>
        </div>
      </section>
    </>
  )
}
