'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { strapiClient, getStrapiMediaUrl } from '@/lib/strapi/client'
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
          console.log('Found post:', foundPost)
          console.log('Featured image:', (foundPost as any).featured_image)
          setPost(foundPost as unknown as BlogPost)
        } else {
          setError('Blog post not found')
        }
      } catch (err) {
        setError('Failed to load blog post')
        console.error('Error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-8"></div>
              <div className="h-64 bg-gray-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || 'Blog post not found'}
          </h1>
          <Link 
            href="/blog"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
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
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back to blog link */}
          <Link 
            href="/blog"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>

          {/* Blog post header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <span>By {post.author}</span>
              <span>•</span>
              <span>{formatDate(post.createdAt)}</span>
              <span>•</span>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {post.category}
              </span>
            </div>

            {post.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Featured image */}
          {post.featured_image && (
            <div className="mb-8">
              <img
                src={getStrapiMediaUrl(post.featured_image) || ''}
                alt={post.featured_image.alternativeText || post.title}
                className="w-full h-auto rounded-lg shadow-lg max-w-4xl mx-auto"
              />
            </div>
          )}

          {/* Blog content */}
          <article className="prose prose-lg max-w-none">
            <div 
              className="text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Back to blog footer */}
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
  )
}
