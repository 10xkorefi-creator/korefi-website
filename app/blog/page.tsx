'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { supabase, BlogPost } from '@/lib/supabase'
import { Navbar } from '@/components/korefi/navbar'
import { Footer } from '@/components/korefi/footer'
import { WaitlistModal } from '@/components/korefi/waitlist-modal'

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPj/HwADBwIAMCbHYQAAAABJRU5ErkJggg=="

function BlogCardImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="relative aspect-video w-full mb-4 overflow-hidden rounded-lg" style={{ backgroundColor: '#E8E6DE' }}>
      <Image
        src={src}
        alt={alt}
        width={400}
        height={210}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover w-full h-full"
        quality={75}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  )
}

function BlogCardSkeleton() {
  return (
    <div className="p-4 border rounded-lg animate-pulse" style={{ borderColor: '#E0DED6' }}>
      <div className="aspect-video w-full rounded-lg mb-4" style={{ backgroundColor: '#E0DED6' }} />
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
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from('korefi_blog')
          .select('id, created_at, Name, slug, Description, Image')
          .order('created_at', { ascending: false })

        if (error) throw error
        setPosts(data || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAFAF7' }}>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-[1200px] mx-auto">
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </div>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post, index) => {
                const imageUrl = post.Image || `/api/og?title=${encodeURIComponent(post.Name)}`
                const isFirstRow = index < 3
                return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="block p-4 transition-colors duration-200 hover:bg-[#F3F2EC] rounded-lg border"
                  style={{ borderColor: '#E0DED6' }}
                >
                  <BlogCardImage src={imageUrl} alt={post.Name} priority={isFirstRow} />
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
              )})}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
