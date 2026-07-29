"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play } from "lucide-react"

// ─── Video data ────────────────────────────────────────────────────────────────
const GRID_VIDEOS = [
  {
    id: "watch",
    label: "Watch",
    src: "/interactive/watch.mp4",
    fallback: "/interactive/watch.mov",
    accent: "#ef4444", // Red accent
    position: "top-left",
  },
  {
    id: "island",
    label: "Island",
    src: "/interactive/island.mp4",
    fallback: "/interactive/island.mov",
    accent: "#3b82f6", // Blue accent
    position: "top-right",
  },
  {
    id: "scoopify",
    label: "Scoopify",
    src: "/interactive/scoopify.mp4",
    fallback: "/interactive/scoopify.mov",
    accent: "#f97316",
    position: "top-left",
  },
  {
    id: "perfume",
    label: "Perfume",
    src: "/interactive/perfume.mp4",
    fallback: "/interactive/perfume.mov",
    accent: "#a78bfa",
    position: "top-right",
  },
  {
    id: "laundry",
    label: "Laundry",
    src: "/interactive/laundry.mp4",
    fallback: "/interactive/laundry.mov",
    accent: "#34d399",
    position: "bottom-left",
  },
  {
    id: "starbucks",
    label: "Starbucks",
    src: "/interactive/starbucks.mp4",
    fallback: "/interactive/starbucks.mov",
    accent: "#fdb906",
    position: "bottom-right",
  },
]

// ─── Single tile video ─────────────────────────────────────────────────────────
function GridVideoTile({
  video,
  index,
  sectionVisible,
  onOpen,
}: {
  video: typeof GRID_VIDEOS[0]
  index: number
  sectionVisible: boolean
  onOpen: (v: typeof GRID_VIDEOS[0]) => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  // Set critical properties directly on the DOM element once mounted
  const setVideoRef = useCallback((el: HTMLVideoElement | null) => {
    if (!el) return
    ;(videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = el
    el.muted = true
    el.loop = true
    el.setAttribute("playsinline", "")
    el.setAttribute("webkit-playsinline", "")
    el.load()
    el.play().catch(() => {})
  }, [])

  // Restart from beginning every time section comes into view
  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    if (sectionVisible) {
      el.currentTime = 0
      el.muted = true
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [sectionVisible])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer rounded-2xl overflow-hidden bg-black aspect-video"
      onClick={() => onOpen(video)}
      role="button"
      aria-label={`Open ${video.label} video`}
    >
      {/* Video — properties set via ref callback for cross-browser reliability */}
      <video
        ref={setVideoRef}
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        style={{ willChange: "transform" }}
      >
        <source src={video.src} type="video/mp4" />
        <source src={video.fallback} type="video/quicktime" />
      </video>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-400"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)",
        }}
      />

      {/* Accent border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 2px ${video.accent}` }}
      />


    </motion.div>
  )
}

// ─── Lightbox Modal ─────────────────────────────────────────────────────────────
function VideoModal({
  video,
  onClose,
}: {
  video: typeof GRID_VIDEOS[0] | null
  onClose: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(true)
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    if (!video) return
    const el = videoRef.current
    if (!el) return
    el.currentTime = 0
    el.play().catch(() => {})
    setPlaying(true)
  }, [video])

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) { el.play(); setPlaying(true) }
    else { el.pause(); setPlaying(false) }
  }

  const seek = (secs: number) => {
    const el = videoRef.current
    if (!el) return
    el.currentTime = Math.max(0, Math.min(el.currentTime + secs, el.duration))
  }

  const handleTimeUpdate = () => {
    const el = videoRef.current
    if (!el || !el.duration) return
    setProgress((el.currentTime / el.duration) * 100)
  }

  const handleLoaded = () => {
    setDuration(videoRef.current?.duration ?? 0)
  }

  const handleSeekBar = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = videoRef.current
    if (!el) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    el.currentTime = ratio * el.duration
  }

  const fmt = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  return (
    <AnimatePresence>
      {video && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-10 pointer-events-none"
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.7, rotate: 6 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
          >
            <div
              className="relative w-full max-w-4xl rounded-3xl overflow-hidden pointer-events-auto shadow-2xl"
              style={{ border: `2px solid ${video.accent}55`, background: "#111" }}
            >
              {/* Video */}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                loop
                className="w-full aspect-video object-contain bg-black"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoaded}
              >
                <source src={video.src} type="video/mp4" />
                <source src={video.fallback} type="video/quicktime" />
              </video>

              {/* Controls bar */}
              <div className="px-6 py-4 bg-[#111]">
                {/* Seek bar */}
                <div
                  className="w-full h-1.5 rounded-full bg-white/15 cursor-pointer mb-4 relative"
                  onClick={handleSeekBar}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${progress}%`, background: video.accent }}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  {/* Time */}
                  <span className="text-xs text-white/40 tabular-nums min-w-[80px]">
                    {fmt((progress / 100) * duration)} / {fmt(duration)}
                  </span>

                  {/* Buttons */}
                  <div className="flex items-center gap-3">
                    {/* Rewind 10s */}
                    <button
                      onClick={() => seek(-10)}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-bold"
                      aria-label="Rewind 10 seconds"
                    >
                      ‹‹
                    </button>

                    {/* Play/Pause */}
                    <button
                      onClick={togglePlay}
                      className="w-12 h-12 rounded-full flex items-center justify-center transition-colors text-white"
                      style={{ background: video.accent }}
                      aria-label={playing ? "Pause" : "Play"}
                    >
                      {playing ? (
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                          <rect x="6" y="4" width="4" height="16" rx="1" />
                          <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                      ) : (
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      )}
                    </button>

                    {/* Forward 10s */}
                    <button
                      onClick={() => seek(10)}
                      className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors text-white text-xs font-bold"
                      aria-label="Forward 10 seconds"
                    >
                      ››
                    </button>
                  </div>

                  {/* Label */}
                  <span
                    className="text-xs font-bold uppercase tracking-widest min-w-[80px] text-right"
                    style={{ color: video.accent }}
                  >
                    {video.label}
                  </span>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/70 hover:text-white hover:bg-black/80 transition-all text-xl leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── Main Section ───────────────────────────────────────────────────────────────
export default function AnimatedWebsites() {
  const sectionRef = useRef<HTMLElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)
  const [activeVideo, setActiveVideo] = useState<typeof GRID_VIDEOS[0] | null>(null)

  // IntersectionObserver — restart all videos when section comes into view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Close modal on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveVideo(null) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  const handleOpen = useCallback((v: typeof GRID_VIDEOS[0]) => {
    setActiveVideo(v)
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="animated-websites"
        className="relative py-20 md:py-28 bg-[#050505] overflow-hidden"
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(253,185,6,0.03) 0%, transparent 80%)",
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
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
              className="text-white/50 text-sm max-w-xs md:text-right"
            >
              Click any video to watch the full interactive experience. Tap, explore, and feel the motion.
            </motion.p>
          </div>

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {GRID_VIDEOS.map((video, idx) => (
              <GridVideoTile
                key={video.id}
                video={video}
                index={idx}
                sectionVisible={sectionVisible}
                onOpen={handleOpen}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  )
}
