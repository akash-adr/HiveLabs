import ServiceTemplate from "@/components/services/ServiceTemplate"

export default function BrandingPage() {
  return (
    <ServiceTemplate 
      eyebrow="BRANDING & IDENTITY"
      title="Build a Brand That Leaves a Lasting Impression."
      subtitle="Your brand is more than a logo — it's the way people recognize, remember, and trust you. We create cohesive visual identities that help your business stand out and build credibility from the very first impression."
      heroCta="Start Your Branding Journey"
      heroImage="/Branding.1.jpeg"
      
      introStatement="People don't remember businesses — they remember brands. A strong identity is what separates a company that's instantly recognizable from one that gets lost in the noise. At HiveLabs, we build complete, cohesive brand identities designed not just to look good, but to communicate exactly who you are, build immediate trust, and stay consistent everywhere your business shows up."
      
      features={[
        { 
          title: "Logo Design", 
          desc: "A logo that's distinctive, versatile, and built to represent your business across every size and surface — from a website favicon to a storefront sign." 
        },
        { 
          title: "Brand Strategy", 
          desc: "Before any design work begins, we define what your brand stands for, who it speaks to, and how it should feel — so every visual decision afterward has clear purpose behind it." 
        },
        { 
          title: "Color Palette", 
          desc: "A carefully chosen palette that reflects your brand's personality and stays consistent across every touchpoint, building visual recognition over time." 
        },
        { 
          title: "Typography System", 
          desc: "Font pairings selected for both personality and readability, applied consistently across your website, marketing, and printed materials." 
        },
        { 
          title: "Brand Guidelines", 
          desc: "A clear, comprehensive reference document outlining how your brand should be used — colors, fonts, logo spacing, tone — so your identity stays consistent no matter who's using it." 
        },
        { 
          title: "Business Card Design", 
          desc: "A professional, on-brand business card design that makes a strong first impression in person, not just online." 
        },
        { 
          title: "Social Media Assets", 
          desc: "Profile graphics, templates, and visual elements designed to keep your social presence consistent with your broader brand identity." 
        },
        { 
          title: "Brand Patterns & Icons", 
          desc: "Custom supporting visual elements — icons, patterns, and graphic accents — that add depth and recognizability to your brand beyond just the logo." 
        },
        { 
          title: "Brand Mockups", 
          desc: "Realistic mockups showing your brand in action — on packaging, devices, signage, and more — so you can see how your identity translates into the real world." 
        },
        { 
          title: "Source Files", 
          desc: "Full ownership of your brand. We deliver all source files in industry-standard formats, so you always have complete access and control." 
        }
      ]}
      featuresImage="/Branding.2.jpeg"
      
      process={[
        { 
          title: "Discovery", 
          desc: "We start with conversations, not assumptions — learning about your business, your audience, your competitors, and what you want your brand to communicate." 
        },
        { 
          title: "Design Concepts", 
          desc: "We translate that strategy into initial visual concepts, exploring direction and personality before locking in specifics." 
        },
        { 
          title: "Feedback & Refinement", 
          desc: "We refine the chosen direction together, adjusting details until the identity feels like a true representation of your business." 
        },
        { 
          title: "Development", 
          desc: "We build out the complete brand system — logo variations, color palette, typography, supporting assets — into a cohesive, ready-to-use identity." 
        },
        { 
          title: "Final Delivery", 
          desc: "You receive your complete brand package, including guidelines and source files, ready to apply across every part of your business." 
        }
      ]}
      
      whyChooseUs="A brand identity isn't just about aesthetics — it's about consistency, clarity, and trust. We pay close attention to the details that most people overlook, because those details are exactly what separate a brand that feels professional from one that doesn't. We treat every branding project as the foundation of a long-term relationship, ensuring your identity is built to grow with your business, not just look good on day one."
      
      ctaHeadline="Let's Build a Brand People Remember."
      ctaSubtext="Tell us about your business, and let's create an identity that truly represents it."
      ctaButton="Let's Create Your Brand"
    />
  )
}
