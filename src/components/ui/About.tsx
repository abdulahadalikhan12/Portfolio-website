'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <section id="about" className="relative z-30 w-full bg-[#0a0a0a] py-32 md:py-48 px-6 md:px-12 lg:px-24 rounded-t-[3rem] -mt-10 border-t border-neutral-800 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center gap-12 md:gap-24">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex-1"
        >
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-white tracking-tighter">About Me</h2>
          <p className="text-xl md:text-3xl text-zinc-300 font-light leading-snug">
            AI Engineer and Artificial Intelligence student with hands-on experience building production-grade AI systems. 
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1"
        >
          <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed">
            I specialize in LLM-powered agents, end-to-end ML pipelines, and scalable MLOps workflows, focusing on real-world impact. Combining academic rigor with practical engineering to build intelligent tools that automate efficiently and scale beautifully.
          </p>
        </motion.div>
        
      </div>
    </section>
  )
}
