"use client"

import { useState, useRef, useEffect } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"
import Image from "next/image"
import { X, ArrowUpRight } from "lucide-react"

// ════════════════════════════════════════════════════════════════════════════
// TYPES
// ════════════════════════════════════════════════════════════════════════════

type Category = "Websites" | "Animated Websites" | "Design"
type CardType = "landscape" | "portrait" | "square" | "tiny" | "video" | "cinematic"

interface CardLayout {
  top: number
  left: string
  width: string
  height?: string
  rotate: number
  zIndex: number
  parallax: number
}

interface CollageItem {
  id: string
  type: CardType
  src: string
  title: string
  category: Category
  description: string
  layout: CardLayout
}

// ════════════════════════════════════════════════════════════════════════════
// COLLAGE DATA — 31 real assets, artistically scattered
// ════════════════════════════════════════════════════════════════════════════

const COLLAGE_DATA: CollageItem[] = [
  // ─── Zone 1: Hero showcase ───────────────────────────────────────────────
  {
    id: "w2-1", type: "landscape",
    src: "/web2/screenshot-2026-07-08-at-4.49.31-pm.png",
    title: "Apex Finance Platform", category: "Websites",
    description: "A conversion-optimised finance platform with dark mode UI and real-time data visualisation.",
    layout: { top: 80, left: "4%", width: "52%", rotate: -0.5, zIndex: 2, parallax: 0.02 },
  },
  {
    id: "d1", type: "portrait",
    src: "/design/file_00000000030c7208abfece96b1e5a325.png",
    title: "Luxe Brand Identity", category: "Design",
    description: "Full brand identity for a luxury lifestyle brand — logo, colours, typography and brand patterns.",
    layout: { top: 30, left: "58%", width: "20%", rotate: 1.5, zIndex: 3, parallax: 0.04 },
  },
  {
    id: "w1-2", type: "tiny",
    src: "/web1/screenshot-2026-07-08-at-4.48.37-pm.png",
    title: "Orion Web Studio", category: "Websites",
    description: "Premium agency website with bold typography and immersive scroll animations.",
    layout: { top: 280, left: "80%", width: "14%", rotate: 2, zIndex: 4, parallax: 0.06 },
  },

  // ─── Zone 2: First video + scatter ───────────────────────────────────────
  {
    id: "vid-1", type: "video",
    src: "/animated-websites/screen-recording-2026-07-08-at-4.53.10-pm.mov",
    title: "Motion — Kinetic Homepage", category: "Animated Websites",
    description: "Full-motion website experience with scroll-triggered animations and dynamic scene transitions.",
    layout: { top: 440, left: "28%", width: "40%", rotate: 0, zIndex: 2, parallax: 0.03 },
  },
  {
    id: "d2", type: "square",
    src: "/design/file_000000001fc472079a33371ff5f8a5f4.png",
    title: "Prism Visual Identity", category: "Design",
    description: "Geometric brand identity with a prismatic colour system and modern editorial layouts.",
    layout: { top: 360, left: "2%", width: "22%", rotate: -2, zIndex: 3, parallax: 0.05 },
  },
  {
    id: "w3-3", type: "tiny",
    src: "/web3/screenshot-2026-07-08-at-4.51.41-pm.png",
    title: "Clarity SaaS Dashboard", category: "Websites",
    description: "Data-rich SaaS dashboard with dark UI and interactive analytics.",
    layout: { top: 490, left: "70%", width: "15%", rotate: 1, zIndex: 5, parallax: 0.07 },
  },

  // ─── Zone 3: Design focus ─────────────────────────────────────────────────
  {
    id: "d3", type: "landscape",
    src: "/design/file_000000004d3872079e6d7f7d4ff3458f.png",
    title: "Bloom Brand System", category: "Design",
    description: "Complete brand system for a wellness startup — art direction, packaging and social assets.",
    layout: { top: 700, left: "55%", width: "38%", rotate: -1.5, zIndex: 2, parallax: 0.02 },
  },
  {
    id: "w3-1", type: "landscape",
    src: "/web3/screenshot-2026-07-08-at-4.51.10-pm.png",
    title: "Nova Tech Website", category: "Websites",
    description: "Enterprise tech company website with immersive hero and performance-first code.",
    layout: { top: 780, left: "2%", width: "48%", rotate: 0.5, zIndex: 3, parallax: 0.02 },
  },
  {
    id: "w1-3", type: "tiny",
    src: "/web1/screenshot-2026-07-08-at-4.48.49-pm.png",
    title: "Orion — UI Detail", category: "Websites",
    description: "Micro UI detail — custom hover states and animated component library.",
    layout: { top: 700, left: "50%", width: "8%", rotate: 2, zIndex: 6, parallax: 0.08 },
  },

  // ─── Zone 4: Cinematic full-width strip ───────────────────────────────────
  {
    id: "w4-1", type: "cinematic",
    src: "/web4/screenshot-2026-07-08-at-4.53.47-pm.png",
    title: "Meridian — Digital Experience", category: "Websites",
    description: "Cinematic landing experience with full-bleed photography and editorial typography.",
    layout: { top: 1100, left: "0%", width: "100%", height: "340px", rotate: 0, zIndex: 1, parallax: 0.01 },
  },

  // ─── Zone 5: Mixed scatter ────────────────────────────────────────────────
  {
    id: "w2-2", type: "portrait",
    src: "/web2/screenshot-2026-07-08-at-4.49.44-pm.png",
    title: "Lumina E-Commerce", category: "Websites",
    description: "Premium e-commerce with editorial product pages and seamless checkout.",
    layout: { top: 1460, left: "4%", width: "24%", rotate: 1, zIndex: 3, parallax: 0.04 },
  },
  {
    id: "vid-2", type: "video",
    src: "/animated-websites/screen-recording-2026-07-08-at-4.54.38-pm.mov",
    title: "Pulse — Interactive Motion", category: "Animated Websites",
    description: "Cursor-driven interactive website with particle systems and generative background.",
    layout: { top: 1440, left: "30%", width: "40%", rotate: -0.5, zIndex: 2, parallax: 0.03 },
  },
  {
    id: "d4", type: "square",
    src: "/design/file_000000006a8c720886b753f43f0e893b.png",
    title: "Ember Social Kit", category: "Design",
    description: "Instagram and LinkedIn creative templates for a hospitality brand — 60+ assets.",
    layout: { top: 1490, left: "72%", width: "22%", rotate: 2, zIndex: 4, parallax: 0.05 },
  },

  // ─── Zone 6: Gallery depth ────────────────────────────────────────────────
  {
    id: "w3-2", type: "square",
    src: "/web3/screenshot-2026-07-08-at-4.51.21-pm.png",
    title: "Clarity — Analytics View", category: "Websites",
    description: "Analytics dashboard with multi-chart layouts and dark mode design.",
    layout: { top: 1820, left: "2%", width: "23%", rotate: -1.5, zIndex: 3, parallax: 0.05 },
  },
  {
    id: "w1-1", type: "landscape",
    src: "/web1/screenshot-2026-07-08-at-4.48.19-pm.png",
    title: "Stellar Agency Website", category: "Websites",
    description: "Bold agency website with strong typographic hierarchy and micro-animations.",
    layout: { top: 1760, left: "27%", width: "45%", rotate: 0.5, zIndex: 2, parallax: 0.02 },
  },
  {
    id: "d5", type: "tiny",
    src: "/design/file_0000000094ec72089665b52994c79537.png",
    title: "Solis — Poster Series", category: "Design",
    description: "Limited edition poster series for a music festival brand.",
    layout: { top: 1840, left: "74%", width: "20%", rotate: -1, zIndex: 5, parallax: 0.06 },
  },

  // ─── Zone 7: Video + design composition ──────────────────────────────────
  {
    id: "vid-3", type: "video",
    src: "/animated-websites/screen-recording-2026-07-08-at-5.41.51-pm.mov",
    title: "Vortex — Scroll Experience", category: "Animated Websites",
    description: "Scroll-driven narrative website with pinned sections and 3D transform sequences.",
    layout: { top: 2100, left: "8%", width: "42%", rotate: -0.5, zIndex: 2, parallax: 0.03 },
  },
  {
    id: "d6", type: "portrait",
    src: "/design/file_00000000a7907208bcaea138350257b0.png",
    title: "Arc — Brand Guidelines", category: "Design",
    description: "80-page brand guidelines for a B2B software company.",
    layout: { top: 2060, left: "53%", width: "20%", rotate: 2, zIndex: 3, parallax: 0.04 },
  },
  {
    id: "w4-2", type: "tiny",
    src: "/web4/screenshot-2026-07-08-at-4.54.06-pm.png",
    title: "Meridian — Navigation", category: "Websites",
    description: "Custom navigation with hover states and an animated mega menu.",
    layout: { top: 2170, left: "76%", width: "18%", rotate: -2, zIndex: 5, parallax: 0.07 },
  },

  // ─── Zone 8: Final composition ────────────────────────────────────────────
  {
    id: "vid-4", type: "video",
    src: "/animated-websites/screen-recording-2026-07-08-at-5.42.54-pm.mov",
    title: "Aether — Ambient Experience", category: "Animated Websites",
    description: "Ambient-driven digital experience with generative backgrounds and slow morphing shapes.",
    layout: { top: 2420, left: "52%", width: "42%", rotate: 0.5, zIndex: 2, parallax: 0.03 },
  },
  {
    id: "w4-3", type: "landscape",
    src: "/web4/screenshot-2026-07-08-at-4.54.17-pm.png",
    title: "Forge Portfolio", category: "Websites",
    description: "Creative portfolio for an industrial design studio with immersive case study layouts.",
    layout: { top: 2460, left: "3%", width: "44%", rotate: -0.5, zIndex: 3, parallax: 0.02 },
  },
  {
    id: "d7", type: "tiny",
    src: "/design/file_00000000b72c72088e0a77d7e1a465b1.png",
    title: "Mono — Typography Study", category: "Design",
    description: "Experimental typography study for a luxury print brand.",
    layout: { top: 2380, left: "48%", width: "8%", rotate: 1, zIndex: 6, parallax: 0.08 },
  },

  // ─── Zone 9: Closing composition ─────────────────────────────────────────
  {
    id: "d8", type: "landscape",
    src: "/design/file_00000000d1987208a05c73aa9dad9104.png",
    title: "Vista — Brand Campaign", category: "Design",
    description: "Full brand campaign — identity, digital banners and print collateral.",
    layout: { top: 2790, left: "18%", width: "38%", rotate: -1, zIndex: 2, parallax: 0.03 },
  },
  {
    id: "w3-4", type: "tiny",
    src: "/web3/screenshot-2026-07-08-at-4.51.49-pm.png",
    title: "Nova — Feature Block", category: "Websites",
    description: "Feature section with animated icon grid and scroll-triggered entrance animations.",
    layout: { top: 2750, left: "2%", width: "16%", rotate: 1.5, zIndex: 4, parallax: 0.06 },
  },
  {
    id: "w4-4", type: "square",
    src: "/web4/screenshot-2026-07-08-at-4.54.29-pm.png",
    title: "Forge — Gallery Detail", category: "Websites",
    description: "Gallery detail with masonry image layout and a custom lightbox interaction.",
    layout: { top: 2820, left: "58%", width: "18%", rotate: -2, zIndex: 3, parallax: 0.05 },
  },
  {
    id: "d9", type: "portrait",
    src: "/design/file_00000000d7b47208b75b3958514366b8.png",
    title: "Ink — Editorial Design", category: "Design",
    description: "Editorial design for a creative studio annual report and lookbook.",
    layout: { top: 2740, left: "78%", width: "16%", rotate: 2, zIndex: 4, parallax: 0.05 },
  },

  // ─── Zone 10: Final row ───────────────────────────────────────────────────
  {
    id: "w2-3", type: "landscape",
    src: "/web2/screenshot-2026-07-08-at-4.49.58-pm.png",
    title: "Lumina — Product Pages", category: "Websites",
    description: "Editorial product pages with large photography and a minimal interface.",
    layout: { top: 3090, left: "5%", width: "48%", rotate: 0.5, zIndex: 2, parallax: 0.02 },
  },
  {
    id: "w3-5", type: "tiny",
    src: "/web3/screenshot-2026-07-08-at-4.52.00-pm.png",
    title: "Clarity — Mobile", category: "Websites",
    description: "Responsive mobile view of the Clarity SaaS dashboard.",
    layout: { top: 3120, left: "55%", width: "12%", rotate: -1.5, zIndex: 5, parallax: 0.07 },
  },
  {
    id: "w2-4", type: "square",
    src: "/web2/screenshot-2026-07-08-at-4.50.32-pm.png",
    title: "Lumina — Checkout", category: "Websites",
    description: "Clean checkout flow with progress indicators and trust signals.",
    layout: { top: 3050, left: "69%", width: "26%", rotate: 1.5, zIndex: 3, parallax: 0.04 },
  },
  {
    id: "w3-6", type: "tiny",
    src: "/web3/screenshot-2026-07-08-at-4.52.17-pm.png",
    title: "Nova — Pricing Table", category: "Websites",
    description: "Pricing table component with toggle and feature comparison view.",
    layout: { top: 3360, left: "26%", width: "10%", rotate: -2, zIndex: 6, parallax: 0.08 },
  },
  {
    id: "w1-4", type: "landscape",
    src: "/web1/screenshot-2026-07-08-at-4.49.03-pm.png",
    title: "Stellar — About Page", category: "Websites",
    description: "Team page with animated portraits and editorial content layout.",
    layout: { top: 3380, left: "38%", width: "54%", rotate: -1, zIndex: 2, parallax: 0.02 },
  },
]

