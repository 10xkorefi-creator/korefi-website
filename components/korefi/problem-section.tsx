'use client'

import { motion } from 'framer-motion'

const painPoints = [
  {
    icon: 'grid',
    color: 'red',
    number: '01',
    title: 'Books that cost you money',
    body: 'No chart of accounts setup, assets not depreciated, expenses miscategorised.',
  },
  {
    icon: 'exclamation',
    color: 'amber',
    number: '02',
    title: '40+ hours a month on reconciliation',
    body: 'Most owners spend 20–40% of their week as informal CFO.',
  },
  {
    icon: 'triangle',
    color: 'red',
    number: '03',
    title: 'Credits that expire quietly',
    body: 'R&D credits, FICA tip credits, energy incentives — nobody asked.',
  },
  {
    icon: 'chart',
    color: 'amber',
    number: '04',
    title: 'No outlet-level visibility',
    body: 'Day to day: gut feel and POS dashboards.',
  },
  {
    icon: 'x',
    color: 'red',
    number: '05',
    title: 'Credits found, never claimed',
    body: 'CPA flagged it, handed you a 12-page form. It expired.',
  },
  {
    icon: 'clock',
    color: 'amber',
    number: '06',
    title: 'No advisory between tax seasons',
    body: 'Compliance only — no strategy.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

function PainIcon({ type, color }: { type: string; color: 'red' | 'amber' }) {
  const bgColor = '#FFFFFF'
  const strokeColor = '#314dd0'
  const fillColor = '#314dd0'

  const getIcon = () => {
    switch (type) {
      case 'grid':
        return (
          <>
            <rect x="2" y="2" width="5" height="5" rx="1" stroke={strokeColor} strokeWidth="1.3" fill="none" />
            <rect x="9" y="2" width="5" height="5" rx="1" stroke={strokeColor} strokeWidth="1.3" fill="none" />
            <rect x="2" y="9" width="5" height="5" rx="1" stroke={strokeColor} strokeWidth="1.3" fill="none" />
            <rect x="9" y="9" width="5" height="5" rx="1" stroke={strokeColor} strokeWidth="1.3" fill="none" />
          </>
        )
      case 'exclamation':
        return (
          <>
            <circle cx="8" cy="8" r="6" stroke={strokeColor} strokeWidth="1.3" fill="none" />
            <path d="M8 5v3.5" stroke={strokeColor} strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="8" cy="11" r="0.7" fill={fillColor} />
          </>
        )
      case 'triangle':
        return (
          <>
            <path d="M8 2L14 13H2L8 2Z" stroke={strokeColor} strokeWidth="1.3" strokeLinejoin="round" fill="none" />
            <path d="M8 6v3.5" stroke={strokeColor} strokeWidth="1.3" strokeLinecap="round" />
            <circle cx="8" cy="11.5" r="0.7" fill={fillColor} />
          </>
        )
      case 'chart':
        return (
          <path d="M2 12l4-4 3 3 5-7" stroke={strokeColor} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        )
      case 'x':
        return (
          <path d="M13 3L3 13M3 3l10 10" stroke={strokeColor} strokeWidth="1.3" strokeLinecap="round" fill="none" />
        )
      case 'clock':
        return (
          <>
            <circle cx="8" cy="8" r="6" stroke={strokeColor} strokeWidth="1.3" fill="none" />
            <path d="M8 5v3h2" stroke={strokeColor} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
      style={{ backgroundColor: bgColor }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {getIcon()}
      </svg>
    </div>
  )
}

export function ProblemSection() {
  return (
    <section id="the-problem" className="bg-korefi-dark-bg py-20 px-[6%]">
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
            THE REALITY
          </span>
          <span className="flex-1 h-[0.5px]" style={{ backgroundColor: '#2a2a28' }} />
        </motion.div>

        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-[clamp(26px,4vw,42px)] font-medium text-korefi-offwhite mb-13 leading-[1.15] tracking-[-0.3px] lg:whitespace-nowrap"
        >
          {"You're paying for accounting."}
          <br />
          {" You're "}
          <em className="italic text-korefi-gold">not getting</em>
          {" accounting."}
        </motion.h2>

        {/* Pain Points Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {painPoints.map((point, index) => (
            <motion.div
              key={point.number}
              variants={itemVariants}
              className={`p-6 ${index % 3 !== 2 ? 'lg:border-r' : ''
                } ${index < 3 ? 'lg:border-b' : ''} ${index % 2 !== 1 ? 'md:border-r md:max-lg:border-r' : 'md:max-lg:border-r-0'
                } ${index < 4 ? 'md:max-lg:border-b' : ''} border-korefi-border-dark`}
            >
              <div className="flex items-start gap-4">
                <PainIcon type={point.icon} color={point.color as 'red' | 'amber'} />
                <div>
                  <span className="text-[13px] uppercase font-medium tracking-[0.08em] mb-2 block" style={{ color: '#FFFFFF' }}>
                    {point.number}
                  </span>
                  <h3 className="font-serif text-[18px] text-korefi-offwhite mb-2">
                    {point.title}
                  </h3>
                  <p className="text-[14px] text-[#6a6a60] leading-[1.6]">{point.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section >
  )
}
