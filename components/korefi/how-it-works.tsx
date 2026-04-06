'use client'

import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

// SVG Icons for each step
const BookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M3 2h7l3 3v9H3V2z" stroke="#314dd0" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M10 2v3h3" stroke="#314dd0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M5.5 8h5M5.5 10.5h3" stroke="#314dd0" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

const MagnifyingGlassIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="4.5" stroke="#314dd0" strokeWidth="1.3" />
    <path d="M10.5 10.5L14 14" stroke="#314dd0" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

const ShieldCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5l6.5 3.5v5c0 3-3 5.5-6.5 6.5C4.5 15.5 1.5 13 1.5 10V5L8 1.5z" stroke="#314dd0" strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M5.5 8L7.5 10L11 6" stroke="#314dd0" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const DollarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6" stroke="#314dd0" strokeWidth="1.3" />
    <path d="M8 4v8M6 6.5c0-.8.9-1.5 2-1.5s2 .7 2 1.5-.9 1.5-2 1.5-2 .7-2 1.5.9 1.5 2 1.5" stroke="#314dd0" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)

// Step 1: Share your books illustration
function Step1Illustration() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })

  return (
    <div ref={ref} className="py-4 flex flex-col items-center" style={{ minHeight: '210px' }}>
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
        {/* Document 1 - QB */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0 }}
        >
          <rect x="15" y="10" width="52" height="65" rx="5" fill="#F8F9FE" stroke="#314dd0" strokeWidth="1" />
          <line x1="24" y1="26" x2="58" y2="26" stroke="#d1d5db" strokeWidth="2.5" />
          <line x1="24" y1="36" x2="52" y2="36" stroke="#d1d5db" strokeWidth="2.5" />
          <line x1="24" y1="46" x2="48" y2="46" stroke="#d1d5db" strokeWidth="2.5" />
          <text x="41" y="62" fontSize="10" fill="#314dd0" textAnchor="middle" fontWeight="600">QB</text>
        </motion.g>

        {/* Document 2 - Bank */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <rect x="84" y="10" width="52" height="65" rx="5" fill="#F8F9FE" stroke="#314dd0" strokeWidth="1" />
          <line x1="93" y1="26" x2="127" y2="26" stroke="#d1d5db" strokeWidth="2.5" />
          <line x1="93" y1="36" x2="121" y2="36" stroke="#d1d5db" strokeWidth="2.5" />
          <line x1="93" y1="46" x2="117" y2="46" stroke="#d1d5db" strokeWidth="2.5" />
          <text x="110" y="62" fontSize="10" fill="#314dd0" textAnchor="middle" fontWeight="600">Bank</text>
        </motion.g>

        {/* Document 3 - POS */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <rect x="153" y="10" width="52" height="65" rx="5" fill="#F8F9FE" stroke="#314dd0" strokeWidth="1" />
          <line x1="162" y1="26" x2="196" y2="26" stroke="#d1d5db" strokeWidth="2.5" />
          <line x1="162" y1="36" x2="190" y2="36" stroke="#d1d5db" strokeWidth="2.5" />
          <line x1="162" y1="46" x2="186" y2="46" stroke="#d1d5db" strokeWidth="2.5" />
          <text x="179" y="62" fontSize="10" fill="#314dd0" textAnchor="middle" fontWeight="600">POS</text>
        </motion.g>

        {/* Dashed lines converging to center */}
        <motion.path
          d="M41 75 L110 110"
          stroke="#314dd0"
          strokeWidth="1.2"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
        <motion.path
          d="M110 75 L110 110"
          stroke="#314dd0"
          strokeWidth="1.2"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
        />
        <motion.path
          d="M179 75 L110 110"
          stroke="#314dd0"
          strokeWidth="1.2"
          strokeDasharray="5 5"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        />

        {/* Traveling dots - all 3 move DOWN along dashed lines in perfect sync */}
        {isInView && (
          <>
            {/* Dot 1 - from QB doc bottom (41,75) down along diagonal line to green circle edge */}
            {/* Path: M41 75 L110 110 - ends at circle top, so stop at ~(96,107) which is edge of r=16 circle centered at 110,125 */}
            <motion.circle
              r="4"
              fill="#314dd0"
              initial={{ cx: 41, cy: 75, opacity: 0 }}
              animate={{
                cx: [41, 96],
                cy: [75, 107],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.15, 0.85, 1],
                repeatDelay: 0.5
              }}
            />
            {/* Dot 2 - from Bank doc bottom (110,75) straight down to green circle edge (110,109) */}
            <motion.circle
              r="4"
              fill="#314dd0"
              initial={{ cx: 110, cy: 75, opacity: 0 }}
              animate={{
                cx: [110, 110],
                cy: [75, 109],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.15, 0.85, 1],
                repeatDelay: 0.5
              }}
            />
            {/* Dot 3 - from POS doc bottom (179,75) down along diagonal line to green circle edge */}
            {/* Path: M179 75 L110 110 - ends at circle top, so stop at ~(124,107) */}
            <motion.circle
              r="4"
              fill="#314dd0"
              initial={{ cx: 179, cy: 75, opacity: 0 }}
              animate={{
                cx: [179, 124],
                cy: [75, 107],
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'linear',
                times: [0, 0.15, 0.85, 1],
                repeatDelay: 0.5
              }}
            />
          </>
        )}

        {/* Green checkmark circle - centered at 110 */}
        <motion.g
          initial={{ scale: 0 }}
          animate={isInView ? { scale: [0, 1.15, 1] } : {}}
          transition={{ duration: 0.5, delay: 1, ease: 'easeOut' }}
          style={{ transformOrigin: '110px 125px' }}
        >
          <circle cx="110" cy="125" r="16" fill="#16a34a" />
          <path d="M102 125L108 131L118 119" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </motion.g>

        {/* Label - at y=172 for consistent alignment across all steps */}
        <text x="120" y="172" fontSize="12" fill="#314dd0" textAnchor="middle" fontWeight="500">Books connected</text>
      </svg>
    </div>
  )
}

