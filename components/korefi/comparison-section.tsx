'use client'

import { motion } from 'framer-motion'

const generalistItems = [
  'Generic chart of accounts',
  "Files returns, doesn't scan for restaurant credits",
  'Flags credits, hands you the paperwork',
  'Available once a year at tax season',
  'No restaurant benchmarking or advisory',
]

const korefiItems = [
  'Restaurant-specific chart of accounts from day one',
  'Proactive scanning — R&D, FICA, state credits, energy incentives',
  'End-to-end support through the entire claiming process',
  'Year-round advisory, not just tax season',
  'Benchmarking against restaurants your size and type',
]

const leftColumnVariants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const rightColumnVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const quoteVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 },
  },
}

function DashIcon() {
  return (
    <span className="text-korefi-text-muted text-[14px] shrink-0 w-5">—</span>
  )
}

function CheckIcon() {
  return (
    <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: '#314dd0' }}>
      <svg
        width="10"
        height="8"
        viewBox="0 0 10 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 4L3.5 6.5L9 1"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

export function ComparisonSection() {
  return (
    <section className="bg-korefi-warm-gray py-20 px-[6%] border-y border-korefi-border-light/50">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="text-[11px] uppercase font-medium tracking-widest" style={{ color: '#9a9488' }}>
            THE DIFFERENCE
          </span>
          <span className="flex-1 h-[0.5px]" style={{ backgroundColor: '#E0DED6' }} />
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-11"
        >
          <h2 className="font-serif text-[clamp(26px,4vw,42px)] font-medium text-korefi-black leading-[1.15] tracking-[-0.3px] mb-3">
            {"Your generalist CPA isn't wrong."}
            <br />
            Just not <em className="italic text-korefi-gold">built</em> for restaurants.
          </h2>
          <p className="text-[16px] text-korefi-text-secondary leading-[1.7]">
            {"Here's what changes when someone who knows restaurants looks at your books."}
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-12">
          {/* Generalist CPA Column */}
          <motion.div
            variants={leftColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="bg-white border border-korefi-border-light/50 rounded-xl p-7"
          >
            <span className="inline-block text-[10px] uppercase font-medium tracking-[0.08em] text-korefi-text-muted bg-korefi-warm-gray border border-korefi-border-light px-2.5 py-1 rounded mb-4">
              GENERALIST CPA
            </span>
            <h3 className="font-serif text-[18px] text-korefi-black mb-5">
              {"What you're getting today"}
            </h3>
            <ul className="space-y-3.5">
              {generalistItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-[14px] text-korefi-text-secondary">
                  <DashIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* KoreFi Column */}
          <motion.div
            variants={rightColumnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="bg-korefi-dark-bg rounded-xl p-7"
          >
            <span className="inline-block text-[10px] uppercase font-medium tracking-[0.08em] text-white bg-korefi-gold px-2.5 py-1 rounded mb-4">
              KOREFI
            </span>
            <h3 className="font-serif text-[18px] text-korefi-offwhite mb-5">
              What a specialist brings
            </h3>
            <ul className="space-y-3.5">
              {korefiItems.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-[14px] text-[#a8a8a0]">
                  <CheckIcon />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Quote */}
        <motion.blockquote
          variants={quoteVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="border-l-2 border-korefi-gold pl-6 max-w-[700px]"
        >
          <p className="font-serif text-[16px] text-korefi-text-secondary italic leading-[1.7] mb-2">
            {'"Not all CPA firms are the same. Restaurant companies that work with firms that specialise in restaurants always do better financially."'}
          </p>

        </motion.blockquote>
      </div>
    </section>
  )
}
