'use client'

import { motion } from 'framer-motion'

const comparisonRows = [
  {
    pain: {
      title: 'Generic chart of accounts',
      description: 'Expenses lumped into "miscellaneous." Assets not depreciated. Costs you $11K+ in overpaid taxes.',
    },
    solution: {
      title: 'Restaurant-specific chart of accounts',
      description: 'Food vs beverage split, tipped vs non-tipped labor, delivery fees, depreciated equipment — from day one.',
    },
  },
  {
    pain: {
      title: "Files returns, doesn't scan for credits",
      description: "R&D, FICA tip, energy, WOTC — 2–5 credits missed every year. Nobody's looking.",
    },
    solution: {
      title: 'Proactive credit scanning',
      description: 'AI flags every credit before deadlines. R&D, FICA tip, state programs, energy incentives — all covered.',
    },
  },
  {
    pain: {
      title: 'Flags credits, hands you the paperwork',
      description: '12-page form, no guidance. You run two locations. It sits untouched. Expires.',
    },
    solution: {
      title: 'End-to-end claiming support',
      description: 'We handle filing, documentation, and follow-through. Credits come back as refunds or offsets.',
    },
  },
  {
    pain: {
      title: 'Available once a year at tax season',
      description: 'Your CPA disappears after April. No advisory, no benchmarking, no strategy.',
    },
    solution: {
      title: 'Year-round advisory',
      description: "Ongoing guidance on growth, cash flow, and decisions that affect next year's taxes.",
    },
  },
  {
    pain: {
      title: 'No restaurant benchmarking',
      description: 'No idea how your labor, COGS, or margins compare to restaurants your size.',
    },
    solution: {
      title: 'Benchmarking against your type and size',
      description: 'See how your outlets compare to similar restaurants on labor, food cost, and margins.',
    },
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

const rowVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

// function CheckIcon() {
//   return (
//     <span className="w-5 h-5 rounded-full bg-korefi-gold flex items-center justify-center shrink-0">
//       <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
//         <path
//           d="M1 4L3.5 6.5L9 1"
//           stroke="#FAFAF7"
//           strokeWidth="1.5"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </svg>
//     </span>
//   )
// }
function CheckIcon() {
  return (
    <span
      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
      style={{ backgroundColor: '#C9A84C' }}
    >
      <svg width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1 4L3.5 6.5L9 1"
          style={{ stroke: '#FFFFFF', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}
        />
      </svg>
    </span>
  )
}

export function ProblemComparisonSection() {
  return (
    <section className="bg-korefi-dark-bg py-20 px-[6%]">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-9"
        >
          <h2
            className="font-serif font-medium text-korefi-offwhite leading-[1.15] mb-2 whitespace-nowrap"
            style={{ fontSize: 'clamp(26px, 4vw, 42px)' }}
          >
            {"Your generalist CPA isn't wrong. Just not "}
            <em className="italic text-korefi-gold">built</em>
            {" for restaurants."}
          </h2>

          <p className="text-[14px] text-[#9a9488]">
            {"Here's what changes when someone who knows restaurants looks at your books."}
          </p>
        </motion.div>

        {/* Two-column Editorial Comparison Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Column Headers */}
          <motion.div
            variants={rowVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-0"
          >
            <div
              className="py-3 px-5"
              style={{ borderBottom: '0.5px solid #2a2a28' }}
            >
              <span
                className="inline-block uppercase tracking-[0.08em] rounded"
                style={{
                  fontSize: '9px',
                  color: '#ef4444',
                  backgroundColor: '#222220',
                  border: '0.5px solid #3a2020',
                  padding: '3px 8px',
                }}
              >
                YOUR CPA
              </span>
            </div>
            <div
              className="py-3 px-5"
              style={{ borderBottom: '0.5px solid #2a2a28' }}
            >
              <span
                className="inline-block uppercase tracking-[0.08em] rounded"
                style={{
                  fontSize: '9px',
                  color: '#FAFAF7',
                  backgroundColor: '#C9A84C',
                  padding: '3px 8px',
                }}
              >
                KOREFI
              </span>
            </div>
          </motion.div>

          {/* Content Rows */}
          {comparisonRows.map((row, index) => (
            <motion.div
              key={index}
              variants={rowVariants}
              className="grid grid-cols-1 md:grid-cols-2 gap-0"
            >
              {/* Pain Cell (Left) */}
              <div
                className="p-5 flex gap-3.5"
                style={{
                  borderLeft: '3px solid #ef4444',
                  borderBottom: index < comparisonRows.length - 1 ? '0.5px solid #2a2a28' : 'none',
                }}
              >
                <span className="text-[14px] text-[#ef4444] w-5 shrink-0">✕</span>
                <div>
                  <h4 className="text-[14px] font-medium text-korefi-offwhite mb-0.5">
                    {row.pain.title}
                  </h4>
                  <p className="text-[11px] text-[#9a9488] leading-normal">
                    {row.pain.description}
                  </p>
                </div>
              </div>

              {/* Solution Cell (Right) */}
              <div
                className="p-5 flex gap-3.5"
                style={{
                  borderLeft: '3px solid #C9A84C',
                  borderBottom: index < comparisonRows.length - 1 ? '0.5px solid #2a2a28' : 'none',
                }}
              >
                <CheckIcon />
                <div>
                  <h4 className="text-[14px] font-medium text-korefi-offwhite mb-0.5">
                    {row.solution.title}
                  </h4>
                  <p className="text-[11px] text-[#9a9488] leading-normal">
                    {row.solution.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pull Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
          className="mt-7"
          style={{
            borderLeft: '2px solid #C9A84C',
            padding: '16px 20px',
          }}
        >
          <p className="font-serif italic text-[13px] text-[#9a9488] leading-[1.6] mb-1.5 whitespace-nowrap">
            {'"Not all CPA firms are the same. Restaurant companies that work with firms that specialise in restaurants always do better financially."'}
          </p>
        </motion.blockquote>
      </div>
    </section>
  )
}
