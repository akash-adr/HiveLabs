"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const items: NavItem[] = [
    { name: "Home", url: "/" },
    { name: "Our Projects", url: "/#our-work" },
    { name: "About Us", url: "/#our-story" },
    { name: "Services", url: "/#services" },
    { name: "Testimonial", url: "/#testimonials" },
    { name: "Contact Us", url: "/#contact" },
  ];

  return (
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
            <Link
              href="/"
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
            </Link>
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
                <Link
                  key={item.name}
                  href={item.url!}
                  className="px-4 py-2 rounded-full text-sm font-medium text-brand-dark hover:bg-black/5 transition-all duration-200"
                >
                  {item.name}
                </Link>
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

          {/* Right: Empty spacer to perfectly center the pill */}
          <div className="flex-1 hidden md:block pointer-events-none"></div>

        </div>
      </div>
    </nav>
  )
}
