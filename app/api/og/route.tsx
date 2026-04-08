import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Korefi Blog'

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
          backgroundImage: 'url(https://qbwknhtreuhxciwcktld.supabase.co/storage/v1/object/public/korefi-blog-img/blueGradient.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            color: 'white',
            fontSize: '64px',
            fontWeight: 700,
            fontFamily: 'sans-serif',
            letterSpacing: '-1px',
            lineHeight: 1.2,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
            maxWidth: '100%',
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }
  )
}
