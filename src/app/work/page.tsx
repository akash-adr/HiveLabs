"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import FinalCta from "@/components/home/FinalCta"

export default function WorkPage() {
  const [filter, setFilter] = useState("All")

  const filters = ["All", "Web", "Branding", "Social"]

  const projects = [
    { id: 1, title: "Lumina Fintech", industry: "Finance", category: "Web", color: "bg-slate-200" },
    { id: 2, title: "Aura Skincare", industry: "E-Commerce", category: "Branding", color: "bg-rose-100" },
    { id: 3, title: "Nexus Tech", industry: "SaaS", category: "Web", color: "bg-indigo-100" },
    { id: 4, title: "Vibe Energy", industry: "FMCG", category: "Social", color: "bg-amber-100" },
    { id: 5, title: "Studio Nine", industry: "Architecture", category: "Branding", color: "bg-stone-200" },
    { id: 6, title: "Flow Yoga", industry: "Wellness", category: "Web", color: "bg-teal-100" },
  ]

  const filteredProjects = filter === "All" ? projects : projects.filter(p => p.category === filter)

  const deliverables = [
    "High-converting landing pages",
    "Comprehensive brand guidelines",
    "Custom iconography & patterns",
    "Scalable design systems",
    "Social media templates",
    "Full-stack web applications"
  ]

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="pt-40 pb-20 bg-brand-gray-light">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-heading font-bold text-brand-dark mb-6"
          >
            Crafted with Purpose.<br/>Built for Results.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-brand-gray-muted"
          >
            Explore a selection of our favorite projects across web design, branding, and social growth.
          </motion.p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                  filter === f 
                    ? "bg-brand-dark text-brand-yellow" 
                    : "bg-brand-gray-light text-brand-dark hover:bg-black/5"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={project.id} 
                  className="group cursor-pointer"
                >
                  <div className={`relative w-full aspect-[4/3] ${project.color} rounded-2xl overflow-hidden mb-6`}>
                    <div className="absolute inset-0 flex items-center justify-center text-black/20 font-heading font-bold text-xl uppercase tracking-widest">
                      Placeholder
                    </div>
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
                    <span className="text-brand-gray-muted">{project.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20 text-brand-gray-muted">
              No projects found for this category.
            </div>
          )}

        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-24 bg-brand-gray-light border-y border-black/5">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-4xl font-heading font-bold text-brand-dark mb-12">What We Deliver</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {deliverables.map((item, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                key={i} 
                className="flex items-center gap-4 bg-white p-6 rounded-2xl border border-black/5 shadow-sm"
              >
                <CheckCircle2 className="w-6 h-6 text-brand-yellow flex-shrink-0" />
                <span className="font-medium text-brand-dark">{item}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </div>
  )
}
