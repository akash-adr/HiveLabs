"use client"

import { motion } from "framer-motion"

export default function Testimonials() {
  // PLACEHOLDER CONTENT: Replace with real client quotes
  const testimonials = [
    {
      quote: "HiveLabs completely transformed our online presence. The new website is not only beautiful but it actually converts visitors into leads.",
      name: "Mr. A",
      role: "CEO, Tech Startup",
    },
    {
      quote: "The attention to detail and level of communication was outstanding. They really understood our brand and delivered beyond our expectations.",
      name: "Mr. B",
      role: "Founder, Creative Studio",
    },
    {
      quote: "Our social media engagement has doubled since we started working with HiveLabs. They know exactly how to capture an audience.",
      name: "Mrs. C",
      role: "Marketing Director",
    },
    {
      quote: "The Hive Complete package was exactly what we needed to launch our startup. Branding, web, social—all handled perfectly.",
      name: "Mr. D",
      role: "Co-founder, E-commerce Brand",
    },
    // Duplicate for seamless loop
    {
      quote: "HiveLabs completely transformed our online presence. The new website is not only beautiful but it actually converts visitors into leads.",
      name: "Mr. A",
      role: "CEO, Tech Startup",
    },
    {
      quote: "The attention to detail and level of communication was outstanding. They really understood our brand and delivered beyond our expectations.",
      name: "Mr. B",
      role: "Founder, Creative Studio",
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-brand-gray-light overflow-hidden" id="testimonials">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark mb-4">
            Trusted by Businesses.<br /> Built on Relationships.
          </h2>
          <p className="text-brand-gray-muted text-lg">Don't just take our word for it.</p>
        </div>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
          className="flex gap-6 px-3 w-max group-hover:[animation-play-state:paused]"
        >
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="w-[350px] md:w-[450px] p-8 rounded-3xl bg-white/70 backdrop-blur-xl border border-black/5 shadow-sm flex-shrink-0"
            >
              <p className="text-brand-dark text-lg mb-8 italic">"{testimonial.quote}"</p>
              <div>
                <h4 className="font-bold text-brand-dark">{testimonial.name}</h4>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
