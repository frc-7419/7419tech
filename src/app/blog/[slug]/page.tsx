'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { strapiClient, getStrapiMediaUrl } from '@/lib/strapi/client'
import { PageShell } from "@/components/PageShell"
import Link from 'next/link'
import Image from 'next/image'

interface BlogPost {
  documentId: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image?: {
    url: string
    alternativeText?: string
  }
  author: string
  category: string
  seo_title?: string
  seo_description?: string
  is_featured: boolean
  tags?: string[]
  createdAt: string
  updatedAt: string
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBlogPost() {
      if (!slug) return
      
      try {
        // Get all blog posts and find the one with matching slug
        const response = await strapiClient.getBlogPosts({
          populate: ['featured_image']
        })
        
        // Find the post with matching slug
        const foundPost = response.data.find((post: any) => post.slug === slug)
        
        if (foundPost) {
          setPost(foundPost as unknown as BlogPost)
        } else {
          setError('Blog post not found')
        }
      } catch (err) {
        setError('Failed to load blog post')
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPost()
  }, [slug])

  if (loading) {
    return (
      <PageShell>
        <div className="bg-white pt-24">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-4xl mx-auto">
              <div className="animate-pulse">
                <div className="h-8 bg-[#122350]/10 rounded mb-4"></div>
                <div className="h-4 bg-[#122350]/10 rounded mb-2"></div>
                <div className="h-4 bg-[#122350]/10 rounded mb-8"></div>
                <div className="h-64 bg-[#122350]/10 rounded mb-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-[#122350]/10 rounded"></div>
                  <div className="h-4 bg-[#122350]/10 rounded"></div>
                  <div className="h-4 bg-[#122350]/10 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PageShell>
    )
  }

  if (error || !post) {
    return (
      <PageShell>
        <div className="min-h-screen bg-white flex items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#122350] mb-4">
              {error || 'Blog post not found'}
            </h1>
            <Link
              href="/blog"
              className="text-[#122350] hover:text-[#122350]/80 underline"
            >
              ← Back to Blog
            </Link>
          </div>
        </div>
      </PageShell>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <PageShell>
      <div className="bg-white pt-24">
        <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back to blog link */}
          <Link 
            href="/blog"
            className="inline-flex items-center text-[#122350] hover:text-[#122350]/80 mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Blog post header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-[#122350] mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-[#122350]/70 mb-6">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
              <span>•</span>
              <span className="bg-[#122350]/5 text-[#122350] px-2 py-1 rounded">
                {post.category}
              </span>
            </div>

            {post.excerpt && (
              <p className="text-xl text-[#122350]/70 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Featured image */}
          {post.featured_image && (
            <div className="mb-8">
              <Image
                src={getStrapiMediaUrl(post.featured_image) || ''}
                alt={post.featured_image.alternativeText || post.title}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg shadow-lg max-w-4xl mx-auto"
              />
            </div>
          )}

          {/* Blog content */}
          <article className="prose prose-lg max-w-none">
            <div 
              className="text-[#122350] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#122350]/15">
              <h3 className="text-sm font-medium text-[#122350] mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-[#122350]/5 text-[#122350] px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog footer */}
          <div className="mt-12 pt-8 border-t border-[#122350]/15 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center bg-[#122350] text-white px-6 py-3 rounded-lg hover:bg-[#122350]/90 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to All Posts
            </Link>
          </div>
        </div>
        </div>
      </div>
    </PageShell>
  )
}
