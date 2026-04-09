import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import fs from 'fs'
import path from 'path'

export const revalidate = 86400 // Regenerate every 24 hours

const BASE_URL = 'https://www.korefi.ai'

// Recursively scan app directory for page.tsx files
function discoverStaticPages(dir: string, basePath: string = ''): string[] {
  const pages: string[] = []
  
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)
      
      if (entry.isDirectory()) {
        // Skip api routes, internal Next.js folders
        if (entry.name === 'api' || entry.name.startsWith('_')) {
          continue
        }
        
        // Skip dynamic route segments like [slug]
        if (entry.name.startsWith('[') && entry.name.endsWith(']')) {
          continue
        }
        
        // Handle route groups - skip the group name but include children
        if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
          pages.push(...discoverStaticPages(fullPath, basePath))
          continue
        }
        
        // Recurse into subdirectories
        const newBasePath = basePath ? `${basePath}/${entry.name}` : entry.name
        pages.push(...discoverStaticPages(fullPath, newBasePath))
      } else if (entry.name === 'page.tsx') {
        // Found a page - add the route
        const route = basePath === '' ? '/' : `/${basePath}`
        pages.push(route)
      }
    }
  } catch {
    // Directory doesn't exist or can't be read
  }
  
  return pages
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const today = new Date().toISOString()
  
  // Part A: Auto-discover static pages
  const appDir = path.join(process.cwd(), 'app')
  const staticRoutes = discoverStaticPages(appDir)
  
  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: today,
    changeFrequency: 'monthly',
    priority: route === '/' ? 1.0 : 0.8,
  }))
  
  // Part B: Dynamic blog pages from Supabase
  let blogPages: MetadataRoute.Sitemap = []
  
  try {
    const { data: posts, error } = await supabase
      .from('korefi_blog')
      .select('slug, created_at')
      .order('created_at', { ascending: false })
    
    if (!error && posts) {
      blogPages = posts.map((post) => ({
        // Encode special characters in slug (e.g., & -> %26) for valid XML
        url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
        lastModified: post.created_at,
        changeFrequency: 'weekly',
        priority: 0.7,
      }))
    }
  } catch {
    // Supabase fetch failed, continue with static pages only
  }
  
  // Part C: Combine static and dynamic pages
  return [...staticPages, ...blogPages]
}
