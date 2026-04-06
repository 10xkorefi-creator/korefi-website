'use client'

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useRef, useEffect } from 'react'

const stats = [
  {
    pill: { color: '#4ade80', label: 'Tax Credit Recovery' },
    number: '$20K+',
    countTo: 20,
    prefix: '$',
    suffix: 'K+',
    description: 'Average credits recovered per restaurant',
  },
  {
    pill: { color: '#C9A84C', label: 'First Review' },
    number: '2–5',
    countTo: null,
    description: 'Missed credits identified on first review',
  },
  {
    pill: { color: '#f59e0b', label: 'Zero Risk' },
    number: '$0',
    countTo: 0,
    countFrom: 1000,
    prefix: '$',
    suffix: '',
    description: 'Upfront cost — you pay only on recovery',
  },
]

function AnimatedNumber({
  countTo,
  countFrom = 0,
  prefix = '',
  suffix = '',
  fallback,
  isInView
}: {
  countTo: number | null
  countFrom?: number
  prefix?: string
  suffix?: string
  fallback: string
  isInView: boolean
}) {
  const count = useMotionValue(countFrom ?? 0)
  const rounded = useTransform(count, val => Math.round(val))

  useEffect(() => {
    if (isInView && countTo !== null) {
      animate(count, countTo, { duration: 3, ease: 'easeOut' })
    }
  }, [isInView, countTo, count])

  if (countTo === null) {
    return <span className="text-korefi-gold">{fallback}</span>
  }

  return (
    <span className="text-korefi-gold">
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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

export function ResultsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })

  return (
    <section id="the-payoff"
      className="py-20 px-[6%]"
      style={{
        backgroundColor: '#F3F2EC',
        borderTop: '0.5px solid #E0DED6',
        borderBottom: '0.5px solid #E0DED6',
      }}
    >
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
            THE RESULTS
          </span>
          <span className="flex-1 h-[0.5px]" style={{ backgroundColor: '#E0DED6' }} />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-[clamp(28px,4vw,42px)] font-medium leading-[1.15] tracking-[-0.3px] mb-12"
          style={{ color: '#111110' }}
        >
          Here's what working <em className="italic text-korefi-gold">with us</em> looks like.
        </motion.h2>

        {/* Stats Grid */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '0px' }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`text-center py-6 md:py-10 px-0 md:px-8 ${index < stats.length - 1
                ? 'border-b md:border-b-0 md:border-r'
                : ''
                }`}
              style={{ borderColor: '#E0DED6' }}
            >
              {/* Pill */}
              <div className="flex justify-center mb-4">
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: stat.pill.color }}
                  />
                  <span className="text-[12px]" style={{ color: '#5a5a54' }}>
                    {stat.pill.label}
                  </span>
                </div>
              </div>

              {/* Big Number */}
              <div
                className="font-serif text-[clamp(48px,6vw,72px)] font-medium leading-none"
                style={{ letterSpacing: '-1px' }}
              >
                <AnimatedNumber
                  countTo={stat.countTo}
                  countFrom={'countFrom' in stat ? (stat as any).countFrom : 0}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  fallback={stat.number}
                  isInView={isInView}
                />
              </div>

              {/* Description */}
              <p
                className="text-[14px] mt-2"
                style={{ color: '#9a9488' }}
              >
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
