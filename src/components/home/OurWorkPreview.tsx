"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useMotionTemplate,
} from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Globe, ChevronLeft, ChevronRight } from "lucide-react"

// ════════════════════════════════════════════════════════════════════════════
// PROJECT DATA — clean URL-safe paths
// ════════════════════════════════════════════════════════════════════════════

const PROJECTS = [
  {
    id: "web1",
    name: "AtYourService",
    tagline: "A modern service marketplace connecting customers with trusted professionals through an intuitive, conversion-focused digital experience built for speed, trust, and effortless booking.",
    category: "Website Design",
    src: "/web1/screenshot-2026-07-08-at-4.48.19-pm.png",
    link: "/work/web1",
    accentHex: "#fdb906",
    accentRgb: "253, 185, 6",
    numberLabel: "01",
  },
  {
    id: "web2",
    name: "OnZone Infotech",
    tagline: "A contemporary technology company website crafted to showcase IT solutions, innovation, and enterprise expertise with a clean corporate identity and engaging user experience.",
    category: "Website Design",
    src: "/web2/screenshot-2026-07-08-at-4.49.31-pm.png",
    link: "/work/web2",
    accentHex: "#818cf8",
    accentRgb: "129, 140, 248",
    numberLabel: "02",
  },
  {
    id: "web3",
    name: "Amboseli HR",
    tagline: "A sophisticated HR and recruitment platform designed to simplify talent acquisition while delivering a seamless experience for employers, recruiters, and candidates.",
    category: "Website Design",
    src: "/web3/screenshot-2026-07-08-at-4.51.10-pm.png",
    link: "/work/web3",
    accentHex: "#34d399",
    accentRgb: "52, 211, 153",
    numberLabel: "03",
  },
  {
    id: "web4",
    name: "Anand's Laundry",
    tagline: "A premium laundry and dry-cleaning website focused on effortless online booking, trusted garment care, and an elevated digital brand experience.",
    category: "Website Design",
    src: "/web4/screenshot-2026-07-08-at-4.53.47-pm.png",
    link: "/work/web4",
    accentHex: "#c084fc",
    accentRgb: "192, 132, 252",
    numberLabel: "04",
  },
  {
    id: "web5",
    name: "Viruthi",
    tagline: "A modern business website designed to showcase growth, innovation, and professional excellence through a refined digital experience that builds credibility and drives meaningful engagement.",
    category: "Website Design",
    src: "/web5/screenshot-2026-07-08-at-4.55.35-pm.png",
    link: "/work/web5",
    accentHex: "#ef4444",
    accentRgb: "239, 68, 68",
    numberLabel: "05",
  },
]

// ════════════════════════════════════════════════════════════════════════════
// SPRING CONFIG
// ════════════════════════════════════════════════════════════════════════════

const SPRING_LAYOUT = { type: "spring" as const, stiffness: 260, damping: 28, mass: 0.9 }
const SPRING_FAST   = { type: "spring" as const, stiffness: 380, damping: 30 }

// ════════════════════════════════════════════════════════════════════════════
// MOUSE-FOLLOW GLOW
// ════════════════════════════════════════════════════════════════════════════

function CardGlow({
  accentRgb,
  isActive,
  glowX,
  glowY,
}: {
  accentRgb: string
  isActive: boolean
  glowX: ReturnType<typeof useMotionValue<number>>
  glowY: ReturnType<typeof useMotionValue<number>>
}) {
  const x = useSpring(glowX, { stiffness: 120, damping: 20 })
  const y = useSpring(glowY, { stiffness: 120, damping: 20 })
  const glow = useMotionTemplate`radial-gradient(circle at ${x}% ${y}%, rgba(${accentRgb}, ${isActive ? 0.18 : 0.1}) 0%, transparent 55%)`

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none z-10"
      style={{ background: glow }}
    />
  )
}

// ════════════════════════════════════════════════════════════════════════════
// SINGLE PROJECT CARD (desktop)
// ════════════════════════════════════════════════════════════════════════════

interface ProjectCardProps {
  project: (typeof PROJECTS)[number]
  isActive: boolean
  index: number
  onClick: () => void
}

