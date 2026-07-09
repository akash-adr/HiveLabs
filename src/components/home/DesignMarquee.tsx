"use client"

import Image from "next/image"
import { motion } from "framer-motion"

const DESIGN_IMAGES = [
  "/design/file_00000000030c7208abfece96b1e5a325.png",
  "/design/file_000000001fc472079a33371ff5f8a5f4.png",
  "/design/file_000000004d3872079e6d7f7d4ff3458f.png",
  "/design/file_000000006a8c720886b753f43f0e893b.png",
  "/design/file_0000000094ec72089665b52994c79537.png",
  "/design/file_00000000a7907208bcaea138350257b0.png",
  "/design/file_00000000b72c72088e0a77d7e1a465b1.png",
  "/design/file_00000000d1987208a05c73aa9dad9104.png",
  "/design/file_00000000d7b47208b75b3958514366b8.png",
]

// Split images into two rows for the marquee
const ROW_1 = DESIGN_IMAGES.slice(0, 5)
const ROW_2 = DESIGN_IMAGES.slice(4, 9) // overlap one to balance

export default function DesignMarquee() {
  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Title Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="block text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
            style={{ color: "#fdb906" }}
          >
            Brand & Design
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-heading font-black text-brand-dark leading-tight"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
          >
            Visual Identities That{" "}
            <span
              style={{
                background: "linear-gradient(90deg, #fdb906 0%, #f59e0b 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Stand Out.
            </span>
          </motion.h2>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full flex flex-col gap-6">
        {/* Row 1 - Moving Left */}
        <div className="group flex overflow-hidden w-full">
          <div className="flex gap-6 animate-marquee-left marquee-track w-max shrink-0 px-3">
            {[...ROW_1, ...ROW_1, ...ROW_1].map((src, idx) => (
              <div
                key={idx}
                className="relative w-[498px] md:w-[604px] aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 shrink-0 border border-gray-100"
              >
                <Image
                  src={src}
                  alt={`Design portfolio piece ${idx}`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 500px, 600px"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 - Moving Right */}
        <div className="group flex overflow-hidden w-full">
          <div className="flex gap-6 animate-marquee-right marquee-track w-max shrink-0 px-3">
            {[...ROW_2, ...ROW_2, ...ROW_2].map((src, idx) => (
              <div
                key={idx}
                className="relative w-[498px] md:w-[604px] aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 shrink-0 border border-gray-100"
              >
                <Image
                  src={src}
                  alt={`Design portfolio piece ${idx}`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 500px, 600px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.33% - 1rem)); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(calc(-33.33% - 1rem)); }
          100% { transform: translateX(0); }
        }
        .animate-marquee-left {
          animation: marqueeLeft 45s linear infinite;
        }
        .animate-marquee-right {
          animation: marqueeRight 45s linear infinite;
        }
        .group:hover .marquee-track {
          animation-play-state: paused !important;
        }
      `}} />
    </section>
  )
}
