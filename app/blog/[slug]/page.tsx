import { supabase, BlogPost } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  // Decode URL-encoded characters (e.g., %26 -> &)
  const decodedSlug = decodeURIComponent(slug)
  
  const { data, error } = await supabase
    .from('korefi_blog')
    .select('*')
    .eq('slug', decodedSlug)
    .single()

  if (error || !data) return null
  return data
}

async function getRelatedPosts(currentPostId: number): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('korefi_blog')
    .select('*')
    .neq('id', currentPostId)
    .order('created_at', { ascending: false })
    .limit(3)

  if (error || !data) return []
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

  const relatedPosts = await getRelatedPosts(post.id)

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />
}
