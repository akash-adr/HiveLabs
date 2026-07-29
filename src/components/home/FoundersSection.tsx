"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const FOUNDERS = [
  {
    name: "Akash Rajarathinam",
    role: "Software Developer",
    company: "HiveLabs",
    image: "/akash.png",
    linkedin: "https://www.linkedin.com/in/akash-rajarathinam-8097223a7?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    accent: "#38bdf8",         // sky blue
    accentDim: "rgba(56,189,248,0.12)",
    accentBorder: "rgba(56,189,248,0.25)",
    glow: "rgba(56,189,248,0.08)",
  },
  {
    name: "Sharan A",
    role: "Creative Designer",
    company: "HiveLabs",
    image: "/sharan.png",
    linkedin: "https://www.linkedin.com/in/sharan212007?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    accent: "#ef4444",         // red
    accentDim: "rgba(239,68,68,0.12)",
    accentBorder: "rgba(239,68,68,0.25)",
    glow: "rgba(239,68,68,0.08)",
  },
]

export default function FoundersSection() {
  return (
    <section id="founders" className="relative bg-white py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: 900,
          height: 450,
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(56,189,248,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[11px] font-bold uppercase tracking-[0.28em] mb-4"
            style={{ color: "#fdb906" }}
          >
            The Team Behind the Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-brand-dark leading-tight"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.4rem)", letterSpacing: "-0.03em" }}
          >
            Meet the Founders
          </motion.h2>
        </div>

        {/* Cards — equal height via items-stretch */}
        <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 max-w-3xl mx-auto">
          {FOUNDERS.map((founder, idx) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group flex-1 max-w-sm mx-auto w-full"
            >
              {/* Card — flex-col so it stretches to same height */}
              <div
                className="relative h-full flex flex-col overflow-hidden rounded-3xl border transition-all duration-500"
                style={{
                  background: "#ffffff",
                  borderColor: "rgba(0,0,0,0.08)",
                  boxShadow: "0 4px 40px rgba(0,0,0,0.07)",
                }}
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                  style={{ background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${founder.glow} 0%, transparent 70%)` }}
                />

                {/* Coloured top edge bar */}
                <div
                  className="w-full h-[3px] flex-shrink-0"
                  style={{ background: `linear-gradient(90deg, ${founder.accent}, transparent)` }}
                />

                {/* Image — fixed aspect so both cards are the same */}
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4/4.2" }}>
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 380px"
                  />
                </div>

                {/* Info — flex-1 so it pushes LinkedIn button to bottom */}
                <div className="flex flex-col flex-1 px-7 pt-4 pb-7 relative z-10">
                  {/* Accent line */}
                  <div
                    className="w-10 h-[3px] rounded-full mb-4"
                    style={{ background: founder.accent }}
                  />

                  {/* Name */}
                  <h3
                    className="font-heading font-black text-brand-dark leading-[1.05] mb-2"
                    style={{ fontSize: "clamp(1.7rem, 3vw, 2.2rem)", letterSpacing: "-0.02em" }}
                  >
                    {founder.name}
                  </h3>

                  {/* Role */}
                  <p className="text-brand-dark/50 text-sm font-medium tracking-wide mb-6">
                    {founder.role}{" "}
                    <span style={{ color: founder.accent }}>@ {founder.company}</span>
                  </p>

                  {/* Spacer pushes button to bottom */}
                  <div className="flex-1" />

                  {/* LinkedIn button */}
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 self-start"
                    style={{
                      background: founder.accentDim,
                      color: founder.accent,
                      border: `1px solid ${founder.accentBorder}`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = founder.accent
                      el.style.color = "#0a0a0a"
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLAnchorElement
                      el.style.background = founder.accentDim
                      el.style.color = founder.accent
                    }}
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
