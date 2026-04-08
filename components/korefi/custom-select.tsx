'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = 'Select...',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  const handleSelect = (optionValue: string) => {
    onChange(optionValue)
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between bg-[#1a1a18] border-[1.5px] rounded-[10px] px-4 py-[13px] text-[14px] cursor-pointer transition-all duration-150 ${
          isOpen
            ? 'border-korefi-gold shadow-[0_0_0_3px_rgba(201,168,76,0.1)]'
            : 'border-[#2a2a28]'
        }`}
      >
        <span className={selectedOption ? 'text-korefi-offwhite' : 'text-[#555]'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          className={`transition-transform duration-150 ${isOpen ? 'rotate-180' : ''}`}
        >
          <path
            d="M1 1l5 5 5-5"
            stroke={isOpen ? '#C9A84C' : '#555'}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-full left-0 right-0 mt-1.5 bg-[#1a1a18] border-[1.5px] border-korefi-gold rounded-[10px] shadow-[0_8px_24px_rgba(0,0,0,0.4),0_0_0_3px_rgba(201,168,76,0.06)] z-50 p-1.5"
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full text-left px-3.5 py-2.5 rounded-[7px] text-[14px] cursor-pointer transition-all duration-[120ms] ${
                  value === option.value
                    ? 'bg-[rgba(201,168,76,0.1)] text-korefi-gold'
                    : 'text-korefi-offwhite hover:bg-[rgba(201,168,76,0.1)] hover:text-korefi-gold'
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
