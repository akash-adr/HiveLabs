"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export default function OurWorkPreview() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  const projects = [
    {
      title: "Lumina Fintech",
      industry: "Finance",
      services: "Web Design, Branding",
      // Placeholder image color block
      color: "bg-slate-200"
    },
    {
      title: "Aura Skincare",
      industry: "E-Commerce",
      services: "Hive Complete",
      color: "bg-rose-100"
    },
    {
      title: "Nexus Tech",
      industry: "SaaS",
      services: "Web Development",
      color: "bg-indigo-100"
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-white" id="our-work">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs uppercase tracking-[0.2em] text-brand-yellow font-bold mb-4 block"
            >
              Featured Projects
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-heading font-bold text-brand-dark"
            >
              Our Work Speaks for Itself
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              href="/work"
              className="px-6 py-3 rounded-full border border-black/10 text-brand-dark font-medium hover:bg-black/5 transition-colors inline-flex items-center"
            >
              View All Work <span className="ml-2">→</span>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={item} className="group cursor-pointer">
              {/* Project Image Placeholder */}
              <div className={`relative w-full aspect-[4/3] ${project.color} rounded-2xl overflow-hidden mb-6`}>
                {/* PLACEHOLDER: Image goes here */}
                <div className="absolute inset-0 flex items-center justify-center text-black/20 font-heading font-bold text-xl uppercase tracking-widest">
                  Placeholder
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="bg-white text-brand-dark px-6 py-3 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    View Project
                  </span>
                </div>
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-brand-dark mb-2">{project.title}</h3>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-brand-dark font-medium">{project.industry}</span>
                <span className="w-1 h-1 rounded-full bg-brand-yellow" />
                <span className="text-brand-gray-muted">{project.services}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
