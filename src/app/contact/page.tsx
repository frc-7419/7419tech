import { PageShell } from "@/components/PageShell"
import { PagePhotoHeader } from "@/components/ui/page-photo-header"
import { ContactForm } from "@/components/contact/ContactForm"
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, SCHOOL_ADDRESS, SCHOOL_NAME, TEAM_EMAIL } from "@/lib/team-contact"

const detailLabel = "font-display text-xs font-bold uppercase tracking-[0.15em] text-[hsl(var(--brand-gold))]"
const detailLink =
  "mt-1 inline-block text-lg text-white underline decoration-[hsl(var(--brand-gold))]/60 underline-offset-4 transition-colors hover:text-[hsl(var(--brand-gold))]"

export default function ContactPage() {
  return (
    <PageShell>
      <PagePhotoHeader
        photo="/static/media2026/ftc-pits.jpg"
        eyebrow="Get In Touch"
        title="Contact Us"
        description="Questions about joining, sponsoring, mentoring, or our outreach programs? Send us a message and our student leadership team will get back to you."
      />
      <section className="grid border-t-4 border-[hsl(var(--brand-gold))] md:grid-cols-2">
        <div className="bg-navy-alt px-6 py-16 md:px-12 md:py-20 lg:px-20">
          <h2 className="font-display text-3xl font-bold text-white">7419 QLS Tech Support</h2>
          <dl className="mt-8 space-y-7">
            <div>
              <dt className={detailLabel}>Email</dt>
              <dd>
                <a href={`mailto:${TEAM_EMAIL}`} className={detailLink}>
                  {TEAM_EMAIL}
                </a>
              </dd>
            </div>
            <div>
              <dt className={detailLabel}>Instagram</dt>
              <dd>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={detailLink}>
                  {INSTAGRAM_HANDLE}
                </a>
              </dd>
            </div>
            <div>
              <dt className={detailLabel}>Location</dt>
              <dd className="mt-1 text-lg text-white/85">
                {SCHOOL_NAME}
                <br />
                {SCHOOL_ADDRESS}
              </dd>
            </div>
          </dl>
        </div>
        <div className="border-t-4 border-[hsl(var(--brand-gold))] bg-white px-6 py-16 md:border-l-4 md:border-t-0 md:px-12 md:py-20 lg:px-20">
          <h2 className="font-display text-3xl font-bold text-[#122350]">Send us a message</h2>
          <ContactForm />
        </div>
      </section>
    </PageShell>
  )
}
