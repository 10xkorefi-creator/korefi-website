'use client'

import { motion } from 'framer-motion'

const testimonials = [
  {
    quote: "My CPA had been filing my taxes for three years. Korefi found credits he had never flagged — in the first review.",
    attribution: "Restaurant owner, Los Angeles",
    role: "4 outlets",
    metric: "$18K",
    metricLabel: "recovered",
  },
  {
    quote: "I didn't think there was anything left to find. There was. They handled everything — I didn't lift a finger.",
    attribution: "Multi-outlet operator, Texas",
    role: "3 outlets",
    metric: "$22K",
    metricLabel: "recovered",
  },
  {
    quote: "They worked alongside my existing bookkeeper. Nothing changed on my end — except I got money back.",
    attribution: "Restaurant owner, New York",
    role: "Single outlet",
    metric: "$12K",
    metricLabel: "recovered",
  },
  // {
  //   quote: "We were leaving money on the table every quarter. Korefi caught things our accountant of ten years never mentioned.",
  //   attribution: "Restaurant group, Chicago",
  //   role: "6 outlets",
  //   metric: "$31K",
  //   metricLabel: "recovered",
  // },
  // {
  //   quote: "Zero disruption. They plugged into our QuickBooks, handled the entire claiming process.",
  //   attribution: "Restaurant owner, Miami",
  //   role: "2 outlets",
  //   metric: "$15K",
  //   metricLabel: "recovered",
  // },
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

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group bg-white rounded-[14px] flex flex-col justify-between cursor-pointer relative overflow-hidden transition-all duration-300 ease-out hover:-translate-y-2"
      style={{
        minHeight: '240px',
        padding: '22px 18px',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: '#E0DED6',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
      whileHover={{
        borderColor: '#314dd0',
        boxShadow: '0 12px 32px rgba(0,0,0,0.08)',
      }}
    >
      {/* Shine Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[14px]">
        <div
          className="absolute top-0 -left-full w-[60%] h-full transition-none group-hover:transition-[left] group-hover:duration-600 group-hover:ease-out group-hover:left-[150%]"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(49,77,208,0.15), transparent)' }}
        />
      </div>

      {/* Card Content */}
      <div className="relative z-10">
        {/* Gold Quote Mark */}
        <span
          className="font-serif text-[28px] block" style={{ color: '#314dd0', lineHeight: '0.7', marginBottom: '8px' }}
        >
          "
        </span>

        {/* Quote Text */}
        <p
          className="font-serif text-[15px] italic"
          style={{ lineHeight: '1.6', color: '#2a2a24' }}
        >
          {testimonial.quote}
        </p>
      </div>

      {/* Attribution & Metric */}
      <div className="relative z-10 mt-auto">
        <p className="text-[13px] font-medium" style={{ color: '#111110' }}>
          {testimonial.attribution}
        </p>
        <p className="text-[13px] mt-0.5" style={{ color: '#9a9488' }}>
          {testimonial.role}
        </p>

        {/* Metric Bar */}
        <div
          className="mt-[10px] pt-2"
          style={{ borderTop: '0.5px solid #E0DED6' }}
        >
          <span className="font-serif text-[16px] font-medium" style={{ color: '#314dd0' }}>
            {testimonial.metric}
          </span>
          <span
            className="text-[8px] uppercase ml-1.5"
            style={{ color: '#9a9488', letterSpacing: '0.06em' }}
          >
            {testimonial.metricLabel}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  return (
    <section
      className="px-[6%]"
      style={{
        backgroundColor: '#F3F2EC',
        borderTop: '0.5px solid #E0DED6',
        borderBottom: '0.5px solid #E0DED6',
        padding: '80px 6%',
      }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="text-[11px] uppercase font-medium tracking-widest" style={{ color: '#9a9488' }}>
            FROM OUR EARLY PARTNERS
          </span>
          <span className="flex-1 h-[0.5px]" style={{ backgroundColor: '#E0DED6' }} />
        </motion.div>

        {/* 5-Card Grid */}
        <motion.div
          // className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
