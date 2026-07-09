"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Globe, Play } from "lucide-react"

const VIDEOS = [
  {
    id: "vid-1",
    src: "/animated-websites/screen-recording-2026-07-08-at-4.53.10-pm.mov",
    title: "scroll based animated website",
    span: "col-span-12 md:col-span-7 row-span-2",
    height: "h-[300px] md:h-[540px]",
    accentHex: "#34d399",
  },
  {
    id: "vid-2",
    src: "/animated-websites/screen-recording-2026-07-08-at-5.41.51-pm.mov",
    title: "Vortex Scroll Experience",
    span: "col-span-12 md:col-span-5 row-span-1",
    height: "h-[250px] md:h-[260px]",
    accentHex: "#c084fc",
  },
  {
    id: "vid-3",
    src: "/animated-websites/screen-recording-2026-07-08-at-4.54.38-pm.mov",
    title: "Pulse Interactive Elements",
    span: "col-span-6 md:col-span-5 row-span-1",
    height: "h-[250px] md:h-[260px]",
    accentHex: "#fdb906",
  },
]

// The 4th video can be used if we adjust the grid, or just show 3 for an asymmetric look. 
// A 4-item bento grid:
const BENTO_VIDEOS = [
  {
    id: "vid-1",
    src: "/animated-websites/screen-recording-2026-07-08-at-4.53.10-pm.mov",
    title: "scroll based animated website",
    span: "col-span-12 md:col-span-8 md:row-span-2",
    height: "h-[320px] md:h-[624px]", // tall feature
    accent: "rgba(52, 211, 153, ",
  },
  {
    id: "vid-2",
    src: "/animated-websites/screen-recording-2026-07-08-at-5.41.51-pm.mov",
    title: "Vortex Scroll",
    span: "col-span-12 md:col-span-4",
    height: "h-[280px] md:h-[300px]",
    accent: "rgba(192, 132, 252, ",
  },
  {
    id: "vid-3",
    src: "/animated-websites/screen-recording-2026-07-08-at-4.54.38-pm.mov",
    title: "Interactive scroll based website",
    span: "col-span-12 md:col-span-4",
    height: "h-[280px] md:h-[300px]",
    accent: "rgba(253, 185, 6, ",
  },
]

function LoopingVideo({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Ensure it plays on iOS by forcing muted in JS
    video.muted = true
    video.play().catch(() => {})

    let lastTime = -1
    const interval = setInterval(() => {
      // If the video has enough data but time is frozen, it's stuck at the end of a .mov file.
      // This detects the visual freeze even if the browser hasn't fired the ended event.
      if (video.readyState === 4 && video.currentTime === lastTime && video.currentTime > 1) {
        video.currentTime = 0
        video.play().catch(() => {})
      }
      lastTime = video.currentTime
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      className={className}
    />
  )
}

export default function AnimatedWebsites() {
  return (
    <section className="relative py-20 md:py-32 bg-[#050505] overflow-hidden" id="animated-websites">
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "100%",
          height: "100%",
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(253,185,6,0.03) 0%, transparent 80%)",
          filter: "blur(80px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] mb-4 text-[#fdb906]"
            >
              <Play className="w-3 h-3" />
              Immersive Motion
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-white leading-tight"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", letterSpacing: "-0.03em" }}
            >
              Websites That Feel{" "}
              <span className="text-white/40 italic font-light">Alive.</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/50 text-sm max-w-sm md:text-right"
          >
            We push the boundaries of digital interaction with scroll-driven narratives, WebGL elements, and cinematic physics.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {BENTO_VIDEOS.map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className={`${video.span} ${video.height} relative group rounded-2xl md:rounded-[32px] overflow-hidden bg-white/5 border border-white/10`}
            >
              {/* Video Player */}
              <LoopingVideo
                src={video.src}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Overlay Gradient */}
              <div 
                className="absolute inset-0 transition-opacity duration-500 opacity-60 group-hover:opacity-40"
                style={{
                  background: `linear-gradient(to top, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0.2) 50%, transparent 100%)`
                }}
              />
              
              {/* Hover Glow Edge */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[32px]"
                style={{ boxShadow: `inset 0 0 0 1px ${video.accent}0.4)` }}
              />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <div className="flex items-center gap-2 mb-3">
                    <span 
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest backdrop-blur-md"
                      style={{ 
                        background: `${video.accent}0.15)`,
                        border: `1px solid ${video.accent}0.3)`,
                        color: "#fff"
                      }}
                    >
                      <Globe className="w-2.5 h-2.5 opacity-70" />
                      Motion Experience
                    </span>
                  </div>
                  <h3 className="font-heading font-bold text-white text-xl md:text-2xl tracking-tight mb-1">
                    {video.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
