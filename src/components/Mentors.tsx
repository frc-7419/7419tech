"use client";

import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Placeholder data for mentors and their fields of expertise
const mentors = [
  {
    name: "Leon Cox",
    field: "Science, Engineering & Robotics",
    role: "Teacher",
    passion: "Golf, Mechanical Systems Integration",
    image: "/static/mentors/leon.jpg",
  },
  {
    name: "Lina Tannous",
    field: "Robotics",
    role: "Teacher",
    passion: "Robotics, Automation, STEM, Leadership Development, Mentorship",
    image: "/static/mentors/lina.jpg",
  },
  {
    name: "Richard Ong",
    field: "Robotics",
    role: "Lead/Coordinator",
    passion: "Education, Mentorship, Innovation, Learning, Collaboration",
    image: "/static/mentors/richard.jpg",
  },
  {
    name: "Nathan Batchelder",
    field: "Science, Engineering & Robotics",
    role: "Teacher",
    passion:
      "Education, Additive Manufacturing, and Prototyping and Iterative Design",
    image: "/static/mentors/nate_batchelder.jpg",
  },
  {
    name: "Ainsley Laing",
    field: "Science, Engineering & Robotics",
    role: "Teacher",
    passion:
      "Finding Unique Ways to Encourage Students to Grow from Consumers of Technology to Creators of it",
    image: "/static/mentors/ainsley.jpeg",
  },
];

export default function Mentors() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
          Our Mentors
        </h1>
        <div className="flex flex-wrap justify-center gap-8">
          {mentors.map((mentor, index) => (
            <Card
              key={index}
              className="overflow-hidden transition-all duration-200 hover:shadow-lg w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1rem)] max-w-sm"
            >
              <CardContent className="p-6">
                <div className="aspect-square relative mb-4 overflow-hidden rounded-full w-40 h-40 mx-auto">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-all duration-200 hover:scale-110"
                  />
                </div>
                <h2 className="text-2xl font-semibold text-center mb-2">
                  {mentor.name}
                </h2>
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  <Badge variant="secondary">{mentor.role}</Badge>
                  <Badge variant="outline">{mentor.field}</Badge>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  {mentor.passion}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
