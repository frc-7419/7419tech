'use client'

import React from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { ChevronRight, Bot, ChevronLeft } from "lucide-react"
import { Typewriter } from 'react-simple-typewriter'
import Image from "next/image"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../app/styles/carousel.css"

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
    prevArrow: <ChevronLeft className="text-white w-8 h-8 cursor-pointer absolute left-4 top-1/2 transform -translate-y-1/2 z-10" />,
    nextArrow: <ChevronRight className="text-white w-8 h-8 cursor-pointer absolute right-4 top-1/2 transform -translate-y-1/2 z-10" />,
  }

  const carouselImages = [
    "/Robot.png?height=400&width=600",
    "/static/team/teamphoto.avif"
  ]

  return (
    <section className="relative min-h-[85vh] bg-white flex items-center py-14">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <motion.div variants={itemVariants}>
              <Badge className="bg-[#11224e] text-[#ffc14a] hover:bg-[#11224e]/70 mb-3">
                FRC Team 7419
              </Badge>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-5xl font-bold text-[#11224e] tracking-tight lg:text-6xl xl:text-7xl leading-tight"
            >
              The Future of
              <br />
              <span className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent">
                <Typewriter
                  words={['Robotics', 'Innovation', 'Teamwork']}
                  loop={0}
                  cursor
                  cursorStyle='_'
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-lg text-gray-600 max-w-lg mt-4"
            >
              A student-led competitive robotics team pushing the boundaries of innovation, 
              engineering excellence, and technical education at The Quarry Lane School.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-3 pt-6"
            >
              <Button 
                size="lg" 
                className="bg-[#ffc14a] text-white hover:bg-[#ffcd6b] transition-colors"
              >
                Get Involved
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-[#11224e] text-[#11224e] hover:bg-[#11224e] hover:text-white transition-colors"
              >
                View Projects
              </Button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="pt-6 flex items-center gap-3 text-sm text-gray-600"
            >
              <Bot className="h-5 w-5 text-[#11224e]" />
              <span>Competition-ready robotics solutions</span>
            </motion.div>
          </motion.div>

          {/* Right Content - Carousel */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="relative mt-8 lg:mt-0"
          >
            <Card className="aspect-video w-full bg-gray-50 overflow-hidden rounded-xl border-[#ffc14a]/20">
              <Slider {...carouselSettings}>
                {carouselImages.map((src, index) => (
                  <div key={index} className="relative aspect-video">
                    <Image
                      src={src}
                      alt={`Robot image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </Slider>
            </Card>
            
            {/* Decorative elements */}
            <div className="absolute -z-10 top-0 right-0 w-96 h-96 bg-[#ffc14a]/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-0 right-24 w-96 h-96 bg-[#ffc14a]/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

