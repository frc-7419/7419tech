"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"

const sponsors = [
  { name: "QLS", logo: "/static/sponsors/qls.png", url: "https://www.quarrylane.org/" },
  { name: "Notion", logo: "/static/sponsors/notion-logo.png", url: "https://www.notion.so" },
  { name: "Intuitive Foundation", logo: "/static/sponsors/IntuitiveFoundation.png", url: "https://www.intuitivefoundation.org" },
  { name: "FIRST NorCal", logo: "/static/sponsors/FIRST-NorCal.png", url: "https://www.firstinspires.org/robotics/frc" },
  { name: "Google", logo: "/static/sponsors/googleLogo.png", url: "https://about.google/" },
  { name: "LDL", logo: "/static/sponsors/ldl.svg", url: "https://littledesignlab.org/" },
]

function Sponsors() {
  return (
    <main className="flex-grow bg-gradient-to-b from-white via-gray-100 to-white min-h-screen">
      <section className="relative py-32 md:py-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >

            <h2 className="text-5xl font-bold bg-gradient-to-r from-[#ffb41a] to-[#926408] bg-clip-text text-transparent leading-normal">
            
              Our Amazing Sponsors
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              We're incredibly grateful for the support from these outstanding organizations. 
              Their partnership fuels our innovation and drives us forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 grid-rows-2 gap-8">
            {sponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.name}
                className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={150}
                    height={100}
                    objectFit="contain"
                    className="max-h-24"
                  />
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-24 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Become a Sponsor</h3>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join our mission to inspire and empower the next generation of innovators. 
              Your support can make a lasting impact.
            </p>
            <a 
              href="https://drive.google.com/file/d/1LEVCRtwa1jpuDWNEidyyyDOTDZumry4p/view?usp=drive_link"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-xl text-lg hover:bg-blue-50 transition-colors duration-300 border-2 border-blue-600"
            >
              Learn About Sponsorship Opportunities
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

export default Sponsors

