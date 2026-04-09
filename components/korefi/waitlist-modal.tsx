'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CustomSelect } from './custom-select'

const outletOptions = [
  { value: '1', label: '1' },
  { value: '2-3', label: '2-3' },
  { value: '4-6', label: '4-6' },
  { value: '7+', label: '7+' },
]

const revenueOptions = [
  { value: '0-$500K', label: '< $500K' },
  { value: '$500K-$1M', label: '$500K-$1M' },
  { value: '$1M-$2.5M', label: '$1M-$2.5M' },
  { value: '$2.5M-$5M', label: '$2.5M-$5M' },
  { value: '$5M+', label: '$5M+' },
]

const setupOptions = [
  { value: 'QuickBooks+CPA', label: 'QuickBooks + CPA' },
  { value: 'Bench+CPA', label: 'Bench + CPA' },
  { value: 'Bookkeeper+CPA', label: 'Bookkeeper + CPA' },
  { value: 'CPA only', label: 'CPA only' },
  { value: 'Other', label: 'Other' },
]

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [restaurant, setRestaurant] = useState('')
  const [outlets, setOutlets] = useState('')
  const [revenue, setRevenue] = useState('')
  const [setup, setSetup] = useState('')
  const [note, setNote] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<{ name?: string; email?: string; restaurant?: string; outlets?: string; revenue?: string; setup?: string }>({})

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setName('')
      setEmail('')
      setRestaurant('')
      setOutlets('')
      setRevenue('')
      setSetup('')
      setNote('')
      setIsSubmitted(false)
      setErrors({})
    }
  }, [isOpen])

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; restaurant?: string; outlets?: string; revenue?: string; setup?: string } = {}
    if (!name.trim()) newErrors.name = 'Name is required'
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!restaurant.trim()) newErrors.restaurant = 'Restaurant name is required'
    if (!outlets) newErrors.outlets = 'Please select number of outlets'
    if (!revenue) newErrors.revenue = 'Please select revenue range'
    if (!setup) newErrors.setup = 'Please select current setup'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)

    const formData = {
      name: name,
      email: email,
      restaurant: restaurant,
      outlets: outlets,
      revenue: revenue,
      setup: setup,
      note: note,
      timestamp: new Date().toISOString(),
    }

    try {
      await fetch('https://aiacc.app.n8n.cloud/webhook/korefi-submission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setIsSubmitted(true)
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Submission error:', error)
      alert('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses =
    'w-full bg-[#1a1a18] border-[1.5px] border-[#2a2a28] rounded-[10px] px-4 py-[13px] text-[14px] text-korefi-offwhite placeholder:text-[#555] focus:outline-none focus:border-korefi-gold focus:shadow-[0_0_0_3px_rgba(201,168,76,0.1)] transition-all duration-150'
  const labelClasses = 'block text-[11px] uppercase text-[#9a9488] font-medium tracking-[0.06em] mb-2'

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-100 flex items-center justify-center"
            style={{
              background: 'rgba(17, 17, 16, 0.7)',
              backdropFilter: 'blur(4px)',
            }}
            onClick={onClose}
          >
            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-[90%] max-w-[680px] max-h-[90vh] overflow-y-auto bg-korefi-black border-[1.5px] border-[#2a2a28] rounded-[16px] p-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-[#9a9488] hover:text-korefi-offwhite hover:bg-[#222220] transition-colors duration-150"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>

              {/* Header */}
              <h2 className="font-serif text-[24px] font-medium text-korefi-offwhite leading-[1.2] tracking-[-0.3px] mb-2 pr-8">
                Find out what your restaurant has been <em className="italic text-korefi-gold">missing</em>.
              </h2>
              <p className="text-[16px] text-[#9a9488] leading-[1.7] mb-7">
                No commitment. No upfront cost. {"We'll"} review your books and tell you what we found.
              </p>

              {/* Form Card */}
              <div className="bg-[#1a1a18] border-[1.5px] border-[#2a2a28] rounded-[14px] p-7">
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ backgroundColor: '#314dd0' }}>
                      <svg
                        width="28"
                        height="22"
                        viewBox="0 0 28 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 11L10 19L26 3"
                          stroke="#FFFFFF"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 className="font-serif text-[20px] text-korefi-offwhite mb-2">
                      {"You're on the list."}
                    </h3>
                    <p className="text-[14px] text-[#9a9488]">
                      {"We'll review your details and reach out within 1 business day."}
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className={labelClasses}>Your name</label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`${inputClasses} ${errors.name ? 'border-[#ef4444]' : ''}`}
                          placeholder="John Smith"
                        />
                        {errors.name && (
                          <span className="text-[11px] text-[#ef4444] mt-1 block">{errors.name}</span>
                        )}
                      </div>
                      <div>
                        <label className={labelClasses}>Email address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className={`${inputClasses} ${errors.email ? 'border-[#ef4444]' : ''}`}
                          placeholder="john@restaurant.com"
                        />
                        {errors.email && (
                          <span className="text-[11px] text-[#ef4444] mt-1 block">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className={labelClasses}>Restaurant name</label>
                        <input
                          type="text"
                          value={restaurant}
                          onChange={(e) => setRestaurant(e.target.value)}
                          className={`${inputClasses} ${errors.restaurant ? 'border-[#ef4444]' : ''}`}
                          placeholder="The Corner Bistro"
                        />
                        {errors.restaurant && (
                          <span className="text-[11px] text-[#ef4444] mt-1 block">
                            {errors.restaurant}
                          </span>
                        )}
                      </div>
                      <div>
                        <label className={labelClasses}>Number of outlets</label>
                        <CustomSelect
                          options={outletOptions}
                          value={outlets}
                          onChange={setOutlets}
                          placeholder="Select..."
                        />
                        {errors.outlets && (
                          <span className="text-[11px] text-[#ef4444] mt-1 block">{errors.outlets}</span>
                        )}
                      </div>
                    </div>

                    {/* Row 3 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label className={labelClasses}>Annual revenue</label>
                        <CustomSelect
                          options={revenueOptions}
                          value={revenue}
                          onChange={setRevenue}
                          placeholder="Select..."
                        />
                        {errors.revenue && (
                          <span className="text-[11px] text-[#ef4444] mt-1 block">{errors.revenue}</span>
                        )}
                      </div>
                      <div>
                        <label className={labelClasses}>Current setup</label>
                        <CustomSelect
                          options={setupOptions}
                          value={setup}
                          onChange={setSetup}
                          placeholder="Select..."
                        />
                        {errors.setup && (
                          <span className="text-[11px] text-[#ef4444] mt-1 block">{errors.setup}</span>
                        )}
                      </div>
                    </div>


                    {/* Form Footer */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4">

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-medium rounded-[10px] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden group ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                        style={{ backgroundColor: '#314dd0', color: '#FFFFFF' }}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              />
                            </svg>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <span className="absolute inset-0 pointer-events-none overflow-hidden rounded-[10px]">
                              <span className="absolute top-0 -left-full w-[60%] h-full transition-none group-hover:transition-[left] group-hover:duration-600 group-hover:ease-out group-hover:left-[150%]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }} />
                            </span>
                            <span className="relative z-10">Talk to an Expert</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}