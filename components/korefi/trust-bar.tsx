'use client'

import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export function TrustBar() {
  return (
    <section className="bg-korefi-warm-gray border-b border-korefi-border-light/50 py-5 px-[6%]">
      <motion.div
        className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[13px]"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
      >
        <motion.span variants={itemVariants} className="text-[13px]" style={{ color: '#5a5a54' }}>
          Built by       {'  '}
          <a
            href="https://www.karboncard.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-4 font-semibold underline"
            style={{ color: '#111110', marginLeft: '8px' }}
          >
            <img src="/kc logo.svg" alt="Karbon" className="h-[14px] w-auto inline" />

          </a>
        </motion.span>


        {/* <motion.span variants={itemVariants} className="w-[3px] h-[3px] rounded-full bg-korefi-border-light" />

        <motion.span variants={itemVariants} className="text-korefi-text-muted">
          Restaurant-specialist CPAs
        </motion.span> */}
      </motion.div>
    </section>
  )
}