function ProjectCard({ project, isActive, index, onClick }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Tilt on inactive cards
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const smoothTiltX = useSpring(tiltX, { stiffness: 200, damping: 22 })
  const smoothTiltY = useSpring(tiltY, { stiffness: 200, damping: 22 })

  // Glow position (tracked here where pointer-events exist, passed down)
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      const nx = ((e.clientX - rect.left) / rect.width) * 100
      const ny = ((e.clientY - rect.top) / rect.height) * 100
      glowX.set(nx)
      glowY.set(ny)
      if (isActive) return
      const cx = nx / 100 - 0.5
      const cy = ny / 100 - 0.5
      tiltX.set(cy * -8)
      tiltY.set(cx * 8)
    },
    [isActive, tiltX, tiltY, glowX, glowY]
  )

  const handleMouseLeave = useCallback(() => {
    tiltX.set(0)
    tiltY.set(0)
    glowX.set(50)
    glowY.set(50)
  }, [tiltX, tiltY, glowX, glowY])

  return (
    <motion.div
      ref={cardRef}
      layout
      layoutId={`card-${project.id}`}
      className="relative flex-shrink-0 cursor-pointer group"
      style={{
        flex: isActive ? "6 1 0%" : "1 1 0%",
        minWidth: isActive ? 0 : 80,
        rotateX: smoothTiltX,
        rotateY: smoothTiltY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      transition={SPRING_LAYOUT}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      aria-label={`Select project: ${project.name}`}
      aria-expanded={isActive}
      whileHover={!isActive ? { scale: 1.015 } : undefined}
    >
      {/* ─── Card shell ─── */}
      <motion.div
        className="relative h-full w-full overflow-hidden"
        style={{
          borderRadius: 20,
          border: isActive
            ? `1.5px solid rgba(${project.accentRgb}, 0.45)`
            : "1px solid rgba(255,255,255,0.18)",
          boxShadow: isActive
            ? `0 0 0 1px rgba(${project.accentRgb}, 0.12), 0 32px 80px rgba(0,0,0,0.22), 0 0 80px rgba(${project.accentRgb}, 0.06)`
            : "0 8px 32px rgba(0,0,0,0.10), 0 1px 3px rgba(0,0,0,0.06)",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ─── Image ─── */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 will-change-transform group-hover:scale-[1.06]"
            style={{ transition: "transform 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}
          >
            <Image
              src={project.src}
              alt={project.name}
              fill
              unoptimized
              className="object-cover object-top"
              sizes="(max-width: 768px) 90vw, 60vw"
              priority={index < 2}
            />
          </div>
        </div>

        {/* ─── Base dark overlay ─── */}
        <div
          className="absolute inset-0"
          style={{
            background: isActive
              ? "linear-gradient(to top, rgba(6,6,10,0.88) 0%, rgba(6,6,10,0.40) 40%, rgba(6,6,10,0.08) 70%, transparent 100%)"
              : "linear-gradient(to top, rgba(6,6,10,0.75) 0%, rgba(6,6,10,0.45) 60%, rgba(6,6,10,0.20) 100%)",
            transition: "background 0.5s ease",
          }}
        />

        {/* ─── Mouse-follow glow ─── */}
        <CardGlow accentRgb={project.accentRgb} isActive={isActive} glowX={glowX} glowY={glowY} />

        {/* ─── Accent gradient at top edge ─── */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: isActive
              ? `linear-gradient(90deg, transparent 0%, rgba(${project.accentRgb}, 0.7) 50%, transparent 100%)`
              : "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
            transition: "background 0.5s ease",
            opacity: 0.8,
          }}
        />

        {/* ─── ACTIVE CARD CONTENT ─── */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              key="active-content"
              className="absolute bottom-0 left-0 right-0 p-7 md:p-9 z-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
            >
              {/* Category + Number row */}
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
                  style={{
                    background: `rgba(${project.accentRgb}, 0.18)`,
                    border: `1px solid rgba(${project.accentRgb}, 0.35)`,
                    color: project.accentHex,
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <Globe className="w-3 h-3" />
                  {project.category}
                </span>
                <span className="text-white/25 text-xs font-mono tabular-nums">
                  {project.numberLabel}
                </span>
              </div>

              {/* Project name */}
              <h3
                className="font-heading font-black text-white leading-tight mb-2"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", letterSpacing: "-0.03em" }}
              >
                {project.name}
              </h3>

              {/* Tagline */}
              <p className="text-white/55 text-sm md:text-[15px] leading-relaxed max-w-sm mb-6">
                {project.tagline}
              </p>

              {/* CTA */}
              <Link
                href={project.link}
                onClick={(e) => e.stopPropagation()}
                className="group/btn inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200"
                style={{ color: project.accentHex }}
              >
                <span
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-[13px]"
                  style={{
                    background: `rgba(${project.accentRgb}, 0.14)`,
                    border: `1px solid rgba(${project.accentRgb}, 0.35)`,
                    backdropFilter: "blur(12px)",
                    color: project.accentHex,
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLSpanElement
                    el.style.background = project.accentHex
                    el.style.color = "#0a0a0a"
                    el.style.borderColor = project.accentHex
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLSpanElement
                    el.style.background = `rgba(${project.accentRgb}, 0.14)`
                    el.style.color = project.accentHex
                    el.style.borderColor = `rgba(${project.accentRgb}, 0.35)`
                  }}
                >
                  Explore Project
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200" />
                </span>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── INACTIVE CARD CONTENT ─── */}
        <AnimatePresence>
          {!isActive && (
            <motion.div
              key="inactive-content"
              className="absolute inset-0 flex flex-col items-center justify-end pb-6 z-20 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {/* Vertical project name */}
              <div
                className="flex-1 flex items-center justify-center"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                <span className="text-white/60 text-xs font-bold uppercase tracking-[0.25em] group-hover:text-white/90 transition-colors duration-300 truncate max-h-[140px]">
                  {project.name}
                </span>
              </div>

              {/* Number indicator */}
              <span
                className="text-[10px] font-mono font-bold tabular-nums"
                style={{ color: `rgba(${project.accentRgb}, 0.6)` }}
              >
                {project.numberLabel}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ─── Hover glow border pulse (inactive) ─── */}
        {!isActive && (
          <div
            className="absolute inset-0 rounded-[20px] pointer-events-none opacity-0 group-hover:opacity-100"
            style={{
              boxShadow: `inset 0 0 0 1.5px rgba(${project.accentRgb}, 0.5)`,
              transition: "opacity 0.3s ease",
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// MOBILE CARD (snap-scroll)
// ════════════════════════════════════════════════════════════════════════════

function MobileCard({
  project,
  isActive,
  onClick,
}: {
  project: (typeof PROJECTS)[number]
  isActive: boolean
  onClick: () => void
}) {
  return (
    <motion.div
      className="flex-shrink-0 relative cursor-pointer"
      style={{ width: "82vw", scrollSnapAlign: "center" }}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: 18,
          height: 460,
          border: isActive
            ? `1.5px solid rgba(${project.accentRgb}, 0.5)`
            : "1px solid rgba(255,255,255,0.12)",
          boxShadow: isActive
            ? `0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(${project.accentRgb}, 0.1)`
            : "0 8px 30px rgba(0,0,0,0.12)",
          transition: "border-color 0.4s ease, box-shadow 0.4s ease",
        }}
      >
        <Image
          src={project.src}
          alt={project.name}
          fill
          unoptimized
          className="object-cover object-top"
          sizes="85vw"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(6,6,10,0.9) 0%, rgba(6,6,10,0.4) 50%, transparent 100%)",
          }}
        />

        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(${project.accentRgb}, 0.8) 50%, transparent 100%)`,
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center gap-2 mb-3">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: `rgba(${project.accentRgb}, 0.18)`,
                border: `1px solid rgba(${project.accentRgb}, 0.35)`,
                color: project.accentHex,
              }}
            >
              <Globe className="w-2.5 h-2.5" />
              {project.category}
            </span>
          </div>
          <h3
            className="font-heading font-black text-white text-2xl leading-tight mb-1.5"
            style={{ letterSpacing: "-0.03em" }}
          >
            {project.name}
          </h3>
          <p className="text-white/50 text-[13px] leading-relaxed mb-5 max-w-[90%]">
            {project.tagline}
          </p>
          <Link
            href={project.link}
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-bold"
            style={{ background: project.accentHex, color: "#0a0a0a" }}
          >
            Explore Project
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// PROGRESS DOTS
// ════════════════════════════════════════════════════════════════════════════

function ProgressDots({
  total,
  active,
  onSelect,
  accentHex,
}: {
  total: number
  active: number
  onSelect: (i: number) => void
  accentHex: string
}) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`Select project ${i + 1}`}
          className="relative flex items-center justify-center"
          style={{ padding: 4 }}
        >
          <motion.div
            layout
            className="rounded-full"
            style={{
              width: i === active ? 20 : 6,
              height: 6,
              background: i === active ? accentHex : "rgba(10,10,10,0.2)",
            }}
            transition={SPRING_FAST}
          />
        </button>
      ))}
    </div>
  )
}

// ════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ════════════════════════════════════════════════════════════════════════════

export default function OurWorkPreview() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    if (!isMobile) return
    const el = scrollRef.current
    if (!el) return
    const handleScroll = () => {
      const cardWidth = el.scrollWidth / PROJECTS.length
      const i = Math.round(el.scrollLeft / cardWidth)
      setActiveIndex(Math.max(0, Math.min(i, PROJECTS.length - 1)))
    }
    el.addEventListener("scroll", handleScroll, { passive: true })
    return () => el.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  const scrollToCard = useCallback(
    (i: number) => {
      setActiveIndex(i)
      if (!scrollRef.current || !isMobile) return
      const cardWidth = scrollRef.current.scrollWidth / PROJECTS.length
      scrollRef.current.scrollTo({ left: cardWidth * i, behavior: "smooth" })
    },
    [isMobile]
  )

  const activeProject = PROJECTS[activeIndex] || PROJECTS[0]

  return (
    <section id="our-work" className="relative py-20 md:py-28 bg-white overflow-hidden">
      {/* Ambient background */}
      <div
        className="absolute pointer-events-none"
        style={{
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(253,185,6,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-1/2 right-0 pointer-events-none"
        style={{
          width: 500,
          height: 500,
          borderRadius: "50%",
          transform: "translate(40%, -50%)",
          background:
            "radial-gradient(circle at center, rgba(129,140,248,0.06) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[11px] font-bold uppercase tracking-[0.25em] mb-3"
              style={{ color: "#fdb906" }}
            >
              Featured Projects
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-black text-brand-dark leading-tight"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)", letterSpacing: "-0.03em" }}
            >
              Websites That Make
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #fdb906 0%, #f59e0b 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                an Impression.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex items-center gap-4"
          >
            <ProgressDots
              total={PROJECTS.length}
              active={activeIndex}
              onSelect={scrollToCard}
              accentHex={activeProject.accentHex}
            />
          </motion.div>
        </div>

        {/* Desktop gallery */}
        {!isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex gap-3" style={{ height: 560 }}>
              {PROJECTS.map((project, i) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  isActive={i === activeIndex}
                  index={i}
                  onClick={() => setActiveIndex(i)}
                />
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="text-center text-[11px] text-brand-gray-muted/50 mt-4 tracking-wider uppercase"
            >
              Click any project to explore
            </motion.p>
          </motion.div>
        )}

        {/* Mobile snap-scroll gallery */}
        {isMobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto pb-4"
              style={{
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <div style={{ flex: "0 0 9vw" }} />
              {PROJECTS.map((project, i) => (
                <MobileCard
                  key={project.id}
                  project={project}
                  isActive={i === activeIndex}
                  onClick={() => scrollToCard(i)}
                />
              ))}
              <div style={{ flex: "0 0 9vw" }} />
            </div>
            <div className="flex items-center justify-center gap-6 mt-6 mb-2">
              <button
                onClick={() => scrollToCard(Math.max(0, activeIndex - 1))}
                className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/10"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <ProgressDots
                total={PROJECTS.length}
                active={activeIndex}
                onSelect={scrollToCard}
                accentHex={activeProject.accentHex}
              />

              <button
                onClick={() => scrollToCard(Math.min(PROJECTS.length - 1, activeIndex + 1))}
                className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-white/10"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
