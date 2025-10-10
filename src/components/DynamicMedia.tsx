'use client'

import { useDynamicMedia } from '@/hooks/useDynamicMedia'
import { getStrapiMediaUrl } from '@/lib/strapi/client'
import Image from 'next/image'

interface DynamicMediaProps {
  location: string
  className?: string
  limit?: number
  showOverlay?: boolean
}

export function DynamicMedia({ location, className = '', limit, showOverlay = true }: DynamicMediaProps) {
  const { media, loading, error } = useDynamicMedia({ location, limit })

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="bg-gray-200 rounded-lg h-48 w-full"></div>
      </div>
    )
  }

  if (error) {
    console.error('Dynamic media error:', error)
    return null // Fail silently for better UX
  }

  if (!media || media.length === 0) {
    return null // No media to show
  }

  // Dynamic grid layout based on number of images
  const getGridClass = (count: number) => {
    switch (count) {
      case 1:
        return 'grid grid-cols-1'
      case 2:
        return 'grid grid-cols-1 md:grid-cols-2 gap-4'
      case 3:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      case 4:
        return 'grid grid-cols-2 gap-4'
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
    }
  }

  return (
    <div className={`${getGridClass(media.length)} ${className}`}>
      {media.map((item) => (
        <div key={item.id} className="relative group overflow-hidden rounded-lg">
          <img
            src={getStrapiMediaUrl(item.image) || ''}
            alt={item.alt_text || item.title}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {showOverlay && (item.title || item.description) && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {item.title && (
                <h3 className="font-semibold text-lg">{item.title}</h3>
              )}
              {item.description && (
                <p className="text-sm opacity-90 mt-1">{item.description}</p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// Enhanced components with fallbacks
export function AboutUsHero() {
  const { media, loading, error } = useDynamicMedia({ location: 'about-us', limit: 1 })
  
  // Fallback image
  const fallbackSrc = "/static/team/teamphoto.avif"
  
  if (loading) {
    return <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
  }
  
  const imageSrc = media && media.length > 0 
    ? getStrapiMediaUrl(media[0].image) || fallbackSrc
    : fallbackSrc
    
  return (
    <img
      src={imageSrc}
      alt={media?.[0]?.alt_text || "Team photo"}
      className="w-full h-full object-cover rounded-lg"
    />
  )
}

export function AboutUsGallery() {
  return <DynamicMedia location="about-us-gallery" className="mt-8" />
}

export function OurRobotImage() {
  return <DynamicMedia location="our-robot" className="w-full" limit={1} />
}

export function OurCommitmentImages() {
  const { media, loading, error } = useDynamicMedia({ location: 'our-commitment' })
  
  // Fallback image
  const fallbackSrc = "/static/fll_ftc/kickoff.jpg"
  
  if (loading) {
    return <div className="mt-6 bg-gray-200 animate-pulse rounded-lg h-48"></div>
  }
  
  // Use dynamic media if available, otherwise show fallback
  if (!media || media.length === 0) {
    return (
      <div className="mt-6 relative group overflow-hidden rounded-lg">
        <img
          src={fallbackSrc}
          alt="Team members engaged in outreach activities"
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )
  }
  
  return <DynamicMedia location="our-commitment" className="mt-6" />
}

export function FllFtcSupportImages() {
  const { media, loading, error } = useDynamicMedia({ location: 'fll-ftc-support' })
  
  // Fallback image  
  const fallbackSrc = "/static/fll_ftc/DSC07546.JPEG"
  
  if (loading) {
    return <div className="mt-6 bg-gray-200 animate-pulse rounded-lg h-48"></div>
  }
  
  // Use dynamic media if available, otherwise show fallback
  if (!media || media.length === 0) {
    return (
      <div className="mt-6 relative group overflow-hidden rounded-lg">
        <img
          src={fallbackSrc}
          alt="FLL and FTC teams in action"
          className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    )
  }
  
  return <DynamicMedia location="fll-ftc-support" className="mt-6" />
}

export function SeasonMedia2025() {
  const { media, loading, error } = useDynamicMedia({ location: 'season-2025-2026' })
  
  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1,2,3].map(i => <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-48"></div>)}
    </div>
  }
  
  if (!media || media.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No media available for 2025-26 season yet.</p>
        <p className="text-sm text-gray-400 mt-2">Check back soon for updates!</p>
      </div>
    )
  }
  
  return <DynamicMedia location="season-2025-2026" />
}

export function SeasonMedia2024() {
  const { media, loading, error } = useDynamicMedia({ location: 'season-2024-2025' })
  
  // Fallback images - CCC 2024 (from your original 2024-25 season tab)
  const fallbackImages = [
    "/static/comps/ccc2024/20241026_112449.jpg",
    "/static/comps/ccc2024/20241026_163310.jpg",
    "/static/comps/ccc2024/IMG_9638.JPG",
    "/static/comps/ccc2024/IMG_9648.JPG",
    "/static/comps/ccc2024/IMG_9707.JPG"
  ]
  
  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1,2,3,4,5].map(i => <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-48"></div>)}
    </div>
  }
  
  // Custom render for fallback
  if (!media || media.length === 0) {
    return (
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-700">CCC 2024</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallbackImages.map((src, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <img
                src={src}
                alt={`CCC 2024 Photo ${index + 1}`}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  return <DynamicMedia location="season-2024-2025" />
}

export function SeasonMedia2023() {
  const { media, loading, error } = useDynamicMedia({ location: 'season-2023-2024' })
  
  // Fallback images - Champs 2024 and SVR 2024 (from your original 2023-24 season tab)
  const champsImages = [
    "/static/comps/champs2024/DSC06887.JPG",
    "/static/comps/champs2024/DSC06924.JPG",
    "/static/comps/champs2024/DSC06941.JPG",
    "/static/comps/champs2024/IMG_6749.JPG",
    "/static/comps/champs2024/IMG_6754.png"
  ]
  
  const svrImages = [
    "/static/comps/champs2024/IMG_6749.JPG",
    "/static/comps/svr2024/image.png",
    "/static/comps/svr2024/img1.png",
    "/static/comps/svr2024/img2.png",
    "/static/comps/svr2024/img4.png"
  ]
  
  if (loading) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1,2,3,4,5,6,7,8,9,10].map(i => <div key={i} className="bg-gray-200 animate-pulse rounded-lg h-48"></div>)}
    </div>
  }
  
  if (!media || media.length === 0) {
    return (
      <div className="space-y-8">
        {/* Champs 2024 Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Champs 2024</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {champsImages.map((src, index) => (
              <div key={`champs-${index}`} className="relative group overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt={`Champs 2024 Photo ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
        
        {/* SVR 2024 Section */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">SVR 2024</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {svrImages.map((src, index) => (
              <div key={`svr-${index}`} className="relative group overflow-hidden rounded-lg">
                <img
                  src={src}
                  alt={`SVR 2024 Photo ${index + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  return <DynamicMedia location="season-2023-2024" />
}

export function HomePageSlideshow() {
  return <DynamicMedia location="home-page" className="w-full h-full" showOverlay={false} />
}
