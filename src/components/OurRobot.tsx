"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import "../app/styles/carousel.css"
import { FaArrowRight } from "react-icons/fa";
import { useDynamicMedia } from '@/hooks/useDynamicMedia'
import { getStrapiMediaUrl } from '@/lib/strapi/client';

function PrevArrow(props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <button onClick={props.onClick} className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-black border-none p-0 items-center justify-center">
      <ChevronLeft className="text-white w-8 h-8" />
    </button>
  )
}

function NextArrow(props: { className?: string; style?: React.CSSProperties; onClick?: () => void }) {
  return (
    <button onClick={props.onClick} className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 cursor-pointer bg-black border-none p-0 items-center justify-center">
      <ChevronRight className="text-white w-8 h-8" />
    </button>
  )
}

const descriptions = [
  "The robot has a mounted Arducam camera. Using the PhotonVision library, our robot is able to identify AprilTags and their rotation and position relative to the robot. This allows the robot to estimate its pose on the field with incredible accuracy.",
  "Swerve drive enables the robot to move in all directions, allowing us to facilitate precise movements in complex environments.",
  "Many functions of the robot, including raising the shooter, intaking a note, and running the shooter wheels, are automated to reduce stress on the driver.",
];


const OurRobot = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.5,
      },
    },
  };
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />
  }
  
  // Get dynamic images for robot carousel
  const { media: robotMedia, loading: robotLoading } = useDynamicMedia({ 
    location: 'our-robot' 
  })

  // Fallback images if no dynamic media is available
  const fallbackImages = [
    "/static/robot/robot1.JPG",
    "/static/robot/DSC06883.JPG",
    "/static/robot/robot3.JPG",
    "/static/robot/robot4.JPG",
    "/static/robot/robot5.JPG",
  ]

  const carouselImages = !robotLoading && robotMedia && robotMedia.length > 0 
    ? robotMedia.map(item => getStrapiMediaUrl(item.image, 'medium')).filter((src): src is string => src !== null)
    : (!robotLoading ? fallbackImages : [])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden"
      style={{ backgroundColor: "#1b2947" }}
      initial="hidden"
      animate={isLoaded ? "visible" : "hidden"}
      variants={containerVariants}
    >
      <motion.header className="text-center mb-8 md:mb-12" variants={itemVariants}>
        <h1 className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent text-4xl sm:text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl">Our Robot</h1>
        <p className="text-base sm:text-lg text-gray-300">
          A glimpse into our innovative robot technology.
        </p>
      </motion.header>

      <motion.div className="w-full max-w-3xl mb-8" variants={itemVariants}>
        
        <Card className="aspect-video w-full bg-gray-50 overflow-hidden rounded-xl border-[#ffc14a]/20">
          {robotLoading ? (
            <div className="w-full h-full animate-pulse bg-gray-200" />
          ) : (
            <Slider {...carouselSettings}>
              {carouselImages.map((src, index) => (
                <div key={index} className="relative aspect-video">
                  <Image
                    src={src || ''}
                    alt={`Robot image ${index + 1}`}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          )}
        </Card>
        <div className="absolute -z-10 top-0 right-0 w-96 h-96 bg-[#ffc14a]/10 rounded-full blur-3xl" />
        <div className="absolute -z-10 bottom-0 right-24 w-96 h-96 bg-[#ffc14a]/5 rounded-full blur-3xl" />
      </motion.div>

      <motion.div
        className="max-w-3xl text-center px-4 md:px-8"
        variants={itemVariants}
      >
        <p className="text-gray-300 text-base sm:text-lg mb-6">
          Our robot is designed to solve the complex problems in each year&apos;s FRC
          game. Featuring swerve and advanced vision systems, it is engineered
          for agility and precision.
        </p>

        <p className="text-gray-300 text-base sm:text-lg mb-6">
          The robot showcases an innovative combination of hardware and software
          that enables it to interact seamlessly with its surroundings. As we
          continue to improve its capabilities, we aim to push the boundaries of
          robotics and automation.
        </p>
      </motion.div>

      <motion.div
        className="mt-10 md:mt-12 space-y-6 md:space-y-8 w-full max-w-4xl bg-[hsl(var(--brand-gold))] p-6 md:p-8 rounded-3xl "
        variants={itemVariants}
      >
        <h3 className="text-2xl sm:text-3xl font-semibold text-center text-white">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Advanced Vision", "Swerve Drive", "Automatic Features"].map(
            (feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <CardContent className="p-6  flex flex-col item-center text-center">
                    <h4 className="text-xl font-semibold mb-2 text-gray-800">{feature}</h4>
                    <p className="text-gray-600">{descriptions[index]}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          )}
        </div>
      </motion.div>

      <motion.div className="mt-12" variants={itemVariants}>
      {/* <FaArrowRight /> */}
        <Button asChild className="px-6 py-6 text-lg">
          <a href="https://github.com/frc-7419/Reefscape2025" target="_blank" rel="noopener noreferrer">See our code</a>
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default OurRobot;
