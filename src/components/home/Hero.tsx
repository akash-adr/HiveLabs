"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
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
                : "text-brand-dark/40"
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
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const stagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.14, delayChildren: 0.1 },
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
  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
  }

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-white"
    >
      {/* ─── Layered ambient background ─── */}
      {/* Large centre orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%]
          w-[900px] h-[900px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(253,185,6,0.12) 0%, rgba(253,185,6,0.04) 50%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />
      {/* Top-right warm accent */}
      <div
        className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(253,185,6,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Bottom-left cool accent */}
      <div
        className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(253,185,6,0.05) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Fine dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none -z-10 opacity-[0.35]"
        style={{
          backgroundImage: `radial-gradient(circle, #0a0a0a 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* ─── Main hero content ─── */}
      <motion.div
        style={{ y, opacity }}
        className="flex-1 flex flex-col"
      >
        {/* Top label row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="flex items-center justify-center pt-36 pb-2"
        >
          <div className="flex items-center gap-4">
            <span className="block w-10 md:w-16 h-px bg-brand-yellow/60" />
            <span
              className="text-sm md:text-base font-bold uppercase tracking-[0.2em] text-brand-dark/80"
            >
              Welcome to{" "}
            </span>
            <span
              className="text-sm md:text-base font-black uppercase tracking-[0.2em]"
              style={{
                background: "linear-gradient(90deg, #fdb906 0%, #d97706 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              HiveLabs
            </span>
            <span className="block w-10 md:w-16 h-px bg-brand-yellow/60" />
          </div>
        </motion.div>

        {/* ── Hero Heading block ── */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-8"
        >
          {/* Giant headline */}
          <motion.h1
            variants={fadeUp}
            className="text-center max-w-6xl mx-auto"
            style={{ lineHeight: 1.0 }}
          >
            {/* Line 1 – plain huge */}
            <span
              className="block font-heading font-black text-[clamp(3rem,9vw,8rem)] tracking-[-0.03em] text-brand-dark"
            >
              Building Brands
            </span>

            {/* Line 2 – editorial mix: italic serif + bold sans */}
            <span
              className="block font-heading font-black text-[clamp(3rem,9vw,8rem)] tracking-[-0.03em] leading-none mt-1"
            >
              <span
                className="text-brand-dark"
              >
                That{" "}
              </span>
              {/* Italic serif keyword — Playfair Display loaded inline */}
              <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,900&display=swap');`}</style>
              <span
                className="relative inline-block"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 900 }}
              >
                <span className="relative z-10 text-brand-dark">People</span>
                {/* Yellow underline brush stroke */}
                <span
                  className="absolute left-0 bottom-[4px] w-full pointer-events-none"
                  style={{
                    height: "clamp(6px, 1.4vw, 18px)",
                    background: "linear-gradient(90deg, #fdb906 0%, #f59e0b 100%)",
                    borderRadius: "4px",
                    zIndex: 0,
                    transform: "rotate(-1.5deg)",
                    opacity: 0.55,
                  }}
                />
              </span>
            </span>

            {/* Line 3 – smaller serif italic accent */}
            <span
              className="block font-heading font-black text-[clamp(3rem,9vw,8rem)] tracking-[-0.03em] text-brand-dark mt-1"
            >
              Remember.
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeUp}
            className="mt-10 max-w-2xl text-center text-base md:text-lg text-brand-gray-muted leading-relaxed font-sans"
          >
            From strategy and branding to modern websites and social media, we create digital experiences that help businesses{" "}
            <span className="font-semibold text-brand-dark">stand out</span>,{" "}
            <span className="font-semibold text-brand-dark">connect with their audience</span>, and{" "}
            <span className="font-semibold text-brand-dark">grow with confidence</span>.
          </motion.p>

          {/* CTA row */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-dark text-white font-semibold text-sm tracking-wide shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.03] overflow-hidden"
            >
              {/* Yellow hover wash */}
              <span className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
              <span className="relative z-10 text-white group-hover:text-brand-dark transition-colors duration-300">
                Start Your Project
              </span>
              <ArrowUpRight className="relative z-10 w-4 h-4 text-white group-hover:text-brand-dark group-hover:rotate-12 transition-all duration-300" />
            </Link>

            <Link
              href="/work"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-full border border-black/12 bg-white/70 backdrop-blur-sm text-brand-dark font-semibold text-sm tracking-wide hover:border-brand-yellow/60 hover:bg-brand-yellow/5 transition-all duration-300"
            >
              See Our Work
              <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-300" />
            </Link>
          </motion.div>


        </motion.div>
      </motion.div>

      {/* ─── Marquee banner strip ─── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="w-full border-t border-b border-black/6 py-4 bg-white/50 backdrop-blur-sm overflow-hidden mt-24"
      >
        <MarqueeTrack />
      </motion.div>

    </section>
  )
}
