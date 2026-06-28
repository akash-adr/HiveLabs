"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function FinalCta() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-brand-yellow" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow via-brand-yellow to-amber-400" />
      
      {/* Abstract Shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/30 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl md:text-7xl font-heading font-bold text-brand-dark leading-[1.1] mb-8">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl md:text-2xl text-brand-dark/80 mb-12 max-w-2xl mx-auto">
            Ready to take your brand to the next level? Get in touch with our team today and let's start the conversation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-brand-dark text-brand-yellow font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105"
          >
            Start Your Project
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
