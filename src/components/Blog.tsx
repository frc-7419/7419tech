'use client'

import React from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Instagram } from 'lucide-react'

export default function Blog() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
             <CardTitle className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
               Blog by Prad           
             </CardTitle>
        </CardHeader>
      </Card>
        <p className="text-lg text-muted-foreground text-center mb-12">
          This is a blog showcasing posts from Instagram.
        </p>
        
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-primary border-b-2 border-primary pb-2 inline-block">
              Instagram Highlights
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-6">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden">
              <Image
                src="/static/mentors/leon.jpg"
                alt="Instagram Highlights"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
            </div>
            <p className="text-center text-muted-foreground">
              Check out our Instagram page for more updates and highlights. Stay connected!
            </p>
            <Button asChild className="mt-4">
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