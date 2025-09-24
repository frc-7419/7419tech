// Strapi API client for fetching content
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337/api'

interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

interface StrapiItem {
  id: number
  attributes: Record<string, any>
  createdAt: string
  updatedAt: string
  publishedAt: string
}

class StrapiClient {
  private baseUrl: string

  constructor(baseUrl: string = STRAPI_API_URL) {
    this.baseUrl = baseUrl
  }

  private async fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<StrapiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  // Blog Posts
  async getBlogPosts(options: {
    populate?: string[]
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page?: number; pageSize?: number }
  } = {}) {
    const params = new URLSearchParams()
    
    // Add populate for featured_image and tags
    if (options.populate) {
      options.populate.forEach(field => params.append('populate[]', field))
    } else {
      params.append('populate[]', 'featured_image')
      params.append('populate[]', 'tags')
    }

    // Add filters
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(`filters[${key}]`, value as string)
      })
    }

    // Add sorting
    if (options.sort) {
      options.sort.forEach(sortField => params.append('sort[]', sortField))
    } else {
      params.append('sort[]', 'publishedAt:desc')
    }

    // Add pagination
    if (options.pagination?.page) {
      params.append('pagination[page]', options.pagination.page.toString())
    }
    if (options.pagination?.pageSize) {
      params.append('pagination[pageSize]', options.pagination.pageSize.toString())
    }

    return this.fetchAPI<StrapiItem[]>(`/blog-posts?${params.toString()}`)
  }

  async getBlogPost(slug: string) {
    const params = new URLSearchParams()
    params.append('filters[slug][$eq]', slug)
    params.append('populate[]', 'featured_image')
    params.append('populate[]', 'tags')

    const response = await this.fetchAPI<StrapiItem[]>(`/blog-posts?${params.toString()}`)
    return response.data[0] || null
  }

  // Events
  async getEvents(options: {
    populate?: string[]
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page?: number; pageSize?: number }
  } = {}) {
    const params = new URLSearchParams()
    
    if (options.populate) {
      options.populate.forEach(field => params.append('populate[]', field))
    } else {
      params.append('populate[]', 'featured_image')
      params.append('populate[]', 'gallery')
      params.append('populate[]', 'tags')
    }

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(`filters[${key}]`, value as string)
      })
    }

    if (options.sort) {
      options.sort.forEach(sortField => params.append('sort[]', sortField))
    } else {
      params.append('sort[]', 'start_date:desc')
    }

    if (options.pagination?.page) {
      params.append('pagination[page]', options.pagination.page.toString())
    }
    if (options.pagination?.pageSize) {
      params.append('pagination[pageSize]', options.pagination.pageSize.toString())
    }

    return this.fetchAPI<StrapiItem[]>(`/events?${params.toString()}`)
  }

  // Team Info (Single Type)
  async getTeamInfo() {
    const params = new URLSearchParams()
    params.append('populate[]', 'team_photo')
    params.append('populate[]', 'team_logo')
    params.append('populate[]', 'social_links')

    const response = await this.fetchAPI<StrapiItem>(`/team-info?${params.toString()}`)
    return response.data
  }

  // Tags
  async getTags() {
    const params = new URLSearchParams()
    params.append('sort[]', 'name:asc')

    return this.fetchAPI<StrapiItem[]>(`/tags?${params.toString()}`)
  }

  // Featured content
  async getFeaturedBlogPosts(limit = 3) {
    return this.getBlogPosts({
      filters: { is_featured: true },
      pagination: { pageSize: limit }
    })
  }

  async getFeaturedEvents(limit = 3) {
    return this.getEvents({
      filters: { is_featured: true },
      pagination: { pageSize: limit }
    })
  }
}

// Export singleton instance
export const strapiClient = new StrapiClient()

// Helper function to get media URL
export function getStrapiMediaUrl(media: any): string | null {
  if (!media?.data?.attributes?.url) return null
  
  const url = media.data.attributes.url
  
  // If it's already a full URL, return it
  if (url.startsWith('http')) {
    return url
  }
  
  // Otherwise, prepend Strapi base URL
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'http://localhost:1337'
  return `${baseUrl}${url}`
}
