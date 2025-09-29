'use client'

import { useState, useEffect } from 'react'
import { NavHeader } from "@/components/NavHeader"
import { strapiClient } from '@/lib/strapi/client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Star } from 'lucide-react'

interface BlogPost {
  id: number
  documentId: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  category: string
  is_featured: boolean
  publishedAt: string
  featured_image?: {
    id: number
    url: string
    name: string
    alternativeText?: string
  }
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogPosts() {
      try {
        const response = await strapiClient.getBlogPosts()
        setBlogPosts(response.data as unknown as BlogPost[])
      } catch (err) {
        setError('Failed to load blog posts')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  if (loading) {
    return (
      <>
        <NavHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <NavHeader />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">Unable to load blog</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <NavHeader />
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Team 7419 Blog</h1>
              <p className="text-xl opacity-90">
                Latest updates, insights, and stories from our robotics journey
              </p>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          {blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">No Posts Yet</h2>
              <p className="text-gray-600 mb-8">
                Our team is working on exciting content. Check back soon!
              </p>
            </div>
          ) : (
            <>
              {/* Featured Posts */}
              {blogPosts.some(post => post.is_featured) && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                    <Star className="mr-3 text-yellow-500" />
                    Featured Posts
                  </h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {blogPosts
                      .filter(post => post.is_featured)
                      .slice(0, 2)
                      .map((post) => (
                        <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                          {post.featured_image && (
                            <div className="h-48 bg-gray-200 overflow-hidden">
                              <img
                                src={`http://localhost:1337${post.featured_image.url}`}
                                alt={post.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform"
                              />
                            </div>
                          )}
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary">{post.category}</Badge>
                              <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {post.author}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(post.publishedAt).toLocaleDateString()}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">All Posts</h2>
                <div className="grid gap-8">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="md:flex">
                        {post.featured_image && (
                          <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
                            <img
                              src={`http://localhost:1337${post.featured_image.url}`}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <CardContent className="md:w-2/3 p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Badge variant="secondary">{post.category}</Badge>
                            {post.is_featured && (
                              <Badge variant="outline" className="text-yellow-600 border-yellow-300">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">{post.title}</h3>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {post.author}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

