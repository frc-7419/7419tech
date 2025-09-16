"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Mission() {
  const [currentWord, setCurrentWord] = useState(0)
  const words = ["Innovation", "Collaboration", "Community"]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length)
    }, 5000) // Increased duration for better readability
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section className="bg-[#11224e] py-20 md:py-24 flex items-center justify-center overflow-hidden">
      <div className="max-w-2xl relative">
        <h2 className="text-6xl md:text-7xl font-bold text-center text-[#ffc14a] relative z-5">
          Our Mission
        </h2>
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentWord}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <span className="sm:text-9xl font-bold text-[#ffc14a] whitespace-nowrap">
                {words[currentWord]}
              </span>
            </motion.div>
          </AnimatePresence>
          <motion.p 
            className="text-white text-lg md:text-xl text-center relative z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Team 7419 QLS Tech Support instills technical expertise and collaboration in every member. 
            We are a supportive family, giving back to the community with skills gained through FIRST Robotics. 
            Every day, we work hard to become the leaders of tomorrow.
          </motion.p>
        </div>
      </div>
    </section>
  )
}

