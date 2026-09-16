import Link from "next/link"
import { PageShell } from "@/components/PageShell"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <PageShell>
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-[#122350] px-4 pb-20 pt-32 text-center">
        <p className="eyebrow text-sm">Error 404</p>
        <h1 className="mt-3 font-display text-4xl font-bold text-white md:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-md text-white/75">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            size="lg"
            className="bg-[hsl(var(--brand-gold))] font-display font-bold uppercase tracking-wide text-[#122350] hover:bg-[hsl(var(--brand-gold))]/90"
          >
            <Link href="/">Back to Home</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white/60 bg-transparent font-display font-bold uppercase tracking-wide text-white hover:bg-white hover:text-[#122350]"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </PageShell>
  )
}
