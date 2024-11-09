'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[85vh] flex items-center">
      <video //TODO: Add video
        autoPlay 
        loop 
        muted 
        className="absolute inset-0 h-full w-full object-cover opacity-20" 
      />
      <div className="relative container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl xl:text-7xl">
            <span className="bg-gradient-to-r from-[#ffb41a] to-[#926408] bg-clip-text text-transparent">
              QLS Tech Support
            </span>
          </h1>
          <p className="text-xl text-gray-500 md:text-2xl max-w-2xl mx-auto">
            Quarry Lane School's award-winning robotics team, advancing robotics through innovation and excellence.
          </p>
          <div className="flex justify-center gap-4">
            <Button 
              className="bg-[#ffb41a] text-white hover:bg-[#ffc14a] font-semibold"
              size="lg"
            >
              Learn More
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#ffb41a] text-[#ffb41a] hover:bg-[#ffb41a] hover:text-white"
            >
              Get Involved
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}