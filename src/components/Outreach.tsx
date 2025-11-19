'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import ImpactStats from './ImpactStats'
import { OurCommitmentImages, FllFtcSupportImages } from '@/components/DynamicMedia'

export default function Outreach() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 1.5, ease: "easeOut" }
    };

    return (
        <section className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#1b2947" }}>
            <div className="container pt-24 pb-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center"
                    initial={fadeInUp.initial}
                    animate={fadeInUp.animate}
                    transition={fadeInUp.transition}
                >
                    <h1 className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl p-3">Empowering Through Outreach</h1>
                    <p className="text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
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
                        <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/10">
                            <TabsTrigger value="impact" className="transition-all duration-300 hover:bg-primary/10 text-gray-300">Our Impact</TabsTrigger>
                            <TabsTrigger value="commitment" className="transition-all duration-300 hover:bg-primary/10 text-gray-300">Our Commitment</TabsTrigger>
                            <TabsTrigger value="fll-ftc" className="transition-all duration-300 hover:bg-primary/10 text-gray-300">FLL & FTC Support</TabsTrigger>
                        </TabsList>
                        <TabsContent value="impact" className="transition-all duration-500 ease-in-out">
                            <Card className="transition-all duration-300 hover:shadow-lg bg-gray-100/90">
                                <CardContent className="p-6">
                                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-center text-gray-800">Our Impact</h2>
                                    <ImpactStats />
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="commitment" className="transition-all duration-500 ease-in-out">
                            <Card className="transition-all duration-300 hover:shadow-lg bg-gray-100/90">
                                <CardContent className="p-6">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl text-gray-800">Our Commitment</h2>
                                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                                Every student in our team pledges to participate in outreach activities. 
                                                We extend our knowledge and passion from assisting FLL and FTC teams 
                                                to conducting workshops at after-school programs.
                                            </p>
                                            <ul className="list-disc list-inside text-lg text-gray-600 space-y-2">
                                                <li>Mentoring junior robotics teams</li>
                                                <li>Organizing and hosting tournaments</li>
                                                <li>Leading STEM workshops in schools</li>
                                                <li>Engaging with the community at local events and donations</li>
                                            </ul>
                                        </div>
                                        <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                                            <OurCommitmentImages />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="fll-ftc" className="transition-all duration-500 ease-in-out">
                            <Card className="transition-all duration-300 hover:shadow-lg bg-gray-100/90">
                                <CardContent className="p-6">
                                    <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl text-center text-gray-800">FLL & FTC Support</h2>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                                            <FllFtcSupportImages />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                                                Our high school FRC team takes pride in mentoring in our middle school robotics teams. 
                                                We share our experience, teaching vital skills in CAD, programming, and the use 
                                                of advanced tools like 3D printers and CNC mills for FTC teams.
                                            </p>
                                            <p className="text-lg text-gray-600 leading-relaxed">
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
                    </Tabs>
                </motion.div>

            </div>
        </section>
    )
}

