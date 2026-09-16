'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PageShell } from "@/components/PageShell"
import { PagePhotoHeader } from "@/components/ui/page-photo-header"
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
      <PageShell>
        <div className="min-h-screen bg-[#122350] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[hsl(var(--brand-gold))] mx-auto"></div>
            <p className="mt-4 text-white/70">Loading blog posts...</p>
          </div>
        </div>
      </PageShell>
    )
  }

  if (error) {
    return (
      <PageShell>
        <div className="min-h-screen bg-[#122350] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <p className="font-bold">Unable to load blog</p>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <div className="bg-white">
        <PagePhotoHeader
          photo="/static/media2026/ftc-volunteers.jpg"
          eyebrow="Team Blog"
          title="Latest Updates"
          description="Stories, insights, and updates from our robotics journey."
        />

        {/* Blog Content */}
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
          {blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-3xl font-bold text-[#122350] mb-4">No Posts Yet</h2>
              <p className="text-[#122350]/70 mb-8">
                Our team is working on exciting content. Check back soon!
              </p>
            </div>
          ) : (
            <>
              {/* Featured Posts */}
              {blogPosts.some(post => post.is_featured) && (
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-[#122350] mb-8 flex items-center">
                    <Star className="mr-3 text-[#FFB419]" />
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
                            <div className="h-48 bg-[#122350]/10 overflow-hidden">
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
                              <Badge variant="outline" className="text-[#FFB419] border-[#FFB419]/50">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            </div>
                            <h3 className="text-xl font-bold text-[#122350] mb-2 hover:text-[#122350] transition-colors">{post.title}</h3>
                            <p className="text-[#122350]/70 mb-4">{post.excerpt}</p>
                            <div className="flex items-center justify-between text-sm text-[#122350]/70">
                              <span className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {post.author}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(post.publishedAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="mt-4 text-[#122350] font-medium text-sm flex items-center">
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
                <h2 className="text-3xl font-bold text-[#122350] mb-8">All Posts</h2>
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
                          <div className="md:w-1/3 h-48 md:h-auto bg-[#122350]/10">
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
                              <Badge variant="outline" className="text-[#FFB419] border-[#FFB419]/50">
                                <Star className="w-3 h-3 mr-1" />
                                Featured
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-[#122350] mb-2 hover:text-[#122350] transition-colors">{post.title}</h3>
                          <p className="text-[#122350]/70 mb-4">{post.excerpt}</p>
                          <div className="flex items-center justify-between text-sm text-[#122350]/70">
                            <span className="flex items-center">
                              <User className="w-4 h-4 mr-1" />
                              {post.author}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="mt-4 text-[#122350] font-medium text-sm flex items-center">
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
    </PageShell>
  )
}

