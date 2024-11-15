"use client";

import { Button } from "./ui/button";

export default function Mission() {
    return (
        <section className="bg-background">
            <div className="container py-16 md:py-24">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="mb-8 text-3xl font-bold tracking-tighter sm:text-4xl">Mission and Vision Statement</h2>
                    <p className="text-lg text-muted-foreground mb-8">
                    Team 7419 QLS Tech Support strives to instill technical expertise and collaboration into every member on our
                    student-led team. We are a supportive and dedicated family that works together to give back to the community
                    with the technical and interpersonal skills gained through the FIRST Robotics Competition program. With every
                    day of hard work, we are becoming the leaders of tomorrow.
                    </p>
                </div>
            </div>
       </section>
        // <div className="flex flex-col items-center justify-center h-screen">
        //     <h1 className="text-4xl font-bold">Mission</h1>
        //     <p className="text-lg">
        //         //TODO: Add mission statement
        //     </p>
        // </div>
    )
}