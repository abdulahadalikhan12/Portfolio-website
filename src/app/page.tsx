import dynamic from 'next/dynamic'
import About from '@/components/ui/About'
import Skills from '@/components/ui/Skills'
import Experience from '@/components/ui/Experience'
import Extracurricular from '@/components/ui/Extracurricular'
import Contact from '@/components/ui/Contact'

const ScrollyCanvas = dynamic(() => import('@/components/canvas/ScrollyCanvas'), { ssr: false })
const MainScene = dynamic(() => import('@/components/3d/MainScene'), { ssr: false })
const ProjectsGrid = dynamic(() => import('@/components/ui/ProjectsGrid'), { ssr: false })

export default function Home() {
  return (
    <main className="relative w-full bg-[#121212]">
      {/* 3D WebGL Effects */}
      <MainScene />

      {/* 500vh scroll container for Image Sequence & Overlay Texts natively bound */}
      <ScrollyCanvas frameCount={120} />

      {/* Scrollable Content Hierarchy */}
      <About />
      <ProjectsGrid />
      <Skills />
      <Experience />
      <Extracurricular />
      <Contact />
    </main>
  )
}
