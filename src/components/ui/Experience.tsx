'use client'

import { motion } from 'framer-motion'

export default function Experience() {
  return (
    <section id="experience" className="relative z-30 w-full bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black mb-16 text-white tracking-tighter"
        >
          Experience
        </motion.h2>
        
        <div className="relative border-l border-neutral-800 ml-4 md:ml-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="pl-8 md:pl-12 relative"
          >
            {/* Timeline Dot */}
            <div className="absolute w-4 h-4 bg-[#ffa500] rounded-full -left-[9px] top-2 shadow-[0_0_15px_#ffa500]" />
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">AI Engineer</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-6">
              <h4 className="text-xl text-[#ffa500] font-medium">Orblogic</h4>
              <span className="hidden md:inline text-neutral-600">•</span>
              <span className="text-sm font-mono text-zinc-500 uppercase tracking-wider">Dec 2025 – Apr 2026</span>
            </div>
            
            <ul className="space-y-4 text-lg text-zinc-400 font-light">
              <li className="flex items-start gap-3">
                <span className="mt-3 w-1.5 h-1.5 bg-neutral-600 rounded-full shrink-0" />
                <span>Built LLM-powered agents automating workflows</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-3 w-1.5 h-1.5 bg-neutral-600 rounded-full shrink-0" />
                <span>Designed multi-agent systems</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-3 w-1.5 h-1.5 bg-neutral-600 rounded-full shrink-0" />
                <span>Built ML pipelines and APIs</span>
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="pl-8 md:pl-12 relative mt-16"
          >
            {/* Timeline Dot */}
            <div className="absolute w-4 h-4 bg-[#ffa500] rounded-full -left-[9px] top-2 shadow-[0_0_15px_#ffa500]" />
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">Founder</h3>
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-6">
              <h4 className="text-xl text-[#ffa500] font-medium">Creative Dezines</h4>
              <span className="hidden md:inline text-neutral-600">•</span>
              <span className="text-sm font-mono text-zinc-500 uppercase tracking-wider">Mar 2021 – Present</span>
            </div>
            
            <ul className="space-y-4 text-lg text-zinc-400 font-light">
              <li className="flex items-start gap-3">
                <span className="mt-3 w-1.5 h-1.5 bg-neutral-600 rounded-full shrink-0" />
                <span>Built and scaled a 2D animation and design agency</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-3 w-1.5 h-1.5 bg-neutral-600 rounded-full shrink-0" />
                <span>Generated $80,000+ in revenue through client projects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-3 w-1.5 h-1.5 bg-neutral-600 rounded-full shrink-0" />
                <span>Managed end-to-end delivery, client communication, and operations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-3 w-1.5 h-1.5 bg-neutral-600 rounded-full shrink-0" />
                <span>Led a team and handled business growth</span>
              </li>
            </ul>
          </motion.div>
        </div>
        
      </div>
    </section>
  )
}
