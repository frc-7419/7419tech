'use client'

import React from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronRight, Bot, ChevronLeft } from "lucide-react"
import Image from "next/image"
import Slider from "react-slick"
import Link from 'next/link'
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../app/styles/carousel.css"
import { useDynamicMedia } from '@/hooks/useDynamicMedia'
import { getStrapiMediaUrl } from '@/lib/strapi/client'
import Aurora from '@/components/Aurora'

function PrevArrow(props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <button onClick={props.onClick} className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-transparent border-none p-0 items-center justify-center">
      <ChevronLeft className="text-white w-8 h-8" />
    </button>
  )
}

function NextArrow(props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <button onClick={props.onClick} className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-transparent border-none p-0 items-center justify-center">
      <ChevronRight className="text-white w-8 h-8" />
    </button>
  )
}

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  }

  // Get dynamic images for home page slideshow
  const { media: carouselMedia, loading: carouselLoading } = useDynamicMedia({ 
    location: 'home-page' 
  })

  // Fallback images if no dynamic media is available
  const fallbackImages = [
    "/Robot.png?height=400&width=600",
    "/static/team/teamphoto.avif"
  ]

  const carouselImages = !carouselLoading && carouselMedia && carouselMedia.length > 0 
    ? carouselMedia.map(item => getStrapiMediaUrl(item.image, 'medium')).filter((src): src is string => src !== null)
    : (!carouselLoading ? fallbackImages : [])

  return (
    <section className="relative min-h-screen bg-gray-900 flex items-center pt-0 pb-12 md:pb-14 overflow-hidden">
      {/* Full-height aurora effect with top-to-bottom fade */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 20%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.3) 80%, rgba(0,0,0,0) 100%)',
          }}
        >
          <Aurora
            colorStops={["#f9c837", "#05214e", "#ffe27a"]}
            blend={0.8}
            amplitude={3.0}
            speed={0.5}
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-24 md:pt-20">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content - White rounded container */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/85 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left min-w-0">

            <motion.h1 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold text-[#11224e] tracking-tight lg:text-6xl xl:text-7xl leading-tight"
            >
              The Future of
              <br />
              <span className="bg-gradient-to-r from-[hsl(var(--brand-gold))] to-[#d59a25] bg-clip-text text-transparent">
                Robotics
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-base sm:text-lg text-gray-600 max-w-lg mx-auto lg:mx-0"
            >
              A student-led competitive robotics team pushing the boundaries of innovation, 
              engineering excellence, and technical education at The Quarry Lane School.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row flex-wrap gap-3 pt-2 justify-center lg:justify-start"
            >
              <Button 
                size="lg"
                asChild
                className="bg-[#ffc14a] text-white hover:bg-[#ffcd6b] transition-colors w-full sm:w-auto"
              >
                <Link href={"/contact"}>
                  Get Involved
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                asChild
                className="border-[#11224e] text-[#11224e] hover:bg-[#11224e] hover:text-white transition-colors w-full sm:w-auto"
              >
                <Link href={"/team"}>
                  View Projects
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex items-center justify-center lg:justify-start gap-3 text-sm text-gray-600"
            >
              <Bot className="h-5 w-5 text-[#11224e]" />
              <span> Competition-ready robotics solutions</span>
            </motion.div>
          </motion.div>

          {/* Right Content - Carousel */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="relative mt-6 lg:mt-0 w-full max-w-xl mx-auto lg:mx-0 min-w-0"
          >
            <Card className="aspect-[4/3] sm:aspect-video w-full bg-gray-50 overflow-hidden rounded-xl border-[#ffc14a]/20 slick-size-lock">
              {carouselLoading ? (
                <div className="w-full h-full animate-pulse bg-gray-200" />
              ) : (
                <Slider {...carouselSettings} className="h-full">
                  {carouselImages.map((src, index) => (
                    <div key={index} className="relative h-full">
                      <Image
                        src={src || ''}
                        alt={`Robot image ${index + 1}`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 520px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              )}
            </Card>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-0 right-0 w-96 h-96 bg-[#ffc14a]/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-0 right-24 w-96 h-96 bg-[#ffc14a]/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
      
      {/* Smooth transition gradient to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#11224e] z-5"></div>
    </section>
  )
}

