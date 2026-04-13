import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const backgrounds = [
  'https://qbwknhtreuhxciwcktld.supabase.co/storage/v1/object/public/korefi-blog-img/bg-new.png',
  'https://qbwknhtreuhxciwcktld.supabase.co/storage/v1/object/public/korefi-blog-img/bgpurple.png',
  'https://qbwknhtreuhxciwcktld.supabase.co/storage/v1/object/public/korefi-blog-img/bgred.png',
]

// Simple hash function to deterministically pick a background based on title
function hashTitle(title: string): number {
  let hash = 0
  for (let i = 0; i < title.length; i++) {
    hash = ((hash << 5) - hash) + title.charCodeAt(i)
    hash = hash & hash // Convert to 32-bit integer
  }
  return Math.abs(hash)
}

// Count visual words: hyphenated words count as 2 visual words
function countVisualWords(word: string): number {
  return word.includes('-') ? 2 : 1
}

function balanceLines(title: string): string[] {
  let words = title.split(/\s+/).filter(w => w.length > 0)
  
  // Safety check: truncate to first 6 words if title exceeds 6 words
  if (words.length > 6) {
    words = words.slice(0, 6)
    words[5] = words[5] + '...'
  }
  
  // Count total visual words
  const totalVisualWords = words.reduce((sum, w) => sum + countVisualWords(w), 0)
  
  // If 3 or fewer visual words, render as single line
  if (totalVisualWords <= 3) {
    return [words.join(' ')]
  }
  
  // Build lines with max 3 visual words per line
  const lines: string[] = []
  let currentLine: string[] = []
  let currentVisualCount = 0
  
  for (const word of words) {
    const wordVisualCount = countVisualWords(word)
    
    // If adding this word would exceed 3 visual words, start a new line
    if (currentVisualCount + wordVisualCount > 3 && currentLine.length > 0) {
      lines.push(currentLine.join(' '))
      currentLine = []
      currentVisualCount = 0
    }
    
    currentLine.push(word)
    currentVisualCount += wordVisualCount
  }
  
  // Add remaining words as last line
  if (currentLine.length > 0) {
    lines.push(currentLine.join(' '))
  }
  
  // Orphan prevention: if last line has only 1 word, pull one from previous line
  if (lines.length > 1) {
    const lastLineWords = lines[lines.length - 1].split(/\s+/)
    if (lastLineWords.length === 1) {
      const prevLineWords = lines[lines.length - 2].split(/\s+/)
      if (prevLineWords.length > 1) {
        // Move last word of previous line to start of last line
        const wordToMove = prevLineWords.pop()!
        lines[lines.length - 2] = prevLineWords.join(' ')
        lines[lines.length - 1] = wordToMove + ' ' + lastLineWords[0]
      }
    }
  }
  
  return lines.filter(line => line.length > 0)
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Korefi Blog'
  const bgParam = searchParams.get('bg')

  // Select background: use bg param if provided (0, 1, 2), otherwise hash the title
  const bgIndex = bgParam !== null && ['0', '1', '2'].includes(bgParam)
    ? parseInt(bgParam, 10)
    : hashTitle(title) % backgrounds.length
  const backgroundUrl = backgrounds[bgIndex]

  const balancedLines = balanceLines(title)

  let fontData: ArrayBuffer | null = null
  try {
    fontData = await fetch(
      'https://cdn.jsdelivr.net/fontsource/fonts/outfit@latest/latin-500-normal.ttf'
    ).then(res => {
      if (!res.ok) throw new Error('Font fetch failed')
      return res.arrayBuffer()
    })
  } catch {
    // Font fetch failed, will use fallback sans-serif
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          backgroundImage: `url(${backgroundUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
            fontSize: '72px',
            fontWeight: 500,
            fontFamily: fontData ? "'Outfit', sans-serif" : 'sans-serif',
            letterSpacing: '-1px',
            lineHeight: 1.2,
            textShadow: '0 0 40px rgba(255,255,255,0.15), 0 0 80px rgba(100,100,255,0.1), 0 4px 12px rgba(0,0,0,0.8)',
            maxWidth: '100%',
          }}
        >
          {balancedLines.map((line, index) => (
            <div key={index} style={{ display: 'flex' }}>
              {line}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: fontData
        ? [
            {
              name: 'Outfit',
              data: fontData,
              weight: 500,
              style: 'normal',
            },
          ]
        : [],
      headers: {
        'Cache-Control': 'public, max-age=604800, stale-while-revalidate=86400',
      },
    }
  )
}
