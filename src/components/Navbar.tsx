"use client"

import React, { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface DropdownItem {
  name: string
  url: string
}

interface NavItem {
  name: string
  url?: string
  dropdown?: DropdownItem[]
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const items = [
    { name: "Home",         anchor: null },
    { name: "Our Projects", anchor: "animated-websites" },
    { name: "About Us",     anchor: "our-story" },
    { name: "Services",     anchor: "services" },
    { name: "Contact Us",   anchor: "contact" },
    { name: "Our Founders", anchor: "founders" },
  ];

  const handleNav = useCallback((anchor: string | null) => {
    setIsMobileMenuOpen(false)
    if (!anchor) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none",
          isScrolled ? "py-4" : "py-6"
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pointer-events-none">
            
            {/* Left: Logo */}
            <div className="flex-1 flex items-center justify-start pointer-events-auto">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault()
                  window.location.reload()
                }}
                className="flex items-center gap-2 group"
              >
                <Image 
                  src="/newlogo.png" 
                  alt="HiveLabs Logo" 
                  width={200} 
                  height={60} 
                  className="h-10 md:h-12 w-auto object-contain transform transition-transform group-hover:scale-105 drop-shadow-sm origin-left" 
                  priority
                />
              </a>
            </div>

            {/* Center: Floating Navbar (Links + CTA) */}
            <div 
              className={cn(
                "hidden md:flex items-center justify-center gap-2 rounded-full p-1.5 transition-all duration-300 pointer-events-auto shrink-0",
                "bg-white/60 border border-black/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]",
                isScrolled && "bg-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
              )}
              style={{
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
              }}
            >
              {/* Nav Links */}
              <div className="flex items-center gap-0.5 px-2">
                {items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNav(item.anchor)}
                    className="px-4 py-2 rounded-full text-sm font-medium text-brand-dark hover:bg-black/5 transition-all duration-200"
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* CTA inside the pill */}
              <Link
                href="/#contact"
                className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-brand-dark text-white font-semibold text-sm shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-[1.02] overflow-hidden group ml-1"
              >
                <span className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300 rounded-full" />
                <span className="relative z-10 group-hover:text-brand-dark transition-colors duration-300">Start Your Project</span>
              </Link>
            </div>

            {/* Right: Spacer on Desktop, Hamburger on Mobile */}
            <div className="flex-1 flex justify-end md:block md:pointer-events-none pointer-events-auto">
              <button
                className="md:hidden p-2.5 rounded-full bg-white/70 backdrop-blur-xl border border-black/10 text-brand-dark shadow-sm active:scale-95 transition-transform"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-xl flex flex-col pt-6 px-6 pb-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-12">
              <Image src="/newlogo.png" alt="HiveLabs" width={150} height={45} className="h-10 w-auto object-contain" />
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 rounded-full bg-black/5 text-brand-dark active:scale-95 transition-transform"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNav(item.anchor)}
                  className="text-left text-2xl font-semibold text-brand-dark hover:text-brand-yellow transition-colors py-2"
                >
                  {item.name}
                </button>
              ))}
              
              <hr className="border-black/5 my-4" />
              
              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded-full bg-brand-dark text-white font-bold text-lg hover:bg-brand-yellow hover:text-brand-dark transition-colors"
              >
                Start Your Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
