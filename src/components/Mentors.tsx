import Image from "next/image"
import NextLink from "next/link"
import { Button } from "./ui/button"
import { PagePhotoHeader } from "@/components/ui/page-photo-header"

// TODO: add each mentor's role/department once available.
const mentors = [
    { name: "Ainsley Laing", photo: "/static/mentors/ainsley.jpeg" },
    { name: "Leon Cox", photo: "/static/mentors/leon.jpg" },
    { name: "Lina Tannous", photo: "/static/mentors/lina.jpg" },
    { name: "Ramana Cherukuri", photo: "/static/mentors/ramana.jpg" },
]

const navyButton =
    "bg-[#122350] font-display font-bold uppercase tracking-wide text-white hover:bg-[hsl(var(--brand-gold))] hover:text-[#122350]"

export default function Mentors() {
    return (
        <>
            <PagePhotoHeader
                photo="/static/media2026/ftc-judging.jpg"
                eyebrow="Guided By Experience"
                title="Our Mentors"
                description="7419 QLS Tech Support strives to instill technical expertise and collaboration into every member on our student-led team. We are a supportive and dedicated family that works together to give back to the community with the skills gained through the FIRST Robotics Competition program."
            />

            <section aria-labelledby="mentor-list-heading" className="bg-[#122350] py-16 md:py-20">
                <h2 id="mentor-list-heading" className="sr-only">Meet our mentors</h2>
                <ul className="mx-auto grid max-w-5xl grid-cols-2 gap-x-8 gap-y-12 px-4 md:grid-cols-4">
                    {mentors.map((mentor) => (
                        <li key={mentor.name} className="group text-center">
                            <div className="relative mx-auto aspect-square w-full max-w-[13rem] overflow-hidden rounded-full border-4 border-[hsl(var(--brand-gold))]/70 bg-navy-alt transition-colors duration-300 group-hover:border-[hsl(var(--brand-gold))]">
                                <Image
                                    src={mentor.photo}
                                    alt={mentor.name}
                                    fill
                                    sizes="(min-width: 768px) 13rem, 45vw"
                                    className="object-cover"
                                />
                            </div>
                            <h3 className="mt-5 font-display text-xl font-bold text-white">{mentor.name}</h3>
                            <p className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.15em] text-[hsl(var(--brand-gold))]">
                                Mentor
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="bg-white py-16 md:py-20">
                <div className="mx-auto grid max-w-5xl gap-12 px-4 text-center text-[#122350] md:grid-cols-2 md:divide-x md:divide-[#122350]/10">
                    <div className="md:px-10">
                        <h2 className="font-display text-3xl font-bold">Our Robot</h2>
                        <p className="mx-auto mt-4 max-w-sm text-[#122350]/75">
                            See how our students designed, prototyped, and programmed our 2026 REBUILT robot.
                        </p>
                        <Button size="lg" asChild className={`${navyButton} mt-6`}>
                            <NextLink href="/robot">View Our Robot</NextLink>
                        </Button>
                    </div>
                    <div className="md:px-10">
                        <h2 className="font-display text-3xl font-bold">Get Involved</h2>
                        <p className="mx-auto mt-4 max-w-sm text-[#122350]/75">
                            Whether you&apos;re a student, mentor, or sponsor, there are many ways to support our mission.
                        </p>
                        <Button size="lg" asChild className={`${navyButton} mt-6`}>
                            <NextLink href="/contact">Join Us</NextLink>
                        </Button>
                    </div>
                </div>
            </section>
        </>
    )
}
