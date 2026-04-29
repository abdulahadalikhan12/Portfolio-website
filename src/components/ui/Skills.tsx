'use client'

import { motion } from 'framer-motion'

const skillCategories = [
  {
    title: 'AI / Machine Learning',
    skills: ['Machine Learning', 'Neural Networks', 'Feature Engineering', 'Model Evaluation', 'LLMs', 'RAG', 'Agentic AI', 'Fine-Tuning']
  },
  {
    title: 'Frameworks & Libraries',
    skills: ['PyTorch', 'TensorFlow', 'Mindspore', 'scikit-learn', 'LangChain', 'LangGraph', 'FAISS', 'FastAPI', 'Tavily', 'NumPy', 'Pandas', 'OpenCV']
  },
  {
    title: 'MLOps & Deployment',
    skills: ['Docker', 'Vercel', 'CI/CD', 'GitHub Actions', 'MLFlow', 'Prefect', 'DeepChecks', 'REST APIs']
  },
  {
    title: 'Programming',
    skills: ['Python', 'C++', 'SQL', 'Java']
  }
]

export default function Skills() {
  return (
    <section id="skills" className="relative z-30 w-full bg-[#0a0a0a] py-32 px-6 md:px-12 lg:px-24 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black mb-16 text-white text-center tracking-tighter"
        >
          Technical Arsenal
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
             <motion.div 
               key={category.title}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: idx * 0.1 }}
               className="p-8 rounded-3xl bg-neutral-900/30 backdrop-blur-xl border border-white/5 hover:border-white/20 transition-colors duration-500"
             >
               <h3 className="text-xl font-bold text-white mb-6 tracking-tight">{category.title}</h3>
               <ul className="space-y-3">
                 {category.skills.map(skill => (
                   <li key={skill} className="text-zinc-400 font-medium flex items-center gap-3">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#ffa500]" />
                     {skill}
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
