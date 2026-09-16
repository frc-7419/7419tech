"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { strapiClient, getStrapiMediaUrl } from "@/lib/strapi/client"
import { NumeralWatermark } from "@/components/ui/numeral-watermark"
import { PagePhotoHeader } from "@/components/ui/page-photo-header"

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
        setStrapiSponsors(response.data as unknown as StrapiSponsor[])
      } catch (err) {
        // Strapi sponsors not available, showing original sponsors only
      } finally {
        setStrapiLoading(false)
      }
    }

    fetchSponsors()
  }, [])

  const strapiSponsorsWithLogos = strapiSponsors
    .map(sponsor => ({
      id: sponsor.id,
      name: sponsor.name,
      logo: getStrapiMediaUrl(sponsor.logo),
      url: sponsor.website_url,
      isOriginal: false
    }))
    .filter(sponsor => sponsor.logo)

  const useFallbackSponsors = !strapiLoading && strapiSponsorsWithLogos.length === 0
  const allSponsors = useFallbackSponsors
    ? originalSponsors.map(sponsor => ({
        ...sponsor,
        id: sponsor.name,
        isOriginal: true
      }))
    : strapiSponsorsWithLogos

  return (
    <div className="min-h-screen overflow-hidden bg-[#122350]">
      <PagePhotoHeader
        photo="/static/outreach/ftc-launch-party.jpg"
        eyebrow="Thank You"
        title="Our Amazing Sponsors"
        description="We're incredibly grateful for the support from these outstanding organizations. Their partnerships fuel our innovation and drive us forward."
      />
      <section className="relative py-20 md:py-24">
        <NumeralWatermark />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
            {strapiLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={`sponsor-skeleton-${index}`}
                    className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center"
                  >
                    <div className="w-36 h-16 bg-[#122350]/10 animate-pulse rounded-lg" />
                  </div>
                ))
              : allSponsors.map((sponsor, index) => (
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
                          src={sponsor.logo || ''}
                          alt={`${sponsor.name} logo`}
                          width={150}
                          height={100}
                          className="max-h-24 object-contain"
                        />
                      </a>
                    ) : (
                      <Image
                        src={sponsor.logo || ''}
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
            <h2 className="font-display text-3xl font-bold uppercase tracking-wide text-white mb-6">Become a Sponsor</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join our mission to inspire and empower the next generation of innovators.
              Your support can make a lasting impact.
            </p>
            <a
              href="https://drive.google.com/file/d/1LEVCRtwa1jpuDWNEidyyyDOTDZumry4p/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[hsl(var(--brand-gold))] text-[#122350] font-display font-semibold uppercase tracking-wide py-3 px-8 rounded-xl text-lg hover:bg-[hsl(var(--brand-gold))]/90 transition-colors duration-300"
            >
              Learn About Sponsorship Opportunities
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Sponsors

