import { useState, useEffect } from 'react'
import { strapiClient } from '@/lib/strapi/client'

interface DynamicMedia {
  id: number
  title: string
  description?: string
  image: {
    url: string
    alternativeText?: string
  }
  location: string
  display_order: number
  is_active: boolean
  alt_text: string
}

interface UseDynamicMediaOptions {
  location: string
  limit?: number
}

export function useDynamicMedia({ location, limit }: UseDynamicMediaOptions) {
  const [media, setMedia] = useState<DynamicMedia[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMedia() {
      try {
        setLoading(true)
        
        const response = await strapiClient.getMediaItems({
          filters: {
            location: location,
            is_active: true
          },
          populate: ['image'],
          sort: ['display_order:asc'],
          pagination: {
            limit: limit || 25
          }
        })

        // Transform Strapi v5 response format
        const transformedData = response.data.map((item: any) => {
          return {
            id: item.id,
            title: item.title,
            description: item.description,
            image: item.image || {}, // Pass the entire image object
            location: item.location,
            display_order: item.display_order,
            is_active: item.is_active,
            alt_text: item.alt_text
          }
        })
        
        setMedia(transformedData)
      } catch (err) {
        setError('Failed to load media')
      } finally {
        setLoading(false)
      }
    }

    fetchMedia()
  }, [location, limit])

  return { media, loading, error }
}

// Helper functions for specific locations
export function useLocationMedia(location: string) {
  return useDynamicMedia({ location })
}
