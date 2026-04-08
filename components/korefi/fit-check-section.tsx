'use client'

import { motion } from 'framer-motion'

const fitCheckItems = [
  'Your restaurant does $500K–$5M in annual revenue',
  'You use QuickBooks, Bench, or a bookkeeper + CPA setup today',
  "You suspect you're missing credits — but nobody has looked",
  'You want someone accountable for outcomes, not just filings',
]

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
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

function CheckIcon() {
  return (
    <span className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#314dd0' }}>
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

export function FitCheckSection() {
  return (
    <section className="bg-korefi-dark-bg py-20 px-[6%]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="text-[11px] uppercase font-medium tracking-[0.1em]" style={{ color: '#9a9488' }}>
            IS THIS FOR YOU
          </span>
          <span className="flex-1 h-[0.5px]" style={{ backgroundColor: '#2a2a28' }} />
        </motion.div>

        {/* Two column layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left column - content */}
          <div className="flex-1 max-w-[560px]">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            >
              {/* Header */}
              <motion.h2
                variants={itemVariants}
                className="font-serif text-[clamp(24px,3.5vw,36px)] font-medium text-korefi-offwhite leading-[1.15] tracking-[-0.3px] mb-8"
              >
                This <em className="italic text-korefi-gold">works</em> best if:
              </motion.h2>

              {/* Checklist */}
              <motion.div variants={itemVariants}>
                {fitCheckItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 py-4 ${index === 0 ? 'border-t' : ''} border-b`}
                    style={{ borderColor: '#2a2a28' }}
                  >
                    <CheckIcon />
                    <span className="text-[15px] text-[#c8c4b8]">{item}</span>
                  </div>
                ))}
              </motion.div>

              {/* Qualifier */}
              <motion.div
                variants={itemVariants}
                className="mt-6 rounded-lg p-4"
                style={{
                  border: '0.5px solid #2a2a28',
                  borderLeftWidth: '2px',
                  borderLeftColor: '#333330'
                }}
              >
                <p className="text-[13px] text-[#555550] leading-[1.6]">
                  If you want a DIY tool or a cheaper way to file, Korefi is not that. Built for owners
                  who want results, not more software to manage.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right column - image */}
          <motion.div
            className="hidden lg:block flex-shrink-0 w-full lg:w-[400px]"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 }}
          >
            <img
              src="/restaurant-owner.png"
              alt="Restaurant owner reviewing financial data on tablet"
              className="w-full h-auto object-cover"
              style={{
                borderRadius: '16px',
                maxHeight: '480px',
                objectFit: 'cover',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}