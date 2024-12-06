'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

// change the gray 
// add different images 
// copy navbar from "our team page"

export default function Outreach() {
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8 }
    };

    return (
        <section className="bg-gradient-to-b from-background via-background/90 to-background min-h-screen flex items-center justify-center">
            <div className="container py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="text-center"
                    {...fadeInUp}
                >
                    <h1 className="mb-8 text-100xl z-100 font-bold sm:text-5xl md:text-6xl bg-gradient-to-r from-[#ffb41a] to-[#926408] bg-clip-text text-transparent">
                        Empowering Through Outreach
                    </h1>
                    <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
                        At the heart of 7419 lies a commitment to outreach. 
                        We inspire generations under us, emphasize the impact of robotics, and ignite 
                        a passion for STEM across our community.
                    </p>
                </motion.div>

                <motion.div 
                    className="mb-16"
                    {...fadeInUp}
                    transition={{ delay: 0.2 }}
                >
                    <Tabs defaultValue="commitment" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-8">
                            <TabsTrigger value="commitment">Our Commitment</TabsTrigger>
                            <TabsTrigger value="fll-ftc">FLL & FTC Support</TabsTrigger>
                            <TabsTrigger value="impact">Our Impact</TabsTrigger>
                        </TabsList>
                        <TabsContent value="commitment">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="grid md:grid-cols-2 gap-8 items-center">
                                        <div>
                                            <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl">Our Commitment</h2>
                                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                                Every student in our team pledges to participate in outreach activities. 
                                                We extend our knowledge and passion from assisting FLL and FTC teams 
                                                to conducting workshops at after-school programs.
                                            </p>
                                            <ul className="list-disc list-inside text-lg text-muted-foreground space-y-2">
                                                <li>Mentoring junior robotics teams</li>
                                                <li>Organizing and hosting tournaments</li>
                                                <li>Leading STEM workshops in schools</li>
                                                <li>Engaging with the community at local events and donations</li>
                                            </ul>
                                        </div>
                                        <div className="relative h-80 rounded-lg overflow-hidden shadow-xl">
                                            <Image
                                                src="/static/fll_ftc/kickoff.jpg"
                                                alt="Team members engaged in outreach activities"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="fll-ftc">
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl text-center">FLL & FTC Support</h2>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                                            <Image
                                                src="/static/fll_ftc/DSC07546.JPEG"
                                                alt="FLL and FTC teams in action"
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded-lg"
                                            />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                                                Our high school FRC team takes pride in mentoring in our middle school robotics teams. 
                                                We share our experience, teaching vital skills in CAD, programming, and the use 
                                                of advanced tools like 3D printers and CNC mills for FTC teams.
                                            </p>
                                            <p className="text-lg text-muted-foreground leading-relaxed">
                                                We've successfully hosted both FLL and FTC tournaments, providing more 
                                                opportunities for teams to compete and strengthening FIRST's presence in 
                                                the tri-valley area. Our members are involved in all aspects, from planning 
                                                to volunteering at these events.
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                        <TabsContent value="impact">
                            <Card>
                                <CardContent className="p-6">
                                    <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl text-center">Our Impact</h2>
                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div className="text-center">
                                            <h3 className="text-5xl font-bold text-primary mb-2">500+</h3>
                                            <p className="text-lg text-muted-foreground">Students Reached</p>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-5xl font-bold text-primary mb-2">20+</h3>
                                            <p className="text-lg text-muted-foreground">Workshops Conducted</p>
                                        </div>
                                        <div className="text-center">
                                            <h3 className="text-5xl font-bold text-primary mb-2">5</h3>
                                            <p className="text-lg text-muted-foreground">Tournaments Hosted</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </motion.div>

                <motion.div 
                    className="text-center"
                    {...fadeInUp}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl">Join Our Mission</h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Are you passionate about STEM education and community engagement? 
                        We're always seeking new opportunities to inspire and educate. 
                        Join us in making a difference!
                    </p>
                    <a 
                        href="contact" 
                        className="inline-block bg-primary text-primary-foreground font-semibold py-3 px-8 rounded-full text-lg hover:bg-primary/90 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        Get Involved
                    </a>
                </motion.div>
            </div>
        </section>
    )
}

