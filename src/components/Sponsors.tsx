"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { strapiClient } from "@/lib/strapi/client"

// Original hardcoded sponsors (preserved!)
const originalSponsors = [
  { name: "QLS", logo: "/static/sponsors/qls.png", url: "https://www.quarrylane.org/" },
  { name: "Notion", logo: "/static/sponsors/notion-logo.png", url: "https://www.notion.so" },
  { name: "Intuitive Foundation", logo: "/static/sponsors/IntuitiveFoundation.png", url: "https://www.intuitive-foundation.org/first-robotics/" },
  { name: "FIRST NorCal", logo: "/static/sponsors/FIRST-NorCal.png", url: "https://www.firstinspires.org/robotics/frc" },
  { name: "Google", logo: "/static/sponsors/googleLogo.png", url: "https://about.google/brand-resource-center/guidance/sponsorships/" },
  { name: "LDL", logo: "/static/sponsors/ldl.svg", url: "https://littledesignlab.org/" },
]

interface StrapiSponsor {
  id: number
  name: string
  logo: {
    url: string
  }
  website_url?: string
  tier: string
  description?: string
}

function Sponsors() {
  const [strapiSponsors, setStrapiSponsors] = useState<StrapiSponsor[]>([])
  const [strapiLoading, setStrapiLoading] = useState(true)

  useEffect(() => {
    async function fetchSponsors() {
      try {
        const response = await strapiClient.getActiveSponsors()
        setStrapiSponsors(response.data)
      } catch (err) {
        console.log('Strapi sponsors not available, showing original sponsors only')
      } finally {
        setStrapiLoading(false)
      }
    }

    fetchSponsors()
  }, [])

  // Combine original sponsors with Strapi sponsors
  const allSponsors = [
    ...originalSponsors.map(sponsor => ({
      ...sponsor,
      id: sponsor.name,
      isOriginal: true
    })),
    ...strapiSponsors.map(sponsor => ({
      id: sponsor.id,
      name: sponsor.name,
      logo: `http://localhost:1337${sponsor.logo.url}`,
      url: sponsor.website_url,
      isOriginal: false
    }))
  ]

  return (
    <main className="flex-grow bg-gradient-to-b from-white via-gray-100 to-white min-h-screen">
      <section className="relative py-32 md:py-48">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -20 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h1 className="bg-gradient-to-r from-[#ffc14a] to-[#d59a25] bg-clip-text text-transparent text-5xl font-bold tracking-tight lg:text-6xl xl:text-7xl p-3">Our Amazing Sponsors</h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              We&apos;re incredibly grateful for the support from these outstanding organizations. 
              Their partnerships fuel our innovation and drive us forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 grid-rows-2 gap-8">
            {allSponsors.map((sponsor, index) => (
              <motion.div
                key={sponsor.id}
                className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {sponsor.url ? (
                  <a href={sponsor.url} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      width={150}
                      height={100}
                      className="max-h-24 object-contain"
                    />
                  </a>
                ) : (
                  <Image
                    src={sponsor.logo}
                    alt={`${sponsor.name} logo`}
                    width={150}
                    height={100}
                    className="max-h-24 object-contain"
                  />
                )}
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

