'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2 rounded-full bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.02)]"
    >
      <ul className="flex items-center justify-center gap-2 md:gap-4">
        {navItems.map(item => (
          <li key={item.name}>
            <a 
              href={item.href} 
              onClick={(e) => handleClick(e, item.href)}
              className={`text-xs md:text-sm font-medium transition-colors duration-300 relative px-3 md:px-4 py-2 block ${active === item.href ? 'text-white' : 'text-neutral-400 hover:text-white'}`}
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
  )
}
