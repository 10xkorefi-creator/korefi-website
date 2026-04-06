'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Navbar } from '@/components/korefi/navbar'
import { Footer } from '@/components/korefi/footer'
import { WaitlistModal } from '@/components/korefi/waitlist-modal'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
      delay: i * 0.1
    },
  }),
}

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#314dd0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v12M9 9c0-1 .9-2 3-2s3 1 3 2-1 2-3 2-3 1-3 2 .9 2 3 2 3-1 3-2" />
      </svg>
    ),
    title: 'Outcomes, not hours',
    body: "We don't bill by the hour. Our fee is a percentage of what we recover. If we find nothing, you pay nothing.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#314dd0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'AI + human expertise',
    body: 'AI does the scanning. Restaurant-specialist CPAs do the validating. Every finding is accurate, defensible, and specific to your business.',
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#314dd0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    ),
    title: 'Zero disruption',
    body: "We work alongside your existing bookkeeper and CPA. No new software to learn. No workflow changes. We plug in and find what's been missed.",
  },
]

const trustBadges = [
  {
    icon: <img src="/kc logo.svg" alt="Karbon" className="h-5 w-auto flex-shrink-0" />,

  },

]

export default function AboutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <main className="min-h-screen bg-korefi-offwhite">
      <Navbar onOpenModal={openModal} />

      {/* Back to Home */}
      <a
        href="/"
        className="fixed bottom-8 left-8 z-40 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        style={{
          background: '#111110',
          color: '#FAFAF7',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M9 14L4 9L9 4" stroke="#FAFAF7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 9H14C17.3137 9 20 11.6863 20 15V15C20 18.3137 17.3137 21 14 21H12" stroke="#FAFAF7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>

      {/* Main Content */}
      <div className="py-24 px-[6%]">
        <div className="max-w-[900px] mx-auto">
          {/* Section 1 — Hero */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Section Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-10">
              <span className="text-[11px] uppercase font-medium tracking-widest" style={{ color: '#9a9488' }}>
                ABOUT US
              </span>
              <span className="flex-1 h-[0.5px]" style={{ backgroundColor: '#E0DED6' }} />
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-serif font-medium text-korefi-black mb-6"
              style={{ fontSize: 'clamp(32px, 4vw, 48px)', lineHeight: 1.15 }}
            >
              Built by operators who've{' '}
              <span className="italic text-korefi-gold">been</span> there.
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-[18px] text-korefi-text-secondary mb-12"
              style={{ lineHeight: 1.6, maxWidth: '640px' }}
            >
              KoreFi is a done-for-you accounting service built specifically for restaurant owners in the US.
            </motion.p>
          </motion.div>

          {/* Section 2 — The Story (two-column) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {/* Left Column */}
            <motion.div variants={itemVariants}>
              <span className="block text-[11px] uppercase font-medium tracking-widest mb-4" style={{ color: '#9a9488' }}>
                THE PROBLEM WE SAW
              </span>
              <div className="text-[15px] text-korefi-text-secondary space-y-4" style={{ lineHeight: 1.7 }}>
                <p>
                  Restaurant owners across the US spend $12–18K every year on bookkeeping and tax prep. Yet most have no idea what credits they qualify for, which outlet is actually profitable, or what they're leaving on the table.
                </p>
                <p>
                  Their CPAs file returns — but nobody actively scans for R&D credits, FICA tip credits, energy incentives, or WOTC. Credits expire. Money is left behind. And nobody's accountable for it.
                </p>
                <p>We built KoreFi to change that.</p>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div variants={itemVariants}>
              <span className="block text-[11px] uppercase font-medium tracking-widest mb-4" style={{ color: '#9a9488' }}>
                OUR APPROACH
              </span>
              <div className="text-[15px] text-korefi-text-secondary space-y-4" style={{ lineHeight: 1.7 }}>
                <p>
                  KoreFi layers on top of your existing accounting setup — QuickBooks, Bench, or your bookkeeper + CPA. No switching cost. No new software.
                </p>
                <p>
                  Our AI scans your books and flags every tax credit, grant, and incentive you qualify for. Restaurant-specialist CPAs validate every finding. Then we handle the filing end to end.
                </p>
                <p>
                  Our pricing is success-based: we only get paid when you recover money. Nothing upfront, ever.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Section 3 — Karbon Card Dark Card */}
          <motion.div
            className="rounded-[16px] p-10 mb-12"
            style={{ backgroundColor: '#111110' }}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[11px] uppercase font-medium tracking-widest" style={{ color: '#9a9488' }}>
                THE TEAM BEHIND KOREFI
              </span>
              <span className="flex-1 h-[0.5px]" style={{ backgroundColor: '#2a2a28' }} />
            </div>

            {/* Heading */}
            <h2 className="font-serif font-medium text-[28px] text-korefi-offwhite mb-6" style={{ lineHeight: 1.2 }}>
              From the{' '}
              <span className="italic text-korefi-gold">Karbon Card Group</span>
            </h2>

            {/* Body */}
            <div className="text-[15px] space-y-4 mb-8" style={{ color: '#c8c4b8', lineHeight: 1.7 }}>
              <p>
                KoreFi is built by the founding team behind Karbon Card — a fintech company trusted by over 2,000 businesses for global payments, corporate cards, and forex solutions.
              </p>
              <p>
                After years building financial infrastructure at Karbon Card, we saw a gap: restaurant owners in the US were being underserved by generalist accountants who didn't understand the industry. Credits were missed. Books were messy. Nobody was looking out for the owner.
              </p>
              <p>
                KoreFi brings the same operator-first approach to restaurant accounting — combining AI-powered analysis with restaurant-specialist CPAs to find money you didn't know you were owed.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t" style={{ borderColor: '#2a2a28' }}>
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex items-center gap-2">
                  {badge.icon}
                  <span className="text-[13px]" style={{ color: '#9a9488' }}></span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 5 — What We Believe (3 columns) */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                className="rounded-[12px] p-7"
                style={{
                  backgroundColor: '#F3F2EC',
                  borderWidth: '0.5px',
                  borderStyle: 'solid',
                  borderColor: '#E0DED6',
                }}
              >
                <div className="mb-4">{value.icon}</div>
                <h3 className="font-serif text-[17px] text-korefi-black mb-2">{value.title}</h3>
                <p className="text-[13px] text-korefi-text-secondary" style={{ lineHeight: 1.6 }}>
                  {value.body}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Section 4 — Our Leadership */}
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={containerVariants}
          >
            {/* Section Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <span className="text-[11px] uppercase font-medium tracking-widest" style={{ color: '#9a9488' }}>
                OUR LEADERSHIP
              </span>
              <span className="flex-1 h-[0.5px]" style={{ backgroundColor: '#E0DED6' }} />
            </motion.div>

            {/* Heading */}
            <motion.h2
              variants={itemVariants}
              className="font-serif font-medium text-[28px] text-korefi-black mb-8"
              style={{ lineHeight: 1.2 }}
            >
              The team behind <em className="italic" style={{ color: '#314dd0' }}>KoreFi</em>.
            </motion.h2>

            {/* Team Grid - Row 1: 4 members */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Pei-fu Hsieh', role: 'CEO & Founder', image: 'Pei.png', linkedin: 'https://www.linkedin.com/in/peifuhsieh/' },
                { name: 'Bhagath G', role: 'Co-Founder', image: 'Bhagath.png', linkedin: 'https://www.linkedin.com/in/bhagathgottipaty/' },
                { name: 'Lopamudra Chakraborty', role: 'Chief Human Resources Officer', image: 'Lopa.png', linkedin: 'https://www.linkedin.com/in/lopamudra-chakraborty/' },
                { name: 'Satarupa Mitra', role: 'Head Counsel', image: 'Satarupa.png', linkedin: 'https://www.linkedin.com/in/satarupa-mitra-1b084834/' },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  className="flex flex-col items-center text-center transition-transform duration-200 hover:scale-[1.03]"
                >
                  <div
                    className="w-[120px] h-[120px] rounded-full overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: '#F3F2EC', border: '1px solid #E0DED6' }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <p className="mt-3 text-[15px] font-medium" style={{ color: '#111110' }}>{member.name}</p>
                  <p className="mt-1 text-[13px]" style={{ color: '#9a9488' }}>{member.role}</p>
                  {member.linkedin && (
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center justify-center w-[24px] h-[24px] rounded-full transition-opacity duration-200 hover:opacity-70">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#314dd0">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Team Grid - Row 2: 4 members */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              {[
                { name: 'Vijay Lohchab', role: 'Entrepreneur in Residence', image: 'Vijay.png', linkedin: 'https://www.linkedin.com/in/vijay-lohchab/' },
                { name: 'Rohan Sinha', role: 'VP - Growth', image: 'Rohan.png', linkedin: 'https://www.linkedin.com/in/rs-in/' },
                { name: 'Raghav', role: 'AVP - Business Development', image: 'Raghav.png', linkedin: 'https://www.linkedin.com/in/raghavraja/' },
                { name: 'Alex Antony', role: 'Senior Product Analyst', image: 'Alex.png', linkedin: 'https://www.linkedin.com/in/alex-antony-482080189/' },
              ].map((member, index) => (
                <motion.div
                  key={index + 4}
                  custom={index + 4}
                  variants={cardVariants}
                  className="flex flex-col items-center text-center transition-transform duration-200 hover:scale-[1.03]"
                >
                  <div
                    className="w-[120px] h-[120px] rounded-full overflow-hidden flex items-center justify-center"
                    style={{ backgroundColor: '#F3F2EC', border: '1px solid #E0DED6' }}
                  >
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                  <p className="mt-3 text-[15px] font-medium" style={{ color: '#111110' }}>{member.name}</p>
                  <div className="mt-1 flex items-center justify-center gap-1.5">
                    <span className="text-[13px]" style={{ color: '#9a9488' }}>{member.role}</span>
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="opacity-40 hover:opacity-100 transition-opacity">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#314dd0">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section 5 — CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="font-serif font-medium text-[28px] text-korefi-black mb-3" style={{ lineHeight: 1.2 }}>
              Ready to find out what you've been{' '}
              <span className="italic text-korefi-gold">missing</span>?
            </h2>
            <p className="text-[15px] text-korefi-text-muted mb-6">
              No commitment. No upfront cost.
            </p>
            <button
              onClick={openModal}
              className="inline-flex items-center justify-center px-[28px] py-[12px] bg-korefi-black text-korefi-offwhite text-[14px] font-medium rounded-[6px] hover:bg-[#314dd0] relative overflow-hidden group transition-colors duration-300"
            >
              <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-[6px]">
                <span className="absolute top-0 -left-full w-[60%] h-full transition-none group-hover:transition-[left] group-hover:duration-[600ms] group-hover:ease-out group-hover:left-[150%]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }} />
              </span>
              <span className="relative z-10">Join the waitlist</span>
            </button>
          </motion.div>
        </div>
      </div>

      <Footer />
      <WaitlistModal isOpen={isModalOpen} onClose={closeModal} />
    </main>
  )
}
