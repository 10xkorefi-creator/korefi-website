'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BlogPost } from '@/lib/supabase'
import { Navbar } from '@/components/korefi/navbar'
import { Footer } from '@/components/korefi/footer'

function getBlogImageUrl(post: BlogPost): string {
  if (post.Image && post.Image.trim() !== '') {
    return post.Image
  }
  return `/api/og?title=${encodeURIComponent(post.Name)}`
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function BlogPostImage({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  return (
    <div className="relative w-full h-full overflow-hidden rounded-[10px] shadow-md" style={{ backgroundColor: '#1a1a3e' }}>
      {/* Blurry placeholder - mimics the OG image style */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ease-out ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
        style={{
          background: 'linear-gradient(135deg, #00008d 0%, #000020 50%, #0a0a2e 100%)',
        }}
      >
        {/* Subtle animated glow effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 30% 40%, rgba(100, 149, 237, 0.4) 0%, transparent 50%)',
            animation: 'pulse 2s ease-in-out infinite',
          }}
        />
      </div>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  )
}

interface Props {
  post: BlogPost
}

export default function BlogPostClient({ post }: Props) {
  const richText = post['rich - text'] || ''

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAFAF7' }}>
      <Navbar />
      
      <article className="pt-32 pb-20 px-6">
        {/* Header - Two Column Layout */}
        <header className="max-w-[960px] mx-auto mb-10">
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
              <BlogPostImage src={getBlogImageUrl(post)} alt={post.Name} />
            </div>
          </div>
        </header>

        <div className="max-w-[960px] mx-auto">
          {/* Divider */}
          <div
            className="h-[1px] mb-10"
            style={{ backgroundColor: '#E0DED6' }}
          />

          {/* Content */}
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: richText }}
          />
        </div>
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
        }

        .blog-content h3 {
          font-family: var(--font-playfair), 'Playfair Display', Georgia, serif;
          font-size: 22px;
          font-weight: 500;
          line-height: 1.35;
          color: #111110;
          margin-top: 36px;
          margin-bottom: 16px;
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
