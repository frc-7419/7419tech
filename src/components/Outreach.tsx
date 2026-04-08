'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import ImpactStats from './ImpactStats'
import { OurCommitmentImages, FllFtcSupportImages } from '@/components/DynamicMedia'
import { useOutreachPrograms, OutreachProgram } from '@/hooks/useOutreachPrograms'

const FALLBACK_LOCAL: OutreachProgram[] = [
    { id: 1, name: 'Girl Scouts', description: 'Hosting robotics workshops and STEM activities to inspire young girls in engineering and technology.', category: 'local', image: null, display_order: 0, is_active: true },
    { id: 2, name: 'Boy Scouts', description: 'Running hands-on engineering sessions for Boy Scout troops, teaching teamwork and problem-solving.', category: 'local', image: null, display_order: 1, is_active: true },
    { id: 3, name: 'Pushcart Derby', description: 'Designing and building pushcarts with younger students, combining mechanical engineering with fun.', category: 'local', image: null, display_order: 2, is_active: true },
    { id: 4, name: 'Genius Kids', description: 'Conducting interactive STEM workshops that introduce younger students to the world of robotics.', category: 'local', image: null, display_order: 3, is_active: true },
    { id: 5, name: "Shepherd's Gate", description: 'Partnering with Shepherd\'s Gate shelter to provide STEM education opportunities for underserved youth.', category: 'local', image: null, display_order: 4, is_active: true },
    { id: 6, name: 'IntelliKits', description: 'Building and distributing educational robotics kits to make STEM accessible to more students.', category: 'local', image: null, display_order: 5, is_active: true },
    { id: 7, name: 'Coral Cleanup', description: 'Applying our engineering skills toward environmental conservation through coral reef restoration efforts.', category: 'local', image: null, display_order: 6, is_active: true },
]

const FALLBACK_GLOBAL: OutreachProgram[] = [
    { id: 8, name: 'M-Bot Kits in India', description: 'Shipping and distributing programmable M-Bot robotics kits to schools across India, giving students hands-on STEM experience regardless of location.', category: 'global', image: null, display_order: 0, is_active: true },
    { id: 9, name: 'Project STEAMBOT', description: 'A global initiative to bring STEAM education to underserved communities worldwide through donated robotics kits and virtual mentorship.', category: 'global', image: null, display_order: 1, is_active: true },
]

const FALLBACK_FLAG: OutreachProgram[] = [
    { id: 10, name: '#FIRST Like A Girl', description: 'Our initiative to promote gender diversity in STEM. Through our Society of Women Engineers chapter and all-girls teams like HotsBots and Innovix, we work to close the gender gap in robotics and inspire young women to pursue engineering careers.', category: 'first-like-a-girl', image: null, display_order: 0, is_active: true },
]

