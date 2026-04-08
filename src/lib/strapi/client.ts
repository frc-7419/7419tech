// Strapi API client for fetching content.
// In the browser, we MUST go through our same-origin proxy to avoid CORS fragility.
const STRAPI_API_URL =
  typeof window !== 'undefined'
    ? '/api/strapi'
    : (process.env.STRAPI_API_URL ||
      process.env.NEXT_PUBLIC_STRAPI_API_URL ||
      'https://innovative-luck-8fe8e1c24e.strapiapp.com/api')

// Helper to get the base URL for media files
const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL?.replace('/api', '') || 'https://innovative-luck-8fe8e1c24e.strapiapp.com'

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


  // Tags
  async getTags() {
    const params = new URLSearchParams()
    params.append('sort[]', 'name:asc')

    return this.fetchAPI<StrapiItem[]>(`/tags?${params.toString()}`)
  }

  // Sponsors
  async getSponsors(options: {
    populate?: string[]
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page?: number; pageSize?: number }
  } = {}) {
    const params = new URLSearchParams()
    
    if (options.populate) {
      options.populate.forEach(field => params.append('populate[]', field))
    } else {
      params.append('populate[]', 'logo')
    }

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(`filters[${key}]`, value as string)
      })
    }

    if (options.sort) {
      options.sort.forEach(sortField => params.append('sort[]', sortField))
    } else {
      params.append('sort[]', 'display_order:asc')
      params.append('sort[]', 'name:asc')
    }

    if (options.pagination?.page) {
      params.append('pagination[page]', options.pagination.page.toString())
    }
    if (options.pagination?.pageSize) {
      params.append('pagination[pageSize]', options.pagination.pageSize.toString())
    }

    return this.fetchAPI<StrapiItem[]>(`/sponsors?${params.toString()}`)
  }

  // Media Items (Dynamic Media)
  async getMediaItems(options: {
    populate?: string[]
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page?: number; pageSize?: number; limit?: number }
  } = {}) {
    const params = new URLSearchParams()
    
    if (options.populate) {
      options.populate.forEach(field => params.append('populate[]', field))
    } else {
      params.append('populate[]', 'image')
    }

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(`filters[${key}]`, value as string)
      })
    }

    if (options.sort) {
      options.sort.forEach(sortField => params.append('sort[]', sortField))
    } else {
      params.append('sort[]', 'display_order:asc')
    }

    if (options.pagination?.page) {
      params.append('pagination[page]', options.pagination.page.toString())
    }
    if (options.pagination?.pageSize || options.pagination?.limit) {
      const limit = options.pagination.pageSize || options.pagination.limit || 25
      params.append('pagination[pageSize]', limit.toString())
    }

    return this.fetchAPI<StrapiItem[]>(`/media-items?${params.toString()}`)
  }

  // Student Leaders
  async getStudentLeaders(options: {
    populate?: string[]
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page?: number; pageSize?: number }
  } = {}) {
    const params = new URLSearchParams()
    
    if (options.populate) {
      options.populate.forEach(field => params.append('populate[]', field))
    } else {
      params.append('populate[]', 'profile_picture')
    }

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        params.append(`filters[${key}]`, value as string)
      })
    }

    if (options.sort) {
      options.sort.forEach(sortField => params.append('sort[]', sortField))
    } else {
      params.append('sort[]', 'display_order:asc')
      params.append('sort[]', 'name:asc')
    }

    if (options.pagination?.page) {
      params.append('pagination[page]', options.pagination.page.toString())
    }
    if (options.pagination?.pageSize) {
      params.append('pagination[pageSize]', options.pagination.pageSize.toString())
    }

    return this.fetchAPI<StrapiItem[]>(`/student-leaders?${params.toString()}`)
  }

  // Featured content
  async getFeaturedBlogPosts(limit = 3) {
    return this.getBlogPosts({
      filters: { is_featured: true },
      pagination: { pageSize: limit }
    })
  }


  async getActiveSponsors() {
    return this.getSponsors({
      filters: { is_active: true }
    })
  }

  async getMediaBySeason(season: string) {
    return this.getMediaItems({
      filters: { season: season }
    })
  }

  // Helper method for common season values
  async getMedia2024() {
    return this.getMediaBySeason('season_2024_25')
  }

  async getMedia2023() {
    return this.getMediaBySeason('season_2023_24')
  }

  async getCurrentLeadership() {
    return this.getStudentLeaders({
      filters: { is_current: true }
    })
  }

  // Outreach Programs
  async getOutreachPrograms(options: {
    populate?: string[]
    filters?: Record<string, any>
    sort?: string[]
    pagination?: { page?: number; pageSize?: number }
  } = {}) {
    const params = new URLSearchParams()

    if (options.populate) {
      options.populate.forEach(field => params.append('populate[]', field))
    } else {
      params.append('populate[]', 'image')
    }

    // Strapi v5 REST expects equality via [$eq]. Plain filters[key]=value often matches nothing.
    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        if (value === undefined || value === null) return
        const encoded =
          typeof value === 'boolean' ? String(value) : String(value)
        params.append(`filters[${key}][$eq]`, encoded)
      })
    }

    if (options.sort) {
      options.sort.forEach(sortField => params.append('sort[]', sortField))
    } else {
      params.append('sort[]', 'display_order:asc')
    }

    if (options.pagination?.page) {
      params.append('pagination[page]', options.pagination.page.toString())
    }
    if (options.pagination?.pageSize) {
      params.append('pagination[pageSize]', options.pagination.pageSize.toString())
    }

    return this.fetchAPI<StrapiItem[]>(`/outreach-programs?${params.toString()}`)
  }

  async getActiveOutreachPrograms() {
    return this.getOutreachPrograms({
      filters: { is_active: true }
    })
  }

  async getOutreachByCategory(category: 'local' | 'global' | 'first-like-a-girl') {
    return this.getOutreachPrograms({
      filters: { category, is_active: true }
    })
  }
}

// Export singleton instance
export const strapiClient = new StrapiClient()

type StrapiImageFormat = 'thumbnail' | 'small' | 'medium' | 'large'

// Helper function to get media URL.
// Pass a preferred `format` to use Strapi's auto-generated smaller variants
// (thumbnail/small/medium/large) instead of the full original upload.
// Falls back to the full-size URL if the requested format doesn't exist.
export function getStrapiMediaUrl(media: any, format?: StrapiImageFormat): string | null {
  if (!media) return null

  // Strapi v4 format (nested in data.attributes)
  const attrs = media.data?.attributes ?? media

  // Try the requested format first (e.g. medium ~750px wide vs multi-MB originals)
  if (format) {
    const formatUrl =
      attrs.formats?.[format]?.url ??
      media.formats?.[format]?.url ??
      null

    if (formatUrl) {
      return formatUrl.startsWith('http') ? formatUrl : `${STRAPI_BASE_URL}${formatUrl}`
    }
  }

  // Fall back to the full-size URL
  const url: string | null = attrs.url ?? media.url ?? null

  if (!url) return null
  return url.startsWith('http') ? url : `${STRAPI_BASE_URL}${url}`
}
