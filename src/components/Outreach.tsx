'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Users, Trophy, Rocket, Globe2, HeartHandshake, HandHeart, Recycle } from 'lucide-react'
import ImpactStats from './ImpactStats'
import { SectionEyebrow } from '@/components/ui/section-eyebrow'
import { NumeralWatermark } from '@/components/ui/numeral-watermark'
import { GoalCard } from '@/components/ui/goal-card'

// Photos from the Impact Binder 2026 and the 2026 team media folder.
const gallery = [
    { src: '/static/outreach/girl-scouts.jpg', alt: 'Showing a Girl Scout troop the machine shop', span: 'sm:col-span-2 sm:row-span-2' },
    { src: '/static/outreach/ftc-tournament.jpg', alt: 'FTC league meet hosted in the Quarry Lane gym', span: 'sm:col-span-2' },
    { src: '/static/media2026/ftc-volunteers.jpg', alt: 'Team 7419 volunteers at the Feb 8 FTC tournament', span: '' },
    { src: '/static/outreach/genius-kids-1.jpg', alt: 'Teaching STEAMBOT at Genius Kids', span: '' },
    { src: '/static/outreach/pushcart-derby.jpg', alt: "Boy Scouts' Annual Pushcart Derby", span: '' },
    { src: '/static/outreach/python-workshop.jpg', alt: 'Python workshop at the Dublin Library', span: '' },
    { src: '/static/outreach/steambot-india.jpg', alt: 'Project STEAMBOT reaching students in India', span: 'sm:col-span-2' },
    { src: '/static/outreach/ftc-launch-party.jpg', alt: "Hosting FRC 7419's FTC game launch party", span: '' },
    { src: '/static/outreach/genius-kids-2.jpg', alt: 'A Genius Kids student exploring robotics', span: '' },
    { src: '/static/media2026/ftc-awards-ceremony.jpg', alt: 'Announcing awards at the Feb 8 FTC tournament', span: '' },
]

// Program facts sourced from the 7419 Impact Binder 2026, update alongside that document.
const pillars = [
    {
        icon: Users,
        title: 'FLL & FTC Mentoring',
        description: "Since 2023 we've mentored 13 FLL and FTC teams and started 7 of our own, meeting twice a week to teach technical skills alongside Gracious Professionalism.",
    },
    {
        icon: Trophy,
        title: 'Tournament Hosting',
        description: "We've hosted 13 FTC and 4 FLL events over the past four years, bringing 30+ local teams together to compete, troubleshoot, and share ideas.",
    },
    {
        icon: Rocket,
        title: 'Summer Robotics Camp',
        description: 'Since 2024, our week-long SRC has taught 50+ elementary students CAD, programming, and robot driving, and 13 campers have gone on to join FRC teams.',
    },
    {
        icon: Globe2,
        title: 'Project STEAMBOT',
        description: 'Our free online robotics course, built on LEGO Boost and Makeblock kits, has reached 1,150+ students across 100 countries, from India to Brazil to Ukraine.',
    },
    {
        icon: HeartHandshake,
        title: '#FIRSTLikeAGirl',
        description: "We've founded 4 active all-girls FLL/FTC teams and serve as menstrual equity program ambassadors alongside FRC Team 1902 Space Cookies at regional events.",
    },
    {
        icon: HandHeart,
        title: 'Local Community',
        description: "From Girl Scout and Boy Scout workshops to weekly lessons at Shepherd's Gate shelter, we bring hands-on STEM directly to our Dublin-area neighbors.",
    },
    {
        icon: Recycle,
        title: 'Sustainability Projects',
        description: 'Project Intellikits distributed 200+ 3D-printed physics kits with WHS Robotics, and Coral Cleanup repurposed retired REEFSCAPE field elements into birdhouses with Team 1086.',
    },
]

export default function Outreach() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6, ease: 'easeOut' },
    }

    return (
        <section className="relative min-h-screen overflow-hidden bg-[#122350]">
            <NumeralWatermark />
            <div className="container relative mx-auto max-w-6xl px-4 pb-20 pt-32 sm:px-6 md:pt-36 lg:px-8">
                {/* Intro + mission quote */}
                <motion.div {...fadeInUp} className="mx-auto max-w-3xl text-center">
                    <SectionEyebrow className="mb-3">Giving Back</SectionEyebrow>
                    <h1 className="font-display text-5xl font-extrabold tracking-tight text-white lg:text-6xl xl:text-7xl">
                        Outreach &amp; Impact
                    </h1>
                    <p className="mt-8 font-display text-xl italic text-white/90 md:text-2xl">
                        &ldquo;Team 7419 aims to empower younger generations with the skills and opportunities we have
                        gained from <span className="not-italic">FIRST</span> in order to open new doors for them in
                        STEM, regardless of gender, race, or socioeconomic background.&rdquo;
                    </p>
                    <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
                        Our 85 students and 3 mentors have contributed over 10,000 service hours and reached more
                        than 10,000 individuals over the past seven seasons, because we believe lasting impact
                        starts with one small thing.
                    </p>
                </motion.div>

                {/* Impact stats */}
                <motion.div {...fadeInUp}>
                    <ImpactStats />
                </motion.div>

                {/* Program pillars */}
                <motion.div {...fadeInUp} className="mb-8 text-center">
                    <SectionEyebrow as="h2">What We Do</SectionEyebrow>
                </motion.div>
                <motion.div
                    {...fadeInUp}
                    className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {pillars.map((pillar) => (
                        <GoalCard
                            key={pillar.title}
                            icon={pillar.icon}
                            title={pillar.title}
                            description={pillar.description}
                        />
                    ))}
                </motion.div>

                {/* Photo evidence, bento gallery of real program photos */}
                <motion.div {...fadeInUp} className="mb-8 mt-16 text-center">
                    <SectionEyebrow as="h2">In the Field</SectionEyebrow>
                </motion.div>
                <motion.div
                    {...fadeInUp}
                    className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:grid-cols-4"
                >
                    {gallery.map((photo) => (
                        <div
                            key={photo.src}
                            className={`relative overflow-hidden rounded-xl shadow-lg ${photo.span}`}
                        >
                            <Image
                                src={photo.src}
                                alt={photo.alt}
                                fill
                                className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    ))}
                </motion.div>

                {/* Advocacy closing */}
                <motion.div {...fadeInUp} className="mx-auto mt-16 max-w-3xl text-center">
                    <SectionEyebrow className="mb-3">Beyond the Workshop</SectionEyebrow>
                    <h2 className="font-display text-3xl font-extrabold text-white">
                        Advocating for STEM, Statewide
                    </h2>
                    <p className="mt-4 text-white/70">
                        This summer, 7419 will represent California at the Student Association for STEM Advocacy&apos;s
                        National Advocacy Conference in Washington, D.C., meeting with legislators to expand
                        statewide STEM funding and access to programs like <span className="italic">FIRST</span>.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}
