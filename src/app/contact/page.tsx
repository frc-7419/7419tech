'use client'
import { NavHeader } from "@/components/NavHeader"
import Image from "next/image"
import { motion } from "framer-motion"

export default function ContactPage() {
  return (
    <>
      <NavHeader />
      <motion.div 
        className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Image src="/logo.png" alt="7419 Logo" width={150} height={150} className="mb-8" />
        <h1 className="text-4xl font-bold text-center mb-4">Contact Page Coming Soon</h1>
      </motion.div>
    </>
  )
}

