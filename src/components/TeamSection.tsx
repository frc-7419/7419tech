import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Image from "next/image";
import React from "react";
import Link from "next/link";

const events = [
    {
        name: 'Ventura County Regional',
        date: 'March 6 - March 9, 2025 (Week 2)',
        location: 'Port Hueneme, CA, USA',
        website: 'https://www.thebluealliance.com/event/2025cave'
    },
    {
        name: 'San Diego Regional presented by Qualcomm',
        date: 'March 20 - March 23, 2025 (Week 4)',
        location: 'La Jolla, CA, USA',
        website: 'https://www.thebluealliance.com/event/2025casd'
    }
];

// images of hardware and software presentation
// change yellow buttons
// brown gradient 
// socials in footer

function MentorshipCard() {
    return (
        <Card className="p-6 rounded-lg bg-white bg-opacity-80 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Mentorship & Outreach</CardTitle>
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
                <div className="py-4 text-right">
                    <Button
                        variant="outline"
                        size="lg"
                        className="border-[#ffb41a] text-[#ffb41a] hover:bg-[#ffb41a] hover:text-white"
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
                <CardTitle className="text-2xl font-bold">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Teamwork:</strong> Our team is mentor-driven but student-organized. We train, support, and elevate each other while holding ourselves accountable.</p>
                <p className="mt-4"><strong>Community:</strong> Through outreach and mentoring, we share our knowledge, inspire younger students, and get kids excited about STEM.</p>
            </CardContent>
        </Card>
    );
}

function EventsCard() {
    return (
        <Card className="p-6 rounded-lg bg-white bg-opacity-80 shadow-lg">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">FRC Events</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Here’s where you can find us this season:</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {events.map((event, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
                            <h3 className="text-lg font-semibold">
                                <Link href={event.website} className={"hover:underline"}> {event.name} </Link>
                            </h3>
                            <p className="text-sm text-gray-600">{event.date}</p>
                            <p className="mt-2 text-sm">{event.location}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-4">
                    We also present at these events, sharing insights on our training structure, programming pedagogy, and more.
                </p>
            </CardContent>
        </Card>
    );
}


export default function TeamSection() {
    return (
        <section className="relative py-16 md:py-24 bg-muted">
            <div className="container mx-auto px-4">
                {/* Section Title and Introduction */}
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                    <span className="bg-gradient-to-r from-[#ffb41a] to-[#926408] bg-clip-text text-transparent">
                      We Are 7419 TECH Support
                    </span>
                    </h2>
                    <p className="text-xl text-gray-500 mx-auto mt-8">
                        Tech Support is way more than robots. We solve problems. We help people. We’re a family. We’ve done many great things and look forward to many more in the future.
                    </p>
                </div>

                {/* Hero Image */}
                <div className="relative w-full h-96 mb-12">
                    <Image
                        src="/static/team/teamphoto.avif"
                        alt="Team photo"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>

                {/* About Section */}
                <div className="mb-16">
                    <h3 className="text-3xl font-bold tracking-tight text-center mb-8">
                        About Team 7419
                    </h3>
                    <div className="text-lg text-gray-500 tracking-tight text-center mb-8">
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
                                <TabsTrigger value="events" className="text-lg font-semibold rounded-lg transition-all hover:bg-white">FRC Events</TabsTrigger>
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
                    <h3 className="text-3xl font-bold tracking-tight text-center mb-8">Worlds Presentations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="p-6 rounded-lg bg-white bg-opacity-80 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Mechanical</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our mechanical team discusses our training structure, curriculum, and projects in our <a href="https://www.team7419.tech/_files/ugd/355c51_00cfc2cca4f4407497e71d2276e4800d.pptx?dn=CHAMP24_PPT_7419_Mechanical%20(1).pptx" className="text-[#ffb41a] hover:underline">presentation</a>.</p>
                            </CardContent>
                        </Card>
                        <Card className="p-6 rounded-lg bg-white bg-opacity-80 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl font-bold">Programming</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p>Our programming team shares teaching resources and collaborative strategies in their <a href="https://www.team7419.tech/_files/ugd/355c51_6be1b3ee1fea425daaf56d3613251a39.pptx?dn=7419%20Worlds%27%20Programming%20Presentation.pptx" className="text-[#ffb41a] hover:underline">presentation</a>.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}