import ServiceTemplate from "@/components/services/ServiceTemplate"

export default function SocialGrowthPage() {
  return (
    <ServiceTemplate 
      eyebrow="SOCIAL GROWTH"
      title="Grow Your Brand. Engage Your Audience. Make Every Post Count."
      subtitle="Social media is one of the most powerful tools for building trust and visibility — but only when it's done with strategy. We turn your social presence into a consistent, engaging growth engine for your business."
      heroCta="Start Growing Today"
      heroImage="/Social Growth.1.jpeg"
      
      introStatement="Posting consistently isn't the same as growing strategically. Real social growth comes from understanding your audience, planning content with purpose, and showing up with consistency and quality — month after month. At HiveLabs, we manage every part of that process, so your social presence builds genuine engagement and turns followers into customers, not just numbers."
      
      features={[
        { 
          title: "Content Strategy", 
          desc: "A clear plan built around your brand, your audience, and your goals — so every post serves a purpose instead of being posted at random." 
        },
        { 
          title: "Monthly Content Calendar", 
          desc: "A fully planned content schedule delivered in advance, giving you visibility into what's being posted and when." 
        },
        { 
          title: "Feed Post Designs", 
          desc: "Clean, on-brand graphic designs for your feed that keep your visual presence consistent and professional." 
        },
        { 
          title: "Reels Editing", 
          desc: "Engaging, well-paced video editing for Reels and short-form content, designed to capture attention and hold it." 
        },
        { 
          title: "Motion Graphics", 
          desc: "Animated visual elements that make your content stand out in a fast-scrolling feed." 
        },
        { 
          title: "Story Designs", 
          desc: "Custom story templates and designs that keep your day-to-day presence just as polished as your main feed." 
        },
        { 
          title: "Caption Writing", 
          desc: "Captions written with your brand voice in mind — clear, engaging, and purposeful, not generic filler text." 
        },
        { 
          title: "Hashtag Research", 
          desc: "Strategic hashtag selection to help your content reach the right audience, not just a wider one." 
        },
        { 
          title: "Community Management", 
          desc: "Responding to comments and messages with care, so your audience feels heard and your brand stays approachable." 
        },
        { 
          title: "Monthly Performance Reports", 
          desc: "Clear, regular reporting on what's working and why — so you always know the impact of the work being done." 
        }
      ]}
      featuresImage="/Social Growth.2.jpeg"
      
      process={[
        { 
          title: "Discovery", 
          desc: "We learn about your brand, your audience, and your current social presence to understand exactly where growth opportunities exist." 
        },
        { 
          title: "Content Strategy & Calendar", 
          desc: "We build a content strategy and monthly calendar tailored to your goals, giving you a clear plan before any content is created." 
        },
        { 
          title: "Content Creation", 
          desc: "Our team designs, writes, and edits every piece of content — feed posts, reels, stories — according to the approved calendar." 
        },
        { 
          title: "Review & Scheduling", 
          desc: "Content is reviewed, refined if needed, and scheduled consistently, so your presence stays active without you having to manage it day-to-day." 
        },
        { 
          title: "Reporting & Optimization", 
          desc: "We track performance every month and adjust the strategy based on real results, not guesswork — ensuring continuous improvement over time." 
        }
      ]}
      
      whyChooseUs="Social growth isn't about posting more — it's about posting with intention. We take the time to understand your brand voice and audience so that every piece of content feels authentic, not generic. With clear monthly reporting and consistent communication, you'll always know exactly what's being done and why it's working — because we see this as an ongoing partnership focused on real, measurable growth."
      
      ctaHeadline="Let's Turn Your Social Media Into a Growth Engine."
      ctaSubtext="Tell us about your brand, and let's build a content strategy that actually moves the needle."
      ctaButton="Let's Grow Together"
    />
  )
}
