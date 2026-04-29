'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'

const projects = [
  { 
    id: 1, 
    title: 'Cloud Intelligence Platform', 
    category: 'MLOps & CI/CD', 
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop', 
    date: 'Oct 2025 – Dec 2025',
    mainLink: 'https://cloud-intelligence-platform.abdulahadalikhan12.workers.dev/',
    repoLink: 'https://github.com/abdulahadalikhan12/Cloud-Intelligence-Platform',
    description: 'End-to-End ML System for real-time environmental intelligence',
    bullets: [
        'Designed and deployed a production-grade ML platform for real-time environmental intelligence using Random Forest, XGBoost, Logistic Regression, and Linear Regression, achieving 87% classification accuracy and 0.85 F1-score.',
        'Reduced PM2.5 regression RMSE to 18.9 through advanced feature engineering and hyperparameter tuning.',
        'Implemented full MLOps lifecycle including model validation (DeepChecks), automated testing (PyTest), CI/CD pipelines (GitHub Actions), containerization (Docker), and orchestration (Prefect).',
        'Built scalable REST APIs using FastAPI for automated data ingestion and inference serving.',
        'Applied PCA and K-Means clustering to segment cities into environmental risk zones, improving decision-making efficiency by 40%.'
    ]
  },
  { 
    id: 2, 
    title: 'Nexus Health Intel', 
    category: 'Agentic Healthcare', 
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop', 
    date: 'Apr 2026',
    mainLink: 'https://nexus-health-intel.vercel.app/',
    repoLink: 'https://github.com/abdulahadalikhan12/Nexus-Health-Intel_',
    description: 'Agentic Healthcare Intelligence System using Python, FastAPI, OpenAI API, FAISS, Tavily API',
    bullets: [
        'Built an agentic healthcare intelligence system using Python, FastAPI, and OpenAI APIs to extract, reason over, and validate unstructured medical facility data across 10,000+ records.',
        'Implemented semantic search using FAISS embeddings, enabling complex multi-constraint queries (e.g., emergency care + rural location) with high retrieval accuracy.',
        'Designed a trust scoring and validation pipeline that detects inconsistencies in healthcare data (e.g., surgery without an anesthesiologist) using rule-based logic and LLM reasoning.',
        'Integrated OpenAI APIs for structured data extraction and multi-step reasoning over noisy medical records.'
    ]
  },
  { 
    id: 3, 
    title: 'Cred AI', 
    category: 'Fintech & AI Scoring', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop', 
    date: 'Ongoing',
    mainLink: 'https://cred-ai-giki.vercel.app/',
    repoLink: 'https://github.com/M-Nabeegh/cred-ai-giki',
    description: 'AI-driven alternative credit scoring system evaluating individuals using telecom and utility data.',
    bullets: [
        'Introduction & Vision: Bridges the gap for millions lacking formal credit history by providing fair, fast alternative credit scoring.',
        'Competitive Edge: Uses publicly available alternative data sources (telco and utility behavior) to target unbanked users, introducing a two-tier loan model with instant AI scoring.',
        'Technical Approach: Developed as a mobile-first software solution featuring an AI scoring module, User module for loan application, and Admin panel for verification.',
        'Feature Highlights: Dynamic credit score generator (0–850), document upload system for >PKR 500k manual reviews, and detailed score insight tracking.'
    ]
  }
]

type ProjectType = typeof projects[0]

function ProjectCard({ project, onClick }: { project: ProjectType, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative group w-full aspect-square rounded-3xl overflow-hidden cursor-pointer shadow-2xl"
    >
      <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-xl z-0" />
      <div 
        className="absolute inset-0 z-10 opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" 
        style={{ backgroundImage: `url(${project.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} 
      />
      <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      
      <div className="absolute bottom-0 left-0 p-6 z-30" style={{ transform: "translateZ(50px)" }}>
        <p className="text-xs uppercase tracking-widest text-[#ffa500] font-bold mb-1">{project.category}</p>
        <h3 className="text-2xl font-black text-white">{project.title}</h3>
      </div>
      
      {/* Hover glow */}
      <div className="absolute inset-0 z-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl border border-white/20" style={{boxShadow: 'inset 0 0 50px rgba(255,255,255,0.1)'}} />
    </motion.div>
  )
}

export default function ProjectsGrid() {
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'auto'
    return () => { document.body.style.overflow = 'auto' }
  }, [selectedProject])

  return (
    <section id="projects" className={`relative w-full bg-[#0a0a0a] pb-32 pt-16 px-4 md:px-12 lg:px-24 ${selectedProject ? 'z-[200]' : 'z-30'}`}>
      <div className="max-w-7xl mx-auto md:max-w-6xl">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-white text-center tracking-tighter">Selected Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 [perspective:1000px]">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} onClick={() => setSelectedProject(project)} />
          ))}
        </div>
        
        <div className="mt-24 text-center">
            <a href="https://github.com/abdulahadalikhan12" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 text-xl md:text-2xl font-medium text-zinc-400 hover:text-white transition-colors duration-300 group">
                <span>Explore more on GitHub</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </a>
        </div>
      </div>

      {/* Detail Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 lg:p-12"
            data-lenis-prevent="true"
          >
            {/* Backdrop Blur Layer */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer" 
                onClick={() => setSelectedProject(null)} 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#0f0f0f] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col z-10"
            >
                {/* Hero Header of Modal */}
                <div className="relative h-48 md:h-64 w-full shrink-0">
                    <div className="absolute inset-0 opacity-40 mix-blend-overlay" style={{ backgroundImage: `url(${selectedProject.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-black/40 to-transparent" />
                    
                    {/* Close Button */}
                    <button 
                        onClick={() => setSelectedProject(null)}
                        className="absolute top-6 right-6 w-12 h-12 bg-black/50 hover:bg-white/10 backdrop-blur-lg rounded-full flex items-center justify-center text-white/70 hover:text-white transition-all z-50 border border-white/10"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div>
                                <p className="text-[#ffa500] font-mono text-xs tracking-widest uppercase mb-1">{selectedProject.category}</p>
                                <h2 className="text-2xl md:text-4xl font-black text-white">{selectedProject.title}</h2>
                            </div>
                            <div className="text-zinc-500 font-mono text-xs uppercase tracking-wider bg-white/5 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md">
                                {selectedProject.date}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Content Scroll Area */}
                <div className="p-8 md:p-12 overflow-y-auto">
                    <p className="text-lg md:text-xl text-zinc-300 font-light mb-8 leading-relaxed">
                        {selectedProject.description}
                    </p>

                    <div className="space-y-4 mb-8">
                        {selectedProject.bullets.map((bullet, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <span className="mt-2 w-1.5 h-1.5 bg-[#ffa500] rounded-full shrink-0 shadow-[0_0_8px_#ffa500]" />
                                <p className="text-base text-zinc-400 leading-relaxed">{bullet}</p>
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-white/5">
                        <a 
                            href={selectedProject.mainLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-1 bg-white hover:bg-neutral-200 text-black px-6 py-3 rounded-full font-semibold text-center transition-colors text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                        >
                            View Live Site ↗
                        </a>
                        <a 
                            href={selectedProject.repoLink} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex-1 bg-neutral-800 hover:bg-neutral-700 border border-white/10 text-white px-6 py-3 rounded-full font-medium text-center transition-colors text-sm flex items-center justify-center gap-2"
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                            View GitHub
                        </a>
                    </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
