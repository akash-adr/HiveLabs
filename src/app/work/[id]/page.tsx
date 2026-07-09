"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Globe } from "lucide-react"

// ════════════════════════════════════════════════════════════════════════════
// PROJECT DATA
// ════════════════════════════════════════════════════════════════════════════

type ProjectData = {
  id: string
  name: string
  tagline: string
  description: string
  category: string
  accentHex: string
  accentRgb: string
  heroImage: string
  gallery: string[]
}

const PROJECTS_DATA: Record<string, ProjectData> = {
  web1: {
    id: "web1",
    name: "AtYourService",
    tagline: "A modern service marketplace connecting customers with trusted professionals.",
    description: "Built for speed, trust, and effortless booking, this marketplace features a conversion-focused digital experience that seamlessly connects clients to service providers.",
    category: "Website Design",
    accentHex: "#fdb906",
    accentRgb: "253, 185, 6",
    heroImage: "/web1/screenshot-2026-07-08-at-4.48.19-pm.png",
    gallery: [
      "/web1/screenshot-2026-07-08-at-4.48.37-pm.png",
      "/web1/screenshot-2026-07-08-at-4.48.49-pm.png",
      "/web1/screenshot-2026-07-08-at-4.49.03-pm.png",
    ],
  },
  web2: {
    id: "web2",
    name: "OnZone Infotech",
    tagline: "A contemporary technology company website crafted to showcase IT solutions.",
    description: "Designed for innovation and enterprise expertise with a clean corporate identity, dark-mode elements, and an engaging user experience.",
    category: "Website Design",
    accentHex: "#818cf8",
    accentRgb: "129, 140, 248",
    heroImage: "/web2/screenshot-2026-07-08-at-4.49.31-pm.png",
    gallery: [
      "/web2/screenshot-2026-07-08-at-4.49.44-pm.png",
      "/web2/screenshot-2026-07-08-at-4.49.58-pm.png",
      "/web2/screenshot-2026-07-08-at-4.50.32-pm.png",
    ],
  },
  web3: {
    id: "web3",
    name: "Amboseli HR",
    tagline: "A sophisticated HR and recruitment platform designed to simplify talent acquisition.",
    description: "Delivering a seamless experience for employers, recruiters, and candidates through clear data visualization and streamlined onboarding workflows.",
    category: "Website Design",
    accentHex: "#34d399",
    accentRgb: "52, 211, 153",
    heroImage: "/web3/screenshot-2026-07-08-at-4.51.10-pm.png",
    gallery: [
      "/web3/screenshot-2026-07-08-at-4.51.21-pm.png",
      "/web3/screenshot-2026-07-08-at-4.51.41-pm.png",
      "/web3/screenshot-2026-07-08-at-4.51.49-pm.png",
      "/web3/screenshot-2026-07-08-at-4.52.00-pm.png",
      "/web3/screenshot-2026-07-08-at-4.52.17-pm.png",
    ],
  },
  web4: {
    id: "web4",
    name: "Anand's Laundry",
    tagline: "A premium laundry and dry-cleaning website focused on effortless online booking.",
    description: "Combining trusted garment care with an elevated digital brand experience, featuring smooth interactions and editorial photography.",
    category: "Website Design",
    accentHex: "#c084fc",
    accentRgb: "192, 132, 252",
    heroImage: "/web4/screenshot-2026-07-08-at-4.53.47-pm.png",
    gallery: [
      "/web4/screenshot-2026-07-08-at-4.54.06-pm.png",
      "/web4/screenshot-2026-07-08-at-4.54.17-pm.png",
      "/web4/screenshot-2026-07-08-at-4.54.29-pm.png",
    ],
  },
  web5: {
    id: "web5",
    name: "Viruthi",
    tagline: "A modern business website designed to showcase growth, innovation, and professional excellence.",
    description: "Built to build credibility and drive meaningful engagement through a refined digital experience.",
    category: "Website Design",
    accentHex: "#ef4444",
    accentRgb: "239, 68, 68",
    heroImage: "/web5/screenshot-2026-07-08-at-4.55.35-pm.png",
    gallery: [
      "/web5/screenshot-2026-07-08-at-4.55.49-pm.png",
      "/web5/screen-recording-2026-07-08-at-5.42.54-pm.mov",
      "/web5/screenshot-2026-07-08-at-4.56.05-pm.png",
      "/web5/screenshot-2026-07-08-at-4.56.17-pm.png",
      "/web5/screenshot-2026-07-08-at-4.56.27-pm.png",
      "/web5/screenshot-2026-07-08-at-4.56.38-pm.png",
      "/web5/screenshot-2026-07-08-at-4.57.02-pm.png",
    ],
  },
}

// ════════════════════════════════════════════════════════════════════════════
// PAGE COMPONENT
// ════════════════════════════════════════════════════════════════════════════

export default function WorkDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const project = PROJECTS_DATA[id]

  if (!project) {
    notFound()
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 pb-32">
      {/* Background Glow */}
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
        style={{
          width: "120vw",
          height: "80vh",
          background: `radial-gradient(ellipse at top, rgba(${project.accentRgb}, 0.12) 0%, transparent 70%)`,
          filter: "blur(100px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-12 md:mb-20"
        >
          <Link
            href="/#our-work"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-20 items-start mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1"
          >
            <div className="flex items-center gap-3 mb-6">
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
            </div>
            <h1
              className="font-heading font-black leading-tight mb-6"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.03em" }}
            >
              {project.name}
            </h1>
            <h2 className="text-xl md:text-2xl font-light text-white/80 leading-relaxed max-w-2xl">
              {project.tagline}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:w-1/3 pt-2 md:pt-4"
          >
            <p className="text-white/50 text-sm md:text-base leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full rounded-2xl md:rounded-[32px] overflow-hidden mb-12 md:mb-32 shadow-2xl border border-white/10"
          style={{
            boxShadow: `0 40px 100px -20px rgba(0,0,0,0.8), 0 0 80px rgba(${project.accentRgb}, 0.15)`,
          }}
        >
          <div className="aspect-[16/10] relative">
            <Image
              src={project.heroImage}
              alt={`${project.name} hero image`}
              fill
              unoptimized
              priority
              className="object-cover object-top"
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>
        </motion.div>

        {/* Gallery */}
        <div className="flex flex-col gap-8 md:gap-16">
          {project.gallery.map((src, idx) => {
            const isVideo = src.endsWith(".mov") || src.endsWith(".mp4")
            
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full rounded-xl md:rounded-[24px] overflow-hidden border border-white/5 bg-white/5"
              >
                <div className="relative" style={{ width: "100%", paddingBottom: "60%" }}>
                  {isVideo ? (
                    <video
                      src={src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover md:object-cover object-top"
                    />
                  ) : (
                    <Image
                      src={src}
                      alt={`${project.name} detail view ${idx + 1}`}
                      fill
                      unoptimized
                      className="object-contain md:object-cover object-top"
                      sizes="(max-width: 1200px) 100vw, 1200px"
                    />
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
