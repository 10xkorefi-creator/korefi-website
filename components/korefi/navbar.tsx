'use client'

import { motion } from 'framer-motion'

interface NavbarProps {
  onOpenModal: () => void
}

export function Navbar({ onOpenModal }: NavbarProps) {
  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="sticky top-0 z-50 h-16 px-[6%] flex items-center justify-between bg-[rgba(250,250,247,0.96)] backdrop-blur-sm border-b border-korefi-border-light/50"
    >
      {/* Logo */}
      <a href="/" className="flex items-center">
        <img src="/korefi-logo.png" alt="KoreFi" className="h-[22px] w-auto" />
      </a>

      {/* Right side */}
      <div className="flex items-center gap-7">
        <a href="/#the-problem" className="hidden md:block text-[13px] text-korefi-text-secondary hover:text-korefi-black transition-colors">What's broken</a>
        <a href="/#the-solution" className="hidden md:block text-[13px] text-korefi-text-secondary hover:text-korefi-black transition-colors">How we fix it</a>
        <a href="/#the-payoff" className="hidden md:block text-[13px] text-korefi-text-secondary hover:text-korefi-black transition-colors">What you get</a>
        <a href="/about" className="hidden md:block text-[13px] text-korefi-text-secondary hover:text-korefi-black transition-colors">Why us</a>
        <button
          onClick={onOpenModal}
          className="inline-flex items-center justify-center px-[22px] py-[10px] bg-korefi-black text-korefi-offwhite text-[14px] font-medium rounded-[6px] hover:bg-[#314dd0] relative overflow-hidden group transition-colors duration-300"
        >
          <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-[6px]">
            <span className="absolute top-0 -left-full w-[60%] h-full transition-none group-hover:transition-[left] group-hover:duration-600 group-hover:ease-out group-hover:left-[150%]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }} />
          </span>
          <span className="relative z-10">Join the waitlist</span>
        </button>
      </div>
    </motion.nav>
  )
}
