import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  const hostname = request.headers.get('host') || ''

  // Redirect apex (korefi.ai) to www (www.korefi.ai)
  if (hostname === 'korefi.ai') {
    url.host = 'www.korefi.ai'
    return NextResponse.redirect(url, 301)
  }

  // Pass through without any modifications
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