// Step 2: AI finds the gaps illustration
function Step2Illustration() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const [showPills, setShowPills] = useState(false)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setShowPills(true)
      setTimeout(() => setShowPills(false), 4000)
    }, 5000)
    // Initial show
    setTimeout(() => {
      setShowPills(true)
      setTimeout(() => setShowPills(false), 4000)
    }, 800)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={ref} className="py-4 flex flex-col items-center" style={{ minHeight: '210px' }}>
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
        {/* Document with varied line lengths - like real text */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <rect x="12" y="12" width="70" height="105" rx="5" fill="#FAFAF7" stroke="#314dd0" strokeWidth="1" />
          {/* Line 1 - full width (longest) */}
          <line x1="22" y1="32" x2="72" y2="32" stroke="#e5e7eb" strokeWidth="2.5" />
          {/* Line 2 - 70% */}
          <line x1="22" y1="47" x2="57" y2="47" stroke="#e5e7eb" strokeWidth="2.5" />
          {/* Line 3 - 85% */}
          <line x1="22" y1="62" x2="64" y2="62" stroke="#e5e7eb" strokeWidth="2.5" />
          {/* Line 4 - 55% */}
          <line x1="22" y1="77" x2="49" y2="77" stroke="#e5e7eb" strokeWidth="2.5" />
          {/* Line 5 - 75% */}
          <line x1="22" y1="92" x2="59" y2="92" stroke="#e5e7eb" strokeWidth="2.5" />
        </motion.g>

        {/* Scan lines with glow effect */}
        {isInView && (
          <>
            {/* Glow behind */}
            <motion.line
              x1="14" x2="80" y1="25" y2="25"
              stroke="#314dd0"
              strokeWidth="4"
              opacity="0.15"
              animate={{ y1: [25, 110, 25], y2: [25, 110, 25] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Main scan line */}
            <motion.line
              x1="14" x2="80" y1="25" y2="25"
              stroke="#314dd0"
              strokeWidth="1.5"
              opacity="0.5"
              animate={{ y1: [25, 110, 25], y2: [25, 110, 25] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}

        {/* Dashed arrows - centered on pill vertical midpoints */}
        {/* Pill 1: y=25, height=30, center=40 */}
        <motion.path
          d="M88 40 L118 40"
          stroke="#314dd0"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        />
        {/* Pill 2: y=60, height=30, center=75 */}
        <motion.path
          d="M88 75 L118 75"
          stroke="#314dd0"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
        />
        {/* Pill 3: y=95, height=30, center=110 */}
        <motion.path
          d="M88 110 L118 110"
          stroke="#314dd0"
          strokeWidth="1.2"
          strokeDasharray="4 4"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
        />

        {/* Finding pills - larger */}
        <motion.g
          initial={{ opacity: 0, x: 15, scale: 0.9 }}
          animate={showPills ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 15, scale: 0.9 }}
          transition={{ duration: 0.3 }}
        >
          <rect x="120" y="25" width="105" height="30" rx="5" fill="#F0FDF4" stroke="#16a34a" strokeWidth="0.75" />
          <circle cx="135" cy="40" r="8" fill="#16a34a" />
          <path d="M131 40L134 43L139 37" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="150" y="45" fontSize="11" fill="#15803d" fontWeight="600">FICA $18,500</text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, x: 15, scale: 0.9 }}
          animate={showPills ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 15, scale: 0.9 }}
          transition={{ duration: 0.3, delay: showPills ? 0.5 : 0 }}
        >
          <rect x="120" y="60" width="105" height="30" rx="5" fill="#F0FDF4" stroke="#16a34a" strokeWidth="0.75" />
          <circle cx="135" cy="75" r="8" fill="#16a34a" />
          <path d="M131 75L134 78L139 72" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <text x="150" y="80" fontSize="11" fill="#15803d" fontWeight="600">WOTC $7,200</text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, x: 15, scale: 0.9 }}
          animate={showPills ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 15, scale: 0.9 }}
          transition={{ duration: 0.3, delay: showPills ? 1 : 0 }}
        >
          <rect x="120" y="95" width="105" height="30" rx="5" fill="#FEF2F2" stroke="#ef4444" strokeWidth="0.75" />
          <circle cx="135" cy="110" r="8" fill="#ef4444" />
          <text x="135" y="114" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">!</text>
          <text x="150" y="115" fontSize="11" fill="#dc2626" fontWeight="600">Missing cert!</text>
        </motion.g>

        {/* Label - at y=172 for consistent alignment across all steps */}
        <text x="120" y="172" fontSize="12" fill="#314dd0" textAnchor="middle" fontWeight="500">3 credits flagged</text>
      </svg>
    </div>
  )
}

