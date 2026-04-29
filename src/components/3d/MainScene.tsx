'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { Sparkles, Environment } from '@react-three/drei'
import { useScroll } from 'framer-motion'
import * as THREE from 'three'

function ScrollControlledCamera() {
  const { scrollYProgress } = useScroll()
  
  useFrame(({ camera }) => {
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, scrollYProgress.get() * -5, 0.05)
  })
  return null
}

export default function MainScene() {
  return (
    <div className="fixed inset-0 z-20 pointer-events-none mix-blend-screen opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ScrollControlledCamera />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffa500" /> {/* Orange cinematic light */}
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#00aaff" /> {/* Blue cinematic light */}
        <Sparkles count={200} scale={20} size={1.5} speed={0.4} opacity={0.5} color="#ffffff" />
      </Canvas>
    </div>
  )
}
