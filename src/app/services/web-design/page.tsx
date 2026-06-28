import ServiceTemplate from "@/components/services/ServiceTemplate"

export default function WebDesignPage() {
  return (
    <ServiceTemplate 
      eyebrow="WEB DESIGN & DEVELOPMENT"
      title="Websites That Build Trust. Experiences That Drive Growth."
      subtitle="Your website is often the first impression of your business. We design and develop modern, high-performing websites that don't just look exceptional — they help you attract customers, build credibility, and turn visitors into clients."
      heroCta="Start Your Project"
      heroImage="/Web Design.1.jpeg"
      
      introStatement="A website isn't a digital brochure. It's the foundation your entire business runs on — where trust is earned, where credibility is built, and where visitors decide whether to take you seriously. At HiveLabs, we design and develop websites with that responsibility in mind: every layout, every interaction, and every line of code is built to represent your business at its absolute best, and to perform — fast, responsive, and built to convert visitors into customers."
      
      features={[
        { 
          title: "Custom Website Design", 
          desc: "No templates, no shortcuts. Every website we design is built from the ground up around your brand, your goals, and the way your customers think — so the result feels uniquely yours, not recycled." 
        },
        { 
          title: "Website Development", 
          desc: "Clean, modern, well-structured code that's built to last. We develop sites that load fast, run smoothly across every browser, and give you a stable foundation to grow on for years, not months." 
        },
        { 
          title: "Animated Experiences", 
          desc: "Subtle motion, scroll-based reveals, and interactive details that make your site feel alive — without sacrificing speed or usability. Animation should earn its place; we make sure it does." 
        },
        { 
          title: "Responsive Design", 
          desc: "Your website should look and work flawlessly whether someone's on a desktop, tablet, or phone. We design and test across every screen size so no visitor ever has a broken experience." 
        },
        { 
          title: "Forms & Integrations", 
          desc: "Contact forms, booking systems, newsletter sign-ups, payment gateways — we integrate the tools your business actually needs to operate, connected and working seamlessly from day one." 
        },
        { 
          title: "Domain & Hosting", 
          desc: "We handle the technical setup so you don't have to — domain configuration, hosting, and deployment, done correctly the first time." 
        },
        { 
          title: "Post-Launch Support", 
          desc: "Launch day isn't the finish line. We stay available after delivery to help with updates, fixes, and questions, so your site keeps performing the way it should." 
        },
      ]}
      featuresImage="/Web Design.2.jpeg"
      
      process={[
        { 
          title: "Discovery", 
          desc: "We start by understanding your business, your audience, and what success actually looks like for you. This isn't a quick form — it's a real conversation about your goals." 
        },
        { 
          title: "Design Concepts", 
          desc: "Based on that discovery, we create initial design concepts that reflect your brand identity and business objectives, so you can see and feel the direction before any development begins." 
        },
        { 
          title: "Feedback & Refinement", 
          desc: "Your input shapes the final product. We refine the design collaboratively until it feels exactly right — not just to us, but to you." 
        },
        { 
          title: "Development", 
          desc: "Once the design is approved, our developers bring it to life — translating every detail into a fast, functional, fully responsive website." 
        },
        { 
          title: "Final Delivery", 
          desc: "We test thoroughly, launch carefully, and hand over a website that's ready to perform from day one — with support available after launch." 
        }
      ]}
      
      whyChooseUs="We believe a website should do more than look good — it should work as hard as you do. That means clear communication throughout the process, no jargon, no guesswork, and a finished product tailored to your specific business, not a one-size-fits-all template. Every project is treated as a long-term partnership, not a one-off transaction, because we want to be the team you come back to as your business grows."
      
      ctaHeadline="Let's Build Something That Works as Hard as You Do."
      ctaSubtext="Tell us about your business, and let's start building a website you'll be proud to put your name on."
      ctaButton="Let's Build Together"
    />
  )
}
