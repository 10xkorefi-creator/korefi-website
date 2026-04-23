'use client'

import { useState } from 'react'
import { Navbar } from '@/components/korefi/navbar'
import { Hero } from '@/components/korefi/hero'
import { TrustBar } from '@/components/korefi/trust-bar'
import { ProblemSection } from '@/components/korefi/problem-section'
import { ComparisonSection } from '@/components/korefi/comparison-section'
import { HowItWorks } from '@/components/korefi/how-it-works'
import { ResultsSection } from '@/components/korefi/results-section'
import { FitCheckSection } from '@/components/korefi/fit-check-section'
import { TestimonialsSection } from '@/components/korefi/testimonials-section'
import { Footer } from '@/components/korefi/footer'
import { WaitlistModal } from '@/components/korefi/waitlist-modal'

export default function HomePageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main className="min-h-screen bg-korefi-offwhite">
      <Navbar onOpenModal={openModal} />
      <Hero onOpenModal={openModal} />
      <TrustBar />
      <ProblemSection />
      <ComparisonSection />
      <HowItWorks />
      <ResultsSection />
      <FitCheckSection />
      <TestimonialsSection />
      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}
