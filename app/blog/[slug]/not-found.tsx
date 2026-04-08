import Link from 'next/link'
import { Navbar } from '@/components/korefi/navbar'
import { Footer } from '@/components/korefi/footer'

export default function NotFound() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#FAFAF7' }}>
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-[720px] mx-auto text-center">
          <span
            className="inline-block text-[11px] uppercase font-medium tracking-widest mb-4"
            style={{ color: '#9a9488' }}
          >
            404
          </span>
          <h1
            className="font-serif text-[42px] font-medium mb-4"
            style={{ color: '#111110', lineHeight: 1.15 }}
          >
            Post Not Found
          </h1>
          <p
            className="text-[17px] mb-8"
            style={{ color: '#5a5a54', lineHeight: 1.6 }}
          >
            The blog post you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center px-6 py-3 text-[14px] font-medium rounded-[6px] transition-colors"
            style={{
              backgroundColor: '#111110',
              color: '#FAFAF7',
            }}
          >
            Back to Blog
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  )
}
