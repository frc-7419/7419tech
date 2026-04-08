'use client'

import React, { useState } from 'react'
import { motion } from "framer-motion"
import Image from "next/image"
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowRight, Instagram, Mail } from 'lucide-react'

const posts = [
  {
    id: 1,
    title: "The Art of Coding",
    excerpt: "Exploring the creative side of programming and how it shapes our digital world.",
    image: "/next.svg",
  },
  {
    id: 2,
    title: "Tech Trends 2024",
    excerpt: "A look into the future: what technologies will dominate the landscape in the coming year?",
    image: "/window.svg",
  },
  {
    id: 3,
    title: "Building Sustainable Software",
    excerpt: "How eco-friendly coding practices can make a difference in reducing carbon footprints.",
    image: "/file.svg",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100 }
  }
}

export default function BlogPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    setEmail('')
  }

  return (
    <section className="relative min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <motion.h1 
            variants={itemVariants}
            className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent text-4xl sm:text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl p-3"
          >
            7419 Blog
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-gray-600"
          >
            Exploring the intersections of science, technology, creativity, and innovation
          </motion.p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <Card className="overflow-hidden transition-all hover:shadow-xl">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative aspect-video md:aspect-auto">
                <Image
                  src="/placeholder.svg"
                  alt="Featured post"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-[#11224e] mb-4">
                  Featured: The Future of Robotics
                </CardTitle>
                <CardDescription className="text-lg mb-6">
                  Discover our team&apos;s posts.
                </CardDescription>
                <Button className="self-start w-full sm:w-auto bg-[#ffc14a] text-[#11224e] hover:bg-[#ffcd6b] transition-colors">
                  Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Blog Posts */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16"
        >
          {posts.map((post) => (
            <motion.div key={post.id} variants={itemVariants}>
              <Card className="overflow-hidden transition-all hover:shadow-lg group">
                <div className="relative aspect-video">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-[#11224e] group-hover:text-[#ffc14a] transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full border-[#11224e] text-[#11224e] group-hover:bg-[#11224e] group-hover:text-white transition-colors">
                    Read More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Instagram Highlights */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full mb-16"
        >
          <Card className="w-full bg-[#11224e] text-white overflow-hidden">
            <CardContent className="flex flex-col items-center p-6 md:p-8">
              <CardTitle className="text-2xl sm:text-3xl text-[#ffc14a] font-semibold mb-4">
                Instagram Highlights
              </CardTitle>
              <Button asChild variant="secondary" className="bg-[#ffc14a] text-[#11224e] hover:bg-[#ffcd6b] transition-colors">
                <Link href="https://www.instagram.com/7419tech/" target="_blank" rel="noopener noreferrer">
                  <Instagram className="mr-2 h-5 w-5" /> Visit Instagram
                </Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        
      </div>

      {/* Decorative background elements */}
      <div className="absolute -z-10 top-0 right-0 w-96 h-96 bg-[#ffc14a]/10 rounded-full blur-3xl" />
      <div className="absolute -z-10 bottom-0 left-24 w-96 h-96 bg-[#ffc14a]/5 rounded-full blur-3xl" />
      <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#11224e]/5 rounded-full blur-3xl" />
    </section>
  )
}