// ════════════════════════════════════════════════════════════════════════════
// CATEGORY BADGE STYLES
// ════════════════════════════════════════════════════════════════════════════

const CATEGORY_STYLES: Record<Category, string> = {
  Websites: "bg-brand-dark/90 text-white",
  "Animated Websites": "bg-brand-yellow text-brand-dark",
  Design: "bg-white/90 text-brand-dark",
}

// ════════════════════════════════════════════════════════════════════════════
// VIDEO CARD — lazy play/pause via IntersectionObserver
// ════════════════════════════════════════════════════════════════════════════

function VideoCard({ src, className }: { src: string; className?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.readyState === 0) video.load()
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <video
      ref={videoRef}
      className={className ?? "absolute inset-0 w-full h-full object-cover"}
      muted
      loop
      playsInline
      preload="none"
    >
      <source src={src} type="video/mp4" />
      <source src={src} type="video/quicktime" />
    </video>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// SINGLE COLLAGE CARD
// ════════════════════════════════════════════════════════════════════════════

interface CollageCardProps {
  item: CollageItem
  smoothMouseX: MotionValue<number>
  smoothMouseY: MotionValue<number>
  onSelect: (item: CollageItem) => void
  reducedMotion: boolean
}

const ASPECT_STYLES: Record<CardType, React.CSSProperties> = {
  landscape: { aspectRatio: "16 / 10" },
  portrait: { aspectRatio: "3 / 4" },
  square: { aspectRatio: "1 / 1" },
  tiny: { aspectRatio: "1 / 1" },
  video: { aspectRatio: "16 / 9" },
  cinematic: {},
}

function CollageCard({
  item,
  smoothMouseX,
  smoothMouseY,
  onSelect,
  reducedMotion,
}: CollageCardProps) {
  const px = useTransform(smoothMouseX, (v) =>
    reducedMotion ? 0 : v * item.layout.parallax
  )
  const py = useTransform(smoothMouseY, (v) =>
    reducedMotion ? 0 : v * item.layout.parallax
  )

  const isCinematic = item.type === "cinematic"
  const isVideo = item.type === "video"
  const isTiny = item.type === "tiny"

  const hoverScale = isCinematic ? 1.01 : isTiny ? 1.14 : 1.04

  return (
    <motion.div
      className="absolute group cursor-pointer"
      style={{
        top: item.layout.top,
        left: item.layout.left,
        width: item.layout.width,
        rotate: item.layout.rotate,
        zIndex: item.layout.zIndex,
        x: px,
        y: py,
      }}
      whileHover={{
        scale: hoverScale,
        zIndex: 50,
        transition: { type: "spring", stiffness: 380, damping: 26 },
      }}
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onSelect(item)}
      aria-label={`Open project: ${item.title}`}
    >
      {/* Card shell */}
      <div
        className="relative overflow-hidden rounded-2xl will-change-transform"
        style={{
          ...(isCinematic
            ? { height: item.layout.height }
            : ASPECT_STYLES[item.type]),
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.5s ease",
        }}
      >
        {isVideo ? (
          <VideoCard src={item.src} />
        ) : (
          <Image
            src={item.src}
            alt={item.title}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 90vw, 55vw"
          />
        )}

        {/* Dark gradient overlay — appears on hover via CSS */}
        <div
          className="absolute inset-0 flex items-end p-4 md:p-5 opacity-0 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(to top, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.24) 50%, transparent 100%)",
            transition: "opacity 0.35s ease",
          }}
        >
          <div
            className="translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
            style={{ transition: "opacity 0.25s ease 0.06s, transform 0.25s ease 0.06s" }}
          >
            <span
              className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm ${CATEGORY_STYLES[item.category]}`}
            >
              {item.category}
            </span>
            {!isTiny && (
              <p className="text-white font-semibold text-xs md:text-sm mt-1.5 font-heading leading-tight max-w-[90%]">
                {item.title}
              </p>
            )}
          </div>
        </div>

        {/* Amber border glow */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
          style={{
            boxShadow: "inset 0 0 0 1.5px rgba(253,185,6,0.55)",
            transition: "opacity 0.3s ease",
          }}
        />
      </div>

      {/* Soft drop shadow deepens on hover */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none -z-10 opacity-0 group-hover:opacity-100"
        style={{
          boxShadow: "0 32px 80px rgba(0,0,0,0.22)",
          transition: "opacity 0.4s ease",
        }}
      />
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// LIGHTBOX
// ════════════════════════════════════════════════════════════════════════════

function Lightbox({
  item,
  onClose,
}: {
  item: CollageItem
  onClose: () => void
}) {
  const isVideo = item.type === "video"

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKey)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Cinematic backdrop */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "rgba(6,6,10,0.92)",
          backdropFilter: "blur(24px) saturate(120%)",
          WebkitBackdropFilter: "blur(24px) saturate(120%)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Content container */}
      <motion.div
        className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row gap-5 items-stretch"
        initial={{ y: 48, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 24, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 340, damping: 30, delay: 0.06 }}
      >
        {/* Media panel */}
        <div
          className="flex-1 relative rounded-2xl overflow-hidden"
          style={{
            aspectRatio: isVideo ? "16/9" : "4/3",
            minHeight: 200,
            boxShadow: "0 24px 80px rgba(0,0,0,0.5)",
          }}
        >
          {isVideo ? (
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              key={item.src}
            >
              <source src={item.src} type="video/mp4" />
              <source src={item.src} type="video/quicktime" />
            </video>
          ) : (
            <Image
              src={item.src}
              alt={item.title}
              fill
              unoptimized
              className="object-cover"
              sizes="70vw"
              priority
            />
          )}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.25) 0%, transparent 40%)",
            }}
          />
        </div>

        {/* Glass info panel */}
        <motion.div
          className="md:w-72 flex flex-col justify-between rounded-2xl p-6 md:p-8"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.3)",
          }}
          initial={{ x: 28, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 16, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 380,
            damping: 30,
            delay: 0.16,
          }}
        >
          <div>
            <span
              className={`inline-block text-[11px] font-bold px-3 py-1.5 rounded-full mb-5 ${CATEGORY_STYLES[item.category]}`}
            >
              {item.category}
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-white leading-tight mb-4">
              {item.title}
            </h2>
            <p className="text-white/55 text-sm leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="/#contact"
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-colors duration-200"
              style={{
                background: "#fdb906",
                color: "#0a0a0a",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background =
                  "#fff"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLAnchorElement).style.background =
                  "#fdb906"
              }}
            >
              Start a Similar Project
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <button
              onClick={onClose}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm transition-colors duration-200"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.6)",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.08)"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLButtonElement).style.background =
                  "transparent"
              }}
            >
              Back to Gallery
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Close button */}
      <motion.button
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-200"
        style={{
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "rgba(255,255,255,0.8)",
        }}
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.2 }}
        aria-label="Close preview"
        whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.16)" }}
      >
        <X className="w-4 h-4" />
      </motion.button>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// MOBILE COLLAGE — curated 15-item intentional stack
// ════════════════════════════════════════════════════════════════════════════

const MOBILE_IDS = [
  "w2-1", "d1", "vid-1", "d2", "w3-1",
  "d3", "vid-2", "w1-1", "vid-3", "d6",
  "w4-3", "d8", "vid-4", "w2-3", "w1-4",
]
const MOBILE_ITEMS = MOBILE_IDS
  .map((id) => COLLAGE_DATA.find((i) => i.id === id))
  .filter((i): i is CollageItem => Boolean(i))

const MOBILE_ROTATIONS = [
  -1.5, 1.2, -0.8, 2, -1.2, 1.8, 0.5, -2, 1, -1.5, 2.2, -0.5, 1.5, -1.2, 0.8,
]

function MobileCollage({
  onSelect,
}: {
  onSelect: (item: CollageItem) => void
}) {
  return (
    <div className="flex flex-col items-center px-5 gap-0 pb-20 pt-6">
      {MOBILE_ITEMS.map((item, i) => {
        const isVideo = item.type === "video"
        const isWide = i % 5 === 0 || i % 5 === 3
        const isRight = i % 3 === 1

        return (
          <motion.div
            key={item.id}
            className="relative group cursor-pointer"
            style={{
              width: isWide ? "100%" : "82%",
              alignSelf: isRight ? "flex-end" : "flex-start",
              rotate: MOBILE_ROTATIONS[i],
              marginTop: i === 0 ? 0 : -18,
              zIndex: i + 1,
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{
              scale: 1.04,
              rotate: 0,
              zIndex: 60,
              transition: { type: "spring", stiffness: 380, damping: 26 },
            }}
            onClick={() => onSelect(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelect(item)}
            aria-label={`Open project: ${item.title}`}
          >
            <div
              className="relative overflow-hidden rounded-2xl"
              style={{
                aspectRatio:
                  item.type === "portrait"
                    ? "3/4"
                    : item.type === "square" || item.type === "tiny"
                    ? "1/1"
                    : "16/9",
                boxShadow: "0 6px 24px rgba(0,0,0,0.13)",
              }}
            >
              {isVideo ? (
                <VideoCard src={item.src} />
              ) : (
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="90vw"
                />
              )}
              <div
                className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(10,10,10,0.7) 0%, transparent 60%)",
                  transition: "opacity 0.3s ease",
                }}
              >
                <span
                  className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${CATEGORY_STYLES[item.category]}`}
                >
                  {item.category}
                </span>
              </div>
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100"
                style={{
                  boxShadow: "inset 0 0 0 1.5px rgba(253,185,6,0.5)",
                  transition: "opacity 0.3s ease",
                }}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════════════════

