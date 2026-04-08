"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { AboutUsHero, AboutUsGallery } from "@/components/DynamicMedia";
import { motion } from "framer-motion";

const FIRST_CALIFORNIA_DISTRICT_URL = "https://www.firstinspires.org/";

const events = [
    {
        name: "CA District Half Moon Bay Event",
        location: "Half Moon Bay, CA, USA",
        dateRange: "March 6 to March 8, 2026",
        week: "Week 1",
        status: "No matches yet. Check back after March 6, 2026.",
    },
    {
        name: "CA District Aerospace Valley Event",
        location: "Lancaster, CA, USA",
        dateRange: "April 2 to April 4, 2026",
        week: "Week 5",
        status: "No matches yet. Check back after April 2, 2026.",
    },
];

// images of hardware and software presentation
// change yellow buttons
// brown gradient 
// socials in footer

function MentorshipCard() {
    return (
        <Card className="p-6 rounded-lg bg-white bg-opacity-80 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Mentorship & Outreach</CardTitle>
            </CardHeader>
            <CardContent>
                <p>
                    We’ve founded and mentored numerous FLL and FTC teams, promoting STEM education across all age levels. Some of our teams include:
                </p>
                <ul className="mt-4 list-disc list-inside">
                    <li><strong>FLL Teams:</strong> QLS MiniBytes, MegaBytes, CloudBots, PoppeBots, HopperBots, 5-G, Creators, and FlashBots.</li>
                    <li><strong>FTC Teams:</strong> B.R.O., QLS RaD Team, Control+Q, HotsBots, Glitch, Innovix, and more.</li>
                </ul>
                <p className="mt-4">
                    Special initiatives like all-girls teams HotsBots and Innovix represent our commitment to diversity in STEM through our Society of Women Engineers chapter.
                </p>
                <div className="py-4 text-center">
                    <Button
                        variant="outline"
                        size="lg"
                        asChild
                        className="border-[hsl(var(--brand-gold))] text-[hsl(var(--brand-gold))] hover:bg-[hsl(var(--brand-gold))] hover:text-white"
                    >
                        <Link href={"/outreach"}>
                            Learn more
                        </Link>
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

function ValuesCard() {
    return (
        <Card className="p-6 rounded-lg bg-white bg-opacity-80 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Teamwork:</strong> Our team is mentor-driven but student-organized. We train, support, and elevate each other while holding ourselves accountable.</p>
                <p className="mt-4"><strong>Community:</strong> Through outreach and mentoring, we share our knowledge and inspire younger students to get excited about STEM.</p>
            </CardContent>
        </Card>
    );
}

function EventsCard() {
    return (
        <Card className="p-6 rounded-lg bg-white bg-opacity-80 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">Event Results</CardTitle>
            </CardHeader>
            <CardContent>
                {/* <p>
                    As a member of the{" "}
                    <Link
                        href={FIRST_CALIFORNIA_DISTRICT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                    >
                        FIRST California district
                    </Link>
                    , Team 7419 ranked #236 having earned 0 points.
                </p> */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.map((event, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                            <h3 className="text-lg font-semibold">{event.name}</h3>
                            <p className="text-sm text-gray-600">{event.dateRange} ({event.week})</p>
                            <p className="mt-2 text-sm">{event.location}</p>
                            <p className="mt-2 text-sm text-gray-600">{event.status}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}


export default function TeamSection() {
    return (
        <section className="relative py-16 md:py-24" style={{ backgroundColor: "#1b2947" }}>
            <div className="container mx-auto px-4">
                {/* Section Title and Introduction */}
                <motion.div 
                    className="max-w-4xl mx-auto text-center mb-12"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                >
                    <h2 className="font-bold tracking-tight text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
                        <span className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent">
                            About Us
                        </span>
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-gray-300 mx-auto mt-6 md:mt-8">
                        Team 7419 Tech Support is much more than just a robotics team. We solve problems and help people. We&apos;re a family. We&apos;ve done many great things and look forward to many more in the future.
                    </p>
                </motion.div>

                {/* Hero Image */}
                <div className="relative w-full h-64 md:h-96 mb-12">
                    <AboutUsHero />
                </div>

                {/* About Section */}
                <div className="mb-16">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-6 md:mb-8 text-gray-200">
                        About Team 7419
                    </h3>
                    <div className="text-base sm:text-lg text-gray-300 tracking-tight text-center mb-8">
                        <p>
                            Team 7419 is a dedicated group of high school students who design, build, and program competitive robots for the FIRST Robotics Competition.
                            Our programmers use Java to code complex behaviors and autonomous routines, while our mechanical team fabricates custom robot parts using CNC machines and manual mills.
                            The electrical team incorporates control systems, sensors, and pneumatics to make the robot functional.
                        </p>
                        <p className="mt-4">
                            Beyond building robots, we celebrate perseverance, camaraderie, and gracious professionalism. Our mission is to support and empower the engineering community through education and outreach.
                        </p>
                    </div>
                </div>

                {/* Responsive Tabs Section */}
                <div className="mb-16">
                    {/* Desktop Tabs */}
                    <div className="hidden sm:block">
                        <Tabs defaultValue="mentorship" className="w-full">
                            <TabsList className="grid w-full grid-cols-3 gap-4 h-12 rounded-lg bg-white bg-opacity-50 shadow-lg">
                                <TabsTrigger value="mentorship" className="text-lg font-semibold rounded-lg transition-all hover:bg-white">Mentorship & Outreach</TabsTrigger>
                                <TabsTrigger value="values" className="text-lg font-semibold rounded-lg transition-all hover:bg-white">Our Values</TabsTrigger>
                                <TabsTrigger value="events" className="text-lg font-semibold rounded-lg transition-all hover:bg-white">Event Results</TabsTrigger>
                            </TabsList>

                            <TabsContent value="mentorship" className="mt-8">
                                <MentorshipCard />
                            </TabsContent>
                            <TabsContent value="values" className="mt-8">
                                <ValuesCard />
                            </TabsContent>
                            <TabsContent value="events" className="mt-8">
                                <EventsCard />
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Mobile View: Show all tabs as sections */}
                    <div className="block sm:hidden space-y-8">
                        <MentorshipCard />
                        <ValuesCard />
                        <EventsCard />
                    </div>
                </div>

                {/* Presentations Section */}
                <div className="mb-16">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-6 md:mb-8 text-gray-200">Worlds Presentations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="p-6 rounded-lg bg-white bg-opacity-80 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-800">Mechanical</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our mechanical team discusses our training structure, curriculum, and projects in our <a href="https://www.team7419.tech/_files/ugd/355c51_00cfc2cca4f4407497e71d2276e4800d.pptx?dn=CHAMP24_PPT_7419_Mechanical%20(1).pptx" className="text-[hsl(var(--brand-gold))] hover:underline">presentation</a>.</p>
                            </CardContent>
                        </Card>
                        <Card className="p-6 rounded-lg bg-white bg-opacity-80 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold text-gray-800">Programming</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our programming team shares teaching resources and collaborative strategies in their <a href="https://www.team7419.tech/_files/ugd/355c51_6be1b3ee1fea425daaf56d3613251a39.pptx?dn=7419%20Worlds%27%20Programming%20Presentation.pptx" className="text-[hsl(var(--brand-gold))] hover:underline">presentation</a>.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Team Gallery */}
                <div className="mt-16">
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-center mb-6 md:mb-8 text-gray-200">
                        Team Gallery
                    </h3>
                    <AboutUsGallery />
                </div>
            </div>
        </section>
    );
}