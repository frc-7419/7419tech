import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, ExternalLink, CalendarDays } from "lucide-react";

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

const TeamSection = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-16">
                {/* Header Card */}
                <Card className="mb-8">
                    <CardContent className="p-8">
                        <div className="text-center max-w-3xl mx-auto">
                            <h1 className="text-4xl md:text-6xl font-bold mb-4">
                                <span className="text-[#ffb41a]">7419</span> - TECH Support
                            </h1>
                            <p className="text-lg text-gray-600">
                                We're more than robots. We solve problems. We help people. We're a family.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Team Photo Card */}
                <Card className="mb-8">
                    <CardContent className="p-0">
                        <div className="aspect-[21/9] relative">
                            <Image
                                src="/static/team/teamphoto.avif"
                                alt="Team photo"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* About Card */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="text-2xl text-center">About Us</CardTitle>
                    </CardHeader>
                    <CardContent className="max-w-5xl mx-auto">
                        <div className="space-y-4 text-gray-600">
                            <p>
                                Team 7419 is a dedicated group of high school students who design, build, and program competitive robots for the FIRST Robotics Competition.
                                Our programmers use Java to code complex behaviors and autonomous routines, while our mechanical team fabricates custom robot parts using CNC machines and manual mills.
                            </p>
                            <p>
                                Beyond building robots, we celebrate perseverance, camaraderie, and gracious professionalism. Our mission is to support and empower the engineering community through education and outreach.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Column 1: Mentorship */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Mentorship</CardTitle>
                            <CardDescription>Teams we support and guide</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-medium mb-3">FLL Teams</h4>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>QLS MiniBytes</p>
                                        <p>MegaBytes</p>
                                        <p>CloudBots</p>
                                        <p>PoppeBots</p>
                                        <p>HopperBots</p>
                                        <p>5-G</p>
                                        <p>Creators</p>
                                        <p>FlashBots</p>
                                    </div>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3">FTC Teams</h4>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>B.R.O.</p>
                                        <p>QLS RaD Team</p>
                                        <p>Control+Q</p>
                                        <p>HotsBots</p>
                                        <p>Glitch</p>
                                        <p>Innovix</p>
                                    </div>
                                </div>
                                <Button 
                                    variant="outline" 
                                    className="w-full hover:bg-[#ffb41a] hover:text-white transition-colors"
                                    asChild
                                >
                                    <Link href="/outreach">Learn More</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Column 2: Values & Outreach */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Our Values</CardTitle>
                            <CardDescription>What drives us forward</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-medium mb-3">Teamwork</h4>
                                    <p className="text-sm text-gray-600">
                                        Our team is mentor-driven but student-organized. We train, support, and elevate each other while holding ourselves accountable.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3">Community</h4>
                                    <p className="text-sm text-gray-600">
                                        Through outreach and mentoring, we share our knowledge, inspire younger students, and get kids excited about STEM.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium mb-3">Special Initiatives</h4>
                                    <p className="text-sm text-gray-600">
                                        Our all-girls teams HotsBots and Innovix represent our commitment to diversity in STEM through our Society of Women Engineers chapter.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Column 3: Events & Presentations */}
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle>Events & Presentations</CardTitle>
                            <CardDescription>Where to find us this season</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {/* Events */}
                                <div className="space-y-4">
                                    {events.map((event, index) => (
                                        <div key={index} className="p-3 rounded-lg border">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-medium text-sm">{event.name}</h3>
                                                <Button variant="ghost" size="icon" asChild className="h-6 w-6">
                                                    <Link href={event.website}>
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Link>
                                                </Button>
                                            </div>
                                            <div className="space-y-1 text-xs text-gray-600">
                                                <div className="flex items-center">
                                                    <CalendarDays className="h-3 w-3 mr-1" />
                                                    {event.date}
                                                </div>
                                                <div className="flex items-center">
                                                    <MapPin className="h-3 w-3 mr-1" />
                                                    {event.location}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Presentations */}
                                <div className="space-y-4">
                                    <div className="p-3 rounded-lg border">
                                        <h4 className="font-medium mb-2">Mechanical</h4>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="w-full hover:bg-[#ffb41a] hover:text-white transition-colors"
                                            asChild
                                        >
                                            <Link href="https://www.team7419.tech/_files/ugd/355c51_00cfc2cca4f4407497e71d2276e4800d.pptx">
                                                View Presentation
                                            </Link>
                                        </Button>
                                    </div>
                                    <div className="p-3 rounded-lg border">
                                        <h4 className="font-medium mb-2">Programming</h4>
                                        <Button 
                                            variant="outline" 
                                            size="sm"
                                            className="w-full hover:bg-[#ffb41a] hover:text-white transition-colors"
                                            asChild
                                        >
                                            <Link href="https://www.team7419.tech/_files/ugd/355c51_6be1b3ee1fea425daaf56d3613251a39.pptx">
                                                View Presentation
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default TeamSection;