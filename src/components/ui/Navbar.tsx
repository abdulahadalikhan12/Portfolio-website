'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Extracurricular', href: '#extracurricular' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.querySelector(item.href))
      
      let currentActive = ''
      sections.forEach(section => {
        if (section) {
          const rect = section.getBoundingClientRect()
          // If section top passes middle of screen
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            currentActive = section.getAttribute('id') ? `#${section.getAttribute('id')}` : ''
          }
        }
      })
      
      if (currentActive) {
        setActive(currentActive)
      } else if (window.scrollY < window.innerHeight) {
        setActive('')
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial check
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    // Small delay so the overlay closes before scroll begins
    setTimeout(() => {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }, [])

  return (
    <>
      {/* ── Desktop Navbar (hidden on mobile) ── */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)] hidden md:block"
      >
        <ul className="flex items-center justify-center gap-4">
          {navItems.map(item => (
            <li key={item.name}>
              <a 
                href={item.href} 
                onClick={(e) => handleClick(e, item.href)}
                className={`text-sm font-medium transition-colors duration-300 relative px-4 py-2 block ${active === item.href ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
              >
                {item.name}
                {active === item.href && (
                  <motion.div 
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-white/10 rounded-full -z-10 shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>
      </motion.nav>

      {/* ── Mobile Hamburger Button (visible only on mobile) ── */}
      <motion.button
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setMobileOpen(prev => !prev)}
        className="fixed top-5 right-5 z-[200] md:hidden w-11 h-11 rounded-full bg-[#0a0a0a]/70 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.04)]"
        aria-label="Toggle navigation menu"
      >
        <div className="flex flex-col items-center justify-center gap-[5px] w-5">
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-full h-[2px] bg-white rounded-full origin-center"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block w-full h-[2px] bg-white rounded-full"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.3 }}
            className="block w-full h-[2px] bg-white rounded-full origin-center"
          />
        </div>
      </motion.button>

      {/* ── Mobile Overlay Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[150] md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl flex items-center justify-center"
          >
            <nav>
              <ul className="flex flex-col items-center gap-3">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.06, duration: 0.35 }}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleClick(e, item.href)}
                      className={`text-2xl font-semibold tracking-wide px-6 py-3 block rounded-xl transition-colors duration-300 ${
                        active === item.href
                          ? 'text-white bg-white/10'
                          : 'text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
