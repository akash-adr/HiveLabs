import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-brand-yellow/30 mt-auto relative">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-50"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <Image 
                src="/logo.png" 
                alt="HiveLabs Logo" 
                width={300} 
                height={100} 
                className="h-14 w-auto object-contain transform transition-transform group-hover:scale-105" 
              />
            </Link>
            <p className="text-brand-gray-muted text-sm leading-relaxed max-w-xs">
              Building brands through thoughtful design, modern websites, and strategic digital growth.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="font-heading font-semibold text-brand-dark mb-4 text-sm tracking-wider uppercase">Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/web-design" className="text-brand-gray-muted hover:text-brand-yellow transition-colors text-sm">
                  Web Design & Development
                </Link>
              </li>
              <li>
                <Link href="/services/branding" className="text-brand-gray-muted hover:text-brand-yellow transition-colors text-sm">
                  Branding & Identity
                </Link>
              </li>
              <li>
                <Link href="/services/social-growth" className="text-brand-gray-muted hover:text-brand-yellow transition-colors text-sm">
                  Social Growth
                </Link>
              </li>
              <li>
                <Link href="/services/hive-complete" className="text-brand-gray-muted hover:text-brand-yellow transition-colors text-sm font-medium">
                  Hive Complete
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div>
            <h4 className="font-heading font-semibold text-brand-dark mb-4 text-sm tracking-wider uppercase">Company</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-brand-gray-muted hover:text-brand-yellow transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-brand-gray-muted hover:text-brand-yellow transition-colors text-sm">
                  Our Work
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-brand-gray-muted hover:text-brand-yellow transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="font-heading font-semibold text-brand-dark mb-4 text-sm tracking-wider uppercase">Connect</h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-brand-gray-muted hover:text-brand-yellow transition-colors text-sm">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="text-brand-gray-muted hover:text-brand-yellow transition-colors text-sm">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:hivelabs.official@gmail.com" className="text-brand-gray-muted hover:text-brand-yellow transition-colors text-sm">
                  hivelabs.official@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-black/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-brand-gray-muted text-sm">
            &copy; 2026 HiveLabs. All rights reserved.
          </p>
          <p className="text-brand-gray-muted text-sm flex items-center gap-1">
            Designed and developed with passion by <span className="font-semibold text-brand-dark">HiveLabs.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
