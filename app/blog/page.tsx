'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, BlogPost } from '@/lib/supabase'
import { Navbar } from '@/components/korefi/navbar'
import { Footer } from '@/components/korefi/footer'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function BlogCardSkeleton() {
  return (
    <div className="py-8 border-b animate-pulse" style={{ borderColor: '#E0DED6' }}>
      <div className="h-4 w-32 rounded mb-4" style={{ backgroundColor: '#E0DED6' }} />
      <div className="h-7 w-3/4 rounded mb-3" style={{ backgroundColor: '#E0DED6' }} />
      <div className="h-4 w-full rounded mb-2" style={{ backgroundColor: '#E0DED6' }} />
      <div className="h-4 w-2/3 rounded" style={{ backgroundColor: '#E0DED6' }} />
    </div>
  )
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        console.log('[v0] Fetching posts from korefi_blog table...')
        console.log('[v0] Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        
        const { data, error } = await supabase
          .from('korefi_blog')
          .select('id, created_at, Name, slug, Description')
          .order('created_at', { ascending: false })

        console.log('[v0] Supabase response - data:', data)
        console.log('[v0] Supabase response - error:', error)

        if (error) throw error
        setPosts(data || [])
      } catch (err) {
        console.log('[v0] Fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAFAF7' }}>
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-[720px] mx-auto">
          {/* Header */}
          <div className="mb-12">
            <span
              className="inline-block text-[11px] uppercase font-medium tracking-widest mb-4"
              style={{ color: '#9a9488' }}
            >
              INSIGHTS
            </span>
            <h1
              className="font-serif text-[42px] font-medium mb-4"
              style={{ color: '#111110', lineHeight: 1.15 }}
            >
              KoreFi Blog
            </h1>
            <p
              className="text-[17px]"
              style={{ color: '#5a5a54', lineHeight: 1.6 }}
            >
              Expert insights on restaurant tax credits, accounting best practices, and financial strategies for restaurant owners.
            </p>
          </div>

          {/* Blog List */}
          <div>
            {loading ? (
              <>
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </>
            ) : error ? (
              <div
                className="py-8 text-center rounded-lg"
                style={{ backgroundColor: '#F3F2EC', color: '#5a5a54' }}
              >
                <p>Unable to load blog posts. Please try again later.</p>
              </div>
            ) : posts.length === 0 ? (
              <div
                className="py-8 text-center rounded-lg"
                style={{ backgroundColor: '#F3F2EC', color: '#5a5a54' }}
              >
                <p>No blog posts yet. Check back soon!</p>
              </div>
            ) : (
              posts.map((post, index) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block py-8 border-b transition-colors duration-200 hover:bg-[#F3F2EC] -mx-4 px-4 rounded-lg"
                  style={{ borderColor: index === posts.length - 1 ? 'transparent' : '#E0DED6' }}
                >
                  <time
                    className="text-[13px] font-medium"
                    style={{ color: '#9a9488' }}
                  >
                    {formatDate(post.created_at)}
                  </time>
                  <h2
                    className="font-serif text-[24px] font-medium mt-2 mb-2"
                    style={{ color: '#111110', lineHeight: 1.3 }}
                  >
                    {post.Name}
                  </h2>
                  {post.Description && (
                    <p
                      className="text-[15px] line-clamp-2"
                      style={{ color: '#5a5a54', lineHeight: 1.6 }}
                    >
                      {post.Description}
                    </p>
                  )}
                  <span
                    className="inline-flex items-center gap-1 mt-3 text-[14px] font-medium"
                    style={{ color: '#314dd0' }}
                  >
                    Read more
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 12L10 8L6 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
