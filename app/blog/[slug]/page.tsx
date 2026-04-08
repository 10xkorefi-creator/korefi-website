import { supabase, BlogPost } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  console.log('[v0] Fetching post with slug:', slug)
  
  const { data, error } = await supabase
    .from('korefi_blog')
    .select('*')
    .eq('slug', slug)
    .single()

  console.log('[v0] Post fetch result - data:', data)
  console.log('[v0] Post fetch result - error:', error)

  if (error || !data) return null
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post Not Found — KoreFi Blog',
    }
  }

  const ogImageUrl = `/api/og?title=${encodeURIComponent(post.Name)}`

  return {
    title: `${post.Name} — KoreFi Blog`,
    description: post.Description || 'Read this article on the KoreFi Blog.',
    openGraph: {
      title: post.Name,
      description: post.Description || 'Read this article on the KoreFi Blog.',
      type: 'article',
      publishedTime: post.created_at,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: post.Name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.Name,
      description: post.Description || 'Read this article on the KoreFi Blog.',
      images: [ogImageUrl],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}
