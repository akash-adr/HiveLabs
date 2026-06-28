"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // We can use the scroll progress to fill a line
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const steps = [
    { title: "Discovery", desc: "Gathering requirements, understanding goals, and scope-based pricing." },
    { title: "Design Concepts", desc: "Crafting initial visual directions and structural layouts." },
    { title: "Feedback & Refinement", desc: "Iterating based on your feedback until it's perfect." },
    { title: "Development", desc: "Building the solution with modern, scalable technology." },
    { title: "Final Delivery", desc: "Launching your new digital experience to the world." }
  ]

  return (
    <section className="py-24 md:py-32 bg-white" id="how-it-works" ref={containerRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-xs uppercase tracking-[0.2em] text-brand-yellow font-bold mb-4 block">Our Process</span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark">How We Work</h2>
        </div>

        <div className="relative pl-8 md:pl-0">
          {/* Vertical line for mobile / desktop */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-brand-gray md:-translate-x-1/2">
            <motion.div 
              className="absolute top-0 left-0 w-full bg-brand-yellow"
              style={{ height: lineHeight }}
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => {
              const isEven = index % 2 === 0
              return (
                <div key={index} className="relative flex flex-col md:flex-row items-center md:justify-between w-full">
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-[-37px] md:left-1/2 w-4 h-4 rounded-full bg-white border-2 border-brand-yellow md:-translate-x-1/2 z-10 shadow-[0_0_0_4px_rgba(255,255,255,1)]" />

                  {/* Content Left (Even) / Spacer Right */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'hidden md:block'}`}>
                    {isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-brand-gray-light p-6 rounded-2xl border border-black/5 relative z-20"
                      >
                        <span className="text-brand-yellow font-bold text-sm uppercase tracking-wider mb-2 block">Step 0{index + 1}</span>
                        <h4 className="text-xl font-heading font-bold text-brand-dark mb-2">{step.title}</h4>
                        <p className="text-sm text-brand-gray-muted">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Content Right (Odd) / Spacer Left */}
                  <div className={`w-full md:w-5/12 ${!isEven ? 'mt-6 md:mt-0 md:pl-12' : 'hidden md:block'}`}>
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="bg-brand-gray-light p-6 rounded-2xl border border-black/5 relative z-20"
                      >
                        <span className="text-brand-yellow font-bold text-sm uppercase tracking-wider mb-2 block">Step 0{index + 1}</span>
                        <h4 className="text-xl font-heading font-bold text-brand-dark mb-2">{step.title}</h4>
                        <p className="text-sm text-brand-gray-muted">{step.desc}</p>
                      </motion.div>
                    )}
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
