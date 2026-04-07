import { supabase, BlogPost } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import BlogPostClient from './BlogPostClient'

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string): Promise<BlogPost | null> {
  const { data, error } = await supabase
    .from('korefi_blog')
    .select('*')
    .eq('slug', slug)
    .single()

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

  return {
    title: `${post.Name} — KoreFi Blog`,
    description: post.Description || 'Read this article on the KoreFi Blog.',
    openGraph: {
      title: post.Name,
      description: post.Description || 'Read this article on the KoreFi Blog.',
      type: 'article',
      publishedTime: post.created_at,
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