// Step 3: Specialist verifies illustration
function Step3Illustration() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const [stampKey, setStampKey] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const interval = setInterval(() => {
      setStampKey(k => k + 1)
    }, 4000)
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div ref={ref} className="py-4 flex flex-col items-center" style={{ minHeight: '210px' }}>
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
        {/* CPA Avatar */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <circle cx="35" cy="45" r="24" fill="#F8F9FE" stroke="#314dd0" strokeWidth="1" />
          <circle cx="35" cy="38" r="8" stroke="#314dd0" strokeWidth="1.2" fill="none" />
          <path d="M19 62c0-8 7-13 16-13s16 5 16 13" stroke="#314dd0" strokeWidth="1.2" fill="none" />
          <text x="35" y="82" fontSize="10" fill="#314dd0" textAnchor="middle" fontWeight="600">Jennifer D.</text>
          <text x="35" y="94" fontSize="10" fill="#9a9488" textAnchor="middle">CPA</text>
        </motion.g>

        {/* Checklist card */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <rect x="75" y="10" width="150" height="95" rx="6" fill="white" stroke="#e5e7eb" strokeWidth="0.75" />

          {/* Row 1 */}
          <motion.g
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <circle cx="92" cy="38" r="7" fill="#16a34a" />
            <path d="M88 38L91 41L96 35" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="106" y="42" fontSize="10" fill="#374151" fontWeight="500">FICA Tip</text>
            <rect x="178" y="30" width="38" height="16" rx="3" fill="#F0FDF4" />
            <text x="197" y="42" fontSize="10" fill="#16a34a" textAnchor="middle" fontWeight="600">High</text>
          </motion.g>

          {/* Row 2 */}
          <motion.g
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <circle cx="92" cy="62" r="7" fill="#16a34a" />
            <path d="M88 62L91 65L96 59" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="106" y="66" fontSize="10" fill="#374151" fontWeight="500">WOTC</text>
            <rect x="178" y="54" width="38" height="16" rx="3" fill="#FEF3C7" />
            <text x="197" y="66" fontSize="10" fill="#f59e0b" textAnchor="middle" fontWeight="600">Med</text>
          </motion.g>

          {/* Row 3 */}
          <motion.g
            initial={{ opacity: 0, x: 10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.9 }}
          >
            <circle cx="92" cy="86" r="7" fill="#f59e0b" />
            <text x="92" y="90" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">?</text>
            <text x="106" y="90" fontSize="10" fill="#374151" fontWeight="500">Energy</text>
            <rect x="178" y="78" width="38" height="16" rx="3" fill="#FEF3C7" />
            <text x="197" y="90" fontSize="10" fill="#f59e0b" textAnchor="middle" fontWeight="600">Review</text>
          </motion.g>
        </motion.g>

        {/* CPA VERIFIED stamp - rounded rectangle, below checklist with 10px gap */}
        <motion.g
          key={stampKey}
          initial={{ scale: 2.5, opacity: 0, rotate: -15 }}
          animate={isInView ? { scale: [2.5, 0.9, 1.05, 1], opacity: [0, 1, 1, 1], rotate: [-15, -8, -8, -8] } : {}}
          transition={{ duration: 0.4, delay: 1.2, ease: 'easeOut' }}
          style={{ transformOrigin: '150px 135px' }}
        >
          {/* Rounded rectangle stamp - pill/badge shape */}
          <rect x="100" y="115" width="100" height="40" rx="8" fill="rgba(22,163,74,0.06)" stroke="#16a34a" strokeWidth="2.5" strokeDasharray="6 2 2 2" transform="rotate(-8 150 135)" />
          <rect x="106" y="121" width="88" height="28" rx="6" fill="none" stroke="#16a34a" strokeWidth="1" strokeDasharray="6 2 2 2" transform="rotate(-8 150 135)" />
          {/* CPA on top, VERIFIED below */}
          <text x="150" y="132" fontSize="10" fill="#16a34a" textAnchor="middle" fontWeight="500" transform="rotate(-8 150 135)">CPA</text>
          <text x="150" y="146" fontSize="12" fill="#16a34a" textAnchor="middle" fontWeight="bold" transform="rotate(-8 150 135)">VERIFIED</text>
        </motion.g>

        {/* Label - at y=172 for consistent alignment across all steps - NOT rotated */}
        <text x="120" y="172" fontSize="12" fill="#314dd0" textAnchor="middle" fontWeight="500">Expert-reviewed</text>
      </svg>
    </div>
  )
}