function OutreachProgramsGrid({ programs, loading }: { programs: OutreachProgram[], loading: boolean }) {
    if (loading) {
        return (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map(i => (
                    <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-44" />
                ))}
            </div>
        )
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map(program => (
                <Card key={program.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                    {program.image && (
                        <div className="relative aspect-video">
                            <Image
                                src={program.image}
                                alt={program.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}
                    <CardContent className={`${program.image ? 'p-5' : 'p-6'}`}>
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">{program.name}</h4>
                        <p className="text-sm text-gray-600 leading-relaxed">{program.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default function Outreach() {
    const { local, global, firstLikeAGirl, loading } = useOutreachPrograms()

    const localPrograms = loading || local.length === 0 ? FALLBACK_LOCAL : local
    const globalPrograms = loading || global.length === 0 ? FALLBACK_GLOBAL : global
    const flagPrograms = loading || firstLikeAGirl.length === 0 ? FALLBACK_FLAG : firstLikeAGirl

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1.5, ease: "easeOut" }
    };

    return (
        <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#1b2947" }}>
            <div className="container pt-20 md:pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center"
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={fadeInUp.transition}
                >
                    <h1 className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent text-4xl sm:text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl p-3">Empowering Through Outreach</h1>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-10 md:mb-12 leading-relaxed max-w-3xl mx-auto">
                        At the heart of 7419 lies a commitment to outreach.
                        We inspire generations under us, emphasize the impact of robotics, and ignite
                        a passion for STEM across our community.
                    </p>
                </motion.div>

                <motion.div
                    className="mb-16"
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={{ ...fadeInUp.transition, delay: 0.2 }}
                >
                    <Tabs defaultValue="impact" className="w-full">
                        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8 bg-white/10">
                            <TabsTrigger value="impact" className="transition-all duration-300 hover:bg-primary/10 text-gray-300">Our Impact</TabsTrigger>
                            <TabsTrigger value="commitment" className="transition-all duration-300 hover:bg-primary/10 text-gray-300">Our Commitment</TabsTrigger>
                            <TabsTrigger value="fll-ftc" className="transition-all duration-300 hover:bg-primary/10 text-gray-300">FLL & FTC Support</TabsTrigger>
                            <TabsTrigger value="local" className="transition-all duration-300 hover:bg-primary/10 text-gray-300">Local Outreach</TabsTrigger>
                            <TabsTrigger value="global" className="transition-all duration-300 hover:bg-primary/10 text-gray-300">Global Outreach</TabsTrigger>
                            <TabsTrigger value="flag" className="transition-all duration-300 hover:bg-primary/10 text-gray-300">#FIRST Like A Girl</TabsTrigger>
                        </TabsList>

                        <TabsContent value="impact" className="transition-all duration-500 ease-in-out">
                            <Card className="transition-all duration-300 hover:shadow-lg bg-gray-100/90">
                                <CardContent className="p-6">
                                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl text-center text-gray-800">Our Impact</h2>
                                    <ImpactStats />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="commitment" className="transition-all duration-500 ease-in-out">
                            <Card className="transition-all duration-300 hover:shadow-lg bg-gray-100/90">
                                <CardContent className="p-6">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h2 className="mb-6 text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl text-gray-800">Our Commitment</h2>
                                            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                                                Every student in our team pledges to participate in outreach activities.
                                                We extend our knowledge and passion from assisting FLL and FTC teams
                                                to conducting workshops at after-school programs.
                                            </p>
                                            <ul className="list-disc list-inside text-base sm:text-lg text-gray-600 space-y-2">
                                                <li>Mentoring junior robotics teams</li>
                                                <li>Organizing and hosting tournaments</li>
                                                <li>Leading STEM workshops in schools</li>
                                                <li>Engaging with the community at local events and donations</li>
                                            </ul>
                                        </div>
                                        <div className="relative h-64 sm:h-80 rounded-lg overflow-hidden shadow-xl">
                                            <OurCommitmentImages />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="fll-ftc" className="transition-all duration-500 ease-in-out">
                            <Card className="transition-all duration-300 hover:shadow-lg bg-gray-100/90">
                                <CardContent className="p-6">
                                    <h2 className="mb-6 md:mb-8 text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl text-center text-gray-800">FLL & FTC Support</h2>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="relative h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
                                            <FllFtcSupportImages />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-base sm:text-lg text-gray-600 mb-6 leading-relaxed">
                                                Our high school FRC team takes pride in mentoring in our middle school robotics teams.
                                                We share our experience, teaching vital skills in CAD, programming, and the use
                                                of advanced tools like 3D printers and CNC mills for FTC teams.
                                            </p>
                                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                                We&apos;ve successfully hosted both FLL and FTC tournaments, providing more
                                                opportunities for teams to compete and strengthening FIRST&apos;s presence in
                                                the tri-valley area. Our members are involved in all aspects, from planning
                                                to volunteering at these events.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="local" className="transition-all duration-500 ease-in-out">
                            <Card className="transition-all duration-300 hover:shadow-lg bg-gray-100/90">
                                <CardContent className="p-6">
                                    <h2 className="mb-6 md:mb-8 text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl text-center text-gray-800">Local STEM Outreach</h2>
                                    <p className="text-base sm:text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
                                        We bring STEM education directly into our community through hands-on workshops,
                                        mentorship, and partnerships with local organizations.
                                    </p>
                                    <OutreachProgramsGrid programs={localPrograms} loading={loading} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="global" className="transition-all duration-500 ease-in-out">
                            <Card className="transition-all duration-300 hover:shadow-lg bg-gray-100/90">
                                <CardContent className="p-6">
                                    <h2 className="mb-6 md:mb-8 text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl text-center text-gray-800">Global Outreach</h2>
                                    <p className="text-base sm:text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
                                        Our reach extends beyond the Bay Area — we share robotics education
                                        with students around the world.
                                    </p>
                                    <OutreachProgramsGrid programs={globalPrograms} loading={loading} />
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="flag" className="transition-all duration-500 ease-in-out">
                            <Card className="transition-all duration-300 hover:shadow-lg bg-gray-100/90">
                                <CardContent className="p-6">
                                    <h2 className="mb-6 md:mb-8 text-2xl sm:text-3xl font-bold tracking-tighter sm:text-4xl text-center text-gray-800">#FIRST Like A Girl</h2>
                                    <p className="text-base sm:text-lg text-gray-600 mb-8 text-center max-w-3xl mx-auto leading-relaxed">
                                        Championing gender diversity in STEM through dedicated initiatives
                                        and all-girls robotics teams.
                                    </p>
                                    <OutreachProgramsGrid programs={flagPrograms} loading={loading} />
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>

            </div>
        </section>
    )
}
