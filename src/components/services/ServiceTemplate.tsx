"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { CheckCircle2, ArrowRight } from "lucide-react"

interface Feature {
  title: string
  desc: string
}

interface ProcessStep {
  title: string
  desc: string
}

interface ServiceTemplateProps {
  eyebrow: string
  title: string
  subtitle: string
  heroCta: string
  heroImage: string

  introStatement: string
  
  features: Feature[]
  featuresImage: string

  process: ProcessStep[]

  whyChooseUs: string

  ctaHeadline: string
  ctaSubtext: string
  ctaButton: string
}

export default function ServiceTemplate(props: ServiceTemplateProps) {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
  }

  const stagger = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-brand-gray-light">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/3 translate-x-1/3" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-5xl">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <span className="px-4 py-1.5 rounded-full bg-brand-yellow/20 text-brand-dark font-bold text-xs uppercase tracking-[0.2em]">
                {props.eyebrow}
              </span>
            </motion.div>
            <motion.h1 
              variants={fadeUp}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-8 text-brand-dark leading-[1.1] tracking-tight"
            >
              {props.title}
            </motion.h1>
            <motion.p 
              variants={fadeUp} 
              className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-brand-gray-muted leading-relaxed"
            >
              {props.subtitle}
            </motion.p>
            <motion.div variants={fadeUp}>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-brand-dark text-white font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group overflow-hidden relative"
              >
                <span className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                <span className="relative z-10 group-hover:text-brand-dark transition-colors duration-300">{props.heroCta}</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:text-brand-dark transition-colors duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Intro & Image 1 Section */}
      <section className="py-24 md:py-32 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-brand-dark leading-tight">
                More Than Just A Service.
              </h2>
              <p className="text-lg md:text-xl text-brand-gray-muted leading-relaxed">
                {props.introStatement}
              </p>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="relative w-full aspect-[4/3] md:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-black/5 group"
            >
              <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image 
                src={props.heroImage}
                alt={props.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What's Included / Features */}
      <section className="py-24 md:py-32 bg-brand-gray-light">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-yellow font-bold mb-4 block">What's Included</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark">Everything you need, nothing you don't.</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {props.features.map((feature, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-black/5 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-brand-yellow/20 flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6 text-brand-yellow" />
                </div>
                <h3 className="font-heading font-bold text-brand-dark text-xl mb-4">{feature.title}</h3>
                <p className="text-brand-gray-muted leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.2em] text-brand-yellow font-bold mb-4 block">How We Work</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-dark">Our Process</h2>
          </div>
          <div className="space-y-8">
            {props.process.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                className="flex flex-col md:flex-row gap-8 p-10 rounded-3xl bg-brand-gray-light border border-black/5 group hover:bg-white hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl font-heading font-black text-brand-yellow/30 group-hover:text-brand-yellow transition-colors duration-300 shrink-0">
                  {(i + 1).toString().padStart(2, '0')}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-dark mb-4">{step.title}</h3>
                  <p className="text-lg text-brand-gray-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us & Image 2 Section */}
      <section className="py-24 md:py-32 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group"
            >
              <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
              <Image 
                src={props.featuresImage}
                alt="Why Choose HiveLabs"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="space-y-6"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-brand-yellow font-bold">The HiveLabs Difference</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
                Why Choose Us
              </h2>
              <div className="text-lg text-white/80 leading-relaxed space-y-6">
                {props.whyChooseUs.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative py-32 overflow-hidden bg-brand-yellow">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow via-brand-yellow to-amber-400" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/30 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />

        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-heading font-bold text-brand-dark mb-8 leading-[1.1]">
              {props.ctaHeadline}
            </h2>
            <p className="text-xl md:text-2xl text-brand-dark/80 mb-12 max-w-2xl mx-auto">
              {props.ctaSubtext}
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-10 py-5 rounded-full bg-brand-dark text-brand-yellow font-bold text-xl shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105"
            >
              {props.ctaButton}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