// Step 4: You get paid back illustration
function Step4Illustration() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '0px' })
  const totalValue = useMotionValue(0)
  const roundedTotal = useTransform(totalValue, val => `$${Math.round(val).toLocaleString()}`)
  const [wiggle, setWiggle] = useState(false)
  const [bubbles, setBubbles] = useState<Array<{ id: number; x: number; wobbleOffset: number }>>([])

  useEffect(() => {
    if (!isInView) return
    // Count up animation
    const timer = setTimeout(() => {
      animate(totalValue, 29500, { duration: 1.5, ease: 'easeOut' })
    }, 2000)
    // Wiggle animation
    const wiggleInterval = setInterval(() => {
      setWiggle(true)
      setTimeout(() => setWiggle(false), 500)
    }, 4000)
    setTimeout(() => {
      setWiggle(true)
      setTimeout(() => setWiggle(false), 500)
    }, 3600)
    // Bubbles - more bubbles, spread wider
    const bubbleInterval = setInterval(() => {
      const newBubbles = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i,
        x: 50 + Math.random() * 120,
        wobbleOffset: Math.random() * Math.PI * 2
      }))
      setBubbles(prev => [...prev, ...newBubbles])
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => !newBubbles.find(nb => nb.id === b.id)))
      }, 2000)
    }, 1500)
    setTimeout(() => {
      const initialBubbles = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i + 100,
        x: 50 + Math.random() * 120,
        wobbleOffset: Math.random() * Math.PI * 2
      }))
      setBubbles(initialBubbles)
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => !initialBubbles.find(ib => ib.id === b.id)))
      }, 2000)
    }, 3700)
    return () => {
      clearTimeout(timer)
      clearInterval(wiggleInterval)
      clearInterval(bubbleInterval)
    }
  }, [isInView, totalValue])

  return (
    <div ref={ref} className="py-4 flex flex-col items-center" style={{ minHeight: '210px' }}>
      <svg width="240" height="180" viewBox="0 0 240 180" fill="none">
        {/* Filing docs stack */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4 }}
        >
          <rect x="25" y="15" width="55" height="38" rx="4" fill="#f3f4f6" stroke="#d1d5db" strokeWidth="0.75" />
          <rect x="19" y="9" width="55" height="38" rx="4" fill="#f9fafb" stroke="#d1d5db" strokeWidth="0.75" />
          <rect x="13" y="3" width="55" height="38" rx="4" fill="white" stroke="#314dd0" strokeWidth="1" />
          <text x="40" y="26" fontSize="9" fill="#314dd0" textAnchor="middle" fontWeight="600">Form 8846</text>
        </motion.g>

        {/* Dashed arrow down */}
        <motion.path
          d="M38 44 L38 62 L80 62"
          stroke="#314dd0"
          strokeWidth="1.2"
          strokeDasharray="5 5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
        />

        {/* Credit pills - larger with more padding */}
        <motion.g
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <rect x="80" y="15" width="125" height="28" rx="5" fill="#F0FDF4" stroke="#16a34a" strokeWidth="0.75" />
          <text x="142" y="34" fontSize="11" fill="#15803d" textAnchor="middle" fontWeight="600">$18,500 FICA</text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 1.2 }}
        >
          <rect x="80" y="48" width="125" height="28" rx="5" fill="#F0FDF4" stroke="#16a34a" strokeWidth="0.75" />
          <text x="142" y="67" fontSize="11" fill="#15803d" textAnchor="middle" fontWeight="600">$7,200 WOTC</text>
        </motion.g>

        <motion.g
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 1.6 }}
        >
          <rect x="80" y="81" width="125" height="28" rx="5" fill="#F0FDF4" stroke="#16a34a" strokeWidth="0.75" />
          <text x="142" y="100" fontSize="11" fill="#15803d" textAnchor="middle" fontWeight="600">$3,800 Energy</text>
        </motion.g>

        {/* Total bar - wider, taller, more prominent */}
        <motion.g
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0, x: wiggle ? [0, -3, 3, -2, 2, 0] : 0 } : {}}
          transition={wiggle ? { duration: 0.5 } : { duration: 0.4, delay: 2 }}
        >
          <rect x="50" y="118" width="155" height="34" rx="6" fill="#16a34a" />
          <motion.text x="127" y="142" fontSize="16" fill="white" textAnchor="middle" fontWeight="bold">
            {roundedTotal}
          </motion.text>
        </motion.g>

        {/* Money bubbles - larger, more visible, with wobble */}
        {bubbles.map((bubble) => (
          <motion.g
            key={bubble.id}
            initial={{ y: 115, opacity: 0 }}
            animate={{
              y: 55,
              opacity: [0, 0.8, 0.8, 0],
              x: [0, 3, -3, 3, -3, 0]
            }}
            transition={{
              duration: 2,
              ease: 'easeOut',
              x: { duration: 0.5, repeat: 4 }
            }}
          >
            <circle cx={bubble.x} cy={0} r="8" fill="#16a34a" opacity="0.8" />
            <text x={bubble.x} y={4} fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">$</text>
          </motion.g>
        ))}

        {/* Label - at y=172 for consistent alignment across all steps */}
        <text x="120" y="172" fontSize="12" fill="#314dd0" textAnchor="middle" fontWeight="500">Credits recovered</text>
      </svg>
    </div>
  )
}

