"use client"

import { motion } from "framer-motion"

export default function Mission() {
  return (
    <section className="bg-[#11224e] py-20 md:py-24 flex items-center justify-center overflow-hidden">
      <div className="max-w-2xl relative">
        <motion.h2 
          className="text-6xl md:text-7xl font-bold text-center text-[#ffc14a] mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Mission
        </motion.h2>
        <motion.p 
          className="text-white text-lg md:text-xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Team 7419 QLS Tech Support instills technical expertise and collaboration in every member. 
          We are a supportive family, giving back to the community with skills gained through FIRST Robotics. 
          Every day, we work hard to become the leaders of tomorrow.
        </motion.p>
      </div>
    </section>
  )
}

