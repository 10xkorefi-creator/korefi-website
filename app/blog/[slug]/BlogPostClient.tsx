'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BlogPost } from '@/lib/supabase'
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

// Generate a slug ID from heading text
function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// Headings to exclude from ToC
const EXCLUDED_HEADINGS = ['key takeaways', 'faq']

interface TocItem {
  id: string
  text: string
  level: 2 | 3
}

// Parse headings from HTML and build ToC structure
function parseHeadings(html: string): TocItem[] {
  const headingRegex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi
  const items: TocItem[] = []
  let match

  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]) as 2 | 3
    const text = match[2].replace(/<[^>]*>/g, '').trim()
    
    if (EXCLUDED_HEADINGS.includes(text.toLowerCase())) {
      continue
    }
    
    const id = generateSlug(text)
    items.push({ id, text, level })
  }

  return items
}

// Inject IDs into headings in HTML content
function injectHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h([23])>/gi, (match, level, attrs, content) => {
    const text = content.replace(/<[^>]*>/g, '').trim()
    const id = generateSlug(text)
    if (attrs.includes('id=')) {
      return match
    }
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`
  })
}

// Table of Contents component - Sticky sidebar version with active state tracking
function TableOfContents({ items, activeId }: { items: TocItem[]; activeId: string }) {
  if (items.length === 0) return null

  const groupedItems: { h2: TocItem; h3s: TocItem[] }[] = []
  let currentGroup: { h2: TocItem; h3s: TocItem[] } | null = null

  for (const item of items) {
    if (item.level === 2) {
      if (currentGroup) {
        groupedItems.push(currentGroup)
      }
      currentGroup = { h2: item, h3s: [] }
    } else if (item.level === 3 && currentGroup) {
      currentGroup.h3s.push(item)
    }
  }
  if (currentGroup) {
    groupedItems.push(currentGroup)
  }

  // Check if an h2 or any of its h3s is active
  const isGroupActive = (group: { h2: TocItem; h3s: TocItem[] }) => {
    return group.h2.id === activeId || group.h3s.some(h3 => h3.id === activeId)
  }

  return (
    <nav 
      aria-label="Table of Contents"
      className="hidden lg:block sticky top-28 w-[220px] flex-shrink-0"
    >
      <span 
        className="block font-sans text-[11px] font-medium uppercase tracking-wide mb-4"
        style={{ color: '#9a9488' }}
      >
        Contents
      </span>
      <ul className="space-y-1 border-l" style={{ borderColor: '#E0DED6' }}>
        {groupedItems.map((group) => {
          const isH2Active = group.h2.id === activeId
          const isChildActive = group.h3s.some(h3 => h3.id === activeId)
          const showAsActive = isH2Active || isChildActive
          
          return (
            <li key={group.h2.id}>
              <a 
                href={`#${group.h2.id}`}
                className={`block pl-3 py-1 font-sans text-[13px] leading-snug transition-colors hover:text-[#314dd0] ${showAsActive ? 'border-l-2 -ml-[1px]' : ''}`}
                style={{ 
                  color: showAsActive ? '#314dd0' : '#5a5a54',
                  borderColor: showAsActive ? '#314dd0' : 'transparent',
                  fontWeight: showAsActive ? 500 : 400
                }}
              >
                {group.h2.text}
              </a>
              {group.h3s.length > 0 && (
                <ul className="space-y-0.5 mt-0.5">
                  {group.h3s.map((h3) => {
                    const isH3Active = h3.id === activeId
                    return (
                      <li key={h3.id}>
                        <a 
                          href={`#${h3.id}`}
                          className={`block pl-6 py-0.5 font-sans text-[12px] leading-snug transition-colors hover:text-[#314dd0] ${isH3Active ? 'border-l-2 -ml-[1px]' : ''}`}
                          style={{ 
                            color: isH3Active ? '#314dd0' : '#9a9488',
                            borderColor: isH3Active ? '#314dd0' : 'transparent',
                            fontWeight: isH3Active ? 500 : 400
                          }}
                        >
                          {h3.text}
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

interface Props {
  post: BlogPost
  relatedPosts: BlogPost[]
}

export default function BlogPostClient({ post, relatedPosts }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const richText = post['rich - text'] || ''
  
  // Parse headings for ToC and inject IDs into content
  const tocItems = parseHeadings(richText)
  const contentWithIds = injectHeadingIds(richText)

  // Track active section based on scroll position
  useEffect(() => {
    const headingIds = tocItems.map(item => item.id)
    if (headingIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-100px 0px -60% 0px',
        threshold: 0
      }
    )

    headingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [tocItems])

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAFAF7' }}>
      <Navbar onOpenModal={() => setIsModalOpen(true)} />
      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      
      <article className="pt-32 pb-20 px-6">
        {/* Header - Two Column Layout */}
        <header className="max-w-[720px] lg:max-w-[1000px] mx-auto mb-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[14px] font-medium mb-6 transition-colors hover:opacity-70"
            style={{ color: '#314dd0' }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Blog
          </Link>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-stretch">
            {/* Left Column - Title and Meta (3/5 = 60%) */}
            <div className="w-full md:w-3/5 order-2 md:order-1">
              <time
                className="text-[14px] font-medium"
                style={{ color: '#9a9488' }}
              >
                {formatDate(post.created_at)}
              </time>
              <h1
                className="font-serif text-[32px] md:text-[42px] font-medium mt-3"
                style={{ color: '#111110', lineHeight: 1.15 }}
              >
                {post.Name}
              </h1>
              {post.Description && (
                <p
                  className="text-[17px] mt-4"
                  style={{ color: '#5a5a54', lineHeight: 1.6 }}
                >
                  {post.Description}
                </p>
              )}
            </div>
            
            {/* Right Column - Image (2/5 = 40%) */}
            <div className="w-full md:w-2/5 order-1 md:order-2">
              <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[10px] shadow-md">
                <Image
                  src={post.Image || `/api/og?title=${encodeURIComponent(post.Name)}`}
                  alt={post.Name}
                  width={1200}
                  height={630}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-center w-full h-full"
                  priority
                  quality={85}
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
              </div>
            </div>
          </div>
        </header>

        {/* Two Column Layout: Content + Sticky ToC */}
        <div className="max-w-[720px] lg:max-w-[1000px] mx-auto lg:flex lg:gap-12">
          {/* Main Content Column */}
          <div className="flex-1 lg:max-w-[720px]">
            {/* Author Card - Minimal */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-[36px] h-[36px] rounded-full overflow-hidden flex-shrink-0"
                style={{ border: '1px solid #E0DED6' }}
              >
                <img
                  src="/Vijay.png"
                  alt="Vijay Lohchab"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[13px] font-medium" style={{ color: '#111110' }}>
                  Vijay Lohchab
                </span>
                <span className="text-[13px]" style={{ color: '#9a9488' }}>
                  Founding member, Korefi
                </span>
                <a 
                  href="https://www.linkedin.com/in/vijay-lohchab/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:opacity-70 transition-opacity ml-1"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#0A66C2">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Divider */}
            <div
              className="h-[1px] mb-10"
              style={{ backgroundColor: '#E0DED6' }}
            />

            {/* Content */}
            <div
              className="blog-content"
              dangerouslySetInnerHTML={{ __html: contentWithIds }}
            />
          </div>

          {/* Sticky Table of Contents - Right Side */}
          <TableOfContents items={tocItems} activeId={activeId} />
        </div>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="max-w-[720px] lg:max-w-[1000px] mx-auto mt-16">
            <h2 
              className="font-serif text-[24px] font-medium mb-6"
              style={{ color: '#111110' }}
            >
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="block p-4 rounded-lg border transition-colors hover:bg-[#F3F2EC]"
                  style={{ borderColor: '#E0DED6' }}
                >
                  <div className="relative aspect-video w-full mb-3 overflow-hidden rounded-lg" style={{ backgroundColor: '#E8E6DE' }}>
                    <Image
                      src={relatedPost.Image || `/api/og?title=${encodeURIComponent(relatedPost.Name)}`}
                      alt={relatedPost.Name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                      quality={75}
                    />
                  </div>
                  <time
                    className="text-[12px] font-medium"
                    style={{ color: '#9a9488' }}
                  >
                    {formatDate(relatedPost.created_at)}
                  </time>
                  <h3
                    className="font-serif text-[16px] font-medium mt-1 line-clamp-2"
                    style={{ color: '#111110', lineHeight: 1.3 }}
                  >
                    {relatedPost.Name}
                  </h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />

      {/* Blog Content Styles */}
      <style jsx global>{`
        .blog-content {
          font-size: 17px;
          line-height: 1.75;
          color: #111110;
        }

        .blog-content h2 {
          font-family: var(--font-playfair), 'Playfair Display', Georgia, serif;
          font-size: 28px;
          font-weight: 500;
          line-height: 1.3;
          color: #111110;
          margin-top: 48px;
          margin-bottom: 20px;
          scroll-margin-top: 100px;
        }

        .blog-content h3 {
          font-family: var(--font-playfair), 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 500;
          line-height: 1.35;
          color: #111110;
          margin-top: 36px;
          margin-bottom: 16px;
          scroll-margin-top: 100px;
        }

        .blog-content h4 {
          font-family: var(--font-dm-sans), 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.4;
          color: #111110;
          margin-top: 28px;
          margin-bottom: 12px;
        }

        .blog-content p {
          margin-bottom: 20px;
          color: #333;
        }

        .blog-content a {
          color: #314dd0;
          text-decoration: underline;
          text-underline-offset: 3px;
          transition: opacity 0.2s;
        }

        .blog-content a:hover {
          opacity: 0.7;
        }

        .blog-content strong {
          font-weight: 600;
          color: #111110;
        }

        .blog-content em {
          font-style: italic;
        }

        .blog-content ul,
        .blog-content ol {
          margin-top: 16px;
          margin-bottom: 24px;
          padding-left: 24px;
        }

        .blog-content ul {
          list-style-type: disc;
        }

        .blog-content ol {
          list-style-type: decimal;
        }

        .blog-content li {
          margin-bottom: 10px;
          padding-left: 8px;
        }

        .blog-content li::marker {
          color: #314dd0;
        }

        .blog-content blockquote {
          border-left: 3px solid #314dd0;
          padding-left: 20px;
          margin: 28px 0;
          font-style: italic;
          color: #5a5a54;
        }

        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 28px 0;
          font-size: 15px;
        }

        .blog-content th,
        .blog-content td {
          border: 1px solid #E0DED6;
          padding: 12px 16px;
          text-align: left;
        }

        .blog-content th {
          background-color: #F3F2EC;
          font-weight: 600;
          color: #111110;
        }

        .blog-content tr:nth-child(even) {
          background-color: #FAFAF7;
        }

        .blog-content code {
          font-family: var(--font-mono), monospace;
          font-size: 14px;
          background-color: #F3F2EC;
          padding: 2px 6px;
          border-radius: 4px;
          color: #111110;
        }

        .blog-content pre {
          background-color: #111110;
          color: #FAFAF7;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
          margin: 24px 0;
        }

        .blog-content pre code {
          background-color: transparent;
          padding: 0;
          color: inherit;
        }

        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 24px 0;
        }

        .blog-content hr {
          border: none;
          height: 1px;
          background-color: #E0DED6;
          margin: 40px 0;
        }

        /* First element shouldn't have top margin */
        .blog-content > *:first-child {
          margin-top: 0;
        }

        /* Last element shouldn't have bottom margin */
        .blog-content > *:last-child {
          margin-bottom: 0;
        }
      `}</style>
    </main>
  )
}