const steps = [
  {
    icon: <BookIcon />,
    title: 'Share your books',
    illustration: <Step1Illustration />,
    body: "Send your QuickBooks export, Bench reports, or bank statements. Or just leave your details — we'll guide you through it.",
  },
  {
    icon: <MagnifyingGlassIcon />,
    title: 'AI finds the gaps',
    illustration: <Step2Illustration />,
    body: 'Our AI scans your books and flags every credit, incentive, and deduction you qualify for — before deadlines, not after.',
  },
  {
    icon: <ShieldCheckIcon />,
    title: 'Specialists verify your data',
    illustration: <Step3Illustration />,
    body: 'Every finding is reviewed by a restaurant-specialist CPA. Accurate, defensible, and specific to how your business operates.',
  },
  {
    icon: <DollarIcon />,
    title: 'You get paid back',
    illustration: <Step4Illustration />,
    body: 'We file and support the full claiming process. Our fee is a percentage of what we recover. Find nothing — pay nothing.',
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

const stepVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 },
  },
}

const dotVariants = {
  hidden: { left: 'calc(12.5% + 15px)' },
  visible: {
    left: ['calc(12.5% + 15px)', 'calc(87.5% - 23px)'],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop' as const,
      delay: 0.8
    },
  },
}

export function HowItWorks() {
  return (
    <section id="the-solution" className="bg-korefi-offwhite py-20 px-[6%]">
      <div className="max-w-[1200px] mx-auto">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="text-[11px] uppercase text-korefi-text-muted font-medium tracking-widest">
            HOW IT WORKS
          </span>
          <span className="flex-1 h-[0.5px] bg-korefi-border-light" />
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
            Welcome to the era of <em className="italic text-korefi-gold">proactive</em> accounting.
          </h2>
          <p className="text-[16px] text-korefi-text-secondary leading-[1.7] max-w-[550px]">
            No new software. No disruption. We work alongside what you already have.
          </p>
        </motion.div>

        {/* Steps Grid - 4 columns */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {/* Single Continuous Connecting Line from step 1 to step 4 (desktop only) */}
          <motion.div
            variants={lineVariants}
            className="hidden lg:block absolute h-[0.5px] bg-korefi-gold origin-left"
            style={{
              top: '19px',
              left: 'calc(12.5% + 19px)',
              right: 'calc(12.5% + 19px)',
              zIndex: 0,
            }}
          />

          {/* Animated Gold Dot - travels from step 1 to step 4 (desktop only) */}
          <motion.div
            className="hidden lg:block absolute w-[8px] h-[8px] rounded-full bg-korefi-gold"
            style={{
              top: '15px',
              zIndex: 2,
              boxShadow: '0 0 8px rgba(49,77,208,0.4)',
            }}
            variants={dotVariants}
          />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="flex flex-col items-center text-center lg:px-4 relative"
            >
              {/* Circle with Icon */}
              <div
                className="w-[38px] h-[38px] rounded-full border border-korefi-gold/50 flex items-center justify-center mb-5 bg-korefi-offwhite"
                style={{ position: 'relative', zIndex: 3 }}
              >
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="font-serif text-[18px] text-korefi-black mb-3">{step.title}</h3>

              {/* Animated Illustration Asset */}
              {step.illustration}

              {/* Body */}
              <p className="text-[14px] text-korefi-text-secondary leading-[1.6] max-w-[240px]">
                {step.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
