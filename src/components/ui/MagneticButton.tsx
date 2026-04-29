'use client'

import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

export default function MagneticButton({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: (e: React.MouseEvent<HTMLDivElement>) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const { height, width, left, top } = ref.current!.getBoundingClientRect()
    const middleX = clientX - (left + width / 2)
    const middleY = clientY - (top + height / 2)
    setPosition({ x: middleX * 0.3, y: middleY * 0.3 })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const { x, y } = position
  
  // Spring physics for smooth return
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className={`relative inline-flex items-center justify-center font-medium transition-colors rounded-full overflow-hidden cursor-pointer ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </motion.div>
  )
}