export default function WorkCollage() {
  const [selected, setSelected] = useState<CollageItem | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Smooth mouse position for parallax
  const rawMouseX = useMotionValue(0)
  const rawMouseY = useMotionValue(0)
  const smoothMouseX = useSpring(rawMouseX, { stiffness: 55, damping: 18 })
  const smoothMouseY = useSpring(rawMouseY, { stiffness: 55, damping: 18 })

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    const checkMotion = () => setReducedMotion(mq.matches)
    checkMobile()
    checkMotion()
    window.addEventListener("resize", checkMobile)
    mq.addEventListener("change", checkMotion)
    return () => {
      window.removeEventListener("resize", checkMobile)
      mq.removeEventListener("change", checkMotion)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reducedMotion || isMobile) return
    rawMouseX.set(e.clientX - window.innerWidth / 2)
    rawMouseY.set(e.clientY - window.innerHeight / 2)
  }

  return (
    <>
      <section
        ref={sectionRef}
        className="relative bg-white overflow-x-hidden"
        onMouseMove={handleMouseMove}
        aria-label="Our Work Gallery"
      >
        {/* ─── Ambient background orbs ─── */}
        <div
          className="absolute top-0 right-0 pointer-events-none"
          style={{
            width: 700,
            height: 700,
            borderRadius: "50%",
            transform: "translate(35%, -35%)",
            background:
              "radial-gradient(circle at center, rgba(253,185,6,0.08) 0%, transparent 65%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-[30%] left-0 pointer-events-none"
          style={{
            width: 550,
            height: 550,
            borderRadius: "50%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(circle at center, rgba(100,60,200,0.05) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-[65%] right-[20%] pointer-events-none"
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(253,185,6,0.06) 0%, transparent 65%)",
            filter: "blur(70px)",
          }}
        />
        <div
          className="absolute top-[85%] left-[10%] pointer-events-none"
          style={{
            width: 350,
            height: 350,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at center, rgba(80,180,255,0.04) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />

        {/* ─── Hero header ─── */}
        <div className="relative z-10 pt-14 md:pt-20 pb-6 md:pb-10 px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[11px] font-bold uppercase tracking-[0.3em] mb-4"
            style={{ color: "#fdb906" }}
          >
            Selected Works
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black tracking-[-0.04em] text-brand-dark leading-none"
            style={{ fontSize: "clamp(3.5rem, 10vw, 8.5rem)" }}
          >
            OUR WORK
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-brand-gray-muted text-sm md:text-[15px] max-w-sm mx-auto leading-relaxed"
          >
            Selected projects crafted with precision, motion and obsessive
            attention to detail.
          </motion.p>
        </div>

        {/* ─── Collage canvas ─── */}
        {isMobile ? (
          <MobileCollage onSelect={setSelected} />
        ) : (
          <div
            className="relative w-full"
            style={{ height: 3660 }}
            aria-label="Interactive work collage"
          >
            {/* Discipline watermarks — ghost text behind the collage */}
            <div
              className="absolute font-heading font-black uppercase leading-none select-none pointer-events-none"
              style={{
                top: 100,
                left: "2%",
                fontSize: "11vw",
                color: "rgba(10,10,10,0.022)",
                letterSpacing: "-0.05em",
                zIndex: 0,
              }}
            >
              WEBSITES
            </div>
            <div
              className="absolute font-heading font-black uppercase leading-none select-none pointer-events-none text-right"
              style={{
                top: 1680,
                right: "2%",
                fontSize: "11vw",
                color: "rgba(10,10,10,0.022)",
                letterSpacing: "-0.05em",
                zIndex: 0,
              }}
            >
              MOTION
            </div>
            <div
              className="absolute font-heading font-black uppercase leading-none select-none pointer-events-none"
              style={{
                top: 2640,
                left: "2%",
                fontSize: "11vw",
                color: "rgba(10,10,10,0.022)",
                letterSpacing: "-0.05em",
                zIndex: 0,
              }}
            >
              DESIGN
            </div>

            {/* All cards */}
            {COLLAGE_DATA.map((item) => (
              <CollageCard
                key={item.id}
                item={item}
                smoothMouseX={smoothMouseX}
                smoothMouseY={smoothMouseY}
                onSelect={setSelected}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        )}

        {/* Bottom fade into white */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: 120,
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.95) 100%)",
          }}
        />
      </section>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {selected && (
          <Lightbox item={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
