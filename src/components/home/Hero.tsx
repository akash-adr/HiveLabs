"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const MARQUEE_ITEMS = [
  "Web Design",
  "✦",
  "Brand Identity",
  "✦",
  "Social Growth",
  "✦",
  "Digital Strategy",
  "✦",
  "UI/UX Design",
  "✦",
  "Hive Complete",
  "✦",
]

function MarqueeTrack({ reversed = false }: { reversed?: boolean }) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div
        className="flex gap-8 items-center pr-8"
        animate={{ x: reversed ? ["0%", "33.333%"] : ["0%", "-33.333%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
      >
        {items.map((item, i) => (
          <span
            key={i}
            className={`text-sm font-semibold uppercase tracking-[0.18em] shrink-0 ${
              item === "✦"
                ? "text-brand-yellow text-xs"
                : "text-brand-dark/60"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"])

  const stagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.2 },
    },
  }
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 260, damping: 22 },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[45vh] flex flex-col overflow-hidden"
    >

      {/* ─── Hero content ─── */}
      <motion.div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="max-w-4xl flex flex-col items-center"
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-4 mb-8">
              <span className="block w-10 h-px bg-brand-yellow" />
              <span className="text-base font-bold uppercase tracking-[0.2em] text-brand-dark/70">
                Welcome to{" "}
              </span>
              <span
                className="text-base font-black uppercase tracking-[0.2em]"
                style={{
                  background: "linear-gradient(90deg, #fdb906 0%, #d97706 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                HiveLabs
              </span>
              <span className="block w-10 h-px bg-brand-yellow" />
            </motion.div>

            {/* Giant headline */}
            <motion.h1 variants={fadeUp} style={{ lineHeight: 1.0 }}>
              <span className="block font-heading font-semibold text-[clamp(3rem,7vw,7rem)] tracking-[-0.03em] text-brand-dark">
                Building Brands
              </span>

              <span className="block font-heading font-semibold text-[clamp(3rem,7vw,7rem)] tracking-[-0.03em] leading-none mt-1">
                <span className="text-brand-dark">That </span>
                <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&display=swap');`}</style>
                <span
                  className="relative inline-block"
                  style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 600 }}
                >
                  <span className="relative z-10 text-brand-dark">People</span>
                  <span
                    className="absolute left-0 bottom-[4px] w-full pointer-events-none"
                    style={{
                      height: "clamp(6px, 1vw, 14px)",
                      background: "linear-gradient(90deg, #fdb906 0%, #f59e0b 100%)",
                      borderRadius: "4px",
                      zIndex: 0,
                      transform: "rotate(-1.5deg)",
                      opacity: 0.6,
                    }}
                  />
                </span>
              </span>

              <span className="block font-heading font-semibold text-[clamp(3rem,7vw,7rem)] tracking-[-0.03em] text-brand-dark mt-1">
                Remember.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={fadeUp}
              className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-brand-gray-muted leading-relaxed"
            >
              From strategy and branding to modern websites and social media, we create digital experiences that help businesses{" "}
              <span className="font-semibold text-brand-dark">stand out</span>,{" "}
              <span className="font-semibold text-brand-dark">connect with their audience</span>, and{" "}
              <span className="font-semibold text-brand-dark">grow with confidence</span>.
            </motion.p>

            {/* CTA row */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/#contact"
                className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-dark text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] overflow-hidden"
              >
                <span className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                <span className="relative z-10 text-white group-hover:text-brand-dark transition-colors duration-300">
                  Start Your Project
                </span>
                <ArrowUpRight className="relative z-10 w-4 h-4 text-white group-hover:text-brand-dark group-hover:rotate-12 transition-all duration-300" />
              </Link>

              <button
                onClick={() => {
                  document.getElementById("animated-websites")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-black/15 bg-white/70 backdrop-blur-sm text-brand-dark font-semibold text-sm tracking-wide hover:border-brand-yellow/60 hover:bg-brand-yellow/5 transition-all duration-300"
              >
                See Our Work
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ─── Marquee banner strip ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full border-t border-b border-black/8 py-4 bg-white/70 backdrop-blur-md overflow-hidden"
      >
        <MarqueeTrack />
      </motion.div>
    </section>
  )
}
