'use client'

import React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram, ArrowRight } from 'lucide-react'

export default function Blog() {
  const posts = [
    {
      id: 1,
      title: "The Art of Coding",
      excerpt: "Exploring the creative side of programming and how it shapes our digital world.",
      image: "/static/blog/artOfCoding.jpg",
    },
    {
      id: 2,
      title: "Tech Trends 2024",
      excerpt: "A look into the future: what technologies will dominate the landscape in the coming year?",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      id: 3,
      title: "Building Sustainable Software",
      excerpt: "How eco-friendly coding practices can make a difference in reducing carbon footprints.",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
            Blog by Prad
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Exploring the intersections of technology, creativity, and innovation.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative aspect-video">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{post.title}</CardTitle>
                <CardDescription className="mt-2">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Read More <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="w-full max-w-3xl mx-auto bg-primary text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Instagram Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Instagram Highlights"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-center">
              Stay connected and get the latest updates from our Instagram page!
            </p>
            <Button asChild variant="secondary" className="mt-4">
              <a
                href="https://www.instagram.com/7419tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center"
              >
                <Instagram className="w-5 h-5 mr-2" />
                Visit Instagram
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}