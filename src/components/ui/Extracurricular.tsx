'use client'

import { motion } from 'framer-motion'

export default function Extracurricular() {
  const items = [
    {
      role: 'Sponsorship Team Head',
      org: 'Institute of Engineering and Technology (IET)',
      duration: 'Dec 2023 – Jun 2025',
      bullets: [
        'Progressed from volunteer to leadership role',
        'Secured over PKR 1M+ in sponsorships',
        'Managed partnerships and sponsor deliverables'
      ]
    },
    {
      role: 'Management Advisor',
      org: 'Leadership and Entrepreneurial Society',
      duration: 'Mar 2024 – Jun 2025',
      bullets: [
        'Organized and executed 5+ events',
        'Managed budgets of PKR 800K+',
        'Coordinated cross-functional teams'
      ]
    },
    {
      role: 'Sponsorship & Technical Sub-Lead',
      org: 'Team Swift',
      duration: 'Dec 2023 – Oct 2024',
      bullets: [
        'Secured PKR 1M+ sponsorship funding',
        'Contributed to team achieving 7th place in SUAS 2024 (USA)',
        'Worked on both technical and sponsorship domains'
      ]
    }
  ]

  return (
    <section id="extracurricular" className="relative z-30 w-full bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-neutral-900">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black mb-16 text-white tracking-tighter"
        >
          Extracurricular & Leadership
        </motion.h2>
        
        <div className="relative border-l border-neutral-800 ml-4 md:ml-0 space-y-16">
          
          {items.map((item, index) => (
            <motion.div 
              key={item.org}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              className="pl-8 md:pl-12 relative"
            >
              {/* Timeline Dot */}
              <div className="absolute w-4 h-4 bg-[#ffa500] rounded-full -left-[9px] top-2 shadow-[0_0_15px_#ffa500]" />
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">{item.role}</h3>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-6">
                <h4 className="text-xl text-[#ffa500] font-medium">{item.org}</h4>
                <span className="hidden md:inline text-neutral-600">•</span>
                <span className="text-sm font-mono text-zinc-500 uppercase tracking-wider">{item.duration}</span>
              </div>
              
              <ul className="space-y-4 text-lg text-zinc-400 font-light max-w-2xl">
                {item.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="mt-3 w-1.5 h-1.5 bg-neutral-600 rounded-full shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  )
}
