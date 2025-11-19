'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { NavHeader } from "@/components/NavHeader"
import { strapiClient, getStrapiMediaUrl } from '@/lib/strapi/client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

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
        <motion.div 
          className="bg-gradient-to-r from-[#11224e] via-[#7c3aed] to-[#11224e] text-white pt-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-4">Team 7419 Blog</h1>
              <p className="text-xl opacity-90">
                Latest updates, insights, and stories from our robotics journey
              </p>
            </div>
          </div>
        </motion.div>

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
                        <Link key={post.id} href={`/blog/${post.slug}`}>
                          <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                          {post.featured_image && (
                            <div className="h-48 bg-gray-200 overflow-hidden">
                              <Image
                                src={getStrapiMediaUrl(post.featured_image) ?? ''}
                                alt={post.title}
                                width={800}
                                height={400}
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
                            <h3 className="text-xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">{post.title}</h3>
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
                            <div className="mt-4 text-blue-600 font-medium text-sm flex items-center">
                              Read more 
                              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </CardContent>
                        </Card>
                        </Link>
                      ))}
                  </div>
                </div>
              )}

              {/* All Posts */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-8">All Posts</h2>
                <motion.div 
                  className="grid gap-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{ 
                    hidden: {}, 
                    visible: { transition: { staggerChildren: 0.06 } } 
                  }}
                >
                  {blogPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={{
                        hidden: { opacity: 0, y: 14 },
                        visible: { opacity: 1, y: 0, transition: { duration: 0.25, ease: 'easeOut' } }
                      }}
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer">
                      <div className="md:flex">
                        {post.featured_image && (
                          <div className="md:w-1/3 h-48 md:h-auto bg-gray-200">
                            <Image
                              src={getStrapiMediaUrl(post.featured_image) ?? ''}
                              alt={post.title}
                              width={400}
                              height={300}
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
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">{post.title}</h3>
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
                          <div className="mt-4 text-blue-600 font-medium text-sm flex items-center">
                            Read more 
                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

