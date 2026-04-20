import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Pass through without any modifications
  return NextResponse.next()
}

// Exclude blog routes, API routes, static files, sitemap, and robots from middleware
// This ensures Googlebot can crawl blog pages without any redirect interference
export const config = {
  matcher: ['/((?!blog|api|_next|sitemap|robots).*)'],
}
