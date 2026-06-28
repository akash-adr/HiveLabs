"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { MonitorSmartphone, Palette, TrendingUp, Sparkles } from "lucide-react"

export default function ServicesOverview() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  }

  const services = [
    {
      number: "01",
      title: "Web Design & Development",
      description: "Build a website that works as hard as your business. From modern business websites to immersive digital experiences, we design and develop websites that are fast, responsive, and built to convert visitors into customers.",
      points: [
        "Custom Web Design & Development",
        "Interactive & Animated Websites",
        "Mobile-Responsive Design",
        "Contact Forms & Third-Party Integrations",
        "Domain Registration & Setup",
        "Secure Hosting & Deployment",
        "Post-Launch Support & Maintenance",
      ],
      buttonText: "Explore Website Services",
      icon: <MonitorSmartphone className="w-8 h-8" />,
      link: "/services/web-design",
      highlight: false
    },
    {
      number: "02",
      title: "Branding & Identity",
      description: "Create a brand that people remember. A strong brand goes beyond a great logo. We craft cohesive visual identities that communicate your values, build trust, and leave a lasting impression across every customer touchpoint.",
      points: [
        "Logo Design",
        "Brand Strategy",
        "Color Palette Development",
        "Typography System",
        "Brand Guidelines",
        "Business Card Design",
        "Social Media Profile Assets",
        "Brand Patterns & Iconography",
        "Brand Mockups",
        "Source Files & Brand Kit",
      ],
      buttonText: "Explore Branding Services",
      icon: <Palette className="w-8 h-8" />,
      link: "/services/branding",
      highlight: false
    },
    {
      number: "03",
      title: "Social Growth",
      description: "Turn your social media into a powerful growth engine. We create strategic, engaging, and consistent content that strengthens your brand, connects with your audience, and helps your business grow across digital platforms.",
      points: [
        "Content Strategy",
        "Monthly Content Calendar",
        "Feed Post Designs",
        "Reels Editing",
        "Motion Graphics",
        "Story Designs",
        "Caption Writing",
        "Hashtag Research",
        "Community Management",
        "Monthly Performance Reports",
      ],
      buttonText: "Explore Social Growth",
      icon: <TrendingUp className="w-8 h-8" />,
      link: "/services/social-growth",
      highlight: false
    },
    {
      number: "ALL",
      title: "Hive Complete",
      description: "Everything your business needs to launch, grow, and thrive—all in one complete package. From building your brand identity to creating your website and growing your online presence, Hive Complete brings every essential digital service together under one streamlined solution.",
      points: [
        "Complete Brand Identity",
        "Website Design & Development",
        "Domain & Hosting Setup",
        "Social Media Profile Setup",
        "Content Creation",
        "Reels & Video Editing",
        "Marketing Creatives",
        "SEO Foundation",
        "Business Email Setup",
        "Analytics & Performance Tracking",
        "Ongoing Technical Support",
        "Growth Consultation",
      ],
      buttonText: "Explore Hive Complete",
      icon: <Sparkles className="w-8 h-8 text-brand-yellow" />,
      link: "/services/hive-complete",
      highlight: true
    }
  ]

  return (
    <section className="py-24 md:py-32 bg-brand-gray-light relative overflow-hidden" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.2em] text-brand-yellow font-bold mb-4 block"
          >
            Our Services
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-brand-dark"
          >
            Everything Your Brand Needs to Grow
          </motion.h2>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`group relative p-8 md:p-10 rounded-3xl backdrop-blur-xl border transition-all duration-300 flex flex-col h-full overflow-hidden z-10 ${
                service.highlight 
                  ? "bg-brand-dark text-white border-brand-yellow/30 shadow-[0_8px_30px_rgba(253,185,6,0.15)]" 
                  : "bg-white/80 border-black/5 shadow-sm hover:shadow-xl hover:border-brand-yellow/30"
              }`}
            >
              {/* Crazy Big Number Background */}
              <div 
                className={`absolute -right-4 -bottom-10 md:-bottom-20 md:-right-8 text-[150px] md:text-[220px] font-black italic tracking-tighter leading-none pointer-events-none select-none transition-transform duration-500 group-hover:scale-110 z-0 ${
                  service.highlight ? 'text-white/[0.04]' : 'text-brand-dark/[0.03]'
                }`}
              >
                {service.number}
              </div>

              {service.highlight && (
                <div className="absolute top-0 right-8 -translate-y-1/2 z-20">
                  <span className="bg-brand-yellow text-brand-dark text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider shadow-lg">
                    Recommended
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className={`p-4 rounded-2xl inline-flex items-center justify-center ${service.highlight ? 'bg-white/10' : 'bg-brand-gray'}`}>
                  {service.icon}
                </div>
                <h3 className={`text-2xl md:text-3xl font-heading font-bold ${service.highlight ? 'text-white' : 'text-brand-dark'}`}>
                  {service.title}
                </h3>
              </div>
              
              <div className="relative z-10 flex-grow flex flex-col">
                <p className={`text-base mb-8 leading-relaxed ${service.highlight ? 'text-white/80' : 'text-brand-gray-muted'}`}>
                  {service.description}
                </p>

                <div className="mb-10 flex-grow">
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-4 ${service.highlight ? 'text-brand-yellow' : 'text-brand-dark'}`}>
                    Services Included
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                    {service.points.map((point, i) => (
                      <li key={i} className={`text-sm flex items-start ${service.highlight ? 'text-white/70' : 'text-brand-gray-muted'}`}>
                        <span className={`mr-2 flex-shrink-0 font-bold ${service.highlight ? 'text-brand-yellow' : 'text-brand-yellow'}`}>•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto">
                  <Link 
                    href={service.link}
                    className={`inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold transition-all group/btn ${
                      service.highlight 
                        ? 'bg-brand-yellow text-brand-dark hover:bg-white' 
                        : 'bg-brand-dark text-white hover:bg-brand-yellow hover:text-brand-dark'
                    }`}
                  >
                    {service.buttonText} 
                    <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>

              {/* Hover glow effect for non-highlighted cards */}
              {!service.highlight && (
                <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/0 to-brand-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none z-0" />
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
