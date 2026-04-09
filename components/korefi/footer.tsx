'use client'

import { motion } from 'framer-motion'

const serviceLinks = [
  { label: 'Tax credit recovery' },
  { label: 'Proactive accounting' },
]

const companyLinks = [
  { label: 'About', href: '/about' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/korefi/' },
  { label: 'Contact', href: 'mailto:support@korefi.ai' }
]

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="bg-korefi-dark-bg pt-12 pb-8 px-[6%]"
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 pb-10">
          {/* Left Column - Logo & Meta */}
          <div className="flex-1">
            {/* Logo */}
            <a href="/" className="flex items-center mb-6">
              <img src="/korefi-logo.png" alt="KoreFi" className="h-[22px] w-auto" style={{ filter: 'invert(1)' }} />
            </a>

            {/* Meta Text */}
            <div className="space-y-1.5 text-[13px] text-[#444440]">

              <p><span style={{ color: '#666660' }}>Regd. Address:</span> 30 N Gould St, Ste R, Sheridan, WY 82801, USA</p>
              <p className="pt-2">
                <a href="mailto:support@korefi.ai" className="hover:text-korefi-text-muted transition-colors">
                  support@korefi.ai
                </a>
              </p>
            </div>
          </div>

          {/* Right Columns - Links */}
          <div className="flex gap-16 lg:gap-24">
            {/* Service Links */}
            <div>
              <h4 className="text-[11px] uppercase text-korefi-text-muted font-medium tracking-widest mb-4">
                Service
              </h4>
              <ul className="space-y-2.5">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <span className="text-[14px] text-[#666660]">
                      {link.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-[11px] uppercase text-korefi-text-muted font-medium tracking-widest mb-4">
                Company
              </h4>
              <ul className="space-y-2.5">
                {companyLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-[14px] text-[#666660] hover:text-korefi-text-muted transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-korefi-border-dark pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-[#444440]">
          <span>© 2026 KoreFi. All rights reserved.</span>
          <div className="flex items-center gap-6">
            <a href="https://docs.google.com/document/d/1X3SPTwhKYueonOYhFlqr_6SwPiinj8Pc/preview" target="_blank" rel="noopener noreferrer" className="hover:text-korefi-text-muted transition-colors">
              Terms of Service
            </a>
            <a href="https://drive.google.com/file/d/13Bam_Nw-q2vidhOHHonoFEnmMtgTOLUw/preview" target="_blank" rel="noopener noreferrer" className="hover:text-korefi-text-muted transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
