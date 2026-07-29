"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

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
  const [activeImage, setActiveImage] = useState<string | null>(null)

  // Close modal on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveImage(null) }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [])

  return (
    <>
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
                onClick={() => setActiveImage(src)}
                className="relative w-[498px] md:w-[604px] aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 shrink-0 border border-gray-100 cursor-pointer"
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
                onClick={() => setActiveImage(src)}
                className="relative w-[498px] md:w-[604px] aspect-video rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-2 shrink-0 border border-gray-100 cursor-pointer"
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

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 md:p-12 bg-black/80 backdrop-blur-xl"
            onClick={() => setActiveImage(null)}
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-6 right-6 md:top-8 md:right-8 z-50 p-3 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white transition-all duration-300 hover:scale-110"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Expanded Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, rotate: -4 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.95, rotate: 4 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative w-full h-full max-w-6xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
            >
              <Image
                src={activeImage}
                alt="Expanded Design"
                fill
                unoptimized
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
