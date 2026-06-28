"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function OurStory() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  }

  return (
    <section className="py-24 md:py-32 bg-white relative" id="our-story">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column - Copy */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <span className="text-xs uppercase tracking-[0.2em] text-brand-yellow font-bold">Our Story</span>
            </motion.div>
            
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-heading font-bold text-brand-dark leading-tight">
              A shared vision for <br />better digital experiences.
            </motion.h2>
            
            <motion.p variants={fadeUp} className="text-lg text-brand-gray-muted leading-relaxed">
              Every great journey starts with a simple conversation. Ours began with two friends—one passionate about building websites, the other about graphic design. As we worked on our individual crafts, we realized we shared the same vision: helping businesses grow through impactful digital experiences.
            </motion.p>

            <motion.p variants={fadeUp} className="text-lg text-brand-gray-muted leading-relaxed">
              So, we combined our strengths and created HiveLabs—a place where creativity and technology come together to build brands that stand out.
            </motion.p>
          </motion.div>

          {/* Right Column - Visual/Stats */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="relative h-full min-h-[400px] w-full"
          >
            {/* Abstract Background Blurs for depth */}
            <div className="absolute inset-0 bg-transparent rounded-3xl overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/20 rounded-full blur-[60px] -translate-y-1/4 translate-x-1/4" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-yellow/10 rounded-full blur-[80px] translate-y-1/4 -translate-x-1/4" />
            </div>

            {/* Aesthetic Image Wrapper */}
            <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-black/5 group">
              <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image 
                src="/about.jpeg"
                alt="HiveLabs Story"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
