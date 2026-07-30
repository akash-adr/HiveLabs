import dynamic from 'next/dynamic'
import Hero from "@/components/home/Hero"

const OurStory = dynamic(() => import("@/components/home/OurStory"))
const ServicesOverview = dynamic(() => import("@/components/home/ServicesOverview"))
const HowItWorks = dynamic(() => import("@/components/home/HowItWorks"))
const WhyChooseUs = dynamic(() => import("@/components/home/WhyChooseUs"))
const Testimonials = dynamic(() => import("@/components/home/Testimonials"))
const AnimatedWebsites = dynamic(() => import("@/components/home/AnimatedWebsites"))
const DesignMarquee = dynamic(() => import("@/components/home/DesignMarquee"))
const OurWorkPreview = dynamic(() => import("@/components/home/OurWorkPreview"))
const ContactSection = dynamic(() => import("@/components/home/ContactSection"))
const FoundersSection = dynamic(() => import("@/components/home/FoundersSection"))
export default function Home() {
  return (
    <>
      <Hero />
      <AnimatedWebsites />
      <DesignMarquee />
      <OurWorkPreview />
      <OurStory />
      <ServicesOverview />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <ContactSection />
      <FoundersSection />
    </>
  )
}
