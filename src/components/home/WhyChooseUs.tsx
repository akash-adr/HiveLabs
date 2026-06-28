"use client"

import { motion } from "framer-motion"
import { MessageSquare, Settings, Users, Focus } from "lucide-react"

export default function WhyChooseUs() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  const reasons = [
    {
      title: "Clear Communication",
      desc: "No jargon, no ghosting. We keep you in the loop at every step.",
      icon: <MessageSquare className="w-6 h-6 text-brand-yellow" />
    },
    {
      title: "Tailored Solutions",
      desc: "We don't do cookie-cutter. Everything is built for your specific goals.",
      icon: <Settings className="w-6 h-6 text-brand-yellow" />
    },
    {
      title: "Long-Term Partnership",
      desc: "We're here to help you grow, even after the project is launched.",
      icon: <Users className="w-6 h-6 text-brand-yellow" />
    },
    {
      title: "Attention to Detail",
      desc: "From pixel-perfect designs to clean code, quality is in the details.",
      icon: <Focus className="w-6 h-6 text-brand-yellow" />
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-brand-dark relative overflow-hidden text-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-yellow/10 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-brand-yellow font-bold mb-4 block"
          >
            Why Choose HiveLabs
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold"
          >
            Built on Relationships. <br className="hidden md:block"/> Driven by Results.
          </motion.h2>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {reasons.map((reason, index) => (
            <motion.div key={index} variants={item} className="text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-yellow/10 mb-6">
                {reason.icon}
              </div>
              <h3 className="text-xl font-heading font-bold mb-3">{reason.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{reason.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
