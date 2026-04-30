'use client'

import { motion } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function Contact() {
  return (
    <section className="relative z-30 w-full bg-[#121212] py-32 px-6 md:px-12 lg:px-24 border-t border-neutral-900 rounded-t-[3rem]">
      
      <div className="max-w-4xl mx-auto text-center">
        
        {/* Resume Sub-section */}
        <motion.div 
          id="resume"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32 pb-32 border-b border-neutral-800 flex flex-col items-center justify-center w-full scroll-mt-32"
        >
          <div className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 p-12 md:p-16 rounded-[2.5rem] shadow-2xl flex flex-col items-center max-w-2xl w-full relative overflow-hidden">
            {/* Subtle glow effect behind card */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-[#ffa500]/50 to-transparent" />
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Looking for my CV?</h2>
            <p className="text-zinc-400 text-lg md:text-xl font-light mb-10 text-center max-w-lg">
              Grab a detailed copy of my latest experience, technical skills, and operational background.
            </p>
            <div className="inline-block pointer-events-auto z-10 relative">
              <MagneticButton 
                onClick={() => window.open('https://drive.google.com/file/d/1HJEU14ukBhoONVpnIuSwTJAXaj2yoP3Q/view?usp=sharing', '_blank')}
                className="bg-white text-black hover:bg-neutral-200 shadow-[0_0_40px_rgba(255,255,255,0.15)]"
              >
                <div className="block px-10 py-5 w-full h-full font-semibold text-lg cursor-pointer">
                  Access Resumé
                </div>
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        {/* Contact Sub-section */}
        <motion.div 
          id="contact"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-12 tracking-tighter">
            Let’s Build Something Meaningful
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mt-12">
            <a href="mailto:abdulahadalikhan12@gmail.com" className="text-xl font-medium text-zinc-400 hover:text-white transition-colors duration-300">
              abdulahadalikhan12@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/abdul-ahad-ali-khan/" target="_blank" rel="noreferrer" className="text-xl font-medium text-zinc-400 hover:text-white transition-colors duration-300">
              LinkedIn
            </a>
            <a href="https://github.com/abdulahadalikhan12" target="_blank" rel="noreferrer" className="text-xl font-medium text-zinc-400 hover:text-white transition-colors duration-300">
              GitHub
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
