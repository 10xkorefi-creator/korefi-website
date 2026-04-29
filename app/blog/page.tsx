import { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'Blog — KoreFi',
  description: 'Expert insights on restaurant tax credits, accounting best practices, and financial strategies for restaurant owners.',
  alternates: {
    canonical: '/blog',
  },
  openGraph: {
    title: 'KoreFi Blog',
    description: 'Expert insights on restaurant tax credits, accounting best practices, and financial strategies for restaurant owners.',
    type: 'website',
    url: 'https://www.korefi.ai/blog',
  },
}

export default function BlogPage() {
  return <BlogPageClient />
}
