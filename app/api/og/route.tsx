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

function balanceLines(title: string): string[] {
  const words = title.split(/\s+/).filter(w => w.length > 0)
  
  // If 3 or fewer words, render as one line
  if (words.length <= 3) {
    return [words.join(' ')]
  }
  
  // For longer titles, split into balanced lines where each line has at least 2 words
  const totalWords = words.length
  
  // Calculate ideal split point to avoid orphan (single word on last line)
  // If odd number of words, put more on first line
  const midpoint = Math.ceil(totalWords / 2)
  
  // Ensure last line has at least 2 words
  let splitPoint = midpoint
  if (totalWords - midpoint < 2) {
    splitPoint = totalWords - 2
  }
  
  const lines: string[] = []
  
  if (totalWords <= 6) {
    // For short-medium titles, split into 2 lines
    lines.push(words.slice(0, splitPoint).join(' '))
    lines.push(words.slice(splitPoint).join(' '))
  } else {
    // For longer titles, split into 3 lines
    const thirdPoint = Math.ceil(totalWords / 3)
    const twoThirdPoint = Math.ceil((totalWords * 2) / 3)
    
    // Adjust to ensure no line has fewer than 2 words
    let firstSplit = thirdPoint
    let secondSplit = twoThirdPoint
    
    if (totalWords - secondSplit < 2) {
      secondSplit = totalWords - 2
    }
    if (secondSplit - firstSplit < 2) {
      firstSplit = Math.max(2, secondSplit - 2)
    }
    
    lines.push(words.slice(0, firstSplit).join(' '))
    lines.push(words.slice(firstSplit, secondSplit).join(' '))
    lines.push(words.slice(secondSplit).join(' '))
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
        'Cache-Control': 'public, max-age=60',
      },
    }
  )
}
