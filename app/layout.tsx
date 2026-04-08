import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600'],
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600'],
})

export const metadata: Metadata = {
  title: 'KoreFi — Tax Credits for Restaurants',
  description: 'Done-for-you accounting that finds missed tax credits, cleans up your books, and claims credits on your behalf. Success-based pricing — you pay nothing upfront.',
  generator: 'v0.app',
  keywords: ['restaurant accounting', 'tax credits', 'bookkeeping', 'FICA tip credits', 'R&D credits', 'restaurant CPA'],
  openGraph: {
    title: 'KoreFi — Tax Credits for Restaurants',
    description: 'Done-for-you accounting that finds missed tax credits, cleans up your books, and claims credits on your behalf.',
    type: 'website',
    images: [
      {
        url: '/korefi-logo-only.png',
        width: 1200,
        height: 630,
        alt: 'KoreFi — Tax Credits for Restaurants',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: '#FAFAF7',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-korefi-offwhite text-korefi-black">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
