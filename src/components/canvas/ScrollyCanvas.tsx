'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import MagneticButton from '../ui/MagneticButton'

export default function ScrollyCanvas({ frameCount }: { frameCount: number }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const lastDrawnFrameRef = useRef<number>(-1)
    const [images, setImages] = useState<HTMLImageElement[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Preload Images
    useEffect(() => {
        let loaded = 0
        const loadedImages: HTMLImageElement[] = []

        for (let i = 1; i <= frameCount; i++) {
            const img = new Image()
            img.src = `/sequence/${i}.webp`

            img.onload = () => {
                loaded++
                if (loaded === frameCount) {
                    setImages(loadedImages)
                    setIsLoaded(true)
                }
            }
            img.onerror = () => {
                loaded++
                if (loaded === frameCount) {
                    setImages(loadedImages)
                    setIsLoaded(true)
                }
            }
            loadedImages.push(img)
        }
    }, [frameCount])

    const drawFrame = (index: number) => {
        const canvas = canvasRef.current
        if (!canvas || images.length === 0 || !images[index]) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const img = images[index]

        // Calculate object-fit: cover logic
        const hRatio = canvas.width / img.width
        const vRatio = canvas.height / img.height
        const ratio = Math.max(hRatio, vRatio)

        const centerShift_x = (canvas.width - img.width * ratio) / 2
        const centerShift_y = (canvas.height - img.height * ratio) / 2

        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, img.width, img.height,
            centerShift_x, centerShift_y, img.width * ratio, img.height * ratio)
    }

    // Draw first frame when loaded
    useEffect(() => {
        if (isLoaded) drawFrame(0)
    }, [isLoaded])

    // Isolate scroll progress natively to this precise DOM boundary
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // Frame Engine
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return
        const frameIndex = Math.min(
            frameCount - 1,
            Math.max(0, Math.floor(latest * frameCount))
        )

        // Critical Optimization: Skip rendering if the frame hasn't actually changed
        if (frameIndex !== lastDrawnFrameRef.current) {
            lastDrawnFrameRef.current = frameIndex
            requestAnimationFrame(() => drawFrame(frameIndex))
        }
    })

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth
                canvasRef.current.height = window.innerHeight
                drawFrame(0)
            }
        }
        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [isLoaded])

    // Typography Engine 

    // Section 1 (0% -> 25%) - Allows natural fade out transition while scrolling
    const sec1Opacity = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.25], [1, 1, 0, 0], { clamp: true })
    const sec1Y = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.25], [0, 0, -100, -100], { clamp: true })

    // Section 2 (10% -> 60%) - Extended aggressively on both ends to persist longer
    const sec2Opacity = useTransform(scrollYProgress, [0.1, 0.15, 0.55, 0.65], [0, 1, 1, 0], { clamp: true })
    const sec2Y = useTransform(scrollYProgress, [0.1, 0.15, 0.55, 0.65], [100, 0, 0, -100], { clamp: true })

    const [showSec1, setShowSec1] = useState(true)
    const [showSec2, setShowSec2] = useState(false)
    const [sec3VisibleNav, setSec3VisibleNav] = useState(false)
    const [sec3HasShown, setSec3HasShown] = useState(false)

    useMotionValueEvent(sec1Opacity, "change", l => setShowSec1(l > 0.01))
    useMotionValueEvent(sec2Opacity, "change", l => setShowSec2(l > 0.01))

    // Explicit 1750px override ensuring it unconditionally meets the requested boundary
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= 1750) {
                setSec3VisibleNav(true)
                setSec3HasShown(true)
            } else {
                setSec3VisibleNav(false)
            }
        }
        window.addEventListener('scroll', handleScroll)
        handleScroll()
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div ref={containerRef} className="h-[500vh] w-full relative z-10">
            <div className="relative sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">

                {/* Cinematic Render layer */}
                <canvas ref={canvasRef} className="scrolly-canvas shadow-2xl relative z-10" />
                <div className="absolute inset-0 bg-black/40 pointer-events-none z-20" />

                {/* Natively Bound Typography layer */}
                <div className="absolute inset-0 z-30 pointer-events-none">
                    {/* Section 1 */}
                    <motion.div
                        style={{ opacity: sec1Opacity, y: sec1Y, display: showSec1 ? "flex" : "none" }}
                        className="absolute inset-0 flex-col items-center justify-center text-center px-4"
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tighter text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                            Abdul Ahad Ali Khan
                        </h1>
                        <p className="text-xl md:text-3xl text-zinc-300 font-light tracking-wide text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                            AI/ML Engineer
                        </p>
                    </motion.div>

                    {/* Section 2 */}
                    <motion.div
                        style={{ opacity: sec2Opacity, y: sec2Y, display: showSec2 ? "flex" : "none" }}
                        className="absolute inset-0 flex-col items-start justify-center text-left pl-12 md:pl-24 pt-32 md:pt-48"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                            Building AI that works <br className="hidden md:block" />
                            in the real world.
                        </h2>
                    </motion.div>

                    {/* Section 3 (Decoupled completely from relative scaling, strictly bound to 1750px scroll via user request) */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: sec3VisibleNav ? 1 : 0, y: sec3VisibleNav ? 0 : -100 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ display: sec3HasShown || sec3VisibleNav ? "flex" : "none" }}
                        className="absolute inset-0 flex-col items-start md:items-end justify-center text-left md:text-right pl-12 pr-12 md:pl-24 md:pr-24"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 max-w-3xl text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
                            From ML models to scalable systems.
                        </h2>
                    </motion.div>
                </div>



            </div>
        </div>
    )
}
