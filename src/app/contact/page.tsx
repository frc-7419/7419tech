'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { NavHeader } from '@/components/NavHeader'
import { ContactForm } from '@/components/ContactForm'
import { Mail } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <NavHeader />
      <div
        className="min-h-screen pt-20 md:pt-24 pb-16 px-4 sm:px-6 flex flex-col items-center"
        style={{ backgroundColor: '#1b2947' }}
      >
        <motion.div
          className="w-full max-w-3xl mx-auto flex flex-col items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6">
              <Image
                src="/Logo.png"
                alt="Team 7419"
                width={120}
                height={120}
                className="drop-shadow-lg"
                priority
              />
            </div>
            <h1 className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Contact us
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
              Questions about the team, outreach, or sponsorship? Send a message — we&apos;ll route it to
              team leadership.
            </p>
            <a
              href="mailto:qls7419leadership@gmail.com"
              className="inline-flex items-center gap-2 mt-4 text-[#ffc14a] hover:text-[#ffcd6b] text-sm font-medium"
            >
              <Mail className="h-4 w-4" />
              qls7419leadership@gmail.com
            </a>
          </div>

          <div className="w-full max-w-2xl mx-auto rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 sm:p-10 shadow-xl">
            <ContactForm />
          </div>
        </motion.div>
      </div>
    </>
  )
}
