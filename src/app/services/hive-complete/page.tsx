import ServiceTemplate from "@/components/services/ServiceTemplate"

export default function HiveCompletePage() {
  return (
    <ServiceTemplate 
      eyebrow="HIVE COMPLETE — THE ALL-IN-ONE SOLUTION"
      title="Everything Your Business Needs. One Complete Solution."
      subtitle="Branding, website, content, and growth — built together, not in pieces. Hive Complete brings every service your business needs into one seamless package, designed and managed by a single team from day one."
      heroCta="Get Hive Complete"
      heroImage="/Hive Complete.1.jpeg"
      
      introStatement="Most businesses end up piecing together their brand, website, and social presence from different freelancers and agencies — and it shows. Inconsistent visuals, mismatched messaging, and no one taking full ownership of the result. Hive Complete was built to solve that. It's a single, comprehensive package where your brand identity, website, and digital presence are designed and developed together, by one team, with one unified vision — so everything your business shows the world actually feels like it belongs together."
      
      features={[
        { 
          title: "Complete Brand Identity", 
          desc: "A full branding package — logo, color palette, typography, and brand guidelines — designed as the foundation everything else builds on." 
        },
        { 
          title: "Website Design & Development", 
          desc: "A custom, fully responsive website built to reflect your new brand identity and convert visitors into customers." 
        },
        { 
          title: "Domain & Hosting", 
          desc: "Complete technical setup, handled for you, so your website is live, secure, and properly configured from the start." 
        },
        { 
          title: "Social Media Setup", 
          desc: "Professional setup of your social media profiles, fully aligned with your new brand identity." 
        },
        { 
          title: "Content Creation", 
          desc: "Ongoing feed posts, story designs, and graphics, created consistently to keep your social presence active and professional." 
        },
        { 
          title: "Reels & Video Editing", 
          desc: "Engaging short-form video content, edited to perform well and represent your brand at a premium standard." 
        },
        { 
          title: "Marketing Creatives", 
          desc: "Additional design assets for promotions, campaigns, and announcements — ready whenever your business needs them." 
        },
        { 
          title: "SEO Foundation", 
          desc: "On-site SEO fundamentals set up correctly from launch, helping your website get found by the right people." 
        },
        { 
          title: "Business Email Setup", 
          desc: "A professional business email address, set up and ready to use, reinforcing credibility in every client communication." 
        },
        { 
          title: "Analytics & Tracking", 
          desc: "Proper tracking setup across your website and social platforms, so you can see real data on performance from day one." 
        },
        { 
          title: "Ongoing Technical Support", 
          desc: "Continued support after launch — because a complete solution doesn't end at delivery." 
        },
        { 
          title: "Growth Consultation", 
          desc: "Strategic guidance on next steps for growing your business digitally, based on real data and experience." 
        }
      ]}
      featuresImage="/Hive Complete.2.jpeg"
      
      process={[
        { 
          title: "Discovery & Strategy", 
          desc: "We start with a comprehensive look at your business — goals, audience, and vision — laying the strategic foundation for everything that follows." 
        },
        { 
          title: "Brand Identity Development", 
          desc: "We design your complete brand identity first, establishing the visual foundation that your website and content will build on." 
        },
        { 
          title: "Website Design & Development", 
          desc: "With your brand identity in place, we design and develop your website to fully reflect it — cohesive from the homepage down to the smallest detail." 
        },
        { 
          title: "Social & Content Setup", 
          desc: "We set up your social media presence and begin content creation, ensuring your digital presence launches in full alignment with your new brand and website." 
        },
        { 
          title: "Launch & Ongoing Support", 
          desc: "We launch everything together, then stay on as your ongoing partner — providing support, reporting, and growth consultation as your business moves forward." 
        }
      ]}
      
      whyChooseUs="One Team, Total Consistency\n\nNo coordinating between separate designers, developers, and social media managers. One team handles everything, so your brand identity, website, and content all feel like part of the same story.\n\nBuilt Together, Not in Pieces\n\nYour branding informs your website. Your website informs your content. Every part of Hive Complete is designed with full visibility into the others — something fragmented freelance work can never achieve.\n\nFaster, Smoother Launch\n\nWith one team managing the entire process, there's no waiting on handoffs between vendors. Your business launches faster, with fewer delays and miscommunications.\n\nA True Long-Term Partnership\n\nHive Complete isn't a one-time delivery — it includes ongoing support and growth consultation, because we're invested in your business's success well beyond launch day."
      
      ctaHeadline="One Team. One Vision. Everything Your Business Needs."
      ctaSubtext="Stop piecing your brand together. Let's build it complete, from the ground up."
      ctaButton="Get Started with Hive Complete"
    />
  )
}
