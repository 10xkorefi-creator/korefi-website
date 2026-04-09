'use client'

import { motion } from 'framer-motion'

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

const dashboardVariants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 },
  },
}

interface HeroProps {
  onOpenModal: () => void
}

export function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="bg-korefi-offwhite px-[6%] pt-24 pb-22">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Left Column */}
        <motion.div
          className="flex-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* H1 */}
          <motion.h1
            variants={itemVariants}
            className="font-serif text-[clamp(32px,4vw,52px)] font-medium leading-[1.1] tracking-[-0.5px] text-korefi-black mb-6 text-balance"
          >
            Your restaurant is{' '}
            <em className="italic text-korefi-gold">missing thousands</em> in tax credits every year.
            <br />
            We find them. You keep them.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-[16px] text-korefi-text-secondary leading-[1.7] max-w-[520px] mb-3.5"
          >
            AI-POWERED, RESTAURANT SPECIALIST REVIEWED
          </motion.p>

          {/* Pricing Signal */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-9">
            <span className="w-5 h-[1.5px] bg-korefi-gold" />
            <span className="text-[14px] font-medium text-korefi-gold-soft">
              We only get paid when you do. Nothing upfront.
            </span>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            variants={itemVariants}
            onClick={onOpenModal}
            className="inline-flex items-center justify-center px-[34px] py-[15px] bg-korefi-black text-korefi-offwhite text-[15px] font-medium rounded-[7px] hover:bg-[#314dd0] relative overflow-hidden group transition-all duration-300 hover:scale-[1.02]"
          >
            <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-[7px]">
              <span className="absolute top-0 -left-full w-[60%] h-full transition-none group-hover:transition-[left] group-hover:duration-600 group-hover:ease-out group-hover:left-[150%]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }} />
            </span>
            <span className="relative z-10">Talk to an Expert</span>
          </motion.button>
        </motion.div>
        {/* Right Column - Dashboard Preview (White/Blue Theme) */}
        <motion.div
          className="w-full lg:w-[460px] shrink-0"
          variants={dashboardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            scale: 1.04,
            boxShadow: '0 20px 60px rgba(49,77,208,0.18), 0 8px 20px rgba(49,77,208,0.1)',
          }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 12px 40px rgba(49,77,208,0.12), 0 4px 12px rgba(49,77,208,0.08)',
              transform: 'scale(1.02)',
            }}
          >
            {/* Top Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#314dd0' }}>Tax Credits Engine</span>
              <img src="/korefi-logo.png" alt="KoreFi" className="h-[12px] w-auto" />
            </div>

            {/* Stat Pills Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '12px' }}>
              {/* Pill 1 - Total Eligible (blue) */}
              <div style={{ background: '#F8F9FE', border: '0.5px solid rgba(49,77,208,0.15)', borderRadius: '8px', padding: '8px' }}>
                <p style={{ fontSize: '7px', color: '#6272b8', textTransform: 'uppercase', marginBottom: '2px' }}>Total Eligible</p>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#314dd0', fontWeight: 500 }}>$42,300</p>
                <p style={{ fontSize: '6px', color: '#9a9488' }}>{"This year's savings"}</p>
              </div>
              {/* Pill 2 - Already Filed (green) */}
              <div style={{ background: '#F0FDF4', border: '0.5px solid rgba(74,222,128,0.2)', borderRadius: '8px', padding: '8px' }}>
                <p style={{ fontSize: '7px', color: '#15803d', textTransform: 'uppercase', marginBottom: '2px' }}>Already Filed</p>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#16a34a', fontWeight: 500 }}>$18,000</p>
                <p style={{ fontSize: '6px', color: '#9a9488' }}>Claimed this year</p>
              </div>
              {/* Pill 3 - Unclaimed (red) */}
              <div style={{ background: '#FEF2F2', border: '0.5px solid rgba(239,68,68,0.15)', borderRadius: '8px', padding: '8px' }}>
                <p style={{ fontSize: '7px', color: '#b91c1c', textTransform: 'uppercase', marginBottom: '2px' }}>Unclaimed</p>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#ef4444', fontWeight: 500 }}>$24,300</p>
                <p style={{ fontSize: '6px', color: '#9a9488' }}>Waiting to be filed</p>
              </div>
              {/* Pill 4 - Employees (blue) */}
              <div style={{ background: '#F8F9FE', border: '0.5px solid rgba(49,77,208,0.15)', borderRadius: '8px', padding: '8px' }}>
                <p style={{ fontSize: '7px', color: '#6272b8', textTransform: 'uppercase', marginBottom: '2px' }}>Employees</p>
                <p style={{ fontFamily: 'Georgia, serif', fontSize: '16px', color: '#111110', fontWeight: 500 }}>9</p>
                <p style={{ fontSize: '6px', color: '#9a9488' }}>For hiring credits</p>
              </div>
            </div>

            {/* Credit Eligibility Table */}
            <div style={{ background: '#FAFBFF', border: '0.5px solid rgba(49,77,208,0.12)', borderRadius: '8px', marginBottom: '10px', overflow: 'hidden' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 10px', borderBottom: '0.5px solid rgba(49,77,208,0.06)' }}>
                <span style={{ fontSize: '9px', fontWeight: 600, color: '#111110' }}>Credit Eligibility Overview</span>
                <span style={{ fontSize: '6px', color: '#6272b8', padding: '2px 6px', borderRadius: '4px', border: '0.5px solid rgba(49,77,208,0.2)' }}>Filter</span>
              </div>
              {/* Column Headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1fr', gap: '4px', padding: '6px 10px', borderBottom: '0.5px solid rgba(49,77,208,0.06)' }}>
                <span style={{ fontSize: '7px', color: '#6272b8', textTransform: 'uppercase' }}>Credit</span>
                <span style={{ fontSize: '7px', color: '#6272b8', textTransform: 'uppercase' }}>Status</span>
                <span style={{ fontSize: '7px', color: '#6272b8', textTransform: 'uppercase' }}>Value</span>
                <span style={{ fontSize: '7px', color: '#6272b8', textTransform: 'uppercase' }}>Action</span>
              </div>
              {/* Row 1 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1fr', gap: '4px', padding: '7px 10px', alignItems: 'center', borderBottom: '0.5px solid rgba(49,77,208,0.06)' }}>
                <span style={{ fontSize: '8px', color: '#111110' }}>FICA Tip Credit</span>
                <span style={{ fontSize: '6px', padding: '2px 5px', borderRadius: '4px', background: '#F0FDF4', color: '#16a34a' }}>Eligible</span>
                <span style={{ fontSize: '8px', color: '#314dd0', fontWeight: 500 }}>$18,500</span>
                <span style={{ fontSize: '7px', color: '#6272b8' }}>{"File Form 8846 ›"}</span>
              </div>
              {/* Row 2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1fr', gap: '4px', padding: '7px 10px', alignItems: 'center', borderBottom: '0.5px solid rgba(49,77,208,0.06)' }}>
                <span style={{ fontSize: '8px', color: '#111110' }}>WOTC Hiring</span>
                <span style={{ fontSize: '6px', padding: '2px 5px', borderRadius: '4px', background: '#F0FDF4', color: '#16a34a' }}>Eligible</span>
                <span style={{ fontSize: '8px', color: '#314dd0', fontWeight: 500 }}>$7,200</span>
                <span style={{ fontSize: '7px', color: '#6272b8' }}>{"Submit cert ›"}</span>
              </div>
              {/* Row 3 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 0.8fr 1fr', gap: '4px', padding: '7px 10px', alignItems: 'center' }}>
                <span style={{ fontSize: '8px', color: '#111110' }}>Energy Equipment</span>
                <span style={{ fontSize: '6px', padding: '2px 5px', borderRadius: '4px', background: '#FEF9C3', color: '#a16207' }}>Potential</span>
                <span style={{ fontSize: '8px', color: '#314dd0', fontWeight: 500 }}>$3,800</span>
                <span style={{ fontSize: '7px', color: '#6272b8' }}>{"Upload invoices ›"}</span>
              </div>
            </div>

            {/* AI Insights Section */}
            <div style={{ background: '#FAFBFF', border: '0.5px solid rgba(49,77,208,0.12)', borderRadius: '8px', padding: '10px' }}>
              <p style={{ fontSize: '8px', fontWeight: 600, color: '#314dd0', marginBottom: '8px' }}>AI Insights & Recommendations</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {/* Card 1 - Warning (yellow) */}
                <div style={{ background: '#FEF9C3', border: '0.5px solid rgba(234,179,8,0.2)', borderRadius: '5px', padding: '6px 8px' }}>
                  <p style={{ fontSize: '8px', fontWeight: 600, color: '#a16207', marginBottom: '2px' }}>WOTC Certification Missing</p>
                  <p style={{ fontSize: '7px', color: '#854d0e' }}>3 employees qualify but certification not submitted</p>
                </div>
                {/* Card 2 - Opportunity (green) */}
                <div style={{ background: '#F0FDF4', border: '0.5px solid rgba(74,222,128,0.2)', borderRadius: '5px', padding: '6px 8px' }}>
                  <p style={{ fontSize: '8px', fontWeight: 600, color: '#15803d', marginBottom: '2px' }}>Energy Credit Opportunity</p>
                  <p style={{ fontSize: '7px', color: '#166534' }}>Energy-efficient ovens could generate $2,100 credit</p>
                </div>
                {/* Card 3 - Growth (green) */}
                <div style={{ background: '#F0FDF4', border: '0.5px solid rgba(74,222,128,0.2)', borderRadius: '5px', padding: '6px 8px' }}>
                  <p style={{ fontSize: '8px', fontWeight: 600, color: '#15803d', marginBottom: '2px' }}>FICA Credit Growth</p>
                  <p style={{ fontSize: '7px', color: '#166534' }}>FICA tip credit increased 18% vs last year</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
