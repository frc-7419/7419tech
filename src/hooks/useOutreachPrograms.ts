import { useState, useEffect } from 'react'
import { strapiClient, getStrapiMediaUrl } from '@/lib/strapi/client'

export interface OutreachProgram {
  id: number
  name: string
  description: string
  category: 'local' | 'global' | 'first-like-a-girl'
  image: string | null
  display_order: number
  is_active: boolean
}

export function useOutreachPrograms() {
  const [programs, setPrograms] = useState<OutreachProgram[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPrograms() {
      try {
        setLoading(true)
        const response = await strapiClient.getActiveOutreachPrograms()
        const rows = Array.isArray(response.data) ? response.data : []

        const transformed = rows.map((item: any) => {
          // Strapi v4: { id, attributes: { ... } }; v5: flat fields on the document
          const doc = item.attributes ? { id: item.id, ...item.attributes } : item
          return {
            id: doc.id ?? item.id,
            name: doc.name,
            description: doc.description,
            category: doc.category,
            image: getStrapiMediaUrl(doc.image, 'medium'),
            display_order: doc.display_order ?? 0,
            is_active: doc.is_active ?? true,
          }
        })

        setPrograms(transformed)
      } catch (err) {
        setError('Failed to load outreach programs')
      } finally {
        setLoading(false)
      }
    }

    fetchPrograms()
  }, [])

  const local = programs.filter(p => p.category === 'local')
  const global = programs.filter(p => p.category === 'global')
  const firstLikeAGirl = programs.filter(p => p.category === 'first-like-a-girl')

  return { programs, local, global, firstLikeAGirl, loading, error }
}
